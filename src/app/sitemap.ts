import type { MetadataRoute } from "next";
import { seoConfig } from "@/data/seo";
import { siteRoutes } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return Object.values(siteRoutes).map((path) => ({
    url: new URL(path, seoConfig.siteUrl).toString(),
  }));
}
