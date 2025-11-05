import { MoreHorizontal, Tag, Box } from "lucide-react";
import type {
  Priority,
  IssueStatus,
  User as UserType,
  Label,
  Cycle,
  Project,
  Milestone,
} from "@/lib/types";
import { StatusDropdown } from "@/components/common/dropdowns/StatusDropdown";
import { PriorityDropdown } from "@/components/common/dropdowns/PriorityDropdown";
import { AssigneeDropdown } from "@/components/common/dropdowns/AssigneeDropdown";
import { ProjectDropdown } from "@/components/common/dropdowns/ProjectDropdown";
import { MilestoneDropdown } from "@/components/common/dropdowns/MilestoneDropdown";
import { LabelsDropdown } from "@/components/common/dropdowns/LabelsDropdown";
import { CycleDropdown } from "@/components/common/dropdowns/CycleDropdown";
import { STATUS_CONFIG } from "@/lib/consts";
import { getCycleIcon } from "@/lib/utils/dropdowns";
import { getAssigneeName } from "@/lib/utils";
import { cn } from "@/lib/utils";
import Avatar from "@/components/common/Avatar";
import { UpcomingCycle } from "@/components/icons";
import { useMemo } from "react";
import { PiUserCircleDashed } from "react-icons/pi";
import { PriorityIcon } from "@/components/common/DynamicIcons";

interface DropdownsAreaProps {
  status: IssueStatus;
  onStatusChange: (status: IssueStatus) => void;
  priority: Priority;
  onPriorityChange: (priority: Priority) => void;
  assigneeId: string | undefined;
  onAssigneeChange: (assigneeId: string | undefined) => void;
  projectId: string | undefined;
  onProjectChange: (projectId: string | undefined) => void;
  milestoneId: string | undefined;
  onMilestoneChange: (milestoneId: string | undefined) => void;
  labelIds: string[];
  onLabelsChange: (labelIds: string[]) => void;
  cycleId: string | undefined;
  onCycleChange: (cycleId: string | undefined) => void;
  users: UserType[];
  labels: Label[];
  cycles: Cycle[];
  projects: Project[];
  milestones: Milestone[];
}

const buttonClassName =
  "flex items-center gap-2 h-6 px-2 rounded-md shadow-[0_0_0_1px_var(--badge-bg-2)] bg-badge-bg-2 text-xs text-neutral-3 hover:text-neutral-2 hover:shadow-[0_0_0_1px_var(--hover-5)] hover:bg-hover-5 transition-colors cursor-pointer";

