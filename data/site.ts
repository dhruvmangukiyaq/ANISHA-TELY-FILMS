export const site = {
  name: "Anisha Tely",
  fullName: "Anisha Tely Films",
  role: "Wedding Photographer & Filmmaker",
  tagline: "Wedding Photography & Film",
  description:
    "Anisha Tely is a wedding photographer and filmmaker documenting intimate, design-led celebrations across Italy, India and beyond. Quiet, editorial, and led by light.",
  location: "Mumbai · London · Worldwide",
  basedIn: "Mumbai, India",
  email: "hello@anishatelyfilms.com",
  phone: "+91 98200 41120",
  whatsapp: "919820041120",
  whatsappMessage:
    "Hi Anisha — we'd like to talk about wedding photography and film for our celebration.",
  address: [
    "Studio 4, Pali Hill Road",
    "Bandra West, Mumbai 400050",
    "India",
  ],
  studioHours: "Mon–Fri · 10am–6pm IST",
  bookingNote: "Now booking 2026 & 2027 weddings",
  copyrightYear: 2026,
  socials: [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "Vimeo", href: "https://vimeo.com" },
    { label: "Pinterest", href: "https://pinterest.com" },
  ],
  nav: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Gallery", href: "/gallery" },
    { label: "Videos", href: "/videos" },
    { label: "Reviews", href: "/reviews" },
    { label: "Contact", href: "/contact" },
  ],
  stats: [
    { value: "120+", label: "Weddings documented" },
    { value: "14", label: "Countries" },
    { value: "11", label: "Years behind the lens" },
    { value: "38", label: "Films scored & edited" },
  ],
  press: [
    "Vogue Weddings",
    "Harper's Bazaar",
    "Condé Nast Traveller",
    "Brides",
    "Over The Moon",
    "The Wedded",
  ],
};

export const whatsappHref = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
  site.whatsappMessage,
)}`;

export const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  site.address.join(", "),
)}`;

export const footerLinks = [
  {
    heading: "Explore",
    links: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Services", href: "/services" },
      { label: "Portfolio", href: "/portfolio" },
    ],
  },
  {
    heading: "More",
    links: [
      { label: "Gallery", href: "/gallery" },
      { label: "Videos", href: "/videos" },
      { label: "Reviews", href: "/reviews" },
      { label: "FAQ", href: "/faq" },
      { label: "Contact", href: "/contact" },
    ],
  },
];
