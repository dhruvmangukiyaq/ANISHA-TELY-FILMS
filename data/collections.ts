import type { Collection } from "./types";

export const collections: Collection[] = [
  {
    name: "The Intimate",
    price: "From €4,800",
    summary:
      "For elopements and celebrations of forty guests or fewer, anywhere in the world.",
    includes: [
      "Six hours of photography",
      "A single photographer",
      "150+ edited images",
      "Private online gallery",
      "Delivery within four weeks",
    ],
  },
  {
    name: "The Signature",
    price: "From €8,400",
    summary:
      "The full day, photographed quietly and completely — our most requested collection.",
    includes: [
      "Ten hours of photography",
      "Second photographer",
      "500+ edited images",
      "A three-minute highlight film",
      "Engagement session",
      "Delivery within six weeks",
    ],
    featured: true,
  },
  {
    name: "The Heirloom",
    price: "From €14,500",
    summary:
      "Multi-day weddings and destination celebrations, with photography and film made together.",
    includes: [
      "Up to three days of coverage",
      "Photography & film team",
      "800+ edited images",
      "A twelve-minute wedding film",
      "Fine-art album, hand bound",
      "Delivery within eight weeks",
    ],
  },
];

export const approach = [
  {
    number: "01",
    title: "Before",
    body: "We start with a conversation, not a contract. Tell me how you met, what you're planning, and what you'd like the day to feel like. I'll send a full collection guide and we'll take it from there.",
  },
  {
    number: "02",
    title: "The day",
    body: "I work quietly and unobtrusively, mostly in natural light. A handful of portraits, plenty of room to breathe, and a gentle hand when the schedule needs one. You should feel like a guest at your own wedding.",
  },
  {
    number: "03",
    title: "After",
    body: "Every image is hand-edited in a warm, film-inspired palette. You'll receive a private gallery, a set of print-ready files, and — if you've chosen film — a score written for your day.",
  },
];
