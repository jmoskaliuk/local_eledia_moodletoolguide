#!/usr/bin/env python3
"""Extract React app from Prototyp_ToolGuide.html and write it as the
WordPress plugin's assets/js/toolguide.js, mounting to .eledia-toolguide-root.

The standalone HTML uses #root, Moodle uses #toolguide-root, WordPress uses
the shortcode-generated element with class .eledia-toolguide-root.

Keeps the three delivery tracks (standalone HTML + Moodle plugin + WP plugin)
in sync from one source.
"""
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent
HTML = ROOT / "Prototyp_ToolGuide.html"
WP_JS = ROOT / "wordpress-plugin/eledia-toolguide/assets/js/toolguide.js"

html = HTML.read_text(encoding="utf-8")

m = re.search(r'<script type="text/babel">\s*\n(.*?)\n</script>', html, re.DOTALL)
if not m:
    raise SystemExit("Could not find babel script block in HTML")
app = m.group(1)

# Replace mount point and WordPress-specific language handling.
app = app.replace(
    'document.getElementById("root")',
    '__elediaToolguideRoot'
)
app = app.replace(
    'ReactDOM.render(React.createElement(App), __elediaToolguideRoot);',
    '''const __elediaToolguideLoading = __elediaToolguideRoot.querySelector(".tg-loading");
if (__elediaToolguideLoading) {
  __elediaToolguideLoading.remove();
}
ReactDOM.render(React.createElement(App), __elediaToolguideRoot);'''
)
app = app.replace(
    'const [lang,setLang]=React.useState("de");',
    'const [lang,setLang]=React.useState(__elediaToolguideInitialLang);'
)
app = app.replace(
    'React.useEffect(()=>{ document.documentElement.lang = lang; },[lang]);',
    'React.useEffect(()=>{ __elediaToolguideRoot.setAttribute("lang", lang); },[lang]);'
)
app = app.replace(
    'const t = (lang, key) => I18N[lang][key] || key;\n'
    'const tg = (lang, key) => I18N[lang].goals[key] || {label:key, q:""};',
    '''const __elediaToolguideWpI18n = window.wp && window.wp.i18n ? window.wp.i18n : null;
const __elediaToolguideTextDomain = "eledia-toolguide";
const __elediaToolguideUseWpTranslation = lang =>
  __elediaToolguideWpI18n &&
  typeof __elediaToolguideWpI18n.__ === "function" &&
  lang === __elediaToolguideWpLocaleLang;
const __elediaToolguideTranslate = (lang, source, fallback) => {
  if (!__elediaToolguideUseWpTranslation(lang) || !source) return fallback;
  const translated = __elediaToolguideWpI18n.__(source, __elediaToolguideTextDomain);
  return translated && translated !== source ? translated : fallback;
};

// UI strings can be overridden by WordPress language packs for the active site locale.
// The curated tool data remains in TOOL_TRANSLATIONS so the in-app language switch still works.
const t = (lang, key) => {
  const dict = I18N[lang] || I18N.de;
  const fallback = dict[key] || key;
  return __elediaToolguideTranslate(lang, I18N.en[key], fallback);
};
const ta = (lang, key) => {
  const dict = I18N[lang] || I18N.de;
  const fallback = dict[key] || [];
  const source = I18N.en[key] || [];
  return fallback.map((value, index) => __elediaToolguideTranslate(lang, source[index], value));
};
const tg = (lang, key) => {
  const dict = I18N[lang] || I18N.de;
  const fallback = dict.goals[key] || {label:key, q:""};
  const source = I18N.en.goals[key] || {};
  return {
    label: __elediaToolguideTranslate(lang, source.label, fallback.label),
    q: __elediaToolguideTranslate(lang, source.q, fallback.q)
  };
};'''
)
app = app.replace('I18N[lang].bloom_levels', 'ta(lang,"bloom_levels")')
app = app.replace('I18N[lang].bloom_descs', 'ta(lang,"bloom_descs")')

out = '/* eslint-disable */\n'
out += '/* Auto-generated from Prototyp_ToolGuide.html — do not edit by hand. */\n'
out += '(function() {\n'
out += '  "use strict";\n'
out += '  if (typeof React === "undefined" || typeof ReactDOM === "undefined") {\n'
out += '    console.error("[eledia-toolguide] React/ReactDOM not loaded");\n'
out += '    return;\n'
out += '  }\n'
out += '  const __elediaToolguideRoot = document.querySelector(".eledia-toolguide-root");\n'
out += '  if (!__elediaToolguideRoot) {\n'
out += '    // Shortcode not present on this page — nothing to do.\n'
out += '    return;\n'
out += '  }\n'
out += '  const __elediaToolguideLangAttr = __elediaToolguideRoot.getAttribute("data-lang") || "de";\n'
out += '  const __elediaToolguideInitialLang = /^(de|en|fr|es)$/.test(__elediaToolguideLangAttr) ? __elediaToolguideLangAttr : "de";\n'
out += '  const __elediaToolguideConfig = window.elediaToolguideConfig || {};\n'
out += '  const __elediaToolguideWpLocaleLang = /^(de|en|fr|es)$/.test(__elediaToolguideConfig.localeLang || "") ? __elediaToolguideConfig.localeLang : __elediaToolguideInitialLang;\n'
out += '\n'
out += app
out += '\n})();\n'

WP_JS.parent.mkdir(parents=True, exist_ok=True)
WP_JS.write_text(out, encoding="utf-8")
print(f"Wrote {len(out)} chars to {WP_JS}")
