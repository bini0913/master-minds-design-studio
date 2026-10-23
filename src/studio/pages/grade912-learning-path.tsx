import { useMemo, useState } from "react";
import { ArrowRight, BookOpen, CheckCircle2, ChevronRight, Circle, Clock3, ListChecks, Search, Target } from "lucide-react";
import { AppFrame, Btn, Card, IconBox, Pill, SectionTitle, useGo, type Tone } from "../ui";

const nav = [
  { id: "upper-student-home", label: "Home", icon: BookOpen },
  { id: "learning-path", label: "Learn", icon: ListChecks },
  { id: "study-mode-plus", label: "Study", icon: Target },
  { id: "academic-prep-hub", label: "Exam prep", icon: BookOpen },
];
const more = [
  { id: "topic-coverage", label: "Topic Coverage", icon: ListChecks },
  { id: "exam-mode", label: "Exam Mode", icon: Target },
  { id: "planner", label: "Study Planner", icon: Clock3 },
  { id: "flashcards", label: "Flashcards", icon: BookOpen },
  { id: "library", label: "Library", icon: BookOpen },
  { id: "ai-tutor", label: "AI Tutor", icon: Target },
];
type Topic = { id: string; title: string; objective: string; status: "ready" | "in-progress" | "completed" | "review"; activity: string; route: string; duration: string; tone: Tone };
const exampleTopics: Topic[] = [
  { id: "t1", title: "Functions and graphs", objective: "Interpret functions and connect graphs to their equations.", status: "in-progress", activity: "Topic practice", route: "topic-coverage", duration: "15–20 min", tone: "blue" },
  { id: "t2", title: "Linear equations", objective: "Solve and check linear equations.", status: "ready", activity: "Practice questions", route: "exam-mode", duration: "10–15 min", tone: "violet" },
  { id: "t3", title: "Kinematics", objective: "Describe motion using displacement, velocity, and acceleration.", status: "review", activity: "Revision cards", route: "flashcards", duration: "10 min", tone: "gold" },
  { id: "t4", title: "Cell division", objective: "Distinguish the main stages of cell division.", status: "completed", activity: "Review topic", route: "topic-coverage", duration: "10 min", tone: "green" },
];
const statusText: Record<Topic["status"], string> = { ready: "Ready to begin", "in-progress": "In progress", completed: "Completed", review: "Needs revision" };
const statusTone: Record<Topic["status"], Tone> = { ready: "blue", "in-progress": "violet", completed: "green", review: "gold" };

