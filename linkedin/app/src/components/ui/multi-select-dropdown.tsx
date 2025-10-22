import { useState, useEffect } from "react";
import { IoCaretDown } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface MultiSelectDropdownProps {
  label: string;
  options: string[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  isActive?: boolean;
  showSelectedItems?: boolean;
}

export default function MultiSelectDropdown({
  label,
  options,
  selectedValues,
  onChange,
  isActive = false,
  showSelectedItems = true,
}: MultiSelectDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [localSelectedValues, setLocalSelectedValues] =
    useState<string[]>(selectedValues);

  // Sync local state with prop changes when dropdown is closed
  useEffect(() => {
    if (!isOpen) {
      setLocalSelectedValues(selectedValues);
    }
  }, [selectedValues, isOpen]);

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleToggle = (option: string) => {
    if (localSelectedValues.includes(option)) {
      setLocalSelectedValues(localSelectedValues.filter((v) => v !== option));
    } else {
      setLocalSelectedValues([...localSelectedValues, option]);
    }
  };

  const handleShowResults = () => {
    onChange(localSelectedValues);
    setIsOpen(false);
  };

  const handleCancel = () => {
    setLocalSelectedValues(selectedValues);
    setSearchTerm("");
    setIsOpen(false);
  };

  const handleReset = () => {
    setLocalSelectedValues([]);
    onChange([]);
    setSearchTerm("");
    setIsOpen(false);
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      // Reset to current selected values when closing without applying
      setLocalSelectedValues(selectedValues);
      setSearchTerm("");
    }
    setIsOpen(open);
  };

  const displayLabel =
    selectedValues.length > 0 ? `${label} (${selectedValues.length})` : label;

  // Detect if local state has changed from applied state
  const hasChanges =
    JSON.stringify([...localSelectedValues].sort()) !==
    JSON.stringify([...selectedValues].sort());

  // Button should show "Reset" when there are applied selections AND no changes made
  const shouldShowReset = selectedValues.length > 0 && !hasChanges;
  const buttonText = shouldShowReset ? "Reset" : "Cancel";
  const buttonHandler = shouldShowReset ? handleReset : handleCancel;

  return (
    <DropdownMenu open={isOpen} onOpenChange={handleOpenChange}>
      <DropdownMenuTrigger asChild>
        <button
          className={`px-4 h-8 rounded-full text-[16px] leading-[16px] font-semibold whitespace-nowrap transition-colors flex-shrink-0 flex items-center gap-1 cursor-pointer ${
            isActive || selectedValues.length > 0
              ? "bg-[#01754F] text-white"
              : "bg-transparent text-gray-600 border border-gray-600 hover:bg-gray-100"
          }`}
        >
          {displayLabel}
          <IoCaretDown className="text-[16px]" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="min-w-[320px] max-h-[400px] overflow-hidden flex flex-col p-0"
        showCloseButton={true}
        onCloseClick={handleCancel}
      >
        {/* Search Input */}
        <div className="px-4 pt-6 pb-2">
          <input
            type="text"
            placeholder="Add a location"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-[calc(100%-20px)] px-3 h-8 border border-gray-300 rounded text-[14px] outline-none focus:border-[#0A66C2]"
            onClick={(e) => e.stopPropagation()}
          />
        </div>

        {/* Selected Items */}
        {showSelectedItems && localSelectedValues.length > 0 && (
          <div className="p-3 border-b border-gray-200 bg-gray-50">
            <div className="text-[12px] text-gray-600 mb-2 font-semibold">
              Selected items
            </div>
            <div className="flex flex-wrap gap-2">
              {localSelectedValues.map((value) => (
                <button
                  key={value}
                  onClick={() => handleToggle(value)}
                  className="flex items-center gap-1 px-2 py-1 bg-white border border-gray-300 rounded-full text-[13px]"
                >
                  {value}
                  <IoClose className="text-[14px]" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Options List */}
        <div className="overflow-y-auto flex-1 max-h-[250px] pl-0.5">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <label
                key={option}
                className="flex items-center gap-3 px-4 py-2 cursor-pointer h-[44px]"
                onClick={(e) => e.stopPropagation()}
              >
                <input
                  type="checkbox"
                  checked={localSelectedValues.includes(option)}
                  onChange={() => handleToggle(option)}
                  className="w-5 h-5 accent-[#01754F] cursor-pointer"
                />
                <span className="text-[14px] text-gray-900">{option}</span>
              </label>
            ))
          ) : (
            <div className="px-4 py-6 text-center text-[14px] text-gray-600">
              No results found
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-3 flex items-center justify-end gap-2 bg-white">
          <button
            onClick={buttonHandler}
            className="text-[16px] h-8 px-2 items-center leading-[16px] font-semibold text-gray-700 hover:bg-gray-100 cursor-pointer transition-colors rounded"
          >
            {buttonText}
          </button>
          <button
            onClick={handleShowResults}
            className="px-4 py-2 bg-[#0A66C2] text-white rounded-full text-[16px] h-8 items-center leading-[16px] font-semibold hover:bg-[#004182] transition-colors cursor-pointer"
          >
            Show results
          </button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
