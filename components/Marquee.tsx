type MarqueeProps = {
  items: string[];
  label?: string;
};

export default function Marquee({ items, label }: MarqueeProps) {
  const loop = [...items, ...items];

  return (
    <div className="relative overflow-hidden border-y border-line/60 py-6">
      <span className="sr-only">{label ?? items.join(", ")}</span>
      <div aria-hidden className="flex w-max animate-marquee items-center">
        {loop.map((item, index) => (
          <div key={`${item}-${index}`} className="flex items-center">
            <span className="px-8 font-display text-lg tracking-[0.08em] text-muted/80 md:px-12 md:text-xl">
              {item}
            </span>
            <span className="h-1 w-1 rotate-45 bg-gold/50" />
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-ink to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-ink to-transparent" />
    </div>
  );
}
