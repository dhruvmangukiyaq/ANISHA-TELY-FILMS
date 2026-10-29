type StarsProps = {
  rating: number;
  /** Tailwind size classes for each star. */
  starClassName?: string;
  className?: string;
};

const STAR_PATH =
  "M12 2.6l2.86 5.98 6.54.92-4.76 4.6 1.16 6.53L12 17.5l-5.8 3.13 1.16-6.53L2.6 9.5l6.54-.92L12 2.6z";

export default function Stars({
  rating,
  starClassName = "h-3.5 w-3.5",
  className = "",
}: StarsProps) {
  const filled = Math.round(rating);

  return (
    <span
      role="img"
      aria-label={`Rated ${rating} out of 5`}
      className={`inline-flex items-center gap-1 ${className}`}
    >
      {[0, 1, 2, 3, 4].map((index) => (
        <svg
          key={index}
          viewBox="0 0 24 24"
          aria-hidden
          className={`${starClassName} ${
            index < filled ? "fill-gold" : "fill-line"
          }`}
        >
          <path d={STAR_PATH} />
        </svg>
      ))}
    </span>
  );
}
