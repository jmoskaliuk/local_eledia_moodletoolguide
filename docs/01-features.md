# Features · Moodle Tool Guide

## Meta

Dieses Dokument definiert, **was das Produkt tun soll** — gewünschtes Verhalten, Akzeptanzkriterien, Releases. Quelle der Wahrheit für das Soll.

**Regeln:**
- Bei Unklarheit → keine Annahme, sondern `qXX` in `04-tasks.md`.
- Implementierung und Doku müssen mit diesem Dokument konsistent sein.
- Verhaltensänderung → dieses Dokument aktualisieren, sonst nicht „done".

---

## Produkt-Übersicht

### Zweck

Moodle-Lehrenden auf einer einzigen Oberfläche helfen, das passende Werkzeug für ein didaktisches Ziel zu finden — statt einer statischen PDF-Matrix bietet die App mehrere Zugangswege, Vergleichsmöglichkeiten und Praxisbeispiele.

### Kernkonzepte

- **Aktivität / Tool:** Moodle-Modul (z. B. Forum, Test, Wiki, H5P).
- **Didaktisches Ziel:** Information, Bewerten, Kommunikation, Gemeinsam erstellen.
- **Eignung:** Ampel-Bewertung pro Aktivität × Ziel (grün / orange / rot bzw. thumbs-up / thumbs-down / circle-slash).
- **Bloom-Stufe:** Erinnern, Verstehen, Anwenden, Analysieren, Bewerten, Erschaffen.
- **Komplexität:** Einfach / Mittel / Komplex.

### Hauptfunktionen

1. Interaktive Matrix (Aktivität × Ziel)
2. Guided Wizard (geführte Auswahl)
3. Detailansicht pro Tool (Steckbrief, Praxisbeispiele)
4. Mehrsprachigkeit (de / en / fr / es)
5. Drei Auslieferungswege (Standalone HTML, Moodle-Plugin, WordPress-Plugin)

### Constraints

- Single-File-Source-of-Truth (`Prototyp_ToolGuide.html`) → Sync in beide Plugin-Tracks.
- BFSG/WCAG 2.2 AA verbindlich.
- React 18.x, kein Build-Schritt zur Laufzeit (Babel-in-Browser im Prototyp; AMD-Modul im Moodle-Plugin; vorgemounteter Bundle im WP-Plugin).
- WordPress-Theme-Isolation (Scoped CSS Reset).

---

## Features

> Ab hier projekt-spezifisch befüllen — die unten aufgeführten Featurebausteine
> sind aus dem aktuellen Code abgeleitet und müssen vom PO als „so gewollt"
> bestätigt oder korrigiert werden.

---

### feat01 Interaktive Matrix

**Ziel**
Die bewährte Aktivität × Ziel-Matrix klickbar, filterbar und responsiv anbieten.

**Verhalten**

- Zeilen = Moodle-Aktivitäten, Spalten = didaktische Ziele.
- Zellen visualisieren die Eignung über Lucide-Icons (`thumbs-up`, `thumbs-down`, `circle-slash`).
- Hover: Kurzinfo aus der Datenbank.
- Klick: Detailansicht des Tools.
- Filterleiste oben: Bloom-Stufe, Komplexität, Eignung.
- Mobile: Matrix wird zur Kartenansicht.

**Akzeptanzkriterien**

```
- feat01.AC01
  Given:  Anwender öffnet die App
  When:   Matrix wird gerendert
  Then:   alle Aktivitäten und Ziele aus Datenbank sind sichtbar, Eignungs-Icons folgen Lucide v1.8.0

- feat01.AC02
  Given:  Anwender klickt eine Zelle
  When:   Detailansicht öffnet
  Then:   Tool-Steckbrief mit Beschreibung, Bloom-Stufe, Eignung, Beispiel
```

**Non-Goals**

- Kein Editor zur Pflege der Datenbank (das ist `Datenbank_ToolGuide.xlsx` außerhalb der App).

**Entscheidungen**

- Ampel-Icons aus Lucide v1.8.0 — Pfade aus dem npm-Paket extrahiert, nicht erraten (siehe `CLAUDE.md`).

---

### feat02 Guided Wizard

**Ziel**
Einsteiger:innen ohne Vorkenntnisse zu einem passenden Tool führen.

**Verhalten**

- Schritt 1: didaktisches Ziel wählen (Icons + Kurzbeschreibung)
- Schritt 2: Komplexität (Slider)
- Schritt 3: Bloom-Stufe (Pyramide zum Anklicken)
- Ergebnis: sortierte Tool-Liste mit Ampel-Bewertung

**Akzeptanzkriterien**

```
- feat02.AC01
  Given:  Wizard ist gestartet
  When:   alle drei Schritte beantwortet
  Then:   Ergebnisliste enthält ≥1 Tool, sortiert nach Eignungs-Score
```

---

### feat03 Detailansicht / Tool-Steckbrief

**Ziel**
Pro Tool kompakte Praxisinfo bereitstellen.

**Verhalten**

- Aufbau: Bezeichnung · Kurzbeschreibung · Eignung pro Ziel (Ampel) · Bloom-Stufe · Komplexität · Praxisbeispiel · Link zur Moodle-Doku.

**Akzeptanzkriterien**

```
- feat03.AC01
  Given:  Anwender öffnet ein Tool aus Matrix oder Wizard
  When:   Detailansicht rendert
  Then:   alle Datenbank-Felder dieses Tools sind sichtbar
```

---

### feat04 Mehrsprachigkeit

**Ziel**
App auf Deutsch, Englisch, Französisch und Spanisch nutzbar machen.

