import { useNavigate } from "@tanstack/react-router";
import { PrototypeProvider, usePrototype } from "@/studio/prototype";
import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Monitor, Tablet, Smartphone, Search, PanelLeft, X, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { pages, categories } from "@/studio/registry";
import { NavCtx, Logo } from "@/studio/ui";
import { cn } from "@/lib/utils";

const widths = { desktop: "100%", tablet: "820px", mobile: "390px" } as const;

export function Studio({ screenId = "upper-student-home" }: { screenId?: string }) {
  return <PrototypeProvider><StudioWorkspace screenId={screenId} /></PrototypeProvider>;
}

function StudioWorkspace({ screenId }: { screenId: string }) {
  const navigate = useNavigate();
  const { preferences, update } = usePrototype();
  const cur = screenId;
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const [vp, setVp] = useState<keyof typeof widths>("desktop");
  const [open, setOpen] = useState(true);
  const [drawer, setDrawer] = useState(false);
  const list = useMemo(() => pages.filter((p) => (cat === "All" || p.category === cat) && p.name.toLowerCase().includes(q.toLowerCase())), [q, cat]);
  const idx = pages.findIndex((p) => p.id === cur);
  const page = pages[idx] ?? pages[0];
  const step = (d: number) => { const next = pages[(idx + d + pages.length) % pages.length]; if (next) go(next.id); };
  const go = (id: string) => {
    if (!pages.some((p) => p.id === id)) return;
    void navigate({ to: "/screens/$screenId", params: { screenId: id } });
    setDrawer(false);
  };

  if (!page) return null;

  return (
    <div className={cn("flex h-dvh overflow-hidden", preferences.dark && "dark")}>
      {drawer && <Button variant="ghost" aria-label="Close page menu" className="studio-backdrop fixed inset-0 z-30 h-auto rounded-none md:hidden" onClick={() => setDrawer(false)} />}
      <aside aria-label="Studio pages" className={cn("studio-sidebar fixed inset-y-0 left-0 z-40 flex w-72 shrink-0 flex-col bg-navy text-navy-foreground transition-all md:static", drawer ? "translate-x-0" : "-translate-x-full md:translate-x-0", !open && "md:w-0 md:overflow-hidden")}>
        <div className="flex items-start justify-between p-5"><div><Logo light /><p className="mt-3 text-sm font-semibold">Design Studio</p><p className="mt-1 text-[11px] text-navy-muted">Learn. Compete. Level Up.</p></div><Button variant="ghost" size="icon" aria-label="Close sidebar" className="text-navy-muted md:hidden" onClick={() => setDrawer(false)}><X /></Button></div>
        <div className="px-4">
          <div className="flex items-center gap-2 rounded-xl bg-navy-2 px-3 focus-within:ring-2 focus-within:ring-primary"><Search className="h-4 w-4 text-navy-muted" /><input aria-label="Search pages" value={q} onChange={(e) => setQ(e.target.value)} placeholder={`Search ${pages.length} pages`} className="h-10 min-w-0 w-full bg-transparent text-sm outline-none placeholder:text-navy-muted" />{q && <Button variant="ghost" size="icon" aria-label="Clear search" className="h-6 w-6 text-navy-muted" onClick={() => setQ("")}><X className="h-3 w-3" /></Button>}</div>
          <div className="mt-3 flex flex-wrap gap-1.5">{["All", ...categories].map((c) => <Button variant="ghost" aria-pressed={cat === c} key={c} onClick={() => setCat(c)} className={cn("h-auto rounded-full px-2.5 py-1 text-[11px] font-semibold", cat === c ? "bg-primary text-primary-foreground hover:bg-primary/90" : "bg-navy-2 text-navy-muted hover:bg-navy-2 hover:text-navy-foreground")}>{c}</Button>)}</div>
        </div>
        <nav aria-label="Page catalog" className="mt-4 flex-1 overflow-y-auto px-3 pb-6">
          {categories.map((c) => { const items = list.filter((p) => p.category === c); if (!items.length) return null; return (
            <div key={c} className="mb-4"><p className="flex justify-between px-2 pb-1 text-[10px] font-bold uppercase tracking-widest text-navy-muted"><span>{c}</span><span>{items.length}</span></p>
              {items.map((p) => <Button variant="ghost" data-page-id={p.id} aria-current={p.id === cur ? "page" : undefined} key={p.id} onClick={() => go(p.id)} className={cn("flex h-auto w-full justify-start truncate rounded-lg px-3 py-2 text-left text-sm", p.id === cur ? "bg-primary font-semibold text-primary-foreground hover:bg-primary/90" : "text-navy-muted hover:bg-navy-2 hover:text-navy-foreground")}>{p.name}</Button>)}
            </div>
          ); })}
          {!list.length && <p className="px-2 text-sm text-navy-muted">No pages match.</p>}
        </nav>
        <div className="flex items-center gap-2 border-t border-navy-2 px-5 py-3 text-xs text-navy-muted"><BookOpen className="h-4 w-4" />{pages.length} screens · Sample data only</div>
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex flex-wrap items-center gap-2 border-b bg-card px-3 py-2.5 sm:gap-3 sm:px-4">
          <Button variant="ghost" size="icon" onClick={() => { setOpen(!open); setDrawer(!drawer); }} title="Toggle page sidebar" aria-label="Toggle sidebar"><PanelLeft className="h-4 w-4" /></Button>
          <div className="min-w-0 flex-1"><p data-testid="current-page" className="truncate text-sm font-bold">{page.name}</p><p className="text-xs text-muted-foreground">{page.category} · {idx + 1} / {pages.length}</p></div>
          <label className="sr-only" htmlFor="studio-language">Preview language</label><select id="studio-language" aria-label="Preview language" value={preferences.language} onChange={e => update({ language: e.target.value })} className="h-9 max-w-32 rounded-lg border bg-background px-2 text-xs"><option>English</option><option>አማርኛ</option><option>Afaan Oromoo</option></select>
           <div role="group" aria-label="Preview size" className="flex rounded-xl bg-muted p-1">{([["desktop", Monitor], ["tablet", Tablet], ["mobile", Smartphone]] as const).map(([k, I]) => <Button variant="ghost" size="icon" key={k} title={`${k} preview`} aria-pressed={vp === k} aria-label={k} onClick={() => setVp(k)} className={cn("h-8 w-8 rounded-lg", vp === k ? "bg-card text-primary shadow-card" : "text-muted-foreground")}><I className="h-4 w-4" /></Button>)}</div>
          <div className="flex gap-1"><Button variant="outline" size="icon" onClick={() => step(-1)} title="Previous page" aria-label="Previous"><ChevronLeft className="h-4 w-4" /></Button><Button variant="outline" size="icon" onClick={() => step(1)} title="Next page" aria-label="Next"><ChevronRight className="h-4 w-4" /></Button></div>
        </header>
        <div key={page.id} className="flex-1 overflow-auto bg-muted p-2 sm:p-5 @container/outer">
          <div data-testid="preview" className={cn("studio-preview @container mx-auto w-full overflow-hidden rounded-xl border bg-background shadow-elevated transition-all", preferences.large && "studio-large", preferences.reduced && "studio-reduced")} style={{ maxWidth: widths[vp] }}>
            <NavCtx.Provider value={go}><page.C key={page.id} /></NavCtx.Provider>
          </div>
          <p className="mt-3 text-center text-xs text-muted-foreground">Design review prototype · sample data only · no real accounts or backend</p>
        </div>
      </div>
    </div>
  );
}
