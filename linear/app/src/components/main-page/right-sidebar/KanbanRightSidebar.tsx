import { currentCycle } from "@/lib/mocks";
import Avatar from "@/components/common/Avatar";
import { Star, LucideEllipsis, ChevronDown } from "lucide-react";
import {
  MetricRow,
  CircularProgress,
  RightSidebarTab,
} from "./RightSidebarItems";
import { useLinearState } from "@/context/LinearStateContext";
import { AbsolutePositioned } from "@/components/common/AbsolutePositioned";
import Button from "@/components/common/Button";
import { getCycleIcon } from "@/lib/utils/dropdowns";

export default function KanbanRightSidebar() {
  const { users, assigneeProgress } = useLinearState();
  return (
    <div className="w-full shrink-0 bg-background-3 border-l border-border flex flex-col overflow-auto">
      {/* right sidebar header */}
      <div className="p-6 border-b border-border flex flex-col gap-[10.5px]">
        <AbsolutePositioned position="top-[-5px] left-[-5px]">
          <div className="flex items-center gap-2 text-neutral-4">
            <div className="bg-user-row-header rounded text-[13px] leading-[19.5px] px-[6px] py-[2px]">
              Current
            </div>
            <div className="bg-user-row-header rounded text-[13px] leading-[19.5px] px-[6px] py-[2px]">
              {currentCycle.startDate} → {currentCycle.endDate}
            </div>
          </div>
        </AbsolutePositioned>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[10px]">
            {getCycleIcon(currentCycle, { className: "w-4 h-4 shrink-0" })}
            <h1 className="text-[15px] leading-[23px] font-semibold text-neutral-4">
              Cycle 50
            </h1>
          </div>

          <div className="flex items-center gap-[6px] text-neutral-5">
            <Button
              variant="ghost"
              size="custom"
              className="h-6 w-6 flex items-center justify-center rounded-md"
            >
              <Star className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="custom"
              className="h-6 w-6 flex items-center justify-center rounded-md"
            >
              <LucideEllipsis className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-[6px] invisible" />
      </div>

      {/* right sidebar chart */}
      <div className="p-6 flex flex-col border-b border-border">
        <AbsolutePositioned position="top-0 left-[-8px]">
          <button className="flex items-center h-7 w-fit px-2 gap-[3px] text-[13px] leading-[16px] text-neutral-5 hover:bg-hover-4 hover:text-neutral-1 rounded transition-colors cursor-pointer">
            <span>Progress</span>{" "}
            <div className="h-4 w-4 flex items-center justify-center">
              <ChevronDown className="w-3 h-3" />
            </div>
          </button>
        </AbsolutePositioned>

        <div className="pt-4">
          <div className="grid grid-cols-3 gap-1">
            <MetricRow
              label="Scope"
              value={currentCycle.scope}
              percentage="+31%"
              color="#D1D5DB"
            />
            <MetricRow
              label="Started"
              value={currentCycle.started}
              percentage="+28%"
              color="#FB923C"
            />
            <MetricRow
              label="Completed"
              value={currentCycle.completed}
              percentage="+19%"
              color="#60A5FA"
            />
          </div>

          <svg viewBox="0 0 200 100" className="w-full h-[214px]">
            <path
              d="M 0,80 Q 50,60 100,40 T 200,10"
              fill="none"
              stroke="#666"
              strokeWidth="1"
              strokeDasharray="2,2"
            />
            <path
              d="M 0,80 Q 50,70 100,55 T 200,20"
              fill="none"
              stroke="#F59E0B"
              strokeWidth="2"
            />
            <path
              d="M 0,80 Q 50,75 100,65 T 200,35"
              fill="none"
              stroke="#3B82F6"
              strokeWidth="2"
            />
            <path
              d="M 0,80 Q 50,78 100,72 T 200,55"
              fill="none"
              stroke="#8B5CF6"
              strokeWidth="2"
            />
          </svg>
        </div>
      </div>

      <div className="px-3 py-6">
        {/* Tabs */}
        <div className="flex items-center mb-[10px] h-6 border border-border rounded overflow-hidden">
          <RightSidebarTab label="Assignees" isActive={true} />
          <RightSidebarTab label="Labels" isActive={false} />
          <RightSidebarTab label="Priority" isActive={false} />
          <RightSidebarTab label="Projects" isActive={false} />
        </div>

        {/* Assignee List */}
        <div className="flex flex-col">
          {assigneeProgress.map((progress) => {
            const user = users.find((u) => u.id === progress.userId);
            if (!user) return null;
            const percentage = Math.round(
              (progress.completed / progress.total) * 100
            );
            return (
              <div
                key={user.id}
                className="flex items-center justify-between px-[10px] h-[42px]"
              >
                <div className="flex items-center gap-2">
                  <Avatar src={user.avatar} alt={user.name} size="sm" />
                  <span className="text-[13px] leading-[16px] text-neutral-1">
                    {user.name}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <CircularProgress percentage={percentage} />
                  <span className="text-[13px] text-neutral-5 w-16 text-right whitespace-nowrap">
                    {percentage}% of {progress.total}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
