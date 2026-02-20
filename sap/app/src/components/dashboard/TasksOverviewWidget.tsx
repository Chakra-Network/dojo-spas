import { cn, getPriorityColor } from "@/lib/utils";
import { useAppContext } from "@/context/AppProvider";
import { ClipboardList, ArrowRight, Circle, CheckCircle2 } from "lucide-react";

export default function TasksOverviewWidget() {
  const { state, addTab, updateTaskStatus } = useAppContext();

  // Get active tasks (not completed/cancelled)
  const activeTasks = state.tasks
    .filter((t) => t.status !== "Completed" && t.status !== "Cancelled")
    .sort((a, b) => {
      // Sort by priority then by due date
      const priorityOrder = { Critical: 0, High: 1, Medium: 2, Low: 3 };
      const aPriority = priorityOrder[a.priority] ?? 4;
      const bPriority = priorityOrder[b.priority] ?? 4;
      if (aPriority !== bPriority) return aPriority - bPriority;
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    })
    .slice(0, 5);

  const toggleTaskComplete = (taskId: string) => {
    const task = state.tasks.find((t) => t.id === taskId);
    if (task) {
      updateTaskStatus(taskId, task.status === "Completed" ? "Open" : "Completed");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-purple-100">
            <ClipboardList className="w-4 h-4 text-purple-600" />
          </div>
          <h3 className="font-medium text-gray-900">My Tasks</h3>
          {activeTasks.length > 0 && (
            <span className="px-2 py-0.5 text-xs font-medium bg-purple-100 text-purple-700 rounded-full">
              {activeTasks.length}
            </span>
          )}
        </div>
        <button
          onClick={() => addTab({ id: "tasks", type: "tasks" })}
          className="text-sm text-[#0a6ed1] hover:text-[#0858a6] font-medium flex items-center gap-1"
        >
          View All
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Task List */}
      <div className="divide-y">
        {activeTasks.map((task) => {
          const priorityColors = getPriorityColor(task.priority);
          const isCompleted = task.status === "Completed";

          return (
            <div
              key={task.id}
              className="px-5 py-3 flex items-start gap-3 hover:bg-gray-50 transition-colors"
            >
              {/* Checkbox */}
              <button
                onClick={() => toggleTaskComplete(task.id)}
                className="mt-0.5 flex-shrink-0"
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                ) : (
                  <Circle className="w-5 h-5 text-gray-300 hover:text-gray-400" />
                )}
              </button>

              {/* Task Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p
                    className={cn(
                      "text-sm font-medium truncate",
                      isCompleted ? "text-gray-400 line-through" : "text-gray-900"
                    )}
                  >
                    {task.title}
                  </p>
                  <span
                    className={cn(
                      "flex-shrink-0 text-[10px] px-1.5 py-0.5 rounded font-medium",
                      priorityColors.bg,
                      priorityColors.text
                    )}
                  >
                    {task.priority}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-gray-500">Due: {task.dueDate}</span>
                  {task.progress > 0 && task.progress < 100 && (
                    <div className="flex items-center gap-1">
                      <div className="w-12 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#0a6ed1] progress-bar rounded-full"
                          style={{ width: `${task.progress}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-gray-500">{task.progress}%</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Task Type Badge */}
              <span className="text-[10px] px-2 py-0.5 bg-gray-100 text-gray-600 rounded flex-shrink-0">
                {task.type}
              </span>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {activeTasks.length === 0 && (
        <div className="px-5 py-8 text-center">
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
            <CheckCircle2 className="w-6 h-6 text-green-600" />
          </div>
          <p className="text-sm font-medium text-gray-900">All done!</p>
          <p className="text-xs text-gray-500 mt-1">No active tasks</p>
        </div>
      )}
    </div>
  );
}
