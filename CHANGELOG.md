# Changelog

All notable changes to the eLeDia Moodle Tool Guide are documented in this file.
The project ships in three synchronized flavors: the standalone HTML prototype
(`moodle-tool-guide.html`), the Moodle local plugin (`local_toolguide`) and the
WordPress plugin (`eledia-toolguide`). Versions are kept in lockstep across all
three tracks via `sync_plugin_js.py` and `sync_wordpress_js.py`.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.37] – 2026-05-08

### Moodle-Plugin
- **M5: Legacy `local_toolguide_extend_navigation()`-Callback entfernt.**
  Die Funktion fügte einen Knoten in Moodles `global_navigation` ein —
  ein API-Pfad, der in 5.x stückweise deprecated wird. Da der
  schwebende Tool-Guide-Button (`local-toolguide-fab`) seit v1.1.13
  themenagnostisch denselben Zweck erfüllt, ist die Funktion ersatzlos
  raus. `index.php` enforceert weiterhin die Capability
  `local/toolguide:view`. Der zugehörige PHPUnit-Test
  `test_extend_navigation_adds_node_for_capable_user` ist mit entfernt.
- **N3, N4: Behat-Tests an Moodle 4.5/5-Realität angepasst.** Alle
  `I am on the "<url>" page`-Steps (kein Standard-Step in der
  moodle-plugin-ci-Lib) sind ersetzt durch `I visit "<url>"`. Das
  Szenario „Tool Guide is reachable from the navigation" mit
  `I expand "Site pages" node` ist gestrichen — Boost 4.5/5 hat die
  Primary-Navigation grundlegend umstrukturiert. Die FAB-Szenarien
  decken die Erreichbarkeit jetzt vollständig ab. Zusätzlicher
  Sanity-Check: `body.local-toolguide-page` muss gesetzt sein.
- **N6: Translator-Credit i18n-clean.** Im SoT
  `moodle-tool-guide.html` ist die Zusatz-Credit-Zeile
  „, Susanne Gebauer und Gerald Hartwig" jetzt als i18n-Key
  `credit_translators_extras` in allen vier Sprachen (de, en, fr, es)
  hinterlegt. Der React-Render verwendet `t(lang,
  "credit_translators_extras")` statt einer hardcodierten Zeichenkette.
  Funktional unverändert — die Credit-Zeile zeigt sich weiterhin nur
  im Deutsch-Modus (`lang === "de"`-Gate). Der Refactor macht spätere
  Sprach-Erweiterungen sauber.
- **N1: SVG-Inline in `lib.php` bewusst belassen.** Der life-buoy-
  SVG-String könnte in eine `pix/life-buoy.svg`-Datei ausgelagert
  werden, würde dann aber per `<img>`-Tag die `currentColor`-Stroke-
  Vererbung verlieren — der Button wäre nicht mehr automatisch weiß
  auf orangem Hintergrund. Die 13 inline-SVG-Zeilen sind weiterhin
  die zweckmäßigste Lösung.

### Notes
- Plugin-Bundle (Moodle-AMD-Source) hat sich um ca. 290 Bytes durch
  die vier neuen i18n-Strings vergrößert.
- WP-Plugin bleibt vorerst auf 1.1.33 — die N6-i18n-Strings landen
  bei der nächsten WP-Synchronisation, sind aber funktional identisch
  (kein User-sichtbarer Unterschied, da der Credit nur für
  `lang === "de"` rendert).
- `version.php`: `$plugin->version = 2026050810` (vorher 2026050809),
  `$plugin->release = '1.1.37'`.

## [1.1.36] – 2026-05-08

### Moodle-Plugin
- **Vertikaler Leerraum zwischen Boost-Navigation und React-Header
  geschlossen.** Nachdem in 1.1.34 die doppelte H1 ausgeblendet wurde,
  blieb der von Boost reservierte Padding-Bereich (`#page-header`,
  `#region-main`) als breite leere Fläche stehen. `styles.css`
  setzt jetzt unter `body.local-toolguide-page` die Top/Bottom-
  Paddings und Margins von `#page-header`, `#region-main`,
  `#region-main-box > section` und `#toolguide-root` auf 0 — die
  React-App sitzt direkt unter der Primary-Navigation.

