import {
  ArrowLeft,
  CheckCircle2,
  Bell,
  Pencil,
  Save,
  X,
  Plus,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import type { Invoice, InvoiceLineItem } from "../lib/types";
import { formatCurrency, formatDate, statusColor, classNames } from "../lib/utils";

interface InvoiceDetailProps {
  invoice: Invoice;
  onBack: () => void;
  onMarkPaid: (id: string) => void;
  onSendReminder: (id: string) => void;
  onUpdateLineItems: (id: string, lineItems: InvoiceLineItem[]) => void;
}

export default function InvoiceDetail({
  invoice,
  onBack,
  onMarkPaid,
  onSendReminder,
  onUpdateLineItems,
}: InvoiceDetailProps) {
  const [editing, setEditing] = useState(false);
  const [editItems, setEditItems] = useState<InvoiceLineItem[]>(invoice.lineItems);

  const handleSave = () => {
    onUpdateLineItems(invoice.id, editItems);
    setEditing(false);
  };

  const handleCancel = () => {
    setEditItems(invoice.lineItems);
    setEditing(false);
  };

  const updateItem = (idx: number, field: keyof InvoiceLineItem, value: string | number) => {
    setEditItems((items) =>
      items.map((item, i) => {
        if (i !== idx) return item;
        const updated = { ...item, [field]: value };
        if (field === "quantity" || field === "rate") {
          updated.amount = Number(updated.quantity) * Number(updated.rate);
        }
        return updated;
      }),
    );
  };

  const addItem = () => {
    setEditItems((items) => [
      ...items,
      {
        id: `li-new-${Date.now()}`,
        description: "",
        quantity: 1,
        rate: 0,
        amount: 0,
      },
    ]);
  };

  const removeItem = (idx: number) => {
    setEditItems((items) => items.filter((_, i) => i !== idx));
  };

  const displayItems = editing ? editItems : invoice.lineItems;
  const subtotal = displayItems.reduce((s, i) => s + i.amount, 0);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Back */}
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-4"
      >
        <ArrowLeft size={16} />
        Back to Invoices
      </button>

      {/* Header */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold text-gray-900">
                {invoice.number}
              </h2>
              <span
                className={classNames(
                  "px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize",
                  statusColor(invoice.status),
                )}
              >
                {invoice.status}
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              {invoice.customerName}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {invoice.status !== "paid" && invoice.status !== "draft" && (
              <>
                <button
                  onClick={() => onSendReminder(invoice.id)}
                  className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-amber-700 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors"
                >
                  <Bell size={14} />
                  Send Reminder
                </button>
                <button
                  onClick={() => onMarkPaid(invoice.id)}
                  className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  <CheckCircle2 size={14} />
                  Mark Paid
                </button>
              </>
            )}
          </div>
        </div>

        {/* Details */}
        <div className="px-6 py-4 grid grid-cols-2 md:grid-cols-4 gap-4 border-b border-gray-100 bg-gray-50/50">
          <DetailCell label="Issue Date" value={formatDate(invoice.issueDate)} />
          <DetailCell label="Due Date" value={formatDate(invoice.dueDate)} />
          <DetailCell label="Total" value={formatCurrency(invoice.total)} />
          <DetailCell
            label="Balance Due"
            value={formatCurrency(invoice.balance)}
            highlight={invoice.balance > 0}
          />
        </div>

        {/* Line Items */}
        <div className="px-6 py-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-900 text-sm">Line Items</h3>
            {!editing && invoice.status !== "paid" && (
              <button
                onClick={() => setEditing(true)}
                className="flex items-center gap-1 text-xs text-emerald-600 hover:text-emerald-700 font-medium"
              >
                <Pencil size={12} />
                Edit
              </button>
            )}
            {editing && (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700 font-medium"
                >
                  <X size={12} />
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="flex items-center gap-1 text-xs text-emerald-600 hover:text-emerald-700 font-medium"
                >
                  <Save size={12} />
                  Save
                </button>
              </div>
            )}
          </div>

          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 text-xs font-semibold text-gray-500 uppercase">
                  Description
                </th>
                <th className="text-right py-2 text-xs font-semibold text-gray-500 uppercase w-20">
                  Qty
                </th>
                <th className="text-right py-2 text-xs font-semibold text-gray-500 uppercase w-24">
                  Rate
                </th>
                <th className="text-right py-2 text-xs font-semibold text-gray-500 uppercase w-28">
                  Amount
                </th>
                {editing && <th className="w-8" />}
              </tr>
            </thead>
            <tbody>
              {displayItems.map((item, idx) => (
                <tr key={item.id} className="border-b border-gray-100">
                  <td className="py-2.5">
                    {editing ? (
                      <input
                        type="text"
                        value={item.description}
                        onChange={(e) =>
                          updateItem(idx, "description", e.target.value)
                        }
                        className="w-full px-2 py-1 border border-gray-200 rounded text-sm"
                      />
                    ) : (
                      <span className="text-gray-800">{item.description}</span>
                    )}
                  </td>
                  <td className="py-2.5 text-right">
                    {editing ? (
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          updateItem(idx, "quantity", Number(e.target.value))
                        }
                        className="w-16 px-2 py-1 border border-gray-200 rounded text-sm text-right"
                      />
                    ) : (
                      <span className="text-gray-600">{item.quantity}</span>
                    )}
                  </td>
                  <td className="py-2.5 text-right">
                    {editing ? (
                      <input
                        type="number"
                        value={item.rate}
                        onChange={(e) =>
                          updateItem(idx, "rate", Number(e.target.value))
                        }
                        className="w-20 px-2 py-1 border border-gray-200 rounded text-sm text-right"
                      />
                    ) : (
                      <span className="text-gray-600">
                        {formatCurrency(item.rate)}
                      </span>
                    )}
                  </td>
                  <td className="py-2.5 text-right font-medium text-gray-900">
                    {formatCurrency(item.amount)}
                  </td>
                  {editing && (
                    <td className="py-2.5 text-center">
                      <button
                        onClick={() => removeItem(idx)}
                        className="text-red-400 hover:text-red-600"
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>

          {editing && (
            <button
              onClick={addItem}
              className="flex items-center gap-1 mt-2 text-xs text-emerald-600 hover:text-emerald-700 font-medium"
            >
              <Plus size={12} />
              Add Line Item
            </button>
          )}

          {/* Totals */}
          <div className="mt-4 ml-auto w-64 space-y-1.5">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Subtotal</span>
              <span className="text-gray-900 font-medium">
                {formatCurrency(subtotal)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">
                Tax ({invoice.taxRate}%)
              </span>
              <span className="text-gray-900 font-medium">
                {formatCurrency(subtotal * (invoice.taxRate / 100))}
              </span>
            </div>
            <div className="flex justify-between text-sm border-t border-gray-200 pt-1.5">
              <span className="font-semibold text-gray-900">Total</span>
              <span className="font-bold text-gray-900">
                {formatCurrency(subtotal + subtotal * (invoice.taxRate / 100))}
              </span>
            </div>
            {invoice.amountPaid > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Amount Paid</span>
                <span className="text-emerald-600 font-medium">
                  ({formatCurrency(invoice.amountPaid)})
                </span>
              </div>
            )}
            <div className="flex justify-between text-sm border-t border-gray-200 pt-1.5">
              <span className="font-semibold text-gray-900">Balance Due</span>
              <span
                className={classNames(
                  "font-bold",
                  invoice.balance > 0 ? "text-red-600" : "text-emerald-600",
                )}
              >
                {formatCurrency(invoice.balance)}
              </span>
            </div>
          </div>
        </div>

        {/* Notes */}
        {invoice.notes && (
          <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50">
            <p className="text-xs font-semibold text-gray-400 uppercase mb-1">
              Notes
            </p>
            <p className="text-sm text-gray-600">{invoice.notes}</p>
          </div>
        )}
      </div>
    </div>
  );
}

function DetailCell({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div>
      <p className="text-xs text-gray-400 font-medium">{label}</p>
      <p
        className={classNames(
          "text-sm font-semibold mt-0.5",
          highlight ? "text-red-600" : "text-gray-900",
        )}
      >
        {value}
      </p>
    </div>
  );
}
