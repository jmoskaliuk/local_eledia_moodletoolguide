# Tasks · Moodle Tool Guide

## Meta

Operatives Zentrum. Jede Session beginnt hier (nach `00-master.md`).

**Regeln:**
- Eingaben in „🆕 Neu" werden zeitnah in `taskXX` oder `qXX` umgewandelt.
- Tasks klein und ausführbar halten.
- Erledigte Items nicht löschen — nach „✅ Done" verschieben.
- Klärungen nicht im Chat versanden lassen → immer als `qXX`.

---

## 🆕 Neu

(Unstrukturierter Input — wird bei Triage in `taskXX` oder `qXX` überführt.)

---

## ❓ Klärung benötigt

### q01 Cowork-Sandbox blockiert `rm` — wie wird Repo-Cleanup künftig gehandhabt?

- **Linked:** task01, task02, task05
- **Asked-by:** KI (2026-05-08)
- **Status:** open
- **Kontext:** Mehrere untracked / obsolete Dateien können in der Cowork-Session nicht direkt gelöscht werden, weil `rm` und `mv` mit „Operation not permitted" abgelehnt werden. Auch `.git/index.lock` lässt sich aus der Session nicht entfernen, was Schreib-Git-Operationen blockiert.
- **Mögliche Antworten:**
  1. PO entfernt nach jeder Session manuell, KI listet die nötigen Befehle.
  2. KI nutzt `mcp__cowork__allow_cowork_file_delete` pro Pfad (erfordert User-Interaktion in Supervised Mode).
  3. CI-Workflow räumt obsolete Pfade beim Push automatisch auf.

---

## 📋 Tasks

