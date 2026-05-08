# Benutzer-Dokumentation · Moodle Tool Guide

## Meta

Dieses Dokument beschreibt, **wie Benutzer mit der App interagieren** — Zielgruppen, Use-Cases, Schritt-für-Schritt-Bedienung pro Feature.

**Regeln:**
- Sprache einfach und nutzerorientiert.
- Keine technischen Details — die gehören in `03-dev-doc.md`.
- Bei Änderung am sichtbaren Verhalten dieses Dokument aktualisieren, sonst nicht „done".

---

# Produkt-Nutzung — Übersicht

## Zielgruppen

- **Lehrende mit Moodle-Erfahrung** — wollen schnell die richtige Aktivität für ein didaktisches Ziel finden.
- **Lehrende ohne Moodle-Erfahrung** — brauchen Orientierung, welches Tool wofür geeignet ist.
- **Mediendidaktiker:innen / E-Learning-Beratung** — nutzen das Tool als Argumentationsgrundlage in der Lehrendenberatung.
- **Schulträger / öffentliche Einrichtungen** — verwenden die WordPress-Variante auf einer öffentlichen Website (BFSG-konform).

---

## Haupt-Use-Cases

- „Ich will ein bestimmtes didaktisches Ziel erreichen — welches Moodle-Tool passt?"
- „Ich kenne dieses Tool — wofür ist es eigentlich gut?"
- „Ich brauche ein Tool für Bloom-Stufe Anwenden, einfach umsetzbar — Vorschläge?"
- „Ich beziehe das Tool Guide in die WordPress-Schul-Website ein — Shortcode einbauen."

---

## Typischer Workflow

1. Anwender:in öffnet die App (Standalone, Moodle-Plugin oder WP-Page).
2. Sprache wählen (de / en / fr / es) — falls nicht passend.
3. Über die Matrix scrollen oder den Wizard starten.
4. Tool wählen → Detailansicht öffnet.
5. Steckbrief lesen, Praxisbeispiel anschauen, ggf. Link zur Moodle-Doku folgen.

---

## Kernkonzepte (Benutzerperspektive)

- **Aktivität / Tool:** ein Moodle-Modul wie Forum, Test, Wiki, H5P.
- **Didaktisches Ziel:** vier Hauptkategorien — Information, Bewerten, Kommunikation, Gemeinsam erstellen.
- **Ampel:** zeigt auf einen Blick, wie gut sich ein Tool für ein Ziel eignet (grün = passt, orange = bedingt, rot = ungeeignet).
- **Bloom-Stufe:** kognitive Anforderung von „Erinnern" bis „Erschaffen".
- **Komplexität:** Einsteiger:innen-Wert von „einfach" bis „komplex".

---

# Feature-Bedienung

> Pro Feature: Was tut es, wann nutzen, Schritt-für-Schritt-Bedienung,
> erwartetes Ergebnis, Hinweise, häufige Fehler. Verweise auf `featXX`-IDs
> aus `01-features.md`.

---

## Interaktive Matrix (`feat01`)

**Was tut es?**
Zeigt alle Moodle-Aktivitäten und alle didaktischen Ziele in einer Tabelle. Eignung pro Kombination als Ampel-Icon.

**Wann nutze ich es?**
Wenn man bereits weiß, welche Aktivität oder welches Ziel gemeint ist.

**Bedienung**

1. App öffnen — Matrix ist die Startansicht.
2. Filterleiste oben verwenden, um Bloom-Stufe, Komplexität oder Eignung einzugrenzen.
3. Über eine Zelle hovern → Kurzinfo erscheint.
4. Auf eine Zelle oder Tool-Bezeichnung klicken → Detailansicht öffnet.

**Erwartetes Ergebnis**
Klar erkennbare Ampel-Bewertung pro Aktivität × Ziel.

**Hinweise**
Auf mobilen Geräten wird die Matrix automatisch zur Kartenansicht.

---

## Guided Wizard (`feat02`)

**Was tut es?**
Stellt drei einfache Fragen und schlägt die passenden Tools vor.

