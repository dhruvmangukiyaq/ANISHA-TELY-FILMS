"use client";

import { useState, type FormEvent } from "react";
import { collections } from "@/data/collections";

const fieldClass =
  "w-full border-b border-line bg-transparent py-3 text-sm text-ivory placeholder:text-muted-2/70 transition-colors duration-300 focus:border-gold focus:outline-none";

const labelClass =
  "mb-2 block text-[9.5px] uppercase tracking-[0.28em] text-muted-2";

export default function InquiryForm() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const names = String(data.get("names") ?? "").trim();
    setName(names);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="flex min-h-[28rem] flex-col justify-center border border-gold/25 bg-surface/50 p-8 md:p-12">
        <span className="eyebrow">Enquiry received</span>
        <h3 className="mt-5 font-display text-3xl leading-tight text-ivory md:text-4xl">
          Thank you{name ? `, ${name.split(" ")[0]}` : ""}.
        </h3>
        <p className="mt-5 max-w-md text-sm leading-relaxed text-muted">
          Your note has been saved to this demo and would normally land in the
          studio inbox. Anisha replies to every enquiry personally, usually
          within two working days.
        </p>
        <p className="mt-6 text-[10px] uppercase tracking-[0.24em] text-muted-2">
          This is a front-end demo — no data was sent anywhere.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-10 self-start border border-gold/50 px-7 py-3.5 text-[10px] uppercase tracking-[0.26em] text-gold transition-colors hover:bg-gold hover:text-ink"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid gap-8 sm:grid-cols-2">
        <div>
          <label htmlFor="names" className={labelClass}>
            Your names *
          </label>
          <input
            id="names"
            name="names"
            required
            autoComplete="name"
            placeholder="Amelia & James"
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>
            Email *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="phone" className={labelClass}>
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+91 00000 00000"
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="date" className={labelClass}>
            Wedding date
          </label>
          <input id="date" name="date" type="date" className={`${fieldClass} [color-scheme:dark]`} />
        </div>
        <div>
          <label htmlFor="location" className={labelClass}>
            Location or venue *
          </label>
          <input
            id="location"
            name="location"
            required
            placeholder="Val d'Orcia, Italy"
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="guests" className={labelClass}>
            Guest count
          </label>
          <select id="guests" name="guests" defaultValue="" className={fieldClass}>
            <option value="" disabled>
              Select
            </option>
            <option value="intimate">Under 40</option>
            <option value="medium">40 – 100</option>
            <option value="large">100 – 200</option>
            <option value="grand">200+</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="collection" className={labelClass}>
          Collection of interest
        </label>
        <select id="collection" name="collection" defaultValue="" className={fieldClass}>
          <option value="" disabled>
            Select
          </option>
          {collections.map((collection) => (
            <option key={collection.name} value={collection.name}>
              {collection.name} — {collection.price}
            </option>
          ))}
          <option value="unsure">Not sure yet</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          Tell me about the day *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="How you met, what you're planning, and what you'd like the photographs to feel like…"
          className={`${fieldClass} resize-none`}
        />
      </div>

      <div className="flex flex-col gap-5 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          className="group inline-flex items-center gap-4 border border-gold/60 px-8 py-4 text-[10px] uppercase tracking-[0.28em] text-gold transition-colors duration-300 hover:bg-gold hover:text-ink"
        >
          Send enquiry
          <span aria-hidden className="transition-transform duration-500 group-hover:translate-x-1">
            →
          </span>
        </button>
        <p className="text-[10px] uppercase tracking-[0.2em] text-muted-2">
          Demo form · no data is sent
        </p>
      </div>
    </form>
  );
}
