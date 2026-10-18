import { useState } from "react";
import { ArrowRight, Brain, Trophy, Users, Bot, Check, Mail, Lock, User, GraduationCap, Sparkles } from "lucide-react";
import { Btn, Card, IconBox, Logo, Pill, useGo } from "../ui";
import { cn } from "@/lib/utils";

export function Landing() {
  const go = useGo();
  return (
    <div className="bg-background">
      <header className="flex items-center justify-between px-6 py-4">
        <Logo />
        <div className="hidden gap-6 text-sm font-medium text-muted-foreground @2xl:flex">
          <span>Features</span><span>Schools</span><span>Parents</span><span>Pricing</span>
        </div>
        <div className="flex gap-2"><Btn v="ghost" size="sm" onClick={() => go("login")}>Log in</Btn><Btn size="sm" onClick={() => go("signup")}>Get started</Btn></div>
      </header>
      <section className="mx-4 overflow-hidden rounded-3xl bg-hero px-6 py-14 text-navy-foreground @3xl:px-14">
        <div className="grid items-center gap-10 @4xl:grid-cols-2">
          <div>
            <Pill tone="gold">New · Season 4 Tournaments</Pill>
            <h1 className="mt-4 font-display text-4xl font-semibold leading-tight @3xl:text-6xl">Learn. Compete.<br />Level Up.</h1>
            <p className="mt-4 max-w-md text-navy-muted">The national-curriculum learning platform where every quiz earns XP, every topic builds mastery, and every student has an AI tutor.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Btn size="lg" onClick={() => go("signup")}>Start learning free <ArrowRight className="h-4 w-4" /></Btn>
              <Btn size="lg" v="outline" onClick={() => go("student-dashboard")}>See a demo</Btn>
            </div>
            <div className="mt-8 flex gap-8 text-sm"><div><b className="text-2xl">48k</b><p className="text-navy-muted">students</p></div><div><b className="text-2xl">1.2M</b><p className="text-navy-muted">quizzes taken</p></div><div><b className="text-2xl">320</b><p className="text-navy-muted">schools</p></div></div>
          </div>
          <div className="relative">
            <div className="rounded-2xl bg-card p-5 text-foreground shadow-elevated">
              <div className="flex items-center justify-between"><p className="text-sm font-bold">Biology · Cell Division</p><Pill tone="green">+120 XP</Pill></div>
              <p className="mt-4 font-semibold">Which phase of mitosis aligns chromosomes at the equator?</p>
              {["Prophase", "Metaphase", "Anaphase", "Telophase"].map((o, i) => (
                <div key={o} className={cn("mt-2 rounded-xl border px-4 py-2.5 text-sm", i === 1 && "border-primary bg-primary-soft font-semibold text-primary")}>{o}</div>
              ))}
            </div>
            <div className="absolute -bottom-4 -left-4 hidden rounded-2xl bg-card p-3 text-foreground shadow-elevated @3xl:flex items-center gap-2"><IconBox icon={Trophy} tone="gold" size={32} /><div className="text-xs"><b>Rank #3</b><p className="text-muted-foreground">this week</p></div></div>
          </div>
        </div>
      </section>
      <section className="grid gap-4 px-6 py-12 @2xl:grid-cols-2 @4xl:grid-cols-4">
        {[[Brain, "Adaptive quizzes", "blue"], [Bot, "AI tutor 24/7", "violet"], [Trophy, "Live tournaments", "gold"], [Users, "Study squads", "green"]].map(([I, t, tone]) => (
          <Card key={t as string}><IconBox icon={I as typeof Brain} tone={tone as "blue"} /><p className="mt-3 font-bold">{t as string}</p><p className="mt-1 text-sm text-muted-foreground">Built around your grade, stream and exam calendar.</p></Card>
        ))}
      </section>
    </div>
  );
}

function AuthShell({ children, title, sub }: { children: React.ReactNode; title: string; sub: string }) {
  return (
    <div className="grid min-h-[720px] @4xl:grid-cols-2">
      <div className="hidden flex-col justify-between bg-hero p-10 text-navy-foreground @4xl:flex">
        <Logo light />
        <div><p className="font-display text-4xl leading-tight">“I went from a C to an A in Physics in one term.”</p><p className="mt-4 text-sm text-navy-muted">— Liya, Grade 11, Addis Ababa</p></div>
        <p className="text-xs text-navy-muted">Learn. Compete. Level Up.</p>
      </div>
      <div className="grid place-items-center bg-background p-6">
        <div className="w-full max-w-sm">
          <h1 className="font-display text-3xl font-semibold">{title}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{sub}</p>
          <div className="mt-6 space-y-3">{children}</div>
        </div>
      </div>
    </div>
  );
}

function Field({ icon: I, label, type = "text", ph }: { icon: typeof Mail; label: string; type?: string; ph: string }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold">{label}</span>
      <div className="mt-1 flex items-center gap-2 rounded-xl border bg-card px-3 focus-within:ring-2 focus-within:ring-ring">
        <I className="h-4 w-4 text-muted-foreground" />
        <input type={type} placeholder={ph} className="h-11 w-full bg-transparent text-sm outline-none" />
      </div>
    </label>
  );
}

