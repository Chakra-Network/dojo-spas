import { Macro } from '../dojo/state';

export const MACROS_DATA: Macro[] = [
  {
    id: 'macro-1',
    name: 'Password Reset Instructions',
    description: 'Send password reset instructions to customer',
    category: 'Authentication',
    createdBy: 'agent-1',
    usageCount: 45,
    actions: [
      {
        type: 'add_comment',
        value: 'Hi there! To reset your password:\n\n1. Go to our login page\n2. Click "Forgot Password"\n3. Enter your email address\n4. Check your email for reset link\n5. Create a new password\n\nIf you don\'t receive the email within 5 minutes, please check your spam folder. Let me know if you need any help!',
      },
      {
        type: 'add_tags',
        value: ['resolved', 'password-reset'],
      },
      {
        type: 'set_status',
        value: 'solved',
      },
    ],
  },
  {
    id: 'macro-2',
    name: 'Escalate to Engineering',
    description: 'Escalate technical issue to engineering team',
    category: 'Escalation',
    createdBy: 'agent-2',
    usageCount: 23,
    actions: [
      {
        type: 'set_priority',
        value: 'high',
      },
      {
        type: 'add_tags',
        value: ['escalated', 'engineering'],
      },
      {
        type: 'add_comment',
        value: 'I\'ve escalated this issue to our engineering team. They\'ll investigate and get back to you within 24 hours. Thanks for your patience!',
      },
      {
        type: 'set_status',
        value: 'pending',
      },
    ],
  },
  {
    id: 'macro-3',
    name: 'Request More Information',
    description: 'Ask customer for additional details',
    category: 'General',
    createdBy: 'agent-1',
    usageCount: 78,
    actions: [
      {
        type: 'add_comment',
        value: 'Thanks for reaching out! To help resolve this quickly, could you please provide:\n\n1. Steps to reproduce the issue\n2. What browser/device you\'re using\n3. Any error messages you see\n4. Screenshots if applicable\n\nThis will help us investigate more effectively!',
      },
      {
        type: 'set_status',
        value: 'pending',
      },
      {
        type: 'add_tags',
        value: ['needs-info'],
      },
    ],
  },
  {
    id: 'macro-4',
    name: 'Forward to Sales',
    description: 'Forward pricing/upgrade inquiries to sales team',
    category: 'Sales',
    createdBy: 'agent-3',
    usageCount: 34,
    actions: [
      {
        type: 'add_comment',
        value: 'Thank you for your interest in our enterprise plans! I\'ve forwarded your inquiry to our sales team. A sales representative will reach out to you within 24 hours to discuss pricing and options tailored to your needs.',
      },
      {
        type: 'add_tags',
        value: ['sales', 'forwarded'],
      },
      {
        type: 'assign_to',
        value: 'agent-3',
      },
      {
        type: 'set_status',
        value: 'pending',
      },
    ],
  },
  {
    id: 'macro-5',
    name: 'Billing Issue - Investigate',
    description: 'Acknowledge billing issue and start investigation',
    category: 'Billing',
    createdBy: 'agent-2',
    usageCount: 56,
    actions: [
      {
        type: 'set_priority',
        value: 'high',
      },
      {
        type: 'add_comment',
        value: 'I understand your concern about the billing discrepancy. I\'m looking into your account history now and will provide an explanation shortly. We take billing accuracy seriously and will resolve this quickly.',
      },
      {
        type: 'add_tags',
        value: ['billing', 'investigating'],
      },
      {
        type: 'set_status',
        value: 'open',
      },
    ],
  },
  {
    id: 'macro-6',
    name: 'Bug Confirmed - Tracking',
    description: 'Confirm bug and add to tracking',
    category: 'Technical',
    createdBy: 'agent-1',
    usageCount: 19,
    actions: [
      {
        type: 'add_comment',
        value: 'Thank you for reporting this issue! I\'ve confirmed this is a bug and added it to our tracking system. Our development team will work on a fix. I\'ll keep you updated on progress.',
      },
      {
        type: 'add_tags',
        value: ['bug-confirmed', 'tracked'],
      },
      {
        type: 'set_status',
        value: 'open',
      },
      {
        type: 'set_priority',
        value: 'high',
      },
    ],
  },
  {
    id: 'macro-7',
    name: 'Feature Request - Noted',
    description: 'Acknowledge feature request',
    category: 'Product',
    createdBy: 'agent-2',
    usageCount: 42,
    actions: [
      {
        type: 'add_comment',
        value: 'Thanks for the great suggestion! I\'ve passed this feature request along to our product team. While I can\'t guarantee if or when it will be implemented, we really value customer feedback in shaping our roadmap.',
      },
      {
        type: 'add_tags',
        value: ['feature-request', 'product-feedback'],
      },
      {
        type: 'set_status',
        value: 'solved',
      },
    ],
  },
  {
    id: 'macro-8',
    name: 'Check System Status',
    description: 'Respond to potential outage inquiry',
    category: 'Technical',
    createdBy: 'agent-3',
    usageCount: 15,
    actions: [
      {
        type: 'add_comment',
        value: 'Thanks for reaching out. I\'ve checked our system status and everything appears to be operational. However, there might be intermittent issues in specific regions. Could you try again and let me know if the problem persists? You can also check our status page at status.zendesk.com for real-time updates.',
      },
      {
        type: 'add_tags',
        value: ['status-check'],
      },
      {
        type: 'set_status',
        value: 'pending',
      },
    ],
  },
];
