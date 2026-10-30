import { createTransport } from "nodemailer";

const {
  SMTP_URL,
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASS,
  MAIL_FROM,
  MAIL_TO,
} = process.env;

let transport;

export function notifyConfigured() {
  return Boolean(MAIL_TO && (SMTP_URL || SMTP_HOST));
}

function getTransport() {
  if (!transport) {
    transport = SMTP_URL
      ? createTransport(SMTP_URL)
      : createTransport({
          host: SMTP_HOST,
          port: Number(SMTP_PORT) || 587,
          secure: Number(SMTP_PORT) === 465,
          auth: SMTP_USER ? { user: SMTP_USER, pass: SMTP_PASS } : undefined,
        });
  }
  return transport;
}

function formatDay(value) {
  const parsed = new Date(`${value}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return value;
  return parsed.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export async function sendEnquiryNotice(enquiry) {
  if (!notifyConfigured()) return false;

  const subject = `New enquiry · ${enquiry.name} · ${formatDay(enquiry.event_date)}`;
  const replyTo = `${enquiry.name} <${enquiry.email}>`;

  await getTransport().sendMail({
    from: MAIL_FROM ?? SMTP_USER,
    to: MAIL_TO,
    replyTo,
    subject,
    text: [
      `Name:  ${enquiry.name}`,
      `Email: ${enquiry.email}`,
      `Phone: ${enquiry.phone}`,
      `Date:  ${formatDay(enquiry.event_date)}`,
      "",
      enquiry.message,
    ].join("\n"),
  });

  return true;
}
