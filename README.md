# KickSplit

A fast, mobile-first football team randomizer for creating fair random teams from the players available for a match.

## Features

- Add, edit, remove, and bulk-paste player names
- Auto-balanced or custom-size teams
- Optional team names and unassigned player reporting
- Choose a captain before or after the draw, or assign one randomly
- Rate players from 1 to 5 and optionally balance teams by quality
- Match timer with presets, custom duration, pause, resume, and reset
- Fisher-Yates randomization with no duplicate assignments
- Copy and native share actions
- Local persistence with a start-new-match reset
- Responsive, keyboard-friendly interface

## Tech stack

React, TypeScript, Vite, and plain CSS. No backend or account is required.

## Local setup

```bash
npm install
npm run dev
```

Production commands:

```bash
npm run build
npm run preview
```

## Deployment

Build the project with `npm run build`. Deploy the generated `dist` directory to Vercel, Netlify, or any static host. Vercel and Netlify will detect Vite automatically when connected to this repository.

## Structure

- `src/App.tsx` - application workflow and UI
- `src/utils/randomize.ts` - reusable team-generation logic
- `src/utils/storage.ts` - localStorage persistence
- `src/types.ts` - extensible player and team models

## Future improvements

Skill or position balancing, saved player groups, match history, QR sharing, and live match features can be added without changing the core randomizer contract.
