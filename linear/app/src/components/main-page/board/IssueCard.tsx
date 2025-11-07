import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Issue } from "@/lib/types";
import Avatar from "@/components/common/Avatar";
import Badge from "@/components/common/Badge";
import { cn } from "@/lib/utils";
import { STATUS_CONFIG } from "@/lib/consts";
import { useLinearState } from "@/context/LinearStateContext";
import { useCallback } from "react";
import {
  PriorityDropdown,
  LabelsDropdown,
} from "@/components/common/dropdowns";
import { ProjectIcon, PriorityIcon } from "@/components/common/DynamicIcons";

interface IssueCardProps {
  issue: Issue;
}

export default function IssueCard({ issue }: IssueCardProps) {
  const { users, setTaskId, updateIssue, projects, labels } = useLinearState();
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useSortable({
      id: issue.id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: !isDragging && transform ? "transform 200ms ease" : undefined,
  };

  const assignee = users.find((u) => u.id === issue.assigneeId);
  const statusConfig = STATUS_CONFIG[issue.status];

  const handleClick = useCallback(() => {
    setTaskId(issue.id);
  }, [issue, setTaskId]);

  const handlePriorityChange = useCallback(
    (priority: Issue["priority"]) => {
      updateIssue(issue.id, { priority });
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

  const project = projects.find(
    (candidate) => candidate.id === issue.projectId
  );

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="w-[336px] px-[1px] pb-2 flex"
      onClick={handleClick}
    >
      <div
        className={cn(
          "flex flex-col w-full max-h-[133px] overflow-hidden bg-card-bg border border-card-border rounded-lg py-[10px] px-2 transition-colors relative gap-[9px] hover:bg-card-hover",
          isDragging && "bg-transparent border-transparent"
        )}
      >
        <div
          className={cn(
            "w-full h-full absolute top-0 left-0 bg-card-bg opacity-0 scale-90 rounded pointer-events-none transition-all duration-300",
            isDragging && "opacity-50"
          )}
        />
        <div
          className={cn(
            "flex flex-col gap-[6px] pl-1 pr-6",
            isDragging && "invisible"
          )}
        >
          <span className="text-xs leading-[15px] text-card-text-secondary">
            {issue.identifier}
          </span>
          <div className="flex items-start gap-1.5">
            <statusConfig.Icon className="w-[14px] h-[14px] flex-shrink-0 mt-[1px]" />
            <p className="text-[13px] leading-[16px] text-neutral-1 line-clamp-2">
              {issue.title}
            </p>
          </div>
        </div>

        {assignee && (
          <Avatar
            src={assignee.avatar}
            alt={assignee.name}
            size="sm"
            className={cn("absolute right-2 top-2", isDragging && "invisible")}
          />
        )}

        <div
          className={cn(
            "flex items-center gap-1 flex-wrap",
            isDragging && "invisible"
          )}
        >
          <PriorityDropdown
            value={issue.priority}
            onChange={handlePriorityChange}
            trigger={
              <button
                type="button"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center justify-center h-5 px-1.5 rounded bg-badge-bg border border-badge-border hover:bg-badge-hover transition-colors"
              >
                <div className="w-[14px] h-[14px] flex items-center justify-center">
                  <PriorityIcon
                    priority={issue.priority}
                    className="w-[14px] h-[14px]"
                  />
                </div>
              </button>
            }
          />
          {project && (
            <Badge key={issue.projectId} className="gap-1 group">
              <ProjectIcon project={project} />
              <span className="text-badge-text group-hover:text-neutral-1! transition-colors whitespace-nowrap max-w-[110px] truncate">
                {project.name}
              </span>
            </Badge>
          )}

          {issue.labels.slice(0, 3).map((label) => (
            <LabelsDropdown
              key={label.id}
              labels={labels}
              selectedLabelIds={issue.labels.map((l) => l.id)}
              onChange={handleLabelsChange}
              trigger={
                <button
                  type="button"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center px-1 h-[22px] rounded text-[11px] font-[450] transition-colors bg-badge-bg border border-badge-border text-badge-text hover:bg-badge-hover gap-1 group"
                >
                  <span
                    className="w-[9px] h-[9px] rounded-full"
                    style={{ backgroundColor: label.color }}
                    aria-hidden="true"
                  />
                  <span className="text-badge-text group-hover:text-neutral-1! transition-colors">
                    {label.name}
                  </span>
                </button>
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}
