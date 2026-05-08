=== eLeDia Moodle Tool Guide ===
Contributors: eledia, jmoskaliuk
Tags: moodle, elearning, shortcode, tool-guide, didaktik
Requires at least: 6.0
Tested up to: 6.9
Requires PHP: 7.4
Stable tag: 1.1.33
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Interaktiver Wegweiser durch die Aktivitäten von Moodle 5 — Matrix, Karten und Assistent-Ansicht. Einbindung per Shortcode.

== Beschreibung ==

Der **eLeDia Moodle Tool Guide** hilft Lehrenden und Kursdesigner:innen, die passende Moodle-Aktivität für ihr didaktisches Ziel auszuwählen. Der Guide bündelt kuratiertes Wissen zu 22 Moodle-Aktivitäten mit Metadaten zu Einrichtungsaufwand, Betreuungsaufwand, Eignung für vier Lernziel-Kategorien (Informieren, Bewerten, Kommunizieren, Kollaborieren) sowie Bloom-Taxonomie-Level.

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

Nein. Das Plugin nutzt das von WordPress mitgelieferte `wp-element`-Paket und lädt React nicht von einem externen CDN.

= Funktioniert das Plugin mit dem Gutenberg-Block-Editor? =

Der Shortcode funktioniert überall, wo WordPress Shortcodes ausführt — auch im Gutenberg-Shortcode-Block. Ein nativer Gutenberg-Block ist für eine spätere Version geplant.

= Kann ich die Tool-Liste erweitern? =

Die Tool-Daten sind aktuell im JavaScript-Bundle hardcodiert. Ein Admin-Editor für die Tool-Liste ist geplant.

= Gibt es Tracking oder Telemetrie? =

Nein. Das Plugin ist zu 100 % self-contained und telefoniert nicht nach Hause.

== Changelog ==


