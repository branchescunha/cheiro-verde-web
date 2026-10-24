import { siteContent } from "@/data/site";
import type {
  RestaurantStructuredDataInput,
  SeoConfig,
} from "@/lib/seo";

const siteUrl = "https://churrascariapaladar.com.br";

export const seoConfig = {
  siteUrl,
  siteName: "Restaurante Paladar",
  locale: "pt_BR",
  socialImage: {
    url: `${siteUrl}/images/brand/paladar-social-preview.jpg`,
    width: 1200,
    height: 630,
    alt: "Restaurante Paladar",
  },
  logoUrl: `${siteUrl}/images/brand/paladar-logo-transparent.png`,
  menuUrl: `${siteUrl}/cardapio`,
  restaurantOpeningDays: [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ],
} as const satisfies SeoConfig;

export const restaurantSeoData = {
  name: "Restaurante Paladar",
  alternateNames: [
    siteContent.brand.primaryName,
    "Paladar Prime Restaurante",
  ],
  telephone: "+5561984163455",
  instagramUrl: siteContent.contacts.instagram.href,
  address: {
    streetAddress: `${siteContent.address.line1}, Avenida Oeste, Setor O`,
    addressLocality: "Ceilândia",
    addressRegion: "DF",
    addressCountry: "BR",
  },
  openingHours: {
    opens: siteContent.restaurantHours.opensAt,
    closes: siteContent.restaurantHours.closesAt,
  },
} as const satisfies RestaurantStructuredDataInput;