**Verhalten**

- Sprache via UI-Umschalter wählbar.
- Im WordPress-Plugin zusätzlich: `wp.i18n` als Override pro Locale (siehe `sync_wordpress_js.py`).
- HTML-Lang-Attribut wird mit der Sprache synchronisiert.

**Akzeptanzkriterien**

```
- feat04.AC01
  Given:  Anwender wechselt die Sprache
  When:   eine andere Sprache gewählt wird
  Then:   alle UI-Texte erscheinen in der neuen Sprache, `<html lang>` ist gesetzt
```

**Non-Goals**

- Keine RTL-Sprachen (Arabisch/Hebräisch) für v1.

---

### feat05 Drei Auslieferungswege im Lockstep

**Ziel**
Standalone-HTML, Moodle-Plugin und WordPress-Plugin verhalten sich identisch und verwenden denselben Quelltext.

**Verhalten**

- `Prototyp_ToolGuide.html` ist Source of Truth.
- `sync_plugin_js.py` baut Moodle-AMD-Modul.
- `sync_wordpress_js.py` baut WP-Asset-JS inkl. `wp.i18n`-Patch.
- Versionen, Stable-Tags und Changelogs in allen Tracks im Lockstep.

**Akzeptanzkriterien**

```
- feat05.AC01
  Given:  Änderung am Prototyp
  When:   beide Sync-Skripte laufen
  Then:   beide Plugin-JS-Dateien enthalten den aktuellen App-Code, der jeweilige Mount-Punkt ist eingesetzt

- feat05.AC02
  Given:  Release `relXX`
  When:   PO Release-Checkliste durchgeht
  Then:   `version.php`, WP-Header, `ELEDIA_TOOLGUIDE_VERSION`, vier Readmes mit Stable-Tag und CHANGELOG sind bumpgleich
```

---

### feat06 Barrierefreiheit (BFSG / WCAG 2.2 AA)

**Ziel**
App erfüllt Barrierefreie-Informationstechnik-Verordnung 2.0 für öffentliche Einrichtungen.

**Verhalten**

- Tastaturnavigation für Matrix, Wizard, Detailansicht.
- Sichtbare Fokus-Indikatoren (3px solid `#F98012`, offset 2px).
- High-Contrast-Modus (`html.hc`) → Schwarz/Weiß mit orangefarbenen Akzenten.
- `prefers-reduced-motion` deaktiviert Übergänge.
- Kontrast Text/Hintergrund: ≥ 4.5:1 (AA), Header-Text 8.9:1 (AAA).

**Akzeptanzkriterien**

```
- feat06.AC01
  Given:  Tastaturanwender:in
  When:   Tab durch die App
  Then:   alle interaktiven Elemente sind erreichbar, Fokus ist sichtbar

- feat06.AC02
  Given:  Anwender mit `prefers-contrast: more`
  When:   App rendert
  Then:   High-Contrast-Klasse `html.hc` ist aktiv
```

---

### feat07 WordPress-Theme-Isolation

**Ziel**
Plugin-Output bleibt in jedem WordPress-Theme konsistent.

**Verhalten**

- Scoped CSS-Reset auf `.eledia-toolguide-root` (siehe `wordpress-plugin/eledia-toolguide/assets/css/toolguide.css`).
- Inline-Styles für Link- und Icon-Farben (überstimmt themes auch ohne `!important`-Stylesheet).

**Akzeptanzkriterien**

```
- feat07.AC01
  Given:  Plugin in Twenty Twenty-Four, Astra, OceanWP, GeneratePress
  When:   Shortcode gerendert wird
  Then:   visuelles Erscheinungsbild ist identisch mit Standalone-HTML
```

---

## 📦 Releases

### Konvention

- ID-Format: `relXX` (semantisch `vX.Y.Z`)
- Release ist erst freigegeben, wenn alle enthaltenen Features die Done-Kriterien aus `00-master.md` §6 erfüllen.
- Release-Freigabe nur durch PO.
- Nach Freigabe: Tag im Repo (`vX.Y.Z`), Release-Notes-Update in CHANGELOG + alle vier Readmes.

### Release-Vorlage

```
### relXX RX.Y.Z

- **Datum:** YYYY-MM-DD
- **Status:** geplant | in Arbeit | freigegeben
- **Enthaltene Features:** featAA, featBB, featCC
- **Bekannte Einschränkungen:** offene bugXX (Severity ≤ S3)
- **Migrations-Hinweis:** falls Schema-/Konfig-Änderung
- **Release-Notes:** kurzer Klartext (verlinkt nach 02-user-doc.md)
```

### Aktive Releases

#### rel01 v1.1.13 — Logo, Button-Fix, Privacy API, AMD-Build, FR/ES Langs

- **Datum:** 2026-04-26
- **Status:** freigegeben
- **Enthaltene Features:** feat04 (FR/ES), feat05 (AMD-Build), feat06 (Privacy)
- **Bekannte Einschränkungen:** offene Cleanup-Tasks (siehe `04-tasks.md`)
- **Release-Notes:** siehe `CHANGELOG.md` und `wordpress-plugin/eledia-toolguide/readme.txt`

#### rel02 v1.1.14 — Premium Moodle Partner Logo *(geplant)*

- **Datum:** TBD
- **Status:** in Arbeit
- **Enthaltene Features:** Logo-Update auf offizielles Premium-Moodle-Partner-Trademark-Badge (Primary Colour RGB)
- **Migrations-Hinweis:** keine
- **Release-Notes:** „Footer-Partner-Logo aktualisiert auf das aktuelle „Premium Moodle Partner Trademark"-Badge."

---
