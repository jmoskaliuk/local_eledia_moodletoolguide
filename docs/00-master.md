# eLeDia.OS — Master · Moodle Tool Guide

> Zentraler Eintrittspunkt für dieses Projekt. Jede Session startet hier.
> DevFlow-Framework: [eLeDia.OS_DevFlow](https://github.com/jmoskaliuk/eLeDia.OS_DevFlow).

---

## 1. Projekt-Meta

- **Name:** Moodle Tool Guide
- **Repository:** [github.com/jmoskaliuk/local_eledia_moodletoolguide](https://github.com/jmoskaliuk/local_eledia_moodletoolguide)
- **Ziel:** Moodle-Lehrenden – Einsteiger:innen wie Erfahrene – auf einer einzigen Oberfläche helfen, das passende Moodle-Werkzeug für ein didaktisches Ziel zu finden. Drei Auslieferungswege (Standalone HTML, Moodle-Plugin, WordPress-Plugin) auf identischer Codebasis.
- **Kurzbeschreibung:** Interaktive React-App mit drei Zugangswegen: Matrix (Aktivität × didaktisches Ziel), Wizard (geführte Auswahl) und Detailansicht (Tool-Steckbrief). Mehrsprachig (de/en/fr/es), barrierefrei (BFSG/WCAG 2.2 AA), eLeDia-CI.
- **Aktuelle Version:** `1.1.13` (Stand: 2026-05-08; siehe `01-features.md` → Releases)
- **Tech-Stack:**
  - React 18.3.1 + Babel-in-Browser (Standalone) bzw. AMD-Modul (Moodle) bzw. Enqueue (WordPress)
  - Single-File-Source-of-Truth: `Prototyp_ToolGuide.html`
  - Sync nach Plugins via `sync_plugin_js.py` (Moodle) und `sync_wordpress_js.py` (WordPress)
  - Deploy lokal via `moodle-plugin/deploy.sh` (Orb-Docker)

---

## 2. Session-Start (für KI)

1. Dieses Dokument vollständig lesen.
2. `04-tasks.md` öffnen — operatives Tagesgeschäft + offene `qXX`.
3. Bei Moodle-Themen: Skill `moodle-framework` konsultieren (siehe §11).
4. Bei UI-Arbeit: Skill `eledia-moodle-ux` konsultieren.
5. Vor Deploy/Release: `Playbooks/local_toolguide.md` lesen.
6. Bei Unklarheit → **nicht raten**, sondern als `qXX` in `04-tasks.md` eintragen.

---

## 3. Datei-System

| Datei | Zweck |
|---|---|
| `01-features.md` | Was wird gebaut und warum (gewünschtes Verhalten, Akzeptanzkriterien, Releases) |
| `02-user-doc.md` | Bedienung aus Nutzerperspektive |
| `03-dev-doc.md` | Technische Implementierung (Ist-Zustand) |
| `04-tasks.md` | Tasks, Klärungen, operatives Tagesgeschäft |
| `05-quality.md` | Bugs (Severity) und Tests |
| `Playbooks/local_toolguide.md` | Projekt-spezifische Deploy- und Release-Mechanik |

Skills (generisches Framework-Wissen) liegen **außerhalb** dieses Repos in der Claude-Skill-Library — Verweise siehe §11.

---

## 4. ID-System

| Präfix | Bedeutung | Wo |
|---|---|---|
| `featXX` | Feature | `01-features.md` |
| `taskXX` | Task | `04-tasks.md` |
| `qXX` | Klärung | `04-tasks.md` |
| `bugXX` | Bug | `05-quality.md` |
| `testXX` | Test | `05-quality.md` |
| `adrXX` | Architektur-Entscheidung | §10 dieses Dokuments |
| `relXX` | Release | `01-features.md` |

---

## 5. Workflow

```
Idee → Feature → Task → Implementierung → Test → (Bug → Fix) → Done → Doku-Sync
```

Iterativer Loop. Drei Auslieferungswege werden in **Lockschritt** gepflegt:

```
Prototyp_ToolGuide.html  ── sync_plugin_js.py   ──► moodle-plugin/local/toolguide/amd/src/toolguide.js
                         └─ sync_wordpress_js.py ──► wordpress-plugin/eledia-toolguide/assets/js/toolguide.js
```

Versionen müssen synchron bleiben (siehe `Playbooks/local_toolguide.md` → Release-Checkliste).

---

## 6. Definition of Done

Ein Feature ist erst **done**, wenn alle drei Perspektiven konsistent sind:

- `01-features.md` — Intent klar, Akzeptanzkriterien definiert
- `02-user-doc.md` — Benutzer kann es ohne Code-Lesen bedienen
- `03-dev-doc.md` — anderer Entwickler kann es erweitern, ohne zu raten

**Plus:**
- alle verlinkten `taskXX` sind erledigt
- alle verlinkten `testXX` sind grün
- keine blockierenden `bugXX` offen
- in **allen drei Tracks** (Standalone, Moodle, WP) gleichermaßen verfügbar oder explizit ausgenommen

### Done-Checkliste pro Task

```
- [ ] 01-features.md aktualisiert (falls Verhalten geändert)
- [ ] 02-user-doc.md aktualisiert (falls UX geändert)
- [ ] 03-dev-doc.md aktualisiert (immer, wenn Code geändert)
- [ ] testXX in 05-quality.md grün
- [ ] Drei Tracks im Lockstep (Prototyp → Plugin-Sync ausgeführt)
- [ ] PO Sign-off
```

---

## 7. Nicht done, wenn …

- Doku fehlt oder veraltet ist
- Verhalten unklar oder zwischen den drei Tracks inkonsistent
- WordPress-Theme-Isolation nicht geprüft (siehe Playbook → Test-Matrix)
- BFSG-Anforderungen nicht erfüllt
- bekannte Bugs Kernfunktionalität betreffen

---

## 8. Grundprinzip

> Implementierung allein ist keine Fertigstellung.
> Ein Feature ist erst fertig, wenn es **verstanden, nutzbar und wartbar** ist —
> in **allen drei Auslieferungswegen** gleichermaßen.

---

## 9. Zusammenarbeit

### 9.1 Rollen

| Rolle | Wer | Verantwortung |
|---|---|---|
| **Product Owner (PO)** | Mensch | Ziel, Scope, Prioritäten, finales Sign-off, Releases, Plugin-Submission |
| **Architekt** | Mensch (KI berät) | Tech-Stack, ADRs, strukturelle Entscheidungen |
| **Implementer** | KI primär | Code, Tests, Tasks abarbeiten |
| **Doc-Sync** | KI primär | `01`/`02`/`03` konsistent halten |
| **QA-Reviewer** | Mensch (KI generiert Drafts) | manuelle Verifikation in den drei Tracks, BFSG, Theme-Matrix |
| **Triage** | Mensch | „🆕 Neu" → Tasks, `qXX` beantworten, Priorität setzen |

### 9.2 Befugnisse

**KI darf alleine:**
- Code für freigegebene `taskXX`
- Sync-Skripte ausführen (`sync_plugin_js.py`, `sync_wordpress_js.py`)
- Doku-Sync nach Code-Änderung
- Test-Drafts und Status-Reports
- offensichtliche Refactorings ohne Verhaltensänderung

**KI muss vorschlagen + warten bei:**
- neuen Features
- Architektur-Entscheidungen (`adrXX`)
- Library-Wechseln (z. B. React-Major-Version)
- Datenbank-Migrationen
- Lösch-Operationen
- Externe API-Calls mit Nebenwirkungen

**Nur Mensch:**
- Done-Sign-off, Releases (Tag, ZIP-Build, Push)
- Plugin-Submission ans Moodle Plugins Directory / WordPress Plugin Directory
- Privacy-/DSGVO-Entscheidungen (z. B. React-CDN vs. lokal)
- Token-/Secret-Handling
- GitHub-Personal-Access-Tokens

### 9.3 Eskalation

KI rät nicht. Unklarheit → `qXX` in `04-tasks.md` → PO antwortet → Antwort wandert ins passende Doc.

### 9.4 Traceability

- **Branch-Namen:** `feat/featXX-kurztitel`, `fix/bugXX-kurztitel`, `task/taskXX-kurztitel`
- **Commit-Messages:** beginnen mit der ID, z. B. `task07: Partner-Logo auf Premium-Badge umgestellt`
- **PR-Titel:** ID + Klartext, im Body Verweis auf Feature/Task/Bug
- **Merge erst,** wenn die Done-Checkliste aus §6 erfüllt ist
- **Tags:** `vX.Y.Z` nach Stable-Tag-Bumps in allen vier Readmes (`Playbooks/local_toolguide.md` → Release-Checkliste)

---

## 10. Architektur-Entscheidungen (ADR)

ADRs leben **inline hier**, nicht in separaten Dateien.

### Vorlage

```
### adrXX Titel der Entscheidung

- **Datum:** YYYY-MM-DD
- **Status:** vorgeschlagen | beschlossen | abgelöst durch adrYY
- **Kontext:** Welches Problem?
- **Optionen:** A | B | C
- **Entscheidung:** Was wurde gewählt?
- **Konsequenzen:** Was zieht das nach sich?
```

### Aktive ADRs

#### adr01 Single-File-Prototyp als Source of Truth

- **Datum:** 2026-04-10
- **Status:** beschlossen
- **Kontext:** Drei Auslieferungswege (Standalone HTML, Moodle-Plugin, WP-Plugin) müssen verhalten- und versionsgleich gepflegt werden. Es gibt keinen Build-Server.
- **Optionen:**
  - A) Drei separate Codebasen pflegen (manuell synchron halten)
  - B) Monorepo mit gemeinsamer Library und drei Hosts
  - C) Single-File-Prototyp + Sync-Skripte in beide Plugin-Tracks
