import type { MetadataRoute } from "next";
import { pages } from "./content";

function siteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  return "http://localhost:3000";
}

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl().replace(/\/$/, "");
  return [
    { url: base, changeFrequency: "weekly", priority: 1 },
    ...pages.map((page) => ({
      url: `${base}/${page.slug}`,
      changeFrequency: "weekly" as const,
      priority: page.slug.includes("/") ? 0.7 : 0.8,
    })),
  ];
}
