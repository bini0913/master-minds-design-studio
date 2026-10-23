<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep the standalone design playground frontend-only with in-memory sample interactions; no existing app or backend connections are permitted.
- Register each mockup in the typed studio registry and render it through shared navigation at /screens/$screenId; direct loads and browser history must work without recreating production routes.
- Use container queries inside mockups so the studio's device preview width, rather than the browser width, determines their layouts.
