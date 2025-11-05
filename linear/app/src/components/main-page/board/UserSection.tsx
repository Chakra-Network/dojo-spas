import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import type { Issue, IssueStatus, User } from "@/lib/types";
import IssueCard from "./IssueCard";
import Avatar from "@/components/common/Avatar";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import Button from "@/components/common/Button";
import { useLinearState } from "@/context/LinearStateContext";
import { useState } from "react";

interface UserSectionProps {
  user: User | null; // null for unassigned
  status: IssueStatus;
  issues: Issue[];
  maxCount: number; // max count for this user across all columns
  showUserHeader?: boolean; // whether to show the user header in this section
  isHovered?: boolean; // whether this section is being hovered by a dragged item
}

export default function UserSection({
  user,
  status,
  issues,
  maxCount,
  showUserHeader = true,
  isHovered = false,
}: UserSectionProps) {
  const droppableId = user ? `${status}-${user.id}` : `${status}-unassigned`;
  const { setNodeRef } = useDroppable({ id: droppableId });
  const { setInitialIssueValues, setIsNewIssueModalOpen } = useLinearState();
  const [isHovering, setIsHovering] = useState(false);

  // Calculate min height based on max issue count
  // Each card is ~115px (107px card + 8px margin-bottom on each IssueCard's container)
  const minHeight = Math.max(485, maxCount * 115);

  const handlePlusClick = () => {
    setInitialIssueValues({
      status,
      assigneeId: user ? user.id : undefined,
    });
    setIsNewIssueModalOpen(true);
  };

  return (
    <div
      className="pl-1.5 pt-2 h-full bg-background-2 relative"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div
        className={cn(
          "absolute top-[-24px] left-[-16px] w-[calc(100%+36px)] h-[calc(100%+36px)] bg-background-2 opacity-0 scale-90 rounded pointer-events-none transition-all duration-300 z-50",
          isHovered && "opacity-60"
        )}
      />
      <div className="flex flex-col mb-2">
        {/* User header */}
        {showUserHeader && (
          <div className="flex items-center gap-2 px-3 py-2 mb-2">
            {user ? (
              <>
                <Avatar src={user.avatar} alt={user.name} size="xs" />
                <span className="text-xs text-gray-400">{user.name}</span>
              </>
            ) : (
              <span className="text-xs text-gray-400">Unassigned</span>
            )}
            <span className="text-xs text-gray-500">({issues.length})</span>
          </div>
        )}

        {/* Droppable area for this user's issues */}
        <SortableContext
          items={issues.map((i) => i.id)}
          strategy={verticalListSortingStrategy}
        >
          <div
            ref={setNodeRef}
            style={{ minHeight: `${minHeight}px` }}
            className="flex flex-col rounded transition-colors"
          >
            {issues.map((issue) => (
              <IssueCard key={issue.id} issue={issue} />
            ))}
            {/* Plus button that appears on hover at bottom of list */}
            <div
              className={cn(
                "transition-opacity duration-100",
                isHovering ? "opacity-100" : "opacity-0"
              )}
            >
              <Button
                variant="ghost"
                size="icon"
                onClick={handlePlusClick}
                className="w-full h-8 rounded-md border border-plus-button-border bg-plus-button-bg hover:bg-plus-button-bg-hover text-plus-button-foreground hover:text-plus-button-foreground-hover cursor-default"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </SortableContext>
      </div>
    </div>
  );
}
