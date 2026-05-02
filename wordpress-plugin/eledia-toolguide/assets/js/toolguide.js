/* eslint-disable */
/* Auto-generated from Prototyp_ToolGuide.html — do not edit by hand. */
(function() {
  "use strict";
  if (typeof React === "undefined" || typeof ReactDOM === "undefined") {
    console.error("[eledia-toolguide] React/ReactDOM not loaded");
    return;
  }
  const __elediaToolguideRoot = document.querySelector(".eledia-toolguide-root");
  if (!__elediaToolguideRoot) {
    // Shortcode not present on this page — nothing to do.
    return;
  }
  const __elediaToolguideLangAttr = __elediaToolguideRoot.getAttribute("data-lang") || "de";
  const __elediaToolguideInitialLang = /^(de|en|fr|es)$/.test(__elediaToolguideLangAttr) ? __elediaToolguideLangAttr : "de";
  const __elediaToolguideConfig = window.elediaToolguideConfig || {};
  const __elediaToolguideWpLocaleLang = /^(de|en|fr|es)$/.test(__elediaToolguideConfig.localeLang || "") ? __elediaToolguideConfig.localeLang : __elediaToolguideInitialLang;

const { useState, useMemo } = React;

const TOOLS = [
  { id:"datei", name:"Datei", desc:"Datei hochladen (z.B. Word, PDF, PowerPoint)", complexity:"einfach", complexityText:"Einfach wie ein E-Mail Anhang. Aber machen Dateien f\u00fcr sich alleine Sinn?", bloom:"1/6",setup:"einfach",setupText:"Datei hochladen, fertig.",support:"gering",supportText:"Keine laufende Pflege nötig.", docsUrl:"https://docs.moodle.org/501/de/Datei", longDesc:"Mit der Aktivit\u00e4t \u00abDatei\u00bb stellen Sie Kursteilnehmenden einzelne Dateien zum Download bereit \u2013 PDFs, Word-Dokumente, Pr\u00e4sentationen oder Bilder. Die Datei erscheint direkt auf der Kursseite und kann per Klick ge\u00f6ffnet oder heruntergeladen werden. Dateien eignen sich besonders f\u00fcr Skripte, Arbeitsbl\u00e4tter und erg\u00e4nzende Materialien. Beachten Sie, dass Dateien allein keine Interaktion erm\u00f6glichen. Kombinieren Sie sie mit Foren oder Aufgaben, um den Lernprozess aktiv zu gestalten.", goals:{ info:{r:"gr\u00fcn",t:"Ja. Lehrende laden Dateien zur Information hoch."}, bewerten:{r:"rot",t:"Nein. Stattdessen: Kenntnisse \u00fcber Forum oder Aufgabe erfassen."}, komm:{r:"rot",t:"Nein. Keine direkte Option zur Interaktion oder Kommunikation."}, collab:{r:"rot",t:"Nein. Stattdessen: Foren, Wikis und Glossare nutzen."}, bloomG:{r:"rot",t:"Ist keine Lernaktivit\u00e4t, sondern reine Infovermittlung."}}},
  { id:"verzeichnis", name:"Verzeichnis", desc:"Eine Reihe von Dateien hochladen", complexity:"einfach", complexityText:"Einfach wie ein E-Mail Anhang. Aber machen Dateien alleine Sinn?", bloom:"1/6",setup:"einfach",setupText:"Ordner anlegen, Dateien einsortieren.",support:"gering",supportText:"Bei Änderungen Dateien ersetzen.", docsUrl:"https://docs.moodle.org/501/de/Verzeichnis", longDesc:"Ein Verzeichnis b\u00fcndelt mehrere Dateien in einem Ordner auf der Kursseite. Teilnehmende k\u00f6nnen den gesamten Ordner oder einzelne Dateien herunterladen. Das ist praktisch, wenn Sie eine Sammlung von Dokumenten zu einem Thema bereitstellen m\u00f6chten. Verzeichnisse halten die Kursseite \u00fcbersichtlich, wenn viele Dateien ben\u00f6tigt werden. Wie bei Einzeldateien ist keine direkte Interaktion m\u00f6glich \u2013 es ist ein reines Bereitstellungs-Tool.", goals:{ info:{r:"gr\u00fcn",t:"Ja. Dateien in Ordner hochladen ist Trainer/innensache."}, bewerten:{r:"rot",t:"Nein. Stattdessen: Kenntnisse \u00fcber Forum oder Aufgabe erfassen."}, komm:{r:"rot",t:"Nein. Keine direkte Option zur Interaktion."}, collab:{r:"orange",t:"Sammeln und Teilen von Dateien m\u00f6glich. Erfordert Rollenanpassung."}, bloomG:{r:"rot",t:"Ist keine Lernaktivit\u00e4t, sondern reine Infovermittlung."}}},
  { id:"textseite", name:"Textseite", desc:"Eine Seite mit Texten in Moodle erstellen", complexity:"einfach", complexityText:"Einfach. Text formatieren, Bilder und Videos erg\u00e4nzen.", bloom:"2/6",setup:"einfach",setupText:"Im Editor schreiben – wie ein Word-Dokument.",support:"gering",supportText:"Selten zu aktualisieren.", docsUrl:"https://docs.moodle.org/501/de/Textseite", longDesc:"Eine Textseite erm\u00f6glicht es, Inhalte direkt in Moodle zu erstellen \u2013 mit formatiertem Text, Bildern, Videos und Links. Im Gegensatz zur Datei m\u00fcssen Teilnehmende nichts herunterladen, sondern lesen alles direkt im Browser. Textseiten eignen sich f\u00fcr Einleitungen, Anleitungen oder kurze Informationseinheiten. Sie k\u00f6nnen multimedial angereichert werden und sind sofort sichtbar. F\u00fcr umfangreichere Inhalte empfiehlt sich die Aktivit\u00e4t \u00abBuch\u00bb.", goals:{ info:{r:"gr\u00fcn",t:"Ja. Nur Lehrende erstellen diese Seiten."}, bewerten:{r:"rot",t:"Nein. Stattdessen: Kenntnisse \u00fcber Forum oder Aufgabe erfassen."}, komm:{r:"rot",t:"Nein. Keine direkte Option zur Interaktion."}, collab:{r:"orange",t:"Gemeinsames Erstellen m\u00f6glich. Erfordert Rollenanpassung."}, bloomG:{r:"rot",t:"Ist keine Lernaktivit\u00e4t, sondern reine Infovermittlung."}}},
  { id:"buch", name:"Buch", desc:"Eine Reihe von Textseiten in Moodle erstellen", complexity:"einfach", complexityText:"Einfach. Text formatieren, Bilder und Videos erg\u00e4nzen.", bloom:"2/6",setup:"mittel",setupText:"Kapitelstruktur planen, dann befüllen.",support:"gering",supportText:"Selten zu aktualisieren.", docsUrl:"https://docs.moodle.org/501/de/Buch", longDesc:"Ein Buch besteht aus mehreren Textseiten mit Kapiteln und Unterkapiteln. Es eignet sich hervorragend f\u00fcr l\u00e4ngere, strukturierte Inhalte wie Skripte oder Leitf\u00e4den. Teilnehmende k\u00f6nnen zwischen den Seiten bl\u00e4ttern und das gesamte Buch ausdrucken. Das Buch bietet eine \u00fcbersichtliche Navigation \u00fcber ein Inhaltsverzeichnis. Es ist ein reines Lese-Material und enth\u00e4lt keine interaktiven Elemente.", goals:{ info:{r:"gr\u00fcn",t:"Gutes Tool zur Vermittlung von Informationen. Drucken m\u00f6glich."}, bewerten:{r:"rot",t:"Nein. Stattdessen: Lektion, Forum oder Aufgabe nutzen."}, komm:{r:"rot",t:"Nein. Keine direkte Option zur Interaktion."}, collab:{r:"orange",t:"Gemeinsames Erstellen m\u00f6glich. Erfordert Rollenanpassung."}, bloomG:{r:"rot",t:"Ist keine Lernaktivit\u00e4t, sondern reine Infovermittlung."}}},
  { id:"url", name:"URL", desc:"Link zu einer Webseite", complexity:"einfach", complexityText:"Einfach. Web-Adresse finden und einf\u00fcgen.", bloom:"2/6",setup:"einfach",setupText:"Link einfügen.",support:"gering",supportText:"Prüfen, ob Ziel-Link noch aktiv ist.", docsUrl:"https://docs.moodle.org/501/de/URL/Link", longDesc:"Mit der Ressource URL verlinken Sie externe Webseiten direkt von der Kursseite. Das k\u00f6nnen Artikel, Videos, Online-Tools oder andere Lernressourcen sein. Teilnehmende gelangen per Klick zur verlinkten Seite. URLs eignen sich ideal, um externe Inhalte nahtlos in Ihren Kurs einzubinden. Die didaktischen M\u00f6glichkeiten h\u00e4ngen vom verlinkten Inhalt ab \u2013 von einfacher Information bis hin zu komplexen Lernszenarien.", goals:{ info:{r:"gr\u00fcn",t:"Komfortable M\u00f6glichkeit, externe Infos bereitzustellen."}, bewerten:{r:"orange",t:"Nicht direkt. Verlinkung auf externe Pr\u00fcfungstools."}, komm:{r:"orange",t:"Nicht direkt. Verlinkung auf externe Kommunikationstools."}, collab:{r:"orange",t:"Nicht direkt. Verlinkung auf externe Kooperationswerkzeuge."}, bloomG:{r:"gr\u00fcn",t:"6/6 m\u00f6glich. Abh\u00e4ngig vom Inhalt der verlinkten Seite."}}},
  { id:"wiki", name:"Wiki", desc:"Gemeinsam in der Gruppe Texte erstellen", complexity:"mittel", complexityText:"Erfordert Auseinandersetzung mit Wikiprinzip.", bloom:"6/6",setup:"mittel",setupText:"Erstanlage einfach, Aufbau planen.",support:"hoch",supportText:"Beiträge moderieren, Versionen prüfen.", docsUrl:"https://docs.moodle.org/501/de/Wiki", longDesc:"Das Wiki erm\u00f6glicht kooperatives Schreiben: Teilnehmende erstellen und bearbeiten gemeinsam Textseiten mit Verlinkungen. Es funktioniert nach dem Wikipedia-Prinzip \u2013 jeder kann Inhalte beitragen und \u00e4ndern. Die Versionshistorie dokumentiert alle \u00c4nderungen transparent. Wikis eignen sich f\u00fcr Gruppenreferate, Wissenssammlungen oder Projektdokumentationen. Der Einstieg erfordert etwas Einarbeitung, bietet dann aber gro\u00dfe Flexibilit\u00e4t.", goals:{ info:{r:"gr\u00fcn",t:"Ja. Als Info-Seite nutzen. Bearbeiten durch alle im Kurs."}, bewerten:{r:"gr\u00fcn",t:"Flexibel einsetzbar, z.B. Bewertung der erstellten Wiki-Inhalte."}, komm:{r:"orange",t:"Teilweise f\u00fcr Diskussionen geeignet. Kommentare zu Wiki-Inhalten."}, collab:{r:"gr\u00fcn",t:"Ja. Teilnehmende k\u00f6nnen kooperativ arbeiten und diskutieren."}, bloomG:{r:"gr\u00fcn",t:"6/6 m\u00f6glich. Abh\u00e4ngig vom Einsatzszenario."}}},
  { id:"glossar", name:"Glossar", desc:"Informationen pr\u00e4sentieren und gemeinsam erstellen", complexity:"einfach", complexityText:"Einfach. Kann flexibel eingestellt werden.", bloom:"4/6",setup:"einfach",setupText:"Anlegen, Felder wählen.",support:"mittel",supportText:"Einträge sichten, ggf. freischalten.", docsUrl:"https://docs.moodle.org/501/de/Glossar", longDesc:"Im Glossar k\u00f6nnen Lehrende und Teilnehmende Fachbegriffe mit Definitionen sammeln. Eintr\u00e4ge werden automatisch im gesamten Kurs verlinkt, wenn der Begriff auftaucht. Teilnehmende k\u00f6nnen eigene Eintr\u00e4ge verfassen und die anderer kommentieren. Das Glossar eignet sich f\u00fcr Begriffssammlungen, FAQ-Listen oder als gemeinsam erstelltes Nachschlagewerk. Eintr\u00e4ge k\u00f6nnen bewertet werden, was es auch als Lernaktivit\u00e4t nutzbar macht.", goals:{ info:{r:"gr\u00fcn",t:"Glossar f\u00fcr Begriffsdefinitionen."}, bewerten:{r:"gr\u00fcn",t:"Glossareintr\u00e4ge erstellen lassen und dann bewerten."}, komm:{r:"orange",t:"Teilweise. Eintr\u00e4ge k\u00f6nnen kommentiert werden."}, collab:{r:"orange",t:"Autor/in kann bearbeiten. Teilnehmende kommentieren."}, bloomG:{r:"gr\u00fcn",t:"6/6 m\u00f6glich. Abh\u00e4ngig vom Einsatzszenario."}}},
  { id:"datenbank", name:"Datenbank", desc:"Materialien sammeln, teilen & suchen", complexity:"komplex", complexityText:"Schwierig anzulegen. Vorher Aufbau planen!", bloom:"5/6",setup:"komplex",setupText:"Felder im Detail planen und definieren.",support:"mittel",supportText:"Einträge moderieren, Sammlung pflegen.", docsUrl:"https://docs.moodle.org/501/de/Datenbank", longDesc:"Die Datenbank-Aktivit\u00e4t erm\u00f6glicht es, strukturierte Eintr\u00e4ge mit frei definierbaren Feldern zu sammeln. Teilnehmende k\u00f6nnen Texte, Bilder, Dateien und Links in einem einheitlichen Format eintragen. Alle Eintr\u00e4ge sind durchsuchbar und k\u00f6nnen kommentiert und bewertet werden. Die Datenbank eignet sich f\u00fcr Materialsammlungen, Steckbriefe oder Projektportfolios. Die Einrichtung erfordert Planung, bietet daf\u00fcr aber sehr flexible Einsatzm\u00f6glichkeiten.", goals:{ info:{r:"orange",t:"Lehrende k\u00f6nnen Material pr\u00e4sentieren. Besser: TN tragen Daten ein."}, bewerten:{r:"gr\u00fcn",t:"Ja. Inhalte k\u00f6nnen bewertet werden. Flexibel einsetzbar."}, komm:{r:"orange",t:"Teilweise. Eintr\u00e4ge k\u00f6nnen kommentiert werden."}, collab:{r:"orange",t:"Autor/in kann bearbeiten. Teilnehmende kommentieren."}, bloomG:{r:"gr\u00fcn",t:"6/6 m\u00f6glich. Abh\u00e4ngig vom Einsatzszenario."}}},
  { id:"umfrage", name:"Umfrage", desc:"Befragung mit vordefinierten Fragen", complexity:"einfach", complexityText:"Einfach. Aus 3 Typen w\u00e4hlen.", bloom:"2/6",setup:"einfach",setupText:"Vorlage wählen, fertig.",support:"gering",supportText:"Keine Pflege – Auswertung am Ende.", docsUrl:"https://docs.moodle.org/501/de/Umfrage", longDesc:"Die Umfrage bietet drei vordefinierte, wissenschaftlich validierte Frageb\u00f6gen zur Evaluation von Lernumgebungen. Sie erfasst, wie Teilnehmende das Lernklima und den Unterricht wahrnehmen. Die Ergebnisse helfen Lehrenden, ihren Kurs zu verbessern. Im Gegensatz zum Feedback k\u00f6nnen die Fragen nicht ver\u00e4ndert werden. Die Umfrage eignet sich besonders zur Reflexion des Lernprozesses und zur Kursoptimierung.", goals:{ info:{r:"rot",t:"Nein. Die Umfrage ist ungeeignet zur Informationsverteilung."}, bewerten:{r:"rot",t:"Eher nicht. Besser zur Evaluation des Kurses."}, komm:{r:"rot",t:"Nein. Nur Einweg-Kommunikation: TN an Lehrende."}, collab:{r:"rot",t:"Nein. Rein individuelle Aktivit\u00e4t."}, bloomG:{r:"orange",t:"Hilft Teilnehmenden Lernprozess zu reflektieren."}}},
  { id:"feedback", name:"Feedback", desc:"Erstelle selbst Evaluationsfrageb\u00f6gen", complexity:"einfach", complexityText:"Einfach in Bedienung. Zeitaufwand f\u00fcr Fragen.", bloom:"3/6",setup:"mittel",setupText:"Fragen formulieren kostet Zeit.",support:"gering",supportText:"Auswertung am Ende.", docsUrl:"https://docs.moodle.org/501/de/Feedback", longDesc:"Mit der Feedback-Aktivit\u00e4t erstellen Sie eigene Frageb\u00f6gen mit frei definierbaren Fragen. Sie k\u00f6nnen Multiple-Choice, Textfelder, Bewertungsskalen und mehr einsetzen. Die Antworten k\u00f6nnen anonym oder namentlich erfasst werden. Feedback eignet sich hervorragend f\u00fcr Kursevaluationen, Erwartungsabfragen oder Stimmungsbilder. Im Gegensatz zur Umfrage haben Sie volle Kontrolle \u00fcber die Fragestellungen.", goals:{ info:{r:"rot",t:"Nein. Nicht zur Informationsverteilung vorgesehen."}, bewerten:{r:"rot",t:"Nein. Evaluationen generieren Feedback f\u00fcr Lehrende."}, komm:{r:"rot",t:"Nein. Nur Einweg-Kommunikation."}, collab:{r:"rot",t:"Nein. Rein individuelle Aktivit\u00e4t."}, bloomG:{r:"orange",t:"Kann kreativ gestaltet werden."}}},
  { id:"abstimmung", name:"Abstimmung", desc:"Teilnehmende stimmen \u00fcber eine Frage ab", complexity:"einfach", complexityText:"Einfach. Frage(n) und Antworten anlegen.", bloom:"1/6",setup:"einfach",setupText:"Frage und Optionen eintippen.",support:"gering",supportText:"Keine Pflege nötig.", docsUrl:"https://docs.moodle.org/501/de/Abstimmung", longDesc:"Die Abstimmung stellt eine einzelne Frage mit vorgegebenen Antwortm\u00f6glichkeiten. Teilnehmende w\u00e4hlen eine Option, die Ergebnisse werden als Balkendiagramm angezeigt. Sie eignet sich f\u00fcr schnelle Meinungsbilder, Terminabsprachen oder Gruppeneinteilungen. Die Einrichtung dauert nur wenige Minuten. F\u00fcr komplexere Befragungen mit mehreren Fragen nutzen Sie besser die Feedback-Aktivit\u00e4t.", goals:{ info:{r:"rot",t:"Nein. Haupts\u00e4chlich zur schnellen Abfrage zu einem Thema."}, bewerten:{r:"gr\u00fcn",t:"Als Schnellabfrage einer Fragestellung verwenden."}, komm:{r:"rot",t:"Nein. Besser Forum oder Chat nutzen."}, collab:{r:"rot",t:"Nein. Besser Forum, Glossar oder Wiki nutzen."}, bloomG:{r:"orange",t:"Erlaubt einfache Abfrage von Wissen und Verst\u00e4ndnis."}}},
  { id:"test", name:"Test", desc:"Testfragen mit automatischer Bewertung", complexity:"mittel", complexityText:"Zeitaufwand beim Erstellen. Auswertung automatisch.", bloom:"4/6",setup:"komplex",setupText:"Fragenpool aufbauen, Konfiguration durchdenken.",support:"mittel",supportText:"Ergebnisse sichten, Probleme klären.", docsUrl:"https://docs.moodle.org/501/de/Test", longDesc:"Der Test ist das zentrale Pr\u00fcfungswerkzeug in Moodle mit \u00fcber 15 Fragetypen \u2013 von Multiple-Choice \u00fcber L\u00fcckentext bis Zuordnung. Die Auswertung erfolgt automatisch mit sofortigem Feedback an die Teilnehmenden. Tests k\u00f6nnen zeitgesteuert, mit Zufallsfragen und mehreren Versuchen konfiguriert werden. Sie eignen sich f\u00fcr Selbsttests, \u00dcbungen und formale Pr\u00fcfungen gleicherma\u00dfen. Der Fragenpool erm\u00f6glicht die Wiederverwendung von Fragen \u00fcber Kurse hinweg.", goals:{ info:{r:"rot",t:"Zielt auf Bewertung, nicht Verteilung von Informationen."}, bewerten:{r:"gr\u00fcn",t:"Ja. F\u00fcr Fragen mit eindeutiger Antwort. Automatisch."}, komm:{r:"rot",t:"Nein. Besser Forum oder Chat nutzen."}, collab:{r:"rot",t:"Nein. Besser Forum oder Wiki nutzen."}, bloomG:{r:"gr\u00fcn",t:"Durch kreativen Umgang vielf\u00e4ltig einsetzbar."}}},
  { id:"lektion", name:"Lektion", desc:"Informationen und Testfragen seitenweise aufbauen", complexity:"mittel", complexityText:"Erfordert Planung, dann effektive Lernaktivit\u00e4t.", bloom:"4/6",setup:"komplex",setupText:"Verzweigungslogik sorgfältig planen.",support:"gering",supportText:"Nach Aufbau weitgehend selbstläufig.", docsUrl:"https://docs.moodle.org/501/de/Lektion", longDesc:"Die Lektion pr\u00e4sentiert Inhalte auf einzelnen Seiten und verkn\u00fcpft sie mit Testfragen. Je nach Antwort werden Teilnehmende zu verschiedenen Seiten weitergeleitet \u2013 ein verzweigter Lernpfad entsteht. So k\u00f6nnen Sie adaptives Lernen umsetzen, bei dem der Weg vom Wissensstand abh\u00e4ngt. Lektionen eignen sich f\u00fcr gef\u00fchrte Lerneinheiten mit integrierten Verst\u00e4ndnispr\u00fcfungen. Die Erstellung erfordert Planung, ergibt aber eine sehr effektive Lernaktivit\u00e4t.", goals:{ info:{r:"gr\u00fcn",t:"Gut geeignet f\u00fcr gef\u00fchrte Informationspr\u00e4sentation."}, bewerten:{r:"gr\u00fcn",t:"Ja, erlaubt Bewertung durch integrierte Testfragen."}, komm:{r:"rot",t:"Nein. Teilnehmende arbeiten einzeln."}, collab:{r:"rot",t:"Nein. Teilnehmende arbeiten einzeln."}, bloomG:{r:"gr\u00fcn",t:"Durch kreativen Umgang vielf\u00e4ltig einsetzbar."}}},
  { id:"aufgabe", name:"Aufgabe", desc:"Aufgabenstellung mit individueller Bewertung", complexity:"einfach", complexityText:"Einfach. Auswahl aus vier Aufgabentypen.", bloom:"6/6",setup:"einfach",setupText:"Abgabetyp und Frist festlegen.",support:"hoch",supportText:"Bewertung und Feedback pro Abgabe.", docsUrl:"https://docs.moodle.org/501/de/Aufgabe", longDesc:"Die Aufgabe ist das vielseitigste Bewertungswerkzeug in Moodle. Teilnehmende reichen Texte, Dateien oder Medien ein, die Sie individuell mit Note und Kommentar bewerten. Vier Abgabetypen stehen zur Verf\u00fcgung: Dateiabgabe, Onlinetext, Audio-/Videoaufnahme. Abgabefristen, Verl\u00e4ngerungen und Gruppenabgaben sind konfigurierbar. Die Aufgabe eignet sich f\u00fcr Essays, Projektarbeiten, Pr\u00e4sentationen und jede Form individueller Leistungsnachweise.", goals:{ info:{r:"rot",t:"Nein. Kann aber Inhalte f\u00fcr Aufgabenstellung enthalten."}, bewerten:{r:"gr\u00fcn",t:"Ja. Individuelle Bewertung mit Note und Kommentar."}, komm:{r:"rot",t:"Wenig Interaktion. Au\u00dfer: wiederholte Abgabe mit Feedback."}, collab:{r:"orange",t:"Gruppenmitglied gibt stellvertretend L\u00f6sung ab."}, bloomG:{r:"gr\u00fcn",t:"Abh\u00e4ngig von Aufgabenformulierung und Beurteilungsform."}}},
  { id:"beurteilung", name:"Gegenseitige Beurteilung", desc:"Aufgabe mit Peer-Feedback", complexity:"komplex", complexityText:"Erfordert sorgf\u00e4ltige Planung.", bloom:"5/6",setup:"komplex",setupText:"Phasen, Kriterien und Bewertungsraster planen.",support:"hoch",supportText:"Phasen aktiv begleiten und steuern.", docsUrl:"https://docs.moodle.org/501/de/Gegenseitige_Beurteilung", longDesc:"Die Gegenseitige Beurteilung (Workshop) kombiniert Aufgabenabgabe mit Peer-Review. Teilnehmende reichen zun\u00e4chst eigene Arbeiten ein und bewerten anschlie\u00dfend die Einreichungen anderer nach vorgegebenen Kriterien. Dieser Prozess f\u00f6rdert kritisches Denken und Reflexion. Die Endbewertung setzt sich aus Peer- und Trainer-Bewertung zusammen. Die Einrichtung ist anspruchsvoll, bietet aber ein p\u00e4dagogisch sehr wertvolles Lernszenario.", goals:{ info:{r:"rot",t:"Nein. Ein anderes Tool verwenden."}, bewerten:{r:"gr\u00fcn",t:"Ja. Peer-Bewertung. TN beurteilen L\u00f6sungen anderer."}, komm:{r:"rot",t:"Nein. Erlaubt nur Feedback, keine Kommunikation."}, collab:{r:"rot",t:"Nein. F\u00fcr Gruppenaufgaben Forum oder Wiki nutzen."}, bloomG:{r:"gr\u00fcn",t:"Abh\u00e4ngig von Aufgabenformulierung und Beurteilungsform."}}},
  { id:"lernpaket", name:"Lernpaket", desc:"Lerninhalte im Format SCORM einbinden", complexity:"komplex", complexityText:"Erfordert Software oder Kauf von Inhalten.", bloom:"4/6",setup:"komplex",setupText:"SCORM-Inhalte mit externer Software erstellen.",support:"gering",supportText:"Nach Einbinden weitgehend selbstläufig.", docsUrl:"https://docs.moodle.org/501/de/Lernpaket", longDesc:"Lernpakete binden extern erstellte SCORM- oder AICC-Inhalte in Moodle ein. Diese interaktiven Lernmodule werden mit Autorentools wie Articulate, Captivate oder iSpring erstellt. Der Lernfortschritt und Ergebnisse werden automatisch an Moodle zur\u00fcckgemeldet. Lernpakete eignen sich f\u00fcr multimediale, interaktive Selbstlerneinheiten. Die Einbindung ist einfach, die Erstellung der Inhalte erfordert jedoch spezielle Software.", goals:{ info:{r:"gr\u00fcn",t:"Ja. Gut geeignet f\u00fcr Informationsvermittlung."}, bewerten:{r:"gr\u00fcn",t:"Ja, Bewertungen k\u00f6nnen integriert sein."}, komm:{r:"rot",t:"Nein. Teilnehmende arbeiten einzeln."}, collab:{r:"rot",t:"Nein. Teilnehmende arbeiten einzeln."}, bloomG:{r:"gr\u00fcn",t:"Durch kreativen Umgang vielf\u00e4ltig einsetzbar."}}},
  { id:"chat", name:"Chat", desc:"Echtzeit Text-Chat mit Teilnehmenden", complexity:"einfach", complexityText:"Einfach. Erfordert Moderation, kleine Gruppen.", bloom:"3/6",setup:"einfach",setupText:"Aktivität anlegen, Termin festlegen.",support:"hoch",supportText:"Live moderieren während der Sitzung.", docsUrl:"https://docs.moodle.org/501/de/Chat", longDesc:"Der Chat erm\u00f6glicht synchrone Textgespr\u00e4che in Echtzeit zwischen Kursteilnehmenden. Er eignet sich f\u00fcr Sprechstunden, Gruppendiskussionen oder spontanen Austausch in kleinen Gruppen. Chatverl\u00e4ufe werden protokolliert und k\u00f6nnen sp\u00e4ter eingesehen werden. Eine Moderation ist empfehlenswert, um den Gespr\u00e4chsverlauf zu steuern. F\u00fcr gr\u00f6\u00dfere Gruppen oder asynchrone Kommunikation ist das Forum besser geeignet.", goals:{ info:{r:"orange",t:"Erfordert Anwesenheit zum Zeitpunkt des Chats."}, bewerten:{r:"orange",t:"Chatbeitr\u00e4ge k\u00f6nnen wie m\u00fcndliche Mitarbeit bewertet werden."}, komm:{r:"gr\u00fcn",t:"Ja. Diskussionen in kleinen Gruppen oder Fragestunden."}, collab:{r:"gr\u00fcn",t:"Ja. Teilnehmende k\u00f6nnen zusammen arbeiten und diskutieren."}, bloomG:{r:"gr\u00fcn",t:"Kann mit kleinen Gruppen kreativ genutzt werden."}}},
  { id:"forum", name:"Forum", desc:"F\u00fcr vielf\u00e4ltige Lernstrategien verwendbar", complexity:"einfach", complexityText:"Einfach. Titel und Beschreibung gen\u00fcgen.", bloom:"5/6",setup:"einfach",setupText:"Forumtyp wählen, Titel vergeben.",support:"hoch",supportText:"Beiträge moderieren und beantworten.", docsUrl:"https://docs.moodle.org/501/de/Forum", longDesc:"Das Forum ist das vielseitigste Kommunikationswerkzeug in Moodle. Es erm\u00f6glicht zeitversetzte Diskussionen, in denen Teilnehmende Beitr\u00e4ge verfassen, aufeinander antworten und Dateien anh\u00e4ngen. Verschiedene Forentypen stehen zur Verf\u00fcgung \u2013 vom Nachrichtenforum bis zur offenen Diskussion. Beitr\u00e4ge k\u00f6nnen per E-Mail-Benachrichtigung verfolgt und sogar bewertet werden. Foren eignen sich f\u00fcr Ank\u00fcndigungen, Peer-Learning, Reflexion und kooperatives Arbeiten.", goals:{ info:{r:"gr\u00fcn",t:"Ja. Nachrichtenforum und Mail-Benachrichtigung."}, bewerten:{r:"orange",t:"Jein. Beitr\u00e4ge k\u00f6nnen f\u00fcr einen Zeitraum bewertet werden."}, komm:{r:"gr\u00fcn",t:"Ja. Zeitversetzte Kommunikation. Kursgruppen nutzbar."}, collab:{r:"gr\u00fcn",t:"Ja. TN tauschen sich beim Erstellen von Inhalten aus."}, bloomG:{r:"gr\u00fcn",t:"Kann auch mit gro\u00dfen Gruppen kreativ genutzt werden."}}},
  { id:"extern", name:"Externes Tool", desc:"Externe Lernaktivit\u00e4t verbinden (LTI)", complexity:"komplex", complexityText:"Erfordert Zugangsdaten zu externen Anbietern.", bloom:"4/6",setup:"komplex",setupText:"Zugangsdaten/LTI-Konfig vom Anbieter nötig.",support:"gering",supportText:"Funktion gelegentlich prüfen.", docsUrl:"https://docs.moodle.org/501/de/Externes_Tool", longDesc:"Das Externe Tool verbindet Moodle \u00fcber den LTI-Standard mit externen Lernplattformen und Diensten. So k\u00f6nnen Teilnehmende direkt aus Moodle heraus auf externe Tools zugreifen \u2013 ohne separaten Login. Bewertungen k\u00f6nnen automatisch nach Moodle zur\u00fcck\u00fcbertragen werden. Typische Einsatzgebiete sind Simulationen, Labore, Verlagsinhalte oder spezialisierte Lerntools. Die Einrichtung erfordert technische Konfiguration und Zugangsdaten vom Anbieter.", goals:{ info:{r:"orange",t:"Abh\u00e4ngig vom verbundenen Tool."}, bewerten:{r:"orange",t:"Bewertungen k\u00f6nnen nach Moodle \u00fcbertragen werden."}, komm:{r:"orange",t:"Abh\u00e4ngig vom verbundenen Tool."}, collab:{r:"orange",t:"Abh\u00e4ngig vom verbundenen Tool."}, bloomG:{r:"orange",t:"H\u00e4ngt vom verbundenen Tool ab."}}},
  { id:"h5p", name:"H5P", desc:"Werkzeuge f\u00fcr interaktive Inhalte", complexity:"einfach", complexityText:"Einfache Bedienung durch Formulare.", bloom:"5/6",setup:"mittel",setupText:"Inhaltstyp wählen, im Editor befüllen.",support:"gering",supportText:"Keine Pflege im laufenden Betrieb.", docsUrl:"https://docs.moodle.org/501/de/H5P-Aktivit%C3%A4t", longDesc:"H5P bietet \u00fcber 40 interaktive Inhaltstypen direkt in Moodle \u2013 von interaktiven Videos \u00fcber Zeitstrahlen bis zu Drag-and-Drop-Aufgaben. Die Erstellung erfolgt \u00fcber intuitive Formulare ohne Programmierkenntnisse. Bewertungen werden automatisch erfasst und an das Moodle-Bewertungssystem \u00fcbergeben. H5P-Inhalte sind responsiv und funktionieren auf allen Ger\u00e4ten. Es ist eines der vielseitigsten Werkzeuge f\u00fcr interaktive und ansprechende Lernerfahrungen.", goals:{ info:{r:"gr\u00fcn",t:"Ja. Gute Visualisierung von Informationen."}, bewerten:{r:"gr\u00fcn",t:"Ja. Automatische Bewertung."}, komm:{r:"rot",t:"Nein. Keine Kommunikation m\u00f6glich."}, collab:{r:"rot",t:"Nein. Teilnehmende arbeiten einzeln."}, bloomG:{r:"gr\u00fcn",t:"Vielf\u00e4ltige Unterst\u00fctzung von Lernszenarien."}}},
  { id:"bbb", name:"BigBlueButton", desc:"Videokonferenz, Whiteboard, Chat", complexity:"einfach", complexityText:"Einfache Bedienung.", bloom:"5/6",setup:"einfach",setupText:"Termin anlegen, Raum konfigurieren.",support:"hoch",supportText:"Live moderieren, Aufzeichnungen verwalten.", docsUrl:"https://docs.moodle.org/501/de/BigBlueButton", longDesc:"BigBlueButton ist ein vollwertiges Videokonferenzsystem, das direkt in Moodle integriert ist. Es bietet Live-Video, Bildschirmfreigabe, interaktives Whiteboard, Umfragen und Breakout-R\u00e4ume. Sitzungen k\u00f6nnen aufgezeichnet und sp\u00e4ter im Kurs bereitgestellt werden. BigBlueButton eignet sich f\u00fcr Vorlesungen, Seminare, Sprechstunden und Gruppenarbeit. Die Bedienung ist einfach \u2013 ein Klick gen\u00fcgt, um einer Konferenz beizutreten.", goals:{ info:{r:"gr\u00fcn",t:"Ja. Vortr\u00e4ge und Pr\u00e4sentationen werden live gehalten."}, bewerten:{r:"orange",t:"Begrenzt: Geeignet f\u00fcr Einzel-/Kleingruppenpr\u00fcfungen."}, komm:{r:"gr\u00fcn",t:"Ja. Gespr\u00e4che, Videocalls, Chats m\u00f6glich."}, collab:{r:"gr\u00fcn",t:"Ja, mittels Whiteboard und gemeinsamen Notizen."}, bloomG:{r:"gr\u00fcn",t:"Vielf\u00e4ltige Unterst\u00fctzung von Lernszenarien."}}},
  { id:"board", name:"Board", desc:"Visuelle Pinnwand mit Spalten und Karten", complexity:"einfach", complexityText:"Sticky-Note-Style.", bloom:"3/6",setup:"einfach",setupText:"Spalten definieren, fertig in 5 Minuten.",support:"gering",supportText:"Gelegentlich aufräumen, ggf. Beiträge moderieren.", docsUrl:"https://moodle.org/plugins/mod_board", longDesc:"Board ist eine visuelle Pinnwand im Stil von Padlet oder Trello. Lehrende legen Spalten an, Lernende posten Karten mit Text, Bildern, Links oder Videos. Karten können verschoben, geliket und kommentiert werden. Board ist niedrigschwellig, optisch ansprechend und ideal für Brainstorming, Erwartungsabfragen, Sammlung von Beispielen oder kollektive Wissensbasen. Es ersetzt externe Tools wie Padlet datenschutzkonform direkt in Moodle.", goals:{ info:{r:"grün",t:"Ja. Sammlung von Quellen, Bildern, Links als visuelle Wissensbasis."}, bewerten:{r:"orange",t:"Teilweise. Likes möglich, keine echte Bewertungslogik."}, komm:{r:"grün",t:"Ja. Brainstorming, Erwartungsabfrage, kollektive Sammlung – niedrigschwellig und visuell."}, collab:{r:"grün",t:"Ja. Klassisches Sticky-Note-Format für kollaboratives Sammeln und Strukturieren."}, bloomG:{r:"grün",t:"3/6 typisch (Anwenden), bei strukturierenden Aufgaben bis Stufe 4 (Analysieren)."}}},
  { id:"anwesenheit", name:"Anwesenheit", desc:"Anwesenheit der Lernenden pro Sitzung erfassen", complexity:"mittel", complexityText:"Verwaltungswerkzeug.", bloom:"1/6",setup:"mittel",setupText:"Sitzungsserie anlegen, Statusoptionen konfigurieren.",support:"mittel",supportText:"Pro Sitzung Anwesenheit erfassen oder Selbsteintrag prüfen.", docsUrl:"https://moodle.org/plugins/mod_attendance", longDesc:"Anwesenheit ist das Standard-Plugin für Anwesenheitsverwaltung in Moodle. Lehrende planen Sitzungen (einmalig oder als Serie), erfassen pro Sitzung den Status der Lernenden (anwesend, verspätet, entschuldigt, fehlend) oder lassen die Lernenden sich selbst eintragen. Reports zeigen die Bilanz pro Person und Kurs. Die Anwesenheit kann gewichtet in die Gesamtbewertung einfließen – ideal für Präsenzkurse, Blended Learning und förderliche Anwesenheitspflicht.", goals:{ info:{r:"orange",t:"Teilweise. Lernende sehen ihre eigene Anwesenheitsbilanz als Information."}, bewerten:{r:"grün",t:"Ja. Anwesenheit kann in die Gesamtbewertung einfließen, Reports für Lehrkraft."}, komm:{r:"rot",t:"Nein. Reines Verwaltungswerkzeug ohne Kommunikationsfunktion."}, collab:{r:"rot",t:"Nein. Keine kollaborative Funktion."}, bloomG:{r:"orange",t:"1/6 – administratives Tool, kein direktes Lernziel."}}},
  { id:"lerntagebuch", name:"Lerntagebuch", desc:"Privates Reflexionstagebuch zwischen Lernender und Lehrkraft", complexity:"einfach", complexityText:"Vertraulicher Dialog.", bloom:"5/6",setup:"einfach",setupText:"Aktivität anlegen, Reflexionsfrage formulieren.",support:"hoch",supportText:"Jeder Eintrag braucht persönliches, qualifiziertes Feedback.", docsUrl:"https://moodle.org/plugins/mod_diary", longDesc:"Das Lerntagebuch (Diary / Journal) ist eine bewusst private Aktivität: Lernende schreiben Einträge zu Reflexionsfragen oder zum eigenen Lernfortschritt, nur die Lehrkraft sieht den Eintrag und kommentiert. Es fördert Metakognition und Selbstreflexion und erlaubt qualitatives, individuelles Feedback. Geeignet für Lernprozessbegleitung, Praxisphasen, Coaching und alle Settings, in denen persönliche Auseinandersetzung wichtiger ist als ein gemeinsames Produkt.", goals:{ info:{r:"orange",t:"Teilweise. Eher Reflexion eigener Lernerfahrung als Wissensvermittlung."}, bewerten:{r:"grün",t:"Ja. Bewertung von Reflexionstiefe, qualitatives Feedback durch Lehrkraft."}, komm:{r:"grün",t:"Ja. 1:1-Dialog zwischen Lernender und Lehrkraft, vertraulich."}, collab:{r:"rot",t:"Nein. Bewusst privat – keine Sichtbarkeit für andere Lernende."}, bloomG:{r:"grün",t:"5/6 (Bewerten / Reflektieren). Hohe metakognitive Anforderung."}}},
];

// ============================================================================
// Activity content translations (DE is the source — see TOOLS above)
// Field names mirror TOOLS; goals values are the goal-explanation strings (`t`).
// Missing keys fall back to the German source via localizeTool().
// ============================================================================
const TOOL_TRANSLATIONS = {
  en: {
    datei: { name:"File", desc:"Upload a file (e.g. Word, PDF, PowerPoint)", complexityText:"As simple as an email attachment. But do files alone make sense?", docsUrl:"https://docs.moodle.org/501/en/File", longDesc:"The File resource lets you provide course participants with individual files to download – PDFs, Word documents, presentations or images. The file appears directly on the course page and can be opened or downloaded with one click. Files are particularly suitable for handouts, worksheets and supporting materials. Note that files alone do not enable interaction. Combine them with forums or assignments to make the learning process active.", goals:{ info:"Yes. Teachers upload files to share information.", bewerten:"No. Use a forum or assignment to capture knowledge instead.", komm:"No. No direct option for interaction or communication.", collab:"No. Use forums, wikis or glossaries instead.", bloomG:"Not a learning activity – pure information delivery." }},
    verzeichnis: { name:"Folder", desc:"Upload a set of files", complexityText:"As simple as an email attachment. But do files alone make sense?", docsUrl:"https://docs.moodle.org/501/en/Folder_resource", longDesc:"A Folder bundles several files into a single folder on the course page. Participants can download the entire folder or individual files. This is useful when you want to provide a collection of documents on one topic. Folders keep the course page tidy when many files are needed. As with single files, no direct interaction is possible – it is a pure delivery tool.", goals:{ info:"Yes. Uploading files into a folder is a teacher's job.", bewerten:"No. Use a forum or assignment to capture knowledge instead.", komm:"No. No direct option for interaction.", collab:"Collecting and sharing files is possible. Requires role adjustment.", bloomG:"Not a learning activity – pure information delivery." }},
    textseite: { name:"Page", desc:"Create a page with text inside Moodle", complexityText:"Easy. Format text, add images and videos.", docsUrl:"https://docs.moodle.org/501/en/Page_resource", longDesc:"A Page lets you create content directly inside Moodle – with formatted text, images, videos and links. Unlike with a File, participants do not have to download anything; they read everything directly in the browser. Pages are well suited for introductions, instructions or short information units. They can be enriched with multimedia and are visible immediately. For more extensive content, use the Book activity.", goals:{ info:"Yes. Only teachers create these pages.", bewerten:"No. Use a forum or assignment to capture knowledge instead.", komm:"No. No direct option for interaction.", collab:"Joint creation is possible. Requires role adjustment.", bloomG:"Not a learning activity – pure information delivery." }},
    buch: { name:"Book", desc:"Create a series of pages in Moodle", complexityText:"Easy. Format text, add images and videos.", docsUrl:"https://docs.moodle.org/501/en/Book_resource", longDesc:"A Book consists of several pages organised into chapters and subchapters. It is excellent for longer, structured content such as scripts or guidelines. Participants can navigate between pages and print the entire book. The book provides clear navigation through a table of contents. It is a pure reading material and contains no interactive elements.", goals:{ info:"A good tool for delivering information. Printing is possible.", bewerten:"No. Use a Lesson, forum or assignment instead.", komm:"No. No direct option for interaction.", collab:"Joint creation is possible. Requires role adjustment.", bloomG:"Not a learning activity – pure information delivery." }},
    url: { name:"URL", desc:"Link to a web page", complexityText:"Easy. Find a web address and paste it.", docsUrl:"https://docs.moodle.org/501/en/URL_resource", longDesc:"With the URL resource you link external web pages directly from the course page. These can be articles, videos, online tools or other learning resources. Participants reach the linked page with one click. URLs are ideal for embedding external content seamlessly into your course. The didactic possibilities depend on the linked content – from simple information to complex learning scenarios.", goals:{ info:"A convenient way to provide external information.", bewerten:"Not directly. Link to external assessment tools.", komm:"Not directly. Link to external communication tools.", collab:"Not directly. Link to external collaboration tools.", bloomG:"6/6 possible. Depends on the content of the linked page." }},
    wiki: { name:"Wiki", desc:"Co-create texts as a group", complexityText:"Requires getting used to the wiki principle.", docsUrl:"https://docs.moodle.org/501/en/Wiki_activity", longDesc:"The Wiki enables collaborative writing: participants jointly create and edit pages with cross-links. It works on the Wikipedia principle – anyone can contribute and change content. The version history transparently documents all changes. Wikis are well suited for group reports, knowledge collections or project documentation. Getting started requires some onboarding but then offers great flexibility.", goals:{ info:"Yes. Use as an info page – editable by everyone in the course.", bewerten:"Flexible, e.g. grading the wiki content created.", komm:"Partly suitable for discussions. Comments on wiki content.", collab:"Yes. Participants can work together and discuss.", bloomG:"6/6 possible. Depends on the use case." }},
    glossar: { name:"Glossary", desc:"Present and co-create reference content", complexityText:"Easy. Can be configured flexibly.", docsUrl:"https://docs.moodle.org/501/en/Glossary_activity", longDesc:"In the Glossary, teachers and participants can collect technical terms with definitions. Entries are automatically linked across the course wherever the term appears. Participants can write their own entries and comment on those of others. The glossary is suitable for term collections, FAQ lists or as a co-created reference work. Entries can be rated, which makes it usable as a learning activity too.", goals:{ info:"Glossary for term definitions.", bewerten:"Have participants create entries and rate them.", komm:"Partly. Entries can be commented on.", collab:"Authors can edit, participants can comment.", bloomG:"6/6 possible. Depends on the use case." }},
    datenbank: { name:"Database", desc:"Collect, share & search materials", complexityText:"Difficult to set up. Plan the structure first!", docsUrl:"https://docs.moodle.org/501/en/Database_activity", longDesc:"The Database activity allows you to collect structured entries with freely definable fields. Participants can enter texts, images, files and links in a uniform format. All entries are searchable and can be commented on and rated. The database is suitable for material collections, profiles or project portfolios. Setup requires planning but in return offers very flexible use cases.", goals:{ info:"Teachers can present material. Better: participants enter data.", bewerten:"Yes. Content can be rated. Flexible to use.", komm:"Partly. Entries can be commented on.", collab:"Authors can edit, participants can comment.", bloomG:"6/6 possible. Depends on the use case." }},
    umfrage: { name:"Survey", desc:"Survey with predefined questions", complexityText:"Easy. Choose from 3 types.", docsUrl:"https://docs.moodle.org/501/en/Survey_activity", longDesc:"The Survey provides three predefined, scientifically validated questionnaires for evaluating learning environments. It captures how participants perceive the learning climate and the teaching. The results help teachers improve their courses. Unlike the Feedback activity, the questions cannot be modified. The Survey is particularly well suited to reflecting on the learning process and optimising the course.", goals:{ info:"No. The Survey is unsuitable for distributing information.", bewerten:"Not really. Better used to evaluate the course.", komm:"No. Only one-way communication: participants to teacher.", collab:"No. Purely individual activity.", bloomG:"Helps participants reflect on the learning process." }},
    feedback: { name:"Feedback", desc:"Build your own evaluation questionnaires", complexityText:"Easy to operate. Time investment for questions.", docsUrl:"https://docs.moodle.org/501/en/Feedback_activity", longDesc:"With the Feedback activity you create your own questionnaires with freely definable questions. You can use multiple choice, text fields, rating scales and more. Answers can be collected anonymously or by name. Feedback is excellent for course evaluations, expectation surveys or sentiment polls. Unlike the Survey activity, you have full control over the questions.", goals:{ info:"No. Not intended for distributing information.", bewerten:"No. Evaluations generate feedback for teachers.", komm:"No. Only one-way communication.", collab:"No. Purely individual activity.", bloomG:"Can be designed creatively." }},
    abstimmung: { name:"Choice", desc:"Participants vote on a question", complexityText:"Easy. Add question(s) and answers.", docsUrl:"https://docs.moodle.org/501/en/Choice_activity", longDesc:"The Choice activity poses a single question with predefined answer options. Participants pick one option and the results are shown as a bar chart. It is suitable for quick polls, scheduling or group allocation. Setup takes only a few minutes. For more complex surveys with multiple questions, use the Feedback activity instead.", goals:{ info:"No. Mainly for a quick poll on a topic.", bewerten:"Use as a quick check on a question.", komm:"No. Use a forum or chat instead.", collab:"No. Use a forum, glossary or wiki instead.", bloomG:"Allows simple checking of knowledge and understanding." }},
    test: { name:"Quiz", desc:"Quiz questions with automatic grading", complexityText:"Time investment when creating. Auto-grading.", docsUrl:"https://docs.moodle.org/501/en/Quiz_activity", longDesc:"The Quiz is the central assessment tool in Moodle, with over 15 question types – from multiple choice to fill-in-the-blank to matching. Grading is automatic with immediate feedback to participants. Quizzes can be timed, with random questions and multiple attempts. They are equally suitable for self-tests, exercises and formal exams. The question bank enables reuse of questions across courses.", goals:{ info:"Aimed at assessment, not distribution of information.", bewerten:"Yes. For questions with a clear answer. Automatic.", komm:"No. Use a forum or chat instead.", collab:"No. Use a forum or wiki instead.", bloomG:"Versatile through creative use." }},
    lektion: { name:"Lesson", desc:"Build pages of information and quiz questions", complexityText:"Requires planning, then an effective learning activity.", docsUrl:"https://docs.moodle.org/501/en/Lesson_activity", longDesc:"The Lesson presents content on individual pages and links them with quiz questions. Depending on the answer, participants are routed to different pages – a branching learning path emerges. This lets you implement adaptive learning where the path depends on prior knowledge. Lessons are suitable for guided learning units with integrated comprehension checks. Creation requires planning but yields a very effective learning activity.", goals:{ info:"Well suited for guided information delivery.", bewerten:"Yes, allows assessment via integrated quiz questions.", komm:"No. Participants work individually.", collab:"No. Participants work individually.", bloomG:"Versatile through creative use." }},
    aufgabe: { name:"Assignment", desc:"Task with individual grading", complexityText:"Easy. Choose from four submission types.", docsUrl:"https://docs.moodle.org/501/en/Assignment_activity", longDesc:"The Assignment is the most versatile assessment tool in Moodle. Participants submit texts, files or media which you grade individually with mark and comment. Four submission types are available: file, online text, audio/video recording. Deadlines, extensions and group submissions are configurable. Assignments are suitable for essays, project work, presentations and any form of individual proof of performance.", goals:{ info:"No. But can contain content for the task description.", bewerten:"Yes. Individual grading with mark and comment.", komm:"Little interaction. Except: repeated submission with feedback.", collab:"Group member can submit on behalf of the group.", bloomG:"Depends on task wording and assessment form." }},
    beurteilung: { name:"Workshop", desc:"Assignment with peer feedback", complexityText:"Requires careful planning.", docsUrl:"https://docs.moodle.org/501/en/Workshop_activity", longDesc:"The Workshop combines submission with peer review. Participants first submit their own work and then assess submissions of others against given criteria. This process fosters critical thinking and reflection. The final grade is a combination of peer and trainer assessment. Setup is demanding but offers a pedagogically very valuable learning scenario.", goals:{ info:"No. Use a different tool.", bewerten:"Yes. Peer assessment. Participants assess each other's solutions.", komm:"No. Allows only feedback, no communication.", collab:"No. For group tasks use a forum or wiki.", bloomG:"Depends on task wording and assessment form." }},
    lernpaket: { name:"SCORM package", desc:"Embed learning content in SCORM format", complexityText:"Requires software or purchased content.", docsUrl:"https://docs.moodle.org/501/en/SCORM_activity", longDesc:"SCORM packages embed externally created SCORM or AICC content in Moodle. These interactive learning modules are produced with authoring tools such as Articulate, Captivate or iSpring. Progress and results are automatically reported back to Moodle. SCORM packages are suitable for multimedia, interactive self-study units. Embedding is easy, but content creation requires special software.", goals:{ info:"Yes. Well suited for delivering information.", bewerten:"Yes, grading can be integrated.", komm:"No. Participants work individually.", collab:"No. Participants work individually.", bloomG:"Versatile through creative use." }},
    chat: { name:"Chat", desc:"Real-time text chat with participants", complexityText:"Easy. Requires moderation; small groups.", docsUrl:"https://docs.moodle.org/501/en/Chat_activity", longDesc:"The Chat enables synchronous text conversations in real time between course participants. It is suitable for office hours, group discussions or spontaneous exchange in small groups. Chat logs are recorded and can be reviewed later. Moderation is recommended to steer the conversation. For larger groups or asynchronous communication, the Forum is better suited.", goals:{ info:"Requires presence at the time of the chat.", bewerten:"Chat contributions can be rated like oral participation.", komm:"Yes. Discussions in small groups or Q&A sessions.", collab:"Yes. Participants can work and discuss together.", bloomG:"Can be used creatively with small groups." }},
    forum: { name:"Forum", desc:"Versatile activity for many learning strategies", complexityText:"Easy. Title and description are enough.", docsUrl:"https://docs.moodle.org/501/en/Forum_activity", longDesc:"The Forum is the most versatile communication tool in Moodle. It enables time-shifted discussions in which participants write posts, reply to each other and attach files. Various forum types are available – from announcement forum to open discussion. Posts can be tracked via email subscription and even rated. Forums are suitable for announcements, peer learning, reflection and collaborative work.", goals:{ info:"Yes. News forum and email notification.", bewerten:"Sort of. Posts can be rated within a time frame.", komm:"Yes. Asynchronous communication. Course groups can be used.", collab:"Yes. Participants exchange while creating content.", bloomG:"Can be used creatively with large groups too." }},
    extern: { name:"External tool", desc:"Connect an external learning activity (LTI)", complexityText:"Requires credentials from external providers.", docsUrl:"https://docs.moodle.org/501/en/External_tool", longDesc:"The External tool connects Moodle via the LTI standard with external learning platforms and services. Participants can access external tools directly from Moodle – without a separate login. Grades can be transferred back to Moodle automatically. Typical use cases are simulations, labs, publisher content or specialised learning tools. Setup requires technical configuration and credentials from the provider.", goals:{ info:"Depends on the connected tool.", bewerten:"Grades can be transferred back to Moodle.", komm:"Depends on the connected tool.", collab:"Depends on the connected tool.", bloomG:"Depends on the connected tool." }},
    h5p: { name:"H5P", desc:"Tools for interactive content", complexityText:"Easy operation through forms.", docsUrl:"https://docs.moodle.org/501/en/H5P_activity", longDesc:"H5P offers over 40 interactive content types directly in Moodle – from interactive videos to timelines to drag-and-drop tasks. Authoring is done via intuitive forms without programming knowledge. Grades are captured automatically and passed to the Moodle gradebook. H5P content is responsive and works on all devices. It is one of the most versatile tools for interactive and engaging learning experiences.", goals:{ info:"Yes. Good visualisation of information.", bewerten:"Yes. Automatic grading.", komm:"No. No communication possible.", collab:"No. Participants work individually.", bloomG:"Diverse support for learning scenarios." }},
    bbb: { name:"BigBlueButton", desc:"Video conferencing, whiteboard, chat", complexityText:"Easy operation.", docsUrl:"https://docs.moodle.org/501/en/BigBlueButton", longDesc:"BigBlueButton is a fully featured video conferencing system integrated directly into Moodle. It offers live video, screen sharing, an interactive whiteboard, polls and breakout rooms. Sessions can be recorded and provided in the course later. BigBlueButton is suitable for lectures, seminars, office hours and group work. Operation is easy – one click is enough to join a conference.", goals:{ info:"Yes. Lectures and presentations are held live.", bewerten:"Limited: suitable for individual or small-group exams.", komm:"Yes. Conversations, video calls and chats are possible.", collab:"Yes, via the whiteboard and shared notes.", bloomG:"Diverse support for learning scenarios." }},
    board: { name:"Board", desc:"Visual pinboard with columns and cards", complexityText:"Sticky-note style.", docsUrl:"https://moodle.org/plugins/mod_board", longDesc:"Board is a visual pinboard in the style of Padlet or Trello. Teachers create columns; learners post cards with text, images, links or videos. Cards can be moved, liked and commented on. Board is low-threshold, visually appealing and ideal for brainstorming, expectation surveys, collecting examples or building collective knowledge bases. It replaces external tools like Padlet directly in Moodle in a privacy-compliant way.", goals:{ info:"Yes. Collection of sources, images, links as a visual knowledge base.", bewerten:"Partly. Likes possible, but no real grading logic.", komm:"Yes. Brainstorming, expectation polls, collective collection – low-threshold and visual.", collab:"Yes. Classic sticky-note format for collaborative collection and structuring.", bloomG:"Typically 3/6 (apply); for structuring tasks up to level 4 (analyse)." }},
    anwesenheit: { name:"Attendance", desc:"Record attendance per session", complexityText:"Administrative tool.", docsUrl:"https://moodle.org/plugins/mod_attendance", longDesc:"Attendance is the standard plugin for attendance management in Moodle. Teachers plan sessions (one-off or as a series), record the status of learners per session (present, late, excused, absent) or have learners check in themselves. Reports show the balance per person and course. Attendance can be weighted into the overall grade – ideal for in-person courses, blended learning and constructive attendance requirements.", goals:{ info:"Partly. Learners see their own attendance balance as information.", bewerten:"Yes. Attendance can be weighted into the overall grade; reports for the teacher.", komm:"No. Pure administrative tool with no communication function.", collab:"No. No collaborative function.", bloomG:"1/6 – administrative tool, no direct learning goal." }},
    lerntagebuch: { name:"Diary", desc:"Private reflection journal between learner and teacher", complexityText:"Confidential dialogue.", docsUrl:"https://moodle.org/plugins/mod_diary", longDesc:"The Diary (Journal) is deliberately a private activity: learners write entries on reflection prompts or about their own learning progress; only the teacher sees the entry and comments on it. It promotes metacognition and self-reflection and allows qualitative, individual feedback. Suitable for guiding the learning process, practical placements, coaching and any setting where personal engagement is more important than a shared product.", goals:{ info:"Partly. More about reflection of one's own learning experience than knowledge transfer.", bewerten:"Yes. Assessment of depth of reflection, qualitative feedback by the teacher.", komm:"Yes. 1:1 dialogue between learner and teacher, confidential.", collab:"No. Deliberately private – not visible to other learners.", bloomG:"5/6 (evaluate / reflect). High metacognitive demand." }}
  },
  fr: {
    datei: { name:"Fichier", desc:"Téléverser un fichier (Word, PDF, PowerPoint…)", complexityText:"Aussi simple qu'une pièce jointe à un e-mail. Mais un fichier seul a-t-il du sens ?", docsUrl:"https://docs.moodle.org/3x/fr/Ressource_fichier", longDesc:"La ressource Fichier permet de mettre à disposition des participantes et participants des fichiers individuels à télécharger – PDF, documents Word, présentations ou images. Le fichier apparaît directement sur la page du cours et peut être ouvert ou téléchargé d'un clic. Les fichiers conviennent particulièrement aux supports de cours, fiches d'exercices et compléments. Notez qu'un fichier seul ne permet aucune interaction. Combinez-le avec des forums ou des devoirs pour rendre l'apprentissage actif.", goals:{ info:"Oui. Les enseignantes et enseignants déposent des fichiers d'information.", bewerten:"Non. Utilisez plutôt un forum ou un devoir pour évaluer les connaissances.", komm:"Non. Aucune option directe d'interaction ou de communication.", collab:"Non. Utilisez plutôt forums, wikis ou glossaires.", bloomG:"Pas une activité d'apprentissage – pure transmission d'information." }},
    verzeichnis: { name:"Dossier", desc:"Téléverser un ensemble de fichiers", complexityText:"Aussi simple qu'une pièce jointe. Mais des fichiers seuls ont-ils du sens ?", docsUrl:"https://docs.moodle.org/3x/fr/Ressource_dossier", longDesc:"Un Dossier regroupe plusieurs fichiers dans un dossier sur la page du cours. Les participantes et participants peuvent télécharger l'ensemble du dossier ou des fichiers individuels. C'est pratique lorsqu'on souhaite proposer une collection de documents sur un thème. Les dossiers gardent la page du cours organisée lorsqu'il faut beaucoup de fichiers. Comme pour les fichiers individuels, aucune interaction directe n'est possible – c'est un pur outil de mise à disposition.", goals:{ info:"Oui. Téléverser des fichiers dans un dossier est un travail d'enseignant.", bewerten:"Non. Utilisez plutôt un forum ou un devoir.", komm:"Non. Aucune option directe d'interaction.", collab:"Collecte et partage de fichiers possibles. Demande un ajustement des rôles.", bloomG:"Pas une activité d'apprentissage – pure transmission d'information." }},
    textseite: { name:"Page", desc:"Créer une page de texte dans Moodle", complexityText:"Facile. Mettre en forme, ajouter images et vidéos.", docsUrl:"https://docs.moodle.org/3x/fr/Ressource_page", longDesc:"Une Page permet de créer du contenu directement dans Moodle – avec texte mis en forme, images, vidéos et liens. Contrairement à un Fichier, les participants n'ont rien à télécharger ; ils lisent tout dans le navigateur. Les pages conviennent aux introductions, consignes ou courtes unités d'information. Elles peuvent être enrichies de multimédias et sont visibles immédiatement. Pour des contenus plus volumineux, utilisez le Livre.", goals:{ info:"Oui. Seuls les enseignants créent ces pages.", bewerten:"Non. Utilisez plutôt un forum ou un devoir.", komm:"Non. Aucune option directe d'interaction.", collab:"Création conjointe possible. Demande un ajustement des rôles.", bloomG:"Pas une activité d'apprentissage – pure transmission d'information." }},
    buch: { name:"Livre", desc:"Créer une suite de pages dans Moodle", complexityText:"Facile. Mettre en forme, ajouter images et vidéos.", docsUrl:"https://docs.moodle.org/3x/fr/Ressource_livre", longDesc:"Un Livre se compose de plusieurs pages organisées en chapitres et sous-chapitres. Il convient parfaitement aux contenus longs et structurés tels que polycopiés ou guides. Les participants peuvent feuilleter les pages et imprimer l'ensemble du livre. Le livre offre une navigation claire via une table des matières. C'est un matériel de lecture pure, sans éléments interactifs.", goals:{ info:"Bon outil pour transmettre de l'information. Impression possible.", bewerten:"Non. Utilisez plutôt une Leçon, un forum ou un devoir.", komm:"Non. Aucune option directe d'interaction.", collab:"Création conjointe possible. Demande un ajustement des rôles.", bloomG:"Pas une activité d'apprentissage – pure transmission d'information." }},
    url: { name:"URL", desc:"Lien vers une page web", complexityText:"Facile. Trouver une adresse web et la coller.", docsUrl:"https://docs.moodle.org/3x/fr/Ressource_URL", longDesc:"Avec la ressource URL, vous reliez des pages web externes directement depuis la page du cours. Il peut s'agir d'articles, de vidéos, d'outils en ligne ou d'autres ressources d'apprentissage. Les participants accèdent à la page liée d'un clic. Les URL sont idéales pour intégrer du contenu externe à votre cours. Les possibilités didactiques dépendent du contenu lié – de la simple information à des scénarios complexes.", goals:{ info:"Moyen pratique de proposer des informations externes.", bewerten:"Pas directement. Lien vers des outils d'évaluation externes.", komm:"Pas directement. Lien vers des outils de communication externes.", collab:"Pas directement. Lien vers des outils de coopération externes.", bloomG:"6/6 possible. Dépend du contenu de la page liée." }},
    wiki: { name:"Wiki", desc:"Co-créer des textes en groupe", complexityText:"Demande une familiarisation avec le principe wiki.", docsUrl:"https://docs.moodle.org/3x/fr/Wiki", longDesc:"Le Wiki permet l'écriture collaborative : les participants créent et modifient ensemble des pages avec liens internes. Il fonctionne sur le principe de Wikipédia – chacun peut contribuer et modifier. L'historique des versions documente les changements de manière transparente. Les wikis conviennent aux exposés de groupe, aux collections de connaissances ou à la documentation de projet. La prise en main demande un peu de temps mais offre ensuite une grande flexibilité.", goals:{ info:"Oui. À utiliser comme page d'information – éditable par tous dans le cours.", bewerten:"Flexible, par exemple notation des contenus du wiki.", komm:"Partiellement adapté pour les discussions. Commentaires sur les contenus.", collab:"Oui. Les participants peuvent travailler ensemble et discuter.", bloomG:"6/6 possible. Selon l'usage." }},
    glossar: { name:"Glossaire", desc:"Présenter et co-créer des contenus de référence", complexityText:"Facile. Configuration flexible.", docsUrl:"https://docs.moodle.org/3x/fr/Glossaire", longDesc:"Dans le Glossaire, enseignants et participants peuvent collecter des termes spécialisés avec leurs définitions. Les entrées sont automatiquement liées dans tout le cours dès que le terme apparaît. Les participants peuvent rédiger leurs propres entrées et commenter celles des autres. Le glossaire convient aux collections de termes, aux FAQ ou à un ouvrage de référence co-créé. Les entrées peuvent être notées, ce qui en fait aussi une activité d'apprentissage.", goals:{ info:"Glossaire pour les définitions de termes.", bewerten:"Faire créer des entrées et les évaluer.", komm:"Partiellement. Les entrées peuvent être commentées.", collab:"L'auteur peut éditer, les autres commentent.", bloomG:"6/6 possible. Selon l'usage." }},
    datenbank: { name:"Base de données", desc:"Collecter, partager et chercher des matériaux", complexityText:"Difficile à mettre en place. Planifiez d'abord la structure !", docsUrl:"https://docs.moodle.org/3x/fr/Base_de_donn%C3%A9es", longDesc:"L'activité Base de données permet de recueillir des entrées structurées avec des champs librement définis. Les participants peuvent saisir textes, images, fichiers et liens dans un format uniforme. Toutes les entrées sont consultables et peuvent être commentées et évaluées. La base de données convient aux collections de matériaux, fiches descriptives ou portfolios de projet. La configuration demande de la planification mais offre des usages très flexibles.", goals:{ info:"Les enseignants peuvent présenter du contenu. Mieux : les participants saisissent des données.", bewerten:"Oui. Les contenus peuvent être notés. Usage flexible.", komm:"Partiellement. Les entrées peuvent être commentées.", collab:"L'auteur peut éditer, les autres commentent.", bloomG:"6/6 possible. Selon l'usage." }},
    umfrage: { name:"Sondage", desc:"Enquête avec questions prédéfinies", complexityText:"Facile. Choisissez parmi 3 types.", docsUrl:"https://docs.moodle.org/3x/fr/Sondage", longDesc:"Le Sondage propose trois questionnaires prédéfinis et scientifiquement validés pour évaluer les environnements d'apprentissage. Il mesure la perception du climat d'apprentissage et de l'enseignement. Les résultats aident les enseignants à améliorer leur cours. Contrairement au Feedback, les questions ne peuvent pas être modifiées. Le Sondage est particulièrement adapté à la réflexion sur le processus d'apprentissage et à l'optimisation du cours.", goals:{ info:"Non. Le Sondage ne convient pas à la diffusion d'informations.", bewerten:"Plutôt non. Mieux pour évaluer le cours.", komm:"Non. Communication unidirectionnelle uniquement.", collab:"Non. Activité purement individuelle.", bloomG:"Aide les participants à réfléchir à leur apprentissage." }},
    feedback: { name:"Feedback", desc:"Créer ses propres questionnaires d'évaluation", complexityText:"Facile à utiliser. Investissement de temps pour les questions.", docsUrl:"https://docs.moodle.org/3x/fr/Feedback", longDesc:"Avec l'activité Feedback, vous créez vos propres questionnaires avec des questions librement définies. Vous pouvez utiliser le choix multiple, des champs texte, des échelles d'évaluation, etc. Les réponses peuvent être collectées de manière anonyme ou nominative. Le Feedback convient parfaitement à l'évaluation de cours, aux enquêtes d'attentes ou aux baromètres d'humeur. Contrairement au Sondage, vous gardez le contrôle total des questions.", goals:{ info:"Non. Pas conçu pour diffuser de l'information.", bewerten:"Non. Les évaluations génèrent des retours pour les enseignants.", komm:"Non. Communication unidirectionnelle uniquement.", collab:"Non. Activité purement individuelle.", bloomG:"Peut être conçu de manière créative." }},
    abstimmung: { name:"Sondage", desc:"Les participants votent sur une question", complexityText:"Facile. Question(s) et réponses à créer.", docsUrl:"https://docs.moodle.org/3x/fr/Consultation", longDesc:"L'activité Sondage (Choice) pose une seule question avec des options de réponse prédéfinies. Les participants choisissent une option et les résultats sont affichés sous forme d'histogramme. Convient aux sondages rapides, à la prise de rendez-vous ou aux groupes. Mise en place en quelques minutes. Pour des enquêtes plus complexes avec plusieurs questions, utilisez plutôt le Feedback.", goals:{ info:"Non. Surtout pour un sondage rapide sur un sujet.", bewerten:"À utiliser comme vérification rapide d'une question.", komm:"Non. Utilisez plutôt un forum ou un chat.", collab:"Non. Utilisez plutôt forum, glossaire ou wiki.", bloomG:"Permet une vérification simple des connaissances." }},
    test: { name:"Test", desc:"Questions de test avec correction automatique", complexityText:"Investissement de temps à la création. Correction automatique.", docsUrl:"https://docs.moodle.org/3x/fr/Test", longDesc:"Le Test est l'outil central d'évaluation dans Moodle, avec plus de 15 types de questions – du QCM au texte à trous en passant par l'appariement. La correction est automatique avec un retour immédiat. Les tests peuvent être chronométrés, avec questions aléatoires et plusieurs tentatives. Ils conviennent autant aux auto-évaluations qu'aux examens formels. La banque de questions permet la réutilisation entre les cours.", goals:{ info:"Vise l'évaluation, pas la diffusion d'information.", bewerten:"Oui. Pour des questions à réponse claire. Automatique.", komm:"Non. Utilisez plutôt un forum ou un chat.", collab:"Non. Utilisez plutôt un forum ou un wiki.", bloomG:"Variable selon l'usage créatif." }},
    lektion: { name:"Leçon", desc:"Construire des pages d'information et de questions", complexityText:"Demande de la planification, puis activité efficace.", docsUrl:"https://docs.moodle.org/3x/fr/Le%C3%A7on", longDesc:"La Leçon présente le contenu sur des pages individuelles et les associe à des questions. Selon la réponse, les participants sont dirigés vers différentes pages – un parcours d'apprentissage ramifié se forme. Cela permet une apprentissage adaptatif où le chemin dépend des connaissances. Les leçons conviennent aux unités guidées avec contrôles intégrés. La création demande de la planification mais donne une activité très efficace.", goals:{ info:"Bien adapté à une présentation guidée d'informations.", bewerten:"Oui, évaluation possible via les questions intégrées.", komm:"Non. Les participants travaillent individuellement.", collab:"Non. Les participants travaillent individuellement.", bloomG:"Variable selon l'usage créatif." }},
    aufgabe: { name:"Devoir", desc:"Énoncé avec évaluation individuelle", complexityText:"Facile. Choix parmi quatre types de remise.", docsUrl:"https://docs.moodle.org/3x/fr/Devoir", longDesc:"Le Devoir est l'outil d'évaluation le plus polyvalent de Moodle. Les participants soumettent textes, fichiers ou médias que vous notez individuellement avec note et commentaire. Quatre types de remise sont disponibles : fichier, texte en ligne, enregistrement audio/vidéo. Échéances, prolongations et remises de groupe sont configurables. Le devoir convient aux essais, aux travaux de projet, aux présentations et à toute forme de preuve individuelle.", goals:{ info:"Non. Mais peut contenir le contenu de l'énoncé.", bewerten:"Oui. Évaluation individuelle avec note et commentaire.", komm:"Peu d'interaction. Sauf : remises répétées avec retours.", collab:"Un membre du groupe peut soumettre pour le groupe.", bloomG:"Selon la formulation et la forme d'évaluation." }},
    beurteilung: { name:"Atelier", desc:"Devoir avec évaluation par les pairs", complexityText:"Demande une planification rigoureuse.", docsUrl:"https://docs.moodle.org/3x/fr/Atelier", longDesc:"L'Atelier (Workshop) combine remise de devoir et évaluation par les pairs. Les participants soumettent d'abord leur travail puis évaluent les remises des autres selon des critères donnés. Ce processus favorise l'esprit critique et la réflexion. La note finale combine évaluation par les pairs et par l'enseignant. La mise en place est exigeante mais offre un scénario pédagogiquement très riche.", goals:{ info:"Non. Utilisez un autre outil.", bewerten:"Oui. Évaluation par les pairs. Les participants évaluent les solutions des autres.", komm:"Non. Permet seulement des retours, pas de communication.", collab:"Non. Pour des tâches de groupe utilisez forum ou wiki.", bloomG:"Selon la formulation et la forme d'évaluation." }},
    lernpaket: { name:"Paquetage SCORM", desc:"Intégrer des contenus au format SCORM", complexityText:"Nécessite un logiciel ou des contenus achetés.", docsUrl:"https://docs.moodle.org/3x/fr/SCORM", longDesc:"Les paquetages SCORM intègrent dans Moodle des contenus SCORM ou AICC créés en externe. Ces modules d'apprentissage interactifs sont produits avec des outils comme Articulate, Captivate ou iSpring. La progression et les résultats sont automatiquement reportés à Moodle. Les paquetages conviennent aux unités d'auto-apprentissage multimédia et interactives. L'intégration est simple, mais la création des contenus demande des logiciels spécifiques.", goals:{ info:"Oui. Bien adapté à la transmission d'informations.", bewerten:"Oui, l'évaluation peut être intégrée.", komm:"Non. Les participants travaillent individuellement.", collab:"Non. Les participants travaillent individuellement.", bloomG:"Variable selon l'usage créatif." }},
    chat: { name:"Salon de discussion", desc:"Chat textuel en temps réel avec les participants", complexityText:"Facile. Demande de la modération ; petits groupes.", docsUrl:"https://docs.moodle.org/3x/fr/Salon_de_discussion", longDesc:"Le Salon de discussion permet des conversations textuelles synchrones en temps réel entre participants. Il convient aux permanences, discussions de groupe ou échanges spontanés en petits groupes. Les historiques sont enregistrés et consultables ultérieurement. Une modération est recommandée pour orienter la discussion. Pour de plus grands groupes ou une communication asynchrone, le Forum est mieux adapté.", goals:{ info:"Demande la présence au moment du chat.", bewerten:"Les contributions peuvent être notées comme une participation orale.", komm:"Oui. Discussions en petits groupes ou séances de Q/R.", collab:"Oui. Les participants peuvent travailler et discuter ensemble.", bloomG:"Peut être utilisé de façon créative en petits groupes." }},
    forum: { name:"Forum", desc:"Activité polyvalente pour de nombreuses stratégies d'apprentissage", complexityText:"Facile. Titre et description suffisent.", docsUrl:"https://docs.moodle.org/3x/fr/Forum", longDesc:"Le Forum est l'outil de communication le plus polyvalent de Moodle. Il permet des discussions asynchrones où les participants postent, se répondent et joignent des fichiers. Plusieurs types de forums sont disponibles – du forum d'annonces à la discussion ouverte. Les messages peuvent être suivis par e-mail et même notés. Les forums conviennent aux annonces, à l'apprentissage entre pairs, à la réflexion et au travail collaboratif.", goals:{ info:"Oui. Forum d'annonces et notification par e-mail.", bewerten:"Plutôt oui. Les contributions peuvent être notées sur une période.", komm:"Oui. Communication asynchrone. Groupes de cours utilisables.", collab:"Oui. Les participants échangent en créant des contenus.", bloomG:"Peut aussi être utilisé de manière créative en grand groupe." }},
    extern: { name:"Outil externe", desc:"Connecter une activité d'apprentissage externe (LTI)", complexityText:"Nécessite des identifiants des fournisseurs externes.", docsUrl:"https://docs.moodle.org/3x/fr/Outil_externe", longDesc:"L'Outil externe relie Moodle à des plateformes et services externes via la norme LTI. Les participants peuvent accéder à des outils externes directement depuis Moodle – sans connexion séparée. Les notes peuvent être renvoyées automatiquement vers Moodle. Cas d'usage typiques : simulations, laboratoires, contenus d'éditeurs ou outils spécialisés. La mise en place demande une configuration technique et des identifiants du fournisseur.", goals:{ info:"Dépend de l'outil connecté.", bewerten:"Les notes peuvent être renvoyées vers Moodle.", komm:"Dépend de l'outil connecté.", collab:"Dépend de l'outil connecté.", bloomG:"Dépend de l'outil connecté." }},
    h5p: { name:"H5P", desc:"Outils pour contenus interactifs", complexityText:"Utilisation simple par formulaires.", docsUrl:"https://docs.moodle.org/3x/fr/H5P", longDesc:"H5P propose plus de 40 types de contenus interactifs directement dans Moodle – des vidéos interactives aux frises chronologiques jusqu'aux activités glisser-déposer. La création se fait via des formulaires intuitifs sans connaissances en programmation. Les notes sont collectées automatiquement et transmises au carnet de notes Moodle. Les contenus H5P sont responsives et fonctionnent sur tous les appareils. C'est l'un des outils les plus polyvalents pour des expériences d'apprentissage interactives et engageantes.", goals:{ info:"Oui. Bonne visualisation de l'information.", bewerten:"Oui. Évaluation automatique.", komm:"Non. Pas de communication possible.", collab:"Non. Les participants travaillent individuellement.", bloomG:"Soutien diversifié de scénarios d'apprentissage." }},
    bbb: { name:"BigBlueButton", desc:"Visioconférence, tableau blanc, chat", complexityText:"Utilisation simple.", docsUrl:"https://docs.moodle.org/3x/fr/BigBlueButton", longDesc:"BigBlueButton est un système de visioconférence complet intégré directement à Moodle. Il propose vidéo en direct, partage d'écran, tableau blanc interactif, sondages et salles de discussion. Les sessions peuvent être enregistrées et fournies plus tard dans le cours. BigBlueButton convient aux cours magistraux, séminaires, permanences et travail de groupe. L'utilisation est simple – un clic suffit pour rejoindre une conférence.", goals:{ info:"Oui. Cours et présentations en direct.", bewerten:"Limité : adapté aux examens individuels ou en petits groupes.", komm:"Oui. Conversations, appels vidéo et chats possibles.", collab:"Oui, via le tableau blanc et les notes partagées.", bloomG:"Soutien diversifié de scénarios d'apprentissage." }},
    board: { name:"Board", desc:"Tableau visuel avec colonnes et cartes", complexityText:"Style sticky-notes.", docsUrl:"https://moodle.org/plugins/mod_board", longDesc:"Board est un tableau visuel dans le style de Padlet ou Trello. Les enseignants créent des colonnes ; les apprenants postent des cartes avec texte, images, liens ou vidéos. Les cartes peuvent être déplacées, aimées et commentées. Board est accessible, visuellement attrayant et idéal pour le brainstorming, les enquêtes d'attentes, la collecte d'exemples ou les bases de connaissances collectives. Il remplace des outils externes comme Padlet directement dans Moodle, en respectant la confidentialité.", goals:{ info:"Oui. Collection de sources, images, liens comme base de connaissances visuelle.", bewerten:"Partiellement. Likes possibles, mais pas de vraie logique d'évaluation.", komm:"Oui. Brainstorming, enquêtes d'attentes, collecte collective – accessible et visuel.", collab:"Oui. Format sticky-notes classique pour collecter et structurer.", bloomG:"Typiquement 3/6 (appliquer) ; pour des tâches structurantes jusqu'au niveau 4 (analyser)." }},
    anwesenheit: { name:"Présence", desc:"Saisir la présence par séance", complexityText:"Outil administratif.", docsUrl:"https://moodle.org/plugins/mod_attendance", longDesc:"Présence est le plugin standard pour la gestion des présences dans Moodle. Les enseignants planifient des séances (uniques ou en série), saisissent par séance le statut des apprenants (présent, en retard, excusé, absent) ou laissent les apprenants s'inscrire eux-mêmes. Des rapports affichent le bilan par personne et par cours. La présence peut être pondérée dans la note globale – idéal pour les cours en présentiel, l'apprentissage hybride et les obligations d'assiduité.", goals:{ info:"Partiellement. Les apprenants voient leur propre bilan de présence.", bewerten:"Oui. La présence peut être intégrée à la note globale ; rapports pour l'enseignant.", komm:"Non. Pur outil administratif sans fonction de communication.", collab:"Non. Aucune fonction collaborative.", bloomG:"1/6 – outil administratif, pas d'objectif d'apprentissage direct." }},
    lerntagebuch: { name:"Journal", desc:"Journal de réflexion privé entre apprenant et enseignant", complexityText:"Dialogue confidentiel.", docsUrl:"https://moodle.org/plugins/mod_diary", longDesc:"Le Journal (Diary) est délibérément une activité privée : les apprenants rédigent des entrées sur des questions de réflexion ou sur leur propre progression ; seul l'enseignant voit l'entrée et la commente. Il favorise la métacognition et l'autoréflexion et permet un retour qualitatif et individuel. Convient à l'accompagnement du processus d'apprentissage, aux stages, au coaching et à tout cadre où l'engagement personnel prime sur un produit commun.", goals:{ info:"Partiellement. Plutôt réflexion sur sa propre expérience que transmission de connaissances.", bewerten:"Oui. Évaluation de la profondeur de réflexion, retour qualitatif de l'enseignant.", komm:"Oui. Dialogue 1:1 entre apprenant et enseignant, confidentiel.", collab:"Non. Délibérément privé – pas visible aux autres apprenants.", bloomG:"5/6 (évaluer / réfléchir). Forte exigence métacognitive." }}
  },
  es: {
    datei: { name:"Archivo", desc:"Subir un archivo (Word, PDF, PowerPoint…)", complexityText:"Tan simple como un adjunto de correo. ¿Pero un archivo solo tiene sentido?", docsUrl:"https://docs.moodle.org/all/es/Recurso_archivo", longDesc:"El recurso Archivo permite poner a disposición de las y los participantes archivos individuales para descargar – PDF, documentos Word, presentaciones o imágenes. El archivo aparece directamente en la página del curso y puede abrirse o descargarse con un clic. Los archivos son especialmente adecuados para apuntes, hojas de trabajo y materiales complementarios. Tenga en cuenta que un archivo solo no permite interacción. Combínelo con foros o tareas para hacer activo el proceso de aprendizaje.", goals:{ info:"Sí. Las y los docentes suben archivos para informar.", bewerten:"No. Mejor recoger conocimientos mediante un foro o tarea.", komm:"No. Sin opción directa de interacción o comunicación.", collab:"No. Mejor usar foros, wikis o glosarios.", bloomG:"No es una actividad de aprendizaje, sino mera transmisión de información." }},
    verzeichnis: { name:"Carpeta", desc:"Subir un conjunto de archivos", complexityText:"Tan simple como un adjunto de correo. ¿Pero archivos solos tienen sentido?", docsUrl:"https://docs.moodle.org/all/es/Recurso_carpeta", longDesc:"Una Carpeta agrupa varios archivos en una sola carpeta en la página del curso. Las y los participantes pueden descargar la carpeta entera o archivos individuales. Es práctico cuando se quiere ofrecer una colección de documentos sobre un tema. Las carpetas mantienen ordenada la página del curso cuando se necesitan muchos archivos. Como con archivos individuales, no es posible interacción directa – es una herramienta de mera distribución.", goals:{ info:"Sí. Subir archivos a carpetas es tarea docente.", bewerten:"No. Mejor un foro o una tarea.", komm:"No. Sin opción directa de interacción.", collab:"Recolectar y compartir archivos es posible. Requiere ajuste de roles.", bloomG:"No es una actividad de aprendizaje, sino mera transmisión de información." }},
    textseite: { name:"Página", desc:"Crear una página con texto en Moodle", complexityText:"Fácil. Formatear texto, añadir imágenes y vídeos.", docsUrl:"https://docs.moodle.org/all/es/Recurso_p%C3%A1gina", longDesc:"Una Página permite crear contenido directamente en Moodle – con texto formateado, imágenes, vídeos y enlaces. A diferencia del Archivo, las y los participantes no descargan nada; lo leen todo en el navegador. Las páginas son adecuadas para introducciones, instrucciones o unidades cortas de información. Pueden enriquecerse con multimedia y son visibles de inmediato. Para contenidos más extensos use el Libro.", goals:{ info:"Sí. Solo el profesorado crea estas páginas.", bewerten:"No. Mejor un foro o una tarea.", komm:"No. Sin opción directa de interacción.", collab:"Creación conjunta posible. Requiere ajuste de roles.", bloomG:"No es una actividad de aprendizaje, sino mera transmisión de información." }},
    buch: { name:"Libro", desc:"Crear una serie de páginas en Moodle", complexityText:"Fácil. Formatear texto, añadir imágenes y vídeos.", docsUrl:"https://docs.moodle.org/all/es/Recurso_libro", longDesc:"Un Libro consta de varias páginas con capítulos y subcapítulos. Es excelente para contenidos largos y estructurados como apuntes o guías. Las y los participantes pueden hojear las páginas e imprimir el libro entero. Ofrece navegación clara mediante un índice. Es material de lectura puro, sin elementos interactivos.", goals:{ info:"Buena herramienta para transmitir información. Permite imprimir.", bewerten:"No. Mejor una Lección, foro o tarea.", komm:"No. Sin opción directa de interacción.", collab:"Creación conjunta posible. Requiere ajuste de roles.", bloomG:"No es una actividad de aprendizaje, sino mera transmisión de información." }},
    url: { name:"URL", desc:"Enlace a una página web", complexityText:"Fácil. Encontrar una dirección y pegarla.", docsUrl:"https://docs.moodle.org/all/es/Recurso_URL", longDesc:"Con el recurso URL enlaza páginas web externas directamente desde la página del curso. Pueden ser artículos, vídeos, herramientas en línea u otros recursos. Las y los participantes acceden a la página enlazada con un clic. Las URL son ideales para integrar contenidos externos en su curso. Las posibilidades didácticas dependen del contenido enlazado – desde simple información hasta escenarios complejos.", goals:{ info:"Forma cómoda de proporcionar información externa.", bewerten:"No directamente. Enlace a herramientas externas de evaluación.", komm:"No directamente. Enlace a herramientas externas de comunicación.", collab:"No directamente. Enlace a herramientas externas de cooperación.", bloomG:"6/6 posible. Depende del contenido enlazado." }},
    wiki: { name:"Wiki", desc:"Crear textos juntos en grupo", complexityText:"Requiere familiarizarse con el principio wiki.", docsUrl:"https://docs.moodle.org/all/es/Wiki", longDesc:"El Wiki posibilita la escritura colaborativa: las y los participantes crean y editan páginas con enlaces internos. Funciona según el principio de Wikipedia – cualquiera puede contribuir y modificar. El historial de versiones documenta los cambios de forma transparente. Los wikis son adecuados para exposiciones grupales, colecciones de conocimiento o documentación de proyectos. La iniciación requiere algo de tiempo, pero ofrece gran flexibilidad.", goals:{ info:"Sí. Úselo como página de información, editable por todas las personas del curso.", bewerten:"Flexible, p. ej. evaluación de los contenidos creados en el wiki.", komm:"Parcialmente apto para discusiones. Comentarios sobre los contenidos.", collab:"Sí. Las y los participantes pueden trabajar y debatir juntos.", bloomG:"6/6 posible. Según el escenario de uso." }},
    glossar: { name:"Glosario", desc:"Presentar y co-crear contenido de referencia", complexityText:"Fácil. Configuración flexible.", docsUrl:"https://docs.moodle.org/all/es/Glosario", longDesc:"En el Glosario, docentes y participantes pueden recopilar términos especializados con definiciones. Las entradas se enlazan automáticamente en todo el curso allí donde aparezca el término. Las y los participantes pueden redactar sus propias entradas y comentar las de otras personas. El glosario es adecuado para colecciones de términos, FAQ o como obra de referencia co-creada. Las entradas pueden calificarse, lo que permite usarlo también como actividad de aprendizaje.", goals:{ info:"Glosario para definiciones de términos.", bewerten:"Hacer crear entradas y luego calificarlas.", komm:"Parcialmente. Las entradas pueden comentarse.", collab:"La autoría puede editar; las demás personas comentan.", bloomG:"6/6 posible. Según el escenario de uso." }},
    datenbank: { name:"Base de datos", desc:"Recopilar, compartir y buscar materiales", complexityText:"Difícil de configurar. ¡Planifique antes la estructura!", docsUrl:"https://docs.moodle.org/all/es/Base_de_datos", longDesc:"La actividad Base de datos permite recopilar entradas estructuradas con campos de libre definición. Las y los participantes pueden introducir textos, imágenes, archivos y enlaces en un formato uniforme. Todas las entradas son consultables y pueden comentarse y calificarse. La base de datos es adecuada para colecciones de materiales, fichas o portafolios de proyecto. La configuración requiere planificación pero ofrece usos muy flexibles.", goals:{ info:"El profesorado puede presentar material. Mejor: que las y los participantes introduzcan datos.", bewerten:"Sí. Los contenidos pueden calificarse. Uso flexible.", komm:"Parcialmente. Las entradas pueden comentarse.", collab:"La autoría puede editar; las demás personas comentan.", bloomG:"6/6 posible. Según el escenario de uso." }},
    umfrage: { name:"Encuesta predefinida", desc:"Encuesta con preguntas predefinidas", complexityText:"Fácil. Elija entre 3 tipos.", docsUrl:"https://docs.moodle.org/all/es/Encuesta_predefinida", longDesc:"La Encuesta predefinida ofrece tres cuestionarios validados científicamente para evaluar entornos de aprendizaje. Capta cómo las y los participantes perciben el clima de aprendizaje y la enseñanza. Los resultados ayudan al profesorado a mejorar su curso. A diferencia del Feedback, las preguntas no pueden modificarse. Es especialmente adecuada para reflexionar sobre el proceso de aprendizaje y optimizar el curso.", goals:{ info:"No. La Encuesta no es adecuada para distribuir información.", bewerten:"Más bien no. Mejor para evaluar el curso.", komm:"No. Solo comunicación unidireccional.", collab:"No. Actividad puramente individual.", bloomG:"Ayuda a las y los participantes a reflexionar sobre su aprendizaje." }},
    feedback: { name:"Retroalimentación", desc:"Crear sus propios cuestionarios de evaluación", complexityText:"Fácil de manejar. Tiempo invertido en las preguntas.", docsUrl:"https://docs.moodle.org/all/es/Retroalimentaci%C3%B3n", longDesc:"Con la actividad Retroalimentación crea sus propios cuestionarios con preguntas de libre definición. Puede usar opción múltiple, campos de texto, escalas de valoración y más. Las respuestas se pueden recoger de forma anónima o nominal. Es excelente para evaluar cursos, sondear expectativas o tomar el pulso. A diferencia de la Encuesta predefinida, tiene control total sobre las preguntas.", goals:{ info:"No. No está pensada para distribuir información.", bewerten:"No. Las evaluaciones generan retroalimentación para el profesorado.", komm:"No. Solo comunicación unidireccional.", collab:"No. Actividad puramente individual.", bloomG:"Puede diseñarse de forma creativa." }},
    abstimmung: { name:"Consulta", desc:"Las y los participantes votan una pregunta", complexityText:"Fácil. Crear pregunta(s) y respuestas.", docsUrl:"https://docs.moodle.org/all/es/Actividad_de_consulta", longDesc:"La Consulta plantea una sola pregunta con opciones de respuesta predefinidas. Las y los participantes eligen una opción y los resultados se muestran como gráfico de barras. Es adecuada para sondeos rápidos, planificación de citas o asignación de grupos. La configuración solo lleva unos minutos. Para encuestas más complejas con varias preguntas use mejor la Retroalimentación.", goals:{ info:"No. Sobre todo para un sondeo rápido sobre un tema.", bewerten:"Úsese como verificación rápida de una pregunta.", komm:"No. Mejor un foro o chat.", collab:"No. Mejor un foro, glosario o wiki.", bloomG:"Permite verificar de forma sencilla conocimientos y comprensión." }},
    test: { name:"Cuestionario", desc:"Preguntas de cuestionario con corrección automática", complexityText:"Tiempo invertido en la creación. Corrección automática.", docsUrl:"https://docs.moodle.org/all/es/Actividad_de_cuestionario", longDesc:"El Cuestionario es la herramienta central de evaluación en Moodle, con más de 15 tipos de preguntas – desde opción múltiple hasta texto con huecos o emparejamiento. La corrección es automática con retroalimentación inmediata. Los cuestionarios pueden ser cronometrados, con preguntas aleatorias y varios intentos. Son adecuados igualmente para autoevaluaciones, ejercicios y exámenes formales. El banco de preguntas permite reutilización entre cursos.", goals:{ info:"Apunta a la evaluación, no a la distribución de información.", bewerten:"Sí. Para preguntas con respuesta clara. Automático.", komm:"No. Mejor un foro o chat.", collab:"No. Mejor un foro o wiki.", bloomG:"Versátil mediante uso creativo." }},
    lektion: { name:"Lección", desc:"Construir páginas de información y preguntas", complexityText:"Requiere planificación; luego, una actividad eficaz.", docsUrl:"https://docs.moodle.org/all/es/Actividad_de_lecci%C3%B3n", longDesc:"La Lección presenta contenido en páginas individuales y las enlaza con preguntas. Según la respuesta, las y los participantes son dirigidos a páginas distintas – surge un itinerario de aprendizaje ramificado. Esto permite aprendizaje adaptativo, en el que el camino depende del nivel previo. Las lecciones son adecuadas para unidades guiadas con comprobaciones integradas. La creación requiere planificación pero da una actividad muy eficaz.", goals:{ info:"Bien adecuada para presentación guiada de información.", bewerten:"Sí, permite evaluación mediante preguntas integradas.", komm:"No. Las y los participantes trabajan individualmente.", collab:"No. Las y los participantes trabajan individualmente.", bloomG:"Versátil mediante uso creativo." }},
    aufgabe: { name:"Tarea", desc:"Enunciado con calificación individual", complexityText:"Fácil. Elija entre cuatro tipos de entrega.", docsUrl:"https://docs.moodle.org/all/es/Actividad_de_tarea", longDesc:"La Tarea es la herramienta de evaluación más versátil de Moodle. Las y los participantes entregan textos, archivos o medios que usted califica individualmente con nota y comentario. Hay cuatro tipos de entrega: archivo, texto en línea, grabación de audio/vídeo. Plazos, prórrogas y entregas en grupo son configurables. Es adecuada para ensayos, trabajos de proyecto, presentaciones y cualquier prueba individual de rendimiento.", goals:{ info:"No. Pero puede contener el contenido del enunciado.", bewerten:"Sí. Calificación individual con nota y comentario.", komm:"Poca interacción. Salvo: entrega repetida con retroalimentación.", collab:"Un miembro del grupo puede entregar en nombre del grupo.", bloomG:"Depende de la formulación de la tarea y de la forma de evaluación." }},
    beurteilung: { name:"Taller", desc:"Tarea con evaluación entre pares", complexityText:"Requiere planificación cuidadosa.", docsUrl:"https://docs.moodle.org/all/es/Actividad_de_taller", longDesc:"El Taller (Workshop) combina entrega de tarea con revisión por pares. Las y los participantes entregan primero su trabajo y después evalúan los trabajos de otras personas según criterios dados. Este proceso fomenta el pensamiento crítico y la reflexión. La nota final combina evaluación entre pares y del docente. La configuración es exigente pero ofrece un escenario pedagógico muy valioso.", goals:{ info:"No. Use otra herramienta.", bewerten:"Sí. Evaluación entre pares. Las y los participantes evalúan soluciones de otras personas.", komm:"No. Solo permite retroalimentación, no comunicación.", collab:"No. Para tareas grupales use foro o wiki.", bloomG:"Depende de la formulación de la tarea y de la forma de evaluación." }},
    lernpaket: { name:"Paquete SCORM", desc:"Integrar contenidos en formato SCORM", complexityText:"Requiere software o contenidos adquiridos.", docsUrl:"https://docs.moodle.org/all/es/SCORM", longDesc:"Los paquetes SCORM integran en Moodle contenidos SCORM o AICC creados externamente. Estos módulos interactivos se producen con herramientas de autor como Articulate, Captivate o iSpring. El progreso y los resultados se reportan automáticamente a Moodle. Son adecuados para unidades multimedia interactivas de autoaprendizaje. La integración es sencilla, pero la creación de contenidos requiere software específico.", goals:{ info:"Sí. Bien adecuado para transmitir información.", bewerten:"Sí, la calificación puede integrarse.", komm:"No. Las y los participantes trabajan individualmente.", collab:"No. Las y los participantes trabajan individualmente.", bloomG:"Versátil mediante uso creativo." }},
    chat: { name:"Chat", desc:"Chat de texto en tiempo real con participantes", complexityText:"Fácil. Requiere moderación; grupos pequeños.", docsUrl:"https://docs.moodle.org/all/es/Actividad_de_chat", longDesc:"El Chat permite conversaciones de texto sincrónicas en tiempo real entre participantes. Es adecuado para tutorías, debates de grupo o intercambio espontáneo en grupos pequeños. Los registros se guardan y pueden consultarse después. Se recomienda moderar para conducir la conversación. Para grupos mayores o comunicación asíncrona el Foro está mejor adaptado.", goals:{ info:"Requiere presencia en el momento del chat.", bewerten:"Las contribuciones pueden calificarse como participación oral.", komm:"Sí. Debates en grupos pequeños o sesiones de preguntas.", collab:"Sí. Las y los participantes pueden trabajar y debatir juntos.", bloomG:"Puede usarse de forma creativa con grupos pequeños." }},
    forum: { name:"Foro", desc:"Actividad versátil para muchas estrategias de aprendizaje", complexityText:"Fácil. Bastan título y descripción.", docsUrl:"https://docs.moodle.org/all/es/Actividad_de_foro", longDesc:"El Foro es la herramienta de comunicación más versátil de Moodle. Permite debates asíncronos en los que las y los participantes escriben, responden y adjuntan archivos. Hay varios tipos de foro – desde el de noticias hasta el debate abierto. Las publicaciones se pueden seguir por correo y hasta calificar. Los foros son adecuados para anuncios, aprendizaje entre pares, reflexión y trabajo colaborativo.", goals:{ info:"Sí. Foro de novedades y aviso por correo.", bewerten:"Más bien sí. Las publicaciones pueden calificarse durante un periodo.", komm:"Sí. Comunicación asíncrona. Se pueden usar grupos del curso.", collab:"Sí. Intercambio mientras se crean contenidos.", bloomG:"Puede usarse creativamente también con grupos grandes." }},
    extern: { name:"Herramienta externa", desc:"Conectar una actividad de aprendizaje externa (LTI)", complexityText:"Requiere credenciales de proveedores externos.", docsUrl:"https://docs.moodle.org/all/es/Herramienta_externa", longDesc:"La Herramienta externa conecta Moodle con plataformas y servicios externos vía el estándar LTI. Las y los participantes acceden a herramientas externas directamente desde Moodle – sin un inicio de sesión separado. Las calificaciones pueden devolverse automáticamente a Moodle. Casos típicos: simulaciones, laboratorios, contenido editorial o herramientas especializadas. La configuración requiere ajuste técnico y credenciales del proveedor.", goals:{ info:"Depende de la herramienta conectada.", bewerten:"Las calificaciones pueden devolverse a Moodle.", komm:"Depende de la herramienta conectada.", collab:"Depende de la herramienta conectada.", bloomG:"Depende de la herramienta conectada." }},
    h5p: { name:"H5P", desc:"Herramientas para contenidos interactivos", complexityText:"Manejo sencillo mediante formularios.", docsUrl:"https://docs.moodle.org/all/es/H5P", longDesc:"H5P ofrece más de 40 tipos de contenido interactivo directamente en Moodle – desde vídeos interactivos hasta líneas de tiempo y arrastrar y soltar. La creación se hace con formularios intuitivos sin programación. Las calificaciones se recogen automáticamente y se pasan al libro de calificaciones. Los contenidos H5P son responsivos y funcionan en todos los dispositivos. Es una de las herramientas más versátiles para experiencias de aprendizaje interactivas y atractivas.", goals:{ info:"Sí. Buena visualización de información.", bewerten:"Sí. Calificación automática.", komm:"No. Sin posibilidad de comunicación.", collab:"No. Las y los participantes trabajan individualmente.", bloomG:"Apoyo diverso a escenarios de aprendizaje." }},
    bbb: { name:"BigBlueButton", desc:"Videoconferencia, pizarra, chat", complexityText:"Manejo sencillo.", docsUrl:"https://docs.moodle.org/all/es/BigBlueButton", longDesc:"BigBlueButton es un sistema de videoconferencia completo integrado directamente en Moodle. Ofrece vídeo en directo, compartir pantalla, pizarra interactiva, encuestas y salas de subgrupos. Las sesiones pueden grabarse y ofrecerse después en el curso. Es adecuado para clases, seminarios, tutorías y trabajo en grupo. El uso es sencillo – basta un clic para unirse a una conferencia.", goals:{ info:"Sí. Conferencias y presentaciones se realizan en directo.", bewerten:"Limitado: adecuado para exámenes individuales o de grupos pequeños.", komm:"Sí. Conversaciones, videollamadas y chats posibles.", collab:"Sí, mediante pizarra y notas compartidas.", bloomG:"Apoyo diverso a escenarios de aprendizaje." }},
    board: { name:"Board", desc:"Tablero visual con columnas y tarjetas", complexityText:"Estilo de notas adhesivas.", docsUrl:"https://moodle.org/plugins/mod_board", longDesc:"Board es un tablero visual al estilo de Padlet o Trello. El profesorado crea columnas; el alumnado publica tarjetas con texto, imágenes, enlaces o vídeos. Las tarjetas se pueden mover, recibir likes y comentarios. Board es accesible, visualmente atractivo e ideal para lluvia de ideas, sondeos de expectativas, recopilación de ejemplos o bases de conocimiento colectivas. Sustituye herramientas externas como Padlet directamente en Moodle, respetando la privacidad.", goals:{ info:"Sí. Colección de fuentes, imágenes y enlaces como base de conocimiento visual.", bewerten:"Parcialmente. Likes posibles, sin verdadera lógica de calificación.", komm:"Sí. Lluvia de ideas, sondeos de expectativas, recopilación colectiva – accesible y visual.", collab:"Sí. Formato clásico de notas adhesivas para recopilar y estructurar.", bloomG:"Típicamente 3/6 (aplicar); para tareas estructurantes hasta el nivel 4 (analizar)." }},
    anwesenheit: { name:"Asistencia", desc:"Registrar la asistencia por sesión", complexityText:"Herramienta administrativa.", docsUrl:"https://moodle.org/plugins/mod_attendance", longDesc:"Asistencia es el plugin estándar para gestión de asistencia en Moodle. El profesorado planifica sesiones (únicas o en serie), registra por sesión el estado del alumnado (presente, retraso, justificado, ausente) o permite que el alumnado se registre por sí mismo. Los informes muestran el balance por persona y por curso. La asistencia puede ponderarse en la nota final – ideal para cursos presenciales, aprendizaje híbrido y obligaciones de asistencia.", goals:{ info:"Parcialmente. El alumnado ve su propio balance de asistencia.", bewerten:"Sí. La asistencia puede integrarse en la nota final; informes para el profesorado.", komm:"No. Pura herramienta administrativa sin función de comunicación.", collab:"No. Sin función colaborativa.", bloomG:"1/6 – herramienta administrativa, sin objetivo de aprendizaje directo." }},
    lerntagebuch: { name:"Diario", desc:"Diario de reflexión privado entre estudiante y docente", complexityText:"Diálogo confidencial.", docsUrl:"https://moodle.org/plugins/mod_diary", longDesc:"El Diario (Diary) es deliberadamente una actividad privada: el alumnado escribe entradas sobre preguntas de reflexión o sobre su propio progreso; solo el profesorado ve la entrada y comenta. Fomenta la metacognición y la autorreflexión y permite retroalimentación cualitativa e individual. Adecuado para acompañar el proceso de aprendizaje, prácticas, coaching y cualquier escenario en el que la implicación personal sea más importante que un producto común.", goals:{ info:"Parcialmente. Más reflexión sobre la propia experiencia que transmisión de conocimiento.", bewerten:"Sí. Evaluación de la profundidad de reflexión, retroalimentación cualitativa del docente.", komm:"Sí. Diálogo 1:1 entre estudiante y docente, confidencial.", collab:"No. Deliberadamente privado – no visible para otras personas.", bloomG:"5/6 (evaluar / reflexionar). Alta exigencia metacognitiva." }}
  }
};

// Merge translation onto German source. Missing keys silently fall back.
function localizeTool(tool, lang) {
  if (lang === "de") return tool;
  const tr = (TOOL_TRANSLATIONS[lang] || {})[tool.id];
  if (!tr) return tool;
  const trGoals = tr.goals || {};
  return {
    ...tool,
    name: tr.name || tool.name,
    desc: tr.desc || tool.desc,
    complexityText: tr.complexityText || tool.complexityText,
    longDesc: tr.longDesc || tool.longDesc,
    docsUrl: tr.docsUrl || tool.docsUrl,
    goals: {
      info:     { ...tool.goals.info,     t: trGoals.info     || tool.goals.info.t },
      bewerten: { ...tool.goals.bewerten, t: trGoals.bewerten || tool.goals.bewerten.t },
      komm:     { ...tool.goals.komm,     t: trGoals.komm     || tool.goals.komm.t },
      collab:   { ...tool.goals.collab,   t: trGoals.collab   || tool.goals.collab.t },
      bloomG:   { ...tool.goals.bloomG,   t: trGoals.bloomG   || tool.goals.bloomG.t }
    }
  };
}

// Tool icon data: SVG + background color per Moodle category
const TOOL_ICONS = {
  datei:      {bg:"#DDA4C9", svg:`<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" stroke="white" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M14 2v6h6" stroke="white" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`},
  verzeichnis:{bg:"#DDA4C9", svg:`<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2v11z" stroke="white" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`},
  textseite:  {bg:"#DDA4C9", svg:`<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" stroke="white" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M14 2v6h6M8 13h8M8 17h8M8 9h2" stroke="white" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`},
  buch:       {bg:"#DDA4C9", svg:`<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke="white" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" stroke="white" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 7h8M8 11h5" stroke="white" stroke-width="1.8" fill="none" stroke-linecap="round"/>`},
  url:        {bg:"#DDA4C9", svg:`<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" stroke="white" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" stroke="white" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`},
  lernpaket:  {bg:"#DDA4C9", svg:`<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" stroke="white" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" stroke="white" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`},
  wiki:       {bg:"#A5C387", svg:`<path d="M12 20h9" stroke="white" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" stroke="white" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`},
  glossar:    {bg:"#A5C387", svg:`<rect x="3" y="2" width="18" height="20" rx="3" stroke="white" stroke-width="1.8" fill="none"/><path d="M8 6h2" stroke="white" stroke-width="1.8" fill="none" stroke-linecap="round"/><path d="M12 6.25a3.5 3.5 0 0 1 3.5 3.5v.5" stroke="white" stroke-width="1.8" fill="none" stroke-linecap="round"/><circle cx="12" cy="16" r="0.5" fill="white" stroke="white" stroke-width="1"/>`},
  datenbank:  {bg:"#A5C387", svg:`<ellipse cx="12" cy="5" rx="9" ry="3" stroke="white" stroke-width="1.8" fill="none"/><path d="M21 12c0 1.66-4.03 3-9 3s-9-1.34-9-3" stroke="white" stroke-width="1.8" fill="none"/><path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" stroke="white" stroke-width="1.8" fill="none"/>`},
  forum:      {bg:"#65A1B3", svg:`<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z" stroke="white" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 9h8M8 13h5" stroke="white" stroke-width="1.8" fill="none" stroke-linecap="round"/>`},
  chat:       {bg:"#65A1B3", svg:`<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" stroke="white" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`},
  bbb:        {bg:"#65A1B3", svg:`<rect x="2" y="3" width="20" height="14" rx="2" stroke="white" stroke-width="1.8" fill="none"/><path d="M8 21h8M12 17v4" stroke="white" stroke-width="1.8" fill="none" stroke-linecap="round"/><circle cx="12" cy="10" r="2.5" stroke="white" stroke-width="1.5" fill="none"/>`},
  test:       {bg:"#7C6576", svg:`<path d="M9 11l3 3L22 4" stroke="white" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" stroke="white" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`},
  aufgabe:    {bg:"#7C6576", svg:`<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" stroke="white" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M14 2v6h6" stroke="white" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 15l2 2 4-4" stroke="white" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`},
  lektion:    {bg:"#7C6576", svg:`<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2V3z" stroke="white" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7V3z" stroke="white" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`},
  beurteilung:{bg:"#7C6576", svg:`<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="white" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="9" cy="7" r="4" stroke="white" stroke-width="1.8" fill="none"/><path d="M23 21v-2a4 4 0 0 0-3-3.87" stroke="white" stroke-width="1.8" fill="none" stroke-linecap="round"/><path d="M16 3.13a4 4 0 0 1 0 7.75" stroke="white" stroke-width="1.8" fill="none" stroke-linecap="round"/>`},
  abstimmung: {bg:"#7C6576", svg:`<rect x="4" y="14" width="4" height="7" rx="1" stroke="white" stroke-width="1.8" fill="none"/><rect x="10" y="8" width="4" height="13" rx="1" stroke="white" stroke-width="1.8" fill="none"/><rect x="16" y="3" width="4" height="18" rx="1" stroke="white" stroke-width="1.8" fill="none"/>`},
  h5p:        {bg:"#3AADAA", svg:`<circle cx="12" cy="12" r="9" stroke="white" stroke-width="1.8" fill="none"/><polygon points="10,8 16,12 10,16" fill="white"/>`},
  extern:     {bg:"#3AADAA", svg:`<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" stroke="white" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M15 3h6v6" stroke="white" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M10 14L21 3" stroke="white" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`},
  umfrage:    {bg:"#8A8A8E", svg:`<path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" stroke="white" stroke-width="1.8" fill="none" stroke-linecap="round"/><rect x="8" y="2" width="8" height="4" rx="1" stroke="white" stroke-width="1.8" fill="none"/><path d="M8 12h4M8 16h6" stroke="white" stroke-width="1.8" fill="none" stroke-linecap="round"/>`},
  feedback:   {bg:"#8A8A8E", svg:`<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="white" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="white" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`},
  board:      {bg:"#f98012", svg:`<rect x="3" y="4" width="18" height="16" rx="2" stroke="white" stroke-width="1.8" fill="none"/><line x1="9" y1="4" x2="9" y2="20" stroke="white" stroke-width="1.8"/><line x1="15" y1="4" x2="15" y2="20" stroke="white" stroke-width="1.8"/><rect x="4.5" y="6" width="3" height="4" fill="white"/><rect x="10.5" y="6" width="3" height="3" fill="white"/><rect x="16.5" y="6" width="3" height="5" fill="white"/>`},
  anwesenheit:{bg:"#669933", svg:`<rect x="4" y="3" width="16" height="18" rx="2" stroke="white" stroke-width="1.8" fill="none"/><path d="M8 11l2 2 5-5" stroke="white" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/><line x1="8" y1="16" x2="16" y2="16" stroke="white" stroke-width="1.5" stroke-linecap="round"/><line x1="8" y1="18.5" x2="14" y2="18.5" stroke="white" stroke-width="1.5" stroke-linecap="round"/>`},
  lerntagebuch:{bg:"#194866", svg:`<path d="M4 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4z" stroke="white" stroke-width="1.8" fill="none"/><line x1="8" y1="7" x2="16" y2="7" stroke="white" stroke-width="1.5" stroke-linecap="round"/><line x1="8" y1="11" x2="16" y2="11" stroke="white" stroke-width="1.5" stroke-linecap="round"/><line x1="8" y1="15" x2="13" y2="15" stroke="white" stroke-width="1.5" stroke-linecap="round"/>`},
};

// SVG path data for goal icons (white stroke on colored bg, or colored stroke standalone)
const GOAL_SVG = {
  info: `<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2V3z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7V3z"/>`,
  bewerten: `<path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>`,
  komm: `<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z"/>`,
  collab: `<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>`,
  bloomG: `<polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>`,
};

// ============================================================================
// i18n
// ============================================================================
const I18N = {
  de: {
    title: "Moodle Tool Guide",
    subtitle: "Finden Sie das passende Werkzeug für Ihr didaktisches Ziel",
    guide_intro: "Dieser Moodle Tool Guide bietet eine kompakte Übersicht und Vergleichsmöglichkeit der Aktivitäten und Materialien in Moodle. Er kann bei der Auswahl geeigneter Werkzeuge in Abhängigkeit von zum Beispiel didaktischen Zielsetzungen oder verfügbarer Zeit unterstützen. Dafür wurden alle Werkzeuge entsprechend der Lernzieltaxonomie von Benjamin Bloom eingeordnet. Er richtet sich an Lehrende, Trainer*innen sowie Fachkräfte im Bildungsbereich.",
    bloom_intro: "Die sogenannte Lernzieltaxonomie von Benjamin Bloom ordnet Lernen in Stufen der kognitiven Tiefe ein. Sie hilft dabei, Lernziele klar zu formulieren, Kompetenzniveaus sichtbarer zu machen und Lerneinheiten gezielt danach zu strukturieren. Sie ist bis heute ein zentrales Referenzmodell in Didaktik und Bildung.",
    info_toolguide: "Infos zum Tool Guide",
    info_bloom: "Was bedeutet Bloom?",
    matrix_goal_axis: "Was wollen Sie bewirken (didaktisch)?",
    matrix_tool_axis: "Was können Sie verwenden (technisch)?",
    matrix_reading_show: "Matrix lesen",
    matrix_reading_hide: "Lesepfeile ausblenden",
    matrix_reading_hint: "Blendet die Leserichtungen ein: didaktische Ziele waagerecht, technische Auswahl senkrecht.",
    a11y_open_tool_details: "Details zu {name} öffnen",
    nav_matrix: "Matrix",
    nav_cards: "Karten",
    nav_wizard: "Assistent",
    search_placeholder: "Tool suchen…",
    compare_btn: "Vergleichen",
    compare_new: "Neuen Vergleich starten",
    filter_setup_all: "Aufwand Einrichtung: alle",
    filter_support_all: "Aufwand Betreuung: alle",
    filter_goal_default: "Gut geeignet für …",
    filter_bloom_all: "🎓 Bloom: Alle Stufen",
    filter_bloom_from: "ab Stufe",
    setup: "Einrichtung",
    setup_help: "Wie viel Aufwand kostet es, diese Aktivität EINMALIG anzulegen und zu konfigurieren?",
    support: "Betreuung",
    support_help: "Wie viel laufender Aufwand entsteht WÄHREND der Nutzung – moderieren, bewerten, antworten?",
    setup_einfach: "Einfach",
    setup_mittel: "Mittel",
    setup_komplex: "Komplex",
    support_gering: "Gering",
    support_mittel: "Mittel",
    support_hoch: "Hoch",
    activity: "Aktivität",
    bloom_short: "Bloom",
    bloom_help: "Welche kognitiven Lernzielstufen nach Bloom's Taxonomie deckt diese Aktivität typischerweise ab? 1=Wiedergeben, 6=Erschaffen.",
    suit_good: "Gut geeignet",
    suit_partial: "Teilweise geeignet",
    suit_bad: "Ungeeignet",
    empty_title: "Keine passenden Aktivitäten gefunden",
    empty_text: "Zu der gewählten Kombination gibt es in Moodle keine passende Aktivität. Lockern Sie einen oder mehrere Filter, um Vorschläge zu erhalten – oder probieren Sie den Assistenten für eine geführte Auswahl.",
    empty_reset: "Filter zurücksetzen",
    wizard_step1: "Ziel",
    wizard_step2: "Einrichtung",
    wizard_step3: "Betreuung",
    wizard_step4: "Bloom",
    wizard_q1: "Was möchten Sie erreichen?",
    wizard_q2: "Wie viel Aufwand für die Einrichtung darf es sein?",
    wizard_q3: "Wie viel Aufwand für die laufende Betreuung darf es sein?",
    wizard_results: "passende Tools gefunden",
    wizard_back: "Zurück",
    wizard_restart: "Neu starten",
    wizard_skip: "Egal",
    wizard_skip_desc: "Spielt keine Rolle",
    overview: "Überblick",
    suitability_header: "Eignung nach didaktischem Ziel",
    docs_btn: "Moodle Docs",
    community_btn: "Mehr Infos und Ideen in der eledia.community",
    in_compare: "✓ Im Vergleich",
    add_compare: "+ Vergleichen",
    description: "Beschreibung",
    repo_btn: "Quellcode auf GitHub",
    footer: "Basierend auf dem Moodle Tool Guide · eLeDia · Idee: Joyce Seitzinger",
    bloom_levels: ["Wiedergeben", "Verstehen", "Anwenden", "Analysieren", "Bewerten", "Erschaffen"],
    bloom_descs: [
      "Fakten und grundlegende Konzepte abrufen.",
      "Ideen oder Konzepte in eigenen Worten wiedergeben.",
      "Informationen in neuen Situationen nutzen.",
      "Verbindungen zwischen Ideen herstellen.",
      "Basierend auf den Lernmaterialien einen Standpunkt rechtfertigen.",
      "Eine neue oder originelle Arbeit entwickeln."
    ],
    goals: {
      info: { label: "Information & Transfer", q: "Ist es geeignet zur Weitergabe von Informationen?" },
      bewerten: { label: "Bewerten", q: "Ermöglicht es, den Kenntnisstand zu erfassen?" },
      komm: { label: "Kommunikation & Interaktion", q: "Kann es zur Kommunikation genutzt werden?" },
      collab: { label: "Gemeinsam Inhalte erstellen", q: "Können Inhalte kooperativ erstellt werden?" },
      bloomG: { label: "Bloom's Lernziele", q: "Welche Lernziele werden unterstützt?" }
    }
  ,
    wizard_step5: "Ergebnis"
  ,
    wizard_q4: "Welche Bloom-Stufe mindestens?"
  ,
    credit_original: "Original-Konzept"
  ,
    credit_translation: "Basiert auf einer Übersetzung von"
  ,
    dialog_close: "Schließen"
  ,
    credit_license: "Lizenz"
  ,
    credit_eledia: "Angepasst von den Moodle-Expert*innen von eLeDia | eLearning im Dialog. Mehr Moodle-Wissen auf"
  ,
    wizard_breadcrumb: "Assistent-Schritte"
  ,
    wizard_jump_to: "Zurück zu Schritt"
  ,
    a11y_font_larger: "Schrift größer"
  ,
    a11y_font_smaller: "Schrift kleiner"
  ,
    a11y_font_reset: "Schrift normal"
  ,
    alt_eledia_logo: "eLeDia – eLearning im Dialog"
  ,
    alt_eledia_favicon: "eLeDia Logo"
  ,
    alt_moodle_partner: "Moodle Premium Certified Services Provider"
  ,
    alt_github: "Quellcode auf GitHub"
  ,
    alt_cc_byncsa: "Lizenz: Creative Commons Namensnennung – Nicht-kommerziell – Weitergabe unter gleichen Bedingungen 4.0 International",
    skip_to_content: "Zum Inhalt springen",
    a11y_font_group: "Schriftgröße",
    language: "Sprache",
    views: "Ansichten",
    search: "Suche",
    matrix_aria: "Moodle Tool Guide Matrix"
  },
  en: {
    title: "Moodle Tool Guide",
    subtitle: "Find the right tool for your didactic goal",
    guide_intro: "This Moodle Tool Guide provides a compact overview and comparison of activities and resources in Moodle. It supports the selection of suitable tools based on didactic goals or available time. All tools are classified according to Benjamin Bloom's taxonomy of learning objectives. It is intended for teachers, trainers and education professionals.",
    bloom_intro: "Benjamin Bloom's taxonomy of learning objectives arranges learning into levels of cognitive depth. It helps formulate learning objectives clearly, make competence levels more visible and structure learning units accordingly. It remains a central reference model in didactics and education.",
    info_toolguide: "About the Tool Guide",
    info_bloom: "What does Bloom mean?",
    matrix_goal_axis: "What do you want to achieve (didactically)?",
    matrix_tool_axis: "What can you use (technically)?",
    matrix_reading_show: "Read matrix",
    matrix_reading_hide: "Hide reading arrows",
    matrix_reading_hint: "Shows the reading directions: didactic goals horizontally, technical choice vertically.",
    a11y_open_tool_details: "Open details for {name}",
    nav_matrix: "Matrix",
    nav_cards: "Cards",
    nav_wizard: "Wizard",
    search_placeholder: "Search tool…",
    compare_btn: "Compare",
    compare_new: "Start new comparison",
    filter_setup_all: "Setup effort: all",
    filter_support_all: "Support effort: all",
    filter_goal_default: "Well suited for …",
    filter_bloom_all: "🎓 Bloom: all levels",
    filter_bloom_from: "from level",
    setup: "Setup",
    setup_help: "How much effort does it take to ONE-TIME create and configure this activity?",
    support: "Support",
    support_help: "How much ongoing effort is needed DURING use – moderating, grading, replying?",
    setup_einfach: "Easy",
    setup_mittel: "Medium",
    setup_komplex: "Complex",
    support_gering: "Low",
    support_mittel: "Medium",
    support_hoch: "High",
    activity: "Activity",
    bloom_short: "Bloom",
    bloom_help: "Which cognitive learning levels of Bloom's Taxonomy does this activity typically support? 1=Remember, 6=Create.",
    suit_good: "Well suited",
    suit_partial: "Partially suited",
    suit_bad: "Not suited",
    empty_title: "No matching activities found",
    empty_text: "There is no Moodle activity that matches the selected combination. Loosen one or more filters to see suggestions – or try the Wizard for a guided selection.",
    empty_reset: "Reset filters",
    wizard_step1: "Goal",
    wizard_step2: "Setup",
    wizard_step3: "Support",
    wizard_step4: "Bloom",
    wizard_q1: "What do you want to achieve?",
    wizard_q2: "How much setup effort is acceptable?",
    wizard_q3: "How much ongoing support effort is acceptable?",
    wizard_results: "matching tools found",
    wizard_back: "Back",
    wizard_restart: "Start over",
    wizard_skip: "Any",
    wizard_skip_desc: "Doesn't matter",
    overview: "Overview",
    suitability_header: "Suitability by didactic goal",
    docs_btn: "Moodle Docs",
    community_btn: "More ideas at eledia.community",
    in_compare: "✓ In comparison",
    add_compare: "+ Compare",
    description: "Description",
    repo_btn: "Source on GitHub",
    footer: "Based on the Moodle Tool Guide · eLeDia · Idea: Joyce Seitzinger",
    bloom_levels: ["Remember", "Understand", "Apply", "Analyze", "Evaluate", "Create"],
    bloom_descs: [
      "Recall facts and basic concepts.",
      "Explain ideas or concepts in your own words.",
      "Use information in new situations.",
      "Draw connections among ideas.",
      "Justify a stand or decision based on the material.",
      "Produce new or original work."
    ],
    goals: {
      info: { label: "Information & Transfer", q: "Is it suitable for delivering information?" },
      bewerten: { label: "Assessment", q: "Does it allow measuring knowledge?" },
      komm: { label: "Communication & Interaction", q: "Can it be used for communication?" },
      collab: { label: "Collaborative Creation", q: "Can content be created cooperatively?" },
      bloomG: { label: "Bloom's Learning Goals", q: "Which learning goals are supported?" }
    }
  ,
    wizard_step5: "Result"
  ,
    wizard_q4: "Minimum Bloom level?"
  ,
    credit_original: "Original concept"
  ,
    credit_translation: "Based on a translation by"
  ,
    dialog_close: "Close"
  ,
    credit_license: "License"
  ,
    credit_eledia: "Adapted by the Moodle experts of eLeDia | eLearning im Dialog. More Moodle know-how at"
  ,
    wizard_breadcrumb: "Wizard steps"
  ,
    wizard_jump_to: "Back to step"
  ,
    a11y_font_larger: "Larger text"
  ,
    a11y_font_smaller: "Smaller text"
  ,
    a11y_font_reset: "Reset text size"
  ,
    alt_eledia_logo: "eLeDia – eLearning im Dialog"
  ,
    alt_eledia_favicon: "eLeDia logo"
  ,
    alt_moodle_partner: "Moodle Premium Certified Services Provider"
  ,
    alt_github: "Source on GitHub"
  ,
    alt_cc_byncsa: "License: Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International",
    skip_to_content: "Skip to content",
    a11y_font_group: "Text size",
    language: "Language",
    views: "Views",
    search: "Search",
    matrix_aria: "Moodle Tool Guide matrix"
  },
  fr: {
    title: "Guide des outils Moodle",
    subtitle: "Trouvez l'outil adapté à votre objectif didactique",
    guide_intro: "Ce Moodle Tool Guide offre un aperçu compact et une possibilité de comparaison des activités et ressources dans Moodle. Il aide à choisir des outils adaptés en fonction, par exemple, des objectifs pédagogiques ou du temps disponible. Tous les outils sont classés selon la taxonomie des objectifs d'apprentissage de Benjamin Bloom. Il s'adresse aux enseignant·es, formateur·rices et professionnel·les de l'éducation.",
    bloom_intro: "La taxonomie des objectifs d'apprentissage de Benjamin Bloom organise l'apprentissage en niveaux de profondeur cognitive. Elle aide à formuler clairement les objectifs, à rendre les niveaux de compétence plus visibles et à structurer les unités d'apprentissage en conséquence. Elle reste un modèle de référence central en didactique et en éducation.",
    info_toolguide: "Infos sur le Tool Guide",
    info_bloom: "Que signifie Bloom ?",
    matrix_goal_axis: "Que voulez-vous produire (didactiquement) ?",
    matrix_tool_axis: "Que pouvez-vous utiliser (techniquement) ?",
    matrix_reading_show: "Lire la matrice",
    matrix_reading_hide: "Masquer les flèches",
    matrix_reading_hint: "Affiche les sens de lecture : objectifs didactiques à l'horizontale, choix technique à la verticale.",
    a11y_open_tool_details: "Ouvrir les détails de {name}",
    nav_matrix: "Matrice",
    nav_cards: "Cartes",
    nav_wizard: "Assistant",
    search_placeholder: "Rechercher un outil…",
    compare_btn: "Comparer",
    compare_new: "Commencer une nouvelle comparaison",
    filter_setup_all: "Effort de mise en place : tous",
    filter_support_all: "Effort d'animation : tous",
    filter_goal_default: "Bien adapté pour …",
    filter_bloom_all: "🎓 Bloom : tous les niveaux",
    filter_bloom_from: "à partir du niveau",
    setup: "Mise en place",
    setup_help: "Quel effort faut-il pour créer et configurer cette activité UNE FOIS ?",
    support: "Animation",
    support_help: "Quel effort continu est nécessaire PENDANT l'utilisation – modérer, évaluer, répondre ?",
    setup_einfach: "Facile",
    setup_mittel: "Moyen",
    setup_komplex: "Complexe",
    support_gering: "Faible",
    support_mittel: "Moyen",
    support_hoch: "Élevé",
    activity: "Activité",
    bloom_short: "Bloom",
    bloom_help: "Quels niveaux cognitifs de la taxonomie de Bloom cette activité couvre-t-elle ? 1=Se souvenir, 6=Créer.",
    suit_good: "Bien adapté",
    suit_partial: "Partiellement adapté",
    suit_bad: "Inadapté",
    empty_title: "Aucune activité correspondante",
    empty_text: "Il n'existe pas d'activité Moodle correspondant à cette combinaison. Assouplissez un ou plusieurs filtres pour voir des suggestions – ou essayez l'Assistant pour une sélection guidée.",
    empty_reset: "Réinitialiser les filtres",
    wizard_step1: "Objectif",
    wizard_step2: "Mise en place",
    wizard_step3: "Suivi",
    wizard_step4: "Bloom",
    wizard_q1: "Que voulez-vous accomplir ?",
    wizard_q2: "Combien d'effort de mise en place est acceptable?",
    wizard_q3: "Combien d'effort de suivi continu est acceptable?",
    wizard_results: "outils correspondants trouvés",
    wizard_back: "Retour",
    wizard_restart: "Recommencer",
    wizard_skip: "Peu importe",
    wizard_skip_desc: "Aucune importance",
    overview: "Aperçu",
    suitability_header: "Adéquation par objectif didactique",
    docs_btn: "Docs Moodle",
    community_btn: "Plus d'idées sur eledia.community",
    in_compare: "✓ Dans la comparaison",
    add_compare: "+ Comparer",
    description: "Description",
    repo_btn: "Code source sur GitHub",
    footer: "Basé sur le Moodle Tool Guide · eLeDia · Idée : Joyce Seitzinger",
    bloom_levels: ["Se souvenir", "Comprendre", "Appliquer", "Analyser", "Évaluer", "Créer"],
    bloom_descs: [
      "Rappeler des faits et des concepts de base.",
      "Expliquer des idées ou des concepts en ses propres mots.",
      "Utiliser l'information dans de nouvelles situations.",
      "Établir des liens entre les idées.",
      "Justifier une position en s'appuyant sur le matériel.",
      "Produire un travail nouveau ou original."
    ],
    goals: {
      info: { label: "Information & Transfert", q: "Convient-il à la diffusion d'informations ?" },
      bewerten: { label: "Évaluer", q: "Permet-il de mesurer les connaissances ?" },
      komm: { label: "Communication & Interaction", q: "Peut-il être utilisé pour communiquer ?" },
      collab: { label: "Création collaborative", q: "Le contenu peut-il être créé en coopération ?" },
      bloomG: { label: "Objectifs de Bloom", q: "Quels objectifs d'apprentissage sont soutenus ?" }
    }
  ,
    wizard_step5: "Résultat"
  ,
    wizard_q4: "Niveau Bloom minimum?"
  ,
    credit_original: "Concept original"
  ,
    credit_translation: "Basé sur une traduction de"
  ,
    dialog_close: "Fermer"
  ,
    credit_license: "Licence"
  ,
    credit_eledia: "Adapté par les expert·e·s Moodle de eLeDia | eLearning im Dialog. Plus de savoir Moodle sur"
  ,
    wizard_breadcrumb: "Étapes de l'assistant"
  ,
    wizard_jump_to: "Retour à l'étape"
  ,
    a11y_font_larger: "Texte plus grand"
  ,
    a11y_font_smaller: "Texte plus petit"
  ,
    a11y_font_reset: "Taille normale"
  ,
    alt_eledia_logo: "eLeDia – eLearning im Dialog"
  ,
    alt_eledia_favicon: "Logo eLeDia"
  ,
    alt_moodle_partner: "Moodle Premium Certified Services Provider"
  ,
    alt_github: "Code source sur GitHub"
  ,
    alt_cc_byncsa: "Licence : Creative Commons Attribution – Pas d'utilisation commerciale – Partage dans les mêmes conditions 4.0 International",
    skip_to_content: "Aller au contenu",
    a11y_font_group: "Taille du texte",
    language: "Langue",
    views: "Vues",
    search: "Recherche",
    matrix_aria: "Matrice du Moodle Tool Guide"
  },
  es: {
    title: "Guía de herramientas Moodle",
    subtitle: "Encuentra la herramienta adecuada para tu objetivo didáctico",
    guide_intro: "Este Moodle Tool Guide ofrece una visión general compacta y una posibilidad de comparar actividades y recursos en Moodle. Ayuda a elegir herramientas adecuadas según, por ejemplo, los objetivos didácticos o el tiempo disponible. Todas las herramientas están clasificadas según la taxonomía de objetivos de aprendizaje de Benjamin Bloom. Está dirigido a docentes, formadores y profesionales de la educación.",
    bloom_intro: "La taxonomía de objetivos de aprendizaje de Benjamin Bloom ordena el aprendizaje en niveles de profundidad cognitiva. Ayuda a formular objetivos con claridad, hacer visibles los niveles de competencia y estructurar las unidades de aprendizaje de forma específica. Sigue siendo un modelo de referencia central en didáctica y educación.",
    info_toolguide: "Información sobre el Tool Guide",
    info_bloom: "¿Qué significa Bloom?",
    matrix_goal_axis: "Qué quieres lograr (didácticamente)?",
    matrix_tool_axis: "Qué puedes usar (técnicamente)?",
    matrix_reading_show: "Leer matriz",
    matrix_reading_hide: "Ocultar flechas",
    matrix_reading_hint: "Muestra las direcciones de lectura: objetivos didácticos en horizontal, elección técnica en vertical.",
    a11y_open_tool_details: "Abrir detalles de {name}",
    nav_matrix: "Matriz",
    nav_cards: "Tarjetas",
    nav_wizard: "Asistente",
    search_placeholder: "Buscar herramienta…",
    compare_btn: "Comparar",
    compare_new: "Iniciar nueva comparación",
    filter_setup_all: "Esfuerzo de configuración: todos",
    filter_support_all: "Esfuerzo de tutoría: todos",
    filter_goal_default: "Bien adaptado para …",
    filter_bloom_all: "🎓 Bloom: todos los niveles",
    filter_bloom_from: "desde el nivel",
    setup: "Configuración",
    setup_help: "¿Cuánto esfuerzo cuesta crear y configurar esta actividad UNA VEZ?",
    support: "Tutoría",
    support_help: "¿Cuánto esfuerzo continuo se necesita DURANTE el uso – moderar, evaluar, responder?",
    setup_einfach: "Fácil",
    setup_mittel: "Medio",
    setup_komplex: "Complejo",
    support_gering: "Bajo",
    support_mittel: "Medio",
    support_hoch: "Alto",
    activity: "Actividad",
    bloom_short: "Bloom",
    bloom_help: "¿Qué niveles cognitivos de la Taxonomía de Bloom cubre esta actividad? 1=Recordar, 6=Crear.",
    suit_good: "Bien adaptado",
    suit_partial: "Parcialmente adaptado",
    suit_bad: "No adaptado",
    empty_title: "No se encontraron actividades",
    empty_text: "No hay ninguna actividad de Moodle que coincida con esta combinación. Relaja uno o varios filtros para ver sugerencias – o prueba el Asistente para una selección guiada.",
    empty_reset: "Restablecer filtros",
    wizard_step1: "Objetivo",
    wizard_step2: "Configuración",
    wizard_step3: "Acompañamiento",
    wizard_step4: "Bloom",
    wizard_q1: "¿Qué quieres lograr?",
    wizard_q2: "¿Cuánto esfuerzo de configuración es aceptable?",
    wizard_q3: "¿Cuánto esfuerzo de acompañamiento continuo es aceptable?",
    wizard_results: "herramientas encontradas",
    wizard_back: "Atrás",
    wizard_restart: "Reiniciar",
    wizard_skip: "Cualquiera",
    wizard_skip_desc: "No importa",
    overview: "Resumen",
    suitability_header: "Idoneidad por objetivo didáctico",
    docs_btn: "Documentación Moodle",
    community_btn: "Más ideas en eledia.community",
    in_compare: "✓ En comparación",
    add_compare: "+ Comparar",
    description: "Descripción",
    repo_btn: "Código fuente en GitHub",
    footer: "Basado en el Moodle Tool Guide · eLeDia · Idea: Joyce Seitzinger",
    bloom_levels: ["Recordar", "Comprender", "Aplicar", "Analizar", "Evaluar", "Crear"],
    bloom_descs: [
      "Recordar hechos y conceptos básicos.",
      "Explicar ideas o conceptos con tus propias palabras.",
      "Usar información en nuevas situaciones.",
      "Establecer conexiones entre ideas.",
      "Justificar una postura basándose en el material.",
      "Producir un trabajo nuevo u original."
    ],
    goals: {
      info: { label: "Información y transferencia", q: "¿Es adecuado para transmitir información?" },
      bewerten: { label: "Evaluar", q: "¿Permite medir conocimientos?" },
      komm: { label: "Comunicación e interacción", q: "¿Puede usarse para comunicarse?" },
      collab: { label: "Crear en colaboración", q: "¿Se puede crear contenido cooperativamente?" },
      bloomG: { label: "Objetivos de Bloom", q: "¿Qué objetivos de aprendizaje se apoyan?" }
    }
  ,
    wizard_step5: "Resultado"
  ,
    wizard_q4: "¿Nivel Bloom mínimo?"
  ,
    credit_original: "Concepto original"
  ,
    credit_translation: "Basado en una traducción de"
  ,
    dialog_close: "Cerrar"
  ,
    credit_license: "Licencia"
  ,
    credit_eledia: "Adaptado por las y los expertos Moodle de eLeDia | eLearning im Dialog. Más saber Moodle en"
  ,
    wizard_breadcrumb: "Pasos del asistente"
  ,
    wizard_jump_to: "Volver al paso"
  ,
    a11y_font_larger: "Texto más grande"
  ,
    a11y_font_smaller: "Texto más pequeño"
  ,
    a11y_font_reset: "Tamaño normal"
  ,
    alt_eledia_logo: "eLeDia – eLearning im Dialog"
  ,
    alt_eledia_favicon: "Logo eLeDia"
  ,
    alt_moodle_partner: "Moodle Premium Certified Services Provider"
  ,
    alt_github: "Código fuente en GitHub"
  ,
    alt_cc_byncsa: "Licencia: Creative Commons Atribución – No comercial – Compartir igual 4.0 Internacional",
    skip_to_content: "Saltar al contenido",
    a11y_font_group: "Tamaño del texto",
    language: "Idioma",
    views: "Vistas",
    search: "Buscar",
    matrix_aria: "Matriz de Moodle Tool Guide"
  }
};


// Moodle 5 activity purposes — official color palette from core.
const PURPOSE_COLORS = {
  administration:    "#da58ef",
  assessment:        "#f90086",
  collaboration:     "#5b40ff",
  communication:     "#eb6200",
  interactivecontent:"#8d3d1b",
  content:           "#0099ad"
};

const PURPOSE_LABELS = {
  de: {
    administration:"Verwaltung", assessment:"Bewertung", collaboration:"Zusammenarbeit",
    communication:"Kommunikation", interactivecontent:"Interaktive Inhalte", content:"Ressourcen"
  },
  en: {
    administration:"Administration", assessment:"Assessment", collaboration:"Collaboration",
    communication:"Communication", interactivecontent:"Interactive content", content:"Resources"
  },
  fr: {
    administration:"Administration", assessment:"Évaluation", collaboration:"Collaboration",
    communication:"Communication", interactivecontent:"Contenu interactif", content:"Ressources"
  },
  es: {
    administration:"Administración", assessment:"Evaluación", collaboration:"Colaboración",
    communication:"Comunicación", interactivecontent:"Contenido interactivo", content:"Recursos"
  }
};

// Map every tool id to its Moodle activity purpose.
const TOOL_PURPOSE = {
  datei:"content", verzeichnis:"content", textseite:"content", buch:"content", url:"content",
  wiki:"collaboration", glossar:"collaboration", datenbank:"collaboration", lerntagebuch:"collaboration",
  forum:"communication", chat:"communication", bbb:"communication", abstimmung:"communication",
  feedback:"communication", umfrage:"communication", board:"communication",
  test:"assessment", aufgabe:"assessment", beurteilung:"assessment",
  lektion:"interactivecontent", lernpaket:"interactivecontent", extern:"interactivecontent",
  anwesenheit:"administration"
};

function purposeOf(tool) { return TOOL_PURPOSE[tool.id] || "content"; }
function purposeColor(tool) { return PURPOSE_COLORS[purposeOf(tool)]; }
function purposeLabel(tool, lang) { return (PURPOSE_LABELS[lang]||PURPOSE_LABELS.de)[purposeOf(tool)]; }

const REPO_URL = "https://github.com/jmoskaliuk/local_eledia_moodletoolguide";
const COMMUNITY_TOOLGUIDE_URL = "https://community.eledia.de/blocks/demologin/logindemo.php?course=toolguide";

// Helper function to render text – component must call this with current lang
const __elediaToolguideWpI18n = window.wp && window.wp.i18n ? window.wp.i18n : null;
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
};

// ============================================================================
// Visual helpers
// ============================================================================

// eLeDia palette accent colors for ratings
const rc = r => r==="grün"?"#4F7F25":r==="orange"?"#267372":r==="rot"?"#9A4A00":"#666";
// background tints
const rb = r => r==="grün"?"#d1e0c1":r==="orange"?"#a9cbd5":"#ffecdb";
const rl = (r, lang) => r==="grün"?t(lang,"suit_good"):r==="orange"?t(lang,"suit_partial"):t(lang,"suit_bad");

// setup/support effort labels
const setupLabel = (s, lang) => s==="einfach"?t(lang,"setup_einfach"):s==="mittel"?t(lang,"setup_mittel"):t(lang,"setup_komplex");
const supportLabel = (s, lang) => s==="gering"?t(lang,"support_gering"):s==="mittel"?t(lang,"support_mittel"):t(lang,"support_hoch");
// effort badge colors (eLeDia palette: low=green, medium=blue, high=warm)
const effortColor = level => level==="einfach"||level==="gering"?"#3F641F":level==="mittel"?"#194866":"#9A4A00";
const effortBg = level => level==="einfach"||level==="gering"?"#D1E0C1":level==="mittel"?"#A9CBD5":"#FFECDB";
const effortDots = level => level==="einfach"||level==="gering"?"●○○":level==="mittel"?"●●○":"●●●";
const setupRank = level => ({einfach:1, mittel:2, komplex:3}[level] || 0);
const supportRank = level => ({gering:1, mittel:2, hoch:3}[level] || 0);
const withinMaxSetup = (actual, selected) => !selected || setupRank(actual) <= setupRank(selected);
const withinMaxSupport = (actual, selected) => !selected || supportRank(actual) <= supportRank(selected);

function ToolIcon({toolId, size=32}) {
  const icon = TOOL_ICONS[toolId];
  if (!icon) return null;
  const r = Math.round(size * 0.2);
  const purpose = TOOL_PURPOSE[toolId] || "content";
  const bg = PURPOSE_COLORS[purpose] || icon.bg;
  return React.createElement("span",{
    "aria-hidden":"true",
    style:{display:"inline-flex",alignItems:"center",justifyContent:"center",width:size,height:size,borderRadius:r,background:bg,flexShrink:0},
    dangerouslySetInnerHTML:{__html:`<svg viewBox="0 0 24 24" width="${size*0.6}" height="${size*0.6}">${icon.svg}</svg>`}
  });
}

function GoalIcon({goalKey, color, size=20, title=""}) {
  return React.createElement("span",{
    title:title,
    "aria-hidden": title ? null : "true",
    style:{display:"inline-block",width:size,height:size,pointerEvents:title?"auto":"none"},
    dangerouslySetInnerHTML:{__html:`<svg style="pointer-events:none" viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${GOAL_SVG[goalKey]||""}</svg>`}
  });
}

// Rating icons for matrix cells: up / rotated / down — pure Lucide paths (v1.8.0).
// grün   = lucide thumbs-up
// orange = sideways thumbs-up for "partially suited"
// rot    = lucide thumbs-down
const LUCIDE_STROKE = 'fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"';
const THUMBS_UP_PATH = '<path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z"/><path d="M7 10v12"/>';
const THUMBS_DOWN_PATH = '<path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z"/><path d="M17 14V2"/>';
const THUMBS = {
  grün:   `<g ${LUCIDE_STROKE}>${THUMBS_UP_PATH}</g>`,
  orange: `<g ${LUCIDE_STROKE} transform="rotate(-90 12 12)">${THUMBS_UP_PATH}</g>`,
  rot:    `<g ${LUCIDE_STROKE}>${THUMBS_DOWN_PATH}</g>`
};


// Accessibility: focus trap + initial focus + return focus for modal dialogs
function useFocusTrap(active) {
  const containerRef = React.useRef(null);
  React.useEffect(() => {
    if (!active) return;
    const previouslyFocused = document.activeElement;
    const container = containerRef.current;
    if (!container) return;
    // Initial focus: first focusable in dialog, else container itself
    const getFocusable = () => Array.from(container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )).filter(el => !el.disabled && el.offsetParent !== null);
    const focusables = getFocusable();
    if (focusables.length > 0) {
      focusables[0].focus();
    } else {
      container.setAttribute("tabindex","-1");
      container.focus();
    }
    // Trap Tab cycles
    const handleKeyDown = (e) => {
      if (e.key !== "Tab") return;
      const fs = getFocusable();
      if (fs.length === 0) { e.preventDefault(); return; }
      const first = fs[0];
      const last = fs[fs.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    container.addEventListener("keydown", handleKeyDown);
    return () => {
      container.removeEventListener("keydown", handleKeyDown);
      // Return focus to previously focused element
      if (previouslyFocused && previouslyFocused.focus) {
        try { previouslyFocused.focus(); } catch (e) {}
      }
    };
  }, [active]);
  return containerRef;
}

function ThumbIcon({rating, size=22, title=""}) {
  const color = rc(rating);
  return React.createElement("span", {
    title: title,
    role: "img",
    "aria-label": title,
    style: {display:"inline-flex",alignItems:"center",justifyContent:"center",width:size+10,height:size+10,borderRadius:8,background:rb(rating),color:color,cursor:"help"},
    dangerouslySetInnerHTML: {__html:`<svg width="${size}" height="${size}" viewBox="0 0 24 24" style="pointer-events:none">${THUMBS[rating]||THUMBS.rot}</svg>`}
  });
}

function BloomHats({bloom, lang, size=14, label=""}) {
  // Classic moodletoolguide rendering: n filled mortarboards out of 6.
  const n = parseInt(bloom) || 0;
  const out = [];
  for (let i = 0; i < 6; i++) {
    out.push(React.createElement("span",{
      key:i,
      style:{
        fontSize:size,
        opacity: i < n ? 1 : 0.18,
        filter: i < n ? "none" : "grayscale(1)",
        marginRight:1, lineHeight:1
      },
      "aria-hidden":"true"
    },"\u{1F393}"));
  }
  return React.createElement("span",{
    role:"img","aria-label":label || "Bloom "+n+"/6",
    title: label || null,
    style:{display:"inline-flex",alignItems:"center",lineHeight:1}
  }, out);
}

function BloomBars({bloom, lang, size=14}) {
  const n = parseInt(bloom) || 0;
  const levels = ta(lang,"bloom_levels");
  const descs = ta(lang,"bloom_descs");
  // eLeDia gradient: dark blue → teal → green → yellow → orange (CI tones)
  const colors = ["#194866","#267372","#669933","#A5C387","#FCBC82","#F98012"];
  const barW = Math.round(size * 0.9);
  const barH = Math.max(3, Math.round(size * 0.35));
  return React.createElement("span", {
    role:"img","aria-label":"Bloom "+n+"/6",
    title:"Bloom "+n+"/6",
    style:{display:"inline-flex",flexDirection:"column-reverse",gap:1,alignItems:"flex-start",cursor:"help",padding:"1px 2px"},
  },
    Array.from({length:6},(_,i) => {
      const active = i < n;
      const w = barW * (0.4 + 0.12*i);
      return React.createElement("span",{
        key:i,
        title: (i+1)+". "+levels[i]+(active?" \u2013 "+descs[i]:""),
        "aria-label": (i+1)+". "+levels[i],
        style:{display:"block",width:w,height:barH,borderRadius:1,background:active?colors[i]:"#E9E9E9",transition:"background 0.2s"}
      });
    })
  );
}

// effort badge component – display: "compact" (dots only), "value" (dots+value), "labeled" (dots + "Label: Value")
function EffortBadge({level, kind, lang, display}) {
  const value = kind==="setup" ? setupLabel(level, lang) : supportLabel(level, lang);
  const colLabel = kind==="setup" ? t(lang,"setup") : t(lang,"support");
  const help = kind==="setup" ? t(lang,"setup_help") : t(lang,"support_help");
  display = display || "value";
  if (display === "compact") {
    // matrix cells: dots only, full info via title
    return React.createElement("span", {
      title: colLabel+": "+value+" – "+help,
      role:"img","aria-label":colLabel+": "+value,
      style:{display:"inline-flex",alignItems:"center",justifyContent:"center",fontSize:14,letterSpacing:2,color:effortColor(level),cursor:"help",padding:"4px 6px",borderRadius:8,background:effortBg(level)}
    }, React.createElement("span",{"aria-hidden":"true"},effortDots(level)));
  }
  if (display === "labeled") {
    // cards: only label + dots ("Einrichtung ●○○"), value is in title
    return React.createElement("span", {
      title: help+" – "+value,
      "aria-label": colLabel+": "+value,
      style:{display:"inline-flex",alignItems:"center",gap:6,padding:"4px 10px",borderRadius:12,fontSize:11,fontWeight:600,background:effortBg(level),color:effortColor(level),cursor:"help"}
    },
      React.createElement("span",{"aria-hidden":"true",style:{fontSize:10,letterSpacing:1.5}},effortDots(level)),
      React.createElement("span",null,colLabel)
    );
  }
  // default "value": dots + value
  return React.createElement("span", {
    title: help+" – "+value,
    style: {display:"inline-flex",alignItems:"center",gap:4,padding:"3px 8px",borderRadius:12,fontSize:11,fontWeight:600,background:effortBg(level),color:effortColor(level),cursor:"help"}
  },
    React.createElement("span",{"aria-hidden":"true",style:{fontSize:9,letterSpacing:1}},effortDots(level)),
    value
  );
}

// ============================================================================
// Components
// ============================================================================
function ToolCard({tool, onSelect, onCompare, isC, lang}) {
  const goals = ["info","bewerten","komm","collab","bloomG"];
  return React.createElement("div", {
    onClick:()=>onSelect(tool),
    role:"button",
    tabIndex:0,
    onKeyDown:e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();onSelect(tool);}},
    "aria-label":tool.name,
    style:{background:"white",borderRadius:12,padding:18,cursor:"pointer",boxShadow:"0 1px 3px rgba(0,0,0,0.08)",border:isC?"2px solid #f98012":"2px solid transparent",transition:"all 0.2s",display:"flex",flexDirection:"column",height:"100%"},
    onMouseEnter:e=>{e.currentTarget.style.boxShadow="0 4px 12px rgba(0,0,0,0.12)";e.currentTarget.style.transform="translateY(-2px)"},
    onMouseLeave:e=>{e.currentTarget.style.boxShadow="0 1px 3px rgba(0,0,0,0.08)";e.currentTarget.style.transform="none"}
  },
    React.createElement("div",{style:{display:"flex",gap:12,alignItems:"flex-start",marginBottom:12}},
      React.createElement(ToolIcon,{toolId:tool.id,size:42}),
      React.createElement("div",{style:{flex:1,minWidth:0}},
        React.createElement("h3",{style:{margin:0,fontSize:17,color:"#194866",fontWeight:700}},tool.name),
        React.createElement("p",{style:{margin:"2px 0 0",fontSize:12,color:"#707070",lineHeight:1.3}},tool.desc)
      )
    ),
    React.createElement("div",{style:{display:"flex",gap:6,marginBottom:10,flexWrap:"wrap"}},
      React.createElement(EffortBadge,{level:tool.setup,kind:"setup",lang:lang,display:"labeled"}),
      React.createElement(EffortBadge,{level:tool.support,kind:"support",lang:lang,display:"labeled"})
    ),
    React.createElement("div",{style:{display:"flex",gap:6,marginBottom:10,flexWrap:"wrap",alignItems:"center"}},
      goals.map(gk=>{
        const isBloom = gk==="bloomG";
        const label = isBloom ? tg(lang,gk).label+": "+tool.bloom : tg(lang,gk).label+": "+rl(tool.goals[gk].r,lang);
        return React.createElement("span",{key:gk,title:label,role:"img","aria-label":label,style:{display:"inline-flex",alignItems:"center",justifyContent:"center",width:30,height:30,borderRadius:8,background:isBloom?"#F3F5F8":rb(tool.goals[gk].r),cursor:"help"}},
          React.createElement(GoalIcon,{goalKey:gk,color:isBloom?"#8A8A8E":rc(tool.goals[gk].r),size:16})
        );
      })
    ),
    React.createElement("div",{style:{marginBottom:10}},React.createElement(BloomHats,{bloom:tool.bloom,lang:lang,size:25})),
    React.createElement("p",{style:{fontSize:11,color:"#707070",lineHeight:1.4,margin:"0 0 10px",borderTop:"1px solid #E9E9E9",paddingTop:8,fontStyle:"italic"}},tool.complexityText),
    onCompare&&React.createElement("div",{style:{display:"flex",justifyContent:"flex-end",alignItems:"center",marginTop:"auto"}},
      React.createElement("button",{onClick:e=>{e.stopPropagation();onCompare(tool.id)},style:{fontSize:11,padding:"4px 10px",borderRadius:6,border:isC?"1px solid #f98012":"1px solid #E9E9E9",background:isC?"#FFECDB":"white",color:isC?"#f98012":"#707070",cursor:"pointer"}},isC?t(lang,"in_compare"):t(lang,"add_compare"))
    )
  );
}

function MatrixReadGuide({lang}) {
  const orange = "#F98012";
  const ink = "#194866";
  return React.createElement("div",{
    "aria-hidden":"true",
    style:{minWidth:900,display:"grid",gridTemplateColumns:"210px 90px 90px minmax(420px,1fr)",columnGap:0,alignItems:"end",marginBottom:8,padding:"2px 4px 0"}
  },
    React.createElement("div",null),
    React.createElement("div",null),
    React.createElement("div",null),
    React.createElement("div",{style:{height:58,position:"relative",display:"flex",alignItems:"center"}},
      React.createElement("div",{style:{position:"absolute",left:0,right:24,top:"50%",height:3,background:orange,borderRadius:99,opacity:0.95}}),
      React.createElement("div",{style:{position:"absolute",right:12,top:"50%",width:15,height:15,borderTop:"3px solid "+orange,borderRight:"3px solid "+orange,transform:"translateY(-50%) rotate(45deg)"}}),
      React.createElement("div",{style:{position:"relative",marginLeft:0,background:"#FFF4EA",border:"1px solid #FCBC82",borderRadius:999,padding:"7px 14px",boxShadow:"0 1px 2px rgba(0,0,0,0.08)"}},
        React.createElement("span",{style:{fontSize:13,lineHeight:1.15,fontWeight:700,color:ink,textAlign:"center"}},
          t(lang,"matrix_goal_axis")
        )
      )
    )
  );
}

function MatrixUseGuideRail({lang}) {
  return React.createElement("div",{
    "aria-hidden":"true",
    style:{width:112,flex:"0 0 112px",paddingTop:72,display:"flex",flexDirection:"column",alignItems:"center"}
  },
    React.createElement("div",{style:{background:"#FFF4EA",border:"1px solid #FCBC82",borderRadius:8,padding:"8px 10px",boxShadow:"0 1px 2px rgba(0,0,0,0.08)",color:"#194866",fontSize:13,lineHeight:1.15,fontWeight:700,textAlign:"center",maxWidth:104}},
      t(lang,"matrix_tool_axis")
    ),
    React.createElement("div",{style:{width:3,height:78,background:"#F98012",borderRadius:99,marginTop:8,opacity:0.95}}),
    React.createElement("div",{style:{width:15,height:15,borderRight:"3px solid #F98012",borderBottom:"3px solid #F98012",transform:"rotate(45deg)",marginTop:-8}})
  );
}

function MobileMatrixView({tools, onSelect, lang}) {
  const [mobileTip,setMobileTip]=React.useState(null);
  const goalKeys = ["info","bewerten","komm","collab"];
  const cell = {padding:"6px 2px",textAlign:"center",borderBottom:"1px solid #E9E9E9",minWidth:31,width:31};
  const tipButton = (label, children) => React.createElement("button",{
    type:"button",
    onClick:e=>{e.stopPropagation();setMobileTip(label);},
    "aria-label":label,
    style:{display:"inline-flex",alignItems:"center",justifyContent:"center",width:28,height:28,padding:0,border:"none",background:"transparent",color:"inherit",cursor:"pointer"}
  },children);
  const effortDot = (level, kind) => {
    const value = kind==="setup" ? setupLabel(level, lang) : supportLabel(level, lang);
    const colLabel = kind==="setup" ? t(lang,"setup") : t(lang,"support");
    return tipButton(colLabel+": "+value,
      React.createElement("span",{
        title: colLabel+": "+value,
        role:"img",
        "aria-label":colLabel+": "+value,
        style:{display:"inline-block",width:11,height:11,borderRadius:"50%",background:effortColor(level),boxShadow:"0 0 0 3px "+effortBg(level)}
      })
    );
  };
  return React.createElement("div",{className:"tg-mobile-matrix",style:{display:"none"}},
    React.createElement("div",{style:{overflowX:"auto",WebkitOverflowScrolling:"touch",border:"1px solid #DDE4EA",borderRadius:10,background:"white",boxShadow:"0 1px 3px rgba(0,0,0,0.06)"}},
      mobileTip&&React.createElement("div",{role:"status","aria-live":"polite",style:{position:"fixed",left:12,right:12,bottom:14,zIndex:220,display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:8,padding:"9px 10px",background:"#FFF4EA",border:"1px solid #FCBC82",borderRadius:8,boxShadow:"0 8px 22px rgba(25,72,102,0.18)",color:"#194866",fontSize:12,lineHeight:1.35}},
        React.createElement("span",null,mobileTip),
        React.createElement("button",{type:"button",onClick:()=>setMobileTip(null),"aria-label":t(lang,"dialog_close"),style:{flex:"0 0 auto",width:22,height:22,border:"1px solid #FCBC82",borderRadius:6,background:"white",color:"#194866",cursor:"pointer",fontSize:15,lineHeight:"18px",padding:0}},"\u00d7")
      ),
      React.createElement("table",{style:{width:"100%",minWidth:306,borderCollapse:"separate",borderSpacing:0,fontSize:11,background:"white",tableLayout:"fixed"},"aria-label":t(lang,"matrix_aria")},
        React.createElement("thead",null,
          React.createElement("tr",null,
            React.createElement("th",{scope:"col",style:{position:"sticky",left:0,zIndex:2,background:"#194866",color:"white",padding:"7px 6px",textAlign:"left",minWidth:110,width:110}},
              t(lang,"activity")
            ),
            React.createElement("th",{scope:"col",title:t(lang,"setup_help"),"aria-label":t(lang,"setup")+". "+t(lang,"setup_help"),style:{...cell,background:"#194866",color:"white",borderBottom:"none"}},
              tipButton(t(lang,"setup")+". "+t(lang,"setup_help"),React.createElement(IconMonitorCog,{size:13,color:"white"}))
            ),
            React.createElement("th",{scope:"col",title:t(lang,"support_help"),"aria-label":t(lang,"support")+". "+t(lang,"support_help"),style:{...cell,background:"#194866",color:"white",borderBottom:"none"}},
              tipButton(t(lang,"support")+". "+t(lang,"support_help"),React.createElement(IconUsers,{size:13,color:"white"}))
            ),
            goalKeys.map(gk=>React.createElement("th",{key:gk,scope:"col",title:tg(lang,gk).label+". "+tg(lang,gk).q,"aria-label":tg(lang,gk).label+". "+tg(lang,gk).q,style:{...cell,background:"#194866",color:"white",borderBottom:"none"}},
              tipButton(tg(lang,gk).label+". "+tg(lang,gk).q,React.createElement(GoalIcon,{goalKey:gk,color:"white",size:13}))
            ))
          )
        ),
        React.createElement("tbody",null,
          tools.map((tool,idx)=>React.createElement("tr",{key:tool.id,style:{background:idx%2===0?"white":"#F3F5F8"}},
            React.createElement("th",{scope:"row",style:{position:"sticky",left:0,zIndex:1,background:"inherit",padding:"6px",borderBottom:"1px solid #E9E9E9",textAlign:"left",minWidth:110,width:110}},
              React.createElement("button",{type:"button",onClick:()=>onSelect(tool),"aria-label":t(lang,"a11y_open_tool_details").replace("{name}",tool.name),style:{display:"grid",gridTemplateColumns:"20px minmax(0,1fr)",alignItems:"center",gap:5,width:"100%",padding:0,border:"none",background:"transparent",color:"#194866",font:"inherit",fontWeight:700,textAlign:"left",cursor:"pointer"}},
                React.createElement(ToolIcon,{toolId:tool.id,size:20}),
                React.createElement("span",{style:{display:"block",minWidth:0,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}},tool.name)
              )
            ),
            React.createElement("td",{style:cell},
              effortDot(tool.setup,"setup")
            ),
            React.createElement("td",{style:cell},
              effortDot(tool.support,"support")
            ),
            goalKeys.map(gk=>{
              const r = tool.goals[gk].r;
              const tooltipText = tg(lang,gk).label+": "+rl(r,lang)+" – "+tool.goals[gk].t;
              return React.createElement("td",{key:gk,style:cell},
                tipButton(tooltipText,
                  React.createElement(ThumbIcon,{rating:r,size:13,title:tooltipText})
                )
              );
            })
          ))
        )
      )
    )
  );
}

function InfoDisclosure({label, text, lang, maxWidth=760}) {
  const [open,setOpen]=React.useState(false);
  return React.createElement("div",{style:{maxWidth:maxWidth}},
    React.createElement("button",{
      type:"button",
      onClick:()=>setOpen(v=>!v),
      "aria-expanded":open,
      style:{display:"inline-flex",alignItems:"center",gap:7,padding:"6px 10px",borderRadius:999,border:"1px solid #A9CBD5",background:open?"#D1ECEB":"white",color:"#194866",cursor:"pointer",fontSize:12,fontWeight:700}
    },
      React.createElement("span",{style:{display:"inline-flex",alignItems:"center",justifyContent:"center",width:18,height:18,borderRadius:"50%",background:"#194866",color:"white",fontSize:12,fontWeight:800,lineHeight:1},"aria-hidden":"true"},"i"),
      label
    ),
    open&&React.createElement("div",{style:{position:"relative",marginTop:8,padding:"12px 42px 12px 14px",background:"white",border:"1px solid #A9CBD5",borderLeft:"4px solid #267372",borderRadius:8,boxShadow:"0 2px 8px rgba(25,72,102,0.08)",color:"#353535",fontSize:13,lineHeight:1.55}},
      React.createElement("button",{
        type:"button",
        onClick:()=>setOpen(false),
        "aria-label":t(lang,"dialog_close"),
        style:{position:"absolute",right:8,top:8,width:26,height:26,borderRadius:6,border:"1px solid #E9E9E9",background:"#F3F5F8",color:"#194866",cursor:"pointer",fontSize:18,lineHeight:"22px"}
      },"\u00d7"),
      text
    )
  );
}

function MatrixView({tools, onSelect, filters, onResetFilters, lang}) {
  const [showReadingGuide,setShowReadingGuide]=React.useState(false);
  const [matrixTip,setMatrixTip]=React.useState(null);
  const detailLabel = name => t(lang,"a11y_open_tool_details").replace("{name}",name);
  const tipButton = (label, children, extraStyle={}) => React.createElement("button",{
    type:"button",
    onClick:e=>{e.stopPropagation();setMatrixTip(label);},
    "aria-label":label,
    style:{display:"inline-flex",alignItems:"center",justifyContent:"center",padding:0,border:"none",background:"transparent",color:"inherit",cursor:"help",font:"inherit",...extraStyle}
  },children);
  let filtered = tools.filter(t=>{
    if(filters.setup&&t.setup!==filters.setup) return false;
    if(filters.support&&t.support!==filters.support) return false;
    if(filters.goal&&filters.onlyGreen&&t.goals[filters.goal]?.r!=="grün") return false;
    if(filters.bloomMin&&parseInt(t.bloom)<filters.bloomMin) return false;
    return true;
  });
  if(filtered.length===0) {
    return React.createElement("div",{role:"status","aria-live":"polite",style:{maxWidth:600,margin:"40px auto",padding:32,background:"#FFECDB",border:"2px dashed #f98012",borderRadius:12,textAlign:"center"}},
      React.createElement("div",{style:{fontSize:48,marginBottom:8},"aria-hidden":"true"},"🔍"),
      React.createElement("h3",{style:{margin:"0 0 8px",color:"#194866",fontSize:18}},t(lang,"empty_title")),
      React.createElement("p",{style:{margin:"0 0 16px",color:"#353535",fontSize:14,lineHeight:1.5}},t(lang,"empty_text")),
      React.createElement("button",{onClick:onResetFilters,style:{padding:"8px 16px",borderRadius:8,border:"none",background:"#b85a00",color:"white",cursor:"pointer",fontSize:13,fontWeight:600}},t(lang,"empty_reset"))
    );
  }
  const goalKeys = ["info","bewerten","komm","collab","bloomG"];
  return React.createElement(React.Fragment,null,
    React.createElement("div",{role:"status","aria-live":"polite",className:"sr-only"},filtered.length+" "+t(lang,"wizard_results")),
    React.createElement(MobileMatrixView,{tools:filtered,onSelect:onSelect,lang:lang}),
    React.createElement("div",{className:"tg-desktop-matrix",style:{paddingTop:2}},
      matrixTip&&React.createElement("div",{role:"status","aria-live":"polite",style:{position:"fixed",left:"50%",bottom:18,transform:"translateX(-50%)",zIndex:220,width:"min(720px, calc(100vw - 24px))",display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:10,padding:"10px 12px",background:"#FFF4EA",border:"1px solid #FCBC82",borderRadius:8,boxShadow:"0 8px 22px rgba(25,72,102,0.18)",color:"#194866",fontSize:13,lineHeight:1.4}},
        React.createElement("span",null,matrixTip),
        React.createElement("button",{type:"button",onClick:()=>setMatrixTip(null),"aria-label":t(lang,"dialog_close"),style:{flex:"0 0 auto",width:24,height:24,border:"1px solid #FCBC82",borderRadius:6,background:"white",color:"#194866",cursor:"pointer",fontSize:16,lineHeight:"20px",padding:0}},"\u00d7")
      ),
      React.createElement("div",{style:{display:"flex",justifyContent:"flex-start",margin:"0 0 10px"}},
        React.createElement("button",{
          type:"button",
          onClick:()=>setShowReadingGuide(v=>!v),
          "aria-expanded":showReadingGuide,
          "aria-label":(showReadingGuide?t(lang,"matrix_reading_hide"):t(lang,"matrix_reading_show"))+". "+t(lang,"matrix_reading_hint"),
          title:t(lang,"matrix_reading_hint"),
          style:{display:"inline-flex",alignItems:"center",gap:7,padding:"6px 12px",borderRadius:999,border:"1px solid #A9CBD5",background:showReadingGuide?"#D1ECEB":"white",color:"#194866",cursor:"pointer",fontSize:12,fontWeight:700}
        },
          React.createElement("span",{style:{display:"inline-flex",alignItems:"center",justifyContent:"center",width:18,height:18,borderRadius:"50%",background:"#194866",color:"white",fontSize:12,fontWeight:800,lineHeight:1},"aria-hidden":"true"},"i"),
          showReadingGuide?t(lang,"matrix_reading_hide"):t(lang,"matrix_reading_show")
        )
      ),
      React.createElement("div",{style:{overflowX:"auto"}},
        React.createElement("div",{style:{minWidth:showReadingGuide?1022:900,display:"flex",alignItems:"flex-start",gap:10}},
          showReadingGuide?React.createElement(MatrixUseGuideRail,{lang:lang}):null,
          React.createElement("div",{style:{minWidth:900,flex:"1 0 900px"}},
            showReadingGuide?React.createElement(MatrixReadGuide,{lang:lang}):null,
            React.createElement("div",{style:{borderRadius:12,boxShadow:"0 1px 3px rgba(0,0,0,0.05)",overflow:"hidden"}},
            React.createElement("table",{style:{width:"100%",borderCollapse:"separate",borderSpacing:0,fontSize:13,background:"white"},"aria-label":t(lang,"matrix_aria")},
              React.createElement("thead",null,
                React.createElement("tr",null,
                  React.createElement("th",{scope:"col",style:{position:"sticky",left:0,background:"#194866",color:"white",padding:"12px 14px",textAlign:"left",zIndex:2,minWidth:210}},
                    t(lang,"activity")
                  ),
                  React.createElement("th",{scope:"col",title:t(lang,"setup_help"),"aria-label":t(lang,"setup")+". "+t(lang,"setup_help"),style:{background:"#194866",color:"white",padding:"12px 8px",textAlign:"center",minWidth:90,cursor:"help"}},
                    tipButton(t(lang,"setup")+". "+t(lang,"setup_help"),React.createElement(IconMonitorCog,{size:16,color:"white"}),{width:28,height:22,opacity:0.9}),
                    React.createElement("div",{style:{fontSize:12,marginTop:4}},t(lang,"setup"))
                  ),
                  React.createElement("th",{scope:"col",title:t(lang,"support_help"),"aria-label":t(lang,"support")+". "+t(lang,"support_help"),style:{background:"#194866",color:"white",padding:"12px 8px",textAlign:"center",minWidth:90,cursor:"help"}},
                    tipButton(t(lang,"support")+". "+t(lang,"support_help"),React.createElement(IconUsers,{size:16,color:"white"}),{width:28,height:22,opacity:0.9}),
                    React.createElement("div",{style:{fontSize:12,marginTop:4}},t(lang,"support"))
                  ),
                  goalKeys.map(gk=>React.createElement("th",{key:gk,scope:"col",title:tg(lang,gk).q,"aria-label":tg(lang,gk).label+". "+tg(lang,gk).q,style:{background:"#194866",color:"white",padding:"12px 10px",textAlign:"center",minWidth:80,cursor:"help"}},
                    tipButton(tg(lang,gk).label+". "+tg(lang,gk).q,React.createElement(GoalIcon,{goalKey:gk,color:"white",size:18}),{width:30,height:24}),
                    React.createElement("div",{style:{fontSize:11,marginTop:4,maxWidth:90,margin:"4px auto 0"}},tg(lang,gk).label)
                  ))
                )
              ),
              React.createElement("tbody",null,
                filtered.map((tool,idx)=>React.createElement("tr",{key:tool.id,
                  style:{background:idx%2===0?"white":"#F3F5F8"},
                  onMouseEnter:e=>e.currentTarget.style.background="#D1ECEB",onMouseLeave:e=>e.currentTarget.style.background=idx%2===0?"white":"#F3F5F8"},
                  React.createElement("td",{style:{position:"sticky",left:0,background:"inherit",padding:"10px 14px",fontWeight:600,borderBottom:"1px solid #E9E9E9",zIndex:1}},
                    React.createElement("button",{type:"button",onClick:()=>onSelect(tool),"aria-label":detailLabel(tool.name),style:{display:"inline-flex",alignItems:"center",gap:8,padding:0,border:"none",background:"transparent",color:"#194866",font: "inherit",fontWeight:600,cursor:"pointer",textAlign:"left"}},
                      React.createElement(ToolIcon,{toolId:tool.id,size:28}),
                      React.createElement("span",null,tool.name)
                    )
                  ),
                  React.createElement("td",{style:{padding:8,textAlign:"center",borderBottom:"1px solid #E9E9E9"}},
                    tipButton(t(lang,"setup")+": "+setupLabel(tool.setup,lang)+" – "+t(lang,"setup_help"),React.createElement(EffortBadge,{level:tool.setup,kind:"setup",lang:lang,display:"compact"}))
                  ),
                  React.createElement("td",{style:{padding:8,textAlign:"center",borderBottom:"1px solid #E9E9E9"}},
                    tipButton(t(lang,"support")+": "+supportLabel(tool.support,lang)+" – "+t(lang,"support_help"),React.createElement(EffortBadge,{level:tool.support,kind:"support",lang:lang,display:"compact"}))
                  ),
                  goalKeys.map(gk=>{
                    const r = tool.goals[gk].r;
                    const tooltipText = tg(lang,gk).label+": "+rl(r,lang)+" – "+tool.goals[gk].t;
                    if (gk==="bloomG") {
                      return React.createElement("td",{key:gk,style:{padding:8,textAlign:"center",borderBottom:"1px solid #E9E9E9"}},
                        tipButton(tooltipText,
                          React.createElement(BloomHats,{bloom:tool.bloom,lang:lang,size:14,label:tooltipText})
                        )
                      );
                    }
                    return React.createElement("td",{key:gk,style:{padding:8,textAlign:"center",borderBottom:"1px solid #E9E9E9"}},
                      tipButton(tooltipText,React.createElement(ThumbIcon,{rating:r,size:22,title:tooltipText}))
                    );
                  })
                ))
              )
            )
            )
          )
        )
      )
    )
  );
}

function DetailModal({tool,onClose,lang}) {
  if(!tool) return null;
  const goalKeys = ["info","bewerten","komm","collab","bloomG"];
  React.useEffect(()=>{
    const h = e => { if(e.key==="Escape") onClose(); };
    document.addEventListener("keydown",h);
    return () => document.removeEventListener("keydown",h);
  },[onClose]);
  const trapRef = useFocusTrap(true);
  return React.createElement("div",{role:"dialog","aria-modal":"true","aria-label":tool.name,style:{position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",zIndex:100,display:"flex",justifyContent:"center",alignItems:"center",padding:20},onClick:onClose},
    React.createElement("div",{ref:trapRef,style:{background:"white",borderRadius:16,maxWidth:700,width:"100%",maxHeight:"90vh",overflow:"auto",padding:24},onClick:e=>e.stopPropagation()},
      React.createElement("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:20,gap:12}},
        React.createElement("div",{style:{display:"flex",gap:14,alignItems:"center",flex:1,minWidth:0}},
          React.createElement(ToolIcon,{toolId:tool.id,size:48}),
          React.createElement("div",{style:{minWidth:0}},
            React.createElement("h2",{style:{margin:0,fontSize:22,color:"#194866"}},tool.name),
            React.createElement("p",{style:{margin:"4px 0 0",color:"#707070",fontSize:14}},tool.desc)
          )
        ),
        React.createElement("button",{onClick:onClose,"aria-label":t(lang,"dialog_close"),style:{background:"none",border:"none",fontSize:28,cursor:"pointer",color:"#8A8A8E",padding:4,lineHeight:1}},"\u00D7")
      ),
      React.createElement("div",{style:{display:"flex",gap:8,marginBottom:16,flexWrap:"wrap"}},
        React.createElement(EffortBadge,{level:tool.setup,kind:"setup",lang:lang}),
        React.createElement(EffortBadge,{level:tool.support,kind:"support",lang:lang}),
        React.createElement("span",{style:{background:"#F3F5F8",padding:"4px 12px",borderRadius:20,fontSize:12,display:"inline-flex",alignItems:"center",gap:6}},"Bloom: ",React.createElement(BloomHats,{bloom:tool.bloom,lang:lang,size:14}))
      ),
      tool.longDesc?React.createElement("div",{style:{margin:"0 0 20px",padding:14,background:"#F3F5F8",borderRadius:10,borderLeft:"4px solid #194866"}},
        React.createElement("h3",{style:{fontSize:14,margin:"0 0 6px",color:"#194866",textTransform:"uppercase",letterSpacing:0.5}},t(lang,"overview")),
        React.createElement("p",{style:{margin:0,fontSize:13,color:"#353535",lineHeight:1.6}},tool.longDesc)
      ):null,
      React.createElement("h3",{style:{fontSize:14,margin:"0 0 12px",color:"#194866",textTransform:"uppercase",letterSpacing:0.5}},t(lang,"suitability_header")),
      goalKeys.map(gk=>{
        const isBloom = gk==="bloomG";
        const tone = isBloom ? "#8A8A8E" : rc(tool.goals[gk].r);
        return React.createElement("div",{key:gk,style:{marginBottom:10,padding:12,background:isBloom?"#F3F5F8":rb(tool.goals[gk].r),borderRadius:10,borderLeft:"4px solid "+tone}},
          React.createElement("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4,gap:8}},
            React.createElement("span",{style:{display:"inline-flex",alignItems:"center",gap:6,fontWeight:600,fontSize:13,color:"#194866"}},React.createElement(GoalIcon,{goalKey:gk,color:tone,size:18}),tg(lang,gk).label),
            React.createElement("span",{style:{fontSize:11,color:tone,fontWeight:600,whiteSpace:"nowrap"}},isBloom?tool.bloom:rl(tool.goals[gk].r,lang))
          ),
          React.createElement("p",{style:{margin:0,fontSize:12,color:"#353535",lineHeight:1.5}},tool.goals[gk].t)
        );
      }),
      React.createElement("div",{style:{display:"flex",gap:10,flexWrap:"wrap",marginTop:20}},
        tool.docsUrl?React.createElement("a",{href:tool.docsUrl,target:"_blank",rel:"noopener",style:{fontSize:13,padding:"8px 16px",borderRadius:8,background:"#A9CBD5",color:"#194866",textDecoration:"none",border:"1px solid #A9CBD5",fontWeight:500}},t(lang,"docs_btn")):null,
        lang==="de"?React.createElement("a",{href:COMMUNITY_TOOLGUIDE_URL,target:"_blank",rel:"noopener",style:{fontSize:13,padding:"8px 16px",borderRadius:8,background:"#FFECDB",color:"#9A4A00",textDecoration:"none",border:"1px solid #FCBC82",fontWeight:600}},t(lang,"community_btn")):null
      )
    )
  );
}

function CompareView({toolIds,tools,onClose,onReset,lang}) {
  const items = toolIds.map(id=>tools.find(t2=>t2.id===id)).filter(Boolean);
  if(items.length<2) return null;
  const goalKeys = ["info","bewerten","komm","collab","bloomG"];
  const trapRef = useFocusTrap(true);
  return React.createElement("div",{role:"dialog","aria-modal":"true","aria-labelledby":"compare-dialog-title",style:{position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",zIndex:100,display:"flex",justifyContent:"center",alignItems:"center",padding:20},onClick:onClose},
    React.createElement("div",{ref:trapRef,style:{background:"white",borderRadius:16,maxWidth:900,width:"100%",maxHeight:"90vh",overflow:"auto",padding:24},onClick:e=>e.stopPropagation()},
      React.createElement("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:20}},
        React.createElement("h2",{id:"compare-dialog-title",style:{margin:0,fontSize:20,color:"#194866"}},t(lang,"compare_btn")),
        React.createElement("button",{onClick:onClose,"aria-label":t(lang,"dialog_close"),style:{background:"none",border:"none",fontSize:24,cursor:"pointer",color:"#8A8A8E"}},"\u00D7")
      ),
      React.createElement("div",{style:{overflowX:"auto"}},
      React.createElement("table",{style:{width:"100%",borderCollapse:"collapse",fontSize:13}},
        React.createElement("thead",null,React.createElement("tr",null,
          React.createElement("th",{scope:"col",style:{textAlign:"left",padding:10,borderBottom:"2px solid #E9E9E9",width:"22%"}}),
          items.map(t2=>React.createElement("th",{scope:"col",key:t2.id,style:{textAlign:"center",padding:10,borderBottom:"2px solid #E9E9E9",fontSize:14}},React.createElement("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:6}},React.createElement(ToolIcon,{toolId:t2.id,size:32}),React.createElement("span",{style:{color:"#194866"}},t2.name))))
        )),
        React.createElement("tbody",null,
          React.createElement("tr",null,React.createElement("td",{style:{padding:10,fontWeight:600,borderBottom:"1px solid #F3F5F8",color:"#707070"}},t(lang,"description")),items.map(t2=>React.createElement("td",{key:t2.id,style:{padding:10,textAlign:"center",borderBottom:"1px solid #F3F5F8",color:"#353535",fontSize:12}},t2.desc))),
          React.createElement("tr",null,React.createElement("td",{style:{padding:10,fontWeight:600,borderBottom:"1px solid #F3F5F8",color:"#707070"}},t(lang,"setup")),items.map(t2=>React.createElement("td",{key:t2.id,style:{padding:10,textAlign:"center",borderBottom:"1px solid #F3F5F8"}},React.createElement(EffortBadge,{level:t2.setup,kind:"setup",lang:lang})))),
          React.createElement("tr",null,React.createElement("td",{style:{padding:10,fontWeight:600,borderBottom:"1px solid #F3F5F8",color:"#707070"}},t(lang,"support")),items.map(t2=>React.createElement("td",{key:t2.id,style:{padding:10,textAlign:"center",borderBottom:"1px solid #F3F5F8"}},React.createElement(EffortBadge,{level:t2.support,kind:"support",lang:lang})))),
          React.createElement("tr",null,React.createElement("td",{style:{padding:10,fontWeight:600,borderBottom:"1px solid #F3F5F8",color:"#707070"}},t(lang,"bloom_short")),items.map(t2=>React.createElement("td",{key:t2.id,style:{padding:10,textAlign:"center",borderBottom:"1px solid #F3F5F8"}},React.createElement(BloomHats,{bloom:t2.bloom,lang:lang,size:14})))),
          goalKeys.map(gk=>{
            return React.createElement("tr",{key:gk},
              React.createElement("td",{style:{padding:10,fontWeight:600,borderBottom:"1px solid #F3F5F8",color:"#707070"}},React.createElement("span",{style:{display:"inline-flex",alignItems:"center",gap:6}},React.createElement(GoalIcon,{goalKey:gk,color:"#353535",size:16}),tg(lang,gk).label)),
              items.map(t2=>{
                return React.createElement("td",{key:t2.id,style:{padding:10,textAlign:"center",borderBottom:"1px solid #F3F5F8"}},
                  React.createElement(ThumbIcon,{rating:t2.goals[gk].r,size:20,title:rl(t2.goals[gk].r,lang)+" – "+t2.goals[gk].t})
                );
              })
            );
          })
        )
      )
      ),
      React.createElement("div",{style:{display:"flex",justifyContent:"flex-end",gap:10,marginTop:18,flexWrap:"wrap"}},
        React.createElement("button",{type:"button",onClick:onReset,style:{padding:"8px 14px",borderRadius:8,border:"none",background:"#b85a00",color:"white",cursor:"pointer",fontSize:13,fontWeight:600}},t(lang,"compare_new")),
        React.createElement("button",{type:"button",onClick:onClose,style:{padding:"8px 14px",borderRadius:8,border:"1px solid #E9E9E9",background:"white",color:"#194866",cursor:"pointer",fontSize:13,fontWeight:600}},t(lang,"dialog_close"))
      )
    )
  );
}

function WizardView({tools,onSelect,lang}) {
  const [step,setStep]=React.useState(0);
  const [goal,setGoal]=React.useState(null);
  const [setup,setSetup]=React.useState(null);
  const [support,setSupport]=React.useState(null);
  const [bloomMin,setBloomMin]=React.useState(0);

  const results = React.useMemo(()=>{
    if(step<4) return [];
    return tools.filter(t2=>{
      if(goal&&t2.goals[goal]?.r==="rot") return false;
      if(!withinMaxSetup(t2.setup, setup)) return false;
      if(!withinMaxSupport(t2.support, support)) return false;
      if(bloomMin>0&&parseInt(t2.bloom)<bloomMin) return false;
      return true;
    }).sort((a,b)=>{
      if(!goal) return 0;
      const o={"grün":0,"orange":1,"rot":2};
      return (o[a.goals[goal].r]||0)-(o[b.goals[goal].r]||0);
    });
  },[step,goal,setup,support,bloomMin,tools]);

  const sty=active=>({padding:"6px 14px",borderRadius:20,fontSize:12,fontWeight:active?600:400,background:active?"#194866":"#F3F5F8",color:active?"white":"#707070",border:"none"});
  const optBtn=(sel,onClick,children)=>React.createElement("button",{className:"tg-wizard-option",onClick,style:{padding:"13px 16px",borderRadius:12,border:sel?"2px solid #b85a00":"2px solid #E9E9E9",background:sel?"#FFECDB":"white",cursor:"pointer",textAlign:"left",fontSize:14,transition:"all 0.15s",width:"100%",maxWidth:"100%",boxSizing:"border-box",overflow:"hidden"}},children);

  const goBack = () => { if(step>0) setStep(step-1); };

  return React.createElement("div",{className:"tg-wizard",style:{maxWidth:600,width:"100%",margin:"0 auto",boxSizing:"border-box"}},
    React.createElement("nav",{"aria-label":t(lang,"wizard_breadcrumb"),style:{display:"flex",gap:6,marginBottom:24,justifyContent:"center",flexWrap:"wrap"}},
      [t(lang,"wizard_step1"),t(lang,"wizard_step2"),t(lang,"wizard_step3"),t(lang,"wizard_step4"),t(lang,"wizard_step5")].map((s,i)=>{
        const reachable = i <= step;
        const active = i === step;
        return React.createElement("button",{
          key:i,
          onClick: reachable ? () => setStep(i) : undefined,
          disabled: !reachable,
          "aria-current": active ? "step" : undefined,
          title: reachable ? t(lang,"wizard_jump_to")+" "+(i+1)+". "+s : "",
          style:{...sty(active), cursor: reachable && !active ? "pointer" : (active ? "default" : "not-allowed"), opacity: reachable ? 1 : 0.45}
        },(i+1)+". "+s);
      })
    ),
    step===0&&React.createElement("div",null,
      React.createElement("h3",{style:{textAlign:"center",marginBottom:20,color:"#194866"}},t(lang,"wizard_q1")),
      React.createElement("div",{className:"tg-wizard-options",style:{display:"grid",gap:10}},
        ["info","bewerten","komm","collab"].map(gk=>optBtn(goal===gk,()=>{setGoal(gk);setStep(1)},
          React.createElement("div",{className:"tg-wizard-option-content",style:{display:"flex",alignItems:"flex-start",gap:10,minWidth:0}},React.createElement(GoalIcon,{goalKey:gk,color:goal===gk?"#f98012":"#353535",size:22}),React.createElement("div",{style:{minWidth:0,flex:1}},React.createElement("strong",{style:{color:"#194866"}},tg(lang,gk).label),React.createElement("br"),React.createElement("span",{style:{display:"block",fontSize:12,color:"#707070",overflowWrap:"anywhere"}},tg(lang,gk).q)))
        ))
      )
    ),
    step===1&&React.createElement("div",null,
      React.createElement("h3",{style:{textAlign:"center",marginBottom:20,color:"#194866"}},t(lang,"wizard_q2")),
      React.createElement("p",{style:{textAlign:"center",fontSize:12,color:"#707070",marginTop:-12,marginBottom:18}},t(lang,"setup_help")),
      React.createElement("div",{style:{display:"grid",gap:10}},
        ["einfach","mittel","komplex"].map(c=>optBtn(setup===c,()=>{setSetup(c);setStep(2)},
          React.createElement("div",{style:{display:"flex",alignItems:"center",gap:10}},
            React.createElement(IconMonitorCog,{size:18,color:effortColor(c)}),
            React.createElement("span",{style:{fontSize:11,letterSpacing:1.5,color:effortColor(c)}},effortDots(c)),
            React.createElement("strong",{style:{color:"#194866"}},setupLabel(c,lang))
          )
        )),
        optBtn(false,()=>{setSetup(null);setStep(2)},React.createElement("strong",{style:{color:"#353535"}},t(lang,"wizard_skip")+" – "+t(lang,"wizard_skip_desc")))
      ),
      React.createElement("div",{style:{display:"flex",justifyContent:"flex-end",marginTop:20}},
        React.createElement("button",{onClick:goBack,style:{padding:"8px 16px",borderRadius:8,border:"1px solid #E9E9E9",background:"white",cursor:"pointer",fontSize:13}},"\u2190 "+t(lang,"wizard_back"))
      )
    ),
    step===2&&React.createElement("div",null,
      React.createElement("h3",{style:{textAlign:"center",marginBottom:20,color:"#194866"}},t(lang,"wizard_q3")),
      React.createElement("p",{style:{textAlign:"center",fontSize:12,color:"#707070",marginTop:-12,marginBottom:18}},t(lang,"support_help")),
      React.createElement("div",{style:{display:"grid",gap:10}},
        ["gering","mittel","hoch"].map(c=>optBtn(support===c,()=>{setSupport(c);setStep(3)},
          React.createElement("div",{style:{display:"flex",alignItems:"center",gap:10}},
            React.createElement(IconUsers,{size:18,color:effortColor(c)}),
            React.createElement("span",{style:{fontSize:11,letterSpacing:1.5,color:effortColor(c)}},effortDots(c)),
            React.createElement("strong",{style:{color:"#194866"}},supportLabel(c,lang))
          )
        )),
        optBtn(false,()=>{setSupport(null);setStep(3)},React.createElement("strong",{style:{color:"#353535"}},t(lang,"wizard_skip")+" – "+t(lang,"wizard_skip_desc")))
      ),
      React.createElement("div",{style:{display:"flex",justifyContent:"flex-end",marginTop:20}},
        React.createElement("button",{onClick:goBack,style:{padding:"8px 16px",borderRadius:8,border:"1px solid #E9E9E9",background:"white",cursor:"pointer",fontSize:13}},"\u2190 "+t(lang,"wizard_back"))
      )
    ),
    step===3&&React.createElement("div",null,
      React.createElement("h3",{style:{textAlign:"center",marginBottom:20,color:"#194866"}},t(lang,"wizard_q4")),
      React.createElement("div",{style:{display:"flex",justifyContent:"center",margin:"-8px auto 18px"}},
        React.createElement(InfoDisclosure,{label:t(lang,"info_bloom"),text:t(lang,"bloom_intro"),lang:lang,maxWidth:520})
      ),
      React.createElement("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:6}},
        ta(lang,"bloom_levels").map((name,i)=>{
          const lvl=i+1, w=140+(5-i)*30;
          const ciPalette = ["#194866","#267372","#669933","#A5C387","#FCBC82","#F98012"];
          const ciColor = ciPalette[i];
          const isActive = bloomMin===lvl;
          return React.createElement("button",{key:i,onClick:()=>{setBloomMin(lvl);setStep(4)},
            title:ta(lang,"bloom_descs")[i],
            style:{width:w,padding:"10px 0",borderRadius:6,border:isActive?"2px solid "+ciColor:"2px solid #E9E9E9",background:isActive?ciColor:ciColor+"22",color:isActive?"white":"#194866",cursor:"pointer",fontSize:13,fontWeight:600,transition:"all .15s"}
          },lvl+". "+name);
        }),
        React.createElement("button",{onClick:()=>{setBloomMin(0);setStep(4)},style:{marginTop:8,padding:"8px 20px",borderRadius:6,border:"1px solid #E9E9E9",background:"white",cursor:"pointer",fontSize:13}},t(lang,"wizard_skip"))
      ),
      React.createElement("div",{style:{display:"flex",justifyContent:"flex-end",marginTop:20}},
        React.createElement("button",{onClick:goBack,style:{padding:"8px 16px",borderRadius:8,border:"1px solid #E9E9E9",background:"white",cursor:"pointer",fontSize:13}},"\u2190 "+t(lang,"wizard_back"))
      )
    ),
    step===4&&React.createElement("div",null,
      React.createElement("h3",{style:{textAlign:"center",marginBottom:4,color:"#194866"}},results.length+" "+t(lang,"wizard_results")),
      React.createElement("p",{style:{textAlign:"center",color:"#707070",fontSize:13,marginBottom:20}},
        (goal?tg(lang,goal).label:"")+(setup?" \u00B7 "+t(lang,"setup")+": max. "+setupLabel(setup,lang):"")+(support?" \u00B7 "+t(lang,"support")+": max. "+supportLabel(support,lang):"")+(bloomMin>0?" \u00B7 ab Bloom "+bloomMin:"")
      ),
      results.length===0 ? React.createElement("div",{role:"status","aria-live":"polite",style:{padding:24,background:"#FFECDB",border:"2px dashed #f98012",borderRadius:12,textAlign:"center"}},
        React.createElement("p",{style:{margin:0,color:"#353535",fontSize:14}},t(lang,"empty_text"))
      ) :
      React.createElement("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:16}},
        results.map(t2=>React.createElement(ToolCard,{key:t2.id,tool:t2,onSelect:onSelect,lang:lang}))
      ),
      React.createElement("div",{style:{display:"flex",gap:8,justifyContent:"flex-end",marginTop:20}},
        React.createElement("button",{onClick:()=>{setStep(0);setGoal(null);setSetup(null);setSupport(null);setBloomMin(0)},
          style:{padding:"8px 16px",borderRadius:8,border:"1px solid #E9E9E9",background:"white",cursor:"pointer",fontSize:13}},"\u21A9 "+t(lang,"wizard_restart")),
        React.createElement("button",{onClick:goBack,style:{padding:"8px 16px",borderRadius:8,border:"1px solid #E9E9E9",background:"white",cursor:"pointer",fontSize:13}},"\u2190 "+t(lang,"wizard_back"))
      )
    )
  );
}

// ----- Footer logos & icons -----
const ELEDIA_LOGO_DATA = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJIAAABJCAYAAADWgn9iAAABRmlDQ1BJQ0MgUHJvZmlsZQAAeJxjYGB6kpOcW8wkwMCQm1dSFOTupBARGaXAfoGBg4GbQZjBmME6Mbm4wDEgwIcBCPLy81IZMMC3awyMIPqyLsgsTHm8gCu5oKgESP8BYqOU1OJkBgZGAyCWLy8pAIozBQDFRZKywewUELsoJMgZyK4AsvnSIewOEDsJwp4BYhcBPQFkrwCpT4ew94DNgbAvgNglqRUgexmc8wsqizLTM0oUjAwMDBQcU/KTUhWCK4tLUnOLFTzzkvOLCvKLEktSQZZD3AcGghCFoBDTMLS0tNCEeUiQwZEhhSGfIYkhlUGBIYjBncEJSGswGDJYAqEFgybD8AWgtANhfQ4EpwlGsTMIMQRILi0qgzIZmYwJ8xFmzJFgYPBfysDA8gchZtLLwLBAh4GBfypCTM2QgUFAn4Fh3xwA7dtV9/MA0fIAAAjXSURBVHja7Zx7jBbVFcB/CxVkea3FKmIpDM0Q5FGk6IJZqrW1oihqrW2lijUxaF9ioq2GbXGY1IrP1kZjkZpWtChoodLER7uhD61VKhBlF5VO6ZRHCV0jBYRIeW3/mLPJcPfO49tv9tt19/ySL9mZuTNzZ+6555x7zpkFRVEURVEURVEURVEURVEURVEURVEURVGUkgg9d2DouR/RN9G9qKqgAM0E6oGpsut1YL7jB7/TYVBByitE1wE/t9yvBbjC8YOVOhQqSFlCVANsAQYlNNkHnOT4wQc6HB9eelXgHhelCBHAAOACHQoVpCyG5GgzWIeiZM4EJvUkQdqYo81WlYuSeBz4G7Ae+FlX6FAlluF/BkLASTjeCPypTD/sPOA8Y/d8xw8OVfh99gX8HO32A7uB/wIbgCbgaM57OMDs2PYc4Hbg3e4kSKcBc4ERwB7gGccPng0992LgL8AJRvttwCzHD46Wed9pwG3GPh+otCD1sfQjD7uBF4E7ZWKlcY6x3RuoA57tLqbtOjFj3wAuBK4EVgBLHT/YDIwGfgQ0iJaaB5zp+MFGlBp5XxuAJUB1StvVxvZh4KXuYtrOAB5JCCdcCTQ6fnAn8AOVmUyuEc1+CbDTcnwbsAi4gSgO91NgV3cRpK+Lik3iZmChPHhPYxPwS8OPOgU4Vfyd8QkrsmXAuQnv7JvAg8ARuX63cbYn5ggB9CcKPvY0/gHcnaHNbwZmWXyha8TU2XirKz1kUT5Slmo9ILNHacta4GvAfZZj95EvDtdtNNJy4NKU488BH2Qs4auIouDTgFrRctuAdeKgL3f8oCKmUdI6V0g/aoHh4givA55w/ODNDrhtvTz71Ni+E4G7ZInfysnAdywCt8dyzWrgK8AXgY+LOa2W9xoCjwKrinA5isq19QaeB863HNspL2dLysANAX4hDmYSq4A5jh+8azl/AeCZL7E9+bvQc88CnpIQho1DwPeB+y1hi4HAXsskujjn7UcAmw1/8z3gY7HBHm8JEQwHthv7LpDnqMm45/PATPLHsTrUtB2RztwLNMf2rwA+myFEk4E3MoQI0Xivhp7brwM10U3AyylCBHAccE+CKSqXLcDbFv9yWInXqQV+k0OIAGYA13elONJB4FZRn8OAfmIeNqUMXB/gV6J2W2kCvi2CU2+o7E8C3+sgIToD+ImhDZYBVwFfNVZeAHNDz53QAV1Zb9l3ejtW0cfHtptFK9YAl4lpM9t3ro8Ueu4gGfgpopleAx52/OBAjtNvAsYYK5HJjh8clO3fhp4biopuZV7ouYscP2guUIh6AQ8Zpn6h4wf1se2nQ88dDFweM+f3UnzlwnpZrZmr4udKuMYUY3th7PxVwGeAW2LH3U7VSDIjm4hC+5fKS74H2BB67uiMc4cQ5YiOcRpjQtTK7w37fTwwueDBm2W8/AOinWz+RJw6WSQUyXbLvpNLvMYfiQKVs4CR8necVyzms1+naKTQc/sCS8XRMxkFPBF6bp3jB4dT4icDYtvvA40J5uJtYFxseyzwQoGDd66x3QAMDT13aMYgD5DnL7J6wTYBG0u8Rpb531e0UinHtE0DJmQ4fJOIarNtTLCseF7Pee/TCtYCZl9myi9vX4oUpLGWfW8UcN0TgeniXE/vSnGkiTnbJAnH+DLuXV2wfzSuK/RFfLTTLSvijWX07VqispMpdGBpdTmC9O8y25hmY0MJDmWRAcH+8ouzHPhnzvP/XmBfrrZMsHfICOYmCGQ9Uerlo5bjuxL2d4ogvSwPmOSk7QXWZAxAXMXuM1ZJFcHxg/dDz91pCPZrjh88UOGuDLU4xZCep0tb/t9h8TN/Lb+hQKGfgfUqYwB2SNwoibmOH6Tl4Myk42SJK3UGZl+mVvj+dUSFbWbh3x+I4mylMEhCGceMhfhet4vmLzzV1KvM2fwQ8CWiDHcrm4CLHD9YknF6k7HdN221EXpun9Bz52SFFdqJ2ZcZoefWpvTllNBzbytj6V8lWuFs4Emi6lHT5zxIVC5S6qCPs5jqv3a0r1d2QFI+blwpcaEjjh/sznnqK0SVkvHS0TvkOg8Dmx0/aAk9t784i/OATxCVVVyb4/qLQ889nNFmk+MHdwEPECVG+8VWkKtDz70BeNHxg10iNCPE77heBL8ph19XZ8Rtqoki9AMzzvPb6X/1teybQZRwrhKB/WFCOKbdIZVCvXiJAV0ty+ldMtteSMrah547Vhxnm0DvkNl4qmUV4zp+EMaus4C2Sds8vOT4wTlyjXlEgVWTFtG4J9H2s6k1wFmx57MlbUulBfguUUC0JWG1m5a0rSH6qMBko8S90vKInxdzWlnTZgjFbKLw/q1ENdtXyWxdHnpu7wRt9hZwo6hxk2EWIYIoNdERH1Tej72AvooohTA4IeYzssA+vAp8DvhxGX7MbqKyZ5vJaxWi/cC/LG3e6RQfydAsSxI0y5fFLCWZxkUSO1mT4wU9Bkxy/KDwb7kkNXM5UZHZe1kmEVgAOHHNWCL7xNwsBeaLANVR5qdZwi3AypTV9qeIovnNRqhmR6eattBzF3Ns8ZXJVmBkWmGaaK2JYhYniD/0H3nAN4HVljxc67nDsadqstjr+EGT5XqDgU/H+lIt/dhOlMdqSniW3rRNmNpM19aY6S6VatoGLdcB/7O0PZsoQTtKhH+t+KWt1aoniKkcIxP1mc4WpAbafqBoMiQjHKB8iCnKR9qfYxbu0detgpRF1v83WuH4gRb/d2OKKv5/iuhDyAstx5rFmST0XFfiFX2ABomOK92AwuJIoecOEIH5lsQrDhEVpc0VJ3UxUeVfVczcPQLcmFKzpPQ0QYoJ1HFEmeUDjh/skX2PkVwX/KjjB3N0KFSQsgRrFNEnNkkcBUbLP5pQerizncb0HH2o1aFQQcriYI421ToUKkhZrM3RpkGHQgUpFflOfkVKk8cdP9D/IamClIvZCcK0jAI+F1Z6wKrNWMGNAb5AVOu9xvGDRh0CRVEURVEURVEURVEURVEURVEURVEURVGUrsD/AWP2TqYzUA7aAAAAAElFTkSuQmCC";
const ELEDIA_FAVICON_DATA = "data:image/png;base64,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";
const CC_BYNCSA_DATA = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiID8+PCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEgQmFzaWMvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEtYmFzaWMuZHRkIj4NCjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgd2lkdGg9IjEyMCIgaGVpZ2h0PSI0MiIgdmlld0JveD0iMCAwIDEyMCA0MiIgYmFzZVByb2ZpbGU9ImJhc2ljIiB2ZXJzaW9uPSIxLjEiPg0KPGcgaWQ9InN1cmZhY2UxIj4NCjxwYXRoIHN0eWxlPSIgc3Ryb2tlOm5vbmU7ZmlsbC1ydWxlOm5vbnplcm87ZmlsbDpyZ2IoNjYuNjY2NjY3JSw2OS44MDM5MjIlLDY3LjA1ODgyNCUpO2ZpbGwtb3BhY2l0eToxOyIgZD0iTSAzLjQxMDE1NiAwLjQ1MzEyNSBMIDExNi43NjE3MTkgMC42NTIzNDQgQyAxMTguMzQ3NjU2IDAuNjUyMzQ0IDExOS43NjE3MTkgMC40MTc5NjkgMTE5Ljc2MTcxOSAzLjgxNjQwNiBMIDExOS42MjEwOTQgNDEuMTQ0NTMxIEwgMC41NDY4NzUgNDEuMTQ0NTMxIEwgMC41NDY4NzUgMy42NzU3ODEgQyAwLjU0Njg3NSAyIDAuNzEwOTM4IDAuNDUzMTI1IDMuNDEwMTU2IDAuNDUzMTI1IFogIi8+DQo8cGF0aCBzdHlsZT0iIHN0cm9rZTpub25lO2ZpbGwtcnVsZTpub256ZXJvO2ZpbGw6cmdiKDAlLDAlLDAlKTtmaWxsLW9wYWNpdHk6MTsiIGQ9Ik0gMTE3Ljc1MzkwNiAwIEwgMi4yNDYwOTQgMCBDIDEuMDA3ODEzIDAgMCAxLjAwNzgxMyAwIDIuMjQ2MDk0IEwgMCA0MS40OTIxODggQyAwIDQxLjc3MzQzOCAwLjIyNjU2MyA0MiAwLjUwNzgxMyA0MiBMIDExOS40OTIxODggNDIgQyAxMTkuNzczNDM4IDQyIDEyMCA0MS43NzM0MzggMTIwIDQxLjQ5MjE4OCBMIDEyMCAyLjI0NjA5NCBDIDEyMCAxLjAwNzgxMyAxMTguOTkyMTg4IDAgMTE3Ljc1MzkwNiAwIFogTSAyLjI0NjA5NCAxLjAxNTYyNSBMIDExNy43NTM5MDYgMS4wMTU2MjUgQyAxMTguNDMzNTk0IDEuMDE1NjI1IDExOC45ODQzNzUgMS41NjY0MDYgMTE4Ljk4NDM3NSAyLjI0NjA5NCBDIDExOC45ODQzNzUgMi4yNDYwOTQgMTE4Ljk4NDM3NSAxOC4wNDI5NjkgMTE4Ljk4NDM3NSAyOS40Njg3NSBMIDM2LjQyOTY4OCAyOS40Njg3NSBDIDMzLjQwMjM0NCAzNC45Mzc1IDI3LjU3MDMxMyAzOC42NTIzNDQgMjAuODgyODEzIDM4LjY1MjM0NCBDIDE0LjE4NzUgMzguNjUyMzQ0IDguMzU5Mzc1IDM0Ljk0MTQwNiA1LjMzNTkzOCAyOS40Njg3NSBMIDEuMDE1NjI1IDI5LjQ2ODc1IEMgMS4wMTU2MjUgMTguMDQyOTY5IDEuMDE1NjI1IDIuMjQ2MDk0IDEuMDE1NjI1IDIuMjQ2MDk0IEMgMS4wMTU2MjUgMS41NjY0MDYgMS41NjY0MDYgMS4wMTU2MjUgMi4yNDYwOTQgMS4wMTU2MjUgWiAiLz4NCjxwYXRoIHN0eWxlPSIgc3Ryb2tlOm5vbmU7ZmlsbC1ydWxlOm5vbnplcm87ZmlsbDpyZ2IoMTAwJSwxMDAlLDEwMCUpO2ZpbGwtb3BhY2l0eToxOyIgZD0iTSAzNC41MjM0MzggMTkuNTUwNzgxIEMgMzQuNTI3MzQ0IDI3LjA4MjAzMSAyOC40MjU3ODEgMzMuMTg3NSAyMC44OTQ1MzEgMzMuMTkxNDA2IEMgMTMuMzY3MTg4IDMzLjE5OTIxOSA3LjI1NzgxMyAyNy4wOTc2NTYgNy4yNTM5MDYgMTkuNTY2NDA2IEMgNy4yNTM5MDYgMTkuNTYyNSA3LjI1MzkwNiAxOS41NTg1OTQgNy4yNTM5MDYgMTkuNTUwNzgxIEMgNy4yNDYwOTQgMTIuMDIzNDM4IDEzLjM0NzY1NiA1LjkxNDA2MyAyMC44Nzg5MDYgNS45MTAxNTYgQyAyOC40MTAxNTYgNS45MDYyNSAzNC41MTk1MzEgMTIuMDAzOTA2IDM0LjUyMzQzOCAxOS41MzUxNTYgQyAzNC41MjM0MzggMTkuNTM5MDYzIDM0LjUyMzQzOCAxOS41NDY4NzUgMzQuNTIzNDM4IDE5LjU1MDc4MSBaICIvPg0KPHBhdGggc3R5bGU9IiBzdHJva2U6bm9uZTtmaWxsLXJ1bGU6bm9uemVybztmaWxsOnJnYigwJSwwJSwwJSk7ZmlsbC1vcGFjaXR5OjE7IiBkPSJNIDMxLjk3MjY1NiA4LjQ0NTMxMyBDIDM0Ljk5NjA5NCAxMS40Njg3NSAzNi41MDc4MTMgMTUuMTcxODc1IDM2LjUwNzgxMyAxOS41NTA3ODEgQyAzNi41MDc4MTMgMjMuOTI5Njg4IDM1LjAxOTUzMSAyNy41OTM3NSAzMi4wNTA3ODEgMzAuNTM5MDYzIEMgMjguODk0NTMxIDMzLjY0MDYyNSAyNS4xNjc5NjkgMzUuMTkxNDA2IDIwLjg2NzE4OCAzNS4xOTE0MDYgQyAxNi42MTcxODggMzUuMTkxNDA2IDEyLjk1NzAzMSAzMy42NTIzNDQgOS44ODI4MTMgMzAuNTc4MTI1IEMgNi44MDQ2ODggMjcuNTAzOTA2IDUuMjY5NTMxIDIzLjgyODEyNSA1LjI2OTUzMSAxOS41NTA3ODEgQyA1LjI2OTUzMSAxNS4yNzczNDQgNi44MDQ2ODggMTEuNTc0MjE5IDkuODgyODEzIDguNDQ1MzEzIEMgMTIuODc4OTA2IDUuNDIxODc1IDE2LjUzOTA2MyAzLjkxMDE1NiAyMC44NjcxODggMy45MTAxNTYgQyAyNS4yNDYwOTQgMy45MTAxNTYgMjguOTQ5MjE5IDUuNDIxODc1IDMxLjk3MjY1NiA4LjQ0NTMxMyBaIE0gMTEuOTE3OTY5IDEwLjQ4MDQ2OSBDIDkuMzU5Mzc1IDEzLjA2MjUgOC4wODIwMzEgMTYuMDg1OTM4IDguMDgyMDMxIDE5LjU1NDY4OCBDIDguMDgyMDMxIDIzLjAyMzQzOCA5LjM0NzY1NiAyNi4wMjM0MzggMTEuODc1IDI4LjU1MDc4MSBDIDE0LjQwNjI1IDMxLjA4MjAzMSAxNy40MTc5NjkgMzIuMzQzNzUgMjAuOTE0MDYzIDMyLjM0Mzc1IEMgMjQuNDEwMTU2IDMyLjM0Mzc1IDI3LjQ0NTMxMyAzMS4wNjY0MDYgMzAuMDI3MzQ0IDI4LjUxMTcxOSBDIDMyLjQ4MDQ2OSAyNi4xNDA2MjUgMzMuNzA3MDMxIDIzLjE1MjM0NCAzMy43MDcwMzEgMTkuNTU0Njg4IEMgMzMuNzA3MDMxIDE1Ljk4NDM3NSAzMi40NjA5MzggMTIuOTUzMTI1IDI5Ljk2ODc1IDEwLjQ2MDkzOCBDIDI3LjQ3NjU2MyA3Ljk3MjY1NiAyNC40NjA5MzggNi43MjY1NjMgMjAuOTE0MDYzIDYuNzI2NTYzIEMgMTcuMzY3MTg4IDYuNzI2NTYzIDE0LjM2NzE4OCA3Ljk3NjU2MyAxMS45MTc5NjkgMTAuNDgwNDY5IFogTSAxOC42NDQ1MzEgMTguMDMxMjUgQyAxOC4yNTM5MDYgMTcuMTc5Njg4IDE3LjY2Nzk2OSAxNi43NTM5MDYgMTYuODg2NzE5IDE2Ljc1MzkwNiBDIDE1LjUxMTcxOSAxNi43NTM5MDYgMTQuODIwMzEzIDE3LjY3OTY4OCAxNC44MjAzMTMgMTkuNTM1MTU2IEMgMTQuODIwMzEzIDIxLjM5MDYyNSAxNS41MTE3MTkgMjIuMzIwMzEzIDE2Ljg4NjcxOSAyMi4zMjAzMTMgQyAxNy43OTY4NzUgMjIuMzIwMzEzIDE4LjQ0OTIxOSAyMS44NjcxODggMTguODM5ODQ0IDIwLjk2MDkzOCBMIDIwLjc1IDIxLjk4MDQ2OSBDIDE5LjgzOTg0NCAyMy41OTc2NTYgMTguNDcyNjU2IDI0LjQwNjI1IDE2LjY1MjM0NCAyNC40MDYyNSBDIDE1LjI0NjA5NCAyNC40MDYyNSAxNC4xMjEwOTQgMjMuOTc2NTYzIDEzLjI3MzQzOCAyMy4xMTMyODEgQyAxMi40Mjk2ODggMjIuMjUzOTA2IDEyLjAwMzkwNiAyMS4wNjY0MDYgMTIuMDAzOTA2IDE5LjU1MDc4MSBDIDEyLjAwMzkwNiAxOC4wNjI1IDEyLjQ0MTQwNiAxNi44ODI4MTMgMTMuMzEyNSAxNi4wMDc4MTMgQyAxNC4xODM1OTQgMTUuMTMyODEzIDE1LjI3MzQzOCAxNC42OTUzMTMgMTYuNTc0MjE5IDE0LjY5NTMxMyBDIDE4LjUgMTQuNjk1MzEzIDE5Ljg3ODkwNiAxNS40NTMxMjUgMjAuNzEwOTM4IDE2Ljk3MjY1NiBaIE0gMjcuNjMyODEzIDE4LjAzMTI1IEMgMjcuMjQyMTg4IDE3LjE3OTY4OCAyNi42Njc5NjkgMTYuNzUzOTA2IDI1LjkxNDA2MyAxNi43NTM5MDYgQyAyNC41MDc4MTMgMTYuNzUzOTA2IDIzLjgwNDY4OCAxNy42Nzk2ODggMjMuODA0Njg4IDE5LjUzNTE1NiBDIDIzLjgwNDY4OCAyMS4zOTA2MjUgMjQuNTA3ODEzIDIyLjMyMDMxMyAyNS45MTQwNjMgMjIuMzIwMzEzIEMgMjYuODI4MTI1IDIyLjMyMDMxMyAyNy40NjQ4NDQgMjEuODY3MTg4IDI3LjgyODEyNSAyMC45NjA5MzggTCAyOS43ODEyNSAyMS45ODA0NjkgQyAyOC44NzEwOTQgMjMuNTk3NjU2IDI3LjUwNzgxMyAyNC40MDYyNSAyNS42OTE0MDYgMjQuNDA2MjUgQyAyNC4yODUxNTYgMjQuNDA2MjUgMjMuMTY0MDYzIDIzLjk3NjU2MyAyMi4zMTY0MDYgMjMuMTEzMjgxIEMgMjEuNDc2NTYzIDIyLjI1MzkwNiAyMS4wNTA3ODEgMjEuMDY2NDA2IDIxLjA1MDc4MSAxOS41NTA3ODEgQyAyMS4wNTA3ODEgMTguMDYyNSAyMS40ODA0NjkgMTYuODgyODEzIDIyLjMzOTg0NCAxNi4wMDc4MTMgQyAyMy4xOTUzMTMgMTUuMTMyODEzIDI0LjI4NTE1NiAxNC42OTUzMTMgMjUuNjEzMjgxIDE0LjY5NTMxMyBDIDI3LjUzNTE1NiAxNC42OTUzMTMgMjguOTEwMTU2IDE1LjQ1MzEyNSAyOS43NDIxODggMTYuOTcyNjU2IFogIi8+DQo8cGF0aCBzdHlsZT0iIHN0cm9rZTpub25lO2ZpbGwtcnVsZTpub256ZXJvO2ZpbGw6cmdiKDEwMCUsMTAwJSwxMDAlKTtmaWxsLW9wYWNpdHk6MTsiIGQ9Ik0gNjIuNTAzOTA2IDE1LjIyMjY1NiBDIDYyLjUwMzkwNiAyMS4xNTIzNDQgNTcuNjk1MzEzIDI1Ljk2MDkzOCA1MS43NjE3MTkgMjUuOTYwOTM4IEMgNDUuODMyMDMxIDI1Ljk2MDkzOCA0MS4wMjM0MzggMjEuMTUyMzQ0IDQxLjAyMzQzOCAxNS4yMjI2NTYgQyA0MS4wMjM0MzggOS4yOTI5NjkgNDUuODMyMDMxIDQuNDg0Mzc1IDUxLjc2MTcxOSA0LjQ4NDM3NSBDIDU3LjY5NTMxMyA0LjQ4NDM3NSA2Mi41MDM5MDYgOS4yOTI5NjkgNjIuNTAzOTA2IDE1LjIyMjY1NiBaICIvPg0KPHBhdGggc3R5bGU9IiBzdHJva2U6bm9uZTtmaWxsLXJ1bGU6bm9uemVybztmaWxsOnJnYigwJSwwJSwwJSk7ZmlsbC1vcGFjaXR5OjE7IiBkPSJNIDU0Ljg3MTA5NCAxMi4xMTcxODggQyA1NC44NzEwOTQgMTEuNzAzMTI1IDU0LjUzNTE1NiAxMS4zNjcxODggNTQuMTIxMDk0IDExLjM2NzE4OCBMIDQ5LjM3ODkwNiAxMS4zNjcxODggQyA0OC45NjQ4NDQgMTEuMzY3MTg4IDQ4LjYyODkwNiAxMS43MDMxMjUgNDguNjI4OTA2IDEyLjExNzE4OCBMIDQ4LjYyODkwNiAxNi44NTkzNzUgTCA0OS45NTMxMjUgMTYuODU5Mzc1IEwgNDkuOTUzMTI1IDIyLjQ3NjU2MyBMIDUzLjU0Njg3NSAyMi40NzY1NjMgTCA1My41NDY4NzUgMTYuODU5Mzc1IEwgNTQuODcxMDk0IDE2Ljg1OTM3NSBaICIvPg0KPHBhdGggc3R5bGU9IiBzdHJva2U6bm9uZTtmaWxsLXJ1bGU6bm9uemVybztmaWxsOnJnYigwJSwwJSwwJSk7ZmlsbC1vcGFjaXR5OjE7IiBkPSJNIDUzLjM3MTA5NCA5LjEyMTA5NCBDIDUzLjM3MTA5NCAxMC4wMTU2MjUgNTIuNjQ4NDM4IDEwLjc0MjE4OCA1MS43NSAxMC43NDIxODggQyA1MC44NTU0NjkgMTAuNzQyMTg4IDUwLjEyODkwNiAxMC4wMTU2MjUgNTAuMTI4OTA2IDkuMTIxMDk0IEMgNTAuMTI4OTA2IDguMjI2NTYzIDUwLjg1NTQ2OSA3LjUgNTEuNzUgNy41IEMgNTIuNjQ4NDM4IDcuNSA1My4zNzEwOTQgOC4yMjY1NjMgNTMuMzcxMDk0IDkuMTIxMDk0IFogIi8+DQo8cGF0aCBzdHlsZT0iIHN0cm9rZTpub25lO2ZpbGwtcnVsZTpldmVub2RkO2ZpbGw6cmdiKDAlLDAlLDAlKTtmaWxsLW9wYWNpdHk6MTsiIGQ9Ik0gNTEuNzM0Mzc1IDMuMzkwNjI1IEMgNDguNTIzNDM4IDMuMzkwNjI1IDQ1LjgwNDY4OCA0LjUxMTcxOSA0My41NzgxMjUgNi43NTM5MDYgQyA0MS4yOTY4NzUgOS4wNzQyMTkgNDAuMTU2MjUgMTEuODE2NDA2IDQwLjE1NjI1IDE0Ljk4ODI4MSBDIDQwLjE1NjI1IDE4LjE1NjI1IDQxLjI5Njg3NSAyMC44ODI4MTMgNDMuNTc4MTI1IDIzLjE2MDE1NiBDIDQ1Ljg2MzI4MSAyNS40NDE0MDYgNDguNTgyMDMxIDI2LjU4MjAzMSA1MS43MzQzNzUgMjYuNTgyMDMxIEMgNTQuOTI5Njg4IDI2LjU4MjAzMSA1Ny42OTUzMTMgMjUuNDMzNTk0IDYwLjAzOTA2MyAyMy4xMzI4MTMgQyA2Mi4yNDYwOTQgMjAuOTQ5MjE5IDYzLjM0NzY1NiAxOC4yMzQzNzUgNjMuMzQ3NjU2IDE0Ljk4ODI4MSBDIDYzLjM0NzY1NiAxMS43MzgyODEgNjIuMjI2NTYzIDguOTk2MDk0IDU5Ljk4MDQ2OSA2Ljc1MzkwNiBDIDU3LjczNDM3NSA0LjUxMTcxOSA1NC45ODgyODEgMy4zOTA2MjUgNTEuNzM0Mzc1IDMuMzkwNjI1IFogTSA1MS43NjU2MjUgNS40ODA0NjkgQyA1NC4zOTg0MzggNS40ODA0NjkgNTYuNjMyODEzIDYuNDA2MjUgNTguNDY4NzUgOC4yNjE3MTkgQyA2MC4zMjgxMjUgMTAuMDk3NjU2IDYxLjI1NzgxMyAxMi4zMzk4NDQgNjEuMjU3ODEzIDE0Ljk4ODI4MSBDIDYxLjI1NzgxMyAxNy42NTIzNDQgNjAuMzQ3NjU2IDE5Ljg2NzE4OCA1OC41MjczNDQgMjEuNjI1IEMgNTYuNjEzMjgxIDIzLjUxOTUzMSA1NC4zNTkzNzUgMjQuNDY0ODQ0IDUxLjc2NTYyNSAyNC40NjQ4NDQgQyA0OS4xNzE4NzUgMjQuNDY0ODQ0IDQ2LjkzNzUgMjMuNTI3MzQ0IDQ1LjA1ODU5NCAyMS42NTIzNDQgQyA0My4xODM1OTQgMTkuNzgxMjUgNDIuMjQ2MDk0IDE3LjU1ODU5NCA0Mi4yNDYwOTQgMTQuOTg4MjgxIEMgNDIuMjQ2MDk0IDEyLjQxNzk2OSA0My4xOTE0MDYgMTAuMTc1NzgxIDQ1LjA4OTg0NCA4LjI2MTcxOSBDIDQ2LjkxMDE1NiA2LjQwNjI1IDQ5LjEzMjgxMyA1LjQ4MDQ2OSA1MS43NjU2MjUgNS40ODA0NjkgWiAiLz4NCjxwYXRoIHN0eWxlPSIgc3Ryb2tlOm5vbmU7ZmlsbC1ydWxlOm5vbnplcm87ZmlsbDpyZ2IoMTAwJSwxMDAlLDEwMCUpO2ZpbGwtb3BhY2l0eToxOyIgZD0iTSA0OC40MDIzNDQgMzIuNzQ2MDk0IEMgNDguNzE0ODQ0IDMyLjc0NjA5NCA0OS4wMDM5MDYgMzIuNzc3MzQ0IDQ5LjI2NTYyNSAzMi44MzIwMzEgQyA0OS41MjM0MzggMzIuODg2NzE5IDQ5Ljc1IDMyLjk3NjU2MyA0OS45MzM1OTQgMzMuMTA1NDY5IEMgNTAuMTIxMDk0IDMzLjIzMDQ2OSA1MC4yNjE3MTkgMzMuMzk4NDM4IDUwLjM2NzE4OCAzMy42MDkzNzUgQyA1MC40Njg3NSAzMy44MjAzMTMgNTAuNTE5NTMxIDM0LjA3ODEyNSA1MC41MTk1MzEgMzQuMzg2NzE5IEMgNTAuNTE5NTMxIDM0LjcyMjY1NiA1MC40NDUzMTMgMzUgNTAuMjkyOTY5IDM1LjIyMjY1NiBDIDUwLjE0MDYyNSAzNS40NDUzMTMgNDkuOTE0MDYzIDM1LjYyNSA0OS42MTcxODggMzUuNzY5NTMxIEMgNTAuMDI3MzQ0IDM1Ljg4NjcxOSA1MC4zMzIwMzEgMzYuMDkzNzUgNTAuNTM1MTU2IDM2LjM4NjcxOSBDIDUwLjczODI4MSAzNi42Nzk2ODggNTAuODM5ODQ0IDM3LjAzNTE1NiA1MC44Mzk4NDQgMzcuNDQ5MjE5IEMgNTAuODM5ODQ0IDM3Ljc4MTI1IDUwLjc3MzQzOCAzOC4wNzAzMTMgNTAuNjQ0NTMxIDM4LjMxNjQwNiBDIDUwLjUxMTcxOSAzOC41NTg1OTQgNTAuMzM1OTM4IDM4Ljc2MTcxOSA1MC4xMTcxODggMzguOTE0MDYzIEMgNDkuODk4NDM4IDM5LjA3MDMxMyA0OS42NDQ1MzEgMzkuMTgzNTk0IDQ5LjM2MzI4MSAzOS4yNTc4MTMgQyA0OS4wODIwMzEgMzkuMzMyMDMxIDQ4Ljc5Mjk2OSAzOS4zNzEwOTQgNDguNDk2MDk0IDM5LjM3MTA5NCBMIDQ1LjI3NzM0NCAzOS4zNzEwOTQgTCA0NS4yNzczNDQgMzIuNzQ2MDk0IFogTSA0OC4yMTQ4NDQgMzUuNDI1NzgxIEMgNDguNDc2NTYzIDM1LjQyNTc4MSA0OC42ODc1IDM1LjM2MzI4MSA0OC44NTU0NjkgMzUuMjQyMTg4IEMgNDkuMDIzNDM4IDM1LjExNzE4OCA0OS4xMDU0NjkgMzQuOTE3OTY5IDQ5LjEwNTQ2OSAzNC42NDA2MjUgQyA0OS4xMDU0NjkgMzQuNDg0Mzc1IDQ5LjA3ODEyNSAzNC4zNTkzNzUgNDkuMDIzNDM4IDM0LjI2MTcxOSBDIDQ4Ljk2ODc1IDM0LjE2MDE1NiA0OC44OTQ1MzEgMzQuMDg1OTM4IDQ4LjgwMDc4MSAzNC4wMjczNDQgQyA0OC43MDcwMzEgMzMuOTcyNjU2IDQ4LjYwMTU2MyAzMy45MzM1OTQgNDguNDgwNDY5IDMzLjkxNDA2MyBDIDQ4LjM1OTM3NSAzMy44OTA2MjUgNDguMjM0Mzc1IDMzLjg3ODkwNiA0OC4xMDE1NjMgMzMuODc4OTA2IEwgNDYuNzM4MjgxIDMzLjg3ODkwNiBMIDQ2LjczODI4MSAzNS40MjU3ODEgWiBNIDQ4LjMwMDc4MSAzOC4yMzQzNzUgQyA0OC40NDE0MDYgMzguMjM0Mzc1IDQ4LjU3ODEyNSAzOC4yMjI2NTYgNDguNzA3MDMxIDM4LjE5NTMxMyBDIDQ4LjgzOTg0NCAzOC4xNjc5NjkgNDguOTUzMTI1IDM4LjEyMTA5NCA0OS4wNTQ2ODggMzguMDU0Njg4IEMgNDkuMTUyMzQ0IDM3Ljk5MjE4OCA0OS4yMzA0NjkgMzcuOTAyMzQ0IDQ5LjI4OTA2MyAzNy43ODkwNjMgQyA0OS4zNDc2NTYgMzcuNjc5Njg4IDQ5LjM3ODkwNiAzNy41MzkwNjMgNDkuMzc4OTA2IDM3LjM2MzI4MSBDIDQ5LjM3ODkwNiAzNy4wMjM0MzggNDkuMjgxMjUgMzYuNzgxMjUgNDkuMDg5ODQ0IDM2LjYzNjcxOSBDIDQ4Ljg5ODQzOCAzNi40OTIxODggNDguNjQ0NTMxIDM2LjQxNzk2OSA0OC4zMjgxMjUgMzYuNDE3OTY5IEwgNDYuNzM4MjgxIDM2LjQxNzk2OSBMIDQ2LjczODI4MSAzOC4yMzQzNzUgWiAiLz4NCjxwYXRoIHN0eWxlPSIgc3Ryb2tlOm5vbmU7ZmlsbC1ydWxlOm5vbnplcm87ZmlsbDpyZ2IoMTAwJSwxMDAlLDEwMCUpO2ZpbGwtb3BhY2l0eToxOyIgZD0iTSA1MS4wOTM3NSAzMi43NDYwOTQgTCA1Mi43MjY1NjMgMzIuNzQ2MDk0IEwgNTQuMjc3MzQ0IDM1LjM2MzI4MSBMIDU1LjgyMDMxMyAzMi43NDYwOTQgTCA1Ny40NDUzMTMgMzIuNzQ2MDk0IEwgNTQuOTg0Mzc1IDM2LjgyODEyNSBMIDU0Ljk4NDM3NSAzOS4zNzEwOTQgTCA1My41MjM0MzggMzkuMzcxMDk0IEwgNTMuNTIzNDM4IDM2Ljc4OTA2MyBaICIvPg0KPHBhdGggc3R5bGU9IiBzdHJva2U6bm9uZTtmaWxsLXJ1bGU6bm9uemVybztmaWxsOnJnYigxMDAlLDEwMCUsMTAwJSk7ZmlsbC1vcGFjaXR5OjE7IiBkPSJNIDk4LjQ0MTQwNiAzNy43MzA0NjkgQyA5OC41MTk1MzEgMzcuODg2NzE5IDk4LjYyNSAzOC4wMTE3MTkgOTguNzYxNzE5IDM4LjEwOTM3NSBDIDk4Ljg5NDUzMSAzOC4yMDMxMjUgOTkuMDQ2ODc1IDM4LjI3MzQzOCA5OS4yMjY1NjMgMzguMzIwMzEzIEMgOTkuNDA2MjUgMzguMzY3MTg4IDk5LjU4OTg0NCAzOC4zOTA2MjUgOTkuNzgxMjUgMzguMzkwNjI1IEMgOTkuOTEwMTU2IDM4LjM5MDYyNSAxMDAuMDUwNzgxIDM4LjM3ODkwNiAxMDAuMTk5MjE5IDM4LjM1OTM3NSBDIDEwMC4zNDc2NTYgMzguMzM1OTM4IDEwMC40ODQzNzUgMzguMjk2ODc1IDEwMC42MTcxODggMzguMjM0Mzc1IEMgMTAwLjc0NjA5NCAzOC4xNzE4NzUgMTAwLjg1MTU2MyAzOC4wODU5MzggMTAwLjk0MTQwNiAzNy45NzY1NjMgQyAxMDEuMDIzNDM4IDM3Ljg3MTA5NCAxMDEuMDcwMzEzIDM3LjczMDQ2OSAxMDEuMDcwMzEzIDM3LjU2NjQwNiBDIDEwMS4wNzAzMTMgMzcuMzg2NzE5IDEwMS4wMTE3MTkgMzcuMjQyMTg4IDEwMC44OTg0MzggMzcuMTI4OTA2IEMgMTAwLjc4NTE1NiAzNy4wMTk1MzEgMTAwLjYzMjgxMyAzNi45MjU3ODEgMTAwLjQ0OTIxOSAzNi44NTE1NjMgQyAxMDAuMjYxNzE5IDM2Ljc3NzM0NCAxMDAuMDUwNzgxIDM2LjcxMDkzOCA5OS44MjAzMTMgMzYuNjU2MjUgQyA5OS41ODIwMzEgMzYuNjAxNTYzIDk5LjM0NzY1NiAzNi41MzkwNjMgOTkuMTA1NDY5IDM2LjQ3MjY1NiBDIDk4Ljg1OTM3NSAzNi40MTAxNTYgOTguNjE3MTg4IDM2LjMzMjAzMSA5OC4zODI4MTMgMzYuMjQyMTg4IEMgOTguMTQ4NDM4IDM2LjE1NjI1IDk3LjkzNzUgMzYuMDM5MDYzIDk3Ljc1MzkwNiAzNS44OTQ1MzEgQyA5Ny41NjY0MDYgMzUuNzUzOTA2IDk3LjQxNzk2OSAzNS41NzQyMTkgOTcuMzA0Njg4IDM1LjM2MzI4MSBDIDk3LjE5MTQwNiAzNS4xNDg0MzggOTcuMTMyODEzIDM0Ljg5MDYyNSA5Ny4xMzI4MTMgMzQuNTg5ODQ0IEMgOTcuMTMyODEzIDM0LjI0NjA5NCA5Ny4yMDcwMzEgMzMuOTUzMTI1IDk3LjM1MTU2MyAzMy43MDMxMjUgQyA5Ny40OTYwOTQgMzMuNDUzMTI1IDk3LjY4MzU5NCAzMy4yNDIxODggOTcuOTE3OTY5IDMzLjA3NDIxOSBDIDk4LjE1MjM0NCAzMi45MTAxNTYgOTguNDIxODc1IDMyLjc4NTE1NiA5OC43MTg3NSAzMi43MDMxMjUgQyA5OS4wMTE3MTkgMzIuNjI1IDk5LjMwODU5NCAzMi41ODU5MzggOTkuNjA1NDY5IDMyLjU4NTkzOCBDIDk5Ljk1MzEyNSAzMi41ODU5MzggMTAwLjI4NTE1NiAzMi42MjUgMTAwLjYwMTU2MyAzMi42OTkyMTkgQyAxMDAuOTIxODc1IDMyLjc3NzM0NCAxMDEuMjAzMTI1IDMyLjkwMjM0NCAxMDEuNDQ5MjE5IDMzLjA3ODEyNSBDIDEwMS42OTkyMTkgMzMuMjUgMTAxLjg5NDUzMSAzMy40NzI2NTYgMTAyLjAzOTA2MyAzMy43MzgyODEgQyAxMDIuMTgzNTk0IDM0LjAxMTcxOSAxMDIuMjU3ODEzIDM0LjMzNTkzOCAxMDIuMjU3ODEzIDM0LjcxODc1IEwgMTAwLjg0Mzc1IDM0LjcxODc1IEMgMTAwLjgzMjAzMSAzNC41MTk1MzEgMTAwLjc4OTA2MyAzNC4zNTU0NjkgMTAwLjcxODc1IDM0LjIyNjU2MyBDIDEwMC42NDg0MzggMzQuMDk3NjU2IDEwMC41NTQ2ODggMzMuOTk2MDk0IDEwMC40Mzc1IDMzLjkyMTg3NSBDIDEwMC4zMjAzMTMgMzMuODQ3NjU2IDEwMC4xODc1IDMzLjc5Mjk2OSAxMDAuMDM1MTU2IDMzLjc2NTYyNSBDIDk5Ljg4NjcxOSAzMy43MzQzNzUgOTkuNzE4NzUgMzMuNzE4NzUgOTkuNTQyOTY5IDMzLjcxODc1IEMgOTkuNDI1NzgxIDMzLjcxODc1IDk5LjMwODU5NCAzMy43MzA0NjkgOTkuMTkxNDA2IDMzLjc1MzkwNiBDIDk5LjA3NDIxOSAzMy43ODEyNSA5OC45Njg3NSAzMy44MjQyMTkgOTguODc1IDMzLjg4MjgxMyBDIDk4Ljc3NzM0NCAzMy45NDUzMTMgOTguNjk5MjE5IDM0LjAyMzQzOCA5OC42MzY3MTkgMzQuMTE3MTg4IEMgOTguNTc4MTI1IDM0LjIxMDkzOCA5OC41NDY4NzUgMzQuMzI4MTI1IDk4LjU0Njg3NSAzNC40Njg3NSBDIDk4LjU0Njg3NSAzNC41OTc2NTYgOTguNTcwMzEzIDM0LjcwMzEyNSA5OC42MTcxODggMzQuNzg1MTU2IEMgOTguNjY3OTY5IDM0Ljg2MzI4MSA5OC43NjU2MjUgMzQuOTQxNDA2IDk4LjkxMDE1NiAzNS4wMDc4MTMgQyA5OS4wNTg1OTQgMzUuMDc0MjE5IDk5LjI1NzgxMyAzNS4xNDQ1MzEgOTkuNTExNzE5IDM1LjIxMDkzOCBDIDk5Ljc2OTUzMSAzNS4yNzczNDQgMTAwLjEwNTQ2OSAzNS4zNjcxODggMTAwLjUxOTUzMSAzNS40NzI2NTYgQyAxMDAuNjQwNjI1IDM1LjQ5NjA5NCAxMDAuODEyNSAzNS41NDI5NjkgMTAxLjAzMTI1IDM1LjYwNTQ2OSBDIDEwMS4yNSAzNS42NzE4NzUgMTAxLjQ2ODc1IDM1Ljc3MzQzOCAxMDEuNjgzNTk0IDM1LjkxNzk2OSBDIDEwMS45MDIzNDQgMzYuMDU4NTk0IDEwMi4wODU5MzggMzYuMjUgMTAyLjI0NjA5NCAzNi40ODgyODEgQyAxMDIuNDAyMzQ0IDM2LjcyNjU2MyAxMDIuNDgwNDY5IDM3LjAzMTI1IDEwMi40ODA0NjkgMzcuNDAyMzQ0IEMgMTAyLjQ4MDQ2OSAzNy43MDMxMjUgMTAyLjQyMTg3NSAzNy45ODQzNzUgMTAyLjMwNDY4OCAzOC4yNDYwOTQgQyAxMDIuMTg3NSAzOC41MDM5MDYgMTAyLjAxMTcxOSAzOC43MzA0NjkgMTAxLjc4MTI1IDM4LjkxNzk2OSBDIDEwMS41NTA3ODEgMzkuMTA1NDY5IDEwMS4yNjE3MTkgMzkuMjUzOTA2IDEwMC45MTc5NjkgMzkuMzU5Mzc1IEMgMTAwLjU3NDIxOSAzOS40NjQ4NDQgMTAwLjE3OTY4OCAzOS41MTU2MjUgOTkuNzI2NTYzIDM5LjUxNTYyNSBDIDk5LjM2MzI4MSAzOS41MTU2MjUgOTkuMDA3ODEzIDM5LjQ3MjY1NiA5OC42NjQwNjMgMzkuMzgyODEzIEMgOTguMzIwMzEzIDM5LjI5Mjk2OSA5OC4wMTk1MzEgMzkuMTUyMzQ0IDk3Ljc1NzgxMyAzOC45NTcwMzEgQyA5Ny40OTIxODggMzguNzY1NjI1IDk3LjI4NTE1NiAzOC41MTk1MzEgOTcuMTI4OTA2IDM4LjIyMjY1NiBDIDk2Ljk3NjU2MyAzNy45MjU3ODEgOTYuOTAyMzQ0IDM3LjU3NDIxOSA5Ni45MDYyNSAzNy4xNjc5NjkgTCA5OC4zMjAzMTMgMzcuMTY3OTY5IEMgOTguMzIwMzEzIDM3LjM5MDYyNSA5OC4zNTkzNzUgMzcuNTc4MTI1IDk4LjQ0MTQwNiAzNy43MzA0NjkgWiAiLz4NCjxwYXRoIHN0eWxlPSIgc3Ryb2tlOm5vbmU7ZmlsbC1ydWxlOm5vbnplcm87ZmlsbDpyZ2IoMTAwJSwxMDAlLDEwMCUpO2ZpbGwtb3BhY2l0eToxOyIgZD0iTSAxMDYuNjQ0NTMxIDMyLjc0NjA5NCBMIDEwOS4xMjEwOTQgMzkuMzcxMDk0IEwgMTA3LjYwOTM3NSAzOS4zNzEwOTQgTCAxMDcuMTA5Mzc1IDM3Ljg5NDUzMSBMIDEwNC42MzI4MTMgMzcuODk0NTMxIEwgMTA0LjExMzI4MSAzOS4zNzEwOTQgTCAxMDIuNjQ4NDM4IDM5LjM3MTA5NCBMIDEwNS4xNTIzNDQgMzIuNzQ2MDk0IFogTSAxMDYuNzMwNDY5IDM2LjgwODU5NCBMIDEwNS44OTQ1MzEgMzQuMzc4OTA2IEwgMTA1Ljg3NSAzNC4zNzg5MDYgTCAxMDUuMDE1NjI1IDM2LjgwODU5NCBaICIvPg0KPHBhdGggc3R5bGU9IiBzdHJva2U6bm9uZTtmaWxsLXJ1bGU6bm9uemVybztmaWxsOnJnYigxMDAlLDEwMCUsMTAwJSk7ZmlsbC1vcGFjaXR5OjE7IiBkPSJNIDcyLjUxOTUzMSAzMi43NDYwOTQgTCA3NS4yODUxNTYgMzcuMTkxNDA2IEwgNzUuMzAwNzgxIDM3LjE5MTQwNiBMIDc1LjMwMDc4MSAzMi43NDYwOTQgTCA3Ni42Njc5NjkgMzIuNzQ2MDk0IEwgNzYuNjY3OTY5IDM5LjM3MTA5NCBMIDc1LjIxMDkzOCAzOS4zNzEwOTQgTCA3Mi40NTMxMjUgMzQuOTM3NSBMIDcyLjQzMzU5NCAzNC45Mzc1IEwgNzIuNDMzNTk0IDM5LjM3MTA5NCBMIDcxLjA3MDMxMyAzOS4zNzEwOTQgTCA3MS4wNzAzMTMgMzIuNzQ2MDk0IFogIi8+DQo8cGF0aCBzdHlsZT0iIHN0cm9rZTpub25lO2ZpbGwtcnVsZTpub256ZXJvO2ZpbGw6cmdiKDEwMCUsMTAwJSwxMDAlKTtmaWxsLW9wYWNpdHk6MTsiIGQ9Ik0gODIuMTk1MzEzIDM0LjUxMTcxOSBDIDgyLjEwOTM3NSAzNC4zNzEwOTQgODIgMzQuMjUgODEuODcxMDk0IDM0LjE0NDUzMSBDIDgxLjc0MjE4OCAzNC4wMzkwNjMgODEuNTkzNzUgMzMuOTU3MDMxIDgxLjQyOTY4OCAzMy44OTg0MzggQyA4MS4yNjU2MjUgMzMuODM5ODQ0IDgxLjA5Mzc1IDMzLjgxMjUgODAuOTE0MDYzIDMzLjgxMjUgQyA4MC41ODU5MzggMzMuODEyNSA4MC4zMDg1OTQgMzMuODc1IDgwLjA3ODEyNSAzNCBDIDc5Ljg1MTU2MyAzNC4xMjg5MDYgNzkuNjY0MDYzIDM0LjI5Njg3NSA3OS41MjM0MzggMzQuNTExNzE5IEMgNzkuMzgyODEzIDM0LjcyMjY1NiA3OS4yNzczNDQgMzQuOTY0ODQ0IDc5LjIxMDkzOCAzNS4yMzgyODEgQyA3OS4xNDg0MzggMzUuNTExNzE5IDc5LjExMzI4MSAzNS43OTI5NjkgNzkuMTEzMjgxIDM2LjA4MjAzMSBDIDc5LjExMzI4MSAzNi4zNTkzNzUgNzkuMTQ4NDM4IDM2LjYzMjgxMyA3OS4yMTA5MzggMzYuODk0NTMxIEMgNzkuMjc3MzQ0IDM3LjE1NjI1IDc5LjM4MjgxMyAzNy4zOTQ1MzEgNzkuNTIzNDM4IDM3LjYwMTU2MyBDIDc5LjY2NDA2MyAzNy44MTI1IDc5Ljg1MTU2MyAzNy45ODA0NjkgODAuMDc4MTI1IDM4LjEwOTM3NSBDIDgwLjMwODU5NCAzOC4yMzQzNzUgODAuNTg1OTM4IDM4LjI5Njg3NSA4MC45MTQwNjMgMzguMjk2ODc1IEMgODEuMzU5Mzc1IDM4LjI5Njg3NSA4MS43MDcwMzEgMzguMTY0MDYzIDgxLjk1NzAzMSAzNy44OTA2MjUgQyA4Mi4yMTA5MzggMzcuNjE3MTg4IDgyLjM2MzI4MSAzNy4yNTc4MTMgODIuNDE3OTY5IDM2LjgxMjUgTCA4My44MjgxMjUgMzYuODEyNSBDIDgzLjc5Mjk2OSAzNy4yMjY1NjMgODMuNjk1MzEzIDM3LjYwMTU2MyA4My41MzkwNjMgMzcuOTM3NSBDIDgzLjM4NjcxOSAzOC4yNjk1MzEgODMuMTc5Njg4IDM4LjU1NDY4OCA4Mi45Mjk2ODggMzguNzg5MDYzIEMgODIuNjc1NzgxIDM5LjAyNzM0NCA4Mi4zNzg5MDYgMzkuMjA3MDMxIDgyLjAzOTA2MyAzOS4zMzIwMzEgQyA4MS42OTkyMTkgMzkuNDUzMTI1IDgxLjMyNDIxOSAzOS41MTU2MjUgODAuOTE0MDYzIDM5LjUxNTYyNSBDIDgwLjQwNjI1IDM5LjUxNTYyNSA3OS45NTMxMjUgMzkuNDI5Njg4IDc5LjU0Njg3NSAzOS4yNSBDIDc5LjE0MDYyNSAzOS4wNzgxMjUgNzguODAwNzgxIDM4LjgzMjAzMSA3OC41MTk1MzEgMzguNTIzNDM4IEMgNzguMjQyMTg4IDM4LjIxNDg0NCA3OC4wMjczNDQgMzcuODUxNTYzIDc3Ljg3ODkwNiAzNy40MzM1OTQgQyA3Ny43MzA0NjkgMzcuMDE1NjI1IDc3LjY1NjI1IDM2LjU2NjQwNiA3Ny42NTYyNSAzNi4wODIwMzEgQyA3Ny42NTYyNSAzNS41ODU5MzggNzcuNzMwNDY5IDM1LjEyODkwNiA3Ny44Nzg5MDYgMzQuNzAzMTI1IEMgNzguMDI3MzQ0IDM0LjI4MTI1IDc4LjI0MjE4OCAzMy45MTAxNTYgNzguNTE5NTMxIDMzLjU5Mzc1IEMgNzguODAwNzgxIDMzLjI4MTI1IDc5LjE0MDYyNSAzMy4wMzEyNSA3OS41NDY4NzUgMzIuODUxNTYzIEMgNzkuOTUzMTI1IDMyLjY3MTg3NSA4MC40MDYyNSAzMi41ODU5MzggODAuOTE0MDYzIDMyLjU4NTkzOCBDIDgxLjI4MTI1IDMyLjU4NTkzOCA4MS42MjUgMzIuNjM2NzE5IDgxLjk0OTIxOSAzMi43NDIxODggQyA4Mi4yNzM0MzggMzIuODQ3NjU2IDgyLjU2NjQwNiAzMyA4Mi44MjAzMTMgMzMuMjAzMTI1IEMgODMuMDc4MTI1IDMzLjQwMjM0NCA4My4yODkwNjMgMzMuNjUyMzQ0IDgzLjQ1NzAzMSAzMy45NDkyMTkgQyA4My42MjUgMzQuMjQ2MDk0IDgzLjczMDQ2OSAzNC41ODU5MzggODMuNzczNDM4IDM0Ljk2ODc1IEwgODIuMzYzMjgxIDM0Ljk2ODc1IEMgODIuMzM1OTM4IDM0LjgwNDY4OCA4Mi4yODEyNSAzNC42NDg0MzggODIuMTk1MzEzIDM0LjUxMTcxOSBaICIvPg0KPHBhdGggc3R5bGU9IiBzdHJva2U6bm9uZTtmaWxsLXJ1bGU6bm9uemVybztmaWxsOnJnYigxMDAlLDEwMCUsMTAwJSk7ZmlsbC1vcGFjaXR5OjE7IiBkPSJNIDExNC41NzgxMjUgMTQuOTgwNDY5IEMgMTE0LjU4NTkzOCAyMC44MjQyMTkgMTA5Ljg0NzY1NiAyNS41NjY0MDYgMTA0LjAwMzkwNiAyNS41NzQyMTkgQyA5OC4xNTYyNSAyNS41NzQyMTkgOTMuNDE0MDYzIDIwLjg0Mzc1IDkzLjQxMDE1NiAxNC45OTYwOTQgQyA5My40MTAxNTYgMTQuOTkyMTg4IDkzLjQxMDE1NiAxNC45ODQzNzUgOTMuNDEwMTU2IDE0Ljk4MDQ2OSBDIDkzLjQwNjI1IDkuMTM2NzE5IDk4LjE0MDYyNSA0LjM5NDUzMSAxMDMuOTg4MjgxIDQuMzkwNjI1IEMgMTA5LjgzMjAzMSA0LjM4MjgxMyAxMTQuNTc0MjE5IDkuMTIxMDk0IDExNC41NzgxMjUgMTQuOTY0ODQ0IEMgMTE0LjU3ODEyNSAxNC45Njg3NSAxMTQuNTc4MTI1IDE0Ljk3NjU2MyAxMTQuNTc4MTI1IDE0Ljk4MDQ2OSBaICIvPg0KPHBhdGggc3R5bGU9IiBzdHJva2U6bm9uZTtmaWxsLXJ1bGU6bm9uemVybztmaWxsOnJnYigwJSwwJSwwJSk7ZmlsbC1vcGFjaXR5OjE7IiBkPSJNIDEwMy45MTc5NjkgMy4zODY3MTkgQyAxMDAuNzA3MDMxIDMuMzg2NzE5IDk3Ljk4ODI4MSA0LjUwNzgxMyA5NS43NjE3MTkgNi43NDYwOTQgQyA5My40ODA0NjkgOS4wNjY0MDYgOTIuMzM1OTM4IDExLjgxMjUgOTIuMzM1OTM4IDE0Ljk4MDQ2OSBDIDkyLjMzNTkzOCAxOC4xNDg0MzggOTMuNDgwNDY5IDIwLjg3NSA5NS43NjE3MTkgMjMuMTU2MjUgQyA5OC4wNDY4NzUgMjUuNDM3NSAxMDAuNzY1NjI1IDI2LjU3NDIxOSAxMDMuOTE3OTY5IDI2LjU3NDIxOSBDIDEwNy4xMTMyODEgMjYuNTc0MjE5IDEwOS44Nzg5MDYgMjUuNDI1NzgxIDExMi4yMTg3NSAyMy4xMjUgQyAxMTQuNDI1NzgxIDIwLjk0MTQwNiAxMTUuNTMxMjUgMTguMjI2NTYzIDExNS41MzEyNSAxNC45ODA0NjkgQyAxMTUuNTMxMjUgMTEuNzM0Mzc1IDExNC40MDYyNSA4Ljk4ODI4MSAxMTIuMTY0MDYzIDYuNzQ2MDk0IEMgMTA5LjkxNzk2OSA0LjUwNzgxMyAxMDcuMTcxODc1IDMuMzg2NzE5IDEwMy45MTc5NjkgMy4zODY3MTkgWiBNIDEwMy45NDkyMTkgNS40NzI2NTYgQyAxMDYuNTc4MTI1IDUuNDcyNjU2IDEwOC44MTI1IDYuMzk4NDM4IDExMC42NTIzNDQgOC4yNTc4MTMgQyAxMTIuNTExNzE5IDEwLjA4OTg0NCAxMTMuNDM3NSAxMi4zMzIwMzEgMTEzLjQzNzUgMTQuOTgwNDY5IEMgMTEzLjQzNzUgMTcuNjQ4NDM4IDExMi41MzEyNSAxOS44NTkzNzUgMTEwLjcxMDkzOCAyMS42MjEwOTQgQyAxMDguNzk2ODc1IDIzLjUxMTcxOSAxMDYuNTM5MDYzIDI0LjQ2MDkzOCAxMDMuOTQ5MjE5IDI0LjQ2MDkzOCBDIDEwMS4zNTU0NjkgMjQuNDYwOTM4IDk5LjEyMTA5NCAyMy41MjM0MzggOTcuMjQyMTg4IDIxLjY0ODQzOCBDIDk1LjM2NzE4OCAxOS43NzM0MzggOTQuNDI1NzgxIDE3LjU1MDc4MSA5NC40MjU3ODEgMTQuOTgwNDY5IEMgOTQuNDI1NzgxIDEyLjQxMDE1NiA5NS4zNzUgMTAuMTY3OTY5IDk3LjI3MzQzOCA4LjI1NzgxMyBDIDk5LjA4OTg0NCA2LjM5ODQzOCAxMDEuMzE2NDA2IDUuNDcyNjU2IDEwMy45NDkyMTkgNS40NzI2NTYgWiAiLz4NCjxwYXRoIHN0eWxlPSIgc3Ryb2tlOm5vbmU7ZmlsbC1ydWxlOm5vbnplcm87ZmlsbDpyZ2IoMCUsMCUsMCUpO2ZpbGwtb3BhY2l0eToxOyIgZD0iTSA5OC43NzczNDQgMTMuMzQzNzUgQyA5OS4yNDIxODggMTAuNDI1NzgxIDEwMS4yOTI5NjkgOC44NjcxODggMTAzLjg3MTA5NCA4Ljg2NzE4OCBDIDEwNy41NzAzMTMgOC44NjcxODggMTA5LjgyODEyNSAxMS41NTQ2ODggMTA5LjgyODEyNSAxNS4xMzY3MTkgQyAxMDkuODI4MTI1IDE4LjYyODkwNiAxMDcuNDI1NzgxIDIxLjM0Mzc1IDEwMy44MTI1IDIxLjM0Mzc1IEMgMTAxLjMyNDIxOSAyMS4zNDM3NSA5OS4wOTc2NTYgMTkuODE2NDA2IDk4LjY5MTQwNiAxNi44MDg1OTQgTCAxMDEuNjEzMjgxIDE2LjgwODU5NCBDIDEwMS42OTkyMTkgMTguMzcxMDk0IDEwMi43MTA5MzggMTguOTE3OTY5IDEwNC4xNjAxNTYgMTguOTE3OTY5IEMgMTA1LjgwNDY4OCAxOC45MTc5NjkgMTA2Ljg3ODkwNiAxNy4zODY3MTkgMTA2Ljg3ODkwNiAxNS4wNDY4NzUgQyAxMDYuODc4OTA2IDEyLjU5Mzc1IDEwNS45NTMxMjUgMTEuMjkyOTY5IDEwNC4yMTQ4NDQgMTEuMjkyOTY5IEMgMTAyLjk0NTMxMyAxMS4yOTI5NjkgMTAxLjg0Mzc1IDExLjc1NzgxMyAxMDEuNjEzMjgxIDEzLjM0Mzc1IEwgMTAyLjQ2MDkzOCAxMy4zMzk4NDQgTCAxMDAuMTY0MDYzIDE1LjYzNjcxOSBMIDk3Ljg2MzI4MSAxMy4zMzk4NDQgWiAiLz4NCjxwYXRoIHN0eWxlPSIgc3Ryb2tlOm5vbmU7ZmlsbC1ydWxlOm5vbnplcm87ZmlsbDpyZ2IoMTAwJSwxMDAlLDEwMCUpO2ZpbGwtb3BhY2l0eToxOyIgZD0iTSA4OC42Mjg5MDYgMTQuOTgwNDY5IEMgODguNjMyODEzIDIwLjkzNzUgODMuODA4NTk0IDI1Ljc2OTUzMSA3Ny44NTE1NjMgMjUuNzczNDM4IEMgNzEuODk0NTMxIDI1Ljc3NzM0NCA2Ny4wNTg1OTQgMjAuOTUzMTI1IDY3LjA1NDY4OCAxNC45OTYwOTQgQyA2Ny4wNTQ2ODggMTQuOTkyMTg4IDY3LjA1NDY4OCAxNC45ODQzNzUgNjcuMDU0Njg4IDE0Ljk4MDQ2OSBDIDY3LjA1MDc4MSA5LjAyMzQzOCA3MS44Nzg5MDYgNC4xOTE0MDYgNzcuODM1OTM4IDQuMTg3NSBDIDgzLjc5Mjk2OSA0LjE4MzU5NCA4OC42MjUgOS4wMDc4MTMgODguNjI4OTA2IDE0Ljk2NDg0NCBDIDg4LjYyODkwNiAxNC45Njg3NSA4OC42Mjg5MDYgMTQuOTc2NTYzIDg4LjYyODkwNiAxNC45ODA0NjkgWiAiLz4NCjxwYXRoIHN0eWxlPSIgc3Ryb2tlOm5vbmU7ZmlsbC1ydWxlOm5vbnplcm87ZmlsbDpyZ2IoMCUsMCUsMCUpO2ZpbGwtb3BhY2l0eToxOyIgZD0iTSA3Ny44MjgxMjUgMy4zODY3MTkgQyA4MS4wNzgxMjUgMy4zODY3MTkgODMuODI0MjE5IDQuNTA3ODEzIDg2LjA3MDMxMyA2Ljc0NjA5NCBDIDg4LjMxNjQwNiA4Ljk4ODI4MSA4OS40Mzc1IDExLjczNDM3NSA4OS40Mzc1IDE0Ljk4MDQ2OSBDIDg5LjQzNzUgMTguMjI2NTYzIDg4LjMzNTkzOCAyMC45NDE0MDYgODYuMTI4OTA2IDIzLjEyNSBDIDgzLjc4OTA2MyAyNS40MjU3ODEgODEuMDE5NTMxIDI2LjU3NDIxOSA3Ny44MjgxMjUgMjYuNTc0MjE5IEMgNzQuNjcxODc1IDI2LjU3NDIxOSA3MS45NTMxMjUgMjUuNDM3NSA2OS42NzE4NzUgMjMuMTU2MjUgQyA2Ny4zODY3MTkgMjAuODc1IDY2LjI0NjA5NCAxOC4xNDg0MzggNjYuMjQ2MDk0IDE0Ljk4MDQ2OSBDIDY2LjI0NjA5NCAxMS44MTI1IDY3LjM4NjcxOSA5LjA2NjQwNiA2OS42NzE4NzUgNi43NDYwOTQgQyA3MS44OTg0MzggNC41MDc4MTMgNzQuNjEzMjgxIDMuMzg2NzE5IDc3LjgyODEyNSAzLjM4NjcxOSBaIE0gNjguODU1NDY5IDExLjg2NzE4OCBDIDY4LjUwNzgxMyAxMi44NDM3NSA2OC4zMzU5MzggMTMuODgyODEzIDY4LjMzNTkzOCAxNC45ODA0NjkgQyA2OC4zMzU5MzggMTcuNTUwNzgxIDY5LjI3MzQzOCAxOS43NzM0MzggNzEuMTUyMzQ0IDIxLjY0ODQzOCBDIDczLjAyNzM0NCAyMy41MjM0MzggNzUuMjYxNzE5IDI0LjQ2MDkzOCA3Ny44NTU0NjkgMjQuNDYwOTM4IEMgODAuNDQ5MjE5IDI0LjQ2MDkzOCA4Mi43MDMxMjUgMjMuNTExNzE5IDg0LjYyMTA5NCAyMS42MTcxODggQyA4NS4yNjE3MTkgMjEgODUuNzg5MDYzIDIwLjMyNDIxOSA4Ni4yMDMxMjUgMTkuNTg5ODQ0IEwgODEuODMyMDMxIDE3LjY0NDUzMSBDIDgxLjUzNTE1NiAxOS4xMTMyODEgODAuMjI2NTYzIDIwLjEwOTM3NSA3OC42NDA2MjUgMjAuMjI2NTYzIEwgNzguNjQwNjI1IDIyLjAxMTcxOSBMIDc3LjMwODU5NCAyMi4wMTE3MTkgTCA3Ny4zMDg1OTQgMjAuMjI2NTYzIEMgNzYuMDA3ODEzIDIwLjIxMDkzOCA3NC43NSAxOS42NzU3ODEgNzMuNzg5MDYzIDE4LjgzNTkzOCBMIDc1LjM4NjcxOSAxNy4yMjY1NjMgQyA3Ni4xNTYyNSAxNy45NDkyMTkgNzYuOTI1NzgxIDE4LjI3MzQzOCA3Ny45NzY1NjMgMTguMjczNDM4IEMgNzguNjU2MjUgMTguMjczNDM4IDc5LjQxMDE1NiAxOC4wMDc4MTMgNzkuNDEwMTU2IDE3LjEyMTA5NCBDIDc5LjQxMDE1NiAxNi44MDg1OTQgNzkuMjg5MDYzIDE2LjU4OTg0NCA3OS4wOTc2NTYgMTYuNDI1NzgxIEwgNzcuOTkyMTg4IDE1LjkzMzU5NCBMIDc2LjYxMzI4MSAxNS4zMjAzMTMgQyA3NS45MzM1OTQgMTUuMDE1NjI1IDc1LjM1NTQ2OSAxNC43NjE3MTkgNzQuNzc3MzQ0IDE0LjUwMzkwNiBaIE0gNzcuODU1NDY5IDUuNDcyNjU2IEMgNzUuMjIyNjU2IDUuNDcyNjU2IDczIDYuMzk4NDM4IDcxLjE3OTY4OCA4LjI1NzgxMyBDIDcwLjY4MzU5NCA4Ljc1MzkwNiA3MC4yNTM5MDYgOS4yNzczNDQgNjkuODkwNjI1IDkuODIwMzEzIEwgNzQuMzIwMzEzIDExLjc5Njg3NSBDIDc0LjcyMjY1NiAxMC41NjY0MDYgNzUuODkwNjI1IDkuODIwMzEzIDc3LjMwODU5NCA5LjczODI4MSBMIDc3LjMwODU5NCA3Ljk0OTIxOSBMIDc4LjY0MDYyNSA3Ljk0OTIxOSBMIDc4LjY0MDYyNSA5LjczODI4MSBDIDc5LjU1ODU5NCA5Ljc4MTI1IDgwLjU2MjUgMTAuMDMxMjUgODEuNTU0Njg4IDEwLjgwMDc4MSBMIDgwLjAzMTI1IDEyLjM2NzE4OCBDIDc5LjQ2ODc1IDExLjk2ODc1IDc4Ljc1NzgxMyAxMS42ODc1IDc4LjA0Njg3NSAxMS42ODc1IEMgNzcuNDcyNjU2IDExLjY4NzUgNzYuNjYwMTU2IDExLjg2MzI4MSA3Ni42NjAxNTYgMTIuNTg1OTM4IEMgNzYuNjYwMTU2IDEyLjY5OTIxOSA3Ni42OTUzMTMgMTIuNzk2ODc1IDc2Ljc2MTcxOSAxMi44ODI4MTMgTCA3OC4yNDYwOTQgMTMuNTQyOTY5IEwgNzkuMjUgMTMuOTg4MjgxIEMgNzkuODkwNjI1IDE0LjI3MzQzOCA4MC41MDM5MDYgMTQuNTQ2ODc1IDgxLjExMzI4MSAxNC44MTY0MDYgTCA4Ny4wNTQ2ODggMTcuNDY0ODQ0IEMgODcuMjUgMTYuNjgzNTk0IDg3LjM0NzY1NiAxNS44NTU0NjkgODcuMzQ3NjU2IDE0Ljk4MDQ2OSBDIDg3LjM0NzY1NiAxMi4zMzIwMzEgODYuNDE3OTY5IDEwLjA4OTg0NCA4NC41NjI1IDguMjU3ODEzIEMgODIuNzIyNjU2IDYuMzk4NDM4IDgwLjQ4ODI4MSA1LjQ3MjY1NiA3Ny44NTU0NjkgNS40NzI2NTYgWiAiLz4NCjwvZz4NCjwvc3ZnPg0K";
const MOODLE_PARTNER_DATA = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAlgAAACXCAYAAADJRyWUAACFGUlEQVR42u2dd5wcxZn3v9Xdk2eTsoSEApIAARYZBEIy0WTw+YjGgWRjHM5+Hc6c8Zng7MP2OZ1xBhwwYIwJNghjchA5BwllobzaOLFDvX909WzP7MzObBCSoH4frXZnpqe7wlNVv3pSgYaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGxrsIotELpURwRePXa2hoaFTFFVLqRtDQ0BgxIiPEzjenSBD3f22hJaUmVhoaGhoaGho7IFeRUtx///2WlHKH4io1CyO/hiGuxAte93xj+nhZNEfbeEZR96eGhsYgkQZysXRx06l/XLfjlGrsgC/rXK2xzTEu+Pe2YtMmgE26+atgc0Mfbn5bytLZ2SnGjRtXnD17diF476abbjLPPPNMd4clWPIMTHEz7suXzklPGW9f4MFZrif3ktCixUtDQ2PwM42B4ebJN+/mbnzfjzZLzxP9JiJhlL82RMXnlROX/3/pW0KUT2pVvyTKPhcVU6Co+E7116ESlF4boXLXmmBFqKwVf5R+iSpvD/xe9dfVylj7PdGvsEa/ulR5SZWH9pVHVGsHUVmdsvdFjXtXXaiEqKkhEKK2IkP6Ko9KDUjF69KVyPI3B3wtyx9Sdk+v4oUMvSMrri97fuimsuLe4dfhW8i+P/pelxcOZFCminoA0israLhk5eWR4XaVVZ9Xunv4+bJ/X1QtS+WzvYpek1KYppkzTGM1cHemq+s38+bN27ijkKx+UihvwhRn4q7/ym7vTcSMa9MRY3bekRQcD1d7TmhoaAyRYAknhz16D9pP+AkVM6Va4MWQXos6BEu8LQRLVOF0ovrrAQnVjkKwqr2n3m2ITGmCFaI5iiiUsZGy128nwQp/FiY/4drICoYzkgRL1iBYstrzpKzx7L4+E0JgWRbRaJRcLrchk+n91MEHHPCXHYFkWWVC9TUMcSbu2st3OzUVM/4iwNqScRwhhIFACLQvloaGxtDhSSmLxaImWJpgaYKlCdZIESxZLBZlNpv1IpHIhOaW1luefu7FMw/c7z03b2+SZYXJFVciN1+1++4R6f3JcbGKrnQNQ1h6WdDQ0BgRRRYIf/ETmmBpgrVdCJbGO3FaAcAsFouulNKwLPM3T7700hMH7b332q997WvGlVde6W2PghkVpZSu4/4gERHJouM5hsDUfaehoaGhoaGxwzMtIUzbtt3m5qa04crPCSHke9/7XmN7lceAvojBjZfPmhszxPFdOc/TmisNDQ0NDQ2NnQxGLpeTQnDS/fffbx155JHOdiVYsND/bXgnpmOGqPTV19DQ0NDQ0NDYCSBs2xbALmPHjh0Dfp6s7Uew9now8C/b29NZRTU0NDQ0NDR2ZkhpCSFiAFdcccX2I1g336xeCJqlBIn2ENTQ0NDQ0NDYmTnW9j2Wy9BdoKGhoaGhoaGhCZaGhoaGhoaGhiZYGhoaGhoaGhqaYGloaGhoaGhoaGiCpaGhoaGhoaGhCZaGhoaGhoaGhiZYGhoaGhoaGhoammBpaGhoaGhoaGiCpaGhoaGhoaGhCZaGhoaGhoaGhoYmWBoaGhoaGhoa2xaWbgINjSoQAkSD+w8pQXqh7xo0fJxn5Xc1NDQ0NDTB0tB4x5Irp4gsZhu73owiYkmfLAmBtHNg5wEB1Dlr1LQQ0XT96zQ0NDQ0NMHS0NjZyZU5eiqRGYcr7VItbZQEYeC2r8Re/hhE4shijsjkfbEm7Q3SpbYV3v+u172B4pL7wYhokqWhoaGhCZaGxjuVYBnIYg5r8r40nfbNhr5SePUeiq//EyOWxitmiO11AskFn2jou/aa5yi8ejciFvU1YBoaGhoammBpaLwzSZavxcJz/R/DrH6d+kwWM30+V4GJ0HPBc8CwBv5uoZfaGjINDQ0NDU2wNDTeaSQrIFa1CFbwWaUzvDDUd+Tgv6uhoaGh8Y6Ant01NDQ0NDQ0NDTB0tDQ0NDQ0NDQBEtDQ0NDQ0NDQxMsDQ0NDQ0NDQ0NTbA0NDQ0NDQ0NDTB0tDQ0NDQ0NB4p0KnadDQ0Njp4XleKRdZKauY8P8b6LWoyEEmRNkd/CMphYEQOleZhoaGJlgaGhrvIkgpSaZSCMNAeh6GEP6hQ4osGYMkWAGhkoD0XBzHxXEcPM/z06MZWvG/rfvT7wtNajU0wdLQ0NDYLhBCEIlEeOLxx3n55ZewbdtfmCU1E+SLmq8khmkSi8ZIpVK0tbUxbvw4JoyfwOgxY2hqasJ1HfL5PFJKTbS2AbGSUhKNRjEMA9u2cV0Pw9TtrKEJ1s4xiEuDWe1WtQxoaOy0C3IkEuVPf/oD99z9D0zTGrH7SikRAkzTIpVKMX78eHbfYw/2339/Zs2eTTQaI5vJaKI1gn1pWibxWIx169aRy+WYOHEiqVSKTDaDqdtYQxOsHYtAydAeNSBTlgBDSCKGxJOCnCs0ydLQ2MngSY9kMskLz7/AvYsW0dzcss2eZds2K1asYMmSJdxz993MnDmTY449jkMPPRTDEORyuREjd+9WcmVZEfKFPD/60Y944okncByHcePGcf5Hz+ewww8jl81qIqux02GnllgJeBJc9SMBU0DMkKQsSUvEozXi0RTxiBsSCXTbButzFk9sSfBCR4yIkCUipqGhsfMMfsMweeON1/tIl+dtkx8hBLFYjKamJqLRKEuWLOHHP/pfvvWtb7Jq5Sqampp8J3uNIRIsiEQi/PSnP+W2227Dtm2klKxevZqrrr6Kl156iUQiodtYY6fDTrPtkvRppYQiUhFDEhESU4AHFD1Br2PQUbTYUjDZlLfYmPd/txdMOoomGddgU94kIiRfnNOOKaDYF4CkoaGxE8F13QE/H6yjdOBgXe394LNEIgHAq6+8wlVXXcmHP/IRjj76GDK9GYShJ5LBtncsFmPFyhU89thjjBkzpvR+KpWiq6uLO+64g/323Vc3loYmWCMJL0SoIgZETYklJC7QaxtszEZ4K2exKhNhdTbCuqxPrDptk5wrcDyBF3xfSAwBvY7BIaNzfGHPdqambHpsAz0nami8MxfvwWo9hBD+j2GUXAfC5Aoo3TOZTOK6Lv/3s5/R3dXN+//t38j09mqn7EH2kWkadHV1Yds2sVis1Nae52FZFu3t7RSLRR1VqKEJ1rAGG31aKktA0vI1VLYUtBdMVmUiLOmJsqQnyqpMhE15i4wjcKQ/8CwhsQwwhSRuSAzTH6imkORcA0/CxTM7+cj0TgS+udDUY1ZD4505uVkWkUikplaqGlzXxbZtCrkcjuNgGAaxWAzLsqoSLcMwSKfT/OEPvyeVTvG+972Pnp4eTNPUHTBIYluLgGloaII1DHghUpWwPAzhk59XumK82Bnjpc4Yy3qjtBdMCp6f1yZi+I7qSUuist6UEbTAP8sQ0FE02SVp87ndt3LYmBw9jk+2NLnS0HjnwTAMMpkMCxYu5KyzzyGbyfgO0lXzYPUnWLlcns7OTtate4s3ly5l6dKlbN26lXg8TiQSKdOK+dGGgmQyyfXXXc+0qdOYOWsmuVweQ6vGNTQ0wdoeCBOgpOWb/jqLJs93JniyPcHzHXHWZCPkHIFp+I7rMUOSMGUZkfJqbHAM4Tu+99gGR43P8JnZHYyNO3QqrZWe+zQ03rkI8im1jRpFNBIZgGCJCnImMAwTwzA46KCDcD2XLZs2s3jxYu65527a29tJpVL9SJZpmhQKWf7wh99z+eWXa3KloaHx9hOsQFsVNSQJyzfdvdgZ4+FNSZ5sT7Ama+FIQVQRqli0nFC5DWiMTQFZRxA1JZ/dfSsfmNJN0RPaJKih8S4jWY5tl0x9jR+V44SyiUNrWxunv//9HHb44Vz3u9/y1FNP9SNZnueRTKZ49dVXWbx4MUcsWEBvr87fpKGhCdbbRKwAEqZv2lufs7hjc5J/bUzxRneUgieIhUx+3iAIVdmkCnQUDea0FPn8Hu3s3Vqgq2j4SQM1udLQeFeh5LReyirc2FmEgU+QEOA4Dl1dXTQ3N/O5z3+e//vpT3n44Yf7kSyQmIbJ/fffz6HzDhuWU3ZA8PzfolTevl+hem1DghqYQAfznJKvmijvgx0NQd81kl9LSon0PP93n/iUXguhJGk71VNKiSclMlhoRd+CGPSFYNv1g/98b9DPCNo1WLtFlTGpCVYDxCqliNPr3THuXp/moU0JNhUsLOGb/eKmT6q8Yfo0WgLOmtrNBTO6SFkencXBaK1qpHbfno6WQoRmVlFRpiCb6vZ0BO1buPqXrzTCt/cyG5oRw1T8HUcn+vqi2tZDOwwPmaSZpkmxWMSTHhdedDFvrVvHqpUr+0W9xeIx3nzzTdasWcOUKVOwG4x+K5ES6S/4pmVimiamYWAYZogg+mPL8ySu6+K4jiIKI0u4PM8jGokQiUZwXZdCoTDg/YOITcMw/O9FohimgZSSfD6PG2gRK+s7woSpkTbwpIeBIJFIIIBCsYjrulWJlud5eFISiUSIxuN+sENAfBX5DF7bxWLfvYTxtnAtz/NAQiRiYUUimIZZqmN4O+FJD8d2KIbqOlJExvM8IpEIpmXiOi7FYrHq5iW8NnieLB1zZZomhhB4UlIsFnBsB/EO0fxuM4LVR6w8JILnOmLctraJxVsSZFyDhOnREvHKkoUOdwkteoLJaZuLd+skZXl0FE2ixgA3FkYfKfBckC64HpKQcAoDDAOE2Xet9LbhYiX85/mSC66NdB2/bAGpKpXLQpgRMFTZpPTLts1XHKPveZ6LdGzwHPVs2Ue2hIkwLTAi5XXa1uSmrF891V9e+eeG4f8OyKDcCZMYChGqg+f3hev0tXHpPCgDYVi+nKgJeKet83aEYRg4tk063cQHPvABrvmf/6l6TW9vL0uXLGG33XajUChgDrCQBVoUKxohFo1iGia2bdOb6aW7u5ue7m4ymSzFYqGUsiYWi5FON9Ha2kprWyvpdBoQ5PMFbKeIaRjDJlrpdIpNGzexcdNGWltbmTJlCoVCAc/1+t3bdV0i0QhNTU0UCgU2btzIhvUb6OntIR6PM2fOHJqbmkoZ713PJRqNEotGyaoM7fW0SME1Zc8W5Ut4Mpn0I0ALhZpRnJ7nEY/HcR2HJUuW4Lou06ZNI5lMlsrSRwA9EokEpkoV8eqKFaxevZpNmzeTyWR8Qh2N0tzSwoQJE5g6dSqTJ08mnU6Tz+UpFPIY2yia1PM8TNMknU7juR5btmxmzZo1vPXWOtrb28nmskjpEY1EaW5uZty4cUyePIWJEyfS3NxMsVikkC/4bTgMUQnylW3ZsoVNmzbS1NTMpEmTKNpFXMftJyue558tmU4msG2bzVu2sHnTRnp7e4lEo8ycOZN0Kk1eEXpNsGoQq6Tl//HU1gR/Wd3MU1vj2J4gZfnEaiRIVcX+nKghWd4b4eInJ3LZnHbe05qnq5rflWGC5yGLGXCKYBiISBIRSyEiSbAigAGejbTzyGKm71ohIBJHWHH/b88d2cXStZG5HvBcRDSFSI/GTI3GSLYhokkwTL9MhV68TDte72ZktssnOFbMv2Yky1XZblIii1lwCmBaiEQrZuskjNRoRKwJEYn5C30xi5ftwOvdgsy0I3NZMEy/fGZk25BUwwTp9ZVPGIhIHKJJhBn1SZXnIO0C0s6Dk/fLYEX9ft9Zdk0BSbLzSDunUmHHMeItGIkWRDyNsGK+HLg2spDFy3chs53IfHfpehFJbDtZeYfCNE1yuSxz5uzN1KlTWbNmNdForJ82ZuWqlb55bYAF0jAMUqkUQgi2tG/hhWXLeOP1N1i5cgUbN26kp6eHQqGA4zhl9xdCYFkWyWSSUaNGMW3aNObOncvcufsyZuwYCvk8tm1jGINf3IPEnzfddBN//ettZLMZotEo8+fP56KLLiJiRXA9f+EMzGPNzc10dHZwzz338Mgjj7By5Up6e3tL5HHSpEl88QtfYM899ySbzZFIJtiwYQN//OMfWb16tWrTXL+UGp7nEYvFWL16Nf/xH/+BV9meoQVYSskuu+zCueecw9SpU8nn8/1IW0CuVq1axQ9++EOWLl2KlJIJEyZy6Scu4cADDySbzQIQiUSJRiO8/PLL3LNoEc899xybNm2mWCyU+iB4bkAAk8kkU6ZMYd68eRx15FFMmjSRnt5eJQcjQxYCLWdTUxM9PT08cP8DPP74YyxdupTOzk5s2y5TOsgQQU0kEkycOJG5c/fl8MMPZ/r06RSKRQqFfEnzNWhZice46647ufOOO8hms0QiEQ488CDOPe+Dvqy4LihZQUIqnaa7u4tHH3mEp556irVr1pTIKsDYsWM5/4ILmTV7tq811QSrj+B40vexsgzJcx1x/ryqmcXtCVxFrAIzoLuNFBgSiJu+f9fnnxvHF/ds530Ts3Q7FkK6JXObzHYiIgkiux5AdPo8rMlzMUdN9UlCQABEiGDluvG61+NsWoK95nns1c/gblkO0kXEm31RHo42wLD8hbKYxWgeT3T2kURnLSQyeS5G264YiZaqtn3pFPB6NuFufIPiysUUlz6Es/5V8OyRKVdY44NE5jrBiGBNnEN01kKi0w/BHDcbo2mcv6BXUwXnOvE6VmOvfYHi0oewVy7G697ok55IQi3uwxQIw/RJXbYDIgkik99DZNqhRCbPxRw9DZEc5RMtw/CvK2Twslvxtq7BXvcS9srFOG+9hMznEalRO25af6WtkrluQGKOmkpk2kFEph6MNXEOZuskRKLVr2t4anJtvHwPXvcGX4ZXPoW94nGcTUvAdXxZUW2j0Zj2IJ1OMWv2bJYtW0YsFi8jBoZhsHnTZhzHqboLl1KSSCQoFos8+eSTPPHE47zyyiu0t7fjui6maWJZFqZp+qapaLTqPfL5PGvWrGH58uX861//Yty4cSxYsJCTTz6JMWPG0NubGdT5fX690txzzz1ce+21NDc3l0jPX//6VyJWhE9+8pNkshl10HaESCTC3//xd2666SbWrFmDZVnEYjHi8ThCCAzDYO3atfzghz/kB9//PvF4go6ODi6//HJWrFhBIpEoHZgdiUSq7Dv9sx5ff+ONOvtTwUsvvcQLL7zA96+5hgkTJmDbdhkRMk2TbDbLN775Td544w1aW1sBWL16FVd//ev8+Ec/YuKECUSiUTZt3sxvf/tbHnjgAfL5PPF4nFgsSiIRr0k2PM9j2bJlvPbaa9x+++28//TTOf3000EIioXisLP8u65LLB5HIFi0aBG33347K1euLB3lFG73SkIelG/1qlW8+eab3H33P5g37zDe//73M3HSRHp7egdllvM8j1QqyUMPPcR1v/sdqVSq1H/3LroHwzS48MKLyOVyKmGsSSQS5eGHHuSO229n3bp1mKbpazJjsZJpd9OmTfzut7/lvy6/nGgsiufu3Fr2ESFYrvS1R8mI5PXuKH9a2cKDm5LYUpC2PFDE6u1wAfGkT7IcD77+yjgyhfWcNK6dQrQV3CK4ReIHnEli3vlEpuxX525RRDQFqdGYY6YTmXEYiUNBFrPYKx4n9/SfKby2CFxFaDxn8Aum9JCZdsyxM0kcfB6xuadhtu5SlayUEREhEFYMs20KZtsUonscA8d9meKKx8ktvoHCq3f3LZ6DLVcl+ct3g2ERe89pJA7+ENEZ8/q0KGF6W9bBvpnQSLZhJNuwdplL4pAP43a+ReHFv5Fb/HvczW8iEi2ldhhy+XJdiGiSxCEfIn7QuapfB5jM0mMxR0+DKfsTm3uarwxa8yy5x39L4cU7wLX7TG87BrMCw0Dme0AYRPc4msSBZxOdeYQi0gNtOQSYEYzUKIzUKKyJc4jPPR3pFLFXPEHu6T9SfOVuZLGoZOVtMOG+EyAEEydMrLrQBnm4wgt838IkSSTjvPjii9xwww2sXrWqpKlJJpN9mqGKn1raNNM0icX8zU1XVxc33fRnHnroQT760Y+yYMFCMplMP1PaQCSlWCyyaNEiEokEkYivgRBCMGrUKB599FHOOPMMmpubsSyLbDbL9773PR588EHi8TgtLS2lhTwot+d5NDc3s3btWl599VWOPPJI/nLrX1i5ciVjx44ttdFA9Qy0L/W0Kel0mvXr13PnnXfyqU99qsxUKKUkmUxy3333sfTNNxk1ahSO48+Lzc3NbN26lfvuu49PfOITPPLII1zz/e+zYcMGmpqaiMVipTrVO5opFouRSCTIZrNc+4tf8Nzzz/P5z3+e1pZWcvnckA+sdl2XpnSatW+9xS9+8QueeeYZotGoMg9TV1ZKK1osRjyRwHVd/vnPe3nmmaf54HnncdSRR5HJZJHIhkxzQggcx+XBBx8kGo2WyUprWxvPPP00p5xyKi0tLVimSSGf59e//BWPPfYo0WiUpqamfrICkE6n2bx5E8uWvcm+++5HNpPZqf2xhk2wJNAa9diUN/nVsmbuWtdEr23QFPFI4OGpoV1pphsoh9VIkKyYZZDp6mZx20n821Gjyf3jO5htk2n+wP8Q2/O40MVuSN1cHq1TKmgFeRDRJNHdjya6+9HYK5+i955vUlz2KEayrT8RGogYFHoRVpTUsV8gOf/jPtmAPvNZUCYhystXSWqCshkm0d3mE91tPvbKxfTe823sZY8ikm0M2sk50PZl2onMmEf6fZcRmX5o9XYLl7MWMVT1MVt3IbngUhIHn0f2kV+QfejnSDuLiKUHSQT958lMO9HdjyJ9wuVYk/au0a9VO7Ws3SJT9icyZX+K7zmNzhsuQDqFHUdrJT1kZiuRmfNJH/15IrsdXlt+y5zcw6FE5XIsrCjRWQuIzlqAvfpZMvd+l+Ib/xo+4X23QEqSqVTVBVMIgeM6fSZCxXOllERjUdauWcv3r7mGXC5HMpks04AMtKCFTVLhv4PflmXR0tJCV1cX3/3ud3nrrXWcffbZZLPZutoTqYhMoVAgoxKzBuUJ7l8oFuju6mbixImsXbuWr3/96yxdupSWlhY8z6tJPoIFNJ/PA7BlyxYsy8J13Yad3Rs58shxHCKRCJs3by45vIfLIISgs7PTd3OocvSR4zg8/vjj/NdXvoJhGLS2tOC4blm9KslHZdkDEmaaJqNGjeLpp5/mq1/9KlddeRUtLS0U7cEf+eO6Ls3NzTz99FP88Ic/pKOjg+bm5tJh5JVyEnb0DwdghMsXEMt8Ps9Pfvxj1q5Zw7kfPI9CIV8euTogGS+UkvhWyorjOPT09DBx4kQ2bNzAj3/0I5a9+Wap3APKCrIUVLGzY1gEy8++LvnTymauX9HCpoJF0vSImZKsK/CkQEpBJeWQKsFoyto2k7gQgqLj0tKU4vOf+RTxKbvSlBhDdJd9iEw72F/IhXJyrmd7LkXIVdTc80BAZNpBtH3sFnrv/jbZB3/sawGkGJhkGRYy14E1fg+a/v37RKbs37dYBuVqSLYC8hUumq+BiEw7hLaP/YXMfd8nc98PlInMamzhFMqUZmdJHfN5Usd8Qfk3ufQ52JuNdkZ5+ynnahFvJnXMF4jucSw9f/l/OOte8YlgQyRLTR75blLHfIHUcV8KtV8j5atGpH1H+Ogex9D60RvIP3NzBUHbDlD+dkII0idfRXLBxymZfaX0zXoN9YOoIseyRH4ju+5P64U3kn3o/8jc823/noGfnMaAJKseIaokCbFolMcff5yenh5aW1tLWpRqC2R4hx8sYIHZLbyAhomW67qlI4Kuv/53mKbJWWedRW9Pd0MO1/UiBWPxGFu3buW///u/WbNmTdU6VNbDtm2SySTTp0/Hth322msvbrnllpIWrh7BDOpcd7gYBvl8nj3nzOlnJqvXL/F4nBdfeol7//nP0vFIjiIBwbNd18VxnBJ5MwwDy7JKBKOS/DqOQ2trK8uWLeM73/0OV1999ZDJ1aOPPML/XOMHVTQ1NfUjKEEZqvnsWaZJNBbDNM0yeQmIYFNTE7feeiuFQpELLryQXC47AkPD9+Xr6enhB9dcw5o1a2hubq5KrII2MQwDx3GIRWNMnjylqgb4XUWwBOBKwYSEy+lTenA8wWFjchQ9gSuh4AlsT1BUP7b6MYRkS8HijrfS22ZdMgw6Ozu56oor2XXKrriOTerwC/sWUmO4ijsRisZyAYP0CV/BaBpH751fRcRbak++hoXMthOdfSTN5/zc13p5TnmE13A1HiWiJUgd8wWs8XvQffN/+Kavegun8B3B8Tyaz/op8X3fX4oWHJny+dGFPkl1iUyeS+vH/0r3jZ+k+No9iOTo+iRLgMz30HT6t0kc+pG++gynfAGxlS7RWQsx23ZVWrftpJ42TGQxi5EcRcs5PyMy4zAlU66KaGX4MhyOigWSCz6BNX42XX+61Denm1FNsgYgIt093VU1CJ7nEY/GMU0T13FK2qOguQsF3wG70m8r2PkXCoVSlFg0Gi2ZYABs2yafzytna0FcpQ6ozCzvayhauOGGG5g2bSoHH3yw0kwNfYyYponrunz3u99l1apVVclVuB62beMqDdCln/gEu+66Kx2dHcyfP5/TTjuNO+64A6HawTLNqmZA3xTl+Fq4eukXPI+jjz6aE084gUwm2/B5kEHW/6VLl2JZFtFotBSEIKWkt7e3RGxGjx5NLBbDdV0ymQydnZ0UCoWSSbVSHhzHoaWlheeee44bb7yRCy64gK6uroacygOfuOeef45rvn9NidBVatSklPT0+BGb06dPZ8qUKbS2tiKEoKenh/Xr17N69Wo6Ozv7HfcUEK7W1lbuuutOWttaOeOMM+ju7hmyOTMwk0sp+fnP/49Vq1ZVJVdhWXEcpyQrZ551Frvssosf1SnETu2wMGwToSfhhEk9NG1K0mWbzBuTpcs2MQUIIfsZKzzp58R6uSvG39Y2YYiRbT7LstiyZQsfPu88Tj/lFJ+lW5Fy7caIzrQBWXBIzr8Yr2cD2ft/jEhVIQqGhcx2EN3jWFo+9BvfMdxzR4Dw1SJafrli+5xMS7yJrhvO7yNz1QigECBdpOfQ8sFfEdvzWHAdME1VzxEtoF9vz8WIN9P64d/S9YePU3j5TkRyVG2SZZjIzFbSp1zlk6ugfA0zDklZpsDK7wm/bcwx07fj6m0g7RxGeiytF/wRa/zuqt8swBxYo9KPbCpt60AENBgTrkN096Np/ch1dP7uvIFl5V0Oz/NYvXp1TY1Ia1sLkUgEx7ZDEWQ+Wdhvv/24/fbbsW27RI6y2Sye5zFmzBje8573MHPmTCZPmcKY0aNJpdI+wRJQLBbp6e7mrbfW8fLLL/P888/R2dFBKuSLE17kTNPguuuuY6+99ippMIbCzgONxPXXXc9zzz1Hc3NzGbkyDAPXdenp8Rfm0aNHM2H8BMaNH8fChQs59NBDS2kQXNfl05/+NIcecghLli4lGomwYeNG7rvvvtKh2gF5sG2bcePGceyxx/o+Pv20432yP3XqVA47zE/wGvgDDaZ+QTBB2CHeMAzmz5/PEfOPYObM3WhtbcVUZcxmsmzYsJ5nnn2W++67jw0bNtLUlK5Kspqbm7njjjtYuHAhUyb7KS8G6oagPBs3buSHP/hBKaggfO/ApCuE4Pjjj+eoo49m6q5TfaJa2jtJinaRTZs28eTixfz97/+gvX1LvyS5gabs5ptuYrcZM5g7d18y2eyQjnwKZOWvt/6FF194oZ/GLdC2ZTIZ32ertZUxY8YwavQYDjroQPbbb/++KNCdfO4ZkZW91zZoL5pYAnodg6wj1Fl/IpjiywiZLSUdxb4Dl0eiCYNkgFu2bOGUk0/mC5/7f6VdSMPajdICJct3+XVJmdLKeC7p4y6juOxR3+QVTZYteLLQQ2TKvrR88Bc+uZJe41qXcFqDgXyeqpEY1yE6ayHNZ/2Ert9fjIilal4vCxmaz/qJIldK49WwuUSWl7ERMqtSK2CYNJ/zMzp/1Y696knlcO1WIahbiR/8QZJHXOITALNBEQ4TbFHj/TKiKbePeVAI8ByEFaf1I9dVkKs68iGMciIc1CEsY8F1VVUUFrg2kemH0nzmj+n6/YWIWBPa6b188bAsi46ODl5/7bWyRKNhgjVpl10UoSnfsedyefbae28uuOACbrrpJrLZLLFYjP3224/D589n7732ZsyYMZiW6fvYuC6e15cZXQiDXSZNYu+99+G4445j/Yb1/O2227jnnnuIRqNlmjHP8/M4rVixgvvvv59TTz2V7u6ehjU7ldqGbDbL0888TSKRKDNZCiHo7e0llUpxzDHHMP/ww5k1cxato9qIx+N4nkeupIHyNXzFYpHDDjuMww8/nHg8zvMvvMCiRYuwLKtsTg8I1kUXXtjfZBRy3g9IVTabLZHLofRtoKnr6elh9qxZXHLJJczdd18Evs+R67p46rrW1hbGjh3Dvvvvx2mnnsZvfvsb7rnnHlKpNLJC82uaJl1dXfz973/nU5/6lO/wPsD8GJC8X/7yl2zevLmfBijoj4kTJ3LppZcyd+5cinaRQr7op8gIJRoVQjB27Fg+8O//zvz5R/DLX/6Cp556ys+hFSJZQV/ecMMN7DZzliK73pBkJZ/P8/zzz5cCBIL1xTAE2UyGeCLBvHmHccCBBzJt2jSam5uJxmJI6ZHL5nbcSO7tQbBMAa4nSEQ8DHWQci3iK9T1kSBX5UhYUwR4nsuWjq2c8YEzuPyyy8oEpmECU7lANbIolS3K/iKVOuYLdP3uQ6EK+vmIRKyJ5rP/z49MbNTkFlxXzS8rEP56ZTN9khXb60RSR3+OzKLv9tewGRYy005y4aXE9/uA0gxFGmu3UhmqZML3XJVfSgysbZMeworRcs7P2PqTE/yIOdMKETYD7Czm2Fk0nXK16pMGSXOIZMhixk9zIARGakwfQavsj+01wIWBLHbTfO4vfKf9QZArWeil8NIdFN98GLdjDdIpIqIprPGziO15HNHdj1YmYK92zi8zomTlBFJHfpbMP7+HSI0ZXiTqOwjBTn/RokVs2riRdFNTP42FZVnMnDkL1/P6iZFhCPK5PCeedBL7H3AA695aR1tbG1OnTcWKRCjmCz5JUNFcRpXgG7sogTwgGT16NJ/+9KeZMWM3rr325/1SHQSajwcffJDjjjsO0xyeBj+cqyowh+ZyORYuXMg555zDbrvtBlJSKBRLjs5A2ZmMwZycyWRwXRfbtv1oxxobZ8dx6O7upliZFb8iOrLSP21Ia5kiV/PmzeO/LruMZDJJb08PUoBRcaKGo8ruqWSb//mlL/laoJtv7kdeArL75JNPsnnzZtLpNI7jVp1mXNc3DT7wwP088cQTVclVLpdj+owZfOW/vsKY0WPo6ury5zRhlGdpV9OnbdsU8gVaWlr40n/+Jz/+0Y946KGHysoZlHHlypXce++9fOADH6Cnp3tAIjgYWZFSkslkOeiggzn1tFOZOnUaEigWCiWTK0gMYbxjtnQjmgfLFLJuwwgRpFLwsBq4vh6xEkDGBjOa5AtfvJSPnHNWWacOhlzJYhZ75WLc9pVIz8FIjyOy6/6YbVMaLJBvTonNPhJrl7k465UWSxjITCdNH7jGNz01tGiWEwN3y3Lc7g2llBDm6KkYyVGNE0DT17CljvosxSUPYK993id6pbpnsCbtReq4LzeuWQs918tuxW1f5ad0MCOYzRMwx8wozxwu6pAsz8FomUT65Cvp/uMliGSr8nHzBUc6BdInfEVFHLr1E4OGypd//q8UXvgrzqalPnkDjPQYIrsdTnLe+ZhjZ6rrBWyv9HaGicx2ED/gTOLvObUxOVHEsPDaPfTeeSXu5jf9OpsWgUO8vexRck9cT3T6PNKnfh1r4pyBCb7KK5Y6+nMUlvyrvzb2XUyu0uk0y5cv546//Y24yuFUTeMyc+ZMioVC1RBzIQSZTIbRo0czccLE0lE0+Xy+tEBWnjtY9isko7Zts3XrVk4++WS2bt3KH//4e9LpprJFMxaLsWLFClauXMluu80cVoRWeG4NogA/85nPcMrJp2A7Nt3d3RhCIISBMAbe4AZaJtM0B9Q4BdYJ0zQHJFjDHn5KKzRnzhwu/8rlmIavmSsFBwTm1wqNjwBVd5uLLrqIlStX8vTTT5eZ4QKiu2nTJl5//XXmHz6fHrsHUWXeNk2/HLfeemuZyTR4ZrFYZPTo0Xz5P/+TtlFt9PT6WsmBTk0LH/dkWAafuPRSNm/ezJIlS8o0kgHJ+td9/+TII48kkYgrcieGJStB5OCHPvwRjj3uOBxFqgODdV8gg3xHKcyt7fFQT0La8khGIOuaGKiDKhuwtwpFrCSQcwW2Z7B3Uy+X7ucy74SDlJDJxnNnqEW48Mo/6L3rStytq5Fqty6EQMRbSBz6YdLvu2yAdAkV9zNMYnscjbPmGUS8GS/fTWTawSQOOtcnDPXIS4iM5BZfT+6pP+JuXo60s/5npoWRHEV0xjySCy71NR11SZYoaapSx/8Xnb88s5z1ukVSx/2nH23YCHlRWhBnw+tkH/gxxeWP4WW2qghNgYgkMMfsRuKAM31fqcCXZ6CJXflkxeeeTv7pGym++ZCKypTIfA+RGYcT2+uExgigag+3Yw09N3+O4psPghFBWNHSd50tK7DXv0r+mZtIHf05kgsuVWUcmp/KMFVXft6y5CjSx/1nYw72iiTlnvw9PX/5gp/JPzWafik5VJsXVzxBx89Po+Xca4nuflRtmSlpYyOkj/8Knb8+611NrIIIsaamJjZt2siP/vd/yWSzJfNXpWnkoIMOoq2tlZ6e3jLNTeVibts2dtE3ewVkZLCUIVg4u7q6OO2003j88cdYu3Yt0Wi0zOSVyWRYunQpe+yxJ/lcblgBIeG8VZd9+cssXPhetnZsLZWljBTuZP0ci0b59Kc/TSweI9Pb20dcGiBnnusiPY8PfvCDvPjii/3Ws4CUvvH66yw4YkFV96LAsf3+++9n2bJlVSMGXdfl4osuZuLEiXR2dWGZFo2yEsMwcB2XaCLKRz96Pldc8bV+ARKRSISNGzbw9NNPceyxxym/uuEdXO65Lh//+CUcNn8+XV2dpTM3ZYi4vhMxoh7fjTaTJwVJC4SdZUtHJ9lstuSUGOxUKn8CUlXwBF227+c1q6nIl+ds5n8P7mBvsYxNP3k/Xuc6f5fTyG5b+mkRim8+TNcNF+J2rUckmktJGf38UZC597v0/v1qZcpqrJaRaQcrE5sEt0jyiI8rklFn8gl2SYVeuq77MN03fw5n/SuA9I/OifnHoMhcF/nn/kLHz04h9+TvS6kV6mvYPKIzDiM6e6Eyw0WQhV4iUw/284M1Ql4UAcu/8Dc6fnYSuedu8ZN9RmJ++aK+j5ez/hW6//pFOn99Nl6mvc+3qQEkF36ynGx6Dsl5Hy1ro7rkqnMtnb88g+KyhxHpMYhEM1hRFYVnIiIxDEVIem7/qk9SSvd/mwe9YSDz3cT3/3eM1sn1CbPqp+Ib/6Ln1i8i4k2IaEJFgLp95y+qMwrxXD/HlefQ9YeLcd56ceB8V4GszDyC6OwjfVkxzJ1ugquWtLORHz/HkK+hicfjNDc388ILz/P1r3+ddevW9SNX0BcxdvQxx1Ao1M931KhJq17S0WDhTqfTHHHEERQKhX4HKwOsWrWqjHAPh2Bls1kuueQSFixcSHt7e10t1I4O0zTpzWQ46qijmLPnnmR6M4P2VTMMg2wux+67784+++xTdrZh0A+mabJ6zRrsGln+hfBNhA8++GC/VBNBAttDD53HofMOpbunu8xnbbCautmzZzN//vx+5fSHv8lTTz6J4wwvVUJgzjz7nHM5fP58Ojs7Gzp7UhOsyhsJiePV33/5k0GRWPMYrv72D/n4Beezzz77kEqlKBQKdHV10dHRUfbT2dlJpuhhCpietvnAlB6+s+8mfnTARk7dpRfX88haLciut8g+9H+DWMh9UpJZ9G1f6xJLlhaj0o8Ao3kS2cd/4x9DUy8Jo1oUzdHTEYkWvEIv5vjdie5xLIq2N0RTu2/6DPmX7sRonuCfkxcsqqUcSJYfbWea9NzyOfLP/aXPYbyedgyptGkqGZ9TJH7AWY0RyGBhf/Nhum+81K9SapTKsSXLDlYW0SRG03iKS+6n6/oLkMUcdROeKk1XdMbhWJP39Y8QcoqYo2cQnX1UiYzUaz/p2nT/+dO47St8rY4bEI+APKlyqJxoRvN4so//hp7bvtznp/R2aq88DxFNkTjwbL9soh4JF3jZrfT89T/VuYMNEGzPASuOtPN0//VLKpnqADnbVD8lDv0IsPOZB4UQmOrImUZ/gjD9ZCpFU5N/VMzy5cv42U9/wve++106tm4tM6mEF+hMJsNJJ53E5MmTKRYHb4YLiJ3ruiWtWbVNZ3DfINGkr+GQFItF9txzTlXyZxgGmzfXPr5nUESkt5ejjjqKk046iY6tW4e0yO+o2qujjjrKb6OhamyUBmi//fbrF8kYEKytW7dSyOf7aYWCyMF1697i9ddf79ePgXbppJNO9HNxDUNLaCjftoUL31um7QyeE5iVN23a1O+MyMGQq0wmw8EHH8Kx7zuOrq4uLNPk3YQRGRkS32ndkw0dyOCH5qdGc+DB8zjw4HkAtG/dyrp161i/YQMdHVvJZLI4rks8FqWlbTRNL/2eMZseY2JzjLTp4ErIuUbpMGdDOhBLU1xyv5+cMRKnlEJ5AC2Hs/517HWv+H49rlN9kTEE2DkKr/7D919pwOfJSLZiJFpxujYQ2/2YkOnNrG/yWXwD+Rf+htE8wc9HVKvVPcfXxMSb6bn9K0SmHYxZT/uhnNGjMxdgjtoVt3sjRvN4YnscU0YQa/e0QOZ7fCJimP7B2K5Tu41dD9E0nuKyh8n86wekj/8vRVzNgTWLhkVszvE4a55Feg7R3Q7zox/rtqFPAPNPXkfxzYcwmsb70ZD1SKdr+yTr0V9hTZ7rE9CRyv1Vf7ZD2lkik+diTZhTvx8Uyc098kufQDaNrd0HVUiWSLRgr3qa/HO3kDjog7XrqYhsdNYCzHGzcdtX+Yd57wQq/cAfKtPTU8pMHqTlEKGpqHKRcl2HTCbLli1bWLVyJa+9/hrLly0jn8+TSqVKi3El6ejp6WHffffl5JNP6XveIBZ3hO8UHIvGfHOT9JQJsYjjFP3F2vA1XhHLIhKJEovFsSK+Sc51PaSEMWPGkE6nyWazobQMfYvdcAlWkHLgnHPO8Z3O3wGaiMCvaeLEicyYMWN4WcSVNnH69OlV82IZhkEum6VYLBKLx/C8Pv8mz5NEozFef/11uru7yxzQhWGQz+WYvfvuzJ69O7lcvs/ENpRiGgb5fIHpM2Ywbdo0li9fXoqIDYhgd3c3q1atYuLEif0DDBqA67qkUilO/7f3D1vu3tUECyBiSHJO407lIuLvAqXnYVoWo0eNYvSoUeyz995Vv1JY+1OyvTYOMbpso+SLZYYzhJsRvJ6NuJ1rscbOHNjnR4U9OxteAzsHkfgAViFfY+Sse6X+4hc8zoohLP+A4eisBY3RVMNE5rvJPvATjERTY5Fb0gMriuzdQvbBn9F0+rdKWeZrTQB+JvUmIlMPwll8PdbM+RjN4+v7SCnyknvy9zgb38BodGF3bYzUaHJPXEfikA/5QQN1SSBEd5tPNpJAFnNEps9rsA39YIXso7/GGOzxO56LkWgmc+//ENvreD+I4G1J12CAk/eTiSpzaE3ndqnkpJAh/8Lf/ECAIB3HIDRmRixN/llFsGrKs78ZElac6KyF5DZcC9FEX+DBDqyNiMfjPPvss7z6yiuD2H0LXNchn89TyOdxVFb0WCzWLyqsUqMzZcoUPnHpJ0tmnUYWE8/zMIThEzcBmzdvZsWKFaxYvoJ1695i69atZDIZisVimQtFJBIhkUjQ3NzMqNGjmThhArvssgtTJu9KKp0ikUjQq/yHAo1EQCL65ZIapPaqu7ubU045hWnTpr1jNBJBpOKkSZNIp9PkcnnVf3JI93Jdl7a2vhQV/c+j9EL5yvpPL0uXLu0nQ4baMOyzzz7EYrG+ZLUlpb0sc3KXfX/0va74zHM9EskmZs2axRtvvEE8Xn5oueu6rF61isPmHTbopjAMg97eXo488kh23XUqvT097xqz4IgSLD96ENZkI7TnTU6clGm4L/xdZfmRD2WToZI+Weilu3MLHlEMZL9zDcMLsyxmkZl2GDuzzgBRQtazCSnrqFuVw7GX2dpHUhrYyUjPwUiOwpqwZ31ipshL4bVFfWatRsmB6yJiTRRe/QepY7/om+wGJJc+ubF23R/5yC+ITN63T3MkrIE6DOkUyT97sx9V1rAZTao0EFvIP38rqSP/ow7B8sttjZ+NkR6H27XO1xzWa3vVhvbyx3C3LFM+R4MgA1KCFcftXEPhlXtIHHRO/TYZEfikKTJ5vwqWXqvvfDmx1zyLkWxDel2DXQYAKC59EGfdS1iT9qmrlY3OXEDu0V/tVIumXSxSUOffDeZ7hmGQUGcEBgtitYzthmHQ3d3NjBkz+H+f/wKtra2+6aeBVAie55JIJJGe5Omnn+ahhx7ktddeo6Ojo4xMBT5alUfjBGUKymVZFk3pJiZMmljyqal2Tl6j5K8WIYxGoyxcuPAdpZEIotxGjRrlR+0hh2V+8zyPeMzPmB4kzGyE5BuGT4LXrl1bpn0M7hmJREoEK5lMDopgeciSlV+qPzzXjxicvfvuiLvuqqJYF2zYuBF3oA17zanUN2ceOm8enuvujDEPOwbBEmpderEjRrdtYMuhtWXVnFUBwTIEDStDpYd0in3CJepd7jRawBDhaeC0cfzIPKNloq/pqfc1VffC6/9UppnBbBkkWFG87g3Yq54kNuf4OnmiFIEZNwusGOa4WQ0u7AbO+ldwNr/pmzwHE7YvPTCjFJc+5BMsUe+sQImIpTFaJuLluzBbJzXc9sU3Hx4csapoSyEMnDXPwkHnsM1nBuFrzkQ01Zc9fsB0Furw9NZdaPq37yEiiaGlTxAG2Pk+/75a9VSky5q0F0ZyFNLJ951esBMsnEPxD2rkXLxCoUChUODw+fO54IILSCZT5PP5mlGD4XsDpJuaePWVV/nzjX/mlVdeLmndkslkmXNzrYU5PFcG1+cLeZYuWVJKODrSbVkoFJg6dSq77bZbX6btdwiCBLKilGT4bS9BySG8o6OjH8EK/KL+csst/P2uvyvT4uAUIX1DttxxPjhmp5o5s6urK0SmZcOyYts2EyZMYNq06RSKxSHn0nrXEyxDQK9rsD5v0WsbdBVNYqbEle9a0lqmwTKbpvQ5xtcUMhWS79q4G14HMzaERdM35zhvveQTrIEGQ3C4ZtN4jHgTZvOE+twlIFhvvQh2HqIpkM6ghriwYrjtK5DZTpXjagAtm9JGGU1jMTrX+uka6pJUdbbVxjfKk5QOgfXIYu/bJSg+wYo3YaTH1CeRqo6RaQf7kaojKK8DErrmCRhtk3HWv6pyYu0codVyBMoZ3vwVCgWKxSKTJk3i/e//NxYsXIhtF/tF7g3U34lEnFv/cit/vvFGXNclqbRllcSuXqLkcMZ2oOQEL7dB3wRpJWbOnEk6laa7p3tIGeE1avWln/+qUChUjeoLUC39w0j0bSwW6ydbwjAo5PO47uAJVrFYZOrUaaTTaXozGd+h/114IMSwCJYELAHdtkGvbdDj+Efm7Jq0caV4lw8ZPzLMSLSGtHEDNKQAL9uBl2lHmNYQhFGWUhM0wET8/2NNiHgzIt7U8Hfcrav77YIankEME5nrxu3dhJVsbUjFKOItoJK1DlzGIJ2Di9ezeWQO9H7bZldPpbdINv7oULTm8Kpp1jd5K3JtjtoV560XRu4IhrdBgzVcM5bruhSLflZy0zSZPGUKC45YwIKFC2lpaSGbyfgucA2QKyk9kskUN1x/HbfeeitNTc3EYqIqqZJSlh2CC1LtR0RpUfTPGjTLTImywXyCQyWr06dNH3qEnUZDxGQg82syZLoeyX6tlf7DcRw8Tw7lpkyZMqUveei7VN0yAiZCie0JXAl5V9BeMJmesrfbUW472L7Ez03UEFX1fc2kU+g7qHnQneEflzKgRqLscj8XlDCjjdco3z08rZ5TRBYyDbYJGNE4IjiypwGhkk4BaedUhuSdwIyF8H0ArcH1g3900tukdlebA7Nl0tucvmJ4i5Vt2w1EP8myPyWUpUdIJpNMnDSJ2bNm8Z65+7LnnnuUHKF9R/LG+sBPINnEXXfeya233kpra2s/367gIORsNkskEmH06NGMHTuW1tY2EokEwhB4Kut7JpOhu7ub7u5uenp66O3tRUoPy4r000aM1CJsWRbjx4/Hc713ZUTY2zPUBibI24o8V/anaZrYtq2c9WNks0FaiQYTmpomY8aOVfL97pWVEfHeNYTEEuB4go6iiSF8N0GNIazxbycnEOzwHMRPWyUHV6edUfSE2IF3JIrspscM2wH47SJXjuP4PiDTp+M6Tlnbin4C09cF0ViMdCpNa2srY8eNZcL48YweM5ZkMqkOKS7Q0+MfcdKoD5L0fP+ZlStX8uc/31iKSKxMIpnNZkmlUpx44okccsghTNl1V5qbmohEov4CGIqYdl2Pol0km83SoVLcrFixgiVLlrBy5cqaPmTDWfgjkQjNLc24novGtpnrIpHIgKbXYrG4zUhW5eYkFotx0sknD9obIEjz0NzcrPJ1vXsxbILlIUiYkqTl4UhBj21oahWavGUx2yAr8BNzikjM/85QHImVqSmsdRjwctdBOnmVcLLBGsWahjWDCCvSV8YG2gQ77ycbDVbAet+y4ohoMhQZulPYssApIl3bTxraYF+/bX5QKlePiKV3ijYVQpDP55mz115c/PFLyAQh4g3kwTIM/xw9iR9l5XkOtu3Q29urdvYBsWp8lpP45OSuu+6kt7e36uG9mUyGffbZh4suvphpu07DcR2KdlFp4eyyIeGf3eabBJuammhrbWX27NkcddTR5PN5vvSlL7Jq1apSXqMREQHPwzRN4rH4sCIRNQbY60r/3MhEIkFPT09VojV58uSGEn/K2n80RJBGjR7NSSedxB577EEulxtUQENAsEry9y4WFWu4QuFKSFke4+IuL3f55wPqoacE2jDxcp2qsernzhJJ/3geL9+NsMxBrmN+fiuzbdcGBlRfwlCZ7+4z+w04GNS5Zm2Tq+oBGiIRro1IjsJsGtfwPbxclzKdFv1zBGva80XJV8homgDrXoXIziAlEiFMvGLGz8dmxRpzWRDG2zdxqSSkIjV6p3FuLyUa7e0dVKJRIcrlMiBcQ42YK53ttnEDzz/3nJ8FvoJcZbNZ5s6dy5cvuwzLtOjq7iqdTWiE/ciqHADtOA6u4+fu8h2lzW1GfvoO5NXYFpss13VJJBK0tLSwfv36sgzrQRTnR88/n/323Y9sNjPsPFh9b8myv/2IRZ9I53JZDDH4hKaBj6CU717/q5HRYEmIGZKZ6SKL1qdwpKZXJW2NYeF1bwxlyh6YHAgrijVuFu6mpRAZbEJHP9eUNXluffKiiJTXvQEv14PbtaEBLhKE6++tSMDgoxylUyQydjc/P1Xdg5/953m9m/DyPcjMFkTLpMbye03am+Jr99Q/1qhO/71tMExkvgcvsxUz0crADMv/LPOvH+JuWe5rvLZ5Wf1nuh2r/Gz6cufxwwom+qESrOFyleD4k6VL36Sjo4NUKtWXnVv0Zbu+4MILMU2TbC7rH94rGq+jIPChEVqztFMvGb4peeLEibz88sv9CEuxWOTNpUs58IADkZ5ECrlNCBZANpstPffdGP23wxCsQIs1ty2PZUiKnh7gJSE2I3hd6/F6NmK0TKqzbvqkJzrrvRRevH1wrF8IcAqYrbsQDUL3Rf3z+pxNb4BX9H/X03qpyCFrl30wR03F61zrH5zc6OIuDHCLRHc/KkSGzAHaQiBzXXhd68HO4WxZTrREsAZWBcZmv5fsgz8eIhHwya6RHtuAJnBkiLifmb0Xt30V5pgZA9fR848R8rrWkX34535qB9cZ+i5xMF8zIztVioYdZdE0DIM1q1erI3HC5M0gn+/l8MOPYMrkKfT09vjkahiE0vXcfmfgaexMsiKYOXMm9957b79zDC3L4oUXXuT97/83P2J0W+75SppKPdaH1Y7D3yVC3jOY01JkUsKh4AodPajkUpgWXnYr9rpX1C6h/iHRsb1PxGjZBZxC49tnw0Lme4jNPd3PF+W5dZJV+s+yVz2DiCRw1jyv3q+T/NNzEZEE8bmn4RV6B3FOn0q62jyB+L7vr08AVTs5G9/A69nk/73muQZIoH9QdGTqgUQmvUf5shmD7zjTIrbPySOjwmi4fWzst56vX0dVn8RhF2C2TUEkWhGpUYhU2xB+RimzdOVPW+h36CeS0ORqCKRHSklHZ2dfEsvQZ54nmTZtqp/6YBiiJmVf0sjOzk6do2pnXIwNg2LRZo899iCZTJb56XmeRyIR5403XmfZsmXEE3HkCAcyBFGtUo/xHYhgAbYHo6Muh4zOkdc+WP20IcWlD9RXFYi+Q7CTR3zc990yGnAiEiYUsxijdiV5xCWlY30GnImFgZftxF79DEZyFPa6l/z8WeqcwgEXdyn9xX3UVCjmGiMwpoWX7SC54BP+4cv1CKAiGMU3H/Id3K2Yn529LglU5MywSL730+DkB0ewzChezyYSB3/QT+I5YDb8EWbjZhR72WP166jMntb4PYjtczJe72b/Pc8d3I/0wC367Wvnff8vO+cTe6fo/3ZtPy2D+k4pXYbGoDUTrm1XfR8gHo+PwDN8B+mlS5bS2dnpH/miF8qdjowXi362/ODQ6bDPmxB+ItK77roTyxy5/g3uk0wmSaVSmKY54lGo71aMSJoGATgSjhyf5fmOOJ4e16XFXkSTFN+4H1nMqESSA9gJDX/xTBx+McWlD1F4/V5FSOzqmgPDAtdGOgWa3/9d31xU50y5gDQUl/wLr3MNRnocXs9Giq8uInHYBfXPCJQeRmo0Tad/i67ffdhPimpEqp+bKAQYEbzuDcT2OpHk/I8rAmTUJY3StSm8crd/aHYkjr3mOdwty/3jZAYqo2GC9IjtfSLxA84i9/SfMJon+KRhIHIrTFXOE0iffLUimuJtlJMU9trncDcvwxw7o04/+pqQ9PFfobjsUbyeTYhoqvGzK5XGM7Lr/qRPuVpxXeWjZEQU+fWJuDAsn2CZEbIP/pTckzcgEq3DOIro3bjNEhhVNEqBCairqzu8rxjyU1zX5d57F73jzIPvJq2K63qkUnHmzz+Cl156qSyxqOd5pFIpHn74YQ4//HDmHTaPzs6uYZmVfcf6OMVCkeeeew7HLjJr9myam1vI5/PaGrW9NVjgu+fkXIM5LQUOGJUn5wp0sl+VsNCK425ZTuGluwiyuw9MVQXCNGk552fEdj8Kr3u9f7aiMHzyEPwAMtcBnkPzmT8itscxSjNUj7z4i2fuyT+AEUF6Llhxcs/82V+g6yXoVNqS2J7H0XzGD8GxkUGkZLh8wj8Y2uteT2zPY2k552fq3nUSVSntVnHJ/TjrXvZJqTCRuU5yz9xUIheNaA6bTvsW0d2OwOvaUFauUs4pYfhkw7WRmS0kDvkQLR/6jX/OIm9jXiqpDsPOdfn9UK+Oqg+NpnG0nPsLRCSOLGagnoZJGGBafmoOt0BywSeITJ6LtctcrF32wZq0D9aEPbDG7441fg+scbMxx8zAHDcLIz2GwpL7h3724bt5DjAErW1tKmS9v1/Na6+9hm3bQyZGjuPQ2trKP/7xd1544YVSzq6dTXtTWf8g3L+rs3PQqQJ2Vpimfx7hEUccwS677EKhUOjXLpZlce2117J69RqamppwHGdIcum6Ls3Nzbz11ltcdfVVfOfb3+Kaa67h8q98hVdefrnq+YQa24FgQV804Xta8zhSmwlDooyIxMg+cq2vRal3ppM6hkQk22i94I80nXwVZusuSDuHzHYgMx3IXBcYBrE9j6Ptkr8R3/8MP+Kwnk+UImCF1+/DXv6Yf0SO5yBiKZy1z5N/4XZFoOoMKsME6RI/8GxaL7mN6B7H+IQq1+WXL9uBtHOYbZNpOvUbtJ7/h9BZgg1IhvTIPvjTvvMEpYuINZF/5ka8THvJVDkwARGIeBOt5/+exEHnIPPdeNkOpJ0Fx/bzThV68Xq3YKRG03zmj2g+44d9UXlv99atVMc/95n96plrPZfIrvvTesGNmM3j/e8Fms0w2TUsv3/snF/fRCst5/6C2F4n+KQ6OHan2o/rm7Z67/kWbvsqsOLaD2uQxEFKya677qoismSZRiIej/Paa6+yePFiWlpbsR27L8qrrmbH9XMWjRrFgw8+wO9+9zvi8fhOpe3x/dA80ql0WVqCgAREo1HWrV/P8uXLSSaT2Lbd7xrP83Bd9x1CBvz0IqNGjeKUU07pd6h2kPajs7OTb37jG6xevbrsVIC6+bEUsbIsi5aWFp5cvJivX301y958s2Qi3Lx5M7/85S/o6enxTc3a0X3IsHQTbON10/N8AvPWi2Qf/RXJhZf6i9pAZ+UFzrCGRfK9nyJx+IU4617x/aScIiLV5msXRk0tEZL6vkkqMs/Ok7n7m762IxiMUiIiCTL//B6xPY/xE4HWIxnCN8VFpuxH60dvwG1fibNpKTK7FawYZtsUrIl7KW0QjZEW1S65xTdgL38ckRrVZ4qyYnid68je/yPSJ1+ptG3121DE0jSf9RPiB55D4fm/Yq97SWncBEbbZGK7H038gLMwUqNUO26njOpS+nXsWk/mn9+n6fRv1ddIGmaJZLVdehe9i75N4cU7/PMsRaAplOoonjjWuFnE555O/KBz+8zJA8mh54AZobj8MXJPXI+RamvcDKlRIhCFQoHZs2fT1tpKtoomxrIsfv2rXzFq1Cj22ec99Pb04KgDdoOkosHi6C/BEtOMkE43YTs2N/35z/zhj38snUm4s5nTHMehra2NpqYmOrZ2YEWssvxPUkp+d9117L777rS1tZHL5UoRmaZpEolEsCwL27bfEZouwzDJZDIcf/zxPProo7z22mukUqmS03tAzDds2MB/f/WrfOSjH2XhggUYpkk+l8dxHKTKZ4VUx3EJiSH8Q52taIRNGzdyw/XXs2jRotKRUAFBTafTtLe3s3LlCt7znveQzWZ1VKomWDswPBeRaCVz3zVEZy3wc0l5dTROgabL8xCRhB8ZN/XAfpqekjajgTJgWmTu/qZvekuN7lsspQeRBO6W5fTcdQXNH/h+fQITPFf5Kpmjp2GOnlb9uYbRALny0w+4m9+k9+5v+Nq1sAbHcxDJVrKP/5bY3icSmXZIY23on7VDdLfDie52uF/dQg9g+Dmdyp6/nSOvPAeRbCO3+Hpic44jOvvI+mRc+ZwZTeNo/sD3cRd8kuLSB3E2vo6X78GIpTHHzCCy6wFEpuzXZ0asV98gHUT3Rnpu+g917U6SGX8HI1i2bTN+/HgOOPBAFi1aVJbJPTATZjIZvvmNb3DGGWdw5HuPoqW1BYnEc93SPsgwDUzTQCDo6enlscce4447bueVl18mmUqVyMjO1j6O49Da1srUqVPZuHEjkWhfpnI/ei7Byy+/zBe/+EXOOussZs2aRSqVQhgGvbkca9auZd1bbzF9+nTmzJlDPp/fyWXG98WKRiNccsklXHbZZdi2jWVZJRIUkKxsNsv//vCHPHD//Rx73HHM2XMOLS0tmJYa20ocXM8lm8mybNkyFi9+goceeogtW7aQTqdL9wtrVoUQJJOpd/1Zgppg7Rx6LOWTVKDrT5+g7ZLbMFKjG1jURV+CUinLTTOBD1EjcB0wLfJP/4nsI79AJKtoItTinl/8e6yJe5E87ELfPNSIX09A0vqVTzRGWlQ7yHw3XX+8BFno9bVo/Rypfa1M982fpe3SO/02rOfUH2hygvIZZt9xP1L2fb+ynNvxtHJhRf06XvI3n7TWJZJGiUiaY3cjMXa3gdu6Wn2r9Ueui84bzsfteqsv/YfGkEhEsVjk5FNOZfHixRSLRUzTLJGIwOzjui6//e1vWbRoEfvuux+zZs9i3NixpSNHstksmzZtYtmyZbz66qusXr0awzBINzWFkpeK0gK508yOUhKxIhx00EE8/vjj/crueR7JZJI3lizha1deyehRbaTTTQghyGYydHR2ltr07LPP5oLzz6dQLGLsxFoXw/B9sWbMmMGnP/1pvvOd75QS5oZJlmVZRCIRXnzxRV544QXGjRvH1F2nMmHiBL+NgEw2w5b2dt5au5b169eTy+VIJBI0heQmrE3dunUrCxYuVJGMeYxtnHNLEyyNEZhF/Egxd/Myuq77KK3n/97PaF5PQxEQCzGEPDnKfwnTovDi7XTf+iWlGaoxXDwPkWyl947/xog3+75dwYJcb7Ia6tEtwWJe6KXz+o/irH9FRak5Ndowgdu+kq4/fMz37YrEG9M+hcsXJPJU0YPVnjP4/FkjJydYMbxMO53XfZjWC2/EbJnUmFm5RCQrd52yrw8HbCdZprnquuECnDXPIhLaNDgSBGvy5Ml88Lzz+NlPfkJTc3OJXAS/DcMgnU6zefNm7rzzDoQQRKPRUsoFx3FKPkjRaJRUKlVaaA3DwHX9JKOxWAzHcXYakmUYBtlclgULFnDLLbewdevWfuftBZosgEwmS3d3T+m70Wi05JB9ww03sM/eezNv3ry+I5J2UpimSU9PD/PnH0E2m+PHP/4RkUiEaDRapgGVUpaiDTs7O9m0aVM/4iSEIBKJEIlEaGpuRiqfrfDnQgg6Ojo47LDD+NjHPj4k53mNCtnWTfA2wnMQiRbs1U/T8euzfZ8qw1KOxiO8RwhyTSmfpq4bP+k7cA/oZK/8HqJJum/+LNnHfq0i78TIay+kLBEjr2s9nb85B3vZY7XJVaheItGKvewRum443zf3Gab6TqNZ5WtEMgZlEgZetmP7OXN7LiKWxt28jM5fneUfndSonKjIyGpO7gMev6MOdMawsFcupuPa07HXPrfDk6udxSRmGAa9vb0cc8yxnHPuuXR3d5cOUA7XxfM8fxFsaiKdThOJREoLYDQaJZ1O09TURDQaLTk2m6ZJPp/HdV3OP/8Cxo4bN+SoxEacpLcFAbVtmzFjxnDeeeeRzWYxDKOqJiuobzQaLSOfruuWfNBefOmlMg1ho+UfybqNVDsGJOu4447jy1/+MtFolN7e3n5nTgZtY1kWqVSK5ubmsp902g8i8KcXt+z5pmniOP6B5qeceiqf+9znsExz2CcC6DxsmmBtJ5LVivPWi3T8/HQKb9ynFkDRlwBy6CKt7qGOXylm6Pnbf9Fz6xd9TY9h1F+glWlMRFP0/u2/6Pnrl5BB1vaAgAxHYSy9EPkzKS55gI6fn+ZnlU82uJh7DiI5iuIb99Pxi3/HWf+q0u4MpQ2Vli9UpsJLd9D796uVy9F2ikzyXES8Cbd9JR2/+DcKL981gnJSQSiVKVoWs2Tu/R6dvzobtzMwC+7Au1jhO+RKKUuO4D7H9B29m5ubdygtjmEYZDMZzjzzLC655BIAent7Ecr0E5Q1IFqVUWHh94OFUUpJV1cX48aN46tf/W9OOvkkHNuuSFDp3zdMSGotiAFx8dtUlGk3IlaERDKxTaL1TMMnEiccfzznnnsuW7duLaVpqJa+IfwTlNEwDBzHYfSoUTXrF2j9RNmRRf7f6XR62PIiAm1bMlEiNJXPCbRQ4TauJzfd3d0cdthhfPNb32Lvvfehq6sL27ZLpLJSRgJtZvBTKUtCBQgE8tPc1Mx//MdnueCCC7AdB6cOuQrM2oH5uvJa0zR3uojWdxjBkoPIOj1I7Yn0BnHvQQrAYLJlD0QQ4k14vVvouu4j9Pz1P3E73+rL0xRuG+nVIDSyz4eo9DxR0jgVXrmbjp+dTO7RXyGSrTSWPyq08OKnisg9/js6fnYyhVf+HjIxifLyKf+f6mUMl0+W/H+8rnX03HYZndd9CLdnEyIxyMVc+Yw561+h49r3k73/x33arGCxrcxcLr0+MlVqW2UmVGXq/ftVdP7uwz6p9LeGff5vtX6q1b3edwb6bpkmK4Us9NL1h4vp+cv/U1pPsy/AoKwPGujX8HeC/nSL5J+9mY6fnkjvvd8D0/LzXe3APldCCIqFIgcceBDpdJpcLlvyUclls6RSKQ486CCKxeIORbKEEPT29nL8iSdw5VVXsf/+B1DI5+nt7S2Z9YJFs/InvJgWCgW6urqIRCJ84AMf4Dvf+Q577703nucxd+5curu7+w65VkTuoIMOIh6P4VWRFZ8YuMTjcebPn09vb2/JbGkYBh0dHey3335MmDBhm7WpbyrM8bGLL+aTn/xkafF3HKdU/2o/gQZs48aNzJkzh6OOPrqkBQvfO5/Ps//++zNhwgS6u7tL38/n80SjUQ4/7LDh10057Y8eNZqDDz6Yzs7Osn7o7u7m0HnzSDc1lR2F06gma/LkyVxxxRV86lOfYvz48XR3d5PNZkt9VUt2qslPd3c3kUiEU049la9/4+scsWBBqd/rtYGUkkg0ysGHHNLv+d1dXew5Zw7jJ0wYVn63dwK2kw+W7DNjNCKz8ZZBOBxLP6t1KCFn9dHsfyYisQaJh6zvHBwuczQxcJk91zfZESX3xG8pvPoP4vudQXz/f8easGeN56gjzwMTlyD0G2S+h+KS+8k9+XuKyx4BwyqPFhwCARap0ThbltN1w0VEZ84ncfB5RGcf6fty1dSABVN2f98xZ8Nr5J+9hfxzt+B1r/dNggzRBOk5vjO869D7j6vJPftn4vufSWyvE7DGzardV6HyyEIGe82zFF66k8Krd/tZ0a24LxcIPxdXzVlPfVbpGxX4Ow0UIFD6bqQ+oTcjCDNK7sk/UHjtn8QPOofE/mdijt2tv9WvGtkKAiLK5AbcjrUUXvkH+WdvwnnrRbBiKvjC2eGTiQZ+TZMmTeKiiy/m9zfcQGdnJwBtbW2c96EPscsuk8nlcpg7mB9OcGbgtGnTuOyyy3jppRd58MEHefXVV2lvby/5vgRarbC2RghBPB5n6tSpHHTQQSxYsIBdd92VXC5PLpcjEo1w1tlns2XLFp566qmSSe3UU0/l1FNPJZPJ1vRLCtIDnHLKKWzevJl77rkHW2nDDjvsMC666CLs4jZeMKUkl8txztlnc8ABB3DbbbfxzDPP0N7ejl3luCGAeCzGhIkTOf200zjjjDNoSqcp2naZk3tAwkaPHs1lX/4y13z/+6xbtw4pJU1NTXzs4ouZs+eeZBQxG47iRQhBvpDnIx/+CF1dXTz++OMlE+bJJ5/MmWeeSS6bLdO6Nkqy8vk8AoMTTzyRww8/nCcWL+axRx/lzTffLJmdA21epUY0kJ9kMsH06dM54IADOezww5g8eTL5nE/yA9moV/9gI3P0McewZcsW7vvnP0tkar/99ue88z6Eq324/Kn2pjMwz7wZd/N/73ZHU8w8uSvvuUJgbrNHeg5GajSRaQcNHK0V5G5ybexlj6qM5qLuvSNTD8JIj27o3s7mZTgb30BY0QGkSpT8p6Iz5tUnJgik52Evf7SxA4cNE5wiXqEXI95MZMq+RGYcRmTK/phjZmCkR6tjdkJ1cW28fDde1zqc9a9RXPEE9orHcdtXgDB94sEImbiCPDyFXvBczDHTic6YR2TaoVgT52C0TMKIN1UQCoksZvF6t+BuWYG95lnsZY9ir30BL9+NEUuDFR0hLYkAw0+kKYs5jGQr1oQ9iezyHsxxszFbJyHizQgzirTzeJl23PYVOOtexn7rRdytq8Cx/bQNVgzcIiLRqvKMDXC0UdDXuQ4/CadpgetgtEz0jzhq5LuFXtwtyxpzqldyIgu9iGQbkemHEpt9JJFdD8AcPa026Q24WmYrbvsK7DXPUXzzYZzVz/iHaUfivnxJue2IlTAQTo7iqN3ZeOwP+z1HBERwkK+llCTicbq6uli+fDkIwW4zZtDS2ko+n0MIo68HFPEPv65MiSxEOQOv/rrvvX6vyy4X1V8HU4rnYQiDRCKBYRps2bKF1atWsWrVajZu3EhPTzfFYhHD8K9pGzWKSZMmMX3aNKZM2ZV0Ok2+kMcuFv16CoFEErEsDMPgjTeWsHVrO+PHj2fWrFkUi0U8TyqTX3nrh8sphCAWi7N82TLWrV9Ha2sre+65p79Bsh3/YOrKWgsaeK/8fVEpAaGv+Ee4JIhEomzavInly5axZs0a2tvbKSgtUzKZZNy4cUybOpXp06fT2tpKLpcrabyqjgHPI5FM0t3VxauvvYZdLDJr1iwmTJhQlu/JXwokhHXMsv5rWdrnSEzL15C98cYbbN60mXHjxzF79mxs28Z13PKNniy7U/nzZWhOVW+7roNlWSQSSRzHYf36dSxfvpxVq1axceMmunu6sIs2IIhELNLpNGPGjGGXXSYzbfo0dpm0C4lEgnyhQLFY8CUg5J8bfmawry+VQZbPYbFYjFWrVrFu/Tqa003MnDUbYVAi4zKsHAhqIfvuUN6OFc+TssazGcjULU3TFK7rFmKWOXvvvfde/bWvfc248sor3/Zd43YgWH2ERRazDV8uoukGtVjCPzak0YXbivr+SQ0dv+IiC5nGaxlLNR6NFmgZPNdvF7cIZhQRb8ZItvkEIRr3zVlOEVnsxct2InOdpXYUkQQEddkWC2WgBbHz/iHB+A7xItGGkWzx+8iK+u1UzCPzXX729HxPX32iyVLuphF3Ii+1oYO0833nDwba0sCs5tpI6SKE6ZOLwPnf8/pIkecgnUKDKglLaSPVd90i0rUb/K6pvjvIOrpOSc5FLIXRNA6jeSJG01iMRAuY/oZB2llkthOvdzNu9wa83naknUMYpt8XQcLZba2x2kYEy1/MfOfeaDwOEuxiwV9kTaMfqdmRCFbwjp800w+Rj0XjmKaBFL4zsj9GfI2EXx9wbJti0cZ1XQzTUJqaEGspHSKdwDRNXNehUCio8hoV5a5WTvA8n7haET/3Ui7nj3ejIlp4WxGsYAGVEiLRCLFotCwgIKiEwE9UWigUSsSq2rE7Ybieh6V8hARQKBb7Haw8XILle3B4SPzDvC3DwnbtUo4ugSjLkD5YghW4iLhSIhSJikSjJXlyXMeXK0lJdgzh+ybajk2xWMR1XIRhlHhVGc1pkGBJ6ZPWWCyGaZl4rkehUMCTXkna380Ea7uaCH3foEbNQW7D9xaxdOMmxYYXeulrhrZJmelLqQCq/H1kwOtah+xYE0osKvoO4jUivnN4UJdt6Tcj/QFbIqX+TIzMdeJktoTa0t8NCRXBVlafbVnGUhv6TvqUtHiybMflT8zBrOL11atSPmORxuU5/AwrOjjSNBhyE9RRGH6aD9UHXvcm3I63QDrlOdNCZy4KM4KIxHzztfreOyG3VZCiIJvJKBIgdqrwfMPwSYvrumSzmdL5hUFdZGhhEkJgCIEQvr9LNQVpQC5KpMgQgzbrGYZBoVAgX8j3lfHt3v0rouQ4Dk7FETlhgiWEQCj/n8HIS29vb+k526J+Zf0g/f4rPUeOyAN8ci3Btm0KxSJSaSj7UtKooS69ss9KTu4jUBjDMHztaKGP0AlVrnc7tmMeLLkNF1pvG3WufHsWpFIuI6U1sqJUP91RhiLB3s6uk+WBB6a/eFcvX0V93rYy1pIB2aBsyKFr2Oo5r28LWbQivpl7IJN4KTDinZcwNKy1EO+AOoS1PNXea5i4MfR8ufU0QdulXaoQrJG457aMdvPPoGSbnukXEO+SP27Fs8Kax21RDv/5hiZVOw7B0mhcOzJSW55tSLj0yNox+kB3g4aGhsYOAZ0HS0NDQ0NDQ0NDEywNDQ0NDQ0NDU2wNDQ0NDQ0NDQ0wdLQ0NDQ0NDQ0NAES0NDQ0NDQ0NDEywNDQ0NDQ0NDU2wNDQ0NDQ0NDQ0NMHS0NDQ0NDQ0NAES0NDQ0NDQ0NDEywNDQ0NDQ0NDQ1NsDQ0NDQ0NDQ0NMHS0NDQ0NDQ0NgJCdYZZ6hXkh7/QG6pj4zV0NDQ0NDQ2OkgDAMhyNi23Q1wxRVXbBdO42uwXlkofH4lXjeE0OxKQ0NDQ0NDY+cjV0J40UhEIlm+3377dUophRBi+xGsm199UAJ4LotytidAaNOhhoaGhoaGxk4FKaWMxmJCCv4O8MADD5jbqywGwJk348qvYYyPvPlktug9lY4bhpS4uqs0NDQ0NDQ0dhZyFbEs0dvTk3UN41eKYHnblWAB8CpCXIlnSOML0gNTID2JthZqaGhoaGho7Aywm1tbTcd2rjx4n33W3HTTTeaVV165/QmWuBlXnoE57htLH+opepe1JU3LAKk1WRoaGhoaGho7KqSULuCMGTMm2rG1/Y8H7Df3uzfddJN55plnblf+YoVfiJtx5U2Y4sw3v73xv2fKZNT4timgp+BJkC6AoO9/DQ0NjQanQLa9PlwO+LKBb2i8OySRykB52e91n3TI8jcHfC3LH1L2uswgVPE6/Lx+zw/dRIbuXf5n+LPQvcOvq3wmQ3+EayPLCx4uWXl5yqoUvrByvFd8NrLkykqlUqYwDDq2bv3pbX/5y2eklAbgbW9Zq8qUbjoD88ybcdd9debCpCWukPDedNRAKgGSmmJpaGgMaqYxwMlhj57DxpN+AdLrPxEJMaTXIvyM8GvDfyXKv1T22qiYyYQonxarvw5tNStflxeo+uvQe6Lvjxqv+73o957oqywYZaX13xL9p3xR8Z7otxpUe0+9K/rdrcH3yt8XlRIgdsx1ZXsTLK+SYHml/3ZYguWVPa+cYElkifr4Zfb6XVe1TSufJyVSSjKZjGeYxiO27X1n//fs9XcppZoexHbfP9WUZ1+T5ZsHO78240BpmO/1PG8PV9Kq+ZWGhsbgYGK6efIt0+0Nx/10PThVJqKK4GWj77VR5eN+3xJUuYvR709R6/PSI41aH1NRonARq06vBgPPliJEjKrBqCBP/Upi9P+qUeUaal7Tn8ANvDgYAzVPA9cZ1Kly/z4eAvEyBugYn594dbQitTUtpW+qe1S+rn4t/RQqsr9arf/3Km7iVa1L6CKv1pWESI1XlUV6tbRLXrg8Xo2yqU+8/h/I6o3R95cMvysHfHbwwjCENAwz4wm5UhjGk3P33PMlRboMIYS3U0yJ8msYUmoypaGhoaGhobGDchUpxU033WTuaOVqiDzJr2HAQuMB4L17PajdFjQ0NIaIM3hg7KXbaNP23gFfNvANDQ2NEcADg7rggeGN+ve+19tptFYaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGtVQNR+NlNJk4BxZEvAGSkXfwD0avY8ABpNATAoh3Cr3sepdM8Aza92z8jq3Wl0qnl0zZ0dFm9V6pkF5EmR3kP3gjtQRAhVlCZ+gNGC/VqlDPfRrswblQqp29AaogzWEqvdrw0b6eITqXXYPIYQzEvWqdp+RmAeGIVvVnj1S8069vmykn+rJeFk5avVTo2N/sON+BMboiMy7DbTpsOejEVqvht3nb0MfDHbdqjZ/NLLG1Ov7uvPqdpzvvR3hiJyRnAR3mPsM8pnv+Az126qOUkqjkXtvj36tVY53Q3+/E9pXSinq3WtH6s8dRcZrtKOxvcvfSDnerv58u9crNU+OaB/sSPOYqp+5A8r+DjM/1NJgnQ6Mxz/5R1RcnwGWAc8IIYqVZ/9IKYUQQkopjwF2A9wq7HUw95kCnFilLNXYqwGsEkLcHT7wUUrZBJylPhdAuxDiluAZVYQ3CZyjrjWADUKIv1Up2yTgFFVHE/iHEGJ1+L5SyjhwNhBV93tWCPFUuL6h+x0HTFeP2SyEuDUszEIIT0q5ANgT/zA3E7gTWO9XtWY/zAxd/zchxIbKug9GeINdj5TyQOAoYA8gDfSqPn1UCPFAuNwVddgTWFBDNsp2MqrMrwghHlGTlVT1Gg+cTu2j2V1gA/CiEGJNuE0qtDxnAykaP+JdAH8VQmwK1Sei5CupPn9eCLE49Hnwe3/gYNUXjdT7VSHEw8Ekre7xHmCeukYCfxZC9FTIXFTVK95gnYrAjUKIfMV9TgMm1Bh7PaqvXxRC5Cv7eqiLcejZC/ETrU9W9XwLeAZ4SAjRXeu7Usr3AdMGMV/cJYRYq8a+UG18AHBQjX4SQB5YqcZyT4155EygRb1lA38QQhQHqPtZQKsqVwb4U4XszAGOCPX7TUKI7mrjuGLM7Q4cC+wDjFJlXwUsBu4TQmQr2l00OL4q2/EtIcSdteYVJbfHqbnIAjYDL6j+XDcceRlgrWmkr4L2PRA4sE6frwCeq3afOvPkXsDRwF5Am+rfparuj1S5PqjXGOCM0Ny9XAixqJq8qetHAx8IzR+vCyEerJg3jwemqq/WW9eqjSFHrTevCSFWDjTuQ217MLB/g/OeBTwhhHi+Yt6boeS41rh21BzxvBBiY7X5fofReEgpX5P18YaU8vyQCrCMjUsp75KN4Q0p5YUD3OcUOTjcH2Kxhvp7RpXrjq/cPQRmFSnl9yuufbGifYKyHVdx3emVDFpKOa7immvCz6q436LQdUsqnhmU7U8V97u7Sj0MtXOcLaW0K64/cqi7uVA595dS3lunH56SUh4d7tdQHT4zyD79bfD9UBmOaPC7PVLKG6SUEyo1JFLKtJSyVw4eh1fUp0lKmQt9/pOKz4Pf3xjkc64L1Tu4x1cqrplRqVWUUrZIKYuDeI4rpRxb5T4vNvDdZVLKq6WUbcPREoSeOUlKefcAz1stpbxM1VFUGZP3DbKNTwyN2aCNv9Pgd9dKKS+rGHPBPX5fce0J4c8rxsWcimtvV9eGy/TZimtmVs6ZFffcRcl9YYDyvyml/GiNue2IQbbjkxXPF6pNYlLKa5WMVUOnlPKnUsrJjWrGh7jWrJZSfqmKjAft+70G67lGSvnlgTT5oXLNklLeXGUODuMJRRDD3xPqp0lK2R66tltK2VypyQrV4YsV9/5IlXnzwdDnL9Xo+2MbaIesWq9OrKV5DpXrh4OUpf+uMu+d1+B3t0opfyylTO8IGr9abLJDMcJCjc8dYDbwGynlV4OdVsU13eq6PODVuc+vpJSXqfuYVXbXQVmcBurk1mDG2dB9PODHUspkSDhMIYSjdq+fUbvO4JmdNZ5lq89z6nexxg5vq/rcUbuXWugKXddR45qeULsWgPdJKc8RQrihtguY+0/UjqAQakd7qGpX9Yx/Bx4FjhmgP2y1G/ynlPKiKv2aC9WhkT71Bmh7e4B7eEqzdh7wgNoRhjW3skafOaGfWrv2ytdbGujjbKjebgP1dga4R1H97dUo35ZB9HetsnTWmQckMAO4HHhaSnmIkhFjiOQqoTSy76tRdw+YAnwT+JqScaPGGCo0qJWsdk2mgX5ygF2Ab0opf6F28CJ0v++oPgru8WFVXlll/j1H1S2nrv1mlZ13LlSvquUKaQz2BZ5Qcm/VkJGi0vr8Vkr5v0pzYQxyfA0kQ4FG/VrgYwP0RRq4FLhRtd9QFsTwWiNrlG0K8B0p5a9CfTWUPp8MfEtK+fNq91F94CrS9ATw7wPUyQYOAe6VUn4+mMNV35tCiB7ge6o8GaBJWXOgwvdX9d25oT5bBvxRjS23xhpTb10rDtD3caVRuktK+dOgz2sQmswg571q8lpogAe4SkP4KeDvynoktifJquUIa6rPDKAdeCkkJLsqM5arhPkqKeVdQohnKwZocI9AvfpkxcQyQwmro675upTyFiHE0or7iNB9THWfrVWE1lXXLa4xcVrqx1QdOBO4XAjxX4olBxPMz0LCa6i/zQHMRZZ6ljXAQLJCbT3Q4mOGrjMHIMXhe3nA95Umq0tKGRFC2FLKD6oB4AIxdZ0xlAksRK4OAf6knl9UZs/NwL+ATao/FwCjVZt0AC8rAQ87dxoV9XxYDcJaffp8lT4VocXDUDLaHlrkWoD91LV5YHfV359VZM9TP0+FyguQUKr8oLwrFVkxQurpnirlaaSPjZCcCOBp1Y6i4l5Bvd8IPaey7bwGxnYgm8uBJeq7soJcBOb6QpU6heeBDmXSCdp+nDJVB5PfDOAeKeVhQohXB2kuDDY356o+KyiZfQL4h5rM5ynZAtgI/CQkV7Xmrk41H4gBzLAbB2jj4P6PVEzqk9X84an3L5ZS/lkIcV+gORdCvCSlfAo4XF13opRynDIti9DCGFHmXEPJ3nPAk8q84YY0XpVlEjU0VxOAu4BJoXbMAfcpE9coYL4yE0lVticHmNuC8fWsGuO1xugLfUUpzRf7Ah8JzRXLgT+r1/sqs1la3eOqik3iYBBeazJqXAWYqMa+VMThQinlHUKIv1U8K9y+HvB4qM+FItNBn7vAx1Wf3x+qb0Bw9wH+plwGgj7oBO4H1gJjgIWqj2z17P+RUm4SQtwQmp9Q8+3XQub+Dysy6lXMzQepNrWBiDJJ21JKS42twawxQd8Hri8vqPEvVF1mqjoEc+ilQEwIcZEquzvAvOfin+7s1CBIlpqrKsekCJXbUvLYHRoPY4C9Q/PREcAlQogfqjHkVHEFql55f7MRDlCRtTaFtT6vt5NcHFK5/bXimriU8nL1WaB+/mEVVeRNoXu8XOVZaSnl/6rP8+r356vc53j1WaBmPWgQxCCYdKaFyuopdbWjzCj7hK77tLqmqK5z1OtHa6hSjwpdL6WUJ1UxEY6VUnaF2uLrA5gIbw1d93QNE+GvQu3hhZ59rfo8IqUcJaXcEKqnDKnojxiMKSek6reklC9U9PsfpJTjKq6foFT+PcqPppqJ8OPq+46qx+QhmAXmVcjFcVWunS+l3Kzq7kopl6sFreYgk1LOrOj7DzcwXtJSyvWhvvteDRPhV0MymFE+E43WO7jH50P9WZBSTqti9miWUm4KleeqIWqUHg3dY1FlP0gpD5ZS/qtCJp4Mm+cHWbcbVL08KeXSKtcdoMyHH6xiFg/k4m+hMj80yHoH5bgidI92tRMOXxeRUn4hVG8vNP7CZo2PVMxvHwvPb2psHVPRfpfWkJ1PVIyZGRVjK6j/9RXPfFxKuUeVuffzaox+quL7DY+vBtrxk6GxVJBSTq24bprq8+8OxbxcY615toqcflTVo6jk644qZuGrQvfYIqWMVdwnGjLBBX3+fxX1NdQ9n6jo05uklLtU3K81ZDqzVbk61fwpwg7kUsq/hvo+F7RjMC+rv38cuqYwgHyEzamP1VjXjqzo+yMqyj5auXlkVbkDWfv3ivsEZftW6Jkbgzl4kLJ0ZsVaO7fKtaepMjmqXI9VM6PvCCbCsp2w6siIYst5IcTX8Z30ouqaPQdQ7QEYQURFIDhCiF7FzHvUfSR9Dt71dit1SVUD9ZaK6f+f2nVMBr6u6hAZoqr67YZQZXWBj0kpFwohbKVWHh/agQxLRpQm4n3Ae0K70X8JIT6oduRWsGgIITYIIT4J7Bs4WDagyTAbWfDrIBGSU0Np8h5RO8BAczdG7eArCaQIkeLKwR8shJFGItwGiWit+o3ws4wRGDNWiGgbQghXCPEkvuPyo6ouRXzn8BNqmPvrmelioR1pUgW4hHeWzwghjhdC/CHQ8DQwPhimbAkgHVo8TSGELYT4H+BN+oJXdg3VJSjXX5WGLJgnPxSeJ9XO98OhXXkncFMdsy01TIOulHK60oa56pkrgROFEK9XjNFeIcQ1wFwhxE+C72+DeTeu2iMw5e5W0Z8rhRAfEkJ8qcH+bEjWw+sMftj+74CH1Ng2gN1CzxMN9nlRCPE9ZXoL+nxKhdbOU1q5Q0Lz5INCiDOFEG+F+sASQnQKIT4L/Fr1va207heHTd9KPq8NyUQcP4AirPlN4Tu3S9VPi4QQy4cbdBJCMjS3CiFEuxDiR/iBPYFsSOArSg7ejvk+WTHfm8ph/151fwOYoNraq/BZSykfzmaljBitXrcovzdTStkmpRwTuBFVKWNCfd42UHmtQUzQRmgw25T7mQyWIdYqULGB786QUm5VjehW3LNXCPFWA/d4Gt9HyAUOV1qK9wLN6r1NwDpg7g5Mrkz8aKAIfqQXyjfgKuACVY8I8Jha9KwhPifoq1NDKlsJfCXYYYRz/ISisZY1OMAFMFvtGCsHpwC2CiE2NxgRIup85lLhkxSKngqibGQNlbHcBhEpgbZDVDxXqIXBHaHnjJVSzlYy4FRpkxWNrONqoiIUoRaYo7+g5CyQjQ/g+1KJQcrYMvV3UZlPnpZS/kmZCZ8RQmwJLeaywUl4dhW5Cp65RgiRHcacJUO/7Qp5sVSU343Af6h2nyelnCOEeFXVYxRwcsgMd6sQYks4omwQ87OnyG5EmcTjwHeEEB1Symg4glGNUUMtwqLBRXiqastq825GCLG2SrssU2VzFNm4S0p5k5KNJ4Lo3tB9RmJ8iYr1KKpMRt1DWK/qRaHaVa59f8U8eVl4rFRo3yTwX4owBZHMJwNXV7TxfcpsNku9/qAKlgra6zhlCg3Mg78I+rgBstMIvICkhMxnESHEHUobeJoq71xgj8BFoEabWcAcKWVvlT4XwCYls4Od72tFFvaLtgT+CRyqPutVZW9Vl3Xgm9BvA8YCr6rI/cp2/LsyyW5WXKJqRG8ji25BLaDhRfR4Ze+01T1WVWiGqnZQ+LVyaL0K33EvsFM/10Bj3lDlGYGm5k7g9AEmqEDwv6N2k6eqev02NBFYwGfx0w/su4Nrr5YDP1I7ZRffT+X2UHs8BnxVDdCharO8kJYy0PCsDfWVW4WwyAbJVTDg/lFjcFjANcB/qrIP5GybVX3uhmTscHzHz2CnugJodPBuS7j4/jYP0+eDGK53BLgeuGIIi221Nr5YkW5RZSx04PuobB1Cuzhqsn0GWE1f+Pceg9TCBDvM3wGfU3OBje/n9R/qZ4uU8hHgeiHEXysmzFptvB/wag2ZNtTC9K86bSzVxs2tWBw/pxa8QFPxQsU8Fcj+r/GdboNN0bnA5aq+p+E75Qbh678cplztHZrXXeB+9Rynyhh1B6ld/in9Q+SDOeU+/GCb4H5Bf96rLB2zVH/GlMbuw0CvcoO4EbihMl3EMOBUJHV1lE/UkaF54K2QU79ssM8t4P8pLVzQ5y+GN0Tq770q5slna/RB0P6bpJSL8YOGAKZLKZuCVBBKS2VLKX+HH9xhKyJzkBAi8Df+SKjflwOLBqsFHdTC47ddENh2u5JjR/XvHDXmjBpjchTVff6C+f5LwPcbmO8zVeb7U/H9joPx9EYocMANaZr+oNZGB/iommd+rHhIRm1QxiuFy2HAgSrtTrCh3F8pZOoScauByXmOCm8N2PDuwAdVA9jq5jdW7FwqG3VahQ+HqQR1amjgrQduD0U9GIMwd5hhk0ud+gSD4VJl9gocYgMHuweEEH+SUp7Njo8xQojbpJQ305cvJRJi7h/Dd7RkqLvD0ATcFHp7qxCiENYADfC9RrVxtd6rZ68P5OG7UspNIZLfqnYWIjQh/jzQLtBYZNS2JshTB/h8fAO76ME8q9ZYjw9nolV/2lLKLaH6pAeSjWqyohabN6SU7wf+r6JtHHzz7ulqA3W32iC111mURR3ZqqfJcJXc/0NKaYf6YoqaB4PxVgSuCxOrUJ1eUj6cC5Rcni2lvFoIUQj591lKq764QXNdLbSE6pcFupS8MwJjtFo27qrzbkBehBAZKeUparNwcEV/ptQi9V7g01LKc4UQLw7TrOUBE9V6FfTVZLVetYQ0e38aoP9dtbDePUCfB1qxcJ/LsOwrbAnmyVryqUjKxorxmKIvkCZoi9+rzXLQ1h9W8jKVvvxQBnCdki2r3ukBw0Sg0d5UMU+lhznfmw3O97+UUnaG5vuxIYVIEDjw02rzlRDiJyHiPA9oE0J8JvTeaFWONarfz8UPlgk4z4eVHLQr7iKHSrA8pbn4TpX3hers3woh/hnyAzCrkJqUEoJqwhzBDx09WwjRFYrEqFWmntCuX4bKY1I77LTfRKRs4lcA3wp1SAbfl2mo4cKNahT6vzk0f5tAXftptUMbFSIT1wghXlGJF4de2L4Jrzf09mjl+FuTZA1youwO7S5lSDasiucOpNkcSNsYBX6jBqWxjSeekcJIZkjO40eSVTPDdA2VfIdk1qTct62nAQ1TLZL1Dynlfvhmk9PxzdujQ+PcBY4HfiOEOLWOudBRZamsd+DjYjcwViMVu9XwHBhE2V0ohHiziswHm9JrFcFy1MbyQCnlMmWKCLRAv1TExGToZp2e0NiJA61Syo01+p1wAsoG7t0b2lDXnXdDJqU3pJTzlbXgDPyoynBQS1FpfW5XyUh7hqHJ8vBNZd+p8VlcaduuC+aBKkdKDdTnbkg7eH7Yzykkh2GT87g682RAUsaG3suF57zAl1EIsUZKeRd+2gcJnKECFE5Vm2hXjfPrK4jZNtsgqjqPqVjXuhsYU12Um1HDbZtr8PkHD6BAiQBfVwnHjSrHTgWZATy1NgiVwicsx0ngHvXeOVLKLwIFlcT5PKUlDDbxQyZYA7HIjFKrfWUQPhHhiS+YmP8CfEUNxIEW5eD+5+CHb4ftyzKkqaCBHWBg2vieEtBD1fe/LIRYqjphpNSrBcrzCDVXI3Bqcm2tWBRhYN+E4NyljVLKzwB/VG36KvBV1S/DJRNBO7+hJkcbP2R5fyHEYzVCYAOyXW+iDFTnR+Ob78J1Dfo0p9pnsPUIsh9vAv6fEOKPNcL6twcMJRMXqV2QUaXeq0ZIzR84yV5Nf/+ZYCLuHIzGKTx/KJX5viFttEWfWc4cpPwFO8wOVeZr1eJzkFpYzgvd8xQp5WwhxJIa/h6m2nWeVINgiWAxGKTGKEhPE6QX+YIQ4skac1dw39uVhj7QSp6h5D0gaB3ALSPQ36+EZD8OHK0c3AMtW78x2gARDha+j6sFp9q8a1fTiIU0Braa5/+iTtXYFz9T+EX4JtKikp8ThBB/3kYaZg/fFeSzQ7h3uM8fBL5YeRpHqF1ewzcr2fh+hIeoYJ9ImNAHPljKD+/gkNJimRCit8bpANeqceAqjc3Jav0K5P1OIcTKEXAraGRjFRDUk0NcwguNfa+KhtBS892BVTY+4ZQxw5nvl6r5/s5afEKtTQG5DZ5fMi2r94KyXK94whH46YiOUhu+a4Er660nVgOT8zo1kQSNEeTDuUcI0YhzrKnu8WX6TIxfDe2G8opcRQc6SiKETiFE+wBHMjTk+xPYkfF9U14DHlYRNY2Wo1HzSY9a5INdytHq2cHuSahFqlVNPMFAW1kxcAcSeEuZNc/Ad7K8QAiRCwnLSGjcbgcuDL3/deCoil1gcHioK6XcX+VGa2Q3ulUI0d6AFq3WxGni2+2fVe11Ob7fR5ADLPBVMLblxDNI0uMAt6lo2kbkaDjIqjFjDHAIdcMHBwcO/0puTeB/6PNhFCGyIAcxaQeagN2UaaVLLRSb8R1K/658sH4dWvCm4jv/1tL+OnXkStSRT1NNsl9Q43gsvk9gMAELRa4i1RbtkLN7r5Tyj8DnlbyeR1/CYwO4RQixdRgLY9Cni+gzW0rgS1LKPyqnYStULkeN0X2ApZVHJNXSMg9m3g05RI8FEuoIMRPft+lh4GEVAPB4aI6bNgIbl05FBMNavVeAe4UQrzRAKE2lQfqC+j1OyXe4z5+q0ufB/W5TxDHAt6WU84OcVBV9gApKaqXPD/lvlZuTkP/QA2qt2kO11/+GSDtqQ7ItLC8iNPaDTX1RSnmC0jIH5OYZ4I0KrV41Wd1Sa94LUlQ0oGi5Aj+KNwZ8m75chjHgkVAQwXAQmJO/B3xI5bn7hJKxRcAP6m2IrAYE9gkhxNk1GsNsMFR6qxDihtD3dlcmgCJ+RMSjQoj/a9BuPJK+P1G1w/usIpEwghqOUJK3x5QavAjspXJhfTU0yJL4CU7bQgPtvsE9Sgp8Z/DFYYe8ESCKQZbgf6iJai9Fjo+UUv4B+JwQYlOoIKPxHRW/KKW8UghxZQOkN1/PfNQAAbxTCBEck7QMPzmkpyav25VjorMDnU8llAmnlulOjlCINaGJ2hvGmAkCVbzQDnx/fMfbhSG5fQxYNBhfotCEPF7122Yp5WeFEP+quDQXartwwteBNA/DIa9C1euXIW3POPzIsAIwX0r5fSHE/xtA6xK0baA9MSg3eUrgF8Mco4EZ6U3lj3mOKt+u+JF7FwghXg+1d0xtlr4P3CGlPFMtoiMy71Ys8rcAe6o59uYKmchW9GfvMOXcwD+v7+wBNgiyAa160OdeqM+/rN5fIKX8nhDii+E+D82T9+AHAO2n5vtDgduklJ8Ozu5T92zCj8T+JH3Rf+3Ar6tkX4e+lAy/Bb6rPp9OXxqMN/Gj42DkzYOFirE/Ct8v6Tv0mdotfLOcrJP2RTKAGbDKaQe15vubQ9G4GXw/8KKS+ZuFEMeq/hlOW6SVK9ErwKkqie8J+L68eWUuHJYGCyAaslmG84YMJoy8FI6uKvwpNSmPUQL6PSnlojqh/cFzfySlrDSrhDUZS4QQn2uQyQdmrP+tMiGOCMcKdhb4kVyBM/1XgJNVpucIvi/GbvQ5/G8Abq0x0GotflKpR7/TYC6SQc7hwpZSXqJU5EEm93OBY6WU/1JlnoTvazJefX6F2vFcXSMnUqB2/4MaJKJGnz4mhPhGnYHbomQsqkyX/wN8UU2Kc4CrVb6dHcHBvSR/DZpShyuD5yq/plr+PRL4mBBifY1x4+H7DT0UGoejKc/kHsM/YeECqmQar2NuCCbtf+KnHJkA3Keiqx5XGuDplEeEbqbPJFbNHOEB+0gp76xBYAPZ+pEQ4p4BcnYJYJSUskM942v4x5XMVTL+OSnl35QZqN+GM+Rb9oqU8kFlYnBC8+9iIcTTw3RuDzZZhpL5o9QYLOBHFj8rpbwPP21Cm3oviOz7d+BmteEVNUgL+EcCfYbqpwEY+BFzl4RyOAkp5fVqPvDwI7cul1I+jG/+Ho2fsyvIn2Yqcj3cOdiq6EtRsUFodPMzKuRE/TV8c9zeqqxfkFLerg5iD/e5UCToYrXRCOp2MrBQnZO7Qq17C/AdqG368jZdMkCajqDsf1DlSdGXSd0CfhfO3D6Cm0DwT00IMrlH8E9tGEufT2QQQPS3OkqXIB3C30MBBNXm+9uEEL+sk0evVc3lEWVWPl3JUwE4Rkr5SSHET4fZHkFuxN8qLea1qq1/1aicWgM0hBNSs7sq/81gfRXC93BCWp3NUspPqt1NDj9k/ZdqYqjcAUl1n8AsMK/Oc3cdaBdfOUGEw3UrFrlw+QcK4Xbo73Qf1v6YQohnpJRX45tGUYNuLuV5tuyQav+ikImk2kCrWq4K/yezShmHpKEL1eMRlUX7ejWoHDXQzqrS1lG1MD5T5agcr6JM7x3kgK9WLyc4EkLV/atqIZyjdsqfk1LepshXvbB8J6RdaHRSDpdlIHOmE3rGUOCFyuc0UB6pyPtude7bhO8nVOl4Goy9Fnw/hMq2Co7PWAKc24AvZa02t/CjqfYO1fMQ9VP5PIArVCh7EIJNlTK34vtgDYQ7qshWuG0dRYSdkEb6Qnw/0CAX0i+klHMHMLWFnd2PCs1lFn2pGeptiryKeVDWIHJvqRMl7sB3+PZU/5xccb9gvrGV6anWOAjGwIF12nFNSHaCjVN3Rd32DJHycL2i+EELLwwxirDfejWMcVWrzy9QZD/c5/uqiD2hTOZB6oVnpJQfwPeJbVLlS9PnLxUeo8Gcf6kQ4pZac1NIS7lO5Z46Q60jgWP47xtc9AezrgVz4N41rgkiS/+34giyWm0b1LfeqQAr68z3omK+N+gL9BqtLCLflFL+o4GEq16NdnABW/GDv+CbJE/Ft+i9qJ5p11OA1NIItNF3llnLEBeCltA9RlVojSwhxF+UACZUOY6UUn4r1HElDZq6R6xBjZtR471kxb3KhLfKpBguf1st7Z76PKF+RwcgJ/+Nn0dlC9XTSUTwHQRPFELcNcCOtqlWuYJBXqOMcfU7MpTODNXjRqVxe5CBz7L8G3CYEOLvVcxQiYoy1d1J1Giv8D2iYQKpwqOD3E9Jdc2dUspJ9OXpqbXpiITkLdEg8RsT6pdaocqp0P2bGXyCXkJ1iaq/jTrliTB0tIXGS62M18vw89kdrBYWczALZMgRepMQ4hjgfHwfz1r16sB3Yv1ZjTHSUqfMjcwXqVBfjgndJ5i7nsE3jcZU+84Gfq921EYtTTl+nr4gtDuuiP9fGtRUJ0L1ilcbE6FF+BllmrqphnYvGD+P4/tR/oT+JulISH4GO0alynx+iVpM/zXAxs7Dd4/4xBCCpQYzV9dDvT5/Cj/iPOjzPYAbKvs81Ad3KmXAHdQ+xNrCzzC/ULnI1HW5CTm7m0omIvj+0KsbHHuNtFUkNMfU6vscvjn0fYpcCXW6gxygbeM0Fh1dTV5jFWttJLzpUkmILw09pxnfPN5cRWlTuZ5WzhVBepeU6tOVqp9Q2qxA3lvUcxrLgxVqnMvxnfuC5IyDUdsG1/1QTSiBY3xYYxRMOJ+kz/cp2FUFtuagkV9Q13nUz6xbyilSkf9lM3AJfVl+B1JFB+9dg5/AUyrzV7h9gmteVmULQq2fq3bf0M7mB8pv6Th8/5Wx6rtr1I74XiFEsQbjDl5fq9pMKrJWyy8iXMZLQ7v/14eqhg+RrCeB90opD1O7hllKSHvwnTDvF0I8rwQ7PGkEz7xvkH26vEqZl4TqFRxGG5gClB+2eFLl4dmVvsiqVrULrGbqAHir4r4P1GqvULvnlXwlVX0q5SD4fasypQS7sY4B+q9Wf96pvhfsLjeHFjUZmvw+TuM5riShQ49D9/nvkBakUsPTqcjVS0Gun6GaucKHqwohfqdMS4H2ajdFWDvxEzveE/RfZfJi9ft/8CPWGpWt+6v07y3KjCWVyaG3ytz1dTVuI/Qdr5UIEkSG+zSUFyorpbyIvkPIXxFCdNYxEQflujc0ZlDaYWpozQ0hxGrgLCnlXvhJLPdSi0le9dtDQoiHBhijwfhqRHaE6h8ZlmdVjnuBe1U5DlfEpA0/eOB14D4hxGvD0OZWrjXtQ7zHzWqtC/o8U6XPr6Lv9IzANBevjPoLzZOB78571DwZ9EFOte8DQognqvRBzflXXfswvik4yE14SwMR0kE9v4t/4LYMr5UV17xasWaEUcQPWntVCLEq1M8DraU3qvo2OiZfqDImnwittQa+z1nlfH+ryl85mr5UJS3qRAVR5VngJzFupdz/rwffdL4h9N5nFbm6O6R9/JBa97KDmMc1thUaOZttiKfJv931MOr5uAXngW3ncgotdW+PXI9UW79Txkij8ritZDSIxmpkLG9v2WhkPtlJ+7vuHNhoP+3A9TN35PG1vSEGmMBEaEfrDmVg1btHcBRAhWrZrXNN3Uc3cA+3HtscYvkbuW+t+kj6nNXrTYhGo30zlDIOtY9p0KG0og7btE8ryli3/lXu25BzbEXCQm+AdAhhc4IzlEmtou1q1XuwOe763adK2w1JZoc4URo1nl2v/+qVud8uu7KvGumnauO4kf4c6tzaaL/Xmy8affZIzLsNjnlvuNGyI7Rebcs+H1IfDHe+GcF1rdq4l4N45mDn+2pjclvN96bqR7dK+3qhSNKgDm5IQ1v1uxoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhojg/8P9r5r4+zlpFMAAAAASUVORK5CYII=";


function LogoEledia({size=36, lang}) {
  // Real eLeDia wordmark, embedded as data URI (no external requests).
  return React.createElement("img",{
    src:ELEDIA_LOGO_DATA, alt:t(lang,"alt_eledia_logo"),
    style:{display:"block",height:size,width:"auto"}
  });
}

function IconEledia({size=36, lang}) {
  // Square eLeDia favicon (orange dot pattern + lowercase "e"), data URI.
  return React.createElement("img",{
    src:ELEDIA_FAVICON_DATA, alt:t(lang,"alt_eledia_favicon"),
    style:{display:"block",height:size,width:size}
  });
}

function LogoMoodlePartner({size=44, lang}) {
  // Real Moodle Premium Certified Services Provider Partner badge, data URI.
  return React.createElement("img",{
    src:MOODLE_PARTNER_DATA, alt:t(lang,"alt_moodle_partner"),
    style:{display:"block",height:size,width:"auto"}
  });
}

function IconGitHub({size=22, lang}) {
  // Standard GitHub octocat mark (simplified inline path).
  return React.createElement("svg",{
    xmlns:"http://www.w3.org/2000/svg", viewBox:"0 0 24 24", height:size, width:size,
    role:"img","aria-label":t(lang,"alt_github"), fill:"currentColor",
    style:{display:"block"}
  },
    React.createElement("path",{d:"M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.87-1.54-3.87-1.54-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.69 1.25 3.34.96.1-.74.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.21-1.49 3.18-1.18 3.18-1.18.62 1.58.23 2.75.11 3.04.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.41-5.25 5.69.41.36.78 1.06.78 2.13 0 1.54-.01 2.78-.01 3.16 0 .31.21.68.8.56C20.71 21.39 24 17.08 24 12 24 5.65 18.85.5 12.5.5z"})
  );
}


function IconMonitorCog({size=18, color="currentColor"}) {
  return React.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:size,height:size,viewBox:"0 0 24 24",fill:"none",stroke:color,strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true"},
    React.createElement("path",{d:"M12 17v4"}),
    React.createElement("path",{d:"m15.2 4.9-.9-.4"}),
    React.createElement("path",{d:"m15.2 7.1-.9.4"}),
    React.createElement("path",{d:"m16.9 3.2-.4-.9"}),
    React.createElement("path",{d:"m16.9 8.8-.4.9"}),
    React.createElement("path",{d:"m19.5 2.3-.4.9"}),
    React.createElement("path",{d:"m19.5 9.7-.4-.9"}),
    React.createElement("path",{d:"m21.7 4.5-.9.4"}),
    React.createElement("path",{d:"m21.7 7.5-.9-.4"}),
    React.createElement("path",{d:"M22 13v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h9"}),
    React.createElement("path",{d:"M8 21h8"}),
    React.createElement("circle",{cx:"18",cy:"6",r:"3"})
  );
}
function IconUsers({size=18, color="currentColor"}) {
  return React.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:size,height:size,viewBox:"0 0 24 24",fill:"none",stroke:color,strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true"},
    React.createElement("path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"}),
    React.createElement("circle",{cx:"9",cy:"7",r:"4"}),
    React.createElement("path",{d:"M22 21v-2a4 4 0 0 0-3-3.87"}),
    React.createElement("path",{d:"M16 3.13a4 4 0 0 1 0 7.75"})
  );
}
function IconLayoutGrid({size=18, color="currentColor"}) {
  return React.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:size,height:size,viewBox:"0 0 24 24",fill:"none",stroke:color,strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true"},
    React.createElement("rect",{width:"7",height:"7",x:"3",y:"3",rx:"1"}),
    React.createElement("rect",{width:"7",height:"7",x:"14",y:"3",rx:"1"}),
    React.createElement("rect",{width:"7",height:"7",x:"14",y:"14",rx:"1"}),
    React.createElement("rect",{width:"7",height:"7",x:"3",y:"14",rx:"1"})
  );
}
function IconStickyNote({size=18, color="currentColor"}) {
  return React.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:size,height:size,viewBox:"0 0 24 24",fill:"none",stroke:color,strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true"},
    React.createElement("path",{d:"M16 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11l5-5V5a2 2 0 0 0-2-2z"}),
    React.createElement("path",{d:"M15 3v4a2 2 0 0 0 2 2h4"})
  );
}
function IconBotMessageSquare({size=18, color="currentColor"}) {
  return React.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:size,height:size,viewBox:"0 0 24 24",fill:"none",stroke:color,strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true"},
    React.createElement("path",{d:"M12 6V2H8"}),
    React.createElement("path",{d:"m8 18-4 4V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2Z"}),
    React.createElement("path",{d:"M2 12h2"}),
    React.createElement("path",{d:"M9 11v2"}),
    React.createElement("path",{d:"M15 11v2"}),
    React.createElement("path",{d:"M20 12h2"})
  );
}

function IconCC({size=24, lang}) {
  return React.createElement("img",{
    src:CC_BYNCSA_DATA,
    alt:t(lang,"alt_cc_byncsa"),
    style:{height:size,width:"auto",display:"inline-block",verticalAlign:"middle"}
  });
}

function Footer({lang}) {
  const linkSty = {color:"#194866",textDecoration:"underline"};
  return React.createElement("footer",{
    role:"contentinfo",
    className:"tg-footer",
    style:{background:"#FFECDB",color:"#194866",padding:"14px 24px",fontSize:11,lineHeight:1.55,borderTop:"1px solid #FCBC82",marginTop:"auto",flexShrink:0}
  },
    React.createElement("div",{
      style:{maxWidth:1100,margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center",gap:20,flexWrap:"wrap"}
    },
      // LEFT: credits + license icon + github icon
      React.createElement("div",{style:{flex:"1 1 460px",minWidth:260}},
        React.createElement("p",{style:{margin:"0 0 4px"}},
          React.createElement("strong",{style:{color:"#194866"}},"Moodle Tool Guide"),
          " · ",t(lang,"credit_original")," ",
          React.createElement("a",{href:"https://www.joyceseitzinger.com/",target:"_blank",rel:"noopener",style:linkSty},"Joyce Seitzinger"),
          ", ",
          React.createElement("a",{href:"https://www.brickfield.ie/about_us/",target:"_blank",rel:"noopener",style:linkSty},"Gavin Henrick"),
          " & ",
          React.createElement("a",{href:"https://blog.martignoni.net/a-propos/",target:"_blank",rel:"noopener",style:linkSty},"Nicolas Martignoni"),
          " (",
          React.createElement("a",{href:"https://moodletoolguide.net/",target:"_blank",rel:"noopener",style:linkSty},"moodletoolguide.net"),
          ")"
        ),
        lang==="de"?React.createElement("p",{style:{margin:"0 0 4px"}},
          t(lang,"credit_translation")," ",
          React.createElement("a",{href:"https://www.linkedin.com/in/ralfhilgenstock/",target:"_blank",rel:"noopener",style:linkSty},"Ralf Hilgenstock")
        ):null,
        React.createElement("p",{style:{margin:"0 0 6px"}},
          t(lang,"credit_eledia")," ",
          React.createElement("a",{href:"https://eledia.academy/",target:"_blank",rel:"noopener",style:{...linkSty,fontWeight:600}},"eledia.academy")
        ),
        React.createElement("div",{style:{display:"flex",alignItems:"center",gap:14}},
          React.createElement("a",{
            href:"https://creativecommons.org/licenses/by-nc-sa/4.0/",target:"_blank",rel:"noopener",
            title:"CC BY-NC-SA 4.0",
            style:{display:"inline-flex",alignItems:"center",color:"#194866",textDecoration:"none"}
          }, React.createElement(IconCC,{size:24,lang:lang})),
          React.createElement("a",{
            href:REPO_URL,target:"_blank",rel:"noopener",
            title:t(lang,"alt_github"),
            style:{display:"inline-flex",alignItems:"center",color:"#194866",textDecoration:"none"}
          }, React.createElement(IconGitHub,{size:18,lang:lang}))
        )
      ),
      // RIGHT: logos
      React.createElement("div",{
        style:{display:"flex",alignItems:"center",gap:18,flexShrink:0}
      },
        React.createElement("a",{
          href:"https://eledia.de/",target:"_blank",rel:"noopener",
          style:{display:"inline-flex",alignItems:"center"},
          "aria-label":t(lang,"alt_eledia_logo")+" – eledia.de"
        }, React.createElement(LogoEledia,{size:42,lang:lang})),
        React.createElement("a",{
          href:"https://moodle.com/de/certified-service-provider/eledia-gmbh/",target:"_blank",rel:"noopener",
          style:{display:"inline-flex",alignItems:"center"},
          "aria-label":t(lang,"alt_moodle_partner")
        }, React.createElement(LogoMoodlePartner,{size:42,lang:lang}))
      )
    )
  );
}

function App() {
  const [view,setView]=React.useState(()=>(
    typeof window !== "undefined" && window.matchMedia && window.matchMedia("(max-width: 640px)").matches
      ? "cards"
      : "matrix"
  ));
  const [selectedTool,setSelectedTool]=React.useState(null);
  const [compareIds,setCompareIds]=React.useState([]);
  const [showCompare,setShowCompare]=React.useState(false);
  const [search,setSearch]=React.useState("");
  const [lang,setLang]=React.useState(__elediaToolguideInitialLang);
  const [fontScale,setFontScale]=React.useState(1);
  React.useEffect(()=>{ __elediaToolguideRoot.setAttribute("lang", lang); },[lang]);
  const [filters,setFilters]=React.useState({setup:null,support:null,bloomMin:0,goal:null,onlyGreen:false});

  const resetFilters = () => setFilters({setup:null,support:null,bloomMin:0,goal:null,onlyGreen:false});
  const toggleCompare = id => setCompareIds(p=>p.includes(id)?p.filter(x=>x!==id):p.length>=4?p:[...p,id]);
  const resetCompare = () => { setCompareIds([]); setShowCompare(false); };
  const localizedTools = useMemo(()=>TOOLS.map(t2=>localizeTool(t2,lang)),[lang]);
  const filteredTools = localizedTools.filter(t2=>!search||t2.name.toLowerCase().includes(search.toLowerCase())||t2.desc.toLowerCase().includes(search.toLowerCase()));
  const localizedSelectedTool = selectedTool ? localizedTools.find(t2=>t2.id===selectedTool.id) || selectedTool : null;

  const navBtn = (v,label,Icon) => React.createElement("button",{onClick:()=>setView(v),"aria-current":view===v?"page":undefined,style:{padding:"8px 16px",borderRadius:8,border:"none",background:view===v?"#194866":"rgba(25,72,102,0.08)",color:view===v?"white":"#707070",cursor:"pointer",fontSize:14,fontWeight:view===v?600:500,display:"inline-flex",alignItems:"center",gap:8}},Icon?React.createElement(Icon,{size:18,color:view===v?"white":"#707070"}):null,label);

  const langBtn = (code, label) => React.createElement("button",{key:code,onClick:()=>setLang(code),"aria-pressed":lang===code,style:{padding:"4px 10px",borderRadius:6,border:"none",background:lang===code?"#194866":"transparent",color:lang===code?"white":"#194866",cursor:"pointer",fontSize:12,fontWeight:lang===code?700:400}},label);

  return React.createElement("div",{className:"tg-app-shell",style:{fontFamily:"Inter, system-ui, -apple-system, sans-serif",background:"#F3F5F8",minHeight:"100vh",display:"flex",flexDirection:"column",zoom:fontScale}},
    React.createElement("a",{href:"#main",style:{position:"absolute",left:"-9999px",top:0,padding:8,background:"#194866",color:"white",zIndex:200},onFocus:e=>e.currentTarget.style.left="0",onBlur:e=>e.currentTarget.style.left="-9999px"},t(lang,"skip_to_content")),
    React.createElement("header",{className:"tg-header",style:{background:"#FFECDB",color:"#194866",padding:"20px 24px",borderBottom:"1px solid #FCBC82"}},
      React.createElement("div",{style:{maxWidth:1200,margin:"0 auto"}},
        React.createElement("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",gap:16,flexWrap:"wrap"}},
          React.createElement("div",null,
            React.createElement("div",{style:{display:"flex",alignItems:"center",gap:12,marginBottom:4,flexWrap:"wrap"}},
              React.createElement("span",{style:{fontSize:26},"aria-hidden":"true"},"\u{1F393}"),
              React.createElement("h1",{style:{margin:0,fontSize:22,fontWeight:700,color:"#194866"}},t(lang,"title")),
              React.createElement("span",{style:{background:"#f98012",color:"white",fontSize:11,padding:"2px 10px",borderRadius:10,fontWeight:600}},"Moodle 5")
            ),
            React.createElement("p",{style:{margin:0,fontSize:13,color:"#267372"}},t(lang,"subtitle"))
          ),
          React.createElement("div",{style:{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}},
            React.createElement("div",{role:"group","aria-label":t(lang,"a11y_font_group"),style:{display:"flex",gap:2,background:"rgba(25,72,102,0.08)",padding:3,borderRadius:8}},
              React.createElement("button",{onClick:()=>setFontScale(s=>Math.max(0.85,Math.round((s-0.1)*100)/100)),title:t(lang,"a11y_font_smaller"),"aria-label":t(lang,"a11y_font_smaller"),"aria-pressed":fontScale<0.999,style:{padding:"4px 10px",borderRadius:6,border:"none",background:fontScale<0.999?"#194866":"transparent",color:fontScale<0.999?"white":"#194866",cursor:"pointer",fontSize:12,fontWeight:fontScale<0.999?700:400}},"A−"),
              React.createElement("button",{onClick:()=>setFontScale(1),title:t(lang,"a11y_font_reset"),"aria-label":t(lang,"a11y_font_reset"),"aria-pressed":Math.abs(fontScale-1)<0.001,style:{padding:"4px 10px",borderRadius:6,border:"none",background:Math.abs(fontScale-1)<0.001?"#194866":"transparent",color:Math.abs(fontScale-1)<0.001?"white":"#194866",cursor:"pointer",fontSize:12,fontWeight:Math.abs(fontScale-1)<0.001?700:400}},"A"),
              React.createElement("button",{onClick:()=>setFontScale(s=>Math.min(1.4,Math.round((s+0.1)*100)/100)),title:t(lang,"a11y_font_larger"),"aria-label":t(lang,"a11y_font_larger"),"aria-pressed":fontScale>1.001,style:{padding:"4px 10px",borderRadius:6,border:"none",background:fontScale>1.001?"#194866":"transparent",color:fontScale>1.001?"white":"#194866",cursor:"pointer",fontSize:12,fontWeight:fontScale>1.001?700:400}},"A+")
            ),
            React.createElement("div",{role:"group","aria-label":t(lang,"language"),style:{display:"flex",gap:2,background:"rgba(25,72,102,0.08)",padding:3,borderRadius:8}},
              langBtn("de","DE"), langBtn("en","EN"), langBtn("fr","FR"), langBtn("es","ES")
            )
          )
        )
      )
    ),
    React.createElement("nav",{className:"tg-nav","aria-label":t(lang,"views"),style:{background:"#F3F5F8",borderBottom:"1px solid #E9E9E9",padding:"8px 24px",position:"sticky",top:0,zIndex:50}},
      React.createElement("div",{className:"tg-nav-row",style:{maxWidth:1200,margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:8}},
        React.createElement("div",{style:{display:"flex",gap:4,flexWrap:"wrap"}},
          navBtn("matrix",t(lang,"nav_matrix"),IconLayoutGrid),
          navBtn("cards",t(lang,"nav_cards"),IconStickyNote),
          navBtn("wizard",t(lang,"nav_wizard"),IconBotMessageSquare)
        ),
        React.createElement("div",{className:"tg-nav-actions",style:{display:"flex",gap:8,alignItems:"flex-start",justifyContent:"flex-end",flexWrap:"wrap"}},
          view!=="wizard"&&React.createElement(InfoDisclosure,{label:t(lang,"info_toolguide"),text:t(lang,"guide_intro"),lang:lang,maxWidth:420}),
          view!=="wizard"&&React.createElement(InfoDisclosure,{label:t(lang,"info_bloom"),text:t(lang,"bloom_intro"),lang:lang,maxWidth:420}),
          React.createElement("div",{className:"tg-nav-search-wrap",style:{display:"flex",gap:8,alignItems:"center",justifyContent:"flex-end",flexWrap:"wrap"}},
            view!=="wizard"&&React.createElement("input",{className:"tg-tool-search",value:search,onChange:e=>setSearch(e.target.value),placeholder:t(lang,"search_placeholder"),"aria-label":t(lang,"search"),style:{padding:"6px 12px",borderRadius:8,border:"1px solid #E9E9E9",fontSize:13,width:160}}),
            compareIds.length>=2&&React.createElement("button",{onClick:()=>setShowCompare(true),style:{padding:"6px 14px",borderRadius:8,background:"#b85a00",color:"white",border:"none",cursor:"pointer",fontSize:13,fontWeight:600}},t(lang,"compare_btn")+" ("+compareIds.length+")")
          )
        )
      )
    ),
    view!=="wizard"&&React.createElement("div",{className:"tg-filterbar",style:{maxWidth:1200,margin:"0 auto",padding:"12px 24px"}},
      React.createElement("div",{style:{display:"flex",gap:8,flexWrap:"wrap"}},
        React.createElement("label",{style:{display:"inline-flex",alignItems:"center",gap:6,padding:"6px 10px",borderRadius:8,border:"1px solid #E9E9E9",background:"white",fontSize:12,color:"#353535"}},
          React.createElement(IconMonitorCog,{size:14,color:"#194866"}),
          React.createElement("select",{value:filters.setup||"","aria-label":t(lang,"setup"),onChange:e=>setFilters(f=>({...f,setup:e.target.value||null})),style:{border:"none",outline:"none",background:"transparent",fontSize:12,color:"#353535",cursor:"pointer",padding:0}},
            React.createElement("option",{value:""},t(lang,"filter_setup_all")),
            React.createElement("option",{value:"einfach"},"●○○ "+t(lang,"setup_einfach")),
            React.createElement("option",{value:"mittel"},"●●○ "+t(lang,"setup_mittel")),
            React.createElement("option",{value:"komplex"},"●●● "+t(lang,"setup_komplex"))
          )
        ),
        React.createElement("label",{style:{display:"inline-flex",alignItems:"center",gap:6,padding:"6px 10px",borderRadius:8,border:"1px solid #E9E9E9",background:"white",fontSize:12,color:"#353535"}},
          React.createElement(IconUsers,{size:14,color:"#194866"}),
          React.createElement("select",{value:filters.support||"","aria-label":t(lang,"support"),onChange:e=>setFilters(f=>({...f,support:e.target.value||null})),style:{border:"none",outline:"none",background:"transparent",fontSize:12,color:"#353535",cursor:"pointer",padding:0}},
            React.createElement("option",{value:""},t(lang,"filter_support_all")),
            React.createElement("option",{value:"gering"},"●○○ "+t(lang,"support_gering")),
            React.createElement("option",{value:"mittel"},"●●○ "+t(lang,"support_mittel")),
            React.createElement("option",{value:"hoch"},"●●● "+t(lang,"support_hoch"))
          )
        ),
        React.createElement("select",{value:filters.goal||"","aria-label":t(lang,"filter_goal_default"),onChange:e=>setFilters(f=>({...f,goal:e.target.value||null,onlyGreen:!!e.target.value})),style:{padding:"6px 12px",borderRadius:8,border:"1px solid #E9E9E9",fontSize:12}},
          React.createElement("option",{value:""},t(lang,"filter_goal_default")),
          ["info","bewerten","komm","collab"].map(gk=>React.createElement("option",{key:gk,value:gk},"\u2714 "+tg(lang,gk).label))
        ),
        React.createElement("select",{value:filters.bloomMin||"","aria-label":t(lang,"bloom_short"),onChange:e=>setFilters(f=>({...f,bloomMin:parseInt(e.target.value)||0})),style:{padding:"6px 12px",borderRadius:8,border:"1px solid #E9E9E9",fontSize:12}},
          React.createElement("option",{value:""},t(lang,"filter_bloom_all")),
          ta(lang,"bloom_levels").map((name,i)=>React.createElement("option",{key:i,value:i+1},t(lang,"filter_bloom_from")+" "+(i+1)+": "+name))
        )
      )
    ),
    React.createElement("main",{id:"main",className:"tg-main-pad",style:{maxWidth:1200,width:"100%",margin:"0 auto",padding:"16px 24px 40px",flex:"1 0 auto"}},
      view==="matrix"&&React.createElement("section",{"aria-labelledby":"view-matrix-title"},React.createElement("h2",{id:"view-matrix-title",className:"sr-only"},t(lang,"nav_matrix")),React.createElement(MatrixView,{tools:filteredTools,onSelect:setSelectedTool,filters:filters,onResetFilters:resetFilters,lang:lang})),
      view==="cards"&&React.createElement("section",{"aria-labelledby":"view-cards-title"},React.createElement("h2",{id:"view-cards-title",className:"sr-only"},t(lang,"nav_cards")),(filteredTools.filter(t2=>{
        if(filters.setup&&t2.setup!==filters.setup) return false;
        if(filters.support&&t2.support!==filters.support) return false;
        if(filters.goal&&filters.onlyGreen&&t2.goals[filters.goal]?.r!=="grün") return false;
        if(filters.bloomMin&&parseInt(t2.bloom)<filters.bloomMin) return false;
        return true;
      }).length===0 ?
        React.createElement("div",{role:"status","aria-live":"polite",style:{maxWidth:600,margin:"40px auto",padding:32,background:"#FFECDB",border:"2px dashed #f98012",borderRadius:12,textAlign:"center"}},
          React.createElement("div",{style:{fontSize:48,marginBottom:8},"aria-hidden":"true"},"🔍"),
          React.createElement("h3",{style:{margin:"0 0 8px",color:"#194866",fontSize:18}},t(lang,"empty_title")),
          React.createElement("p",{style:{margin:"0 0 16px",color:"#353535",fontSize:14,lineHeight:1.5}},t(lang,"empty_text")),
          React.createElement("button",{onClick:resetFilters,style:{padding:"8px 16px",borderRadius:8,border:"none",background:"#b85a00",color:"white",cursor:"pointer",fontSize:13,fontWeight:600}},t(lang,"empty_reset"))
        ) :
        React.createElement("div",{className:"tg-grid-cards",style:{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(280px, 1fr))",gap:14}},
          filteredTools.filter(t2=>{
            if(filters.setup&&t2.setup!==filters.setup) return false;
            if(filters.support&&t2.support!==filters.support) return false;
            if(filters.goal&&filters.onlyGreen&&t2.goals[filters.goal]?.r!=="grün") return false;
            if(filters.bloomMin&&parseInt(t2.bloom)<filters.bloomMin) return false;
            return true;
          }).map(t2=>React.createElement(ToolCard,{key:t2.id,tool:t2,onSelect:setSelectedTool,onCompare:toggleCompare,isC:compareIds.includes(t2.id),lang:lang}))
        )
      )),
      view==="wizard"&&React.createElement("section",{"aria-labelledby":"view-wizard-title"},React.createElement("h2",{id:"view-wizard-title",className:"sr-only"},t(lang,"nav_wizard")),React.createElement(WizardView,{tools:localizedTools,onSelect:setSelectedTool,lang:lang}))
    ),
    localizedSelectedTool&&React.createElement(DetailModal,{tool:localizedSelectedTool,onClose:()=>setSelectedTool(null),lang:lang}),
    showCompare&&React.createElement(CompareView,{toolIds:compareIds,tools:localizedTools,onClose:()=>setShowCompare(false),onReset:resetCompare,lang:lang}),
    React.createElement(Footer,{lang:lang})
  );
}

const __elediaToolguideLoading = __elediaToolguideRoot.querySelector(".tg-loading");
if (__elediaToolguideLoading) {
  __elediaToolguideLoading.remove();
}
ReactDOM.render(React.createElement(App), __elediaToolguideRoot);

})();
