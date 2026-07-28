# PowerShell Wiki

An easy way to script PowerShell: browsable **cheat sheets** for everyday tasks, plus a **Goal Explorer** that turns a plain-English goal into matching commands and a complete, AI-generated script.

## Features

- **🔍 Instant search** — fuzzy search across every command (Fuse.js), no server round-trip.
- **📇 Cheat sheets** — 7 categories of ready-to-copy PowerShell, syntax-highlighted with Shiki.
- **🎯 Goal Explorer** — describe a goal; get instant cheat-sheet matches *and* a streamed script from Claude.
- **📋 Copy buttons** on every snippet.

## Tech stack

Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · Shiki · Fuse.js · Anthropic SDK

## Getting started

```bash
npm install
cp .env.example .env.local   # add your ANTHROPIC_API_KEY
npm run dev
```

Open http://localhost:3000.

> The cheat sheets and search work with no API key. The **Goal Explorer's AI suggestion** requires `ANTHROPIC_API_KEY`.

## Adding a cheat sheet

1. Create `content/<slug>.ts` exporting a `CheatSheet` (see `lib/types.ts`).
2. Register it in `content/index.ts`.

Search, the homepage grid, and the Goal Explorer pick it up automatically.

## Deploy

Deploys to Vercel with zero config. Set `ANTHROPIC_API_KEY` in the project's environment variables.

## Project layout

```
app/            Routes: home, /cheatsheets, /goal-explorer, /api/suggest
components/     UI (SearchBar, CodeBlock, GoalExplorer, …)
content/        Cheat sheet data (one file per category)
lib/            Types, search index, Shiki highlighter
```
