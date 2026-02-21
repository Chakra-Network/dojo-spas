import { useState } from "react";
import { useAppContext } from "@/context/AppProvider";
import { formatCurrency, formatDate, formatDateTime } from "@/lib/utils";
import StatusBadge from "../common/StatusBadge";
import { 
  X, 
  Calendar, 
  User, 
  Building2, 
  Package,
  CheckCircle,
  XCircle,
  MessageSquare,
  Send
} from "lucide-react";
import type { POStatus } from "@/lib/types";

export default function PODetail() {
  const { state, selectPO, updatePOStatus, addPOComment } = useAppContext();
  const [commentText, setCommentText] = useState("");
  
  const po = state.purchaseOrders.find((p) => p.id === state.selectedPOId);

  if (!po) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
        <Package className="w-12 h-12 text-gray-400 mx-auto mb-3" />
        <p className="text-gray-500">Select a purchase order to view details</p>
      </div>
    );
  }

  const canApprove = po.status === "Pending Approval";
  const canReject = po.status === "Pending Approval";

  const handleApprove = () => {
    updatePOStatus(po.id, "Approved" as POStatus, state.currentUser);
  };

  const handleReject = () => {
    updatePOStatus(po.id, "Rejected" as POStatus, state.currentUser);
  };

  const handleAddComment = () => {
    if (!commentText.trim()) return;
    
    addPOComment(po.id, {
      id: `comment-${Date.now()}`,
      author: state.currentUser,
      text: commentText,
      timestamp: new Date().toISOString(),
    });
    setCommentText("");
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <div className="border-b border-gray-200 p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{po.poNumber}</h2>
            <p className="text-gray-600 mt-1">{po.description}</p>
          </div>
          <div className="flex items-center gap-2">
            <StatusBadge status={po.status} />
            <button
              onClick={() => selectPO(null)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        {(canApprove || canReject) && (
          <div className="flex gap-3">
            {canApprove && (
              <button
                onClick={handleApprove}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <CheckCircle className="w-4 h-4" />
                Approve
              </button>
            )}
            {canReject && (
              <button
                onClick={handleReject}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <XCircle className="w-4 h-4" />
                Reject
              </button>
            )}
          </div>
        )}
      </div>

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <Building2 className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-xs text-gray-500">Vendor</p>
              <p className="font-medium text-gray-900">{po.vendor}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <User className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-xs text-gray-500">Requested By</p>
              <p className="font-medium text-gray-900">{po.requestedBy}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-xs text-gray-500">Created Date</p>
              <p className="font-medium text-gray-900">{formatDate(po.createdDate)}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-xs text-gray-500">Delivery Date</p>
              <p className="font-medium text-gray-900">{formatDate(po.deliveryDate)}</p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Line Items</h3>
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Item #</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Description</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500">Qty</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500">Unit Price</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {po.items.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900">{item.itemNumber}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{item.description}</td>
                    <td className="px-4 py-3 text-sm text-gray-900 text-right">
                      {item.quantity} {item.unit}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900 text-right">
                      {formatCurrency(item.unitPrice, po.currency)}
                    </td>
                    <td className="px-4 py-3 text-sm font-semibold text-gray-900 text-right">
                      {formatCurrency(item.totalPrice, po.currency)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-gray-50">
                <tr>
                  <td colSpan={4} className="px-4 py-3 text-sm font-semibold text-gray-900 text-right">
                    Total Amount
                  </td>
                  <td className="px-4 py-3 text-sm font-bold text-gray-900 text-right">
                    {formatCurrency(po.amount, po.currency)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Comments
          </h3>
          
          <div className="space-y-3 mb-4">
            {po.comments.length === 0 ? (
              <p className="text-sm text-gray-500 italic">No comments yet</p>
            ) : (
              po.comments.map((comment) => (
                <div key={comment.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <p className="font-medium text-sm text-gray-900">{comment.author}</p>
                    <p className="text-xs text-gray-500">{formatDateTime(comment.timestamp)}</p>
                  </div>
                  <p className="text-sm text-gray-700">{comment.text}</p>
                </div>
              ))
            )}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddComment()}
              placeholder="Add a comment..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00a9e0] focus:border-transparent"
            />
            <button
              onClick={handleAddComment}
              disabled={!commentText.trim()}
              className="px-4 py-2 bg-[#00a9e0] text-white rounded-lg hover:bg-[#0090c0] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

