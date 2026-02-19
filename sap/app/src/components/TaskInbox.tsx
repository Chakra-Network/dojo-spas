import {
  ClipboardCheck,
  Filter,
  RotateCcw,
  CheckCircle2,
  Clock,
  AlertCircle,
  PauseCircle,
  Inbox,
  FileText,
  Receipt,
  Wallet,
  Package,
  Users,
} from "lucide-react";
import { useAppContext } from "../store/AppProvider.tsx";
import type { TaskStatus, ApprovalTask } from "../types/index.ts";

const statusFilters: (TaskStatus | "All")[] = ["All", "Open", "In Progress", "Completed", "Deferred"];

const statusIcon: Record<string, typeof CheckCircle2> = {
  Open: AlertCircle,
  "In Progress": Clock,
  Completed: CheckCircle2,
  Deferred: PauseCircle,
};

const statusStyle: Record<string, string> = {
  Open: "bg-sap-critical/10 text-sap-critical",
  "In Progress": "bg-sap-informative/10 text-sap-informative",
  Completed: "bg-sap-positive/10 text-sap-positive",
  Deferred: "bg-gray-100 text-gray-500",
};

const priorityDot: Record<string, string> = {
  High: "bg-sap-negative",
  Medium: "bg-sap-critical",
  Low: "bg-sap-positive",
};

const typeIcon: Record<string, typeof FileText> = {
  "Purchase Order": FileText,
  Invoice: Receipt,
  "Budget Transfer": Wallet,
  "Material Request": Package,
  "Vendor Onboarding": Users,
};

function currencySymbol(c: string) {
  return c === "EUR" ? "€" : c === "GBP" ? "£" : "$";
}

function matchesSearch(t: ApprovalTask, q: string): boolean {
  if (!q) return true;
  const lower = q.toLowerCase();
  return (
    t.taskNumber.toLowerCase().includes(lower) ||
    t.title.toLowerCase().includes(lower) ||
    t.description.toLowerCase().includes(lower) ||
    t.assignee.toLowerCase().includes(lower) ||
    t.requester.toLowerCase().includes(lower) ||
    t.type.toLowerCase().includes(lower)
  );
}

