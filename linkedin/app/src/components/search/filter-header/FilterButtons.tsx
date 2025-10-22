import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IoCaretDown } from "react-icons/io5";
import { dropdownOptions } from "@/lib/const";
import { useApp } from "@/contexts/AppContext";
import { cn } from "@/lib/utils";

export function NormalButtons({
  filter,
  isAllFilters,
}: {
  filter: string;
  isAllFilters: boolean;
}) {
  return (
    <button
      disabled={isAllFilters}
      className={`px-4 h-8 rounded-full text-[16px] leading-[16px] font-semibold whitespace-nowrap transition-colors flex-shrink-0 border border-gray-600 flex items-center ${
        isAllFilters
          ? "text-gray-400 border-gray-300 cursor-not-allowed opacity-50"
          : "text-gray-600 hover:bg-gray-100 cursor-pointer"
      }`}
    >
      {filter}
    </button>
  );
}

export function MainCategoryButton({ label }: { label: string }) {
  const {
    state: { searchFilter },
    setMainCategory,
  } = useApp();

  const isActive = label === searchFilter.mainCategory;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={`px-4 h-8 rounded-full text-[16px] leading-[16px] font-semibold whitespace-nowrap transition-colors flex-shrink-0 flex items-center gap-1 cursor-pointer ${
            isActive
              ? "bg-[#01754F] text-white"
              : "bg-transparent text-gray-600 border border-gray-600 hover:bg-gray-100"
          }`}
        >
          {label}
          <IoCaretDown className="text-[16px]" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="min-w-[168px] p-0">
        {dropdownOptions.map((option) => (
          <DropdownMenuItem
            key={option}
            onClick={() => setMainCategory(option)}
            className={cn(
              "cursor-pointer rounded-none border-l-2 border-transparent h-9 font-semibold",
              option === searchFilter.mainCategory && "border-[#01754F]"
            )}
          >
            <span className="flex-1">{option}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function ToggleButton({
  filter,
}: {
  filter: { label: string; filterType: string };
}) {
  const {
    state: { searchFilter },
    toggleSubFilter,
  } = useApp();

  const filterType = filter.filterType as keyof typeof searchFilter;
  const currentValues = searchFilter[filterType];
  const isActive = Array.isArray(currentValues)
    ? currentValues.includes(filter.label)
    : currentValues === true;

  return (
    <button
      onClick={() => toggleSubFilter(filterType, filter.label)}
      className={`px-4 h-8 rounded-full text-[16px] leading-[16px] font-semibold whitespace-nowrap transition-colors flex-shrink-0 cursor-pointer flex items-center ${
        isActive
          ? "bg-[#01754F] text-white"
          : "bg-transparent text-gray-600 border border-gray-600 hover:bg-gray-100"
      }`}
    >
      {filter.label}
    </button>
  );
}
