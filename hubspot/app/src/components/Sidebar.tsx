import {
  LayoutDashboard,
  Megaphone,
  Mail,
  Users,
  Activity,
  ChevronLeft,
  ChevronRight,
  Hexagon,
} from "lucide-react";
import type { NavSection } from "../lib/types";

interface SidebarProps {
  currentSection: NavSection;
  onNavigate: (section: NavSection) => void;
  collapsed: boolean;
  onToggle: () => void;
}

const navItems: { id: NavSection; label: string; icon: typeof LayoutDashboard }[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "campaigns", label: "Campaigns", icon: Megaphone },
  { id: "email", label: "Email Designer", icon: Mail },
  { id: "contacts", label: "Contacts", icon: Users },
  { id: "automation", label: "Automation Log", icon: Activity },
];

export default function Sidebar({ currentSection, onNavigate, collapsed, onToggle }: SidebarProps) {
  return (
    <div
      className={`bg-[#1b2a4a] flex flex-col h-full transition-all duration-300 ${
        collapsed ? "w-16" : "w-60"
      }`}
    >
      {/* Brand */}
      <div className="flex items-center gap-2.5 px-4 h-14 border-b border-white/10">
        <Hexagon className="w-7 h-7 text-orange-400 shrink-0" strokeWidth={2.5} />
        {!collapsed && (
          <span className="text-white font-bold text-lg tracking-tight">HubSpot</span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-3 space-y-0.5 overflow-y-auto">
        {navItems.map(({ id, label, icon: Icon }) => {
          const active = currentSection === id;
          return (
            <button
              key={id}
              onClick={() => onNavigate(id)}
              title={collapsed ? label : undefined}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors ${
                active
                  ? "bg-orange-500/20 text-orange-300 border-r-3 border-orange-400"
                  : "text-gray-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon className="w-5 h-5 shrink-0" />
              {!collapsed && <span>{label}</span>}
            </button>
          );
        })}
      </nav>

      {/* Collapse toggle */}
      <button
        onClick={onToggle}
        className="flex items-center justify-center h-10 border-t border-white/10 text-gray-400 hover:text-white transition-colors"
      >
        {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </button>
    </div>
  );
}
