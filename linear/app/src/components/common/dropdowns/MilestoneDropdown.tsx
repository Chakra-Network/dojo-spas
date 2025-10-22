import type { ReactNode } from "react";
import { SingleSelectDropdown } from "./base/SingleSelectDropdown";
import type { DropdownItem, Milestone } from "@/lib/types";

interface MilestoneDropdownProps {
  milestones: Milestone[];
  projectId?: string;
  value?: string;
  onChange: (milestoneId?: string) => void;
  trigger: ReactNode;
  triggerClassName?: string;
  align?: "start" | "center" | "end";
  side?: "top" | "bottom" | "left" | "right";
  width?: string;
}

export function MilestoneDropdown({
  milestones,
  projectId,
  value,
  onChange,
  trigger,
  triggerClassName,
  align = "start",
  side = "bottom",
  width = "min-w-[240px]",
}: MilestoneDropdownProps) {
  // Filter milestones by projectId
  const filteredMilestones = projectId
    ? milestones.filter((m) => m.projectId === projectId)
    : milestones;

  const items: DropdownItem[] = [];

  // No milestone option
  items.push({
    type: "option" as const,
    value: "no-milestone",
    label: "No milestone",
    icon: (
      <div className="w-[10px] h-[10px] shrink-0 border border-neutral-5 rotate-45 border-dashed" />
    ),
    searchableText: "No milestone 0",
  });

  // All filtered milestones
  filteredMilestones.forEach((milestone) => {
    items.push({
      type: "option" as const,
      value: milestone.id,
      label: `${milestone.name} ${milestone.targetDate}`,
      icon: (
        <div
          className="w-2 h-2 rounded-full shrink-0"
          style={{ backgroundColor: milestone.color }}
          aria-hidden="true"
        />
      ),
      searchableText: `${milestone.name} ${milestone.targetDate}`,
    });
  });

  const handleChange = (val: string | undefined) => {
    if (val === "no-milestone") {
      onChange(undefined);
    } else {
      onChange(val);
    }
  };

  const displayValue = value ? value : "no-milestone";

  return (
    <SingleSelectDropdown
      items={items}
      value={displayValue}
      onChange={handleChange}
      trigger={trigger}
      triggerClassName={triggerClassName}
      searchPlaceholder="Set milestone..."
      align={align}
      side={side}
      width={width}
      showSearch={false}
    />
  );
}
