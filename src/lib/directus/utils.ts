/**
 * Utilitaires avancés pour requêtes Directus
 * Caching, pagination, filtrage avancé, etc.
 */

import { getItems, getItem } from "./api";

// Cache simplifié côté serveur (remplacer par Redis en production)
const cache = new Map<string, { data: any; timestamp: number }>();

const CACHE_DURATION = 1000 * 60 * 5; // 5 minutes

/**
 * Récupère les items avec cache
 */
export async function getItemsWithCache<T extends Record<string, any>>(
  collection: string,
  options?: { filter?: Record<string, any>; fields?: string[]; sort?: string[]; cacheKey?: string }
) {
  const cacheKey = options?.cacheKey || `${collection}:${JSON.stringify(options)}`;

  // Vérifier le cache
  const cached = cache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data as T[];
  }

  // Récupérer les données
  const data = await getItems<T>(collection, options);

  // Mettre en cache
  cache.set(cacheKey, { data, timestamp: Date.now() });

  return data;
}

/**
 * Récupère les items paginés
 */
export async function getItemsPaginated<T extends Record<string, any>>(
  collection: string,
  {
    page = 1,
    limit = 10,
    ...options
  }: {
    page?: number;
    limit?: number;
    filter?: Record<string, any>;
    fields?: string[];
    sort?: string[];
  }
) {
  const offset = (page - 1) * limit;

  const items = await getItems<T>(collection, {
    ...options,
    limit,
    offset,
  });

  return {
    items,
    page,
    limit,
    offset,
  };
}

/**
 * Cherche des items (simple recherche texte)
 */
export async function searchItems<T extends Record<string, any>>(
  collection: string,
  searchTerm: string,
  searchFields: string[] = ["title", "name", "description"]
) {
  const filter: any = {
    _or: searchFields.map((field) => ({
      [field]: {
        _contains: searchTerm,
      },
    })),
  };

  return getItems<T>(collection, { filter });
}

/**
 * Récupère les items avec relations
 */
export async function getItemsWithRelations<T extends Record<string, any>>(
  collection: string,
  relations: string[] = [],
  options?: { filter?: Record<string, any>; limit?: number; sort?: string[] }
) {
  const fields = ["*"];

  // Ajouter les relations
  relations.forEach((relation) => {
    fields.push(`${relation}.*`);
  });

  return getItems<T>(collection, {
    ...options,
    fields,
  });
}

/**
 * Compte les items d'une collection
 */
export async function countItems(
  collection: string,
  options?: { filter?: Record<string, any> }
) {
  const items = await getItems(collection, {
    ...options,
    limit: 0,
  });

  return Array.isArray(items) ? items.length : 0;
}

/**
 * Récupère les items groupés par un champ
 */
export async function getItemsGroupedBy<T extends Record<string, any>>(
  collection: string,
  groupField: string,
  options?: { filter?: Record<string, any>; fields?: string[]; sort?: string[] }
) {
  const items = await getItems<T>(collection, options);

  return items.reduce(
    (acc, item) => {
      const key = (item as any)[groupField];
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(item);
      return acc;
    },
    {} as Record<string | number, T[]>
  );
}

/**
 * Vide le cache
 */
export function clearCache() {
  cache.clear();
}

/**
 * Vide une entrée du cache
 */
export function clearCacheKey(key: string) {
  cache.delete(key);
}

/**
 * Récupère les statistiques du cache
 */
export function getCacheStats() {
  return {
    size: cache.size,
    entries: Array.from(cache.keys()),
  };
}
