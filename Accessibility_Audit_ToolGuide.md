# Accessibility-Audit: Moodle Tool Guide (Prototyp + Plugin)

**Auditiert:** Prototyp_ToolGuide.html sowie gleichnamiges local_toolguide-Plugin (v1.1.4 → v1.1.5)
**Prüfbasis:** WCAG 2.2 Level AA
**Mappings:** EN 301 549, BITV 2.0 (öffentlicher Sektor), BFSG (privater Dienst/Produkt, soweit zutreffend)
**Kontextmodus:** `best_practice_wcag` mit EU-Kontextnotiz
**Audit-Datum:** 2026-04-10
**Auditor:** webui-accessibility-auditor (automatisch + manuell)

## Hinweis zur Sprache und zum Rechtsrahmen

Dieser Audit liefert eine technische Einordnung gegen WCAG 2.2 AA. Er stellt keine abschließende Konformitätsbescheinigung dar und ersetzt keine rechtliche Bewertung nach BITV 2.0 oder BFSG. Die Compliance-Einordnung ist kontextabhängig und hängt vom tatsächlichen Einsatz (öffentliche Stelle vs. privater Dienst) ab.

---

## 1. Executive Summary

Das Tool-Guide-Plugin ist von Grund auf mit Zugänglichkeit im Blick entwickelt (Skip-Link, Landmark-Elemente, `lang`-Attribut, semantisches HTML, ARIA-Rollen, Fokus-Stile via `focus-visible`, `prefers-reduced-motion`). Der Audit identifiziert jedoch eine kleine Zahl klar behebbarer Probleme, die zum Teil sicherheitsrelevant für die Kernaufgaben „Tool auswählen", „Filtern", „Assistent durchlaufen" und „Vergleichen" sind.

Schwerpunkte der Befunde:

- **Farbkontrast bei aktiven Zustandsanzeigen** (Button-Aktiv-Farbe Orange `#f98012` mit weißem Text erreicht nur 2,58:1 — deutlich unter den geforderten 4,5:1).
- **Tastaturbedienbarkeit der Wizard-Ergebnisliste und der Matrixzeilen** (div/tr mit `onClick` + `tabIndex` aber ohne vollständige Tastaturunterstützung bzw. `role`).
- **Fokusmanagement in den modalen Dialogen** (kein initialer Fokus, keine Fokusfalle, keine Fokusrückgabe).
- **Fehlender zugänglicher Name am Compare-Dialog**.
- **Überschriftenhierarchie** (h1 → h3 ohne Zwischenschritt pro Ansicht).
- **Dynamische Ergebniszähler** ohne Live-Region-Ankündigung für Screenreader.

Im Zuge dieses Audits wurden alle oben genannten Befunde **direkt im Code behoben** (Version 1.1.5). Die verbleibenden Einträge unter „Manual Follow-up" sind Prüfpunkte, die nur am laufenden System mit Assistenztechnologien endgültig verifiziert werden können.

---

## 2. Top Priorities

| # | Befund | Severity | Status |
|---|--------|----------|--------|
| 1 | Kontrast aktiver Orange-Buttons (Text-weiß auf `#f98012`) unterschreitet 4,5:1 | **high** | behoben (→ `#b85a00`, 4,67:1) |
| 2 | Wizard-Ergebnisliste: div mit onClick ohne role/onKeyDown | **high** | behoben |
| 3 | Matrix-Zeile: tr mit onClick + tabIndex, keine Leertaste-Unterstützung | **high** | behoben |
| 4 | Detail- und Compare-Dialog ohne Fokusfalle, kein initialer Fokus, keine Rückgabe | **high** | behoben |
| 5 | Compare-Dialog ohne zugänglichen Namen | **medium** | behoben |
| 6 | Überschriftenhierarchie: h1 → h3 ohne h2 pro Ansicht | **medium** | behoben (sr-only h2) |
| 7 | Dynamisch wechselnde Ergebnis­anzahl wird Screenreadern nicht angekündigt | **medium** | behoben (aria-live) |
| 8 | Dialog-Schließen-Button nur auf Deutsch beschriftet | **low** | behoben (i18n) |

---

