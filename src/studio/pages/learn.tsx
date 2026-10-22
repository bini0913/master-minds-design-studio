import { useEffect, useState } from "react";
import {
  Flame, Zap, Trophy, Target, Brain, Clock, BookOpen, Play, ChevronRight, Send, Bot, Sparkles, Calendar, RotateCcw,
  Check, X, Timer, Flag, Search, FileText, Download, Star, TrendingUp, Lock,
} from "lucide-react";
import { AppFrame, Av, Bar, Btn, Card, IconBox, Pill, SectionTitle, Stat, useGo, type Tone } from "../ui";
import { studentNav } from "../navs";
import { cn } from "@/lib/utils";

const subjects: { name: string; tone: Tone; pct: number; topics: number }[] = [
  { name: "Mathematics", tone: "blue", pct: 78, topics: 42 },
  { name: "Physics", tone: "violet", pct: 64, topics: 36 },
  { name: "Biology", tone: "green", pct: 82, topics: 30 },
  { name: "Chemistry", tone: "coral", pct: 51, topics: 34 },
  { name: "English", tone: "gold", pct: 70, topics: 24 },
];

export function StudentDashboard() {
  const go = useGo();
  return (
    <AppFrame nav={studentNav} active="student-dashboard" title="Good morning, Amara 👋" subtitle="Grade 11 · Natural Science">
      <div className="grid gap-5 @4xl:grid-cols-3">
        <div className="space-y-5 @4xl:col-span-2">
          <div className="overflow-hidden rounded-2xl bg-hero p-6 text-navy-foreground">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div><Pill tone="gold">Level 24 · Scholar</Pill><p className="mt-3 font-display text-2xl">2,340 / 3,000 XP to Level 25</p><Bar value={78} tone="gold" className="mt-3 bg-navy-2" /></div>
              <Btn v="gold" onClick={() => go("quiz-taking")}><Zap className="h-4 w-4" /> Daily challenge</Btn>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 @3xl:grid-cols-4">
            <Stat label="Streak" value="17 days" icon={Flame} tone="coral" />
            <Stat label="Accuracy" value="86%" delta="+4% wk" icon={Target} tone="green" />
            <Stat label="Rank" value="#12" delta="↑ 3" icon={Trophy} tone="gold" />
            <Stat label="Study time" value="9.4h" icon={Clock} tone="blue" />
          </div>
          <Card>
            <SectionTitle title="Continue learning" action={<button onClick={() => go("academic-dashboard")} className="text-xs font-semibold text-primary">All subjects</button>} />
            <div className="space-y-3">
              {subjects.slice(0, 4).map((s) => (
                <button key={s.name} onClick={() => go("quiz-selection")} className="flex w-full items-center gap-3 rounded-xl p-2 text-left hover:bg-muted">
                  <IconBox icon={BookOpen} tone={s.tone} /><div className="min-w-0 flex-1"><div className="flex justify-between text-sm"><b>{s.name}</b><span className="text-muted-foreground">{s.pct}%</span></div><Bar value={s.pct} tone={s.tone} className="mt-1.5" /></div><ChevronRight className="h-4 w-4 text-muted-foreground" />
                </button>
              ))}
            </div>
          </Card>
        </div>
        <div className="space-y-5">
          <Card>
            <SectionTitle title="Today's plan" />
            {[["08:00", "Physics · Kinematics quiz", true], ["15:30", "Biology flashcards", false], ["19:00", "Math mock exam", false]].map(([t, l, d]) => (
              <div key={l as string} className="flex items-center gap-3 border-b py-2.5 last:border-0"><div className={cn("grid h-5 w-5 place-items-center rounded-full border", d && "border-success bg-success text-primary-foreground")}>{d && <Check className="h-3 w-3" />}</div><div className="text-sm"><p className={cn("font-medium", d && "line-through text-muted-foreground")}>{l as string}</p><p className="text-xs text-muted-foreground">{t as string}</p></div></div>
            ))}
          </Card>
          <Card className="bg-violet-soft border-0">
            <div className="flex items-center gap-2"><IconBox icon={Bot} tone="violet" size={32} /><b className="text-sm">AI Tutor tip</b></div>
            <p className="mt-2 text-sm">You miss vector questions 40% of the time. Want a 5-minute refresher?</p>
            <Btn size="sm" className="mt-3" onClick={() => go("ai-tutor")}>Ask tutor</Btn>
          </Card>
          <Card>
            <SectionTitle title="Live now" />
            <div className="flex items-center gap-3"><IconBox icon={Trophy} tone="gold" /><div className="flex-1 text-sm"><b>National Math Cup</b><p className="text-xs text-muted-foreground">1,204 players · ends 2h</p></div><Btn size="sm" onClick={() => go("tournaments")}>Join</Btn></div>
          </Card>
        </div>
      </div>
    </AppFrame>
  );
}

