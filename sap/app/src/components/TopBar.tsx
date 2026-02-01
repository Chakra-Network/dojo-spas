import { Search, Bell, User, X } from "lucide-react";
import { useAppContext } from "../store/AppProvider.tsx";

export default function TopBar() {
  const { state, setSearchQuery } = useAppContext();

  return (
    <header
      className={`fixed top-0 z-30 flex h-14 items-center gap-4 border-b border-sap-border bg-white px-6 transition-all duration-200 ${
        state.sidebarCollapsed ? "left-16" : "left-56"
      } right-0`}
    >
      {/* Search */}
      <div className="relative flex-1 max-w-xl">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-sap-text-secondary" />
        <input
          type="text"
          value={state.searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search purchase orders, tasks, vendors…"
          className="w-full rounded-md border border-sap-border bg-sap-bg py-2 pl-9 pr-9 text-sm outline-none transition-colors focus:border-sap-brand focus:ring-1 focus:ring-sap-brand/30"
        />
        {state.searchQuery && (
          <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-sap-text-secondary hover:text-sap-text">
            <X size={14} />
          </button>
        )}
      </div>

      {/* Right section */}
      <div className="flex items-center gap-3">
        <button className="relative rounded-full p-2 text-sap-text-secondary transition-colors hover:bg-sap-bg hover:text-sap-text">
          <Bell size={18} />
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-sap-negative" />
        </button>
        <div className="flex items-center gap-2 rounded-full bg-sap-bg px-3 py-1.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-sap-shell text-xs font-bold text-white">
            <User size={14} />
          </div>
          <span className="text-sm font-medium text-sap-text">Dr. Richter</span>
        </div>
      </div>
    </header>
  );
}
