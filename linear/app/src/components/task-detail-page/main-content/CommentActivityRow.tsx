import Avatar from "@/components/common/Avatar";
import type { User, CommentEntry } from "@/lib/types";
import { formatRelativeTime } from "@/lib/utils";

export default function CommentActivityRow({
  comment,
  users,
}: {
  comment: CommentEntry;
  users: User[];
}) {
  const author = users.find((user) => user.id === "8");

  return (
    <div className="flex flex-col gap-2">
      <div className="inline-flex items-center gap-3">
        {author ? (
          <Avatar src={author.avatar} alt={author.name} size="sm" />
        ) : (
          <div className="flex h-[22px] w-[22px] items-center justify-center rounded-full border border-border text-[11px] text-neutral-4">
            {comment.authorId.slice(0, 2).toUpperCase()}
          </div>
        )}
        <span className="text-sm font-medium text-neutral-3">
          {author ? author.name : comment.authorId}
        </span>
        <span className="text-xs text-neutral-5">
          {formatRelativeTime(comment.createdAt)}
        </span>
      </div>
      <div className="rounded-2xl bg-hover-2 px-4 py-3 text-sm leading-relaxed text-neutral-2">
        {comment.content}
      </div>
    </div>
  );
}
