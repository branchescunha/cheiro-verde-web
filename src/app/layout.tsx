import type { Metadata, Viewport } from "next";
import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import { restaurantSeoData, seoConfig } from "@/data/seo";
import {
  createRestaurantStructuredData,
  serializeJsonLd,
} from "@/lib/seo";
import { themeInitializationScript } from "@/lib/theme";
import "./globals.css";

const restaurantStructuredData = createRestaurantStructuredData(
  restaurantSeoData,
  seoConfig,
);

export const metadata: Metadata = {
  title: {
    default: "Restaurante Cheiro Verde | Ceilândia",
    template: "%s | Cheiro Verde",
  },
  description:
    "Restaurante Cheiro Verde no Setor O, em Ceilândia, com tradição, variedade e qualidade desde 1999.",
  applicationName: seoConfig.siteName,
  openGraph: {
    type: "website",
    locale: seoConfig.locale,
    siteName: seoConfig.siteName,
    title: "Restaurante Cheiro Verde | Ceilândia",
    description:
      "Restaurante Cheiro Verde no Setor O, em Ceilândia, com tradição, variedade e qualidade desde 1999.",
  },
  twitter: {
    card: "summary",
    title: "Restaurante Cheiro Verde | Ceilândia",
    description:
      "Restaurante Cheiro Verde no Setor O, em Ceilândia, com tradição, variedade e qualidade desde 1999.",
  },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      {
        url: "/media/icons/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "/media/icons/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/media/icons/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fffaf2" },
    { media: "(prefers-color-scheme: dark)", color: "#171210" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitializationScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd(restaurantStructuredData),
          }}
        />
      </head>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
