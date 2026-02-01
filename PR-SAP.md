# SAP S/4HANA ERP — Procurement & Approval SPA

> Closes #1 · Bounty: $1,000

## Overview

A polished SAP S/4HANA–style enterprise resource planning single-page application focused on **procurement management** and **approval workflows**. Built with the exact same stack as existing SPAs in this repo (Vite + React 19 + TypeScript strict + Tailwind v4 + dojo-hooks), fully offline with rich seed data.

## Screenshots

### Dashboard — KPI Widgets & Pending Items
Six hero KPI cards (revenue, open POs, pending approvals, budget utilization, total spend, on-time delivery) powered by `useDojoState`. Panels showing POs awaiting approval and upcoming tasks with direct navigation.

### Procurement — List, Filter & Detail Views
Full purchase order table with status/priority filters and global search. Detail view with line-item table, vendor info card, approve/reject actions, and threaded comments.

### Task Inbox — Approval Queue
Card-based task grid with status chips, progress bars, priority indicators, and cycle-status toggles. Supports filtering and empty state. Summary counts at top.

### Audit Trail — Activity Timeline
Chronological grouped timeline recording every navigation, approval, rejection, comment, and status change. Color-coded by category (procurement, approval, navigation, system). Stored in `dojo.state.auditLog` for RL verification.

## Views Implemented

| # | View | Description |
|---|------|-------------|
| 1 | **Dashboard** | 6 KPI hero widgets, pending POs panel, upcoming tasks panel |
| 2 | **Procurement List** | Filterable PO table (status, priority), global search integration |
| 3 | **PO Detail** | Line items, vendor card, approve/reject buttons, comment thread |
| 4 | **Task Inbox** | 14 approval tasks as cards, status toggle, progress bars, empty state |
| 5 | **Audit Trail** | Grouped timeline of all session actions for RL verification |

## Seed Data

- **12 purchase orders** across 7 statuses (Draft, Pending Approval, Approved, Rejected, In Delivery, Received, Cancelled)
- **10 vendors** with ratings, categories, and contact details (Siemens, Bosch, BASF, Caterpillar, 3M, ABB, Schneider, Honeywell, Mitsubishi, Emerson)
- **14 approval tasks** of 5 types (PO, Invoice, Budget Transfer, Material Request, Vendor Onboarding)
- **6 KPIs** with trend indicators
- **12 audit log entries** pre-seeded, with live additions on every user action

## Technical Stack

| Requirement | Implementation |
|-------------|---------------|
| React 19 + TypeScript strict | ✅ `tsc -b` passes with 0 errors |
| `@chakra-dev/dojo-hooks` | ✅ Single `useDojoState` in AppProvider — no bespoke stores |
| Tailwind CSS v4 via `@tailwindcss/vite` | ✅ No postcss.config.js |
| `vite-plugin-singlefile` | ✅ `dist/index.html` = 282 KB (82 KB gzipped) |
| `lucide-react` icons | ✅ Used throughout all views |
| No auth flows | ✅ Boots directly into dashboard |
| Responsive | ✅ Tested at 1280px and 1440px |
| Fully offline | ✅ All seed data embedded |

## SAP Fiori Theme

- **Sidebar**: SAP Shell dark blue (`#354a5f`) with gold hex logo accent
- **Content**: Clean white cards on `#f7f7f7` background
- **Status colors**: SAP semantic palette (positive green, negative red, critical orange, informative blue)
- **Accent**: SAP gold (`#f58b00`) for highlights and branding
- **Typography**: Clean sans-serif matching SAP Fiori design language

## State Architecture

All state lives in a single `useDojoState<AppState>()` call:

```typescript
interface AppState {
  currentView: ViewId;
  selectedPOId: string | null;
  searchQuery: string;
  purchaseOrders: PurchaseOrder[];
  tasks: ApprovalTask[];
  vendors: Vendor[];
  kpis: KPIData;
  auditLog: AuditEntry[];
  sidebarCollapsed: boolean;
  poStatusFilter: POStatus | "All";
  poPriorityFilter: Priority | "All";
  taskStatusFilter: TaskStatus | "All";
}
```

Every mutation (navigation, approval, rejection, comment, task toggle) writes to `dojo.state` and appends an audit entry — making the entire session fully traceable for RL verification via `window.dojo.state.auditLog`.

## File Structure

```
sap/app/
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json / tsconfig.app.json / tsconfig.node.json
├── dist/index.html          ← single-file build output
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── index.css             ← Tailwind v4 + SAP theme tokens
    ├── types/index.ts        ← Full TypeScript types
    ├── data/seed.ts          ← Rich seed data (12 POs, 10 vendors, 14 tasks)
    ├── store/AppProvider.tsx  ← useDojoState provider + all actions
    └── components/
        ├── Sidebar.tsx
        ├── TopBar.tsx
        ├── Dashboard.tsx
        ├── PurchaseOrderList.tsx
        ├── PurchaseOrderDetail.tsx
        ├── TaskInbox.tsx
        └── AuditTrail.tsx
```

## Build Verification

```bash
cd sap/app
pnpm install
pnpm run build   # runs tsc -b && vite build
# ✅ 0 TypeScript errors
# ✅ dist/index.html produced (single file, 282 KB)
```
