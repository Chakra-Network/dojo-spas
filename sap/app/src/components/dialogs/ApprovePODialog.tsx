import { useState } from "react";
import { cn, formatCurrency, getStatusColor } from "@/lib/utils";
import { useAppContext } from "@/context/AppProvider";
import * as Dialog from "@radix-ui/react-dialog";
import { X, Check, AlertTriangle, FileText, Building2 } from "lucide-react";

export default function ApprovePODialog() {
  const { state, closeApprovePODialog, approvePO, rejectPO } = useAppContext();
  const [comment, setComment] = useState("");
  const [action, setAction] = useState<"approve" | "reject" | null>(null);

  const po = state.purchaseOrders.find((p) => p.id === state.approvingPOId);

  const handleClose = () => {
    setComment("");
    setAction(null);
    closeApprovePODialog();
  };

  const handleSubmit = () => {
    if (!po) return;

    if (action === "approve") {
      approvePO(po.id, comment || "Approved");
    } else if (action === "reject") {
      if (!comment.trim()) {
        return; // Require comment for rejection
      }
      rejectPO(po.id, comment);
    }

    handleClose();
  };

  if (!po) return null;

  const statusColors = getStatusColor(po.status);

  return (
    <Dialog.Root open={state.isApprovePODialogOpen} onOpenChange={handleClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 animate-in fade-in duration-200" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-xl bg-white rounded-xl shadow-2xl animate-in fade-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b">
            <Dialog.Title className="text-lg font-semibold text-gray-900">
              Review Purchase Order
            </Dialog.Title>
            <Dialog.Close asChild>
              <button className="p-1 rounded hover:bg-gray-100 text-gray-500 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </Dialog.Close>
          </div>

          {/* Content */}
          <div className="px-6 py-4 space-y-4">
            {/* PO Summary */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <FileText className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{po.poNumber}</p>
                    <span
                      className={cn(
                        "text-xs px-2 py-0.5 rounded-full border",
                        statusColors.bg,
                        statusColors.text,
                        statusColors.border
                      )}
                    >
                      {po.status}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">
                    {formatCurrency(po.totalAmount, po.currency)}
                  </p>
                  <p className="text-xs text-gray-500">
                    {po.lineItems.length} line item{po.lineItems.length !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t flex items-center gap-3">
                <Building2 className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">{po.vendorName}</p>
                  <p className="text-xs text-gray-500">{po.paymentTerms} • Delivery: {po.deliveryDate}</p>
                </div>
              </div>

              {po.notes && (
                <div className="mt-3 text-xs text-gray-600 bg-white p-2 rounded border">
                  <span className="font-medium">Notes:</span> {po.notes}
                </div>
              )}
            </div>

            {/* Action Selection */}
            {!action && (
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setAction("approve")}
                  className="flex flex-col items-center gap-2 p-4 border-2 border-green-200 rounded-lg hover:bg-green-50 hover:border-green-400 transition-all"
                >
                  <div className="p-3 bg-green-100 rounded-full">
                    <Check className="w-6 h-6 text-green-600" />
                  </div>
                  <span className="font-medium text-green-700">Approve</span>
                  <span className="text-xs text-gray-500">Accept this purchase order</span>
                </button>
                <button
                  onClick={() => setAction("reject")}
                  className="flex flex-col items-center gap-2 p-4 border-2 border-red-200 rounded-lg hover:bg-red-50 hover:border-red-400 transition-all"
                >
                  <div className="p-3 bg-red-100 rounded-full">
                    <X className="w-6 h-6 text-red-600" />
                  </div>
                  <span className="font-medium text-red-700">Reject</span>
                  <span className="text-xs text-gray-500">Decline this purchase order</span>
                </button>
              </div>
            )}

            {/* Comment Section */}
            {action && (
              <div className="space-y-3">
                <div
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-lg",
                    action === "approve" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                  )}
                >
                  {action === "approve" ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <AlertTriangle className="w-4 h-4" />
                  )}
                  <span className="text-sm font-medium">
                    {action === "approve"
                      ? "You are approving this purchase order"
                      : "You are rejecting this purchase order"}
                  </span>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {action === "reject" ? "Reason for Rejection *" : "Comment (Optional)"}
                  </label>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder={
                      action === "reject"
                        ? "Please provide a reason for rejecting this PO..."
                        : "Add any comments or notes..."
                    }
                    className="w-full px-3 py-2 border rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#0a6ed1]/20 focus:border-[#0a6ed1]"
                    rows={3}
                    autoFocus
                  />
                  {action === "reject" && !comment.trim() && (
                    <p className="text-xs text-red-500 mt-1">
                      A reason is required when rejecting
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={() => setAction(null)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={action === "reject" && !comment.trim()}
                    className={cn(
                      "flex-1 px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
                      action === "approve"
                        ? "bg-green-600 hover:bg-green-700 text-white"
                        : "bg-red-600 hover:bg-red-700 text-white"
                    )}
                  >
                    Confirm {action === "approve" ? "Approval" : "Rejection"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
