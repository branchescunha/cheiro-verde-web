import test from "node:test";
import assert from "node:assert/strict";
import { siteLinks } from "./site-links.ts";

const expectedMessages = {
  general:
    "Olá! Vi o site do Cheiro Verde e gostaria de mais informações.",
  lunchboxes:
    "Olá! Vi as marmitas no site do Cheiro Verde e gostaria de fazer um pedido.",
  fit:
    "Olá! Vi a marmita Fit no site do Cheiro Verde e gostaria de pedir uma por R$ 32,00.",
  daily:
    "Olá! Vi a Marmita do Dia no site do Cheiro Verde e gostaria de pedir uma por R$ 35,00.",
  barbecue:
    "Olá! Vi a marmita Churrasco no site do Cheiro Verde e gostaria de pedir uma por R$ 42,00.",
  premiumBarbecue:
    "Olá! Vi a marmita Churrasco Premium no site do Cheiro Verde e gostaria de pedir uma por R$ 52,00.",
};

function assertWhatsAppLink(href, number, message) {
  const url = new URL(href);

  assert.equal(url.origin, "https://wa.me");
  assert.equal(url.pathname, `/${number}`);
  assert.equal(url.searchParams.get("text"), message);
}

test("centralizes the general WhatsApp destination and exact message", () => {
  assertWhatsAppLink(
    siteLinks.whatsApp.general,
    "5561984163455",
    expectedMessages.general,
  );
});

test("centralizes the generic lunchbox destination and exact message", () => {
  assertWhatsAppLink(
    siteLinks.whatsApp.lunchboxes.general,
    "5561984901611",
    expectedMessages.lunchboxes,
  );
});

test("centralizes every individual lunchbox message", () => {
  assertWhatsAppLink(
    siteLinks.whatsApp.lunchboxes.options.fit,
    "5561984901611",
    expectedMessages.fit,
  );
  assertWhatsAppLink(
    siteLinks.whatsApp.lunchboxes.options["marmita-do-dia"],
    "5561984901611",
    expectedMessages.daily,
  );
  assertWhatsAppLink(
    siteLinks.whatsApp.lunchboxes.options.churrasco,
    "5561984901611",
    expectedMessages.barbecue,
  );
  assertWhatsAppLink(
    siteLinks.whatsApp.lunchboxes.options["churrasco-premium"],
    "5561984901611",
    expectedMessages.premiumBarbecue,
  );
});

test("builds the Google Maps destination for the confirmed Cheiro Verde place", () => {
  const url = new URL(siteLinks.googleMaps);

  assert.equal(url.origin, "https://www.google.com");
  assert.equal(url.pathname, "/maps/search/");
  assert.equal(url.searchParams.get("api"), "1");
  assert.equal(
    url.searchParams.get("query"),
    "Restaurante Cheiro Verde, QNO 05, Conjunto P, Casa 47, Setor O, Ceilândia - DF, CEP 72255-060",
  );
  assert.equal(
    url.searchParams.get("query_place_id"),
    "ChIJm0MFO4PLW5MRMkjhZRmyjPw",
  );
});
