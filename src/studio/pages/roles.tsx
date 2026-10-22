import { useState } from "react";
import {
  Users, TrendingUp, Clock, AlertTriangle, BookOpen, GraduationCap, Plus, Shield, Server, Building2, Wallet, ArrowUpRight, ArrowDownRight,
  Crown, Activity, Globe, Brain, Lightbulb, CheckCircle2, Circle, FileText, Upload, Database, RefreshCw, Play, Eye, Pencil, Trash2,
} from "lucide-react";
import { AppFrame, Av, Bar, Btn, Card, IconBox, Pill, SectionTitle, Stat, type Tone } from "../ui";
import { staffNav } from "../navs";
import { cn } from "@/lib/utils";

function Table({ head, rows }: { head: string[]; rows: React.ReactNode[][] }) {
  return (
    <div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr className="border-b text-left text-xs uppercase text-muted-foreground">{head.map((h) => <th key={h} className="px-3 py-2 font-semibold">{h}</th>)}</tr></thead>
      <tbody>{rows.map((r, i) => <tr key={i} className="border-b last:border-0 hover:bg-muted/50">{r.map((c, j) => <td key={j} className="whitespace-nowrap px-3 py-3">{c}</td>)}</tr>)}</tbody></table></div>
  );
}
function Chart({ data, tone = "bg-brand" }: { data: number[]; tone?: string }) {
  return <div className="flex h-40 items-end gap-2">{data.map((h, i) => <div key={i} className={cn("flex-1 rounded-t-md", tone)} style={{ height: `${h}%` }} />)}</div>;
}

export function ParentDashboard() {
  const [kid, setKid] = useState("Amara");
  return (
    <AppFrame nav={staffNav("parent")} active="parent-dashboard" role="Parent" title="Family overview" subtitle="Weekly report · Oct 12 – 18">
      <div className="flex gap-2">{["Amara", "Nahom"].map((k) => <button key={k} onClick={() => setKid(k)} className={cn("flex items-center gap-2 rounded-full border py-1 pl-1 pr-4 text-sm font-semibold", kid === k && "border-primary bg-primary-soft text-primary")}><Av name={k} tone={k === "Amara" ? "blue" : "green"} size={28} />{k}</button>)}</div>
      <div className="mt-5 grid grid-cols-2 gap-3 @3xl:grid-cols-4"><Stat label="Study time" value={kid === "Amara" ? "9.4h" : "5.1h"} icon={Clock} /><Stat label="Avg score" value={kid === "Amara" ? "86%" : "72%"} delta="+4%" icon={TrendingUp} tone="green" /><Stat label="Streak" value="17d" icon={Activity} tone="coral" /><Stat label="Rank in class" value="3rd" icon={Crown} tone="gold" /></div>
      <div className="mt-5 grid gap-5 @4xl:grid-cols-3">
        <Card className="@4xl:col-span-2"><SectionTitle title="Daily study minutes" /><Chart data={[40, 65, 50, 80, 72, 90, 30]} /></Card>
        <Card><SectionTitle title="Needs attention" /><div className="flex gap-3 rounded-xl bg-coral-soft p-3"><AlertTriangle className="h-5 w-5 shrink-0 text-coral" /><p className="text-sm">Chemistry score dropped 12% this week. Suggested: 3 revision sessions.</p></div><div className="mt-3 flex gap-3 rounded-xl bg-success-soft p-3"><CheckCircle2 className="h-5 w-5 shrink-0 text-success" /><p className="text-sm">Completed all planned Biology sessions.</p></div><Btn className="mt-4 w-full" v="outline">Message teacher</Btn></Card>
      </div>
    </AppFrame>
  );
}

