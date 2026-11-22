# Project memory

## Product intent & audience

- Portfolio site showcasing game development work and QA testing experience.
- Audience: recruiters, studios, collaborators evaluating technical/game work.

## Brand personality & voice

- Dark, polished, production-grade aesthetic; not generic.
- Confident and crisp copy with uppercase role labels and footer status lines.

## Visual design & UX direction

- Base dark palette anchored on `#0a0a0f`; accent gradients magenta → cyan.
- Section pattern: typed data array drives card grids; section components under `src/components/sections/` (e.g. `Games.tsx`, `QA.tsx`).
- Card style (established by Game Portfolio, reused by QA):
  - Full-bleed background image with `object-cover`, `group-hover:scale-105 transition-transform duration-500` zoom.
  - Dark gradient overlay: `bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/80 to-[#0a0a0f]/40`.
  - White titles, magenta role subtitles, pill tag badges, top-right icon badge, bottom verification/status line.
  - Rounded dark borders, hover lift, magenta/cyan glow.
  - Image `onError` fallback to magenta→cyan gradient so cards stay polished before screenshots exist.
- Responsive grid: `grid-cols-1 md:grid-cols-2 gap-6` for 4-card 2x2 layouts.
- Images served from `public/` root (e.g. `/qa-ethra.png`).
- Status icons: lime for bug/QA lines, cyan shield for tag pills.

## Decisions, constraints & rationale

- Stack: Vite + React (JSX) + Tailwind + lucide-react; no extra UI/icon packages.
- Import via `@/` alias → `src/`; avoid deep relative paths.
- Reuse one card visual language across sections (Games, QA) for consistency and faster iteration.
- Placeholder slots added with realistic copy so layout is production-ready before final screenshots.
- `.bolt/prompt` contains global authoring instructions; not duplicated here.

## Open questions & assumptions

- Assumes data array lives in `src/data/data.ts` (also referenced as `src/data.ts`); confirm canonical location.
- Final QA screenshots pending; currently relying on gradient fallbacks.
- Unknown whether other sections (Services, About, Contact) exist or should adopt the same card system.