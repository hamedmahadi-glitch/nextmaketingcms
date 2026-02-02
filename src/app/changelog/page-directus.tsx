import { Metadata } from "next";
import { getChangelogItems, getSiteSettings } from "@/lib/directus/api";
import { Heading } from "@/common/heading";
import { Section } from "@/common/layout";
import { PageView } from "../../_components/page-view";

export const dynamic = "force-dynamic";

export const generateMetadata = async (): Promise<Metadata | undefined> => {
  try {
    const settings = await getSiteSettings();

    return {
      title: settings?.changelog_page_title || "Changelog",
      description: settings?.changelog_page_description || "Latest updates and improvements",
    };
  } catch (error) {
    return {
      title: "Changelog",
      description: "Latest updates and improvements",
    };
  }
};

export default async function ChangelogPage() {
  let items = [];

  try {
    items = await getChangelogItems();
  } catch (error) {
    console.error("Error loading changelog items:", error);
  }

  return (
    <>
      <PageView ingestKey="changelog_page" />

      <Section className="py-12">
        <div className="mx-auto max-w-3xl">
          <Heading level={1} className="mb-2 text-center">
            Changelog
          </Heading>
          <p className="text-center text-neutral-600 dark:text-neutral-400">
            Découvrez les dernières mises à jour et améliorations
          </p>
        </div>
      </Section>

      <Section className="py-12">
        {items.length === 0 ? (
          <div className="flex items-center justify-center rounded-lg border border-neutral-200 bg-neutral-50 p-8 text-center dark:border-neutral-800 dark:bg-neutral-900">
            <p className="text-neutral-600 dark:text-neutral-400">
              Aucune entrée pour le moment.
            </p>
          </div>
        ) : (
          <div className="mx-auto max-w-3xl space-y-8">
            {items.map((item: any, index: number) => {
              const isFirst = index === 0;
              const isLast = index === items.length - 1;

              return (
                <div key={item.id} className="relative pb-8">
                  {/* Timeline line */}
                  {!isLast && (
                    <div className="absolute left-6 top-12 h-full w-0.5 bg-neutral-200 dark:bg-neutral-800" />
                  )}

                  {/* Timeline dot */}
                  <div className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center">
                    <div className="flex h-3 w-3 items-center justify-center rounded-full bg-blue-500" />
                  </div>

                  {/* Content */}
                  <div className="ml-16">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg font-semibold">{item.title}</h3>
                      {item.version && (
                        <span className="rounded-full bg-neutral-100 px-2 py-1 text-xs font-medium dark:bg-neutral-800">
                          {item.version}
                        </span>
                      )}
                      {item.type && (
                        <span
                          className={`rounded-full px-2 py-1 text-xs font-medium ${
                            item.type === "feature"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                              : item.type === "bugfix"
                                ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                                : item.type === "breaking"
                                  ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                                  : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                          }`}
                        >
                          {item.type}
                        </span>
                      )}
                    </div>

                    <p className="mt-2 text-neutral-600 dark:text-neutral-400">
                      {item.description}
                    </p>

                    <time className="mt-2 block text-sm text-neutral-500 dark:text-neutral-500">
                      {new Date(item.date).toLocaleDateString("fr-FR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Section>
    </>
  );
}
