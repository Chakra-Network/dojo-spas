export type TabType =
  | "dashboard"
  | "campaigns"
  | "email-editor"
  | "contacts"
  | "automation-log";

export interface Tab {
  id: string;
  type: TabType;
  dataId?: string;
}

export type CampaignStatus = "Draft" | "Scheduled" | "Active" | "Paused" | "Completed";
export type CampaignType = "Email" | "Social" | "Ads" | "Landing Page";

export interface Campaign {
  id: string;
  name: string;
  type: CampaignType;
  status: CampaignStatus;
  startDate: string;
  endDate?: string;
  budget?: number;
  leads: number;
  conversions: number;
  clicks: number;
  impressions: number;
  createdAt: number;
  updatedAt: number;
}

export type LifecycleStage = "Subscriber" | "Lead" | "MQL" | "SQL" | "Opportunity" | "Customer" | "Evangelist";

export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  jobTitle?: string;
  lifecycleStage: LifecycleStage;
  leadScore: number;
  lastActivity: string;
  source: string;
  notes: string[];
  tags: string[];
  createdAt: number;
  updatedAt: number;
}

export type EmailStatus = "Draft" | "Scheduled" | "Sent";

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  previewText?: string;
  content: EmailBlock[];
  status: EmailStatus;
  audienceSegment?: string;
  scheduledFor?: string;
  sentAt?: string;
  opens?: number;
  clicks?: number;
  createdAt: number;
  updatedAt: number;
}

export type BlockType = "header" | "text" | "image" | "button" | "divider" | "spacer";

export interface EmailBlock {
  id: string;
  type: BlockType;
  content: string;
  styles?: Record<string, string>;
}

export type AutomationEventType =
  | "campaign_launched"
  | "email_sent"
  | "email_opened"
  | "email_clicked"
  | "lead_converted"
  | "contact_created"
  | "contact_updated"
  | "form_submitted";

export interface AutomationEvent {
  id: string;
  type: AutomationEventType;
  description: string;
  entityId?: string;
  entityName?: string;
  timestamp: number;
  metadata?: Record<string, unknown>;
}
