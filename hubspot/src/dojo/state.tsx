import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { CAMPAIGNS_DATA } from '../data/campaigns';
import { CONTACTS_DATA } from '../data/contacts';
import { EMAILS_DATA } from '../data/emails';
import { AUTOMATION_LOG_DATA } from '../data/automationLog';

// ---------- Types ----------
export interface Campaign {
  id: string;
  name: string;
  status: 'draft' | 'scheduled' | 'active' | 'paused' | 'completed';
  stage: 'planning' | 'ready' | 'live' | 'analysis';
  type: 'email' | 'social' | 'ads' | 'content';
  scheduledDate?: string;
  startDate?: string;
  endDate?: string;
  budget?: number;
  spent?: number;
  impressions?: number;
  clicks?: number;
  conversions?: number;
  leads?: number;
  createdAt: string;
}

export interface Email {
  id: string;
  campaignId?: string;
  name: string;
  subject: string;
  status: 'draft' | 'scheduled' | 'sent';
  contentBlocks: ContentBlock[];
  segmentation: {
    listIds: string[];
    filters: string[];
  };
  scheduledDate?: string;
  sentDate?: string;
  stats?: {
    sent: number;
    delivered: number;
    opened: number;
    clicked: number;
    bounced: number;
    unsubscribed: number;
  };
  revisions: EmailRevision[];
  createdAt: string;
  updatedAt: string;
}

export interface ContentBlock {
  id: string;
  type: 'text' | 'image' | 'button' | 'divider';
  content: string;
  order: number;
}

export interface EmailRevision {
  id: string;
  timestamp: string;
  subject: string;
  contentBlocks: ContentBlock[];
  author: string;
}

export interface Contact {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  company?: string;
  lifecycleStage: 'subscriber' | 'lead' | 'marketing_qualified_lead' | 'sales_qualified_lead' | 'opportunity' | 'customer' | 'evangelist';
  owner?: string;
  phone?: string;
  website?: string;
  leadSource?: string;
  createdAt: string;
  lastActivityDate?: string;
  activityTimeline: ContactActivity[];
  notes: ContactNote[];
  customFields?: Record<string, string>;
}

export interface ContactActivity {
  id: string;
  type: 'email_open' | 'email_click' | 'form_submit' | 'page_view' | 'meeting' | 'call';
  description: string;
  timestamp: string;
  metadata?: Record<string, unknown>;
}

export interface ContactNote {
  id: string;
  text: string;
  author: string;
  timestamp: string;
}

export interface AutomationLogEntry {
  id: string;
  timestamp: string;
  action: 'campaign_launch' | 'email_send' | 'lead_conversion' | 'workflow_trigger' | 'list_update';
  description: string;
  entityType: 'campaign' | 'email' | 'contact' | 'workflow';
  entityId: string;
  metadata?: Record<string, unknown>;
}

export interface MarketingMetrics {
  totalLeads: number;
  newLeadsThisMonth: number;
  conversionRate: number;
  emailEngagementRate: number;
  activeCampaigns: number;
  totalCampaigns: number;
}

export interface DojoState {
  campaigns: Campaign[];
  emails: Email[];
  contacts: Contact[];
  automationLog: AutomationLogEntry[];
  metrics: MarketingMetrics;
}

// ---------- Global Store ----------
const calculateMetrics = (
  campaigns: Campaign[],
  emails: Email[],
  contacts: Contact[]
): MarketingMetrics => {
  const totalLeads = contacts.filter(c =>
    ['lead', 'marketing_qualified_lead', 'sales_qualified_lead'].includes(c.lifecycleStage)
  ).length;

  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const newLeadsThisMonth = contacts.filter(c =>
    new Date(c.createdAt) > thirtyDaysAgo
  ).length;

  const totalEmailsSent = emails.reduce((sum, e) => sum + (e.stats?.sent || 0), 0);
  const totalEmailsEngaged = emails.reduce((sum, e) =>
    sum + (e.stats?.opened || 0) + (e.stats?.clicked || 0), 0
  );
  const emailEngagementRate = totalEmailsSent > 0
    ? (totalEmailsEngaged / totalEmailsSent) * 100
    : 0;

  const activeCampaigns = campaigns.filter(c => c.status === 'active').length;

  return {
    totalLeads,
    newLeadsThisMonth,
    conversionRate: 3.2, // Mock for now
    emailEngagementRate: parseFloat(emailEngagementRate.toFixed(1)),
    activeCampaigns,
    totalCampaigns: campaigns.length,
  };
};

let globalState: DojoState = {
  campaigns: CAMPAIGNS_DATA,
  emails: EMAILS_DATA,
  contacts: CONTACTS_DATA,
  automationLog: AUTOMATION_LOG_DATA,
  metrics: calculateMetrics(CAMPAIGNS_DATA, EMAILS_DATA, CONTACTS_DATA),
};

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

    // Recalculate metrics when data changes
    if (key === 'campaigns' || key === 'emails' || key === 'contacts') {
      globalState = {
        ...globalState,
        metrics: calculateMetrics(
          globalState.campaigns,
          globalState.emails,
          globalState.contacts
        ),
      };
    }

    // Auto audit log
    if (key !== 'automationLog' && auditDescription) {
      const logEntry: AutomationLogEntry = {
        id: `log-${Date.now()}-${Math.random()}`,
        timestamp: new Date().toISOString(),
        action: key === 'campaigns' ? 'campaign_launch' :
                key === 'emails' ? 'email_send' :
                key === 'contacts' ? 'lead_conversion' : 'workflow_trigger',
        description: auditDescription,
        entityType: key === 'campaigns' ? 'campaign' :
                    key === 'emails' ? 'email' :
                    key === 'contacts' ? 'contact' : 'workflow',
        entityId: 'system',
      };
      globalState = {
        ...globalState,
        automationLog: [...globalState.automationLog, logEntry],
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

// ---------- Initialize ----------
export function initializeDojoState(initialData: Partial<DojoState>) {
  globalState = {
    campaigns: initialData.campaigns || CAMPAIGNS_DATA,
    emails: initialData.emails || EMAILS_DATA,
    contacts: initialData.contacts || CONTACTS_DATA,
    automationLog: initialData.automationLog || AUTOMATION_LOG_DATA,
    metrics: initialData.metrics || calculateMetrics(
      initialData.campaigns || CAMPAIGNS_DATA,
      initialData.emails || EMAILS_DATA,
      initialData.contacts || CONTACTS_DATA
    ),
  };
  listeners.forEach((l) => l());
}
