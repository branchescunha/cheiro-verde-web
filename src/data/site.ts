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
    primaryName: "Cheiro Verde",
    fullName: "Restaurante Cheiro Verde",
    alternativeNames: ["Cheiro Verde"],
  },
  tagline: "Comida feita com cuidado para reunir pessoas à mesa.",
  legal: {
    businessName: "RESTAURANTE CHEIRO VERDE SELF SERVICE LTDA",
    cnpj: "68.017.002/0001-27",
  },
  address: {
    line1: "QNO 05, Conjunto P, Casa 47",
    line2: "Setor O, Ceilândia - DF",
    postalCode: "72255-060",
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
      handle: "@restaurantecheiroverdedf",
      href: "https://www.instagram.com/restaurantecheiroverdedf/" satisfies HttpsUrl,
      label: "Instagram",
    },
    email: {
      address: "cheiroverdesetoro@gmail.com",
      href: "mailto:cheiroverdesetoro@gmail.com" satisfies MailtoUrl,
    },
  },
  externalLinks: {
    buffet: {
      label: "Paladar Buffet",
      href: "https://buffetpaladar.com.br/" satisfies HttpsUrl,
    },
  },
} as const;
