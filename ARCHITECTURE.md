# Architecture - Intégration Directus Next.js

## Vue d'ensemble

```
┌─────────────────────────────────────────────────────────────┐
│                    Application Next.js                       │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │           Pages et Composants React                     │ │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │ │
│  │  │ Pages        │  │ Blog Posts   │  │ Changelog    │  │ │
│  │  │ Dynamiques   │  │              │  │              │  │ │
│  │  └──────────────┘  └──────────────┘  └──────────────┘  │ │
│  │         │                 │                 │            │ │
│  │         └─────────────────┴─────────────────┘            │ │
│  │                     │                                    │ │
│  └─────────────────────┼────────────────────────────────────┘ │
│                        │                                      │
│  ┌─────────────────────▼────────────────────────────────────┐ │
│  │          Module Directus (src/lib/directus/)             │ │
│  │                                                           │ │
│  │  ┌─────────────────────────────────────────────────────┐ │ │
│  │  │  API Functions (api.ts)                             │ │ │
│  │  │  • getPages()                                       │ │ │
│  │  │  • getPageBySlug()                                  │ │ │
│  │  │  • getBlogPosts()                                   │ │ │
│  │  │  • getBlogPostBySlug()                              │ │ │
│  │  │  • getChangelogItems()                              │ │ │
│  │  │  • getSiteSettings()                                │ │ │
│  │  └──────────────┬──────────────────────────────────────┘ │ │
│  │                 │                                         │ │
│  │  ┌──────────────▼──────────────────────────────────────┐ │ │
│  │  │  Directus Client (config.ts)                        │ │ │
│  │  │  • Authentification                                 │ │ │
│  │  │  • Configuration SDK                                │ │ │
│  │  │  • Gestion des tokens                               │ │ │
│  │  └──────────────┬──────────────────────────────────────┘ │ │
│  │                 │                                         │ │
│  │  ┌──────────────▼──────────────────────────────────────┐ │ │
│  │  │  Utilitaires (utils.ts)                             │ │ │
│  │  │  • Cache avec TTL                                   │ │ │
│  │  │  • Pagination                                       │ │ │
│  │  │  • Recherche                                        │ │ │
│  │  │  • Groupement                                       │ │ │
│  │  └─────────────────────────────────────────────────────┘ │ │
│  │                                                           │ │
│  │  ┌─────────────────────────────────────────────────────┐ │ │
│  │  │  Adaptateurs (adapters.ts)                          │ │ │
│  │  │  • adaptDirectusImage()                             │ │ │
│  │  │  • adaptAction()                                    │ │ │
│  │  │  • adaptAuthor()                                    │ │ │
│  │  │  • adaptHeroSection()                               │ │ │
│  │  │  • ...autres adaptateurs                            │ │ │
│  │  └─────────────────────────────────────────────────────┘ │ │
│  │                                                           │ │
│  │  ┌─────────────────────────────────────────────────────┐ │ │
│  │  │  Gestion d'erreurs (error-handling.tsx)             │ │ │
│  │  │  • DirectusErrorBoundary                            │ │ │
│  │  │  • DirectusLoadingFallback                          │ │ │
│  │  │  • useDirectusQuery hook                            │ │ │
│  │  │  • Composants UI d'erreur                           │ │ │
│  │  └─────────────────────────────────────────────────────┘ │ │
│  │                                                           │ │
│  │  ┌─────────────────────────────────────────────────────┐ │ │
│  │  │  Types (types.ts, types-generated.ts)               │ │ │
│  │  │  • Page, BlogPost, Author                           │ │ │
│  │  │  • Changelog, Settings                              │ │ │
│  │  │  • Types générés depuis Directus                    │ │ │
│  │  └─────────────────────────────────────────────────────┘ │ │
│  │                                                           │ │
│  └───────────────────────────┬────────────────────────────────┘ │
│                              │                                  │
└──────────────────────────────┼──────────────────────────────────┘
                               │
                 ┌─────────────▼──────────────┐
                 │   API REST Directus        │
                 │                            │
                 │ https://directus.          │
                 │ opaleplus.cloud            │
                 │                            │
                 │ Collections:               │
                 │ • pages                    │
                 │ • blog_posts               │
                 │ • authors                  │
                 │ • changelog                │
                 │ • settings                 │
                 │                            │
                 └────────────────────────────┘
```

## Flux de données

```
┌─────────────────┐
│ Page/Composant  │
│ React           │
└────────┬────────┘
         │
         │ import { getPageBySlug } from '@/lib/directus/api'
         │
         ▼
┌─────────────────────────────────────────────┐
│ API Function (api.ts)                       │
│ await getPageBySlug('/about')               │
└────────┬────────────────────────────────────┘
         │
         │ Vérifie le cache (utils.ts)
         │
         ├─ Cache HIT? ──> Retourne les données en cache
         │
         └─ Cache MISS?
                │
                ▼
         ┌──────────────────────────┐
         │ Directus Client          │
         │ (config.ts)              │
         │                          │
         │ • Ajoute l'authentif.    │
         │ • Crée la requête REST   │
         └────────┬─────────────────┘
                  │
                  ▼
         ┌──────────────────────────┐
         │ API REST Directus        │
         │ https://directus...      │
         │ /items/pages?...         │
         └────────┬─────────────────┘
                  │
         ┌────────▼─────────┐
         │ Réponse JSON     │
         └────────┬─────────┘
                  │
                  ▼
         ┌──────────────────────────────┐
         │ Adaptateur (adapters.ts)     │
         │ Convertit données Directus   │
         │ en format composant         │
         └────────┬─────────────────────┘
                  │
                  ▼
         ┌──────────────────────────────┐
         │ Cache mis à jour             │
         │ (avec TTL)                   │
         └────────┬─────────────────────┘
                  │
                  ▼
         ┌──────────────────────────────┐
         │ Données retournées           │
         │ au composant                 │
         └────────┬─────────────────────┘
                  │
                  ▼
         ┌──────────────────────────────┐
         │ Rendu React                  │
         │ de la page                   │
         └──────────────────────────────┘
```

