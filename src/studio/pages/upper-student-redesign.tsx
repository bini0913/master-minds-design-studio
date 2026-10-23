import { useMemo, useState, type ReactNode } from "react";
import {
  ArrowRight, BarChart3, BookOpen, Brain, CalendarDays, CheckCircle2, ChevronRight,
  Clock3, Flame, GraduationCap, LibraryBig, ListChecks, Play, Search, ShieldCheck,
  Sparkles, Swords, Target, Timer, Trophy, Users, Video, Zap
} from "lucide-react";
import { AppFrame, Bar, Btn, Card, IconBox, Pill, SectionTitle, Stat, useGo, type Tone } from "../ui";

const nav = [
  { id: "upper-student-home", label: "Home", icon: GraduationCap },
  { id: "study-mode-plus", label: "Study", icon: Brain },
  { id: "multiplayer-arena", label: "Compete", icon: Swords },
  { id: "academic-prep-hub", label: "Exam prep", icon: BookOpen },
];
const more = [
  { id: "academic-prep-hub", label: "Academic Preparation", icon: BookOpen },
  { id: "topic-coverage", label: "Topic Coverage", icon: ListChecks },
  { id: "exam-mode", label: "Exam Mode", icon: Target },
  { id: "planner", label: "Study Planner", icon: CalendarDays },
  { id: "flashcards", label: "Flashcards", icon: Zap },
  { id: "student-learning-dna", label: "Learning DNA", icon: Brain },
  { id: "tournament-center", label: "Tournaments", icon: Trophy },
  { id: "friends", label: "Friends", icon: Users },
  { id: "leaderboard", label: "Leaderboard", icon: BarChart3 },
  { id: "library", label: "Library", icon: LibraryBig },
  { id: "ai-tutor", label: "AI Tutor", icon: Sparkles },
  { id: "enhanced-settings", label: "Settings", icon: ShieldCheck },
];
type Task = { id: number; subject: string; title: string; duration: string; done: boolean };
const initialTasks: Task[] = [
  { id: 1, subject: "PHYSICS", title: "Review kinematics and motion graphs", duration: "25 min", done: false },
  { id: 2, subject: "BIOLOGY", title: "Revise cell division flashcards", duration: "15 min", done: false },
  { id: 3, subject: "MATHEMATICS", title: "Practise functions and logarithms", duration: "30 min", done: true },
];
const subjects = [
  { name: "Mathematics", detail: "Functions · Logarithms", value: 64, tone: "blue" as Tone, action: "topic-coverage" },
  { name: "Physics", detail: "Kinematics · Dynamics", value: 72, tone: "violet" as Tone, action: "topic-coverage" },
  { name: "Biology", detail: "Cell biology · Genetics", value: 86, tone: "green" as Tone, action: "topic-coverage" },
  { name: "Chemistry", detail: "Organic chemistry", value: 48, tone: "coral" as Tone, action: "topic-coverage" },
];
function Heading({ eyebrow, title, description, action }: { eyebrow: string; title: string; description: string; action?: ReactNode }) {
  return <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[.16em] text-primary">{eyebrow}</p><h2 className="mt-1 text-2xl font-extrabold tracking-tight sm:text-3xl">{title}</h2><p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">{description}</p></div>{action}</div>;
}
function Workspace({ active, title, subtitle, children }: { active: string; title: string; subtitle: string; children: React.ReactNode }) {
  return <AppFrame nav={nav} mobileMore={more} active={active} title={title} subtitle={subtitle} actions={<Pill tone="blue"><GraduationCap className="h-3 w-3" /> Grades 9–12</Pill>}>
    <div className="mx-auto max-w-[1440px] space-y-6">{children}</div>
  </AppFrame>;
}
function ActionCard({ icon: I, title, detail, onClick, tone = "blue" }: { icon: typeof Brain; title: string; detail: string; onClick: () => void; tone?: Tone }) {
  return <button onClick={onClick} className="group flex min-w-0 items-center gap-3 rounded-xl border bg-card p-4 text-left transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"><IconBox icon={I} tone={tone} size={42}/><span className="min-w-0 flex-1"><b className="block text-sm">{title}</b><span className="mt-1 block text-xs leading-relaxed text-muted-foreground">{detail}</span></span><ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground transition group-hover:translate-x-0.5"/></button>;
}

