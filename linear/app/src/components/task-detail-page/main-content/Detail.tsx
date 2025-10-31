import { Paperclip, Plus, SmilePlus } from "lucide-react";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
} from "react";
import { useLinearState } from "@/context/LinearStateContext";
import Avatar from "@/components/common/Avatar";
import ExpandingTextarea from "@/components/common/ExpandingTextarea";
import { LongArrowUp } from "@/components/icons";
import { cn } from "@/lib/utils";
import type { Comment, Issue, SystemActivityEntry } from "@/lib/types";
import CommentActivityRow from "./CommentActivityRow";
import SystemActivityRow from "./SystemActivityRow";

export default function Detail({ issue }: { issue: Issue }) {
  const { users, updateIssue, addComment } = useLinearState();
  const assignee = useMemo(
    () => users.find((user) => user.id === issue.assigneeId),
    [users, issue.assigneeId]
  );
  const currentUser = users[0];

  const [commentInput, setCommentInput] = useState("");
  const descriptionTextareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!issue) {
      return;
    }
    setCommentInput("");
  }, [issue]);

  const activityItems: (SystemActivityEntry | Comment)[] = useMemo(() => {
    const issueActivities = (issue.activities ?? []).map((item) => ({
      ...item,
      type: "system" as const,
    })) as SystemActivityEntry[];
    const commentItems = (issue.comments ?? []).map((item) => ({
      ...item,
      type: "comment" as const,
    })) as Comment[];
    return [...issueActivities, ...commentItems].sort(
      (a, b) => a.createdAt.getTime() - b.createdAt.getTime()
    );
  }, [issue.activities, issue.comments]);

  const handleAddComment = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (!commentInput.trim()) return;
      if (!issue) return;

      const newComment: Comment = {
        id: `${issue.id}-comment-${Date.now()}`,
        authorId: currentUser?.id ?? "anonymous",
        content: commentInput.trim(),
        createdAt: new Date(),
      };

      addComment(issue.id, newComment as Comment);
      setCommentInput("");
    },
    [issue, currentUser, commentInput, addComment]
  );

  const handleTitleChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      updateIssue(issue.id, { title: event.target.value });
    },
    [issue.id, updateIssue]
  );

  const handleTitleBlur = useCallback(() => {
    if (!issue) return;
    const trimmed = issue.title?.trim() ?? "";
    if (trimmed === issue.title) return;
    updateIssue(issue.id, { title: trimmed });
  }, [issue, updateIssue]);

  const handleTitleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (event.key === "Enter") {
        event.preventDefault();
        event.currentTarget.blur();
        descriptionTextareaRef.current?.focus();
      }
    },
    []
  );

  const handleDescriptionChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      updateIssue(issue.id, { description: event.target.value });
    },
    [issue.id, updateIssue]
  );

  const handleDescriptionBlur = useCallback(() => {
    if (!issue) return;
    const trimmed = issue.description?.trim() ?? "";
    if (trimmed === issue.description) return;
    updateIssue(issue.id, { description: trimmed as string });
  }, [issue, updateIssue]);

  return (
    <div className="flex h-full w-full justify-center overflow-y-auto px-[60px]">
      <div className="flex w-full max-w-[805px] flex-col pb-20">
        <header className="flex flex-col gap-3 mt-8 mb-2 py-[6px]">
          <ExpandingTextarea
            value={issue.title}
            onChange={handleTitleChange}
            onBlur={handleTitleBlur}
            onKeyDown={handleTitleKeyDown}
            placeholder="Issue title..."
            className="w-full resize-none text-[24px] leading-[32px] font-semibold text-neutral-1 placeholder:text-neutral-5 focus:outline-none"
          />
        </header>

        <section className="flex flex-col">
          <ExpandingTextarea
            id="description"
            ref={descriptionTextareaRef}
            value={issue.description ?? ""}
            onChange={handleDescriptionChange}
            onBlur={handleDescriptionBlur}
            placeholder="Add description..."
            className="w-full resize-none pb-4 pt-[10px] text-[15px] leading-[31px] text-neutral-2 placeholder:text-neutral-5 focus:outline-none"
          />

          <div className="flex items-center justify-between text-sm text-neutral-4 px-1 mb-[14px]">
            <button
              type="button"
              className="h-7 w-7 inline-flex items-center gap-2 text-neutral-5 transition-colors hover:text-neutral-2 hover:cursor-pointer"
            >
              <SmilePlus className="h-4 w-4" />
            </button>
            <button
              type="button"
              className="inline-flex h-7 w-7 items-center justify-center rounded-full text-neutral-3 hover:text-neutral-4 transition-colors hover:bg-hover-4 hover:cursor-pointer"
              aria-label="Attach file"
            >
              <Paperclip className="h-4 w-4" />
            </button>
          </div>

          <div className="w-full px-[6px]">
            <button
              type="button"
              className="h-7 inline-flex items-center gap-2 text-neutral-5 transition-colors hover:text-neutral-2 hover:cursor-pointer mb-1 px-[6px]"
            >
              <Plus className="h-4 w-4 shrink-0" />
              <span className="text-xs whitespace-nowrap">Add sub-issues</span>
            </button>
          </div>
        </section>

        <hr className="border-border mt-4 mb-[18px]" />

        <section className="flex flex-col">
          <div className="flex items-center justify-between text-sm">
            <span className="text-[15px] leading-[23px] font-semibold text-neutral-4">
              Activity
            </span>

            <div className="flex items-center gap-1 text-neutral-5">
              <button
                type="button"
                className="inline-flex items-center gap-2 px-[14px] h-8 text-xs font-medium transition-colors hover:border-neutral-3 hover:text-neutral-2 hover:cursor-pointer"
              >
                Unsubscribe
              </button>
              <div className="w-8 h-8 flex items-center justify-center">
                {assignee ? (
                  <Avatar
                    src={assignee.avatar}
                    alt={assignee.name}
                    size="sm"
                    className="text-[11px]"
                  />
                ) : (
                  <div className="flex h-[18px] w-[18px] items-center justify-center rounded-full border border-border text-[11px] text-neutral-4">
                    {issue.identifier.slice(0, 2).toUpperCase()}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col mb-2 mt-4">
            {activityItems.map((item: SystemActivityEntry | Comment) =>
              "type" in item && item.type === "system" ? (
                <SystemActivityRow
                  key={item.id}
                  actor={(item as SystemActivityEntry).actor}
                  description={(item as SystemActivityEntry).description}
                  createdAt={item.createdAt}
                  icon={(item as SystemActivityEntry).icon}
                  assigneeAvatar={assignee?.avatar}
                />
              ) : "type" in item && item.type === "comment" ? (
                <CommentActivityRow
                  key={item.id}
                  comment={item as Comment}
                  users={users}
                />
              ) : null
            )}
          </div>
        </section>

        <form onSubmit={handleAddComment} className="flex flex-col gap-3">
          <div className="rounded-lg bg-badge-bg border border-badge-border-2 px-4 py-3 w-[calc(100%+15px)] relative left-1/2 -translate-x-1/2">
            <ExpandingTextarea
              value={commentInput}
              onChange={(event) => setCommentInput(event.target.value)}
              placeholder="Leave a comment..."
              className="w-full resize-none bg-transparent text-sm text-neutral-2 placeholder:text-neutral-6 focus:outline-none overflow-hidden"
            />

            <div className="mt-2 flex items-center justify-end gap-3 text-neutral-4">
              <button
                type="button"
                className="inline-flex h-6 w-6 items-center justify-center rounded-lg transition-colors hover:bg-hover-4 text-neutral-3 hover:text-neutral-4"
                aria-label="Attach file"
              >
                <Paperclip className="h-4 w-4" />
              </button>

              <button
                type="submit"
                className={cn(
                  "inline-flex h-6 w-6 items-center justify-center rounded-full bg-hover-5 text-white transition-colors",
                  !commentInput.trim() && "opacity-40"
                )}
                disabled={!commentInput.trim()}
                aria-label="Send comment"
              >
                <LongArrowUp className="h-4 w-4" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
