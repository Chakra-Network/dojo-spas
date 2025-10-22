import { cn } from "@/lib/utils";
import type { JSX } from "react";
import { VscTriangleDown } from "react-icons/vsc";

export function PillButtonLayout({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center border border-gray-600 rounded-full overflow-hidden h-[32.2px] text-[13px]",
        className
      )}
    >
      {children}
    </div>
  );
}

export function PillButtonItem({
  children,
  className,
  isLastItem = false,
}: {
  children: React.ReactNode;
  className?: string;
  isLastItem?: boolean;
}) {
  return (
    <button
      className={cn(
        "px-4 py-2 font-semibold text-[#0176D3] hover:bg-gray-50 border-gray-600 flex items-center justify-center cursor-pointer",
        className,
        !isLastItem && "border-r"
      )}
    >
      {children}
    </button>
  );
}

export function PillButtonIconItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <PillButtonItem
      className={cn("h-8 w-8 p-0 border rounded-full", className)}
    >
      {children}
    </PillButtonItem>
  );
}

export function PillButtonIconWithDropdown({
  Icon,
  className,
}: {
  Icon: JSX.ElementType;
  className?: string;
}) {
  return (
    <PillButtonItem
      className={cn("h-8 px-2 border rounded-full gap-1", className)}
    >
      <Icon className="w-[14px] h-[14px] mt-1" />
      <VscTriangleDown className="w-[8px] h-[8px] mt-1" />
    </PillButtonItem>
  );
}