export function TeacherPortal() {
  return (
    <AppFrame nav={staffNav("teacher")} active="teacher-portal" role="Teacher" title="My classes" subtitle="Mr. Bekele · Physics" actions={<Btn size="sm"><Plus className="h-4 w-4" /> Assign quiz</Btn>}>
      <div className="grid gap-4 @3xl:grid-cols-3">{[["11A", 42, 81], ["11B", 39, 74], ["12C", 36, 68]].map(([c, n, p]) => <Card key={c as string}><div className="flex justify-between"><IconBox icon={GraduationCap} /><Pill tone="green">{p}% avg</Pill></div><p className="mt-3 text-lg font-bold">Grade {c}</p><p className="text-sm text-muted-foreground">{n} students</p><Bar value={p as number} className="mt-3" /></Card>)}</div>
      <Card className="mt-5"><SectionTitle title="Assignments · 11A" />
        <Table head={["Assignment", "Due", "Submitted", "Avg", ""]} rows={[["Kinematics quiz", "Oct 20", "38/42", <Pill tone="green">84%</Pill>, <Eye className="h-4 w-4" />], ["Forces worksheet", "Oct 23", "21/42", <Pill tone="gold">71%</Pill>, <Eye className="h-4 w-4" />], ["Midterm mock", "Oct 27", "0/42", <Pill tone="gray">—</Pill>, <Eye className="h-4 w-4" />]]} /></Card>
    </AppFrame>
  );
}

export function AdminPortal() {
  return (
    <AppFrame nav={staffNav("admin")} active="admin-portal" role="School Admin" title="School administration" subtitle="Unity School · 1,842 users">
      <div className="grid grid-cols-2 gap-3 @3xl:grid-cols-4"><Stat label="Students" value="1,640" icon={Users} /><Stat label="Teachers" value="84" icon={GraduationCap} tone="green" /><Stat label="Active today" value="1,122" icon={Activity} tone="violet" /><Stat label="Open tickets" value="7" icon={AlertTriangle} tone="coral" /></div>
      <Card className="mt-5"><SectionTitle title="Users" action={<Btn size="sm"><Plus className="h-4 w-4" />Invite</Btn>} />
        <Table head={["Name", "Role", "Class", "Status", ""]} rows={[["Amara Tesfaye", "Student", "11A", "Active", "blue"], ["Mr. Bekele", "Teacher", "Physics", "Active", "green"], ["Hana Girma", "Student", "11B", "Suspended", "violet"], ["Mrs. Alemu", "Parent", "—", "Pending", "gold"]].map(([n, r, c, s, t]) => [<span className="flex items-center gap-2"><Av name={n ?? "Sample user"} tone={t as Tone} size={28} />{n}</span>, r, c, <Pill tone={s === "Active" ? "green" : s === "Pending" ? "gold" : "coral"}>{s}</Pill>, <span className="flex gap-2 text-muted-foreground"><Pencil className="h-4 w-4" /><Trash2 className="h-4 w-4" /></span>])} /></Card>
    </AppFrame>
  );
}

export function ManagerDashboard() {
  return (
    <AppFrame nav={staffNav("manager")} active="manager-dashboard" role="Manager" title="Branch performance" subtitle="12 partner schools · Q4">
      <div className="grid grid-cols-2 gap-3 @3xl:grid-cols-4"><Stat label="Schools" value="12" icon={Building2} /><Stat label="Enrolment" value="14.2k" delta="+8%" icon={Users} tone="green" /><Stat label="Engagement" value="71%" icon={Activity} tone="violet" /><Stat label="Renewals due" value="3" icon={Clock} tone="gold" /></div>
      <div className="mt-5 grid gap-5 @4xl:grid-cols-2">
        <Card><SectionTitle title="Monthly active students" /><Chart data={[50, 58, 61, 66, 70, 75, 80, 84, 82, 90]} /></Card>
        <Card><SectionTitle title="Top schools" />{[["Unity School", 92], ["Bole Academy", 88], ["Hawassa Prep", 79], ["Adama STEM", 73]].map(([s, v]) => <div key={s as string} className="mb-3"><div className="flex justify-between text-sm"><span>{s}</span><b>{v}%</b></div><Bar value={v as number} tone="green" className="mt-1" /></div>)}</Card>
      </div>
    </AppFrame>
  );
}

