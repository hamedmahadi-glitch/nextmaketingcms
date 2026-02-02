/**
 * Adaptateur pour convertir les données Directus vers le format attendu par les sections existantes
 */

import { DirectusFile } from "./types";

/**
 * Convertit une image Directus en format utilisable par les composants
 */
export function adaptDirectusImage(file: DirectusFile | undefined) {
  if (!file) return null;

  return {
    url: `https://directus.opaleplus.cloud/assets/${file.id}`,
    alt: file.title || file.filename_download,
    width: file.width,
    height: file.height,
  };
}

/**
 * Convertit un lien d'action Directus
 */
export function adaptAction(action: any) {
  if (!action) return null;

  return {
    label: action.label || action.text,
    href: action.url || action.link,
    type: action.type || "button",
    id: action.id,
  };
}

/**
 * Convertit un auteur Directus
 */
export function adaptAuthor(author: any) {
  if (!author) return null;

  return {
    _id: author.id,
    _title: author.name,
    image: adaptDirectusImage(author.avatar),
  };
}

/**
 * Convertit un testimonial Directus
 */
export function adaptTestimonial(testimonial: any) {
  if (!testimonial) return null;

  return {
    _id: testimonial.id,
    _title: testimonial.name,
    name: testimonial.name,
    title: testimonial.title,
    company: testimonial.company,
    content: testimonial.content,
    avatar: adaptDirectusImage(testimonial.avatar),
    rating: testimonial.rating,
  };
}

/**
 * Convertit une feature Directus
 */
export function adaptFeature(feature: any) {
  if (!feature) return null;

  return {
    _id: feature.id,
    title: feature.title,
    description: feature.description,
    icon: adaptDirectusImage(feature.icon),
    image: adaptDirectusImage(feature.image),
    href: feature.link,
  };
}

/**
 * Convertit un plan tarifaire Directus
 */
export function adaptPricingPlan(plan: any) {
  if (!plan) return null;

  return {
    _id: plan.id,
    name: plan.name,
    price: plan.price,
    description: plan.description,
    currency: plan.currency || "$",
    features: Array.isArray(plan.features) ? plan.features : plan.features?.split("\n") || [],
    cta: {
      label: plan.cta_text || "Get Started",
      href: plan.cta_link || "#",
    },
    highlighted: plan.highlighted || false,
  };
}

/**
 * Convertit une section hero Directus
 */
export function adaptHeroSection(section: any) {
  if (!section) return null;

  return {
    _id: section.id,
    _analyticsKey: section.analytics_key || "hero_section",
    title: section.title,
    subtitle: section.subtitle,
    description: section.description,
    backgroundImage: adaptDirectusImage(section.background_image),
    image: adaptDirectusImage(section.image),
    actions: Array.isArray(section.actions)
      ? section.actions.map(adaptAction)
      : section.cta_text
        ? [
            {
              label: section.cta_text,
              href: section.cta_link || "#",
            },
          ]
        : [],
    customerSatisfactionBanner: section.customer_satisfaction_banner || {
      text: "",
      avatars: { items: [] },
    },
  };
}

/**
 * Convertit une section de features grid Directus
 */
export function adaptFeaturesGridSection(section: any) {
  if (!section) return null;

  const features = Array.isArray(section.features) ? section.features : [];

  return {
    _id: section.id,
    _analyticsKey: section.analytics_key || "features_grid",
    title: section.title,
    description: section.description,
    features: features.map(adaptFeature),
  };
}

/**
 * Convertit une section de testimonials Directus
 */
export function adaptTestimonialsSection(section: any) {
  if (!section) return null;

  const testimonials = Array.isArray(section.testimonials) ? section.testimonials : [];

  return {
    _id: section.id,
    title: section.title,
    description: section.description,
    testimonials: testimonials.map(adaptTestimonial),
  };
}

/**
 * Convertit une section de pricing Directus
 */
export function adaptPricingSection(section: any) {
  if (!section) return null;

  const plans = Array.isArray(section.plans) ? section.plans : [];

  return {
    _id: section.id,
    title: section.title,
    description: section.description,
    plans: plans.map(adaptPricingPlan),
  };
}
