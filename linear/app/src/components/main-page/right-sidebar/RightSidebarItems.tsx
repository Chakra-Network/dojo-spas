import { cn } from "@/lib/utils";

interface MetricRowProps {
  label: string;
  value: number;
  percentage: string;
  color: string;
}

export function MetricRow({ label, value, percentage, color }: MetricRowProps) {
  return (
    <div
      className="grid grid-rows-2 gap-x-1 gap-y-0 text-xs"
      style={{ gridTemplateColumns: "auto 1fr" }}
    >
      <div
        className="w-[6px] h-[6px] rounded-xs self-center m-1"
        style={{ backgroundColor: color }}
      />
      <span className="text-neutral-5 self-center">{label}</span>
      <div />
      <div className="flex items-center gap-2">
        <span className="text-neutral-5">{value}</span>
        <span style={{ color }}>{percentage}</span>
      </div>
    </div>
  );
}

interface CircularProgressProps {
  percentage: number;
}

export function CircularProgress({ percentage }: CircularProgressProps) {
  const size = 16;
  const strokeWidth = 2;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <svg
      width={size}
      height={size}
      className="transform -rotate-90 shrink-0 mr-1"
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="var(--color-empty-progress)"
        strokeWidth={strokeWidth}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="var(--color-progress-1)"
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
      />
    </svg>
  );
}

export function RightSidebarTab({
  label,
  isActive,
}: {
  label: string;
  isActive: boolean;
}) {
  return (
    <button
      className={cn(
        "px-4.5 h-full flex-1 flex items-center justify-center text-xs leading-[15px] cursor-pointer whitespace-nowrap",
        isActive
          ? "text-neutral-4 bg-hover-1"
          : "text-neutral-5 hover:text-neutral-4"
      )}
    >
      {label}
    </button>
  );
}
