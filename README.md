# Dojo Single-Page Applications (SPAs)

[![Deploy SPAs](https://github.com/Chakra-Network/dojo-spas/actions/workflows/deploy-spas.yml/badge.svg)](https://github.com/Chakra-Network/dojo-spas/actions/workflows/deploy-spas.yml)

Curated single-page applications built with React, Vite, and a shared state layer—powering experiences on [trydojo.ai](https://trydojo.ai/).

- Read the platform docs: [docs.trydojo.ai](https://docs.trydojo.ai/).

## Why Mock SPAs Matter
- Reinforcement-learning loops need safe, deterministic sandboxes; real production apps mutate too quickly. Our mock SPAs mirror the UX of live tools like [Linear](https://dojo-spas-production.s3.us-east-1.amazonaws.com/linear/index.html) without exposing private data.
- Authentication is predictable here—agents can safely interact with environments without fretting over CAPTCHAs, SSO glitches, or expiring secrets.
- State-setting, verification, and retrieval stay under tight control: every view reads and writes through `dojo-hooks`, so RL agents can rely on consistent schemas instead of chasing ever-changing production APIs.

<img width="1346" height="749" alt="image" src="https://github.com/user-attachments/assets/7b54beb8-862e-435c-9a09-caa368dc6aac" />


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
