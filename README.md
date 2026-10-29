# Simulateur FERR / RRIF Simulator

**FR** — Simulateur bilingue (français / anglais) pour comparer des stratégies de retrait d'un FERR au Québec :
retrait minimum, retrait forfaitaire ou intermédiaire, avec l'impôt (Québec + fédéral), la récupération de la
Sécurité de la vieillesse (PSV), le Régime canadien de soins dentaires et le réinvestissement dans un compte non
enregistré. Les résultats sont indicatifs et ne remplacent pas un conseil financier.

**EN** — Bilingual (French / English) simulator comparing RRIF withdrawal strategies for a Quebec resident:
minimum, lump-sum or in-between withdrawals, with income tax (Quebec + federal), the OAS clawback, the Canadian
Dental Care Plan and reinvestment in a non-registered account. Results are indicative, not financial advice.

En ligne / Live: https://simulateur-ferr-bnzvmrkrfa-uk.a.run.app

## Structure

| Fichier / File | Rôle / Role |
|---|---|
| `src/sim.src.html` | Gabarit HTML + CSS avec marqueurs `/*ENGINE*/`, `/*UI*/`, `/*REPORT*/`, `/*COMPARE*/`, `/*HELP*/`, `/*SESSION*/` |
| `src/engine.js` | Calculs (impôt, PSV, minimum FERR…) / Calculations |
| `src/ui.js` | Interface et questionnaire / UI and questionnaire |
| `src/report.js` | Rapport PDF / PDF report |
| `src/compare.js` | Mode Comparer : deux scénarios côte à côte / Side-by-side comparison |
| `src/help.js` | Fenêtre Aide, confidentialité / Help window, privacy |
| `src/session.js` | Sauvegarde, Mes scénarios, lien de partage ; lance la page / Save, scenarios, share link; boots the page |
| `src/icons/` | Icône de l'onglet (SVG + PNG) / Tab and home-screen icons |
| `build.py` | Assemble `dist/index.html` et copie les icônes / Builds `dist/index.html` and copies the icons |
| `Dockerfile`, `nginx.conf` | Image Cloud Run (build + nginx sur le port 8080) |
| `deploy.sh` | Déploiement manuel de secours / Manual fallback deploy |

## Développer / Develop

```bash
python build.py        # puis ouvrir / then open dist/index.html
```

## Déployer / Deploy

**FR** — Automatique : chaque merge sur `main` reconstruit l'image et met à jour le service Cloud Run
`simulateur-ferr` (projet `immersion360`, région `us-east4`). Secours : `./deploy.sh`.

**EN** — Automatic: every merge to `main` rebuilds the image and updates the Cloud Run service
`simulateur-ferr` (project `immersion360`, region `us-east4`). Fallback: `./deploy.sh`.
