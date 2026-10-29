import Link from "next/link";
import type { ReactNode } from "react";

type SectionLabelProps = {
  children: ReactNode;
  align?: "left" | "center";
  className?: string;
};

export default function SectionLabel({
  children,
  align = "left",
  className = "",
}: SectionLabelProps) {
  return (
    <p
      className={`eyebrow flex items-center gap-4 ${
        align === "center" ? "justify-center" : ""
      } ${className}`}
    >
      <span aria-hidden className="h-px w-8 bg-gold/60" />
      <span>{children}</span>
      {align === "center" && <span aria-hidden className="h-px w-8 bg-gold/60" />}
    </p>
  );
}

type ArrowLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
};

export function ArrowLink({ href, children, className = "" }: ArrowLinkProps) {
  return (
    <Link href={href} className={`link-gold group ${className}`}>
      <span>{children}</span>
      <span
        aria-hidden
        className="inline-block transition-transform duration-500 group-hover:translate-x-1"
      >
        →
      </span>
    </Link>
  );
}
