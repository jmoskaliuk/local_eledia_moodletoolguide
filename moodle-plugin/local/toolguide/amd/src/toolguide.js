(function() {
'use strict';

// Inject styles
var style = document.createElement('style');
style.textContent = '*, *::before, *::after { box-sizing: border-box; }\n#toolguide-root { font-family: Inter, system-ui, -apple-system, sans-serif; color: #1e293b; }\n#toolguide-root ::selection { background: #f97316; color: white; }';
document.head.appendChild(style);

const { useState, useMemo } = React;

const TOOLS = [
  { id:"datei", name:"Datei", desc:"Datei hochladen (z.B. Word, PDF, PowerPoint)", complexity:"einfach", complexityText:"Einfach wie ein E-Mail Anhang. Aber machen Dateien f\u00fcr sich alleine Sinn?", bloom:"2/6", docsUrl:"https://docs.moodle.org/501/de/Datei", longDesc:"Mit der Aktivit\u00e4t \u00abDatei\u00bb stellen Sie Kursteilnehmenden einzelne Dateien zum Download bereit \u2013 PDFs, Word-Dokumente, Pr\u00e4sentationen oder Bilder. Die Datei erscheint direkt auf der Kursseite und kann per Klick ge\u00f6ffnet oder heruntergeladen werden. Dateien eignen sich besonders f\u00fcr Skripte, Arbeitsbl\u00e4tter und erg\u00e4nzende Materialien. Beachten Sie, dass Dateien allein keine Interaktion erm\u00f6glichen. Kombinieren Sie sie mit Foren oder Aufgaben, um den Lernprozess aktiv zu gestalten.", goals:{ info:{r:"gr\u00fcn",t:"Ja. Lehrende laden Dateien zur Information hoch."}, bewerten:{r:"rot",t:"Nein. Stattdessen: Kenntnisse \u00fcber Forum oder Aufgabe erfassen."}, komm:{r:"rot",t:"Nein. Keine direkte Option zur Interaktion oder Kommunikation."}, collab:{r:"rot",t:"Nein. Stattdessen: Foren, Wikis und Glossare nutzen."}, bloomG:{r:"rot",t:"Ist keine Lernaktivit\u00e4t, sondern reine Infovermittlung."}}},
  { id:"verzeichnis", name:"Verzeichnis", desc:"Eine Reihe von Dateien hochladen", complexity:"einfach", complexityText:"Einfach wie ein E-Mail Anhang. Aber machen Dateien alleine Sinn?", bloom:"2/6", docsUrl:"https://docs.moodle.org/501/de/Verzeichnis", longDesc:"Ein Verzeichnis b\u00fcndelt mehrere Dateien in einem Ordner auf der Kursseite. Teilnehmende k\u00f6nnen den gesamten Ordner oder einzelne Dateien herunterladen. Das ist praktisch, wenn Sie eine Sammlung von Dokumenten zu einem Thema bereitstellen m\u00f6chten. Verzeichnisse halten die Kursseite \u00fcbersichtlich, wenn viele Dateien ben\u00f6tigt werden. Wie bei Einzeldateien ist keine direkte Interaktion m\u00f6glich \u2013 es ist ein reines Bereitstellungs-Tool.", goals:{ info:{r:"gr\u00fcn",t:"Ja. Dateien in Ordner hochladen ist Trainer/innensache."}, bewerten:{r:"rot",t:"Nein. Stattdessen: Kenntnisse \u00fcber Forum oder Aufgabe erfassen."}, komm:{r:"rot",t:"Nein. Keine direkte Option zur Interaktion."}, collab:{r:"orange",t:"Sammeln und Teilen von Dateien m\u00f6glich. Erfordert Rollenanpassung."}, bloomG:{r:"rot",t:"Ist keine Lernaktivit\u00e4t, sondern reine Infovermittlung."}}},
  { id:"textseite", name:"Textseite", desc:"Eine Seite mit Texten in Moodle erstellen", complexity:"einfach", complexityText:"Einfach. Text formatieren, Bilder und Videos erg\u00e4nzen.", bloom:"2/6", docsUrl:"https://docs.moodle.org/501/de/Textseite", longDesc:"Eine Textseite erm\u00f6glicht es, Inhalte direkt in Moodle zu erstellen \u2013 mit formatiertem Text, Bildern, Videos und Links. Im Gegensatz zur Datei m\u00fcssen Teilnehmende nichts herunterladen, sondern lesen alles direkt im Browser. Textseiten eignen sich f\u00fcr Einleitungen, Anleitungen oder kurze Informationseinheiten. Sie k\u00f6nnen multimedial angereichert werden und sind sofort sichtbar. F\u00fcr umfangreichere Inhalte empfiehlt sich die Aktivit\u00e4t \u00abBuch\u00bb.", goals:{ info:{r:"gr\u00fcn",t:"Ja. Nur Lehrende erstellen diese Seiten."}, bewerten:{r:"rot",t:"Nein. Stattdessen: Kenntnisse \u00fcber Forum oder Aufgabe erfassen."}, komm:{r:"rot",t:"Nein. Keine direkte Option zur Interaktion."}, collab:{r:"orange",t:"Gemeinsames Erstellen m\u00f6glich. Erfordert Rollenanpassung."}, bloomG:{r:"rot",t:"Ist keine Lernaktivit\u00e4t, sondern reine Infovermittlung."}}},
  { id:"buch", name:"Buch", desc:"Eine Reihe von Textseiten in Moodle erstellen", complexity:"einfach", complexityText:"Einfach. Text formatieren, Bilder und Videos erg\u00e4nzen.", bloom:"2/6", docsUrl:"https://docs.moodle.org/501/de/Buch", longDesc:"Ein Buch besteht aus mehreren Textseiten mit Kapiteln und Unterkapiteln. Es eignet sich hervorragend f\u00fcr l\u00e4ngere, strukturierte Inhalte wie Skripte oder Leitf\u00e4den. Teilnehmende k\u00f6nnen zwischen den Seiten bl\u00e4ttern und das gesamte Buch ausdrucken. Das Buch bietet eine \u00fcbersichtliche Navigation \u00fcber ein Inhaltsverzeichnis. Es ist ein reines Lese-Material und enth\u00e4lt keine interaktiven Elemente.", goals:{ info:{r:"gr\u00fcn",t:"Gutes Tool zur Vermittlung von Informationen. Drucken m\u00f6glich."}, bewerten:{r:"rot",t:"Nein. Stattdessen: Lektion, Forum oder Aufgabe nutzen."}, komm:{r:"rot",t:"Nein. Keine direkte Option zur Interaktion."}, collab:{r:"orange",t:"Gemeinsames Erstellen m\u00f6glich. Erfordert Rollenanpassung."}, bloomG:{r:"rot",t:"Ist keine Lernaktivit\u00e4t, sondern reine Infovermittlung."}}},
  { id:"url", name:"URL", desc:"Link zu einer Webseite", complexity:"einfach", complexityText:"Einfach. Web-Adresse finden und einf\u00fcgen.", bloom:"6/6", docsUrl:"https://docs.moodle.org/501/de/URL/Link", longDesc:"Mit der Ressource URL verlinken Sie externe Webseiten direkt von der Kursseite. Das k\u00f6nnen Artikel, Videos, Online-Tools oder andere Lernressourcen sein. Teilnehmende gelangen per Klick zur verlinkten Seite. URLs eignen sich ideal, um externe Inhalte nahtlos in Ihren Kurs einzubinden. Die didaktischen M\u00f6glichkeiten h\u00e4ngen vom verlinkten Inhalt ab \u2013 von einfacher Information bis hin zu komplexen Lernszenarien.", goals:{ info:{r:"gr\u00fcn",t:"Komfortable M\u00f6glichkeit, externe Infos bereitzustellen."}, bewerten:{r:"orange",t:"Nicht direkt. Verlinkung auf externe Pr\u00fcfungstools."}, komm:{r:"orange",t:"Nicht direkt. Verlinkung auf externe Kommunikationstools."}, collab:{r:"orange",t:"Nicht direkt. Verlinkung auf externe Kooperationswerkzeuge."}, bloomG:{r:"gr\u00fcn",t:"6/6 m\u00f6glich. Abh\u00e4ngig vom Inhalt der verlinkten Seite."}}},
  { id:"wiki", name:"Wiki", desc:"Gemeinsam in der Gruppe Texte erstellen", complexity:"mittel", complexityText:"Erfordert Auseinandersetzung mit Wikiprinzip.", bloom:"6/6", docsUrl:"https://docs.moodle.org/501/de/Wiki", longDesc:"Das Wiki erm\u00f6glicht kooperatives Schreiben: Teilnehmende erstellen und bearbeiten gemeinsam Textseiten mit Verlinkungen. Es funktioniert nach dem Wikipedia-Prinzip \u2013 jeder kann Inhalte beitragen und \u00e4ndern. Die Versionshistorie dokumentiert alle \u00c4nderungen transparent. Wikis eignen sich f\u00fcr Gruppenreferate, Wissenssammlungen oder Projektdokumentationen. Der Einstieg erfordert etwas Einarbeitung, bietet dann aber gro\u00dfe Flexibilit\u00e4t.", goals:{ info:{r:"gr\u00fcn",t:"Ja. Als Info-Seite nutzen. Bearbeiten durch alle im Kurs."}, bewerten:{r:"gr\u00fcn",t:"Flexibel einsetzbar, z.B. Bewertung der erstellten Wiki-Inhalte."}, komm:{r:"orange",t:"Teilweise f\u00fcr Diskussionen geeignet. Kommentare zu Wiki-Inhalten."}, collab:{r:"gr\u00fcn",t:"Ja. Teilnehmende k\u00f6nnen kooperativ arbeiten und diskutieren."}, bloomG:{r:"gr\u00fcn",t:"6/6 m\u00f6glich. Abh\u00e4ngig vom Einsatzszenario."}}},
  { id:"glossar", name:"Glossar", desc:"Informationen pr\u00e4sentieren und gemeinsam erstellen", complexity:"einfach", complexityText:"Einfach. Kann flexibel eingestellt werden.", bloom:"6/6", docsUrl:"https://docs.moodle.org/501/de/Glossar", longDesc:"Im Glossar k\u00f6nnen Lehrende und Teilnehmende Fachbegriffe mit Definitionen sammeln. Eintr\u00e4ge werden automatisch im gesamten Kurs verlinkt, wenn der Begriff auftaucht. Teilnehmende k\u00f6nnen eigene Eintr\u00e4ge verfassen und die anderer kommentieren. Das Glossar eignet sich f\u00fcr Begriffssammlungen, FAQ-Listen oder als gemeinsam erstelltes Nachschlagewerk. Eintr\u00e4ge k\u00f6nnen bewertet werden, was es auch als Lernaktivit\u00e4t nutzbar macht.", goals:{ info:{r:"gr\u00fcn",t:"Glossar f\u00fcr Begriffsdefinitionen."}, bewerten:{r:"gr\u00fcn",t:"Glossareintr\u00e4ge erstellen lassen und dann bewerten."}, komm:{r:"orange",t:"Teilweise. Eintr\u00e4ge k\u00f6nnen kommentiert werden."}, collab:{r:"orange",t:"Autor/in kann bearbeiten. Teilnehmende kommentieren."}, bloomG:{r:"gr\u00fcn",t:"6/6 m\u00f6glich. Abh\u00e4ngig vom Einsatzszenario."}}},
  { id:"datenbank", name:"Datenbank", desc:"Materialien sammeln, teilen & suchen", complexity:"komplex", complexityText:"Schwierig anzulegen. Vorher Aufbau planen!", bloom:"6/6", docsUrl:"https://docs.moodle.org/501/de/Datenbank", longDesc:"Die Datenbank-Aktivit\u00e4t erm\u00f6glicht es, strukturierte Eintr\u00e4ge mit frei definierbaren Feldern zu sammeln. Teilnehmende k\u00f6nnen Texte, Bilder, Dateien und Links in einem einheitlichen Format eintragen. Alle Eintr\u00e4ge sind durchsuchbar und k\u00f6nnen kommentiert und bewertet werden. Die Datenbank eignet sich f\u00fcr Materialsammlungen, Steckbriefe oder Projektportfolios. Die Einrichtung erfordert Planung, bietet daf\u00fcr aber sehr flexible Einsatzm\u00f6glichkeiten.", goals:{ info:{r:"orange",t:"Lehrende k\u00f6nnen Material pr\u00e4sentieren. Besser: TN tragen Daten ein."}, bewerten:{r:"gr\u00fcn",t:"Ja. Inhalte k\u00f6nnen bewertet werden. Flexibel einsetzbar."}, komm:{r:"orange",t:"Teilweise. Eintr\u00e4ge k\u00f6nnen kommentiert werden."}, collab:{r:"orange",t:"Autor/in kann bearbeiten. Teilnehmende kommentieren."}, bloomG:{r:"gr\u00fcn",t:"6/6 m\u00f6glich. Abh\u00e4ngig vom Einsatzszenario."}}},
  { id:"umfrage", name:"Umfrage", desc:"Befragung mit vordefinierten Fragen", complexity:"einfach", complexityText:"Einfach. Aus 3 Typen w\u00e4hlen.", bloom:"2/6", docsUrl:"https://docs.moodle.org/501/de/Umfrage", longDesc:"Die Umfrage bietet drei vordefinierte, wissenschaftlich validierte Frageb\u00f6gen zur Evaluation von Lernumgebungen. Sie erfasst, wie Teilnehmende das Lernklima und den Unterricht wahrnehmen. Die Ergebnisse helfen Lehrenden, ihren Kurs zu verbessern. Im Gegensatz zum Feedback k\u00f6nnen die Fragen nicht ver\u00e4ndert werden. Die Umfrage eignet sich besonders zur Reflexion des Lernprozesses und zur Kursoptimierung.", goals:{ info:{r:"rot",t:"Nein. Die Umfrage ist ungeeignet zur Informationsverteilung."}, bewerten:{r:"rot",t:"Eher nicht. Besser zur Evaluation des Kurses."}, komm:{r:"rot",t:"Nein. Nur Einweg-Kommunikation: TN an Lehrende."}, collab:{r:"rot",t:"Nein. Rein individuelle Aktivit\u00e4t."}, bloomG:{r:"orange",t:"Hilft Teilnehmenden Lernprozess zu reflektieren."}}},
  { id:"feedback", name:"Feedback", desc:"Erstelle selbst Evaluationsfrageb\u00f6gen", complexity:"einfach", complexityText:"Einfach in Bedienung. Zeitaufwand f\u00fcr Fragen.", bloom:"6/6", docsUrl:"https://docs.moodle.org/501/de/Feedback", longDesc:"Mit der Feedback-Aktivit\u00e4t erstellen Sie eigene Frageb\u00f6gen mit frei definierbaren Fragen. Sie k\u00f6nnen Multiple-Choice, Textfelder, Bewertungsskalen und mehr einsetzen. Die Antworten k\u00f6nnen anonym oder namentlich erfasst werden. Feedback eignet sich hervorragend f\u00fcr Kursevaluationen, Erwartungsabfragen oder Stimmungsbilder. Im Gegensatz zur Umfrage haben Sie volle Kontrolle \u00fcber die Fragestellungen.", goals:{ info:{r:"rot",t:"Nein. Nicht zur Informationsverteilung vorgesehen."}, bewerten:{r:"rot",t:"Nein. Evaluationen generieren Feedback f\u00fcr Lehrende."}, komm:{r:"rot",t:"Nein. Nur Einweg-Kommunikation."}, collab:{r:"rot",t:"Nein. Rein individuelle Aktivit\u00e4t."}, bloomG:{r:"orange",t:"Kann kreativ gestaltet werden."}}},
  { id:"abstimmung", name:"Abstimmung", desc:"Teilnehmende stimmen \u00fcber eine Frage ab", complexity:"einfach", complexityText:"Einfach. Frage(n) und Antworten anlegen.", bloom:"2/6", docsUrl:"https://docs.moodle.org/501/de/Abstimmung", longDesc:"Die Abstimmung stellt eine einzelne Frage mit vorgegebenen Antwortm\u00f6glichkeiten. Teilnehmende w\u00e4hlen eine Option, die Ergebnisse werden als Balkendiagramm angezeigt. Sie eignet sich f\u00fcr schnelle Meinungsbilder, Terminabsprachen oder Gruppeneinteilungen. Die Einrichtung dauert nur wenige Minuten. F\u00fcr komplexere Befragungen mit mehreren Fragen nutzen Sie besser die Feedback-Aktivit\u00e4t.", goals:{ info:{r:"rot",t:"Nein. Haupts\u00e4chlich zur schnellen Abfrage zu einem Thema."}, bewerten:{r:"gr\u00fcn",t:"Als Schnellabfrage einer Fragestellung verwenden."}, komm:{r:"rot",t:"Nein. Besser Forum oder Chat nutzen."}, collab:{r:"rot",t:"Nein. Besser Forum, Glossar oder Wiki nutzen."}, bloomG:{r:"orange",t:"Erlaubt einfache Abfrage von Wissen und Verst\u00e4ndnis."}}},
  { id:"test", name:"Test", desc:"Testfragen mit automatischer Bewertung", complexity:"mittel", complexityText:"Zeitaufwand beim Erstellen. Auswertung automatisch.", bloom:"6/6", docsUrl:"https://docs.moodle.org/501/de/Test", longDesc:"Der Test ist das zentrale Pr\u00fcfungswerkzeug in Moodle mit \u00fcber 15 Fragetypen \u2013 von Multiple-Choice \u00fcber L\u00fcckentext bis Zuordnung. Die Auswertung erfolgt automatisch mit sofortigem Feedback an die Teilnehmenden. Tests k\u00f6nnen zeitgesteuert, mit Zufallsfragen und mehreren Versuchen konfiguriert werden. Sie eignen sich f\u00fcr Selbsttests, \u00dcbungen und formale Pr\u00fcfungen gleicherma\u00dfen. Der Fragenpool erm\u00f6glicht die Wiederverwendung von Fragen \u00fcber Kurse hinweg.", goals:{ info:{r:"rot",t:"Zielt auf Bewertung, nicht Verteilung von Informationen."}, bewerten:{r:"gr\u00fcn",t:"Ja. F\u00fcr Fragen mit eindeutiger Antwort. Automatisch."}, komm:{r:"rot",t:"Nein. Besser Forum oder Chat nutzen."}, collab:{r:"rot",t:"Nein. Besser Forum oder Wiki nutzen."}, bloomG:{r:"gr\u00fcn",t:"Durch kreativen Umgang vielf\u00e4ltig einsetzbar."}}},
  { id:"lektion", name:"Lektion", desc:"Informationen und Testfragen seitenweise aufbauen", complexity:"mittel", complexityText:"Erfordert Planung, dann effektive Lernaktivit\u00e4t.", bloom:"6/6", docsUrl:"https://docs.moodle.org/501/de/Lektion", longDesc:"Die Lektion pr\u00e4sentiert Inhalte auf einzelnen Seiten und verkn\u00fcpft sie mit Testfragen. Je nach Antwort werden Teilnehmende zu verschiedenen Seiten weitergeleitet \u2013 ein verzweigter Lernpfad entsteht. So k\u00f6nnen Sie adaptives Lernen umsetzen, bei dem der Weg vom Wissensstand abh\u00e4ngt. Lektionen eignen sich f\u00fcr gef\u00fchrte Lerneinheiten mit integrierten Verst\u00e4ndnispr\u00fcfungen. Die Erstellung erfordert Planung, ergibt aber eine sehr effektive Lernaktivit\u00e4t.", goals:{ info:{r:"gr\u00fcn",t:"Gut geeignet f\u00fcr gef\u00fchrte Informationspr\u00e4sentation."}, bewerten:{r:"gr\u00fcn",t:"Ja, erlaubt Bewertung durch integrierte Testfragen."}, komm:{r:"rot",t:"Nein. Teilnehmende arbeiten einzeln."}, collab:{r:"rot",t:"Nein. Teilnehmende arbeiten einzeln."}, bloomG:{r:"gr\u00fcn",t:"Durch kreativen Umgang vielf\u00e4ltig einsetzbar."}}},
  { id:"aufgabe", name:"Aufgabe", desc:"Aufgabenstellung mit individueller Bewertung", complexity:"einfach", complexityText:"Einfach. Auswahl aus vier Aufgabentypen.", bloom:"6/6", docsUrl:"https://docs.moodle.org/501/de/Aufgabe", longDesc:"Die Aufgabe ist das vielseitigste Bewertungswerkzeug in Moodle. Teilnehmende reichen Texte, Dateien oder Medien ein, die Sie individuell mit Note und Kommentar bewerten. Vier Abgabetypen stehen zur Verf\u00fcgung: Dateiabgabe, Onlinetext, Audio-/Videoaufnahme. Abgabefristen, Verl\u00e4ngerungen und Gruppenabgaben sind konfigurierbar. Die Aufgabe eignet sich f\u00fcr Essays, Projektarbeiten, Pr\u00e4sentationen und jede Form individueller Leistungsnachweise.", goals:{ info:{r:"rot",t:"Nein. Kann aber Inhalte f\u00fcr Aufgabenstellung enthalten."}, bewerten:{r:"gr\u00fcn",t:"Ja. Individuelle Bewertung mit Note und Kommentar."}, komm:{r:"rot",t:"Wenig Interaktion. Au\u00dfer: wiederholte Abgabe mit Feedback."}, collab:{r:"orange",t:"Gruppenmitglied gibt stellvertretend L\u00f6sung ab."}, bloomG:{r:"gr\u00fcn",t:"Abh\u00e4ngig von Aufgabenformulierung und Beurteilungsform."}}},
  { id:"beurteilung", name:"Gegenseitige Beurteilung", desc:"Aufgabe mit Peer-Feedback", complexity:"komplex", complexityText:"Erfordert sorgf\u00e4ltige Planung.", bloom:"6/6", docsUrl:"https://docs.moodle.org/501/de/Gegenseitige_Beurteilung", longDesc:"Die Gegenseitige Beurteilung (Workshop) kombiniert Aufgabenabgabe mit Peer-Review. Teilnehmende reichen zun\u00e4chst eigene Arbeiten ein und bewerten anschlie\u00dfend die Einreichungen anderer nach vorgegebenen Kriterien. Dieser Prozess f\u00f6rdert kritisches Denken und Reflexion. Die Endbewertung setzt sich aus Peer- und Trainer-Bewertung zusammen. Die Einrichtung ist anspruchsvoll, bietet aber ein p\u00e4dagogisch sehr wertvolles Lernszenario.", goals:{ info:{r:"rot",t:"Nein. Ein anderes Tool verwenden."}, bewerten:{r:"gr\u00fcn",t:"Ja. Peer-Bewertung. TN beurteilen L\u00f6sungen anderer."}, komm:{r:"rot",t:"Nein. Erlaubt nur Feedback, keine Kommunikation."}, collab:{r:"rot",t:"Nein. F\u00fcr Gruppenaufgaben Forum oder Wiki nutzen."}, bloomG:{r:"gr\u00fcn",t:"Abh\u00e4ngig von Aufgabenformulierung und Beurteilungsform."}}},
  { id:"lernpaket", name:"Lernpaket", desc:"Lerninhalte im Format SCORM einbinden", complexity:"komplex", complexityText:"Erfordert Software oder Kauf von Inhalten.", bloom:"6/6", docsUrl:"https://docs.moodle.org/501/de/Lernpaket", longDesc:"Lernpakete binden extern erstellte SCORM- oder AICC-Inhalte in Moodle ein. Diese interaktiven Lernmodule werden mit Autorentools wie Articulate, Captivate oder iSpring erstellt. Der Lernfortschritt und Ergebnisse werden automatisch an Moodle zur\u00fcckgemeldet. Lernpakete eignen sich f\u00fcr multimediale, interaktive Selbstlerneinheiten. Die Einbindung ist einfach, die Erstellung der Inhalte erfordert jedoch spezielle Software.", goals:{ info:{r:"gr\u00fcn",t:"Ja. Gut geeignet f\u00fcr Informationsvermittlung."}, bewerten:{r:"gr\u00fcn",t:"Ja, Bewertungen k\u00f6nnen integriert sein."}, komm:{r:"rot",t:"Nein. Teilnehmende arbeiten einzeln."}, collab:{r:"rot",t:"Nein. Teilnehmende arbeiten einzeln."}, bloomG:{r:"gr\u00fcn",t:"Durch kreativen Umgang vielf\u00e4ltig einsetzbar."}}},
  { id:"chat", name:"Chat", desc:"Echtzeit Text-Chat mit Teilnehmenden", complexity:"einfach", complexityText:"Einfach. Erfordert Moderation, kleine Gruppen.", bloom:"6/6", docsUrl:"https://docs.moodle.org/501/de/Chat", longDesc:"Der Chat erm\u00f6glicht synchrone Textgespr\u00e4che in Echtzeit zwischen Kursteilnehmenden. Er eignet sich f\u00fcr Sprechstunden, Gruppendiskussionen oder spontanen Austausch in kleinen Gruppen. Chatverl\u00e4ufe werden protokolliert und k\u00f6nnen sp\u00e4ter eingesehen werden. Eine Moderation ist empfehlenswert, um den Gespr\u00e4chsverlauf zu steuern. F\u00fcr gr\u00f6\u00dfere Gruppen oder asynchrone Kommunikation ist das Forum besser geeignet.", goals:{ info:{r:"orange",t:"Erfordert Anwesenheit zum Zeitpunkt des Chats."}, bewerten:{r:"orange",t:"Chatbeitr\u00e4ge k\u00f6nnen wie m\u00fcndliche Mitarbeit bewertet werden."}, komm:{r:"gr\u00fcn",t:"Ja. Diskussionen in kleinen Gruppen oder Fragestunden."}, collab:{r:"gr\u00fcn",t:"Ja. Teilnehmende k\u00f6nnen zusammen arbeiten und diskutieren."}, bloomG:{r:"gr\u00fcn",t:"Kann mit kleinen Gruppen kreativ genutzt werden."}}},
  { id:"forum", name:"Forum", desc:"F\u00fcr vielf\u00e4ltige Lernstrategien verwendbar", complexity:"einfach", complexityText:"Einfach. Titel und Beschreibung gen\u00fcgen.", bloom:"6/6", docsUrl:"https://docs.moodle.org/501/de/Forum", longDesc:"Das Forum ist das vielseitigste Kommunikationswerkzeug in Moodle. Es erm\u00f6glicht zeitversetzte Diskussionen, in denen Teilnehmende Beitr\u00e4ge verfassen, aufeinander antworten und Dateien anh\u00e4ngen. Verschiedene Forentypen stehen zur Verf\u00fcgung \u2013 vom Nachrichtenforum bis zur offenen Diskussion. Beitr\u00e4ge k\u00f6nnen per E-Mail-Benachrichtigung verfolgt und sogar bewertet werden. Foren eignen sich f\u00fcr Ank\u00fcndigungen, Peer-Learning, Reflexion und kooperatives Arbeiten.", goals:{ info:{r:"gr\u00fcn",t:"Ja. Nachrichtenforum und Mail-Benachrichtigung."}, bewerten:{r:"orange",t:"Jein. Beitr\u00e4ge k\u00f6nnen f\u00fcr einen Zeitraum bewertet werden."}, komm:{r:"gr\u00fcn",t:"Ja. Zeitversetzte Kommunikation. Kursgruppen nutzbar."}, collab:{r:"gr\u00fcn",t:"Ja. TN tauschen sich beim Erstellen von Inhalten aus."}, bloomG:{r:"gr\u00fcn",t:"Kann auch mit gro\u00dfen Gruppen kreativ genutzt werden."}}},
  { id:"extern", name:"Externes Tool", desc:"Externe Lernaktivit\u00e4t verbinden (LTI)", complexity:"komplex", complexityText:"Erfordert Zugangsdaten zu externen Anbietern.", bloom:"6/6", docsUrl:"https://docs.moodle.org/501/de/Externes_Tool", longDesc:"Das Externe Tool verbindet Moodle \u00fcber den LTI-Standard mit externen Lernplattformen und Diensten. So k\u00f6nnen Teilnehmende direkt aus Moodle heraus auf externe Tools zugreifen \u2013 ohne separaten Login. Bewertungen k\u00f6nnen automatisch nach Moodle zur\u00fcck\u00fcbertragen werden. Typische Einsatzgebiete sind Simulationen, Labore, Verlagsinhalte oder spezialisierte Lerntools. Die Einrichtung erfordert technische Konfiguration und Zugangsdaten vom Anbieter.", goals:{ info:{r:"orange",t:"Abh\u00e4ngig vom verbundenen Tool."}, bewerten:{r:"orange",t:"Bewertungen k\u00f6nnen nach Moodle \u00fcbertragen werden."}, komm:{r:"orange",t:"Abh\u00e4ngig vom verbundenen Tool."}, collab:{r:"orange",t:"Abh\u00e4ngig vom verbundenen Tool."}, bloomG:{r:"orange",t:"H\u00e4ngt vom verbundenen Tool ab."}}},
  { id:"h5p", name:"H5P", desc:"Werkzeuge f\u00fcr interaktive Inhalte", complexity:"einfach", complexityText:"Einfache Bedienung durch Formulare.", bloom:"6/6", docsUrl:"https://docs.moodle.org/501/de/H5P-Aktivit%C3%A4t", longDesc:"H5P bietet \u00fcber 40 interaktive Inhaltstypen direkt in Moodle \u2013 von interaktiven Videos \u00fcber Zeitstrahlen bis zu Drag-and-Drop-Aufgaben. Die Erstellung erfolgt \u00fcber intuitive Formulare ohne Programmierkenntnisse. Bewertungen werden automatisch erfasst und an das Moodle-Bewertungssystem \u00fcbergeben. H5P-Inhalte sind responsiv und funktionieren auf allen Ger\u00e4ten. Es ist eines der vielseitigsten Werkzeuge f\u00fcr interaktive und ansprechende Lernerfahrungen.", goals:{ info:{r:"gr\u00fcn",t:"Ja. Gute Visualisierung von Informationen."}, bewerten:{r:"gr\u00fcn",t:"Ja. Automatische Bewertung."}, komm:{r:"rot",t:"Nein. Keine Kommunikation m\u00f6glich."}, collab:{r:"rot",t:"Nein. Teilnehmende arbeiten einzeln."}, bloomG:{r:"gr\u00fcn",t:"Vielf\u00e4ltige Unterst\u00fctzung von Lernszenarien."}}},
  { id:"bbb", name:"BigBlueButton", desc:"Videokonferenz, Whiteboard, Chat", complexity:"einfach", complexityText:"Einfache Bedienung.", bloom:"6/6", docsUrl:"https://docs.moodle.org/501/de/BigBlueButton", longDesc:"BigBlueButton ist ein vollwertiges Videokonferenzsystem, das direkt in Moodle integriert ist. Es bietet Live-Video, Bildschirmfreigabe, interaktives Whiteboard, Umfragen und Breakout-R\u00e4ume. Sitzungen k\u00f6nnen aufgezeichnet und sp\u00e4ter im Kurs bereitgestellt werden. BigBlueButton eignet sich f\u00fcr Vorlesungen, Seminare, Sprechstunden und Gruppenarbeit. Die Bedienung ist einfach \u2013 ein Klick gen\u00fcgt, um einer Konferenz beizutreten.", goals:{ info:{r:"gr\u00fcn",t:"Ja. Vortr\u00e4ge und Pr\u00e4sentationen werden live gehalten."}, bewerten:{r:"orange",t:"Begrenzt: Geeignet f\u00fcr Einzel-/Kleingruppenpr\u00fcfungen."}, komm:{r:"gr\u00fcn",t:"Ja. Gespr\u00e4che, Videocalls, Chats m\u00f6glich."}, collab:{r:"gr\u00fcn",t:"Ja, mittels Whiteboard und gemeinsamen Notizen."}, bloomG:{r:"gr\u00fcn",t:"Vielf\u00e4ltige Unterst\u00fctzung von Lernszenarien."}}},
];

// Tool icon data: SVG + background color per Moodle category
const TOOL_ICONS = {
  datei:      {bg:"#eb6a8c", svg:`<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" stroke="white" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M14 2v6h6" stroke="white" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`},
  verzeichnis:{bg:"#eb6a8c", svg:`<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2v11z" stroke="white" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`},
  textseite:  {bg:"#eb6a8c", svg:`<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" stroke="white" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M14 2v6h6M8 13h8M8 17h8M8 9h2" stroke="white" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`},
  buch:       {bg:"#eb6a8c", svg:`<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke="white" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" stroke="white" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 7h8M8 11h5" stroke="white" stroke-width="1.8" fill="none" stroke-linecap="round"/>`},
  url:        {bg:"#eb6a8c", svg:`<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" stroke="white" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" stroke="white" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`},
  lernpaket:  {bg:"#eb6a8c", svg:`<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" stroke="white" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" stroke="white" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`},
  wiki:       {bg:"#5cb381", svg:`<path d="M12 20h9" stroke="white" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" stroke="white" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`},
  glossar:    {bg:"#5cb381", svg:`<rect x="3" y="2" width="18" height="20" rx="3" stroke="white" stroke-width="1.8" fill="none"/><path d="M8 6h2" stroke="white" stroke-width="1.8" fill="none" stroke-linecap="round"/><path d="M12 6.25a3.5 3.5 0 0 1 3.5 3.5v.5" stroke="white" stroke-width="1.8" fill="none" stroke-linecap="round"/><circle cx="12" cy="16" r="0.5" fill="white" stroke="white" stroke-width="1"/>`},
  datenbank:  {bg:"#5cb381", svg:`<ellipse cx="12" cy="5" rx="9" ry="3" stroke="white" stroke-width="1.8" fill="none"/><path d="M21 12c0 1.66-4.03 3-9 3s-9-1.34-9-3" stroke="white" stroke-width="1.8" fill="none"/><path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" stroke="white" stroke-width="1.8" fill="none"/>`},
  forum:      {bg:"#5b9fd6", svg:`<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z" stroke="white" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 9h8M8 13h5" stroke="white" stroke-width="1.8" fill="none" stroke-linecap="round"/>`},
  chat:       {bg:"#5b9fd6", svg:`<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" stroke="white" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`},
  bbb:        {bg:"#5b9fd6", svg:`<rect x="2" y="3" width="20" height="14" rx="2" stroke="white" stroke-width="1.8" fill="none"/><path d="M8 21h8M12 17v4" stroke="white" stroke-width="1.8" fill="none" stroke-linecap="round"/><circle cx="12" cy="10" r="2.5" stroke="white" stroke-width="1.5" fill="none"/>`},
  test:       {bg:"#9b6fc3", svg:`<path d="M9 11l3 3L22 4" stroke="white" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" stroke="white" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`},
  aufgabe:    {bg:"#9b6fc3", svg:`<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" stroke="white" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M14 2v6h6" stroke="white" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 15l2 2 4-4" stroke="white" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`},
  lektion:    {bg:"#9b6fc3", svg:`<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2V3z" stroke="white" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7V3z" stroke="white" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`},
  beurteilung:{bg:"#9b6fc3", svg:`<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="white" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="9" cy="7" r="4" stroke="white" stroke-width="1.8" fill="none"/><path d="M23 21v-2a4 4 0 0 0-3-3.87" stroke="white" stroke-width="1.8" fill="none" stroke-linecap="round"/><path d="M16 3.13a4 4 0 0 1 0 7.75" stroke="white" stroke-width="1.8" fill="none" stroke-linecap="round"/>`},
  abstimmung: {bg:"#9b6fc3", svg:`<rect x="4" y="14" width="4" height="7" rx="1" stroke="white" stroke-width="1.8" fill="none"/><rect x="10" y="8" width="4" height="13" rx="1" stroke="white" stroke-width="1.8" fill="none"/><rect x="16" y="3" width="4" height="18" rx="1" stroke="white" stroke-width="1.8" fill="none"/>`},
  h5p:        {bg:"#1ba5d4", svg:`<circle cx="12" cy="12" r="9" stroke="white" stroke-width="1.8" fill="none"/><polygon points="10,8 16,12 10,16" fill="white"/>`},
  extern:     {bg:"#1ba5d4", svg:`<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" stroke="white" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M15 3h6v6" stroke="white" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M10 14L21 3" stroke="white" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`},
  umfrage:    {bg:"#8e9bab", svg:`<path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" stroke="white" stroke-width="1.8" fill="none" stroke-linecap="round"/><rect x="8" y="2" width="8" height="4" rx="1" stroke="white" stroke-width="1.8" fill="none"/><path d="M8 12h4M8 16h6" stroke="white" stroke-width="1.8" fill="none" stroke-linecap="round"/>`},
  feedback:   {bg:"#8e9bab", svg:`<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="white" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="white" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`},
};

function ToolIcon({toolId, size=32}) {
  const icon = TOOL_ICONS[toolId];
  if (!icon) return null;
  const r = Math.round(size * 0.2);
  return React.createElement("span",{
    style:{display:"inline-flex",alignItems:"center",justifyContent:"center",width:size,height:size,borderRadius:r,background:icon.bg,flexShrink:0},
    dangerouslySetInnerHTML:{__html:`<svg viewBox="0 0 24 24" width="${size*0.6}" height="${size*0.6}">${icon.svg}</svg>`}
  });
}

// SVG path data for goal icons (white stroke on colored bg, or colored stroke standalone)
const GOAL_SVG = {
  info: `<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2V3z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7V3z"/>`,
  bewerten: `<path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>`,
  komm: `<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z"/>`,
  collab: `<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>`,
  bloomG: `<polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>`,
};

function GoalIcon({goalKey, color, size=20, title=""}) {
  return React.createElement("span",{
    title:title,
    style:{display:"inline-block",width:size,height:size,pointerEvents:title?"auto":"none"},
    dangerouslySetInnerHTML:{__html:`<svg style="pointer-events:none" viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${GOAL_SVG[goalKey]||""}</svg>`}
  });
}

const GOALS = [
  { key:"info", label:"Information & Transfer", q:"Ist es geeignet zur Weitergabe von Informationen?" },
  { key:"bewerten", label:"Bewerten", q:"Ermöglicht es, den Kenntnisstand zu erfassen?" },
  { key:"komm", label:"Kommunikation & Interaktion", q:"Kann es zur Kommunikation genutzt werden?" },
  { key:"collab", label:"Gemeinsam Inhalte erstellen", q:"Können Inhalte kooperativ erstellt werden?" },
  { key:"bloomG", label:"Bloom\u2019s Lernziele", q:"Welche Lernziele werden unterstützt?" },
];

const BLOOM = [
  {name:"Wiedergeben", desc:"Fakten und grundlegende Konzepte abrufen.", keywords:"definieren, vervielf\u00e4ltigen, auflisten, auswendig lernen, wiederholen, angeben"},
  {name:"Verstehen", desc:"Ideen oder Konzepte in eigenen Worten wiedergeben.", keywords:"klassifizieren, beschreiben, diskutieren, erkl\u00e4ren, identifizieren, lokalisieren, erkennen, berichten, ausw\u00e4hlen, \u00fcbersetzen"},
  {name:"Anwenden", desc:"Informationen in neuen Situationen nutzen.", keywords:"ausf\u00fchren, umsetzen, l\u00f6sen, verwenden, demonstrieren, interpretieren, operieren, planen, skizzieren"},
  {name:"Analysieren", desc:"Verbindungen zwischen Ideen herstellen.", keywords:"differenzieren, organisieren, in Beziehung setzen, vergleichen, kontrastieren, unterscheiden, untersuchen, experimentieren, fragen, testen"},
  {name:"Bewerten", desc:"Basierend auf den Lernmaterialien einen Standpunkt rechtfertigen.", keywords:"einsch\u00e4tzen, argumentieren, verteidigen, beurteilen, ausw\u00e4hlen, unterst\u00fctzen, bewerten, kritisieren, abw\u00e4gen"},
  {name:"Erschaffen", desc:"Eine neue oder originelle Arbeit entwickeln.", keywords:"entwerfen, zusammenstellen, konstruieren, mutma\u00dfen, entwickeln, formulieren, verfassen, untersuchen"},
];
const BLOOM_NAMES = BLOOM.map(b=>b.name);

const rc = r => r==="gr\u00fcn"?"#6a9c3a":r==="orange"?"#5a96a6":r==="rot"?"#d4885a":"#999";
const rb = r => r==="gr\u00fcn"?"#d1e0c1":r==="orange"?"#a9cbd5":"#ffecdb";
const rl = r => r==="gr\u00fcn"?"Gut geeignet":r==="orange"?"Teilweise":"Ungeeignet";
const ci = c => c==="einfach"?"\u2B50":c==="mittel"?"\u2B50\u2B50":"\u2B50\u2B50\u2B50";

function BloomHats({bloom, size=14}) {
  const n = parseInt(bloom) || 0;
  return React.createElement("span", {
    style:{display:"inline-flex",gap:2,alignItems:"center"},
  },
    Array.from({length:6},(_,i) => React.createElement("span",{
      key:i,
      title: i < n ? BLOOM[i].name+": "+BLOOM[i].desc+" Schl\u00fcsselw\u00f6rter: "+BLOOM[i].keywords : BLOOM[i].name+" (nicht abgedeckt)",
      style:{fontSize:size, opacity: i < n ? 1 : 0.25, filter: i < n ? "none" : "grayscale(1)", cursor:"help"}
    },"\u{1F393}"))
  );
}

function Dot({rating, size=16}) {
  return React.createElement("span", {style:{display:"inline-block",width:size,height:size,borderRadius:"50%",backgroundColor:rc(rating),border:"2px solid white",boxShadow:"0 1px 3px rgba(0,0,0,0.2)"},title:rl(rating)});
}

function ToolCard({tool, onSelect, onCompare, isC}) {
  return React.createElement("div", {
    onClick:()=>onSelect(tool),
    style:{background:"white",borderRadius:12,padding:20,cursor:"pointer",boxShadow:"0 1px 3px rgba(0,0,0,0.1)",border:isC?"2px solid #f97316":"2px solid transparent",transition:"all 0.2s"},
    onMouseEnter:e=>{e.currentTarget.style.boxShadow="0 4px 12px rgba(0,0,0,0.15)";e.currentTarget.style.transform="translateY(-2px)"},
    onMouseLeave:e=>{e.currentTarget.style.boxShadow="0 1px 3px rgba(0,0,0,0.1)";e.currentTarget.style.transform="none"}
  },
    React.createElement("div",{style:{display:"flex",gap:12,alignItems:"flex-start",marginBottom:10}},
      React.createElement(ToolIcon,{toolId:tool.id,size:40}),
      React.createElement("div",{style:{flex:1}},
        React.createElement("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"}},
          React.createElement("h3",{style:{margin:0,fontSize:17,color:"#1e293b"}},tool.name),
          React.createElement("span",{style:{fontSize:11,color:"#64748b",background:"#f1f5f9",padding:"2px 8px",borderRadius:12}},ci(tool.complexity))
        ),
        React.createElement("p",{style:{margin:"2px 0 0",fontSize:12,color:"#94a3b8",lineHeight:1.3}},tool.desc)
      )
    ),
    React.createElement("div",{style:{display:"flex",gap:6,marginBottom:8,flexWrap:"wrap",alignItems:"center"}},
      GOALS.map(g=>React.createElement("span",{key:g.key,title:g.label+": "+rl(tool.goals[g.key].r),style:{display:"inline-flex",alignItems:"center",justifyContent:"center",width:30,height:30,borderRadius:8,background:rb(tool.goals[g.key].r),cursor:"help"}},
        React.createElement(GoalIcon,{goalKey:g.key,color:rc(tool.goals[g.key].r),size:16})
      ))
    ),
    React.createElement("div",{style:{marginBottom:10}},React.createElement(BloomHats,{bloom:tool.bloom,size:25})),
    React.createElement("p",{style:{fontSize:11,color:"#64748b",lineHeight:1.4,margin:"0 0 10px",borderTop:"1px solid #e2e8f0",paddingTop:8,fontStyle:"italic"}},tool.complexityText),
    React.createElement("div",{style:{display:"flex",justifyContent:"flex-end",alignItems:"center"}},
      React.createElement("button",{onClick:e=>{e.stopPropagation();onCompare(tool.id)},style:{fontSize:11,padding:"4px 10px",borderRadius:6,border:isC?"1px solid #f97316":"1px solid #d1d5db",background:isC?"#fff7ed":"white",color:isC?"#f97316":"#64748b",cursor:"pointer"}},isC?"\u2713 Im Vergleich":"+ Vergleichen")
    )
  );
}

