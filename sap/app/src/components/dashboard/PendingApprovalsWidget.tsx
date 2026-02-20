import { cn, formatCurrency } from "@/lib/utils";
import { useAppContext } from "@/context/AppProvider";
import { Clock, ArrowRight, AlertTriangle } from "lucide-react";

export default function PendingApprovalsWidget() {
  const { state, addTab, openApprovePODialog } = useAppContext();

  // Get pending approval POs
  const pendingPOs = state.purchaseOrders.filter(
    (po) => po.status === "Pending Approval"
  );

  return (
    <div 
      className="bg-white rounded-xl shadow-sm border h-full"
      data-testid="pending-approvals-widget"
      data-pending-count={pendingPOs.length}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-yellow-100">
            <Clock className="w-4 h-4 text-yellow-600" />
          </div>
          <h3 className="font-medium text-gray-900">Pending Approvals</h3>
          {pendingPOs.length > 0 && (
            <span 
              className="px-2 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-700 rounded-full"
              data-testid="pending-count-badge"
            >
              {pendingPOs.length}
            </span>
          )}
        </div>
        <button
          onClick={() => addTab({ id: "procurement", type: "procurement" })}
          className="text-sm text-[#0a6ed1] hover:text-[#0858a6] font-medium flex items-center gap-1"
          data-testid="view-all-pos-link"
        >
          View All
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Pending PO List */}
      <div className="divide-y" data-testid="pending-po-list">
        {pendingPOs.map((po) => {
          const daysAgo = Math.floor(
            (Date.now() - po.createdAt) / (1000 * 60 * 60 * 24)
          );
          const isUrgent = daysAgo > 2;

          return (
            <div
              key={po.id}
              data-testid={`pending-po-${po.id}`}
              data-po-id={po.id}
              data-po-number={po.poNumber}
              data-po-amount={po.totalAmount}
              data-po-urgent={isUrgent}
              className={cn(
                "px-5 py-3 hover:bg-gray-50 transition-colors",
                isUrgent && "bg-yellow-50/50"
              )}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        addTab({ id: `po-${po.id}`, type: "po-detail", dataId: po.id })
                      }
                      className="text-sm font-medium text-[#0a6ed1] hover:underline"
                      data-testid={`po-link-${po.id}`}
                    >
                      {po.poNumber}
                    </button>
                    {isUrgent && (
                      <AlertTriangle className="w-4 h-4 text-yellow-500" aria-label="Urgent" />
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">{po.vendorName}</p>
                </div>
                <p className="text-sm font-semibold text-gray-900">
                  {formatCurrency(po.totalAmount, po.currency)}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-500">
                  Submitted {daysAgo === 0 ? "today" : `${daysAgo} day${daysAgo > 1 ? "s" : ""} ago`}
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openApprovePODialog(po.id)}
                    className="px-3 py-1 text-xs font-medium text-white bg-green-600 hover:bg-green-700 rounded transition-colors"
                    data-testid={`approve-btn-${po.id}`}
                    data-action="approve"
                    data-po-id={po.id}
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => openApprovePODialog(po.id)}
                    className="px-3 py-1 text-xs font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded transition-colors"
                    data-testid={`review-btn-${po.id}`}
                    data-action="review"
                    data-po-id={po.id}
                  >
                    Review
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {pendingPOs.length === 0 && (
        <div className="px-5 py-8 text-center" data-testid="no-pending-approvals">
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
            <Clock className="w-6 h-6 text-green-600" />
          </div>
          <p className="text-sm font-medium text-gray-900">All caught up!</p>
          <p className="text-xs text-gray-500 mt-1">No pending approvals</p>
        </div>
      )}
    </div>
  );
}
