# Qualität · Moodle Tool Guide

## Meta

Bugs (`bugXX`) mit Severity, Tests (`testXX`) mit Verweis auf Akzeptanzkriterien aus `01-features.md`. Vorlage und Severity-Skala wie im DevFlow-Standard.

---

## 🐞 Bugs

### Severity-Skala

| Severity | Bedeutung | Reaktion |
|---|---|---|
| **S1** | Kritisch — Kernfunktion komplett kaputt, Datenverlust, Sicherheitslücke | Sofortiger Hotfix, blockiert Release |
| **S2** | Schwer — Feature unbrauchbar oder schwerer UX-Defekt, kein Workaround | Im laufenden Release fixen |
| **S3** | Mittel — Feature eingeschränkt, Workaround vorhanden | Nächstes Release |
| **S4** | Gering — kosmetisch, edge-case, minor | Backlog, opportunistisch |

### Vorlage

```
### bugXX Kurztitel

Feature:  featXX
Severity: S1 | S2 | S3 | S4
Status:   open | in_progress | fixed | wontfix
Linked:   taskXX (Fix), testXX (Reproduktion)

**Beschreibung**
Was ist falsch?

**Reproduktion**
1. ...
2. ...

**Erwartet**
Was sollte passieren?

**Tatsächlich**
Was passiert stattdessen?

**Umgebung** (falls relevant)
Browser / Version / Konfiguration / Datenstand
```

---

### bug01 Sync-Skripte mit hardcodierter Cowork-Session-ID

Feature:  feat05
Severity: S2
Status:   open
Linked:   task04

**Beschreibung**
`sync_plugin_js.py` und `sync_wordpress_js.py` enthalten lokal eine hardcodierte Pfad-Konstante `ROOT = Path("/sessions/youthful-sleepy-goodall/mnt/ToolGuide")`. Damit laufen die Skripte aus jedem anderen Repo-Stand mit `FileNotFoundError`. Zusätzlich hat `sync_wordpress_js.py` durch lokale Modifikationen die WP-spezifischen Patches (Loading-State-Removal, `wp.i18n`-Override, `__elediaToolguideRoot`-Lang-Setter, initiale Locale aus `__elediaToolguideInitialLang`) verloren.

**Reproduktion**
1. Repo frisch klonen.
2. `python3 sync_plugin_js.py` → `FileNotFoundError`.
3. WP-Plugin starten ohne Re-Sync → ältere JS ohne `wp.i18n`-Integration.

**Erwartet**
- Beide Skripte laufen aus jedem Repo, das die zwei Plugins enthält.
- Die WP-Sync produziert ein JS, das `__elediaToolguideInitialLang` und `wp.i18n` korrekt nutzt.

**Tatsächlich**
- Skripte zeigen auf eine Session-ID, die nicht mehr existiert.
- WP-JS hat den `wp.i18n`-Block verloren.

**Umgebung**
Cowork-Sessionwechsel zwischen `youthful-sleepy-goodall` und `awesome-nifty-gauss`.

---

### bug02 Bundle-Größe nach Logo-Update verdreifacht

Feature:  feat01
Severity: S3
Status:   open
Linked:   task05

**Beschreibung**
Das neue Premium-Moodle-Partner-Badge (4877 × 1232 px PNG) liefert als Data-URI 173 KB Base64 — gegenüber dem alten Badge (600 × 196, 50 KB Base64) ein Plus von 123 KB pro Bundle. Auswirkung: WP-ZIP wuchs von 105 KB auf 182 KB, Moodle-AMD-Source von ~206 KB auf ~330 KB. Funktional egal, aber Bandbreitenverbrauch steigt.

**Reproduktion**
1. Vor 2026-05-08: WP-ZIP 105 KB.
2. Nach Logo-Tausch: 182 KB.

**Erwartet**
Bundle-Größe nicht 3,5-fach inflationiert (für die Plugins). Möglich: PNG runterskalieren (Display-Höhe 42–44 px, also 200 × 50 px reichen) oder als statisches Asset ausliefern.

**Tatsächlich**
Volles 4877-px-PNG ist eingebettet.

---

## 🧪 Tests

Jeder Test verweist auf ein `featXX.ACyy` aus `01-features.md`.

### Vorlage

```
### testXX Kurztitel

Feature:                featXX
Akzeptanzkriterium:     featXX.ACyy
Typ:                    manuell | automatisiert
Status:                 pending | pass | fail
Letzter Lauf:           YYYY-MM-DD

**Schritte**
1. ...

**Erwartetes Ergebnis**
Aus dem Akzeptanzkriterium übernommen.

**Beobachtetes Ergebnis** (bei pass/fail)
Was wurde tatsächlich gesehen?

**Verlinkter Bug** (bei fail)
bugXX
```

---

### test01 Drei-Track-Lockstep nach Logo-Tausch

Feature:                feat05
Akzeptanzkriterium:     feat05.AC01
Typ:                    automatisiert
Status:                 pass
Letzter Lauf:           2026-05-08

