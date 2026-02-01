import { X, Paperclip } from "lucide-react";
import { useState } from "react";
import type { Expense, ExpenseCategory } from "../lib/types";
import { formatCurrency, formatDate, classNames } from "../lib/utils";
import { expenseCategoryLabels } from "../lib/consts";

// ── View Expense Detail Modal ────────────────────────────────────
interface ExpenseDetailModalProps {
  expense: Expense;
  onClose: () => void;
}

export function ExpenseDetailModal({ expense, onClose }: ExpenseDetailModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg mx-4">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
          <h3 className="font-semibold text-gray-900">Expense Details</h3>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-gray-100 text-gray-400"
          >
            <X size={16} />
          </button>
        </div>
        <div className="px-5 py-4 space-y-3">
          <Row label="Vendor" value={expense.vendor} />
          <Row label="Date" value={formatDate(expense.date)} />
          <Row
            label="Category"
            value={expenseCategoryLabels[expense.category] || expense.category}
          />
          <Row label="Description" value={expense.description} />
          <Row label="Amount" value={formatCurrency(expense.amount)} bold />
          <Row
            label="Payment"
            value={expense.paymentMethod.replace("-", " ")}
          />
          {expense.receiptUrl && (
            <Row
              label="Receipt"
              value={expense.receiptName || "Attached"}
              icon={<Paperclip size={12} className="text-emerald-500" />}
            />
          )}
          {expense.notes && <Row label="Notes" value={expense.notes} />}
          <Row
            label="Reconciled"
            value={expense.isReconciled ? "Yes" : "No"}
          />
        </div>
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  bold,
  icon,
}: {
  label: string;
  value: string;
  bold?: boolean;
  icon?: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="w-24 shrink-0 text-xs font-medium text-gray-400 uppercase pt-0.5">
        {label}
      </span>
      <span
        className={classNames(
          "text-sm flex items-center gap-1",
          bold ? "font-bold text-gray-900" : "text-gray-700",
        )}
      >
        {icon}
        {value}
      </span>
    </div>
  );
}

// ── Add Expense Modal ────────────────────────────────────────────
interface AddExpenseModalProps {
  onClose: () => void;
  onAdd: (expense: Expense) => void;
}

const defaultCategories: ExpenseCategory[] = [
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

export function AddExpenseModal({ onClose, onAdd }: AddExpenseModalProps) {
  const [vendor, setVendor] = useState("");
  const [category, setCategory] = useState<ExpenseCategory>("other");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<Expense["paymentMethod"]>("credit-card");
  const [notes, setNotes] = useState("");

  const handleSubmit = () => {
    if (!vendor || !amount) return;
    const expense: Expense = {
      id: `exp-new-${Date.now()}`,
      date: new Date().toISOString(),
      vendor,
      category,
      description,
      amount: parseFloat(amount),
      paymentMethod,
      receiptUrl: null,
      receiptName: null,
      notes,
      isReconciled: false,
    };
    onAdd(expense);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg mx-4">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
          <h3 className="font-semibold text-gray-900">Add Expense</h3>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-gray-100 text-gray-400"
          >
            <X size={16} />
          </button>
        </div>
        <div className="px-5 py-4 space-y-4">
          <Field label="Vendor *">
            <input
              type="text"
              value={vendor}
              onChange={(e) => setVendor(e.target.value)}
              placeholder="e.g. Amazon Web Services"
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Category">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ExpenseCategory)}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              >
                {defaultCategories.map((c) => (
                  <option key={c} value={c}>
                    {expenseCategoryLabels[c] || c}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Amount *">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </Field>
          </div>
          <Field label="Description">
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description"
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </Field>
          <Field label="Payment Method">
            <select
              value={paymentMethod}
              onChange={(e) =>
                setPaymentMethod(e.target.value as Expense["paymentMethod"])
              }
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            >
              <option value="credit-card">Credit Card</option>
              <option value="bank-transfer">Bank Transfer</option>
              <option value="cash">Cash</option>
              <option value="check">Check</option>
            </select>
          </Field>
          <Field label="Notes">
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
              placeholder="Optional notes..."
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 resize-none"
            />
          </Field>
        </div>
        <div className="px-5 py-4 border-t border-gray-200 flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!vendor || !amount}
            className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add Expense
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-500 mb-1">
        {label}
      </label>
      {children}
    </div>
  );
}
