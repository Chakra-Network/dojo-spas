# Dojo Single-Page Applications (SPAs)

> ⚠️ **This repository is no longer actively maintained.** Dojo has moved towards being an enterprise product. This codebase is left available for fair use, reference, and inspiration.

Curated mock single-page applications built with **React** + **Vite** + a shared state layer — originally powering agent training experiences on [trydojo.ai](https://trydojo.ai/).

📖 [Platform Docs](https://docs.trydojo.ai/)

<img width="1346" height="749" alt="Dojo SPA screenshot" src="https://github.com/user-attachments/assets/7b54beb8-862e-435c-9a09-caa368dc6aac" />

---

## 🤔 Why Mock SPAs?

RL training loops need **safe, deterministic sandboxes** — real production apps mutate too quickly. These mock SPAs solve that by providing:

- 🪞 **Realistic UI** — mirror the UX of live tools (e.g. [Linear](https://dojo-spas-production.s3.us-east-1.amazonaws.com/linear/index.html)) without exposing private data
- 🔐 **Predictable auth** — no CAPTCHAs, SSO headaches, or expiring secrets
- 🧩 **Consistent state** — all reads/writes flow through `dojo-hooks`, giving agents stable schemas instead of ever-changing production APIs

---

## 🪝 Dojo Hooks

`@chakra-dev/dojo-hooks` is the shared state layer across all SPAs:

| Export | Purpose |
|---|---|
| `useDojoState` | React hook for persisting & retrieving SPA state |
| `dojo` (global) | Vanilla JS helper for the same — no React required |

Each app consumes these hooks to keep widgets in sync across routes and nested components.

---

## 🛠️ Building a New SPA

```bash
# 1. Scaffold or duplicate
cp -r linear/app my-new-spa/app   # or: npm create vite@latest

# 2. Install deps
pnpm install
pnpm add @chakra-dev/dojo-hooks

# 3. Develop
pnpm run dev

# 4. Build for deploy
pnpm run build
```

Use `useDojoState` to manage any shared data you want agents to read/write across the experience.
