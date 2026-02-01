import { LayoutDashboard, ShoppingCart, ClipboardCheck, ScrollText, ChevronLeft, ChevronRight, Hexagon } from "lucide-react";
import { useAppContext } from "../store/AppProvider.tsx";
import type { ViewId } from "../types/index.ts";

const navItems: { id: ViewId; label: string; icon: typeof LayoutDashboard }[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "procurement", label: "Procurement", icon: ShoppingCart },
  { id: "tasks", label: "My Tasks", icon: ClipboardCheck },
  { id: "audit", label: "Audit Trail", icon: ScrollText },
];

export default function Sidebar() {
  const { state, navigate, toggleSidebar } = useAppContext();
  const collapsed = state.sidebarCollapsed;
  const currentView = state.currentView === "procurement-detail" ? "procurement" : state.currentView;

  return (
    <aside
      className={`fixed left-0 top-0 z-40 flex h-screen flex-col bg-sap-shell text-white transition-all duration-200 ${collapsed ? "w-16" : "w-56"}`}
    >
      {/* Logo area */}
      <div className="flex h-14 items-center gap-2 border-b border-white/10 px-4">
        <Hexagon size={24} className="shrink-0 text-sap-gold" />
        {!collapsed && <span className="text-sm font-bold tracking-wide">SAP S/4HANA</span>}
      </div>

      {/* Nav */}
      <nav className="mt-2 flex flex-1 flex-col gap-0.5 px-2">
        {navItems.map((item) => {
          const active = currentView === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.id)}
              title={collapsed ? item.label : undefined}
              className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors ${
                active ? "bg-white/15 font-semibold" : "hover:bg-white/8"
              } ${collapsed ? "justify-center" : ""}`}
            >
              <Icon size={18} className="shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </button>
          );
        })}
      </nav>

      {/* Collapse toggle */}
      <button
        onClick={toggleSidebar}
        className="flex h-10 items-center justify-center border-t border-white/10 text-white/60 transition-colors hover:text-white"
      >
        {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>
    </aside>
  );
}
