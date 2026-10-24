type HttpsUrl = `https://${string}`;

const whatsAppNumbers = {
  general: "5561984163455",
  lunchboxes: "5561984901611",
} as const;

export const whatsAppMessages = {
  general: "Olá! Vi o site do Paladar e gostaria de mais informações.",
  lunchboxes: {
    general:
      "Olá! Vi as marmitas no site do Paladar e gostaria de fazer um pedido.",
    options: {
      fit:
        "Olá! Vi a marmita Fit no site do Paladar e gostaria de pedir uma por R$ 32,00.",
      "marmita-do-dia":
        "Olá! Vi a Marmita do Dia no site do Paladar e gostaria de pedir uma por R$ 35,00.",
      churrasco:
        "Olá! Vi a marmita Churrasco no site do Paladar e gostaria de pedir uma por R$ 42,00.",
      "churrasco-premium":
        "Olá! Vi a marmita Churrasco Premium no site do Paladar e gostaria de pedir uma por R$ 52,00.",
    },
  },
} as const;

export function buildWhatsAppUrl(number: string, message: string): HttpsUrl {
  const searchParams = new URLSearchParams({ text: message });

  return `https://wa.me/${number}?${searchParams.toString()}`;
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
  googleMaps:
    "https://www.google.com/maps/place/Paladar+Prime+Restaurante/@-15.7948093,-48.1262076,17z/data=!4m6!3m5!1s0x935bcb841f49f055:0x4f1e84f44717dc1a!8m2!3d-15.7948093!4d-48.1262076!16s%2Fg%2F1q62g64kj" satisfies HttpsUrl,
} as const;