export function AcademicDashboard() {
  return (
    <AppFrame nav={studentNav} active="student-dashboard" title="Academic Dashboard" subtitle="Term 2 · 2026">
      <div className="grid gap-3 @3xl:grid-cols-4">
        <Stat label="Predicted GPA" value="3.62" delta="+0.18" icon={TrendingUp} tone="green" />
        <Stat label="Topics mastered" value="112/166" icon={Star} tone="gold" />
        <Stat label="Quizzes" value="248" icon={Brain} tone="blue" />
        <Stat label="Exam readiness" value="74%" icon={Target} tone="violet" />
      </div>
      <div className="mt-5 grid gap-5 @4xl:grid-cols-5">
        <Card className="@4xl:col-span-3">
          <SectionTitle title="Weekly mastery" />
          <div className="flex h-48 items-end gap-3">
            {[45, 60, 52, 70, 66, 82, 78].map((h, i) => (<div key={i} className="flex flex-1 flex-col items-center gap-1"><div className="w-full rounded-t-lg bg-brand" style={{ height: `${h}%` }} /><span className="text-[10px] text-muted-foreground">{"MTWTFSS"[i]}</span></div>))}
          </div>
        </Card>
        <Card className="@4xl:col-span-2">
          <SectionTitle title="By subject" />
          <div className="space-y-3">{subjects.map((s) => <div key={s.name}><div className="flex justify-between text-sm"><span>{s.name}</span><b>{s.pct}%</b></div><Bar value={s.pct} tone={s.tone} className="mt-1" /></div>)}</div>
        </Card>
      </div>
      <Card className="mt-5">
        <SectionTitle title="Upcoming assessments" />
        <div className="grid gap-3 @3xl:grid-cols-3">
          {[["Physics midterm", "Oct 24", "coral"], ["Chemistry lab report", "Oct 27", "gold"], ["National mock exam", "Nov 3", "blue"]].map(([n, d, t]) => <div key={n} className="rounded-xl border p-4"><Pill tone={t as Tone}>{d}</Pill><p className="mt-2 font-semibold">{n}</p></div>)}
        </div>
      </Card>
    </AppFrame>
  );
}

export function QuizSelection() {
  const go = useGo();
  const [sub, setSub] = useState("All");
  const quizzes = [
    ["Kinematics in 1D", "Physics", 15, "Medium", "violet"], ["Quadratic equations", "Mathematics", 20, "Hard", "blue"],
    ["Cell division", "Biology", 12, "Easy", "green"], ["Periodic trends", "Chemistry", 18, "Medium", "coral"],
    ["Reading comprehension", "English", 10, "Easy", "gold"], ["Vectors & forces", "Physics", 15, "Hard", "violet"],
  ] as const;
  return (
    <AppFrame nav={studentNav} active="quiz-selection" title="Quizzes" subtitle="Pick a topic and earn XP">
      <div className="flex flex-wrap gap-2">
        {["All", ...subjects.map((s) => s.name)].map((s) => <button key={s} onClick={() => setSub(s)} className={cn("rounded-full border px-3 py-1.5 text-sm font-medium", sub === s ? "border-primary bg-primary text-primary-foreground" : "bg-card")}>{s}</button>)}
      </div>
      <div className="mt-5 grid gap-4 @2xl:grid-cols-2 @4xl:grid-cols-3">
        {quizzes.filter((q) => sub === "All" || q[1] === sub).map(([t, s, n, d, tone]) => (
          <Card key={t} className="flex flex-col">
            <div className="flex items-center justify-between"><Pill tone={tone}>{s}</Pill><span className="text-xs text-muted-foreground">{d}</span></div>
            <p className="mt-3 text-lg font-bold">{t}</p>
            <p className="text-sm text-muted-foreground">{n} questions · ~{n} min · +{n * 10} XP</p>
            <div className="mt-4 flex gap-2"><Btn className="flex-1" onClick={() => go("quiz-taking")}><Play className="h-4 w-4" /> Start</Btn><Btn v="outline" onClick={() => go("multiplayer-lobby")}>1v1</Btn></div>
          </Card>
        ))}
      </div>
    </AppFrame>
  );
}