## 3. Detailed Findings

### Finding F-001 — Kontrast aktiver Orange-Buttons unzureichend

- **artifact_type:** Web-App-Komponente
- **location:** Header — Buttons für Schriftgröße (A− / A / A+) und Sprache (DE / EN / FR / ES); ebenso die leeren Zustände mit Reset-Button
- **summary:** Der Markenakzent `#f98012` wird im aktiven Zustand als Button-Hintergrund mit weißem Text verwendet. Das ergibt ein Kontrastverhältnis von 2,58:1. WCAG 2.2 AA verlangt für Normaltext ≥ 4,5:1.
- **evidence:**
  - Aktiver Fontscale-Button: `background:fontScale===1?"#f98012":"transparent",color:fontScale===1?"white":…`
  - Aktiver Sprachbutton: `background:lang===code?"#f98012":"transparent",color:lang===code?"white":…`
- **classification.status:** confirmed_issue
- **classification.testability:** automatic
- **classification.confidence:** high
- **severity:** high
- **affected_users:** users_with_low_vision, older_users, mobile_users, users_with_color_vision_deficiency
- **normative_mapping.wcag_22:** 1.4.3 (Contrast Minimum)
- **normative_mapping.en_301_549:** aligned (9.1.4.3)
- **normative_mapping.bitv_relevant:** yes
- **normative_mapping.bfsg_relevant:** yes (bei privatem Dienstleistungskontext)
- **why_it_matters:** Sehbeeinträchtigte Nutzer*innen, ältere Menschen und alle Nutzer*innen bei widrigen Lichtbedingungen (z. B. Tageslicht am mobilen Gerät) erkennen den aktiven Zustand nicht zuverlässig.
- **recommended_fix:** Dunklere Orange-Variante einsetzen, die auch mit weißem Text ausreichend Kontrast liefert.
- **applied_fix:** Ersetzt durch `#b85a00` (4,67:1 auf Weiß). Gilt jetzt für alle aktiven Toggle-Hintergründe, Fokusoutline auf hellen Flächen, Hover-Rahmen und den Reset-Button in Leerzuständen.

### Finding F-002 — Wizard-Ergebnisliste nicht vollständig tastaturbedienbar

- **artifact_type:** React-Komponente (WizardView, step 4)
- **location:** Wizard-Assistent, Ergebnisansicht nach Schritt 4
- **summary:** Jede Ergebniszeile wird als `<div>` mit `onClick` und `tabIndex:0` gerendert, jedoch ohne `role` und ohne `onKeyDown`. Tastatur-Nutzer*innen können die Elemente zwar fokussieren, aber nicht mit Enter/Leertaste aktivieren.
- **evidence:** `React.createElement("div",{key:t2.id,onClick:…,tabIndex:0,…})`
- **classification.status:** confirmed_issue
- **classification.testability:** automatic
- **classification.confidence:** high
- **severity:** high
- **affected_users:** keyboard_only_users, screenreader_users, users_with_motor_impairments
- **normative_mapping.wcag_22:** 2.1.1 (Keyboard), 4.1.2 (Name, Role, Value), 1.3.1 (Info and Relationships)
- **normative_mapping.en_301_549:** aligned
- **normative_mapping.bitv_relevant:** yes
- **normative_mapping.bfsg_relevant:** yes
- **why_it_matters:** Die Ergebnisauswahl ist der Kern-Workflow des Assistenten. Fällt sie für Tastaturnutzer*innen aus, ist der gesamte Assistent unbenutzbar.
- **recommended_fix:** `role="button"` und `onKeyDown` für Enter/Leertaste ergänzen; sinnvollen zugänglichen Namen geben.
- **applied_fix:** `role:"button"`, `aria-label` mit Toolname + Kategoriename, `onKeyDown` für Enter und Leertaste.

### Finding F-003 — Matrix-Zeile: fehlende Leertaste und kein Role

