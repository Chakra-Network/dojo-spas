import { SearchIcon, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import type { JSX } from "react";
import CardDropdownMenu from "@/components/common/CardDropdownMenu";

interface CardProps {
  title?: string;
  Icon?: JSX.ElementType;
  iconBgColor?: string;
  searchPlaceholder?: string;
  hasNewButton?: boolean;
  hasDropdown?: boolean;
  hasViewTable?: boolean;
  slotIndex?: number;
  children?: React.ReactNode;
  viewReportText?: string;
  onClickViewAll?: () => void;
  timestamp?: string;
  onNewClick?: () => void;
}

export default function Card({
  title,
  Icon,
  iconBgColor = "bg-gray-100",
  searchPlaceholder,
  hasNewButton = false,
  hasDropdown = false,
  hasViewTable = false,
  slotIndex,
  children,
  viewReportText = "View Report",
  onClickViewAll,
  timestamp = "As of Today at 11:18 am",
  onNewClick,
}: CardProps) {
  return (
    <div className="bg-white rounded-[20px] shadow-[0_0_15px_rgba(0,0,0,0.1)] overflow-hidden h-[392px] flex flex-col">
      {/* Header */}
      {(title || searchPlaceholder) && (
        <div
          className={cn(
            " py-3 flex items-center justify-between",
            Icon ? "px-3" : "px-4"
          )}
        >
          <div className="flex items-center gap-3 flex-1">
            {Icon && (
              <div
                className={`w-8 h-8 rounded-full ${iconBgColor} flex items-center justify-center`}
              >
                <Icon className="w-5 h-5 text-white" />
              </div>
            )}
            {searchPlaceholder ? (
              <div className="flex-1 relative pr-6">
                <input
                  type="text"
                  placeholder={searchPlaceholder}
                  value={searchPlaceholder}
                  onChange={() => {}}
                  className="w-full pl-2 pr-8 h-8 border text-[13px] items-center border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0176D3]"
                />
                <SearchIcon className="absolute right-8 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-600" />
              </div>
            ) : (
              <h3 className="text-xl leading-[25px] text-gray-800">{title}</h3>
            )}
          </div>
          <div className="flex items-center gap-1">
            {hasNewButton && (
              <RightButton onClick={onNewClick}>New</RightButton>
            )}
            {hasDropdown && slotIndex !== undefined && (
              <CardDropdownMenu
                slotIndex={slotIndex}
                hasViewTable={hasViewTable}
              />
            )}
          </div>
        </div>
      )}

      {/* Content */}
      <div className="flex-1 overflow-auto px-3 pb-3">{children}</div>

      {/* Footer */}
      {viewReportText && (
        <div className="px-4 pb-3 pt-4 border-t border-[rgba(201,201,201,1)] flex items-center justify-between bg-white">
          <button className="text-[rgba(2,80,217,1)] hover:underline text-[13px] leading-[19.5px] cursor-pointer">
            {viewReportText}
          </button>
          <div className="flex items-center gap-3 text-xs leading-[18px]">
            <span className="text-gray-600">{timestamp}</span>
            <button className="text-blue-700 hover:bg-gray-100 rounded p-1">
              <RefreshCw className="w-4 h-4" strokeWidth={3} />
            </button>
          </div>
        </div>
      )}
      {onClickViewAll && (
        <div className="px-4 pt-3 pb-5 border-t border-[rgba(201,201,201,1)] flex items-center justify-center bg-white">
          <button className="text-[rgba(2,80,217,1)] hover:underline text-[13px] leading-[19.5px] cursor-pointer">
            View All
          </button>
        </div>
      )}
    </div>
  );
}

function RightButton({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-4 h-8 rounded-full border border-gray-600 hover:bg-gray-100 flex items-center justify-center text-[13px] font-semibold text-blue-600 cursor-pointer",
        className
      )}
    >
      {children}
    </button>
  );
}

export function EmptyState({
  Icon,
  text,
}: {
  Icon: React.ComponentType<{ className?: string }>;
  text: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center mt-12">
      <Icon className="w-auto h-[142px] mb-3" />
      <p className="text-[13px] leading-[19.5px] text-gray-600 text-center">
        {text}
      </p>
    </div>
  );
}
