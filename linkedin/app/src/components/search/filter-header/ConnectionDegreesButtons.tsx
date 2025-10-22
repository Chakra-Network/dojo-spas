import React from "react";
import { cn } from "@/lib/utils";
import { useApp } from "@/contexts/AppContext";

export type ConnectionButtonType = {
  label: string;
  isToggle: true;
  filterType: string;
};

export default function ConnectionDegreesButtons({
  connectionButtons,
}: {
  connectionButtons: ConnectionButtonType[];
}) {
  const {
    state: { searchFilter },
    toggleSubFilter,
  } = useApp();

  return (
    <div className="flex items-center rounded-full flex-shrink-0 h-8">
      {connectionButtons.map((connFilter, connIndex) => {
        const label = connFilter.label;
        const filterType = connFilter.filterType as keyof typeof searchFilter;
        const currentValues = searchFilter[filterType];
        const isActive = Array.isArray(currentValues)
          ? currentValues.includes(label)
          : currentValues === true;

        return (
          <React.Fragment key={label}>
            <button
              onClick={() => toggleSubFilter(filterType, label)}
              className={cn(
                "px-2 h-8 text-[16px] leading-[16px] border-y border-gray-600 font-semibold whitespace-nowrap transition-colors cursor-pointer flex items-center",
                connIndex === 0 ? "rounded-l-full" : "",
                connIndex === connectionButtons.length - 1
                  ? "rounded-r-full"
                  : "",
                isActive
                  ? "bg-[#01754F] text-white"
                  : "bg-transparent text-gray-600 hover:bg-gray-100",
                connIndex === 0 && "border-l",
                connIndex === connectionButtons.length - 1 && "border-r"
              )}
            >
              {label}
            </button>
            {connIndex < connectionButtons.length - 1 && (
              <div className="w-[1px] h-8 bg-gray-600" />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
