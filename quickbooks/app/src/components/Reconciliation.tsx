import {
  CheckCircle2,
  XCircle,
  AlertCircle,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
  Link2,
  Ban,
} from "lucide-react";
import type { BankTransaction, Invoice, Expense } from "../lib/types";
import { formatCurrency, formatDate, statusColor, classNames } from "../lib/utils";

interface ReconciliationProps {
  transactions: BankTransaction[];
  invoices: Invoice[];
  expenses: Expense[];
  step: number;
  onStepChange: (step: number) => void;
  onMatch: (transactionId: string, entryId: string, entryType: "invoice" | "expense") => void;
  onExclude: (transactionId: string) => void;
}

const steps = [
  { id: 0, label: "Review Transactions" },
  { id: 1, label: "Match Entries" },
  { id: 2, label: "Summary" },
];

export default function Reconciliation({
  transactions,
  invoices,
  expenses,
  step,
  onStepChange,
  onMatch,
  onExclude,
}: ReconciliationProps) {
  const matched = transactions.filter((t) => t.reconciliationStatus === "matched");
  const unmatched = transactions.filter((t) => t.reconciliationStatus === "unmatched");
  const excluded = transactions.filter((t) => t.reconciliationStatus === "excluded");

  const totalDeposits = transactions
    .filter((t) => t.amount > 0)
    .reduce((s, t) => s + t.amount, 0);
  const totalWithdrawals = transactions
    .filter((t) => t.amount < 0)
    .reduce((s, t) => s + Math.abs(t.amount), 0);
  const unmatchedTotal = unmatched.reduce(
    (s, t) => s + Math.abs(t.amount),
    0,
  );

  return (
    <div className="p-6 max-w-[1440px] mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Bank Reconciliation</h1>
        <p className="text-sm text-gray-500 mt-1">
          Match bank transactions against recorded entries
        </p>
      </div>

      {/* Stepper */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
        <div className="flex items-center gap-2">
          {steps.map((s, idx) => (
            <div key={s.id} className="flex items-center gap-2">
              <button
                onClick={() => onStepChange(s.id)}
                className={classNames(
                  "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                  step === s.id
                    ? "bg-emerald-600 text-white"
                    : step > s.id
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-gray-100 text-gray-500",
                )}
              >
                <span
                  className={classNames(
                    "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold",
                    step === s.id
                      ? "bg-white/20 text-white"
                      : step > s.id
                        ? "bg-emerald-200 text-emerald-800"
                        : "bg-gray-200 text-gray-500",
                  )}
                >
                  {step > s.id ? "✓" : idx + 1}
                </span>
                {s.label}
              </button>
              {idx < steps.length - 1 && (
                <ChevronRight size={16} className="text-gray-300" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      {step === 0 && (
        <StepReview
          transactions={transactions}
          onNext={() => onStepChange(1)}
          totalDeposits={totalDeposits}
          totalWithdrawals={totalWithdrawals}
        />
      )}

      {step === 1 && (
        <StepMatch
          unmatched={unmatched}
          invoices={invoices}
          expenses={expenses}
          onMatch={onMatch}
          onExclude={onExclude}
          onNext={() => onStepChange(2)}
          onBack={() => onStepChange(0)}
        />
      )}

      {step === 2 && (
        <StepSummary
          matched={matched}
          unmatched={unmatched}
          excluded={excluded}
          unmatchedTotal={unmatchedTotal}
          totalDeposits={totalDeposits}
          totalWithdrawals={totalWithdrawals}
          onBack={() => onStepChange(1)}
        />
      )}
    </div>
  );
}

// ── Step 1: Review ───────────────────────────────────────────────
function StepReview({
  transactions,
  onNext,
  totalDeposits,
  totalWithdrawals,
}: {
  transactions: BankTransaction[];
  onNext: () => void;
  totalDeposits: number;
  totalWithdrawals: number;
}) {
  return (
    <div className="space-y-4">
      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs text-gray-500 font-medium uppercase mb-1">
            Total Deposits
          </p>
          <p className="text-lg font-bold text-emerald-600">
            {formatCurrency(totalDeposits)}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs text-gray-500 font-medium uppercase mb-1">
            Total Withdrawals
          </p>
          <p className="text-lg font-bold text-red-500">
            {formatCurrency(totalWithdrawals)}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs text-gray-500 font-medium uppercase mb-1">
            Net Movement
          </p>
          <p
            className={classNames(
              "text-lg font-bold",
              totalDeposits - totalWithdrawals >= 0
                ? "text-emerald-600"
                : "text-red-500",
            )}
          >
            {formatCurrency(totalDeposits - totalWithdrawals)}
          </p>
        </div>
      </div>

      {/* Transaction list */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">
                Date
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">
                Description
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">
                Status
              </th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t) => (
              <tr key={t.id} className="border-b border-gray-100">
                <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                  {formatDate(t.date)}
                </td>
                <td className="px-4 py-3 text-gray-800 font-medium">
                  {t.description}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={classNames(
                      "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold",
                      statusColor(t.reconciliationStatus),
                    )}
                  >
                    {t.reconciliationStatus === "matched" && (
                      <CheckCircle2 size={10} />
                    )}
                    {t.reconciliationStatus === "unmatched" && (
                      <AlertCircle size={10} />
                    )}
                    {t.reconciliationStatus === "excluded" && (
                      <XCircle size={10} />
                    )}
                    {t.reconciliationStatus}
                  </span>
                </td>
                <td
                  className={classNames(
                    "px-4 py-3 text-right font-semibold",
                    t.amount >= 0 ? "text-emerald-600" : "text-red-500",
                  )}
                >
                  {t.amount >= 0 ? (
                    <span className="inline-flex items-center gap-0.5">
                      <ArrowUpRight size={12} />
                      {formatCurrency(t.amount)}
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-0.5">
                      <ArrowDownRight size={12} />
                      {formatCurrency(Math.abs(t.amount))}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end">
        <button
          onClick={onNext}
          className="px-5 py-2.5 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors"
        >
          Continue to Matching →
        </button>
      </div>
    </div>
  );
}

// ── Step 2: Match ────────────────────────────────────────────────
function StepMatch({
  unmatched,
  invoices,
  expenses,
  onMatch,
  onExclude,
  onNext,
  onBack,
}: {
  unmatched: BankTransaction[];
  invoices: Invoice[];
  expenses: Expense[];
  onMatch: (tid: string, eid: string, etype: "invoice" | "expense") => void;
  onExclude: (tid: string) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  if (unmatched.length === 0) {
    return (
      <div className="space-y-4">
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <CheckCircle2 size={48} className="mx-auto text-emerald-500 mb-3" />
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            All Matched!
          </h3>
          <p className="text-sm text-gray-500">
            All bank transactions have been reconciled.
          </p>
        </div>
        <div className="flex justify-between">
          <button
            onClick={onBack}
            className="px-5 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-800"
          >
            ← Back
          </button>
          <button
            onClick={onNext}
            className="px-5 py-2.5 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors"
          >
            View Summary →
          </button>
        </div>
      </div>
    );
  }

  // Build suggested matches
  const suggestions = unmatched.map((t) => {
    const candidates: { id: string; type: "invoice" | "expense"; label: string; amount: number }[] = [];
    if (t.amount > 0) {
      invoices
        .filter((inv) => Math.abs(inv.total - t.amount) < 1 || Math.abs(inv.amountPaid + t.amount - inv.total) < 1)
        .forEach((inv) =>
          candidates.push({
            id: inv.id,
            type: "invoice",
            label: `${inv.number} — ${inv.customerName}`,
            amount: inv.total,
          }),
        );
    } else {
      expenses
        .filter((exp) => Math.abs(exp.amount - Math.abs(t.amount)) < 1)
        .forEach((exp) =>
          candidates.push({
            id: exp.id,
            type: "expense",
            label: `${exp.vendor} — ${exp.description}`,
            amount: exp.amount,
          }),
        );
    }
    return { transaction: t, candidates };
  });

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-500">
        {unmatched.length} unmatched transaction{unmatched.length !== 1 ? "s" : ""}{" "}
        remaining. Match or exclude each one.
      </p>

      <div className="space-y-3">
        {suggestions.map(({ transaction, candidates }) => (
          <div
            key={transaction.id}
            className="bg-white rounded-xl border border-gray-200 p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {transaction.description}
                </p>
                <p className="text-xs text-gray-400">
                  {formatDate(transaction.date)}
                </p>
              </div>
              <span
                className={classNames(
                  "text-base font-bold",
                  transaction.amount >= 0
                    ? "text-emerald-600"
                    : "text-red-500",
                )}
              >
                {formatCurrency(Math.abs(transaction.amount))}
              </span>
            </div>

            {candidates.length > 0 ? (
              <div className="space-y-2">
                <p className="text-xs text-gray-400 font-medium">
                  Suggested matches:
                </p>
                {candidates.map((c) => (
                  <div
                    key={c.id}
                    className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={classNames(
                          "px-1.5 py-0.5 rounded text-xs font-semibold",
                          c.type === "invoice"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-purple-100 text-purple-700",
                        )}
                      >
                        {c.type}
                      </span>
                      <span className="text-sm text-gray-700">{c.label}</span>
                    </div>
                    <button
                      onClick={() =>
                        onMatch(transaction.id, c.id, c.type)
                      }
                      className="flex items-center gap-1 text-xs font-medium text-emerald-600 hover:text-emerald-700"
                    >
                      <Link2 size={12} />
                      Match
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-gray-400 italic">
                No matching entries found.
              </p>
            )}

            <div className="mt-3 pt-2 border-t border-gray-100">
              <button
                onClick={() => onExclude(transaction.id)}
                className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 font-medium"
              >
                <Ban size={12} />
                Exclude from reconciliation
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="px-5 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-800"
        >
          ← Back
        </button>
        <button
          onClick={onNext}
          className="px-5 py-2.5 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors"
        >
          View Summary →
        </button>
      </div>
    </div>
  );
}

// ── Step 3: Summary ──────────────────────────────────────────────
function StepSummary({
  matched,
  unmatched,
  excluded,
  unmatchedTotal,
  totalDeposits,
  totalWithdrawals,
  onBack,
}: {
  matched: BankTransaction[];
  unmatched: BankTransaction[];
  excluded: BankTransaction[];
  unmatchedTotal: number;
  totalDeposits: number;
  totalWithdrawals: number;
  onBack: () => void;
}) {
  const allResolved = unmatched.length === 0;

  return (
    <div className="space-y-4">
      {/* Summary Banner */}
      <div
        className={classNames(
          "rounded-xl p-6 text-center border",
          allResolved
            ? "bg-emerald-50 border-emerald-200"
            : "bg-amber-50 border-amber-200",
        )}
      >
        {allResolved ? (
          <>
            <CheckCircle2 size={40} className="mx-auto text-emerald-500 mb-2" />
            <h3 className="text-lg font-semibold text-emerald-900">
              Reconciliation Complete
            </h3>
            <p className="text-sm text-emerald-700 mt-1">
              All transactions have been matched or excluded.
            </p>
          </>
        ) : (
          <>
            <AlertCircle size={40} className="mx-auto text-amber-500 mb-2" />
            <h3 className="text-lg font-semibold text-amber-900">
              Unresolved Differences
            </h3>
            <p className="text-sm text-amber-700 mt-1">
              {unmatched.length} transaction{unmatched.length !== 1 ? "s" : ""}{" "}
              totaling {formatCurrency(unmatchedTotal)} remain unmatched.
            </p>
          </>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          label="Total Transactions"
          value={String(matched.length + unmatched.length + excluded.length)}
        />
        <StatCard
          label="Matched"
          value={String(matched.length)}
          color="text-emerald-600"
        />
        <StatCard
          label="Unmatched"
          value={String(unmatched.length)}
          color="text-amber-600"
        />
        <StatCard
          label="Excluded"
          value={String(excluded.length)}
          color="text-gray-400"
        />
      </div>

      {/* Balances */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="font-semibold text-gray-900 text-sm mb-3">
          Balance Summary
        </h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Total Deposits</span>
            <span className="font-medium text-emerald-600">
              {formatCurrency(totalDeposits)}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Total Withdrawals</span>
            <span className="font-medium text-red-500">
              ({formatCurrency(totalWithdrawals)})
            </span>
          </div>
          <div className="flex justify-between text-sm border-t border-gray-100 pt-2">
            <span className="font-semibold text-gray-900">Net Movement</span>
            <span className="font-bold text-gray-900">
              {formatCurrency(totalDeposits - totalWithdrawals)}
            </span>
          </div>
          {unmatchedTotal > 0 && (
            <div className="flex justify-between text-sm border-t border-gray-100 pt-2">
              <span className="font-semibold text-amber-700">
                Unresolved Amount
              </span>
              <span className="font-bold text-amber-600">
                {formatCurrency(unmatchedTotal)}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Unmatched details */}
      {unmatched.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-200 bg-amber-50">
            <h3 className="text-sm font-semibold text-amber-800">
              Unresolved Transactions
            </h3>
          </div>
          <table className="w-full text-sm">
            <tbody>
              {unmatched.map((t) => (
                <tr key={t.id} className="border-b border-gray-100">
                  <td className="px-4 py-3 text-gray-500">
                    {formatDate(t.date)}
                  </td>
                  <td className="px-4 py-3 text-gray-800 font-medium">
                    {t.description}
                  </td>
                  <td
                    className={classNames(
                      "px-4 py-3 text-right font-semibold",
                      t.amount >= 0 ? "text-emerald-600" : "text-red-500",
                    )}
                  >
                    {formatCurrency(Math.abs(t.amount))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="flex justify-start">
        <button
          onClick={onBack}
          className="px-5 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-800"
        >
          ← Back to Matching
        </button>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color?: string;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <p className="text-xs text-gray-500 font-medium uppercase mb-1">
        {label}
      </p>
      <p className={classNames("text-2xl font-bold", color || "text-gray-900")}>
        {value}
      </p>
    </div>
  );
}
