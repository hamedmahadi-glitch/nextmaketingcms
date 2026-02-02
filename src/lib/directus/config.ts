import { createDirectus, rest, authentication } from "@directus/sdk";

const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_URL || "https://directus.opaleplus.cloud";
const directusToken = process.env.DIRECTUS_TOKEN || process.env.NEXT_PUBLIC_DIRECTUS_TOKEN;

export const directus = createDirectus(directusUrl)
  .with(rest())
  .with(authentication("json", { autoRefresh: true }));

export const getDirectusUrl = () => directusUrl;
export const getDirectusToken = () => directusToken;
