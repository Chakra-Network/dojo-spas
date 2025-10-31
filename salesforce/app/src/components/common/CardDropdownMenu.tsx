import { useState } from "react";
import { VscTriangleDown } from "react-icons/vsc";
import { cn } from "@/lib/utils";
import { useAppContext } from "@/context/AppProvider";

interface CardDropdownMenuProps {
  slotIndex: number;
  hasViewTable?: boolean;
  className?: string;
}

export default function CardDropdownMenu({
  slotIndex,
  hasViewTable = false,
  className,
}: CardDropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { openChangeHomeCardDialog } = useAppContext();

  const handleChangeHomeCard = () => {
    setIsOpen(false);
    openChangeHomeCardDialog(slotIndex);
  };

  const handleViewTable = () => {
    setIsOpen(false);
    // TODO: Implement view table functionality
    console.log("View Table clicked for slot", slotIndex);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "px-4 h-8 rounded-full border border-gray-600 hover:bg-gray-100 flex items-center justify-center text-[13px] font-semibold text-blue-600 cursor-pointer w-8 p-0",
          className
        )}
      >
        <VscTriangleDown className="w-[14px] h-[14px] shrink-0" />
      </button>

      {isOpen && (
        <>
          {/* Backdrop to close dropdown */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown Menu */}
          <div className="absolute right-0 top-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 py-1 min-w-[125.5px] z-20">
            <DropdownItem onClick={handleChangeHomeCard}>
              Change Home Card
            </DropdownItem>
            {hasViewTable && (
              <DropdownItem onClick={handleViewTable}>View Table</DropdownItem>
            )}
          </div>
        </>
      )}
    </div>
  );
}

function DropdownItem({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left px-3 py-2 text-[12px] leading-[18px] text-gray-800 hover:bg-[rgba(214,230,255,1)] cursor-pointer whitespace-nowrap"
    >
      {children}
    </button>
  );
}
