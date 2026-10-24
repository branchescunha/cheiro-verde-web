import test from "node:test";
import assert from "node:assert/strict";
import { restaurantContent } from "./restaurant.ts";

test("uses the confirmed delivery hours", () => {
  assert.deepEqual(restaurantContent.delivery.hours, {
    opensAt: "11:00",
    closesAt: "15:00",
    opensAtLabel: "11h",
    closesAtLabel: "15h",
  });
});

test("uses the confirmed delivery fees", () => {
  assert.deepEqual(
    restaurantContent.delivery.areas.map((area) => [
      area.name,
      area.fee.amountInCents,
      area.fee.status,
    ]),
    [
      ["Setor O", 500, "confirmed"],
      ["Ceilândia", 1000, "confirmed"],
    ],
  );
});

test("exposes the four confirmed lunchboxes with complete content", () => {
  assert.deepEqual(restaurantContent.lunchboxes.options, [
    {
      id: "fit",
      name: "Fit",
      description: "Para quem busca uma refeição mais leve e equilibrada.",
      composition: [
        "Filé de peito de frango",
        "Pequena porção de arroz",
        "3 acompanhamentos fit",
        "Legumes e saladas",
        "Salada servida à parte",
      ],
      price: {
        amountInCents: 3200,
        currency: "BRL",
        status: "confirmed",
      },
    },
    {
      id: "marmita-do-dia",
      name: "Marmita do Dia",
      description: "A opção completa e saborosa para o almoço do dia a dia.",
      composition: [
        "Proteína do dia",
        "Arroz",
        "Feijão",
        "2 acompanhamentos",
        "Salada servida à parte",
      ],
      price: {
        amountInCents: 3500,
        currency: "BRL",
        status: "confirmed",
      },
    },
    {
      id: "churrasco",
      name: "Churrasco",
      description:
        "Para quem não abre mão daquele sabor de churrasco no almoço.",
      composition: [
        "Proteína de churrasco",
        "Arroz",
        "Feijão",
        "2 acompanhamentos",
        "Salada servida à parte",
      ],
      price: {
        amountInCents: 4200,
        currency: "BRL",
        status: "confirmed",
      },
    },
    {
      id: "churrasco-premium",
      name: "Churrasco Premium",
      description:
        "Uma experiência mais especial, com cortes premium de churrasco.",
      composition: [
        "Proteína premium",
        "Arroz",
        "Feijão",
        "2 acompanhamentos",
        "Salada servida à parte",
      ],
      price: {
        amountInCents: 5200,
        currency: "BRL",
        status: "confirmed",
      },
    },
  ]);
});

test("keeps the two historical Maury and Mauri names distinct", () => {
  assert.deepEqual(restaurantContent.history.founders, [
    "Maury Alves da Cunha",
    "Marcilon Silva Cunha",
    "Mauri Anderson Silva Cunha",
  ]);
  assert.deepEqual(restaurantContent.history.leadershipTransition.leaders, [
    "Mauri Anderson Silva Cunha",
    "Alane",
  ]);
});