const qs = [
  { q: "A car accelerates uniformly from rest to 20 m/s in 5 s. What is its acceleration?", o: ["2 m/s²", "4 m/s²", "5 m/s²", "100 m/s²"], a: 1 },
  { q: "Which quantity is a vector?", o: ["Speed", "Mass", "Displacement", "Time"], a: 2 },
  { q: "The slope of a velocity–time graph gives…", o: ["Displacement", "Acceleration", "Jerk", "Speed"], a: 1 },
];
export function QuizTaking() {
  const go = useGo();
  const [i, setI] = useState(0);
  const [pick, setPick] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const done = i >= qs.length;
  const q = qs[Math.min(i, qs.length - 1)];
  if (!q) return null;
  return (
    <div className="min-h-[720px] bg-canvas p-5">
      <div className="mx-auto max-w-2xl">
        <div className="flex items-center gap-3"><button onClick={() => go("quiz-selection")} className="rounded-lg p-2 hover:bg-muted"><X className="h-4 w-4" /></button><Bar value={(Math.min(i, qs.length) / qs.length) * 100} className="flex-1" /><Pill tone="coral"><Timer className="h-3 w-3" /> 0:42</Pill></div>
        {done ? (
          <Card className="mt-10 text-center">
            <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-goldgrad"><Trophy className="h-9 w-9 text-navy" /></div>
            <h2 className="mt-4 font-display text-3xl">Quiz complete!</h2>
            <p className="text-muted-foreground">{score}/{qs.length} correct · +{score * 40} XP</p>
            <div className="mt-6 flex justify-center gap-2"><Btn v="outline" onClick={() => { setI(0); setScore(0); setPick(null); }}><RotateCcw className="h-4 w-4" /> Retry</Btn><Btn onClick={() => go("student-dashboard")}>Back home</Btn></div>
          </Card>
        ) : (
          <Card className="mt-8 p-7">
            <p className="text-xs font-bold uppercase tracking-wider text-primary">Physics · Question {i + 1} of {qs.length}</p>
            <h2 className="mt-3 text-xl font-bold leading-snug">{q.q}</h2>
            <div className="mt-6 space-y-2.5">
              {q.o.map((o, k) => {
                const show = pick !== null; const right = k === q.a; const mine = k === pick;
                return (
                  <button key={o} disabled={show} onClick={() => { setPick(k); if (right) setScore(score + 1); }}
                    className={cn("flex w-full items-center gap-3 rounded-xl border-2 px-4 py-3 text-left font-medium transition",
                      !show && "hover:border-primary", show && right && "border-success bg-success-soft", show && mine && !right && "border-destructive bg-coral-soft")}>
                    <span className="grid h-7 w-7 place-items-center rounded-lg bg-muted text-xs font-bold">{"ABCD"[k]}</span>{o}
                    {show && right && <Check className="ml-auto h-4 w-4 text-success" />}
                  </button>
                );
              })}
            </div>
            <div className="mt-6 flex justify-between"><Btn v="ghost"><Flag className="h-4 w-4" /> Report</Btn><Btn onClick={() => { setI(i + 1); setPick(null); }} className={cn(pick === null && "pointer-events-none opacity-50")}>Next</Btn></div>
          </Card>
        )}
      </div>
    </div>
  );
}

