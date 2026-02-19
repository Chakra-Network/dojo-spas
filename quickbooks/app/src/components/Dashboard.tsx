import {
  DollarSign,
  TrendingUp,
  Clock,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import type { Invoice, Expense, CashFlowEntry, ProfitLossEntry } from "../lib/types";
import { formatCurrency } from "../lib/utils";

interface DashboardProps {
  invoices: Invoice[];
  expenses: Expense[];
  cashFlow: CashFlowEntry[];
  profitLoss: ProfitLossEntry[];
}

export default function Dashboard({
  invoices,
  expenses,
  cashFlow,
  profitLoss,
}: DashboardProps) {
  const totalRevenue = profitLoss
    .filter((p) => p.type === "revenue")
    .reduce((s, p) => s + p.amount, 0);
  const totalExpenses = profitLoss
    .filter((p) => p.type === "expense")
    .reduce((s, p) => s + p.amount, 0);
  const netIncome = totalRevenue - totalExpenses;

  const outstandingInvoices = invoices.filter(
    (i) => i.status === "unpaid" || i.status === "overdue" || i.status === "partial",
  );
  const totalOutstanding = outstandingInvoices.reduce((s, i) => s + i.balance, 0);
  const overdueInvoices = invoices.filter((i) => i.status === "overdue");
  const totalOverdue = overdueInvoices.reduce((s, i) => s + i.balance, 0);
  const paidInvoices = invoices.filter((i) => i.status === "paid");
  const totalPaid = paidInvoices.reduce((s, i) => s + i.total, 0);

  const totalExpenseAmount = expenses.reduce((s, e) => s + e.amount, 0);

  const maxCashFlow = Math.max(...cashFlow.map((c) => Math.max(c.inflow, c.outflow)));

  // expense by category
  const categoryTotals = expenses.reduce<Record<string, number>>((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + e.amount;
    return acc;
  }, {});
  const sortedCategories = Object.entries(categoryTotals).sort(
    ([, a], [, b]) => b - a,
  );
  const maxCatAmount = sortedCategories[0]?.[1] || 1;

  const catColors: Record<string, string> = {
    payroll: "bg-emerald-500",
    insurance: "bg-blue-500",
    rent: "bg-violet-500",
    "professional-services": "bg-amber-500",
    equipment: "bg-rose-500",
    software: "bg-cyan-500",
    marketing: "bg-orange-500",
    travel: "bg-indigo-500",
    utilities: "bg-teal-500",
    "office-supplies": "bg-pink-500",
    meals: "bg-lime-500",
    other: "bg-gray-400",
  };

  const catLabels: Record<string, string> = {
    payroll: "Payroll",
    insurance: "Insurance",
    rent: "Rent",
    "professional-services": "Professional Services",
    equipment: "Equipment",
    software: "Software & Tools",
    marketing: "Marketing",
    travel: "Travel",
    utilities: "Utilities",
    "office-supplies": "Office Supplies",
    meals: "Meals",
    other: "Other",
  };

  return (
    <div className="p-6 max-w-[1440px] mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Financial Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">
          Overview of your business finances
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Total Revenue"
          value={formatCurrency(totalRevenue)}
          icon={<DollarSign size={18} />}
          iconBg="bg-emerald-100 text-emerald-600"
          trend={+8.2}
        />
        <KPICard
          title="Net Income"
          value={formatCurrency(netIncome)}
          icon={<TrendingUp size={18} />}
          iconBg="bg-blue-100 text-blue-600"
          trend={+12.5}
        />
        <KPICard
          title="Outstanding"
          value={formatCurrency(totalOutstanding)}
          icon={<Clock size={18} />}
          iconBg="bg-amber-100 text-amber-600"
          subtitle={`${outstandingInvoices.length} invoices`}
        />
        <KPICard
          title="Overdue"
          value={formatCurrency(totalOverdue)}
          icon={<AlertTriangle size={18} />}
          iconBg="bg-red-100 text-red-600"
          subtitle={`${overdueInvoices.length} invoices`}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cash Flow Chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="font-semibold text-gray-900 text-sm mb-4">
            Cash Flow — Last 6 Months
          </h3>
          <div className="space-y-3">
            {cashFlow.map((entry) => (
              <div key={entry.month} className="flex items-center gap-3">
                <span className="w-8 text-xs text-gray-500 font-medium">
                  {entry.month}
                </span>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <div
                      className="h-4 rounded-r bg-emerald-400 transition-all"
                      style={{
                        width: `${(entry.inflow / maxCashFlow) * 100}%`,
                      }}
                    />
                    <span className="text-xs text-gray-500 whitespace-nowrap">
                      {formatCurrency(entry.inflow)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className="h-4 rounded-r bg-red-300 transition-all"
                      style={{
                        width: `${(entry.outflow / maxCashFlow) * 100}%`,
                      }}
                    />
                    <span className="text-xs text-gray-500 whitespace-nowrap">
                      {formatCurrency(entry.outflow)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-4 mt-4 pt-3 border-t border-gray-100">
            <span className="flex items-center gap-1.5 text-xs text-gray-500">
              <span className="w-3 h-3 rounded bg-emerald-400" /> Inflow
            </span>
            <span className="flex items-center gap-1.5 text-xs text-gray-500">
              <span className="w-3 h-3 rounded bg-red-300" /> Outflow
            </span>
          </div>
        </div>

        {/* Profit & Loss Summary */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="font-semibold text-gray-900 text-sm mb-4">
            Profit & Loss Summary
          </h3>
          <div className="space-y-2">
            {/* Revenue section */}
            <div className="mb-3">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Revenue
              </p>
              {profitLoss
                .filter((p) => p.type === "revenue")
                .map((entry) => (
                  <div
                    key={entry.category}
                    className="flex items-center justify-between py-1.5"
                  >
                    <span className="text-sm text-gray-700">{entry.category}</span>
                    <span className="text-sm font-medium text-emerald-600">
                      {formatCurrency(entry.amount)}
                    </span>
                  </div>
                ))}
              <div className="flex items-center justify-between py-1.5 border-t border-gray-100 mt-1">
                <span className="text-sm font-semibold text-gray-900">
                  Total Revenue
                </span>
                <span className="text-sm font-bold text-emerald-600">
                  {formatCurrency(totalRevenue)}
                </span>
              </div>
            </div>

            {/* Expense section */}
            <div className="mb-3">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Expenses
              </p>
              {profitLoss
                .filter((p) => p.type === "expense")
                .map((entry) => (
                  <div
                    key={entry.category}
                    className="flex items-center justify-between py-1.5"
                  >
                    <span className="text-sm text-gray-700">{entry.category}</span>
                    <span className="text-sm font-medium text-red-500">
                      ({formatCurrency(entry.amount)})
                    </span>
                  </div>
                ))}
              <div className="flex items-center justify-between py-1.5 border-t border-gray-100 mt-1">
                <span className="text-sm font-semibold text-gray-900">
                  Total Expenses
                </span>
                <span className="text-sm font-bold text-red-500">
                  ({formatCurrency(totalExpenses)})
                </span>
              </div>
            </div>

            {/* Net */}
            <div className="flex items-center justify-between py-2 border-t-2 border-gray-900">
              <span className="text-sm font-bold text-gray-900">Net Income</span>
              <span
                className={`text-base font-bold ${netIncome >= 0 ? "text-emerald-600" : "text-red-600"}`}
              >
                {formatCurrency(netIncome)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Invoice Summary */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="font-semibold text-gray-900 text-sm mb-4">Invoice Summary</h3>
          <div className="space-y-3">
            <SummaryRow
              label="Paid"
              count={paidInvoices.length}
              amount={totalPaid}
              color="text-emerald-600"
            />
            <SummaryRow
              label="Outstanding"
              count={outstandingInvoices.length}
              amount={totalOutstanding}
              color="text-amber-600"
            />
            <SummaryRow
              label="Overdue"
              count={overdueInvoices.length}
              amount={totalOverdue}
              color="text-red-600"
            />
            <div className="border-t border-gray-100 pt-3">
              <SummaryRow
                label="Total Invoiced"
                count={invoices.length}
                amount={invoices.reduce((s, i) => s + i.total, 0)}
                color="text-gray-900"
                bold
              />
            </div>
          </div>
        </div>

        {/* Expenses by Category */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="font-semibold text-gray-900 text-sm mb-1">
            Expenses by Category
          </h3>
          <p className="text-xs text-gray-400 mb-4">
            Total: {formatCurrency(totalExpenseAmount)}
          </p>
          <div className="space-y-2.5">
            {sortedCategories.map(([cat, amount]) => (
              <div key={cat} className="flex items-center gap-3">
                <span className="w-28 text-xs text-gray-600 truncate">
                  {catLabels[cat] || cat}
                </span>
                <div className="flex-1 h-5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${catColors[cat] || "bg-gray-400"}`}
                    style={{ width: `${(amount / maxCatAmount) * 100}%` }}
                  />
                </div>
                <span className="w-24 text-xs text-gray-700 text-right font-medium">
                  {formatCurrency(amount)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Sub-components ───────────────────────────────────────────────
function KPICard({
  title,
  value,
  icon,
  iconBg,
  trend,
  subtitle,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  iconBg: string;
  trend?: number;
  subtitle?: string;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
          {title}
        </span>
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${iconBg}`}>
          {icon}
        </div>
      </div>
      <p className="text-xl font-bold text-gray-900">{value}</p>
      {trend !== undefined && (
        <div className="flex items-center gap-1 mt-1">
          {trend >= 0 ? (
            <ArrowUpRight size={14} className="text-emerald-500" />
          ) : (
            <ArrowDownRight size={14} className="text-red-500" />
          )}
          <span
            className={`text-xs font-medium ${trend >= 0 ? "text-emerald-600" : "text-red-600"}`}
          >
            {Math.abs(trend)}% vs last period
          </span>
        </div>
      )}
      {subtitle && (
        <p className="text-xs text-gray-400 mt-1">{subtitle}</p>
      )}
    </div>
  );
}

function SummaryRow({
  label,
  count,
  amount,
  color,
  bold,
}: {
  label: string;
  count: number;
  amount: number;
  color: string;
  bold?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span
          className={`text-sm ${bold ? "font-semibold text-gray-900" : "text-gray-600"}`}
        >
          {label}
        </span>
        <span className="text-xs text-gray-400">({count})</span>
      </div>
      <span className={`text-sm font-semibold ${color}`}>
        {formatCurrency(amount)}
      </span>
    </div>
  );
}
