import type { AutomationLogEntry, DashboardMetrics } from "../types";
import { createPastDate } from "./utils";

export const automationLog: AutomationLogEntry[] = [
  {
    id: "log-1",
    timestamp: createPastDate(1),
    eventType: "Lead Converted",
    description: "Contact 'Jane Smith' moved to stage 'Customer'.",
  },
  {
    id: "log-2",
    timestamp: createPastDate(5),
    eventType: "Campaign Started",
    description: "Campaign 'Q4 Product Launch' has been activated.",
  },
  {
    id: "log-3",
    timestamp: createPastDate(10),
    eventType: "Email Sent",
    description: "Sent 'Welcome Email' to segment 'New Leads'.",
  },
];

export const dashboardMetrics: DashboardMetrics = {
  totalLeads: 1250,
  newLeadsThisMonth: 180,
  conversionRate: 4.5,
  leadFunnel: [
    { name: "Subscriber", value: 400 },
    { name: "Lead", value: 300 },
    { name: "Marketing Qualified Lead", value: 200 },
    { name: "Sales Qualified Lead", value: 150 },
    { name: "Opportunity", value: 100 },
    { name: "Customer", value: 50 },
  ],
  emailEngagement: {
    sent: 5000,
    openRate: 25.5,
    clickRate: 3.2,
  },
};