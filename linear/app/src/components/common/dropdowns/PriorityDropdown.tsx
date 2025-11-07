import type { Priority, DropdownItem } from "@/lib/types";
import type { ReactNode } from "react";
import { PRIORITY_CONFIG } from "@/lib/consts";
import { SingleSelectDropdown } from "./base/SingleSelectDropdown";
import { PriorityIcon } from "@/components/common/DynamicIcons";

interface PriorityDropdownProps {
  value: Priority;
  onChange: (priority: Priority) => void;
  trigger: ReactNode;
  triggerClassName?: string;
  align?: "start" | "center" | "end";
  side?: "top" | "bottom" | "left" | "right";
  searchPlaceholder?: string;
}

export function PriorityDropdown({
  value,
  onChange,
  trigger,
  triggerClassName,
  align = "start",
  side = "bottom",
  searchPlaceholder = "Change priority to...",
}: PriorityDropdownProps) {
  const items: DropdownItem[] = PRIORITY_CONFIG.map((option) => ({
    type: "option" as const,
    value: option.value,
    label: option.label,
    icon: (
      <PriorityIcon
        priority={option.value as Priority}
        isColored={false}
        className="w-[14px] h-[14px]"
      />
    ),
    shortcut: option.shortcut,
  }));

  return (
    <SingleSelectDropdown
      items={items}
      value={value}
      onChange={(val: string | undefined) => onChange(val as Priority)}
      trigger={trigger}
      triggerClassName={triggerClassName}
      searchPlaceholder={searchPlaceholder}
      headerShortcut="P"
      align={align}
      side={side}
      width="min-w-[208px]"
    />
  );
}
