import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { TICKETS_DATA } from '../data/tickets';
import { AGENTS_DATA } from '../data/agents';
import { MACROS_DATA } from '../data/macros';

// ---------- Types ----------
export type TicketStatus = 'new' | 'open' | 'pending' | 'solved' | 'closed';
export type TicketPriority = 'low' | 'normal' | 'high' | 'urgent';
export type SLAStatus = 'active' | 'breached' | 'at_risk';

export interface Comment {
  id: string;
  ticketId: string;
  author: string;
  authorType: 'agent' | 'customer';
  body: string;
  isPublic: boolean;
  createdAt: string;
}

export interface Ticket {
  id: string;
  subject: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  tags: string[];
  customerId: string;
  customerName: string;
  customerEmail: string;
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
  dueAt?: string;
  comments: Comment[];
  slaStatus: SLAStatus;
  slaBreachTime?: string;
  firstResponseAt?: string;
  resolvedAt?: string;
}

export interface Agent {
  id: string;
  name: string;
  email: string;
  role: 'agent' | 'admin';
  avatar?: string;
  status: 'online' | 'away' | 'offline';
  ticketsAssigned: number;
  ticketsSolved: number;
  avgResponseTime: number; // in minutes
  satisfactionScore: number; // 0-100
}

export interface Macro {
  id: string;
  name: string;
  description: string;
  actions: MacroAction[];
  category: string;
  createdBy: string;
  usageCount: number;
}

export interface MacroAction {
  type: 'set_status' | 'set_priority' | 'add_tags' | 'assign_to' | 'add_comment';
  value: string | string[];
}

export interface SLAPolicy {
  id: string;
  name: string;
  priority: TicketPriority;
  firstResponseTime: number; // in minutes
  resolveTime: number; // in minutes
}

export interface QueueMetrics {
  newTickets: number;
  pendingTickets: number;
  breachedSLAs: number;
  atRiskSLAs: number;
  avgFirstResponseTime: number;
  avgResolveTime: number;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  action: string;
  description: string;
  agentId?: string;
}

export interface DojoState {
  tickets: Ticket[];
  agents: Agent[];
  macros: Macro[];
  slaPolicies: SLAPolicy[];
  queueMetrics: QueueMetrics;
  currentAgent: Agent | null;
  auditLog: AuditLogEntry[];
}

// ---------- Global Store ----------
let globalState: DojoState = {
  tickets: TICKETS_DATA,
  agents: AGENTS_DATA,
  macros: MACROS_DATA,
  slaPolicies: [
    {
      id: 'sla-1',
      name: 'Standard SLA',
      priority: 'normal',
      firstResponseTime: 60,
      resolveTime: 480,
    },
    {
      id: 'sla-2',
      name: 'High Priority SLA',
      priority: 'high',
      firstResponseTime: 30,
      resolveTime: 240,
    },
    {
      id: 'sla-3',
      name: 'Urgent SLA',
      priority: 'urgent',
      firstResponseTime: 15,
      resolveTime: 120,
    },
  ],
  queueMetrics: {
    newTickets: 0,
    pendingTickets: 0,
    breachedSLAs: 0,
    atRiskSLAs: 0,
    avgFirstResponseTime: 0,
    avgResolveTime: 0,
  },
  currentAgent: AGENTS_DATA[0] || null,
  auditLog: [],
};

// Calculate initial queue metrics
function calculateQueueMetrics(tickets: Ticket[]): QueueMetrics {
  const newTickets = tickets.filter(t => t.status === 'new').length;
  const pendingTickets = tickets.filter(t => t.status === 'pending').length;
  const breachedSLAs = tickets.filter(t => t.slaStatus === 'breached').length;
  const atRiskSLAs = tickets.filter(t => t.slaStatus === 'at_risk').length;

  const ticketsWithResponse = tickets.filter(t => t.firstResponseAt);
  const avgFirstResponseTime = ticketsWithResponse.length > 0
    ? ticketsWithResponse.reduce((sum, t) => {
        const created = new Date(t.createdAt).getTime();
        const responded = new Date(t.firstResponseAt!).getTime();
        return sum + (responded - created) / 60000; // in minutes
      }, 0) / ticketsWithResponse.length
    : 0;

  const resolvedTickets = tickets.filter(t => t.resolvedAt);
  const avgResolveTime = resolvedTickets.length > 0
    ? resolvedTickets.reduce((sum, t) => {
        const created = new Date(t.createdAt).getTime();
        const resolved = new Date(t.resolvedAt!).getTime();
        return sum + (resolved - created) / 60000; // in minutes
      }, 0) / resolvedTickets.length
    : 0;

  return {
    newTickets,
    pendingTickets,
    breachedSLAs,
    atRiskSLAs,
    avgFirstResponseTime,
    avgResolveTime,
  };
}

