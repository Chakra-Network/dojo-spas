import type { JSX } from "react";

export type BannerCardType = {
  id: string;
  icon: {
    Icon: JSX.ElementType;
    iconColor: string;
    bgColor?: string;
  };
  title: string;
  description: string;
  hasExternalLink: boolean;
};

export type LeadStatus =
  | "New"
  | "Contacted"
  | "Nurturing"
  | "Unqualified"
  | "Converted";

export interface Lead {
  id: string;
  name: string;
  company: string;
  // About section
  salutation?: string;
  firstName?: string;
  lastName?: string;
  title?: string;
  website?: string;
  description?: string;
  leadStatus?: LeadStatus;
  leadOwner?: string;
  // Get in Touch section
  phone?: string;
  email?: string;
  country?: string;
  street?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  // Segment section
  numberOfEmployees?: string;
  annualRevenue?: string;
  leadSource?: string;
  industry?: string;
  // Conversion tracking
  convertedToContactId?: string;
  // Tracking
  updatedAt: number;
}

export interface Contact {
  id: string;
  name: string;
  company: string;
  // About section
  salutation?: string;
  firstName?: string;
  lastName?: string;
  accountName: string;
  title?: string;
  reportsTo?: string;
  description?: string;
  contactOwner?: string;
  // Get in Touch section
  phone?: string;
  email?: string;
  mailingCountry?: string;
  mailingStreet?: string;
  mailingCity?: string;
  mailingState?: string;
  mailingZipCode?: string;
  // Tracking
  updatedAt: number;
}

export type OpportunityStage =
  | "Qualify"
  | "Meet & Present"
  | "Propose"
  | "Negotiate"
  | "Closed Won"
  | "Closed Lost";

export type ForecastCategory =
  | "Omitted"
  | "Pipeline"
  | "Best Case"
  | "Commmit"
  | "Closed";

export interface Opportunity {
  id: string;
  // About section
  opportunityName: string;
  accountName: string;
  closeDate: string;
  amount?: string;
  description?: string;
  opportunityOwner: string;
  // Status section
  stage: OpportunityStage;
  probability?: number;
  forecastCategory: ForecastCategory;
  nextStep?: string;
  // Tracking
  updatedAt: number;
}

export type CaseStatus =
  | "New"
  | "Working"
  | "Waiting on Customer"
  | "Escalated"
  | "Closed";

export type CaseOrigin = "--None--" | "Email" | "Phone" | "Web";

export interface Case {
  id: string;
  // Case Information
  status: CaseStatus;
  caseOrigin?: CaseOrigin;
  priority?: string;
  caseOwner: string;
  caseReason?: string;
  // Contact Information
  contactName?: string;
  accountName?: string;
  // Description Information
  subject?: string;
  description?: string;
  // Additional
  sendNotificationEmail?: boolean;
  // Tracking
  updatedAt: number;
}

export interface Tab {
  id: string;
  type:
    | "home-dashboard"
    | "home-lead"
    | "home-contact"
    | "home-listLeads"
    | "home-opportunity"
    | "home-case";
  dataId?: string;
  isEditDetails?: boolean;
}

export interface GuidanceContent {
  title: string;
  bullets: string[];
  footer: string;
}

export type RecordItem = {
  id: string;
  name: string;
  type: "Lead" | "Contact" | "Opportunity" | "Case";
  updatedAt: number;
  icon: React.ComponentType<{ className?: string }>;
  iconBgColor: string;
  originalData: Lead | Contact | Opportunity | Case;
};
