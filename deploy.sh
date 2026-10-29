#!/usr/bin/env bash
# Déploiement MANUEL de secours (le déploiement normal est automatique à chaque merge sur main).
# Manual fallback deploy (normal deploys happen automatically on every merge to main).
# Usage : ./deploy.sh [ID_DU_PROJET_GCP]   (défaut / default: immersion360)
set -euo pipefail
cd "$(dirname "$0")"
PROJECT="${1:-immersion360}"
gcloud run deploy simulateur-ferr --source . --project "$PROJECT" --region us-east4 \
  --allow-unauthenticated --port 8080 --cpu 1 --memory 256Mi \
  --min-instances 0 --max-instances 2 --quiet
gcloud run services describe simulateur-ferr --project "$PROJECT" --region us-east4 --format='value(status.url)'
