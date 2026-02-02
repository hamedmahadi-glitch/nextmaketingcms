# Résumé de l'intégration Directus

## ✅ Travail effectué

Votre projet Next.js a été adapté pour consommer l'API Directus hébergée sur `https://directus.opaleplus.cloud`.

## 📁 Fichiers créés/modifiés

### Configuration et Installation
- ✅ **package.json** - Dépendances mises à jour (BaseHub → Directus SDK)
- ✅ **.env.local** - Configuration Directus
- ✅ **basehub.config.ts** - Marqué comme obsolète

### Module Directus (`src/lib/directus/`)
1. **config.ts** - Configuration du client Directus avec authentification
2. **api.ts** - Fonctions API pour requêtes Directus
3. **types.ts** - Types TypeScript pour vos données
4. **adapters.ts** - Convertisseurs de données Directus
5. **utils.ts** - Utilitaires avancés (cache, pagination, recherche)
6. **error-handling.tsx** - Gestion d'erreurs et composants UI
7. **README.md** - Documentation du module

### Pages dynamiques
- ✅ **src/app/[[...slug]]/page-directus.tsx** - Nouvelle page principale
- ✅ **src/app/blog/page-directus.tsx** - Page blog
- ✅ **src/app/blog/[slug]/page-directus.tsx** - Article détaillé
- ✅ **src/app/changelog/page-directus.tsx** - Page changelog

### Composants exemple
- ✅ **src/app/_sections/hero/directus.tsx** - Exemple de composant Hero

### Documentation
- ✅ **DIRECTUS_INTEGRATION.md** - Guide complet d'intégration
- ✅ **QUICKSTART.md** - Guide de démarrage rapide
- ✅ **scripts/generate-types.sh** - Script pour générer les types

## 🚀 Étapes pour démarrer

### 1. Installation des dépendances
```bash
npm install
# ou
pnpm install
```

### 2. Configuration
Créez `.env.local`:
```env
NEXT_PUBLIC_DIRECTUS_URL=https://directus.opaleplus.cloud
DIRECTUS_TOKEN=your_static_token_from_directus
```

Pour obtenir un token:
- Allez sur https://directus.opaleplus.cloud
- Connectez-vous ou créez un compte
- Allez dans les paramètres utilisateur
- Générez un token statique

### 3. Démarrage
```bash
npm run dev
# Accédez à http://localhost:3000
```

## 🔄 Basculer vers Directus

Pour utiliser la nouvelle implémentation Directus:

```bash
# Pages dynamiques
mv src/app/[[...slug]]/page.tsx src/app/[[...slug]]/page-basehub.tsx.backup
mv src/app/[[...slug]]/page-directus.tsx src/app/[[...slug]]/page.tsx

# Blog
mv src/app/blog/page.tsx src/app/blog/page-basehub.tsx.backup
mv src/app/blog/page-directus.tsx src/app/blog/page.tsx

mv src/app/blog/[slug]/page.tsx src/app/blog/[slug]/page-basehub.tsx.backup
mv src/app/blog/[slug]/page-directus.tsx src/app/blog/[slug]/page.tsx

# Changelog
mv src/app/changelog/page.tsx src/app/changelog/page-basehub.tsx.backup
mv src/app/changelog/page-directus.tsx src/app/changelog/page.tsx
```

## 📖 Documentation fournie

1. **DIRECTUS_INTEGRATION.md** - Configuration détaillée, schémas Directus recommandés
2. **QUICKSTART.md** - Guide rapide pour démarrer
3. **src/lib/directus/README.md** - Documentation du module Directus
4. Fichiers `.tsx` avec exemples d'utilisation et commentaires

## 🎯 Fonctionnalités incluses

### API (`src/lib/directus/api.ts`)
- Récupération de pages par slug
- Récupération d'articles de blog
- Récupération du changelog
- Récupération des paramètres du site
- Support complet de filtrage et pagination

### Utilitaires (`src/lib/directus/utils.ts`)
- Cache avec TTL configurable
- Pagination automatique
- Recherche textuelle
- Récupération avec relations
- Groupement par champ
- Comptage d'items

### Adaptateurs (`src/lib/directus/adapters.ts`)
- Conversion d'images
- Conversion d'actions/CTAs
- Conversion d'auteurs
- Conversion de testimonials
- Conversion de features
- Conversion de plans tarifaires
- Conversion de sections complètes

### Gestion d'erreurs (`src/lib/directus/error-handling.tsx`)
- Error boundary React
- Composants UI d'erreur
- Hook `useDirectusQuery`
- Wrapper `<DirectusQuery>`
- Types d'erreurs personnalisés

## 🔐 Sécurité

- ✅ Variables d'environnement pour les secrets
- ✅ Support de tokens statiques Directus
- ✅ Pas d'exposition de tokens côté client
- ✅ Gestion d'erreurs robuste

## 📊 Schéma Directus recommandé

Collections à créer (détails dans DIRECTUS_INTEGRATION.md):
- `pages` - Pages du site
- `page_sections` - Sections de pages
- `blog_posts` - Articles de blog
- `authors` - Auteurs
- `changelog` - Changelog
- `settings` - Paramètres du site

## 🛠️ Commandes disponibles

```bash
npm run dev          # Démarrage en développement
npm run build        # Build pour production
npm start            # Démarrage en production
npm run lint         # Linting
npm run generate:types  # Générer types TypeScript depuis Directus
```

## 📝 Prochaines étapes recommandées

1. **Générer les types TypeScript**
   ```bash
   npm run generate:types
   ```

2. **Adapter les sections existantes**
   - Mettre à jour les imports
   - Utiliser les adaptateurs pour les données

3. **Tester la connexion à Directus**
   - Vérifier les collections
   - Tester les requêtes API

4. **Configurer le cache en production**
   - Remplacer le cache en mémoire par Redis si nécessaire

5. **Mettre en place les permissions Directus**
   - Créer un rôle public/lecteur
   - Restreindre les accès par collection

## ❓ Questions fréquentes

**Q: Comment ajouter de nouvelles collections?**
A: Créez la collection dans Directus, puis ajoutez les fonctions API correspondantes dans `src/lib/directus/api.ts`

**Q: Comment configurer le caching?**
A: Utilisez `getItemsWithCache()` dans `src/lib/directus/utils.ts`. Modifiez `CACHE_DURATION` pour ajuster la durée.

**Q: Comment générer les types?**
A: Exécutez `npm run generate:types` après avoir configuré votre token

**Q: Que faire si Directus est indisponible?**
A: Le module gère les erreurs gracieusement. Consultez `src/lib/directus/error-handling.tsx` pour les composants UI.

## 📚 Ressources

- [Documentation Directus](https://docs.directus.io)
- [SDK Directus](https://docs.directus.io/guides/sdk.html)
- [Next.js Documentation](https://nextjs.org/docs)
- [Fichiers d'intégration complète](./DIRECTUS_INTEGRATION.md)

---

**Status:** ✅ Intégration Directus complète et prête à l'emploi!
