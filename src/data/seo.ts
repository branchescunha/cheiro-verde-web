import { siteContent, siteRoutes } from "@/data/site";
import { siteLinks } from "@/data/site-links";
import type {
  RestaurantStructuredDataInput,
  SeoConfig,
} from "@/lib/seo";

const siteUrl = "https://restaurantecheiroverdedf.com.br";

export const seoConfig = {
  siteUrl,
  siteName: siteContent.brand.fullName,
  locale: "pt_BR",
  socialImage: {
    url: new URL("/media/brand/cheiro-verde-social-preview.png", siteUrl).toString(),
    width: 1200,
    height: 630,
    alt: siteContent.brand.fullName,
  },
  logoUrl: new URL("/media/brand/cheiro-verde-logo-light.png", siteUrl).toString(),
  menuUrl: new URL(siteRoutes.menu, siteUrl).toString(),
  restaurantOpeningDays: [
    "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday",
  ],
} as const satisfies SeoConfig;

export const restaurantSeoData = {
  name: siteContent.brand.fullName,
  alternateNames: siteContent.brand.alternativeNames,
  legalName: siteContent.legal.businessName,
  email: siteContent.contacts.email.address,
  foundingDate: "1999",
  description: "Restaurante Cheiro Verde no Setor O, em Ceilândia, com tradição, variedade e qualidade desde 1999.",
  telephone: [
    `+55${siteContent.contacts.generalWhatsApp.display.replace(/\D/g, "")}`,
    `+55${siteContent.contacts.lunchboxWhatsApp.display.replace(/\D/g, "")}`,
  ],
  instagramUrl: siteContent.contacts.instagram.href,
  mapUrl: siteLinks.googleMaps,
  images: [new URL("/media/photos/desktop/facade-wide-desktop.png", siteUrl).toString()],
  openingHours: {
    opens: siteContent.restaurantHours.opensAt,
    closes: siteContent.restaurantHours.closesAt,
  },
  address: {
    streetAddress: `${siteContent.address.line1}, Setor O`,
    postalCode: siteContent.address.postalCode,
    addressLocality: "Ceilândia",
    addressRegion: "DF",
    addressCountry: "BR",
  },
} as const satisfies RestaurantStructuredDataInput;
