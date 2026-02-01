import type { ZenDeskState, Ticket, Customer, Agent, Macro, AutomationEvent } from "./types";

const customers: Customer[] = [
  { id: "c1", name: "Alice Nguyen", email: "alice@acmecorp.com", company: "Acme Corp", avatar: "AN", lifecycleStage: "customer", createdAt: "2025-08-15T10:00:00Z" },
  { id: "c2", name: "Bob Martinez", email: "bob@techstart.io", company: "TechStart", avatar: "BM", lifecycleStage: "customer", createdAt: "2025-09-20T14:30:00Z" },
  { id: "c3", name: "Carol Wei", email: "carol@globalretail.com", company: "Global Retail", avatar: "CW", lifecycleStage: "prospect", createdAt: "2025-11-05T09:15:00Z" },
  { id: "c4", name: "David Okafor", email: "david@finservices.ng", company: "FinServices", avatar: "DO", lifecycleStage: "customer", createdAt: "2025-06-12T11:00:00Z" },
  { id: "c5", name: "Emma Thompson", email: "emma@designhub.co", company: "DesignHub", avatar: "ET", lifecycleStage: "lead", createdAt: "2026-01-10T08:45:00Z" },
  { id: "c6", name: "Frank Dubois", email: "frank@eurotech.eu", company: "EuroTech", avatar: "FD", lifecycleStage: "customer", createdAt: "2025-04-22T16:20:00Z" },
  { id: "c7", name: "Grace Kim", email: "grace@cloudnine.kr", company: "CloudNine", avatar: "GK", lifecycleStage: "customer", createdAt: "2025-07-01T13:00:00Z" },
  { id: "c8", name: "Hassan Ali", email: "hassan@mediapro.ae", company: "MediaPro", avatar: "HA", lifecycleStage: "churned", createdAt: "2025-03-18T10:30:00Z" },
];

const now = new Date();
const hoursAgo = (h: number) => new Date(now.getTime() - h * 3600000).toISOString();
const minsAgo = (m: number) => new Date(now.getTime() - m * 60000).toISOString();

