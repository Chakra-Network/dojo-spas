import {
  LayoutDashboard,
  Megaphone,
  Mails,
  Contact,
  ScrollText,
  Bot,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "../../lib/utils";
import type { AppView } from "../../lib/types";

interface SidebarProps {
  activeView: AppView;
  onNavigate: (view: AppView) => void;
}

const navItems: { id: AppView; label: string; icon: LucideIcon }[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "campaigns", label: "Campaigns", icon: Megaphone },
  { id: "emails", label: "Emails", icon: Mails },
  { id: "contacts", label: "Contacts", icon: Contact },
  { id: "logs", label: "Logs", icon: ScrollText },
];

function Sidebar({ activeView, onNavigate }: SidebarProps) {
  return (
    <aside className="w-64 bg-hub-gray-900 text-white flex flex-col shrink-0">
      <div className="h-20 flex items-center justify-center border-b border-hub-gray-800">
        <Bot className="h-8 w-8 mr-3 text-hub-orange" />
        <h1 className="text-xl font-bold">HubSpot SPA</h1>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={cn(
              "w-full flex items-center px-4 py-2.5 text-sm font-medium rounded-md transition-colors focus-ring",
              activeView === item.id
                ? "bg-hub-orange text-white"
                : "text-gray-300 hover:bg-hub-gray-800 hover:text-white active:bg-hub-gray-900"
            )}
          >
            <item.icon className="h-5 w-5 mr-3" />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;