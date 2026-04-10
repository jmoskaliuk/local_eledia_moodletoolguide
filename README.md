# Moodle Tool Guide (eLeDia)

Interaktiver Tool Guide für Moodle 5 — basierend auf dem klassischen "Moodle Tool Guide for Teachers" und erweitert um eLeDia-spezifische didaktische Empfehlungen.

Zwei Auslieferungswege:

1. **Standalone Webseite** (`Prototyp_ToolGuide.html`) — Single-File React/HTML, kann direkt in WordPress eingebettet werden.
2. **Moodle Local Plugin** (`moodle-plugin/local/toolguide/`, `local_toolguide.zip`) — Installierbares Moodle-Plugin (Moodle 4.5 / 5.x).

## Features

- **21 Moodle-Aktivitäten** mit didaktischen Empfehlungen für 5 Lernziele
- **Matrix-Ansicht** mit Daumen-Icons (geeignet / teilweise / ungeeignet) und Hover-Tooltips
- **Karten-Ansicht** mit ausführlichen Beschreibungen
- **Vergleichs-Modus** für bis zu drei Werkzeuge nebeneinander
- **Assistent / Wizard** mit Zurück-Button für geführte Auswahl
- **Aufwand zweidimensional**: Einrichtung + Betreuung
- **Bloomsche Taxonomie** (1–6) je Aktivität, differenziert
- **4 Sprachen** (DE / EN / FR / ES) für die UI
- **Barrierefrei**: ARIA-Rollen, Skip-Link, Tastatur-Navigation, Focus-Styles
- **Mobil optimiert** (responsive)

## Datenquelle

`Datenbank_ToolGuide.xlsx` ist die Single Source of Truth für alle Tool-Daten (Beschreibungen, Eignungen, Aufwand, Bloom).

## Verwendung der Webseite

`Prototyp_ToolGuide.html` ist eine eigenständige HTML-Datei. Einfach in einem Browser öffnen oder per `<iframe>` in WordPress einbetten:

```html
<iframe src="/wp-content/uploads/Prototyp_ToolGuide.html"
        width="100%" height="900" style="border:0"></iframe>
```

## Moodle Plugin installieren

```bash
# Im Moodle-Root:
unzip local_toolguide.zip -d local/
php admin/cli/upgrade.php
```

Aufruf danach: `/local/toolguide/index.php`

## Lizenz

GNU GPL v3 oder später (Moodle-konform).

## Über

Entwickelt von [eLeDia GmbH](https://eledia.de) — Moodle-Schulungen, Plugin-Entwicklung und Hosting.
