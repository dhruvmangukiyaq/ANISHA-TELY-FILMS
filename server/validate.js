const max = {
  name: 100,
  phone: 32,
  email: 254,
  eventDate: 10,
  message: 2000,
};

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

function text(value, limit) {
  return typeof value === "string" ? value.trim().slice(0, limit) : "";
}

function isoDay(offsetMs = 0) {
  return new Date(Date.now() + offsetMs).toISOString().slice(0, 10);
}

export function validateEnquiry(input = {}) {
  const errors = {};

  const name = text(input.name, max.name);
  if (!name) errors.name = "Please tell me your name.";
  else if (name.length < 2) errors.name = "That looks a little short.";

  const phone = text(input.phone, max.phone);
  const digits = phone.replace(/\D/g, "");
  if (!phone) errors.phone = "A phone number helps me reply faster.";
  else if (!/^[+()\d\s.-]+$/.test(phone))
    errors.phone = "Use numbers, spaces and + ( ) - only.";
  else if (digits.length < 7 || digits.length > 15)
    errors.phone = "Enter a valid phone number, including the country code.";

  const email = text(input.email, max.email);
  if (!email) errors.email = "An email address is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(email))
    errors.email = "Enter a valid email address, e.g. you@example.com.";

  const eventDate = text(input.event_date, max.eventDate);
  // Server clock is UTC, so a locally-today date can already read as past;
  // a one-day grace keeps couples in the east from being rejected.
  const earliest = isoDay(-86_400_000);
  if (!eventDate) errors.event_date = "Choose your event date.";
  else if (!DATE_RE.test(eventDate) || Number.isNaN(Date.parse(eventDate)))
    errors.event_date = "Enter a valid date.";
  else if (eventDate < earliest)
    errors.event_date = "Please choose today or a date in the future.";

  const message = text(input.message, max.message);
  if (!message) errors.message = "Tell me a little about the day.";
  else if (message.length < 20)
    errors.message = "A sentence or two, please — at least 20 characters.";

  return {
    errors,
    ok: Object.keys(errors).length === 0,
    values: { name, phone, email, eventDate, message },
  };
}

export const enquiryFieldNames = [
  "name",
  "phone",
  "email",
  "event_date",
  "message",
];
