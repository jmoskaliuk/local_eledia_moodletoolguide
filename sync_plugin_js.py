#!/usr/bin/env python3
"""Extract React app from moodle-tool-guide.html and write it as the
Moodle plugin's amd/src/toolguide.js, mounting to #toolguide-root.
This keeps the two delivery tracks (standalone HTML + Moodle plugin) in sync.
"""
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent
HTML = ROOT / "moodle-tool-guide.html"
PLUGIN_JS = ROOT / "moodle-plugin/local/toolguide/amd/src/toolguide.js"

html = HTML.read_text(encoding="utf-8")

# Find <script type="text/babel"> ... </script>
m = re.search(r'<script type="text/babel">\s*\n(.*?)\n</script>', html, re.DOTALL)
if not m:
    raise SystemExit("Could not find babel script block in HTML")
app = m.group(1)

# Replace mount point: #root -> #toolguide-root
app = app.replace(
    'document.getElementById("root")',
    'document.getElementById("toolguide-root")'
)

# Moodle-specific: take the initial language from Moodle's current_language(),
# injected as window.__toolguideMoodleLang from index.php. Falls back to "en"
# when the global is missing (e.g. when the AMD module is loaded outside the
# Tool Guide page itself).
app = app.replace(
    'const [lang,setLang]=React.useState("de");',
    'const [lang,setLang]=React.useState('
    'typeof window !== "undefined" && window.__toolguideMoodleLang ? '
    'window.__toolguideMoodleLang : "en");'
)

# Moodle-specific: hide the in-app language switcher buttons. Moodle has its
# own user-level language preference that drives current_language(), so we
# follow it strictly. The whole grouped <div> with the four DE/EN/FR/ES
# buttons becomes `null` so React renders nothing in its place.
LANG_SWITCHER_BLOCK = (
    'React.createElement("div",{role:"group","aria-label":t(lang,"language"),'
    'style:{display:"flex",gap:2,background:"rgba(25,72,102,0.08)",padding:3,borderRadius:8}},\n'
    '              langBtn("de","DE"), langBtn("en","EN"), langBtn("fr","FR"), langBtn("es","ES")\n'
    '            )'
)
if LANG_SWITCHER_BLOCK not in app:
    raise SystemExit(
        "Could not find the language switcher block to suppress for the Moodle "
        "track. Has the source markup in moodle-tool-guide.html changed?"
    )
app = app.replace(LANG_SWITCHER_BLOCK, 'null')

# Wrap as a proper AMD module exposing init(initialLang).
# This is what $PAGE->requires->js_call_amd('local_toolguide/toolguide',
# 'init', [$initiallang]) calls in index.php.
out = '/* eslint-disable */\n'
out += '/* Auto-generated from moodle-tool-guide.html — do not edit by hand. */\n'
out += 'define([], function() {\n'
out += '  "use strict";\n'
out += '  return {\n'
out += '    init: function(initialLang) {\n'
out += '      if (typeof React === "undefined" || typeof ReactDOM === "undefined") {\n'
out += '        console.error("[local_toolguide] React/ReactDOM not loaded");\n'
out += '        return;\n'
out += '      }\n'
out += '      // Hand the Moodle locale to the React app via the global the\n'
out += '      // useState patch below reads. Using a global rather than a closure\n'
out += '      // variable so the existing patch in this script keeps working.\n'
out += '      if (typeof window !== "undefined") {\n'
out += '        window.__toolguideMoodleLang = initialLang || "en";\n'
out += '      }\n'
out += '\n'
out += app
out += '\n'
out += '    }\n'
out += '  };\n'
out += '});\n'

PLUGIN_JS.write_text(out, encoding="utf-8")
print(f"Wrote {len(out)} chars to {PLUGIN_JS}")
print(f"Old size: 60864 / new size: {PLUGIN_JS.stat().st_size}")
