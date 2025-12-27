import { useState } from 'react';
import { useDojoState, dojo, PurchaseOrder } from '../dojo/state';

type POFilter = 'all' | PurchaseOrder['status'];

const statusColors: Record<PurchaseOrder['status'], string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  approved: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
  delivered: 'bg-blue-100 text-blue-800',
  partial: 'bg-purple-100 text-purple-800',
};

export default function Procurement() {
  const purchaseOrders = useDojoState('purchaseOrders');
  const searchQuery = useDojoState('searchQuery');
  const [filter, setFilter] = useState<POFilter>('all');
  const [selectedPO, setSelectedPO] = useState<PurchaseOrder | null>(null);
  const [comment, setComment] = useState('');

  const filteredPOs = purchaseOrders.filter((po) => {
    const matchesFilter = filter === 'all' || po.status === filter;
    const matchesSearch =
      searchQuery === '' ||
      po.poNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      po.vendor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleApprove = (po: PurchaseOrder) => {
    const updatedPOs = purchaseOrders.map((p) =>
      p.id === po.id ? { ...p, status: 'approved' as const } : p
    );
    dojo.setState('purchaseOrders', updatedPOs, `Approved PO ${po.poNumber}`, 'John Doe');
    setSelectedPO(null);
  };

  const handleReject = (po: PurchaseOrder) => {
    const updatedPOs = purchaseOrders.map((p) =>
      p.id === po.id ? { ...p, status: 'rejected' as const } : p
    );
    dojo.setState('purchaseOrders', updatedPOs, `Rejected PO ${po.poNumber}`, 'John Doe');
    setSelectedPO(null);
  };

  const handleAddComment = (po: PurchaseOrder) => {
    if (!comment.trim()) return;
    const newComment = {
      id: `cmt-${Date.now()}`,
      user: 'John Doe',
      text: comment,
      timestamp: new Date().toISOString(),
    };
    const updatedPOs = purchaseOrders.map((p) =>
      p.id === po.id ? { ...p, comments: [...(p.comments || []), newComment] } : p
    );
    dojo.setState('purchaseOrders', updatedPOs, `Added comment on PO ${po.poNumber}`, 'John Doe');
    setComment('');
    setSelectedPO(updatedPOs.find((p) => p.id === po.id) || null);
  };

  const filters: { id: POFilter; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'pending', label: 'Pending' },
    { id: 'approved', label: 'Approved' },
    { id: 'rejected', label: 'Rejected' },
    { id: 'delivered', label: 'Delivered' },
    { id: 'partial', label: 'Partial' },
  ];

  return (
    <div className="flex gap-6">
      <div className="flex-1">
        <div className="flex gap-2 mb-4">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === f.id
                  ? 'bg-[#0f4c81] text-white'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left p-4 text-sm font-medium text-gray-600">PO Number</th>
                <th className="text-left p-4 text-sm font-medium text-gray-600">Vendor</th>
                <th className="text-left p-4 text-sm font-medium text-gray-600">Amount</th>
                <th className="text-left p-4 text-sm font-medium text-gray-600">Status</th>
                <th className="text-left p-4 text-sm font-medium text-gray-600">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredPOs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">
                    No purchase orders match your criteria
                  </td>
                </tr>
              ) : (
                filteredPOs.map((po) => (
                  <tr
                    key={po.id}
                    onClick={() => setSelectedPO(po)}
                    className={`cursor-pointer hover:bg-gray-50 ${selectedPO?.id === po.id ? 'bg-blue-50' : ''}`}
                  >
                    <td className="p-4 font-medium text-gray-800">{po.poNumber}</td>
                    <td className="p-4 text-gray-600">{po.vendor}</td>
                    <td className="p-4 text-gray-800">${po.totalAmount.toLocaleString()}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[po.status]}`}>
                        {po.status}
                      </span>
                    </td>
                    <td className="p-4 text-gray-500 text-sm">{new Date(po.createdDate).toLocaleDateString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selectedPO && (
        <div className="w-96 bg-white rounded-lg shadow-sm border border-gray-200 h-fit sticky top-20">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="font-semibold text-gray-800">{selectedPO.poNumber}</h2>
            <button onClick={() => setSelectedPO(null)} className="text-gray-400 hover:text-gray-600">✕</button>
          </div>
          <div className="p-4 space-y-4">
            <div>
              <div className="text-sm text-gray-500">Vendor</div>
              <div className="font-medium text-gray-800">{selectedPO.vendor}</div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-500">Total Amount</div>
                <div className="text-xl font-bold text-gray-800">${selectedPO.totalAmount.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Status</div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[selectedPO.status]}`}>
                  {selectedPO.status}
                </span>
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-2">Line Items</div>
              <div className="space-y-2">
                {selectedPO.items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm bg-gray-50 p-2 rounded">
                    <span className="text-gray-700">{item.description}</span>
                    <span className="text-gray-800 font-medium">${(item.quantity * item.unitPrice).toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
            {selectedPO.comments && selectedPO.comments.length > 0 && (
              <div>
                <div className="text-sm text-gray-500 mb-2">Comments</div>
                <div className="space-y-2">
                  {selectedPO.comments.map((c) => (
                    <div key={c.id} className="text-sm bg-gray-50 p-2 rounded">
                      <div className="text-gray-800">{c.text}</div>
                      <div className="text-xs text-gray-500 mt-1">{c.user} • {new Date(c.timestamp).toLocaleString()}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div>
              <div className="text-sm text-gray-500 mb-2">Add Comment</div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Enter comment..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0f4c81]/20"
                />
                <button
                  onClick={() => handleAddComment(selectedPO)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm font-medium"
                >
                  Add
                </button>
              </div>
            </div>
            {selectedPO.status === 'pending' && (
              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => handleApprove(selectedPO)}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleReject(selectedPO)}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium"
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
