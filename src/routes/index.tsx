import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Monitor, Tablet, Smartphone, Search, PanelLeft } from "lucide-react";
import { pages, categories } from "@/studio/registry";
import { NavCtx, Logo } from "@/studio/ui";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Master Minds Design Studio" },
      { name: "description", content: "Interactive design review playground for the Master Minds education platform UI." },
      { property: "og:title", content: "Master Minds Design Studio" },
      { property: "og:description", content: "Review every Master Minds screen: learning, competition, portals and early learner." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Studio,
});

const widths = { desktop: "100%", tablet: "820px", mobile: "390px" } as const;

function Studio() {
  const [cur, setCur] = useState("landing");
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const [vp, setVp] = useState<keyof typeof widths>("desktop");
  const [open, setOpen] = useState(true);
  const list = useMemo(() => pages.filter((p) => (cat === "All" || p.category === cat) && p.name.toLowerCase().includes(q.toLowerCase())), [q, cat]);
  const idx = pages.findIndex((p) => p.id === cur);
  const page = pages[idx];
  const step = (d: number) => setCur(pages[(idx + d + pages.length) % pages.length].id);
  const go = (id: string) => pages.some((p) => p.id === id) && setCur(id);

  return (
    <div className="flex h-screen overflow-hidden">
      <aside className={cn("flex shrink-0 flex-col bg-navy text-navy-foreground transition-all", open ? "w-72" : "w-0 overflow-hidden")}>
        <div className="p-5"><Logo light /><p className="mt-1 pl-10 text-[11px] text-navy-muted">Design Studio · Learn. Compete. Level Up.</p></div>
        <div className="px-4">
          <div className="flex items-center gap-2 rounded-xl bg-navy-2 px-3"><Search className="h-4 w-4 text-navy-muted" /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder={`Search ${pages.length} pages`} className="h-10 w-full bg-transparent text-sm outline-none placeholder:text-navy-muted" /></div>
          <div className="mt-3 flex flex-wrap gap-1.5">{["All", ...categories].map((c) => <button key={c} onClick={() => setCat(c)} className={cn("rounded-full px-2.5 py-1 text-[11px] font-semibold", cat === c ? "bg-primary text-primary-foreground" : "bg-navy-2 text-navy-muted hover:text-navy-foreground")}>{c}</button>)}</div>
        </div>
        <nav className="mt-4 flex-1 overflow-y-auto px-3 pb-6">
          {categories.map((c) => { const items = list.filter((p) => p.category === c); if (!items.length) return null; return (
            <div key={c} className="mb-4"><p className="px-2 pb-1 text-[10px] font-bold uppercase tracking-widest text-navy-muted">{c}</p>
              {items.map((p) => <button key={p.id} onClick={() => setCur(p.id)} className={cn("block w-full truncate rounded-lg px-3 py-1.5 text-left text-sm", p.id === cur ? "bg-primary font-semibold text-primary-foreground" : "text-navy-muted hover:bg-navy-2 hover:text-navy-foreground")}>{p.name}</button>)}
            </div>
          ); })}
          {!list.length && <p className="px-2 text-sm text-navy-muted">No pages match.</p>}
        </nav>
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center gap-3 border-b bg-card px-4 py-2.5">
          <button onClick={() => setOpen(!open)} className="rounded-lg p-2 hover:bg-muted" aria-label="Toggle sidebar"><PanelLeft className="h-4 w-4" /></button>
          <div className="min-w-0 flex-1"><p className="truncate text-sm font-bold">{page.name}</p><p className="text-xs text-muted-foreground">{page.category} · {idx + 1} / {pages.length}</p></div>
          <div className="flex rounded-xl bg-muted p-1">{([["desktop", Monitor], ["tablet", Tablet], ["mobile", Smartphone]] as const).map(([k, I]) => <button key={k} aria-label={k} onClick={() => setVp(k)} className={cn("rounded-lg p-2", vp === k ? "bg-card text-primary shadow-card" : "text-muted-foreground")}><I className="h-4 w-4" /></button>)}</div>
          <div className="flex gap-1"><button onClick={() => step(-1)} aria-label="Previous" className="rounded-lg border p-2 hover:bg-muted"><ChevronLeft className="h-4 w-4" /></button><button onClick={() => step(1)} aria-label="Next" className="rounded-lg border p-2 hover:bg-muted"><ChevronRight className="h-4 w-4" /></button></div>
        </header>
        <div className="flex-1 overflow-auto bg-muted p-4 @container/outer">
          <div className="@container mx-auto overflow-hidden rounded-2xl border bg-background shadow-elevated transition-all" style={{ maxWidth: widths[vp] }}>
            <NavCtx.Provider value={go}><page.C key={page.id} /></NavCtx.Provider>
          </div>
          <p className="mt-3 text-center text-xs text-muted-foreground">Design review prototype · sample data only · no real accounts or backend</p>
        </div>
      </div>
    </div>
  );
}