**Schritte**
1. Neuen Partner-Badge in `moodle-tool-guide.html` einsetzen.
2. Fingerprint des neuen Base64-Inhalts in allen abgeleiteten Dateien suchen:
   - `moodle-plugin/local/toolguide/amd/src/toolguide.js`
   - `moodle-plugin/local/toolguide/amd/build/toolguide.min.js`
   - `wordpress-plugin/eledia-toolguide/assets/js/toolguide.js`
3. Erwartung: jede Datei enthält genau 1× den neuen Fingerprint.

**Erwartetes Ergebnis**
5/5 Dateien haben das neue Logo (inkl. dem zwischenzeitlich noch existierenden `toolguide/amd/src/toolguide.js` am Repo-Root).

**Beobachtetes Ergebnis**
5/5 grün (siehe Cowork-Run vom 2026-05-08).

---

### test02 WP-Plugin-ZIP enthält neue Version

Feature:                feat05
Akzeptanzkriterium:     feat05.AC02
Typ:                    automatisiert
Status:                 pass
Letzter Lauf:           2026-05-08

**Schritte**
1. WP-ZIP entpacken: `unzip -p eledia-toolguide.zip eledia-toolguide/eledia-toolguide.php | grep -E "Version:|ELEDIA_TOOLGUIDE_VERSION"`
2. Erwartung: beide Vorkommen zeigen `1.1.31`.

**Erwartetes Ergebnis**
`Version: 1.1.31`, `ELEDIA_TOOLGUIDE_VERSION = '1.1.31'`.

**Beobachtetes Ergebnis**
Pass.

---

### test03 Moodle-Plugin-ZIP enthält neue Version

Feature:                feat05
Akzeptanzkriterium:     feat05.AC02
Typ:                    automatisiert
Status:                 pass
Letzter Lauf:           2026-05-08

**Schritte**
1. `unzip -p moodle-plugin/local_toolguide.zip toolguide/version.php | grep -E "version|release"`
2. Erwartung: `$plugin->version = 2026050801`, `$plugin->release = '1.1.31'`.

**Beobachtetes Ergebnis**
Pass.

---

### test04 BFSG-Smoke nach Light-Theme-Umstellung

Feature:                feat06
Akzeptanzkriterium:     feat06.AC01, feat06.AC02
Typ:                    manuell
Status:                 pending
Letzter Lauf:           —

**Schritte**
1. Standalone-HTML im Browser öffnen.
2. Tab-Tour durch Matrix → Wizard → Detailansicht → Sprachumschalter.
3. Fokus-Indikator (3px solid `#F98012`, offset 2px) auf jedem interaktiven Element.
4. Browser-Setting `prefers-contrast: more` aktivieren → Render-Check.
5. Browser-Setting `prefers-reduced-motion: reduce` aktivieren → Render-Check (keine Animationen, Übergänge ≤ 0.01ms).

**Erwartetes Ergebnis**
Alle Punkte erfüllt; keine Tastatur-Falle.

---

### test05 WordPress-Theme-Isolation

Feature:                feat07
Akzeptanzkriterium:     feat07.AC01
Typ:                    manuell
Status:                 pending
Letzter Lauf:           —

**Schritte**
1. Test-WP mit Twenty Twenty-Four (Baseline) → Plugin aktivieren → Shortcode `[eledia_toolguide]` auf einer Seite einfügen.
2. Theme wechseln auf Astra → Sichtcheck.
3. Theme wechseln auf OceanWP → Sichtcheck.
4. Theme wechseln auf GeneratePress → Sichtcheck.
5. Bei jedem Theme: Browser-Zoom 200 % → Sichtcheck.

**Erwartetes Ergebnis**
Visuelles Erscheinungsbild ist in allen vier Themes konsistent mit dem Standalone-HTML. Keine Theme-Margin-/Padding-/Color-Durchschläge.

---

### test06 Premium-Partner-Logo erscheint im Footer

Feature:                feat01
Akzeptanzkriterium:     —
Typ:                    manuell
Status:                 pending
Letzter Lauf:           —

**Schritte**
1. App in jedem der drei Tracks öffnen.
2. Footer scrollen, Partner-Logo finden.
3. Optisch verifizieren, dass die korrekte „Premium Moodle Partner Trademark™"-Variante (Primary Colour) angezeigt wird, nicht die alte „Premium Certified Services Provider"-Vorlage.

**Erwartetes Ergebnis**
Neues Badge sichtbar, Höhe 42 px, Aspect-Ratio ca. 4:1.

---

## Regeln

- Jeder Bug bekommt eine Severity — auch S4 ist eine Severity.
- Jeder Test referenziert ein Akzeptanzkriterium aus `01-features.md`. Ein Test ohne `featXX.ACyy`-Verweis ist verdächtig (Ausnahme: visuelle Smoke-Tests, klar gekennzeichnet).
- Reproduzierbarkeit hat Vorrang vor Vermutung.
- Fixed-Status nur, wenn der zugehörige `testXX` grün ist.

---

## Grundprinzip

> Bugs sind Teil des normalen Loops, keine Ausnahme.
> Ein Test ohne Akzeptanzkriterium prüft nichts Verbindliches.
