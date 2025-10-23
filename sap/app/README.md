# SAP ERP Single-Page Application

A polished, self-contained SPA that mirrors core SAP ERP workflows, designed for reinforcement-learning agents to practice enterprise navigation in a sandbox environment.

## Features

### 1. Dashboard Landing
- **Hero KPI Widgets**: Displays real-time business metrics including:
  - Total Procurement Value (with trend indicators)
  - Open Purchase Orders count
  - Pending Approvals count
  - Approval Rate percentage
- **Critical Tasks Overview**: Quick view of high-priority approval tasks
- **Recent Purchase Orders**: Latest PO activity with status badges
- All data sourced from `useDojoState` hook

### 2. Procurement Workflow
- **Purchase Order List**: Comprehensive list with filtering capabilities
- **Advanced Filters**: Filter by status, vendor, and date range
- **Detail View**: Full PO information including:
  - Line items with quantities and pricing
  - Vendor and requester information
  - Status tracking and approval history
- **Stateful Actions**:
  - Approve/Reject purchase orders
  - Add comments and notes
  - Real-time status updates
- All changes persist via `dojo.setState`

### 3. User Tasks Inbox
- **Approval Queue**: Complete list of pending approvals
- **Status Management**: Toggle task status (Pending, In Progress, Completed, Cancelled)
- **Priority Indicators**: Visual priority badges (Low, Medium, High, Critical)
- **Progress Chips**: Status badges for easy tracking
- **Empty State Handling**: Friendly messages when no tasks exist
- **Quick Actions**: Approve, start review, or cancel tasks directly
- **Reference Navigation**: Jump to related PO details from tasks

### 4. Search + Navigation
- **Global Search Box**: Persistent search across all data
- **Smart Query**: Searches purchase orders, tasks, vendors, and descriptions
- **Live Results**: Real-time dropdown with categorized results
- **Sidebar Navigation**: 
  - Active section highlighting
  - Badge notifications for pending items
  - Quick navigation between all sections
- User profile display with role information

### 5. Audit Trail
- **Activity Log Panel**: Complete session history
- **Action Tracking**: Records all user actions including:
  - Create, update, delete operations
  - Approvals and rejections
  - Comments and status changes
- **Timeline View**: Chronologically organized by date
- **Detailed Metadata**: JSON metadata for RL verification
- **Visual Action Icons**: Color-coded icons for different action types
- **Statistics Dashboard**: Quick stats on total activities, approvals, rejections

## Technical Stack

- **Framework**: Vite + React 19 + TypeScript
- **State Management**: `@chakra-dev/dojo-hooks` (no bespoke stores)
- **Styling**: Tailwind CSS 4 with custom SAP blue theme
- **Icons**: Lucide React
- **UI Components**: Custom components with Radix UI primitives
- **Build**: Single-file output with vite-plugin-singlefile

## Project Structure

```
sap/app/
├── src/
│   ├── components/
│   │   ├── common/          # Reusable components
│   │   │   ├── Header.tsx   # Global search & notifications
│   │   │   ├── Sidebar.tsx  # Navigation menu
│   │   │   └── StatusBadge.tsx
│   │   ├── dashboard/       # Dashboard widgets
│   │   │   ├── Dashboard.tsx
│   │   │   └── KPICard.tsx
│   │   ├── procurement/     # PO workflow
│   │   │   ├── Procurement.tsx
│   │   │   ├── POList.tsx
│   │   │   ├── POFilters.tsx
│   │   │   └── PODetail.tsx
│   │   ├── tasks/           # Approval inbox
│   │   │   └── Tasks.tsx
│   │   └── audit/           # Audit trail
│   │       └── AuditTrail.tsx
│   ├── context/
│   │   └── AppProvider.tsx  # State management with useDojoState
│   ├── lib/
│   │   ├── types.ts         # TypeScript definitions
│   │   ├── seedData.ts      # Initial fixture data
│   │   └── utils.ts         # Utility functions
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── package.json
├── vite.config.ts
└── tsconfig.json
```

## Getting Started

### Installation

```bash
cd sap/app
pnpm install
```

### Development

```bash
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173) to view the application.

### Build

```bash
pnpm build
```

Generates a single-file HTML output in the `dist/` directory.

### Linting

```bash
pnpm lint
```

## Key Design Decisions

### No Authentication
The app boots straight into the business context as "Klaus Weber, Finance Manager" - no login flows or auth barriers.

### Offline-First
All data is seeded on initialization. The app is fully functional without any backend or API calls.

### Responsive Design
Optimized for 1280px and 1440px viewport widths with flexible layouts that adapt gracefully.

### RL-Friendly
- All state changes are tracked in the audit log
- Deterministic behavior for reproducible agent training
- Clear action-result patterns
- Structured data accessible via `window.dojo`

## State Management

The entire application state is managed through `@chakra-dev/dojo-hooks`:

```typescript
interface AppState {
  currentUser: string;
  currentSection: "dashboard" | "procurement" | "tasks" | "audit";
  purchaseOrders: PurchaseOrder[];
  tasks: ApprovalTask[];
  auditLog: AuditLogEntry[];
  searchQuery: string;
  selectedPOId: string | null;
  poFilters: { ... };
  taskFilters: { ... };
}
```

Access state globally via `window.dojo.state` for RL agent inspection.

## Seed Data

The application includes rich seed data:
- 6 Purchase Orders (various statuses and amounts)
- 7 Approval Tasks (including completed ones)
- 12 Audit Log Entries (historical actions)
- Realistic German company names and Euro currency

## Color Scheme

- **Primary Brand**: `#00a9e0` (SAP Blue)
- **Dark UI**: `#1a1a1a` (Sidebar background)
- **Status Colors**: Semantic colors for different states
  - Green: Approved, Completed
  - Yellow: Pending, Draft
  - Red: Rejected, Critical
  - Blue: Ordered, In Progress

## Browser Support

Modern browsers with ES2020+ support:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+



