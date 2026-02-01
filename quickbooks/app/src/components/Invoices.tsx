import { Search, Filter, Plus, ChevronDown } from "lucide-react";
import type { Invoice, InvoiceStatus } from "../lib/types";
import { formatCurrency, formatDate, statusColor, classNames } from "../lib/utils";

interface InvoicesProps {
  invoices: Invoice[];
  search: string;
  statusFilter: InvoiceStatus | "all";
  onSearchChange: (q: string) => void;
  onFilterChange: (s: InvoiceStatus | "all") => void;
  onSelect: (id: string) => void;
  onCreateNew: () => void;
}

const statusOptions: (InvoiceStatus | "all")[] = [
  "all",
  "paid",
  "unpaid",
  "overdue",
  "partial",
  "draft",
];

export default function Invoices({
  invoices,
  search,
  statusFilter,
  onSearchChange,
  onFilterChange,
  onSelect,
  onCreateNew,
}: InvoicesProps) {
  const filtered = invoices.filter((inv) => {
    const matchesSearch =
      search === "" ||
      inv.customerName.toLowerCase().includes(search.toLowerCase()) ||
      inv.number.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || inv.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalFiltered = filtered.reduce((s, i) => s + i.total, 0);
  const totalBalance = filtered.reduce((s, i) => s + i.balance, 0);

  return (
    <div className="p-6 max-w-[1440px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Invoices</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage and track all customer invoices
          </p>
        </div>
        <button
          onClick={onCreateNew}
          className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors"
        >
          <Plus size={16} />
          New Invoice
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 mb-4">
        <div className="px-4 py-3 flex items-center gap-3 flex-wrap">
          <div className="relative flex-1 min-w-[200px]">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search invoices..."
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </div>
          <div className="relative">
            <Filter
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <select
              value={statusFilter}
              onChange={(e) =>
                onFilterChange(e.target.value as InvoiceStatus | "all")
              }
              className="appearance-none pl-8 pr-8 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 capitalize"
            >
              {statusOptions.map((s) => (
                <option key={s} value={s}>
                  {s === "all" ? "All Statuses" : s}
                </option>
              ))}
            </select>
            <ChevronDown
              size={14}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
          </div>
          <div className="text-xs text-gray-400 ml-auto">
            {filtered.length} invoice{filtered.length !== 1 ? "s" : ""} •{" "}
            Total: {formatCurrency(totalFiltered)} • Balance:{" "}
            {formatCurrency(totalBalance)}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">
                Invoice
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">
                Customer
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">
                Status
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">
                Due Date
              </th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase">
                Total
              </th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase">
                Balance
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((inv) => (
              <tr
                key={inv.id}
                onClick={() => onSelect(inv.id)}
                className="border-b border-gray-100 hover:bg-emerald-50/30 cursor-pointer transition-colors"
              >
                <td className="px-4 py-3 font-medium text-emerald-700">
                  {inv.number}
                </td>
                <td className="px-4 py-3 text-gray-700">{inv.customerName}</td>
                <td className="px-4 py-3">
                  <span
                    className={classNames(
                      "px-2 py-0.5 rounded-full text-xs font-semibold capitalize",
                      statusColor(inv.status),
                    )}
                  >
                    {inv.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-500">
                  {formatDate(inv.dueDate)}
                </td>
                <td className="px-4 py-3 text-right font-medium text-gray-900">
                  {formatCurrency(inv.total)}
                </td>
                <td
                  className={classNames(
                    "px-4 py-3 text-right font-semibold",
                    inv.balance > 0 ? "text-red-600" : "text-emerald-600",
                  )}
                >
                  {formatCurrency(inv.balance)}
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-12 text-center text-gray-400"
                >
                  No invoices found matching your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
