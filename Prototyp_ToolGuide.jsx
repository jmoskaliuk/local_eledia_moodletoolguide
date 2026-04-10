import { useState, useMemo } from "react";

const TOOLS = [
  { id:"datei", name:"Datei", desc:"Datei hochladen (z.B. Word, PDF, PowerPoint)", complexity:"einfach", complexityText:"Einfach wie ein E-Mail Anhang.", bloom:"2/6", goals:{ info:{r:"grün",t:"Ja. Lehrende laden Dateien zur Information hoch."}, bewerten:{r:"rot",t:"Nein. Stattdessen: Kenntnisse über Forum oder Aufgabe erfassen."}, komm:{r:"rot",t:"Nein. Keine direkte Option zur Interaktion oder Kommunikation."}, collab:{r:"rot",t:"Nein. Stattdessen: Foren, Wikis und Glossare nutzen."}, bloomG:{r:"rot",t:"Ist keine Lernaktivität, sondern reine Infovermittlung."}}},
  { id:"verzeichnis", name:"Verzeichnis", desc:"Eine Reihe von Dateien hochladen", complexity:"einfach", complexityText:"Einfach wie ein E-Mail Anhang.", bloom:"2/6", goals:{ info:{r:"grün",t:"Ja. Dateien in Ordner hochladen ist Trainer/innensache."}, bewerten:{r:"rot",t:"Nein. Stattdessen: Kenntnisse über Forum oder Aufgabe erfassen."}, komm:{r:"rot",t:"Nein. Keine direkte Option zur Interaktion."}, collab:{r:"orange",t:"Sammeln und Teilen von Dateien möglich. Erfordert Rollenanpassung."}, bloomG:{r:"rot",t:"Ist keine Lernaktivität, sondern reine Infovermittlung."}}},
  { id:"textseite", name:"Textseite", desc:"Eine Seite mit Texten in Moodle erstellen", complexity:"einfach", complexityText:"Einfach. Text formatieren, Bilder und Videos ergänzen.", bloom:"2/6", goals:{ info:{r:"grün",t:"Ja. Nur Lehrende erstellen diese Seiten."}, bewerten:{r:"rot",t:"Nein. Stattdessen: Kenntnisse über Forum oder Aufgabe erfassen."}, komm:{r:"rot",t:"Nein. Keine direkte Option zur Interaktion."}, collab:{r:"orange",t:"Gemeinsames Erstellen möglich. Erfordert Rollenanpassung."}, bloomG:{r:"rot",t:"Ist keine Lernaktivität, sondern reine Infovermittlung."}}},
  { id:"buch", name:"Buch", desc:"Eine Reihe von Textseiten in Moodle erstellen", complexity:"einfach", complexityText:"Einfach. Text formatieren, Bilder und Videos ergänzen.", bloom:"2/6", goals:{ info:{r:"grün",t:"Gutes Tool zur Vermittlung von Informationen. Drucken möglich."}, bewerten:{r:"rot",t:"Nein. Stattdessen: Lektion, Forum oder Aufgabe nutzen."}, komm:{r:"rot",t:"Nein. Keine direkte Option zur Interaktion."}, collab:{r:"orange",t:"Gemeinsames Erstellen möglich. Erfordert Rollenanpassung."}, bloomG:{r:"rot",t:"Ist keine Lernaktivität, sondern reine Infovermittlung."}}},
  { id:"url", name:"URL", desc:"Link zu einer Webseite", complexity:"einfach", complexityText:"Einfach. Web-Adresse finden und einfügen.", bloom:"6/6", goals:{ info:{r:"grün",t:"Komfortable Möglichkeit, externe Infos bereitzustellen."}, bewerten:{r:"orange",t:"Nicht direkt. Verlinkung auf externe Prüfungstools."}, komm:{r:"orange",t:"Nicht direkt. Verlinkung auf externe Kommunikationstools."}, collab:{r:"orange",t:"Nicht direkt. Verlinkung auf externe Kooperationswerkzeuge."}, bloomG:{r:"grün",t:"6/6 möglich. Abhängig vom Inhalt der verlinkten Seite."}}},
  { id:"wiki", name:"Wiki", desc:"Gemeinsam in der Gruppe Texte erstellen", complexity:"mittel", complexityText:"Erfordert Auseinandersetzung mit Wikiprinzip.", bloom:"6/6", goals:{ info:{r:"grün",t:"Ja. Als Info-Seite nutzen. Bearbeiten durch alle im Kurs."}, bewerten:{r:"grün",t:"Flexibel einsetzbar, z.B. Bewertung der erstellten Wiki-Inhalte."}, komm:{r:"orange",t:"Teilweise für Diskussionen geeignet. Kommentare zu Wiki-Inhalten."}, collab:{r:"grün",t:"Ja. Teilnehmende können kooperativ arbeiten und diskutieren."}, bloomG:{r:"grün",t:"6/6 möglich. Abhängig vom Einsatzszenario."}}},
  { id:"glossar", name:"Glossar", desc:"Informationen präsentieren und gemeinsam erstellen", complexity:"einfach", complexityText:"Einfach. Kann flexibel eingestellt werden.", bloom:"6/6", goals:{ info:{r:"grün",t:"Glossar für Begriffsdefinitionen."}, bewerten:{r:"grün",t:"Glossareinträge erstellen lassen und dann bewerten."}, komm:{r:"orange",t:"Teilweise. Einträge können kommentiert werden."}, collab:{r:"orange",t:"Autor/in kann bearbeiten. Teilnehmende kommentieren."}, bloomG:{r:"grün",t:"6/6 möglich. Abhängig vom Einsatzszenario."}}},
  { id:"datenbank", name:"Datenbank", desc:"Materialien sammeln, teilen & suchen", complexity:"komplex", complexityText:"Schwierig anzulegen. Vorher Aufbau planen!", bloom:"6/6", goals:{ info:{r:"orange",t:"Lehrende können Material präsentieren. Besser: TN tragen Daten ein."}, bewerten:{r:"grün",t:"Ja. Inhalte können bewertet werden. Flexibel einsetzbar."}, komm:{r:"orange",t:"Teilweise. Einträge können kommentiert werden."}, collab:{r:"orange",t:"Autor/in kann bearbeiten. Teilnehmende kommentieren."}, bloomG:{r:"grün",t:"6/6 möglich. Abhängig vom Einsatzszenario."}}},
  { id:"umfrage", name:"Umfrage", desc:"Befragung mit vordefinierten Fragen", complexity:"einfach", complexityText:"Einfach. Aus 3 Typen wählen.", bloom:"2/6", goals:{ info:{r:"rot",t:"Nein. Die Umfrage ist ungeeignet zur Informationsverteilung."}, bewerten:{r:"rot",t:"Eher nicht. Besser zur Evaluation des Kurses."}, komm:{r:"rot",t:"Nein. Nur Einweg-Kommunikation: TN an Lehrende."}, collab:{r:"rot",t:"Nein. Rein individuelle Aktivität."}, bloomG:{r:"orange",t:"Hilft Teilnehmenden Lernprozess zu reflektieren."}}},
  { id:"feedback", name:"Feedback", desc:"Erstelle selbst Evaluationsfragebögen", complexity:"einfach", complexityText:"Einfach in Bedienung. Zeitaufwand für Fragen.", bloom:"6/6", goals:{ info:{r:"rot",t:"Nein. Nicht zur Informationsverteilung vorgesehen."}, bewerten:{r:"rot",t:"Nein. Evaluationen generieren Feedback für Lehrende."}, komm:{r:"rot",t:"Nein. Nur Einweg-Kommunikation."}, collab:{r:"rot",t:"Nein. Rein individuelle Aktivität."}, bloomG:{r:"orange",t:"Kann kreativ gestaltet werden."}}},
  { id:"abstimmung", name:"Abstimmung", desc:"Teilnehmende stimmen über eine Frage ab", complexity:"einfach", complexityText:"Einfach. Frage(n) und Antworten anlegen.", bloom:"2/6", goals:{ info:{r:"rot",t:"Nein. Hauptsächlich zur schnellen Abfrage zu einem Thema."}, bewerten:{r:"grün",t:"Als Schnellabfrage einer Fragestellung verwenden."}, komm:{r:"rot",t:"Nein. Besser Forum oder Chat nutzen."}, collab:{r:"rot",t:"Nein. Besser Forum, Glossar oder Wiki nutzen."}, bloomG:{r:"orange",t:"Erlaubt einfache Abfrage von Wissen und Verständnis."}}},
  { id:"test", name:"Test", desc:"Testfragen mit automatischer Bewertung", complexity:"mittel", complexityText:"Zeitaufwand beim Erstellen. Auswertung automatisch.", bloom:"6/6", goals:{ info:{r:"rot",t:"Zielt auf Bewertung, nicht Verteilung von Informationen."}, bewerten:{r:"grün",t:"Ja. Für Fragen mit eindeutiger Antwort. Automatisch."}, komm:{r:"rot",t:"Nein. Besser Forum oder Chat nutzen."}, collab:{r:"rot",t:"Nein. Besser Forum oder Wiki nutzen."}, bloomG:{r:"grün",t:"Durch kreativen Umgang vielfältig einsetzbar."}}},
  { id:"lektion", name:"Lektion", desc:"Informationen und Testfragen seitenweise aufbauen", complexity:"mittel", complexityText:"Erfordert Planung, dann effektive Lernaktivität.", bloom:"6/6", goals:{ info:{r:"grün",t:"Gut geeignet für geführte Informationspräsentation."}, bewerten:{r:"grün",t:"Ja, erlaubt Bewertung durch integrierte Testfragen."}, komm:{r:"rot",t:"Nein. Teilnehmende arbeiten einzeln."}, collab:{r:"rot",t:"Nein. Teilnehmende arbeiten einzeln."}, bloomG:{r:"grün",t:"Durch kreativen Umgang vielfältig einsetzbar."}}},
  { id:"aufgabe", name:"Aufgabe", desc:"Aufgabenstellung mit individueller Bewertung", complexity:"einfach", complexityText:"Einfach. Auswahl aus vier Aufgabentypen.", bloom:"6/6", goals:{ info:{r:"rot",t:"Nein. Kann aber Inhalte für Aufgabenstellung enthalten."}, bewerten:{r:"grün",t:"Ja. Individuelle Bewertung mit Note und Kommentar."}, komm:{r:"rot",t:"Wenig Interaktion. Außer: wiederholte Abgabe mit Feedback."}, collab:{r:"orange",t:"Gruppenmitglied gibt stellvertretend Lösung ab."}, bloomG:{r:"grün",t:"Abhängig von Aufgabenformulierung und Beurteilungsform."}}},
  { id:"beurteilung", name:"Gegenseitige Beurteilung", desc:"Aufgabe mit Peer-Feedback", complexity:"komplex", complexityText:"Erfordert sorgfältige Planung.", bloom:"6/6", goals:{ info:{r:"rot",t:"Nein. Ein anderes Tool verwenden."}, bewerten:{r:"grün",t:"Ja. Peer-Bewertung. TN beurteilen Lösungen anderer."}, komm:{r:"rot",t:"Nein. Erlaubt nur Feedback, keine Kommunikation."}, collab:{r:"rot",t:"Nein. Für Gruppenaufgaben Forum oder Wiki nutzen."}, bloomG:{r:"grün",t:"Abhängig von Aufgabenformulierung und Beurteilungsform."}}},
  { id:"lernpaket", name:"Lernpaket", desc:"Lerninhalte im Format SCORM einbinden", complexity:"komplex", complexityText:"Erfordert Software oder Kauf von Inhalten.", bloom:"6/6", goals:{ info:{r:"grün",t:"Ja. Gut geeignet für Informationsvermittlung."}, bewerten:{r:"grün",t:"Ja, Bewertungen können integriert sein."}, komm:{r:"rot",t:"Nein. Teilnehmende arbeiten einzeln."}, collab:{r:"rot",t:"Nein. Teilnehmende arbeiten einzeln."}, bloomG:{r:"grün",t:"Durch kreativen Umgang vielfältig einsetzbar."}}},
  { id:"chat", name:"Chat", desc:"Echtzeit Text-Chat mit Teilnehmenden", complexity:"einfach", complexityText:"Einfach. Erfordert Moderation, kleine Gruppen.", bloom:"6/6", goals:{ info:{r:"orange",t:"Erfordert Anwesenheit zum Zeitpunkt des Chats."}, bewerten:{r:"orange",t:"Chatbeiträge können wie mündliche Mitarbeit bewertet werden."}, komm:{r:"grün",t:"Ja. Diskussionen in kleinen Gruppen oder Fragestunden."}, collab:{r:"grün",t:"Ja. Teilnehmende können zusammen arbeiten und diskutieren."}, bloomG:{r:"grün",t:"Kann mit kleinen Gruppen kreativ genutzt werden."}}},
  { id:"forum", name:"Forum", desc:"Für vielfältige Lernstrategien verwendbar", complexity:"einfach", complexityText:"Einfach. Titel und Beschreibung genügen.", bloom:"6/6", goals:{ info:{r:"grün",t:"Ja. Nachrichtenforum und Mail-Benachrichtigung."}, bewerten:{r:"orange",t:"Jein. Beiträge können für einen Zeitraum bewertet werden."}, komm:{r:"grün",t:"Ja. Zeitversetzte Kommunikation. Kursgruppen nutzbar."}, collab:{r:"grün",t:"Ja. TN tauschen sich beim Erstellen von Inhalten aus."}, bloomG:{r:"grün",t:"Kann auch mit großen Gruppen kreativ genutzt werden."}}},
  { id:"extern", name:"Externes Tool", desc:"Externe Lernaktivität verbinden (LTI)", complexity:"komplex", complexityText:"Erfordert Zugangsdaten zu externen Anbietern.", bloom:"6/6", goals:{ info:{r:"orange",t:"Abhängig vom verbundenen Tool."}, bewerten:{r:"orange",t:"Bewertungen können nach Moodle übertragen werden."}, komm:{r:"orange",t:"Abhängig vom verbundenen Tool."}, collab:{r:"orange",t:"Abhängig vom verbundenen Tool."}, bloomG:{r:"orange",t:"Hängt vom verbundenen Tool ab."}}},
  { id:"h5p", name:"H5P", desc:"Werkzeuge für interaktive Inhalte", complexity:"einfach", complexityText:"Einfache Bedienung durch Formulare.", bloom:"6/6", goals:{ info:{r:"grün",t:"Ja. Gute Visualisierung von Informationen."}, bewerten:{r:"grün",t:"Ja. Automatische Bewertung."}, komm:{r:"rot",t:"Nein. Keine Kommunikation möglich."}, collab:{r:"rot",t:"Nein. Teilnehmende arbeiten einzeln."}, bloomG:{r:"grün",t:"Vielfältige Unterstützung von Lernszenarien."}}},
  { id:"bbb", name:"BigBlueButton", desc:"Videokonferenz, Whiteboard, Chat", complexity:"einfach", complexityText:"Einfache Bedienung.", bloom:"6/6", goals:{ info:{r:"grün",t:"Ja. Vorträge und Präsentationen werden live gehalten."}, bewerten:{r:"orange",t:"Begrenzt: Geeignet für Einzel-/Kleingruppenprüfungen."}, komm:{r:"grün",t:"Ja. Gespräche, Videocalls, Chats möglich."}, collab:{r:"grün",t:"Ja, mittels Whiteboard und gemeinsamen Notizen."}, bloomG:{r:"grün",t:"Vielfältige Unterstützung von Lernszenarien."}}},
];

