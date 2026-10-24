import test from "node:test";
import assert from "node:assert/strict";
import {
  createPageMetadata,
  createRestaurantStructuredData,
  serializeJsonLd,
} from "./seo.ts";

const testOrigin = "https://example.test";
const socialImageUrl = `${testOrigin}/social-preview.jpg`;
const seoConfig = {
  siteUrl: testOrigin,
  siteName: "Paladar Teste",
  locale: "pt_BR",
  socialImage: {
    url: socialImageUrl,
    width: 1200,
    height: 630,
    alt: "Paladar Teste",
  },
  logoUrl: `${testOrigin}/logo.png`,
  menuUrl: `${testOrigin}/cardapio`,
  restaurantOpeningDays: [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ],
};

test("builds route metadata from the supplied SEO configuration", () => {
  const metadata = createPageMetadata(
    {
      title: "Cardápio de bebidas e sobremesas em Ceilândia",
      description: "Consulte as bebidas e sobremesas disponíveis no Paladar.",
      path: "/cardapio",
    },
    seoConfig,
  );

  assert.equal(
    metadata.alternates?.canonical,
    `${testOrigin}/cardapio`,
  );
  assert.equal(metadata.openGraph?.url, `${testOrigin}/cardapio`);
  assert.equal(metadata.openGraph?.siteName, "Paladar Teste");
  assert.equal(metadata.openGraph?.title, metadata.title);
  assert.equal(metadata.openGraph?.description, metadata.description);
  assert.deepEqual(metadata.openGraph?.images, [
    {
      url: socialImageUrl,
      width: 1200,
      height: 630,
      alt: "Paladar Teste",
    },
  ]);
  assert.equal(metadata.twitter?.card, "summary_large_image");
  assert.deepEqual(metadata.twitter?.images, [socialImageUrl]);
  assert.deepEqual(metadata.robots, {
    index: true,
    follow: true,
  });
});

test("supports an absolute Home title without applying the global template", () => {
  const metadata = createPageMetadata(
    {
      title: "Restaurante Paladar | Almoço em Ceilândia",
      description: "Restaurante Paladar em Ceilândia.",
      path: "/",
      absoluteTitle: true,
    },
    seoConfig,
  );

  assert.deepEqual(metadata.title, {
    absolute: "Restaurante Paladar | Almoço em Ceilândia",
  });
});

test("creates Restaurant structured data with only confirmed local data", () => {
  const structuredData = createRestaurantStructuredData(
    {
      name: "Restaurante Paladar",
      alternateNames: ["Paladar", "Paladar Prime Restaurante"],
      telephone: "+5561984163455",
      instagramUrl: "https://www.instagram.com/paladarprimerestaurante/",
      address: {
        streetAddress: "QNO 11 Conjunto O Casa 16, Avenida Oeste, Setor O",
        addressLocality: "Ceilândia",
        addressRegion: "DF",
        addressCountry: "BR",
      },
      openingHours: {
        opens: "11:30",
        closes: "15:00",
      },
    },
    seoConfig,
  );

  assert.equal(structuredData["@context"], "https://schema.org");
  assert.equal(structuredData["@type"], "Restaurant");
  assert.equal(structuredData["@id"], `${testOrigin}/#restaurant`);
  assert.equal(structuredData.url, testOrigin);
  assert.equal(structuredData.telephone, "+5561984163455");
  assert.deepEqual(structuredData.sameAs, [
    "https://www.instagram.com/paladarprimerestaurante/",
  ]);
  assert.deepEqual(structuredData.address, {
    "@type": "PostalAddress",
    streetAddress: "QNO 11 Conjunto O Casa 16, Avenida Oeste, Setor O",
    addressLocality: "Ceilândia",
    addressRegion: "DF",
    addressCountry: "BR",
  });
  assert.equal(structuredData.image, socialImageUrl);
  assert.equal(structuredData.logo, `${testOrigin}/logo.png`);
  assert.equal(structuredData.menu, `${testOrigin}/cardapio`);
  assert.deepEqual(structuredData.openingHoursSpecification, [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "11:30",
      closes: "15:00",
    },
  ]);

  for (const unsupportedProperty of [
    "geo",
    "aggregateRating",
    "review",
    "priceRange",
    "postalCode",
  ]) {
    assert.equal(unsupportedProperty in structuredData, false);
  }
});

test("escapes HTML-significant characters when serializing JSON-LD", () => {
  assert.equal(
    serializeJsonLd({ name: "Paladar </script><script>alert(1)</script>" }),
    '{"name":"Paladar \\u003c/script>\\u003cscript>alert(1)\\u003c/script>"}',
  );
});
