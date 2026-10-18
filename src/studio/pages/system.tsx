import { Inbox, AlertOctagon, ShieldX, RefreshCw } from "lucide-react";
import { Btn, Card, Logo, useGo } from "../ui";

export function Loading() {
  return (
    <div className="min-h-[720px] bg-canvas p-6">
      <div className="flex items-center justify-between"><Logo /><div className="h-9 w-9 animate-pulse rounded-full bg-muted" /></div>
      <div className="mt-6 h-36 animate-pulse rounded-2xl bg-muted" />
      <div className="mt-5 grid grid-cols-2 gap-3 @3xl:grid-cols-4">{[1, 2, 3, 4].map((k) => <div key={k} className="h-24 animate-pulse rounded-2xl bg-muted" />)}</div>
      <div className="mt-5 space-y-3">{[1, 2, 3].map((k) => <div key={k} className="flex items-center gap-3"><div className="h-10 w-10 animate-pulse rounded-xl bg-muted" /><div className="flex-1 space-y-2"><div className="h-3 w-1/3 animate-pulse rounded bg-muted" /><div className="h-2 w-full animate-pulse rounded bg-muted" /></div></div>)}</div>
      <p className="mt-8 flex items-center justify-center gap-2 text-sm text-muted-foreground"><RefreshCw className="h-4 w-4 animate-spin" /> Loading your dashboard…</p>
    </div>
  );
}

function StateShell({ icon: I, tone, title, body, cta, alt }: { icon: typeof Inbox; tone: string; title: string; body: string; cta: [string, string]; alt?: [string, string] }) {
  const go = useGo();
  return (
    <div className="grid min-h-[720px] place-items-center bg-canvas p-6">
      <Card className="max-w-md p-10 text-center">
        <div className={`mx-auto grid h-20 w-20 place-items-center rounded-3xl ${tone}`}><I className="h-10 w-10" /></div>
        <h2 className="mt-6 font-display text-3xl font-semibold">{title}</h2>
        <p className="mt-2 text-sm text-muted-foreground">{body}</p>
        <div className="mt-6 flex justify-center gap-2">{alt && <Btn v="outline" onClick={() => go(alt[1])}>{alt[0]}</Btn>}<Btn onClick={() => go(cta[1])}>{cta[0]}</Btn></div>
      </Card>
    </div>
  );
}

export const EmptyState = () => <StateShell icon={Inbox} tone="bg-primary-soft text-primary" title="No quizzes yet" body="You haven't taken any quizzes in Chemistry. Start one to see your progress here." cta={["Browse quizzes", "quiz-selection"]} />;
export const ErrorPage = () => <StateShell icon={AlertOctagon} tone="bg-coral-soft text-coral" title="Something went wrong" body="We couldn't load this page. Your progress is safe — please try again." cta={["Try again", "loading"]} alt={["Go home", "student-dashboard"]} />;
export const AccessDenied = () => <StateShell icon={ShieldX} tone="bg-gold-soft text-gold" title="Access denied" body="This area is for school administrators. Ask your admin for access if you need it." cta={["Back to dashboard", "student-dashboard"]} alt={["Switch account", "login"]} />;
