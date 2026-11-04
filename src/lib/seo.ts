import type { Metadata } from "next";

export type SeoConfig = {
  siteUrl?: string;
  siteName: string;
  locale: string;
  socialImage?: {
    url: string;
    width: number;
    height: number;
    alt: string;
  };
  logoUrl?: string;
  menuUrl?: string;
  restaurantOpeningDays?: readonly string[];
};

export type PageMetadataInput = {
  title: string;
  description: string;
  path: `/${string}` | "/";
  absoluteTitle?: boolean;
};

export type RestaurantStructuredDataInput = {
  name: string;
  alternateNames: readonly string[];
  legalName?: string;
  email?: string;
  foundingDate?: string;
  description?: string;
  telephone?: string | readonly string[];
  images?: readonly string[];
  mapUrl?: string;
  instagramUrl?: string;
  address: {
    streetAddress: string;
    postalCode?: string;
    addressLocality: string;
    addressRegion: string;
    addressCountry: string;
  };
  openingHours?: {
    opens: string;
    closes: string;
  };
};

export function createPageMetadata(
  {
    title,
    description,
    path,
    absoluteTitle = false,
  }: PageMetadataInput,
  config: SeoConfig,
): Metadata {
  const canonicalUrl = config.siteUrl
    ? new URL(path, config.siteUrl).toString()
    : undefined;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    ...(canonicalUrl ? { alternates: { canonical: canonicalUrl } } : {}),
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      type: "website",
      locale: config.locale,
      ...(canonicalUrl ? { url: canonicalUrl } : {}),
      siteName: config.siteName,
      title,
      description,
      ...(config.socialImage ? { images: [config.socialImage] } : {}),
    },
    twitter: {
      card: config.socialImage ? "summary_large_image" : "summary",
      title,
      description,
      ...(config.socialImage ? { images: [config.socialImage.url] } : {}),
    },
  };
}

export function createRestaurantStructuredData(
  {
    name,
    alternateNames,
    legalName,
    email,
    foundingDate,
    description,
    telephone,
    images,
    mapUrl,
    instagramUrl,
    address,
    openingHours,
  }: RestaurantStructuredDataInput,
  config: SeoConfig,
) {
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    ...(config.siteUrl ? { "@id": `${config.siteUrl}/#restaurant` } : {}),
    name,
    ...(description ? { description } : {}),
    alternateName: alternateNames,
    ...(legalName ? { legalName } : {}),
    ...(email ? { email } : {}),
    ...(foundingDate ? { foundingDate } : {}),
    ...(config.siteUrl ? { url: config.siteUrl } : {}),
    ...(images ? { image: images } : config.socialImage ? { image: config.socialImage.url } : {}),
    ...(mapUrl ? { hasMap: mapUrl } : {}),
    ...(config.logoUrl ? { logo: config.logoUrl } : {}),
    ...(telephone ? { telephone } : {}),
    ...(instagramUrl ? { sameAs: [instagramUrl] } : {}),
    ...(config.menuUrl ? { menu: config.menuUrl } : {}),
    address: {
      "@type": "PostalAddress",
      ...address,
    },
    ...(openingHours && config.restaurantOpeningDays
      ? {
          openingHoursSpecification: [
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: config.restaurantOpeningDays,
              opens: openingHours.opens,
              closes: openingHours.closes,
            },
          ],
        }
      : {}),
  };
}

export function serializeJsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
