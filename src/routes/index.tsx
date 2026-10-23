import { createFileRoute } from "@tanstack/react-router";
import { Studio } from "@/studio/studio";
export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Master Minds Design Studio — Interactive Education Playground" },
    { name: "description", content: "Explore the standalone Master Minds academic, early learning and staff portal designs with fictional sample data." },
    { property: "og:title", content: "Master Minds Design Studio" },
    { property: "og:description", content: "Learn. Compete. Level Up. Interactive education design previews." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }), component: Home,
});
function Home() { return <Studio />; }
