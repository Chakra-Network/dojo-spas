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
}

export interface Contact {
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
  contactOwner?: string;
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
}

export interface Tab {
  id: string;
  type: "home-dashboard" | "home-lead" | "home-contact" | "home-listLeads";
  dataId?: string;
  isEditDetails?: boolean;
}