export function Grade912LearningPath() {
  const go = useGo();
  const [subject, setSubject] = useState("All subjects");
  const [status, setStatus] = useState("All topics");
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState<string | null>("t1");
  const topics = useMemo(() => exampleTopics.filter(topic =>
    (subject === "All subjects" || (subject === "Mathematics" && ["Functions and graphs", "Linear equations"].includes(topic.title)) || (subject === "Physics" && topic.title === "Kinematics") || (subject === "Biology" && topic.title === "Cell division")) &&
    (status === "All topics" || statusText[topic.status] === status) &&
    (topic.title + " " + topic.objective).toLowerCase().includes(query.toLowerCase())
  ), [subject, status, query]);
  const activeTopic = exampleTopics.find(t => t.status === "in-progress") ?? exampleTopics.find(t => t.status === "ready");
  return <AppFrame nav={nav} mobileMore={more} active="learning-path" title="Learning path" subtitle="Move through topics one useful step at a time" actions={<Pill tone="blue">Grades 9–12</Pill>}>
    <div className="mx-auto max-w-[1200px] space-y-6">
      <section className="rounded-2xl border bg-card p-5 sm:p-7">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-2xl"><p className="text-xs font-bold uppercase tracking-[.16em] text-primary">YOUR NEXT STEP</p><h2 className="mt-2 text-2xl font-extrabold tracking-tight">Continue with {activeTopic?.title ?? "a topic"}</h2><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{activeTopic?.objective ?? "Choose a subject to find available learning activities."}</p><p className="mt-3 flex items-center gap-2 text-xs text-muted-foreground"><Clock3 className="h-4 w-4"/>{activeTopic?.duration ?? "Duration depends on the activity"} · {activeTopic?.activity ?? "Choose an activity"}</p></div>
          <Btn onClick={() => go(activeTopic?.route ?? "topic-coverage")}>Continue learning <ArrowRight className="h-4 w-4"/></Btn>
        </div>
        <p className="mt-5 rounded-lg bg-muted/60 p-3 text-xs leading-relaxed text-muted-foreground">Design-studio preview: the topic sequence below is illustrative content, not a student's saved curriculum or progress. In production, use the authenticated student's selected grade, analyzed books, and available curriculum data.</p>
      </section>
      <div className="grid gap-3 sm:grid-cols-3">
        <Card><IconBox icon={BookOpen} tone="blue"/><p className="mt-3 text-sm font-bold">1. Learn</p><p className="mt-1 text-xs text-muted-foreground">Read available lesson material or open a related resource.</p></Card>
        <Card><IconBox icon={Target} tone="violet"/><p className="mt-3 text-sm font-bold">2. Practise</p><p className="mt-1 text-xs text-muted-foreground">Try available questions and use feedback to correct misunderstandings.</p></Card>
        <Card><IconBox icon={CheckCircle2} tone="green"/><p className="mt-3 text-sm font-bold">3. Review</p><p className="mt-1 text-xs text-muted-foreground">Return to difficult concepts before moving to the next topic.</p></Card>
      </div>
      <Card>
        <SectionTitle title="Your topic sequence" description="Choose a topic to see its objective and available next action."/>
        <div className="mt-4 grid gap-3 md:grid-cols-[1fr_190px_190px]">
          <label className="text-xs font-bold text-muted-foreground">SEARCH TOPICS<span className="relative mt-2 block"><Search className="absolute left-3 top-3 h-4 w-4"/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Find a topic" className="h-10 w-full rounded-lg border bg-background pl-9 pr-3 text-sm text-foreground"/></span></label>
          <label className="text-xs font-bold text-muted-foreground">SUBJECT<select value={subject} onChange={e=>setSubject(e.target.value)} className="mt-2 h-10 w-full rounded-lg border bg-background px-3 text-sm text-foreground">{["All subjects","Mathematics","Physics","Biology","Chemistry"].map(s=><option key={s}>{s}</option>)}</select></label>
          <label className="text-xs font-bold text-muted-foreground">STATUS<select value={status} onChange={e=>setStatus(e.target.value)} className="mt-2 h-10 w-full rounded-lg border bg-background px-3 text-sm text-foreground">{["All topics",...Object.values(statusText)].map(s=><option key={s}>{s}</option>)}</select></label>
        </div>
        <div className="mt-5 space-y-3">{topics.map((topic,index)=><div key={topic.id} className="rounded-xl border">
          <button aria-expanded={expanded===topic.id} onClick={()=>setExpanded(old=>old===topic.id?null:topic.id)} className="flex w-full items-center gap-3 p-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-muted">{topic.status==="completed"?<CheckCircle2 className="h-5 w-5 text-success"/>:topic.status==="in-progress"?<Circle className="h-5 w-5 text-primary fill-primary/10"/>:<span className="text-sm font-bold">{index+1}</span>}</span>
            <span className="min-w-0 flex-1"><span className="block text-sm font-bold">{topic.title}</span><span className="mt-1 block text-xs text-muted-foreground">{topic.activity} · {topic.duration}</span></span>
            <Pill tone={statusTone[topic.status]}>{statusText[topic.status]}</Pill><ChevronRight className={"h-4 w-4 transition-transform " + (expanded===topic.id ? "rotate-90" : "")} />
          </button>
          {expanded===topic.id&&<div className="border-t px-4 pb-4 pt-3 sm:ml-12"><p className="text-sm leading-relaxed text-muted-foreground">{topic.objective}</p><div className="mt-3 flex flex-wrap items-center gap-3"><span className="text-xs text-muted-foreground">{topic.status==="completed"?"Illustrative completed state":topic.status==="in-progress"?"Illustrative progress state":"No saved progress in this preview"}</span><Btn v="outline" onClick={()=>go(topic.route)}>Open {topic.activity} <ArrowRight className="h-4 w-4"/></Btn></div></div>}
        </div>)}
        {topics.length===0&&<div className="rounded-xl border border-dashed p-8 text-center"><Search className="mx-auto h-6 w-6 text-muted-foreground"/><p className="mt-3 font-semibold">No topics match these filters</p><p className="mt-1 text-sm text-muted-foreground">Try another subject, status, or search term.</p><Btn v="outline" className="mt-4" onClick={()=>{setSubject("All subjects");setStatus("All topics");setQuery("")}}>Clear filters</Btn></div>}
        </div>
      </Card>
    </div>
  </AppFrame>;
}