export function FinancePortal() {
  return (
    <AppFrame nav={staffNav("finance")} active="finance-portal" role="Finance" title="Finance" subtitle="October 2026 · ETB">
      <div className="grid grid-cols-2 gap-3 @3xl:grid-cols-4"><Stat label="MRR" value="1.84M" delta="+12%" icon={Wallet} tone="green" /><Stat label="Subscriptions" value="9,412" icon={Users} /><Stat label="Churn" value="2.1%" icon={ArrowDownRight} tone="coral" /><Stat label="Outstanding" value="212k" icon={Clock} tone="gold" /></div>
      <div className="mt-5 grid gap-5 @4xl:grid-cols-3">
        <Card className="@4xl:col-span-2"><SectionTitle title="Revenue" /><Chart data={[40, 45, 52, 50, 61, 68, 72, 79, 85, 92]} tone="bg-success" /></Card>
        <Card><SectionTitle title="Plan mix" />{[["Premium", 54, "blue"], ["School license", 31, "violet"], ["Family", 15, "gold"]].map(([p, v, t]) => <div key={p as string} className="mb-3"><div className="flex justify-between text-sm"><span>{p}</span><b>{v}%</b></div><Bar value={v as number} tone={t as Tone} className="mt-1" /></div>)}</Card>
      </div>
      <Card className="mt-5"><SectionTitle title="Recent transactions" /><Table head={["ID", "Customer", "Method", "Amount", "Status"]} rows={[["#TX-9821", "Bole Academy", "Bank transfer", "84,000", "Paid"], ["#TX-9820", "Tesfaye family", "Telebirr", "450", "Paid"], ["#TX-9819", "Adama STEM", "Invoice", "62,500", "Overdue"]].map((r) => [...r.slice(0, 4), <Pill tone={r[4] === "Paid" ? "green" : "coral"}>{r[4]}</Pill>])} /></Card>
    </AppFrame>
  );
}

export function OwnerControl() {
  const [flags, setFlags] = useState({ "AI Tutor v2": true, "Tournaments payouts": true, "Early Learner beta": false, "Maintenance mode": false });
  return (
    <AppFrame nav={staffNav("owner")} active="owner-control" role="Owner" title="Control Center" subtitle="Platform-wide · all regions">
      <div className="grid grid-cols-2 gap-3 @3xl:grid-cols-4"><Stat label="Total users" value="48.6k" delta="+1.2k wk" icon={Globe} /><Stat label="Revenue YTD" value="16.4M" icon={Wallet} tone="green" /><Stat label="Uptime" value="99.98%" icon={Server} tone="violet" /><Stat label="Incidents" value="0" icon={Shield} tone="gold" /></div>
      <div className="mt-5 grid gap-5 @4xl:grid-cols-2">
        <Card><SectionTitle title="Feature flags" />{Object.entries(flags).map(([k, v]) => <div key={k} className="flex items-center justify-between border-b py-3 last:border-0"><span className="text-sm font-medium">{k}</span><button onClick={() => setFlags({ ...flags, [k]: !v })} className={cn("h-6 w-11 rounded-full p-0.5", v ? "bg-primary" : "bg-muted")}><span className={cn("block h-5 w-5 rounded-full bg-card shadow transition", v && "translate-x-5")} /></button></div>)}</Card>
        <Card><SectionTitle title="Audit log" />{[["Role changed: Mrs. Alemu → Admin", "2m"], ["Payout batch #44 approved", "1h"], ["New school onboarded: Gondar Prep", "4h"], ["Content pack published: Chem G12", "1d"]].map(([e, t]) => <div key={e} className="flex items-center gap-3 border-b py-3 text-sm last:border-0"><Circle className="h-2 w-2 fill-primary text-primary" /><span className="flex-1">{e}</span><span className="text-xs text-muted-foreground">{t}</span></div>)}</Card>
      </div>
    </AppFrame>
  );
}

