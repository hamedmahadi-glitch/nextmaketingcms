# Guide de Migration BaseHub → Directus

Ce guide vous aide à migrer votre projet de BaseHub à Directus pas à pas.

## 📊 Comparaison

| Aspect | BaseHub | Directus |
|--------|---------|----------|
| Type | Headless CMS API-first | Headless CMS open source |
| Modèle | Cloud-native | Self-hosted ou cloud |
| GraphQL | ✅ Oui | ❌ REST API |
| Authentification | Bearer token | Token statique/dynamique |
| Types | Générés automatiquement | À générer avec CLI |
| Cache | Intégré au SDK | À implémenter |
| Prix | Payant | Gratuit/Open source |

## 🔄 Étapes de migration

### Phase 1: Préparation

#### Étape 1.1: Sauvegarde
```bash
# Commit vos changements
git add .
git commit -m "Backup avant migration Directus"

# Créer une branche
git checkout -b feature/directus-migration
```

#### Étape 1.2: Vérifier les dépendances BaseHub
```bash
npm ls basehub
```

#### Étape 1.3: Lire la documentation
- Lire `DIRECTUS_INTEGRATION.md`
- Lire `QUICKSTART.md`
- Lire `ARCHITECTURE.md`

### Phase 2: Installation

#### Étape 2.1: Installer Directus SDK
```bash
npm install @directus/sdk
```

#### Étape 2.2: Créer la configuration
- Copier `src/lib/directus/config.ts`
- Copier `src/lib/directus/api.ts`
- Copier autres fichiers du module

#### Étape 2.3: Configurer l'environnement
```bash
cp .env.example .env.local
# Remplir DIRECTUS_TOKEN
```

### Phase 3: Configuration Directus

#### Étape 3.1: Créer les collections
Dans votre instance Directus, créer:

1. **pages**
   ```
   - id (UUID, primary)
   - title (String)
   - slug (String, unique)
   - description (Text)
   - meta_title (String)
   - meta_description (String)
   - status (Select: published/draft/archived)
   - sections (One-to-Many → page_sections)
   - created_at, updated_at, published_at (DateTime)
   ```

2. **page_sections**
   ```
   - id (UUID, primary)
   - page_id (Foreign Key → pages)
   - sort (Integer)
   - type (String)
   - component (JSON)
   - created_at (DateTime)
   ```

3. **blog_posts**
   ```
   - id (UUID, primary)
   - title (String)
   - slug (String, unique)
   - content (Text/Rich Text)
   - excerpt (String)
   - featured_image (File)
   - author_id (Foreign Key → authors)
   - published_date (DateTime)
   - status (Select)
   - tags (Tags)
   - created_at, updated_at (DateTime)
   ```

4. **authors**
   ```
   - id (UUID, primary)
   - name (String)
   - email (String)
   - avatar (File)
   - bio (Text)
   ```

5. **changelog**
   ```
   - id (UUID, primary)
   - title (String)
   - slug (String, unique)
   - description (Text)
   - date (DateTime)
   - version (String)
   - type (Select: feature/bugfix/improvement/breaking)
   - created_at, updated_at (DateTime)
   ```

6. **settings**
   ```
   - id (UUID, primary)
   - site_name (String)
   - site_description (Text)
   - site_url (URL)
   - logo (File)
   - favicon (File)
   - default_meta_title (String)
   - default_meta_description (String)
   - social_links (JSON)
   ```

#### Étape 3.2: Importer les données (optionnel)

Si vous avez des données dans BaseHub:

```bash
# Exporter de BaseHub
# → Format JSON/CSV

# Importer dans Directus
# Via l'UI ou API
```

### Phase 4: Migration du code

#### Étape 4.1: Mettre à jour les imports

**Avant (BaseHub):**
```typescript
import { basehub, fragmentOn } from "basehub";
import { Pump } from "basehub/react-pump";
```

**Après (Directus):**
```typescript
import { getPageBySlug } from "@/lib/directus/api";
import { DirectusErrorBoundary } from "@/lib/directus/error-handling";
```

#### Étape 4.2: Mettre à jour les requêtes

**Avant (BaseHub GraphQL):**
```typescript
const data = await basehub().query({
  site: {
    pages: {
      __args: {
        filter: {
          pathname: { eq: "/" },
        },
      },
      items: {
        title: true,
        pathname: true,
        sections: {
          __typename: true,
          on_HeroComponent: heroFragment,
        },
      },
    },
  },
});
```

**Après (Directus REST):**
```typescript
const page = await getPageBySlug("/");

if (page) {
  const title = page.title;
  const slug = page.slug;
  const sections = page.sections;
}
```

#### Étape 4.3: Pages dynamiques

**Avant:**
```typescript
export const generateStaticParams = async () => {
  const data = await basehub().query({ ... });
  return data.site.pages.items.map(...);
};
```

**Après:**
```typescript
export const generateStaticParams = async () => {
  const pages = await getPages();
  return pages.map(page => ({
    slug: page.slug.split("/").filter(Boolean)
  }));
};
```

#### Étape 4.4: Métadonnées

**Avant:**
```typescript
export const generateMetadata = async () => {
  const data = await basehub().query({
    site: { settings: { metadata: { ... } } }
  });
  return { title: data.site.settings.metadata.title };
};
```

**Après:**
```typescript
export const generateMetadata = async () => {
  const settings = await getSiteSettings();
  return { title: settings?.site_name };
};
```

