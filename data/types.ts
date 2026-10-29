export type Aspect = "portrait" | "landscape" | "square";

export type GalleryImage = {
  src: string;
  alt: string;
  aspect: Aspect;
};

export type Credit = {
  label: string;
  value: string;
};

export type Gallery = {
  slug: string;
  title: string;
  couple: string;
  location: string;
  country: string;
  venue: string;
  date: string;
  year: string;
  category: string;
  cover: string;
  coverAspect: Aspect;
  excerpt: string;
  intro: string;
  story: string[];
  credits: Credit[];
  images: GalleryImage[];
};

export type Testimonial = {
  quote: string;
  couple: string;
  place: string;
};

export type PortfolioWedding = {
  slug: string;
  couple: string;
  location: string;
  cover: string;
  images: string[];
};

export type ServiceStep = {
  title: string;
  body: string;
};

export type Service = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  /** e.g. "From ₹4,50,000". */
  startingPrice: string;
  bestFor: string;
  coverage: string;
  cover: string;
  images: string[];
  includes: string[];
  details: string[];
  process: ServiceStep[];
};

export type Review = {
  quote: string;
  couple: string;
  city: string;
  country: string;
  /** Whole stars, 1–5. */
  rating: number;
  /** Month and year of the wedding, e.g. "June 2025". */
  wedding: string;
  source: string;
};

export type Video = {
  title: string;
  couple: string;
  location: string;
  youtubeId: string;
  /** Runtime as m:ss. */
  duration: string;
  year: string;
};

export type Collection = {
  name: string;
  price: string;
  summary: string;
  includes: string[];
  featured?: boolean;
};

export type FaqItem = {
  question: string;
  answer: string;
};
