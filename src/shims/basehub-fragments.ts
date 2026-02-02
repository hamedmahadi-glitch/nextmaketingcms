/**
 * Shim pour les fragments BaseHub
 * Fournit les fragments stub pour compatibilité
 */

export const avatarFragment = {
  __typename: "Avatar",
  url: true,
  alt: true,
  width: true,
  height: true,
};

export const buttonFragment = {
  __typename: "Button",
  label: true,
  href: true,
  type: true,
};

export const headingFragment = {
  __typename: "Heading",
  title: true,
  subtitle: true,
  tag: true,
  align: true,
};

export const darkLightImageFragment = {
  __typename: "DarkLightImage",
  url: true,
  alt: true,
  light: true,
  dark: true,
};

export const authorFragment = {
  __typename: "Author",
  _id: true,
  _title: true,
  image: avatarFragment,
  role: true,
  company: {
    _title: true,
    image: avatarFragment,
  },
};

export const optimizedImageFragment = {
  __typename: "Image",
  url: true,
  alt: true,
  width: true,
  height: true,
};

export const quoteFragment = {
  __typename: "Quote",
  _id: true,
  quote: true,
  author: authorFragment,
};

export const testimonialFragment = {
  __typename: "Testimonial",
  _id: true,
  _title: true,
  content: true,
  author: authorFragment,
  avatar: avatarFragment,
};

export const richTextFragment = {
  __typename: "RichText",
  json: true,
  html: true,
};
// Type exports for compatibility (realistic shapes used by components)
export type AvatarFragment = {
  url?: string;
  alt?: string;
  width?: number;
  height?: number;
};

export type CompanyFragment = {
  _title?: string;
  image?: AvatarFragment;
};

export type AuthorFragment = {
  _id?: string | number;
  _title?: string;
  image: AvatarFragment;
  role?: string;
  company: CompanyFragment;
};

export type QuoteFragment = {
  _id?: string | number;
  quote?: string;
  author: AuthorFragment;
};

export type TestimonialFragment = {
  _id?: string | number;
  _title?: string;
  content?: string;
  author?: AuthorFragment;
  avatar?: AvatarFragment;
};

export type ButtonFragment = {
  _id?: string | number;
  label?: string;
  href?: string;
  type?: string;
};

export type HeadingFragment = {
  title?: string;
  subtitle?: string;
  tag?: string;
  align?: string;
};

export type OptimizedImageFragment = {
  url?: string;
  alt?: string;
  width?: number;
  height?: number;
  blurDataURL?: string;
  aspectRatio?: string;
};

export type DarkLightImageFragment = {
  dark: OptimizedImageFragment;
  light: OptimizedImageFragment;
};