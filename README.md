# KickSplit

A fast, mobile-first football team randomizer for creating fair random teams from the players available for a match.

## Features

- Add, edit, remove, and bulk-paste player names
- Auto-balanced or custom-size teams
- Optional team names and unassigned player reporting
- Choose a captain before or after the draw, or assign one randomly
- Give players custom 0.0-10.0 points, including decimal scores such as 7.8
- Match timer with presets, custom duration, pause, resume, and reset
- Local match history with restore, delete, and clear actions
- Fisher-Yates randomization with no duplicate assignments
- Copy and native share actions
- Local persistence with a start-new-match reset
- Responsive, keyboard-friendly interface

## Tech stack

React, TypeScript, Vite, and plain CSS. No backend, account, or environment variables are required. Match setup is stored locally in the browser.

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

## Deployment with Vercel or Netlify

1. Run `npm install`.
2. Run `npm run build` and confirm the `dist` folder is created.
3. Import the repository into Vercel or Netlify.
4. Use `npm run build` as the build command.
5. Use `dist` as the output directory.
6. Deploy without database or environment variables.

KickSplit is a static frontend. Player names, points, teams, captain settings, and timer preferences are stored in the visitor's browser using localStorage. No user data is sent to a server.

## Structure

- `src/App.tsx` - application workflow and UI
- `src/utils/randomize.ts` - reusable team-generation logic
- `src/utils/storage.ts` - localStorage persistence
- `src/types.ts` - extensible player and team models

## Future improvements

Skill or position balancing, saved player groups, match history, QR sharing, and live match features can be added without changing the core randomizer contract.
