import type { Service } from "./types";

export const services: Service[] = [
  {
    slug: "wedding-photography",
    name: "Wedding Photography",
    tagline: "The whole day, quietly documented.",
    description:
      "Quiet, editorial coverage of the whole day — from the last quiet minutes before the ceremony to the final song. Natural light, real moments, no shot lists that interrupt the room.",
    startingPrice: "From ₹4,50,000",
    bestFor: "Weddings of 60–250 guests",
    coverage: "8–12 hours of coverage",
    cover: "/images/galleries/val-dorcia/cover.jpg",
    images: [
      "/images/galleries/val-dorcia/03.jpg",
      "/images/galleries/val-dorcia/06.jpg",
      "/images/galleries/aegean-linen/06.jpg",
    ],
    includes: [
      "Full-day coverage with a second photographer",
      "500+ hand-edited images",
      "Private online gallery and print-ready files",
      "Delivery within six weeks",
    ],
    details: [
      "I arrive while the room is still being dressed and stay until the dancing has properly started. There is no shot list taped to my wrist — instead I watch, wait, and photograph the day as it actually unfolds around you.",
      "The edit is warm and film-inspired: natural skin tones, soft shadows, and colour close to how the day felt. Every gallery is edited by hand, then delivered in a private online gallery you can share with family and download in full resolution.",
    ],
    process: [
      {
        title: "Before",
        body: "We talk through the shape of the day, the people who matter, and the light we are likely to get. I build a loose plan so nobody has to manage me on the wedding morning.",
      },
      {
        title: "On the day",
        body: "I work quietly alongside your planner and stay out of the room when the room doesn't need me. Family groups take fifteen minutes; everything else happens on its own.",
      },
      {
        title: "After",
        body: "A short preview arrives within a week, the full gallery within six. Prints and albums can be ordered directly from the gallery.",
      },
    ],
  },
  {
    slug: "wedding-films",
    name: "Wedding Films",
    tagline: "A film you can hear.",
    description:
      "A short film built around the sound of your day: the vows, the laughter, the band at midnight. Photographed and recorded by the same small team, so nothing has to be staged twice.",
    startingPrice: "From ₹3,80,000",
    bestFor: "Couples who want to remember how it sounded",
    coverage: "3–12 minute edit",
    cover: "/images/galleries/saltwater-vows/cover.jpg",
    images: [
      "/images/galleries/rose-dust-palms/05.jpg",
      "/images/galleries/wildflower-notes/06.jpg",
      "/images/galleries/marigolds-monsoon/02.jpg",
    ],
    includes: [
      "Three to twelve minute edited film",
      "Original score or licensed soundtrack",
      "Documentary audio of vows and speeches",
      "4K delivery with a social cut",
    ],
    details: [
      "The film is built from the day itself — the vows recorded cleanly, the speeches caught at the table, the ten seconds of laughter after the rings. I cut to the audio first and let the pictures follow it.",
      "Because the same team shoots both photography and film, there is one crew in the room instead of two, and nothing has to be repeated for a second camera. You get a documentary edit and a short vertical cut for sharing.",
    ],
    process: [
      {
        title: "Sound first",
        body: "I place small recorders with the officiant and on the top table, and mic the couple for the vows. Everything else is captured as it happens.",
      },
      {
        title: "The edit",
        body: "Footage is cut against the real audio from the day, scored with an original piece or a licensed track chosen to fit the pace of your celebration.",
      },
      {
        title: "Delivery",
        body: "A private streaming link, a 4K download, and a one-minute vertical cut — usually within eight weeks of the wedding.",
      },
    ],
  },
  {
    slug: "destination-multi-day",
    name: "Destination & Multi-Day",
    tagline: "Three days, one continuous story.",
    description:
      "For celebrations that stretch across a weekend, a country, or both. I travel with you from the welcome dinner to the last brunch, keeping the story in one continuous hand.",
    startingPrice: "From ₹7,50,000",
    bestFor: "Weekend celebrations at home or abroad",
    coverage: "Up to three days",
    cover: "/images/galleries/marigolds-monsoon/cover.jpg",
    images: [
      "/images/galleries/marigolds-monsoon/02.jpg",
      "/images/galleries/rain-on-cedar/02.jpg",
      "/images/galleries/villa-balbiano/05.jpg",
    ],
    includes: [
      "Up to three days of photography and film",
      "Travel planning and location scouting",
      "800+ edited images and a feature film",
      "Hand-bound fine-art album",
    ],
    details: [
      "Multi-day weddings are their own kind of story: the arrival, the welcome dinner, the ceremony, the recovery brunch. Photographing all of it means the gallery has a beginning and an end instead of a highlight reel.",
      "I scout the venue in advance, plan around the light for each part of the weekend, and travel with a small team so the footprint stays light. Travel and accommodation are quoted separately and kept transparent.",
    ],
    process: [
      {
        title: "Planning",
        body: "A shared document covering the weekend's timings, locations, and light. I scout in person where possible, or over video with your planner.",
      },
      {
        title: "The weekend",
        body: "Two photographers and a filmmaker across up to three days, with a single edit at the end so every part of the celebration sits together.",
      },
      {
        title: "The archive",
        body: "800+ images, a feature-length film, and a hand-bound album designed with you over two rounds of proofs.",
      },
    ],
  },
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}

export function getAdjacentServices(slug: string) {
  const index = services.findIndex((service) => service.slug === slug);
  if (index === -1) return { previous: undefined, next: undefined };

  return {
    previous: services[(index - 1 + services.length) % services.length],
    next: services[(index + 1) % services.length],
  };
}
