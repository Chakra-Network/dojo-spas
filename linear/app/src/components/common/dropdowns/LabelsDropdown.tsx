import type { ReactNode } from "react";
import { MultiSelectDropdown } from "./base/MultiSelectDropdown";
import type { DropdownItem, Label } from "@/lib/types";

interface LabelsDropdownProps {
  labels: Label[];
  selectedLabelIds: string[];
  onChange: (labelIds: string[]) => void;
  trigger: ReactNode;
  triggerClassName?: string;
  align?: "start" | "center" | "end";
  side?: "top" | "bottom" | "left" | "right";
  width?: string;
}

export function LabelsDropdown({
  labels,
  selectedLabelIds,
  onChange,
  trigger,
  triggerClassName,
  align = "start",
  side = "bottom",
  width = "min-w-[240px]",
}: LabelsDropdownProps) {
  const items: DropdownItem[] = labels.map((label) => ({
    type: "option" as const,
    value: label.id,
    label: label.name,
    icon: (
      <div
        className="w-2 h-2 rounded-full shrink-0"
        style={{ backgroundColor: label.color }}
        aria-hidden="true"
      />
    ),
  }));

  return (
    <MultiSelectDropdown
      items={items}
      values={selectedLabelIds}
      onChange={onChange}
      trigger={trigger}
      triggerClassName={triggerClassName}
      searchPlaceholder="Change or add labels..."
      headerShortcut="L"
      align={align}
      side={side}
      width={width}
    />
  );
}
