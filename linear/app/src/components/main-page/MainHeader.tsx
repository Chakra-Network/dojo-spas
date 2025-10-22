import {
  ChevronDown,
  Star,
  LucideEllipsis,
  Bell,
  Sidebar,
  Settings2,
  ListFilter,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Button from "@/components/common/Button";
import { AbsolutePositioned } from "@/components/common/AbsolutePositioned";
import { CurrentCycle } from "@/components/icons";

interface MainHeaderProps {
  onToggleRightSidebar?: () => void;
  isRightSidebarOpen?: boolean;
}

export default function MainHeader({
  onToggleRightSidebar,
  isRightSidebarOpen = false,
}: MainHeaderProps) {
  return (
    <header className="flex flex-col">
      <div className="flex items-center justify-between border-b border-border pl-7 pr-6 h-[39px]">
        <div className="flex items-center gap-[6px]">
          <div className="flex items-center p-[5px]">
            <CurrentCycle className="w-4 h-4 shrink-0 mr-[6px]" />
            <h1 className="text-[13px] leading-[16px] font-medium text-neutral-1">
              Cycle 50 (current)
            </h1>
            <ChevronDown className="w-3 h-3 shrink-0 ml-[4px] text-neutral-5" />
          </div>

          <Button variant="ghost" size="icon">
            <Star className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <LucideEllipsis className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Bell className="w-4 h-4" />
          </Button>
          <div className="w-px h-6 bg-border mx-[6px]" />

          {/* toggle right sidebar */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleRightSidebar}
            className={cn(isRightSidebarOpen && "text-neutral-1! bg-hover-4")}
          >
            <Sidebar className="w-4 h-4 rotate-180" />
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between border-b border-border pl-8 pr-6 h-[39px]">
        <AbsolutePositioned position="top-0 left-[-8px]">
          <Button
            variant="ghost"
            size="custom"
            className="flex items-center gap-2 px-2 h-6 text-xs rounded group"
          >
            <ListFilter className="w-4 h-4" />
            <span className="text-neutral-4 group-hover:text-neutral-1">
              Filter
            </span>
          </Button>
        </AbsolutePositioned>
        <button className="flex items-center gap-2 px-2 h-6 text-xs border border-border bg-hover-1 hover:bg-hover-5 rounded transition-colors cursor-pointer">
          <Settings2 className="w-4 h-4 text-neutral-5" />
          <span className="text-neutral-4">Display</span>
        </button>
      </div>
    </header>
  );
}
