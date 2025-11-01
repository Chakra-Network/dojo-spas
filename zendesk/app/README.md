# 🎫 Zendesk Support Inbox SPA

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-3178C6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5.0.8-646CFF?logo=vite)

A production-ready Zendesk-inspired support inbox application built with React and TypeScript. Designed for reinforcement-learning agents to practice ticket triaging, macro application, and escalation coordination.

[Features](#-features) • [Tech Stack](#️-tech-stack) • [Getting Started](#-getting-started) • [Project Structure](#-project-structure) • [Documentation](#-documentation)

</div>

---

## � Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#️-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Core Components](#-core-components)
- [Data Models](#-data-models)
- [Key Design Decisions](#-key-design-decisions)
- [Development](#-development)
- [License](#-license)

## 🎯 Overview

This application replicates the core functionality of Zendesk's support ticket system, providing a complete agent workspace for managing customer support tickets. It features a modern, responsive UI built with Chakra UI and includes comprehensive ticket management, SLA tracking, macro automation, and customer profile management.

**Perfect for:**
- Training AI agents on support workflows
- Prototyping customer support systems
- Learning modern React patterns
- Demonstrating enterprise SaaS UIs

## ✨ Features

### 🏠 Agent Dashboard
- **Queue Health Metrics**: Real-time overview of new, pending, and breached SLA tickets
- **Performance Stats**: Personal agent metrics including response time, resolution rate, and tickets handled
- **Quick Actions**: Fast access to critical tickets and team statistics

### 📬 Ticket Inbox
- **Advanced Filtering**: Filter by status, priority, tags, assignee, and custom search queries
- **Bulk Actions**: Perform actions on multiple tickets simultaneously
- **Infinite Scroll**: Seamless loading of large ticket lists
- **Smart Sorting**: Sort tickets by priority, creation date, SLA breach time, and more
- **Status Labels**: Color-coded visual indicators for ticket states

### 💼 Ticket Workspace
- **Conversation History**: Complete message thread with customer and agent interactions
- **Internal Notes**: Private notes for team collaboration
- **Customer Profile**: Comprehensive customer information and ticket history
- **Ticket Actions**: Quick actions for status updates, priority changes, and assignments
- **SLA Tracker**: Visual timeline showing SLA deadlines and breach risks
- **Tabbed Interface**: Organized workspace with conversation, notes, and profile tabs

### ⚡ Macro Library
- **Canned Responses**: Pre-configured response templates for common scenarios
- **Auto-Actions**: Macros that automatically update ticket status and metadata
- **Quick Apply**: One-click macro application from the workspace
- **Template Variables**: Dynamic content insertion for personalized responses

### 🕐 SLA Management
- **Breach Monitoring**: Real-time tracking of SLA compliance
- **Visual Indicators**: Color-coded warnings for approaching deadlines
- **Escalation Tracking**: Automated alerts for at-risk tickets
- **Timeline View**: Visual representation of ticket lifecycle and SLA milestones

### 🎨 Modern UI/UX
- **Responsive Design**: Optimized for 1280px and 1440px viewports
- **Zendesk-Like**: Familiar interface mirroring Zendesk conventions
- **Dark Mode Ready**: Chakra UI theming support
- **Keyboard Shortcuts**: Efficient navigation and actions
- **Accessibility**: WCAG compliant components

## 🛠️ Tech Stack

### Core
- **[React 18.2.0](https://react.dev/)** - UI library with concurrent features
- **[TypeScript 5.2.2](https://www.typescriptlang.org/)** - Type-safe development
- **[Vite 5.0.8](https://vitejs.dev/)** - Fast build tool and dev server

### UI & Styling
- **[Chakra UI 2.8.2](https://chakra-ui.com/)** - Component library with accessibility
- **[Emotion](https://emotion.sh/)** - CSS-in-JS styling
- **[Framer Motion 10.16.4](https://www.framer.com/motion/)** - Animation library
- **[React Icons 4.12.0](https://react-icons.github.io/react-icons/)** - Icon library

### State & Utilities
- **[@chakra-dev/dojo-hooks](https://github.com/chakra-network/dojo-hooks)** - Custom React hooks for state management
- **[date-fns 2.30.0](https://date-fns.org/)** - Modern date utility library

### Development
- **ESLint** - Code linting and quality
- **TypeScript ESLint** - TypeScript-specific linting rules
- **Vite React Plugin** - Fast refresh and optimized builds

## � Getting Started

### Prerequisites

- **Node.js** 18.x or higher
- **npm**, **yarn**, or **pnpm** package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Chakra-Network/dojo-spas.git
   cd dojo-spas/zendesk/app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   # or
   yarn install
   ```

### Development Server

Start the development server with hot module replacement:

```bash
npm run dev
```

The app will be available at `http://localhost:5173` (or the next available port).

### Build for Production

Create an optimized production build:

```bash
npm run build
```

The build output will be in the `dist/` directory.

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

### Linting

Run ESLint to check code quality:

```bash
npm run lint
```

## 📁 Project Structure

```
zendesk/app/
├── src/
│   ├── components/
│   │   ├── dashboard/              # Dashboard components
│   │   │   ├── Dashboard.tsx       # Main dashboard container
│   │   │   ├── PerformanceStats.tsx # Agent performance metrics
│   │   │   ├── QueueMetrics.tsx    # Ticket queue overview
│   │   │   └── index.ts
│   │   │
│   │   ├── inbox/                  # Ticket inbox components
│   │   │   ├── TicketList.tsx      # Main ticket list view
│   │   │   ├── TicketFilters.tsx   # Filter controls
│   │   │   ├── BulkActions.tsx     # Multi-ticket actions
│   │   │   ├── CreateTicketModal.tsx # New ticket creation
│   │   │   ├── RightSidebar.tsx    # Quick actions sidebar
│   │   │   └── index.ts
│   │   │
│   │   ├── workspace/              # Ticket workspace components
│   │   │   ├── TicketWorkspace.tsx # Main workspace container
│   │   │   ├── ConversationHistory.tsx # Message thread
│   │   │   ├── InternalNotes.tsx   # Private notes
│   │   │   ├── CustomerProfile.tsx # Customer info panel
│   │   │   ├── TicketActions.tsx   # Quick actions
│   │   │   ├── TicketSidebar.tsx   # Workspace sidebar
│   │   │   └── index.ts
│   │   │
│   │   ├── macros/                 # Macro components
│   │   │   ├── MacroLibrary.tsx    # Macro management
│   │   │   └── index.ts
│   │   │
│   │   ├── sla/                    # SLA tracking components
│   │   │   ├── SLATracker.tsx      # SLA timeline widget
│   │   │   └── index.ts
│   │   │
│   │   └── layout/                 # Layout components
│   │       ├── Header.tsx          # Top navigation bar
│   │       ├── Sidebar.tsx         # Main navigation sidebar
│   │       ├── TicketsSidebar.tsx  # Tickets filter sidebar
│   │       └── index.ts
│   │
│   ├── contexts/
│   │   └── AppContext.tsx          # Global application context
│   │
│   ├── fixtures/                   # Mock data for offline operation
│   │   ├── tickets.ts              # Sample ticket data
│   │   ├── customers.ts            # Sample customer data
│   │   ├── macros.ts               # Sample macro templates
│   │   └── index.ts
│   │
│   ├── types/                      # TypeScript type definitions
│   │   ├── ticket.ts               # Ticket-related types
│   │   ├── macro.ts                # Macro-related types
│   │   └── index.ts
│   │
│   ├── theme/                      # Chakra UI theme configuration
│   │   └── index.ts
│   │
│   ├── App.tsx                     # Root application component
│   └── main.tsx                    # Application entry point
│
├── public/                         # Static assets
├── index.html                      # HTML entry point
├── package.json                    # Project dependencies
├── tsconfig.json                   # TypeScript configuration
├── tsconfig.app.json               # App-specific TS config
├── tsconfig.node.json              # Node-specific TS config
├── vite.config.ts                  # Vite configuration
└── README.md                       # This file
```

## 🧩 Core Components

### Dashboard
- **Dashboard**: Main dashboard container orchestrating metrics display
- **QueueMetrics**: Displays ticket queue statistics (new, open, pending, SLA breaches)
- **PerformanceStats**: Shows agent performance metrics

### Inbox
- **TicketList**: Primary ticket list view with infinite scroll
- **TicketFilters**: Advanced filtering controls (status, priority, tags, search)
- **BulkActions**: Multi-select actions for batch operations
- **CreateTicketModal**: Form for creating new tickets
- **RightSidebar**: Quick actions and ticket preview

### Workspace
- **TicketWorkspace**: Main workspace container with tabbed interface
- **ConversationHistory**: Full message thread display
- **InternalNotes**: Team collaboration notes
- **CustomerProfile**: Customer information and history
- **TicketActions**: Quick action buttons (assign, priority, status)
- **TicketSidebar**: Contextual workspace navigation

### Layout
- **Header**: Top navigation with search and user menu
- **Sidebar**: Main navigation menu
- **TicketsSidebar**: Collapsible filter sidebar for inbox

## 📊 Data Models

### Ticket
```typescript
interface Ticket {
  id: string
  subject: string
  description: string
  status: 'new' | 'open' | 'pending' | 'solved' | 'closed'
  priority: 'urgent' | 'high' | 'normal' | 'low'
  type: 'question' | 'incident' | 'problem' | 'task'
  tags: string[]
  customerId: string
  assigneeId: string | null
  createdAt: Date
  updatedAt: Date
  dueAt: Date | null
  slaBreachAt: Date | null
  conversationHistory: ConversationMessage[]
  internalNotes: InternalNote[]
}
```

### Customer
```typescript
interface Customer {
  id: string
  name: string
  email: string
  company: string
  avatar?: string
  createdAt: Date
  ticketCount: number
}
```

### Macro
```typescript
interface Macro {
  id: string
  title: string
  content: string
  actions: MacroAction[]
  category: string
}
```

## 🎯 Key Design Decisions

### Architecture
- **No Authentication**: Direct boot into business context for simplified demos and training
- **Offline-First**: Complete seed data included for standalone operation
- **Component Composition**: Atomic design principles for reusability
- **Type Safety**: Comprehensive TypeScript types for all data models

### State Management
- **Local State**: React hooks for component-level state
- **Context API**: Global state for tickets and filters
- **Dojo Hooks**: Custom hooks for common patterns

### UI/UX
- **Zendesk Conventions**: Familiar patterns for support professionals
- **Responsive Design**: Optimized for desktop workflows (1280px, 1440px)
- **Accessibility**: Keyboard navigation and screen reader support
- **Performance**: Virtualized lists for large datasets

### Data Flow
- **Mock Fixtures**: Realistic sample data for testing and development
- **Immutable Updates**: State modifications follow immutability patterns
- **Optimistic UI**: Immediate feedback for user actions

## 🔧 Development

### Adding a New Component

1. Create component file in appropriate directory
2. Export from `index.ts` in that directory
3. Add TypeScript types if needed
4. Import and use in parent component

### Adding Mock Data

Edit fixture files in `src/fixtures/`:
- `tickets.ts` - Add sample tickets
- `customers.ts` - Add sample customers
- `macros.ts` - Add sample macros

### Customizing Theme

Modify `src/theme/index.ts` to customize:
- Colors
- Typography
- Component styles
- Breakpoints

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:3000
VITE_APP_TITLE=Zendesk Support
```

## 📝 License

MIT License - see LICENSE file for details

---
