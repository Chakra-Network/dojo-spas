import { useMemo, useState } from "react";
import { cn, getPriorityColor } from "@/lib/utils";
import { useAppContext } from "@/context/AppProvider";
import {
  ClipboardList,
  Search,
  Filter,
  ChevronDown,
  Circle,
  CheckCircle2,
  Clock,
  AlertCircle,
  ArrowRight,
} from "lucide-react";
import { TASK_STATUS_OPTIONS, TASK_PRIORITY_OPTIONS } from "@/lib/consts";
import type { TaskStatus } from "@/lib/types";

export default function TasksInbox() {
  const {
    state,
    setTaskStatusFilter,
    setTaskPriorityFilter,
    updateTaskStatus,
    updateTaskProgress,
    addTab,
  } = useAppContext();
  const [searchTerm, setSearchTerm] = useState("");

  // Filter tasks
  const filteredTasks = useMemo(() => {
    let result = [...state.tasks];

    // Apply status filter
    if (state.taskStatusFilter !== "all") {
      result = result.filter((t) => t.status === state.taskStatusFilter);
    }

    // Apply priority filter
    if (state.taskPriorityFilter !== "all") {
      result = result.filter((t) => t.priority === state.taskPriorityFilter);
    }

    // Apply search
    if (searchTerm.trim()) {
      const search = searchTerm.toLowerCase();
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(search) ||
          t.description.toLowerCase().includes(search)
      );
    }

    // Sort by priority then status
    const priorityOrder = { Critical: 0, High: 1, Medium: 2, Low: 3 };
    const statusOrder = { Open: 0, "In Progress": 1, "On Hold": 2, Completed: 3, Cancelled: 4 };
    
    result.sort((a, b) => {
      const aStatus = statusOrder[a.status] ?? 5;
      const bStatus = statusOrder[b.status] ?? 5;
      if (aStatus !== bStatus) return aStatus - bStatus;
      
      const aPriority = priorityOrder[a.priority] ?? 4;
      const bPriority = priorityOrder[b.priority] ?? 4;
      return aPriority - bPriority;
    });

    return result;
  }, [state.tasks, state.taskStatusFilter, state.taskPriorityFilter, searchTerm]);

  // Group tasks by status
  const groupedTasks = useMemo(() => {
    const groups: Record<TaskStatus, typeof filteredTasks> = {
      Open: [],
      "In Progress": [],
      "On Hold": [],
      Completed: [],
      Cancelled: [],
    };
    filteredTasks.forEach((task) => {
      groups[task.status].push(task);
    });
    return groups;
  }, [filteredTasks]);

  const getStatusIcon = (status: TaskStatus) => {
    switch (status) {
      case "Open":
        return Circle;
      case "In Progress":
        return Clock;
      case "On Hold":
        return AlertCircle;
      case "Completed":
        return CheckCircle2;
      case "Cancelled":
        return Circle;
    }
  };

  const cycleStatus = (currentStatus: TaskStatus): TaskStatus => {
    const cycle: TaskStatus[] = ["Open", "In Progress", "On Hold", "Completed"];
    const currentIndex = cycle.indexOf(currentStatus);
    if (currentIndex === -1) return "Open";
    return cycle[(currentIndex + 1) % cycle.length];
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">My Tasks</h1>
        <p className="text-sm text-gray-500 mt-1">
          Track and manage your assigned tasks
        </p>
      </div>

      {/* Filters Bar */}
      <div className="bg-white rounded-xl shadow-sm border mb-6">
        <div className="flex flex-wrap items-center gap-4 p-4">
          {/* Search */}
          <div className="flex-1 min-w-[200px] relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search tasks..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0a6ed1]/20 focus:border-[#0a6ed1]"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <div className="relative">
              <select
                value={state.taskStatusFilter}
                onChange={(e) => setTaskStatusFilter(e.target.value)}
                className="appearance-none pl-3 pr-8 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0a6ed1]/20 focus:border-[#0a6ed1] bg-white"
              >
                <option value="all">All Status</option>
                {TASK_STATUS_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Priority Filter */}
          <div className="relative">
            <select
              value={state.taskPriorityFilter}
              onChange={(e) => setTaskPriorityFilter(e.target.value)}
              className="appearance-none pl-3 pr-8 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0a6ed1]/20 focus:border-[#0a6ed1] bg-white"
            >
              <option value="all">All Priority</option>
              {TASK_PRIORITY_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Results count */}
        <div className="px-4 pb-3 text-xs text-gray-500">
          Showing {filteredTasks.length} of {state.tasks.length} tasks
        </div>
      </div>

      {/* Task Groups */}
      <div className="space-y-6">
        {(Object.entries(groupedTasks) as [TaskStatus, typeof filteredTasks][]).map(
          ([status, tasks]) => {
            if (tasks.length === 0) return null;

            const StatusIcon = getStatusIcon(status);

            return (
              <div key={status} className="bg-white rounded-xl shadow-sm border overflow-hidden">
                {/* Group Header */}
                <div className="flex items-center justify-between px-5 py-3 bg-gray-50 border-b">
                  <div className="flex items-center gap-2">
                    <StatusIcon
                      className={cn(
                        "w-4 h-4",
                        status === "Completed" ? "text-green-600" : "text-gray-500"
                      )}
                    />
                    <span className="font-medium text-gray-900">{status}</span>
                    <span className="px-2 py-0.5 text-xs font-medium bg-gray-200 text-gray-600 rounded-full">
                      {tasks.length}
                    </span>
                  </div>
                </div>

                {/* Tasks */}
                <div className="divide-y">
                  {tasks.map((task) => {
                    const priorityColors = getPriorityColor(task.priority);
                    const isCompleted = task.status === "Completed";

                    return (
                      <div
                        key={task.id}
                        className="px-5 py-4 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-start gap-4">
                          {/* Status Toggle */}
                          <button
                            onClick={() => updateTaskStatus(task.id, cycleStatus(task.status))}
                            className="mt-0.5 flex-shrink-0 group"
                            title={`Click to change status (current: ${task.status})`}
                          >
                            {isCompleted ? (
                              <CheckCircle2 className="w-5 h-5 text-green-600 group-hover:text-green-700" />
                            ) : (
                              <Circle className="w-5 h-5 text-gray-300 group-hover:text-gray-400" />
                            )}
                          </button>

                          {/* Task Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <p
                                className={cn(
                                  "text-sm font-medium",
                                  isCompleted
                                    ? "text-gray-400 line-through"
                                    : "text-gray-900"
                                )}
                              >
                                {task.title}
                              </p>
                              <span
                                className={cn(
                                  "text-[10px] px-1.5 py-0.5 rounded font-medium",
                                  priorityColors.bg,
                                  priorityColors.text
                                )}
                              >
                                {task.priority}
                              </span>
                              <span className="text-[10px] px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded">
                                {task.type}
                              </span>
                              {task.tags.slice(0, 2).map((tag) => (
                                <span
                                  key={tag}
                                  className="text-[10px] px-1.5 py-0.5 bg-blue-50 text-blue-600 rounded"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                            <p className="text-xs text-gray-500 mt-1 line-clamp-1">
                              {task.description}
                            </p>
                            <div className="flex items-center gap-4 mt-2">
                              <span className="text-xs text-gray-500">
                                Due: {task.dueDate}
                              </span>
                              {task.relatedEntityId && task.relatedEntityType === "PurchaseOrder" && (
                                <button
                                  onClick={() =>
                                    addTab({
                                      id: `po-${task.relatedEntityId}`,
                                      type: "po-detail",
                                      dataId: task.relatedEntityId,
                                    })
                                  }
                                  className="text-xs text-[#0a6ed1] hover:underline flex items-center gap-1"
                                >
                                  View PO
                                  <ArrowRight className="w-3 h-3" />
                                </button>
                              )}
                            </div>
                          </div>

                          {/* Progress Chip */}
                          <div className="flex-shrink-0 w-24">
                            <div className="flex items-center gap-2">
                              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                  className={cn(
                                    "h-full progress-bar rounded-full",
                                    task.progress === 100
                                      ? "bg-green-500"
                                      : "bg-[#0a6ed1]"
                                  )}
                                  style={{ width: `${task.progress}%` }}
                                />
                              </div>
                              <span className="text-xs text-gray-500 w-8 text-right">
                                {task.progress}%
                              </span>
                            </div>
                            {/* Quick progress buttons */}
                            {task.status !== "Completed" && (
                              <div className="flex justify-end gap-1 mt-2">
                                {[25, 50, 75, 100].map((value) => (
                                  <button
                                    key={value}
                                    onClick={() => {
                                      updateTaskProgress(task.id, value);
                                      if (value === 100) {
                                        updateTaskStatus(task.id, "Completed");
                                      }
                                    }}
                                    className={cn(
                                      "text-[10px] px-1.5 py-0.5 rounded transition-colors",
                                      task.progress >= value
                                        ? "bg-[#0a6ed1] text-white"
                                        : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                                    )}
                                  >
                                    {value}%
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          }
        )}
      </div>

      {/* Empty State */}
      {filteredTasks.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border px-6 py-12 text-center">
          <ClipboardList className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-sm font-medium text-gray-900">No tasks found</p>
          <p className="text-xs text-gray-500 mt-1">
            Try adjusting your filter criteria
          </p>
        </div>
      )}
    </div>
  );
}
