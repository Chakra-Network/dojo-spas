import { cn } from "@/lib/utils";
import { useAppContext } from "@/context/AppProvider";
import {
  LayoutDashboard,
  ShoppingCart,
  ClipboardList,
  FileText,
  Users,
  Package,
  Settings,
} from "lucide-react";

const navItems = [
  { id: "dashboard", icon: LayoutDashboard, label: "Dashboard", type: "dashboard" as const },
  { id: "procurement", icon: ShoppingCart, label: "Procurement", type: "procurement" as const },
  { id: "tasks", icon: ClipboardList, label: "Tasks", type: "tasks" as const },
  { id: "audit", icon: FileText, label: "Audit Log", type: "audit" as const },
];

const bottomItems = [
  { id: "vendors", icon: Users, label: "Vendors", disabled: true },
  { id: "materials", icon: Package, label: "Materials", disabled: true },
  { id: "settings", icon: Settings, label: "Settings", disabled: true },
];

export default function Sidebar() {
  const { state, addTab, setActiveTab } = useAppContext();

  const handleNavClick = (item: typeof navItems[0]) => {
    const existingTab = state.tabs.find((t) => t.type === item.type);
    if (existingTab) {
      setActiveTab(existingTab.id);
    } else {
      addTab({ id: item.id, type: item.type });
    }
  };

  return (
    <div className="fixed left-0 top-0 bottom-0 w-[72px] bg-[#354a5f] z-50 flex flex-col">
      {/* SAP Logo */}
      <div className="h-[48px] flex items-center justify-center border-b border-white/10">
        <div className="w-8 h-8 bg-[#0a6ed1] rounded flex items-center justify-center">
          <span className="text-white text-xs font-bold">SAP</span>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 py-2">
        <div className="space-y-1 px-2">
          {navItems.map((item) => {
            const isActive = state.activeTabId === item.id || 
              state.tabs.find(t => t.id === state.activeTabId)?.type === item.type;
            
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item)}
                className={cn(
                  "w-full flex flex-col items-center py-2 px-1 rounded-lg transition-all duration-200 group",
                  isActive
                    ? "bg-white/15 text-white"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                )}
                title={item.label}
              >
                <item.icon className={cn(
                  "w-5 h-5 mb-1 transition-transform group-hover:scale-110",
                  isActive && "text-[#0a6ed1]"
                )} />
                <span className="text-[10px] leading-tight text-center font-medium">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Bottom Navigation */}
      <div className="py-2 border-t border-white/10">
        <div className="space-y-1 px-2">
          {bottomItems.map((item) => (
            <button
              key={item.id}
              disabled={item.disabled}
              className={cn(
                "w-full flex flex-col items-center py-2 px-1 rounded-lg transition-all duration-200",
                item.disabled
                  ? "text-white/30 cursor-not-allowed"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              )}
              title={item.disabled ? `${item.label} (Coming Soon)` : item.label}
            >
              <item.icon className="w-5 h-5 mb-1" />
              <span className="text-[10px] leading-tight text-center font-medium">
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
