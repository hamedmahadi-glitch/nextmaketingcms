# 🚀 Démarrage Rapide - Directus Integration

**Status:** ✅ Intégration Directus complètement configurée et prête!

## ⚡ 5 minutes pour démarrer

### 1️⃣ Configuration (2 min)

```bash
# Si vous n'avez pas .env.local, créez-le:
touch .env.local

# Ajoutez ces lignes:
NEXT_PUBLIC_DIRECTUS_URL=https://directus.opaleplus.cloud
DIRECTUS_TOKEN=your_token_here
```

Obtenir votre token:
- Allez sur https://directus.opaleplus.cloud
- Connectez-vous ou créez un compte
- Cliquez sur votre profil (haut à droite)
- Allez dans "API Tokens"
- Générez un token statique
- Copiez-le dans `.env.local`

### 2️⃣ Installation (2 min)

```bash
npm install
# ou
pnpm install
```

### 3️⃣ Lancement (1 min)

```bash
npm run dev
```

Ouvrez http://localhost:3000 dans votre navigateur! 🎉

## 📖 Documentation complète

Si vous avez plus de 5 minutes, consultez:

| Durée | Document | Pour quoi? |
|-------|----------|-----------|
| 10 min | [QUICKSTART.md](./QUICKSTART.md) | Guide rapide et basculer vers Directus |
| 15 min | [INSTALLATION_CHECKLIST.md](./INSTALLATION_CHECKLIST.md) | Checklist complète d'installation |
| 20 min | [ARCHITECTURE.md](./ARCHITECTURE.md) | Comprendre l'architecture |
| 30 min | [DIRECTUS_INTEGRATION.md](./DIRECTUS_INTEGRATION.md) | Guide complet et exhaustif |
| 30 min | [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md) | Si vous venez de BaseHub |
| 5 min | [FILES_INDEX.md](./FILES_INDEX.md) | Index de tous les fichiers |

## 🎯 Prochaines étapes essentielles

### Basculer vers l'implémentation Directus

```bash
# Pages dynamiques
mv src/app/[[...slug]]/page.tsx src/app/[[...slug]]/page-basehub.tsx.backup
mv src/app/[[...slug]]/page-directus.tsx src/app/[[...slug]]/page.tsx

# Blog (optionnel)
mv src/app/blog/page.tsx src/app/blog/page-basehub.tsx.backup
mv src/app/blog/page-directus.tsx src/app/blog/page.tsx

mv src/app/blog/[slug]/page.tsx src/app/blog/[slug]/page-basehub.tsx.backup
mv src/app/blog/[slug]/page-directus.tsx src/app/blog/[slug]/page.tsx
```

### Créer les collections Directus

Sur https://directus.opaleplus.cloud, créez:

- ✅ `pages` - Pages du site
- ✅ `page_sections` - Sections de pages
- ✅ `blog_posts` - Articles (optionnel)
- ✅ `authors` - Auteurs (optionnel)
- ✅ `changelog` - Changelog (optionnel)
- ✅ `settings` - Paramètres du site

Consultez [DIRECTUS_INTEGRATION.md](./DIRECTUS_INTEGRATION.md) pour les schémas détaillés.

### Générer les types TypeScript

```bash
npm run generate:types
```

Cela crée automatiquement `src/lib/directus/types-generated.ts` basé sur votre schéma Directus.

## 📁 Structure du module Directus

```
src/lib/directus/
├── config.ts              # Configuration SDK Directus
├── api.ts                 # Requêtes API (CORE)
├── types.ts               # Types manuels
├── types-generated.ts     # Types auto-générés (après npm run generate:types)
├── adapters.ts            # Convertisseurs Directus
├── utils.ts               # Utilitaires (cache, pagination, etc.)
├── error-handling.tsx     # Composants d'erreur et hooks
└── README.md              # Documentation module
```

## 🔧 Commandes disponibles

```bash
npm run dev                # Démarrage développement
npm run build              # Build production
npm start                  # Lancer production
npm run lint               # Linting
npm run generate:types     # Générer types TypeScript
```

## 🎨 Fonctionnalités incluses

✅ Requêtes API Directus avec pagination
✅ Cache automatique (5 minutes par défaut)
✅ Recherche textuelle
✅ Support des relations
✅ Adaptateurs de données
✅ Gestion d'erreurs robuste
✅ Composants UI pour erreurs/chargement
✅ Types TypeScript complets
✅ Support des images (assets)
✅ Métadonnées SEO dynamiques