- **Entscheidung:** C — `Prototyp_ToolGuide.html` ist die Quelle, `sync_plugin_js.py` / `sync_wordpress_js.py` extrahieren den Babel-Block und passen den Mount-Punkt an.
- **Konsequenzen:** Nur eine Datei für inhaltliche Änderungen. Sync-Skripte müssen die Mount-Anpassungen (`#root` → `#toolguide-root` / `.eledia-toolguide-root`) und Track-spezifische Patches (z. B. WP-`wp.i18n`-Integration) verlässlich abbilden. Drift zwischen Tracks → fehlender Sync-Lauf.

#### adr02 React via CDN, mit lokalem Fallback für DSGVO-sensitive Installationen

- **Datum:** 2026-04-22
- **Status:** beschlossen
- **Kontext:** WordPress-Plugin soll out-of-the-box laufen, aber DSGVO-strenge Setups dürfen keine Drittserver-Anbindung haben.
- **Optionen:**
  - A) React immer aus CDN (unpkg)
  - B) React immer mitliefern (vendored)
  - C) Hybrid: CDN-Default, lokal wenn `assets/js/vendor/react*.min.js` existiert
- **Entscheidung:** C — `file_exists()`-Check in `enqueue_scripts()` schaltet automatisch um.
- **Konsequenzen:** Leichter Plugin-ZIP, aber zwei Distribution-Pfade müssen dokumentiert sein. Vendor-Files sind in `.gitignore`, nicht im Git-Tree.

