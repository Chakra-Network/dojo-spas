import { Filter, ShoppingCart, ArrowUpDown } from "lucide-react";
import { useAppContext } from "../store/AppProvider.tsx";
import type { POStatus, Priority, PurchaseOrder } from "../types/index.ts";

const statuses: (POStatus | "All")[] = ["All", "Draft", "Pending Approval", "Approved", "Rejected", "In Delivery", "Received", "Cancelled"];
const priorities: (Priority | "All")[] = ["All", "High", "Medium", "Low"];

const statusColor: Record<string, string> = {
  "Pending Approval": "bg-sap-critical/10 text-sap-critical",
  Approved: "bg-sap-positive/10 text-sap-positive",
  Rejected: "bg-sap-negative/10 text-sap-negative",
  "In Delivery": "bg-sap-informative/10 text-sap-informative",
  Draft: "bg-gray-100 text-gray-500",
  Received: "bg-emerald-50 text-emerald-600",
  Cancelled: "bg-gray-100 text-gray-400",
};

const priorityBadge: Record<string, string> = {
  High: "bg-sap-negative/10 text-sap-negative",
  Medium: "bg-sap-critical/10 text-sap-critical",
  Low: "bg-sap-positive/10 text-sap-positive",
};

function currencySymbol(c: string) {
  return c === "EUR" ? "€" : c === "GBP" ? "£" : "$";
}

function matchesSearch(po: PurchaseOrder, q: string): boolean {
  if (!q) return true;
  const lower = q.toLowerCase();
  return (
    po.poNumber.toLowerCase().includes(lower) ||
    po.title.toLowerCase().includes(lower) ||
    po.vendor.name.toLowerCase().includes(lower) ||
    po.department.toLowerCase().includes(lower) ||
    po.requestor.toLowerCase().includes(lower)
  );
}

export default function PurchaseOrderList() {
  const { state, selectPO, setPOStatusFilter, setPOPriorityFilter } = useAppContext();

  const filtered = state.purchaseOrders.filter((po) => {
    if (state.poStatusFilter !== "All" && po.status !== state.poStatusFilter) return false;
    if (state.poPriorityFilter !== "All" && po.priority !== state.poPriorityFilter) return false;
    return matchesSearch(po, state.searchQuery);
  });

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShoppingCart size={20} className="text-sap-brand" />
          <h1 className="text-lg font-bold text-sap-text">Purchase Orders</h1>
          <span className="rounded-full bg-sap-brand/10 px-2.5 py-0.5 text-xs font-bold text-sap-brand">{filtered.length}</span>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 rounded-lg border border-sap-border bg-white p-3 shadow-sm">
        <Filter size={14} className="text-sap-text-secondary" />
        <label className="flex items-center gap-1.5 text-xs text-sap-text-secondary">
          Status
          <select
            value={state.poStatusFilter}
            onChange={(e) => setPOStatusFilter(e.target.value as POStatus | "All")}
            className="rounded border border-sap-border bg-sap-bg px-2 py-1 text-xs text-sap-text outline-none focus:border-sap-brand"
          >
            {statuses.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </label>
        <label className="flex items-center gap-1.5 text-xs text-sap-text-secondary">
          Priority
          <select
            value={state.poPriorityFilter}
            onChange={(e) => setPOPriorityFilter(e.target.value as Priority | "All")}
            className="rounded border border-sap-border bg-sap-bg px-2 py-1 text-xs text-sap-text outline-none focus:border-sap-brand"
          >
            {priorities.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </label>
        {(state.poStatusFilter !== "All" || state.poPriorityFilter !== "All") && (
          <button
            onClick={() => { setPOStatusFilter("All"); setPOPriorityFilter("All"); }}
            className="text-xs font-medium text-sap-brand hover:underline"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-lg border border-sap-border bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-sap-border bg-sap-bg/60 text-left text-xs font-semibold uppercase tracking-wider text-sap-text-secondary">
                <th className="px-4 py-3"><span className="flex items-center gap-1">PO Number <ArrowUpDown size={10} /></span></th>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Vendor</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Priority</th>
                <th className="px-4 py-3">Department</th>
                <th className="px-4 py-3 text-right">Amount</th>
                <th className="px-4 py-3">Required</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sap-border/50">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-12 text-center text-sap-text-secondary">
                    No purchase orders match your filters.
                  </td>
                </tr>
              ) : (
                filtered.map((po) => (
                  <tr
                    key={po.id}
                    onClick={() => selectPO(po.id)}
                    className="cursor-pointer transition-colors hover:bg-sap-bg/50"
                  >
                    <td className="px-4 py-3 font-semibold text-sap-brand">{po.poNumber}</td>
                    <td className="max-w-[220px] truncate px-4 py-3 text-sap-text">{po.title}</td>
                    <td className="px-4 py-3 text-sap-text">{po.vendor.name}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColor[po.status] ?? ""}`}>{po.status}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${priorityBadge[po.priority] ?? ""}`}>{po.priority}</span>
                    </td>
                    <td className="px-4 py-3 text-sap-text-secondary">{po.department}</td>
                    <td className="px-4 py-3 text-right font-semibold text-sap-text">
                      {currencySymbol(po.currency)}{po.totalAmount.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-sap-text-secondary">{po.requiredDate}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