const tickets: Ticket[] = [
  {
    id: "TK-1001", subject: "Cannot access billing portal after upgrade", status: "new", priority: "urgent",
    tags: ["billing", "access", "enterprise"], customerId: "c1", assigneeId: null,
    createdAt: minsAgo(45), updatedAt: minsAgo(45), slaDeadline: minsAgo(-15), slaStatus: "warning",
    messages: [
      { id: "m1", author: "Alice Nguyen", authorType: "customer", content: "Hi, I just upgraded to Enterprise plan but I can't access the billing portal anymore. It shows a 403 error. This is blocking our finance team from downloading invoices. Please help ASAP!", timestamp: minsAgo(45), isInternal: false },
    ],
  },
  {
    id: "TK-1002", subject: "API rate limits hitting too early", status: "open", priority: "high",
    tags: ["api", "performance", "enterprise"], customerId: "c2", assigneeId: "a1",
    createdAt: hoursAgo(3), updatedAt: hoursAgo(1), slaDeadline: hoursAgo(-2), slaStatus: "ok",
    messages: [
      { id: "m2", author: "Bob Martinez", authorType: "customer", content: "Our integration is hitting rate limits at only 500 requests/min. Our plan should allow 2000/min. Can you check the configuration?", timestamp: hoursAgo(3), isInternal: false },
      { id: "m3", author: "Sarah Agent", authorType: "agent", content: "Hi Bob, I'm looking into this. Can you share your API key (last 4 chars) so I can check the rate limit tier?", timestamp: hoursAgo(2), isInternal: false },
      { id: "m4", author: "Bob Martinez", authorType: "customer", content: "Sure, it ends in ...7x9f. Thanks for the quick response!", timestamp: hoursAgo(1), isInternal: false },
    ],
  },
  {
    id: "TK-1003", subject: "Feature request: dark mode for dashboard", status: "pending", priority: "low",
    tags: ["feature-request", "ui"], customerId: "c3", assigneeId: "a2",
    createdAt: hoursAgo(48), updatedAt: hoursAgo(24), slaDeadline: hoursAgo(-72), slaStatus: "ok",
    messages: [
      { id: "m5", author: "Carol Wei", authorType: "customer", content: "Would love to see a dark mode option for the dashboard. Our team works late hours and the bright interface is straining.", timestamp: hoursAgo(48), isInternal: false },
      { id: "m6", author: "Mike Agent", authorType: "agent", content: "Great suggestion Carol! I've added this to our feature backlog. We're targeting Q2 for UI improvements.", timestamp: hoursAgo(36), isInternal: false },
      { id: "m7", author: "Mike Agent", authorType: "agent", content: "Internal: Linked to JIRA-4521. Product team aware.", timestamp: hoursAgo(36), isInternal: true },
    ],
  },
  {
    id: "TK-1004", subject: "Data export failing for large datasets", status: "open", priority: "high",
    tags: ["data", "export", "bug"], customerId: "c4", assigneeId: "a1",
    createdAt: hoursAgo(6), updatedAt: hoursAgo(4), slaDeadline: minsAgo(-30), slaStatus: "warning",
    messages: [
      { id: "m8", author: "David Okafor", authorType: "customer", content: "When I try to export more than 50k rows, the export times out after 5 minutes. This used to work fine last month.", timestamp: hoursAgo(6), isInternal: false },
      { id: "m9", author: "Sarah Agent", authorType: "agent", content: "Internal: Checked logs — there's a new timeout limit on the export endpoint since v2.4.1 deploy. Escalating to engineering.", timestamp: hoursAgo(4), isInternal: true },
    ],
  },
  {
    id: "TK-1005", subject: "SSO integration not redirecting properly", status: "new", priority: "urgent",
    tags: ["sso", "auth", "enterprise"], customerId: "c6", assigneeId: null,
    createdAt: minsAgo(20), updatedAt: minsAgo(20), slaDeadline: minsAgo(-40), slaStatus: "ok",
    messages: [
      { id: "m10", author: "Frank Dubois", authorType: "customer", content: "Our SAML SSO integration stopped working after your maintenance window. Users get redirected to a blank page. 200+ employees affected.", timestamp: minsAgo(20), isInternal: false },
    ],
  },
  {
    id: "TK-1006", subject: "How to set up webhooks?", status: "solved", priority: "normal",
    tags: ["how-to", "webhooks", "api"], customerId: "c5", assigneeId: "a2",
    createdAt: hoursAgo(24), updatedAt: hoursAgo(20), slaDeadline: hoursAgo(-48), slaStatus: "ok",
    messages: [
      { id: "m11", author: "Emma Thompson", authorType: "customer", content: "I'm trying to set up webhooks to notify our Slack channel. Where do I find the webhook configuration?", timestamp: hoursAgo(24), isInternal: false },
      { id: "m12", author: "Mike Agent", authorType: "agent", content: "Hi Emma! Go to Settings → Integrations → Webhooks. Here's our guide: docs.example.com/webhooks. Let me know if you need help configuring the payload format.", timestamp: hoursAgo(22), isInternal: false },
      { id: "m13", author: "Emma Thompson", authorType: "customer", content: "Found it, thank you! Works perfectly now.", timestamp: hoursAgo(20), isInternal: false },
    ],
  },
  {
    id: "TK-1007", subject: "Billing discrepancy — charged twice", status: "open", priority: "urgent",
    tags: ["billing", "urgent", "finance"], customerId: "c7", assigneeId: "a1",
    createdAt: hoursAgo(2), updatedAt: hoursAgo(1), slaDeadline: minsAgo(-60), slaStatus: "ok",
    messages: [
      { id: "m14", author: "Grace Kim", authorType: "customer", content: "I was charged twice for my January subscription — $299 x2. Please refund the duplicate charge immediately.", timestamp: hoursAgo(2), isInternal: false },
      { id: "m15", author: "Sarah Agent", authorType: "agent", content: "I can see the duplicate charge. Initiating refund now — should appear in 3-5 business days. So sorry about this!", timestamp: hoursAgo(1), isInternal: false },
    ],
  },
  {
    id: "TK-1008", subject: "Account cancellation request", status: "pending", priority: "normal",
    tags: ["cancellation", "retention"], customerId: "c8", assigneeId: "a2",
    createdAt: hoursAgo(12), updatedAt: hoursAgo(8), slaDeadline: hoursAgo(-24), slaStatus: "ok",
    messages: [
      { id: "m16", author: "Hassan Ali", authorType: "customer", content: "We'd like to cancel our account effective end of this billing cycle.", timestamp: hoursAgo(12), isInternal: false },
      { id: "m17", author: "Mike Agent", authorType: "agent", content: "Hi Hassan, sorry to hear that. Before we process — is there anything we can do? We have a discounted annual plan available.", timestamp: hoursAgo(10), isInternal: false },
      { id: "m18", author: "Mike Agent", authorType: "agent", content: "Internal: Flagged for retention team. Account value: $3,588/yr.", timestamp: hoursAgo(10), isInternal: true },
    ],
  },
  {
    id: "TK-1009", subject: "Mobile app crashes on iOS 18", status: "new", priority: "high",
    tags: ["mobile", "bug", "ios"], customerId: "c1", assigneeId: null,
    createdAt: minsAgo(10), updatedAt: minsAgo(10), slaDeadline: hoursAgo(-4), slaStatus: "ok",
    messages: [
      { id: "m19", author: "Alice Nguyen", authorType: "customer", content: "The iOS app crashes every time I open the reports section on iOS 18.3. iPhone 16 Pro. Already tried reinstalling.", timestamp: minsAgo(10), isInternal: false },
    ],
  },
  {
    id: "TK-1010", subject: "Custom report template not saving", status: "open", priority: "normal",
    tags: ["reports", "bug"], customerId: "c4", assigneeId: "a1",
    createdAt: hoursAgo(8), updatedAt: hoursAgo(5), slaDeadline: hoursAgo(-16), slaStatus: "ok",
    messages: [
      { id: "m20", author: "David Okafor", authorType: "customer", content: "I create a custom report template, click save, get the success toast, but when I go back it's gone. Tried Chrome and Firefox.", timestamp: hoursAgo(8), isInternal: false },
      { id: "m21", author: "Sarah Agent", authorType: "agent", content: "Thanks for reporting David. I can reproduce this. It seems like the save endpoint returns 200 but doesn't persist. I'll escalate to our backend team.", timestamp: hoursAgo(5), isInternal: false },
    ],
  },
];