export function AcademicInsights() {
  return (
    <AppFrame nav={staffNav("teacher")} active="academic-insights" role="Insights" title="Academic Insights" subtitle="Cohort: Grade 11 · 1,640 students">
      <div className="grid gap-5 @4xl:grid-cols-3">
        <Card className="@4xl:col-span-2"><SectionTitle title="Score distribution" /><Chart data={[8, 14, 26, 42, 64, 88, 72, 50, 30, 12]} /><div className="mt-2 flex justify-between text-[10px] text-muted-foreground"><span>0%</span><span>50%</span><span>100%</span></div></Card>
        <Card><SectionTitle title="Key findings" />{["Vectors is the #1 weak topic (42% avg)", "Students studying after 9pm score 8% lower", "Flashcard users retain 23% more"].map((f) => <div key={f} className="mb-3 flex gap-2 text-sm"><Lightbulb className="h-4 w-4 shrink-0 text-gold" />{f}</div>)}</Card>
      </div>
      <Card className="mt-5"><SectionTitle title="Subject heatmap" /><div className="grid grid-cols-[100px_repeat(6,1fr)] gap-1 text-xs">{["", "W1", "W2", "W3", "W4", "W5", "W6"].map((h) => <span key={h} className="font-semibold text-muted-foreground">{h}</span>)}
        {["Math", "Physics", "Biology", "Chemistry"].map((s, r) => [<span key={s} className="font-semibold">{s}</span>, ...Array.from({ length: 6 }, (_, c) => { const v = (r * 3 + c * 7) % 5; return <div key={s + c} className={cn("h-8 rounded", ["bg-coral-soft", "bg-gold-soft", "bg-primary-soft", "bg-success-soft", "bg-success"][v])} />; })])}</div></Card>
    </AppFrame>
  );
}

export function LearningDNA() {
  const traits: [string, number, Tone][] = [["Visual", 82, "blue"], ["Analytical", 74, "violet"], ["Persistence", 88, "green"], ["Speed", 61, "gold"], ["Collaboration", 55, "coral"]];
  return (
    <AppFrame nav={staffNav("parent")} active="learning-dna" role="Insights" title="Learning DNA" subtitle="Amara's learning profile">
      <div className="grid gap-5 @4xl:grid-cols-2">
        <Card className="bg-hero border-0 text-navy-foreground"><Brain className="h-8 w-8 text-gold" /><p className="mt-3 font-display text-3xl">The Persistent Visualiser</p><p className="mt-2 text-sm text-navy-muted">Learns best through diagrams and repetition. Thrives in morning sessions and short focused bursts of 20–25 minutes.</p>
          <div className="mt-5 flex flex-wrap gap-2">{["Morning learner", "Diagram-first", "Competitive"].map((t) => <Pill key={t} tone="gold">{t}</Pill>)}</div></Card>
        <Card><SectionTitle title="Traits" />{traits.map(([t, v, tone]) => <div key={t} className="mb-4"><div className="flex justify-between text-sm"><span>{t}</span><b>{v}</b></div><Bar value={v} tone={tone} className="mt-1.5 h-3" /></div>)}</Card>
      </div>
      <Card className="mt-5"><SectionTitle title="Recommendations" /><div className="grid gap-3 @3xl:grid-cols-3">{["Use concept maps for Chemistry", "Schedule hard topics before 11am", "Join a study squad to build collaboration"].map((r) => <div key={r} className="rounded-xl bg-primary-soft p-4 text-sm font-medium">{r}</div>)}</div></Card>
    </AppFrame>
  );
}

