import test from "node:test";
import assert from "node:assert/strict";
import { beverageCategories } from "./menu.ts";

function getCategory(id) {
  const category = beverageCategories.find((item) => item.id === id);

  assert.ok(category, `Missing category: ${id}`);
  return category;
}

function getPresentation(option) {
  return [option.label, option.size].filter(Boolean).join(" ");
}

test("standardizes every natural juice as 300 ml cup and 750 ml pitcher", () => {
  const naturalJuices = getCategory("sucos-naturais");

  for (const item of naturalJuices.items) {
    assert.deepEqual(
      item.options.map(getPresentation),
      ["Copo 300 ml", "Jarra 750 ml"],
      item.name,
    );
  }
});

test("standardizes every pulp juice as 300 ml cup and 750 ml pitcher", () => {
  const pulpJuices = getCategory("sucos-de-polpa");

  for (const item of pulpJuices.items) {
    assert.deepEqual(
      item.options.map(getPresentation),
      ["Copo 300 ml", "Jarra 750 ml"],
      item.name,
    );
  }
});

test("uses professional unit formatting for every known beverage size", () => {
  const sizePattern = /^(?:(?:PET|KS|Lata|Long Neck) )?\d+(?:,\d+)? (?:ml|L)$/;

  for (const category of beverageCategories) {
    for (const item of category.items) {
      for (const option of item.options) {
        if (option.size) {
          assert.match(option.size, sizePattern, `${item.name}: ${option.size}`);
        }
      }
    }
  }
});

test("keeps products with unknown presentation explicit instead of inventing one", () => {
  const softDrinks = getCategory("refrigerantes");
  const unknownPresentations = softDrinks.items
    .filter((item) => item.options.some((option) => !getPresentation(option)))
    .map((item) => item.name);

  assert.deepEqual(unknownPresentations, [
    "Schweppes Citrus",
    "Schweppes Tônica",
    "Monster",
    "H2O limão/limoneto",
    "Água sem gás",
    "Água com gás",
    "Água saborizada",
    "Shot de limão",
  ]);
});

test("groups soft drink families in the confirmed professional order", () => {
  const softDrinks = getCategory("refrigerantes");

  assert.deepEqual(
    softDrinks.items.map((item) => [
      item.name,
      getPresentation(item.options[0]) || "—",
      item.options[0].price.amountInCents,
    ]),
    [
      ["Coca-Cola", "PET 200 ml", 450],
      ["Coca-Cola", "KS 290 ml", 600],
      ["Coca-Cola", "Lata 310 ml", 650],
      ["Coca-Cola", "600 ml", 900],
      ["Coca-Cola", "1 L", 1000],
      ["Coca-Cola", "1,5 L", 1200],
      ["Coca-Cola", "2 L", 1400],
      ["Fanta sabores", "Lata 310 ml", 650],
      ["Fanta sabores", "2 L", 1400],
      ["Sprite", "KS 290 ml", 600],
      ["Guaraná", "Lata", 650],
      ["Guaraná", "600 ml", 900],
      ["Guaraná", "1 L", 1000],
      ["Guaraná", "1,5 L", 1200],
      ["Guaraná", "2 L", 1400],
      ["Schweppes Citrus", "—", 700],
      ["Schweppes Tônica", "—", 750],
      ["Monster", "—", 1200],
      ["H2O limão/limoneto", "—", 750],
      ["Água sem gás", "—", 400],
      ["Água com gás", "—", 450],
      ["Água saborizada", "—", 600],
      ["Shot de limão", "—", 200],
    ],
  );
});

test("groups beer families without including the lemon shot", () => {
  const beers = getCategory("cervejas");

  assert.deepEqual(
    beers.items.map((item) => [
      item.name,
      getPresentation(item.options[0]),
      item.options[0].price.amountInCents,
    ]),
    [
      ["Brahma Chopp", "350 ml", 600],
      ["Brahma Duplo Malte", "350 ml", 600],
      ["Antarctica", "350 ml", 600],
      ["Budweiser", "350 ml", 600],
      ["Original", "269 ml", 500],
      ["Amstel Ultra", "275 ml", 700],
      ["Amstel", "350 ml", 600],
      ["Amstel Long Neck", "355 ml", 500],
      ["Amstel", "600 ml", 1400],
      ["Heineken Long Neck", "330 ml", 900],
      ["Heineken", "600 ml", 1800],
    ],
  );
});
