# eLeDia.OS — Master · Moodle Tool Guide

> Zentraler Eintrittspunkt für dieses Projekt. Jede Session startet hier.
> DevFlow-Framework: [eLeDia.OS_DevFlow](https://github.com/jmoskaliuk/eLeDia.OS_DevFlow).

---

## 1. Projekt-Meta

- **Name:** Moodle Tool Guide
- **Repository:** [github.com/jmoskaliuk/local_eledia_moodletoolguide](https://github.com/jmoskaliuk/local_eledia_moodletoolguide)
- **Ziel:** Moodle-Lehrenden – Einsteiger:innen wie Erfahrene – auf einer einzigen Oberfläche helfen, das passende Moodle-Werkzeug für ein didaktisches Ziel zu finden. Drei Auslieferungswege (Standalone HTML, Moodle-Plugin, WordPress-Plugin) auf identischer Codebasis.
- **Kurzbeschreibung:** Interaktive React-App mit drei Zugangswegen: Matrix (Aktivität × didaktisches Ziel), Wizard (geführte Auswahl) und Detailansicht (Tool-Steckbrief). Mehrsprachig (de/en/fr/es), barrierefrei (BFSG/WCAG 2.2 AA), eLeDia-CI.
- **Aktuelle Version:** Moodle-Plugin `1.1.39`, WordPress-Plugin `1.1.33` (Stand: 2026-05-08; siehe `01-features.md` → Releases)
- **Tech-Stack:**
  - React 18.3.1 + Babel-in-Browser (Standalone) bzw. AMD-Modul (Moodle) bzw. Enqueue (WordPress)
  - Single-File-Source-of-Truth: `moodle-tool-guide.html`
  - Sync nach Plugins via `sync_plugin_js.py` (Moodle) und `sync_wordpress_js.py` (WordPress)
  - Deploy lokal via `moodle-plugin/deploy.sh` (Orb-Docker)

---

## 2. Session-Start (für KI)

1. Dieses Dokument vollständig lesen.
2. `04-tasks.md` öffnen — operatives Tagesgeschäft + offene `qXX`.
3. Bei Moodle-Themen: Skill `moodle-framework` konsultieren (siehe §11).
4. Bei UI-Arbeit: Skill `eledia-moodle-ux` konsultieren.
5. Vor Deploy/Release: §17–§19 (Setup, ZIP-Build, Release-Checkliste) lesen.
6. Bei Unklarheit → **nicht raten**, sondern als `qXX` in `04-tasks.md` eintragen.

---

## 3. Datei-System

| Datei | Zweck |
|---|---|
| `01-features.md` | Was wird gebaut und warum (gewünschtes Verhalten, Akzeptanzkriterien, Releases) |
| `02-user-doc.md` | Bedienung aus Nutzerperspektive |
| `03-dev-doc.md` | Technische Implementierung (Ist-Zustand) |
| `04-tasks.md` | Tasks, Klärungen, operatives Tagesgeschäft |
| `05-quality.md` | Bugs (Severity) und Tests |


Skills (generisches Framework-Wissen) liegen **außerhalb** dieses Repos in der Claude-Skill-Library — Verweise siehe §11.

---

## 4. ID-System

| Präfix | Bedeutung | Wo |
|---|---|---|
| `featXX` | Feature | `01-features.md` |
| `taskXX` | Task | `04-tasks.md` |
| `qXX` | Klärung | `04-tasks.md` |
| `bugXX` | Bug | `05-quality.md` |
| `testXX` | Test | `05-quality.md` |
| `adrXX` | Architektur-Entscheidung | §10 dieses Dokuments |
| `relXX` | Release | `01-features.md` |

---

## 5. Workflow

```
Idee → Feature → Task → Implementierung → Test → (Bug → Fix) → Done → Doku-Sync
```

Iterativer Loop. Drei Auslieferungswege werden in **Lockschritt** gepflegt:

```
moodle-tool-guide.html  ── sync_plugin_js.py   ──► moodle-plugin/local/toolguide/amd/src/toolguide.js
                         └─ sync_wordpress_js.py ──► wordpress-plugin/eledia-toolguide/assets/js/toolguide.js
```

Versionen müssen synchron bleiben (siehe §19 Release-Checkliste).

---

## 6. Definition of Done

Ein Feature ist erst **done**, wenn alle drei Perspektiven konsistent sind:

- `01-features.md` — Intent klar, Akzeptanzkriterien definiert
- `02-user-doc.md` — Benutzer kann es ohne Code-Lesen bedienen
- `03-dev-doc.md` — anderer Entwickler kann es erweitern, ohne zu raten

**Plus:**
- alle verlinkten `taskXX` sind erledigt
- alle verlinkten `testXX` sind grün
- keine blockierenden `bugXX` offen
- in **allen drei Tracks** (Standalone, Moodle, WP) gleichermaßen verfügbar oder explizit ausgenommen

### Done-Checkliste pro Task

```
- [ ] 01-features.md aktualisiert (falls Verhalten geändert)
- [ ] 02-user-doc.md aktualisiert (falls UX geändert)
- [ ] 03-dev-doc.md aktualisiert (immer, wenn Code geändert)
- [ ] testXX in 05-quality.md grün
- [ ] Drei Tracks im Lockstep (Prototyp → Plugin-Sync ausgeführt)
- [ ] PO Sign-off
```

---

## 7. Nicht done, wenn …

- Doku fehlt oder veraltet ist
- Verhalten unklar oder zwischen den drei Tracks inkonsistent
- WordPress-Theme-Isolation nicht geprüft (siehe §20 Theme-Test-Matrix)
- BFSG-Anforderungen nicht erfüllt
- bekannte Bugs Kernfunktionalität betreffen

---

## 8. Grundprinzip

> Implementierung allein ist keine Fertigstellung.
> Ein Feature ist erst fertig, wenn es **verstanden, nutzbar und wartbar** ist —
> in **allen drei Auslieferungswegen** gleichermaßen.

---

## 9. Zusammenarbeit

### 9.1 Rollen

| Rolle | Wer | Verantwortung |
|---|---|---|
| **Product Owner (PO)** | Mensch | Ziel, Scope, Prioritäten, finales Sign-off, Releases, Plugin-Submission |
| **Architekt** | Mensch (KI berät) | Tech-Stack, ADRs, strukturelle Entscheidungen |
| **Implementer** | KI primär | Code, Tests, Tasks abarbeiten |
| **Doc-Sync** | KI primär | `01`/`02`/`03` konsistent halten |
| **QA-Reviewer** | Mensch (KI generiert Drafts) | manuelle Verifikation in den drei Tracks, BFSG, Theme-Matrix |
| **Triage** | Mensch | „🆕 Neu" → Tasks, `qXX` beantworten, Priorität setzen |

### 9.2 Befugnisse

**KI darf alleine:**
- Code für freigegebene `taskXX`
- Sync-Skripte ausführen (`sync_plugin_js.py`, `sync_wordpress_js.py`)
- Doku-Sync nach Code-Änderung
- Test-Drafts und Status-Reports
- offensichtliche Refactorings ohne Verhaltensänderung

**KI muss vorschlagen + warten bei:**
- neuen Features
- Architektur-Entscheidungen (`adrXX`)
- Library-Wechseln (z. B. React-Major-Version)
- Datenbank-Migrationen
- Lösch-Operationen
- Externe API-Calls mit Nebenwirkungen

**Nur Mensch:**
- Done-Sign-off, Releases (Tag, ZIP-Build, Push)
- Plugin-Submission ans Moodle Plugins Directory / WordPress Plugin Directory
- Privacy-/DSGVO-Entscheidungen (z. B. React-CDN vs. lokal)
- Token-/Secret-Handling
- GitHub-Personal-Access-Tokens

### 9.3 Eskalation

KI rät nicht. Unklarheit → `qXX` in `04-tasks.md` → PO antwortet → Antwort wandert ins passende Doc.

### 9.4 Traceability

- **Branch-Namen:** `feat/featXX-kurztitel`, `fix/bugXX-kurztitel`, `task/taskXX-kurztitel`
- **Commit-Messages:** beginnen mit der ID, z. B. `task07: Partner-Logo auf Premium-Badge umgestellt`
- **PR-Titel:** ID + Klartext, im Body Verweis auf Feature/Task/Bug
- **Merge erst,** wenn die Done-Checkliste aus §6 erfüllt ist
- **Tags:** `vX.Y.Z` nach Stable-Tag-Bumps in allen vier Readmes (siehe §19 Release-Checkliste)

---

## 10. Architektur-Entscheidungen (ADR)

ADRs leben **inline hier**, nicht in separaten Dateien.

### Vorlage

```
### adrXX Titel der Entscheidung

- **Datum:** YYYY-MM-DD
- **Status:** vorgeschlagen | beschlossen | abgelöst durch adrYY
- **Kontext:** Welches Problem?
- **Optionen:** A | B | C
- **Entscheidung:** Was wurde gewählt?
- **Konsequenzen:** Was zieht das nach sich?
```

### Aktive ADRs

#### adr01 Single-File-Prototyp als Source of Truth

- **Datum:** 2026-04-10
- **Status:** beschlossen
- **Kontext:** Drei Auslieferungswege (Standalone HTML, Moodle-Plugin, WP-Plugin) müssen verhalten- und versionsgleich gepflegt werden. Es gibt keinen Build-Server.
- **Optionen:**
  - A) Drei separate Codebasen pflegen (manuell synchron halten)
  - B) Monorepo mit gemeinsamer Library und drei Hosts
  - C) Single-File-Prototyp + Sync-Skripte in beide Plugin-Tracks
