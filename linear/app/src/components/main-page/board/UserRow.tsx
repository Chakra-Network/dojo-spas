import type { Issue, IssueStatus, User } from "@/lib/types";
import { COLUMNS } from "@/lib/consts";
import UserSection from "./UserSection";
import Avatar from "@/components/common/Avatar";
import { Ellipsis } from "lucide-react";
import Button from "@/components/common/Button";
import { TriangleDown } from "@/components/icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLinearState } from "@/context/LinearStateContext";

interface UserRowProps {
  user: User | null; // null for unassigned
  issuesByStatus: Map<IssueStatus, Issue[]>;
  maxCount: number;
  hoveredSectionId: string | null;
  activeSectionId: string | null;
}

export default function UserRow({
  user,
  issuesByStatus,
  maxCount,
  hoveredSectionId,
  activeSectionId,
}: UserRowProps) {
  const { toggleUserRowVisibility } = useLinearState();
  const totalIssues = Array.from(issuesByStatus.values()).reduce(
    (sum, issues) => sum + issues.length,
    0
  );

  const userId = user ? user.id : "unassigned";

  const handleHideRow = () => {
    toggleUserRowVisibility(userId);
  };

  return (
    <div className="flex flex-col relative min-w-fit">
      {/* User header bar spanning all columns */}
      <div className="sticky top-[50px] left-0 w-full min-w-fit flex items-center bg-user-row-header z-10 justify-between h-[35px]">
        {/* Sticky username section */}
        <div className="sticky left-0 flex items-center gap-2 pl-2">
          <Button variant="ghost" size="icon" className="hover:bg-transparent">
            <TriangleDown className="w-[18px] h-[18px] rotate-90 mt-[1px]" />
          </Button>
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
          <span className="text-xs text-[13px] text-neutral-3">
            {totalIssues}
          </span>
        </div>
        {/* Scrollable spacer to fill the rest */}
        <div className="sticky right-0 pr-[3px]">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="text-xs text-gray-400 font-medium whitespace-nowrap w-6 h-6 hover:bg-neutral-800 rounded-md flex items-center justify-center cursor-pointer">
                <Ellipsis className="w-4 h-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              onCloseAutoFocus={(e) => e.preventDefault()}
              className="w-[174px] min-w-[174px]"
            >
              <DropdownMenuItem onClick={handleHideRow}>
                Hide row
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* User sections across all columns */}
      <div className="flex min-w-fit">
        {COLUMNS.map((column) => {
          const sectionId = user
            ? `${column.status}-${user.id}`
            : `${column.status}-unassigned`;

          // Only show hover overlay if hovering over this section AND it's different from the active section
          const isHovered =
            hoveredSectionId === sectionId && activeSectionId !== sectionId;

          return (
            <div key={column.status} className="w-[348px] flex-shrink-0 pl-2">
              <UserSection
                user={user}
                status={column.status}
                issues={issuesByStatus.get(column.status) || []}
                maxCount={maxCount}
                showUserHeader={false}
                isHovered={isHovered}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
