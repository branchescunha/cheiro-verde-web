import { siteContent } from "@/data/site";
import type {
  RestaurantStructuredDataInput,
  SeoConfig,
} from "@/lib/seo";

export const seoConfig = {
  siteName: siteContent.brand.fullName,
  locale: "pt_BR",
} as const satisfies SeoConfig;

export const restaurantSeoData = {
  name: siteContent.brand.fullName,
  alternateNames: siteContent.brand.alternativeNames,
  legalName: siteContent.legal.businessName,
  email: siteContent.contacts.email.address,
  foundingDate: "1999",
  address: {
    streetAddress: `${siteContent.address.line1}, Setor O`,
    postalCode: siteContent.address.postalCode,
    addressLocality: "Ceilândia",
    addressRegion: "DF",
    addressCountry: "BR",
  },
} as const satisfies RestaurantStructuredDataInput;