const agents: Agent[] = [
  { id: "a1", name: "Sarah Agent", avatar: "SA", role: "admin", ticketsAssigned: 5, ticketsResolved: 142, avgResponseTime: "12m", satisfaction: 4.8 },
  { id: "a2", name: "Mike Agent", avatar: "MA", role: "agent", ticketsAssigned: 3, ticketsResolved: 98, avgResponseTime: "18m", satisfaction: 4.6 },
];

const macros: Macro[] = [
  {
    id: "mac1", name: "Acknowledge & Investigate", description: "Send acknowledgment and set to open", category: "General",
    actions: { setStatus: "open", replyTemplate: "Thank you for reaching out! I'm looking into this now and will get back to you shortly with an update." },
  },
  {
    id: "mac2", name: "Request More Info", description: "Ask customer for additional details", category: "General",
    actions: { setStatus: "pending", replyTemplate: "To help resolve this quickly, could you provide:\n1. Steps to reproduce the issue\n2. Browser/device info\n3. Any error messages or screenshots\n\nThank you!" },
  },
  {
    id: "mac3", name: "Escalate to Engineering", description: "Tag as bug and escalate", category: "Technical",
    actions: { setStatus: "open", setPriority: "high", addTags: ["escalated", "engineering"], replyTemplate: "I've escalated this to our engineering team for investigation. You'll receive an update within 24 hours." },
  },
  {
    id: "mac4", name: "Close — Resolved", description: "Mark as solved with closing message", category: "Resolution",
    actions: { setStatus: "solved", replyTemplate: "Glad we could help! This ticket has been marked as resolved. If the issue returns, feel free to reopen by replying to this thread.\n\nHave a great day!" },
  },
  {
    id: "mac5", name: "Billing Refund Initiated", description: "Confirm refund and timeline", category: "Billing",
    actions: { setStatus: "pending", addTags: ["refund"], replyTemplate: "A refund has been initiated for the amount in question. Please allow 3-5 business days for it to appear on your statement. We apologize for the inconvenience." },
  },
  {
    id: "mac6", name: "Redirect to Docs", description: "Point to documentation", category: "General",
    actions: { replyTemplate: "Great question! You can find detailed instructions in our documentation:\n→ docs.example.com/guides\n\nIf you still need help after reviewing, let me know!" },
  },
];

const automationLog: AutomationEvent[] = [
  { id: "ev1", type: "ticket_created", ticketId: "TK-1009", description: "New urgent ticket: Mobile app crashes on iOS 18", timestamp: minsAgo(10) },
  { id: "ev2", type: "ticket_created", ticketId: "TK-1005", description: "New urgent ticket: SSO integration not redirecting", timestamp: minsAgo(20) },
  { id: "ev3", type: "ticket_created", ticketId: "TK-1001", description: "New urgent ticket: Cannot access billing portal", timestamp: minsAgo(45) },
  { id: "ev4", type: "reply_sent", ticketId: "TK-1007", description: "Agent Sarah replied to billing discrepancy ticket", timestamp: hoursAgo(1) },
  { id: "ev5", type: "status_changed", ticketId: "TK-1002", description: "TK-1002 status changed: new → open", timestamp: hoursAgo(2) },
  { id: "ev6", type: "ticket_assigned", ticketId: "TK-1004", description: "TK-1004 assigned to Sarah Agent", timestamp: hoursAgo(4) },
  { id: "ev7", type: "macro_applied", ticketId: "TK-1006", description: "Macro 'Redirect to Docs' applied to TK-1006", timestamp: hoursAgo(22) },
  { id: "ev8", type: "status_changed", ticketId: "TK-1006", description: "TK-1006 marked as solved", timestamp: hoursAgo(20) },
  { id: "ev9", type: "sla_breached", ticketId: "TK-1004", description: "⚠️ SLA breach risk: TK-1004 approaching deadline", timestamp: hoursAgo(1) },
  { id: "ev10", type: "escalation", ticketId: "TK-1004", description: "TK-1004 escalated to engineering team", timestamp: hoursAgo(4) },
];

export const initialState: ZenDeskState = {
  tickets,
  customers,
  agents,
  macros,
  automationLog,
  currentAgent: agents[0],
  selectedTicketId: null,
  activeView: "dashboard",
  inboxFilters: { status: "all", priority: "all", tag: "all" },
};
