import type { IssueStatus, Priority } from "@/lib/types";

export const STATUS_OPTIONS: Array<{
  value: IssueStatus;
  label: string;
  shortcut: string;
}> = [
  {
    value: "queued",
    label: "Queued",
    shortcut: "1",
  },
  {
    value: "in_progress",
    label: "In Progress",
    shortcut: "2",
  },
  {
    value: "blocked",
    label: "Blocked",
    shortcut: "3",
  },
  {
    value: "in_review",
    label: "In Review",
    shortcut: "4",
  },
  {
    value: "staging",
    label: "Staging",
    shortcut: "5",
  },
  {
    value: "done",
    label: "Done",
    shortcut: "6",
  },
];

export const PRIORITY_CONFIG: Array<{
  value: Priority;
  label: string;
  shortcut: string;
}> = [
  {
    value: "none",
    label: "No priority",
    shortcut: "0",
  },
  {
    value: "urgent",
    label: "Urgent",
    shortcut: "1",
  },
  {
    value: "high",
    label: "High",
    shortcut: "2",
  },
  {
    value: "medium",
    label: "Medium",
    shortcut: "3",
  },
  {
    value: "low",
    label: "Low",
    shortcut: "4",
  },
];
