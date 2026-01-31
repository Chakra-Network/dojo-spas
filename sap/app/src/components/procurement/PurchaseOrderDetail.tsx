import { useState } from "react";
import { cn, formatCurrency, formatDate, formatDateTime, getStatusColor } from "@/lib/utils";
import { useAppContext } from "@/context/AppProvider";
import {
  FileText,
  Building2,
  Calendar,
  CreditCard,
  Package,
  MessageSquare,
  Send,
  Check,
  X,
  Clock,
  User,
} from "lucide-react";

export default function PurchaseOrderDetail() {
  const { state, activeTab, openApprovePODialog, addPOComment } = useAppContext();
  const [newComment, setNewComment] = useState("");

  const po = state.purchaseOrders.find((p) => p.id === activeTab?.dataId);

  if (!po) {
    return (
      <div className="p-6 text-center">
        <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
        <p className="text-gray-500">Purchase order not found</p>
      </div>
    );
  }

  const statusColors = getStatusColor(po.status);
  const vendor = state.vendors.find((v) => v.id === po.vendorId);

  const handleAddComment = () => {
    if (newComment.trim()) {
      addPOComment(po.id, newComment.trim());
      setNewComment("");
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold text-gray-900">{po.poNumber}</h1>
            <span
              className={cn(
                "px-3 py-1 rounded-full text-sm font-medium border",
                statusColors.bg,
                statusColors.text,
                statusColors.border
              )}
            >
              {po.status}
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Created {formatDate(po.createdAt)} • Last updated {formatDate(po.updatedAt)}
          </p>
        </div>

        {/* Actions */}
        {po.status === "Pending Approval" && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => openApprovePODialog(po.id)}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
            >
              <Check className="w-4 h-4" />
              Approve
            </button>
            <button
              onClick={() => openApprovePODialog(po.id)}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
              Reject
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content - 2 columns */}
        <div className="lg:col-span-2 space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-4 shadow-sm border">
              <div className="flex items-center gap-2 text-gray-500 mb-2">
                <CreditCard className="w-4 h-4" />
                <span className="text-xs">Total Amount</span>
              </div>
              <p className="text-xl font-semibold text-gray-900">
                {formatCurrency(po.totalAmount, po.currency)}
              </p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border">
              <div className="flex items-center gap-2 text-gray-500 mb-2">
                <Package className="w-4 h-4" />
                <span className="text-xs">Line Items</span>
              </div>
              <p className="text-xl font-semibold text-gray-900">{po.lineItems.length}</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border">
              <div className="flex items-center gap-2 text-gray-500 mb-2">
                <Calendar className="w-4 h-4" />
                <span className="text-xs">Delivery Date</span>
              </div>
              <p className="text-xl font-semibold text-gray-900">{po.deliveryDate}</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border">
              <div className="flex items-center gap-2 text-gray-500 mb-2">
                <Clock className="w-4 h-4" />
                <span className="text-xs">Payment Terms</span>
              </div>
              <p className="text-xl font-semibold text-gray-900">{po.paymentTerms}</p>
            </div>
          </div>

          {/* Line Items */}
          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <div className="px-5 py-4 border-b">
              <h3 className="font-medium text-gray-900 flex items-center gap-2">
                <Package className="w-4 h-4 text-gray-500" />
                Line Items
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wider">
                    <th className="px-5 py-3 text-left">Material</th>
                    <th className="px-5 py-3 text-center">Quantity</th>
                    <th className="px-5 py-3 text-right">Unit Price</th>
                    <th className="px-5 py-3 text-right">Total</th>
                    <th className="px-5 py-3 text-left">Delivery</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {po.lineItems.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-5 py-4">
                        <p className="text-sm font-medium text-gray-900">
                          {item.materialName}
                        </p>
                        <p className="text-xs text-gray-500">{item.materialCode}</p>
                      </td>
                      <td className="px-5 py-4 text-center text-sm text-gray-700">
                        {item.quantity}
                      </td>
                      <td className="px-5 py-4 text-right text-sm text-gray-700">
                        {formatCurrency(item.unitPrice, po.currency)}
                      </td>
                      <td className="px-5 py-4 text-right text-sm font-medium text-gray-900">
                        {formatCurrency(item.totalPrice, po.currency)}
                      </td>
                      <td className="px-5 py-4 text-sm text-gray-700">
                        {item.deliveryDate}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-gray-50">
                    <td colSpan={3} className="px-5 py-3 text-sm font-medium text-gray-900 text-right">
                      Total
                    </td>
                    <td className="px-5 py-3 text-right text-lg font-semibold text-gray-900">
                      {formatCurrency(po.totalAmount, po.currency)}
                    </td>
                    <td></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Comments */}
          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <div className="px-5 py-4 border-b">
              <h3 className="font-medium text-gray-900 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-gray-500" />
                Comments & Approval History
              </h3>
            </div>
            <div className="p-5 space-y-4">
              {/* Comment Input */}
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-[#0a6ed1] flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                    className="w-full px-3 py-2 border rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#0a6ed1]/20 focus:border-[#0a6ed1]"
                    rows={2}
                  />
                  <div className="flex justify-end mt-2">
                    <button
                      onClick={handleAddComment}
                      disabled={!newComment.trim()}
                      className="flex items-center gap-2 px-3 py-1.5 bg-[#0a6ed1] hover:bg-[#0858a6] disabled:bg-gray-300 text-white text-sm rounded transition-colors"
                    >
                      <Send className="w-3 h-3" />
                      Send
                    </button>
                  </div>
                </div>
              </div>

              {/* Comment List */}
              {po.approverComments.length > 0 && (
                <div className="space-y-4 pt-4 border-t">
                  {po.approverComments.map((comment) => (
                    <div key={comment.id} className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4 text-gray-500" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium text-gray-900">
                            {comment.userName}
                          </p>
                          <span className="text-xs text-gray-500">
                            {formatDateTime(comment.timestamp)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 mt-1">{comment.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {po.approverComments.length === 0 && (
                <p className="text-sm text-gray-500 text-center py-4">
                  No comments yet
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar - 1 column */}
        <div className="space-y-6">
          {/* Vendor Info */}
          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <div className="px-5 py-4 border-b">
              <h3 className="font-medium text-gray-900 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-gray-500" />
                Vendor Information
              </h3>
            </div>
            <div className="p-5">
              <p className="text-lg font-semibold text-gray-900">{po.vendorName}</p>
              {vendor && (
                <div className="mt-3 space-y-2 text-sm">
                  <p className="text-gray-600">
                    <span className="text-gray-500">Code:</span> {vendor.code}
                  </p>
                  <p className="text-gray-600">
                    <span className="text-gray-500">Email:</span> {vendor.email}
                  </p>
                  <p className="text-gray-600">
                    <span className="text-gray-500">Phone:</span> {vendor.phone}
                  </p>
                  <p className="text-gray-600">
                    <span className="text-gray-500">Rating:</span>{" "}
                    <span className="text-yellow-500">★</span> {vendor.rating}/5
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Notes */}
          {po.notes && (
            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
              <div className="px-5 py-4 border-b">
                <h3 className="font-medium text-gray-900">Notes</h3>
              </div>
              <div className="p-5">
                <p className="text-sm text-gray-700">{po.notes}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