const GOALS = [
  { key:"info", label:"Information & Transfer", icon:"📚", question:"Ist es geeignet zur Weitergabe von Informationen?" },
  { key:"bewerten", label:"Bewerten", icon:"✅", question:"Ermöglicht es, den Kenntnisstand zu erfassen?" },
  { key:"komm", label:"Kommunikation & Interaktion", icon:"💬", question:"Kann es zur Kommunikation genutzt werden?" },
  { key:"collab", label:"Gemeinsam Inhalte erstellen", icon:"🤝", question:"Können Inhalte kooperativ erstellt werden?" },
  { key:"bloomG", label:"Bloom's Lernziele", icon:"🎯", question:"Welche Lernziele werden unterstützt?" },
];

const BLOOM_LEVELS = ["Wiedergeben","Verstehen","Anwenden","Analysieren","Übertragen","Bewerten"];

const ratingColor = (r) => r === "grün" ? "#16a34a" : r === "orange" ? "#ea580c" : "#dc2626";
const ratingBg = (r) => r === "grün" ? "#dcfce7" : r === "orange" ? "#fff7ed" : "#fef2f2";
const ratingLabel = (r) => r === "grün" ? "Gut geeignet" : r === "orange" ? "Teilweise geeignet" : "Ungeeignet";
const complexityIcon = (c) => c === "einfach" ? "⭐" : c === "mittel" ? "⭐⭐" : "⭐⭐⭐";

