=== eLeDia Moodle Tool Guide ===
Contributors: eledia, jmoskaliuk
Tags: moodle, elearning, shortcode, tool-guide, didaktik
Requires at least: 6.0
Tested up to: 6.5
Requires PHP: 7.4
Stable tag: 1.1.10
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Interaktiver Wegweiser durch die Aktivitäten von Moodle 5 — Matrix, Karten und Assistent-Ansicht. Einbindung per Shortcode.

== Beschreibung ==

Der **eLeDia Moodle Tool Guide** hilft Lehrenden und Kursdesigner:innen, die passende Moodle-Aktivität für ihr didaktisches Ziel auszuwählen. Der Guide bündelt kuratiertes Wissen zu rund 25 Moodle-Aktivitäten mit Metadaten zu Einrichtungsaufwand, Betreuungsaufwand, Eignung für vier Lernziel-Kategorien (Informieren, Bewerten, Kommunizieren, Kollaborieren) sowie Bloom-Taxonomie-Level.

Drei Ansichten auf denselben Datenbestand:

* **Matrix** — Tabellenansicht mit Einrichtungs-/Betreuungsaufwand und Lernziel-Eignung per Daumen-Icon.
* **Karten** — Kachel-Ansicht mit Filtern für Aufwand, Lernziel und Bloom-Level.
* **Assistent** — geführter 5-Schritt-Wizard, der anhand der Antworten passende Aktivitäten empfiehlt.

Der Guide ist mehrsprachig (Deutsch, Englisch, Französisch, Spanisch), WCAG-2.2-AA-konform und bietet einen integrierten Schriftgrößen-Umschalter. Die Daten basieren auf einer Übersetzung des schweizerischen Moodle Tool Guide von Joyce Seitzinger, Gavin Henrick und Nicolas Martignoni (ursprüngliche deutsche Übersetzung: Ralf Hilgenstock), didaktisch aktualisiert auf Moodle 5.

Das Plugin ist ein schlanker Wrapper um den Standalone-HTML-Tool-Guide — der JavaScript-Payload wird aus dem Prototyp synchronisiert. Das Plugin liefert einen Shortcode, keine Admin-UI, keine Datenbank-Tabellen, kein Tracking.

Hinweis: Die Haupt-Readme für die WordPress Plugin Directory ist Englisch (`readme.txt`). Diese Datei ist die deutsche Übersetzung.

== Installation ==

1. Plugin-ZIP unter *Plugins → Installieren → Plugin hochladen* einspielen.
2. Plugin aktivieren.
3. Auf einer beliebigen Seite, einem Post oder in einem Custom Post den Shortcode `[eledia_toolguide]` einfügen.

Optionale Shortcode-Attribute:

* `lang="de|en|fr|es"` — erzwingt eine bestimmte Sprache. Ohne Angabe wird die WordPress-Locale verwendet.
* `height="800px"` — setzt die Mindesthöhe des Containers. Default: `800px`.

Beispiele:

`[eledia_toolguide]`
`[eledia_toolguide lang="en"]`
`[eledia_toolguide height="auto"]`

== Häufige Fragen ==

= Lädt das Plugin React von einem externen CDN? =

In der Standardkonfiguration ja — React 18.3.1 wird von unpkg.com geladen. Für DSGVO-konforme Installationen ohne externe Requests kannst du React selbst hosten: Lege `react.production.min.js` und `react-dom.production.min.js` aus der React-Distribution in `assets/js/vendor/` ab. Das Plugin erkennt die lokalen Dateien automatisch und nutzt sie statt des CDN.

= Funktioniert das Plugin mit dem Gutenberg-Block-Editor? =

Der Shortcode funktioniert überall, wo WordPress Shortcodes ausführt — auch im Gutenberg-Shortcode-Block. Ein nativer Gutenberg-Block ist für eine spätere Version geplant.

= Kann ich die Tool-Liste erweitern? =

Die Tool-Daten sind aktuell im JavaScript-Bundle hardcodiert. Ein Admin-Editor für die Tool-Liste ist geplant.

= Gibt es Tracking oder Telemetrie? =

Nein. Das Plugin ist zu 100 % self-contained (abgesehen vom optionalen React-CDN) und telefoniert nicht nach Hause.

== Changelog ==

= 1.1.10 =
* Theme-Isolation gefixt: Die Filter-Dropdowns (Gut geeignet für / Bloom) und die Footer-Links übernehmen keine WordPress-Theme-Styles mehr. Das Plugin bringt jetzt ein scoped CSS-Reset mit, damit der Tool Guide in jedem Theme identisch aussieht.
* Buch- und Glühbirnen-Emojis vor "Moodle Docs" und "eledia.community" in der Tool-Detailansicht entfernt — aufgeräumtere Optik.

= 1.1.9 =
* Alle drei Matrix-Icons auf Lucide v1.8.0 aktualisiert: thumbs-up, thumbs-down und circle-slash haben eine neue, überarbeitete Form. Die alten Paths stammten aus einer älteren Lucide-Version und sahen merklich anders aus.
* Plugin-Readme verfügbar auf Englisch (Haupt), Deutsch, Französisch und Spanisch.

= 1.1.8 =
* Matrix "neutral"-Icon: statt rotiertem thumbs-up jetzt Lucide circle-slash (Kreis mit Schrägstrich). Eindeutiger als rotierter Daumen.

= 1.1.7 =
* Aktivitäts-Icons nutzen jetzt die offiziellen Moodle-5-Purpose-Farben (Verwaltung/Bewertung/Zusammenarbeit/Kommunikation/Interaktive Inhalte/Ressourcen).
* Assistent: Bloom-Stufen-Buttons in eLeDia-CI-Palette statt HSL-Verlauf.
* Assistent-Ergebniskarten nutzen jetzt die gleiche Kartendarstellung wie die Kartenansicht.
* Seitlicher Daumen in der Matrix als Lucide-thumbs-up um -90° rotiert (in 1.1.8 ersetzt).

= 1.1.6 =
* Initial WordPress-Port aus dem Moodle-Plugin local_toolguide 1.1.6.
* Shortcode-basierte Einbindung.
* React 18 via CDN oder selbst gehostet.
* WCAG 2.2 AA: Kontrast, Keyboard-Bedienung, Fokus-Management, Live-Regions.

== Credits ==

Basis: [Moodle Tool Guide für Lehrende](https://www.cyberlearn.ch/) von Joyce Seitzinger, Gavin Henrick und Nicolas Martignoni. Deutsche Ursprungs-Übersetzung: Ralf Hilgenstock. Bearbeitung und Moodle-5-Aktualisierung: eLeDia GmbH.