- **artifact_type:** React-Komponente (MatrixView)
- **location:** Matrix-Ansicht, Tabellenzeilen
- **summary:** Jede Zeile hat `onClick`, `tabIndex:0` und einen Enter-Handler, aber keine Leertaste-Unterstützung und keine `role`. Das ist inkonsistent mit Standard-Button-Erwartungen.
- **classification.status:** confirmed_issue
- **classification.testability:** semi_automatic
- **classification.confidence:** high
- **severity:** high
- **affected_users:** keyboard_only_users, screenreader_users
- **normative_mapping.wcag_22:** 2.1.1, 4.1.2
- **applied_fix:** `role="button"`, `aria-label` mit Toolname, `onKeyDown` für Enter und Leertaste mit `preventDefault()`, damit die Leertaste die Zeile aktiviert statt die Seite zu scrollen.
- **manual_follow_up:** Mit Screenreader (NVDA/VoiceOver) verifizieren, ob die Row-Semantik die Button-Rolle nicht verwirrend überlagert. Alternativ kann langfristig der Klick auf den Zelleninhalt (z. B. erste Spalte = Toolname-Button) statt auf die gesamte Zeile liegen.

### Finding F-004 — Dialoge ohne Fokusmanagement

- **artifact_type:** React-Komponente (DetailModal, CompareModal)
- **location:** Öffnung eines Tool-Details oder der Vergleichsansicht
- **summary:** Beide Dialoge nutzen korrekt `role="dialog"` und `aria-modal="true"`. Sie besitzen aber kein Fokusmanagement: keine Setzung des initialen Fokus in den Dialog, keine Fokusfalle bei Tab, keine Rückgabe des Fokus an das auslösende Element beim Schließen.
- **classification.status:** confirmed_issue
- **classification.testability:** semi_automatic
- **classification.confidence:** high
- **severity:** high
- **affected_users:** keyboard_only_users, screenreader_users
- **normative_mapping.wcag_22:** 2.1.1, 2.4.3 (Focus Order), 2.4.7 (Focus Visible), 4.1.2
- **normative_mapping.en_301_549:** aligned
- **why_it_matters:** Ohne Fokusfalle verliert die Tastatur den Bezug zum Dialog. Ohne Rückgabe des Fokus nach dem Schließen beginnt die Navigation wieder am Seitenanfang.
- **applied_fix:** Neuer Hook `useFocusTrap(active)` mit (a) Ermittlung aller fokussierbaren Elemente im Container, (b) initialer Fokussetzung auf das erste fokussierbare Element, (c) Tab-Trap (Cycle von last→first und first→last mit Shift), (d) Rückgabe des Fokus via Cleanup-Effekt an `document.activeElement` zum Öffnungszeitpunkt.
- **manual_follow_up:** Mit NVDA + Firefox und VoiceOver + Safari durchklicken und prüfen, ob der Fokus wirklich zurückgegeben wird (insb. nach ESC-Taste und Klick außerhalb des Dialogs).

### Finding F-005 — Compare-Dialog ohne zugänglichen Namen

- **artifact_type:** React-Komponente (CompareModal)
- **location:** Vergleichsdialog
- **summary:** Der Vergleichsdialog trug `role="dialog"` und `aria-modal="true"`, aber kein `aria-label` und kein `aria-labelledby`. Screenreader kündigen den Dialog dann ohne beschreibenden Namen an.
- **classification.status:** confirmed_issue
- **classification.testability:** automatic
- **classification.confidence:** high
- **severity:** medium
- **normative_mapping.wcag_22:** 4.1.2, 2.4.6 (Headings and Labels)
- **applied_fix:** Titel-`<h2>` erhielt `id="compare-dialog-title"`, Dialog-Container erhielt `aria-labelledby="compare-dialog-title"`.

### Finding F-006 — Überschriftenhierarchie springt von h1 zu h3