- **Entscheidung:** C — `moodle-tool-guide.html` ist die Quelle, `sync_plugin_js.py` / `sync_wordpress_js.py` extrahieren den Babel-Block und passen den Mount-Punkt an.
- **Konsequenzen:** Nur eine Datei für inhaltliche Änderungen. Sync-Skripte müssen die Mount-Anpassungen (`#root` → `#toolguide-root` / `.eledia-toolguide-root`) und Track-spezifische Patches (z. B. WP-`wp.i18n`-Integration) verlässlich abbilden. Drift zwischen Tracks → fehlender Sync-Lauf.

#### adr02 React via CDN, mit lokalem Fallback für DSGVO-sensitive Installationen — *WP-Track*

- **Datum:** 2026-04-22
- **Status:** beschlossen — gilt **nur** für das WordPress-Plugin
- **Kontext:** WordPress-Plugin soll out-of-the-box laufen, aber DSGVO-strenge Setups dürfen keine Drittserver-Anbindung haben.
- **Optionen:**
  - A) React immer aus CDN (unpkg)
  - B) React immer mitliefern (vendored)
  - C) Hybrid: CDN-Default, lokal wenn `assets/js/vendor/react*.min.js` existiert
- **Entscheidung:** C — `file_exists()`-Check in `enqueue_scripts()` schaltet automatisch um.
- **Konsequenzen:** Leichter Plugin-ZIP, aber zwei Distribution-Pfade müssen dokumentiert sein. Vendor-Files sind in `.gitignore`, nicht im Git-Tree.
- **Hinweis:** Für das **Moodle-Plugin** wurde diese Entscheidung in `adr04` (1.1.35) revidiert — dort ist React fest vendoriert, ohne CDN-Variante. Reviewer-Policy des Moodle Plugins Directory verbietet externe CDN-Dependencies.

