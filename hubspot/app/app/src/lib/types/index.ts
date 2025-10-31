// =================================================================
// Core Entities
// =================================================================

/** Represents a marketing campaign. */
export type CampaignStage = "Draft" | "Scheduled" | "Active" | "Completed";
export interface Campaign {
  id: string;
  name: string;
  stage: CampaignStage;
  status: "Active" | "Paused";
  scheduledDate: string | null; // ISO 8601 string
  ownerId: string;
  createDate: string; // ISO 8601 string
  performanceMetrics: {
    impressions: number;
    clicks: number;
    ctr: number; // Click-Through Rate
    conversions: number;
    cost: number;
  };
}

/** Represents a contact in the CRM. */
export type LifecycleStage =
  | "Subscriber"
  | "Lead"
  | "Marketing Qualified Lead"
  | "Sales Qualified Lead"
  | "Opportunity"
  | "Customer";

export interface ContactActivity {
  id: string;
  timestamp: string; // ISO 8601 string
  type: "Email" | "Call" | "Meeting" | "Note";
  description: string;
  userId: string;
}

export interface ContactNote {
  id: string;
  timestamp: string; // ISO 8601 string
  content: string;
  authorId: string;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  avatar: string;
  lifecycleStage: LifecycleStage;
  ownerId: string | null;
  company: string;
  jobTitle: string;
  createDate: string; // ISO 8601 string
  activityTimeline: ContactActivity[];
  notes: ContactNote[];
}

/** Represents a reusable email template. */
export type EmailSegment = "All Contacts" | "New Leads" | "Active Customers";
export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  content: string; // Simple string content for now
  targetSegment: EmailSegment;
}

/** Represents an entry in the automation log feed. */
export interface AutomationLogEntry {
  id:string;
  timestamp: string; // ISO 8601 string
  eventType: "Campaign Started" | "Email Sent" | "Lead Converted";
  description: string;
}

/** Represents a user who can own contacts or campaigns. */
export interface User {
  id: string;
  name: string;
  avatar: string;
}

// =================================================================
// Dashboard Specific Types
// =================================================================

export interface FunnelStage {
  name: LifecycleStage;
  value: number;
}

export interface EmailEngagementMetrics {
  sent: number;
  openRate: number;
  clickRate: number;
}

export interface DashboardMetrics {
  totalLeads: number;
  newLeadsThisMonth: number;
  conversionRate: number;
  leadFunnel: FunnelStage[];
  emailEngagement: EmailEngagementMetrics;
}

// =================================================================
// Main Application State
// =================================================================

/** The single, comprehensive state object for the entire SPA. */
export type AppView = "dashboard" | "campaigns" | "emails" | "contacts" | "logs";

export interface AppState {
  activeView: AppView;
  contacts: Contact[];
  campaigns: Campaign[];
  emailTemplates: EmailTemplate[];
  automationLog: AutomationLogEntry[];
  users: User[];
  dashboard: DashboardMetrics;
}