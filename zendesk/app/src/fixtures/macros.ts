import { Macro } from '../types'

export const mockMacros: Macro[] = [
  {
    id: 'macro-1',
    name: 'Password Reset Instructions',
    description: 'Send password reset steps with security reminder',
    category: 'Account Access',
    template: `Hi {{customer.name}},

I understand you need help resetting your password. Here are the steps:

1. Go to the login page
2. Click "Forgot Password"
3. Enter your email address ({{customer.email}})
4. Check your inbox for the reset link
5. Create a new strong password

For security, the reset link expires in 24 hours. If you don't receive the email within 5 minutes, please check your spam folder.

Let me know if you need any further assistance!

Best regards,
{{agent.name}}`,
    actions: [
      { type: 'set_status', value: 'pending' },
      { type: 'add_tags', value: ['password-reset', 'security'] },
      { type: 'add_reply', value: true },
    ],
    isActive: true,
    createdAt: new Date('2024-09-01'),
    usageCount: 234,
  },
  {
    id: 'macro-2',
    name: 'Billing Inquiry - Payment Failed',
    description: 'Address failed payment and next steps',
    category: 'Billing',
    template: `Hello {{customer.name}},

Thank you for reaching out about your payment issue. I've reviewed your account and can help resolve this.

It appears the payment method on file was declined. This can happen for several reasons:
- Insufficient funds
- Expired card
- Address mismatch
- Bank security hold

Please update your payment method:
1. Log into your account
2. Go to Settings > Billing
3. Add or update your payment method
4. Click "Retry Payment"

Your service will remain active for 7 days while we resolve this. If you need more time or have questions about your invoice, I'm here to help.

Thanks,
{{agent.name}}`,
    actions: [
      { type: 'set_priority', value: 'high' },
      { type: 'add_tags', value: ['billing', 'payment-failed'] },
      { type: 'set_status', value: 'pending' },
    ],
    isActive: true,
    createdAt: new Date('2024-08-15'),
    usageCount: 189,
  },
  {
    id: 'macro-3',
    name: 'Feature Request - Acknowledged',
    description: 'Thank customer for feedback and log feature request',
    category: 'Product Feedback',
    template: `Hi {{customer.name}},

Thank you for taking the time to share this feature request! We really appreciate customers like you who help us improve our product.

I've logged your suggestion in our product roadmap system (Ticket #{{ticket.id}}). Our product team reviews all requests and considers factors like:
- Customer demand
- Technical feasibility
- Alignment with our vision
- Development resources

While I can't promise a timeline, you'll receive updates if this feature is scheduled for development. In the meantime, here are some alternative approaches you might consider: [insert relevant workarounds].

Is there anything else I can help you with today?

Best,
{{agent.name}}`,
    actions: [
      { type: 'set_status', value: 'solved' },
      { type: 'add_tags', value: ['feature-request', 'product-feedback'] },
      { type: 'set_priority', value: 'low' },
    ],
    isActive: true,
    createdAt: new Date('2024-07-20'),
    usageCount: 145,
  },
  {
    id: 'macro-4',
    name: 'Escalate to Engineering',
    description: 'Escalate technical issue to engineering team',
    category: 'Technical',
    template: `Hi {{customer.name}},

Thank you for reporting this issue. Based on the details you've provided, this appears to be a technical issue that requires investigation by our engineering team.

I've escalated this to our Level 2 support team with priority status. Here's what happens next:

- Engineering will investigate within 4 business hours
- You'll receive updates every 24 hours
- Expected resolution: 2-3 business days

Your ticket reference: #{{ticket.id}}

In the meantime, if you discover any additional details or workarounds, please update this ticket.

We appreciate your patience,
{{agent.name}}`,
    actions: [
      { type: 'set_priority', value: 'urgent' },
      { type: 'set_status', value: 'open' },
      { type: 'add_tags', value: ['escalated', 'engineering', 'technical'] },
      { type: 'add_note', value: 'Escalated to engineering - requires L2 investigation' },
    ],
    isActive: true,
    createdAt: new Date('2024-09-10'),
    usageCount: 87,
  },
  {
    id: 'macro-5',
    name: 'Close - Issue Resolved',
    description: 'Confirm resolution and close ticket',
    category: 'Resolution',
    template: `Hi {{customer.name}},

I'm glad we were able to resolve your issue! I'm marking this ticket as solved.

If you experience any further problems or have additional questions, feel free to reply to this ticket within 7 days and we'll reopen it. After that, please submit a new request.

We'd love to hear about your support experience - you'll receive a brief survey shortly.

Thank you for choosing our service!

Best regards,
{{agent.name}}`,
    actions: [
      { type: 'set_status', value: 'solved' },
      { type: 'add_tags', value: ['resolved'] },
    ],
    isActive: true,
    createdAt: new Date('2024-08-01'),
    usageCount: 456,
  },
  {
    id: 'macro-6',
    name: 'Request More Information',
    description: 'Ask customer for additional details',
    category: 'Information Gathering',
    template: `Hi {{customer.name}},

Thank you for contacting us. To help resolve your issue as quickly as possible, I need a bit more information:

1. What steps did you take before encountering this issue?
2. What error message (if any) did you see?
3. What browser and device are you using?
4. When did this first start happening?

Screenshots or screen recordings are extremely helpful if you can provide them.

I'll be standing by for your response and will prioritize getting this resolved for you.

Thanks,
{{agent.name}}`,
    actions: [
      { type: 'set_status', value: 'pending' },
      { type: 'add_tags', value: ['awaiting-customer'] },
    ],
    isActive: true,
    createdAt: new Date('2024-09-05'),
    usageCount: 312,
  },
]

export const macroCategories = [
  { id: 'cat-1', name: 'Account Access', icon: 'FiLock', macroCount: 8 },
  { id: 'cat-2', name: 'Billing', icon: 'FiCreditCard', macroCount: 12 },
  { id: 'cat-3', name: 'Technical', icon: 'FiTool', macroCount: 15 },
  { id: 'cat-4', name: 'Product Feedback', icon: 'FiMessageSquare', macroCount: 6 },
  { id: 'cat-5', name: 'Resolution', icon: 'FiCheckCircle', macroCount: 4 },
  { id: 'cat-6', name: 'Information Gathering', icon: 'FiInfo', macroCount: 5 },
]
