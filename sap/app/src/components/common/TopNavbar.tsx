import { cn } from "@/lib/utils";
import { useAppContext } from "@/context/AppProvider";
import { Search, Bell, HelpCircle, User, X, ChevronRight } from "lucide-react";
import { currentUser } from "@/lib/fixtures";

export default function TopNavbar() {
  const { state, setActiveTab, removeTab, setSearchOpen } = useAppContext();

  const getTabLabel = (tab: typeof state.tabs[0]) => {
    switch (tab.type) {
      case "dashboard":
        return "Dashboard";
      case "procurement":
        return "Purchase Orders";
      case "po-detail":
        const po = state.purchaseOrders.find((p) => p.id === tab.dataId);
        return po?.poNumber || "PO Detail";
      case "tasks":
        return "My Tasks";
      case "audit":
        return "Audit Log";
      default:
        return tab.id;
    }
  };

  return (
    <header className="fixed top-0 left-[72px] right-0 h-[48px] sap-shell-header z-40 flex items-center justify-between px-4">
      {/* Tabs / Breadcrumbs */}
      <div className="flex items-center gap-1 overflow-x-auto max-w-[60%] scrollbar-hide">
        {state.tabs.map((tab, index) => (
          <div key={tab.id} className="flex items-center">
            {index > 0 && (
              <ChevronRight className="w-4 h-4 text-white/40 mx-1 flex-shrink-0" />
            )}
            <button
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-2 px-3 py-1.5 rounded text-sm whitespace-nowrap transition-all",
                state.activeTabId === tab.id
                  ? "bg-white/20 text-white"
                  : "text-white/70 hover:text-white hover:bg-white/10"
              )}
            >
              <span className="truncate max-w-[150px]">{getTabLabel(tab)}</span>
              {tab.type !== "dashboard" && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeTab(tab.id);
                  }}
                  className="p-0.5 rounded hover:bg-white/20 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2">
        {/* Search Button */}
        <button
          onClick={() => setSearchOpen(true)}
          className="flex items-center gap-2 px-3 py-1.5 rounded bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-all"
        >
          <Search className="w-4 h-4" />
          <span className="text-sm hidden sm:inline">Search...</span>
          <kbd className="hidden sm:inline text-[10px] bg-white/10 px-1.5 py-0.5 rounded">⌘K</kbd>
        </button>

        {/* Notifications */}
        <button className="relative p-2 rounded hover:bg-white/10 text-white/70 hover:text-white transition-all">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        {/* Help */}
        <button className="p-2 rounded hover:bg-white/10 text-white/70 hover:text-white transition-all">
          <HelpCircle className="w-5 h-5" />
        </button>

        {/* User Profile */}
        <button className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-white/10 transition-all">
          <div className="w-7 h-7 rounded-full bg-[#0a6ed1] flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
          <div className="hidden md:block text-left">
            <p className="text-xs text-white font-medium">{currentUser.name}</p>
            <p className="text-[10px] text-white/60">{currentUser.role}</p>
          </div>
        </button>
      </div>
    </header>
  );
}
