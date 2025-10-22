import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { User, AssigneeProgress } from "../types";
import { MS_IN_DAY, MS_IN_HOUR, MS_IN_MINUTE } from "../consts";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateAssigneeProgress(users: User[]): AssigneeProgress[] {
  return users.map((user) => {
    const total = Math.floor(Math.random() * 10) + 10; // 10-19
    const completed = Math.floor(Math.random() * total); // 0 to (total-1)
    return {
      userId: user.id,
      completed,
      total,
    };
  });
}

export function formatRelativeTime(date: Date) {
  const diff = Date.now() - date.getTime();
  if (diff >= MS_IN_DAY) {
    const days = Math.floor(diff / MS_IN_DAY);
    return `${days}d ago`;
  }
  if (diff >= MS_IN_HOUR) {
    const hours = Math.floor(diff / MS_IN_HOUR);
    return `${hours}h ago`;
  }
  const minutes = Math.max(1, Math.floor(diff / MS_IN_MINUTE));
  return `${minutes}m ago`;
}

export function createPastDate(daysAgo: number) {
  const now = Date.now();
  return new Date(now - daysAgo * MS_IN_DAY);
}

export function getAssigneeName(
  userId: string | undefined,
  users: User[]
): string {
  if (!userId) return "Unassigned";
  const user = users.find((u) => u.id === userId);
  return user?.name ?? "Unassigned";
}
