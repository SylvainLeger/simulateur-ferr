"""Assemble le simulateur en un seul fichier HTML / Builds the simulator into one HTML file.

src/sim.src.html contient des marqueurs /*ENGINE*/, /*UI*/, /*REPORT*/, /*COMPARE*/, /*HELP*/, /*SESSION*/
remplacés par le contenu des fichiers .js correspondants. session.js vient en dernier : il lance la page.

Sorties / outputs:
  dist/index.html            page complète (Cloud Run, navigateur)
  dist/simulateur-ferr.html  fragment sans <head> (artefact claude.ai)
  dist/*.png                 icônes de l'onglet et de l'écran d'accueil / tab and home-screen icons
"""
import shutil
from pathlib import Path
from urllib.parse import quote

ROOT = Path(__file__).parent
SRC = ROOT / "src"
DIST = ROOT / "dist"
ICONS = SRC / "icons"
PARTS = [("ENGINE", "engine.js"), ("UI", "ui.js"), ("REPORT", "report.js"), ("COMPARE", "compare.js"),
         ("HELP", "help.js"), ("SESSION", "session.js")]
# L'icône SVG est intégrée à la page ; les PNG servent aux navigateurs qui ne lisent pas le SVG et aux téléphones
SVG_ICON = quote((ICONS / "icon.svg").read_text(encoding="utf-8").strip(), safe=" =:/'")
HEAD = (
    '<!doctype html>\n<html lang="fr">\n<head>\n<meta charset="utf-8">\n'
    '<meta name="viewport" content="width=device-width, initial-scale=1">\n'
    '<link rel="icon" type="image/png" sizes="32x32" href="/icon-32.png">\n'
    f'<link rel="icon" type="image/svg+xml" href="data:image/svg+xml,{SVG_ICON}">\n'
    '<link rel="apple-touch-icon" href="/apple-touch-icon.png">\n'
    '<meta name="theme-color" content="#0e5a5f">\n'
)

html = (SRC / "sim.src.html").read_text(encoding="utf-8")
for tag, name in PARTS:
    marker = f"/*{tag}*/"
    if marker not in html:
        raise SystemExit(f"marqueur manquant / missing marker: {marker}")
    html = html.replace(marker, (SRC / name).read_text(encoding="utf-8"), 1)

DIST.mkdir(exist_ok=True)
(DIST / "simulateur-ferr.html").write_text(html, encoding="utf-8")
(DIST / "index.html").write_text(HEAD + html + "\n</html>\n", encoding="utf-8")
for png in ICONS.glob("*.png"):
    shutil.copy(png, DIST / png.name)
print("ok ->", DIST / "index.html")
