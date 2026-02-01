import { LayoutDashboard, Inbox, BookOpen, Clock, Headphones } from "lucide-react";
import type { ZenDeskState } from "../types";

interface Props {
  state: ZenDeskState;
  setState: (s: ZenDeskState | ((prev: ZenDeskState) => ZenDeskState)) => void;
}

const navItems = [
  { id: "dashboard" as const, label: "Dashboard", icon: LayoutDashboard },
  { id: "inbox" as const, label: "Ticket Inbox", icon: Inbox },
  { id: "macros" as const, label: "Macros", icon: BookOpen },
  { id: "sla" as const, label: "SLA Tracker", icon: Clock },
];

export default function Sidebar({ state, setState }: Props) {
  const newCount = state.tickets.filter((t) => t.status === "new").length;
  const urgentCount = state.tickets.filter((t) => t.priority === "urgent" && t.status !== "solved" && t.status !== "closed").length;

  return (
    <aside className="flex w-60 flex-shrink-0 flex-col border-r border-gray-200 bg-white">
      {/* Logo */}
      <div className="flex items-center gap-2 border-b border-gray-200 px-5 py-4">
        <Headphones className="h-6 w-6 text-emerald-600" />
        <span className="text-lg font-bold text-gray-900">ZenDesk</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-3">
        {navItems.map((item) => {
          const active = state.activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setState({ ...state, activeView: item.id, selectedTicketId: null })}
              className={`mb-0.5 flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left font-medium transition-colors ${
                active ? "bg-emerald-50 text-emerald-700" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <item.icon className="h-[18px] w-[18px]" />
              <span className="flex-1">{item.label}</span>
              {item.id === "inbox" && newCount > 0 && (
                <span className="rounded-full bg-red-500 px-2 py-0.5 text-xs font-semibold text-white">{newCount}</span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Agent info */}
      <div className="border-t border-gray-200 px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold text-white">
            {state.currentAgent.avatar}
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate font-medium text-gray-900">{state.currentAgent.name}</div>
            <div className="text-xs text-gray-500">{state.currentAgent.role} · {urgentCount} urgent</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
