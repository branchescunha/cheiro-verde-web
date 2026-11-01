type HttpsUrl = `https://${string}`;

const whatsAppNumbers = {
  general: "5561984163455",
  lunchboxes: "5561984901611",
} as const;

export const whatsAppMessages = {
  general: "Olá! Vi o site do Cheiro Verde e gostaria de mais informações.",
  lunchboxes: {
    general:
      "Olá! Vi as marmitas no site do Cheiro Verde e gostaria de fazer um pedido.",
    options: {
      fit:
        "Olá! Vi a marmita Fit no site do Cheiro Verde e gostaria de pedir uma por R$ 32,00.",
      "marmita-do-dia":
        "Olá! Vi a Marmita do Dia no site do Cheiro Verde e gostaria de pedir uma por R$ 35,00.",
      churrasco:
        "Olá! Vi a marmita Churrasco no site do Cheiro Verde e gostaria de pedir uma por R$ 42,00.",
      "churrasco-premium":
        "Olá! Vi a marmita Churrasco Premium no site do Cheiro Verde e gostaria de pedir uma por R$ 52,00.",
    },
  },
} as const;

export function buildWhatsAppUrl(number: string, message: string): HttpsUrl {
  const searchParams = new URLSearchParams({ text: message });

  return `https://wa.me/${number}?${searchParams.toString()}`;
}

export function buildGoogleMapsUrl(query: string, placeId: string): HttpsUrl {
  const searchParams = new URLSearchParams({
    api: "1",
    query,
    query_place_id: placeId,
  });

  return `https://www.google.com/maps/search/?${searchParams.toString()}`;
}

export const siteLinks = {
  whatsApp: {
    general: buildWhatsAppUrl(
      whatsAppNumbers.general,
      whatsAppMessages.general,
    ),
    lunchboxes: {
      general: buildWhatsAppUrl(
        whatsAppNumbers.lunchboxes,
        whatsAppMessages.lunchboxes.general,
      ),
      options: {
        fit: buildWhatsAppUrl(
          whatsAppNumbers.lunchboxes,
          whatsAppMessages.lunchboxes.options.fit,
        ),
        "marmita-do-dia": buildWhatsAppUrl(
          whatsAppNumbers.lunchboxes,
          whatsAppMessages.lunchboxes.options["marmita-do-dia"],
        ),
        churrasco: buildWhatsAppUrl(
          whatsAppNumbers.lunchboxes,
          whatsAppMessages.lunchboxes.options.churrasco,
        ),
        "churrasco-premium": buildWhatsAppUrl(
          whatsAppNumbers.lunchboxes,
          whatsAppMessages.lunchboxes.options["churrasco-premium"],
        ),
      },
    },
  },
  googleMaps: buildGoogleMapsUrl(
    "Restaurante Cheiro Verde, QNO 05, Conjunto P, Casa 47, Setor O, Ceilândia - DF, CEP 72255-060",
    "ChIJm0MFO4PLW5MRMkjhZRmyjPw",
  ),
} as const;
