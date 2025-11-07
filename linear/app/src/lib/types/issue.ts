import type { SystemActivityEntry } from "./task-detail";

export type IssueStatus = "queued" | "in_progress" | "blocked" | "in_review" | "staging" | "done";

export type Priority = "urgent" | "high" | "medium" | "low" | "none";

export interface Label {
  id: string;
  name: string;
  color: string;
}

export interface Comment {
  id: string;
  content: string;
  createdAt: string;
  authorId: string;
}

export interface Issue {
  id: string;
  identifier: string;
  title: string;
  status: IssueStatus;
  assigneeId?: string;
  labels: Label[];
  projectId: string;
  cycleId?: string;
  milestoneId?: string;
  priority: Priority;
  description?: string;
  comments?: Comment[];
  activities?: SystemActivityEntry[];
}
