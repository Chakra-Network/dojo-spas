import { Box, Tag, Plus } from "lucide-react";
import {
  IssueUrl,
  CopyIssuedId,
  LinearGitBranch,
  PlayCircle,
} from "@/components/icons";
import Avatar from "@/components/common/Avatar";
import { STATUS_CONFIG } from "@/lib/consts";
import type { Issue, IssueStatus, Priority } from "@/lib/types";
import { useLinearState } from "@/context/LinearStateContext";
import { cn } from "@/lib/utils";
import { SidebarIconButton, SectionLayout } from "./SidebarItems";
import { SidebarTriggerButton } from "./SidebarTriggerButton";
import { getPriorityIcon, getCycleIcon } from "@/lib/utils/dropdowns";
import {
  AssigneeDropdown,
  CycleDropdown,
  ProjectDropdown,
  MilestoneDropdown,
  PriorityDropdown,
  LabelsDropdown,
  StatusDropdown,
} from "@/components/common/dropdowns";
import { useCallback, useMemo } from "react";
import { PiUserCircleDashed } from "react-icons/pi";

const STATUS_LABELS: Record<IssueStatus, string> = {
  queued: "Queued",
  in_progress: "In Progress",
  blocked: "Blocked",
  in_review: "In Review",
};

const PRIORITY_LABELS: Record<Priority, string> = {
  urgent: "Urgent",
  high: "High",
  medium: "Medium",
  low: "Low",
  none: "Set priority",
};

