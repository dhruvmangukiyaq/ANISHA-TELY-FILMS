import type { Review, Testimonial } from "./types";

export const reviews: Review[] = [
  {
    quote:
      "Anisha has a way of disappearing into the day and coming back with the photographs you didn't know you needed. We have looked at these images a hundred times and still find something new.",
    couple: "Amelia & James",
    city: "Val d'Orcia",
    country: "Italy",
    rating: 5,
    wedding: "June 2025",
    source: "Google review",
  },
  {
    quote:
      "She photographed our wedding like a guest with a very good eye. Nothing felt posed, nothing felt performed — and somehow every important moment is there.",
    couple: "Priya & Arjun",
    city: "Udaipur",
    country: "India",
    rating: 5,
    wedding: "February 2025",
    source: "Email",
  },
  {
    quote:
      "The film made my mother cry before the ceremony footage even began. It is the closest thing we have to being able to live that day twice.",
    couple: "Elena & Marco",
    city: "Lake Como",
    country: "Italy",
    rating: 5,
    wedding: "September 2024",
    source: "Google review",
  },
  {
    quote:
      "Calm, warm, and completely unflappable in the rain. Half our guests have since asked for her number, which tells you everything.",
    couple: "Hannah & Theo",
    city: "Cotswolds",
    country: "England",
    rating: 5,
    wedding: "August 2025",
    source: "Instagram",
  },
  {
    quote:
      "We asked for quiet, unposed photographs and that is exactly what we got. The light in the caldera shots still stops me mid-scroll.",
    couple: "Sofia & Daniel",
    city: "Oia",
    country: "Greece",
    rating: 5,
    wedding: "May 2024",
    source: "Email",
  },
  {
    quote:
      "Three days, four outfits, one very large family — and she never once made us feel rushed. The photographs of my grandmother are the ones I would rescue from a fire.",
    couple: "Noor & Idris",
    city: "Marrakech",
    country: "Morocco",
    rating: 5,
    wedding: "April 2025",
    source: "Google review",
  },
  {
    quote:
      "It rained for most of our wedding and somehow the gallery is full of light. Anisha found the two dry hours and made them look like the whole day.",
    couple: "Yuki & Ren",
    city: "Kyoto",
    country: "Japan",
    rating: 5,
    wedding: "November 2024",
    source: "Email",
  },
  {
    quote:
      "The photographs arrived in a linen box, hand-numbered, with a note about the day. Nobody does that anymore. We are already planning an anniversary shoot.",
    couple: "Clara & Ben",
    city: "Amalfi Coast",
    country: "Italy",
    rating: 5,
    wedding: "May 2026",
    source: "Google review",
  },
];

/** Same quotes in the shape the home-page carousel expects. */
export const reviewTestimonials: Testimonial[] = reviews.map(
  ({ quote, couple, city, country }) => ({
    quote,
    couple,
    place: `${city}, ${country}`,
  }),
);

export const reviewAverage =
  reviews.reduce((total, review) => total + review.rating, 0) / reviews.length;
