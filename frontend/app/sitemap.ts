import fs from "node:fs/promises";
import path from "node:path";
import type { MetadataRoute } from "next";

const siteUrl = "https://www.hindustanplastics.com";

export const dynamic = "force-dynamic";

interface Blog {
  slug: string;
  datePublished?: string;
  lastUpdated?: string;
}

async function getStaticUrls() {
  const sitemapPath = path.join(process.cwd(), "public", "sitemap.xml");
  const sitemapXml = await fs.readFile(sitemapPath, "utf8");

  return [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(([, url]) => url);
}

async function getBlogs(): Promise<Blog[]> {
  const apiBase = process.env.NEXT_PUBLIC_API_BASE;
  if (!apiBase) return [];

  try {
    const response = await fetch(`${apiBase}/blog/viewblog`, {
      cache: "no-store",
    });

    if (!response.ok) return [];
    return response.json();
  } catch (error) {
    console.error("Failed to fetch blogs for sitemap", error);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [staticUrls, blogs] = await Promise.all([getStaticUrls(), getBlogs()]);
  const urls = new Map<string, MetadataRoute.Sitemap[number]>();

  staticUrls.forEach((url) => {
    urls.set(url, {
      url,
      changeFrequency: url === siteUrl + "/" ? "weekly" : "monthly",
      priority: url === siteUrl + "/" ? 1 : 0.7,
    });
  });

  blogs.forEach((blog) => {
    if (!blog.slug) return;

    urls.set(`${siteUrl}/blog/${blog.slug}`, {
      url: `${siteUrl}/blog/${blog.slug}`,
      lastModified: blog.lastUpdated || blog.datePublished,
      changeFrequency: "weekly",
      priority: 0.8,
    });
  });

  return [...urls.values()];
}
