import { useState, useEffect } from "react";
import type { Issue, IssueStatus } from "@/lib/types";
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
import { STATUS_CONFIG } from "@/lib/consts";

interface HiddenColumnsSectionProps {
  hiddenColumnStatuses: IssueStatus[];
  issues: Issue[];
}

export default function HiddenColumnsSection({
  hiddenColumnStatuses,
  issues,
}: HiddenColumnsSectionProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [containerHeight, setContainerHeight] = useState<number>(0);
  const { columns, toggleColumnVisibility, overallContainerRef } =
    useLinearState();

  useEffect(() => {
    const updateHeight = () => {
      if (overallContainerRef.current) {
        setContainerHeight(overallContainerRef.current.clientHeight);
      }
    };

    updateHeight();

    const resizeObserver = new ResizeObserver(updateHeight);
    if (overallContainerRef.current) {
      resizeObserver.observe(overallContainerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [overallContainerRef]);

  if (hiddenColumnStatuses.length === 0) return null;

  const getIssueCount = (status: IssueStatus) => {
    return issues.filter((issue) => issue.status === status).length;
  };

  const hiddenColumns = columns.filter((column) =>
    hiddenColumnStatuses.includes(column.status)
  );

  return (
    <div
      className="flex flex-col w-[348px] flex-shrink-0 bg-background-2 sticky top-0 overflow-y-auto"
      style={{ height: containerHeight > 0 ? `${containerHeight}px` : "100vh" }}
    >
      <div className="sticky top-0 z-20 w-full h-[50px] flex items-center bg-background-2 shrink-0">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center text-[13px] text-neutral-2 hover:text-neutral-1 gap-[6px] pl-[6px] pr-[8px]"
        >
          <TriangleDown
            className={cn(
              "w-[18px] h-[18px] transition-all",
              isExpanded ? "rotate-90" : "rotate-0"
            )}
          />
          <span className="text-[12px] leading-[16px] font-medium">
            Hidden columns
          </span>
        </button>
      </div>

      {/* Hidden column list */}
      {isExpanded && (
        <div className="pl-2 flex flex-col gap-[10px] pb-4">
          {hiddenColumns.map((column) => {
            const config = STATUS_CONFIG[column.status];
            const issueCount = getIssueCount(column.status);
            return (
              <div
                key={column.status}
                className="flex items-center justify-between h-[40px] bg-card-bg rounded p-1 pl-3"
              >
                <div className="flex items-center gap-3">
                  <span className="flex-shrink-0">
                    <config.Icon className="w-[14px] h-[14px]" />
                  </span>
                  <span className="text-[13px] leading-[15.5px] text-neutral-1 font-medium whitespace-nowrap">
                    {column.title}
                  </span>
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
                        onClick={() => toggleColumnVisibility(column.status)}
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
