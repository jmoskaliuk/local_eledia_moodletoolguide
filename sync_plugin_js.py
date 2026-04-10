#!/usr/bin/env python3
"""Extract React app from Prototyp_ToolGuide.html and write it as the
Moodle plugin's amd/src/toolguide.js, mounting to #toolguide-root.
This keeps the two delivery tracks (standalone HTML + Moodle plugin) in sync.
"""
import re
from pathlib import Path

ROOT = Path("/sessions/youthful-sleepy-goodall/mnt/ToolGuide")
HTML = ROOT / "Prototyp_ToolGuide.html"
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
out += '/* Auto-generated from Prototyp_ToolGuide.html — do not edit by hand. */\n'
out += '(function() {\n'
out += '  "use strict";\n'
out += '  if (typeof React === "undefined" || typeof ReactDOM === "undefined") {\n'
out += '    console.error("[local_toolguide] React/ReactDOM not loaded");\n'
out += '    return;\n'
out += '  }\n'
out += '  // Inject component-scoped styles into the host page.\n'
out += '  var __tgStyle = document.createElement("style");\n'
out += '  __tgStyle.textContent = "*, *::before, *::after { box-sizing: border-box; }\\n#toolguide-root { font-family: Inter, system-ui, -apple-system, sans-serif; color: #353535; }\\n#toolguide-root ::selection { background: #F98012; color: white; }\\n#toolguide-root button:focus-visible, #toolguide-root a:focus-visible { outline: 3px solid #F98012; outline-offset: 2px; }\\nhtml.hc #toolguide-root, html.hc #toolguide-root * { background: #000 !important; color: #fff !important; }\\nhtml.hc #toolguide-root a { color: #FCBC82 !important; text-decoration: underline !important; }\\nhtml.hc #toolguide-root button[aria-pressed=\\"true\\"] { background: #FCBC82 !important; color: #000 !important; border-color: #FCBC82 !important; }\\n@media (prefers-reduced-motion: reduce) { #toolguide-root *, #toolguide-root *::before, #toolguide-root *::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; scroll-behavior: auto !important; } }";\n'
out += '  document.head.appendChild(__tgStyle);\n'
out += '\n'
out += app
out += '\n})();\n'

PLUGIN_JS.write_text(out, encoding="utf-8")
print(f"Wrote {len(out)} chars to {PLUGIN_JS}")
print(f"Old size: 60864 / new size: {PLUGIN_JS.stat().st_size}")
