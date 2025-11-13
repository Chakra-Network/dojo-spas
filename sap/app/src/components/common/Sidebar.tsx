import { 
  LayoutDashboard, 
  ShoppingCart, 
  CheckSquare, 
  FileText,
  ChevronRight
} from "lucide-react";
import { useAppContext } from "@/context/AppProvider";
import { cn } from "@/lib/utils";

export default function Sidebar() {
  const { state, setCurrentSection } = useAppContext();

  const menuItems = [
    { id: "dashboard" as const, label: "Dashboard", icon: LayoutDashboard },
    { id: "procurement" as const, label: "Procurement", icon: ShoppingCart },
    { id: "tasks" as const, label: "Tasks", icon: CheckSquare },
    { id: "audit" as const, label: "Audit Trail", icon: FileText },
  ];

  const pendingTasksCount = state.tasks.filter(t => t.status === "Pending").length;
  const pendingPOsCount = state.purchaseOrders.filter(
    po => po.status === "Pending Approval"
  ).length;

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-[#1a1a1a] text-white flex flex-col border-r border-gray-800">
      <div className="p-6 border-b border-gray-800">
        <h1 className="text-2xl font-bold text-[#00a9e0]">SAP</h1>
        <p className="text-xs text-gray-400 mt-1">ERP System</p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = state.currentSection === item.id;
          const badge = 
            item.id === "tasks" ? pendingTasksCount :
            item.id === "procurement" ? pendingPOsCount : 0;

          return (
            <button
              key={item.id}
              onClick={() => setCurrentSection(item.id)}
              className={cn(
                "w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors group",
                isActive
                  ? "bg-[#00a9e0] text-white"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              )}
            >
              <div className="flex items-center gap-3">
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </div>
              <div className="flex items-center gap-2">
                {badge > 0 && (
                  <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                    {badge}
                  </span>
                )}
                {isActive && <ChevronRight className="w-4 h-4" />}
              </div>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#00a9e0] flex items-center justify-center font-semibold">
            {state.currentUser.split(" ").map(n => n[0]).join("")}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{state.currentUser}</p>
            <p className="text-xs text-gray-400">Finance Manager</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

