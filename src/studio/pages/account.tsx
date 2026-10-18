import { useState } from "react";
import { Award, Flame, Target, Trophy, Gem, ShoppingBag, Check, Moon, Globe, Bell, Shield, User, Edit3 } from "lucide-react";
import { AppFrame, Av, Bar, Btn, Card, IconBox, Pill, SectionTitle, Stat, useGo, type Tone } from "../ui";
import { studentNav } from "../navs";
import { cn } from "@/lib/utils";

export function Profile() {
  const go = useGo();
  return (
    <AppFrame nav={studentNav} active="" title="Profile">
      <div className="overflow-hidden rounded-2xl border bg-card shadow-card">
        <div className="h-28 bg-hero" />
        <div className="flex flex-wrap items-end gap-4 px-6 pb-5">
          <div className="-mt-12 rounded-full ring-4 ring-card"><Av name="Amara Tesfaye" size={96} /></div>
          <div className="min-w-0 flex-1"><h3 className="text-xl font-bold">Amara Tesfaye</h3><p className="text-sm text-muted-foreground">Grade 11 · Unity School · Addis Ababa</p></div>
          <Btn v="outline" size="sm" onClick={() => go("avatar-creator")}><Edit3 className="h-4 w-4" /> Edit avatar</Btn>
        </div>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3 @3xl:grid-cols-4">
        <Stat label="Level" value="24" icon={Award} tone="violet" /><Stat label="Total XP" value="48.2k" icon={Gem} tone="blue" /><Stat label="Best streak" value="31" icon={Flame} tone="coral" /><Stat label="Wins" value="86" icon={Trophy} tone="gold" />
      </div>
      <Card className="mt-5"><SectionTitle title="Badges" /><div className="grid grid-cols-3 gap-3 @2xl:grid-cols-6">
        {[["Speedster", "gold"], ["Bio Whiz", "green"], ["Night Owl", "violet"], ["Top 10", "blue"], ["Helper", "coral"], ["Locked", "gray"]].map(([b, t]) => <div key={b} className="text-center"><div className={cn("mx-auto grid h-14 w-14 place-items-center rounded-2xl", t === "gray" ? "bg-muted opacity-50" : `bg-${t}-soft`)}><Award className={cn("h-7 w-7", t !== "gray" && `text-${t}`)} /></div><p className="mt-1.5 text-xs font-semibold">{b}</p></div>)}
      </div></Card>
    </AppFrame>
  );
}

export function AvatarCreator() {
  const tones: Tone[] = ["blue", "violet", "green", "gold", "coral"];
  const [tone, setTone] = useState<Tone>("blue");
  const [hat, setHat] = useState("🎓");
  const go = useGo();
  return (
    <AppFrame nav={studentNav} active="" title="Avatar Creator" actions={<Btn size="sm" onClick={() => go("profile")}>Save</Btn>}>
      <div className="grid gap-5 @4xl:grid-cols-2">
        <Card className="grid min-h-80 place-items-center bg-kids"><div className="relative"><span className="absolute -top-10 left-1/2 -translate-x-1/2 text-5xl">{hat}</span><Av name="Amara T" tone={tone} size={180} /></div></Card>
        <Card><SectionTitle title="Colour" /><div className="flex gap-3">{tones.map((t) => <button key={t} onClick={() => setTone(t)} className={cn("h-11 w-11 rounded-full", `bg-${t}`, tone === t && "ring-4 ring-ring ring-offset-2")} />)}</div>
          <div className="mt-6"><SectionTitle title="Headwear" /><div className="grid grid-cols-5 gap-2">{["🎓", "👑", "🧢", "🎧", "⭐", "🪖", "🎩", "🌸", "🦄", "🔒"].map((h) => <button key={h} onClick={() => h !== "🔒" && setHat(h)} className={cn("grid aspect-square place-items-center rounded-xl border text-2xl", hat === h && "border-primary bg-primary-soft", h === "🔒" && "opacity-40")}>{h}</button>)}</div></div>
        </Card>
      </div>
    </AppFrame>
  );
}

