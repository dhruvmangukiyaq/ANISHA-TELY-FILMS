import { site } from "@/data/site";

export default function Stats() {
  return (
    <dl className="grid grid-cols-2 gap-y-10 border-y border-line/60 py-10 md:grid-cols-4 md:divide-x md:divide-line/60">
      {site.stats.map((stat) => (
        <div key={stat.label} className="md:px-8 md:first:pl-0 md:last:pr-0">
          <dt className="sr-only">{stat.label}</dt>
          <dd>
            <span className="block font-display text-4xl text-gold md:text-5xl">
              {stat.value}
            </span>
            <span className="mt-2 block text-[9.5px] uppercase tracking-[0.26em] text-muted-2">
              {stat.label}
            </span>
          </dd>
        </div>
      ))}
    </dl>
  );
}
