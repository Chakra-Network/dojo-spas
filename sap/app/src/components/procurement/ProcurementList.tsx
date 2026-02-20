import { useMemo, useState } from "react";
import { cn, formatCurrency, formatDate, getStatusColor } from "@/lib/utils";
import { useAppContext } from "@/context/AppProvider";
import {
  FileText,
  Search,
  Filter,
  Plus,
  ChevronDown,
  ArrowUpDown,
  Eye,
} from "lucide-react";
import { PO_STATUS_OPTIONS } from "@/lib/consts";

type SortField = "poNumber" | "vendorName" | "totalAmount" | "status" | "updatedAt";
type SortDirection = "asc" | "desc";

export default function ProcurementList() {
  const { state, addTab, setPOStatusFilter, openApprovePODialog } = useAppContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<SortField>("updatedAt");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  // Filter and sort POs
  const filteredPOs = useMemo(() => {
    let result = [...state.purchaseOrders];

    // Apply status filter
    if (state.poStatusFilter !== "all") {
      result = result.filter((po) => po.status === state.poStatusFilter);
    }

    // Apply search
    if (searchTerm.trim()) {
      const search = searchTerm.toLowerCase();
      result = result.filter(
        (po) =>
          po.poNumber.toLowerCase().includes(search) ||
          po.vendorName.toLowerCase().includes(search) ||
          po.notes?.toLowerCase().includes(search)
      );
    }

    // Apply sorting
    result.sort((a, b) => {
      let aVal: string | number = "";
      let bVal: string | number = "";

      switch (sortField) {
        case "poNumber":
          aVal = a.poNumber;
          bVal = b.poNumber;
          break;
        case "vendorName":
          aVal = a.vendorName;
          bVal = b.vendorName;
          break;
        case "totalAmount":
          aVal = a.totalAmount;
          bVal = b.totalAmount;
          break;
        case "status":
          aVal = a.status;
          bVal = b.status;
          break;
        case "updatedAt":
          aVal = a.updatedAt;
          bVal = b.updatedAt;
          break;
      }

      if (typeof aVal === "string") {
        return sortDirection === "asc"
          ? aVal.localeCompare(bVal as string)
          : (bVal as string).localeCompare(aVal);
      }
      return sortDirection === "asc" ? aVal - (bVal as number) : (bVal as number) - aVal;
    });

    return result;
  }, [state.purchaseOrders, state.poStatusFilter, searchTerm, sortField, sortDirection]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const SortHeader = ({ field, children }: { field: SortField; children: React.ReactNode }) => (
    <button
      onClick={() => handleSort(field)}
      className="flex items-center gap-1 group"
    >
      {children}
      <ArrowUpDown
        className={cn(
          "w-3 h-3 transition-colors",
          sortField === field ? "text-[#0a6ed1]" : "text-gray-400 group-hover:text-gray-600"
        )}
      />
    </button>
  );

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Purchase Orders</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage and track all procurement activities
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#0a6ed1] hover:bg-[#0858a6] text-white rounded-lg transition-colors">
          <Plus className="w-4 h-4" />
          <span className="font-medium">New PO</span>
        </button>
      </div>

      {/* Filters Bar */}
      <div className="bg-white rounded-xl shadow-sm border mb-4">
        <div className="flex items-center gap-4 p-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by PO number, vendor, or notes..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0a6ed1]/20 focus:border-[#0a6ed1]"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <div className="relative">
              <select
                value={state.poStatusFilter}
                onChange={(e) => setPOStatusFilter(e.target.value)}
                className="appearance-none pl-3 pr-8 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0a6ed1]/20 focus:border-[#0a6ed1] bg-white"
              >
                <option value="all">All Status</option>
                {PO_STATUS_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="px-4 pb-3 text-xs text-gray-500">
          Showing {filteredPOs.length} of {state.purchaseOrders.length} purchase orders
        </div>
      </div>

      {/* PO Table */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50 border-b text-xs font-medium text-gray-500 uppercase tracking-wider">
          <div className="col-span-2">
            <SortHeader field="poNumber">PO Number</SortHeader>
          </div>
          <div className="col-span-3">
            <SortHeader field="vendorName">Vendor</SortHeader>
          </div>
          <div className="col-span-2">
            <SortHeader field="status">Status</SortHeader>
          </div>
          <div className="col-span-2 text-right">
            <SortHeader field="totalAmount">Amount</SortHeader>
          </div>
          <div className="col-span-2">
            <SortHeader field="updatedAt">Updated</SortHeader>
          </div>
          <div className="col-span-1 text-right">Actions</div>
        </div>

        {/* Table Body */}
        <div className="divide-y">
          {filteredPOs.map((po) => {
            const statusColors = getStatusColor(po.status);

            return (
              <div
                key={po.id}
                className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-gray-50 transition-colors"
              >
                {/* PO Number */}
                <div className="col-span-2">
                  <button
                    onClick={() =>
                      addTab({ id: `po-${po.id}`, type: "po-detail", dataId: po.id })
                    }
                    className="text-sm font-medium text-[#0a6ed1] hover:underline"
                  >
                    {po.poNumber}
                  </button>
                </div>

                {/* Vendor */}
                <div className="col-span-3">
                  <p className="text-sm text-gray-900">{po.vendorName}</p>
                  <p className="text-xs text-gray-500 truncate">{po.notes}</p>
                </div>

                {/* Status */}
                <div className="col-span-2">
                  <span
                    className={cn(
                      "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border",
                      statusColors.bg,
                      statusColors.text,
                      statusColors.border
                    )}
                  >
                    {po.status}
                  </span>
                </div>

                {/* Amount */}
                <div className="col-span-2 text-right">
                  <p className="text-sm font-semibold text-gray-900">
                    {formatCurrency(po.totalAmount, po.currency)}
                  </p>
                  <p className="text-xs text-gray-500">
                    {po.lineItems.length} item{po.lineItems.length !== 1 ? "s" : ""}
                  </p>
                </div>

                {/* Updated */}
                <div className="col-span-2">
                  <p className="text-sm text-gray-700">{formatDate(po.updatedAt)}</p>
                </div>

                {/* Actions */}
                <div className="col-span-1 flex items-center justify-end gap-2">
                  <button
                    onClick={() =>
                      addTab({ id: `po-${po.id}`, type: "po-detail", dataId: po.id })
                    }
                    className="p-1.5 rounded hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors"
                    title="View Details"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  {po.status === "Pending Approval" && (
                    <button
                      onClick={() => openApprovePODialog(po.id)}
                      className="px-2 py-1 text-xs font-medium text-white bg-green-600 hover:bg-green-700 rounded transition-colors"
                    >
                      Review
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredPOs.length === 0 && (
          <div className="px-6 py-12 text-center">
            <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-sm font-medium text-gray-900">No purchase orders found</p>
            <p className="text-xs text-gray-500 mt-1">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
