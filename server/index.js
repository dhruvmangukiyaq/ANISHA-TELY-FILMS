import { timingSafeEqual } from "node:crypto";
import cors from "cors";
import express from "express";
import {
  getEnquiry,
  insertEnquiry,
  listEnquiries,
  setEnquiryStatus,
  dbPath,
} from "./db.js";
import { notifyConfigured, sendEnquiryNotice } from "./notify.js";
import { validateEnquiry } from "./validate.js";

const PORT = Number(process.env.PORT) || 8787;
const STATUSES = ["new", "replied", "closed"];
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 5;

const isProduction = process.env.NODE_ENV === "production";
const origins = (process.env.SITE_ORIGIN ?? "")
  .split(",")
  .map((value) => value.trim())
  .filter(Boolean);

if (!origins.length && isProduction) {
  throw new Error("SITE_ORIGIN must list the site's public origin in production.");
}
if (!origins.length) {
  origins.push("http://localhost:3001");
}

const adminToken = process.env.ADMIN_TOKEN ?? "";

function tokenMatches(candidate) {
  if (typeof candidate !== "string" || !adminToken) return false;
  const provided = Buffer.from(candidate);
  const expected = Buffer.from(adminToken);
  return (
    provided.length === expected.length && timingSafeEqual(provided, expected)
  );
}

function requireAdmin(req, res, next) {
  if (!adminToken) {
    return res.status(503).json({ error: { message: "Inbox access is not configured." } });
  }
  if (!tokenMatches(req.get("x-admin-token"))) {
    return res.status(401).json({ error: { message: "Invalid admin token." } });
  }
  next();
}

const attempts = new Map();

function rateLimit(req, res, next) {
  const key = req.ip || "unknown";
  const now = Date.now();
  const recent = (attempts.get(key) ?? []).filter(
    (time) => now - time < RATE_WINDOW_MS,
  );

  if (recent.length >= RATE_MAX) {
    return res.status(429).json({
      error: { message: "Too many enquiries from this address. Please try again shortly." },
    });
  }

  recent.push(now);
  attempts.set(key, recent);

  if (attempts.size > 10_000) {
    for (const [ip, times] of attempts) {
      if (times.every((time) => now - time >= RATE_WINDOW_MS)) attempts.delete(ip);
    }
  }

  next();
}

const app = express();
app.disable("x-powered-by");
if (process.env.TRUST_PROXY) {
  app.set("trust proxy", Number(process.env.TRUST_PROXY) || 1);
}

app.get("/health", (_req, res) => {
  res.json({
    ok: true,
    notifyConfigured: notifyConfigured(),
    db: dbPath,
  });
});

app.use("/api", cors({ origin: origins, methods: ["GET", "POST", "PATCH"] }));
app.use(express.json({ limit: "32kb" }));

app.post("/api/enquiries", rateLimit, async (req, res) => {
  const body = req.body ?? {};

  // Hidden field only a bot fills in: answer politely, store nothing.
  if (String(body.company_website ?? "").trim()) {
    return res.status(201).json({ ok: true });
  }

  const { errors, ok, values } = validateEnquiry(body);
  if (!ok) {
    return res.status(422).json({ error: { message: "Please check the highlighted fields.", errors } });
  }

  const enquiry = insertEnquiry(values);

  try {
    await sendEnquiryNotice(enquiry);
  } catch (error) {
    // The enquiry is already stored, so a mail outage must not lose it.
    console.error("enquiry notification failed:", error);
  }

  res.status(201).json({ ok: true, id: enquiry.id, createdAt: enquiry.created_at });
});

app.get("/api/enquiries", requireAdmin, (req, res) => {
  const status = String(req.query.status ?? "");
  if (status && !STATUSES.includes(status)) {
    return res.status(400).json({ error: { message: `status must be one of ${STATUSES.join(", ")}` } });
  }

  const limit = Math.min(Math.max(Number(req.query.limit) || 50, 1), 200);
  const offset = Math.max(Number(req.query.offset) || 0, 0);

  res.json(listEnquiries({ status: status || undefined, limit, offset }));
});

app.get("/api/enquiries/:id", requireAdmin, (req, res) => {
  const enquiry = getEnquiry(Number(req.params.id));
  if (!enquiry) return res.status(404).json({ error: { message: "Not found." } });
  res.json(enquiry);
});

app.patch("/api/enquiries/:id", requireAdmin, (req, res) => {
  const id = Number(req.params.id);
  if (!getEnquiry(id)) return res.status(404).json({ error: { message: "Not found." } });

  const status = req.body?.status;
  if (!STATUSES.includes(status)) {
    return res.status(422).json({ error: { message: `status must be one of ${STATUSES.join(", ")}` } });
  }

  res.json(setEnquiryStatus(id, status));
});

app.use((_req, res) => {
  res.status(404).json({ error: { message: "Not found." } });
});

app.use((error, _req, res, _next) => {
  if (error?.type === "entity.parse.failed") {
    return res.status(400).json({ error: { message: "Invalid JSON body." } });
  }
  if (error?.type === "entity.too.large") {
    return res.status(413).json({ error: { message: "Request body is too large." } });
  }
  console.error(error);
  res.status(500).json({ error: { message: "Something went wrong." } });
});

app.listen(PORT, () => {
  console.log(`enquiry API on http://localhost:${PORT}`);
  console.log(`  origins: ${origins.join(", ")}`);
  console.log(`  db:      ${dbPath}`);
  console.log(`  inbox:   ${adminToken ? "token protected" : "DISABLED (set ADMIN_TOKEN)"}`);
  console.log(`  email:   ${notifyConfigured() ? "notify on" : "off (set MAIL_TO + SMTP_*)"}`);
});
