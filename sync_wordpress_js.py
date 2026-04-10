#!/usr/bin/env python3
"""Extract React app from Prototyp_ToolGuide.html and write it as the
WordPress plugin's assets/js/toolguide.js, mounting to .eledia-toolguide-root.

The standalone HTML uses #root, Moodle uses #toolguide-root, WordPress uses
the shortcode-generated element with class .eledia-toolguide-root so that
multiple instances of the shortcode on one page each get their own mount.
(First instance wins for v1 — render into the first matching element.)

Keeps the three delivery tracks (standalone HTML + Moodle plugin + WP plugin)
in sync from one source.
"""
import re
from pathlib import Path

ROOT = Path("/sessions/youthful-sleepy-goodall/mnt/ToolGuide")
HTML = ROOT / "Prototyp_ToolGuide.html"
WP_JS = ROOT / "wordpress-plugin/eledia-toolguide/assets/js/toolguide.js"

html = HTML.read_text(encoding="utf-8")

m = re.search(r'<script type="text/babel">\s*\n(.*?)\n</script>', html, re.DOTALL)
if not m:
    raise SystemExit("Could not find babel script block in HTML")
app = m.group(1)

# Replace mount point: #root -> first .eledia-toolguide-root in DOM
app = app.replace(
    'document.getElementById("root")',
    'document.querySelector(".eledia-toolguide-root")'
)

out = '/* eslint-disable */\n'
out += '/* Auto-generated from Prototyp_ToolGuide.html — do not edit by hand. */\n'
out += '(function() {\n'
out += '  "use strict";\n'
out += '  if (typeof React === "undefined" || typeof ReactDOM === "undefined") {\n'
out += '    console.error("[eledia-toolguide] React/ReactDOM not loaded");\n'
out += '    return;\n'
out += '  }\n'
out += '  if (!document.querySelector(".eledia-toolguide-root")) {\n'
out += '    // Shortcode not present on this page — nothing to do.\n'
out += '    return;\n'
out += '  }\n'
out += '\n'
out += app
out += '\n})();\n'

WP_JS.parent.mkdir(parents=True, exist_ok=True)
WP_JS.write_text(out, encoding="utf-8")
print(f"Wrote {len(out)} chars to {WP_JS}")
