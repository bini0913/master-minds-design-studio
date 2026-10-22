import { useState } from "react";
import { Trophy, Users, Swords, Crown, Medal, Heart, MessageCircle, Share2, UserPlus, Send, Bell, Zap, Calendar, Check, Search } from "lucide-react";
import { AppFrame, Av, Btn, Card, IconBox, Pill, SectionTitle, useGo, type Tone } from "../ui";
import { studentNav } from "../navs";
import { cn } from "@/lib/utils";

const people: [string, Tone, number, string][] = [
  ["Liya Haile", "violet", 9820, "Bole Academy"], ["Dawit Bekele", "green", 9410, "Hawassa Prep"], ["Amara Tesfaye", "blue", 9105, "Unity School"],
  ["Sara Mekonnen", "gold", 8870, "Bahir Dar High"], ["Yonas Alemu", "coral", 8640, "Adama STEM"], ["Hana Girma", "violet", 8310, "Unity School"], ["Abel Tadesse", "green", 7990, "Mekelle Prep"],
];

export function MultiplayerLobby() {
  const go = useGo();
  const [ready, setReady] = useState(false);
  return (
    <AppFrame nav={studentNav} active="leaderboard" title="Multiplayer Lobby" subtitle="Room #MM-4821 · Physics · 10 questions">
      <div className="grid gap-5 @4xl:grid-cols-3">
        <Card className="@4xl:col-span-2 bg-hero border-0 text-navy-foreground">
          <div className="grid grid-cols-3 items-center gap-4 py-8 text-center">
            <div><div className="mx-auto w-fit rounded-full ring-4 ring-primary"><Av name="Amara Tesfaye" size={80} /></div><p className="mt-3 font-bold">You</p><Pill tone={ready ? "green" : "gray"}>{ready ? "Ready" : "Not ready"}</Pill></div>
            <div><Swords className="mx-auto h-12 w-12 text-gold" /><p className="mt-2 font-display text-3xl">VS</p></div>
            <div><div className="mx-auto w-fit rounded-full ring-4 ring-coral"><Av name="Dawit Bekele" tone="green" size={80} /></div><p className="mt-3 font-bold">Dawit</p><Pill tone="green">Ready</Pill></div>
          </div>
          <div className="flex justify-center gap-3"><Btn v={ready ? "outline" : "gold"} onClick={() => setReady(!ready)}>{ready ? "Cancel" : "I'm ready"}</Btn>{ready && <Btn onClick={() => go("quiz-taking")}><Zap className="h-4 w-4" /> Start match</Btn>}</div>
        </Card>
        <Card><SectionTitle title="Open rooms" />
          {[["Math Blitz", "3/4", "blue"], ["Bio Battle", "1/2", "green"], ["Chem Rush", "5/8", "coral"]].map(([n, c, t]) => <div key={n} className="flex items-center gap-3 border-b py-3 last:border-0"><IconBox icon={Users} tone={t as Tone} size={32} /><div className="flex-1 text-sm"><b>{n}</b><p className="text-xs text-muted-foreground">{c} players</p></div><Btn size="sm" v="secondary">Join</Btn></div>)}
          <Btn className="mt-3 w-full" v="outline">Create private room</Btn>
        </Card>
      </div>
    </AppFrame>
  );
}

