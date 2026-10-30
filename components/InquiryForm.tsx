"use client";

import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { site, whatsappHref } from "@/data/site";
import { WhatsAppIcon } from "./WhatsAppButton";

type FieldName = "name" | "phone" | "email" | "date" | "message";
type Values = Record<FieldName, string>;
type Errors = Partial<Record<FieldName, string>>;

const fieldOrder: FieldName[] = ["name", "phone", "email", "date", "message"];

const initialValues: Values = {
  name: "",
  phone: "",
  email: "",
  date: "",
  message: "",
};

const labelClass =
  "mb-2 block text-[9.5px] uppercase tracking-[0.28em] text-muted-2";

const baseFieldClass =
  "w-full border-b bg-transparent py-3 text-sm text-ivory transition-colors duration-300 placeholder:text-muted-2/70 focus:outline-none";

const fieldClass = (hasError: boolean) =>
  `${baseFieldClass} ${
    hasError
      ? "border-danger/70 focus:border-danger"
      : "border-line focus:border-gold"
  }`;

const hintClass = "mt-2 text-[10px] uppercase tracking-[0.18em] text-muted-2/70";
const errorClass = "mt-2 text-[11px] leading-relaxed text-danger";

function validate(values: Values): Errors {
  const errors: Errors = {};

  const name = values.name.trim();
  if (!name) errors.name = "Please tell me your name.";
  else if (name.length < 2) errors.name = "That looks a little short.";

  const phone = values.phone.trim();
  const digits = phone.replace(/\D/g, "");
  if (!phone) errors.phone = "A phone number helps me reply faster.";
  else if (!/^[+()\d\s.-]+$/.test(phone))
    errors.phone = "Use numbers, spaces and + ( ) - only.";
  else if (digits.length < 7 || digits.length > 15)
    errors.phone = "Enter a valid phone number, including the country code.";

  const email = values.email.trim();
  if (!email) errors.email = "An email address is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(email))
    errors.email = "Enter a valid email address, e.g. you@example.com.";

  if (!values.date) {
    errors.date = "Choose your event date.";
  } else {
    const chosen = new Date(`${values.date}T00:00:00`);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (Number.isNaN(chosen.getTime())) errors.date = "Enter a valid date.";
    else if (chosen < today)
      errors.date = "Please choose today or a date in the future.";
  }

  const message = values.message.trim();
  if (!message) errors.message = "Tell me a little about the day.";
  else if (message.length < 20)
    errors.message = "A sentence or two, please — at least 20 characters.";

  return errors;
}

