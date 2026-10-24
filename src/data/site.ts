import { siteLinks } from "@/data/site-links";

export type HttpsUrl = `https://${string}`;
export type MailtoUrl = `mailto:${string}`;

export const siteRoutes = {
  home: "/",
  menu: "/cardapio",
  lunchboxes: "/marmitas",
  about: "/sobre",
  buffet: "/buffet",
  contact: "/contato",
} as const;

export const homeStartHref = "/#inicio" as const;

export type SiteRoute = (typeof siteRoutes)[keyof typeof siteRoutes];

type NavigationItem = {
  label: string;
  href: SiteRoute;
};

export const navigationItems = [
  { label: "Cardápio", href: siteRoutes.menu },
  { label: "Marmitas", href: siteRoutes.lunchboxes },
  { label: "Sobre", href: siteRoutes.about },
  { label: "Buffet", href: siteRoutes.buffet },
  { label: "Contato", href: siteRoutes.contact },
] as const satisfies readonly NavigationItem[];

export const siteContent = {
  brand: {
    primaryName: "Paladar",
    alternativeNames: ["Restaurante Paladar", "Paladar Prime Restaurante"],
  },
  tagline: "Comida feita com cuidado para reunir pessoas à mesa.",
  legal: {
    cnpj: "03.259.872/0001-67",
  },
  address: {
    line1: "QNO 11 Conjunto O Casa 16",
    line2: "Avenida Oeste, Setor O, Ceilândia - DF",
  },
  restaurantHours: {
    days: "Todos os dias",
    opensAt: "11:30",
    closesAt: "15:00",
    opensAtLabel: "11h30",
    closesAtLabel: "15h",
  },
  contacts: {
    generalWhatsApp: {
      display: "(61) 98416-3455",
    },
    lunchboxWhatsApp: {
      display: "(61) 98490-1611",
    },
    instagram: {
      handle: "@paladarprimerestaurante",
      href: "https://www.instagram.com/paladarprimerestaurante/" satisfies HttpsUrl,
    },
    email: {
      address: "churrascaria.paladar.df@gmail.com",
      href: "mailto:churrascaria.paladar.df@gmail.com" satisfies MailtoUrl,
    },
  },
  externalLinks: {
    googleMaps: {
      label: "Paladar Prime Restaurante no Google Maps",
      href: siteLinks.googleMaps,
    },
    buffet: {
      label: "Paladar Buffet",
      href: "https://buffetpaladar.com.br/" satisfies HttpsUrl,
    },
  },
} as const;
