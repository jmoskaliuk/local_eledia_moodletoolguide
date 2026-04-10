# Konzept: Moodle Tool Guide – Interaktive Webapp

## Vision

Eine interaktive React-Webapp, die Moodle-Lehrenden – ob Einsteiger oder erfahren – hilft, das passende Werkzeug für ihr didaktisches Ziel zu finden. Statt einer statischen PDF-Matrix bietet die App mehrere Zugangswege, Vergleichsmöglichkeiten und Praxisbeispiele.

---

## Zugangswege (kombiniert)

### 1. Interaktive Matrix (Startansicht)

Die bewährte Tabellenstruktur des PDF-Originals – aber klickbar, filterbar und responsiv.

- Zeilen = Moodle-Aktivitäten (Datei, Wiki, Forum, Test, …)
- Spalten = Didaktische Ziele (Information, Bewerten, Kommunikation, Gemeinsam erstellen)
- Farbige Zellen (grün/orange/rot) zeigen Eignung auf einen Blick
- Hover: Kurzinfo mit Erklärung aus der Datenbank
- Klick: Öffnet Detailansicht des Tools
- Filter-Leiste oben: nach Bloom-Stufe, Einfachheit, Eignung filtern
- Responsive: auf Mobile wird die Matrix zur Kartenansicht

### 2. Guided Wizard ("Welches Tool passt zu mir?")

Ein freundlicher Schritt-für-Schritt-Assistent für Einsteiger.

- Schritt 1: "Was möchtest du erreichen?" → Didaktisches Ziel wählen (mit Icons & Kurzbeschreibung)
- Schritt 2: "Wie komplex darf es sein?" → Slider von "Einfach" bis "Komplex"
- Schritt 3: "Welche Bloom-Stufe?" → Visuelle Bloom-Pyramide zum Anklicken
- Schritt 4: Ergebnis → Sortierte Liste der passenden Tools mit Ampel-Bewertung
- Optional: "Überrasch mich" – zufälliges, passendes Tool vorschlagen

### 3. Suche & Filter (für Erfahrene)

Schnellzugriff für Nutzer, die wissen, was sie suchen.

- Suchfeld mit Autovervollständigung (Toolnamen, Stichworte)
- Facetten-Filter: Didaktisches Ziel, Bloom-Stufe, Einfachheit, Eignung
- Ergebnisse als sortierbare Karten oder Listenansicht

---

## Features

### Vergleichsfunktion

- Checkbox an jedem Tool: "Zum Vergleich hinzufügen"
- Vergleichsleiste am unteren Bildschirmrand (max. 3-4 Tools)
- Vergleichsansicht: Spalten nebeneinander mit allen Dimensionen
- Farbliche Hervorhebung der Unterschiede
- "Bestes Tool für X" wird optisch markiert

### Praxisbeispiele

- Pro Tool 2-3 konkrete Einsatzszenarien (z.B. "Forum als Lerntagebuch", "Wiki für Gruppenreferate")
- Aufklappbare Abschnitte in der Detailansicht
- Kategorisiert nach Fachbereich oder Gruppengröße
- Community-Beiträge verlinkt (Spalte F aus der Datenbank)
- Perspektivisch: Nutzer können eigene Beispiele einreichen

### Bloom-Filter

- Visuelle Bloom-Pyramide als interaktives Filterelement
- 6 Stufen: Wiedergeben → Verstehen → Anwenden → Analysieren → Übertragen → Bewerten
- Klick auf Stufe filtert alle Tools, die diese Stufe unterstützen
- In der Detailansicht: Bloom-Badge zeigt unterstützte Stufen

### Intuitive Nutzerführung

- Onboarding-Tour beim ersten Besuch (3-4 Schritte)
- Kontextsensitive Tooltips an allen Bewertungselementen
- Breadcrumbs für die Navigation
- "Zurück zur Übersicht" immer sichtbar
- Legende für das Ampelsystem permanent einblendbar

---

## Detailansicht pro Tool

Jede Aktivität bekommt eine eigene Detailseite/Modal:

- Header: Toolname + Moodle-Icon + Kurzbeschreibung
- Ampel-Übersicht: Alle 4 didaktischen Ziele auf einen Blick (grün/orange/rot)
- Einfachheit: Visueller Indikator (z.B. 1-3 Sterne oder Fortschrittsbalken)
- Bloom-Unterstützung: Badges für unterstützte Stufen
- Erklärungen: Pro didaktisches Ziel die ausführliche Erklärung aus der Datenbank
- Praxisbeispiele: Aufklappbare Szenarien
- Links: Moodle Docs, Community-Beiträge, verwandte Tools
- "Vergleichen mit…": Direktlink zur Vergleichsansicht

---

## Technische Architektur

### React-App (Vite + React)

- Daten: JSON-Datei aus der Excel-Datenbank generiert (kein Backend nötig)
- Routing: React Router für Matrix / Wizard / Detail / Vergleich
- State: React Context oder Zustand für Vergleichsliste und Filter
- Styling: Tailwind CSS für schnelles, responsives Design
- Hosting: Statisch deploybar (GitHub Pages, Netlify, Vercel)

### Datenstruktur (tools.json)

```json
{
  "activities": [
    {
      "id": "wiki",
      "name": "Wiki",
      "description": "Gemeinsam in der Gruppe Texte erstellen",
      "complexity": "mittel",
      "complexityText": "Erfordert Auseinandersetzung mit Wikiprinzip...",
      "bloom": "6/6",
      "goals": {
        "information": { "rating": "grün", "text": "Ja. Als Info-Seite nutzen..." },
        "assessment": { "rating": "grün", "text": "Wiki ist flexibel einsetzbar..." },
        "communication": { "rating": "orange", "text": "Teilweise für Diskussionen..." },
        "collaboration": { "rating": "grün", "text": "Ja. Teilnehmende können kooperativ..." },
        "bloomGoals": { "rating": "grün", "text": "6/6 möglich..." }
      },
      "links": { "docs": "", "community": "", "related": [] },
      "examples": []
    }
  ]
}
```

---

## Designideen

- Farbpalette: Moodle-Orange (#F98012) als Akzent, neutrale Grautöne, Ampelfarben für Bewertung
- Typografie: Clean, gut lesbar (Inter oder Source Sans Pro)
- Icons: Lucide-Icons für Navigation, Moodle-eigene Icons für Tools wo verfügbar
- Dark Mode: Optional, aber nice-to-have
- Animationen: Subtile Übergänge bei Filter-Änderungen und Seitenwechsel

---

## Nächste Schritte

1. Konzept Review (du bist hier!)
2. Interaktiver Prototyp als React-Komponente
3. Datenbank um Praxisbeispiele erweitern
4. Vollständige Implementierung
5. Testing & Deployment
