import { Email } from '../dojo/state';

export const EMAILS_DATA: Email[] = [
  {
    id: 'email-001',
    campaignId: 'camp-001',
    name: 'Product Launch Announcement',
    subject: 'Introducing our revolutionary new product',
    status: 'sent',
    contentBlocks: [
      { id: 'block-1', type: 'text', content: '<h1>Big News!</h1><p>We are excited to announce our latest innovation.</p>', order: 0 },
      { id: 'block-2', type: 'image', content: 'https://example.com/product.jpg', order: 1 },
      { id: 'block-3', type: 'button', content: 'Learn More|https://example.com/product', order: 2 },
    ],
    segmentation: {
      listIds: ['list-001', 'list-002'],
      filters: ['engaged_subscribers', 'past_purchasers'],
    },
    sentDate: '2025-11-05T09:00:00Z',
    stats: {
      sent: 12500,
      delivered: 12350,
      opened: 4560,
      clicked: 1280,
      bounced: 150,
      unsubscribed: 32,
    },
    revisions: [
      {
        id: 'rev-001',
        timestamp: '2025-11-04T14:00:00Z',
        subject: 'Introducing our revolutionary new product',
        contentBlocks: [
          { id: 'block-1', type: 'text', content: '<h1>Big News!</h1><p>We are excited to announce our latest innovation.</p>', order: 0 },
        ],
        author: 'sarah@company.com',
      },
    ],
    createdAt: '2025-11-01T10:00:00Z',
    updatedAt: '2025-11-04T14:00:00Z',
  },
  {
    id: 'email-002',
    campaignId: 'camp-002',
    name: 'Holiday Greetings',
    subject: 'Happy Holidays from our team!',
    status: 'scheduled',
    contentBlocks: [
      { id: 'block-1', type: 'text', content: '<h2>Season\'s Greetings</h2><p>Thank you for being part of our community.</p>', order: 0 },
      { id: 'block-2', type: 'divider', content: '', order: 1 },
      { id: 'block-3', type: 'text', content: '<p>Special offer: 20% off all products!</p>', order: 2 },
    ],
    segmentation: {
      listIds: ['list-001'],
      filters: ['all_subscribers'],
    },
    scheduledDate: '2025-12-15T10:00:00Z',
    revisions: [],
    createdAt: '2025-11-20T15:00:00Z',
    updatedAt: '2025-11-20T15:00:00Z',
  },
  {
    id: 'email-003',
    name: 'Weekly Newsletter Draft',
    subject: 'This week in industry news',
    status: 'draft',
    contentBlocks: [
      { id: 'block-1', type: 'text', content: '<h1>Weekly Newsletter</h1><p>Top stories this week...</p>', order: 0 },
    ],
    segmentation: {
      listIds: [],
      filters: [],
    },
    revisions: [],
    createdAt: '2025-12-05T09:00:00Z',
    updatedAt: '2025-12-05T09:00:00Z',
  },
];
