import { Check } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { useState } from "react";
import type { DropdownItem, DropdownOption } from "@/lib/types";

interface SingleSelectDropdownProps {
  items: DropdownItem[];
  value: string | undefined;
  onChange: (value: string | undefined) => void;
  trigger: ReactNode;
  triggerClassName?: string;
  showSearch?: boolean;
  searchPlaceholder?: string;
  headerShortcut?: string;
  align?: "start" | "center" | "end";
  side?: "top" | "bottom" | "left" | "right";
  width?: string;
}

export function SingleSelectDropdown({
  items,
  value,
  onChange,
  trigger,
  triggerClassName,
  showSearch = true,
  searchPlaceholder = "Search...",
  headerShortcut,
  align = "start",
  side = "bottom",
  width = "min-w-[240px]",
}: SingleSelectDropdownProps) {
  const [search, setSearch] = useState("");

  // Filter options based on search
  const filteredItems = items.filter((item: DropdownItem) => {
    if (item.type !== "option") return true;
    if (!search) return true;

    const searchText = item.searchableText || item.label;
    return searchText.toLowerCase().includes(search.toLowerCase());
  });

  // Check if any options were found after filtering
  const hasResults = filteredItems.some(
    (item: DropdownItem) => item.type === "option"
  );

  // If no results found, show default view
  const displayItems = !search || hasResults ? filteredItems : items;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className={triggerClassName}>
        {trigger}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align={align}
        side={side}
        className={cn(
          width,
          "bg-card-bg border-border p-0 flex flex-col overflow-hidden"
        )}
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        {showSearch && (
          <div className="flex items-center pl-[14px] pr-3 border-b border-border justify-between gap-[14px] flex-shrink-0">
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent text-[13px] text-neutral-2 placeholder:text-neutral-5 focus:outline-none pr-6 h-9"
              autoComplete="off"
              onClick={(e) => e.stopPropagation()}
              onKeyDown={(e) => e.stopPropagation()}
            />
            {headerShortcut && (
              <span className="text-[11px] text-neutral-5 h-[18px] w-[18px] flex items-center justify-center border border-border rounded">
                {headerShortcut}
              </span>
            )}
          </div>
        )}

        <div
          className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:hidden [&::-webkit-scrollbar]:w-0"
          style={{ scrollbarWidth: "none" }}
        >
          <div className="h-1 w-full" />

          {displayItems.map((item: DropdownItem, index: number) => {
            if (item.type === "separator") {
              return (
                <DropdownMenuSeparator
                  key={`separator-${index}`}
                  className="my-1"
                />
              );
            }

            if (item.type === "label") {
              return (
                <div
                  key={`label-${index}`}
                  className="px-2 py-1 text-[11px] text-neutral-5 font-medium"
                >
                  {item.text}
                </div>
              );
            }

            // Option item
            const option = item as DropdownOption;
            return (
              <div key={option.value} className="px-1">
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    onChange(option.value);
                    setSearch("");
                  }}
                  className={cn(
                    "flex items-center gap-2 px-2 h-8 text-[13px] text-neutral-2 cursor-pointer rounded hover:bg-hover-4 focus:bg-hover-4 transition-colors group focus:text-neutral-2 focus:[&_svg]:text-neutral-2",
                    value === option.value && "bg-hover-3"
                  )}
                >
                  {option.icon && (
                    <div className="w-3.5 h-3.5 flex items-center justify-center shrink-0">
                      {option.icon}
                    </div>
                  )}
                  <span className="flex-1">
                    {option.label}
                    {option.labelSecondary && (
                      <span className="text-neutral-5">
                        {option.labelSecondary}
                      </span>
                    )}
                  </span>
                  <div className="flex items-center gap-2">
                    {value === option.value && (
                      <Check className="w-3.5 h-3.5 text-neutral-2" />
                    )}
                    {option.shortcut && (
                      <span className="text-[11px] text-neutral-5 w-3">
                        {option.shortcut}
                      </span>
                    )}
                  </div>
                </DropdownMenuItem>
              </div>
            );
          })}

          <div className="h-1 w-full" />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
