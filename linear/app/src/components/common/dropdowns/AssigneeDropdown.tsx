import type { User } from "@/lib/types";
import type { ReactNode } from "react";
import { useMemo } from "react";
import { SingleSelectDropdown } from "./base/SingleSelectDropdown";
import type { DropdownItem } from "@/lib/types";
import { PiUserCircleDashed } from "react-icons/pi";
import { getUserOption } from "@/lib/utils/dropdowns";

interface AssigneeDropdownProps {
  value?: string;
  onChange: (userId?: string) => void;
  users: User[];
  currentUser?: User;
  trigger: ReactNode;
  triggerClassName?: string;
  align?: "start" | "center" | "end";
  side?: "top" | "bottom" | "left" | "right";
  showSuggestions?: boolean;
}

export function AssigneeDropdown({
  value,
  onChange,
  users,
  trigger,
  triggerClassName,
  align = "start",
  side = "bottom",
  showSuggestions = false,
  currentUser,
}: AssigneeDropdownProps) {
  const items: DropdownItem[] = useMemo(() => {
    const result: DropdownItem[] = [
      {
        type: "option" as const,
        value: "no-assignee",
        label: "No assignee",
        icon: <PiUserCircleDashed className="w-4 h-4 text-neutral-5" />,
        shortcut: "0",
      },
    ];

    if (currentUser) {
      result.push(getUserOption(currentUser));
    }

    if (users.length > 0) {
      const shouldBeFiltered = [currentUser?.id].filter(Boolean);
      let suggestedUser: User | null = null;

      if (showSuggestions) {
        // Pick a random user from the available users (excluding current user)
        const availableUsers = users.filter(
          (user) => user.id !== currentUser?.id
        );
        if (availableUsers.length > 0) {
          const randomIndex = Math.floor(Math.random() * availableUsers.length);
          suggestedUser = availableUsers[randomIndex];
          shouldBeFiltered.push(suggestedUser.id);

          result.push({ type: "label" as const, text: "Suggested" });
          result.push(getUserOption(suggestedUser, `${randomIndex + 1}`));
        }
      }

      result.push({ type: "label" as const, text: "Team members" });

      users.forEach((user, index) => {
        if (shouldBeFiltered.includes(user.id)) return;
        result.push(
          getUserOption(user, index < 9 ? `${index + 1}` : undefined)
        );
      });
    }

    return result;
  }, [users, currentUser, showSuggestions]);

  const handleChange = (val: string | undefined) => {
    if (val === "no-assignee") {
      onChange(undefined);
    } else {
      onChange(val);
    }
  };

  return (
    <SingleSelectDropdown
      items={items}
      value={value || "no-assignee"}
      onChange={handleChange}
      trigger={trigger}
      triggerClassName={triggerClassName}
      searchPlaceholder="Assign to..."
      headerShortcut="A"
      align={align}
      side={side}
      width="min-w-[208px]"
    />
  );
}