export function Library() {
  const [query, setQuery] = useState("");
  const [opened, setOpened] = useState<string | null>(null);
  const go = useGo();
  const books = [["Physics Grade 11", "Textbook", "violet"], ["Biology Grade 11", "Textbook", "green"], ["Math Past Papers 2015–2025", "Exam", "blue"], ["Chemistry Lab Guide", "Guide", "coral"], ["English Grammar Handbook", "Reference", "gold"], ["Civics & Ethics", "Textbook", "gray"]] as const;
  return (
    <AppFrame nav={studentNav} active="library" title="Digital Library" subtitle="1,240 resources aligned to your curriculum">
      <div className="flex items-center gap-2 rounded-xl border bg-card px-3"><Search className="h-4 w-4 text-muted-foreground" /><input aria-label="Search library" value={query} onChange={(e) => setQuery(e.target.value)} className="h-11 flex-1 bg-transparent text-sm outline-none" placeholder="Search books, notes, past papers…" /></div>
      {opened && <Card className="mt-4"><SectionTitle title={opened} action={<Btn size="sm" v="ghost" aria-label="Close book" onClick={() => setOpened(null)}><X /></Btn>} /><Pill>Chapter 4 · Work, Energy & Power</Pill><h3 className="mt-4 text-xl font-bold">Energy and its transformations</h3><p className="mt-3 text-sm leading-relaxed">Energy is the capacity to do work. Kinetic energy is associated with motion, while potential energy depends on position. The total energy of an isolated system remains constant.</p><p className="mt-3 rounded-lg bg-muted p-4 font-mono text-sm">Kinetic energy = ½ × mass × velocity²</p><Btn size="sm" className="mt-4" onClick={() => go("flashcards")}>Practice this chapter</Btn></Card>}
      <div className="mt-5 grid grid-cols-2 gap-4 @3xl:grid-cols-3 @5xl:grid-cols-6">
        {books.filter(([t]) => t.toLowerCase().includes(query.toLowerCase())).map(([t, k, tone]) => (
          <div key={t} className="group">
            <div className={cn("relative aspect-[3/4] overflow-hidden rounded-xl p-3 shadow-card", tone === "gray" ? "bg-muted" : `bg-${tone}-soft`)}>
              <div className="flex h-full flex-col justify-between rounded-lg border-2 border-dashed border-current/20 p-2"><BookOpen className="h-6 w-6 opacity-60" /><p className="font-display text-sm font-semibold leading-tight">{t}</p></div>
            </div>
            <p className="mt-2 truncate text-sm font-semibold">{t}</p><p className="text-xs text-muted-foreground">{k}</p>
            <Btn size="sm" v="outline" className="mt-2 w-full" onClick={() => setOpened(t)}><BookOpen className="h-3 w-3" />Read</Btn>
          </div>
        ))}
      </div>
      {!books.some(([t]) => t.toLowerCase().includes(query.toLowerCase())) && <p className="py-8 text-center text-sm text-muted-foreground">No matching books.</p>}
      <Card className="mt-5"><SectionTitle title="Recently opened" />
        {["Ch. 4 – Work, Energy & Power.pdf", "2024 National Exam – Biology.pdf"].map((f) => <div key={f} className="flex items-center gap-3 border-b py-3 last:border-0"><IconBox icon={FileText} tone="blue" size={32} /><span className="flex-1 truncate text-sm">{f}</span><Download className="h-4 w-4 text-muted-foreground" /></div>)}
      </Card>
    </AppFrame>
  );
}

