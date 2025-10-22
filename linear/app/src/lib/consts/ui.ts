import { Queued, InProgress, Blocked, InReview } from "@/components/icons";
import type { JSX } from "react";
import type { IssueStatus } from "../types";

export const COLUMNS: { status: IssueStatus; title: string }[] = [
  { status: "queued", title: "Queued" },
  { status: "in_progress", title: "In Progress" },
  { status: "blocked", title: "Blocked" },
  { status: "in_review", title: "In Review" },
];

export const VALID_STATUSES: IssueStatus[] = [
  "queued",
  "in_progress",
  "blocked",
  "in_review",
];

export const STATUS_CONFIG: Record<IssueStatus, { Icon: JSX.ElementType }> = {
  queued: { Icon: Queued },
  in_progress: {
    Icon: InProgress,
  },
  blocked: { Icon: Blocked },
  in_review: {
    Icon: InReview,
  },
};

export const MS_IN_MINUTE = 60 * 1000;
export const MS_IN_HOUR = 60 * MS_IN_MINUTE;
export const MS_IN_DAY = 24 * MS_IN_HOUR;
