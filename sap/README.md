# SAP ERP SPA - Dojo Bounty

A single-page application demonstrating SAP ERP workflows built for the Dojo bounty ($1,000).

## Features

- **Dashboard**: Hero KPI widgets showing revenue, procurement, and approval metrics
- **Procurement Workflow**: Browse, filter, and manage purchase orders with approve/reject actions
- **Tasks Inbox**: Approval queue with priority badges, status toggles, and empty state handling
- **Global Search**: Search across purchase orders, tasks, and KPIs with categorized results
- **Audit Trail**: Activity log panel recording all session actions for RL verification

## Tech Stack

- **React 18** + **TypeScript**
- **Vite** for build tooling
- **Chakra UI** for components
- **Lucide React** for icons
- **Dojo State Management** via `useDojoState` hook

## State Management

The app uses the Dojo pattern with:
- `dojo.getState()` - Read current state
- `dojo.setState(key, value, auditDescription)` - Update state with automatic audit logging
- `useDojoState(key)` - React hook for reactive state subscriptions

## Seed Data

Includes realistic fixtures:
- 6 purchase orders (draft, pending, approved, rejected, ordered)
- 8 approval tasks (various types and priorities)
- 8 KPIs across revenue, procurement, approvals, operations

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Outputs a single-file HTML bundle to `dist/index.html`.

## Responsive Design

Optimized for 1280px and 1440px viewports with responsive layouts.

## Bounty Requirements

- ✅ Dashboard with KPI widgets via useDojoState
- ✅ Procurement workflow with list, filter, detail view, approve/reject
- ✅ Tasks inbox with status toggles, priority chips, empty states
- ✅ Global search querying in-memory data
- ✅ Audit trail panel for RL verification
- ✅ Vite + React + TypeScript
- ✅ Chakra UI components
- ✅ Responsive design
- ✅ Seed data fixtures
