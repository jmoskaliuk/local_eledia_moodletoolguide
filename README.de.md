# Moodle Tool Guide (eLeDia)

[English](README.md) · [Français](README.fr.md) · [Español](README.es.md)

Interaktiver Tool Guide für Moodle 5 — basierend auf dem klassischen *Moodle Tool Guide for Teachers* und erweitert um eLeDia-spezifische didaktische Empfehlungen.

Drei Auslieferungswege aus einer Datenquelle:

1. **Standalone-Webseite** — `Prototyp_ToolGuide.html`: Single-File React/HTML, direkt per `<iframe>` einbettbar.
2. **Moodle Local Plugin** — `moodle-plugin/local/toolguide/` / `local_toolguide.zip`: installierbares Local-Plugin für Moodle 4.5 / 5.x.
3. **WordPress Plugin** — `wordpress-plugin/eledia-toolguide/` / `eledia-toolguide.zip`: Shortcode `[eledia_toolguide]` für beliebige WordPress-Seiten.

## Features

- **25 Moodle-Aktivitäten** mit didaktischen Empfehlungen für fünf Lernziele
- **Matrix-Ansicht** mit Daumen-Icons (geeignet / neutral / ungeeignet) und Hover-Tooltips
- **Karten-Ansicht** mit ausführlichen Beschreibungen und Filtern (Einrichtungsaufwand, Betreuungsaufwand, Lernziel, Bloom-Stufe)
- **Assistent** — geführter 5-Schritt-Wizard mit Empfehlungen auf Basis der Antworten
- **Vergleichsmodus** für bis zu drei Werkzeuge nebeneinander
- **Aufwand zweidimensional**: Einrichtung und laufende Betreuung
- **Bloomsche Taxonomie** (Stufen 1–6) je Aktivität
- **4 UI-Sprachen**: Deutsch, Englisch, Französisch, Spanisch
- **Barrierefreiheit**: WCAG 2.2 AA — ARIA-Rollen, Skip-Link, Tastatur-Navigation, Focus-Trap für Dialoge, Live-Regions für Filter-Updates, Schriftgrößen-Umschalter
- **Responsive** — Desktop, Tablet und Mobil
- **Offizielle Moodle-5-Aktivitäts-Farben** (Verwaltung / Bewertung / Zusammenarbeit / Kommunikation / Interaktive Inhalte / Ressourcen)

## Datenquelle

`Datenbank_ToolGuide.xlsx` ist die Single Source of Truth für alle Tool-Daten (Beschreibungen, Eignungen pro Lernziel, Aufwand, Bloom). Das Standalone-HTML, das Moodle-Plugin-JS und das WordPress-Plugin-JS werden daraus über `sync_plugin_js.py` und `sync_wordpress_js.py` synchronisiert.

## Standalone-Webseite verwenden

`Prototyp_ToolGuide.html` ist eine eigenständige HTML-Datei. Einfach im Browser öffnen oder per `<iframe>` einbetten:

```html
<iframe src="/wp-content/uploads/Prototyp_ToolGuide.html"
        width="100%" height="900" style="border:0"></iframe>
```

## Moodle-Plugin installieren

Im Moodle-Root:

```bash
unzip local_toolguide.zip -d local/
php admin/cli/upgrade.php
```

Danach aufrufbar unter `/local/toolguide/index.php`. Das Plugin trägt sich für Nutzer:innen mit dem Recht `local/toolguide:view` in die globale Navigation ein.

## WordPress-Plugin installieren

1. `eledia-toolguide.zip` unter **Plugins → Installieren → Plugin hochladen** einspielen.
2. Plugin aktivieren.
3. Auf beliebiger Seite, Post oder Custom Post den Shortcode `[eledia_toolguide]` einfügen.

Optionale Shortcode-Attribute:

- `lang="de|en|fr|es"` — erzwingt eine bestimmte Sprache. Ohne Angabe wird die WordPress-Locale verwendet.
- `height="800px"` — setzt die Mindesthöhe des Containers. Default: `800px`.

Beispiele:

```
[eledia_toolguide]
[eledia_toolguide lang="en"]
[eledia_toolguide height="auto"]
```

Standardmäßig lädt das WordPress-Plugin React 18.3.1 von unpkg.com. Für DSGVO-konforme Installationen ohne externe Requests kann React selbst gehostet werden: `react.production.min.js` und `react-dom.production.min.js` in `assets/js/vendor/` ablegen — das Plugin erkennt die lokalen Dateien automatisch.

## Lizenz

GNU GPL v3 oder später (Moodle-konform).

## Credits

Basierend auf dem [Moodle Tool Guide for Teachers](https://www.cyberlearn.ch/) von Joyce Seitzinger, Gavin Henrick und Nicolas Martignoni. Deutsche Ursprungs-Übersetzung: Ralf Hilgenstock. Redesign, Moodle-5-Aktualisierung, Wizard, Matrix- und Karten-Ansicht, Paketierung als Moodle-Local-Plugin und WordPress-Plugin: [eLeDia GmbH](https://eledia.de).
