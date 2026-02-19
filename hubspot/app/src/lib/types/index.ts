export type CampaignStatus = "draft" | "scheduled" | "active" | "completed" | "paused";

export type CampaignType = "email" | "social" | "ads" | "landing-page" | "workflow";

export interface Campaign {
  id: string;
  name: string;
  type: CampaignType;
  status: CampaignStatus;
  startDate: string;
  endDate: string | null;
  budget: number;
  spent: number;
  leads: number;
  conversions: number;
  impressions: number;
  clicks: number;
  openRate: number;
  clickRate: number;
  owner: string;
  description: string;
  tags: string[];
}

export type LifecycleStage = "subscriber" | "lead" | "mql" | "sql" | "customer";

export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  jobTitle: string;
  phone: string;
  lifecycleStage: LifecycleStage;
  owner: string;
  avatar: string;
  lastActivity: string;
  createdAt: string;
  source: string;
  notes: ContactNote[];
  activities: ActivityEntry[];
}

export interface ContactNote {
  id: string;
  content: string;
  author: string;
  timestamp: string;
}

export interface ActivityEntry {
  id: string;
  type: "email_open" | "email_click" | "form_submit" | "page_view" | "meeting" | "call" | "note" | "stage_change";
  description: string;
  timestamp: string;
  metadata?: Record<string, string>;
}

export type AutomationEventType =
  | "campaign_launched"
  | "email_sent"
  | "email_opened"
  | "email_clicked"
  | "lead_converted"
  | "contact_created"
  | "stage_changed"
  | "form_submitted"
  | "workflow_triggered"
  | "campaign_completed";

export interface AutomationEvent {
  id: string;
  type: AutomationEventType;
  description: string;
  timestamp: string;
  contactId?: string;
  contactName?: string;
  campaignId?: string;
  campaignName?: string;
  metadata?: Record<string, string>;
}

export interface EmailTemplate {
  id: string;
  subject: string;
  preheader: string;
  blocks: ContentBlock[];
  segmentation: SegmentationRule[];
  lastModified: string;
  author: string;
  status: "draft" | "ready" | "sent";
}

export interface ContentBlock {
  id: string;
  type: "header" | "text" | "image" | "button" | "divider" | "spacer";
  content: string;
  style?: Record<string, string>;
}

export interface SegmentationRule {
  id: string;
  field: string;
  operator: "is" | "is_not" | "contains" | "greater_than" | "less_than";
  value: string;
  enabled: boolean;
}

export type NavSection =
  | "dashboard"
  | "campaigns"
  | "email"
  | "contacts"
  | "automation";

export interface DashboardMetrics {
  totalLeads: number;
  leadsThisMonth: number;
  leadsChange: number;
  totalContacts: number;
  emailsSent: number;
  avgOpenRate: number;
  avgClickRate: number;
  conversionRate: number;
  revenue: number;
  activeCampaigns: number;
}

export interface FunnelStage {
  name: string;
  count: number;
  percentage: number;
  color: string;
}

export interface HubSpotState {
  currentSection: NavSection;
  campaigns: Campaign[];
  contacts: Contact[];
  automationLog: AutomationEvent[];
  emailTemplates: EmailTemplate[];
  selectedCampaignId: string | null;
  selectedContactId: string | null;
  selectedTemplateId: string | null;
  campaignViewMode: "table" | "kanban";
  contactSearch: string;
  contactFilterStage: LifecycleStage | "all";
  sidebarCollapsed: boolean;
}
