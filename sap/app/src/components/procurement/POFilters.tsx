import { useAppContext } from "@/context/AppProvider";
import { Filter, X } from "lucide-react";
import type { POStatus } from "@/lib/types";

export default function POFilters() {
  const { state, setPOFilters } = useAppContext();

  const statuses: (POStatus | "All")[] = [
    "All",
    "Draft",
    "Pending Approval",
    "Approved",
    "Rejected",
    "Ordered",
    "Delivered",
  ];

  const hasActiveFilters = 
    state.poFilters.status !== "All" || 
    state.poFilters.vendor !== "";

  const clearFilters = () => {
    setPOFilters({
      status: "All",
      vendor: "",
      dateRange: "all",
    });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-500" />
          <h3 className="font-semibold text-gray-900">Filters</h3>
        </div>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1"
          >
            <X className="w-4 h-4" />
            Clear
          </button>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Status
        </label>
        <select
          value={state.poFilters.status}
          onChange={(e) => setPOFilters({ status: e.target.value as POStatus | "All" })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00a9e0] focus:border-transparent"
        >
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Vendor
        </label>
        <input
          type="text"
          value={state.poFilters.vendor}
          onChange={(e) => setPOFilters({ vendor: e.target.value })}
          placeholder="Search by vendor name..."
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00a9e0] focus:border-transparent"
        />
      </div>
    </div>
  );
}