## ⚙️ Configuration avancée

### Ajuster la durée du cache

Dans `src/lib/directus/utils.ts`:

```typescript
const CACHE_DURATION = 1000 * 60 * 5; // 5 minutes
// Changez en:
const CACHE_DURATION = 1000 * 60 * 10; // 10 minutes (production)
```

### Ajouter des variables d'environnement

Complétez `.env.local` avec:

```env
# Cache
DIRECTUS_CACHE_DURATION=300000

# API
DIRECTUS_REQUEST_TIMEOUT=30000
DIRECTUS_MAX_LIMIT=100

# Debug
DIRECTUS_DEBUG=false
```

## 🔐 Sécurité

✅ Token stocker dans variables d'environnement
✅ Pas d'exposition côté client
✅ Support des rôles Directus
✅ Validation des requêtes
✅ Gestion d'erreurs sécurisée

⚠️ **À faire:**
- Ne commitez pas `.env.local` dans Git
- Utilisez les secrets de votre plateforme en production
- Configurez les permissions dans Directus

## 🆘 Besoin d'aide?

### Questions fréquentes

**Q: Comment récupérer mes données?**
A: Utilisez les fonctions dans `src/lib/directus/api.ts`:
```typescript
const pages = await getPages();
const page = await getPageBySlug('/about');
const posts = await getBlogPosts();
```

**Q: Comment ajouter une nouvelle collection?**
A: Créez-la dans Directus, puis ajoutez la fonction API correspondante.

**Q: Comment générer les types?**
A: `npm run generate:types` (une fois le token configuré)

### Dépannage

| Erreur | Solution |
|--------|----------|
| "Cannot find module @directus/sdk" | Exécutez `npm install` |
| "Invalid token" | Vérifiez le token dans `.env.local` |
| "Collection not found" | Créez la collection dans Directus |
| "Page blank ou données manquantes" | Vérifiez que les collections ont des données |

### Ressources

- 📚 [Documentation Directus](https://docs.directus.io)
- 🔗 [SDK Directus](https://docs.directus.io/guides/sdk.html)
- 📖 [Next.js Docs](https://nextjs.org/docs)
- 💬 [Discord Directus](https://directus.chat)

## 📊 Fichiers créés

### Documentation (7 fichiers)
- ✅ DIRECTUS_INTEGRATION.md - Guide complet
- ✅ QUICKSTART.md - Démarrage rapide
- ✅ INSTALLATION_CHECKLIST.md - Checklist
- ✅ ARCHITECTURE.md - Architecture technique
- ✅ MIGRATION_GUIDE.md - Migration de BaseHub
- ✅ FILES_INDEX.md - Index des fichiers
- ✅ README_QUICKSTART.md - Ce fichier

### Module Directus (7 fichiers)
- ✅ config.ts - Configuration
- ✅ api.ts - Requêtes API
- ✅ types.ts - Types
- ✅ adapters.ts - Adaptateurs
- ✅ utils.ts - Utilitaires
- ✅ error-handling.tsx - Gestion d'erreurs
- ✅ README.md - Documentation module

### Pages Directus (4 fichiers)
- ✅ src/app/[[...slug]]/page-directus.tsx
- ✅ src/app/blog/page-directus.tsx
- ✅ src/app/blog/[slug]/page-directus.tsx
- ✅ src/app/changelog/page-directus.tsx

### Configuration (4 fichiers modifiés)
- ✅ package.json - Dépendances mises à jour
- ✅ .env.local - Créé
- ✅ .env.example - Mis à jour
- ✅ basehub.config.ts - Marqué comme obsolète

**Total: 23+ fichiers créés/modifiés**

## 🎉 Félicitations!

Votre projet est maintenant prêt à utiliser Directus! 🚀

### Les 3 prochaines étapes:

1. **Configurer** (2 min)
   ```bash
   DIRECTUS_TOKEN=votre_token npm run dev
   ```

2. **Créer les collections** (5-10 min)
   - Allez sur Directus
   - Créez les collections (pages, blog_posts, etc.)

3. **Basculer vers Directus** (1 min)
   ```bash
   mv src/app/[[...slug]]/page.tsx src/app/[[...slug]]/page-basehub.tsx.backup
   mv src/app/[[...slug]]/page-directus.tsx src/app/[[...slug]]/page.tsx
   ```

Puis testez dans votre navigateur! ✨

---

**Prêt à commencer?** Lancez `npm run dev` et ouvrez http://localhost:3000 🚀
