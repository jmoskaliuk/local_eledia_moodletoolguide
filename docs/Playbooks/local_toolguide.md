# Playbook · Moodle Tool Guide (local_toolguide + eledia-toolguide)

## Purpose

Projekt-spezifische Deploy-, Build- und Release-Mechanik. Generisches Wissen
(Moodle-API, Submission-Flow, Design-System) lebt in den Skills.

---

## Overview

Drei Tracks im Lockstep:

```
moodle-tool-guide.html    (Source of Truth — auch direkt als Standalone-HTML auslieferbar)
        │
        ├── python3 sync_plugin_js.py       ──► moodle-plugin/local/toolguide/amd/src/toolguide.js
        └── python3 sync_wordpress_js.py    ──► wordpress-plugin/eledia-toolguide/assets/js/toolguide.js
                                                  │
                                                  ZIP-Build (Python zipfile, kein cp -R / zip CLI)
                                                  │
                                                  ├── moodle-plugin/local_toolguide.zip
                                                  └── wordpress-plugin/eledia-toolguide.zip
```

---

## 1. Lokales Setup

- Repo-Root: `~/Documents/Code/moodletoolguide`
- Lokaler Moodle-Test: Orb-VM mit Docker-Container (siehe Skill `moodle-deploy`).
- Lokaler WP-Test: WordPress-Lokalinstanz mit Twenty Twenty-Four als Baseline.

---

## 2. Quelltext ändern

Ändere immer zuerst `moodle-tool-guide.html`. Wenn nur Plugin-Code geändert
würde, geht der Lockstep verloren — beim nächsten Sync wäre die Änderung
weg.

```bash
# Editiere moodle-tool-guide.html, verifiziere im Browser direkt
open moodle-tool-guide.html
```

---

## 3. Sync in alle Tracks

```bash
python3 sync_plugin_js.py       # Moodle AMD source
python3 sync_wordpress_js.py    # WordPress asset JS
```

**Vorbedingung:** Beide Skripte erwarten `ROOT = Path(__file__).resolve().parent`.
Der hardcodierte Pfad aus früheren Cowork-Sessions ist ein bekannter
Drift-Risikopunkt — siehe `04-tasks.md` task04 / `05-quality.md` bug01.

---

## 4. Deploy ins lokale Moodle

```bash
bash moodle-plugin/deploy.sh
```

Dieses Skript:
1. Auto-detektiert die Orb-VM und den passenden Docker-Container.
2. Synct die Plugin-Dateien (rsync) ins Container-Volume.
3. Führt `php /var/www/html/admin/cli/upgrade.php --non-interactive` aus.
4. Führt `php /var/www/html/admin/cli/purge_caches.php` aus.

Tieferes Wissen zum Deploy-Mechanismus → Skill `moodle-deploy`.

---

## 5. Deploy ins lokale WordPress

```bash
# Frischen ZIP aus Repo-Root bauen (Python — vermeidet cp -R Permission Issues
# auf Cowork-Mounts)
python3 - <<'PY'
import zipfile, time, shutil
from pathlib import Path

src = Path("wordpress-plugin/eledia-toolguide")
out = Path(f"/tmp/wp_{int(time.time())}.zip")
with zipfile.ZipFile(out, "w", compression=zipfile.ZIP_DEFLATED, compresslevel=9) as z:
    for p in sorted(src.rglob("*")):
        if p.is_dir() or p.name == ".DS_Store" or "__MACOSX" in p.parts:
            continue
        z.write(p, (Path("eledia-toolguide") / p.relative_to(src)).as_posix())
shutil.copy(out, "wordpress-plugin/eledia-toolguide.zip")
print(f"WP ZIP rebuilt: {out.stat().st_size:,} bytes")
PY

# WP-Plugin in Test-WP installieren: WP-Admin → Plugins → Add New → Upload Plugin
```

---

## 6. ZIP-Builds (Release-Vorbereitung)

Für eine Release-Version müssen **beide** ZIPs frisch gebaut werden.
Verwendet Python `zipfile`, weil `zip` CLI auf der Cowork-Mount immer wieder
mit `Operation not permitted` fehlschlägt (siehe `q01` in `04-tasks.md`).

```bash
python3 - <<'PY'
import zipfile, time, shutil
from pathlib import Path

def build(src_dir, top_name, dst_path):
    src = Path(src_dir)
    out = Path(f"/tmp/{top_name}_{int(time.time()*1000)}.zip")
    with zipfile.ZipFile(out, "w", compression=zipfile.ZIP_DEFLATED, compresslevel=9) as z:
        for p in sorted(src.rglob("*")):
            if p.is_dir() or p.name == ".DS_Store" or "__MACOSX" in p.parts:
                continue
            z.write(p, (Path(top_name) / p.relative_to(src)).as_posix())
    shutil.copy(out, dst_path)
    print(f"  {dst_path}: {Path(dst_path).stat().st_size:,} bytes")

build("wordpress-plugin/eledia-toolguide", "eledia-toolguide", "wordpress-plugin/eledia-toolguide.zip")
build("moodle-plugin/local/toolguide",      "toolguide",        "moodle-plugin/local_toolguide.zip")
PY
```

**Verifikation der ZIPs:**

```bash
unzip -p wordpress-plugin/eledia-toolguide.zip eledia-toolguide/eledia-toolguide.php | grep -E "Version:|ELEDIA_TOOLGUIDE_VERSION"
unzip -p moodle-plugin/local_toolguide.zip toolguide/version.php | grep -E "version|release"
```

---

## 7. Release-Checkliste

