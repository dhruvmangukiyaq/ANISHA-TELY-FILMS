import type { GalleryImage } from "./types";

export const galleryCategories = [
  "All",
  "Portraits",
  "Ceremony",
  "Details",
  "Celebration",
  "Places",
] as const;

export type GalleryFilter = (typeof galleryCategories)[number];
export type GalleryCategory = Exclude<GalleryFilter, "All">;

export type GalleryPhoto = GalleryImage & {
  category: GalleryCategory;
};

export const gallery: GalleryPhoto[] = [
  {
    src: "/images/galleries/val-dorcia/01.jpg",
    alt: "Golden evening light across the Tuscan hills",
    aspect: "landscape",
    category: "Places",
  },
  {
    src: "/images/galleries/val-dorcia/03.jpg",
    alt: "Bride in a silk slip dress among the vines",
    aspect: "portrait",
    category: "Portraits",
  },
  {
    src: "/images/galleries/val-dorcia/06.jpg",
    alt: "A quiet portrait in the olive grove",
    aspect: "portrait",
    category: "Portraits",
  },
  {
    src: "/images/galleries/marigolds-monsoon/01.jpg",
    alt: "Marigold garlands in the monsoon light",
    aspect: "portrait",
    category: "Details",
  },
  {
    src: "/images/galleries/marigolds-monsoon/02.jpg",
    alt: "The baraat arriving by boat at the island palace",
    aspect: "landscape",
    category: "Ceremony",
  },
  {
    src: "/images/galleries/marigolds-monsoon/04.jpg",
    alt: "Rain falling over the palace courtyard",
    aspect: "landscape",
    category: "Places",
  },
  {
    src: "/images/galleries/villa-balbiano/01.jpg",
    alt: "Morning mist over Lake Como",
    aspect: "landscape",
    category: "Places",
  },
  {
    src: "/images/galleries/villa-balbiano/02.jpg",
    alt: "Ceremony beneath the villa's stone loggia",
    aspect: "landscape",
    category: "Ceremony",
  },
  {
    src: "/images/galleries/villa-balbiano/05.jpg",
    alt: "Dinner lit by candles on the terrace",
    aspect: "square",
    category: "Details",
  },
  {
    src: "/images/galleries/aegean-linen/01.jpg",
    alt: "Whitewashed steps above the Aegean",
    aspect: "portrait",
    category: "Places",
  },
  {
    src: "/images/galleries/aegean-linen/03.jpg",
    alt: "Linen and olive branches at the ceremony table",
    aspect: "landscape",
    category: "Ceremony",
  },
  {
    src: "/images/galleries/aegean-linen/06.jpg",
    alt: "A couple walking the caldera path at dusk",
    aspect: "landscape",
    category: "Portraits",
  },
  {
    src: "/images/galleries/rose-dust-palms/01.jpg",
    alt: "Rose-coloured light through the palm courtyard",
    aspect: "landscape",
    category: "Places",
  },
  {
    src: "/images/galleries/rose-dust-palms/02.jpg",
    alt: "A table set with brass and dried flowers",
    aspect: "square",
    category: "Details",
  },
  {
    src: "/images/galleries/rose-dust-palms/05.jpg",
    alt: "Guests dancing under lantern light",
    aspect: "portrait",
    category: "Celebration",
  },
  {
    src: "/images/galleries/wildflower-notes/01.jpg",
    alt: "Wildflowers gathered in the meadow",
    aspect: "landscape",
    category: "Details",
  },
  {
    src: "/images/galleries/wildflower-notes/03.jpg",
    alt: "A marquee at the edge of the woods",
    aspect: "landscape",
    category: "Celebration",
  },
  {
    src: "/images/galleries/wildflower-notes/06.jpg",
    alt: "Confetti in the late afternoon sun",
    aspect: "portrait",
    category: "Celebration",
  },
  {
    src: "/images/galleries/rain-on-cedar/02.jpg",
    alt: "Rain on the cedar garden in Kyoto",
    aspect: "landscape",
    category: "Places",
  },
  {
    src: "/images/galleries/saltwater-vows/04.jpg",
    alt: "The Amalfi coast seen from the reception terrace",
    aspect: "landscape",
    category: "Places",
  },
];