globalState.queueMetrics = calculateQueueMetrics(globalState.tickets);

const listeners = new Set<() => void>();

export const dojo = {
  getState(): DojoState {
    return globalState;
  },

  setState<K extends keyof DojoState>(
    key: K,
    value: DojoState[K],
    auditDescription?: string
  ) {
    console.log(`Dojo State Change: Key=${key}, Value=`, value);
    globalState = { ...globalState, [key]: value };

    // Recalculate queue metrics when tickets change
    if (key === 'tickets') {
      globalState = {
        ...globalState,
        queueMetrics: calculateQueueMetrics(value as Ticket[]),
      };
    }

    // Auto audit log
    if (key !== 'auditLog' && auditDescription) {
      const auditEntry: AuditLogEntry = {
        id: `audit-${Date.now()}-${Math.random()}`,
        timestamp: new Date().toISOString(),
        action: `UPDATE_${key.toUpperCase()}`,
        description: auditDescription,
        agentId: globalState.currentAgent?.id,
      };
      globalState = {
        ...globalState,
        auditLog: [...globalState.auditLog, auditEntry],
      };
    }

    listeners.forEach((l) => l());
  },

  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },

  // Helper method to update a specific ticket
  updateTicket(ticketId: string, updates: Partial<Ticket>, auditDescription?: string) {
    const tickets = globalState.tickets.map(ticket =>
      ticket.id === ticketId
        ? { ...ticket, ...updates, updatedAt: new Date().toISOString() }
        : ticket
    );
    this.setState('tickets', tickets, auditDescription);
  },

  // Helper method to add a comment
  addComment(ticketId: string, comment: Omit<Comment, 'id' | 'ticketId' | 'createdAt'>) {
    const newComment: Comment = {
      id: `comment-${Date.now()}-${Math.random()}`,
      ticketId,
      createdAt: new Date().toISOString(),
      ...comment,
    };

    const tickets = globalState.tickets.map(ticket =>
      ticket.id === ticketId
        ? {
            ...ticket,
            comments: [...ticket.comments, newComment],
            updatedAt: new Date().toISOString(),
            firstResponseAt: ticket.firstResponseAt || (comment.authorType === 'agent' ? new Date().toISOString() : undefined),
          }
        : ticket
    );

    this.setState('tickets', tickets, `Added ${comment.isPublic ? 'public' : 'internal'} note to ticket ${ticketId}`);
  },

  // Helper method to apply a macro
  applyMacro(ticketId: string, macro: Macro) {
    const ticket = globalState.tickets.find(t => t.id === ticketId);
    if (!ticket) return;

    const updates: Partial<Ticket> = {};

    macro.actions.forEach(action => {
      switch (action.type) {
        case 'set_status':
          updates.status = action.value as TicketStatus;
          break;
        case 'set_priority':
          updates.priority = action.value as TicketPriority;
          break;
        case 'add_tags':
          updates.tags = [...ticket.tags, ...(Array.isArray(action.value) ? action.value : [action.value])];
          break;
        case 'assign_to':
          updates.assignedTo = action.value as string;
          break;
        case 'add_comment':
          // Handle comment separately
          this.addComment(ticketId, {
            author: globalState.currentAgent?.name || 'System',
            authorType: 'agent',
            body: action.value as string,
            isPublic: true,
          });
          break;
      }
    });

    this.updateTicket(ticketId, updates, `Applied macro "${macro.name}" to ticket ${ticketId}`);

    // Update macro usage count
    const macros = globalState.macros.map(m =>
      m.id === macro.id ? { ...m, usageCount: m.usageCount + 1 } : m
    );
    this.setState('macros', macros);
  },
};

// ---------- React Context ----------
const DojoContext = createContext<typeof dojo | null>(null);

export const DojoProvider = ({ children }: { children: React.ReactNode }) => {
  const dojoRef = useRef(dojo);

  useEffect(() => {
    // Expose dojo globally for debugging in browser console
    (window as any).dojo = dojoRef.current;
  }, []);

  return (
    <DojoContext.Provider value={dojoRef.current}>{children}</DojoContext.Provider>
  );
};

// ---------- Hooks ----------
export function useDojo() {
  const context = useContext(DojoContext);
  if (!context) {
    throw new Error('useDojo must be used inside a <DojoProvider>');
  }
  return context;
}

export function useDojoState<K extends keyof DojoState>(key: K): DojoState[K] {
  const dojoCtx = useDojo();
  const [state, setState] = useState(dojoCtx.getState()[key]);

  useEffect(() => {
    const unsubscribe = dojoCtx.subscribe(() => {
      setState(dojoCtx.getState()[key]);
    });
    return unsubscribe;
  }, [key, dojoCtx]);

  return state;
}
