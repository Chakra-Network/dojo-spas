import type { Contact, ContactActivity, ContactNote } from "../types";
import { createPastDate } from "./utils";

const contactActivities: ContactActivity[] = [
  { id: 'act-1', timestamp: createPastDate(2), type: 'Email', description: "Sent 'Welcome' email.", userId: 'user-1' },
  { id: 'act-2', timestamp: createPastDate(5), type: 'Call', description: "Initial discovery call.", userId: 'user-2' },
];

const contactNotes: ContactNote[] = [
    { id: 'note-1', timestamp: createPastDate(1), content: 'Expressed interest in our Enterprise plan.', authorId: 'user-1' }
];

export const contacts: Contact[] = [
  {
    id: "contact-1",
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "https://i.pravatar.cc/150?img=5",
    lifecycleStage: "Lead",
    ownerId: "user-1",
    company: "Acme Inc.",
    jobTitle: "Marketing Manager",
    createDate: createPastDate(10),
    activityTimeline: contactActivities,
    notes: contactNotes,
  },
  {
    id: "contact-2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    avatar: "https://i.pravatar.cc/150?img=6",
    lifecycleStage: "Customer",
    ownerId: "user-2",
    company: "Innovate LLC",
    jobTitle: "Product Designer",
    createDate: createPastDate(30),
    activityTimeline: [],
    notes: [],
  },
  {
    id: "contact-3",
    name: "Michael Brown",
    email: "michael.b@example.com",
    avatar: "https://i.pravatar.cc/150?img=7",
    lifecycleStage: "Marketing Qualified Lead",
    ownerId: "user-1",
    company: "Solutions Corp",
    jobTitle: "CTO",
    createDate: createPastDate(5),
    activityTimeline: [],
    notes: [],
  },
  {
    id: "contact-4",
    name: "Emily White",
    email: "emily.w@example.com",
    avatar: "https://i.pravatar.cc/150?img=8",
    lifecycleStage: "Subscriber",
    ownerId: null,
    company: "Creative Co.",
    jobTitle: "Graphic Artist",
    createDate: createPastDate(2),
    activityTimeline: [],
    notes: [],
  },
];