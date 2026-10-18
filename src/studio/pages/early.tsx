import { useState, type ReactNode } from "react";
import { Star, Play, Lock, Volume2, Crown } from "lucide-react";
import { Av, Btn, useGo, type Tone } from "../ui";
import { earlyNav } from "../navs";
import { cn } from "@/lib/utils";

function EarlyFrame({ active, children, title }: { active: string; children: ReactNode; title: string }) {
  const go = useGo();
  return (
    <div className="flex min-h-[760px] flex-col bg-kids">
      <header className="flex items-center justify-between px-5 py-4">
        <div className="flex items-center gap-3"><Av name="Bete K" tone="gold" size={48} /><div><p className="text-xs font-semibold text-muted-foreground">Hi Bete!</p><h2 className="font-display text-2xl font-semibold">{title}</h2></div></div>
        <div className="flex items-center gap-1 rounded-full bg-card px-4 py-2 text-lg font-extrabold text-gold shadow-card"><Star className="h-5 w-5 fill-current" />128</div>
      </header>
      <main className="flex-1 px-5 pb-5">{children}</main>
      <nav className="sticky bottom-0 mx-4 mb-4 flex justify-around rounded-3xl bg-card p-2 shadow-elevated">
        {earlyNav.map((n) => <button key={n.id} onClick={() => go(n.id)} className={cn("flex flex-col items-center gap-0.5 rounded-2xl px-3 py-2 text-[11px] font-bold", n.id === active ? "bg-primary text-primary-foreground" : "text-muted-foreground")}><n.icon className="h-6 w-6" />{n.label}</button>)}
      </nav>
    </div>
  );
}

function Tile({ emoji, label, tone, onClick, locked }: { emoji: string; label: string; tone: Tone; onClick?: () => void; locked?: boolean }) {
  return (
    <button onClick={onClick} className={cn("relative flex aspect-square flex-col items-center justify-center gap-2 rounded-3xl border-4 border-card shadow-card transition hover:-translate-y-1", `bg-${tone}-soft`, locked && "opacity-60")}>
      <span className="text-5xl">{emoji}</span><span className="text-sm font-extrabold">{label}</span>
      {locked && <Lock className="absolute right-3 top-3 h-4 w-4" />}
    </button>
  );
}

export function EarlyHome() {
  const go = useGo();
  return (
    <EarlyFrame active="early-home" title="Let's play & learn!">
      <div className="rounded-3xl bg-goldgrad p-6 text-navy shadow-elevated"><p className="text-sm font-bold">Today's adventure</p><p className="font-display text-3xl">Count the animals 🦒</p><Btn className="mt-4" size="lg" onClick={() => go("early-quiz")}><Play className="h-5 w-5 fill-current" /> Play now</Btn></div>
      <div className="mt-5 grid grid-cols-2 gap-4 @3xl:grid-cols-4">
        <Tile emoji="🔢" label="Numbers" tone="blue" onClick={() => go("early-games")} /><Tile emoji="🔤" label="Letters" tone="coral" onClick={() => go("early-games")} /><Tile emoji="🎨" label="Colours" tone="violet" onClick={() => go("early-games")} /><Tile emoji="🌍" label="World" tone="green" onClick={() => go("early-discover")} />
      </div>
    </EarlyFrame>
  );
}

export function EarlyGames() {
  const go = useGo();
  return (
    <EarlyFrame active="early-games" title="Games">
      <div className="grid grid-cols-2 gap-4 @3xl:grid-cols-3">
        {[["🧩", "Shape Match", "blue"], ["🐘", "Animal Sounds", "green"], ["🍎", "Fruit Count", "coral"], ["🚀", "Space Letters", "violet"], ["🎵", "Music Maker", "gold"], ["🏰", "Castle Maze", "gray"]].map(([e, l, t], i) => <Tile key={l} emoji={e} label={l} tone={t as Tone} locked={i === 5} onClick={() => go("early-quiz")} />)}
      </div>
    </EarlyFrame>
  );
}

export function EarlyQuiz() {
  const [pick, setPick] = useState<number | null>(null);
  return (
    <EarlyFrame active="early-games" title="How many giraffes?">
      <div className="rounded-3xl bg-card p-6 text-center shadow-card"><button className="mx-auto mb-2 grid h-10 w-10 place-items-center rounded-full bg-primary-soft text-primary"><Volume2 className="h-5 w-5" /></button><p className="text-6xl tracking-widest">🦒🦒🦒</p></div>
      <div className="mt-5 grid grid-cols-3 gap-4">
        {[2, 3, 4].map((n, i) => <button key={n} onClick={() => setPick(i)} className={cn("aspect-square rounded-3xl border-4 bg-card font-display text-6xl shadow-card transition", pick === i && (n === 3 ? "border-success bg-success-soft scale-105" : "border-coral bg-coral-soft"))}>{n}</button>)}
      </div>
      {pick === 1 && <div className="mt-5 rounded-3xl bg-success p-5 text-center text-2xl font-extrabold text-primary-foreground">🎉 Great job! +5 ⭐</div>}
      {pick !== null && pick !== 1 && <div className="mt-5 rounded-3xl bg-coral-soft p-5 text-center text-xl font-bold">Try again! You can do it 💪</div>}
    </EarlyFrame>
  );
}

