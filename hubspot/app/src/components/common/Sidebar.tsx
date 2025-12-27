import {
  LayoutDashboard,
  Megaphone,
  Mail,
  Users,
  Activity,
  Settings,
} from "lucide-react";
import { useAppContext } from "@/context/AppProvider";

const navItems = [
  { id: "dashboard", type: "dashboard" as const, icon: LayoutDashboard, label: "Dashboard" },
  { id: "campaigns", type: "campaigns" as const, icon: Megaphone, label: "Campaigns" },
  { id: "email-editor", type: "email-editor" as const, icon: Mail, label: "Email" },
  { id: "contacts", type: "contacts" as const, icon: Users, label: "Contacts" },
  { id: "automation-log", type: "automation-log" as const, icon: Activity, label: "Automation" },
];

export default function Sidebar() {
  const { activeTab, addTab } = useAppContext();

  return (
    <aside className="fixed left-0 top-0 h-screen w-[220px] bg-[#2d3e50] text-white flex flex-col z-50">
      <div className="p-4 border-b border-[#3a4d5f]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#ff7a59] rounded flex items-center justify-center font-bold">
            H
          </div>
          <span className="font-semibold text-lg">HubSpot</span>
        </div>
      </div>
      <nav className="flex-1 py-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab?.type === item.type;
          return (
            <button
              key={item.id}
              onClick={() => addTab({ id: item.id, type: item.type })}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                isActive
                  ? "bg-[#3a4d5f] text-white"
                  : "text-gray-300 hover:bg-[#3a4d5f] hover:text-white"
              }`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
      <div className="p-4 border-t border-[#3a4d5f]">
        <button className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors">
          <Settings size={20} />
          <span>Settings</span>
        </button>
      </div>
    </aside>
  );
}
