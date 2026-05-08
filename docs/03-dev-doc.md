# Entwickler-Dokumentation · Moodle Tool Guide

## Meta

Dieses Dokument beschreibt, **wie das System tatsächlich implementiert ist** — Ist-Zustand, nicht Wunschverhalten.

**Regeln:**
- Keine Soll-Beschreibungen (die gehören in `01-features.md`).
- Bei Mismatch zwischen Soll und Ist → Inkonsistenz flaggen, ggf. `qXX` anlegen.
- Aktualisieren, sobald sich die Implementierung ändert (sonst nicht „done").

---

# System-Übersicht

## Architektur

Drei Auslieferungswege auf gemeinsamer Codebasis:

```
                   Prototyp_ToolGuide.html  (Source of Truth)
                   ├── React 18.3.1 + Babel-in-Browser
                   ├── Mount: #root
                   └── enthält Babel-Block <script type="text/babel">
                              │
              ┌───────────────┼─────────────────────┐
              │               │                     │
       sync_plugin_js.py   (kein sync —         sync_wordpress_js.py
              │            Standalone bleibt          │
              │            wie es ist)                │
              ▼                                       ▼
   moodle-plugin/local/toolguide/             wordpress-plugin/eledia-toolguide/
   ├── version.php (1.1.13)                   ├── eledia-toolguide.php (1.1.13)
   ├── lib.php                                ├── assets/css/toolguide.css
   ├── lang/{de,en}/local_toolguide.php       ├── assets/js/toolguide.js  (gen.)
   ├── pix/icon.{png,svg}                     ├── readme{,-de,-es,-fr}.txt
   ├── styles.css                             └── uninstall.php
   ├── db/access.php
   ├── index.php
   ├── amd/src/toolguide.js (gen.)
   └── amd/build/toolguide.min.js
```

## Kommunikationsmuster

- **Standalone:** öffnet im Browser, lädt React aus `unpkg.com`, mountet in `#root`.
- **Moodle:** lokales Plugin lädt das AMD-Modul `local_toolguide/toolguide`. Mountet in `#toolguide-root` (vom `index.php` ins DOM gesetzt). React kommt aus dem Moodle-Theme-Stack (Moodle 5.x liefert React 18.3.1 mit).
- **WordPress:** Shortcode `[eledia_toolguide]` druckt einen `<div class="eledia-toolguide-root">`-Container und enqueued das Asset-JS. React kommt aus `unpkg.com` oder aus `assets/js/vendor/` (lokaler Fallback, siehe ADR02).

---

## Kernkomponenten

| Komponente | Zweck |
|---|---|
| `Prototyp_ToolGuide.html` | Source of Truth — gesamte App (React + i18n + Daten + Styles + Logos als Data-URIs). |
| `sync_plugin_js.py` | Extrahiert den Babel-Block, ersetzt Mount-Punkt `#root` → `#toolguide-root`, wrappt in IIFE, injiziert komponentenscopierte Styles, schreibt nach `moodle-plugin/local/toolguide/amd/src/toolguide.js`. |
| `sync_wordpress_js.py` | Extrahiert den Babel-Block, ersetzt Mount-Punkt `#root` → erstes `.eledia-toolguide-root`, ersetzt `useState("de")` durch `__elediaToolguideInitialLang`, integriert `wp.i18n` als Override, schreibt nach `wordpress-plugin/eledia-toolguide/assets/js/toolguide.js`. |
| `moodle-plugin/local/toolguide/index.php` | Moodle-Page-Rendering, lädt AMD-Modul, baut Mount-DOM. |
| `moodle-plugin/local/toolguide/amd/build/toolguide.min.js` | Minifizierte Auslieferungsversion des AMD-Moduls (von Moodle bei Cache-Aufbau erzeugt). |
| `wordpress-plugin/eledia-toolguide/eledia-toolguide.php` | Plugin-Bootstrap, Shortcode-Registrierung, Asset-Enqueue, Privacy-API, lokaler React-Fallback-Detect. |
| `Datenbank_ToolGuide.xlsx` | Tool-Datenbank — manuell gepflegt, in den Prototyp einkopiert (kein Live-Sync). |
| `moodle-plugin/deploy.sh` | Deploy in lokales Orb-Docker-Moodle (siehe Playbook). |
| `assets/` | Logos, Favicons, Cc-by-nc-sa-Badge — als Data-URIs in den Prototyp einkopiert. |

---

## Datenfluss

1. **Editor** ändert `Prototyp_ToolGuide.html`.
2. **Sync-Skripte** generieren beide Plugin-JS-Dateien.
3. **Moodle:** ZIP-Build (`moodle-plugin/local_toolguide.zip`) → Upload via Moodle-Admin oder Direkt-Sync via `deploy.sh`.
4. **WordPress:** ZIP-Build (`wordpress-plugin/eledia-toolguide.zip`) → Upload via WP-Admin.
5. **Standalone:** HTML-Datei direkt im Browser öffnen oder per Webserver ausliefern.
6. **Browser:**
   - lädt React (CDN oder lokal)
   - rendert App in den jeweiligen Mount-Punkt
   - Tool-Daten und i18n-Strings sind im JS hartkodiert (kein Backend-Call)

---

## Externe Abhängigkeiten

| Library | Version | Bezugsweg |
|---|---|---|
| React | 18.3.1 | unpkg.com (Default) oder lokal vendoriert (`assets/js/vendor/`) |
| ReactDOM | 18.3.1 | wie React |
| Babel-Standalone | aktuell (nur Standalone) | unpkg.com |
| Lucide Icons | v1.8.0 | SVG-Pfade aus dem npm-Paket extrahiert, inline ins JS einkopiert |
| Moodle Core | 4.1+ | `version.php` `requires = 2022112800` |
| WordPress Core | 6.0+ | Plugin-Header `Requires at least: 6.0` |
| PHP | 7.4+ | Plugin-Header `Requires PHP: 7.4` |

---

## State Management

- **App-State:** React-`useState` für aktuelle Sprache, gewähltes Tool, Wizard-Schritt, Filter.
- **Persistenz:** keine — Reload setzt alles zurück.
- **WordPress-Spezifika:**
  - `__elediaToolguideInitialLang` wird vom Plugin-PHP als `wp_localize_script` injiziert (Site-Locale → Sprachcode).
  - `wp.i18n.__()` als Override pro Locale, falls die WordPress-Site eine Übersetzung mitbringt.

---

## Technische Constraints

- **Single-File-Quelle:** Babel-in-Browser kostet Performance, ist aber Voraussetzung dafür, dass die Standalone-HTML ohne Build-Server funktioniert.
- **Data-URIs für Logos:** alle Logos (eLeDia, Moodle Partner, CC-BY-NC-SA, GitHub) sind als Base64-Data-URIs im JS eingebettet, damit die Standalone-HTML wirklich eine einzelne Datei ist. Folge: Bundle-Größe ~330 KB unkomprimiert (das neue Premium-Partner-PNG allein bringt 173 KB Base64).
- **Moodle 4.1+ statt 5.x:** Plugin läuft unter 4.1+, weil `requires = 2022112800`. Maturity ist `MATURITY_BETA`.
- **WordPress-Theme-Isolation:** Scoped CSS Reset auf `.eledia-toolguide-root` (`!important`) plus Inline-Styles für Link-/Icon-Farben. Themes wie Astra, OceanWP, GeneratePress neigen dazu, sonst durchzuschlagen.
- **High-Contrast / `prefers-reduced-motion`:** sind serviert, indem die App auf `html.hc` und `prefers-reduced-motion` reagiert. Im Moodle-AMD-Modul wird ein zusätzliches Stylesheet zur Laufzeit injiziert.

---

# Feature-Implementierung

> Aus dem aktuellen Code abgeleitet, abgeglichen mit `01-features.md`.

---

## Interaktive Matrix (`feat01`)

**Überblick**
React-Komponente `Matrix` rendert ein Grid (CSS Grid) mit Aktivität pro Zeile, Ziel pro Spalte. Eignungs-Icons aus Lucide v1.8.0, SVG-Pfade als Strings im JS hinterlegt.

**Komponenten**
- `Matrix` → Grid-Container
- `MatrixCell` → einzelne Zelle, klickbar
- `EignungIcon` → mappt `gut|bedingt|ungeeignet` auf Lucide-Icon
- `FilterBar` → State für Bloom/Komplexität/Eignung-Filter

**Datenfluss**
- Eingabe: Tool-Daten aus `TOOLS` (im JS hartkodiert, aus `Datenbank_ToolGuide.xlsx` exportiert)
- Verarbeitung: Filter-State + `useMemo` für gefilterte Liste
- Ausgabe: Grid-Render mit Click-Handler → öffnet Detail-Modal

**Constraints**
- Mobile Breakpoint < 768 px → Karten statt Grid

---

## Guided Wizard (`feat02`)

**Überblick**
Vier-Schritt-State-Machine, gesteuert über `useState({step:0, ...})`.

**Komponenten**
- `Wizard` → State-Machine + Step-Renderer
- `StepGoal`, `StepComplexity`, `StepBloom` → Schritt-spezifische UI
- `WizardResults` → sortierte Liste aus `TOOLS`, gefiltert nach Eingabe

**Datenfluss**
- Trigger: Button „Welches Tool passt zu mir?"
- Verarbeitung: pro Schritt State-Update; Result-Schritt scort Tools über `(eignung*3 + bloom_match*2 + complexity_match)`
- Ergebnis: sortierte Liste, klickbar → öffnet Detailansicht

---

## Detailansicht / Steckbrief (`feat03`)

**Überblick**
Modal-Komponente `ToolDetail`, geöffnet über `selectedTool`-State.

---

## Mehrsprachigkeit (`feat04`)

**Überblick**
Inline-i18n-Tabelle `I18N = { de:{...}, en:{...}, fr:{...}, es:{...} }` im JS. Aktuelle Sprache via `useState`. Helper `t(lang, key)` und `tg(lang, goalKey)` für Goal-spezifische Strings.

**WordPress-Patches** (siehe `sync_wordpress_js.py`):
- `useState("de")` → `useState(__elediaToolguideInitialLang)` (Site-Locale wird als globaler Initial-Wert injiziert)
- `t(lang, key)` wird so umgeschrieben, dass `wp.i18n.__(I18N[lang][key], "eledia-toolguide")` als Override greift, wenn die Site-Locale zum gewählten Lang passt.
- Document-Lang-Setter `document.documentElement.lang` → `__elediaToolguideRoot.setAttribute("lang", lang)` (kein Mutieren des globalen `<html>` aus dem Plugin heraus).

---

## Drei-Track-Auslieferung (`feat05`)

**Überblick**
Source ist `Prototyp_ToolGuide.html`. Die zwei Sync-Skripte sind die einzigen erlaubten Wege, die Plugin-JS-Dateien zu aktualisieren — manuelle Edits an `moodle-plugin/local/toolguide/amd/src/toolguide.js` oder `wordpress-plugin/eledia-toolguide/assets/js/toolguide.js` würden beim nächsten Sync verloren gehen.

**Constraints**
- `sync_plugin_js.py` und `sync_wordpress_js.py` müssen vom Repo-Root aus laufbar sein (`Path(__file__).resolve().parent`). Hardcodierte Session-Pfade (z. B. aus früheren Cowork-Sessions) sind ein bekannter Drift-Risikopunkt — siehe `04-tasks.md` für entsprechende Cleanup-Tasks.
- Moodle-AMD-Build (`amd/build/toolguide.min.js`) wird nicht von den Sync-Skripten erzeugt, sondern von Moodle bei Cache-Aufbau. Lokal kann er via `purge_caches` neu generiert werden.

---

## Barrierefreiheit (`feat06`)

**Überblick**
Im Prototyp-CSS verankert; bei den Plugins entweder über `styles.css` (Moodle) oder `assets/css/toolguide.css` (WordPress) plus den im AMD-Modul zur Laufzeit injizierten Style-Block (`__tgStyle` in `sync_plugin_js.py`).

**Konkretes:**
- `*:focus-visible { outline: 3px solid #F98012; outline-offset: 2px; }`
- `html.hc *, html.hc #toolguide-root *` → Schwarz/Weiß-Override
- `@media (prefers-reduced-motion: reduce)` → animation-/transition-duration: 0.01ms
- Kontrast-Check im CLAUDE.md dokumentiert (Header-Text 8.9:1).

**Audit:** `Accessibility_Audit_ToolGuide.md` im Repo-Root (Stand: 2026-04-10, vor Light-Theme-Umstellung).

---

## WordPress-Theme-Isolation (`feat07`)

**Überblick**
Eingeführt in v1.1.10. Scoped CSS Reset in `assets/css/toolguide.css` mit Selector `.eledia-toolguide-root` und `!important` auf den themeneigenen Override-Properties (margin, padding, width, background, color, text-decoration, list-style, font).

**Komponenten**
- `assets/css/toolguide.css` → Reset
- React inline `style={{ color: ... }}` → Link-/Icon-Farben (gewinnt auch da, wo `!important` im Stylesheet vom Theme noch geschlagen würde)

**Test-Matrix** (aus CLAUDE.md):
- Twenty Twenty-Four (Baseline)
- Astra, OceanWP, GeneratePress
- 200 % Browser-Zoom
- Windows High Contrast / `prefers-contrast: more`

---

# Bekannte Implementierungs-Eigenheiten

- **Cowork-Session-Pfade in Sync-Skripten:** lokale Modifikationen können `Path(__file__).resolve().parent` durch eine hardcodierte Session-ID ersetzen. Vor jedem Sync-Lauf sicherstellen, dass das Repo-Root korrekt aufgelöst wird.
- **`local_toolguide.zip` am Repo-Root:** historisch gewachsen, kann auftauchen, wenn der ZIP-Build fälschlich vom Root statt aus `moodle-plugin/` ausgeführt wird. Korrekter Ort: `moodle-plugin/local_toolguide.zip`.
- **Lucide-Icon-Pfade:** nicht raten, sondern aus `lucide-static@1.8.0` extrahieren (`npm pack lucide-static`). Die Pfade haben sich zwischen Major-Versionen geändert.
- **Cowork-Sandbox `rm` blockiert:** Lösch-Operationen auf der Cowork-Mount sind standardmäßig blockiert. `mv`, `rm` schlagen mit „Operation not permitted" fehl. Workaround: `cp` schreibt neu, alte Dateien bleiben liegen → manueller Cleanup außerhalb der Cowork-Session, oder über `mcp__cowork__allow_cowork_file_delete`.

---

# Grundprinzip

> Dieses Dokument erklärt, **wie das System gebaut ist** — nicht **wie es sich verhalten soll**.
