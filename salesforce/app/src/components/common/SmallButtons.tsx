import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import type { JSX } from "react";
import { VscTriangleDown } from "react-icons/vsc";

const commonFormButtonVariants = cva(
  "px-4 h-8 text-[13px] flex items-center justify-center  cursor-pointer font-semibold border border-gray-600 rounded-full",
  {
    variants: {
      variant: {
        secondary: "text-blue-600 hover:text-blue-800",
        primary:
          "text-white bg-blue-500 hover:bg-blue-600 border-blue-500 hover:border-blue-600",
      },
    },
  }
);

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
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  isLastItem?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      className={cn(
        "px-4 py-2 font-semibold text-[#0176D3] hover:bg-gray-50 border-gray-600 flex items-center justify-center cursor-pointer",
        className,
        !isLastItem && "border-r"
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export function PillButtonIconItem({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <PillButtonItem
      className={cn("h-8 w-8 p-0 border rounded-full", className)}
      onClick={onClick}
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

export function PillButtonStandalone({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <PillButtonItem
      className={cn(
        "h-8 px-4 border rounded-full gap-1 text-[13px]",
        className
      )}
    >
      {children}
    </PillButtonItem>
  );
}

export function CommonFormButton({
  children,
  className,
  onClick,
  variant = "primary",
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: "secondary" | "primary";
}) {
  return (
    <button
      className={cn(commonFormButtonVariants({ variant }), className)}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