### Notes
- Reines CSS-Patch — keine PHP-Änderungen, keine Plugin-Logik
  angefasst, AMD-Bundle unverändert.
- `version.php`: `$plugin->version = 2026050809` (vorher 2026050808),
  `$plugin->release = '1.1.36'`.

## [1.1.35] – 2026-05-08

### Moodle-Plugin (Code-Review-Approval-Blocker behoben)
Drei zusammenhängende Architektur-Fixes, die das Plugin Plugin-Directory-
fähig machen:

- **C1: Externe React-CDN entfernt.** React 18.3.1 + ReactDOM (UMD,
  MIT-Lizenz) sind jetzt unter `lib/react.production.min.js` und
  `lib/react-dom.production.min.js` lokal mit dem Plugin
  ausgeliefert. `index.php` lädt sie über `$PAGE->requires->js()`.
  Kein `cdnjs.cloudflare.com`-Drittanbieter-Request mehr — DSGVO-
  sauber, Reviewer-Policy-konform.
- **C2: Inline-`<script>`-Tags entfernt.** Statt `echo '<script>...'`
  wird die Locale jetzt als Argument an die AMD-Init-Funktion
  weitergereicht: `$PAGE->requires->js_call_amd('local_toolguide/
  toolguide', 'init', [$initiallang])`. Die AMD-Funktion legt sie
  intern als `window.__toolguideMoodleLang` ab, damit die bestehenden
  Sync-Skript-Patches in `sync_plugin_js.py` weiter greifen.
- **C3: Bundle ist jetzt ein echtes AMD-Modul.** `sync_plugin_js.py`
  wickelt den React-App-Code in `define([], function(){ return {
  init: function(initialLang) { ... } }; })` statt in eine IIFE.
  Damit greift Moodles RequireJS-Infrastruktur korrekt: `amd/build/`-
  Caching, On-Demand-Loading, CSP-Kompatibilität.
- **M2: Mount-Container im Mustache-Template.** Der `<div
  id="toolguide-root">` lebt nun in `templates/main.mustache` und
  wird über `$OUTPUT->render_from_template('local_toolguide/main',
  [])` gerendert. Inline-HTML in `index.php` ist weg, Inline-`style="
  min-height:600px"` ebenfalls (steht schon seit 1.1.13 in
  `styles.css`).

### Notes
- Plugin-ZIP wuchs ca. 50 KB auf ~452 KB durch das vendorierte
  React-Bundle. Trade-off gegen DSGVO und Plugin-Directory-Approval —
  klare Entscheidung.
- `version.php`: `$plugin->version = 2026050808` (vorher 2026050807),
  `$plugin->release = '1.1.35'`.

## [1.1.34] – 2026-05-08

### Moodle-Plugin
- **Doppelte H1-Überschrift auf der Tool-Guide-Seite entfernt.** Boost
  rendert automatisch eine `<h1>` aus `$PAGE->set_heading()`; gleichzeitig
  hat die React-App eine eigene dekorierte Überschrift mit „Moodle 5"-
  Badge und Untertitel. `index.php` setzt jetzt
  `$PAGE->add_body_class('local-toolguide-page')`, `styles.css`
  versteckt damit die Moodle-`<h1>` (`.page-header-headings`).
  `set_heading()` bleibt erhalten — Screenreader, Breadcrumb und
  Browser-Tab-Title bleiben korrekt.

### Code-Review-Quick-Wins (Moodle-Konventionen)
- **`\core\context\*` statt `context_system`** (Moodle 4.2+-Form):
  `index.php` und `lib.php` rufen jetzt
  `\core\context\system::instance()` auf. Der alte globale Klassenname
  ist seit 4.2 deprecated und löst in 5.x stille Warnings aus.
