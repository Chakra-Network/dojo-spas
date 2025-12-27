import { useState } from 'react';
import { useDojoState, dojo, PurchaseOrder } from '../dojo/state';

type POFilter = 'all' | PurchaseOrder['status'];

const statusColors: Record<PurchaseOrder['status'], string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  approved: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
  delivered: 'bg-blue-100 text-blue-800',
  partially_delivered: 'bg-purple-100 text-purple-800',
};

export default function Procurement() {
  const purchaseOrders = useDojoState('purchaseOrders');
  const searchQuery = useDojoState('searchQuery');
  const [filter, setFilter] = useState<POFilter>('all');
  const [selectedPO, setSelectedPO] = useState<PurchaseOrder | null>(null);

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
      p.id === po.id ? { ...p, status: 'approved' as const, approvedBy: 'John Doe', approvalDate: new Date().toISOString() } : p
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

  const filters: { id: POFilter; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'pending', label: 'Pending' },
    { id: 'approved', label: 'Approved' },
    { id: 'rejected', label: 'Rejected' },
    { id: 'delivered', label: 'Delivered' },
    { id: 'partially_delivered', label: 'Partial' },
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
                        {po.status === 'partially_delivered' ? 'Partial' : po.status}
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
                  {selectedPO.status === 'partially_delivered' ? 'Partial' : selectedPO.status}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-500">Plant</div>
                <div className="text-gray-800">{selectedPO.plant}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Purchasing Org</div>
                <div className="text-gray-800">{selectedPO.purchasingOrg}</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-500">Created</div>
                <div className="text-gray-800">{new Date(selectedPO.createdDate).toLocaleDateString()}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Delivery Date</div>
                <div className="text-gray-800">{new Date(selectedPO.deliveryDate).toLocaleDateString()}</div>
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-2">Line Items ({selectedPO.items.length})</div>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {selectedPO.items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm bg-gray-50 p-2 rounded">
                    <div>
                      <div className="text-gray-700">{item.description}</div>
                      <div className="text-xs text-gray-500">{item.quantity} {item.unit} @ ${item.unitPrice.toLocaleString()}</div>
                    </div>
                    <span className="text-gray-800 font-medium">${item.totalPrice.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
            {selectedPO.notes && (
              <div>
                <div className="text-sm text-gray-500">Notes</div>
                <div className="text-gray-800 bg-gray-50 p-2 rounded text-sm">{selectedPO.notes}</div>
              </div>
            )}
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
            {selectedPO.status !== 'pending' && selectedPO.approvedBy && (
              <div className="text-sm p-2 rounded bg-green-50 text-green-700">
                Approved by {selectedPO.approvedBy} on {new Date(selectedPO.approvalDate!).toLocaleDateString()}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
