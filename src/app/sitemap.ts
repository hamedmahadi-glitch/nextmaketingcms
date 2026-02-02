import { siteUrl } from "@/lib/constants";
import { basehub } from "basehub";
import type { MetadataRoute } from "next";

export const revalidate = 1800; // 30 minutes - adjust as needed

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const data = await basehub().query({
    site: {
      pages: {
        items: {
          pathname: true,
        },
      },
      blog: {
        posts: {
          items: {
            _slug: true,
          },
        },
      },
      changelog: {
        posts: {
          items: {
            _slug: true,
          },
        },
      },
    },
  });

  let index = 1;
  const pages = (data as any)?.site?.pages?.items ?? [];
  const blogPosts = (data as any)?.site?.blog?.posts?.items ?? [];
  const changelogPosts = (data as any)?.site?.changelog?.posts?.items ?? [];

  const formattedPages = pages.map(
    (page: any) =>
      ({
        url: `${siteUrl}${page.pathname}`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: index++,
      }) satisfies MetadataRoute.Sitemap[number],
  );

  const formattedBlogPosts = blogPosts.map(
    (post: any) =>
      ({
        url: `${siteUrl}/blog/${post._slug}`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: index++,
      }) satisfies MetadataRoute.Sitemap[number],
  );

  const formattedChangelogPosts = changelogPosts.map(
    (post: any) =>
      ({
        url: `${siteUrl}/changelog/${post._slug}`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: index++,
      }) satisfies MetadataRoute.Sitemap[number],
  );

  const routes = [...formattedPages, ...formattedBlogPosts, ...formattedChangelogPosts];
  return routes;
}
