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

# Wrap in IIFE so vars don't leak
out = '/* eslint-disable */\n'
out += '/* Auto-generated from moodle-tool-guide.html — do not edit by hand. */\n'
out += '(function() {\n'
out += '  "use strict";\n'
out += '  if (typeof React === "undefined" || typeof ReactDOM === "undefined") {\n'
out += '    console.error("[local_toolguide] React/ReactDOM not loaded");\n'
out += '    return;\n'
out += '  }\n'
out += '\n'
out += app
out += '\n})();\n'

PLUGIN_JS.write_text(out, encoding="utf-8")
print(f"Wrote {len(out)} chars to {PLUGIN_JS}")
print(f"Old size: 60864 / new size: {PLUGIN_JS.stat().st_size}")
