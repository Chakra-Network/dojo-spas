import Avatar from "@/components/common/Avatar";
import type { DropdownItem, Priority, User, Cycle } from "@/lib/types";
import type { ReactNode } from "react";
import {
  CurrentCycle,
  UpcomingCycle,
  FutureCycle,
  NoCycle,
  PreviousCycle,
} from "@/components/icons";

export function getPriorityLabel(priority: Priority): string {
  switch (priority) {
    case "none":
      return "No priority";
    case "urgent":
      return "Urgent";
    case "high":
      return "High";
    case "medium":
      return "Medium";
    case "low":
      return "Low";
    default:
      return "No priority";
  }
}

export function getUserOption(user: User, shortcut?: string): DropdownItem {
  return {
    type: "option" as const,
    value: user.id,
    label: user.name,
    icon: (
      <Avatar
        src={user.avatar}
        alt={user.name}
        size="sm"
        className="w-[14px] h-[14px] text-[8px] shrink-0"
      />
    ),
    searchableText: user.name,
    shortcut,
  };
}

export function getCycleIcon(
  cycle: Cycle | undefined,
  options?: { isFirstUpcoming?: boolean; className?: string }
): ReactNode {
  const className = options?.className || "w-4 h-4";

  if (!cycle) {
    return <NoCycle className={className} />;
  }

  const status = cycle.status || "upcoming";
  const isFirstUpcoming = options?.isFirstUpcoming || false;

  switch (status) {
    case "current":
      return <CurrentCycle className={className} />;
    case "upcoming":
      if (isFirstUpcoming) {
        return <UpcomingCycle className={className} />;
      }
      return <FutureCycle className={className} />;
    case "previous":
      return <PreviousCycle className={className} />;
    default:
      return <NoCycle className={className} />;
  }
}

export function getCycleOption(
  cycle: Cycle,
  options?: { isFirstUpcoming?: boolean }
): DropdownItem {
  const status = cycle.status || "upcoming";
  const isFirstUpcoming = options?.isFirstUpcoming || false;
  const icon = getCycleIcon(cycle, {
    isFirstUpcoming,
    className: "w-3.5 h-3.5",
  });

  let statusText = "";
  switch (status) {
    case "current":
      statusText = " · Current";
      break;
    case "upcoming":
      if (isFirstUpcoming) {
        statusText = " · Upcoming";
      }
      break;
    case "previous":
      statusText = " · Previous";
      break;
  }

  return {
    type: "option" as const,
    value: cycle.id,
    label: cycle.name,
    labelSecondary: ` ${cycle.startDate} - ${cycle.endDate}${statusText}`,
    icon,
    searchableText: `${cycle.name} ${cycle.startDate} ${
      cycle.endDate
    }${statusText.replace(" · ", " ")}`,
  };
}
