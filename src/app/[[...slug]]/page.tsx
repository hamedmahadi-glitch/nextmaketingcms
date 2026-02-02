import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getPageBySlug, getPages, getSiteSettings } from "@/lib/directus/api";

// Imports des sections (conservés de l'original)
import { AccordionFaq } from "../_sections/accordion-faq";
import { BigFeature } from "../_sections/features/big-feature";
import { Callout } from "../_sections/callout-1";
import { Callout2 } from "../_sections/callout-2";
import { Companies } from "../_sections/companies";
import { Faq } from "../_sections/faq";
import { FeaturesGrid } from "../_sections/features/features-grid";
import { FeaturesList } from "../_sections/features/features-list";
import { Hero } from "../_sections/hero";
import { Pricing } from "../_sections/pricing";
import { SideFeatures } from "../_sections/features/side-features";
import { Testimonials } from "../_sections/testimonials";
import { TestimonialsGrid } from "../_sections/testimonials-grid";
import { PricingTable } from "../_sections/pricing-comparation";
import FeatureHero from "../_sections/features/hero";
import { PageView } from "../_components/page-view";
import { FreeformText } from "../_sections/freeform-text";
import { Form } from "../_sections/form";

export const dynamic = "force-dynamic";

export const generateStaticParams = async () => {
  try {
    const pages = await getPages();
    return pages.map((page: any) => ({
      slug: (page.slug || "").split("/").filter(Boolean),
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
};

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata | undefined> => {
  const { slug } = await params;
  const pathname = slug ? `/${slug.join("/")}` : "/";

  try {
    const page = await getPageBySlug(pathname);
    const settings = await getSiteSettings();

    // Return metadata even if page is null (fallback to settings)
    return {
      title: page?.meta_title || page?.title || (settings?.site_name || ""),
      description: page?.meta_description || page?.description || "",
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {};
  }
};

/**
 * Rend dynamiquement une section basée sur son type
 */
function SectionRenderer({ section, eventsKey }: { section: any; eventsKey?: string }) {
  if (!section) return null;

  const componentType = section.component?.type || section.type;

  switch (componentType) {
    case "hero":
      return <Hero {...section} key={section.id} eventsKey={eventsKey} />;
    case "features_cards":
      return <FeaturesList {...section} key={section.id} />;
    case "features_grid":
      return <FeaturesGrid {...section} key={section.id} eventsKey={eventsKey} />;
    case "companies":
      return <Companies {...section} key={section.id} />;
    case "big_feature":
      return <BigFeature {...section} key={section.id} />;
    case "side_features":
      return <SideFeatures {...section} key={section.id} eventsKey={eventsKey} />;
    case "callout":
      return <Callout {...section} key={section.id} eventsKey={eventsKey} />;
    case "callout_v2":
      return <Callout2 {...section} key={section.id} eventsKey={eventsKey} />;
    case "testimonials_slider":
      return <Testimonials {...section} key={section.id} />;
    case "testimonials_grid":
      return <TestimonialsGrid {...section} key={section.id} />;
    case "pricing":
      return <Pricing {...section} key={section.id} />;
    case "faq":
      return <Faq {...section} key={section.id} />;
    case "accordion_faq":
      return <AccordionFaq {...section} key={section.id} eventsKey={eventsKey} />;
    case "pricing_table":
      return <PricingTable {...section} key={section.id} />;
    case "feature_hero":
      return <FeatureHero {...section} key={section.id} eventsKey={eventsKey} />;
    case "freeform_text":
      return <FreeformText {...section} key={section.id} />;
    case "form":
      return <Form {...section} key={section.id} />;
    default:
      console.warn(`Unknown section type: ${componentType}`);
      return null;
  }
}

export default async function DynamicPage({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug } = await params;
  const pathname = slug ? `/${slug.join("/")}` : "/";

  try {
    const page = await getPageBySlug(pathname);

    // If no page data (due to Directus auth error or not found),
    // render an empty page instead of 404
    if (!page) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">Page Not Found</h1>
            <p className="text-gray-600">The page you're looking for doesn't exist or couldn't be loaded.</p>
          </div>
        </div>
      );
    }

    const sections = Array.isArray(page.sections) ? page.sections : [];

    // Mock eventsKey pour l'analytics - à adapter selon votre système
    const eventsKey = "default_ingest_key";

    return (
      <>
        <PageView ingestKey={eventsKey} />
        {sections.map((section: any) => (
          <div key={section.id} id={section.slug || section.id}>
            <SectionRenderer section={section} eventsKey={eventsKey} />
          </div>
        ))}
      </>
    );
  } catch (error) {
    console.error("Error loading page:", error);
    // Render a basic error page instead of throwing
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Error Loading Page</h1>
          <p className="text-gray-600">An error occurred while loading the page. Please try again later.</p>
        </div>
      </div>
    );
  }
}