export function Tournaments() {
  const go = useGo();
  const [registered, setRegistered] = useState<string[]>([]);
  const [bracket, setBracket] = useState(false);
  return (
    <AppFrame nav={studentNav} active="leaderboard" title="Tournaments" subtitle="Compete nationally, win real prizes">
      <div className="overflow-hidden rounded-2xl bg-hero p-7 text-navy-foreground">
        <Pill tone="coral">● LIVE</Pill><h3 className="mt-3 font-display text-3xl">National Math Cup 2026</h3><p className="text-navy-muted">Round 3 of 5 · 1,204 players remaining · Prize pool 50,000 ETB</p>
        <div className="mt-5 flex flex-wrap gap-3"><Btn v="gold" onClick={() => go("multiplayer-lobby")}><Trophy className="h-4 w-4" /> Enter round</Btn><Btn v="outline" onClick={() => setBracket(!bracket)}>View bracket</Btn></div>
      </div>
      {bracket && <Card className="mt-4"><SectionTitle title="Quarter finals" /><div className="grid gap-3 @2xl:grid-cols-2">{["Liya vs Dawit", "Amara vs Sara", "Yonas vs Hana", "Abel vs Kaleb"].map((match) => <div key={match} className="rounded-lg border p-3 text-sm font-semibold">{match}<p className="mt-1 text-xs text-muted-foreground">Round 3 · Mathematics</p></div>)}</div></Card>}
      <div className="mt-5 grid gap-4 @3xl:grid-cols-3">
        {[["Physics Grand Prix", "Starts Oct 25", "violet", "2,300 registered"], ["Biology Olympiad", "Starts Nov 2", "green", "1,780 registered"], ["Spelling Bee Jr.", "Starts Nov 9", "gold", "940 registered"]].map(([n, d, t, r]) => (
          <Card key={n}><IconBox icon={Medal} tone={t as Tone} /><p className="mt-3 font-bold">{n}</p><p className="text-sm text-muted-foreground">{r}</p><div className="mt-4 flex flex-wrap gap-2 items-center justify-between"><Pill tone="gray"><Calendar className="h-3 w-3" />{d}</Pill><Btn size="sm" disabled={registered.includes(n ?? "")} onClick={() => n && setRegistered([...registered, n])}>{registered.includes(n ?? "") ? "Registered" : "Register"}</Btn></div></Card>
        ))}
      </div>
    </AppFrame>
  );
}