export function Login() {
  const go = useGo();
  return (
    <AuthShell title="Welcome back" sub="Log in to continue your streak.">
      <Field icon={Mail} label="Email or phone" ph="amara@school.et" />
      <Field icon={Lock} label="Password" type="password" ph="••••••••" />
      <div className="flex justify-between text-xs"><label className="flex items-center gap-2"><input type="checkbox" defaultChecked /> Remember me</label><span className="font-semibold text-primary">Forgot password?</span></div>
      <Btn className="w-full" size="lg" onClick={() => go("student-dashboard")}>Log in</Btn>
      <Btn className="w-full" v="outline" onClick={() => go("student-dashboard")}>Continue with Google</Btn>
      <p className="text-center text-sm text-muted-foreground">New here? <button className="font-semibold text-primary" onClick={() => go("signup")}>Create an account</button></p>
    </AuthShell>
  );
}

export function SignUp() {
  const go = useGo();
  const [role, setRole] = useState("Student");
  return (
    <AuthShell title="Create your account" sub="Free for students. Takes 30 seconds.">
      <div className="grid grid-cols-3 gap-2">
        {["Student", "Parent", "Teacher"].map((r) => (
          <button key={r} onClick={() => setRole(r)} className={cn("rounded-xl border py-2 text-sm font-semibold", role === r ? "border-primary bg-primary-soft text-primary" : "bg-card")}>{r}</button>
        ))}
      </div>
      <Field icon={User} label="Full name" ph="Amara Tesfaye" />
      <Field icon={Mail} label="Email" ph="amara@school.et" />
      <Field icon={Lock} label="Password" type="password" ph="At least 8 characters" />
      <Btn className="w-full" size="lg" onClick={() => go("academic-setup")}>Continue as {role}</Btn>
      <p className="text-center text-sm text-muted-foreground">Have an account? <button className="font-semibold text-primary" onClick={() => go("login")}>Log in</button></p>
    </AuthShell>
  );
}

export function AcademicSetup() {
  const go = useGo();
  const [grade, setGrade] = useState(11);
  const [stream, setStream] = useState("Natural Science");
  const [subs, setSubs] = useState(["Physics", "Biology", "Mathematics"]);
  const all = ["Mathematics", "Physics", "Chemistry", "Biology", "English", "Amharic", "ICT", "Civics"];
  return (
    <div className="grid min-h-[720px] place-items-center bg-canvas p-6">
      <Card className="w-full max-w-2xl p-8">
        <div className="flex items-center justify-between"><Logo /><span className="text-xs font-semibold text-muted-foreground">Step 2 of 3</span></div>
        <div className="mt-4 flex gap-2">{[1, 2, 3].map((s) => <div key={s} className={cn("h-1.5 flex-1 rounded-full", s <= 2 ? "bg-primary" : "bg-muted")} />)}</div>
        <h1 className="mt-6 font-display text-3xl font-semibold">Set up your academics</h1>
        <p className="text-sm text-muted-foreground">We'll personalise quizzes and your study plan.</p>
        <p className="mt-6 text-xs font-bold uppercase tracking-wider text-muted-foreground">Grade</p>
        <div className="mt-2 grid grid-cols-4 gap-2 @2xl:grid-cols-8">
          {[5, 6, 7, 8, 9, 10, 11, 12].map((g) => <button key={g} onClick={() => setGrade(g)} className={cn("rounded-xl border py-3 font-bold", g === grade ? "border-primary bg-primary text-primary-foreground" : "bg-card")}>{g}</button>)}
        </div>
        <p className="mt-6 text-xs font-bold uppercase tracking-wider text-muted-foreground">Stream</p>
        <div className="mt-2 grid gap-2 @2xl:grid-cols-2">
          {["Natural Science", "Social Science"].map((s) => <button key={s} onClick={() => setStream(s)} className={cn("flex items-center gap-3 rounded-xl border p-4 text-left", s === stream && "border-primary bg-primary-soft")}><GraduationCap className="h-5 w-5 text-primary" /><span className="font-semibold">{s}</span></button>)}
        </div>
        <p className="mt-6 text-xs font-bold uppercase tracking-wider text-muted-foreground">Focus subjects</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {all.map((s) => { const on = subs.includes(s); return <button key={s} onClick={() => setSubs(on ? subs.filter((x) => x !== s) : [...subs, s])} className={cn("flex items-center gap-1 rounded-full border px-3 py-1.5 text-sm", on && "border-primary bg-primary-soft font-semibold text-primary")}>{on && <Check className="h-3 w-3" />}{s}</button>; })}
        </div>
        <div className="mt-8 flex justify-between"><Btn v="ghost" onClick={() => go("signup")}>Back</Btn><Btn onClick={() => go("student-dashboard")}><Sparkles className="h-4 w-4" /> Build my plan</Btn></div>
      </Card>
    </div>
  );
}
