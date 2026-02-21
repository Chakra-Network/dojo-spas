import { AutomationLogEntry } from '../dojo/state';

export const AUTOMATION_LOG_DATA: AutomationLogEntry[] = [
  {
    id: 'log-001',
    timestamp: '2025-11-05T09:00:00Z',
    action: 'email_send',
    description: 'Sent "Product Launch Announcement" to 12,500 contacts',
    entityType: 'email',
    entityId: 'email-001',
    metadata: {
      recipients: 12500,
      campaignId: 'camp-001',
    },
  },
  {
    id: 'log-002',
    timestamp: '2025-11-01T08:00:00Z',
    action: 'campaign_launch',
    description: 'Launched campaign "Q4 Product Launch"',
    entityType: 'campaign',
    entityId: 'camp-001',
    metadata: {
      budget: 15000,
      type: 'email',
    },
  },
  {
    id: 'log-003',
    timestamp: '2025-11-05T10:35:00Z',
    action: 'lead_conversion',
    description: 'Contact john.smith@acmecorp.com converted to customer',
    entityType: 'contact',
    entityId: 'contact-001',
    metadata: {
      previousStage: 'opportunity',
      newStage: 'customer',
    },
  },
  {
    id: 'log-004',
    timestamp: '2025-11-15T12:00:00Z',
    action: 'workflow_trigger',
    description: 'Nurture workflow triggered for 450 MQLs',
    entityType: 'workflow',
    entityId: 'workflow-001',
    metadata: {
      workflowName: 'MQL Nurture Sequence',
      contacts: 450,
    },
  },
  {
    id: 'log-005',
    timestamp: '2025-11-22T06:00:00Z',
    action: 'campaign_launch',
    description: 'Launched campaign "Black Friday Sale"',
    entityType: 'campaign',
    entityId: 'camp-003',
    metadata: {
      budget: 10000,
      type: 'email',
    },
  },
  {
    id: 'log-006',
    timestamp: '2025-11-28T10:45:00Z',
    action: 'lead_conversion',
    description: 'New lead created: robert.chen@globalventures.com',
    entityType: 'contact',
    entityId: 'contact-003',
    metadata: {
      source: 'Content Marketing',
    },
  },
  {
    id: 'log-007',
    timestamp: '2025-12-01T14:00:00Z',
    action: 'list_update',
    description: 'Added 120 new subscribers to newsletter list',
    entityType: 'workflow',
    entityId: 'list-001',
    metadata: {
      listName: 'Newsletter Subscribers',
      added: 120,
    },
  },
];
