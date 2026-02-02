import { Metadata } from "next";
import { Heading } from "@/common/heading";
import { Section } from "@/common/layout";
import { SearchContent as Search } from "@/common/search";
import { SearchHitsProvider } from "@/context/search-hits-context";
import { getBlogPosts, getSiteSettings } from "@/lib/directus/api";
import { BlogpostCard } from "./_components/blogpost-card";
import { PageView } from "../_components/page-view";

export const dynamic = "force-dynamic";

export const generateMetadata = async (): Promise<Metadata | undefined> => {
  try {
    const settings = await getSiteSettings();

    return {
      title: settings?.blog_page_title || "Blog",
      description: settings?.blog_page_description || "Latest articles and insights",
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Blog",
      description: "Latest articles and insights",
    };
  }
};

export default async function BlogPage() {
  let posts: any[] = [];

  try {
    posts = await getBlogPosts();
  } catch (error) {
    console.error("Error loading blog posts:", error);
  }

  return (
    <SearchHitsProvider hits={posts}>
      <PageView ingestKey="blog_page" />
      <Section>
        <Heading level={1} className="text-center">
          Blog
        </Heading>
        <Search _searchKey="" />
      </Section>

      <Section className="py-10">
        {posts.length === 0 ? (
          <div className="flex items-center justify-center rounded-lg border border-neutral-200 bg-neutral-50 p-8 text-center dark:border-neutral-800 dark:bg-neutral-900">
            <p className="text-neutral-600 dark:text-neutral-400">Aucun article pour le moment.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post: any) => (
              <BlogpostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </Section>
    </SearchHitsProvider>
  );
}
