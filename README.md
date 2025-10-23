# dojo-spas

[![Deploy SPAs](https://github.com/Chakra-Network/dojo-spas/actions/workflows/deploy-spas.yml/badge.svg)](https://github.com/Chakra-Network/dojo-spas/actions/workflows/deploy-spas.yml)

Curated single-page applications built with React, Vite, and a shared state layer—powering experiences on [trydojo.ai](https://trydojo.ai/).

- Read the platform docs: [docs.trydojo.ai](https://docs.trydojo.ai/)

## Dojo Hooks
- `@chakra-dev/dojo-hooks` exposes `useDojoState` and a global `dojo` helper for persisting and retrieving SPA state without wiring extra context.
- Each app consumes these hooks to keep widgets in sync and to share state across routes or nested components.

## Build a New SPA
1. Duplicate an existing `*/app` folder (or scaffold a fresh `npm create vite@latest` React app) inside this repo.
2. Install deps with `pnpm install` (or `npm install`) and add `@chakra-dev/dojo-hooks`.
3. Use `useDojoState` to hold the shared data you want to read/write across the experience.
4. Run `pnpm run dev` while building, and `pnpm run build` to emit the static bundle that ships.

## Bounty Board
- Open the GitHub Issues tab and filter by the `bounty` label—each issue describes a SPA the team wants next.
- Comment with your intent and wait for a maintainer to confirm assignment before you dive in.
- Ship the SPA in a PR that links the bounty issue; include any deployment notes.
- Once the PR merges, the maintainers close the issue with payout details so you can get paid for the contribution.