#### adr03 Light-Theme-Header/Footer auf warmem Beige

- **Datum:** 2026-04-25 (eingeführt v1.1.11)
- **Status:** beschlossen
- **Kontext:** Ursprünglicher dunkelblauer Gradient-Header verursachte (a) Full-Bleed-White-Strip auf breiten Bildschirmen und (b) unvorhersehbares Verhalten bei High-Contrast/High-Zoom.
- **Optionen:**
  - A) Gradient mit Full-Bleed-Hack reparieren
  - B) Auf flache CI-Farbe wechseln, Header neu denken
- **Entscheidung:** B — `#FFECDB` (warmes Beige) als Header- und Footer-Hintergrund, dunkelblauer Text `#194866`.
- **Konsequenzen:** Bessere Barrierefreiheit (8.9:1 AAA-Kontrast für Text). Logos und Badges müssen auf Beige getestet werden — verifiziert via ImageMagick-Render.

#### adr04 React fest vendoriert für das Moodle-Plugin (kein CDN)

- **Datum:** 2026-05-08 (eingeführt v1.1.35)
- **Status:** beschlossen — löst `adr02` für das Moodle-Plugin auf
- **Kontext:** Code-Review hat externe CDN-Loads als Approval-Blocker
  fürs Moodle Plugins Directory + DSGVO-Verstoß markiert. Im
  WordPress-Track ist `adr02`-Hybrid akzeptabel; im Moodle-Track nicht.