function formatDate(value: string) {
  const parsed = new Date(`${value}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return value;
  return parsed.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

type FieldShellProps = {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  children: ReactNode;
};

function FieldShell({ id, label, error, hint, children }: FieldShellProps) {
  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className={errorClass}>
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className={hintClass}>
          {hint}
        </p>
      ) : null}
    </div>
  );
}

const describedBy = (id: string, error?: string, hint?: string) =>
  error ? `${id}-error` : hint ? `${id}-hint` : undefined;

export default function InquiryForm() {
  const [values, setValues] = useState<Values>(initialValues);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});
  const [attempted, setAttempted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const successRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (submitted) successRef.current?.focus();
  }, [submitted]);

  function update(field: FieldName, value: string) {
    const next = { ...values, [field]: value };
    setValues(next);

    if (touched[field] || attempted) {
      const nextErrors = validate(next);
      setErrors((current) => ({ ...current, [field]: nextErrors[field] }));
    }
  }

  function handleBlur(field: FieldName) {
    setTouched((current) => ({ ...current, [field]: true }));
    const nextErrors = validate(values);
    setErrors((current) => ({ ...current, [field]: nextErrors[field] }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validate(values);
    setAttempted(true);
    setTouched({
      name: true,
      phone: true,
      email: true,
      date: true,
      message: true,
    });
    setErrors(nextErrors);

    const firstInvalid = fieldOrder.find((field) => nextErrors[field]);
    if (firstInvalid) {
      document.getElementById(firstInvalid)?.focus();
      return;
    }

    setSubmitted(true);
  }

  function reset() {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setAttempted(false);
    setSubmitted(false);
  }

  const errorCount = fieldOrder.filter((field) => errors[field]).length;

  if (submitted) {
    const firstName = values.name.trim().split(/\s+/)[0];

    return (
      <div className="flex min-h-[26rem] flex-col justify-center border border-gold/25 bg-surface/50 p-8 md:p-12">
        <span className="eyebrow">Enquiry received</span>
        <h3
          ref={successRef}
          tabIndex={-1}
          className="mt-5 font-display text-3xl leading-tight text-ivory outline-none md:text-4xl"
        >
          Thank you{firstName ? `, ${firstName}` : ""}.
        </h3>
        <p className="mt-5 max-w-md text-sm leading-[1.9] text-muted">
          Your note for{" "}
          <span className="text-ivory/90">{formatDate(values.date)}</span> has
          been saved to this demo. On the live site it would land in the studio
          inbox, and Anisha would reply personally within two working days.
        </p>

        <dl className="mt-8 grid gap-x-8 gap-y-5 border-t border-line/60 pt-6 sm:grid-cols-2">
          <div>
            <dt className="text-[9px] uppercase tracking-[0.24em] text-muted-2">
              Email
            </dt>
            <dd className="mt-1.5 break-all text-sm text-ivory/85">
              {values.email}
            </dd>
          </div>
          <div>
            <dt className="text-[9px] uppercase tracking-[0.24em] text-muted-2">
              Phone
            </dt>
            <dd className="mt-1.5 text-sm text-ivory/85">{values.phone}</dd>
          </div>
        </dl>

        <p className="mt-6 text-[10px] uppercase tracking-[0.24em] text-muted-2">
          Demo form · nothing was sent anywhere
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-5">
          <button
            type="button"
            onClick={reset}
            className="border border-gold/50 px-7 py-3.5 text-[10px] uppercase tracking-[0.26em] text-gold transition-colors duration-300 hover:bg-gold hover:text-ink"
          >
            Send another enquiry
          </button>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.26em] text-ivory/70 transition-colors hover:text-gold"
          >
            <WhatsAppIcon className="h-4 w-4 text-[#3ddc84]" />
            Message on WhatsApp
            <span
              aria-hidden
              className="transition-transform duration-500 group-hover:translate-x-1"
            >
              →
            </span>
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-8">
      {attempted && errorCount > 0 && (
        <div
          role="alert"
          className="border-l-2 border-danger/70 bg-danger/[0.06] px-5 py-4 text-sm leading-relaxed text-danger"
        >
          Please check the {errorCount === 1 ? "highlighted field" : `${errorCount} highlighted fields`}{" "}
          below.
        </div>
      )}

      <div className="grid gap-8 sm:grid-cols-2">
        <FieldShell id="name" label="Your name *" error={errors.name}>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Amelia Sharma"
            value={values.name}
            onChange={(event) => update("name", event.target.value)}
            onBlur={() => handleBlur("name")}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={describedBy("name", errors.name)}
            className={fieldClass(Boolean(errors.name))}
          />
        </FieldShell>

        <FieldShell
          id="phone"
          label="Phone *"
          error={errors.phone}
          hint="Include your country code"
        >
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            inputMode="tel"
            autoComplete="tel"
            placeholder="+91 98200 41120"
            value={values.phone}
            onChange={(event) => update("phone", event.target.value)}
            onBlur={() => handleBlur("phone")}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={describedBy("phone", errors.phone, "Include your country code")}
            className={fieldClass(Boolean(errors.phone))}
          />
        </FieldShell>

        <FieldShell id="email" label="Email *" error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            required
            inputMode="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={values.email}
            onChange={(event) => update("email", event.target.value)}
            onBlur={() => handleBlur("email")}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={describedBy("email", errors.email)}
            className={fieldClass(Boolean(errors.email))}
          />
        </FieldShell>

        <FieldShell id="date" label="Event date *" error={errors.date}>
          <input
            id="date"
            name="date"
            type="date"
            required
            value={values.date}
            onChange={(event) => update("date", event.target.value)}
            onBlur={() => handleBlur("date")}
            aria-invalid={Boolean(errors.date)}
            aria-describedby={describedBy("date", errors.date)}
            className={`${fieldClass(Boolean(errors.date))} [color-scheme:dark]`}
          />
        </FieldShell>
      </div>

      <div>
        <div className="flex items-baseline justify-between gap-4">
          <label htmlFor="message" className={labelClass}>
            Tell me about the day *
          </label>
          <span className="mb-2 text-[10px] tabular-nums tracking-[0.1em] text-muted-2">
            {values.message.length} / 1200
          </span>
        </div>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          maxLength={1200}
          placeholder="Where you're marrying, roughly how many guests, and what you'd like the photographs to feel like…"
          value={values.message}
          onChange={(event) => update("message", event.target.value)}
          onBlur={() => handleBlur("message")}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={describedBy("message", errors.message)}
          className={`${fieldClass(Boolean(errors.message))} resize-none`}
        />
        {errors.message ? (
          <p id="message-error" className={errorClass}>
            {errors.message}
          </p>
        ) : (
          <p id="message-hint" className={hintClass}>
            Dates, place, and how you&apos;d like it to feel
          </p>
        )}
      </div>

      <div className="flex flex-col gap-5 border-t border-line/60 pt-8 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          className="group inline-flex items-center justify-center gap-4 border border-gold bg-gold px-8 py-4 text-[10px] uppercase tracking-[0.28em] text-ink transition-colors duration-300 hover:border-gold-light hover:bg-gold-light"
        >
          Send enquiry
          <span
            aria-hidden
            className="transition-transform duration-500 group-hover:translate-x-1"
          >
            →
          </span>
        </button>
        <p className="text-[10px] uppercase tracking-[0.2em] text-muted-2">
          * Required · demo form, no data is sent
        </p>
      </div>

      <p className="text-[10px] leading-relaxed uppercase tracking-[0.18em] text-muted-2">
        Or write directly to{" "}
        <a
          href={`mailto:${site.email}`}
          className="text-ivory/70 underline decoration-line underline-offset-4 transition-colors hover:text-gold"
        >
          {site.email}
        </a>
      </p>
    </form>
  );
}
