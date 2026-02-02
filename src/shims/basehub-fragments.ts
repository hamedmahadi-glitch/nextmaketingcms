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
};

export const optimizedImageFragment = {
  __typename: "Image",
  url: true,
  alt: true,
  width: true,
  height: true,
};
