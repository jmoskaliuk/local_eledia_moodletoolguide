#!/usr/bin/env python3
"""Copy Prototyp_ToolGuide.html into html-version/index.html as a clean,
deployable single-file HTML build. The prototype is already self-contained
(React+Babel via CDN, all icons inline) so deployment is just dropping
index.html on any static host.

This keeps the four delivery tracks in sync from one source:
  - Prototyp_ToolGuide.html      (source of truth)
  - html-version/index.html      (single-file static deploy)
  - moodle-plugin/...            (Moodle local plugin)
  - wordpress-plugin/...         (WordPress shortcode plugin)
"""
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parent
HTML = ROOT / "Prototyp_ToolGuide.html"
OUT_DIR = ROOT / "html-version"
OUT = OUT_DIR / "index.html"

OUT_DIR.mkdir(parents=True, exist_ok=True)
shutil.copy(HTML, OUT)
print(f"Wrote {OUT.stat().st_size} bytes to {OUT}")