export default function TaskInbox() {
  const { state, setTaskStatusFilter, toggleTaskStatus } = useAppContext();

  const filtered = state.tasks.filter((t) => {
    if (state.taskStatusFilter !== "All" && t.status !== state.taskStatusFilter) return false;
    return matchesSearch(t, state.searchQuery);
  });

  /* Summary counts */
  const counts = {
    open: state.tasks.filter((t) => t.status === "Open").length,
    inProgress: state.tasks.filter((t) => t.status === "In Progress").length,
    completed: state.tasks.filter((t) => t.status === "Completed").length,
    deferred: state.tasks.filter((t) => t.status === "Deferred").length,
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center gap-2">
        <ClipboardCheck size={20} className="text-sap-brand" />
        <h1 className="text-lg font-bold text-sap-text">My Approval Tasks</h1>
        <span className="rounded-full bg-sap-brand/10 px-2.5 py-0.5 text-xs font-bold text-sap-brand">{filtered.length}</span>
      </div>

      {/* Summary chips */}
      <div className="flex flex-wrap gap-2">
        <Chip label="Open" count={counts.open} color="text-sap-critical bg-sap-critical/10" />
        <Chip label="In Progress" count={counts.inProgress} color="text-sap-informative bg-sap-informative/10" />
        <Chip label="Completed" count={counts.completed} color="text-sap-positive bg-sap-positive/10" />
        <Chip label="Deferred" count={counts.deferred} color="text-gray-500 bg-gray-100" />
      </div>

      {/* Filter bar */}
      <div className="flex items-center gap-3 rounded-lg border border-sap-border bg-white p-3 shadow-sm">
        <Filter size={14} className="text-sap-text-secondary" />
        <label className="flex items-center gap-1.5 text-xs text-sap-text-secondary">
          Status
          <select
            value={state.taskStatusFilter}
            onChange={(e) => setTaskStatusFilter(e.target.value as TaskStatus | "All")}
            className="rounded border border-sap-border bg-sap-bg px-2 py-1 text-xs text-sap-text outline-none focus:border-sap-brand"
          >
            {statusFilters.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </label>
        {state.taskStatusFilter !== "All" && (
          <button onClick={() => setTaskStatusFilter("All")} className="text-xs font-medium text-sap-brand hover:underline">
            Clear
          </button>
        )}
      </div>

      {/* Task cards */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-sap-border bg-white py-16 shadow-sm">
          <Inbox size={48} className="mb-3 text-sap-text-secondary opacity-30" />
          <p className="text-sm font-medium text-sap-text-secondary">No tasks match your criteria</p>
          <p className="mt-1 text-xs text-sap-text-secondary">Try adjusting your filters or search terms.</p>
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((task) => (
            <TaskCard key={task.id} task={task} onToggle={() => toggleTaskStatus(task.id)} />
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------- Task card ---------- */

function TaskCard({ task, onToggle }: { task: ApprovalTask; onToggle: () => void }) {
  const StatusIcon = statusIcon[task.status] ?? AlertCircle;
  const TypeIcon = typeIcon[task.type] ?? FileText;

  const isDue = new Date(task.dueDate) <= new Date() && task.status !== "Completed";

  return (
    <div className="flex flex-col rounded-lg border border-sap-border bg-white shadow-sm transition-shadow hover:shadow-md">
      {/* Card header */}
      <div className="flex items-start gap-3 border-b border-sap-border/60 px-4 py-3">
        <div className={`mt-0.5 rounded-md p-1.5 ${statusStyle[task.status]}`}>
          <TypeIcon size={16} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-sap-text-secondary">{task.taskNumber}</span>
            <span className={`h-2 w-2 rounded-full ${priorityDot[task.priority]}`} title={task.priority} />
          </div>
          <p className="mt-0.5 truncate text-sm font-semibold text-sap-text">{task.title}</p>
        </div>
        <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${statusStyle[task.status]}`}>
          {task.status}
        </span>
      </div>

      {/* Body */}
      <div className="flex-1 px-4 py-3 text-xs text-sap-text-secondary">
        <p className="line-clamp-2">{task.description}</p>
        <div className="mt-3 grid grid-cols-2 gap-y-2">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-sap-text-secondary/70">Assignee</span>
            <p className="font-medium text-sap-text">{task.assignee}</p>
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-wider text-sap-text-secondary/70">Requester</span>
            <p className="font-medium text-sap-text">{task.requester}</p>
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-wider text-sap-text-secondary/70">Due</span>
            <p className={`font-medium ${isDue ? "text-sap-negative" : "text-sap-text"}`}>{task.dueDate}</p>
          </div>
          {task.amount > 0 && (
            <div>
              <span className="text-[10px] uppercase tracking-wider text-sap-text-secondary/70">Amount</span>
              <p className="font-medium text-sap-text">{currencySymbol(task.currency)}{task.amount.toLocaleString()}</p>
            </div>
          )}
        </div>
      </div>

      {/* Progress + action */}
      <div className="flex items-center gap-3 border-t border-sap-border/60 px-4 py-2.5">
        {/* Progress bar */}
        <div className="flex-1">
          <div className="mb-0.5 flex items-center justify-between text-[10px] text-sap-text-secondary">
            <span>Progress</span>
            <span className="font-semibold">{task.progress}%</span>
          </div>
          <div className="h-1.5 rounded-full bg-sap-border">
            <div
              className={`h-1.5 rounded-full transition-all ${task.progress === 100 ? "bg-sap-positive" : "bg-sap-brand"}`}
              style={{ width: `${task.progress}%` }}
            />
          </div>
        </div>
        <button
          onClick={onToggle}
          title="Cycle status"
          className="flex items-center gap-1 rounded-md border border-sap-border px-2.5 py-1.5 text-xs font-medium text-sap-text transition-colors hover:bg-sap-bg"
        >
          <RotateCcw size={12} />
          <StatusIcon size={12} />
        </button>
      </div>
    </div>
  );
}

/* ---------- Summary chip ---------- */

function Chip({ label, count, color }: { label: string; count: number; color: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${color}`}>
      {label}
      <span className="font-bold">{count}</span>
    </span>
  );
}
