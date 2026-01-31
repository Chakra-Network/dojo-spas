import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { useAppContext } from "@/context/AppProvider";
import { Search, X, FileText, ClipboardList, Users, Package } from "lucide-react";
import type { SearchResult } from "@/lib/types";

export default function GlobalSearch() {
  const { state, setSearchOpen, setSearchQuery, addTab } = useAppContext();
  const [localQuery, setLocalQuery] = useState("");

  // Keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(!state.isSearchOpen);
      }
      if (e.key === "Escape" && state.isSearchOpen) {
        setSearchOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [state.isSearchOpen, setSearchOpen]);

  // Search results
  const results = useMemo<SearchResult[]>(() => {
    if (!localQuery.trim()) return [];

    const query = localQuery.toLowerCase();
    const searchResults: SearchResult[] = [];

    // Search Purchase Orders
    state.purchaseOrders.forEach((po) => {
      if (
        po.poNumber.toLowerCase().includes(query) ||
        po.vendorName.toLowerCase().includes(query) ||
        po.notes?.toLowerCase().includes(query)
      ) {
        searchResults.push({
          id: po.id,
          type: "PurchaseOrder",
          title: po.poNumber,
          subtitle: `${po.vendorName} • ${po.totalAmount.toLocaleString()} ${po.currency}`,
          status: po.status,
        });
      }
    });

    // Search Tasks
    state.tasks.forEach((task) => {
      if (
        task.title.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query)
      ) {
        searchResults.push({
          id: task.id,
          type: "Task",
          title: task.title,
          subtitle: task.description.substring(0, 60) + "...",
          status: task.status,
        });
      }
    });

    // Search Vendors
    state.vendors.forEach((vendor) => {
      if (
        vendor.name.toLowerCase().includes(query) ||
        vendor.code.toLowerCase().includes(query)
      ) {
        searchResults.push({
          id: vendor.id,
          type: "Vendor",
          title: vendor.name,
          subtitle: vendor.code,
        });
      }
    });

    // Search Materials
    state.materials.forEach((material) => {
      if (
        material.name.toLowerCase().includes(query) ||
        material.code.toLowerCase().includes(query)
      ) {
        searchResults.push({
          id: material.id,
          type: "Material",
          title: material.name,
          subtitle: material.code,
        });
      }
    });

    return searchResults.slice(0, 10);
  }, [localQuery, state.purchaseOrders, state.tasks, state.vendors, state.materials]);

  const handleResultClick = (result: SearchResult) => {
    if (result.type === "PurchaseOrder") {
      addTab({ id: `po-${result.id}`, type: "po-detail", dataId: result.id });
    } else if (result.type === "Task") {
      addTab({ id: "tasks", type: "tasks" });
    }
    setSearchOpen(false);
    setLocalQuery("");
    setSearchQuery("");
  };

  const getIcon = (type: SearchResult["type"]) => {
    switch (type) {
      case "PurchaseOrder":
        return FileText;
      case "Task":
        return ClipboardList;
      case "Vendor":
        return Users;
      case "Material":
        return Package;
    }
  };

  if (!state.isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => setSearchOpen(false)}
      />

      {/* Search Modal */}
      <div className="relative w-full max-w-2xl mx-4 bg-white rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Search Input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={localQuery}
            onChange={(e) => setLocalQuery(e.target.value)}
            placeholder="Search purchase orders, tasks, vendors..."
            className="flex-1 text-base outline-none placeholder:text-gray-400"
            autoFocus
          />
          <button
            onClick={() => setSearchOpen(false)}
            className="p-1 rounded hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-[400px] overflow-y-auto">
          {localQuery.trim() && results.length === 0 && (
            <div className="px-4 py-8 text-center text-gray-500">
              No results found for "{localQuery}"
            </div>
          )}

          {results.length > 0 && (
            <div className="py-2">
              {results.map((result) => {
                const Icon = getIcon(result.type);
                return (
                  <button
                    key={`${result.type}-${result.id}`}
                    onClick={() => handleResultClick(result)}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
                  >
                    <div className={cn(
                      "w-10 h-10 rounded-lg flex items-center justify-center",
                      result.type === "PurchaseOrder" && "bg-blue-100 text-blue-600",
                      result.type === "Task" && "bg-purple-100 text-purple-600",
                      result.type === "Vendor" && "bg-green-100 text-green-600",
                      result.type === "Material" && "bg-orange-100 text-orange-600"
                    )}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {result.title}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {result.subtitle}
                      </p>
                    </div>
                    {result.status && (
                      <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                        {result.status}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {/* Quick Actions */}
          {!localQuery.trim() && (
            <div className="p-4">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-3">
                Quick Actions
              </p>
              <div className="space-y-2">
                <button
                  onClick={() => {
                    addTab({ id: "procurement", type: "procurement" });
                    setSearchOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-left"
                >
                  <FileText className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-700">View all Purchase Orders</span>
                </button>
                <button
                  onClick={() => {
                    addTab({ id: "tasks", type: "tasks" });
                    setSearchOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-left"
                >
                  <ClipboardList className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-700">View my Tasks</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-4 py-2 border-t bg-gray-50 text-xs text-gray-500">
          <span>
            <kbd className="px-1.5 py-0.5 bg-white border rounded">↑↓</kbd> Navigate
            <kbd className="ml-2 px-1.5 py-0.5 bg-white border rounded">↵</kbd> Select
          </span>
          <span>
            <kbd className="px-1.5 py-0.5 bg-white border rounded">esc</kbd> Close
          </span>
        </div>
      </div>
    </div>
  );
}