export function EarlyVideos() {
  return (
    <EarlyFrame active="early-videos" title="Videos">
      <div className="grid gap-4 @3xl:grid-cols-2">
        {[["The Alphabet Song", "3 min", "coral", "🎤"], ["Counting to 20", "4 min", "blue", "🔢"], ["Why is the sky blue?", "5 min", "violet", "☁️"], ["Animals of Ethiopia", "6 min", "green", "🦁"]].map(([t, d, tone, e]) => (
          <div key={t} className="overflow-hidden rounded-3xl bg-card shadow-card"><div className={cn("relative grid aspect-video place-items-center text-6xl", `bg-${tone}-soft`)}>{e}<span className="absolute grid h-14 w-14 place-items-center rounded-full bg-card/90 shadow-elevated"><Play className="h-6 w-6 fill-primary text-primary" /></span></div><div className="p-4"><p className="font-extrabold">{t}</p><p className="text-xs text-muted-foreground">{d}</p></div></div>
        ))}
      </div>
    </EarlyFrame>
  );
}

export function EarlyDiscover() {
  return (
    <EarlyFrame active="early-discover" title="Discover">
      <div className="grid grid-cols-2 gap-4 @3xl:grid-cols-4">{[["🦋", "Bugs", "green"], ["🌋", "Volcanoes", "coral"], ["🐳", "Ocean", "blue"], ["🪐", "Planets", "violet"], ["🌱", "Plants", "green"], ["🦕", "Dinosaurs", "gold"], ["🌦️", "Weather", "blue"], ["🏔️", "Mountains", "gray"]].map(([e, l, t]) => <Tile key={l} emoji={e} label={l} tone={t as Tone} />)}</div>
    </EarlyFrame>
  );
}

export function EarlyProgress() {
  return (
    <EarlyFrame active="early-profile" title="My progress">
      <div className="space-y-4">{[["🔢", "Numbers", 4], ["🔤", "Letters", 3], ["🎨", "Colours", 5], ["🌍", "World", 2]].map(([e, l, s]) => (
        <div key={l as string} className="flex items-center gap-4 rounded-3xl bg-card p-4 shadow-card"><span className="text-4xl">{e}</span><p className="flex-1 text-lg font-extrabold">{l}</p><div className="flex gap-1">{[1, 2, 3, 4, 5].map((k) => <Star key={k} className={cn("h-7 w-7", k <= (s as number) ? "fill-gold text-gold" : "text-muted")} />)}</div></div>
      ))}</div>
    </EarlyFrame>
  );
}

export function EarlyCollection() {
  const st = ["🦁", "🐼", "🦄", "🐸", "🐙", "🦊", "🐢", "🦉", "🐝", "🐬", "🦖", "🐧"];
  return (
    <EarlyFrame active="early-collection" title="Sticker book">
      <p className="mb-3 text-sm font-bold text-muted-foreground">8 of 12 collected</p>
      <div className="grid grid-cols-3 gap-3 @3xl:grid-cols-6">{st.map((s, i) => <div key={s} className={cn("grid aspect-square place-items-center rounded-3xl border-4 border-dashed text-5xl", i < 8 ? "border-gold bg-card" : "border-border bg-muted/50 grayscale opacity-40")}>{i < 8 ? s : "?"}</div>)}</div>
    </EarlyFrame>
  );
}

export function EarlyProfile() {
  const go = useGo();
  return (
    <EarlyFrame active="early-profile" title="That's me!">
      <div className="rounded-3xl bg-card p-6 text-center shadow-card"><div className="mx-auto w-fit"><Av name="Bete K" tone="gold" size={110} /></div><p className="mt-3 font-display text-3xl">Bete</p><p className="font-bold text-muted-foreground">Age 6 · Explorer ⭐ Level 7</p>
        <div className="mt-5 grid grid-cols-3 gap-3">{[["⭐", "128"], ["🔥", "5 days"], ["🏅", "9"]].map(([e, v]) => <div key={e} className="rounded-2xl bg-muted p-3"><p className="text-2xl">{e}</p><p className="font-extrabold">{v}</p></div>)}</div>
        <div className="mt-5 flex justify-center gap-2"><Btn onClick={() => go("early-progress")}>My progress</Btn><Btn v="gold" onClick={() => go("early-leaderboard")}>Star board</Btn></div></div>
    </EarlyFrame>
  );
}

export function EarlyLeaderboard() {
  return (
    <EarlyFrame active="early-profile" title="Star board">
      <div className="space-y-3">{[["Mimi", 162, "violet"], ["Bete", 128, "gold"], ["Kaleb", 115, "green"], ["Selam", 98, "coral"], ["Noah", 87, "blue"]].map(([n, s, t], i) => (
        <div key={n as string} className={cn("flex items-center gap-4 rounded-3xl p-4 shadow-card", n === "Bete" ? "bg-goldgrad" : "bg-card")}><span className="w-8 text-center font-display text-2xl">{i === 0 ? <Crown className="mx-auto h-7 w-7 text-gold" /> : i + 1}</span><Av name={n as string} tone={t as Tone} size={48} /><p className="flex-1 text-lg font-extrabold">{n}</p><span className="flex items-center gap-1 text-lg font-extrabold"><Star className="h-5 w-5 fill-gold text-gold" />{s}</span></div>
      ))}</div>
    </EarlyFrame>
  );
}
