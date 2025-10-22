import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";

interface SidebarTriggerButtonProps {
  hasValue: boolean;
  children: ReactNode;
  onClick?: () => void;
}

export function SidebarTriggerButton({
  hasValue,
  children,
  onClick,
}: SidebarTriggerButtonProps) {
  if (hasValue) {
    return (
      <div className="flex items-center group mb-3 pr-2">
        {children}
        <button
          onClick={onClick}
          className="w-[22px] h-[22px] bg-hover-6 hover:bg-hover-5 rounded flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
        >
          <ChevronRight className="w-3 h-3 shrink-0" />
        </button>
      </div>
    );
  }

  return <div className="mb-3">{children}</div>;
}
