import { readItems, readItem } from "@directus/sdk";
import { directus } from "./config";

// Keep a short-lived in-memory set of endpoints that already failed
// to avoid spamming the logs with repeated identical auth errors.
const _failedEndpoints = new Set<string>();

/**
 * Récupère tous les items d'une collection
 */
export async function getItems<T extends Record<string, any>>(
  collection: string,
  options?: {
    filter?: Record<string, any>;
    fields?: string[];
    sort?: string[];
    limit?: number;
    offset?: number;
  }
) {
  try {
    const queryParams: any = {};
    
    // Only add defined properties
    if (options?.fields) {
      queryParams.fields = options.fields;
    } else {
      queryParams.fields = ["*"];
    }
    
    if (typeof options?.limit === "number") {
      queryParams.limit = options.limit;
    } else {
      queryParams.limit = 100;
    }
    
    if (typeof options?.offset === "number") {
      queryParams.offset = options.offset;
    } else {
      queryParams.offset = 0;
    }
    
    if (options?.sort && Array.isArray(options.sort) && options.sort.length > 0) {
      queryParams.sort = options.sort;
    }

    if (options?.filter && Object.keys(options.filter).length > 0) {
      queryParams.filter = options.filter;
    }

    const query = readItems(collection as never, queryParams as never);
    const result = await (directus as any).request(query);
    return result as T[];
  } catch (error: any) {
    const errorMessage = error?.message || JSON.stringify(error);
    const errorDetails = error?.errors?.[0]?.message || error?.statusText || 'Unknown error';
    const status = error?.status || error?.response?.status;
    const url = error?.url || error?.response?.url || collection;

    // Log only once per failing endpoint to reduce repeated noisy logs
    if (!_failedEndpoints.has(url)) {
      console.warn(`Failed to fetch items from ${collection}: ${errorDetails} (${status}). Returning empty array.`, {
        message: errorMessage,
        status,
        url,
      });
      _failedEndpoints.add(url);
    }

    // Return empty array as fallback instead of throwing
    return [] as T[];
  }
}

/**
 * Récupère un item spécifique d'une collection
 */
export async function getItem<T extends Record<string, any>>(
  collection: string,
  id: string | number,
  options?: {
    fields?: string[];
  }
) {
  try {
    const query = readItem(collection as never, id, {
      fields: options?.fields || ["*"],
    } as never);

    const result = await (directus as any).request(query);
    return result as T;
  } catch (error: any) {
    const errorMessage = error?.message || JSON.stringify(error);
    const errorDetails = error?.errors?.[0]?.message || error?.statusText || 'Unknown error';
    const status = error?.status || error?.response?.status;
    
    console.warn(`Failed to fetch item from ${collection}: ${errorDetails} (${status}). Returning null.`, {
      message: errorMessage,
      status,
    });
    
    // Return null as fallback instead of throwing
    return null as any;
  }
}

/**
 * Récupère les pages du site
 */
export async function getPages() {
  return getItems("pages", {
    fields: ["*", "sections.*"],
    sort: ["sort"],
  });
}

/**
 * Récupère une page spécifique par slug
 */
export async function getPageBySlug(slug: string) {
  // Guard: avoid querying Directus for asset-like paths (favicon, files)
  // These are often requested by the browser and should not trigger CMS queries.
  if (!slug) return null;
  const lower = slug.toLowerCase();
  if (lower.includes(".") || lower.startsWith("/favicon") || lower.startsWith("/robots") || lower.startsWith("/sitemap")) {
    return null;
  }

  // Allow disabling Directus remote calls during local builds or when token is unavailable
  if (process.env.DISABLE_DIRECTUS === "1") {
    return null;
  }

  try {
    const pages = await getItems("pages", {
      fields: ["*", "sections.*", "sections.component.*"],
      filter: {
        slug: {
          _eq: slug,
        },
      },
    });

    return pages[0] || null;
  } catch (err: any) {
    console.warn(`getPageBySlug: failed to fetch page for ${slug}: ${err?.message || err}`);
    return null;
  }
}

/**
 * Récupère les articles de blog
 */
export async function getBlogPosts() {
  return getItems("blog_posts", {
    fields: ["*", "author.*"],
    sort: ["-published_date"],
  });
}

/**
 * Récupère un article de blog par slug
 */
export async function getBlogPostBySlug(slug: string) {
  const posts = await getItems("blog_posts", {
    fields: ["*", "author.*"],
    filter: {
      slug: {
        _eq: slug,
      },
    },
  });

  return posts[0] || null;
}

/**
 * Récupère les items du changelog
 */
export async function getChangelogItems() {
  return getItems("changelog", {
    fields: ["*"],
    sort: ["-date"],
  });
}

/**
 * Récupère un item du changelog par slug
 */
export async function getChangelogItemBySlug(slug: string) {
  const items = await getItems("changelog", {
    fields: ["*"],
    filter: {
      slug: {
        _eq: slug,
      },
    },
  });

  return items[0] || null;
}

/**
 * Récupère les paramètres du site
 */
export async function getSiteSettings() {
  try {
    const settings = await getItems("settings", {
      fields: ["*"],
    });

    return settings[0] || null;
  } catch (error: any) {
    // This shouldn't throw anymore since getItems returns empty array on error
    const errorDetails = error?.errors?.[0]?.message || error?.statusText || error?.message || 'Unknown error';
    console.warn(`Failed to fetch settings: ${errorDetails}. Returning null as fallback.`);
    return null;
  }
}
