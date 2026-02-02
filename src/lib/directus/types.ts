/**
 * Types Directus auto-générés basés sur votre instance
 * Vous pouvez générer ces types automatiquement avec:
 * npx @directus/sdk generate https://directus.opaleplus.cloud --token YOUR_TOKEN
 */

// Types de base
export interface DirectusUser {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  avatar?: string;
}

export interface DirectusFile {
  id: string;
  storage: string;
  filename_disk: string;
  filename_download: string;
  title?: string;
  description?: string;
  type: string;
  filesize: number;
  width?: number;
  height?: number;
  duration?: number;
  metadata?: Record<string, any>;
}

// Pages
export interface Page {
  id: string;
  title: string;
  slug: string;
  description?: string;
  meta_title?: string;
  meta_description?: string;
  status: "published" | "draft" | "archived";
  sections?: PageSection[];
  created_at?: string;
  updated_at?: string;
  published_at?: string;
}

export interface PageSection {
  id: string;
  page_id?: string;
  sort?: number;
  type: string;
  component?: Record<string, any>;
  [key: string]: any;
}

// Articles de blog
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  featured_image?: DirectusFile;
  author?: Author;
  published_date: string;
  status: "published" | "draft" | "archived";
  tags?: string[];
  created_at?: string;
  updated_at?: string;
}

// Auteur
export interface Author {
  id: string;
  name: string;
  email?: string;
  avatar?: DirectusFile;
  bio?: string;
}

// Changelog
export interface ChangelogItem {
  id: string;
  title: string;
  slug: string;
  description: string;
  date: string;
  version?: string;
  type?: "feature" | "bugfix" | "improvement" | "breaking";
  created_at?: string;
  updated_at?: string;
}

// Paramètres du site
export interface SiteSettings {
  id: string;
  site_name: string;
  site_description?: string;
  site_url: string;
  logo?: DirectusFile;
  favicon?: DirectusFile;
  default_meta_title?: string;
  default_meta_description?: string;
  social_links?: Record<string, string>;
  [key: string]: any;
}

// Section Hero
export interface HeroSection {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  cta_text?: string;
  cta_link?: string;
  background_image?: DirectusFile;
  [key: string]: any;
}

// Features
export interface Feature {
  id: string;
  title: string;
  description?: string;
  icon?: DirectusFile;
  image?: DirectusFile;
  [key: string]: any;
}

// Testimonial
export interface Testimonial {
  id: string;
  name: string;
  title?: string;
  company?: string;
  content: string;
  avatar?: DirectusFile;
  rating?: number;
  [key: string]: any;
}

// Pricing
export interface PricingPlan {
  id: string;
  name: string;
  description?: string;
  price: number;
  currency?: string;
  billing_period?: "monthly" | "yearly";
  features?: string[];
  cta_text?: string;
  cta_link?: string;
  highlighted?: boolean;
  [key: string]: any;
}
