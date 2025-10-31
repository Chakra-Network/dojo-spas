import type { Campaign } from "../types";
import { createPastDate } from "./utils";

export const campaigns: Campaign[] = [
  {
    id: "camp-1",
    name: "Q4 Product Launch",
    stage: "Active",
    status: "Active",
    scheduledDate: createPastDate(5),
    ownerId: "user-1",
    createDate: createPastDate(20),
    performanceMetrics: { impressions: 15000, clicks: 950, ctr: 6.3, conversions: 120, cost: 500 },
  },
  {
    id: "camp-2",
    name: "Holiday 2024 Promotion",
    stage: "Scheduled",
    status: "Active",
    scheduledDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
    ownerId: "user-2",
    createDate: createPastDate(10),
    performanceMetrics: { impressions: 0, clicks: 0, ctr: 0, conversions: 0, cost: 0 },
  },
  {
    id: "camp-3",
    name: "New User Welcome Series",
    stage: "Draft",
    status: "Paused",
    scheduledDate: null,
    ownerId: "user-1",
    createDate: createPastDate(2),
    performanceMetrics: { impressions: 0, clicks: 0, ctr: 0, conversions: 0, cost: 0 },
  },
  {
    id: "camp-4",
    name: "Q3 Webinar Follow-up",
    stage: "Completed",
    status: "Active",
    scheduledDate: createPastDate(45),
    ownerId: "user-3",
    createDate: createPastDate(60),
    performanceMetrics: { impressions: 8000, clicks: 400, ctr: 5.0, conversions: 50, cost: 250 },
  },
];