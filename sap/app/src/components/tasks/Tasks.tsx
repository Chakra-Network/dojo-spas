import { useState } from "react";
import { useAppContext } from "@/context/AppProvider";
import { formatCurrency, getDaysUntil } from "@/lib/utils";
import StatusBadge from "../common/StatusBadge";
import { 
  CheckSquare, 
  Filter, 
  X,
  AlertCircle,
  Clock,
  CheckCircle2,
  XCircle
} from "lucide-react";
import type { TaskStatus, TaskPriority } from "@/lib/types";

export default function Tasks() {
  const { state, getFilteredTasks, setTaskFilters, updateTaskStatus, setCurrentSection, selectPO } = useAppContext();
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  
  const filteredTasks = getFilteredTasks();
  const selectedTask = filteredTasks.find(t => t.id === selectedTaskId);

  const statuses: (TaskStatus | "All")[] = ["All", "Pending", "In Progress", "Completed", "Cancelled"];
  const priorities: (TaskPriority | "All")[] = ["All", "Low", "Medium", "High", "Critical"];

  const hasActiveFilters = 
    state.taskFilters.status !== "All" || 
    state.taskFilters.priority !== "All";

  const clearFilters = () => {
    setTaskFilters({ status: "All", priority: "All" });
  };

  const handleStatusChange = (taskId: string, status: TaskStatus) => {
    updateTaskStatus(taskId, status);
  };

  const handleViewReference = (task: typeof selectedTask) => {
    if (!task) return;
    
    if (task.type === "Purchase Order") {
      setCurrentSection("procurement");
      selectPO(task.referenceId);
    }
  };

  const getPriorityIcon = (priority: TaskPriority) => {
    switch (priority) {
      case "Critical":
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case "High":
        return <AlertCircle className="w-4 h-4 text-orange-500" />;
      case "Medium":
        return <Clock className="w-4 h-4 text-blue-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Approval Tasks</h1>
        <p className="text-gray-600 mt-1">Review and process approval requests</p>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-3">
          <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <h3 className="font-semibold text-gray-900">Filters</h3>
              </div>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1"
                >
                  <X className="w-4 h-4" />
                  Clear
                </button>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={state.taskFilters.status}
                onChange={(e) => setTaskFilters({ status: e.target.value as TaskStatus | "All" })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00a9e0] focus:border-transparent"
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Priority
              </label>
              <select
                value={state.taskFilters.priority}
                onChange={(e) => setTaskFilters({ priority: e.target.value as TaskPriority | "All" })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00a9e0] focus:border-transparent"
              >
                {priorities.map((priority) => (
                  <option key={priority} value={priority}>
                    {priority}
                  </option>
                ))}
              </select>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Total Tasks</span>
                  <span className="font-semibold text-gray-900">{filteredTasks.length}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Pending</span>
                  <span className="font-semibold text-yellow-600">
                    {filteredTasks.filter(t => t.status === "Pending").length}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Completed</span>
                  <span className="font-semibold text-green-600">
                    {filteredTasks.filter(t => t.status === "Completed").length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-9">
          <div className="bg-white border border-gray-200 rounded-lg">
            {filteredTasks.length === 0 ? (
              <div className="text-center py-12">
                <CheckSquare className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-500 mb-2">No tasks found</p>
                <p className="text-sm text-gray-400">
                  {hasActiveFilters 
                    ? "Try adjusting your filters"
                    : "All approval tasks will appear here"}
                </p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {filteredTasks.map((task) => {
                  const daysUntil = getDaysUntil(task.dueDate);
                  const isOverdue = daysUntil < 0 && task.status !== "Completed";
                  const isDueSoon = daysUntil >= 0 && daysUntil <= 2 && task.status !== "Completed";
                  const isSelected = selectedTaskId === task.id;

                  return (
                    <div
                      key={task.id}
                      className={`p-6 cursor-pointer transition-colors ${
                        isSelected ? "bg-blue-50 border-l-4 border-l-[#00a9e0]" : "hover:bg-gray-50"
                      }`}
                      onClick={() => setSelectedTaskId(isSelected ? null : task.id)}
                    >
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            {getPriorityIcon(task.priority)}
                            <h3 className="font-semibold text-gray-900">{task.title}</h3>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{task.description}</p>
                          
                          <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                            <span className="flex items-center gap-1">
                              Type: <span className="font-medium">{task.type}</span>
                            </span>
                            <span>•</span>
                            <span>Requested by {task.requestedBy}</span>
                            <span>•</span>
                            <span className={isOverdue ? "text-red-600 font-medium" : isDueSoon ? "text-orange-600 font-medium" : ""}>
                              Due: {new Date(task.dueDate).toLocaleDateString("de-DE")}
                              {isOverdue && " (Overdue)"}
                              {isDueSoon && " (Due Soon)"}
                            </span>
                          </div>

                          <div className="flex items-center gap-3">
                            <StatusBadge status={task.status} />
                            <StatusBadge status={task.priority} />
                            {task.amount && (
                              <span className="text-sm font-semibold text-gray-900">
                                {formatCurrency(task.amount, task.currency)}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {isSelected && task.status !== "Completed" && task.status !== "Cancelled" && (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleStatusChange(task.id, "In Progress");
                              }}
                              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                            >
                              <Clock className="w-4 h-4" />
                              Start Review
                            </button>
                            
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleStatusChange(task.id, "Completed");
                              }}
                              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                            >
                              <CheckCircle2 className="w-4 h-4" />
                              Approve
                            </button>
                            
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleStatusChange(task.id, "Cancelled");
                              }}
                              className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm"
                            >
                              <XCircle className="w-4 h-4" />
                              Cancel
                            </button>

                            {task.type === "Purchase Order" && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleViewReference(task);
                                }}
                                className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                              >
                                View PO Details
                              </button>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