export function Leaderboard() {
  const [tab, setTab] = useState("National");
  return (
    <AppFrame nav={studentNav} active="leaderboard" title="Leaderboard" subtitle="Week 42 · resets in 2d 14h">
      <div className="flex gap-2">{["School", "Regional", "National", "Friends"].map((t) => <button key={t} onClick={() => setTab(t)} className={cn("rounded-full px-4 py-1.5 text-sm font-semibold", tab === t ? "bg-primary text-primary-foreground" : "bg-card border")}>{t}</button>)}</div>
      <div className="mt-6 grid grid-cols-3 items-end gap-3">
        {[1, 0, 2].map((k) => { const p = people[k]; if (!p) return null; const h = ["h-40", "h-32", "h-24"][k]; return (
          <div key={k} className="text-center"><Av name={p[0]} tone={p[1]} size={k === 0 ? 64 : 52} /><p className="mt-2 truncate text-sm font-bold">{p[0]}</p><p className="text-xs text-muted-foreground">{p[2].toLocaleString()} XP</p>
            <div className={cn("mt-2 grid place-items-start justify-center rounded-t-2xl pt-3", h, k === 0 ? "bg-goldgrad" : "bg-primary-soft")}>{k === 0 ? <Crown className="h-7 w-7 text-navy" /> : <span className="font-display text-2xl text-primary">{k + 1}</span>}</div></div>
        ); })}
      </div>
      <Card className="mt-4 p-2">
        {people.slice(3).map((p, i) => <div key={p[0]} className="flex items-center gap-3 rounded-xl px-3 py-2.5"><span className="w-6 text-sm font-bold text-muted-foreground">{i + 4}</span><Av name={p[0]} tone={p[1]} /><div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold">{p[0]}</p><p className="text-xs text-muted-foreground">{p[3]}</p></div><b className="text-sm">{p[2].toLocaleString()}</b></div>)}
        <div className="flex items-center gap-3 rounded-xl bg-primary-soft px-3 py-2.5"><span className="w-6 text-sm font-bold text-primary">3</span><Av name="Amara Tesfaye" /><p className="flex-1 text-sm font-bold">You</p><b className="text-sm text-primary">9,105</b></div>
      </Card>
    </AppFrame>
  );
}

export function Community() {
  const [liked, setLiked] = useState<number[]>([]);
  const posts = [
    ["Liya Haile", "violet", "Just hit a 30-day streak 🔥 Physics finally clicking. Anyone want to form a study squad for the midterm?", 128],
    ["Mr. Bekele (Teacher)", "green", "📌 New past-paper set uploaded: 2025 National Chemistry. Solutions in the library!", 342],
    ["Yonas Alemu", "coral", "Can someone explain why the derivative of eˣ is eˣ? My brain hurts 😅", 47],
  ] as const;
  return (
    <AppFrame nav={studentNav} active="community" title="Community" subtitle="Grade 11 · Natural Science">
      <div className="grid gap-5 @4xl:grid-cols-3">
        <div className="space-y-4 @4xl:col-span-2">
          <Card className="flex items-center gap-3"><Av name="Amara Tesfaye" /><input className="h-10 flex-1 rounded-xl bg-muted px-4 text-sm outline-none" placeholder="Share a win or ask a question…" /><Btn size="sm">Post</Btn></Card>
          {posts.map(([n, t, body, l], i) => (
            <Card key={i}><div className="flex items-center gap-3"><Av name={n} tone={t} /><div><b className="text-sm">{n}</b><p className="text-xs text-muted-foreground">{i + 1}h ago</p></div></div><p className="mt-3 text-sm leading-relaxed">{body}</p>
              <div className="mt-4 flex gap-5 text-sm text-muted-foreground"><button onClick={() => setLiked(liked.includes(i) ? liked.filter((x) => x !== i) : [...liked, i])} className={cn("flex items-center gap-1.5", liked.includes(i) && "text-coral")}><Heart className={cn("h-4 w-4", liked.includes(i) && "fill-current")} />{l + (liked.includes(i) ? 1 : 0)}</button><span className="flex items-center gap-1.5"><MessageCircle className="h-4 w-4" />12</span><span className="flex items-center gap-1.5"><Share2 className="h-4 w-4" />Share</span></div></Card>
          ))}
        </div>
        <Card><SectionTitle title="Trending" />{["#MidtermPrep", "#PhysicsMemes", "#NationalMathCup", "#StudySquad"].map((h) => <p key={h} className="py-2 text-sm font-semibold text-primary">{h}</p>)}</Card>
      </div>
    </AppFrame>
  );
}

export function Friends() {
  const go = useGo();
  return (
    <AppFrame nav={studentNav} active="community" title="Friends" subtitle="48 friends · 3 requests">
      <Card className="mb-5"><SectionTitle title="Friend requests" /><div className="grid gap-3 @3xl:grid-cols-3">{people.slice(4).map((p) => <div key={p[0]} className="flex items-center gap-3 rounded-xl border p-3"><Av name={p[0]} tone={p[1]} /><div className="min-w-0 flex-1 text-sm"><b className="truncate">{p[0]}</b><p className="text-xs text-muted-foreground">{p[3]}</p></div><Btn size="sm"><Check className="h-4 w-4" /></Btn></div>)}</div></Card>
      <div className="grid gap-4 @2xl:grid-cols-2 @4xl:grid-cols-4">
        {people.filter((p) => p[0] !== "Amara Tesfaye").map((p, i) => (
          <Card key={p[0]} className="text-center"><div className="relative mx-auto w-fit"><Av name={p[0]} tone={p[1]} size={64} />{i % 2 === 0 && <span className="absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-card bg-success" />}</div><p className="mt-3 font-bold">{p[0]}</p><p className="text-xs text-muted-foreground">Lv {30 - i} · {p[3]}</p><div className="mt-4 flex gap-2"><Btn size="sm" v="secondary" className="flex-1" onClick={() => go("chat")}>Message</Btn><Btn size="sm" v="outline" onClick={() => go("multiplayer-lobby")}><Swords className="h-4 w-4" /></Btn></div></Card>
        ))}
        <Card className="grid place-items-center border-dashed text-center text-muted-foreground"><UserPlus className="h-8 w-8" /><p className="mt-2 text-sm font-semibold">Find classmates</p></Card>
      </div>
    </AppFrame>
  );
}

export function Chat() {
  const [msgs, setMsgs] = useState([["Liya", "Did you finish the kinematics worksheet?"], ["me", "Almost! Stuck on Q7 😩"], ["Liya", "Use v² = u² + 2as, it's way faster"], ["me", "Ohhh that makes sense, thanks!"]]);
  const [v, setV] = useState("");
  return (
    <AppFrame nav={studentNav} active="chat" title="Messages">
      <Card className="grid min-h-[560px] overflow-hidden p-0 @3xl:grid-cols-[260px_1fr]">
        <div className="hidden border-r @3xl:block"><div className="m-3 flex items-center gap-2 rounded-xl bg-muted px-3 py-2 text-xs text-muted-foreground"><Search className="h-3.5 w-3.5" />Search</div>
          {people.slice(0, 5).filter((p) => p[0] !== "Amara Tesfaye").map((p, i) => <div key={p[0]} className={cn("flex items-center gap-3 px-4 py-3", i === 0 && "bg-primary-soft")}><Av name={p[0]} tone={p[1]} /><div className="min-w-0 flex-1"><p className="text-sm font-semibold">{p[0]}</p><p className="truncate text-xs text-muted-foreground">{i === 0 ? "Use v² = u² + 2as…" : "See you at the tournament!"}</p></div>{i === 1 && <span className="h-2 w-2 rounded-full bg-primary" />}</div>)}
          <div className="flex items-center gap-3 px-4 py-3"><IconBox icon={Users} tone="gold" size={36} /><div className="text-sm"><p className="font-semibold">Physics Squad</p><p className="text-xs text-muted-foreground">6 members</p></div></div>
        </div>
        <div className="flex flex-col"><div className="flex items-center gap-3 border-b px-5 py-3"><Av name="Liya Haile" tone="violet" /><div><b className="text-sm">Liya Haile</b><p className="text-xs text-success">Online</p></div></div>
          <div className="flex-1 space-y-3 p-5">{msgs.map(([w, t], i) => <div key={i} className={cn("flex", w === "me" && "justify-end")}><div className={cn("max-w-[70%] rounded-2xl px-4 py-2.5 text-sm", w === "me" ? "rounded-br-sm bg-primary text-primary-foreground" : "rounded-bl-sm bg-muted")}>{t}</div></div>)}</div>
          <div className="m-4 flex gap-2"><input value={v} onChange={(e) => setV(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && v) { setMsgs([...msgs, ["me", v]]); setV(""); } }} className="h-11 flex-1 rounded-xl border px-4 text-sm outline-none" placeholder="Type a message…" /><Btn onClick={() => { if (v) { setMsgs([...msgs, ["me", v]]); setV(""); } }}><Send className="h-4 w-4" /></Btn></div>
        </div>
      </Card>
    </AppFrame>
  );
}

export function Notifications() {
  const [read, setRead] = useState(false);
  const items = [[Trophy, "gold", "You moved up to #12 nationally!", "5m"], [Swords, "coral", "Dawit challenged you to a Physics duel", "22m"], [Bell, "blue", "Physics midterm in 6 days — plan updated", "1h"], [Heart, "coral", "Liya and 12 others liked your post", "3h"], [Zap, "violet", "Streak saver: study 10 min to keep your 17-day streak", "5h"]] as const;
  return (
    <AppFrame nav={studentNav} active="" title="Notifications" actions={<Btn size="sm" v="ghost" onClick={() => setRead(true)}>Mark all read</Btn>}>
      <Card className="mx-auto max-w-2xl p-2">
        {items.map(([I, t, m, time], i) => <div key={i} className={cn("flex items-center gap-3 rounded-xl px-3 py-3", !read && i < 3 && "bg-primary-soft/60")}><IconBox icon={I} tone={t} /><p className="flex-1 text-sm font-medium">{m}</p><span className="text-xs text-muted-foreground">{time}</span>{!read && i < 3 && <span className="h-2 w-2 rounded-full bg-primary" />}</div>)}
      </Card>
    </AppFrame>
  );
}
