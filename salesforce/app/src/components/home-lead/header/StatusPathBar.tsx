import { useState, useEffect } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppContext } from "@/context/AppProvider";
import type { LeadStatus } from "@/lib/types";

const statuses: LeadStatus[] = [
  "New",
  "Contacted",
  "Nurturing",
  "Unqualified",
  "Converted",
];

export default function StatusPathBar() {
  const { activeTab, getLead, updateTabLeadStatus, openConvertLeadDialog } =
    useAppContext();

  // Get lead data and status from context
  const leadData = activeTab?.dataId ? getLead(activeTab.dataId) : undefined;
  const contextStatus: LeadStatus = leadData?.leadStatus || "New";
  const contextStatusIndex = statuses.indexOf(contextStatus);

  // Local state for selected status
  const [selectedStatus, setSelectedStatus] =
    useState<LeadStatus>(contextStatus);
  const selectedStatusIndex = statuses.indexOf(selectedStatus);

  // Update selected status when context status changes
  useEffect(() => {
    setSelectedStatus(contextStatus);
  }, [contextStatus]);

  const handleStatusClick = (status: LeadStatus) => {
    setSelectedStatus(status);
  };

  const handleMarkAsComplete = () => {
    if (selectedStatus === "Converted" && activeTab?.dataId) {
      // Open convert dialog instead of directly updating
      openConvertLeadDialog(activeTab.dataId);
    } else if (activeTab?.dataId) {
      // Normal status update
      updateTabLeadStatus(activeTab.dataId, selectedStatus);
    }
  };

  return (
    <div className="bg-white p-3 rounded-xl shadow-[0_0_15px_rgba(0,0,0,0.1)]">
      <div className="flex items-center justify-between">
        {/* Status Path */}
        <div className="grid grid-cols-5 items-center gap-0 flex-1">
          {statuses.map((status, index) => {
            const isCompleted = index < contextStatusIndex;
            const isContextStatus = index === contextStatusIndex;
            const isSelected = index === selectedStatusIndex;

            // Determine if this button should show border
            const hasBorder = isContextStatus || isSelected;

            // Determine background color
            let bgColor = "bg-gray-200";
            let textColor = "text-gray-600";

            if (isCompleted && !isSelected) {
              bgColor = "bg-green-600";
              textColor = "text-white";
            } else if (isSelected) {
              bgColor = "bg-[#032D60]";
              textColor = "text-white";
            } else if (isContextStatus) {
              bgColor = "bg-white";
              textColor = "text-gray-600";
            }

            return (
              <div
                key={status}
                className={cn(
                  "flex items-center relative group",
                  index < statuses.length - 1 && "pr-[2px]",
                  index !== 0 && "pl-[2px]"
                )}
              >
                <button
                  onClick={() => handleStatusClick(status)}
                  className={cn(
                    "relative px-8 h-8 flex items-center justify-center text-[13px] leading-[19.5px] transition-colors whitespace-nowrap w-full cursor-pointer border-2 border-transparent",
                    bgColor,
                    textColor,
                    hasBorder && "border-[#032D60]",
                    !isCompleted && !isSelected && "group-hover:bg-gray-300",
                    index === 0 && "rounded-l-full ",
                    index === statuses.length - 1 && "rounded-r-full "
                  )}
                >
                  {isCompleted && !isSelected ? (
                    <Check className="w-3.5 h-3.5" />
                  ) : (
                    status
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* Mark Status as Complete Button */}
        <button
          onClick={handleMarkAsComplete}
          className="ml-6 w-[208px] h-8 bg-[#0176D3] text-white rounded-full text-[13px] font-semibold hover:bg-[#0158A7] flex justify-center items-center gap-2 cursor-pointer"
        >
          <Check className="w-4 h-4" />
          Mark as {selectedStatus}
        </button>
      </div>
    </div>
  );
}