export default function TaskRightSidebar({ issue }: { issue: Issue }) {
  const { users, labels, cycles, projects, milestones, updateIssue } =
    useLinearState();
  const assignee = users.find((user) => user.id === issue.assigneeId);
  const project = projects.find(
    (candidate) => candidate.id === issue.projectId
  );
  const cycle = cycles.find((c) => c.id === issue.cycleId);
  const milestone = milestones.find((m) => m.id === issue.milestoneId);

  const StatusIcon = STATUS_CONFIG[issue.status]?.Icon;
  const statusLabel = STATUS_LABELS[issue.status];
  const priorityLabel = PRIORITY_LABELS[issue.priority];
  const showPriorityPlaceholder = issue.priority === "none";

  // Determine if this cycle is the first upcoming cycle
  const isFirstUpcoming = useMemo(() => {
    if (!cycle || cycle.status !== "upcoming") return false;
    const currentCycle = cycles.find((c) => c.status === "current");
    const upcomingCycles = cycles.filter((c) => c.status === "upcoming");
    return currentCycle && upcomingCycles[0]?.id === cycle.id;
  }, [cycle, cycles]);

  const handleStatusChange = useCallback(
    (status: IssueStatus) => {
      updateIssue(issue.id, { status });
    },
    [issue.id, updateIssue]
  );

  const handlePriorityChange = useCallback(
    (priority: Priority) => {
      updateIssue(issue.id, { priority });
    },
    [issue.id, updateIssue]
  );

  const handleAssigneeChange = useCallback(
    (assigneeId?: string) => {
      updateIssue(issue.id, { assigneeId });
    },
    [issue.id, updateIssue]
  );

  const handleLabelsChange = useCallback(
    (labelIds: string[]) => {
      const selectedLabels = labels.filter((label) =>
        labelIds.includes(label.id)
      );
      updateIssue(issue.id, { labels: selectedLabels });
    },
    [issue.id, labels, updateIssue]
  );

  const handleCycleChange = useCallback(
    (cycleId?: string) => {
      updateIssue(issue.id, { cycleId });
    },
    [issue.id, updateIssue]
  );

  const handleProjectChange = useCallback(
    (projectId?: string) => {
      // Clear milestone if project changes
      updateIssue(issue.id, { projectId, milestoneId: undefined });
    },
    [issue.id, updateIssue]
  );

  const handleMilestoneChange = useCallback(
    (milestoneId?: string) => {
      updateIssue(issue.id, { milestoneId });
    },
    [issue.id, updateIssue]
  );

  return (
    <aside className="w-full min-w-[219.5px] max-w-[279.5px] shrink-0 bg-card-bg border-l border-border flex flex-col ">
      {/* Header */}
      <div className="flex items-center justify-between text-neutral-4 min-h-[39.5px] pl-6 pr-[19.5px]">
        <span className="text-xs leading-[14.5px] font-medium text-neutral-5">
          Properties
        </span>
        <div className="flex items-center gap-3 text-neutral-5">
          <SidebarIconButton icon={IssueUrl} label="Copy issue link" />
          <SidebarIconButton icon={CopyIssuedId} label="Copy issue ID" />
          <SidebarIconButton icon={LinearGitBranch} label="View in Git" />
        </div>
      </div>

      {/* Body */}
      <div className="pl-6 pb-6 pt-[10px] pr-[6px] flex flex-col overflow-y-auto">
        <StatusDropdown
          value={issue.status}
          onChange={handleStatusChange}
          side="left"
          trigger={
            <button
              type="button"
              className="mb-3 text-[13px] leading-[15.5px] flex items-center min-h-7 gap-2  hover:bg-hover-6 rounded px-[6px] -mx-[6px] transition-colors cursor-pointer text-neutral-1 w-[140px]"
            >
              {StatusIcon && (
                <StatusIcon className="w-[14px] h-[14px] shrink-0" />
              )}
              <span className="text-[13px] leading-[16px] font-medium">
                {statusLabel}
              </span>
            </button>
          }
        />
        <PriorityDropdown
          value={issue.priority}
          onChange={handlePriorityChange}
          side="left"
          trigger={
            <button
              type="button"
              className={cn(
                "mb-3 text-[13px] leading-[16px] flex items-center min-h-7 gap-[7px] hover:bg-hover-6 rounded px-[6px] -mx-[6px] transition-colors cursor-pointer w-[140px]",
                showPriorityPlaceholder ? "text-neutral-4" : "text-neutral-1"
              )}
            >
              {getPriorityIcon(issue.priority)}
              <span
                className={cn(
                  "font-medium",
                  issue.priority === "none"
                    ? "text-neutral-5"
                    : "text-neutral-1"
                )}
              >
                {priorityLabel}
              </span>
            </button>
          }
        />

        <SidebarTriggerButton hasValue={!!assignee}>
          <AssigneeDropdown
            currentUser={assignee}
            value={issue.assigneeId}
            onChange={handleAssigneeChange}
            users={users}
            side="left"
            trigger={
              <button
                type="button"
                className={cn(
                  "text-[13px] leading-[16px] flex items-center min-h-7 gap-2 rounded px-[6px] -mx-[6px] transition-colors cursor-pointer",
                  assignee
                    ? "text-neutral-1 flex-1 mr-2 group-hover:bg-hover-6"
                    : "text-neutral-4 w-full hover:bg-hover-6"
                )}
              >
                {assignee ? (
                  <Avatar
                    src={assignee.avatar}
                    alt={assignee.name}
                    size="sm"
                    className="h-[14px] w-[14px] text-xs shrink-0"
                  />
                ) : (
                  <PiUserCircleDashed className="w-4 h-4 shrink-0 text-neutral-5" />
                )}
                <span className="font-medium">
                  {assignee ? assignee.name : "Assign"}
                </span>
              </button>
            }
          />
        </SidebarTriggerButton>

        <SectionLayout title="Labels">
          {issue.labels.length === 0 ? (
            <LabelsDropdown
              labels={labels}
              selectedLabelIds={issue.labels.map((label) => label.id)}
              onChange={handleLabelsChange}
              side="left"
              trigger={
                <button
                  type="button"
                  className="flex items-center gap-[6px] text-neutral-4 h-7 hover:bg-hover-6 rounded px-[6px] -mx-[6px] transition-colors cursor-pointer w-[140px]"
                >
                  <Tag className="w-4 h-4" />
                  <span>Add label</span>
                </button>
              }
            />
          ) : (
            <div className="flex items-center gap-1 flex-wrap -mx-[6px]">
              {issue.labels.map((label) => (
                <div
                  key={label.id}
                  className="flex items-center gap-[6px] text-neutral-1 h-7 px-2 py-1 bg-badge-bg border border-badge-border rounded-full hover:bg-badge-hover transition-colors"
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: label.color }}
                    aria-hidden="true"
                  />
                  <span className="text-xs font-medium">{label.name}</span>
                </div>
              ))}
              <LabelsDropdown
                labels={labels}
                selectedLabelIds={issue.labels.map((label) => label.id)}
                onChange={handleLabelsChange}
                side="left"
                trigger={
                  <button
                    type="button"
                    className="w-6 h-6 border cursor-pointer border-hover-6 hover:bg-hover-6 flex items-center justify-center transition-colors rounded-full"
                  >
                    <Plus className="w-3 h-3 text-neutral-2" />
                  </button>
                }
              />
            </div>
          )}
        </SectionLayout>

        <SectionLayout title="Cycle">
          <SidebarTriggerButton hasValue={!!cycle}>
            <CycleDropdown
              cycles={cycles}
              value={issue.cycleId}
              onChange={handleCycleChange}
              side="left"
              trigger={
                <button
                  type="button"
                  className={cn(
                    "flex items-center gap-[6px] h-7 rounded px-[6px] -mx-[6px] transition-colors cursor-pointer",
                    cycle
                      ? "text-neutral-1 flex-1 mr-2 group-hover:bg-hover-6"
                      : "text-neutral-4 w-full hover:bg-hover-6"
                  )}
                >
                  {cycle ? (
                    getCycleIcon(cycle, {
                      isFirstUpcoming,
                      className: "w-4 h-4 shrink-0",
                    })
                  ) : (
                    <PlayCircle className="w-4 h-4 shrink-0 text-neutral-5" />
                  )}
                  <span className={cycle ? "text-neutral-1" : "text-neutral-5"}>
                    {cycle ? cycle.name : "Add to cycle"}
                  </span>
                </button>
              }
            />
          </SidebarTriggerButton>
        </SectionLayout>

        <SectionLayout title="Project">
          <SidebarTriggerButton hasValue={!!project}>
            <ProjectDropdown
              projects={projects}
              value={issue.projectId}
              onChange={handleProjectChange}
              side="left"
              trigger={
                <button
                  type="button"
                  className={cn(
                    "flex items-center gap-[6px] h-7 rounded px-[6px] -mx-[6px] transition-colors cursor-pointer",
                    project
                      ? "text-neutral-1 flex-1 mr-2 group-hover:bg-hover-6"
                      : "text-neutral-4 w-full hover:bg-hover-6"
                  )}
                >
                  {project && project.Icon ? (
                    <project.Icon className="w-4 h-4 shrink-0" />
                  ) : (
                    <Box className="w-4 h-4 shrink-0 text-neutral-5" />
                  )}
                  <span
                    className={project ? "text-neutral-1" : "text-neutral-5"}
                  >
                    {project ? project.name : "Add to project"}
                  </span>
                </button>
              }
            />
          </SidebarTriggerButton>
        </SectionLayout>

        {issue.projectId && (
          <SectionLayout title="Milestone">
            <SidebarTriggerButton hasValue={!!milestone}>
              <MilestoneDropdown
                milestones={milestones}
                projectId={issue.projectId}
                value={issue.milestoneId}
                onChange={handleMilestoneChange}
                side="left"
                trigger={
                  <button
                    type="button"
                    className={cn(
                      "flex items-center gap-2 h-7 rounded px-[6px] -mx-[6px] transition-colors cursor-pointer",
                      milestone
                        ? "text-neutral-1 flex-1 mr-2 group-hover:bg-hover-6"
                        : "text-neutral-4 w-full hover:bg-hover-6"
                    )}
                  >
                    {milestone ? (
                      <>
                        <div
                          className="w-[10px] h-[10px] shrink-0 rounded-full ml-1"
                          style={{ backgroundColor: milestone.color }}
                          aria-hidden="true"
                        />
                        <span className="whitespace-nowrap truncate">
                          {milestone.name}
                        </span>
                      </>
                    ) : (
                      <>
                        <div className="w-[10px] h-[10px] shrink-0 border border-neutral-5 rotate-45 border-dashed ml-1" />
                        <span className="text-neutral-5">Set milestone</span>
                      </>
                    )}
                  </button>
                }
              />
            </SidebarTriggerButton>
          </SectionLayout>
        )}
      </div>
    </aside>
  );
}
