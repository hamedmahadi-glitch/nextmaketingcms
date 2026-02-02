#!/bin/bash

# Script pour générer les types TypeScript depuis Directus
# Usage: ./generate-types.sh

echo "🔄 Génération des types TypeScript depuis Directus..."

# Vérifier si le token est défini
if [ -z "$DIRECTUS_TOKEN" ]; then
  echo "❌ Erreur: DIRECTUS_TOKEN non défini"
  echo "Veuillez définir DIRECTUS_TOKEN dans .env.local"
  exit 1
fi

# URL Directus
DIRECTUS_URL="${NEXT_PUBLIC_DIRECTUS_URL:-https://directus.opaleplus.cloud}"

# Générer les types
npx @directus/sdk generate "$DIRECTUS_URL" --token "$DIRECTUS_TOKEN" -o src/lib/directus/types-generated.ts

if [ $? -eq 0 ]; then
  echo "✅ Types générés avec succès!"
  echo "📄 Fichier créé: src/lib/directus/types-generated.ts"
  echo ""
  echo "Vous pouvez maintenant importer les types:"
  echo "  import type * from '@/lib/directus/types-generated';"
else
  echo "❌ Erreur lors de la génération des types"
  exit 1
fi