**Wann nutze ich es?**
Wenn man Moodle nicht so gut kennt oder neue Ideen für ein didaktisches Ziel braucht.

**Bedienung**

1. „Welches Tool passt zu mir?" anklicken.
2. Schritt 1: Didaktisches Ziel wählen.
3. Schritt 2: Komplexität (Slider).
4. Schritt 3: Bloom-Stufe (Pyramide anklicken).
5. Ergebnis: sortierte Liste passender Tools mit Ampel.

**Erwartetes Ergebnis**
Mindestens ein Tool pro Eingabekombination.

---

## Detailansicht (`feat03`)

**Was tut es?**
Zeigt alle Informationen zu einem Tool auf einer Karteikarten-Ansicht.

**Wann nutze ich es?**
Nachdem man ein Tool aus Matrix oder Wizard gewählt hat.

**Bedienung**

1. In Matrix oder Ergebnis-Liste auf ein Tool klicken.
2. Steckbrief lesen: Beschreibung, Eignung pro Ziel, Bloom, Komplexität, Praxisbeispiel.
3. „Zur Moodle-Doku" → öffnet die offizielle Doku in neuem Tab.

---

## Sprache wechseln (`feat04`)

**Bedienung**

1. Sprach-Umschalter oben rechts klicken.
2. Eine der vier Sprachen wählen (de / en / fr / es).

**Erwartetes Ergebnis**
Alle UI-Texte und Datenbank-Inhalte (sofern übersetzt) erscheinen in der neuen Sprache.

**Hinweis (WordPress)**
Im WP-Plugin wird zusätzlich die Locale der Seite berücksichtigt — falls die Seite z. B. auf `fr_FR` läuft, ist Französisch automatisch vorausgewählt.

---

## App in eine WordPress-Seite einbauen (`feat05`)

**Was tut es?**
Der Tool Guide kann mit dem Shortcode `[eledia_toolguide]` auf jeder Seite oder in jedem Beitrag eingebettet werden.

**Bedienung**

1. Plugin „eLeDia Tool Guide" installieren und aktivieren.
2. Eine Seite oder einen Beitrag bearbeiten.
3. Shortcode `[eledia_toolguide]` einfügen.
4. Seite veröffentlichen.

**Erwartetes Ergebnis**
Die App rendert vollständig auf der Seite, unabhängig vom verwendeten Theme.

**Hinweis (DSGVO)**
Wenn React lokal geladen werden soll (statt von unpkg.com), die Dateien `react.production.min.js` und `react-dom.production.min.js` nach `wordpress-plugin/eledia-toolguide/assets/js/vendor/` legen — das Plugin erkennt das automatisch.

---

## App in Moodle einbauen (`feat05`)

**Was tut es?**
Der Tool Guide ist als lokales Moodle-Plugin (`local_toolguide`) installierbar und erscheint im Hauptmenü.

**Bedienung**

1. ZIP `local_toolguide.zip` als Moodle-Admin hochladen unter Site administration → Plugins → Install plugins.
2. Aktualisierungs-Pipeline durchlaufen lassen.
3. Im Hauptmenü → „Tool Guide".

**Erwartetes Ergebnis**
Die App rendert in der Moodle-UI mit Moodle-Theme-Header/Footer.

---

# Häufige Fragen

**Warum sehe ich keine Tools für eine bestimmte Kombination im Wizard?**
Es gibt keine Aktivität, die für genau diese Kombination aus Ziel × Komplexität × Bloom-Stufe geeignet ist. Filter lockern.

**Werden meine Eingaben gespeichert?**
Nein. Die App ist zustandslos und sendet keine Daten an einen Server.

**Kann ich die Datenbank selbst pflegen?**
Nicht in der App. `Datenbank_ToolGuide.xlsx` im Repo ist die Datenquelle; Änderungen daran erfordern einen neuen Release.

---

# Grundprinzip

> Dieses Dokument erklärt, **wie sich der Tool Guide für den Nutzer anfühlt** — nicht **wie er gebaut ist**.
