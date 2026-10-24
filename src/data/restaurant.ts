export type ContentStatus = "confirmed";
export type CurrencyCode = "BRL";

export type Money = {
  amountInCents: number;
  currency: CurrencyCode;
  status: ContentStatus;
};

type DeliveryArea = {
  name: string;
  fee: Money;
};

type LunchboxOption = {
  id: string;
  name: string;
  description: string;
  composition: readonly string[];
  price: Money;
};

export const restaurantContent = {
  service: {
    mealService: "apenas almoço",
    formats: ["self-service", "marmita montada pelo cliente no peso"],
  },
  highlights: [
    "churrasco",
    "carnes Angus / cortes nobres",
    "saladas",
    "pratos quentes",
    "carnes, frangos, linguiças e peixes",
    "marmitas da casa",
  ],
  delivery: {
    hours: {
      opensAt: "11:00",
      closesAt: "15:00",
      opensAtLabel: "11h",
      closesAtLabel: "15h",
    },
    areas: [
      {
        name: "Setor O",
        fee: {
          amountInCents: 500,
          currency: "BRL",
          status: "confirmed",
        },
      },
      {
        name: "Ceilândia",
        fee: {
          amountInCents: 1000,
          currency: "BRL",
          status: "confirmed",
        },
      },
    ] satisfies readonly DeliveryArea[],
  },
  benefits: {
    birthday: {
      audience: "aniversariante do dia",
      discountPercentage: 50,
      appliesTo: "somente o próprio prato",
    },
    uniformedPersonnel: {
      conditions: ["fardados", "em serviço"],
      offer: "prato à vontade",
      price: {
        amountInCents: 4000,
        currency: "BRL",
        status: "confirmed",
      } satisfies Money,
      eligibleGroups: [
        "Policiais",
        "Bombeiros",
        "Exército",
        "Marinha",
        "Aeronáutica",
        "Agentes Penitenciários",
      ],
    },
  },
  lunchboxes: {
    options: [
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
    ] satisfies readonly LunchboxOption[],
  },
  history: {
    foundation: {
      month: "junho",
      year: 1998,
      location: "Setor O, Ceilândia",
    },
    familyBusiness: true,
    founders: [
      "Maury Alves da Cunha",
      "Marcilon Silva Cunha",
      "Mauri Anderson Silva Cunha",
    ],
    leadershipTransition: {
      period: "2001/2002",
      leaders: ["Mauri Anderson Silva Cunha", "Alane"],
      relationship: "casal",
      developments: [
        "novos investimentos",
        "melhorias",
        "crescimento da estrutura",
      ],
    },
    evolution: {
      developments: [
        "ampliação do espaço",
        "mais variedade",
        "melhorias na experiência",
      ],
      preservedValue: "essência familiar",
    },
    renovation: {
      year: 2022,
      developments: [
        "uma grande reforma",
        "fortalecimento do churrasco selecionado",
        "introdução e fortalecimento de carnes nobres e cortes Angus",
      ],
    },
    present: {
      locationRole: "parte da rotina de Ceilândia",
      service: "almoço todos os dias",
      continuity: "tradição familiar desde 1998",
    },
    legacy: "tradição familiar e presença em Ceilândia desde 1998",
  },
} as const;
