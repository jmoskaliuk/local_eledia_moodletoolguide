# Changelog

All notable changes to the eLeDia Moodle Tool Guide are documented in this file.
The project ships in three synchronized flavors: the standalone HTML prototype
(`Prototyp_ToolGuide.html`), the Moodle local plugin (`local_toolguide`) and the
WordPress plugin (`eledia-toolguide`). Versions are kept in lockstep across all
three tracks via `sync_plugin_js.py` and `sync_wordpress_js.py`.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
  der Babel-Block in `Prototyp_ToolGuide.html`.

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
