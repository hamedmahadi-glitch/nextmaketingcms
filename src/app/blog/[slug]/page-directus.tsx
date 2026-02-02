import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBlogPosts, getBlogPostBySlug } from "@/lib/directus/api";
import { PageView } from "../../_components/page-view";

export const dynamic = "force-dynamic";

export const generateStaticParams = async () => {
  try {
    const posts = await getBlogPosts();
    return posts.map((post: any) => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
};

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata | undefined> => {
  const { slug } = await params;

  try {
    const post = await getBlogPostBySlug(slug);

    if (!post) {
      return notFound();
    }

    return {
      title: post.title,
      description: post.excerpt || post.description,
      openGraph: {
        title: post.title,
        description: post.excerpt || post.description,
        images: post.featured_image
          ? [`https://directus.opaleplus.cloud/assets/${post.featured_image.id}`]
          : [],
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {};
  }
};

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  try {
    const post = await getBlogPostBySlug(slug);

    if (!post) {
      notFound();
    }

    return (
      <>
        <PageView ingestKey={`blog_post_${post.id}`} />

        <article className="mx-auto max-w-3xl px-4 py-12">
          {/* Header */}
          <header className="mb-8">
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">{post.title}</h1>

            {post.excerpt && (
              <p className="text-xl text-neutral-600 dark:text-neutral-400">{post.excerpt}</p>
            )}

            {/* Métadonnées */}
            <div className="mt-6 flex flex-col gap-4 border-t border-neutral-200 pt-6 dark:border-neutral-800">
              {post.author && (
                <div className="flex items-center gap-3">
                  {post.author.avatar && (
                    <img
                      src={`https://directus.opaleplus.cloud/assets/${post.author.avatar.id}`}
                      alt={post.author.name}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  )}
                  <div>
                    <p className="font-semibold">{post.author.name}</p>
                    {post.author.bio && (
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">
                        {post.author.bio}
                      </p>
                    )}
                  </div>
                </div>
              )}

              <div className="text-sm text-neutral-600 dark:text-neutral-400">
                {new Date(post.published_date).toLocaleDateString("fr-FR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>

              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="inline-block rounded-full bg-neutral-100 px-3 py-1 text-sm dark:bg-neutral-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </header>

          {/* Featured Image */}
          {post.featured_image && (
            <img
              src={`https://directus.opaleplus.cloud/assets/${post.featured_image.id}`}
              alt={post.title}
              className="mb-8 w-full rounded-lg object-cover"
            />
          )}

          {/* Content */}
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            {post.content && <div dangerouslySetInnerHTML={{ __html: post.content }} />}
          </div>
        </article>
      </>
    );
  } catch (error) {
    console.error("Error loading blog post:", error);
    notFound();
  }
}
