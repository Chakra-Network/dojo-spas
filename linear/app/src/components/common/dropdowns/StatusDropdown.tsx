import type { IssueStatus } from "@/lib/types";
import type { ReactNode } from "react";
import { STATUS_CONFIG, STATUS_OPTIONS } from "@/lib/consts";
import { SingleSelectDropdown } from "./base/SingleSelectDropdown";
import type { DropdownItem } from "@/lib/types";

interface StatusDropdownProps {
  value: IssueStatus;
  onChange: (status: IssueStatus) => void;
  trigger: ReactNode;
  triggerClassName?: string;
  align?: "start" | "center" | "end";
  side?: "top" | "bottom" | "left" | "right";
}

export function StatusDropdown({
  value,
  onChange,
  trigger,
  triggerClassName,
  align = "start",
  side = "bottom",
}: StatusDropdownProps) {
  const items: DropdownItem[] = STATUS_OPTIONS.map((option) => {
    const StatusIcon = STATUS_CONFIG[option.value].Icon;
    return {
      type: "option" as const,
      value: option.value,
      label: option.label,
      icon: <StatusIcon className="w-[14px] h-[14px]" />,
      shortcut: option.shortcut,
    };
  });

  return (
    <SingleSelectDropdown
      items={items}
      value={value}
      onChange={(val: string | undefined) => onChange(val as IssueStatus)}
      trigger={trigger}
      triggerClassName={triggerClassName}
      searchPlaceholder="Change status..."
      headerShortcut="S"
      align={align}
      side={side}
      width="min-w-[208px]"
    />
  );
}
