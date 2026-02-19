export type TicketStatus = "new" | "open" | "pending" | "solved" | "closed";
export type TicketPriority = "urgent" | "high" | "normal" | "low";
export type SLAStatus = "ok" | "warning" | "breached";

export interface Customer {
  id: string;
  name: string;
  email: string;
  company: string;
  avatar: string;
  lifecycleStage: "lead" | "prospect" | "customer" | "churned";
  createdAt: string;
}

export interface TicketMessage {
  id: string;
  author: string;
  authorType: "customer" | "agent" | "system";
  content: string;
  timestamp: string;
  isInternal: boolean;
}

export interface Ticket {
  id: string;
  subject: string;
  status: TicketStatus;
  priority: TicketPriority;
  tags: string[];
  customerId: string;
  assigneeId: string | null;
  createdAt: string;
  updatedAt: string;
  slaDeadline: string;
  slaStatus: SLAStatus;
  messages: TicketMessage[];
}

export interface Agent {
  id: string;
  name: string;
  avatar: string;
  role: "admin" | "agent";
  ticketsAssigned: number;
  ticketsResolved: number;
  avgResponseTime: string;
  satisfaction: number;
}

export interface Macro {
  id: string;
  name: string;
  description: string;
  category: string;
  actions: {
    setStatus?: TicketStatus;
    setPriority?: TicketPriority;
    addTags?: string[];
    replyTemplate?: string;
  };
}

export interface AutomationEvent {
  id: string;
  type: "ticket_created" | "ticket_assigned" | "reply_sent" | "status_changed" | "sla_breached" | "macro_applied" | "escalation";
  ticketId: string;
  description: string;
  timestamp: string;
}

export interface ZenDeskState {
  tickets: Ticket[];
  customers: Customer[];
  agents: Agent[];
  macros: Macro[];
  automationLog: AutomationEvent[];
  currentAgent: Agent;
  selectedTicketId: string | null;
  activeView: "dashboard" | "inbox" | "ticket" | "macros" | "sla";
  inboxFilters: {
    status: TicketStatus | "all";
    priority: TicketPriority | "all";
    tag: string | "all";
  };
}