- **Optionen:**
  - A) CDN beibehalten — Plugin-Directory-Submission scheitert.
  - B) Moodle-eigenes `core/react` AMD-Modul nutzen — funktioniert erst
    ab Moodle 5.0, schließt Moodle 4.5 LTS aus.
  - C) React 18.3.1 + ReactDOM lokal vendoriert in `lib/`, geladen via
    `$PAGE->requires->js()`.
- **Entscheidung:** C. ZIP wächst um ca. 50 KB, Trade-off ist klar
  pro Plugin-Directory-Approval und pro DSGVO. MIT-Lizenz-Header der
  React-UMD-Builds bleiben in den Dateien stehen.
- **Konsequenzen:** ZIP-Größe ~452 KB. Reviewer beanstandet Vendoring
  nicht — die offiziellen UMD-Builds sind anerkannt. Für Moodle 5.0+
  könnte später auf `core/react` migriert werden, aber solange 4.5
  Mindest-Anforderung ist, vendoriert.

#### adr05 Floating Action Button als alleiniger Navi-Einstieg im Moodle-Plugin

- **Datum:** 2026-05-08 (eingeführt v1.1.37)
- **Status:** beschlossen — löst die Legacy-Funktion
  `local_toolguide_extend_navigation()` aus `lib.php` ab
- **Kontext:** Moodle 5.x deprecated stückweise die `global_navigation`-
  Callback-API. Gleichzeitig ist seit v1.1.13 der schwebende
  „Tool Guide"-Button (FAB, Lucide `life-buoy`) auf jeder Seite
  präsent.
- **Optionen:**
  - A) Legacy-Callback behalten und Deprecation-Warnings ignorieren.
  - B) Auf einen typisierten Hook migrieren (z. B.
    `\core\hook\navigation\primary_navigation_extension`) — fragile, da
    Moodle den Hook-Namen für Site-weite Custom-Links noch nicht
    finalisiert hat.
  - C) Nav-Eintrag ersatzlos streichen — der FAB deckt den Use-Case
    schon themenagnostisch ab.
- **Entscheidung:** C. Der FAB ist auf jeder Seite sichtbar (Capability
  `local/toolguide:viewfab` reglementiert das). Die Capability
  `local/toolguide:view` schützt weiterhin den direkten URL-Zugriff
  auf `/local/toolguide/index.php`.
- **Konsequenzen:** Zugang läuft nur noch über (a) FAB oder (b)
  direkten URL. Für Moodle-Sites, die einen klassischen Nav-Eintrag
  brauchen, bietet sich `block_navigation` mit einer Custom-URL an.

#### adr06 AMD-Modul + Mustache-Template als Renderpfad

- **Datum:** 2026-05-08 (eingeführt v1.1.35)
- **Status:** beschlossen
- **Kontext:** Vor v1.1.35 wurde der React-Bundle als IIFE in einem
  `<script src=...>` geladen, der Locale per Inline-`<script>` injiziert,
  der Mount-Container als Inline-HTML in `index.php` geechoed. Das
  verstößt gegen Moodles Coding-Standards (Inline-Scripts, kein
  AMD), und das Bundle umgeht Moodles RequireJS-Caching.
- **Optionen:**
  - A) Status quo halten und Phpcs-Warnings akzeptieren.
  - B) Echtes AMD-Modul + `js_call_amd()` + Mustache-Template.
- **Entscheidung:** B. Bundle ist jetzt
  `define([], function(){ return { init: fn }; })`. Locale geht als
  Argument an `init(initialLang)`. Mount-Container in
  `templates/main.mustache`, gerendert per
  `$OUTPUT->render_from_template()`.
- **Konsequenzen:** Plugin folgt nun den Moodle-Konventionen, RequireJS
  cached korrekt, CSP-Kompatibilität gegeben. `sync_plugin_js.py`
  generiert die `define`-Wrapper-Struktur.

#### adr07 Moodle-4.5-LTS als Mindestversion

