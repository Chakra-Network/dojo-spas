import type { EmailTemplate } from "../types";

export const emailTemplates: EmailTemplate[] = [
  {
    id: "email-1",
    name: "Welcome Email",
    subject: "Welcome to Our Community!",
    content: "Hi {{contact.name}},\n\nThanks for signing up! We're thrilled to have you.",
    targetSegment: "New Leads",
  },
  {
    id: "email-2",
    name: "Monthly Newsletter",
    subject: "What's New This Month?",
    content: "Here are the latest updates and articles for you.",
    targetSegment: "All Contacts",
  },
  {
    id: "email-3",
    name: "Product Update",
    subject: "New Feature Alert: You're going to love this!",
    content: "We've just launched a new feature that we think you'll find very useful.",
    targetSegment: "Active Customers",
  },
];