function RatingDot({ rating, size = 16 }) {
  return <span style={{ display:"inline-block", width:size, height:size, borderRadius:"50%", backgroundColor:ratingColor(rating), border:"2px solid white", boxShadow:"0 1px 3px rgba(0,0,0,0.2)" }} title={ratingLabel(rating)} />;
}

function ToolCard({ tool, onSelect, onCompare, isComparing }) {
  const greens = Object.values(tool.goals).filter(g => g.r === "grün").length;
  return (
    <div onClick={() => onSelect(tool)} style={{ background:"white", borderRadius:12, padding:20, cursor:"pointer", boxShadow:"0 1px 3px rgba(0,0,0,0.1)", border: isComparing ? "2px solid #f97316" : "2px solid transparent", transition:"all 0.2s" }}
      onMouseEnter={e => { if (!isComparing) e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.1)"; e.currentTarget.style.transform = "none"; }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:8 }}>
        <h3 style={{ margin:0, fontSize:18, color:"#1e293b" }}>{tool.name}</h3>
        <span style={{ fontSize:12, color:"#64748b", background:"#f1f5f9", padding:"2px 8px", borderRadius:12 }}>{complexityIcon(tool.complexity)}</span>
      </div>
      <p style={{ margin:"0 0 12px", fontSize:13, color:"#64748b", lineHeight:1.4 }}>{tool.desc}</p>
      <div style={{ display:"flex", gap:6, marginBottom:12 }}>
        {GOALS.map(g => <RatingDot key={g.key} rating={tool.goals[g.key].r} />)}
      </div>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <span style={{ fontSize:12, color:"#64748b" }}>Bloom: {tool.bloom}</span>
        <button onClick={e => { e.stopPropagation(); onCompare(tool.id); }}
          style={{ fontSize:11, padding:"4px 10px", borderRadius:6, border: isComparing ? "1px solid #f97316" : "1px solid #d1d5db", background: isComparing ? "#fff7ed" : "white", color: isComparing ? "#f97316" : "#64748b", cursor:"pointer" }}>
          {isComparing ? "✓ Im Vergleich" : "+ Vergleichen"}
        </button>
      </div>
    </div>
  );
}

function MatrixView({ tools, onSelect, filters }) {
  const filtered = tools.filter(t => {
    if (filters.complexity && t.complexity !== filters.complexity) return false;
    if (filters.bloomMin && parseInt(t.bloom) < filters.bloomMin) return false;
    if (filters.goal) { const r = t.goals[filters.goal]?.r; if (filters.onlyGreen && r !== "grün") return false; }
    return true;
  });
  return (
    <div style={{ overflowX:"auto" }}>
      <table style={{ width:"100%", borderCollapse:"separate", borderSpacing:0, fontSize:13 }}>
        <thead>
          <tr>
            <th style={{ position:"sticky", left:0, background:"#1e293b", color:"white", padding:"10px 14px", textAlign:"left", borderRadius:"8px 0 0 0", zIndex:2, minWidth:120 }}>Aktivität</th>
            {GOALS.map((g,i) => (
              <th key={g.key} style={{ background:"#1e293b", color:"white", padding:"10px 12px", textAlign:"center", minWidth:100, borderRadius: i === GOALS.length-1 ? "0 8px 0 0" : 0 }}>
                <div>{g.icon}</div><div style={{ fontSize:11, marginTop:2 }}>{g.label}</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filtered.map((tool, idx) => (
            <tr key={tool.id} onClick={() => onSelect(tool)} style={{ cursor:"pointer", background: idx % 2 === 0 ? "white" : "#f8fafc" }}
              onMouseEnter={e => e.currentTarget.style.background="#eff6ff"} onMouseLeave={e => e.currentTarget.style.background = idx % 2 === 0 ? "white" : "#f8fafc"}>
              <td style={{ position:"sticky", left:0, background:"inherit", padding:"10px 14px", fontWeight:600, borderBottom:"1px solid #e2e8f0", zIndex:1 }}>
                <div>{tool.name}</div><div style={{ fontSize:11, fontWeight:400, color:"#94a3b8" }}>{complexityIcon(tool.complexity)} {tool.bloom}</div>
              </td>
              {GOALS.map(g => (
                <td key={g.key} style={{ padding:8, textAlign:"center", borderBottom:"1px solid #e2e8f0" }}>
                  <div style={{ background: ratingBg(tool.goals[g.key].r), borderRadius:8, padding:"8px 6px", position:"relative" }}>
                    <RatingDot rating={tool.goals[g.key].r} />
                    <div style={{ fontSize:10, marginTop:4, color:"#475569", lineHeight:1.3 }}>{tool.goals[g.key].t.slice(0, 60)}{tool.goals[g.key].t.length > 60 ? "…" : ""}</div>
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function DetailModal({ tool, onClose }) {
  if (!tool) return null;
  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.5)", zIndex:100, display:"flex", justifyContent:"center", alignItems:"center", padding:20 }} onClick={onClose}>
      <div style={{ background:"white", borderRadius:16, maxWidth:700, width:"100%", maxHeight:"85vh", overflow:"auto", padding:32 }} onClick={e => e.stopPropagation()}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:20 }}>
          <div>
            <h2 style={{ margin:0, fontSize:24, color:"#1e293b" }}>{tool.name}</h2>
            <p style={{ margin:"4px 0 0", color:"#64748b" }}>{tool.desc}</p>
          </div>
          <button onClick={onClose} style={{ background:"none", border:"none", fontSize:24, cursor:"pointer", color:"#94a3b8", padding:4 }}>×</button>
        </div>
        <div style={{ display:"flex", gap:12, marginBottom:20, flexWrap:"wrap" }}>
          <span style={{ background:"#f1f5f9", padding:"6px 14px", borderRadius:20, fontSize:13 }}>Komplexität: {complexityIcon(tool.complexity)} {tool.complexity}</span>
          <span style={{ background:"#f1f5f9", padding:"6px 14px", borderRadius:20, fontSize:13 }}>Bloom: {tool.bloom}</span>
        </div>
        <p style={{ fontSize:14, color:"#475569", lineHeight:1.5, margin:"0 0 24px", padding:12, background:"#f8fafc", borderRadius:8 }}>{tool.complexityText}</p>
        <h3 style={{ fontSize:16, margin:"0 0 16px", color:"#1e293b" }}>Eignung nach didaktischem Ziel</h3>
        {GOALS.map(g => (
          <div key={g.key} style={{ marginBottom:12, padding:14, background:ratingBg(tool.goals[g.key].r), borderRadius:10, borderLeft:`4px solid ${ratingColor(tool.goals[g.key].r)}` }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:6 }}>
              <span style={{ fontWeight:600, fontSize:14 }}>{g.icon} {g.label}</span>
              <span style={{ fontSize:12, color:ratingColor(tool.goals[g.key].r), fontWeight:600 }}>{ratingLabel(tool.goals[g.key].r)}</span>
            </div>
            <p style={{ margin:0, fontSize:13, color:"#475569", lineHeight:1.5 }}>{tool.goals[g.key].t}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function CompareView({ toolIds, tools, onClose }) {
  const items = toolIds.map(id => tools.find(t => t.id === id)).filter(Boolean);
  if (items.length < 2) return null;
  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.5)", zIndex:100, display:"flex", justifyContent:"center", alignItems:"center", padding:20 }} onClick={onClose}>
      <div style={{ background:"white", borderRadius:16, maxWidth:900, width:"100%", maxHeight:"85vh", overflow:"auto", padding:32 }} onClick={e => e.stopPropagation()}>
        <div style={{ display:"flex", justifyContent:"space-between", marginBottom:24 }}>
          <h2 style={{ margin:0, fontSize:22 }}>Vergleich</h2>
          <button onClick={onClose} style={{ background:"none", border:"none", fontSize:24, cursor:"pointer", color:"#94a3b8" }}>×</button>
        </div>
        <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
          <thead>
            <tr>
              <th style={{ textAlign:"left", padding:10, borderBottom:"2px solid #e2e8f0", width:"25%" }}></th>
              {items.map(t => <th key={t.id} style={{ textAlign:"center", padding:10, borderBottom:"2px solid #e2e8f0", fontSize:16 }}>{t.name}</th>)}
            </tr>
          </thead>
          <tbody>
            <tr><td style={{ padding:10, fontWeight:600, borderBottom:"1px solid #f1f5f9" }}>Beschreibung</td>
              {items.map(t => <td key={t.id} style={{ padding:10, textAlign:"center", borderBottom:"1px solid #f1f5f9", color:"#475569" }}>{t.desc}</td>)}</tr>
            <tr><td style={{ padding:10, fontWeight:600, borderBottom:"1px solid #f1f5f9" }}>Komplexität</td>
              {items.map(t => <td key={t.id} style={{ padding:10, textAlign:"center", borderBottom:"1px solid #f1f5f9" }}>{complexityIcon(t.complexity)} {t.complexity}</td>)}</tr>
            <tr><td style={{ padding:10, fontWeight:600, borderBottom:"1px solid #f1f5f9" }}>Bloom</td>
              {items.map(t => <td key={t.id} style={{ padding:10, textAlign:"center", borderBottom:"1px solid #f1f5f9" }}>{t.bloom}</td>)}</tr>
            {GOALS.map(g => {
              const ratings = items.map(t => t.goals[g.key].r);
              const best = ratings.includes("grün") ? "grün" : ratings.includes("orange") ? "orange" : "rot";
              return (
                <tr key={g.key}>
                  <td style={{ padding:10, fontWeight:600, borderBottom:"1px solid #f1f5f9" }}>{g.icon} {g.label}</td>
                  {items.map(t => {
                    const isBest = t.goals[g.key].r === best && ratings.filter(r => r === best).length === 1;
                    return (
                      <td key={t.id} style={{ padding:10, textAlign:"center", borderBottom:"1px solid #f1f5f9", background: isBest ? ratingBg(best) : "transparent" }}>
                        <RatingDot rating={t.goals[g.key].r} /><br/>
                        <span style={{ fontSize:11, color:"#64748b" }}>{t.goals[g.key].t.slice(0,50)}…</span>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function WizardView({ tools, onSelect }) {
  const [step, setStep] = useState(0);
  const [goal, setGoal] = useState(null);
  const [complexity, setComplexity] = useState(null);
  const [bloomMin, setBloomMin] = useState(0);

  const results = useMemo(() => {
    if (step < 3) return [];
    return tools.filter(t => {
      if (goal && t.goals[goal]?.r === "rot") return false;
      if (complexity && t.complexity !== complexity) return false;
      if (bloomMin > 0 && parseInt(t.bloom) < bloomMin) return false;
      return true;
    }).sort((a, b) => {
      if (!goal) return 0;
      const order = { "grün": 0, "orange": 1, "rot": 2 };
      return (order[a.goals[goal].r] || 0) - (order[b.goals[goal].r] || 0);
    });
  }, [step, goal, complexity, bloomMin, tools]);

  const stepStyle = (active) => ({ padding:"8px 16px", borderRadius:20, fontSize:13, fontWeight: active ? 600 : 400, background: active ? "#1e293b" : "#f1f5f9", color: active ? "white" : "#64748b" });
  const optBtn = (selected, onClick, children) => (
    <button onClick={onClick} style={{ padding:"16px 20px", borderRadius:12, border: selected ? "2px solid #f97316" : "2px solid #e2e8f0", background: selected ? "#fff7ed" : "white", cursor:"pointer", textAlign:"left", fontSize:14, transition:"all 0.15s" }}>
      {children}
    </button>
  );

  return (
    <div style={{ maxWidth:600, margin:"0 auto" }}>
      <div style={{ display:"flex", gap:8, marginBottom:32, justifyContent:"center" }}>
        {["Ziel","Komplexität","Bloom","Ergebnis"].map((s,i) => <span key={i} style={stepStyle(i === step)}>{i+1}. {s}</span>)}
      </div>
      {step === 0 && (
        <div>
          <h3 style={{ textAlign:"center", marginBottom:20, color:"#1e293b" }}>Was möchtest du erreichen?</h3>
          <div style={{ display:"grid", gap:10 }}>
            {GOALS.filter(g => g.key !== "bloomG").map(g => optBtn(goal === g.key, () => { setGoal(g.key); setStep(1); },
              <div><strong>{g.icon} {g.label}</strong><br/><span style={{ fontSize:12, color:"#64748b" }}>{g.question}</span></div>
            ))}
          </div>
        </div>
      )}
      {step === 1 && (
        <div>
          <h3 style={{ textAlign:"center", marginBottom:20, color:"#1e293b" }}>Wie komplex darf es sein?</h3>
          <div style={{ display:"grid", gap:10 }}>
            {[["einfach","Schnell eingerichtet, wenig Einarbeitung"],["mittel","Etwas Planung nötig, aber gut machbar"],["komplex","Braucht Vorbereitung, dafür sehr flexibel"]].map(([c,d]) =>
              optBtn(complexity === c, () => { setComplexity(c); setStep(2); },
                <div><strong>{complexityIcon(c)} {c.charAt(0).toUpperCase()+c.slice(1)}</strong><br/><span style={{ fontSize:12, color:"#64748b" }}>{d}</span></div>
              )
            )}
            {optBtn(complexity === null, () => { setComplexity(null); setStep(2); }, <div><strong>Egal</strong><br/><span style={{ fontSize:12, color:"#64748b" }}>Komplexität spielt keine Rolle</span></div>)}
          </div>
        </div>
      )}
      {step === 2 && (
        <div>
          <h3 style={{ textAlign:"center", marginBottom:20, color:"#1e293b" }}>Welche Bloom-Stufe mindestens?</h3>
          <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:4 }}>
            {BLOOM_LEVELS.map((l,i) => {
              const lvl = i + 1;
              const w = 100 + (5 - i) * 30;
              return (
                <button key={i} onClick={() => { setBloomMin(lvl); setStep(3); }}
                  style={{ width:w, padding:"10px 0", borderRadius:6, border: bloomMin === lvl ? "2px solid #f97316" : "2px solid #e2e8f0", background: bloomMin === lvl ? "#fff7ed" : `hsl(${200 + i * 25}, 60%, ${95 - i * 5}%)`, cursor:"pointer", fontSize:13, fontWeight:500, transition:"all 0.15s" }}>
                  {lvl}. {l}
                </button>
              );
            })}
            <button onClick={() => { setBloomMin(0); setStep(3); }} style={{ marginTop:8, padding:"8px 20px", borderRadius:6, border:"1px solid #d1d5db", background:"white", cursor:"pointer", fontSize:13 }}>Egal / Alle anzeigen</button>
          </div>
        </div>
      )}
      {step === 3 && (
        <div>
          <h3 style={{ textAlign:"center", marginBottom:4, color:"#1e293b" }}>{results.length} passende Tools gefunden</h3>
          <p style={{ textAlign:"center", color:"#64748b", fontSize:13, marginBottom:20 }}>
            {goal && GOALS.find(g=>g.key===goal)?.label}{complexity ? ` · ${complexity}` : ""}{bloomMin > 0 ? ` · ab Bloom ${bloomMin}` : ""}
          </p>
          <div style={{ display:"grid", gap:10 }}>
            {results.map(t => (
              <div key={t.id} onClick={() => onSelect(t)} style={{ display:"flex", alignItems:"center", gap:14, padding:14, background:"white", borderRadius:10, border:"1px solid #e2e8f0", cursor:"pointer", transition:"all 0.15s" }}
                onMouseEnter={e => e.currentTarget.style.borderColor="#f97316"} onMouseLeave={e => e.currentTarget.style.borderColor="#e2e8f0"}>
                <RatingDot rating={goal ? t.goals[goal].r : "grün"} size={24} />
                <div style={{ flex:1 }}>
                  <strong>{t.name}</strong> <span style={{ fontSize:12, color:"#94a3b8" }}>{complexityIcon(t.complexity)}</span>
                  <div style={{ fontSize:12, color:"#64748b", marginTop:2 }}>{goal ? t.goals[goal].t : t.desc}</div>
                </div>
                <span style={{ fontSize:12, color:"#94a3b8" }}>→</span>
              </div>
            ))}
          </div>
          <button onClick={() => { setStep(0); setGoal(null); setComplexity(null); setBloomMin(0); }}
            style={{ display:"block", margin:"20px auto 0", padding:"8px 20px", borderRadius:8, border:"1px solid #d1d5db", background:"white", cursor:"pointer", fontSize:13 }}>
            ↩ Neu starten
          </button>
        </div>
      )}
    </div>
  );
}

export default function MoodleToolGuide() {
  const [view, setView] = useState("matrix");
  const [selectedTool, setSelectedTool] = useState(null);
  const [compareIds, setCompareIds] = useState([]);
  const [showCompare, setShowCompare] = useState(false);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({ complexity: null, bloomMin: 0, goal: null, onlyGreen: false });

  const toggleCompare = (id) => setCompareIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : prev.length >= 4 ? prev : [...prev, id]);

  const filteredTools = TOOLS.filter(t => !search || t.name.toLowerCase().includes(search.toLowerCase()) || t.desc.toLowerCase().includes(search.toLowerCase()));

  const navBtn = (v, label) => (
    <button onClick={() => setView(v)} style={{ padding:"8px 20px", borderRadius:8, border:"none", background: view === v ? "#1e293b" : "transparent", color: view === v ? "white" : "#64748b", cursor:"pointer", fontSize:14, fontWeight: view === v ? 600 : 400, transition:"all 0.15s" }}>
      {label}
    </button>
  );

  return (
    <div style={{ fontFamily:"Inter, system-ui, -apple-system, sans-serif", background:"#f8fafc", minHeight:"100vh" }}>
      <header style={{ background:"linear-gradient(135deg, #1e293b 0%, #334155 100%)", color:"white", padding:"24px 32px" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:4 }}>
            <span style={{ fontSize:28 }}>🎓</span>
            <h1 style={{ margin:0, fontSize:24, fontWeight:700 }}>Moodle Tool Guide</h1>
            <span style={{ background:"#f97316", color:"white", fontSize:11, padding:"2px 10px", borderRadius:10, fontWeight:600 }}>Moodle 4</span>
          </div>
          <p style={{ margin:0, fontSize:14, opacity:0.8 }}>Finde das passende Werkzeug für dein didaktisches Ziel</p>
        </div>
      </header>

      <nav style={{ background:"white", borderBottom:"1px solid #e2e8f0", padding:"8px 32px", position:"sticky", top:0, zIndex:50 }}>
        <div style={{ maxWidth:1200, margin:"0 auto", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:8 }}>
          <div style={{ display:"flex", gap:4 }}>
            {navBtn("matrix", "📊 Matrix")}
            {navBtn("cards", "🃏 Karten")}
            {navBtn("wizard", "🧙 Assistent")}
          </div>
          <div style={{ display:"flex", gap:8, alignItems:"center" }}>
            {view !== "wizard" && <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Tool suchen…" style={{ padding:"6px 14px", borderRadius:8, border:"1px solid #d1d5db", fontSize:13, width:180 }} />}
            {compareIds.length >= 2 && (
              <button onClick={() => setShowCompare(true)} style={{ padding:"6px 14px", borderRadius:8, background:"#f97316", color:"white", border:"none", cursor:"pointer", fontSize:13, fontWeight:600 }}>
                Vergleichen ({compareIds.length})
              </button>
            )}
          </div>
        </div>
      </nav>

      {view !== "wizard" && (
        <div style={{ maxWidth:1200, margin:"0 auto", padding:"12px 32px", display:"flex", gap:8, flexWrap:"wrap" }}>
          <select value={filters.complexity || ""} onChange={e => setFilters(f => ({...f, complexity: e.target.value || null}))} style={{ padding:"6px 12px", borderRadius:8, border:"1px solid #d1d5db", fontSize:12 }}>
            <option value="">Alle Komplexitäten</option>
            <option value="einfach">⭐ Einfach</option>
            <option value="mittel">⭐⭐ Mittel</option>
            <option value="komplex">⭐⭐⭐ Komplex</option>
          </select>
          <select value={filters.goal || ""} onChange={e => setFilters(f => ({...f, goal: e.target.value || null}))} style={{ padding:"6px 12px", borderRadius:8, border:"1px solid #d1d5db", fontSize:12 }}>
            <option value="">Alle Ziele</option>
            {GOALS.map(g => <option key={g.key} value={g.key}>{g.icon} {g.label}</option>)}
          </select>
          {filters.goal && (
            <label style={{ display:"flex", alignItems:"center", gap:4, fontSize:12, color:"#64748b" }}>
              <input type="checkbox" checked={filters.onlyGreen} onChange={e => setFilters(f => ({...f, onlyGreen: e.target.checked}))} /> Nur gut geeignete
            </label>
          )}
        </div>
      )}

      <main style={{ maxWidth:1200, margin:"0 auto", padding:"16px 32px 40px" }}>
        {view === "matrix" && <MatrixView tools={filteredTools} onSelect={setSelectedTool} filters={filters} />}
        {view === "cards" && (
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(280px, 1fr))", gap:16 }}>
            {filteredTools.filter(t => {
              if (filters.complexity && t.complexity !== filters.complexity) return false;
              if (filters.goal && filters.onlyGreen && t.goals[filters.goal]?.r !== "grün") return false;
              return true;
            }).map(t => <ToolCard key={t.id} tool={t} onSelect={setSelectedTool} onCompare={toggleCompare} isComparing={compareIds.includes(t.id)} />)}
          </div>
        )}
        {view === "wizard" && <WizardView tools={TOOLS} onSelect={setSelectedTool} />}
      </main>

      {selectedTool && <DetailModal tool={selectedTool} onClose={() => setSelectedTool(null)} />}
      {showCompare && <CompareView toolIds={compareIds} tools={TOOLS} onClose={() => setShowCompare(false)} />}

      <footer style={{ background:"#1e293b", color:"#94a3b8", padding:"16px 32px", textAlign:"center", fontSize:12 }}>
        Basierend auf dem Moodle 4 Tool Guide · eLeDia · Idee: Joyce Seitzinger · Deutsche Übertragung: Ralf Hilgenstock, Susanne Gebauer, Gerald Hartwig
      </footer>
    </div>
  );
}