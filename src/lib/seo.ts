import type { Metadata } from "next";

export type SeoConfig = {
  siteUrl: string;
  siteName: string;
  locale: string;
  socialImage: {
    url: string;
    width: number;
    height: number;
    alt: string;
  };
  logoUrl: string;
  menuUrl: string;
  restaurantOpeningDays: readonly string[];
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
  telephone: string;
  instagramUrl: string;
  address: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    addressCountry: string;
  };
  openingHours: {
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
  const canonicalUrl = new URL(path, config.siteUrl).toString();

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      type: "website",
      locale: config.locale,
      url: canonicalUrl,
      siteName: config.siteName,
      title,
      description,
      images: [config.socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [config.socialImage.url],
    },
  };
}

export function createRestaurantStructuredData(
  {
    name,
    alternateNames,
    telephone,
    instagramUrl,
    address,
    openingHours,
  }: RestaurantStructuredDataInput,
  config: SeoConfig,
) {
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": `${config.siteUrl}/#restaurant`,
    name,
    alternateName: alternateNames,
    url: config.siteUrl,
    image: config.socialImage.url,
    logo: config.logoUrl,
    telephone,
    sameAs: [instagramUrl],
    menu: config.menuUrl,
    address: {
      "@type": "PostalAddress",
      ...address,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: config.restaurantOpeningDays,
        opens: openingHours.opens,
        closes: openingHours.closes,
      },
    ],
  };
}

export function serializeJsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