Jeder Task verweist auf ein `featXX`. Vorlage und Prioritätenstufen siehe
`00-master.md` §6 bzw. [DevFlow-Master §6](https://github.com/jmoskaliuk/eLeDia.OS_DevFlow/blob/main/00-master.md#6--definition-of-done).

---

### task01 Cowork-Reste am Repo-Root entfernen

- **Status:** in_progress
- **Feature:** feat05
- **Priorität:** P1

**Ziel**
`/toolguide/`, `/local_toolguide.zip` und `/devflow/` aus dem Working Tree entfernen — der Plugin-Stand und die DevFlow-Dokumentation liegen bereits an den korrekten Stellen.

**Schritte**

1. Außerhalb der Cowork-Session ein Terminal öffnen.
2. `cd ~/Documents/Code/moodletoolguide`
3. `rm .git/index.lock` (falls Lock noch existiert)
4. `rm -rf toolguide local_toolguide.zip devflow`
5. `git status` zeigt die drei Pfade nicht mehr.

**Erwartetes Ergebnis**
Sauberes Repo ohne Duplikat-Verzeichnisse.

**Done-Checkliste**
- [ ] `git status` zeigt die Pfade nicht
- [ ] `.gitignore` ist gesetzt (verhindert Re-Tracking)

---

### task02 Obsolete Prototyp-Notizen entfernen

- **Status:** open
- **Feature:** feat05
- **Priorität:** P2
- **Linked:** task01

**Ziel**
`IconPreview_ToolGuide.html` und `Konzept_ToolGuide_Webapp.md` waren in Commit `cb43287` (2026-05-02 „Remove obsolete prototype notes") explizit gelöscht und sind nun als untracked Dateien wieder aufgetaucht. Endgültig entfernen.

**Schritte**

1. `rm IconPreview_ToolGuide.html Konzept_ToolGuide_Webapp.md`

**Erwartetes Ergebnis**
`git status` zeigt keine untracked Datei mehr aus dieser Familie.

---

### task03 `Prototyp_ToolGuide.jsx` aus Tracking entfernen

- **Status:** open
- **Feature:** feat05
- **Priorität:** P2

**Ziel**
Die JSX-Datei stammt aus dem Initial-Commit (2026-04-10), seit der Babel-in-Browser-Einführung ist sie nicht mehr Source of Truth. Aus dem Repo entfernen.

**Schritte**

1. `rm .git/index.lock` (falls Lock noch existiert).
2. `git rm Prototyp_ToolGuide.jsx`
3. Commit als Teil des nächsten Releases.

**Erwartetes Ergebnis**
`git ls-files Prototyp_ToolGuide.jsx` liefert nichts mehr.

---

### task04 Sync-Skripte: hardcodierten Session-Pfad zurücksetzen

- **Status:** open
- **Feature:** feat05
- **Priorität:** P1
- **Linked:** task01

**Ziel**
`sync_plugin_js.py` und `sync_wordpress_js.py` enthalten lokal eine hardcodierte alte Cowork-Session-ID (`/sessions/youthful-sleepy-goodall/mnt/ToolGuide`). Diese auf das portable `Path(__file__).resolve().parent` zurückführen, damit beide Skripte aus jedem Repo-Stand laufbar sind. **Außerdem prüfen:** Die WordPress-Sync hat aktuell die `wp.i18n`-Patches und die Loading-State-Removal verloren — siehe Diff.

**Schritte**

1. `git diff sync_plugin_js.py` und `git diff sync_wordpress_js.py` prüfen.
2. Style-Injection-Zeilen aus dem aktuellen `sync_plugin_js.py` behalten, aber `ROOT` zurück auf `Path(__file__).resolve().parent`.
3. `sync_wordpress_js.py` auf den HEAD-Stand zurückrollen und die WP-i18n-/Locale-/Loading-Patches reaktivieren — siehe `git show HEAD:sync_wordpress_js.py`.
4. Beide Skripte einmal laufen lassen, danach `git diff` der erzeugten JS-Dateien sichten.

**Erwartetes Ergebnis**
Beide Sync-Skripte sind portable und liefern unverändertes Plugin-JS, wenn der Prototyp identisch bleibt.

---

### task05 Partner-Logo via Static-Asset statt Data-URI ausliefern

- **Status:** open
- **Feature:** feat01, feat05
- **Priorität:** P3

**Ziel**
Das neue Premium-Moodle-Partner-PNG bringt 173 KB Base64 in jeden Bundle ein (ca. 123 KB mehr als das alte Badge). Für Plugins ist das verschmerzbar, fürs Standalone-HTML auch noch okay; aber die Architektur könnte sauberer sein:

- **Standalone:** Data-URI bleibt (Single-File-Anforderung).
- **Moodle:** PNG nach `pix/` legen, in der React-Komponente per `M.cfg.wwwroot + '/local/toolguide/pix/...'` referenzieren.
- **WordPress:** PNG nach `assets/img/`, in der Komponente per `__elediaToolguideAssetsUrl` referenzieren.

Erforderlich: einen Track-spezifischen Patch in den Sync-Skripten.

**Schritte**
- ADR vorschlagen (separates Asset-Handling pro Track) → Konsequenzen abwägen → entscheiden.

---

### task06 Sprachdateien `lang/fr/`, `lang/es/` für Moodle-Plugin

- **Status:** open
- **Feature:** feat04
- **Priorität:** P2

**Ziel**
Aktuell hat das Moodle-Plugin nur `lang/de/` und `lang/en/`. Die UI selbst kann via React vier Sprachen, aber die Moodle-Plugin-Strings (Settings-Seite, Capability-Bezeichnungen, Hilfetexte) brauchen ebenfalls FR/ES, wenn die WordPress-Variante diese Sprachen offiziell unterstützt.

---

### task07 WordPress-Sprachdateien wieder einchecken oder aus Tracking nehmen

- **Status:** open
- **Feature:** feat04
- **Priorität:** P2

**Ziel**
`wordpress-plugin/eledia-toolguide/languages/eledia-toolguide-{de_DE,es_ES,fr_FR}-eledia-toolguide.json` und `eledia-toolguide.pot` sind aktuell als „deleted" im Working Tree. Klären: bewusste Entfernung (z. B. weil `wp.i18n` aus dem JS-Bundle übersetzt) oder versehentlich?

**Erwartetes Ergebnis**
- Wenn bewusst: in `.gitignore` packen und einen Build-Schritt dokumentieren, der die JSONs zur Build-Zeit erzeugt.
- Wenn versehentlich: per `git checkout HEAD -- ...` zurückholen.

---

### task08 Audit-Doku auf Stand 1.1.31 aktualisieren

- **Status:** open
- **Feature:** feat06
- **Priorität:** P3

**Ziel**
`Accessibility_Audit_ToolGuide.md` ist auf Stand 2026-04-10 — vor der Light-Theme-Umstellung (v1.1.11) und vor dem aktuellen Partner-Logo-Update (v1.1.31). Re-Audit mit Fokus auf Header/Footer-Kontraste.

---

## 🔧 In Progress

### task01 (siehe oben)

---

## 🔎 Verifikation nach Deploy

Nach dem Release v1.1.31 zu prüfen — danach in den jeweiligen Task „PO Sign-off" abhaken.

- [ ] Standalone `Prototyp_ToolGuide.html` lokal im Browser → Footer zeigt das neue Premium-Partner-Badge.
- [ ] `html-version/index.html` separat — gleicher Sichtcheck.
- [ ] Moodle-Plugin: ZIP `moodle-plugin/local_toolguide.zip` ins Test-Moodle hochgeladen, Cache geleert, Footer-Logo geladen.
- [ ] WordPress-Plugin: ZIP `wordpress-plugin/eledia-toolguide.zip` in Test-WP installiert, Shortcode auf Twenty Twenty-Four → Footer-Logo erscheint.
- [ ] WP-Theme-Matrix: Astra, OceanWP, GeneratePress.
- [ ] BFSG-Smoke: Tab durch die App, Fokus-Indikatoren sichtbar, High-Contrast-Render in Edge auf Windows.

---

## ✅ Done

### task00 DevFlow-Dokumentation einrichten

- **Status:** done (2026-05-08)
- **Feature:** feat05 (Doku-Track)

**Ergebnis**
- `docs/00-master.md` … `docs/05-quality.md` und `docs/Playbooks/local_toolguide.md` nach dem [eLeDia.OS_DevFlow](https://github.com/jmoskaliuk/eLeDia.OS_DevFlow)-Standard angelegt.
- ID-System (`featXX`/`taskXX`/`qXX`/`bugXX`/`testXX`/`adrXX`/`relXX`) etabliert.
- ADRs `adr01`–`adr03` befüllt.

---

### task00b Partner-Logo getauscht

- **Status:** done (2026-05-08)
- **Feature:** feat01

**Ergebnis**
- `assets/PremiumMoodlePartner_TrademarkTM_PrimaryColour_RGB.png` als neues Bild abgelegt.
- `MOODLE_PARTNER_DATA` als Data-URI in 6 Dateien ersetzt: `Prototyp_ToolGuide.html`, `html-version/index.html`, beide AMD-Sources, AMD-Build (`amd/build/toolguide.min.js`), WordPress `assets/js/toolguide.js`.
- Versionen auf 1.1.31 in allen sechs üblichen Stellen.
- ZIPs neu gebaut.

---

## ✅ Geklärt

(noch keine geschlossenen Klärungen.)

---

## Grundprinzip

> Was nicht hier steht, passiert nicht.
