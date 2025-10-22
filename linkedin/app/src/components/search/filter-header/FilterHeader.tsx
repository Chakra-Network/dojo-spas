import React from "react";
import { useApp } from "@/contexts/AppContext";
import { defaultFilters } from "@/lib/const";
import { getFiltersForType } from "@/lib/utils";
import ConnectionDegreesButtons from "./ConnectionDegreesButtons";
import {
  MainCategoryButton,
  NormalButtons,
  ToggleButton,
} from "./FilterButtons";
import MultiSelectDropdownButton from "./MultiSelectDropdownButton";

export default function FilterHeader() {
  const {
    state: { searchFilter },
    setMainCategory,
    resetSubFilters,
  } = useApp();

  const filters = getFiltersForType(searchFilter.mainCategory);
  const isDefaultView =
    !searchFilter.mainCategory || searchFilter.mainCategory === "All";

  // Check if any sub-filters are active
  const hasActiveSubFilters =
    searchFilter.connections.length > 0 ||
    searchFilter.locations.length > 0 ||
    searchFilter.companies.length > 0 ||
    searchFilter.industry.length > 0 ||
    searchFilter.companySize.length > 0 ||
    searchFilter.datePosted.length > 0 ||
    searchFilter.underTenApplicants;

  return (
    <div className="bg-white border-b border-gray-200 shadow-[0_2px_8px_rgba(0,0,0,0.5)] sticky top-[53px] z-10 px-6 h-[56px]">
      <div className="max-w-[1128px] mx-auto relative h-full">
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide h-full">
          {isDefaultView
            ? defaultFilters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setMainCategory(filter)}
                  className={`px-4 h-8 rounded-full text-[16px] leading-[16px] font-semibold whitespace-nowrap transition-colors flex-shrink-0 cursor-pointer flex items-center ${
                    searchFilter.mainCategory === filter
                      ? "bg-[#01754F] text-white"
                      : "bg-transparent text-gray-600 border border-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {filter}
                </button>
              ))
            : (() => {
                // Group connection degree buttons together
                const connectionButtons: Array<{
                  label: string;
                  isToggle: true;
                  filterType: string;
                }> = [];

                filters.forEach((filter) => {
                  if (
                    typeof filter === "object" &&
                    "isToggle" in filter &&
                    filter.isToggle &&
                    filter.filterType === "connections"
                  ) {
                    connectionButtons.push(filter);
                  }
                });

                const renderedFilters: React.ReactNode[] = [];
                let connectionGroupRendered = false;

                filters.forEach((filter) => {
                  // Check if this is a connection button
                  if (
                    typeof filter === "object" &&
                    "isToggle" in filter &&
                    filter.isToggle &&
                    filter.filterType === "connections"
                  ) {
                    // Only render the group once, on the first connection button
                    if (
                      !connectionGroupRendered &&
                      connectionButtons.length > 0
                    ) {
                      connectionGroupRendered = true;
                      renderedFilters.push(
                        <ConnectionDegreesButtons
                          connectionButtons={connectionButtons}
                        />
                      );
                    }
                    return; // Skip individual connection buttons
                  }

                  // Handle all other filter types
                  if (typeof filter === "string") {
                    // Simple button (like "All filters")
                    const isAllFilters = filter === "All filters";
                    renderedFilters.push(
                      <NormalButtons
                        filter={filter}
                        isAllFilters={isAllFilters}
                      />
                    );
                    return;
                  }

                  const label = filter.label;

                  // Main category dropdown (e.g., "People", "Jobs", "Companies")
                  if ("isDropdown" in filter && filter.isDropdown) {
                    renderedFilters.push(<MainCategoryButton label={label} />);
                    return;
                  }

                  // Multi-select dropdown (e.g., "Locations", "Industry")
                  if ("isMultiSelect" in filter && filter.isMultiSelect) {
                    renderedFilters.push(
                      <MultiSelectDropdownButton filter={filter} />
                    );
                    return;
                  }

                  // Toggle button (e.g., other toggle buttons not for connections)
                  if ("isToggle" in filter && filter.isToggle) {
                    renderedFilters.push(<ToggleButton filter={filter} />);
                    return;
                  }
                });

                return renderedFilters;
              })()}
          {!isDefaultView && hasActiveSubFilters && (
            <button
              onClick={resetSubFilters}
              className="px-4 h-8 rounded-full text-[16px] leading-[16px] font-semibold whitespace-nowrap transition-colors flex-shrink-0 text-gray-700 hover:bg-gray-100 cursor-pointer ml-2 flex items-center"
            >
              Reset
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
