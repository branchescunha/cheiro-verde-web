import test from "node:test";
import assert from "node:assert/strict";
import { siteContent } from "./site.ts";
import { siteLinks } from "./site-links.ts";

test("centralizes the confirmed Cheiro Verde institutional data", () => {
  assert.deepEqual(siteContent.brand, {
    primaryName: "Cheiro Verde",
    fullName: "Restaurante Cheiro Verde",
    alternativeNames: ["Cheiro Verde"],
  });
  assert.deepEqual(siteContent.legal, {
    businessName: "RESTAURANTE CHEIRO VERDE SELF SERVICE LTDA",
    cnpj: "68.017.002/0001-27",
  });
  assert.deepEqual(siteContent.address, {
    line1: "QNO 05, Conjunto P, Casa 47",
    line2: "Setor O, Ceilândia - DF",
    postalCode: "72255-060",
  });
  assert.deepEqual(siteContent.contacts.email, {
    address: "cheiroverdesetoro@gmail.com",
    href: "mailto:cheiroverdesetoro@gmail.com",
  });
});

test("centralizes the confirmed operational channels and schedule", () => {
  assert.deepEqual(siteContent.restaurantHours, {
    days: "Todos os dias",
    opensAt: "11:30",
    closesAt: "15:00",
    opensAtLabel: "11h30",
    closesAtLabel: "15h",
  });
  assert.deepEqual(siteContent.contacts.instagram, {
    handle: "@restaurantecheiroverdedf",
    href: "https://www.instagram.com/restaurantecheiroverdedf/",
    label: "Instagram",
  });
  assert.equal("googleMaps" in siteContent.externalLinks, false);
  assert.ok(siteLinks.googleMaps.startsWith("https://www.google.com/maps/"));
});

test("keeps the confirmed shared WhatsApp numbers", () => {
  assert.deepEqual(siteContent.contacts.generalWhatsApp, {
    display: "(61) 98416-3455",
  });
  assert.deepEqual(siteContent.contacts.lunchboxWhatsApp, {
    display: "(61) 98490-1611",
  });
});
