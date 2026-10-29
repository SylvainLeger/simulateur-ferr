"""Assemble le simulateur en un seul fichier HTML / Builds the simulator into one HTML file.

src/sim.src.html contient des marqueurs /*ENGINE*/, /*UI*/, /*REPORT*/, /*SESSION*/
remplacés par le contenu des fichiers .js correspondants.

Sorties / outputs:
  dist/index.html            page complète (Cloud Run, navigateur)
  dist/simulateur-ferr.html  fragment sans <head> (artefact claude.ai)
"""
from pathlib import Path

ROOT = Path(__file__).parent
SRC = ROOT / "src"
DIST = ROOT / "dist"
PARTS = [("ENGINE", "engine.js"), ("UI", "ui.js"), ("REPORT", "report.js"), ("SESSION", "session.js")]
HEAD = (
    '<!doctype html>\n<html lang="fr">\n<head>\n<meta charset="utf-8">\n'
    '<meta name="viewport" content="width=device-width, initial-scale=1">\n'
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
print("ok ->", DIST / "index.html")
