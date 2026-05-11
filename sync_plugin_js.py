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


def replace_const_object(source, const_name, replacement):
    """Replace a top-level JS const object declaration by counting braces."""
    marker = f"const {const_name} ="
    start = source.find(marker)
    if start == -1:
        raise SystemExit(f"Could not find {marker}")

    brace = source.find("{", start)
    if brace == -1:
        raise SystemExit(f"Could not find opening brace for {marker}")

    depth = 0
    quote = None
    escape = False
    line_comment = False
    block_comment = False
    template = False

    for pos in range(brace, len(source)):
        char = source[pos]
        nxt = source[pos + 1] if pos + 1 < len(source) else ""

        if line_comment:
            if char == "\n":
                line_comment = False
            continue
        if block_comment:
            if char == "*" and nxt == "/":
                block_comment = False
            continue
        if quote:
            if escape:
                escape = False
            elif char == "\\":
                escape = True
            elif char == quote:
                quote = None
            continue
        if template:
            if escape:
                escape = False
            elif char == "\\":
                escape = True
            elif char == "`":
                template = False
            continue

        if char == "/" and nxt == "/":
            line_comment = True
            continue
        if char == "/" and nxt == "*":
            block_comment = True
            continue
        if char in ("'", '"'):
            quote = char
            continue
        if char == "`":
            template = True
            continue
        if char == "{":
            depth += 1
        elif char == "}":
            depth -= 1
            if depth == 0:
                end = pos + 1
                while end < len(source) and source[end].isspace():
                    end += 1
                if end < len(source) and source[end] == ";":
                    end += 1
                return source[:start] + replacement + source[end:]

    raise SystemExit(f"Could not find closing brace for {marker}")

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

# Moodle-specific: user-facing UI labels are maintained in lang/* files and
# supplied from PHP via get_string(). The standalone HTML keeps its embedded
# i18n object; the Moodle AMD module receives only the already-localized string
# bundle for the current Moodle language.
app = replace_const_object(app, "I18N", '''const I18N = {};

function setMoodleI18n(lang, strings) {
  const normalized = strings || {};
  const key = lang || "en";
  I18N[key] = normalized;
  I18N.en = I18N.en || normalized;
}

function getI18n(lang) {
  return I18N[lang] || I18N.en || {};
}''')
app = replace_const_object(
    app,
    "PURPOSE_LABELS",
    "// Purpose labels are supplied by Moodle language strings.\n"
)
app = app.replace(
    'function purposeLabel(tool, lang) { return (PURPOSE_LABELS[lang]||PURPOSE_LABELS.de)[purposeOf(tool)]; }',
    'function purposeLabel(tool, lang) { return (getI18n(lang).purpose_labels || {})[purposeOf(tool)] || purposeOf(tool); }'
)
app = app.replace(
    'const t = (lang, key) => I18N[lang][key] || key;\n'
    'const tg = (lang, key) => I18N[lang].goals[key] || {label:key, q:""};',
    'const t = (lang, key) => getI18n(lang)[key] || key;\n'
    'const tg = (lang, key) => (getI18n(lang).goals || {})[key] || {label:key, q:""};'
)
app = app.replace('I18N[lang].bloom_levels', 'getI18n(lang).bloom_levels')
app = app.replace('I18N[lang].bloom_descs', 'getI18n(lang).bloom_descs')
app = app.replace(
    'const I18N = {};',
    'const I18N = {};\n'
    'setMoodleI18n(\n'
    '  typeof window !== "undefined" ? window.__toolguideMoodleLang : "en",\n'
    '  typeof window !== "undefined" ? window.__toolguideMoodleStrings : {}\n'
    ');'
)

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
out += '      var appStrings = typeof window !== "undefined" && window.local_toolguide_app_strings ? window.local_toolguide_app_strings : {};\n'
out += '      // Hand the Moodle locale to the React app via the global the\n'
out += '      // useState patch below reads. Using a global rather than a closure\n'
out += '      // variable so the existing patch in this script keeps working.\n'
out += '      if (typeof window !== "undefined") {\n'
out += '        window.__toolguideMoodleLang = initialLang || "en";\n'
out += '        window.__toolguideMoodleStrings = appStrings || {};\n'
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
