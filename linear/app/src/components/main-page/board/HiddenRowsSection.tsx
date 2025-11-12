import { useState, useEffect } from "react";
import type { Issue, User } from "@/lib/types";
import Avatar from "@/components/common/Avatar";
import { Ellipsis } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLinearState } from "@/context/LinearStateContext";
import { cn } from "@/lib/utils";
import { TriangleDown } from "@/components/icons";

interface HiddenRowsSectionProps {
  hiddenUsers: Array<{ user: User | null; userId: string }>;
  issues: Issue[];
}

export default function HiddenRowsSection({
  hiddenUsers,
  issues,
}: HiddenRowsSectionProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [containerWidth, setContainerWidth] = useState(0);
  const { toggleUserRowVisibility, overallContainerRef, hiddenColumnStatuses } =
    useLinearState();

  useEffect(() => {
    const container = overallContainerRef.current;
    if (!container) return;

    // Set initial width
    setContainerWidth(
      hiddenColumnStatuses.length > 0
        ? container.clientWidth
        : container.clientWidth
    );

    // Create ResizeObserver to watch for width changes
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerWidth(
          hiddenColumnStatuses.length > 0
            ? entry.contentRect.width
            : entry.contentRect.width
        );
      }
    });

    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
    };
  }, [overallContainerRef, hiddenColumnStatuses]);

  if (hiddenUsers.length === 0) return null;

  const getIssueCount = (userId: string) => {
    return issues.filter((issue) =>
      userId === "unassigned" ? !issue.assigneeId : issue.assigneeId === userId
    ).length;
  };

  return (
    <div
      className="mt-2 flex flex-col sticky left-0 z-10  pt-[10px] pb-5 w-full"
      style={{
        maxWidth: containerWidth > 0 ? `${containerWidth}px` : undefined,
      }}
    >
      {/* Section header */}
      <div className="sticky left-2 w-fit">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center text-[13px] text-neutral-3"
        >
          <div className="w-6 h-6 flex items-center justify-center">
            <TriangleDown
              className={cn(
                "w-[18px] h-[18px] mt-[1px] transition-all text-neutral-3 hover:text-neutral-1",
                isExpanded ? "rotate-90" : "rotate-0"
              )}
            />
          </div>
          <span className="font-medium ml-1">Hidden rows</span>
          <span className="ml-[10px]">{hiddenUsers.length}</span>
        </button>
      </div>

      {/* Hidden user rows */}
      {isExpanded && (
        <div className="flex flex-col pl-[30px] pr-[40px] pt-1 gap-[10px]">
          {hiddenUsers.map(({ user, userId }) => {
            const issueCount = getIssueCount(userId);
            return (
              <div
                key={userId}
                className="flex items-center justify-between h-[40px] bg-card-bg rounded p-1 pl-3"
              >
                <div className="flex items-center gap-3 sticky left-2">
                  {user ? (
                    <>
                      <Avatar src={user.avatar} alt={user.name} size="sm" />
                      <span className="text-[13px] leading-[15.5px] text-neutral-1 font-medium whitespace-nowrap">
                        {user.name}
                      </span>
                    </>
                  ) : (
                    <span className="text-[13px] leading-[15.5px] text-neutral-1 font-medium whitespace-nowrap">
                      Unassigned
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-[13px] text-neutral-3">
                    {issueCount}
                  </span>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="text-xs text-gray-400 font-medium whitespace-nowrap w-8 h-8 hover:bg-neutral-800 rounded-md flex items-center justify-center">
                        <Ellipsis className="w-4 h-4" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="w-[174px] min-w-[174px]"
                      onCloseAutoFocus={(e) => e.preventDefault()}
                    >
                      <DropdownMenuItem
                        onClick={() => toggleUserRowVisibility(userId)}
                      >
                        Show
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