Eine Release ist erst freigegeben, wenn alle Punkte erfüllt sind. PO-Sign-off
erfolgt erst zum Abschluss.

```
[ ] moodle-tool-guide.html im Browser verifiziert
[ ] sync_plugin_js.py / sync_wordpress_js.py liefen ohne Fehler
[ ] moodle-plugin/local/toolguide/version.php
       - $plugin->version  (YYYYMMDDxx-Build) bumpgleich erhöht
       - $plugin->release  (semver) gesetzt
[ ] wordpress-plugin/eledia-toolguide/eledia-toolguide.php
       - Plugin-Header `Version: <SEMVER>`
       - `ELEDIA_TOOLGUIDE_VERSION` Konstante
[ ] Stable tag in allen vier Readmes:
       readme.txt, readme-de.txt, readme-fr.txt, readme-es.txt
[ ] CHANGELOG.md hat Eintrag für die neue Version
[ ] Alle vier Readmes haben einen `== Changelog ==`-Eintrag für die neue Version
[ ] WP-ZIP frisch gebaut und auf 1.1.31-Strings geprüft
[ ] Moodle-ZIP frisch gebaut und auf 1.1.31-Strings geprüft
[ ] Drei-Track-Lockstep-Test grün (test01 in 05-quality.md)
[ ] Visuell verifiziert: Footer-Logo erscheint korrekt in allen Tracks (test06)
[ ] BFSG-Smoke (test04) grün
[ ] WP-Theme-Matrix (test05) grün
[ ] Git-Tag `vX.Y.Z` gesetzt
[ ] Push nach origin/main
```

---

## 8. WordPress-Theme-Test-Matrix

Bei jeder UI-Änderung (Footer, Header, Buttons, Links, Karten) zu testen:

| Theme                | Was prüfen                                                    |
|----------------------|---------------------------------------------------------------|
| Twenty Twenty-Four   | Baseline — keine Theme-Stile sollen durchschlagen.            |
| Astra                | Häufiger CSS-Override (Margins, Buttons, Schriftart).         |
| OceanWP              | Aggressive Color-Overrides; Inline-Styles auf Links prüfen.   |
| GeneratePress        | Gridsysteme können Layout brechen.                            |

Plus:
- 200 % Browser-Zoom in jeder Variante.
- Windows High Contrast / `prefers-contrast: more` in Edge.

---

## 9. GDPR-/DSGVO-Variante (lokales React)

Standardmäßig zieht das WP-Plugin React aus `unpkg.com`. Für strenge
Datenschutzkonfigurationen vendoriert ausliefern:

```bash
# Vor dem ZIP-Build:
mkdir -p wordpress-plugin/eledia-toolguide/assets/js/vendor
curl -fsSL https://unpkg.com/react@18.3.1/umd/react.production.min.js \
     -o wordpress-plugin/eledia-toolguide/assets/js/vendor/react.production.min.js
curl -fsSL https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js \
     -o wordpress-plugin/eledia-toolguide/assets/js/vendor/react-dom.production.min.js
```

Das Plugin-PHP erkennt `assets/js/vendor/react.production.min.js` per
`file_exists()` und enqueued es statt der CDN-URL. Die Vendor-Files dürfen
nicht in den GitHub-Repo committet werden — `.gitignore` regelt das.

---

## 10. Submission ins Plugin-Directory

Generisches Wissen → Skill `moodle-plugin-submit`. Projekt-spezifische
Besonderheiten:

- Repository-Pfad in der Plugin-Directory-Metadata: `https://github.com/jmoskaliuk/local_eledia_moodletoolguide`
- Der Plugin-Component-Name `local_toolguide` ist im Plugin-Directory frei.
- Maturity: aktuell `MATURITY_BETA` — vor Eintrag im Plugin-Directory auf
  `MATURITY_STABLE` heben (siehe `version.php`).

Die WordPress-Variante wird als getrenntes Asset auf
`wordpress.org/plugins/eledia-toolguide` gepflegt; die Slug muss in jedem
`Stable tag`-Bump synchron sein.

---

## 11. Bekannte Cowork-Stolpersteine

| Symptom | Ursache | Workaround |
|---|---|---|
| `rm: Operation not permitted` | Cowork-Mount blockiert Lösch-Ops | Außerhalb der Cowork-Session löschen oder `mcp__cowork__allow_cowork_file_delete` (Supervised Mode) |
| `cp -R` ins `/tmp` schlägt fehl mit "stat … Permission denied" | Permissions-Drift bei Folge-Runs | Frisches Temp-Verzeichnis pro Build verwenden, oder Python `zipfile` direkt vom Quellpfad bauen |
| `git rm` schreibt Index nicht zurück | `.git/index.lock` lässt sich nicht entfernen | `.git/index.lock` außerhalb der Cowork-Session löschen |
| Sync-Skripte zeigen auf `youthful-sleepy-goodall` | Hardcodierter Session-Pfad in `ROOT` | Auf `Path(__file__).resolve().parent` zurückführen (siehe task04) |

---

## 12. Datenbank-Pflege

`Datenbank_ToolGuide.xlsx` ist die manuell gepflegte Tool-Datenbank. Änderungen
am Datenbestand:

1. Excel-Datei öffnen, Zellen aktualisieren.
2. Werte in den `TOOLS`-Array in `moodle-tool-guide.html` einkopieren —
   aktuell ist das ein **manueller** Schritt (kein Auto-Sync).
3. Sync-Skripte laufen lassen.

> Automatischer Excel→JS-Sync ist als Feature-Vorschlag in `01-features.md`
> denkbar (`featXX`), aber heute nicht implementiert — nicht erfinden.

---
