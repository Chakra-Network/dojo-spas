import { cn } from "@/lib/utils";
import type { POStatus, TaskStatus, TaskPriority } from "@/lib/types";

interface StatusBadgeProps {
  status: POStatus | TaskStatus | TaskPriority;
}

const statusStyles: Record<string, string> = {
  Draft: "bg-gray-100 text-gray-700 border-gray-200",
  "Pending Approval": "bg-yellow-100 text-yellow-700 border-yellow-200",
  Approved: "bg-green-100 text-green-700 border-green-200",
  Rejected: "bg-red-100 text-red-700 border-red-200",
  Ordered: "bg-blue-100 text-blue-700 border-blue-200",
  Delivered: "bg-purple-100 text-purple-700 border-purple-200",
  
  Pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
  "In Progress": "bg-blue-100 text-blue-700 border-blue-200",
  Completed: "bg-green-100 text-green-700 border-green-200",
  Cancelled: "bg-gray-100 text-gray-700 border-gray-200",
  
  Low: "bg-gray-100 text-gray-700 border-gray-200",
  Medium: "bg-blue-100 text-blue-700 border-blue-200",
  High: "bg-orange-100 text-orange-700 border-orange-200",
  Critical: "bg-red-100 text-red-700 border-red-200",
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
        statusStyles[status] || "bg-gray-100 text-gray-700 border-gray-200"
      )}
    >
      {status}
    </span>
  );
}

