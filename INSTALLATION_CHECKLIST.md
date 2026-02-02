# Checklist d'installation Directus

Suivez cette checklist pour configurer complètement votre intégration Directus.

## Phase 1: Installation initiale

- [ ] Cloner/télécharger le projet
- [ ] Lire ce README
- [ ] Lire `QUICKSTART.md`
- [ ] Lire `DIRECTUS_INTEGRATION.md`

## Phase 2: Configuration de l'environnement

### Variables d'environnement
- [ ] Créer/vérifier le fichier `.env.local`
- [ ] Ajouter `NEXT_PUBLIC_DIRECTUS_URL=https://directus.opaleplus.cloud`
- [ ] Ajouter `DIRECTUS_TOKEN=your_token`

### Obtenir le token Directus
- [ ] Aller sur https://directus.opaleplus.cloud
- [ ] Créer ou se connecter à un compte
- [ ] Aller dans les paramètres utilisateur (icône profil)
- [ ] Générer un token statique
- [ ] Copier le token dans `.env.local`

## Phase 3: Installation des dépendances

- [ ] Exécuter `npm install` ou `pnpm install`
- [ ] Vérifier qu'il n'y a pas d'erreurs
- [ ] Vérifier que `@directus/sdk` est installé

## Phase 4: Configuration Directus

### Créer les collections obligatoires
- [ ] Collection `pages`
  - Fields: id, title, slug, description, meta_title, meta_description, status, created_at, updated_at
- [ ] Collection `page_sections`
  - Fields: id, page_id, type, sort, component
- [ ] Collection `blog_posts`
  - Fields: id, title, slug, content, excerpt, featured_image, author_id, published_date, status
- [ ] Collection `authors`
  - Fields: id, name, email, avatar, bio
- [ ] Collection `changelog`
  - Fields: id, title, slug, description, date, version, type
- [ ] Collection `settings`
  - Fields: id, site_name, site_description, site_url, logo, favicon

### Configurer les permissions
- [ ] Créer un rôle "Public" si nécessaire
- [ ] Configurer l'accès en lecture pour les collections publiques
- [ ] Restreindre l'accès en écriture

## Phase 5: Test de connexion

- [ ] Démarrer le serveur: `npm run dev`
- [ ] Vérifier qu'il n'y a pas d'erreurs de connexion
- [ ] Ouvrir http://localhost:3000 dans le navigateur
- [ ] Vérifier que les données se chargent (ou affichent une erreur appropriée)

## Phase 6: Génération des types TypeScript (optionnel mais recommandé)

- [ ] Exécuter `npm run generate:types`
- [ ] Vérifier que `src/lib/directus/types-generated.ts` est créé
- [ ] Importer les types générés dans vos fichiers

## Phase 7: Migration des pages

### Page d'accueil
- [ ] Renommer `src/app/[[...slug]]/page.tsx` en `page-basehub.tsx.backup`
- [ ] Renommer `src/app/[[...slug]]/page-directus.tsx` en `page.tsx`
- [ ] Tester la page d'accueil

### Blog
- [ ] Renommer `src/app/blog/page.tsx` en `page-basehub.tsx.backup`
- [ ] Renommer `src/app/blog/page-directus.tsx` en `page.tsx`
- [ ] Renommer `src/app/blog/[slug]/page.tsx` en `page-basehub.tsx.backup`
- [ ] Renommer `src/app/blog/[slug]/page-directus.tsx` en `page.tsx`
- [ ] Tester les pages du blog

### Changelog (optionnel)
- [ ] Renommer `src/app/changelog/page.tsx` en `page-basehub.tsx.backup`
- [ ] Renommer `src/app/changelog/page-directus.tsx` en `page.tsx`
- [ ] Tester la page du changelog

## Phase 8: Adapter les sections

- [ ] Examiner `src/app/_sections/hero/directus.tsx` comme exemple
- [ ] Adapter les autres sections si nécessaire
- [ ] Tester chaque section avec des données Directus

## Phase 9: Optimisation et ajustements

### Performance
- [ ] Configurer le cache approprié
- [ ] Ajouter la pagination si nécessaire
- [ ] Limiter les champs récupérés

### SEO et Métadonnées
- [ ] Tester les métadonnées générées
- [ ] Vérifier les Open Graph tags
- [ ] Tester sur les réseaux sociaux

### Styling et Layout
- [ ] Adapter les styles si nécessaire
- [ ] Tester sur mobile
- [ ] Vérifier l'accessibilité

## Phase 10: Déploiement

### Pré-déploiement
- [ ] Exécuter `npm run build`
- [ ] Corriger tout erreur de build
- [ ] Exécuter les tests si disponibles

### Variables d'environnement production
- [ ] Ajouter `NEXT_PUBLIC_DIRECTUS_URL` sur la plateforme
- [ ] Ajouter `DIRECTUS_TOKEN` sur la plateforme
- [ ] Vérifier que les variables ne sont pas exposées côté client

### Déploiement
- [ ] Déployer sur votre plateforme (Vercel, Netlify, etc.)
- [ ] Tester l'application en production
- [ ] Monitorer les erreurs

## Phase 11: Maintenance

- [ ] Mettre en place un monitoring
- [ ] Planifier les mises à jour de dépendances
- [ ] Documenter les modifications personnalisées
- [ ] Planifier les backups Directus

## Dépannage

Si vous rencontrez des problèmes:

1. **Erreur: "Collection not found"**
   - Vérifiez que vous avez créé la collection dans Directus
   - Vérifiez le nom de la collection (sensible à la casse)

2. **Erreur: "Invalid token"**
   - Vérifiez le token dans `.env.local`
   - Assurez-vous qu'il est correct
   - Régénérez-le si nécessaire

3. **Les données ne se chargent pas**
   - Vérifiez `NEXT_PUBLIC_DIRECTUS_URL`
   - Testez la connexion à https://directus.opaleplus.cloud
   - Vérifiez les permissions Directus

4. **Build échoue**
   - Vérifiez les types TypeScript
   - Exécutez `npm run lint`
   - Consultez les logs de build

## Fichiers clés pour référence

- `src/lib/directus/config.ts` - Configuration du client
- `src/lib/directus/api.ts` - Fonctions API
- `src/lib/directus/types.ts` - Types
- `src/lib/directus/adapters.ts` - Adaptateurs
- `src/lib/directus/utils.ts` - Utilitaires
- `DIRECTUS_INTEGRATION.md` - Guide complet
- `QUICKSTART.md` - Guide rapide

## Ressources supplémentaires

- [Directus Documentation](https://docs.directus.io)
- [SDK Directus](https://docs.directus.io/guides/sdk.html)
- [Next.js Documentation](https://nextjs.org/docs)

---

## ✅ Complété!

Une fois que vous avez coché toutes les cases, votre intégration Directus est complètement configurée et prête à l'emploi! 🚀

Pour toute question, consultez:
- Les fichiers de documentation (*.md)
- Les commentaires dans les fichiers TypeScript/TSX
- La documentation officielle Directus
