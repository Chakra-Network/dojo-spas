import { Settings, List } from "lucide-react";
import { FaChevronDown } from "react-icons/fa6";
import { useState } from "react";
import { VscTriangleDown } from "react-icons/vsc";
import { GrMail } from "react-icons/gr";
import { FaCalendarDays, FaCircleInfo } from "react-icons/fa6";
import { BiSolidContact } from "react-icons/bi";

const FILTER_DROPDOWN = {
  email: <FilterDropdown Icon={GrMail} bgColor="bg-gray-500" />,
  calendar: <FilterDropdown Icon={FaCalendarDays} bgColor="bg-purple-600" />,
  contact: <FilterDropdown Icon={BiSolidContact} bgColor="bg-cyan-500" />,
  list: <FilterDropdown Icon={List} bgColor="bg-green-600" />,
};

interface FilterDropdownProps {
  filterDropdownOrder?: string[];
}

export default function ActivityPanel({
  filterDropdownOrder = ["email", "calendar", "contact", "list"],
}: FilterDropdownProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="bg-white rounded-[20px] p-4 shadow-[0_0_15px_rgba(0,0,0,0.1)] h-fit">
      {/* Filter Dropdown Buttons */}
      <div className="flex items-center mx-1 gap-2 my-[2px]">
        {filterDropdownOrder.map(
          (filter) => FILTER_DROPDOWN[filter as keyof typeof FILTER_DROPDOWN]
        )}
      </div>

      <div className="flex flex-col pt-4 pb-6">
        <div className="flex flex-col">
          <div className="flex items-center gap-3 ml-auto">
            <span className="text-[13px] leading-[19.5px] text-gray-600">
              Filters: Within 2 months • All activities • All types
            </span>
            <button className="w-8 h-8 flex items-center justify-center text-blue-700 hover:text-blue-800 border border-gray-600 rounded-full cursor-pointer">
              <Settings className="w-[14px] h-[14px]" />
            </button>
          </div>

          <div className="flex items-center ml-auto text-[13px] font-semibold">
            <button className="h-8 flex items-center justify-center text-[#0176D3] hover:text-blue-800 px-1 transition-colors">
              Refresh
            </button>
            <span className="w-[13px] text-center font-normal mb-1">•</span>
            <button className="h-8 flex items-center justify-center text-[#0176D3] hover:text-blue-800 px-1 transition-colors">
              Expand All
            </button>
          </div>
        </div>

        {/* Upcoming & Overdue Section */}
        <div className="my-2">
          <button
            className="flex items-center gap-2 w-full px-2 rounded-lg bg-gray-100 h-[34px] border border-gray-100 cursor-pointer"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <FaChevronDown
              className={`w-[14px] h-[14px] text-gray-600 transition-transform ${
                isExpanded ? "" : "-rotate-90"
              }`}
            />
            <h4 className="text-[13px] leading-[19.5px] ">
              Upcoming & Overdue
            </h4>
          </button>

          {isExpanded && (
            <div className="text-center pt-2">
              <p className="text-[13px] leading-[19.5px] text-gray-600 whitespace-pre-line">
                {
                  "No activities to show.\nGet started by sending an email, scheduling a task, and more."
                }
              </p>
            </div>
          )}
        </div>

        {/* Info Banner */}
        <div className="bg-gray-200 rounded-lg border border-gray-200 p-3 flex items-start gap-3">
          <FaCircleInfo className="w-4 h-4 text-gray-600 flex-shrink-0 mt-0.5" />
          <p className="text-[13px] leading-[19.5px] text-gray-700 text-left font-semibold">
            To change what's shown, try changing your filters.
          </p>
        </div>

        <div className="p-4">
          <button className="px-4 h-8 flex items-center justify-center bg-[#0176D3] text-white rounded-full text-[13px] font-semibold hover:bg-[#0158A7] mx-auto cursor-pointer">
            Show All Activities
          </button>
        </div>
      </div>
    </div>
  );
}

function FilterDropdown({
  Icon,
  bgColor,
}: {
  Icon: React.ElementType;
  bgColor: string;
}) {
  return (
    <div className="flex items-center border border-gray-600 rounded-full overflow-hidden hover:bg-gray-50 h-8">
      <button className="px-4 h-full flex items-center justify-center border-r border-gray-600 cursor-pointer">
        <div
          className={`w-6 h-6 flex items-center justify-center rounded-full ${bgColor}`}
        >
          <Icon className="w-4 h-4 text-white" />
        </div>
      </button>
      <button className="w-8 h-full flex items-center justify-center cursor-pointer">
        <VscTriangleDown className="w-[14px] h-[14px] text-blue-700" />
      </button>
    </div>
  );
}
