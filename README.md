# Moodle Tool Guide (eLeDia)

[Deutsch](README.de.md) · [Français](README.fr.md) · [Español](README.es.md)

An interactive Tool Guide for Moodle 5 — based on the classic *Moodle Tool Guide for Teachers* and extended with eLeDia-specific didactic recommendations.

Three delivery tracks from a single source of truth:

1. **Standalone web page** — `Prototyp_ToolGuide.html`: single-file React/HTML, can be embedded directly via `<iframe>`.
2. **Moodle local plugin** — `moodle-plugin/local/toolguide/` / `local_toolguide.zip`: installable local plugin for Moodle 4.5 / 5.x.
3. **WordPress plugin** — `wordpress-plugin/eledia-toolguide/` / `eledia-toolguide.zip`: shortcode `[eledia_toolguide]` for any WordPress site.

## Features

- **25 Moodle activities** with didactic recommendations across five learning goals
- **Matrix view** with thumbs-up / circle-slash / thumbs-down rating icons and hover tooltips
- **Cards view** with full descriptions and filters (setup effort, support effort, goal, Bloom level)
- **Wizard** — guided five-step selection that recommends activities based on the user's answers
- **Compare mode** for up to three tools side by side
- **Two-dimensional effort**: setup effort and ongoing support effort
- **Bloom's taxonomy** (levels 1–6) per activity
- **4 UI languages**: English, German, French, Spanish
- **Accessibility**: WCAG 2.2 AA — ARIA roles, skip links, keyboard navigation, focus trap for modal dialogs, live regions for filter updates, font-size switcher
- **Responsive** — works on desktop, tablet and mobile
- **Official Moodle 5 activity purpose colors** (administration / assessment / collaboration / communication / interactive content / resources)

## Data source

`Datenbank_ToolGuide.xlsx` is the single source of truth for all tool data (descriptions, suitability per goal, effort, Bloom level). The standalone HTML, Moodle plugin JS and WordPress plugin JS are all synced from this file via `sync_plugin_js.py` and `sync_wordpress_js.py`.

## Using the standalone web page

`Prototyp_ToolGuide.html` is a single self-contained HTML file. Open it directly in a browser, or embed it via iframe:

```html
<iframe src="/wp-content/uploads/Prototyp_ToolGuide.html"
        width="100%" height="900" style="border:0"></iframe>
```

## Installing the Moodle plugin

From the Moodle root directory:

```bash
unzip local_toolguide.zip -d local/
php admin/cli/upgrade.php
```

Then navigate to `/local/toolguide/index.php`. The plugin adds an entry to the global navigation for users with the `local/toolguide:view` capability.

## Installing the WordPress plugin

1. Upload `eledia-toolguide.zip` via **Plugins → Add New → Upload Plugin**.
2. Activate the plugin.
3. Insert the shortcode `[eledia_toolguide]` on any page, post or custom post.

Optional shortcode attributes:

- `lang="de|en|fr|es"` — force a specific language. Defaults to the WordPress locale.
- `height="800px"` — set the minimum container height. Default: `800px`.

Examples:

```
[eledia_toolguide]
[eledia_toolguide lang="en"]
[eledia_toolguide height="auto"]
```

By default the WordPress plugin loads React 18.3.1 from unpkg.com. For GDPR-compliant installations without external requests, you can self-host React by placing `react.production.min.js` and `react-dom.production.min.js` in `assets/js/vendor/` — the plugin detects the local files automatically.

## License

GNU GPL v3 or later (Moodle-compatible).

## Credits

Based on the [Moodle Tool Guide for Teachers](https://www.cyberlearn.ch/) by Joyce Seitzinger, Gavin Henrick and Nicolas Martignoni. Original German translation: Ralf Hilgenstock. Redesign, Moodle 5 update, Wizard, Matrix and Cards views, packaging as Moodle local plugin and WordPress plugin: [eLeDia GmbH](https://eledia.de).