export function TopicCoverage() {
  const topics: [string, number, string][] = [["1. Measurement", 100, "done"], ["2. Kinematics", 100, "done"], ["3. Dynamics", 72, "progress"], ["4. Work & Energy", 40, "progress"], ["5. Rotational motion", 0, "todo"], ["6. Fluids", 0, "todo"]];
  return (
    <AppFrame nav={staffNav("teacher")} active="topic-coverage" role="Teacher" title="Topic Coverage" subtitle="Physics · Grade 11 curriculum">
      <div className="grid gap-3 @3xl:grid-cols-3"><Stat label="Curriculum covered" value="52%" icon={BookOpen} /><Stat label="Questions in bank" value="1,284" icon={FileText} tone="violet" /><Stat label="Gaps" value="3 topics" icon={AlertTriangle} tone="coral" /></div>
      <Card className="mt-5">{topics.map(([t, v, s]) => <div key={t} className="grid grid-cols-[20px_1fr_40px] items-center gap-3 border-b py-3 last:border-0">{s === "done" ? <CheckCircle2 className="h-5 w-5 text-success" /> : s === "progress" ? <Clock className="h-5 w-5 text-gold" /> : <Circle className="h-5 w-5 text-muted-foreground" />}<span className="flex-1 text-sm font-medium">{t}</span><div className="col-start-2 row-start-2 w-full"><Bar value={v} tone={s === "done" ? "green" : "gold"} /></div><span className="col-start-3 row-start-1 whitespace-nowrap text-right text-sm font-bold">{v}%</span></div>)}</Card>
    </AppFrame>
  );
}

export function ContentAdmin() {
  return (
    <AppFrame nav={staffNav("content")} active="content-admin" role="Content" title="Content Admin" subtitle="Question bank & resources" actions={<Btn size="sm"><Upload className="h-4 w-4" /> Import</Btn>}>
      <div className="flex flex-wrap gap-2">{["All 12,480", "Draft 214", "In review 58", "Published 12,208"].map((t, i) => <Pill key={t} tone={i === 0 ? "blue" : "gray"} className="px-3 py-1 text-xs">{t}</Pill>)}</div>
      <Card className="mt-4"><Table head={["Question", "Subject", "Grade", "Difficulty", "Status"]} rows={[["Find the acceleration of a car…", "Physics", "11", "Medium", "Published"], ["Balance: Fe + O₂ → Fe₂O₃", "Chemistry", "10", "Easy", "In review"], ["Solve log₂x + log₂(x−2) = 3", "Math", "11", "Hard", "Draft"], ["Identify the main idea of…", "English", "9", "Easy", "Published"]].map((r) => [<span className="max-w-56 truncate block">{r[0]}</span>, r[1], r[2], r[3], <Pill tone={r[4] === "Published" ? "green" : r[4] === "Draft" ? "gray" : "gold"}>{r[4]}</Pill>])} /></Card>
    </AppFrame>
  );
}

export function MigrationTools() {
  const [run, setRun] = useState(false);
  return (
    <AppFrame nav={staffNav("admin")} active="migration-tools" role="System" title="Migration & System Tools" subtitle="Maintenance utilities (design mock)">
      <div className="grid gap-4 @3xl:grid-cols-3">{[[Database, "Database", "Healthy", "green"], [Server, "API latency", "142ms", "blue"], [RefreshCw, "Queue", "12 jobs", "gold"]].map(([I, l, v, t]) => <Card key={l as string} className="flex items-center gap-3"><IconBox icon={I as typeof Database} tone={t as Tone} /><div><p className="text-xs text-muted-foreground">{l as string}</p><b>{v as string}</b></div></Card>)}</div>
      <Card className="mt-5"><SectionTitle title="Migrations" action={<Btn size="sm" onClick={() => setRun(true)}><Play className="h-4 w-4" />Run pending</Btn>} />
        {[["2026_10_01_add_tournaments", true], ["2026_10_09_learning_dna", true], ["2026_10_17_early_learner_tables", run]].map(([m, d]) => <div key={m as string} className="flex items-center gap-3 border-b py-3 font-mono text-xs last:border-0">{d ? <CheckCircle2 className="h-4 w-4 text-success" /> : <Clock className="h-4 w-4 text-gold" />}<span className="flex-1">{m as string}</span><Pill tone={d ? "green" : "gold"}>{d ? "Applied" : "Pending"}</Pill></div>)}</Card>
      <Card className="mt-5 bg-navy border-0 font-mono text-xs text-navy-muted"><p>$ mm-cli sync --dry-run</p><p className="text-success">✓ 12,480 questions validated</p><p className="text-gold">! 3 orphaned media files</p><p>{run ? "✓ migration applied in 1.2s" : "_"}</p></Card>
    </AppFrame>
  );
}

export { ArrowUpRight };