- **Datum:** 2026-05-08 (eingeführt v1.1.34)
- **Status:** beschlossen
- **Kontext:** Moodle Plugins Directory akzeptiert seit Anfang 2026
  nur noch Plugins mit Mindestversion 4.5. Vorher war
  `requires = 2022112800` (4.1) eingetragen.
- **Optionen:**
  - A) Auf 4.1 bleiben — Plugin-Directory-Submission gesperrt.
  - B) Auf 4.5 LTS heben (`2024100700`).
  - C) Auf 5.0 (`2025xx`) heben.
- **Entscheidung:** B. 4.5 ist LTS, lange supported, hat den typisierten
  Hook (`before_footer_html_generation`) stabil. 5.0 wäre zu eng
  geschnitten — viele Sites stehen noch auf 4.5.
- **Konsequenzen:** Legacy-Callback `local_toolguide_before_footer()`
  in `lib.php` bleibt bestehen, wird aber von Moodles Hook-Manager
  auf 4.4+ automatisch ignoriert. Maturity gleichzeitig auf
  `MATURITY_STABLE` gehoben.

#### adr08 Boost-Layout-Tightening per Body-Class und Selektor-Stack

- **Datum:** 2026-05-08 (eingeführt v1.1.34, robust ab v1.1.38)
- **Status:** beschlossen
- **Kontext:** Boost reserviert ca. 80 px Vertikalraum zwischen
  Primary-Nav und Inhalt — sinnvoll für Moodle-Standardseiten mit
  H1, Breadcrumb und Action-Tabs, aber redundant für eine
  self-contained React-App, die ihren eigenen Header rendert.
- **Optionen:**
  - A) Pagelayout `embedded` — entfernt auch Navi und Footer (zu viel).
  - B) Custom-Layout via Theme-Override registrieren — Theme-spezifisch.
  - C) Boost-Standard-Layout `report` + scoped CSS-Resets per
    Body-Class.
- **Entscheidung:** C. `index.php` setzt `$PAGE->add_body_class(
  'local-toolguide-page')`; `styles.css` zielt unter dieser Body-Class
  auf sechs Spacing-Layer (`#page`, `#page-wrapper`, `#page-content`,
  `#topofscroll`, `#page-header`, `#region-main(-box)`,
  `[role=main]`, `#toolguide-root`) plus blendet die Auxiliary-Chrome
  (`.secondary-navigation`, `.activity-header`,
  `.context-header-settings-menu`, `.page-context-header`,
  `nav.tertiary-navigation`) auf der Tool-Guide-Seite per
  `display: none` aus.
- **Konsequenzen:** Funktioniert in Boost und den meisten
  Boost-Forks (Adaptable, Snap, Trema, Klass) ohne Anpassung. Custom-
  Themes mit eigener Spacing-Logik brauchen evtl. zusätzliche Regeln.

---

## 11. Skills (extern)

Generisches Moodle-/Design-/Accessibility-Wissen liegt **außerhalb** dieses Repos in der Claude-Skill-Library:

| Skill | Trigger |
|---|---|
| `moodle-framework` | jede Moodle-Aufgabe |
| `moodle-dev` | Plugin-Architektur, APIs |
| `moodle-deploy` | Deploy auf Orb-Docker, `purge_caches`, `upgrade.php` |
| `moodle-plugin-submit` | Submission ans Plugins Directory / Marketplace |
| `eledia-moodle-ux` | UI-Arbeit, eLeDia-Stil |
| `webui-accessibility-auditor` | BFSG-/WCAG-Prüfung |

Bei Drift zwischen Skill und Projektkontext: Prompt **`#refresh`**.

---

## 12. Prompt-Shortcuts

