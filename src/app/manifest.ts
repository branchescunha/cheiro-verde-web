import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Restaurante Cheiro Verde",
    short_name: "Cheiro Verde",
    description: "Site oficial do Restaurante Cheiro Verde.",
    start_url: "/",
    display: "standalone",
    background_color: "#fffaf2",
    theme_color: "#171210",
    lang: "pt-BR",
    icons: [
      {
        src: "/media/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/media/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/media/icons/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
