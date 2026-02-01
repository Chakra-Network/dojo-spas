import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  ClipboardCheck,
  PieChart,
  Truck,
  Wallet,
  ArrowRight,
  AlertTriangle,
} from "lucide-react";
import { useAppContext } from "../store/AppProvider.tsx";
import type { PurchaseOrder, ApprovalTask } from "../types/index.ts";

/* ---------- KPI Card ---------- */

interface KPIProps {
  title: string;
  value: string;
  change: number;
  icon: typeof DollarSign;
  accent: string;
}

function KPICard({ title, value, change, icon: Icon, accent }: KPIProps) {
  const positive = change >= 0;
  return (
    <div className="rounded-lg border border-sap-border bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-sap-text-secondary">{title}</p>
          <p className="mt-1 text-2xl font-bold text-sap-text">{value}</p>
        </div>
        <div className={`rounded-lg p-2.5 ${accent}`}>
          <Icon size={20} className="text-white" />
        </div>
      </div>
      <div className="mt-3 flex items-center gap-1 text-xs font-medium">
        {positive ? <TrendingUp size={14} className="text-sap-positive" /> : <TrendingDown size={14} className="text-sap-negative" />}
        <span className={positive ? "text-sap-positive" : "text-sap-negative"}>
          {positive ? "+" : ""}
          {change}%
        </span>
        <span className="text-sap-text-secondary">vs last period</span>
      </div>
    </div>
  );
}

/* ---------- Mini table row ---------- */

function PORow({ po, onClick }: { po: PurchaseOrder; onClick: () => void }) {
  const statusColor: Record<string, string> = {
    "Pending Approval": "bg-sap-critical/10 text-sap-critical",
    Approved: "bg-sap-positive/10 text-sap-positive",
    Rejected: "bg-sap-negative/10 text-sap-negative",
    "In Delivery": "bg-sap-informative/10 text-sap-informative",
    Draft: "bg-gray-100 text-gray-500",
    Received: "bg-emerald-50 text-emerald-600",
    Cancelled: "bg-gray-100 text-gray-400",
  };

  return (
    <button onClick={onClick} className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm transition-colors hover:bg-sap-bg">
      <div className="flex-1 min-w-0">
        <p className="truncate font-medium text-sap-text">{po.poNumber}</p>
        <p className="truncate text-xs text-sap-text-secondary">{po.vendor.name}</p>
      </div>
      <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColor[po.status] ?? "bg-gray-100 text-gray-500"}`}>
        {po.status}
      </span>
      <span className="shrink-0 text-xs font-semibold text-sap-text">
        {po.currency === "EUR" ? "€" : po.currency === "GBP" ? "£" : "$"}
        {po.totalAmount.toLocaleString()}
      </span>
    </button>
  );
}

function TaskRow({ task }: { task: ApprovalTask }) {
  const priorityDot: Record<string, string> = { High: "bg-sap-negative", Medium: "bg-sap-critical", Low: "bg-sap-positive" };
  return (
    <div className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm">
      <span className={`h-2 w-2 shrink-0 rounded-full ${priorityDot[task.priority]}`} />
      <div className="flex-1 min-w-0">
        <p className="truncate font-medium text-sap-text">{task.title}</p>
        <p className="truncate text-xs text-sap-text-secondary">Due {task.dueDate}</p>
      </div>
      <span className="shrink-0 text-xs text-sap-text-secondary">{task.status}</span>
    </div>
  );
}

/* ---------- Dashboard ---------- */

export default function Dashboard() {
  const { state, selectPO, navigate } = useAppContext();
  const { kpis } = state;

  const pendingPOs = state.purchaseOrders.filter((po) => po.status === "Pending Approval");
  const openTasks = state.tasks.filter((t) => t.status === "Open" || t.status === "In Progress").slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-sap-text">Good morning, Dr. Richter</h1>
          <p className="text-sm text-sap-text-secondary">Here&rsquo;s your procurement overview for today.</p>
        </div>
        <span className="rounded-full bg-sap-shell/5 px-3 py-1 text-xs font-medium text-sap-shell">
          {new Date().toLocaleDateString("en-GB", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
        </span>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
        <KPICard title="Total Revenue" value={`€${(kpis.totalRevenue / 1e6).toFixed(1)}M`} change={kpis.revenueChange} icon={DollarSign} accent="bg-sap-brand" />
        <KPICard title="Open POs" value={String(kpis.openPOs)} change={kpis.openPOsChange} icon={ShoppingCart} accent="bg-sap-critical" />
        <KPICard title="Pending Approvals" value={String(kpis.pendingApprovals)} change={kpis.approvalsChange} icon={ClipboardCheck} accent="bg-sap-gold" />
        <KPICard title="Budget Utilization" value={`${kpis.budgetUtilization}%`} change={kpis.budgetChange} icon={PieChart} accent="bg-sap-highlight" />
        <KPICard title="Total Spend" value={`€${(kpis.totalSpend / 1e6).toFixed(2)}M`} change={kpis.spendChange} icon={Wallet} accent="bg-sap-shell" />
        <KPICard title="On-Time Delivery" value={`${kpis.onTimeDelivery}%`} change={kpis.deliveryChange} icon={Truck} accent="bg-sap-positive" />
      </div>

      {/* Lower panels */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Pending POs */}
        <div className="rounded-lg border border-sap-border bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-sap-border px-5 py-3">
            <div className="flex items-center gap-2">
              <AlertTriangle size={16} className="text-sap-critical" />
              <h2 className="text-sm font-semibold text-sap-text">POs Awaiting Approval</h2>
              <span className="ml-1 rounded-full bg-sap-critical/10 px-2 py-0.5 text-xs font-bold text-sap-critical">{pendingPOs.length}</span>
            </div>
            <button onClick={() => navigate("procurement")} className="flex items-center gap-1 text-xs font-medium text-sap-brand hover:underline">
              View all <ArrowRight size={12} />
            </button>
          </div>
          <div className="divide-y divide-sap-border/50">
            {pendingPOs.length === 0 ? (
              <p className="px-5 py-8 text-center text-sm text-sap-text-secondary">No pending approvals 🎉</p>
            ) : (
              pendingPOs.map((po) => <PORow key={po.id} po={po} onClick={() => selectPO(po.id)} />)
            )}
          </div>
        </div>

        {/* Open tasks */}
        <div className="rounded-lg border border-sap-border bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-sap-border px-5 py-3">
            <div className="flex items-center gap-2">
              <ClipboardCheck size={16} className="text-sap-brand" />
              <h2 className="text-sm font-semibold text-sap-text">Upcoming Tasks</h2>
              <span className="ml-1 rounded-full bg-sap-brand/10 px-2 py-0.5 text-xs font-bold text-sap-brand">{openTasks.length}</span>
            </div>
            <button onClick={() => navigate("tasks")} className="flex items-center gap-1 text-xs font-medium text-sap-brand hover:underline">
              View all <ArrowRight size={12} />
            </button>
          </div>
          <div className="divide-y divide-sap-border/50">
            {openTasks.length === 0 ? (
              <p className="px-5 py-8 text-center text-sm text-sap-text-secondary">All caught up!</p>
            ) : (
              openTasks.map((t) => <TaskRow key={t.id} task={t} />)
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