## Architecture des fichiers

```
src/
├── app/
│   ├── [[...slug]]/
│   │   ├── page.tsx (à remplacer)
│   │   └── page-directus.tsx (nouvelle)
│   ├── blog/
│   │   ├── page.tsx (à remplacer)
│   │   ├── page-directus.tsx (nouvelle)
│   │   └── [slug]/
│   │       ├── page.tsx (à remplacer)
│   │       └── page-directus.tsx (nouvelle)
│   ├── changelog/
│   │   ├── page.tsx (à remplacer)
│   │   └── page-directus.tsx (nouvelle)
│   └── _sections/
│       └── hero/
│           ├── index.tsx (original)
│           └── directus.tsx (nouvelle)
│
├── lib/
│   └── directus/ ⭐ MODULE DIRECTUS
│       ├── config.ts           # Client Directus
│       ├── api.ts              # Requêtes API
│       ├── types.ts            # Types manuels
│       ├── types-generated.ts  # Types générés (auto)
│       ├── adapters.ts         # Convertisseurs
│       ├── utils.ts            # Utilitaires
│       ├── error-handling.tsx  # Gestion d'erreurs
│       └── README.md           # Documention module
│
└── common/
    ├── button.tsx
    ├── heading.tsx
    └── ...
```

## Interactions avec Directus

### Schéma simplifié

```
┌──────────────────────────────┐
│ Directus Instance            │
│ directus.opaleplus.cloud    │
└──────────────────────────────┘
        │
        ├─── Collections
        │    ├── pages (meta, contenu)
        │    ├── blog_posts (articles)
        │    ├── authors (auteurs)
        │    ├── changelog (historique)
        │    └── settings (config site)
        │
        ├─── Files (stockage d'images)
        │    ├── Images featured
        │    ├── Logos
        │    └── Avatars
        │
        ├─── Roles & Permissions
        │    ├── Admin (accès complet)
        │    ├── Editor (modification)
        │    └── Public (lecture seule)
        │
        └─── API REST
             └── /api/rest/items/{collection}
                 ├── Pagination
                 ├── Filtrage
                 ├── Tri
                 └── Recherche
```

## Exemple: Requête de page

```
Navigateur demande: GET /about

Next.js reçoit les params: slug = ['about']

┌─────────────────────────────────┐
│ page.tsx [[...slug]]            │
└────────────┬────────────────────┘
             │
             ▼
┌─────────────────────────────────┐
│ await getPageBySlug('/about')    │
└────────────┬────────────────────┘
             │
         Vérification cache
             │
             ├─ Cache miss
             │
             ▼
┌─────────────────────────────────┐
│ directus.request(readItems(      │
│   'pages',                        │
│   {filter: {slug: {_eq: '/about'}}}│
│ ))                               │
└────────────┬────────────────────┘
             │
    Appel REST API Directus
    GET /items/pages?filter[slug][_eq]=/about
             │
             ▼
┌─────────────────────────────────┐
│ Réponse JSON de Directus:       │
│ {                               │
│   "data": [{                    │
│     "id": "123",                │
│     "title": "About Us",        │
│     "slug": "/about",           │
│     "sections": [...]           │
│   }]                            │
│ }                               │
└────────────┬────────────────────┘
             │
             ▼
┌─────────────────────────────────┐
│ Mise en cache (5 min)           │
└────────────┬────────────────────┘
             │
             ▼
┌─────────────────────────────────┐
│ Rendu de la page React          │
│ avec données de Directus        │
└─────────────────────────────────┘
```

## Performance & Optimisations

```
Request → Next.js Server
            │
            ├─ Cache Check (5 min TTL)
            │  ├─ Cache HIT → Return (< 1ms)
            │  └─ Cache MISS
            │             │
            │             ▼
            │         Directus API
            │         │
            │         ├─ Requête optimisée
            │         │  (champs spécifiques)
            │         │
            │         └─ Réponse
            │
            ├─ Adaptation des données
            │
            ├─ Mise en cache
            │
            └─ Rendu React
                      │
                      ▼
                    Response
```

## Sécurité

```
┌────────────────────────────────┐
│ Application Next.js            │
└────────────────────────────────┘
        │
        │ Requête authentifiée
        │ (Header: Authorization)
        │
        ├─ Variables d'environnement
        │  ├─ NEXT_PUBLIC_DIRECTUS_URL (public)
        │  └─ DIRECTUS_TOKEN (privé)
        │
        ▼
┌────────────────────────────────┐
│ Directus API                   │
└────────────────────────────────┘
        │
        ├─ Authentification Token
        │
        ├─ Validation Token
        │
        ├─ Vérification Permissions
        │  └─ (Rôle + Collection)
        │
        └─ Retour données autorisées
```

---

Cette architecture permet une séparation claire des responsabilités et facilite la maintenance et les évolutions futures.
