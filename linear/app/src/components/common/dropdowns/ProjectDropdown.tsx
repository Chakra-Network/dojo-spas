import type { ReactNode } from "react";
import { SingleSelectDropdown } from "./base/SingleSelectDropdown";
import type { DropdownItem, Project } from "@/lib/types";
import { Box, Plus } from "lucide-react";
import { PiCircleDashedBold } from "react-icons/pi";

interface ProjectDropdownProps {
  projects: Project[];
  value?: string;
  onChange: (projectId?: string) => void;
  trigger: ReactNode;
  triggerClassName?: string;
  align?: "start" | "center" | "end";
  side?: "top" | "bottom" | "left" | "right";
  width?: string;
}

export function ProjectDropdown({
  projects,
  value,
  onChange,
  trigger,
  triggerClassName,
  align = "start",
  side = "bottom",
  width = "min-w-[229px]",
}: ProjectDropdownProps) {
  const items: DropdownItem[] = [];

  // No project option
  items.push({
    type: "option" as const,
    value: "no-project",
    label: "No project",
    icon: <PiCircleDashedBold className="w-3.5 h-3.5 text-neutral-5" />,
    searchableText: "No project 0",
  });

  // All projects
  projects.forEach((project) => {
    const IconComponent = project.Icon || Box;
    items.push({
      type: "option" as const,
      value: project.id,
      label: project.name,
      icon: <IconComponent className="w-3.5 h-3.5" />,
      searchableText: project.name,
    });
  });

  // Separator before new project
  items.push({ type: "label" as const, text: "New project" });
  items.push({
    type: "option" as const,
    value: "create-new",
    label: "Create new project...",
    icon: <Plus className="w-3.5 h-3.5 text-neutral-5" />,
    searchableText: "Create new project",
  });

  const handleChange = (val: string | undefined) => {
    if (val === "no-project") {
      onChange(undefined);
    } else if (val === "create-new") {
      // TODO: Implement create new project modal
      return;
    } else {
      onChange(val);
    }
  };

  const displayValue = value ? value : "no-project";

  return (
    <SingleSelectDropdown
      items={items}
      value={displayValue}
      onChange={handleChange}
      trigger={trigger}
      triggerClassName={triggerClassName}
      searchPlaceholder="Move to project..."
      headerShortcut="P"
      align={align}
      side={side}
      width={width}
    />
  );
}
