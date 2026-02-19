import { useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  MessageSquare,
  Package,
  Building2,
  Calendar,
  User,
  MapPin,
  Star,
  Send,
} from "lucide-react";
import { useAppContext } from "../store/AppProvider.tsx";

function currencySymbol(c: string) {
  return c === "EUR" ? "€" : c === "GBP" ? "£" : "$";
}

const statusColor: Record<string, string> = {
  "Pending Approval": "bg-sap-critical/10 text-sap-critical border-sap-critical/20",
  Approved: "bg-sap-positive/10 text-sap-positive border-sap-positive/20",
  Rejected: "bg-sap-negative/10 text-sap-negative border-sap-negative/20",
  "In Delivery": "bg-sap-informative/10 text-sap-informative border-sap-informative/20",
  Draft: "bg-gray-100 text-gray-500 border-gray-200",
  Received: "bg-emerald-50 text-emerald-600 border-emerald-200",
  Cancelled: "bg-gray-100 text-gray-400 border-gray-200",
};

export default function PurchaseOrderDetail() {
  const { state, navigate, approvePO, rejectPO, addPOComment } = useAppContext();
  const [commentText, setCommentText] = useState("");

  const po = state.purchaseOrders.find((p) => p.id === state.selectedPOId);
  if (!po) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-sap-text-secondary">
        <Package size={48} className="mb-3 opacity-40" />
        <p>Purchase order not found.</p>
        <button onClick={() => navigate("procurement")} className="mt-3 text-sm font-medium text-sap-brand hover:underline">
          Back to list
        </button>
      </div>
    );
  }

  const canAction = po.status === "Pending Approval";
  const sym = currencySymbol(po.currency);

  function handleSubmitComment() {
    if (!commentText.trim() || !po) return;
    addPOComment(po.id, {
      id: `c-${Date.now()}`,
      author: "Dr. Claudia Richter",
      text: commentText.trim(),
      timestamp: new Date().toISOString(),
    });
    setCommentText("");
  }

  return (
    <div className="space-y-5">
      {/* Breadcrumb + actions */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("procurement")}
            className="flex items-center gap-1 rounded-md border border-sap-border bg-white px-3 py-1.5 text-xs font-medium text-sap-text shadow-sm transition-colors hover:bg-sap-bg"
          >
            <ArrowLeft size={14} /> Back
          </button>
          <div>
            <h1 className="text-lg font-bold text-sap-text">{po.poNumber}</h1>
            <p className="text-xs text-sap-text-secondary">{po.title}</p>
          </div>
          <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusColor[po.status] ?? ""}`}>
            {po.status}
          </span>
        </div>
        {canAction && (
          <div className="flex gap-2">
            <button
              onClick={() => approvePO(po.id)}
              className="flex items-center gap-1.5 rounded-md bg-sap-positive px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-sap-positive/90"
            >
              <CheckCircle2 size={16} /> Approve
            </button>
            <button
              onClick={() => rejectPO(po.id)}
              className="flex items-center gap-1.5 rounded-md bg-sap-negative px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-sap-negative/90"
            >
              <XCircle size={16} /> Reject
            </button>
          </div>
        )}
      </div>

      {/* Info grid */}
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Left — Details */}
        <div className="space-y-4 lg:col-span-2">
          {/* Header info */}
          <div className="grid gap-4 sm:grid-cols-2 rounded-lg border border-sap-border bg-white p-5 shadow-sm">
            <div className="space-y-3">
              <InfoRow icon={Building2} label="Vendor" value={po.vendor.name} />
              <InfoRow icon={MapPin} label="Plant" value={po.plant} />
              <InfoRow icon={User} label="Requestor" value={po.requestor} />
              <InfoRow icon={User} label="Approver" value={po.approver} />
            </div>
            <div className="space-y-3">
              <InfoRow icon={Calendar} label="Created" value={po.createdDate} />
              <InfoRow icon={Calendar} label="Required" value={po.requiredDate} />
              <InfoRow icon={Package} label="Company Code" value={po.companyCode} />
              <InfoRow icon={Star} label="Vendor Rating" value={`${po.vendor.rating} / 5.0`} />
            </div>
          </div>

          {/* Line items */}
          <div className="rounded-lg border border-sap-border bg-white shadow-sm">
            <div className="border-b border-sap-border px-5 py-3">
              <h2 className="text-sm font-semibold text-sap-text">Line Items ({po.lineItems.length})</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-sap-border bg-sap-bg/40 text-left text-xs font-semibold uppercase tracking-wider text-sap-text-secondary">
                    <th className="px-4 py-2.5">Material</th>
                    <th className="px-4 py-2.5">Description</th>
                    <th className="px-4 py-2.5 text-right">Qty</th>
                    <th className="px-4 py-2.5">Unit</th>
                    <th className="px-4 py-2.5 text-right">Unit Price</th>
                    <th className="px-4 py-2.5 text-right">Total</th>
                    <th className="px-4 py-2.5">Delivery</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sap-border/50">
                  {po.lineItems.map((li) => (
                    <tr key={li.id}>
                      <td className="px-4 py-2.5 font-mono text-xs text-sap-brand">{li.material}</td>
                      <td className="max-w-[200px] truncate px-4 py-2.5 text-sap-text">{li.description}</td>
                      <td className="px-4 py-2.5 text-right">{li.quantity}</td>
                      <td className="px-4 py-2.5 text-sap-text-secondary">{li.unit}</td>
                      <td className="px-4 py-2.5 text-right">{sym}{li.unitPrice.toLocaleString()}</td>
                      <td className="px-4 py-2.5 text-right font-semibold">{sym}{(li.quantity * li.unitPrice).toLocaleString()}</td>
                      <td className="px-4 py-2.5 text-sap-text-secondary">{li.deliveryDate}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t-2 border-sap-border bg-sap-bg/40">
                    <td colSpan={5} className="px-4 py-3 text-right text-xs font-semibold uppercase text-sap-text-secondary">Grand Total</td>
                    <td className="px-4 py-3 text-right text-base font-bold text-sap-text">{sym}{po.totalAmount.toLocaleString()}</td>
                    <td />
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Comments */}
          <div className="rounded-lg border border-sap-border bg-white shadow-sm">
            <div className="border-b border-sap-border px-5 py-3">
              <div className="flex items-center gap-2">
                <MessageSquare size={14} className="text-sap-text-secondary" />
                <h2 className="text-sm font-semibold text-sap-text">Comments ({po.comments.length})</h2>
              </div>
            </div>
            <div className="divide-y divide-sap-border/50">
              {po.comments.map((c) => (
                <div key={c.id} className="px-5 py-3">
                  <div className="flex items-center gap-2 text-xs text-sap-text-secondary">
                    <span className="font-semibold text-sap-text">{c.author}</span>
                    <span>•</span>
                    <span>{new Date(c.timestamp).toLocaleString()}</span>
                  </div>
                  <p className="mt-1 text-sm text-sap-text">{c.text}</p>
                </div>
              ))}
            </div>
            {/* Add comment */}
            <div className="border-t border-sap-border px-5 py-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmitComment()}
                  placeholder="Add a comment…"
                  className="flex-1 rounded-md border border-sap-border bg-sap-bg px-3 py-2 text-sm outline-none focus:border-sap-brand focus:ring-1 focus:ring-sap-brand/30"
                />
                <button
                  onClick={handleSubmitComment}
                  disabled={!commentText.trim()}
                  className="flex items-center gap-1.5 rounded-md bg-sap-brand px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-sap-highlight disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Send size={14} /> Send
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right — Vendor card */}
        <div className="space-y-4">
          <div className="rounded-lg border border-sap-border bg-white p-5 shadow-sm">
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-sap-text-secondary">Vendor Information</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-bold text-sap-text">{po.vendor.name}</p>
                <p className="text-xs text-sap-text-secondary">{po.vendor.code}</p>
              </div>
              <div className="flex items-center gap-2 text-xs text-sap-text-secondary">
                <MapPin size={12} /> {po.vendor.country}
              </div>
              <div className="flex items-center gap-2 text-xs text-sap-text-secondary">
                <User size={12} /> {po.vendor.contact}
              </div>
              <div className="flex items-center gap-1 text-xs">
                <Star size={12} className="text-sap-gold" />
                <span className="font-semibold text-sap-text">{po.vendor.rating}</span>
                <span className="text-sap-text-secondary">/ 5.0</span>
              </div>
              <div className="rounded-md bg-sap-bg px-3 py-2">
                <p className="text-xs font-medium text-sap-text-secondary">Category</p>
                <p className="text-sm text-sap-text">{po.vendor.category}</p>
              </div>
            </div>
          </div>

          {/* Quick stats */}
          <div className="rounded-lg border border-sap-border bg-white p-5 shadow-sm">
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-sap-text-secondary">Order Summary</h3>
            <div className="space-y-2">
              <SummaryRow label="Line Items" value={String(po.lineItems.length)} />
              <SummaryRow label="Department" value={po.department} />
              <SummaryRow label="Priority" value={po.priority} />
              <SummaryRow label="Currency" value={po.currency} />
              <div className="border-t border-sap-border pt-2 mt-2">
                <SummaryRow label="Total" value={`${sym}${po.totalAmount.toLocaleString()}`} bold />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- helpers ---------- */

function InfoRow({ icon: Icon, label, value }: { icon: typeof Building2; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <Icon size={14} className="shrink-0 text-sap-text-secondary" />
      <div className="min-w-0">
        <p className="text-xs text-sap-text-secondary">{label}</p>
        <p className="truncate text-sm font-medium text-sap-text">{value}</p>
      </div>
    </div>
  );
}

function SummaryRow({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-sap-text-secondary">{label}</span>
      <span className={bold ? "font-bold text-sap-text" : "font-medium text-sap-text"}>{value}</span>
    </div>
  );
}
