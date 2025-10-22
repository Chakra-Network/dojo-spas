import {
  Search,
  ChevronDown,
  type LucideIcon,
  Ellipsis,
  Box,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  EditBoxLine,
  Inbox,
  MyIssues,
  Initiatives,
  Views,
  PlayCircle,
  TriangleDown,
  TaskIcon,
} from "@/components/icons";
import type { JSX } from "react";
import { FiCopy } from "react-icons/fi";
import type { MouseEvent } from "react";
import { useLinearState } from "@/context/LinearStateContext";

interface LeftSidebarProps {
  onCreateIssue?: () => void;
}

export default function LeftSidebar({ onCreateIssue }: LeftSidebarProps) {
  const handleEditBoxClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onCreateIssue?.();
  };

  const { taskId, setTaskId } = useLinearState();

  return (
    <div className="w-[220px] shrink-0 flex flex-col h-screen overflow-y-auto">
      {/* left sidebar header */}
      <div className="flex items-center justify-between w-full mt-2 px-[14px] h-10 shrink-0">
        <div className="flex gap-[6px] items-center w-fit px-1">
          <div className="w-5 h-5 bg-neutral-800 flex items-center justify-center rounded-md"></div>
          <span className="text-sm font-semibold">chakra</span>
          <ChevronDown className="w-3 h-3 shrink-0" />
        </div>

        <div className="flex gap-2 items-center w-fit">
          <div className="w-7 h-7 text-neutral-3 flex items-center justify-center rounded-md">
            <Search className="w-4 h-4" />
          </div>
          <button
            type="button"
            className="w-7 h-7 text-neutral-1 bg-hover-1 flex items-center justify-center rounded-md hover:bg-neutral-5 transition-colors hover:cursor-pointer"
            onClick={handleEditBoxClick}
            aria-label="Create issue"
          >
            <EditBoxLine className="w-4 h-4" />
          </button>
        </div>
      </div>

      <nav className="flex flex-col px-[14px] mt-1 h-full">
        <div className="flex flex-col">
          <div className="flex flex-col pb-2">
            <NavItem Icon={Inbox} label="Inbox" badge="1" />
            <NavItem Icon={MyIssues} label="My Issues" />
          </div>

          <div className="mt-2 pb-2">
            <button className="flex items-center gap-1 h-6 px-1 text-xs text-neutral-3 hover:text-neutral-2 font-medium w-full">
              <span>Workspace</span>
              <TriangleDown className="w-4 h-4 rotate-90 mt-[1px]" />
            </button>
            <div className="">
              <NavItem Icon={Initiatives} label="Initiatives" />
              <NavItem Icon={Box} label="Projects" />
              <NavItem Icon={Views} label="Views" />
              <NavItem Icon={Ellipsis} label="More" />
            </div>
          </div>
        </div>

        <div className="mt-2 pb-2">
          <button className="flex items-center gap-[1px] h-6 px-1 text-xs text-neutral-3 hover:text-neutral-2 font-medium w-full">
            <span>Your teams</span>
            <TriangleDown className="w-4 h-4 rotate-90 mt-[1px]" />
          </button>

          <div className="mt-1">
            <button className="flex items-center h-7 px-1 text-[13px] leading-[16px] text-neutral-1 hover:text-neutral-2 font-medium w-full">
              <div className="w-[18px] h-[18px] flex items-center justify-center mr-[7px] bg-badge-bg-2 rounded">
                <TaskIcon className="w-[14px] h-[14px]" />
              </div>
              <span>Chakra</span>
              <TriangleDown className="w-4 h-4 rotate-90 text-neutral-3 mt-[1px] ml-[1px]" />
            </button>

            <div className="flex flex-col">
              <NavItem
                Icon={FiCopy}
                iconClassName="rotate-180"
                label="Issues"
                nestedLevel={1}
              />
              <div className="flex flex-col">
                <NavItem Icon={PlayCircle} label="Cycles" nestedLevel={1} />

                <div className="flex flex-col relative">
                  <div className="absolute top-0 left-0 w-full h-full px-[27px] pointer-events-none">
                    <div className="h-full w-px bg-border" />
                  </div>
                  <NavItem
                    label="Current"
                    active={!taskId}
                    nestedLevel={2}
                    onClick={() => setTaskId(undefined)}
                  />
                  <NavItem label="Upcoming" nestedLevel={2} />
                </div>
              </div>
              <NavItem Icon={Box} label="Projects" nestedLevel={1} />
              <NavItem Icon={Views} label="Views" nestedLevel={1} />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

interface NavItemProps {
  Icon?: LucideIcon | JSX.ElementType;
  iconClassName?: string;
  label: string;
  badge?: string;
  active?: boolean;
  nestedLevel?: number;
  onClick?: () => void;
}

function NavItem({
  Icon,
  label,
  badge,
  active,
  nestedLevel,
  iconClassName,
  onClick,
}: NavItemProps) {
  return (
    <button
      className={cn(
        "flex items-center h-7 rounded text-[13px] leading-[16px] font-[450] w-full transition-colors cursor-pointer mb-[1px]",
        active ? "bg-hover-3 " : "hover:bg-hover-3"
      )}
      style={{
        paddingLeft:
          6 + (nestedLevel || 0) * 12 + (nestedLevel ? 1 : 0) + (Icon ? 0 : 12),
      }}
      onClick={onClick}
    >
      {Icon && (
        <Icon
          className={cn("w-4 h-4 shrink-0 mr-2 text-neutral-3", iconClassName)}
        />
      )}
      <span className="flex-1 text-left text-neutral-2">{label}</span>
      {badge && (
        <span className="bg-hover-2 text-neutral-1 text-xs h-5 w-5 flex items-center justify-center rounded-md">
          {badge}
        </span>
      )}
    </button>
  );
}
