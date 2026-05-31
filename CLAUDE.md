# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install        # install dependencies (requires Node.js)
npm run dev        # start Vite dev server on port 3000, host 0.0.0.0
npm run build      # production build to dist/
npm run preview    # preview the production build
npm run lint       # type-check only (tsc --noEmit) — there is no ESLint config
npm run clean      # rm -rf dist server.js
```

There is no test runner configured. `npm run lint` is the only static check.

## Architecture

A single-page marketing/hero landing page for **台郡科技 / Flexium**, an FPC (flexible printed circuit) manufacturer. Scaffolded from a Google AI Studio app (the "Boltshift Hero" template — some placeholder copy still references "Boltshift").

- **Stack:** Vite 6 + React 19 + TypeScript + Tailwind CSS v4. Animations via `motion` (the Framer Motion successor — import from `motion/react`). Icons via `lucide-react`.
- **Tailwind v4** is configured through the `@tailwindcss/vite` plugin and `@import "tailwindcss"` in `src/index.css` — there is **no `tailwind.config.js`**. Theme tokens (fonts) are declared in the `@theme { ... }` block in `src/index.css`, exposing `font-sans` (Inter) and `font-display` (Plus Jakarta Sans).
- **Entry flow:** `index.html` → `src/main.tsx` → `src/App.tsx`. The entire page lives in `App.tsx` as one component; state is local `useState` (active nav tab, demo modal, toast). All nav links / buttons are demo stubs that fire a toast rather than navigate.
- **`src/components/TechBackground.tsx`** renders the animated backdrop: a looping `<video>` (`/public/robot.mp4`) with an HTML5 Canvas neural-mesh particle overlay as automatic fallback when video autoplay is blocked. Brand color is blue `rgba(28, 124, 255, ...)` / `#2582ff`.
- **Path alias:** `@/*` maps to the repo root (configured in both `tsconfig.json` and `vite.config.ts`).
- **Static assets:** files in `public/` (e.g. `flexium_logo_sm.png`, `robot.mp4`) are served from `/`. `images/` and `reference/` hold source/design reference material and are not bundled.

### Conventions worth matching
- Copy is bilingual (Traditional Chinese headings, English CTAs). Keep that mix when editing hero text.
- UI styling leans heavily on Tailwind utility classes inline with layered blue "glow" effects (radial gradients + `blur`). The `.glow-blue` helper class in `index.css` is the reusable version.
- HMR/file-watching is gated by the `DISABLE_HMR` env var in `vite.config.ts` (set by AI Studio to prevent flicker during agent edits) — do not remove that logic.

### Unused-but-present dependencies
`@google/genai`, `express`, and `dotenv` are installed and `metadata.json` declares a server-side Gemini capability, but there is currently **no server code** (`server.js` is a clean target only). Treat these as scaffolding for a future API layer, not active code.
