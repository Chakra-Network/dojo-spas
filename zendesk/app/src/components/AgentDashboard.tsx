import { Inbox, Clock, AlertTriangle, CheckCircle, TrendingUp, Star, Zap, ArrowUpRight } from "lucide-react";
import type { ZenDeskState } from "../types";

interface Props {
  state: ZenDeskState;
  setState: (s: ZenDeskState | ((prev: ZenDeskState) => ZenDeskState)) => void;
}

export default function AgentDashboard({ state, setState }: Props) {
  const newTickets = state.tickets.filter((t) => t.status === "new");
  const openTickets = state.tickets.filter((t) => t.status === "open");
  const pendingTickets = state.tickets.filter((t) => t.status === "pending");
  const solvedTickets = state.tickets.filter((t) => t.status === "solved" || t.status === "closed");
  const breachedSLA = state.tickets.filter((t) => t.slaStatus === "breached");
  const warningSLA = state.tickets.filter((t) => t.slaStatus === "warning");
  const urgentOpen = state.tickets.filter((t) => t.priority === "urgent" && t.status !== "solved" && t.status !== "closed");

  const stats = [
    { label: "New", value: newTickets.length, icon: Inbox, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Open", value: openTickets.length, icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
    { label: "Pending", value: pendingTickets.length, icon: Zap, color: "text-purple-600", bg: "bg-purple-50" },
    { label: "Solved", value: solvedTickets.length, icon: CheckCircle, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "SLA Warning", value: warningSLA.length, icon: AlertTriangle, color: "text-orange-600", bg: "bg-orange-50" },
    { label: "SLA Breached", value: breachedSLA.length, icon: AlertTriangle, color: "text-red-600", bg: "bg-red-50" },
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Agent Dashboard</h1>
        <p className="mt-1 text-gray-500">Welcome back, {state.currentAgent.name}</p>
      </div>

      {/* Queue Health */}
      <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-6">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-gray-500">{s.label}</span>
              <div className={`rounded-lg p-1.5 ${s.bg}`}>
                <s.icon className={`h-4 w-4 ${s.color}`} />
              </div>
            </div>
            <div className={`mt-2 text-2xl font-bold ${s.value > 0 && s.label.includes("SLA") ? s.color : "text-gray-900"}`}>
              {s.value}
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Personal Performance */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm lg:col-span-1">
          <h2 className="mb-4 text-base font-semibold text-gray-900">Your Performance</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Tickets Resolved</span>
              <span className="font-semibold text-gray-900">{state.currentAgent.ticketsResolved}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Avg. Response Time</span>
              <span className="font-semibold text-gray-900">{state.currentAgent.avgResponseTime}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Satisfaction</span>
              <span className="flex items-center gap-1 font-semibold text-gray-900">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                {state.currentAgent.satisfaction}/5.0
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Assigned</span>
              <span className="font-semibold text-gray-900">{state.currentAgent.ticketsAssigned} active</span>
            </div>
          </div>
        </div>

        {/* Urgent Tickets */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-base font-semibold text-gray-900">Urgent Tickets ({urgentOpen.length})</h2>
            <button
              onClick={() => setState({ ...state, activeView: "inbox", inboxFilters: { status: "all", priority: "urgent", tag: "all" } })}
              className="flex items-center gap-1 text-xs font-medium text-emerald-600 hover:text-emerald-700"
            >
              View all <ArrowUpRight className="h-3 w-3" />
            </button>
          </div>
          {urgentOpen.length === 0 ? (
            <p className="py-8 text-center text-gray-400">No urgent tickets 🎉</p>
          ) : (
            <div className="space-y-3">
              {urgentOpen.map((ticket) => {
                const customer = state.customers.find((c) => c.id === ticket.customerId);
                return (
                  <button
                    key={ticket.id}
                    onClick={() => setState({ ...state, activeView: "ticket", selectedTicketId: ticket.id })}
                    className="flex w-full items-start gap-3 rounded-lg border border-gray-100 p-3 text-left transition-colors hover:border-emerald-200 hover:bg-emerald-50/50"
                  >
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-red-100 text-xs font-bold text-red-700">
                      {customer?.avatar || "?"}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-gray-400">{ticket.id}</span>
                        <span className="rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-semibold text-red-700">URGENT</span>
                        {ticket.slaStatus === "warning" && (
                          <span className="rounded-full bg-orange-100 px-2 py-0.5 text-[10px] font-semibold text-orange-700">SLA AT RISK</span>
                        )}
                      </div>
                      <div className="mt-1 truncate font-medium text-gray-900">{ticket.subject}</div>
                      <div className="mt-0.5 text-xs text-gray-500">{customer?.name} · {customer?.company}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Recent Automation Events */}
      <div className="mt-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-semibold text-gray-900">Recent Activity</h2>
          <button
            onClick={() => setState({ ...state, activeView: "sla" })}
            className="flex items-center gap-1 text-xs font-medium text-emerald-600 hover:text-emerald-700"
          >
            <TrendingUp className="h-3 w-3" /> SLA Tracker
          </button>
        </div>
        <div className="space-y-3">
          {state.automationLog.slice(0, 6).map((event) => (
            <div key={event.id} className="flex items-start gap-3">
              <div className={`mt-0.5 h-2 w-2 flex-shrink-0 rounded-full ${
                event.type === "sla_breached" ? "bg-red-500" :
                event.type === "escalation" ? "bg-orange-500" :
                event.type === "ticket_created" ? "bg-blue-500" :
                event.type === "status_changed" ? "bg-purple-500" :
                "bg-emerald-500"
              }`} />
              <div className="min-w-0 flex-1">
                <p className="text-gray-700">{event.description}</p>
                <p className="mt-0.5 text-xs text-gray-400">
                  {new Date(event.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
