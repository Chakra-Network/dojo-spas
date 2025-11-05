import { Maximize2, Paperclip, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useLinearState } from "@/context/LinearStateContext";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
} from "@/components/ui/dialog";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import ExpandingTextarea from "@/components/common/ExpandingTextarea";
import { TaskIcon } from "@/components/icons";
import type { Priority, IssueStatus } from "@/lib/types";
import DropdownsArea from "./DropdownsArea";

interface NewIssueModalProps {
  open: boolean;
  onClose: () => void;
}

export default function NewIssueModal({ open, onClose }: NewIssueModalProps) {
  const {
    addIssue,
    users,
    labels,
    cycles,
    projects,
    milestones,
    teamIdentifier,
    initialIssueValues,
    clearInitialIssueValues,
  } = useLinearState();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<IssueStatus>(
    initialIssueValues?.status ?? "queued"
  );
  const [priority, setPriority] = useState<Priority>("none");
  const [assigneeId, setAssigneeId] = useState<string | undefined>(
    initialIssueValues?.assigneeId ?? "8"
  );
  const [projectId, setProjectId] = useState<string | undefined>(undefined);
  const [milestoneId, setMilestoneId] = useState<string | undefined>(undefined);
  const [labelIds, setLabelIds] = useState<string[]>([]);
  const [cycleId, setCycleId] = useState<string | undefined>(undefined);
  const [shouldCreateMore, setShouldCreateMore] = useState(false);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  // Sync state with initial values when they change
  useEffect(() => {
    if (open && initialIssueValues) {
      if (initialIssueValues.status) {
        setStatus(initialIssueValues.status);
      }
      if (initialIssueValues.assigneeId !== undefined) {
        setAssigneeId(initialIssueValues.assigneeId);
      }
    }
  }, [open, initialIssueValues]);

  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setTitle("");
        setDescription("");
        setStatus(initialIssueValues?.status ?? "queued");
        setPriority("none");
        setAssigneeId(initialIssueValues?.assigneeId ?? "8");
        setProjectId(undefined);
        setMilestoneId(undefined);
        setLabelIds([]);
        setCycleId(undefined);
        setShouldCreateMore(false);
        clearInitialIssueValues();
      }, 500);
    }
  }, [open, initialIssueValues, clearInitialIssueValues]);

  const handleTitleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      descriptionRef.current?.focus();
    }
  };

  const handleCreateIssue = useCallback(() => {
    // Validate title
    if (!title.trim()) {
      return; // Don't submit if title is empty
    }

    const selectedLabels = labels.filter((label) =>
      labelIds.includes(label.id)
    );
    const finalProjectId = projectId ?? "1";
    addIssue({
      id: `issue-${Date.now()}`,
      title: title.trim(),
      description,
      identifier: "", // Will be auto-generated in context
      status,
      assigneeId,
      labels: selectedLabels,
      projectId: finalProjectId,
      milestoneId,
      cycleId,
      priority,
    });
    setTitle("");
    setDescription("");
    setStatus(initialIssueValues?.status ?? "queued");
    setPriority("none");
    setAssigneeId(initialIssueValues?.assigneeId ?? "8");
    setProjectId(undefined);
    setMilestoneId(undefined);
    setLabelIds([]);
    setCycleId(undefined);
    if (!shouldCreateMore) {
      onClose();
    }
  }, [
    title,
    description,
    status,
    priority,
    assigneeId,
    projectId,
    milestoneId,
    labelIds,
    cycleId,
    labels,
    addIssue,
    onClose,
    shouldCreateMore,
    initialIssueValues,
  ]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogPortal>
        <DialogOverlay className="bg-black/60" />
        <DialogContent
          showCloseButton={false}
          className="top-[126px] translate-y-0 left-[50%] translate-x-[-50%] max-h-[80vh] p-0 gap-0 bg-card-bg border-border shadow-2xl shadow-black/50 flex flex-col rounded-md max-w-[750px]"
          aria-labelledby="new-issue-modal-title"
        >
          <DialogTitle className="sr-only">New issue</DialogTitle>
          <DialogDescription className="sr-only">New issue</DialogDescription>

          <header className="flex items-center justify-between px-3 pt-3 pb-[6px] flex-shrink-0">
            <div className="flex items-center gap-[6px] text-sm text-neutral-3">
              <div className="flex items-center gap-1 bg-badge-bg-2 border border-border pl-[6px] pr-2 h-6 rounded text-[12px] font-medium uppercase text-neutral-5">
                <div className="w-[14px] h-[14px] flex items-center justify-center">
                  <TaskIcon className="w-[11px] h-[11px]" />
                </div>
                <span>{teamIdentifier}</span>
              </div>
              <span className="text-[13px]">›</span>
              <span className="text-[13px]">New issue</span>
            </div>

            <div className="flex items-center gap-[6px] text-neutral-3">
              <button
                type="button"
                className="inline-flex h-7 w-7 items-center justify-center rounded-md hover:bg-hover-2 transition-colors cursor-pointer"
                aria-label="Open in full screen"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                className="inline-flex h-7 w-7 items-center justify-center rounded-md hover:bg-hover-2 transition-colors cursor-pointer"
                onClick={onClose}
                aria-label="Close modal"
              >
                <X className="w-4.5 h-4.5" />
              </button>
            </div>
          </header>

          <div className="px-[18px] flex-1 flex flex-col min-h-0">
            <input
              id="new-issue-modal-title"
              className="w-full bg-transparent text-[18px] leading-[24px] text-neutral-1 font-semibold placeholder:text-neutral-5 focus:outline-none flex-shrink-0 placeholder:opacity-80 h-7"
              placeholder="Issue title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              onKeyDown={handleTitleKeyDown}
              autoFocus
              autoComplete="off"
            />
            <div className="flex-1 min-h-0 overflow-y-auto">
              <ExpandingTextarea
                ref={descriptionRef}
                id="new-issue-modal-description"
                className="w-full bg-transparent text-[15px] leading-[38.5px] text-neutral-2 placeholder:text-neutral-5 focus:outline-none resize-none placeholder:opacity-80"
                placeholder="Add description..."
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                autoComplete="off"
              />
            </div>
          </div>

          <footer className="flex flex-col flex-shrink-0">
            <DropdownsArea
              status={status}
              onStatusChange={setStatus}
              priority={priority}
              onPriorityChange={setPriority}
              assigneeId={assigneeId}
              onAssigneeChange={setAssigneeId}
              projectId={projectId}
              onProjectChange={setProjectId}
              milestoneId={milestoneId}
              onMilestoneChange={setMilestoneId}
              labelIds={labelIds}
              onLabelsChange={setLabelIds}
              cycleId={cycleId}
              onCycleChange={setCycleId}
              users={users}
              labels={labels}
              cycles={cycles}
              projects={projects}
              milestones={milestones}
            />

            <div className="flex items-center justify-between border-t border-border p-3">
              <button
                type="button"
                className="inline-flex h-7 w-7 items-center justify-center rounded-md hover:bg-hover-5 transition-colors text-neutral-3 hover:text-neutral-4 cursor-pointer"
                aria-label="Attach files"
              >
                <Paperclip className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-3">
                <label className="flex items-center text-[12px] text-neutral-5 cursor-pointer select-none">
                  <button
                    type="button"
                    className={cn(
                      "relative inline-flex h-[14px] w-[22px] items-center rounded-full border border-border transition-colors mr-[6px] cursor-pointer",
                      shouldCreateMore ? "bg-[#5B5CE8]" : "bg-neutral-5"
                    )}
                    aria-pressed={shouldCreateMore}
                    onClick={() => setShouldCreateMore((prev) => !prev)}
                  >
                    <span
                      className={cn(
                        "inline-block h-[10px] w-[10px] transform rounded-full bg-white shadow transition-transform",
                        shouldCreateMore
                          ? "translate-x-[9px]"
                          : "translate-x-[1px]"
                      )}
                    />
                  </button>
                  <span>Create more</span>
                </label>

                <button
                  type="button"
                  className={cn(
                    "h-7 flex items-center justify-center px-[14px] rounded bg-[#5B5CE8] text-[12px] font-medium text-white transition-colors",
                    !title.trim()
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-[#696AF2] cursor-pointer"
                  )}
                  onClick={handleCreateIssue}
                  disabled={!title.trim()}
                >
                  Create issue
                </button>
              </div>
            </div>
          </footer>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