### Phase 5: Test et validation

#### Étape 5.1: Tester localement
```bash
npm run dev
# Vérifier http://localhost:3000
```

#### Étape 5.2: Vérifier les pages
- [ ] Page d'accueil se charge
- [ ] Blog se charge
- [ ] Articles se chargent
- [ ] Changelog se charge (si applicable)

#### Étape 5.3: Vérifier les données
- [ ] Les titres sont affichés
- [ ] Les images se chargent
- [ ] Les liens fonctionnent
- [ ] Les metadonnées sont correctes

### Phase 6: Déploiement

#### Étape 6.1: Build de production
```bash
npm run build
```

#### Étape 6.2: Tester le build
```bash
npm start
```

#### Étape 6.3: Variables d'environnement

Sur votre plateforme de déploiement (Vercel, Netlify, etc.):

1. Ajouter `NEXT_PUBLIC_DIRECTUS_URL`
2. Ajouter `DIRECTUS_TOKEN`
3. Redéployer

#### Étape 6.4: Déployer
```bash
git push origin feature/directus-migration
# Créer une Pull Request
# Fusionner après review
```

### Phase 7: Post-migration

#### Étape 7.1: Optimisation
- Configurer le cache en production
- Tester les performances
- Ajuster les TTL du cache

#### Étape 7.2: Nettoyage
```bash
# Supprimer les fichiers BaseHub non utilisés
rm basehub.config.ts
rm basehub-types.d.ts
```

#### Étape 7.3: Monitoring
- Monitorer les erreurs
- Vérifier les logs
- Tester les pages régulièrement

## 🔗 Correspondances BaseHub → Directus

### Collections

| BaseHub | Directus |
|---------|----------|
| `site.pages` | `pages` collection |
| `site.blog` | `blog_posts` collection |
| `collections.authors` | `authors` collection |
| Site settings | `settings` collection |

### Types de composants

| BaseHub | Directus |
|---------|----------|
| `HeroComponent` | `type: "hero"` |
| `FeaturesGridComponent` | `type: "features_grid"` |
| `TestimonialSliderComponent` | `type: "testimonials_slider"` |
| Etc. | Adaptez selon votre schema |

## 📝 Checklist de migration

### Avant
- [ ] Sauvegarder le code BaseHub
- [ ] Créer une branche Git
- [ ] Lire la documentation Directus
- [ ] Créer un compte Directus

### Pendant
- [ ] Installer Directus SDK
- [ ] Créer les collections Directus
- [ ] Mettre à jour la configuration
- [ ] Migrer les pages
- [ ] Mettre à jour les composants
- [ ] Mettre à jour les requêtes API

### Après
- [ ] Tester localement
- [ ] Tester en production
- [ ] Monitorer les erreurs
- [ ] Supprimer les fichiers BaseHub
- [ ] Documenter les changements

## 🆘 Dépannage

### Problème: "Cannot find module 'basehub'"

**Cause:** Vous utilisez encore des imports BaseHub

**Solution:**
```bash
grep -r "from.*basehub" src/
grep -r "import.*basehub" src/
```
Remplacer par les imports Directus correspondants

### Problème: "TypeError: Cannot read property 'data' of undefined"

**Cause:** La structure des données a changé

**Solution:**
Vérifier que vous utilisez la bonne structure:
```typescript
// Directus retourne directement l'array
const pages = await getPages();
// NOT pages.data.items
```

### Problème: "Invalid token"

**Cause:** Token Directus invalide ou expiré

**Solution:**
1. Régénérer le token dans Directus
2. Mettre à jour `.env.local`
3. Redémarrer le serveur

### Problème: "Collection not found"

**Cause:** Collection n'existe pas dans Directus

**Solution:**
1. Vérifier le nom de la collection
2. Créer la collection si nécessaire
3. Vérifier les permissions

## 📚 Ressources utiles

### Documentation
- [Directus API Documentation](https://docs.directus.io/reference/api/rest.html)
- [Directus SDK Guide](https://docs.directus.io/guides/sdk.html)
- [Next.js Documentation](https://nextjs.org/docs)

### Guides
- [DIRECTUS_INTEGRATION.md](./DIRECTUS_INTEGRATION.md) - Guide complet
- [ARCHITECTURE.md](./ARCHITECTURE.md) - Architecture
- [QUICKSTART.md](./QUICKSTART.md) - Démarrage rapide

### Exemples
- [src/app/[[...slug]]/page-directus.tsx](src/app/[[...slug]]/page-directus.tsx)
- [src/lib/directus/api.ts](src/lib/directus/api.ts)
- [src/lib/directus/adapters.ts](src/lib/directus/adapters.ts)

## ⏱️ Temps estimé

| Phase | Durée |
|-------|-------|
| Préparation | 15 min |
| Installation | 10 min |
| Config Directus | 30 min |
| Migration code | 1-2 heures |
| Test | 30 min |
| Déploiement | 15 min |
| **TOTAL** | **2-3 heures** |

## 🎯 Prochaines étapes

1. Lire `QUICKSTART.md`
2. Suivre les étapes de migration
3. Générer les types TypeScript: `npm run generate:types`
4. Adapter les sections au besoin
5. Tester complètement
6. Déployer

---

**Status:** Vous êtes prêt pour migrer vers Directus! 🚀