#### adr03 Light-Theme-Header/Footer auf warmem Beige

- **Datum:** 2026-04-25 (eingeführt v1.1.11)
- **Status:** beschlossen
- **Kontext:** Ursprünglicher dunkelblauer Gradient-Header verursachte (a) Full-Bleed-White-Strip auf breiten Bildschirmen und (b) unvorhersehbares Verhalten bei High-Contrast/High-Zoom.
- **Optionen:**
  - A) Gradient mit Full-Bleed-Hack reparieren
  - B) Auf flache CI-Farbe wechseln, Header neu denken
- **Entscheidung:** B — `#FFECDB` (warmes Beige) als Header- und Footer-Hintergrund, dunkelblauer Text `#194866`.
- **Konsequenzen:** Bessere Barrierefreiheit (8.9:1 AAA-Kontrast für Text). Logos und Badges müssen auf Beige getestet werden — verifiziert via ImageMagick-Render.

---

## 11. Skills (extern)

Generisches Moodle-/Design-/Accessibility-Wissen liegt **außerhalb** dieses Repos in der Claude-Skill-Library:

| Skill | Trigger |
|---|---|
| `moodle-framework` | jede Moodle-Aufgabe |
| `moodle-dev` | Plugin-Architektur, APIs |
| `moodle-deploy` | Deploy auf Orb-Docker, `purge_caches`, `upgrade.php` |
| `moodle-plugin-submit` | Submission ans Plugins Directory / Marketplace |
| `eledia-moodle-ux` | UI-Arbeit, eLeDia-Stil |
| `webui-accessibility-auditor` | BFSG-/WCAG-Prüfung |

Bei Drift zwischen Skill und Projektkontext: Prompt **`#refresh`**.

---

## 12. Prompt-Shortcuts

`#status`, `#next`, `#plan`, `#refine`, `#implement`, `#test`, `#bugs`, `#verify`, `#doc`, `#userdoc`, `#devdoc`, `#consistency`, `#review`, `#refresh` — Definitionen siehe [eLeDia.OS_DevFlow/00-master.md §12](https://github.com/jmoskaliuk/eLeDia.OS_DevFlow/blob/main/00-master.md#12-prompt-shortcuts).

---

## 13. Empfohlener Tagesablauf

1. `#status`
2. `#next`
3. `#implement` (1–2 Tasks)
4. `#test`
5. `#doc`
6. Bei Release: Checkliste in `Playbooks/local_toolguide.md` durchgehen.

---
