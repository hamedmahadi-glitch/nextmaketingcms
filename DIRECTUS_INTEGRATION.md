# Guide d'intégration Directus pour Next.js CMS

Ce projet a été adapté pour consommer l'API Directus hébergée sur `https://directus.opaleplus.cloud`.

## Configuration requise

### 1. Variables d'environnement

Créez ou mettez à jour votre fichier `.env.local` :

```env
# Directus Configuration
NEXT_PUBLIC_DIRECTUS_URL=https://directus.opaleplus.cloud
DIRECTUS_TOKEN=your_directus_token_here
```

**Note:** 
- `NEXT_PUBLIC_DIRECTUS_URL` est publique et peut être exposée
- `DIRECTUS_TOKEN` doit être sécurisé (variables d'environnement côté serveur)

### 2. Installation des dépendances

```bash
npm install
# ou
pnpm install
```

## Structure du projet

### Fichiers clés pour Directus

```
src/lib/directus/
├── config.ts        # Configuration du client Directus
├── api.ts          # Fonctions pour requêtes Directus
├── types.ts        # Types TypeScript pour Directus
└── adapters.ts     # Convertisseurs Directus vers format interne
```

## Utilisation

### Récupérer des pages

```typescript
import { getPageBySlug } from '@/lib/directus/api';

const page = await getPageBySlug('/about');
```

### Récupérer des articles de blog

```typescript
import { getBlogPosts, getBlogPostBySlug } from '@/lib/directus/api';

const posts = await getBlogPosts();
const post = await getBlogPostBySlug('my-article');
```

### Adapter les données Directus

```typescript
import { adaptHeroSection, adaptFeaturesGridSection } from '@/lib/directus/adapters';

const heroData = adaptHeroSection(directusHeroSection);
const featuresData = adaptFeaturesGridSection(directusFeaturesSection);
```

## Structure Directus recommandée

### Collections à créer

#### 1. **pages**
- `id` (uuid, primary key)
- `title` (text)
- `slug` (text, unique)
- `description` (text)
- `meta_title` (text)
- `meta_description` (text)
- `status` (select: published, draft, archived)
- `sections` (one-to-many to page_sections)
- `created_at` (datetime)
- `updated_at` (datetime)
- `published_at` (datetime)

#### 2. **page_sections**
- `id` (uuid, primary key)
- `page_id` (foreign key to pages)
- `sort` (integer)
- `type` (select: hero, features_grid, testimonials, pricing, etc.)
- `component` (json)
- `created_at` (datetime)

#### 3. **blog_posts**
- `id` (uuid, primary key)
- `title` (text)
- `slug` (text, unique)
- `content` (text)
- `excerpt` (text)
- `featured_image` (file)
- `author_id` (foreign key to authors)
- `published_date` (datetime)
- `status` (select: published, draft, archived)
- `tags` (tags)
- `created_at` (datetime)
- `updated_at` (datetime)

#### 4. **authors**
- `id` (uuid, primary key)
- `name` (text)
- `email` (text)
- `avatar` (file)
- `bio` (text)

#### 5. **changelog**
- `id` (uuid, primary key)
- `title` (text)
- `slug` (text, unique)
- `description` (text)
- `date` (datetime)
- `version` (text)
- `type` (select: feature, bugfix, improvement, breaking)
- `created_at` (datetime)
- `updated_at` (datetime)

#### 6. **settings**
- `id` (uuid, primary key)
- `site_name` (text)
- `site_description` (text)
- `site_url` (text)
- `logo` (file)
- `favicon` (file)
- `default_meta_title` (text)
- `default_meta_description` (text)
- `social_links` (json)

## Accès à l'API Directus

Pour obtenir un token d'authentification :

1. Allez sur `https://directus.opaleplus.cloud`
2. Créez un compte ou connectez-vous
3. Générez un token statique dans les paramètres utilisateur
4. Ajoutez-le à `.env.local` comme `DIRECTUS_TOKEN`

## Migration depuis BaseHub

### Pages dynamiques

**Ancien code (BaseHub):**
```typescript
export const generateStaticParams = async () => {
  const data = await basehub().query({
    site: { pages: { items: { pathname: true } } }
  });
  return data.site.pages.items.map((item) => ({
    slug: item.pathname.split("/").filter(Boolean)
  }));
};
```

**Nouveau code (Directus):**
```typescript
export const generateStaticParams = async () => {
  const pages = await getPages();
  return pages.map((page: any) => ({
    slug: (page.slug || "").split("/").filter(Boolean)
  }));
};
```

## Rendering des sections

Le fichier `src/app/[[...slug]]/page-directus.tsx` contient une implémentation complète avec:

- Récupération des pages dynamiques
- Rendu conditionnel des sections
- Adaption des données Directus
- Gestion des métadonnées

### Utiliser la nouvelle page

Pour basculer vers la nouvelle implémentation Directus, renommez :
```bash
mv src/app/[[...slug]]/page.tsx src/app/[[...slug]]/page.basehub.tsx.bak
mv src/app/[[...slug]]/page-directus.tsx src/app/[[...slug]]/page.tsx
```

## Fonctionnalités

✅ Récupération des pages dynamiques
✅ Gestion des métadonnées SEO
✅ Articles de blog
✅ Changelog
✅ Adaptateurs de données
✅ Support TypeScript complet
✅ Types auto-générés

## Prochaines étapes

1. **Générer les types TypeScript:**
   ```bash
   npx @directus/sdk generate https://directus.opaleplus.cloud --token YOUR_TOKEN -o src/lib/directus/types.ts
   ```

2. **Adapter les sections existantes** pour consommer Directus directement

3. **Configurer les performances:**
   - Ajouter du cache côté client
   - Implémenter ISR (Incremental Static Regeneration)
   - Optimiser les requêtes Directus

4. **Sécurité:**
   - Utiliser les rôles Directus appropriés
   - Restreindre les accès API
   - Valider les données côté client

## Documentation

- [Directus SDK](https://docs.directus.io/guides/sdk.html)
- [Directus API](https://docs.directus.io/reference/api/rest.html)
- [Next.js Documentation](https://nextjs.org/docs)

## Support

Pour toute question, consultez:
- La documentation Directus: https://docs.directus.io
- Les sources du SDK: https://github.com/directus/directus
