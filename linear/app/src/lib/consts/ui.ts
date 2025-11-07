import {
  Queued,
  InProgress,
  Blocked,
  InReview,
  Staging,
  Done,
} from "@/components/icons";
import type { JSX } from "react";
import type { IssueStatus } from "../types";

export const STATUS_CONFIG: Record<IssueStatus, { Icon: JSX.ElementType }> = {
  queued: { Icon: Queued },
  in_progress: {
    Icon: InProgress,
  },
  blocked: { Icon: Blocked },
  in_review: {
    Icon: InReview,
  },
  staging: { Icon: Staging },
  done: { Icon: Done },
};

export const VALID_STATUSES: IssueStatus[] = Object.keys(
  STATUS_CONFIG
) as IssueStatus[];

export const MS_IN_MINUTE = 60 * 1000;
export const MS_IN_HOUR = 60 * MS_IN_MINUTE;
export const MS_IN_DAY = 24 * MS_IN_HOUR;
