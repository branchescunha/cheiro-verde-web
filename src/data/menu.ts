import type { Money } from "@/data/restaurant";

export type MenuPriceOption = {
  label?: string;
  size?: string;
  price: Money;
};

export type MenuItem = {
  name: string;
  options: readonly MenuPriceOption[];
};

export type MenuCategory = {
  id: string;
  name: string;
  description: string;
  items: readonly MenuItem[];
};

export type DessertCategory = {
  id: string;
  name: string;
  availability: string;
};

const price = (amountInCents: number): Money => ({
  amountInCents,
  currency: "BRL",
  status: "confirmed",
});

const cupAndPitcher = (
  cupAmountInCents: number,
  pitcherAmountInCents: number,
  sizes?: { cup: string; pitcher: string },
): readonly MenuPriceOption[] => [
  {
    label: "Copo",
    size: sizes?.cup,
    price: price(cupAmountInCents),
  },
  {
    label: "Jarra",
    size: sizes?.pitcher,
    price: price(pitcherAmountInCents),
  },
];

const singleOption = (
  amountInCents: number,
  size?: string,
): readonly MenuPriceOption[] => [
  {
    size,
    price: price(amountInCents),
  },
];

const naturalJuiceOptions = (
  cupAmountInCents: number,
  pitcherAmountInCents: number,
) =>
  cupAndPitcher(cupAmountInCents, pitcherAmountInCents, {
    cup: "300 ml",
    pitcher: "750 ml",
  });

const lemonShot: MenuItem = {
  name: "Shot de limão",
  options: singleOption(200),
};

export const beverageCategories = [
  {
    id: "sucos-naturais",
    name: "Sucos naturais",
    description: "Preparados na hora, em opções de copo e jarra.",
    items: [
      {
        name: "Laranja",
        options: naturalJuiceOptions(1000, 2000),
      },
      { name: "Limão", options: naturalJuiceOptions(1000, 2000) },
      { name: "Limonada Suíça", options: naturalJuiceOptions(2000, 3000) },
      {
        name: "Abacaxi / Abacaxi com hortelã",
        options: naturalJuiceOptions(1000, 2000),
      },
      {
        name: "Laranja com beterraba",
        options: naturalJuiceOptions(1300, 2300),
      },
    ],
  },
  {
    id: "sucos-de-polpa",
    name: "Sucos de polpa",
    description: "Sabores disponíveis em copo e jarra.",
    items: [
      { name: "Uva", options: naturalJuiceOptions(1000, 2000) },
      { name: "Caju", options: naturalJuiceOptions(1000, 2000) },
      { name: "Cajá", options: naturalJuiceOptions(1000, 2000) },
      { name: "Manga", options: naturalJuiceOptions(1000, 2000) },
      { name: "Goiaba", options: naturalJuiceOptions(1000, 2000) },
      { name: "Acerola", options: naturalJuiceOptions(1000, 2000) },
      { name: "Graviola", options: naturalJuiceOptions(1000, 2000) },
      { name: "Morango", options: naturalJuiceOptions(1000, 2000) },
      { name: "Cupuaçu", options: naturalJuiceOptions(1000, 2000) },
      { name: "Maracujá", options: naturalJuiceOptions(1500, 2800) },
    ],
  },
  {
    id: "refrigerantes",
    name: "Refrigerantes",
    description: "Opções individuais e para compartilhar.",
    items: [
      { name: "Coca-Cola", options: singleOption(450, "PET 200 ml") },
      { name: "Coca-Cola", options: singleOption(600, "KS 290 ml") },
      { name: "Coca-Cola", options: singleOption(650, "Lata 310 ml") },
      { name: "Coca-Cola", options: singleOption(900, "600 ml") },
      { name: "Coca-Cola", options: singleOption(1000, "1 L") },
      { name: "Coca-Cola", options: singleOption(1200, "1,5 L") },
      { name: "Coca-Cola", options: singleOption(1400, "2 L") },
      { name: "Fanta sabores", options: singleOption(650, "Lata 310 ml") },
      { name: "Fanta sabores", options: singleOption(1400, "2 L") },
      { name: "Sprite", options: singleOption(600, "KS 290 ml") },
      {
        name: "Guaraná",
        options: [{ label: "Lata", price: price(650) }],
      },
      { name: "Guaraná", options: singleOption(900, "600 ml") },
      { name: "Guaraná", options: singleOption(1000, "1 L") },
      { name: "Guaraná", options: singleOption(1200, "1,5 L") },
      { name: "Guaraná", options: singleOption(1400, "2 L") },
      { name: "Schweppes Citrus", options: singleOption(700) },
      { name: "Schweppes Tônica", options: singleOption(750) },
      { name: "Monster", options: singleOption(1200) },
      { name: "H2O limão/limoneto", options: singleOption(750) },
      { name: "Água sem gás", options: singleOption(400) },
      { name: "Água com gás", options: singleOption(450) },
      { name: "Água saborizada", options: singleOption(600) },
      lemonShot,
    ],
  },
  {
    id: "cervejas",
    name: "Cervejas",
    description: "Rótulos em diferentes tamanhos.",
    items: [
      { name: "Brahma Chopp", options: singleOption(600, "350 ml") },
      { name: "Brahma Duplo Malte", options: singleOption(600, "350 ml") },
      { name: "Antarctica", options: singleOption(600, "350 ml") },
      { name: "Budweiser", options: singleOption(600, "350 ml") },
      { name: "Original", options: singleOption(500, "269 ml") },
      { name: "Amstel Ultra", options: singleOption(700, "275 ml") },
      { name: "Amstel", options: singleOption(600, "350 ml") },
      { name: "Amstel Long Neck", options: singleOption(500, "355 ml") },
      { name: "Amstel", options: singleOption(1400, "600 ml") },
      {
        name: "Heineken Long Neck",
        options: singleOption(900, "330 ml"),
      },
      { name: "Heineken", options: singleOption(1800, "600 ml") },
    ],
  },
] as const satisfies readonly MenuCategory[];

export const dessertCategories = [
  {
    id: "doces-e-guloseimas",
    name: "Doces e guloseimas",
    availability:
      "A seleção muda ao longo do dia. Consulte a equipe para conhecer as opções disponíveis.",
  },
  {
    id: "picoles",
    name: "Picolés",
    availability:
      "Sabores e disponibilidade podem variar. Consulte a equipe antes de escolher.",
  },
  {
    id: "cortesias-da-casa",
    name: "Cortesias da casa",
    availability:
      "As cortesias preparadas pela casa podem variar conforme o dia.",
  },
] as const satisfies readonly DessertCategory[];
