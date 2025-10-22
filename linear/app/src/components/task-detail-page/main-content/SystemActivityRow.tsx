import { CurrentCycle, EditBoxLine } from "@/components/icons";
import { formatRelativeTime } from "@/lib/utils";

export default function SystemActivityRow({
  actor,
  description,
  createdAt,
  icon,
  assigneeAvatar,
}: {
  actor: string;
  description: string;
  createdAt: Date;
  icon: "avatar" | "cycle" | "edit";
  assigneeAvatar?: string;
}) {
  const fallbackInitials = actor.slice(0, 2).toUpperCase();

  return (
    <div className="flex items-center text-[13px] leading-[14.5px] text-neutral-3 mb-2">
      <div className="flex h-[14px] w-[14px] items-center justify-center rounded-full border border-border text-[11px] uppercase text-neutral-4 mx-[11px]">
        {icon === "cycle" ? (
          <CurrentCycle className="h-3 w-3 text-neutral-4" />
        ) : icon === "edit" ? (
          <EditBoxLine className="h-3 w-3 text-neutral-4" />
        ) : (
          assigneeAvatar ?? fallbackInitials
        )}
      </div>
      <div className="flex-1 leading-relaxed">
        <span>{actor}</span> <span>{description}</span>{" "}
        <span>· {formatRelativeTime(createdAt)}</span>
      </div>
    </div>
  );
}
