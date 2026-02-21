import { useAppContext } from "@/context/AppProvider";
import { formatCurrency, formatDate } from "@/lib/utils";
import StatusBadge from "../common/StatusBadge";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function POList() {
  const { state, selectPO, getFilteredPOs } = useAppContext();
  const filteredPOs = getFilteredPOs();

  return (
    <div className="space-y-2">
      {filteredPOs.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No purchase orders found</p>
        </div>
      ) : (
        filteredPOs.map((po) => (
          <button
            key={po.id}
            onClick={() => selectPO(po.id)}
            className={cn(
              "w-full text-left p-4 border rounded-lg transition-all hover:shadow-md",
              state.selectedPOId === po.id
                ? "border-[#00a9e0] bg-blue-50"
                : "border-gray-200 bg-white hover:border-gray-300"
            )}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-semibold text-gray-900">{po.poNumber}</h3>
                  <StatusBadge status={po.status} />
                </div>
                
                <p className="text-sm text-gray-600 mb-2 line-clamp-1">{po.description}</p>
                
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span>{po.vendor}</span>
                  <span>•</span>
                  <span>{po.department}</span>
                  <span>•</span>
                  <span>{formatDate(po.createdDate)}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="font-semibold text-gray-900">
                    {formatCurrency(po.amount, po.currency)}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {po.items.length} item{po.items.length !== 1 ? "s" : ""}
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          </button>
        ))
      )}
    </div>
  );
}

