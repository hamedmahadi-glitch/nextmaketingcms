# Directus Integration Module

Ce dossier contient tous les fichiers nécessaires pour intégrer Directus CMS à votre application Next.js.

## Fichiers

### `config.ts`
Configuration du client Directus avec authentification.

```typescript
import { directus } from '@/lib/directus/config';
```

### `api.ts`
Fonctions principales pour récupérer les données:

- `getItems(collection, options)` - Liste d'items
- `getItem(collection, id, options)` - Item unique
- `getPages()` - Pages du site
- `getPageBySlug(slug)` - Page par slug
- `getBlogPosts()` - Articles de blog
- `getBlogPostBySlug(slug)` - Article par slug
- `getChangelogItems()` - Items du changelog
- `getChangelogItemBySlug(slug)` - Item du changelog
- `getSiteSettings()` - Paramètres du site

```typescript
import { getPageBySlug, getBlogPosts } from '@/lib/directus/api';

const page = await getPageBySlug('/about');
const posts = await getBlogPosts();
```

### `types.ts`
Types TypeScript réutilisables pour vos données Directus.

```typescript
import type { Page, BlogPost, Author } from '@/lib/directus/types';
```

### `adapters.ts`
Convertisseurs pour transformer les données Directus au format attendu par vos composants.

```typescript
import { adaptHeroSection, adaptFeature } from '@/lib/directus/adapters';

const hero = adaptHeroSection(directusData);
```

### `utils.ts`
Utilitaires avancés:

- `getItemsWithCache()` - Requête avec cache
- `getItemsPaginated()` - Pagination
- `searchItems()` - Recherche
- `getItemsWithRelations()` - Relations
- `countItems()` - Comptage
- `getItemsGroupedBy()` - Groupement

```typescript
import { getItemsWithCache, searchItems } from '@/lib/directus/utils';

const cached = await getItemsWithCache('posts');
const results = await searchItems('posts', 'nextjs');
```

## Exemples d'utilisation

### Récupérer une page

```typescript
import { getPageBySlug } from '@/lib/directus/api';

export default async function Page({ params }: { params: { slug: string } }) {
  const page = await getPageBySlug(`/${params.slug}`);
  
  return <div>{page.title}</div>;
}
```

### Lister les articles de blog

```typescript
import { getBlogPosts } from '@/lib/directus/api';

export default async function BlogList() {
  const posts = await getBlogPosts();
  
  return (
    <div>
      {posts.map(post => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
        </article>
      ))}
    </div>
  );
}
```

### Utiliser le cache

```typescript
import { getItemsWithCache } from '@/lib/directus/utils';

const products = await getItemsWithCache('products', {
  fields: ['*', 'category.*'],
  cacheKey: 'products:all',
});
```

### Rechercher

```typescript
import { searchItems } from '@/lib/directus/utils';

const results = await searchItems('blog_posts', 'nextjs', [
  'title',
  'content',
]);
```

## Configuration Directus

Assurez-vous que votre instance Directus a les collections suivantes:

- `pages` - Pages du site
- `blog_posts` - Articles
- `authors` - Auteurs
- `changelog` - Changelog
- `settings` - Paramètres du site

Consultez `DIRECTUS_INTEGRATION.md` pour les schémas complets.

## Génération des types

Pour générer automatiquement les types TypeScript depuis votre instance Directus:

```bash
npm run generate:types
```

Cela créera `src/lib/directus/types-generated.ts` avec les types de votre schéma.

## Environnement

Variables requises dans `.env.local`:

```env
NEXT_PUBLIC_DIRECTUS_URL=https://directus.opaleplus.cloud
DIRECTUS_TOKEN=your_token_here
```

## Performance

### Caching
Par défaut, le cache dure 5 minutes. Vous pouvez l'ajuster dans `utils.ts`:

```typescript
const CACHE_DURATION = 1000 * 60 * 5; // 5 minutes
```

En production, remplacez par Redis ou une autre solution.

### Pagination
Pour les grandes collections, utilisez la pagination:

```typescript
const page1 = await getItemsPaginated('posts', { page: 1, limit: 10 });
```

### Limiter les champs
Spécifiez uniquement les champs nécessaires:

```typescript
const posts = await getItems('blog_posts', {
  fields: ['id', 'title', 'slug', 'published_date'],
});
```

## Sécurité

- Ne commitez jamais `DIRECTUS_TOKEN` dans le code
- Utilisez les variables d'environnement
- Configurez les permissions correctement dans Directus
- Pour les données publiques, créez un rôle spécifique avec accès limité

## Support

Consultez:
- [Documentation Directus](https://docs.directus.io)
- [SDK Directus](https://docs.directus.io/guides/sdk.html)
- [Guide d'intégration complet](../../../DIRECTUS_INTEGRATION.md)
