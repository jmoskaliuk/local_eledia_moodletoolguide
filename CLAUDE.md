# CLAUDE.md — Project Memory for the eLeDia Moodle Tool Guide

This file captures the conventions, gotchas and hard-won lessons for the
three-track Tool Guide project (standalone HTML → Moodle `local_toolguide` →
WordPress `eledia-toolguide`). Future Claude sessions should read this first.

## Project topology

| Track | Source of truth | Entrypoint |
| --- | --- | --- |
| Standalone HTML | `moodle-tool-guide.html` (React via Babel script tag) | open in browser |
| Moodle plugin | `moodle-plugin/local/toolguide/` | `sync_plugin_js.py` pulls JS from prototype |
| WordPress plugin | `wordpress-plugin/eledia-toolguide/` | `sync_wordpress_js.py` pulls JS from prototype |

Versions are kept in lockstep. When you bump the prototype, bump both plugin
`version.php` / plugin header + both `readme*.txt` Stable tag entries.

**Version bump checklist** (for each release):
1. Edit `moodle-tool-guide.html` and verify in a browser.
2. Run `python3 sync_plugin_js.py` and `python3 sync_wordpress_js.py`.
3. Bump `moodle-plugin/local/toolguide/version.php` (integer build + semver).
4. Bump `wordpress-plugin/eledia-toolguide/eledia-toolguide.php` header
   AND the `ELEDIA_TOOLGUIDE_VERSION` constant.
5. Bump `Stable tag` in all four readmes: `readme.txt`, `readme-de.txt`,
   `readme-fr.txt`, `readme-es.txt`.
6. Add a Changelog section to each readme AND to `CHANGELOG.md`.
7. Rebuild ZIPs:
   - `moodle-plugin/local_toolguide.zip` (contains `toolguide/`)
   - `wordpress-plugin/eledia-toolguide.zip` (contains `eledia-toolguide/`)
8. Commit and tag.

## WordPress theme isolation

WordPress themes leak styles into any shortcode output unless you explicitly
fight them. As of v1.1.10 the plugin ships a **scoped CSS reset** on
`.eledia-toolguide-root` in `wordpress-plugin/eledia-toolguide/assets/css/toolguide.css`.

The reset covers `p`, `span`, `strong`, `em`, `h1`–`h6`, `a`, `select`, `input`,
`button`, `table`, `img`, `ul`, `ol` — each with `!important` on the properties
themes most often override (margin, padding, width, background, color,
text-decoration, list-style, font).

**Additionally**, set link and icon colors as React inline styles. Some themes
still win on `color` even with `!important` in a stylesheet — inline style
always takes precedence.

**Testing matrix** for any future WP plugin change:
- Twenty Twenty-Four (baseline)
- Astra, OceanWP, GeneratePress (the three most-leaking themes we've seen)
- 200 % browser zoom
- Windows High Contrast / `prefers-contrast: more`

## Light-theme header/footer (v1.1.11 / v1.1.12)

The original dark-blue gradient header caused two problems: it produced a
full-bleed white strip on wide screens and it behaved unpredictably under
high-contrast / high-zoom. As of v1.1.11 the header uses a flat warm beige:

```
background: #FFECDB   (warm light beige)
color:      #194866   (eLeDia CI dark blue)       contrast 8.9:1 — AAA
subtitle:   #267372   (eLeDia CI teal)            contrast 4.6:1 — AA
sub-nav:    #F3F5F8   (soft gray, no white strip)
separator:  #FCBC82   (thin soft-orange line)
```

The footer (v1.1.12) uses the same beige, dark blue text and underlined dark
blue links (`text-decoration: underline`). The CC-BY-NC-SA badge, GitHub icon
and partner logos stay legible on the beige — verified by rendering the raw
PNGs with ImageMagick on `#FFECDB`.

## eLeDia CI colors

```
#194866   dark blue    — primary text, headers, active UI
#267372   teal         — subtitle, secondary headings
#669933   green        — success, positive
#A5C387   light green  — hover / background
#FCBC82   soft orange  — separators, accents
#F98012   orange       — CTAs (use sparingly on beige)
#FFECDB   warm beige   — header/footer background since v1.1.11
#F3F5F8   soft gray    — sub-nav, subtle chrome
```

## Moodle 5 activity purpose colors

Use these for activity icons in the matrix and detail view (from `mod/*/lib.php`
`FEATURE_MOD_PURPOSE`):

```
administration       #da58ef
assessment           #f90086
collaboration        #5b40ff
communication        #eb6200
content / interactive#8d3d1b
resources            #0099ad
```

## Lucide icons

Matrix icons (thumbs-up / thumbs-down / circle-slash) come from
**Lucide v1.8.0**. Do **not** guess SVG paths — extract them from the
published package:

```bash
npm pack lucide-static
tar -xzf lucide-static-*.tgz
cat package/icons/thumbs-up.svg
```

The paths changed noticeably between Lucide major versions. Older paths look
visibly different from the current ones. If you need to update the icons,
always re-extract from the pinned version.

## Cowork session gotchas

These are the ones that have bitten us in this project repeatedly:

1. **`rm` is blocked on the cowork mount by default.** Attempting to delete
   files under `/sessions/*/mnt/ToolGuide/` returns `Operation not permitted`.
   Workaround: call `mcp__cowork__allow_cowork_file_delete` with the project
   path to grant delete permission for the remainder of the session. For file
   overwrites, the mount accepts `cp` even though it rejects `rm`, so rebuild
   patterns like "build ZIP in `/tmp/tg_build`, `cp` into the mount" work
   without any permission grant.

2. **Git operations on the mount's `.git` directory can hit permission
   issues.** Work around by cloning the repo into `/tmp/tg_repo`, doing
   commits there, and pushing from there. Fetch `origin main` before every
   commit — the `/tmp` clone's branch state can get stale.

3. **SSH push is blocked by the sandbox.** The proxy allows `github.com:443`
   but not `github.com:22`. Push with an HTTPS URL that embeds the PAT:
   `https://<user>:<pat>@github.com/<org>/<repo>.git`. Do not commit the PAT.

4. **`api.github.com` is blocked.** `curl` returns 56, `WebFetch` refuses. Use
   `gh` CLI (which uses `github.com:443`) or plain `git push`. Do not try to
   work around this with alternative HTTP clients — the block is policy.

5. **`/sessions/*/mnt/.claude/skills/` is mounted read-only.** Global skill
   files cannot be edited from a cowork session. Project-specific knowledge
   belongs in a `CLAUDE.md` inside the project repo (this file). Global skills
   must be edited outside cowork.

## WordPress readme translations

The canonical readme for the WordPress Plugin Directory is `readme.txt`
(English). German, French and Spanish translations live alongside it as
`readme-de.txt`, `readme-fr.txt`, `readme-es.txt`. They are **not** parsed by
the Plugin Directory — they exist for human readers browsing the repo and the
plugin folder. When bumping the Stable tag, bump it in all four files.

## React hosting

The plugin loads React 18.3.1 from `unpkg.com` by default. For GDPR-sensitive
installations, drop `react.production.min.js` and `react-dom.production.min.js`
into `wordpress-plugin/eledia-toolguide/assets/js/vendor/`. The plugin
auto-detects local files via `file_exists()` and enqueues them instead of the
CDN. Do not commit the vendored React files to the repo — the plugin is a
GitHub-distributed fat ZIP, not an npm package.
