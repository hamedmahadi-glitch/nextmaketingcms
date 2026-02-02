/**
 * Shim de types pour BaseHub
 * Fournit les types minimaux pour éviter les erreurs de compilation
 */

export type GeneralEvents = {
  ingestKey: string;
};

export type AvatarFragment = {
  url?: string;
  alt?: string;
  width?: number;
  height?: number;
};

export type ButtonFragment = {
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

export type DarkLightImageFragment = {
  url?: string;
  alt?: string;
  light?: string;
  dark?: string;
};

export type AuthorFragment = {
  _id?: string;
  _title?: string;
  image?: AvatarFragment;
};

export type BaseHubTypes = {
  GeneralEvents: GeneralEvents;
  AvatarFragment: AvatarFragment;
  ButtonFragment: ButtonFragment;
  HeadingFragment: HeadingFragment;
  DarkLightImageFragment: DarkLightImageFragment;
  AuthorFragment: AuthorFragment;
};