export function AITutor() {
  const [msgs, setMsgs] = useState([
    { me: false, t: "Hi Amara! I'm Mira, your AI tutor. What should we work on today?" },
    { me: true, t: "Explain Newton's second law simply." },
    { me: false, t: "Sure! F = m·a. Push a shopping cart: the harder you push (F), the faster it speeds up (a). A heavier cart (bigger m) needs more force for the same speed-up. Want a practice question?" },
  ]);
  const [v, setV] = useState("");
  const send = () => { if (!v) return; setMsgs([...msgs, { me: true, t: v }, { me: false, t: "Great question — here's a step-by-step breakdown (sample response for design review)." }]); setV(""); };
  return (
    <AppFrame nav={studentNav} active="ai-tutor" title="AI Tutor" subtitle="Mira · Physics mode">
      <div className="grid gap-5 @4xl:grid-cols-4">
        <Card className="hidden p-3 @4xl:block"><p className="px-2 pb-2 text-xs font-bold uppercase text-muted-foreground">Sessions</p>{["Newton's laws", "Mitosis vs meiosis", "Integration by parts", "Essay structure"].map((s, i) => <div key={s} className={cn("rounded-lg px-3 py-2 text-sm", i === 0 && "bg-primary-soft font-semibold text-primary")}>{s}</div>)}</Card>
        <Card className="flex min-h-[560px] flex-col p-0 @4xl:col-span-3">
          <div className="flex-1 space-y-4 p-5">
            {msgs.map((m, i) => (
              <div key={i} className={cn("flex gap-3", m.me && "flex-row-reverse")}>
                {m.me ? <Av name="Amara T" /> : <IconBox icon={Bot} tone="violet" size={36} />}
                <div className={cn("max-w-[75%] rounded-2xl px-4 py-3 text-sm", m.me ? "bg-primary text-primary-foreground" : "bg-muted")}>{m.t}</div>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 px-5">{["Give me a practice question", "Show a diagram", "Explain in Amharic"].map((s) => <button key={s} onClick={() => setV(s)} className="rounded-full border px-3 py-1 text-xs"><Sparkles className="mr-1 inline h-3 w-3 text-violet" />{s}</button>)}</div>
          <div className="m-4 flex items-center gap-2 rounded-xl border px-3"><input value={v} onChange={(e) => setV(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} className="h-11 flex-1 bg-transparent text-sm outline-none" placeholder="Ask anything…" /><Btn size="sm" onClick={send}><Send className="h-4 w-4" /></Btn></div>
        </Card>
      </div>
    </AppFrame>
  );
}

export function Planner() {
  const [adding, setAdding] = useState(false);
  const [newBlock, setNewBlock] = useState("");
  const [extra, setExtra] = useState<string[]>([]);
  const days = ["Mon 19", "Tue 20", "Wed 21", "Thu 22", "Fri 23"];
  const blocks: Record<number, [string, Tone][]> = { 0: [["Physics quiz", "violet"], ["Bio flashcards", "green"]], 1: [["Math revision", "blue"]], 2: [["Chem lab prep", "coral"], ["English essay", "gold"]], 3: [["Physics midterm prep", "violet"]], 4: [["Mock exam", "blue"], ["Rest 🎉", "gray"]] };
  return (
    <AppFrame nav={studentNav} active="planner" title="Study Planner" subtitle="Auto-built around your exam calendar" actions={<Btn size="sm" onClick={() => setAdding(!adding)}><Calendar className="h-4 w-4" /> Add block</Btn>}>
      {adding && <form onSubmit={(e) => { e.preventDefault(); if (!newBlock.trim()) return; setExtra([...extra, newBlock.trim()]); setNewBlock(""); setAdding(false); }} className="mb-4 flex flex-wrap gap-2"><input autoFocus aria-label="Study block title" placeholder="Thursday study block" value={newBlock} onChange={(e) => setNewBlock(e.target.value)} className="h-10 min-w-0 flex-1 rounded-lg border bg-card px-3 text-sm" /><Btn type="submit">Add</Btn><Btn v="outline" onClick={() => setAdding(false)}>Cancel</Btn></form>}
      <div className="grid gap-3 @3xl:grid-cols-5">
        {days.map((d, i) => (
          <Card key={d} className={cn("min-h-64 p-3", i === 1 && "ring-2 ring-primary")}>
            <p className="text-xs font-bold uppercase text-muted-foreground">{d}</p>
            <div className="mt-3 space-y-2">{(blocks[i] ?? []).map(([t, tone]) => <div key={t} className={cn("rounded-lg border-l-4 p-2.5 text-sm font-medium", tone === "gray" ? "border-muted-foreground bg-muted" : `border-${tone} bg-${tone}-soft`)}>{t}<p className="text-[11px] font-normal text-muted-foreground">45 min</p></div>)}{i === 3 && extra.map((t, k) => <div key={k} className="rounded-lg border-l-4 border-primary bg-primary-soft p-2.5 text-sm font-medium">{t}<p className="text-[11px] text-muted-foreground">45 min</p></div>)}</div>
          </Card>
        ))}
      </div>
      <Card className="mt-5 flex flex-wrap items-center gap-4"><IconBox icon={Target} tone="green" /><div className="flex-1"><b>Weekly goal: 10 hours</b><Bar value={64} tone="green" className="mt-2" /></div><span className="text-sm font-semibold">6.4h done</span></Card>
    </AppFrame>
  );
}

export function Revision() {
  const go = useGo();
  return (
    <AppFrame nav={studentNav} active="quiz-selection" title="Revision Mode" subtitle="Focus on what you're most likely to forget">
      <div className="grid gap-5 @4xl:grid-cols-3">
        <Card className="@4xl:col-span-2"><SectionTitle title="Weak spots" />
          {[["Vectors & resolution", "Physics", 42], ["Organic nomenclature", "Chemistry", 48], ["Logarithms", "Mathematics", 55], ["Genetics crosses", "Biology", 61]].map(([t, s, p]) => (
              <div key={t as string} className="flex flex-wrap items-center gap-3 border-b py-3 last:border-0"><div className="min-w-28 flex-1"><p className="font-semibold">{t}</p><p className="text-xs text-muted-foreground">{s}</p></div><div className="w-16 shrink-0 @2xl:w-32"><Bar value={p as number} tone={(p as number) < 50 ? "coral" : "gold"} /></div><Btn size="sm" v="secondary" onClick={() => go("quiz-taking")}>Revise</Btn></div>
          ))}
        </Card>
        <div className="space-y-4">
          <Card className="bg-hero text-navy-foreground border-0"><RotateCcw className="h-6 w-6" /><p className="mt-3 font-display text-2xl">24 cards due</p><p className="text-sm text-navy-muted">Spaced repetition · ~12 min</p><Btn v="gold" className="mt-4 w-full" onClick={() => go("flashcards")}>Start session</Btn></Card>
          <Card><SectionTitle title="Retention curve" /><div className="flex h-24 items-end gap-1">{[90, 80, 72, 66, 61, 58, 56, 55].map((h, i) => <div key={i} className="flex-1 rounded-t bg-primary-soft" style={{ height: `${h}%` }} />)}</div></Card>
        </div>
      </div>
    </AppFrame>
  );
}

export function Flashcards() {
  const cards = [["Mitochondria", "Organelle that produces ATP through cellular respiration."], ["Osmosis", "Diffusion of water across a semi-permeable membrane."], ["Enzyme", "Biological catalyst that speeds up reactions."]];
  const [i, setI] = useState(0); const [flip, setFlip] = useState(false);
  return (
    <AppFrame nav={studentNav} active="quiz-selection" title="Flashcards" subtitle="Biology · Cell Biology deck">
      <div className="mx-auto max-w-xl text-center">
        <p className="text-sm text-muted-foreground">Card {i + 1} of {cards.length}</p>
        <button onClick={() => setFlip(!flip)} className={cn("mt-4 grid aspect-[3/2] w-full place-items-center rounded-3xl p-8 shadow-elevated transition", flip ? "bg-hero text-navy-foreground" : "bg-card")}>
          <div><Pill tone={flip ? "gold" : "green"}>{flip ? "Definition" : "Term"}</Pill><p className={cn("mt-4", flip ? "text-lg" : "font-display text-3xl")}>{cards[i]?.[flip ? 1 : 0]}</p><p className="mt-6 text-xs opacity-60">Tap to flip</p></div>
        </button>
        <div className="mt-6 grid grid-cols-3 gap-3">
          {[["Again", "danger"], ["Good", "secondary"], ["Easy", "primary"]].map(([l, v]) => <Btn key={l} v={v as "primary"} onClick={() => { setFlip(false); setI((i + 1) % cards.length); }}>{l}</Btn>)}
        </div>
      </div>
    </AppFrame>
  );
}

export function ExamMode() {
  const go = useGo();
  const [submitted, setSubmitted] = useState(false);
  const [flagged, setFlagged] = useState<number[]>([9]);
  const [sec, setSec] = useState(5399);
  useEffect(() => { const t = setInterval(() => setSec((s) => Math.max(0, s - 1)), 1000); return () => clearInterval(t); }, []);
  const [cur, setCur] = useState(6);
  const fmt = `${Math.floor(sec / 3600)}:${String(Math.floor((sec % 3600) / 60)).padStart(2, "0")}:${String(sec % 60).padStart(2, "0")}`;
  if (submitted) return <div className="grid min-h-[720px] place-items-center bg-canvas p-5"><Card className="max-w-md text-center"><IconBox icon={Check} tone="green" /><h2 className="mt-4 font-display text-3xl">Exam submitted</h2><p className="mt-2 text-sm text-muted-foreground">Your practice exam is complete.</p><Btn className="mt-5" onClick={() => go("academic-dashboard")}>Academic dashboard</Btn></Card></div>;
  return (
    <div className="min-h-[720px] bg-canvas">
      <header className="flex flex-wrap items-center justify-between gap-3 bg-navy px-5 py-3 text-navy-foreground"><div className="flex w-full items-center gap-2 @2xl:w-auto"><Lock className="h-4 w-4" /><b className="text-sm">National Mock Exam · Mathematics</b></div><div className="shrink-0 whitespace-nowrap rounded-lg bg-navy-2 px-3 py-1 font-mono text-lg">{fmt}</div><Btn size="sm" v="danger" onClick={() => setSubmitted(true)}>Submit</Btn></header>
      <div className="grid gap-5 p-5 @4xl:grid-cols-4">
        <Card className="@4xl:col-span-3 p-7">
          <p className="text-xs font-bold text-muted-foreground">QUESTION {cur} OF 60 · 2 marks</p>
          <p className="mt-3 text-lg font-semibold">If log₂(x) + log₂(x − 2) = 3, find x.</p>
          <div className="mt-5 grid gap-2 @2xl:grid-cols-2">{["x = 2", "x = 4", "x = −2", "x = 8"].map((o, k) => <label key={o} className="flex items-center gap-3 rounded-xl border p-4 text-sm"><input type="radio" name="e" defaultChecked={k === 1} />{o}</label>)}</div>
          <div className="mt-6 flex justify-between"><Btn v="outline" onClick={() => setCur(Math.max(1, cur - 1))}>Previous</Btn><Btn v="ghost" onClick={() => setFlagged(flagged.includes(cur) ? flagged.filter((n) => n !== cur) : [...flagged, cur])}><Flag className="h-4 w-4" /> {flagged.includes(cur) ? "Unflag" : "Flag"}</Btn><Btn onClick={() => setCur(Math.min(60, cur + 1))}>Next</Btn></div>
        </Card>
        <Card><p className="mb-3 text-sm font-bold">Navigator</p><div className="grid grid-cols-6 gap-1.5 @4xl:grid-cols-5">{Array.from({ length: 60 }, (_, k) => <button key={k} onClick={() => setCur(k + 1)} className={cn("aspect-square rounded-md text-xs font-semibold", k + 1 === cur ? "bg-primary text-primary-foreground" : k < 5 ? "bg-success-soft text-success" : k === 8 ? "bg-gold-soft text-gold" : "bg-muted")}>{k + 1}</button>)}</div>
          <div className="mt-4 space-y-1 text-xs text-muted-foreground"><p>■ Answered 5 · ■ Flagged 1 · ■ Left 54</p></div></Card>
      </div>
    </div>
  );
}
