import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatusPathBarProps<T extends string> {
  statuses: T[];
  currentStatus: T;
  selectedStatus: T;
  onStatusSelect: (status: T) => void;
  onMarkComplete: () => void;
  markCompleteText?: string;
  currentStatusDisplayText?: string;
}

export default function StatusPathBar<T extends string>({
  statuses,
  currentStatus,
  selectedStatus,
  onStatusSelect,
  onMarkComplete,
  markCompleteText,
  currentStatusDisplayText,
}: StatusPathBarProps<T>) {
  const contextStatusIndex = statuses.indexOf(currentStatus);
  const selectedStatusIndex = statuses.indexOf(selectedStatus);

  const handleStatusClick = (status: T) => {
    onStatusSelect(status);
  };

  const handleMarkAsComplete = () => {
    onMarkComplete();
  };

  return (
    <div className="flex items-center justify-between w-full">
      {/* Status Path */}
      <div className="grid grid-cols-5 items-center gap-0 flex-1">
        {statuses.map((status, index) => {
          const isCompleted = index < contextStatusIndex;
          const isContextStatus = index === contextStatusIndex;
          const isSelected = index === selectedStatusIndex;

          // Check if this is the last status and it's the current status (completed journey)
          const isLastStatusCompleted =
            isContextStatus && index === statuses.length - 1;

          // Determine if this button should show border
          // Don't show border for last completed status even when selected
          const hasBorder = isLastStatusCompleted
            ? false
            : isContextStatus || isSelected;

          // Determine background color
          let bgColor = "bg-gray-200";
          let textColor = "text-gray-600";

          // Keep green for last completed status even when selected
          if ((isCompleted && !isSelected) || isLastStatusCompleted) {
            bgColor = "bg-[#adf3e4]";
            textColor = "text-[#2f8882]";
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
                  !isCompleted &&
                    !isSelected &&
                    !isLastStatusCompleted &&
                    "group-hover:bg-gray-300",
                  index === 0 && "rounded-l-full ",
                  index === statuses.length - 1 && "rounded-r-full "
                )}
              >
                {(isCompleted || isLastStatusCompleted) && !isSelected ? (
                  // Show custom text for last status if provided, otherwise show checkmark
                  isLastStatusCompleted && currentStatusDisplayText ? (
                    currentStatusDisplayText
                  ) : (
                    <Check className="w-3.5 h-3.5" />
                  )
                ) : isContextStatus && currentStatusDisplayText ? (
                  currentStatusDisplayText
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
        {markCompleteText || `Mark as ${selectedStatus}`}
      </button>
    </div>
  );
}

export function StatusPathBarContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "bg-white p-3 rounded-xl shadow-[0_0_15px_rgba(0,0,0,0.1)] flex items-center",
        className
      )}
    >
      {children}
    </div>
  );
}