- **`MATURITY_STABLE` statt `MATURITY_BETA`.** Plugin ist seit 1.1.13
  produktiv und durchläuft kontinuierliche Releases — der BETA-Status
  passt nicht mehr.
- **`$plugin->requires = 2024100700` (Moodle 4.5 LTS).** Die Moodle
  Plugins Directory akzeptiert seit Anfang 2026 nur noch Plugins mit
  Mindest-Version 4.5. Davor war 4.1 (`2022112800`) eingetragen, was
  den Submission-Bot blockt. Moodle 4.5 hat zudem die typisierte
  Hook-API stabilisiert, sodass die Legacy-`local_toolguide_before_footer()`-
  Funktion in `lib.php` nun rein für Backward-Compat existiert (4.1–4.4
  werden offiziell nicht mehr unterstützt, aber der Hook-Manager
  überspringt die Legacy-Form sowieso, wenn der typisierte Hook
  registriert ist).

- `version.php`: `$plugin->version = 2026050807` (vorher 2026050806),
  `$plugin->release = '1.1.34'`, `$plugin->requires = 2024100700`,
  `$plugin->maturity = MATURITY_STABLE`.

## [1.1.33] – 2026-05-08

### Changed (alle drei Tracks)
- **Matrix-Spalten gleich breit.** Die vier didaktischen Ziel-Spalten
  („Information & Transfer", „Bewerten", „Kommunikation & Interaktion",
  „Gemeinsam Inhalte erstellen") waren bisher content-getrieben
  unterschiedlich breit, weil ihre Header-Texte verschieden lang sind.
  Fix in `moodle-tool-guide.html`: `tableLayout: "fixed"` auf der
  Desktop-Matrix-Tabelle plus `width: calc((100% - 390px) / 4)` pro
  Goal-Spalte. Activity-Spalte hat fix 210 px, Setup/Support je 90 px.
  Wirkt automatisch in allen drei Tracks via Sync-Skripte.

### WordPress-Plugin
- **`eledia-toolguide` ebenfalls auf 1.1.33** durch den Matrix-Spalten-
  Fix oben. `eledia-toolguide.php` Plugin-Header und
  `ELEDIA_TOOLGUIDE_VERSION` auf 1.1.33; Stable tag in allen vier
  Readmes; Changelog-Einträge in en/de/fr/es. ZIP neu gebaut.

### Moodle-Plugin
- **FAB-Icon ist jetzt das offizielle Lucide-`life-buoy`-Glyph**
  (Lucide v1.8.0, ISC). Inline-SVG, erbt die Strichfarbe vom Button
  (`stroke="currentColor"`) und braucht damit keinen
  `filter: brightness(0) invert(1)`-Hack mehr — das alte „Moodle-M" mit
  PNG-Filter ist raus. Pfade sind aus dem npm-Paket extrahiert (siehe
  `CLAUDE.md` Lucide-Note: nicht raten).
- **Position der schwebenden Schaltfläche per Site-Setting wählbar.**
  Neue Datei `settings.php` registriert eine Verwaltungsseite unter
  *Site administration → Plugins → Local plugins → Tool Guide* mit der
  Option **Bottom right** (Default) / **Bottom left**. Gespeichert
  unter `local_toolguide | fab_position`. `lib.php` setzt eine
  Modifier-Klasse `local-toolguide-fab--bottomleft` bzw.
  `--bottomright`; `styles.css` erhält die zwei Positions-Varianten,
  inklusive Mobile-Anpassung. Lang-Strings in DE / EN / FR / ES.
- **Sprache folgt jetzt Moodles Spracheinstellung.** Die vier
  Sprachbuttons (DE / EN / FR / ES) sind im Moodle-Track ausgeblendet.
  `index.php` injiziert `window.__toolguideMoodleLang` aus
  `current_language()` über den neuen Helper
  `local_toolguide_get_locale_lang()` (Mapping wie WP-Plugin: `de|en|
  fr|es`, sonst Fallback auf `en`). `sync_plugin_js.py` bekommt zwei
  zusätzliche Patches: `useState("de")` →
  `useState(window.__toolguideMoodleLang || "en")`, und der
  `<div role="group">`-Block mit den vier `langBtn(...)`-Aufrufen wird
  durch `null` ersetzt.

### Tests (erweitert)
- `tests/lib_test.php`: drei zusätzliche Test-Fälle für die FAB-
  Position (Default, gesetzt auf `bottomleft`, defensive Fallback bei
  ungültigem Wert) sowie eine `dataProvider`-getriebene Suite für
  `local_toolguide_get_locale_lang()` (10 Locale-Mappings inkl. der
  drei nicht-unterstützten Locales pl, it, ja → en).

### Notes
- `moodle-tool-guide.html` hat inhaltlich die Matrix-Layout-Anpassung
  bekommen; die Sync-Skript-Patches für FAB / Locale-Sync sind
  Moodle-spezifisch.
- Die Idee "Sprache aus Host-System" ist im WP-Plugin schon seit
  1.1.14 (`wp.i18n` + Site-Locale-Detection) implementiert.
- Moodle `version.php`: `$plugin->version = 2026050805` (vorher
  2026050804), `$plugin->release = '1.1.33'`.

## [1.1.32] – 2026-05-08

### Changed
- **WordPress-Plugin-JavaScript an die aktuelle Standalone-Quelle
  angeglichen.** Mit dem Umbenennen von `Prototyp_ToolGuide.html` zu
  `moodle-tool-guide.html` wurde der Babel-Block der Standalone-HTML
  zur einzigen Quelle für alle drei Tracks. Das WP-Plugin-JS
  (`wordpress-plugin/eledia-toolguide/assets/js/toolguide.js`) hat damit
  ca. 84 KB zusätzlichen App-Code übernommen, der bisher nur in der
  Standalone-Datei vorhanden war: Mobile-Responsive-Matrix-Layout,
  zusätzlicher UI-Feinschliff in der React-App und der aktuelle
  Tool-Datensatz.
- **Übersetzungs-Credits ergänzt.** Der deutsche Footer-Vermerk lautet
  ab jetzt „Basiert auf einer Übersetzung von Ralf Hilgenstock, Susanne
  Gebauer und Gerald Hartwig" — vorher war nur Ralf Hilgenstock
  genannt.

### Moodle-Plugin
- **`local_toolguide` jetzt ebenfalls auf 1.1.32.** Identischer
  Sync-Lauf für `amd/src/toolguide.js`, `amd/build/toolguide.min.js`
  ist auf demselben Stand.
- **Hook-Migration für Moodle 4.4+** (behebt `Callback before_footer in
  local_toolguide component should be migrated…` Debug-Warnung in
  Moodle 5.x): `db/hooks.php` registriert den neuen typisierten Hook
  `core\hook\output\before_footer_html_generation`, die Logik liegt
  in `classes/hook_callbacks.php` als
  `\local_toolguide\hook_callbacks::before_footer_html_generation`.
  Die alte `local_toolguide_before_footer()`-Funktion in `lib.php`
  bleibt für ältere Moodle-Versionen (4.1–4.3) erhalten — Moodles
  Hook-Manager überspringt sie auf 4.4+ automatisch.
- **PHPUnit- und Behat-Tests neu** unter `tests/`:
  - `tests/lib_test.php` — Capability-Filter, Pagelayout-Filter,
    Login/Toolguide/Path-Filter, FAB-HTML-Markup, Navigation-Node.
  - `tests/hook_callbacks_test.php` — neuer 4.4+-Hook gibt HTML
    durch, kein Output für Gäste; übersprungen auf Moodle < 4.4.
  - `tests/privacy_provider_test.php` — Provider implementiert
    `null_provider`, `privacy:metadata` ist in EN und DE definiert.
  - `tests/behat/floating_button.feature` — FAB für Editing Teacher
    sichtbar, für Studierende nicht, klickbar zur Tool-Guide-Seite,
    auf der Seite selbst suppressed.
  - `tests/behat/tool_guide_page.feature` — Tool-Guide-Seite mountet
    AMD-Modul (`#toolguide-root`), erreichbar via Site-Navigation.
- **Boost-Layout-Fix für Tool-Guide-Seite:** `index.php` setzt
  `$PAGE->set_pagelayout('report')` statt `'standard'` (mehr
  Horizontal-Platz im Boost-Theme), und `styles.css` ergänzt einen
  `#region-main #toolguide-root`-Breakout, der die Seite auf volle
  Viewport-Breite zieht. Behebt die abgeschnittene rechte
  Matrix-Spalte auf gängigen 14"-Laptops.
- `version.php`: `$plugin->version = 2026050804` (vorher 2026050803),
  `$plugin->release = '1.1.32'`.

## [1.1.31] – 2026-05-08

### Changed
- **Partner-Logo aktualisiert** auf das offizielle „Premium Moodle Partner
  Trademark™" Badge (Primary Colour RGB). Das Logo erscheint im Footer
  des Standalone-HTML, des Moodle-Plugins und des WordPress-Plugins
  einheitlich. Die alte „Moodle Premium Certified Services Provider"-PNG-
  Vorlage (600 × 196 px) wurde durch das neue, höher aufgelöste Asset
  (4877 × 1232 px) ersetzt.

### Added
- **DevFlow-Dokumentation** unter `docs/` nach dem
  [eLeDia.OS_DevFlow](https://github.com/jmoskaliuk/eLeDia.OS_DevFlow)-
  Standard: `00-master.md`, `01-features.md`, `02-user-doc.md`,
  `03-dev-doc.md`, `04-tasks.md`, `05-quality.md` und
  `Playbooks/local_toolguide.md`.

### Removed / Cleanup
- Obsolete Prototyp-Notizen aus dem Repo entfernt
  (`IconPreview_ToolGuide.html`, `Konzept_ToolGuide_Webapp.md`).
- `Prototyp_ToolGuide.jsx` entfernt — Source of Truth ist seit 2026-04-22
  der Babel-Block in `moodle-tool-guide.html`.

### Notes
- Hinweis auf Bundle-Größe: das neue Partner-Badge inflatiert das
  unkomprimierte JS um ca. 123 KB Base64. Optimierungs-Optionen
  (statisches Asset statt Data-URI, separater Sprite-Service) sind als
  `taskXX` in `docs/04-tasks.md` aufgeführt.

## [1.1.13] – 2026-04-10

### Added
- **Floating "Moodle M" quick-access button** (Moodle plugin only): a round
  orange button anchored to the bottom-right corner of every Moodle page,
  showing Moodle's monochrome "M" logo. Clicking it opens the Tool Guide in
  the same tab. Visible only to users with the new capability
  `local/toolguide:viewfab` — by default editing teachers, managers and site
  admins; students and guests never see it. The button honours
  `prefers-reduced-motion`, `prefers-contrast: more`, print stylesheets and
  secure / embedded / maintenance / print / redirect layouts.

### Notes
- New capability `local/toolguide:viewfab` is added to `db/access.php`.
  After upgrading, a database purge + cache clear is required so Moodle
  picks up the new capability for existing roles.

## [1.1.12] – 2026-04-10

### Changed
- **Footer redesigned** to match the new header: warm light beige
  (`#FFECDB`) background with dark blue (`#194866`) text and underlined
  dark blue links, replacing the previous dark blue bar with orange links.
  The eLeDia and Moodle Partner logos, the CC-BY-NC-SA badge and the GitHub
  icon all stay clearly readable on the new background.

## [1.1.11] – 2026-04-10

### Changed
- **Header redesigned** for better accessibility and wide-screen appearance:
  the blue gradient is replaced by a warm light beige (`#FFECDB`) background
  with dark blue (`#194866`) text; the sub-navigation is now light gray
  (`#F3F5F8`) instead of white, removing the full-bleed white strip at the
  top on wide displays. Contrast ratios remain WCAG 2.2 AA compliant and
  improve noticeably under high zoom and high-contrast mode.

## [1.1.10] – 2026-04-10

### Fixed
- **WordPress theme isolation**: filter dropdowns ("Gut geeignet für" / Bloom)
  and footer links no longer inherit styles from the active WordPress theme.
  The plugin now ships a scoped CSS reset on `.eledia-toolguide-root` covering
  `a`, `select`, `input`, `button`, `p`, `h1`–`h6`, `table`, `img` and
  `ul`/`ol`, each with `!important`, so the Tool Guide renders identically
  under any theme.

### Changed
- Removed the book (📚) and lightbulb (💡) emoji from the "Moodle Docs" and
  "eledia.community" buttons in the tool detail view for a cleaner look.

## [1.1.9] – 2026-04-09

### Changed
- All three matrix rating icons updated to **Lucide v1.8.0**: thumbs-up,
  thumbs-down and circle-slash ship with their current, redrawn SVG paths
  (the older paths looked visibly different).
- Plugin readme translations restructured: English (`readme.txt`) is now the
  canonical version on the WordPress Plugin Directory, with German, French
  and Spanish translations in `readme-de.txt`, `readme-fr.txt` and
  `readme-es.txt`.

## [1.1.8] – 2026-04-09

### Changed
- Matrix "neutral" icon now uses Lucide `circle-slash` (a circle with a
  diagonal slash) instead of a rotated thumbs-up. Reads more clearly as
  "neither up nor down".

## [1.1.7] – 2026-04-08

### Changed
- **Activity icons** now use the official Moodle 5 activity purpose colors
  (administration `#da58ef`, assessment `#f90086`, collaboration `#5b40ff`,
  communication `#eb6200`, interactive content `#8d3d1b`, resources
  `#0099ad`).
- **Wizard** Bloom-level buttons now use the eLeDia CI palette instead of
  an HSL gradient.
- Wizard result cards now reuse the same card layout as the main Cards view.
- Matrix sideways thumb rendered as Lucide `thumbs-up` rotated `-90°` as an
  interim step (later replaced in 1.1.8 by `circle-slash`).

## [1.1.6] – 2026-04-07

### Added
- **Initial WordPress port** from the Moodle plugin `local_toolguide` 1.1.6.
- Shortcode-based embedding: `[eledia_toolguide lang="de|en|fr|es" height="800px"]`.
- React 18 via CDN or self-hosted (`assets/js/vendor/`).
- WCAG 2.2 AA: contrast, keyboard operation, focus management, live regions.
- Three views: Matrix, Cards, Wizard (5-step guided recommender).
- Multilingual UI and tool data: German, English, French, Spanish.

[1.1.13]: https://github.com/eledia-bildungsmedien-berlin/Moodle_ToolGuide/releases/tag/v1.1.13
[1.1.12]: https://github.com/eledia-bildungsmedien-berlin/Moodle_ToolGuide/releases/tag/v1.1.12
[1.1.11]: https://github.com/eledia-bildungsmedien-berlin/Moodle_ToolGuide/releases/tag/v1.1.11
[1.1.10]: https://github.com/eledia-bildungsmedien-berlin/Moodle_ToolGuide/releases/tag/v1.1.10
[1.1.9]:  https://github.com/eledia-bildungsmedien-berlin/Moodle_ToolGuide/releases/tag/v1.1.9
[1.1.8]:  https://github.com/eledia-bildungsmedien-berlin/Moodle_ToolGuide/releases/tag/v1.1.8
[1.1.7]:  https://github.com/eledia-bildungsmedien-berlin/Moodle_ToolGuide/releases/tag/v1.1.7
[1.1.6]:  https://github.com/eledia-bildungsmedien-berlin/Moodle_ToolGuide/releases/tag/v1.1.6
