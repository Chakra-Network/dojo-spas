# ZenDesk Support Inbox SPA

A complete support ticket management interface built for the Dojo bounty ($1,500).

## Features

- **Agent Dashboard**: Queue health metrics (new, pending, breached SLAs), personal performance stats
- **Ticket Inbox**: Filterable list (status, priority, tags), bulk actions, infinite scroll
- **Ticket Workspace**: Tabbed view with conversation history, internal notes, customer profile
- **Macros Library**: Canned responses that update ticket state and append templated replies
- **SLA Tracker**: Timeline widget highlighting breach risk, records escalations

## Tech Stack

- React 18 + TypeScript
- Vite for build tooling
- Chakra UI for components
- React Router for navigation
- Recharts for analytics visualization
- Dojo state management pattern

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Architecture

- `/src/dojo/state.tsx` - Global state management with Dojo pattern
- `/src/data/` - Seed data for tickets, agents, and macros
- `/src/components/` - Feature components organized by domain

## Responsive Design

Optimized for 1280px and 1440px screen widths.
