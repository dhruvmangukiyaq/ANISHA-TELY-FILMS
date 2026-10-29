"use client";

import { useState } from "react";
import type { FaqItem } from "@/data/types";

type AccordionProps = {
  items: FaqItem[];
};

export default function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-line/70 border-y border-line/70">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={item.question}>
            <h3>
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${index}`}
                id={`faq-trigger-${index}`}
                className="group flex w-full items-center justify-between gap-6 py-6 text-left"
              >
                <span className="flex items-baseline gap-5">
                  <span className="text-[10px] tracking-[0.24em] text-gold/70">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-xl text-ivory transition-colors group-hover:text-gold md:text-2xl">
                    {item.question}
                  </span>
                </span>
                <span
                  aria-hidden
                  className={`relative flex h-6 w-6 shrink-0 items-center justify-center text-gold transition-transform duration-500 ${
                    isOpen ? "rotate-45" : ""
                  }`}
                >
                  <span className="absolute h-px w-4 bg-current" />
                  <span className="absolute h-4 w-px bg-current" />
                </span>
              </button>
            </h3>
            <div
              id={`faq-panel-${index}`}
              role="region"
              aria-labelledby={`faq-trigger-${index}`}
              className={`grid transition-all duration-500 ease-out ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="max-w-2xl pb-7 pl-0 text-sm leading-relaxed text-muted md:pl-9">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