function MatrixView({tools, onSelect, filters}) {
  let filtered = tools.filter(t=>{
    if(filters.complexity&&t.complexity!==filters.complexity) return false;
    if(filters.goal&&filters.onlyGreen&&t.goals[filters.goal]?.r!=="gr\u00fcn") return false;
    if(filters.bloomMin&&parseInt(t.bloom)<filters.bloomMin) return false;
    return true;
  });
  /* bloom sorting removed – only "ab Stufe" filter remains */
  return React.createElement("div",{style:{overflowX:"auto"}},
    React.createElement("table",{style:{width:"100%",borderCollapse:"separate",borderSpacing:0,fontSize:13}},
      React.createElement("thead",null,
        React.createElement("tr",null,
          React.createElement("th",{style:{position:"sticky",left:0,background:"#1e293b",color:"white",padding:"10px 14px",textAlign:"left",borderRadius:"8px 0 0 0",zIndex:2,minWidth:140}},"Aktivit\u00e4t"),
          GOALS.map((g,i)=>React.createElement("th",{key:g.key,style:{background:"#1e293b",color:"white",padding:"10px 12px",textAlign:"center",minWidth:110,borderRadius:i===GOALS.length-1?"0 8px 0 0":0}},
            React.createElement("div",{style:{display:"flex",justifyContent:"center"}},React.createElement(GoalIcon,{goalKey:g.key,color:"white",size:20})),React.createElement("div",{style:{fontSize:11,marginTop:4}},g.label)
          ))
        )
      ),
      React.createElement("tbody",null,
        filtered.map((tool,idx)=>React.createElement("tr",{key:tool.id,onClick:()=>onSelect(tool),style:{cursor:"pointer",background:idx%2===0?"white":"#f8fafc"},
          onMouseEnter:e=>e.currentTarget.style.background="#eff6ff",onMouseLeave:e=>e.currentTarget.style.background=idx%2===0?"white":"#f8fafc"},
          React.createElement("td",{style:{position:"sticky",left:0,background:"inherit",padding:"10px 14px",fontWeight:600,borderBottom:"1px solid #e2e8f0",zIndex:1}},
            React.createElement("div",{style:{display:"flex",alignItems:"center",gap:8}},React.createElement(ToolIcon,{toolId:tool.id,size:28}),React.createElement("span",null,tool.name)),
            React.createElement("div",{style:{fontSize:11,fontWeight:400,color:"#94a3b8",marginTop:2,paddingLeft:36}},ci(tool.complexity))
          ),
          GOALS.map(g=>React.createElement("td",{key:g.key,style:{padding:8,textAlign:"center",borderBottom:"1px solid #e2e8f0"}},
            React.createElement("div",{style:{background:rb(tool.goals[g.key].r),borderRadius:8,padding:"10px 6px"}},
              g.key==="bloomG"?React.createElement("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:4}},React.createElement(BloomHats,{bloom:tool.bloom,size:11}),React.createElement("div",{style:{fontSize:10,color:"#334155",lineHeight:1.3}},tool.goals[g.key].t.slice(0,60)+(tool.goals[g.key].t.length>60?"\u2026":""))):
              React.createElement("div",{style:{fontSize:10,color:"#334155",lineHeight:1.3}},tool.goals[g.key].t.slice(0,60)+(tool.goals[g.key].t.length>60?"\u2026":""))
            )
          ))
        ))
      )
    )
  );
}

function DetailModal({tool,onClose}) {
  if(!tool) return null;
  return React.createElement("div",{style:{position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",zIndex:100,display:"flex",justifyContent:"center",alignItems:"center",padding:20},onClick:onClose},
    React.createElement("div",{style:{background:"white",borderRadius:16,maxWidth:700,width:"100%",maxHeight:"85vh",overflow:"auto",padding:32},onClick:e=>e.stopPropagation()},
      React.createElement("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:20}},
        React.createElement("div",{style:{display:"flex",gap:14,alignItems:"center"}},
          React.createElement(ToolIcon,{toolId:tool.id,size:48}),
          React.createElement("div",null,
            React.createElement("h2",{style:{margin:0,fontSize:24,color:"#1e293b"}},tool.name),
            React.createElement("p",{style:{margin:"4px 0 0",color:"#64748b"}},tool.desc)
          )
        ),
        React.createElement("button",{onClick:onClose,style:{background:"none",border:"none",fontSize:24,cursor:"pointer",color:"#94a3b8",padding:4}},"\u00D7")
      ),
      React.createElement("div",{style:{display:"flex",gap:12,marginBottom:20,flexWrap:"wrap"}},
        React.createElement("span",{style:{background:"#f1f5f9",padding:"6px 14px",borderRadius:20,fontSize:13}},"Komplexit\u00e4t: "+ci(tool.complexity)+" "+tool.complexity),
        React.createElement("span",{style:{background:"#f1f5f9",padding:"6px 14px",borderRadius:20,fontSize:13,display:"inline-flex",alignItems:"center",gap:6}},"Bloom: ",React.createElement(BloomHats,{bloom:tool.bloom,size:14}))
      ),
      React.createElement("p",{style:{fontSize:14,color:"#475569",lineHeight:1.5,margin:"0 0 16px",padding:12,background:"#f8fafc",borderRadius:8}},tool.complexityText),
      tool.longDesc?React.createElement("div",{style:{margin:"0 0 24px",padding:16,background:"#f8fafc",borderRadius:10,borderLeft:"4px solid #3b82f6"}},
        React.createElement("h3",{style:{fontSize:15,margin:"0 0 8px",color:"#1e293b"}},"\u00DCberblick"),
        React.createElement("p",{style:{margin:0,fontSize:13,color:"#475569",lineHeight:1.6}},tool.longDesc)
      ):null,
      React.createElement("h3",{style:{fontSize:16,margin:"0 0 16px",color:"#1e293b"}},"Eignung nach didaktischem Ziel"),
      GOALS.map(g=>React.createElement("div",{key:g.key,style:{marginBottom:12,padding:14,background:rb(tool.goals[g.key].r),borderRadius:10,borderLeft:"4px solid "+rc(tool.goals[g.key].r)}},
        React.createElement("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}},
          React.createElement("span",{style:{display:"inline-flex",alignItems:"center",gap:6,fontWeight:600,fontSize:14}},React.createElement(GoalIcon,{goalKey:g.key,color:rc(tool.goals[g.key].r),size:18}),g.label),
          React.createElement("span",{style:{fontSize:12,color:rc(tool.goals[g.key].r),fontWeight:600}},rl(tool.goals[g.key].r))
        ),
        React.createElement("p",{style:{margin:0,fontSize:13,color:"#475569",lineHeight:1.5}},tool.goals[g.key].t)
      )),
      React.createElement("div",{style:{display:"flex",gap:10,flexWrap:"wrap",marginTop:20}},
        tool.docsUrl?React.createElement("a",{href:tool.docsUrl,target:"_blank",rel:"noopener",style:{fontSize:13,padding:"8px 16px",borderRadius:8,background:"#eff6ff",color:"#2563eb",textDecoration:"none",border:"1px solid #bfdbfe",fontWeight:500}},"\uD83D\uDCDA Moodle Docs"):null,
        React.createElement("a",{href:"https://community.eledia.de",target:"_blank",rel:"noopener",style:{fontSize:13,padding:"8px 16px",borderRadius:8,background:"#fff7ed",color:"#ea580c",textDecoration:"none",border:"1px solid #fed7aa",fontWeight:500}},"\uD83D\uDCA1 Mehr Infos und Ideen in der eledia.community")
      )
    )
  );
}

function CompareView({toolIds,tools,onClose}) {
  const items = toolIds.map(id=>tools.find(t=>t.id===id)).filter(Boolean);
  if(items.length<2) return null;
  return React.createElement("div",{style:{position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",zIndex:100,display:"flex",justifyContent:"center",alignItems:"center",padding:20},onClick:onClose},
    React.createElement("div",{style:{background:"white",borderRadius:16,maxWidth:900,width:"100%",maxHeight:"85vh",overflow:"auto",padding:32},onClick:e=>e.stopPropagation()},
      React.createElement("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:24}},
        React.createElement("h2",{style:{margin:0,fontSize:22}},"Vergleich"),
        React.createElement("button",{onClick:onClose,style:{background:"none",border:"none",fontSize:24,cursor:"pointer",color:"#94a3b8"}},"\u00D7")
      ),
      React.createElement("table",{style:{width:"100%",borderCollapse:"collapse",fontSize:13}},
        React.createElement("thead",null,React.createElement("tr",null,
          React.createElement("th",{style:{textAlign:"left",padding:10,borderBottom:"2px solid #e2e8f0",width:"25%"}}),
          items.map(t=>React.createElement("th",{key:t.id,style:{textAlign:"center",padding:10,borderBottom:"2px solid #e2e8f0",fontSize:16}},React.createElement("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:6}},React.createElement(ToolIcon,{toolId:t.id,size:32}),t.name)))
        )),
        React.createElement("tbody",null,
          React.createElement("tr",null,React.createElement("td",{style:{padding:10,fontWeight:600,borderBottom:"1px solid #f1f5f9"}},"Beschreibung"),items.map(t=>React.createElement("td",{key:t.id,style:{padding:10,textAlign:"center",borderBottom:"1px solid #f1f5f9",color:"#475569"}},t.desc))),
          React.createElement("tr",null,React.createElement("td",{style:{padding:10,fontWeight:600,borderBottom:"1px solid #f1f5f9"}},"Komplexit\u00e4t"),items.map(t=>React.createElement("td",{key:t.id,style:{padding:10,textAlign:"center",borderBottom:"1px solid #f1f5f9"}},ci(t.complexity)+" "+t.complexity))),
          React.createElement("tr",null,React.createElement("td",{style:{padding:10,fontWeight:600,borderBottom:"1px solid #f1f5f9"}},"Bloom"),items.map(t=>React.createElement("td",{key:t.id,style:{padding:10,textAlign:"center",borderBottom:"1px solid #f1f5f9"}},React.createElement(BloomHats,{bloom:t.bloom,size:14})))),
          GOALS.map(g=>{
            const ratings=items.map(t=>t.goals[g.key].r);
            const best=ratings.includes("gr\u00fcn")?"gr\u00fcn":ratings.includes("orange")?"orange":"rot";
            return React.createElement("tr",{key:g.key},
              React.createElement("td",{style:{padding:10,fontWeight:600,borderBottom:"1px solid #f1f5f9"}},React.createElement("span",{style:{display:"inline-flex",alignItems:"center",gap:6}},React.createElement(GoalIcon,{goalKey:g.key,color:"#475569",size:16}),g.label)),
              items.map(t=>{
                const isBest=t.goals[g.key].r===best&&ratings.filter(r=>r===best).length===1;
                return React.createElement("td",{key:t.id,style:{padding:10,textAlign:"center",borderBottom:"1px solid #f1f5f9",background:isBest?rb(best):"transparent"}},
                  React.createElement("div",{style:{display:"flex",justifyContent:"center",marginBottom:4}},React.createElement(GoalIcon,{goalKey:g.key,color:rc(t.goals[g.key].r),size:20})),
                  React.createElement("span",{style:{fontSize:11,color:"#64748b"}},t.goals[g.key].t.slice(0,50)+"\u2026")
                );
              })
            );
          })
        )
      )
    )
  );
}

function WizardView({tools,onSelect}) {
  const [step,setStep]=useState(0);
  const [goal,setGoal]=useState(null);
  const [complexity,setComplexity]=useState(null);
  const [bloomMin,setBloomMin]=useState(0);

  const results=useMemo(()=>{
    if(step<3) return [];
    return tools.filter(t=>{
      if(goal&&t.goals[goal]?.r==="rot") return false;
      if(complexity&&t.complexity!==complexity) return false;
      if(bloomMin>0&&parseInt(t.bloom)<bloomMin) return false;
      return true;
    }).sort((a,b)=>{
      if(!goal) return 0;
      const o={"gr\u00fcn":0,"orange":1,"rot":2};
      return (o[a.goals[goal].r]||0)-(o[b.goals[goal].r]||0);
    });
  },[step,goal,complexity,bloomMin,tools]);

  const sty=active=>({padding:"8px 16px",borderRadius:20,fontSize:13,fontWeight:active?600:400,background:active?"#1e293b":"#f1f5f9",color:active?"white":"#64748b",border:"none"});
  const optBtn=(sel,onClick,children)=>React.createElement("button",{onClick,style:{padding:"16px 20px",borderRadius:12,border:sel?"2px solid #f97316":"2px solid #e2e8f0",background:sel?"#fff7ed":"white",cursor:"pointer",textAlign:"left",fontSize:14,transition:"all 0.15s",width:"100%"}},children);

  return React.createElement("div",{style:{maxWidth:600,margin:"0 auto"}},
    React.createElement("div",{style:{display:"flex",gap:8,marginBottom:32,justifyContent:"center",flexWrap:"wrap"}},
      ["Ziel","Komplexit\u00e4t","Bloom","Ergebnis"].map((s,i)=>React.createElement("span",{key:i,style:sty(i===step)},i+1+". "+s))
    ),
    step===0&&React.createElement("div",null,
      React.createElement("h3",{style:{textAlign:"center",marginBottom:20,color:"#1e293b"}},"Was m\u00f6chtest du erreichen?"),
      React.createElement("div",{style:{display:"grid",gap:10}},
        GOALS.filter(g=>g.key!=="bloomG").map(g=>optBtn(goal===g.key,()=>{setGoal(g.key);setStep(1)},
          React.createElement("div",{style:{display:"flex",alignItems:"center",gap:10}},React.createElement(GoalIcon,{goalKey:g.key,color:goal===g.key?"#f97316":"#475569",size:22}),React.createElement("div",null,React.createElement("strong",null,g.label),React.createElement("br"),React.createElement("span",{style:{fontSize:12,color:"#64748b"}},g.q)))
        ))
      )
    ),
    step===1&&React.createElement("div",null,
      React.createElement("h3",{style:{textAlign:"center",marginBottom:20,color:"#1e293b"}},"Wie komplex darf es sein?"),
      React.createElement("div",{style:{display:"grid",gap:10}},
        [["einfach","Schnell eingerichtet, wenig Einarbeitung"],["mittel","Etwas Planung n\u00f6tig, aber gut machbar"],["komplex","Braucht Vorbereitung, daf\u00fcr sehr flexibel"]].map(([c,d])=>
          optBtn(complexity===c,()=>{setComplexity(c);setStep(2)},
            React.createElement("div",null,React.createElement("strong",null,ci(c)+" "+c.charAt(0).toUpperCase()+c.slice(1)),React.createElement("br"),React.createElement("span",{style:{fontSize:12,color:"#64748b"}},d))
          )
        ),
        optBtn(false,()=>{setComplexity(null);setStep(2)},React.createElement("div",null,React.createElement("strong",null,"Egal"),React.createElement("br"),React.createElement("span",{style:{fontSize:12,color:"#64748b"}},"Komplexit\u00e4t spielt keine Rolle")))
      )
    ),
    step===2&&React.createElement("div",null,
      React.createElement("h3",{style:{textAlign:"center",marginBottom:20,color:"#1e293b"}},"Welche Bloom-Stufe mindestens?"),
      React.createElement("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:4}},
        BLOOM.map((b,i)=>{
          const lvl=i+1, w=100+(5-i)*30;
          return React.createElement("button",{key:i,onClick:()=>{setBloomMin(lvl);setStep(3)},
            title:b.desc+" Schl\u00fcsselw\u00f6rter: "+b.keywords,
            style:{width:w,padding:"10px 0",borderRadius:6,border:bloomMin===lvl?"2px solid #f97316":"2px solid #e2e8f0",background:bloomMin===lvl?"#fff7ed":"hsl("+(200+i*25)+", 60%, "+(95-i*5)+"%)",cursor:"pointer",fontSize:13,fontWeight:500,transition:"all 0.15s"}
          },lvl+". "+b.name);
        }),
        React.createElement("button",{onClick:()=>{setBloomMin(0);setStep(3)},style:{marginTop:8,padding:"8px 20px",borderRadius:6,border:"1px solid #d1d5db",background:"white",cursor:"pointer",fontSize:13}},"Egal / Alle anzeigen")
      )
    ),
    step===3&&React.createElement("div",null,
      React.createElement("h3",{style:{textAlign:"center",marginBottom:4,color:"#1e293b"}},results.length+" passende Tools gefunden"),
      React.createElement("p",{style:{textAlign:"center",color:"#64748b",fontSize:13,marginBottom:20}},
        (goal?GOALS.find(g=>g.key===goal)?.label:"")+(complexity?" \u00B7 "+complexity:"")+(bloomMin>0?" \u00B7 ab Bloom "+bloomMin:"")
      ),
      React.createElement("div",{style:{display:"grid",gap:10}},
        results.map(t=>React.createElement("div",{key:t.id,onClick:()=>onSelect(t),style:{display:"flex",alignItems:"center",gap:14,padding:14,background:"white",borderRadius:10,border:"1px solid #e2e8f0",cursor:"pointer",transition:"all 0.15s"},
          onMouseEnter:e=>e.currentTarget.style.borderColor="#f97316",onMouseLeave:e=>e.currentTarget.style.borderColor="#e2e8f0"},
          React.createElement(Dot,{rating:goal?t.goals[goal].r:"gr\u00fcn",size:24}),
          React.createElement("div",{style:{flex:1}},
            React.createElement("strong",null,t.name)," ",React.createElement("span",{style:{fontSize:12,color:"#94a3b8"}},ci(t.complexity)),
            React.createElement("div",{style:{fontSize:12,color:"#64748b",marginTop:2}},goal?t.goals[goal].t:t.desc)
          ),
          React.createElement("span",{style:{fontSize:12,color:"#94a3b8"}},"\u2192")
        ))
      ),
      React.createElement("button",{onClick:()=>{setStep(0);setGoal(null);setComplexity(null);setBloomMin(0)},
        style:{display:"block",margin:"20px auto 0",padding:"8px 20px",borderRadius:8,border:"1px solid #d1d5db",background:"white",cursor:"pointer",fontSize:13}},"\u21A9 Neu starten")
    )
  );
}

function App() {
  const [view,setView]=useState("matrix");
  const [selectedTool,setSelectedTool]=useState(null);
  const [compareIds,setCompareIds]=useState([]);
  const [showCompare,setShowCompare]=useState(false);
  const [search,setSearch]=useState("");
  const [filters,setFilters]=useState({complexity:null,bloomMin:0,goal:null,onlyGreen:false,bloomSort:null});

  const toggleCompare=id=>setCompareIds(p=>p.includes(id)?p.filter(x=>x!==id):p.length>=4?p:[...p,id]);
  const filteredTools=TOOLS.filter(t=>!search||t.name.toLowerCase().includes(search.toLowerCase())||t.desc.toLowerCase().includes(search.toLowerCase()));

  const navBtn=(v,label)=>React.createElement("button",{onClick:()=>setView(v),style:{padding:"8px 20px",borderRadius:8,border:"none",background:view===v?"#1e293b":"transparent",color:view===v?"white":"#64748b",cursor:"pointer",fontSize:14,fontWeight:view===v?600:400,transition:"all 0.15s"}},label);

  return React.createElement("div",{style:{fontFamily:"Inter, system-ui, -apple-system, sans-serif",background:"#f8fafc",minHeight:"100vh"}},
    React.createElement("header",{style:{background:"linear-gradient(135deg, #1e293b 0%, #334155 100%)",color:"white",padding:"24px 32px"}},
      React.createElement("div",{style:{maxWidth:1200,margin:"0 auto"}},
        React.createElement("div",{style:{display:"flex",alignItems:"center",gap:12,marginBottom:4}},
          React.createElement("span",{style:{fontSize:28}},"\u{1F393}"),
          React.createElement("h1",{style:{margin:0,fontSize:24,fontWeight:700}},"Moodle Tool Guide"),
          React.createElement("span",{style:{background:"#f97316",color:"white",fontSize:11,padding:"2px 10px",borderRadius:10,fontWeight:600}},"Moodle 5")
        ),
        React.createElement("p",{style:{margin:0,fontSize:14,opacity:0.8}},"Finde das passende Werkzeug f\u00fcr dein didaktisches Ziel")
      )
    ),
    React.createElement("nav",{style:{background:"white",borderBottom:"1px solid #e2e8f0",padding:"8px 32px",position:"sticky",top:0,zIndex:50}},
      React.createElement("div",{style:{maxWidth:1200,margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:8}},
        React.createElement("div",{style:{display:"flex",gap:4}},
          navBtn("matrix","\u{1F4CA} Matrix"),navBtn("cards","\u{1F0CF} Karten"),navBtn("wizard","\u{1F9D9} Assistent")
        ),
        React.createElement("div",{style:{display:"flex",gap:8,alignItems:"center"}},
          view!=="wizard"&&React.createElement("input",{value:search,onChange:e=>setSearch(e.target.value),placeholder:"Tool suchen\u2026",style:{padding:"6px 14px",borderRadius:8,border:"1px solid #d1d5db",fontSize:13,width:180}}),
          compareIds.length>=2&&React.createElement("button",{onClick:()=>setShowCompare(true),style:{padding:"6px 14px",borderRadius:8,background:"#f97316",color:"white",border:"none",cursor:"pointer",fontSize:13,fontWeight:600}},"Vergleichen ("+compareIds.length+")")
        )
      )
    ),
    view!=="wizard"&&React.createElement("div",{style:{maxWidth:1200,margin:"0 auto",padding:"12px 32px",display:"flex",gap:8,flexWrap:"wrap"}},
      React.createElement("select",{value:filters.complexity||"",onChange:e=>setFilters(f=>({...f,complexity:e.target.value||null})),style:{padding:"6px 12px",borderRadius:8,border:"1px solid #d1d5db",fontSize:12}},
        React.createElement("option",{value:""},"Alle Komplexit\u00e4ten"),
        React.createElement("option",{value:"einfach"},"\u2B50 Einfach"),
        React.createElement("option",{value:"mittel"},"\u2B50\u2B50 Mittel"),
        React.createElement("option",{value:"komplex"},"\u2B50\u2B50\u2B50 Komplex")
      ),
      React.createElement("select",{value:filters.goal||"",onChange:e=>setFilters(f=>({...f,goal:e.target.value||null,onlyGreen:!!e.target.value})),style:{padding:"6px 12px",borderRadius:8,border:"1px solid #d1d5db",fontSize:12}},
        React.createElement("option",{value:""},"Gut geeignet f\u00fcr \u2026"),
        GOALS.filter(g=>g.key!=="bloomG").map(g=>React.createElement("option",{key:g.key,value:g.key},"\u2714 "+g.label))
      ),
      React.createElement("select",{value:filters.bloomMin||"",onChange:e=>setFilters(f=>({...f,bloomMin:parseInt(e.target.value)||0})),style:{padding:"6px 12px",borderRadius:8,border:"1px solid #d1d5db",fontSize:12}},
        React.createElement("option",{value:""},"\u{1F393} Bloom: Alle Stufen"),
        BLOOM.map((b,i)=>React.createElement("option",{key:i,value:i+1},"ab Stufe "+(i+1)+": "+b.name))
      )
    ),
    React.createElement("main",{style:{maxWidth:1200,margin:"0 auto",padding:"16px 32px 40px"}},
      view==="matrix"&&React.createElement(MatrixView,{tools:filteredTools,onSelect:setSelectedTool,filters}),
      view==="cards"&&React.createElement("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(280px, 1fr))",gap:16}},
        filteredTools.filter(t=>{
          if(filters.complexity&&t.complexity!==filters.complexity) return false;
          if(filters.goal&&filters.onlyGreen&&t.goals[filters.goal]?.r!=="gr\u00fcn") return false;
          return true;
        }).map(t=>React.createElement(ToolCard,{key:t.id,tool:t,onSelect:setSelectedTool,onCompare:toggleCompare,isC:compareIds.includes(t.id)}))
      ),
      view==="wizard"&&React.createElement(WizardView,{tools:TOOLS,onSelect:setSelectedTool})
    ),
    selectedTool&&React.createElement(DetailModal,{tool:selectedTool,onClose:()=>setSelectedTool(null)}),
    showCompare&&React.createElement(CompareView,{toolIds:compareIds,tools:TOOLS,onClose:()=>setShowCompare(false)}),
    React.createElement("footer",{style:{background:"#1e293b",color:"#94a3b8",padding:"16px 32px",textAlign:"center",fontSize:12}},
      "Basierend auf dem Moodle 5 Tool Guide \u00B7 eLeDia \u00B7 Idee: Joyce Seitzinger \u00B7 Deutsche \u00dcbertragung: Ralf Hilgenstock, Susanne Gebauer, Gerald Hartwig"
    )
  );
}

ReactDOM.render(React.createElement(App), document.getElementById("toolguide-root"));
})();