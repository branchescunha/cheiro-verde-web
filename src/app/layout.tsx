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
  metadataBase: new URL(seoConfig.siteUrl),
  title: {
    default: "Restaurante Paladar | Almoço em Ceilândia",
    template: "%s | Paladar",
  },
  description:
    "Restaurante Paladar em Ceilândia, com self-service, churrasco e almoço todos os dias no Setor O.",
  applicationName: seoConfig.siteName,
  openGraph: {
    type: "website",
    locale: seoConfig.locale,
    url: seoConfig.siteUrl,
    siteName: seoConfig.siteName,
    title: "Restaurante Paladar | Almoço em Ceilândia",
    description:
      "Restaurante Paladar em Ceilândia, com self-service, churrasco e almoço todos os dias no Setor O.",
    images: [seoConfig.socialImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Restaurante Paladar | Almoço em Ceilândia",
    description:
      "Restaurante Paladar em Ceilândia, com self-service, churrasco e almoço todos os dias no Setor O.",
    images: [seoConfig.socialImage.url],
  },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/icons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      {
        url: "/icons/apple-touch-icon.png",
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
