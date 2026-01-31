import { cn, formatCurrency, formatDate, getStatusColor } from "@/lib/utils";
import { useAppContext } from "@/context/AppProvider";
import { FileText, ArrowRight } from "lucide-react";

export default function RecentPOsWidget() {
  const { state, addTab } = useAppContext();

  // Get recent POs sorted by updatedAt
  const recentPOs = [...state.purchaseOrders]
    .sort((a, b) => b.updatedAt - a.updatedAt)
    .slice(0, 5);

  return (
    <div className="bg-white rounded-xl shadow-sm border h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-blue-100">
            <FileText className="w-4 h-4 text-blue-600" />
          </div>
          <h3 className="font-medium text-gray-900">Recent Purchase Orders</h3>
        </div>
        <button
          onClick={() => addTab({ id: "procurement", type: "procurement" })}
          className="text-sm text-[#0a6ed1] hover:text-[#0858a6] font-medium flex items-center gap-1"
        >
          View All
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* PO List */}
      <div className="divide-y">
        {recentPOs.map((po) => {
          const statusColors = getStatusColor(po.status);
          return (
            <button
              key={po.id}
              onClick={() => addTab({ id: `po-${po.id}`, type: "po-detail", dataId: po.id })}
              className="w-full px-5 py-3 flex items-center gap-4 hover:bg-gray-50 transition-colors text-left"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-gray-900">{po.poNumber}</p>
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
                <p className="text-xs text-gray-500 mt-0.5">{po.vendorName}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  {formatCurrency(po.totalAmount, po.currency)}
                </p>
                <p className="text-xs text-gray-500">{formatDate(po.updatedAt)}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Empty State */}
      {recentPOs.length === 0 && (
        <div className="px-5 py-8 text-center">
          <FileText className="w-10 h-10 text-gray-300 mx-auto mb-2" />
          <p className="text-sm text-gray-500">No purchase orders yet</p>
        </div>
      )}
    </div>
  );
}
