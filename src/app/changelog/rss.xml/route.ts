import { siteUrl } from "@/lib/constants";
import { basehub } from "basehub";

export async function GET() {
  const data = await basehub().query({
    site: {
      changelog: {
        title: true,
        subtitle: true,
        posts: {
          __args: {
            orderBy: "publishedAt__DESC",
          },
          items: {
            _title: true,
            _slug: true,
            excerpt: true,
            publishedAt: true,
          },
        },
      },
    },
  });

    const changelog = (data as any)?.site?.changelog;
    const posts = changelog?.posts?.items ?? [];

    const feed = `<?xml version="1.0" encoding="UTF-8" ?>
      <rss version="2.0">
        <channel>
          <title>${changelog?.title ?? "Changelog"}</title>
          <description>${changelog?.subtitle ?? ""}</description>
          <link>${siteUrl}/changelog</link>
          <language>en-us</language>${posts
          .map((post: any) => {
            return `
          <item>
            <title>${post._title}</title>
            <link>${siteUrl}/changelog/${post._slug}</link>
            <description>${post.excerpt}</description>
            <pubDate>${post.publishedAt}</pubDate>
          </item>`;
          })
          .join("")}
        </channel>
      </rss>`;

  return new Response(feed, {
    status: 200,
    headers: { "Content-Type": "application/rss+xml" },
  });
}