= 1.1.33 =
* Die vier Matrix-Spaltenköpfe („Information & Transfer" usw.) sind jetzt unabhängig vom Header-Text gleich breit. Erreicht durch CSS table-layout:fixed und identische berechnete Breite für die vier Ziel-Spalten.
= 1.1.32 =
* WordPress-Plugin-JavaScript an die aktuelle Standalone-Quelle (moodle-tool-guide.html) angeglichen. Bringt das Mobile-Responsive-Matrix-Layout, zusätzlichen UI-Feinschliff aus der React-App und den aktuellen Tool-Datensatz mit.
* Übersetzungsvermerk im deutschen Footer ergänzt: „Basiert auf einer Übersetzung von Ralf Hilgenstock, Susanne Gebauer und Gerald Hartwig“ (vorher nur Ralf Hilgenstock).

= 1.1.31 =
* Partner-Logo aktualisiert auf das offizielle „Premium Moodle Partner Trademark™"-Badge (Primary Colour RGB).
* DevFlow-Dokumentation unter docs/ nach dem eLeDia.OS_DevFlow-Standard angelegt.
* Repo-Aufräumarbeiten: obsolete Prototyp-Notizen (IconPreview, Konzept) und das alte Prototyp_ToolGuide.jsx entfernt; Source of Truth ist der Babel-Block in Prototyp_ToolGuide.html.

= 1.1.28 =
* WordPress.org-Kompatibilitätsdaten für Plugin Check aktualisiert und den nicht mehr benötigten manuellen Textdomain-Lade-Hook entfernt.

= 1.1.27 =
* Veraltete Umfrage-Aktivität aus den synchronisierten Moodle-5-Tooldaten entfernt und die Aktivitätsliste an die aktualisierte Quelltabelle angepasst.

= 1.1.26 =
* Veraltete Chat-Aktivität aus den synchronisierten Moodle-5-Tooldaten entfernt und die Aktivitätsliste an die Quelltabelle angepasst.

= 1.1.25 =
* Tool-Guide-Skripte und Inline-Bootstrap-Code mit WP-Rocket-`nowprocket`-Ausnahmen markiert, damit die App ohne Scroll-Interaktion startet.

= 1.1.24 =
* Tippfreundliche Hinweise für Matrix-Spaltenköpfe ergänzt und Matrix-Tooltip-Hinweise für Touch-Geräte wie iPad unten im Viewport fixiert.

= 1.1.23 =
* Aktion „Neuen Vergleich starten“ in der Vergleichsansicht ergänzt und Vergleichsbuttons auf Karten unten ausgerichtet.

= 1.1.22 =
* Bloom-Lernziele werden in Kartendetails neutral dargestellt statt als Gut/Teilweise/Ungeeignet-Eignung.

= 1.1.21 =
* Tippfreundliche mobile Matrix-Hinweise für Aufwandspunkte und Eignungs-Icons ergänzt.

= 1.1.20 =
* Mobile Nutzer*innen starten nun standardmäßig in der Kartenansicht, und der Ladehinweis wird vor dem Rendern der App explizit entfernt.

= 1.1.19 =
* Daumen-Icon für „teilweise geeignet“ korrigiert, sodass es nach links zeigt.

= 1.1.18 =
* Barrierearmen Ladehinweis ergänzt, während das WordPress-Bundle startet, und die kompakte mobile Matrix aus dem HTML-Prototyp synchronisiert.

= 1.1.17 =
* Mobile Ansicht verbessert: Die Matrix-Lesepfeile werden auf kleinen Screens ausgeblendet, das Suchfeld steht linksbündig und die Auswahlboxen im Assistenten bleiben innerhalb der Viewport-Breite.

= 1.1.16 =
* Mobile Matrix-Karten für iPhone verbessert: Die Chips der didaktischen Ziele laufen nun zweispaltig und brechen sauber um, sodass lange Labels nicht mehr überlappen.

= 1.1.15 =
* WordPress-Theme-Integration verbessert: Der Tool Guide bricht nun auf volle Viewport-Breite aus, sodass Header, Navigation, Inhaltsfläche und Footer-Bänder durchlaufen. Der Footer bleibt bei kurzen Ergebnislisten unten.

= 1.1.14 =
* WordPress-JavaScript-Internationalisierung für UI-Texte ergänzt: `wp-i18n`, `wp_set_script_translations()`, gebündelte JSON-Übersetzungen und ein POT-Template. Die kuratierten Tooldaten bleiben weiterhin über die eingebaute DE/EN/FR/ES-Sprachumschaltung verfügbar.

= 1.1.13 =
* Aktuellen HTML-Prototyp in das WordPress-Plugin synchronisiert: Matrix-Hilfe, Info-Panels, Sie-Form, verbesserte Assistenten-Filterung, mobilfreundliche Matrix-Karten und Barrierefreiheitsverbesserungen bei Kontrast, Fokus und Tabellensemantik. React wird nun über das von WordPress mitgelieferte `wp-element`-Paket statt über ein externes CDN geladen.

= 1.1.12 =
* Footer passend zum neuen Header gestaltet: warmes helles Beige (#FFECDB) mit dunkelblauem Text und dunkelblauen unterstrichenen Links statt des dunkelblauen Balkens mit orangen Links. eLeDia- und Moodle-Partner-Logo, CC-BY-NC-SA-Badge und GitHub-Icon sind auf dem neuen Hintergrund gut lesbar.

= 1.1.11 =
* Neuer Header-Look: Der blaue Verlaufs-Header weicht einem warmen hellen Beige (#FFECDB) mit dunkelblauem Text, die Sub-Navigation ist jetzt grau (#F3F5F8) statt weiß — kein durchgehend weißer Balken mehr oben auf breiten Screens. Bessere Kontraste bei Zoom und im Hochkontrast-Modus.

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
* React über das von WordPress mitgelieferte `wp-element`-Paket.
* WCAG 2.2 AA: Kontrast, Keyboard-Bedienung, Fokus-Management, Live-Regions.

== Credits ==

Basis: [Moodle Tool Guide für Lehrende](https://www.cyberlearn.ch/) von Joyce Seitzinger, Gavin Henrick und Nicolas Martignoni. Deutsche Ursprungs-Übersetzung: Ralf Hilgenstock. Bearbeitung und Moodle-5-Aktualisierung: eLeDia GmbH.