`#status`, `#next`, `#plan`, `#refine`, `#implement`, `#test`, `#bugs`, `#verify`, `#doc`, `#userdoc`, `#devdoc`, `#consistency`, `#review`, `#refresh` — Definitionen siehe [eLeDia.OS_DevFlow/00-master.md §12](https://github.com/jmoskaliuk/eLeDia.OS_DevFlow/blob/main/00-master.md#12-prompt-shortcuts).

---

## 13. Empfohlener Tagesablauf

1. `#status`
2. `#next`
3. `#implement` (1–2 Tasks)
4. `#test`
5. `#doc`
6. Bei Release: Checkliste in §19 durchgehen.

---

## 14. Cowork-Mount-Gotchas

Diese vier Gotchas bremsen jede Cowork-Session, deshalb stehen sie hier
und nicht tiefer in einer Detail-Doku:

1. **`rm` und `mv` auf der Cowork-Mount geben `Operation not permitted`
   zurück.** Workaround: `cp` für Überschreiben; für tatsächliches
   Löschen `mcp__cowork__allow_cowork_file_delete` (Supervised Mode)
   oder den User per Host-Terminal `rm` lassen.
2. **`zip` CLI scheitert genauso, deshalb Python `zipfile`.** Siehe §18
   für das Build-Pattern. Nicht neu erfinden — jede Alternative hat in
   einem Lauf eine 0-Byte-Datei produziert.
3. **`.git/index.lock` bleibt liegen.** Wenn ein Schreib-Git-Kommando
   (`git add`, `git rm`, `git commit`) mittendrin scheitert, blockiert
   die zurückgelassene Lock-Datei den nächsten Versuch. Aus der Sandbox
   nicht entfernbar — User muss `rm .git/index.lock` im Host-Terminal
   ausführen.
4. **Git-Commits aus Cowork heraus scheitern mit „auto-detect email".**
   Die Sandbox hat keine git-config. Pattern in diesem Repo: in der
   Cowork stagen, dann ein `commit_<feature>.sh`-Skript schreiben, das
   stage + commit + push macht, und es dem User für die Host-Shell
   übergeben.
5. **Sync-Skripte müssen `Path(__file__).resolve().parent` als `ROOT`
   nutzen.** Frühere Sessions hatten absolute Cowork-Session-Pfade
   (`/sessions/<id>/mnt/...`) eingetragen, die nach Session-Wechsel
   bricht. Siehe `05-quality.md` `bug01`.

---

## 15. Lucide-Icons

Matrix-Icons (`thumbs-up`, `thumbs-down`, `circle-slash`) und der FAB
(`life-buoy`) kommen aus **Lucide v1.8.0**. Niemals SVG-Pfade raten —
immer aus dem npm-Paket extrahieren:

```bash
npm pack lucide-static@1.8.0
tar -xzf lucide-static-*.tgz
cat package/icons/<name>.svg
```

Pfade haben sich zwischen Major-Versionen sichtbar geändert. Die alten
sehen visuell anders aus.

---

## 16. eLeDia-CI-Farben

```
#194866   dunkelblau    — primary text, headers, active UI
#267372   teal          — subtitle, secondary headings
#669933   grün          — success, positive
#A5C387   hellgrün      — hover / background
#FCBC82   hellorange    — separators, accents
#F98012   orange        — CTAs (sparsam auf Beige)
#FFECDB   warmbeige     — Header/Footer-Background seit v1.1.11
#F3F5F8   hellgrau      — sub-nav, subtle chrome
```

**Moodle-5-Activity-Purpose-Farben** (aus `mod/*/lib.php
FEATURE_MOD_PURPOSE`, für Activity-Icons in der Matrix und im Detail):

```
administration         #da58ef
assessment             #f90086
collaboration          #5b40ff
communication          #eb6200
content / interactive  #8d3d1b
resources              #0099ad
```

---

## 17. Drei-Tracks-Diagramm und lokales Setup

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

**Lokales Setup**

- Repo-Root: `~/Documents/Code/moodletoolguide`
- Lokaler Moodle-Test: Orb-VM mit Docker-Container (siehe Skill
  `moodle-deploy`).
- Lokaler WP-Test: WordPress-Lokalinstanz mit Twenty Twenty-Four als
  Baseline.

**Quelltext ändern**

Immer zuerst `moodle-tool-guide.html`. Wer nur Plugin-Code ändert,
verliert den Lockstep — beim nächsten Sync ist die Änderung weg.

```bash
# Editieren, im Browser direkt verifizieren
open moodle-tool-guide.html
```

**Sync in alle Tracks**

```bash
python3 sync_plugin_js.py       # Moodle AMD source
python3 sync_wordpress_js.py    # WordPress asset JS
```

Vorbedingung: Beide Skripte erwarten `ROOT = Path(__file__).resolve().parent`.

**Deploy ins lokale Moodle**

```bash
bash moodle-plugin/deploy.sh
```

Das Skript auto-detektiert die Orb-VM und den Docker-Container, synct
die Plugin-Dateien (rsync) ins Container-Volume, führt `upgrade.php
--non-interactive` und `purge_caches.php` aus.

**Deploy ins lokale WordPress**

WP-ZIP frisch bauen (siehe §18) und in WP-Admin → Plugins → Add New →
Upload Plugin hochladen.

---

## 18. ZIP-Builds (Release-Vorbereitung)

Für eine Release-Version müssen **beide** ZIPs frisch gebaut werden.
Python `zipfile` verwenden, weil `zip` CLI auf dem Cowork-Mount
mit `Operation not permitted` fehlschlägt.

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

## 19. Release-Checkliste

Eine Release ist erst freigegeben, wenn alle Punkte erfüllt sind. PO-
Sign-off erfolgt zum Abschluss.

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
[ ] Alle vier Readmes haben einen `== Changelog ==`-Eintrag
[ ] WP-ZIP frisch gebaut und auf neue Versions-Strings geprüft
[ ] Moodle-ZIP frisch gebaut und auf neue Versions-Strings geprüft
[ ] Drei-Track-Lockstep-Test grün (`test01` in `05-quality.md`)
[ ] Visuell verifiziert: Footer-Logo erscheint korrekt in allen Tracks
[ ] BFSG-Smoke (`test04`) grün
[ ] WP-Theme-Matrix (`test05`) grün
[ ] Git-Tag `vX.Y.Z` gesetzt
[ ] Push nach origin/main
```

---

## 20. WordPress-Theme-Test-Matrix

Bei jeder UI-Änderung (Footer, Header, Buttons, Links, Karten):

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

## 21. GDPR-/DSGVO-Variante (lokales React im WordPress-Plugin)

Standardmäßig zieht das **WordPress-Plugin** React aus `unpkg.com`. Für
strenge Datenschutz-Konfigurationen vendoriert ausliefern:

```bash
mkdir -p wordpress-plugin/eledia-toolguide/assets/js/vendor
curl -fsSL https://unpkg.com/react@18.3.1/umd/react.production.min.js \
     -o wordpress-plugin/eledia-toolguide/assets/js/vendor/react.production.min.js
curl -fsSL https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js \
     -o wordpress-plugin/eledia-toolguide/assets/js/vendor/react-dom.production.min.js
```

Das Plugin-PHP erkennt `assets/js/vendor/react.production.min.js` per
`file_exists()` und enqueued es statt der CDN-URL. Die Vendor-Files
**dürfen nicht** in den GitHub-Repo committet werden — `.gitignore`
regelt das.

Im **Moodle-Plugin** ist React seit v1.1.35 fest unter `lib/`
vendoriert (siehe `adr04`); dort gibt es keine CDN-Variante.

---

## 22. Submission ins Plugin-Directory

Generisches Wissen → Skill `moodle-plugin-submit`. Projekt-spezifische
Besonderheiten:

- Repository-Pfad in der Plugin-Directory-Metadata:
  `https://github.com/jmoskaliuk/local_eledia_moodletoolguide`
- Der Plugin-Component-Name `local_toolguide` ist im Plugin-Directory
  frei.
- Maturity: ab v1.1.34 `MATURITY_STABLE` (siehe `adr07`).
- Mindest-Moodle-Version `2024100700` (4.5 LTS) — siehe `adr07`.

Die WordPress-Variante wird als getrenntes Asset auf
`wordpress.org/plugins/eledia-toolguide` gepflegt; die Slug muss bei
jedem `Stable tag`-Bump synchron sein.

---

## 23. Datenbank-Pflege

`Datenbank_ToolGuide.xlsx` ist die manuell gepflegte Tool-Datenbank.
Änderungen am Datenbestand:

1. Excel-Datei öffnen, Zellen aktualisieren.
2. Werte in den `TOOLS`-Array in `moodle-tool-guide.html` einkopieren —
   aktuell ist das ein **manueller** Schritt (kein Auto-Sync).
3. Sync-Skripte laufen lassen.

> Automatischer Excel→JS-Sync ist als Feature-Vorschlag in
> `01-features.md` denkbar, heute aber nicht implementiert.

---
