# Démarrage rapide - Directus Integration

## Installation

```bash
# Installer les dépendances
npm install
# ou
pnpm install
```

## Configuration

1. **Créer le fichier `.env.local`:**

```env
NEXT_PUBLIC_DIRECTUS_URL=https://directus.opaleplus.cloud
DIRECTUS_TOKEN=your_static_token_from_directus
```

2. **Obtenir un token Directus:**
   - Allez sur https://directus.opaleplus.cloud
   - Connectez-vous ou créez un compte
   - Allez dans les paramètres utilisateur
   - Générez un token statique
   - Copiez-le dans `.env.local`

## Développement

```bash
# Démarrer le serveur de développement
npm run dev

# Accédez à l'application
# http://localhost:3000
```

## Basculer vers Directus

Pour utiliser la nouvelle implémentation Directus à la place de BaseHub:

### Pages dynamiques
```bash
mv src/app/[[...slug]]/page.tsx src/app/[[...slug]]/page-basehub.tsx.backup
mv src/app/[[...slug]]/page-directus.tsx src/app/[[...slug]]/page.tsx
```

### Blog
```bash
mv src/app/blog/page.tsx src/app/blog/page-basehub.tsx.backup
mv src/app/blog/page-directus.tsx src/app/blog/page.tsx

mv src/app/blog/[slug]/page.tsx src/app/blog/[slug]/page-basehub.tsx.backup
mv src/app/blog/[slug]/page-directus.tsx src/app/blog/[slug]/page.tsx
```

### Changelog
```bash
mv src/app/changelog/page.tsx src/app/changelog/page-basehub.tsx.backup
mv src/app/changelog/page-directus.tsx src/app/changelog/page.tsx
```

## Build et Production

```bash
# Build pour la production
npm run build

# Démarrer le serveur de production
npm start
```

## Structure du projet

Fichiers clés pour l'intégration Directus:

```
src/lib/directus/
├── config.ts        # Configuration du client Directus
├── api.ts          # Requêtes API Directus
├── types.ts        # Types TypeScript
├── adapters.ts     # Convertisseurs de données
└── utils.ts        # Utilitaires (cache, pagination, etc.)

src/app/
├── [[...slug]]/
│   ├── page.tsx              # (remplacer avec page-directus.tsx)
│   └── page-directus.tsx     # ✅ Nouvelle implémentation
├── blog/
│   ├── page.tsx              # (remplacer avec page-directus.tsx)
│   ├── page-directus.tsx     # ✅ Nouvelle implémentation
│   └── [slug]/
│       ├── page.tsx          # (remplacer avec page-directus.tsx)
│       └── page-directus.tsx # ✅ Nouvelle implémentation
└── changelog/
    ├── page.tsx              # (remplacer avec page-directus.tsx)
    └── page-directus.tsx     # ✅ Nouvelle implémentation
```

## Fonctionnalités disponibles

### API Directus (`src/lib/directus/api.ts`)

- `getItems(collection)` - Récupère tous les items
- `getItem(collection, id)` - Récupère un item spécifique
- `getPages()` - Récupère les pages
- `getPageBySlug(slug)` - Récupère une page par slug
- `getBlogPosts()` - Récupère les articles de blog
- `getBlogPostBySlug(slug)` - Récupère un article par slug
- `getChangelogItems()` - Récupère les items du changelog
- `getChangelogItemBySlug(slug)` - Récupère un item du changelog
- `getSiteSettings()` - Récupère les paramètres du site

### Utilitaires (`src/lib/directus/utils.ts`)

- `getItemsWithCache()` - Récupère avec mise en cache
- `getItemsPaginated()` - Pagination
- `searchItems()` - Recherche simple
- `getItemsWithRelations()` - Récupère avec relations
- `countItems()` - Compte les items
- `getItemsGroupedBy()` - Groupe par un champ
- `clearCache()` - Vide le cache

### Adaptateurs (`src/lib/directus/adapters.ts`)

Convertissent les données Directus au format attendu:

- `adaptDirectusImage()` - Image
- `adaptAction()` - Lien/CTA
- `adaptAuthor()` - Auteur
- `adaptTestimonial()` - Testimonial
- `adaptFeature()` - Feature
- `adaptPricingPlan()` - Plan tarifaire
- `adaptHeroSection()` - Section hero
- `adaptFeaturesGridSection()` - Features grid
- `adaptTestimonialsSection()` - Testimonials
- `adaptPricingSection()` - Pricing

## Dépannage

### Erreur: "Collection not found"
- Vérifiez que votre instance Directus a les collections créées
- Consultez `DIRECTUS_INTEGRATION.md` pour les structures recommandées

### Erreur: "Invalid token"
- Vérifiez votre token dans `.env.local`
- Assurez-vous que le token n'a pas expiré

### Les données ne se chargent pas
- Vérifiez `NEXT_PUBLIC_DIRECTUS_URL` dans `.env.local`
- Assurez-vous que Directus est accessible
- Vérifiez les permissions du rôle Directus

### Performances lentes
- Activez le cache avec `getItemsWithCache()`
- Limitez les champs récupérés avec l'option `fields`
- Utilisez la pagination avec `getItemsPaginated()`

## Documentation

- [Guide complet](./DIRECTUS_INTEGRATION.md)
- [Directus Documentation](https://docs.directus.io)
- [SDK Directus](https://docs.directus.io/guides/sdk.html)
- [Next.js Documentation](https://nextjs.org/docs)

## Support

Pour plus d'aide:
1. Consultez le guide d'intégration complet
2. Vérifiez la documentation Directus
3. Consultez les exemples de code fournis
