=== eLeDia Moodle Tool Guide ===
Contributors: eledia, jmoskaliuk
Tags: moodle, elearning, shortcode, tool-guide, didactics
Requires at least: 6.0
Tested up to: 6.5
Requires PHP: 7.4
Stable tag: 1.1.26
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Interactive guide to the activities of Moodle 5 — matrix, cards and wizard views. Embed via shortcode.

== Description ==

The **eLeDia Moodle Tool Guide** helps teachers and course designers pick the right Moodle activity for their didactic goal. The guide bundles curated knowledge about 23 Moodle activities with metadata on setup effort, ongoing support effort, suitability for four learning goal categories (inform, assess, communicate, collaborate) and Bloom taxonomy level.

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

No. The plugin uses WordPress' bundled `wp-element` package and does not load React from an external CDN.

= Does the plugin work with the Gutenberg block editor? =

The shortcode works anywhere WordPress runs shortcodes — including the Gutenberg shortcode block. A native Gutenberg block is planned for a later version.

= Can I extend the tool list? =

The tool data is currently hard-coded in the JavaScript bundle. An admin editor for the tool list is planned.

= Is tracking or telemetry included? =

No. The plugin is 100% self-contained and does not call home.

== Changelog ==

= 1.1.26 =
* Removed the deprecated Chat activity from the synced Moodle 5 tool data and aligned the activity list with the source spreadsheet.

= 1.1.25 =
* Marked Tool Guide scripts and inline bootstrap code with WP Rocket `nowprocket` exclusions so the app starts without waiting for scroll interaction.

= 1.1.24 =
* Added tap-friendly matrix header hints and fixed matrix tooltip hints to the bottom of the viewport for touch devices such as iPad.

= 1.1.23 =
* Added a "Start new comparison" action in the comparison dialog and aligned compare buttons to the bottom of cards.

= 1.1.22 =
* Bloom learning goals are shown neutrally in card details instead of as good/partial/bad suitability.

= 1.1.21 =
* Added tap-friendly mobile matrix hints for effort dots and suitability icons.

= 1.1.20 =
* Mobile users now start in the cards view by default, and the loading indicator is removed explicitly before the app renders.

= 1.1.19 =
* Corrected the partial-suitability thumb icon so it points left.

= 1.1.18 =
* Added an accessible loading indicator while the WordPress bundle starts and synced the compact mobile matrix from the HTML prototype.

= 1.1.17 =
* Improved mobile layout: matrix reading arrows are hidden on small screens, the search field aligns left, and wizard option boxes are constrained to the viewport.

= 1.1.16 =
* Improved iPhone matrix cards: didactic-goal chips now wrap in a two-column mobile layout so long labels no longer overlap.

= 1.1.15 =
* Improved WordPress theme integration: the Tool Guide now breaks out to full viewport width for header, navigation, content background and footer bands, and the footer stays at the bottom on short result pages.

= 1.1.14 =
* Added WordPress JavaScript internationalization support for UI strings via `wp-i18n`, `wp_set_script_translations()`, bundled JSON translations and a POT template. The curated tool data remains available in the built-in DE/EN/FR/ES language switcher.

= 1.1.13 =
* Synced the current HTML prototype into the WordPress plugin: updated matrix help, info panels, formal German wording, improved assistant filtering, mobile-friendly matrix cards and accessibility refinements for contrast, focus and table semantics. React is now loaded through WordPress' bundled `wp-element` package instead of an external CDN.

= 1.1.12 =
* Footer redesigned to match the new header: warm light beige (#FFECDB) background with dark blue text and dark blue underlined links instead of the dark blue bar with orange links. The eLeDia and Moodle Partner logos, CC-BY-NC-SA badge and GitHub icon all read clearly on the new background.

= 1.1.11 =
* New header look: the blue gradient header is replaced by a warm light beige (#FFECDB) with dark blue text, and the sub-navigation is now gray (#F3F5F8) instead of white — no more full-bleed white strip at the top on wide screens. Better contrast in high-zoom and high-contrast scenarios.

= 1.1.10 =
* Fixed theme isolation: filter dropdowns (Suitable for / Bloom) and footer links no longer inherit WordPress theme styles. The plugin now ships with a scoped CSS reset so the Tool Guide looks identical in any active theme.
* Removed the book and lightbulb emoji icons from the "Moodle Docs" and "eledia.community" buttons in the tool detail view — cleaner look.

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
* React via WordPress' bundled `wp-element` package.
* WCAG 2.2 AA: contrast, keyboard operation, focus management, live regions.

== Credits ==

Based on the [Moodle Tool Guide for Teachers](https://www.cyberlearn.ch/) by Joyce Seitzinger, Gavin Henrick and Nicolas Martignoni. Original German translation: Ralf Hilgenstock. Redesign and Moodle 5 update: eLeDia GmbH.
