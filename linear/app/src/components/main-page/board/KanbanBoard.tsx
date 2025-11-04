import { useState, useMemo } from "react";
import {
  DndContext,
  type DragEndEvent,
  DragOverlay,
  type DragStartEvent,
  type DragOverEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import type { Issue, IssueStatus } from "@/lib/types";
import IssueCard from "./IssueCard";
import { COLUMNS, VALID_STATUSES, STATUS_CONFIG } from "@/lib/consts";
import UserRow from "./UserRow";
import HiddenRowsSection from "./HiddenRowsSection";
import { useLinearState } from "@/context/LinearStateContext";
import { Ellipsis, Plus } from "lucide-react";
import Button from "@/components/common/Button";

export default function KanbanBoard() {
  const [activeIssue, setActiveIssue] = useState<Issue | null>(null);
  const [hoveredSectionId, setHoveredSectionId] = useState<string | null>(null);
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);
  const {
    issues,
    users,
    handleReorderIssues: onReorderIssues,
    hiddenUserIds,
  } = useLinearState();

  // Group issues by user and status
  const userIssuesData = useMemo(() => {
    const data = new Map<
      string,
      { maxCount: number; issuesByStatus: Map<IssueStatus, Issue[]> }
    >();

    // For each user (including unassigned)
    [...users.map((u) => u.id), "unassigned"].forEach((userId) => {
      const issuesByStatus = new Map<IssueStatus, Issue[]>();
      let maxCount = 0;

      COLUMNS.forEach((column) => {
        const userIssues = issues.filter(
          (issue) =>
            issue.status === column.status &&
            (userId === "unassigned"
              ? !issue.assigneeId
              : issue.assigneeId === userId)
        );
        issuesByStatus.set(column.status, userIssues);
        maxCount = Math.max(maxCount, userIssues.length);
      });

      data.set(userId, { maxCount, issuesByStatus });
    });

    return data;
  }, [issues, users]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 2,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const issue = issues.find((i) => i.id === event.active.id);
    setActiveIssue(issue || null);

    if (issue) {
      const sectionId = issue.assigneeId
        ? `${issue.status}-${issue.assigneeId}`
        : `${issue.status}-unassigned`;
      setActiveSectionId(sectionId);
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { over } = event;

    if (!over) {
      setHoveredSectionId(null);
      return;
    }

    // Check if over an issue
    const targetIssue = issues.find((i) => i.id === over.id);

    if (targetIssue) {
      // Hovering over an issue - determine its section
      const sectionId = targetIssue.assigneeId
        ? `${targetIssue.status}-${targetIssue.assigneeId}`
        : `${targetIssue.status}-unassigned`;
      setHoveredSectionId(sectionId);
    } else {
      // Hovering over a droppable area
      setHoveredSectionId(over.id as string);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveIssue(null);
    setHoveredSectionId(null);
    setActiveSectionId(null);

    if (!over || active.id === over.id) return;

    const activeIssue = issues.find((i) => i.id === active.id);
    if (!activeIssue) return;

    let targetStatus: IssueStatus;
    let targetUserId: string | undefined;

    // Check if dropped on another issue
    const targetIssue = issues.find((i) => i.id === over.id);

    if (targetIssue) {
      // Dropped on another issue - use that issue's status and assignee
      targetStatus = targetIssue.status;
      targetUserId = targetIssue.assigneeId;
    } else {
      // Dropped on a user section (droppable area)
      // Parse composite ID: "{status}-{userId}" or "{status}-unassigned"
      const overId = over.id as string;
      const parts = overId.split("-");

      if (parts.length >= 2) {
        targetStatus = parts[0] as IssueStatus;
        const userPart = parts.slice(1).join("-"); // Handle "unassigned" or userId
        targetUserId = userPart === "unassigned" ? undefined : userPart;
      } else {
        // Fallback: if it's a valid status, keep current assignee
        if (VALID_STATUSES.includes(overId as IssueStatus)) {
          targetStatus = overId as IssueStatus;
          targetUserId = activeIssue.assigneeId;
        } else {
          return;
        }
      }
    }

    const oldIndex = issues.findIndex((i) => i.id === active.id);
    const statusChanged = activeIssue.status !== targetStatus;
    const assigneeChanged = activeIssue.assigneeId !== targetUserId;

    // If status or assignee changed
    if (statusChanged || assigneeChanged) {
      const updatedIssue = {
        ...activeIssue,
        status: targetStatus,
        assigneeId: targetUserId,
      };

      let newIssues = issues.map((i) =>
        i.id === active.id ? updatedIssue : i
      );

      // If dropped on another issue, position it at that issue's location
      if (targetIssue) {
        newIssues = newIssues.filter((i) => i.id !== active.id);
        const targetIndex = newIssues.findIndex((i) => i.id === over.id);
        newIssues.splice(targetIndex, 0, updatedIssue);
      }

      onReorderIssues(newIssues);
    } else if (targetIssue) {
      // Reordering within the same user section
      const newIndex = issues.findIndex((i) => i.id === over.id);

      if (oldIndex !== newIndex) {
        const reorderedIssues = arrayMove(issues, oldIndex, newIndex);
        onReorderIssues(reorderedIssues);
      }
    }
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="flex flex-col min-h-full min-w-fit">
        {/* Column headers */}
        <div className="flex sticky top-0 z-20 h-[50px] min-w-fit pr-1 bg-background-3">
          {COLUMNS.map((column) => {
            const config = STATUS_CONFIG[column.status];
            const columnIssues = issues.filter(
              (issue) => issue.status === column.status
            );

            return (
              <div
                key={column.status}
                className="w-[348px] flex-shrink-0 pl-2 pt-1.5 "
              >
                <div className="bg-background-2 rounded-t-lg flex items-center justify-between w-full pl-3 pr-3 h-full">
                  <div className="flex items-center gap-2">
                    <span className="flex-shrink-0">
                      <config.Icon className="w-[14px] h-[14px]" />
                    </span>
                    <span className="text-sm font-medium text-neutral-1">
                      {column.title}
                    </span>
                    <span className="text-xs text-neutral-5">
                      {columnIssues.length}
                    </span>
                  </div>
                  <div className="flex items-center gap-[2px]">
                    <Button variant="ghost" size="icon">
                      <Ellipsis className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* User rows */}
        <div className="flex flex-col min-w-fit">
          {users.map((user) => {
            const userData = userIssuesData.get(user.id);
            if (!userData || hiddenUserIds.includes(user.id)) return null;

            return (
              <UserRow
                key={user.id}
                user={user}
                issuesByStatus={userData.issuesByStatus}
                maxCount={userData.maxCount}
                hoveredSectionId={hoveredSectionId}
                activeSectionId={activeSectionId}
              />
            );
          })}

          {/* Unassigned row */}
          {(() => {
            const unassignedData = userIssuesData.get("unassigned");
            if (!unassignedData || hiddenUserIds.includes("unassigned"))
              return null;

            return (
              <UserRow
                key="unassigned"
                user={null}
                issuesByStatus={unassignedData.issuesByStatus}
                maxCount={unassignedData.maxCount}
                hoveredSectionId={hoveredSectionId}
                activeSectionId={activeSectionId}
              />
            );
          })()}
        </div>

        {/* Hidden rows section */}
        <HiddenRowsSection
          hiddenUsers={[
            ...users
              .filter((user) => hiddenUserIds.includes(user.id))
              .map((user) => ({ user, userId: user.id })),
            ...(hiddenUserIds.includes("unassigned")
              ? [{ user: null, userId: "unassigned" }]
              : []),
          ]}
          issues={issues}
        />
      </div>

      <DragOverlay>
        {activeIssue ? <IssueCard issue={activeIssue} /> : null}
      </DragOverlay>
    </DndContext>
  );
}