export default function DropdownsArea({
  status,
  onStatusChange,
  priority,
  onPriorityChange,
  assigneeId,
  onAssigneeChange,
  projectId,
  onProjectChange,
  milestoneId,
  onMilestoneChange,
  labelIds,
  onLabelsChange,
  cycleId,
  onCycleChange,
  users,
  labels,
  cycles,
  projects,
  milestones,
}: DropdownsAreaProps) {
  const StatusIcon = STATUS_CONFIG[status].Icon;
  const assignee = useMemo(
    () => users.find((u) => u.id === assigneeId),
    [users, assigneeId]
  );
  const project = useMemo(
    () => projects.find((p) => p.id === projectId),
    [projects, projectId]
  );
  const cycle = useMemo(
    () => cycles.find((c) => c.id === cycleId),
    [cycles, cycleId]
  );
  const selectedLabels = useMemo(
    () => labels.filter((l) => labelIds.includes(l.id)),
    [labels, labelIds]
  );

  // Determine if this cycle is the first upcoming cycle
  const isFirstUpcoming = useMemo(() => {
    if (!cycle || cycle.status !== "upcoming") return false;
    const currentCycle = cycles.find((c) => c.status === "current");
    const upcomingCycles = cycles.filter((c) => c.status === "upcoming");
    return currentCycle && upcomingCycles[0]?.id === cycle.id;
  }, [cycle, cycles]);

  // Calculate collapsed state based on filled dropdowns
  const filledCount = useMemo(() => {
    let count = 2; // status and priority are always "filled"
    if (assigneeId) count++;
    if (projectId) count++;
    if (milestoneId) count++;
    if (labelIds.length > 0) count++;
    if (cycleId) count++;
    return count;
  }, [assigneeId, projectId, milestoneId, labelIds, cycleId]);

  const isCollapsed = filledCount > 4;

  return (
    <div className="flex flex-wrap gap-2 px-3 pb-3 pt-[6px]">
      {/* Status */}
      <StatusDropdown
        value={status}
        onChange={onStatusChange}
        trigger={
          <button type="button" className={buttonClassName}>
            <StatusIcon className="w-[14px] h-[14px] shrink-0" />
            <span className="capitalize">
              {status === "in_progress"
                ? "In Progress"
                : status === "in_review"
                ? "In Review"
                : status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
          </button>
        }
      />

      {/* Priority */}
      <PriorityDropdown
        value={priority}
        onChange={onPriorityChange}
        trigger={
          <button type="button" className={buttonClassName}>
            <div className="w-4 h-4 shrink-0">
              <PriorityIcon priority={priority} isColored={false} />
            </div>
            {!isCollapsed && (
              <span>{priority === "none" ? "Priority" : priority}</span>
            )}
          </button>
        }
        searchPlaceholder="Set priority to..."
      />

      {/* Assignee */}
      <AssigneeDropdown
        showSuggestions
        value={assigneeId}
        onChange={onAssigneeChange}
        users={users}
        trigger={
          <button type="button" className={buttonClassName}>
            {assignee ? (
              <Avatar
                src={assignee.avatar}
                alt={assignee.name}
                size="sm"
                className="w-4 h-4 shrink-0 text-[8px]"
              />
            ) : (
              <PiUserCircleDashed className="w-4 h-4 shrink-0 text-neutral-5" />
            )}
            {!isCollapsed && (
              <span>
                {assignee ? getAssigneeName(assigneeId, users) : "Assignee"}
              </span>
            )}
          </button>
        }
      />

      {/* Project & Milestone Group */}
      <div className="flex items-center">
        <ProjectDropdown
          projects={projects}
          value={projectId}
          onChange={onProjectChange}
          trigger={
            <button
              type="button"
              className={cn(
                "flex items-center gap-2 h-6 px-2 bg-badge-bg-2 text-xs text-neutral-3 hover:text-neutral-2 hover:shadow-[0_0_0_1px_var(--hover-5)] hover:bg-hover-5 transition-colors cursor-pointer",
                project && "text-neutral-1",
                projectId
                  ? "rounded-l-md shadow-[0_0_0_1px_var(--badge-bg-2)]"
                  : "rounded-md shadow-[0_0_0_1px_var(--badge-bg-2)]"
              )}
            >
              {project && project.Icon ? (
                <project.Icon className="w-4 h-4 shrink-0" />
              ) : (
                <Box className="w-4 h-4 shrink-0 text-neutral-5" />
              )}
              <span className={isCollapsed ? "truncate max-w-[110px]" : ""}>
                {project ? project.name : "Project"}
              </span>
            </button>
          }
        />

        {projectId && (
          <MilestoneDropdown
            milestones={milestones}
            projectId={projectId}
            value={milestoneId}
            onChange={onMilestoneChange}
            trigger={
              <button
                type="button"
                className={cn(
                  "flex items-center gap-2 h-6 px-2 rounded-r-md shadow-[0_0_0_1px_var(--badge-bg-2)] bg-badge-bg-2 text-xs text-neutral-3 hover:text-neutral-2 hover:shadow-[0_0_0_1px_var(--hover-5)] hover:bg-hover-5 transition-colors cursor-pointer border-l border-hover-5",
                  milestoneId && "text-neutral-1"
                )}
              >
                {milestoneId ? (
                  <>
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{
                        backgroundColor: milestones.find(
                          (m) => m.id === milestoneId
                        )?.color,
                      }}
                    />
                    <span
                      className={isCollapsed ? "truncate max-w-[110px]" : ""}
                    >
                      {milestones.find((m) => m.id === milestoneId)?.name}
                    </span>
                  </>
                ) : (
                  <>
                    <div className="w-2 h-2 border border-neutral-5 rotate-45 border-dashed" />
                    {!isCollapsed && <span>Milestone</span>}
                  </>
                )}
              </button>
            }
          />
        )}
      </div>

      {/* Label */}
      <LabelsDropdown
        labels={labels}
        selectedLabelIds={labelIds}
        onChange={onLabelsChange}
        trigger={
          <button
            type="button"
            className={cn(
              buttonClassName,
              labelIds.length > 0 && "text-neutral-1"
            )}
          >
            {labelIds.length > 0 ? (
              <div className="flex items-center -space-x-1 shrink-0">
                {selectedLabels.slice(0, 3).map((label, index) => (
                  <div
                    key={label.id}
                    className="w-[9px] h-[9px] rounded-full border border-badge-bg-2"
                    style={{
                      backgroundColor: label.color,
                      zIndex: 3 - index,
                    }}
                  />
                ))}
              </div>
            ) : (
              <Tag className="w-3.5 h-3.5 shrink-0 text-neutral-5" />
            )}
            <span>
              {labelIds.length > 0
                ? labelIds.length === 1
                  ? selectedLabels[0]?.name || "Label"
                  : `${labelIds.length} labels`
                : "Label"}
            </span>
          </button>
        }
      />

      {/* Cycle */}
      <CycleDropdown
        cycles={cycles}
        value={cycleId}
        onChange={onCycleChange}
        trigger={
          <button
            type="button"
            className={cn(buttonClassName, cycle && "text-neutral-1")}
          >
            {cycle ? (
              getCycleIcon(cycle, {
                isFirstUpcoming,
                className: "w-4 h-4 shrink-0",
              })
            ) : (
              <UpcomingCycle className="w-4 h-4 shrink-0 text-neutral-5" />
            )}
            {cycle && !isCollapsed && <span>{cycle.name}</span>}
          </button>
        }
      />

      {/* More Button */}
      <button type="button" className={buttonClassName}>
        <MoreHorizontal className="w-4 h-4" />
      </button>
    </div>
  );
}