export function UpperStudentDashboard() {
  const go = useGo();
  const [tasks, setTasks] = useState(initialTasks);
  const completed = tasks.filter(t => t.done).length;
  return <Workspace active="upper-student-home" title="Overview" subtitle="Your academic workspace">
    <section className="relative overflow-hidden rounded-2xl bg-hero p-6 text-navy-foreground sm:p-8">
      <div className="pointer-events-none absolute -right-12 -top-16 h-64 w-64 rounded-full border-[32px] border-white/5"/>
      <div className="relative grid gap-7 lg:grid-cols-[1.25fr_.75fr] lg:items-center">
        <div><Pill tone="gold"><Sparkles className="h-3 w-3"/> YOUR LEARNING, IN FOCUS</Pill><h2 className="mt-4 max-w-2xl text-3xl font-extrabold leading-tight sm:text-4xl">Make today count.<br/><span className="text-gold">One topic at a time.</span></h2><p className="mt-3 max-w-xl text-sm leading-relaxed text-navy-muted sm:text-base">Pick up where you left off, practise the topics that matter, and keep your exam preparation moving.</p><div className="mt-5 flex flex-wrap gap-2"><Btn v="gold" onClick={() => go("study-mode-plus")}><Play className="h-4 w-4"/> Start a focus session</Btn><Btn v="outline" className="border-white/20 bg-white/10 text-white hover:bg-white/15" onClick={() => go("academic-prep-hub")}>Open exam prep <ArrowRight className="h-4 w-4"/></Btn></div></div>
        <div className="grid grid-cols-2 gap-3"><div className="rounded-xl border border-white/10 bg-white/10 p-4"><Clock3 className="h-5 w-5 text-gold"/><p className="mt-3 text-2xl font-extrabold">9.4 h</p><p className="text-xs text-navy-muted">Focus time · sample</p></div><div className="rounded-xl border border-white/10 bg-white/10 p-4"><Target className="h-5 w-5 text-gold"/><p className="mt-3 text-2xl font-extrabold">74%</p><p className="text-xs text-navy-muted">Readiness · sample</p></div><div className="col-span-2 flex items-center gap-3 rounded-xl border border-white/10 bg-white/10 p-4"><div className="grid h-10 w-10 place-items-center rounded-lg bg-gold/15 text-gold"><Flame className="h-5 w-5"/></div><div className="min-w-0 flex-1"><p className="text-sm font-bold">Build a steady study habit</p><p className="text-xs text-navy-muted">Your demo workspace · connect real student data in the production app</p></div></div></div>
      </div>
    </section>
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4"><Stat label="Topics covered" value="112 / 166" icon={BookOpen} tone="green"/><Stat label="Practice accuracy" value="86%" icon={Target} tone="blue"/><Stat label="Study streak" value="17 days" icon={Flame} tone="coral"/><Stat label="Leaderboard" value="#12" icon={Trophy} tone="gold"/></div>
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(300px,.75fr)]">
      <div className="space-y-6"><Card><SectionTitle title="Today's plan" action={<Pill tone="gray">{completed}/{tasks.length} complete</Pill>}/><div className="space-y-2">{tasks.map(t=><div key={t.id} className="flex items-start gap-3 rounded-xl p-3 transition hover:bg-muted/50"><button aria-label={t.done ? "Mark task incomplete" : "Complete task"} aria-pressed={t.done} onClick={()=>setTasks(old=>old.map(x=>x.id===t.id?{...x,done:!x.done}:x))} className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md border ${t.done?"border-success bg-success text-white":"bg-background"}`}>{t.done&&<CheckCircle2 className="h-4 w-4"/>}</button><div className="min-w-0 flex-1"><p className="text-[10px] font-bold tracking-wider text-muted-foreground">{t.subject} · {t.duration}</p><p className={`mt-1 text-sm font-semibold ${t.done?"text-muted-foreground line-through":""}`}>{t.title}</p></div><Pill tone={t.done?"green":"gray"}>{t.done?"Done":"Planned"}</Pill></div>)}</div><Btn v="outline" className="mt-3 w-full" onClick={()=>go("planner")}><CalendarDays className="h-4 w-4"/> Open study planner</Btn></Card>
      <Card><SectionTitle title="Continue by subject" action={<button className="text-xs font-semibold text-primary" onClick={()=>go("topic-coverage")}>All topics <ArrowRight className="ml-1 inline h-3 w-3"/></button>}/><div className="grid gap-2 sm:grid-cols-2">{subjects.map(s=><button key={s.name} onClick={()=>go(s.action)} className="rounded-xl border p-3 text-left transition hover:border-primary/40 hover:bg-muted/30"><div className="flex items-start justify-between gap-2"><div><p className="text-sm font-bold">{s.name}</p><p className="mt-1 text-xs text-muted-foreground">{s.detail}</p></div><span className="text-sm font-bold tabular-nums">{s.value}%</span></div><Bar value={s.value} tone={s.tone} className="mt-3"/></button>)}</div></Card></div>
      <div className="space-y-6"><Card><SectionTitle title="Quick access"/><div className="space-y-2"><ActionCard icon={BookOpen} title="Academic preparation" detail="Exams, books and topic coverage" onClick={()=>go("academic-prep-hub")}/><ActionCard icon={Brain} title="Study Mode" detail="Focus timer and study room" tone="violet" onClick={()=>go("study-mode-plus")}/><ActionCard icon={Zap} title="Flashcards" detail="Review concepts with active recall" tone="gold" onClick={()=>go("flashcards")}/><ActionCard icon={LibraryBig} title="Digital library" detail="Find learning resources" tone="green" onClick={()=>go("library")}/></div></Card><Card className="border-primary/20 bg-primary/5"><div className="flex items-center gap-3"><IconBox icon={Trophy} tone="gold"/><div className="min-w-0 flex-1"><p className="text-sm font-bold">Learn with friends</p><p className="mt-1 text-xs text-muted-foreground">Practice together or join a tournament.</p></div></div><div className="mt-4 grid grid-cols-2 gap-2"><Btn v="outline" onClick={()=>go("multiplayer-arena")}>Play a friend</Btn><Btn onClick={()=>go("tournament-center")}>Tournaments</Btn></div></Card></div>
    </div>
  </Workspace>;
}

export function AcademicPreparationHub() {
 const go=useGo(); const [query,setQuery]=useState(""); const [source,setSource]=useState("Mixed practice");
 const tools=[{icon:LibraryBig,title:"Book analysis",desc:"Explore a textbook's units and topics",tag:"Learning resources",id:"book-analysis-journey",tone:"violet" as Tone},{icon:ListChecks,title:"Topic coverage",desc:"Find completed topics and revision gaps",tag:"Curriculum",id:"topic-coverage",tone:"blue" as Tone},{icon:Target,title:"Exam Mode",desc:"Focused practice with clear question sources",tag:"Assessment",id:"exam-mode",tone:"gold" as Tone},{icon:CalendarDays,title:"Study planner",desc:"Turn goals into manageable sessions",tag:"Organization",id:"planner",tone:"green" as Tone},{icon:Zap,title:"Flashcards & revision",desc:"Revisit definitions and key concepts",tag:"Active recall",id:"flashcards",tone:"coral" as Tone},{icon:BarChart3,title:"Academic insights",desc:"Review performance and next steps",tag:"Progress",id:"academic-insights",tone:"blue" as Tone}];
 const filtered=useMemo(()=>tools.filter(t=>(t.title+" "+t.desc).toLowerCase().includes(query.toLowerCase())),[query]);
 return <Workspace active="academic-prep-hub" title="Academic preparation" subtitle="A connected path from your learning materials to exam practice">
  <Heading eyebrow="YOUR ACADEMIC WORKSPACE" title="Prepare with a plan, not guesswork." description="Choose a resource, study a topic, practise recall, and review progress. Each tool below opens its own screen in this design prototype."/>
  <Card><div className="grid gap-4 md:grid-cols-[1fr_230px]"><label className="text-xs font-semibold text-muted-foreground">SEARCH STUDY TOOLS<div className="relative mt-1"><Search className="absolute left-3 top-3 h-4 w-4"/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search books, topics, revision…" className="h-10 w-full rounded-lg border bg-background pl-9 pr-3 text-sm text-foreground"/></div></label><label className="text-xs font-semibold text-muted-foreground">QUESTION SOURCE<select value={source} onChange={e=>setSource(e.target.value)} className="mt-1 h-10 w-full rounded-lg border bg-background px-3 text-sm text-foreground"><option>Mixed practice</option><option>Verified exam questions</option><option>Topic-generated practice</option></select></label></div><p className="mt-3 text-xs text-muted-foreground">Selected source: <b>{source}</b>. This selection is a prototype control and does not configure a real exam session.</p></Card>
  <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{filtered.map(t=><Card key={t.id} className="flex flex-col transition hover:border-primary/30"><div className="flex items-center justify-between"><IconBox icon={t.icon} tone={t.tone} size={44}/><Pill tone={t.tone}>{t.tag}</Pill></div><h3 className="mt-4 font-bold">{t.title}</h3><p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{t.desc}</p><Btn v="outline" className="mt-5 w-full justify-between" onClick={()=>go(t.id)}>Open {t.title}<ArrowRight className="h-4 w-4"/></Btn></Card>)}</div>
  <Card className="border-primary/20 bg-primary/5"><div className="flex items-start gap-3"><ShieldCheck className="mt-0.5 h-5 w-5 text-primary"/><div><p className="text-sm font-bold">Question-source clarity</p><p className="mt-1 text-sm text-muted-foreground">Official past-paper questions, reviewed materials, and generated practice should be labelled separately in the live product. This design studio uses sample content only.</p></div></div></Card>
 </Workspace>;
}

export function StudyModePlus() {
 const [duration,setDuration]=useState(25); const [running,setRunning]=useState(false); const [mode,setMode]=useState("Focus");
 const go=useGo();
 return <Workspace active="study-mode-plus" title="Study Mode" subtitle="A calm space for focused work">
  <Heading eyebrow="FOCUS WORKSPACE" title="Protect your attention." description="Choose a focus length, set your intention, and begin. This prototype timer is local-only and does not record a production study session." action={<Pill tone="violet"><Brain className="h-3 w-3"/> Focus</Pill>}/>
  <div className="grid gap-5 xl:grid-cols-[minmax(0,1.2fr)_minmax(280px,.8fr)]"><Card className="flex flex-col items-center justify-center p-6 text-center sm:p-10"><div className="flex flex-wrap justify-center gap-2">{["Focus","Short break","Long break"].map(m=><button key={m} onClick={()=>{setMode(m);setRunning(false)}} className={`rounded-full px-4 py-2 text-sm font-semibold ${mode===m?"bg-primary text-primary-foreground":"bg-muted text-muted-foreground"}`}>{m}</button>)}</div><div className="mt-8 grid h-56 w-56 place-items-center rounded-full border-[10px] border-primary/10 bg-primary/5"><div><Timer className="mx-auto h-7 w-7 text-primary"/><p className="mt-2 text-5xl font-extrabold tabular-nums">{String(duration).padStart(2,"0")}:00</p><p className="mt-2 text-xs text-muted-foreground">{running?"Session running (demo)":"Ready when you are"}</p></div></div><div className="mt-6 flex flex-wrap justify-center gap-2">{[15,25,45,60].map(n=><button key={n} onClick={()=>{setDuration(n);setRunning(false)}} className={`rounded-lg border px-3 py-2 text-sm ${duration===n?"border-primary bg-primary/5 font-bold":"bg-background"}`}>{n} min</button>)}</div><Btn className="mt-5 min-w-40" onClick={()=>setRunning(v=>!v)}>{running?"Pause demo timer":<><Play className="h-4 w-4"/> Start demo timer</>}</Btn><p className="mt-3 max-w-md text-xs text-muted-foreground">Timer controls demonstrate the interaction only; they do not persist a session or sync to other devices.</p></Card><div className="space-y-5"><Card><SectionTitle title="Set an intention"/><label className="text-sm font-semibold">What will you work on?<input placeholder="e.g. Physics — motion graphs" className="mt-2 h-11 w-full rounded-lg border bg-background px-3 text-sm"/></label><div className="mt-4 rounded-xl bg-muted/60 p-4"><p className="text-sm font-bold">A useful focus cycle</p><p className="mt-1 text-sm text-muted-foreground">Choose one task, silence distractions, and take a short break when you finish.</p></div></Card><Card><SectionTitle title="Study with others"/><div className="flex items-start gap-3"><IconBox icon={Video} tone="violet"/><div className="flex-1"><p className="text-sm font-bold">Study room</p><p className="mt-1 text-xs text-muted-foreground">Explore the room and multiplayer designs.</p><Btn v="outline" className="mt-3" onClick={()=>go("multiplayer-arena")}>Open study room <ArrowRight className="h-4 w-4"/></Btn></div></div></Card></div></div>
 </Workspace>;
}

export function MultiplayerArena() {
 const go=useGo(); const [filter,setFilter]=useState("All"); const matches=[{title:"Quick quiz duel",detail:"Two players · Mixed subjects",status:"Available",tone:"green" as Tone},{title:"Study group challenge",detail:"Small group · Topic practice",status:"Preview",tone:"blue" as Tone},{title:"Tournament practice",detail:"Timed round · Exam skills",status:"Coming up",tone:"gold" as Tone}]; const shown=matches.filter(m=>filter==="All"||m.status===filter);
 return <Workspace active="multiplayer-arena" title="Compete & collaborate" subtitle="Make practice social without losing sight of learning">
  <Heading eyebrow="PLAY WITH PURPOSE" title="Challenge yourself together." description="Explore the available multiplayer flows. This design preview does not create a live room or contact other students." action={<Btn v="outline" onClick={()=>go("friends")}><Users className="h-4 w-4"/> Friends</Btn>}/>
  <div className="grid gap-3 sm:grid-cols-3"><Stat label="Practice formats" value="3" icon={Swords} tone="violet"/><Stat label="Team learning" value="Study rooms" icon={Users} tone="blue"/><Stat label="Competitive play" value="Tournaments" icon={Trophy} tone="gold"/></div>
  <Card><div className="flex flex-wrap items-center justify-between gap-3"><SectionTitle title="Choose a format"/><div className="flex flex-wrap gap-1">{["All","Available","Preview","Coming up"].map(f=><button key={f} onClick={()=>setFilter(f)} aria-pressed={filter===f} className={`rounded-full px-3 py-1.5 text-xs font-semibold ${filter===f?"bg-primary text-primary-foreground":"bg-muted text-muted-foreground"}`}>{f}</button>)}</div></div><div className="mt-3 grid gap-3 md:grid-cols-3">{shown.map(m=><div key={m.title} className="rounded-xl border p-4"><div className="flex items-center justify-between gap-2"><IconBox icon={Swords} tone={m.tone}/><Pill tone={m.tone}>{m.status}</Pill></div><h3 className="mt-4 font-bold">{m.title}</h3><p className="mt-1 text-sm text-muted-foreground">{m.detail}</p><Btn v="outline" className="mt-4 w-full" onClick={()=>go("multiplayer-lobby")}>View flow <ArrowRight className="h-4 w-4"/></Btn></div>)}</div></Card>
  <div className="grid gap-4 md:grid-cols-2"><ActionCard icon={Trophy} title="Tournament center" detail="Explore event and standings screens" tone="gold" onClick={()=>go("tournament-center")}/><ActionCard icon={Users} title="Friends & community" detail="Review the social experience" tone="green" onClick={()=>go("friends")}/></div>
 </Workspace>;
}

export function TournamentCenter() {
 const go=useGo(); const [tab,setTab]=useState("Upcoming"); const events=[{name:"National Mathematics Challenge",type:"Individual · Mathematics",date:"Sample schedule",status:"Upcoming"},{name:"Science practice round",type:"Team · Science",date:"Sample schedule",status:"Practice"},{name:"Mixed-subject sprint",type:"Timed · Mixed",date:"Past event preview",status:"Past"}]; const shown=events.filter(e=>tab==="All"||e.status===tab);
 return <Workspace active="multiplayer-arena" title="Tournaments" subtitle="Competition is best when it builds understanding">
  <Heading eyebrow="COMPETE" title="A clear view of every round." description="Event names and schedules below are sample design content, not live tournament listings."/>
  <div className="grid gap-3 sm:grid-cols-3"><Stat label="Formats" value="Individual & team" icon={Trophy} tone="gold"/><Stat label="Preparation" value="Practice rounds" icon={Target} tone="blue"/><Stat label="Fair play" value="Clear rules" icon={ShieldCheck} tone="green"/></div>
  <Card><div className="flex flex-wrap gap-2">{["Upcoming","Practice","Past","All"].map(t=><button key={t} onClick={()=>setTab(t)} aria-pressed={tab===t} className={`rounded-full px-4 py-2 text-sm font-semibold ${tab===t?"bg-primary text-primary-foreground":"bg-muted text-muted-foreground"}`}>{t}</button>)}</div><div className="mt-4 space-y-3">{shown.map((e,i)=><div key={e.name} className="flex flex-wrap items-center gap-4 rounded-xl border p-4"><div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/5 text-primary"><Trophy className="h-5 w-5"/></div><div className="min-w-0 flex-1"><p className="font-bold">{e.name}</p><p className="mt-1 text-sm text-muted-foreground">{e.type} · {e.date}</p></div><Pill tone={i===0?"blue":"gray"}>{e.status}</Pill><Btn v="outline" onClick={()=>go("multiplayer-lobby")}>Explore flow <ArrowRight className="h-4 w-4"/></Btn></div>)}</div></Card>
 </Workspace>;
}

export function StudentLearningDNA() {
 const go=useGo(); const [view,setView]=useState("Topics");
 const items=[{name:"Cell division",detail:"Review accuracy · sample data",value:82,tone:"green" as Tone},{name:"Kinematics",detail:"Practice recommended · sample data",value:61,tone:"gold" as Tone},{name:"Logarithms",detail:"Recent revision · sample data",value:74,tone:"blue" as Tone}];
 return <Workspace active="academic-prep-hub" title="Learning DNA" subtitle="Turn learning activity into a useful next step">
  <Heading eyebrow="LEARNING INSIGHTS" title="Understand your progress." description="This prototype demonstrates how evidence-based learning insights can be presented. Sample values are clearly marked and are not a personal assessment."/>
  <div className="grid gap-3 sm:grid-cols-3"><Stat label="Topics shown" value="3" icon={Brain} tone="violet"/><Stat label="Review signals" value="2" icon={Target} tone="gold"/><Stat label="Next action" value="Practise" icon={ArrowRight} tone="blue"/></div>
  <Card><div className="flex flex-wrap items-center justify-between gap-3"><SectionTitle title="Topic signals"/><div className="flex gap-1">{["Topics","Activity"].map(t=><button key={t} onClick={()=>setView(t)} aria-pressed={view===t} className={`rounded-lg px-3 py-2 text-sm font-semibold ${view===t?"bg-primary text-primary-foreground":"bg-muted text-muted-foreground"}`}>{t}</button>)}</div></div>{view==="Topics"?<div className="mt-3 space-y-4">{items.map(x=><div key={x.name}><div className="flex flex-wrap justify-between gap-2"><div><p className="text-sm font-bold">{x.name}</p><p className="text-xs text-muted-foreground">{x.detail}</p></div><span className="text-sm font-bold">{x.value}%</span></div><Bar value={x.value} tone={x.tone} className="mt-2"/></div>)}</div>:<div className="mt-4 rounded-xl bg-muted/50 p-5"><p className="font-bold">Activity timeline preview</p><p className="mt-1 text-sm text-muted-foreground">In the live app, this area should summarize recorded study sessions, question attempts, and revisions—not inferred personality traits.</p></div>}</Card>
  <Card className="border-primary/20 bg-primary/5"><div className="flex items-start gap-3"><Sparkles className="mt-0.5 h-5 w-5 text-primary"/><div><p className="font-bold">Recommended next step</p><p className="mt-1 text-sm text-muted-foreground">Choose one topic, review the key concept, then try a short practice set. Update insights only from recorded learning activity.</p><Btn className="mt-3" onClick={()=>go("topic-coverage")}>Review topics <ArrowRight className="h-4 w-4"/></Btn></div></div></Card>
 </Workspace>;
}
