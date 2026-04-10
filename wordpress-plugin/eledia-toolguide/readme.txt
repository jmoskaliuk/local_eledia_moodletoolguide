=== eLeDia Moodle Tool Guide ===
Contributors: eledia, jmoskaliuk
Tags: moodle, elearning, shortcode, tool-guide, didactics
Requires at least: 6.0
Tested up to: 6.5
Requires PHP: 7.4
Stable tag: 1.1.9
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Interactive guide to the activities of Moodle 5 — matrix, cards and wizard views. Embed via shortcode.

== Description ==

The **eLeDia Moodle Tool Guide** helps teachers and course designers pick the right Moodle activity for their didactic goal. The guide bundles curated knowledge about around 25 Moodle activities with metadata on setup effort, ongoing support effort, suitability for four learning goal categories (inform, assess, communicate, collaborate) and Bloom taxonomy level.

Three views on the same dataset:

* **Matrix** — table view with setup/support effort and learning-goal suitability shown as thumbs icons.
* **Cards** — tile view with filters for effort, learning goal and Bloom level.
* **Wizard** — guided five-step wizard that recommends matching activities based on the user's answers.

The guide is multilingual (English, German, French, Spanish), WCAG 2.2 AA compliant and ships with a built-in font-size switcher. The data is based on a translation of the Swiss Moodle Tool Guide by Joyce Seitzinger, Gavin Henrick and Nicolas Martignoni (original German translation: Ralf Hilgenstock), didactically updated for Moodle 5.

This plugin is a lightweight wrapper around the standalone HTML Tool Guide — the JavaScript payload is synced from the canonical prototype. The plugin ships one shortcode, no admin UI, no database tables, no tracking.

Translated plugin readmes are available in the plugin folder: `readme-de.txt` (Deutsch), `readme-fr.txt` (Français), `readme-es.txt` (Español).

== Installation ==

1. Upload the plugin ZIP via *Plugins → Add New → Upload Plugin*.
2. Activate the plugin.
3. Insert the shortcode `[eledia_toolguide]` on any page, post or custom post type.

Optional shortcode attributes:

* `lang="de|en|fr|es"` — force a specific language. Defaults to the WordPress locale.
* `height="800px"` — set the minimum height of the container. Default: `800px`.

Examples:

`[eledia_toolguide]`
`[eledia_toolguide lang="en"]`
`[eledia_toolguide height="auto"]`

== Frequently Asked Questions ==

= Does the plugin load React from an external CDN? =

By default, yes — React 18.3.1 is loaded from unpkg.com. For GDPR-compliant installations without external requests you can self-host React: drop `react.production.min.js` and `react-dom.production.min.js` from the React distribution into `assets/js/vendor/`. The plugin detects the local files automatically and uses them instead of the CDN.

= Does the plugin work with the Gutenberg block editor? =

The shortcode works anywhere WordPress runs shortcodes — including the Gutenberg shortcode block. A native Gutenberg block is planned for a later version.

= Can I extend the tool list? =

The tool data is currently hard-coded in the JavaScript bundle. An admin editor for the tool list is planned.

= Is tracking or telemetry included? =

No. The plugin is 100% self-contained (except for the optional React CDN) and does not call home.

== Changelog ==

= 1.1.9 =
* All three matrix rating icons updated to Lucide v1.8.0: thumbs-up, thumbs-down and circle-slash have a new, redrawn shape. The old paths were from an older Lucide version and looked noticeably different.
* Plugin readme available in English (main), German, French and Spanish.

= 1.1.8 =
* Matrix "neutral" icon: now uses Lucide circle-slash (circle with a diagonal slash) instead of a rotated thumbs-up. Reads more clearly as "neither up nor down".

= 1.1.7 =
* Activity icons now use the official Moodle 5 purpose colors (administration / assessment / collaboration / communication / interactive content / resources).
* Wizard: Bloom level buttons now use the eLeDia CI color palette instead of an HSL gradient.
* Wizard result cards now use the same card layout as the main cards view.
* Matrix sideways thumb rendered as Lucide thumbs-up rotated -90° (later replaced in 1.1.8).

= 1.1.6 =
* Initial WordPress port from the Moodle plugin local_toolguide 1.1.6.
* Shortcode-based embedding.
* React 18 via CDN or self-hosted.
* WCAG 2.2 AA: contrast, keyboard operation, focus management, live regions.

== Credits ==

Based on the [Moodle Tool Guide for Teachers](https://www.cyberlearn.ch/) by Joyce Seitzinger, Gavin Henrick and Nicolas Martignoni. Original German translation: Ralf Hilgenstock. Redesign and Moodle 5 update: eLeDia GmbH.