export function RewardsStore() {
  const [coins, setCoins] = useState(2450);
  const [owned, setOwned] = useState<string[]>([]);
  const items: [string, number, Tone, string][] = [["Streak Freeze", 200, "blue", "🧊"], ["Double XP (1h)", 500, "gold", "⚡"], ["Golden Crown", 1200, "gold", "👑"], ["Neon Theme", 800, "violet", "🌈"], ["Hint Pack ×5", 300, "green", "💡"], ["Airtime 50 ETB", 3000, "coral", "📱"]];
  return (
    <AppFrame nav={studentNav} active="" title="Rewards Store" actions={<Pill tone="gold" className="px-3 py-1 text-sm"><Gem className="h-4 w-4" />{coins.toLocaleString()}</Pill>}>
      <div className="grid gap-4 @2xl:grid-cols-2 @4xl:grid-cols-3">
        {items.map(([n, c, t, e]) => { const own = owned.includes(n); return (
          <Card key={n}><div className={cn("grid h-28 place-items-center rounded-xl text-5xl", `bg-${t}-soft`)}>{e}</div><p className="mt-3 font-bold">{n}</p>
            <div className="mt-3 flex items-center justify-between"><span className="flex items-center gap-1 text-sm font-bold text-gold"><Gem className="h-4 w-4" />{c}</span>
              <Btn size="sm" v={own ? "secondary" : c > coins ? "outline" : "primary"} onClick={() => { if (!own && c <= coins) { setCoins(coins - c); setOwned([...owned, n]); } }}>{own ? <><Check className="h-4 w-4" />Owned</> : c > coins ? "Need more" : <><ShoppingBag className="h-4 w-4" />Buy</>}</Btn></div></Card>
        ); })}
      </div>
    </AppFrame>
  );
}

export function SettingsPage() {
  const [on, setOn] = useState<Record<string, boolean>>({ Push: true, Email: false, "Dark mode": false, "Sound effects": true });
  const [tab, setTab] = useState("Account");
  return (
    <AppFrame nav={studentNav} active="settings" title="Settings">
      <div className="grid gap-5 @3xl:grid-cols-[200px_1fr]">
        <Card className="h-fit p-2">{[[User, "Account"], [Bell, "Notifications"], [Globe, "Language"], [Shield, "Privacy"]].map(([I, l]) => { const Ic = I as typeof User; return <button key={l as string} onClick={() => setTab(l as string)} className={cn("flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm", tab === l ? "bg-primary-soft font-semibold text-primary" : "text-muted-foreground")}><Ic className="h-4 w-4" />{l as string}</button>; })}</Card>
        <Card><h3 className="font-bold">{tab}</h3><div className="mt-4 grid gap-4 @2xl:grid-cols-2">
          {[["Full name", "Amara Tesfaye"], ["Email", "amara@school.et"], ["Phone", "+251 91 234 5678"], ["Language", "English / አማርኛ"]].map(([l, v]) => <label key={l}><span className="text-xs font-semibold">{l}</span><input defaultValue={v} className="mt-1 h-10 w-full rounded-xl border px-3 text-sm" /></label>)}
        </div>
          <div className="mt-6 divide-y">{Object.keys(on).map((k) => <div key={k} className="flex items-center justify-between py-3"><span className="flex items-center gap-2 text-sm">{k === "Dark mode" && <Moon className="h-4 w-4" />}{k}</span><button onClick={() => setOn({ ...on, [k]: !on[k] })} className={cn("h-6 w-11 rounded-full p-0.5 transition", on[k] ? "bg-primary" : "bg-muted")}><span className={cn("block h-5 w-5 rounded-full bg-card shadow transition", on[k] && "translate-x-5")} /></button></div>)}</div>
          <div className="mt-4 flex justify-end gap-2"><Btn v="ghost">Cancel</Btn><Btn>Save changes</Btn></div>
        </Card>
      </div>
    </AppFrame>
  );
}

export { Target, IconBox, Bar };
