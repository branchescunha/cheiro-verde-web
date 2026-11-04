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
  siteName: "Restaurante Teste",
  locale: "pt_BR",
  socialImage: {
    url: socialImageUrl,
    width: 1200,
    height: 630,
    alt: "Restaurante Teste",
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
      description: "Consulte as bebidas e sobremesas disponíveis no restaurante.",
      path: "/cardapio",
    },
    seoConfig,
  );

  assert.equal(
    metadata.alternates?.canonical,
    `${testOrigin}/cardapio`,
  );
  assert.equal(metadata.openGraph?.url, `${testOrigin}/cardapio`);
  assert.equal(metadata.openGraph?.siteName, "Restaurante Teste");
  assert.equal(metadata.openGraph?.title, metadata.title);
  assert.equal(metadata.openGraph?.description, metadata.description);
  assert.deepEqual(metadata.openGraph?.images, [
    {
      url: socialImageUrl,
      width: 1200,
      height: 630,
      alt: "Restaurante Teste",
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
      title: "Restaurante Teste | Almoço em Ceilândia",
      description: "Restaurante Teste em Ceilândia.",
      path: "/",
      absoluteTitle: true,
    },
    seoConfig,
  );

  assert.deepEqual(metadata.title, {
    absolute: "Restaurante Teste | Almoço em Ceilândia",
  });
});

test("omits absolute URLs when the definitive domain is unavailable", () => {
  const metadata = createPageMetadata(
    {
      title: "Restaurante Cheiro Verde",
      description: "Restaurante Cheiro Verde em Ceilândia.",
      path: "/",
      absoluteTitle: true,
    },
    {
      siteName: "Restaurante Cheiro Verde",
      locale: "pt_BR",
    },
  );

  assert.equal(metadata.alternates, undefined);
  assert.equal(metadata.openGraph?.url, undefined);
  assert.equal(metadata.openGraph?.images, undefined);
  assert.equal(metadata.twitter?.images, undefined);
});

test("creates structured data without pending contact and schedule fields", () => {
  const structuredData = createRestaurantStructuredData(
    {
      name: "Restaurante Cheiro Verde",
      alternateNames: ["Cheiro Verde"],
      legalName: "RESTAURANTE CHEIRO VERDE SELF SERVICE LTDA",
      email: "cheiroverdesetoro@gmail.com",
      foundingDate: "1999",
      address: {
        streetAddress: "QNO 05, Conjunto P, Casa 47, Setor O",
        postalCode: "72255-060",
        addressLocality: "Ceilândia",
        addressRegion: "DF",
        addressCountry: "BR",
      },
    },
    {
      siteName: "Restaurante Cheiro Verde",
      locale: "pt_BR",
    },
  );

  assert.equal(structuredData.legalName, "RESTAURANTE CHEIRO VERDE SELF SERVICE LTDA");
  assert.equal(structuredData.email, "cheiroverdesetoro@gmail.com");
  assert.equal(structuredData.foundingDate, "1999");
  assert.equal("url" in structuredData, false);
  assert.equal("telephone" in structuredData, false);
  assert.equal("sameAs" in structuredData, false);
  assert.equal("openingHoursSpecification" in structuredData, false);
  assert.deepEqual(structuredData.address, {
    "@type": "PostalAddress",
    streetAddress: "QNO 05, Conjunto P, Casa 47, Setor O",
    postalCode: "72255-060",
    addressLocality: "Ceilândia",
    addressRegion: "DF",
    addressCountry: "BR",
  });
});

test("creates Restaurant structured data with only confirmed local data", () => {
  const structuredData = createRestaurantStructuredData(
    {
      name: "Restaurante Teste",
      alternateNames: ["Restaurante Teste Prime"],
      description: "Restaurante em Ceilândia.",
      images: [`${testOrigin}/facade.png`],
      mapUrl: "https://www.google.com/maps/search/?api=1&query=Restaurante",
      telephone: "+5561984163455",
      instagramUrl: "https://www.instagram.com/restaurante-teste/",
      address: {
        streetAddress: "Rua de Teste, 100",
        addressLocality: "Ceilândia",
        addressRegion: "DF",
        addressCountry: "BR",
      },
      openingHours: {
        opens: "09:00",
        closes: "18:00",
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
    "https://www.instagram.com/restaurante-teste/",
  ]);
  assert.deepEqual(structuredData.address, {
    "@type": "PostalAddress",
    streetAddress: "Rua de Teste, 100",
    addressLocality: "Ceilândia",
    addressRegion: "DF",
    addressCountry: "BR",
  });
  assert.deepEqual(structuredData.image, [`${testOrigin}/facade.png`]);
  assert.equal(structuredData.description, "Restaurante em Ceilândia.");
  assert.equal(structuredData.hasMap, "https://www.google.com/maps/search/?api=1&query=Restaurante");
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
      opens: "09:00",
      closes: "18:00",
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
    serializeJsonLd({ name: "Teste </script><script>alert(1)</script>" }),
    '{"name":"Teste \\u003c/script>\\u003cscript>alert(1)\\u003c/script>"}',
  );
});
