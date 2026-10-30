import { DatabaseSync } from "node:sqlite";
import { mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";

export const dbPath = resolve(
  process.env.SQLITE_PATH ?? "server/data/enquiries.db",
);

const schema = `
CREATE TABLE IF NOT EXISTS enquiries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  event_date TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'replied', 'closed')),
  created_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS enquiries_created_at ON enquiries (created_at DESC);
CREATE INDEX IF NOT EXISTS enquiries_status ON enquiries (status);
`;

let db;

export function getDb() {
  if (!db) {
    mkdirSync(dirname(dbPath), { recursive: true });
    db = new DatabaseSync(dbPath);
    db.exec("PRAGMA journal_mode = WAL;");
    db.exec(schema);
  }
  return db;
}

export function insertEnquiry(values) {
  const statement = getDb().prepare(
    `INSERT INTO enquiries (name, phone, email, event_date, message, created_at)
     VALUES (?, ?, ?, ?, ?, ?)`,
  );
  const { lastInsertRowid } = statement.run(
    values.name,
    values.phone,
    values.email,
    values.eventDate,
    values.message,
    new Date().toISOString(),
  );
  return getEnquiry(Number(lastInsertRowid));
}

export function getEnquiry(id) {
  const row = getDb()
    .prepare(`SELECT * FROM enquiries WHERE id = ?`)
    .get(id);
  return row ? { ...row } : undefined;
}

export function listEnquiries({ status, limit, offset }) {
  const where = status ? `WHERE status = ?` : "";
  const params = status ? [status] : [];

  const total = getDb()
    .prepare(`SELECT COUNT(*) AS n FROM enquiries ${where}`)
    .get(...params).n;

  const rows = getDb()
    .prepare(
      `SELECT * FROM enquiries ${where} ORDER BY datetime(created_at) DESC, id DESC LIMIT ? OFFSET ?`,
    )
    .all(...params, limit, offset);

  return { total, rows: rows.map((row) => ({ ...row })) };
}

export function setEnquiryStatus(id, status) {
  getDb()
    .prepare(`UPDATE enquiries SET status = ? WHERE id = ?`)
    .run(status, id);
  return getEnquiry(id);
}
