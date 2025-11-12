import type { Priority, Project } from "@/lib/types";
import type { ReactNode } from "react";
import {
  UrgentPriority,
  HighPriority,
  MediumPriority,
  LowPriority,
  NoPriority,
} from "@/components/icons/priorities";
import { cn, isValidElementType } from "@/lib/utils";
import { Box } from "lucide-react";

export function PriorityIcon({
  priority,
  isColored = true,
  className,
}: {
  priority: Priority;
  isColored?: boolean;
  className?: string;
}): ReactNode {
  switch (priority) {
    case "none":
      return (
        <NoPriority
          className={cn("w-4 h-4 text-neutral-2 shrink-0", className)}
        />
      );
    case "urgent":
      return (
        <UrgentPriority
          className={cn("w-4 h-4 text-neutral-2 shrink-0", className)}
          isColored={isColored}
        />
      );
    case "high":
      return (
        <HighPriority
          className={cn("w-4 h-4 text-neutral-2 shrink-0", className)}
        />
      );
    case "medium":
      return (
        <MediumPriority
          className={cn("w-4 h-4 text-neutral-2 shrink-0", className)}
        />
      );
    case "low":
      return (
        <LowPriority
          className={cn("w-4 h-4 text-neutral-2 shrink-0", className)}
        />
      );
    default:
      return (
        <NoPriority
          className={cn("w-4 h-4 text-neutral-2 shrink-0", className)}
        />
      );
  }
}

export function ProjectIcon({
  project,
  className,
}: {
  project: Project;
  className?: string;
}) {
  const Icon = isValidElementType(project.Icon) ? project.Icon : Box;
  return <Icon className={cn("w-[14px] h-[14px] shrink-0", className)} />;
}