- **artifact_type:** globale Struktur
- **location:** alle drei Hauptansichten (Matrix, Karten, Wizard)
- **summary:** Das Dokument hat ein `h1` (Seitentitel). Direkt darunter erscheinen `h3`-Elemente (Wizard-Fragen, Leerzustände, Kartenüberschriften). Das überspringt die h2-Ebene.
- **classification.status:** confirmed_issue
- **classification.testability:** semi_automatic
- **classification.confidence:** high
- **severity:** medium
- **normative_mapping.wcag_22:** 1.3.1, 2.4.6
- **applied_fix:** Jede Hauptansicht (matrix, cards, wizard) ist jetzt in ein `<section aria-labelledby="view-…-title">` gewickelt, dessen erstes Kind ein visuell verstecktes `<h2>` mit dem Ansichtsnamen ist. Die h3-Elemente im Inneren sind dadurch korrekt hierarchisch eingeordnet.
- **manual_follow_up:** Mit Screenreader-Heading-Navigation (NVDA Einfg+F6, VoiceOver VO+Cmd+H) testen, ob die Struktur wirklich wie erwartet vorgelesen wird.

### Finding F-007 — Dynamische Ergebniszähler ohne Live-Ankündigung

- **artifact_type:** React-Komponenten (MatrixView, WizardView)
- **location:** Matrix nach Filteränderung; Wizard-Schritt 5 (Ergebnisse)
- **summary:** Wenn Nutzer*innen Filter ändern oder den Assistenten durchlaufen, ändert sich die Anzahl passender Tools. Screenreader werden auf die neue Anzahl nicht hingewiesen, weil der Text in einem normalen Heading steht.
- **classification.status:** probable_issue
- **classification.testability:** semi_automatic
- **classification.confidence:** medium
- **severity:** medium
- **normative_mapping.wcag_22:** 4.1.3 (Status Messages)
- **applied_fix:** Matrix: visuell versteckter `<div role="status" aria-live="polite">`, der die Anzahl Treffer enthält. Wizard Schritt 5: Ergebnis-Überschrift erhielt `aria-live="polite"`.
- **manual_follow_up:** Mit Screenreader und langsamem Filter-Wechsel prüfen, ob die Meldungen nicht zu oft oder überlappend angekündigt werden.

### Finding F-008 — Dialog-Schließen-Button nur auf Deutsch beschriftet

- **artifact_type:** i18n
- **location:** beide Dialoge, Close-Button oben rechts
- **summary:** `aria-label` war hart als "Schließen" verdrahtet, auch für englische/französische/spanische UI-Sprache.
- **classification.status:** confirmed_issue
- **classification.testability:** automatic
- **classification.confidence:** high
- **severity:** low
- **normative_mapping.wcag_22:** 3.1.1 (Language of Page) nur indirekt; 4.1.2
- **applied_fix:** Neue i18n-Schlüssel `dialog_close` in DE/EN/FR/ES. `aria-label` wird jetzt dynamisch aus `t(lang,"dialog_close")` gebildet.

---

## 4. Manual Follow-up Checklist

Die folgenden Punkte können nur am laufenden System mit echten Hilfsmitteln abschließend bewertet werden. Sie sind nicht als Bug gekennzeichnet, sondern als Prüfpunkt.

1. **Screenreader-Durchlauf** (NVDA + Firefox, VoiceOver + Safari, JAWS + Chrome) durch alle drei Ansichten plus beide Dialoge. Achtet besonders auf:
   - Ankündigung der Ansichtswechsel (aria-current="page")
   - Ankündigung der Filteränderungen (Live-Region-Meldungen)
   - Korrekte Beschriftung aller interaktiven Elemente
2. **Tastaturnavigation** komplett ohne Maus, inklusive:
   - Skip-Link "Zum Inhalt springen"
   - Tab-Reihenfolge in allen Ansichten
   - Schließen von Dialogen via ESC und Rückgabe des Fokus an den Trigger
   - Leertaste-Aktivierung auf Matrix-Zeilen (nach Fix)
