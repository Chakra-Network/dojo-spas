import type { ReactNode } from "react";
import { SingleSelectDropdown } from "./base/SingleSelectDropdown";
import type { DropdownItem, Cycle } from "@/lib/types";
import { NoCycle } from "@/components/icons";
import { getCycleOption } from "@/lib/utils/dropdowns";

interface CycleDropdownProps {
  cycles: Cycle[];
  value?: string;
  onChange: (cycleId?: string) => void;
  trigger: ReactNode;
  triggerClassName?: string;
  align?: "start" | "center" | "end";
  side?: "top" | "bottom" | "left" | "right";
  width?: string;
}

export function CycleDropdown({
  cycles,
  value,
  onChange,
  trigger,
  triggerClassName,
  align = "start",
  side = "bottom",
  width = "min-w-[302px]",
}: CycleDropdownProps) {
  const items: DropdownItem[] = [];

  // No cycle option
  items.push({
    type: "option" as const,
    value: "no-cycle",
    label: "No cycle",
    icon: <NoCycle className="w-3.5 h-3.5" />,
    searchableText: "No cycle 0",
  });

  // Current cycle
  const currentCycles = cycles.filter((c) => c.status === "current");
  if (currentCycles.length > 0) {
    currentCycles.forEach((cycle) => {
      items.push(getCycleOption(cycle));
    });
  }

  // Upcoming cycles
  const upcomingCycles = cycles.filter((c) => c.status === "upcoming");
  if (upcomingCycles.length > 0) {
    upcomingCycles.forEach((cycle, index) => {
      items.push(getCycleOption(cycle, { isFirstUpcoming: index === 0 }));
    });
  }

  // Separator before previous
  const previousCycles = cycles.filter((c) => c.status === "previous");
  if (previousCycles.length > 0) {
    items.push({ type: "separator" as const });
    previousCycles.forEach((cycle) => {
      items.push(getCycleOption(cycle));
    });
  }

  const handleChange = (val: string | undefined) => {
    if (val === "no-cycle") {
      onChange(undefined);
    } else {
      onChange(val);
    }
  };

  const displayValue = value ? value : "no-cycle";

  return (
    <SingleSelectDropdown
      items={items}
      value={displayValue}
      onChange={handleChange}
      trigger={trigger}
      triggerClassName={triggerClassName}
      searchPlaceholder="Move to cycle..."
      headerShortcut="C"
      align={align}
      side={side}
      width={width}
    />
  );
}
