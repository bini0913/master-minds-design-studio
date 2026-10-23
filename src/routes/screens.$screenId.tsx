import { createFileRoute, notFound } from "@tanstack/react-router";
import { pages } from "@/studio/registry";
import { Studio } from "@/studio/studio";
export const Route = createFileRoute("/screens/$screenId")({
  loader: ({ params }) => { const page = pages.find(p => p.id === params.screenId); if (!page) throw notFound(); return { id: page.id, name: page.name, category: page.category }; },
  head: ({ loaderData }) => { const title = `${loaderData?.name ?? "Unavailable screen"} — Master Minds Design Studio`; const description = `Interactive ${loaderData?.category ?? "education"} design preview. Fictional sample data only; no production connections.`; return { meta: [{ title }, { name: "description", content: description }, { property: "og:title", content: title }, { property: "og:description", content: description }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }; },
  component: Screen,
});
function Screen() { const { screenId } = Route.useParams(); return <Studio screenId={screenId} />; }
