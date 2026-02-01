import {
  LayoutDashboard,
  FileText,
  Receipt,
  GitCompareArrows,
  ChevronLeft,
  ChevronRight,
  BookOpen,
} from "lucide-react";
import type { NavSection } from "../lib/types";
import { classNames } from "../lib/utils";

const navItems: { id: NavSection; label: string; icon: typeof LayoutDashboard }[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "invoices", label: "Invoices", icon: FileText },
  { id: "expenses", label: "Expenses", icon: Receipt },
  { id: "reconciliation", label: "Bank Reconciliation", icon: GitCompareArrows },
];

interface SidebarProps {
  currentSection: NavSection;
  onNavigate: (section: NavSection) => void;
  collapsed: boolean;
  onToggle: () => void;
  auditOpen: boolean;
  onAuditToggle: () => void;
}

export default function Sidebar({
  currentSection,
  onNavigate,
  collapsed,
  onToggle,
  auditOpen,
  onAuditToggle,
}: SidebarProps) {
  return (
    <aside
      className={classNames(
        "flex flex-col bg-[#0b2b0b] text-gray-100 transition-all duration-200",
        collapsed ? "w-16" : "w-56",
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-2 px-4 h-14 border-b border-white/10">
        <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center font-bold text-sm text-white shrink-0">
          QB
        </div>
        {!collapsed && (
          <span className="font-semibold text-sm tracking-tight whitespace-nowrap">
            QuickBooks
          </span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-3 space-y-1 px-2">
        {navItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onNavigate(id)}
            className={classNames(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
              currentSection === id
                ? "bg-emerald-600/30 text-emerald-300"
                : "text-gray-400 hover:bg-white/5 hover:text-gray-200",
            )}
          >
            <Icon size={18} className="shrink-0" />
            {!collapsed && label}
          </button>
        ))}
      </nav>

      {/* Audit toggle */}
      <div className="px-2 pb-2">
        <button
          onClick={onAuditToggle}
          className={classNames(
            "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
            auditOpen
              ? "bg-amber-600/30 text-amber-300"
              : "text-gray-400 hover:bg-white/5 hover:text-gray-200",
          )}
        >
          <BookOpen size={18} className="shrink-0" />
          {!collapsed && "Audit Trail"}
        </button>
      </div>

      {/* Collapse toggle */}
      <button
        onClick={onToggle}
        className="flex items-center justify-center h-10 border-t border-white/10 text-gray-500 hover:text-gray-300 transition-colors"
      >
        {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>
    </aside>
  );
}
