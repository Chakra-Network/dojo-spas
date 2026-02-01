import {
  Search,
  Filter,
  Plus,
  ChevronDown,
  Paperclip,
  Eye,
} from "lucide-react";
import type { Expense, ExpenseCategory } from "../lib/types";
import { formatCurrency, formatDate, classNames } from "../lib/utils";
import { expenseCategoryLabels } from "../lib/consts";

interface ExpensesProps {
  expenses: Expense[];
  search: string;
  categoryFilter: ExpenseCategory | "all";
  onSearchChange: (q: string) => void;
  onFilterChange: (c: ExpenseCategory | "all") => void;
  onAddNew: () => void;
  onViewExpense: (expense: Expense) => void;
}

const categoryOptions: (ExpenseCategory | "all")[] = [
  "all",
  "office-supplies",
  "travel",
  "utilities",
  "rent",
  "payroll",
  "marketing",
  "software",
  "insurance",
  "meals",
  "equipment",
  "professional-services",
  "other",
];

const categoryColors: Record<string, string> = {
  "office-supplies": "bg-pink-100 text-pink-700",
  travel: "bg-indigo-100 text-indigo-700",
  utilities: "bg-teal-100 text-teal-700",
  rent: "bg-violet-100 text-violet-700",
  payroll: "bg-emerald-100 text-emerald-700",
  marketing: "bg-orange-100 text-orange-700",
  software: "bg-cyan-100 text-cyan-700",
  insurance: "bg-blue-100 text-blue-700",
  meals: "bg-lime-100 text-lime-700",
  equipment: "bg-rose-100 text-rose-700",
  "professional-services": "bg-amber-100 text-amber-700",
  other: "bg-gray-100 text-gray-600",
};

export default function Expenses({
  expenses,
  search,
  categoryFilter,
  onSearchChange,
  onFilterChange,
  onAddNew,
  onViewExpense,
}: ExpensesProps) {
  const filtered = expenses.filter((exp) => {
    const matchesSearch =
      search === "" ||
      exp.vendor.toLowerCase().includes(search.toLowerCase()) ||
      exp.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || exp.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const totalFiltered = filtered.reduce((s, e) => s + e.amount, 0);

  return (
    <div className="p-6 max-w-[1440px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Expenses</h1>
          <p className="text-sm text-gray-500 mt-1">
            Track and categorize business expenses
          </p>
        </div>
        <button
          onClick={onAddNew}
          className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors"
        >
          <Plus size={16} />
          Add Expense
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
              placeholder="Search expenses..."
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
              value={categoryFilter}
              onChange={(e) =>
                onFilterChange(e.target.value as ExpenseCategory | "all")
              }
              className="appearance-none pl-8 pr-8 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            >
              {categoryOptions.map((c) => (
                <option key={c} value={c}>
                  {c === "all"
                    ? "All Categories"
                    : expenseCategoryLabels[c] || c}
                </option>
              ))}
            </select>
            <ChevronDown
              size={14}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
          </div>
          <div className="text-xs text-gray-400 ml-auto">
            {filtered.length} expense{filtered.length !== 1 ? "s" : ""} •{" "}
            Total: {formatCurrency(totalFiltered)}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">
                Date
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">
                Vendor
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">
                Category
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">
                Description
              </th>
              <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase">
                Receipt
              </th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase">
                Amount
              </th>
              <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase w-16">
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((exp) => (
              <tr
                key={exp.id}
                className="border-b border-gray-100 hover:bg-emerald-50/30 transition-colors"
              >
                <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                  {formatDate(exp.date)}
                </td>
                <td className="px-4 py-3 font-medium text-gray-800">
                  {exp.vendor}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={classNames(
                      "px-2 py-0.5 rounded-full text-xs font-semibold",
                      categoryColors[exp.category] || "bg-gray-100 text-gray-600",
                    )}
                  >
                    {expenseCategoryLabels[exp.category] || exp.category}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-600 max-w-[240px] truncate">
                  {exp.description}
                </td>
                <td className="px-4 py-3 text-center">
                  {exp.receiptUrl ? (
                    <span className="inline-flex items-center gap-1 text-xs text-emerald-600">
                      <Paperclip size={12} />
                      {exp.receiptName}
                    </span>
                  ) : (
                    <span className="text-xs text-gray-300">—</span>
                  )}
                </td>
                <td className="px-4 py-3 text-right font-semibold text-gray-900">
                  {formatCurrency(exp.amount)}
                </td>
                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => onViewExpense(exp)}
                    className="p-1 rounded hover:bg-gray-100 text-gray-400 hover:text-gray-600"
                  >
                    <Eye size={14} />
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-12 text-center text-gray-400"
                >
                  No expenses found matching your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