3. **Zoom bis 200 %** im Browser (WCAG 1.4.4) und **Reflow bei 320 CSS-Pixel Breite** (WCAG 1.4.10). Horizontales Scrollen in der Matrix ist akzeptabel, sofern die übrigen Ansichten reflow-fähig bleiben.
4. **Textabstände-Bookmarklet** (WCAG 1.4.12) für `line-height:1.5`, `letter-spacing:0.12em`, `word-spacing:0.16em`, `paragraph-spacing:2em` — keine Overlaps erwartet, trotzdem prüfen.
5. **Kontrastprüfung mit Tools** (axe DevTools, Accessibility Insights, WAVE) gegen die finale gerenderte Seite.
6. **High-Contrast-Mode von Windows** (forced-colors CSS Media Query). Die SVG-Icons und -Logos sollten im Forced-Colors-Mode nicht verschwinden. Status: manual_check_required.
7. **prefers-reduced-motion** ist im Plugin-CSS gesetzt; Verifikation durch System­einstellung prüfen.
8. **Screenreader-Ansage von Bloom-Indikator** (BloomHats = Doktorhüte und BloomBars = Balken). Beide tragen `role="img"` und `aria-label="Bloom n/6"`. Empfehlung: erwägen, im Wizard zusätzlich die textliche Bloom-Stufe auszugeben.
9. **Datentabelle ohne sortierbare Spalten** — wenn später Sortierung ergänzt wird, muss `aria-sort` gesetzt werden.
10. **Erklärung zur Barrierefreiheit** (BITV §3 / EU 2016/2102) und **elektronischer Feedback-Mechanismus** — für den öffentlichen Sektor verpflichtend. Status: nicht Gegenstand dieses Audits, aber GOV-001 / GOV-002 vorhalten.

---

## 5. Compliance Context Note

Die Einordnung der Befunde gegen WCAG 2.2 AA ist gesichert. Die Einordnung gegen BITV 2.0 / EN 301 549 ist nur relevant, wenn das Plugin im Umfeld einer öffentlichen Stelle in Deutschland oder der EU eingesetzt wird. Für den Einsatz im Moodle einer privaten Hochschule oder eines privaten Unternehmens kann das BFSG relevant sein, insbesondere wenn die Moodle-Plattform eine Dienstleistung im Sinne des BFSG darstellt (z. B. berufliche Weiterbildung gegen Entgelt).

Dieser Audit ist eine technische Bewertung. Er ersetzt keine Prüfung durch eine offiziell anerkannte Prüfstelle und keine Erklärung zur Barrierefreiheit nach §12b BGG / §7 BITV 2.0 bzw. Art. 12 BFSG.

---

## Anhang: Zusammenfassung der angewandten Code-Änderungen

| Datei | Änderung |
|---|---|
| Prototyp_ToolGuide.html | `#f98012` Hintergrund mit weißem Text → `#b85a00` für alle Toggle-Buttons, Hover-Border, Fokus-Outline, Empty-State-Reset |
| Prototyp_ToolGuide.html | `useFocusTrap(active)` Hook hinzugefügt |
| Prototyp_ToolGuide.html | DetailModal + CompareModal verwenden `useFocusTrap` |
| Prototyp_ToolGuide.html | Compare-Dialog `aria-labelledby="compare-dialog-title"` + h2 id |
| Prototyp_ToolGuide.html | Wizard-Results: `role="button"`, `aria-label`, `onKeyDown` Enter+Space |
| Prototyp_ToolGuide.html | Matrix-Rows: `role="button"`, `aria-label`, `onKeyDown` Enter+Space + preventDefault |
| Prototyp_ToolGuide.html | `<section aria-labelledby>` + sr-only `<h2>` um alle drei Views |
| Prototyp_ToolGuide.html | `sr-only` Utility-Klasse im `<style>`-Block |
| Prototyp_ToolGuide.html | Matrix visually-hidden `role="status" aria-live="polite"` mit Treffer-Anzahl |
| Prototyp_ToolGuide.html | Wizard-Ergebnis-Heading `aria-live="polite"` |
| Prototyp_ToolGuide.html | Nav-Buttons: `aria-current="page"` statt `aria-pressed` |
| Prototyp_ToolGuide.html | i18n-Schlüssel `dialog_close` in DE/EN/FR/ES, Close-Button nutzt `t(lang,"dialog_close")` |
| moodle-plugin/local/toolguide/amd/src/toolguide.js | resynced via sync_plugin_js.py |
| moodle-plugin/local/toolguide/version.php | 2026041005 / release 1.1.5 |

**Nächste Schritte:** Screenreader-Tests mit NVDA, VoiceOver und JAWS; axe-DevTools-Scan auf gerendertem Plugin im Moodle-Kontext; Tastatur-only-Durchlauf aller Kern-Workflows.
