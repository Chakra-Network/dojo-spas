import { Clock, AlertTriangle, CheckCircle, XCircle, Shield } from "lucide-react";
import type { ZenDeskState } from "../types";

interface Props {
  state: ZenDeskState;
  setState: (s: ZenDeskState | ((prev: ZenDeskState) => ZenDeskState)) => void;
}

export default function SLATracker({ state, setState }: Props) {
  const activeTickets = state.tickets.filter((t) => t.status !== "solved" && t.status !== "closed");
  const breached = activeTickets.filter((t) => t.slaStatus === "breached");
  const atRisk = activeTickets.filter((t) => t.slaStatus === "warning");
  const onTrack = activeTickets.filter((t) => t.slaStatus === "ok");

  const slaEvents = state.automationLog.filter(
    (e) => e.type === "sla_breached" || e.type === "escalation"
  );

  const timeUntilDeadline = (deadline: string) => {
    const diff = new Date(deadline).getTime() - Date.now();
    const mins = Math.floor(Math.abs(diff) / 60000);
    const hrs = Math.floor(mins / 60);
    const remainMins = mins % 60;
    const prefix = diff < 0 ? "Overdue by " : "";
    if (hrs > 0) return `${prefix}${hrs}h ${remainMins}m`;
    return `${prefix}${mins}m`;
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">SLA Tracker</h1>
        <p className="mt-1 text-gray-500">Monitor breach risk and escalations across all active tickets</p>
      </div>

      {/* Summary cards */}
      <div className="mb-8 grid grid-cols-3 gap-4">
        <div className="rounded-xl border border-red-200 bg-red-50 p-5">
          <div className="flex items-center gap-2">
            <XCircle className="h-5 w-5 text-red-600" />
            <span className="text-sm font-medium text-red-700">Breached</span>
          </div>
          <div className="mt-2 text-3xl font-bold text-red-700">{breached.length}</div>
          <p className="mt-1 text-xs text-red-500">Require immediate attention</p>
        </div>
        <div className="rounded-xl border border-orange-200 bg-orange-50 p-5">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-600" />
            <span className="text-sm font-medium text-orange-700">At Risk</span>
          </div>
          <div className="mt-2 text-3xl font-bold text-orange-700">{atRisk.length}</div>
          <p className="mt-1 text-xs text-orange-500">Approaching deadline</p>
        </div>
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-emerald-600" />
            <span className="text-sm font-medium text-emerald-700">On Track</span>
          </div>
          <div className="mt-2 text-3xl font-bold text-emerald-700">{onTrack.length}</div>
          <p className="mt-1 text-xs text-emerald-500">Within SLA targets</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Ticket SLA Timeline */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm lg:col-span-2">
          <h2 className="mb-4 flex items-center gap-2 text-base font-semibold text-gray-900">
            <Shield className="h-4 w-4 text-emerald-600" />
            Active Ticket SLA Status
          </h2>
          <div className="space-y-3">
            {activeTickets
              .sort((a, b) => {
                const order = { breached: 0, warning: 1, ok: 2 };
                return order[a.slaStatus] - order[b.slaStatus];
              })
              .map((ticket) => {
                const customer = state.customers.find((c) => c.id === ticket.customerId);
                const assignee = state.agents.find((a) => a.id === ticket.assigneeId);
                const deadlineStr = timeUntilDeadline(ticket.slaDeadline);
                const isOverdue = new Date(ticket.slaDeadline).getTime() < Date.now();

                return (
                  <button
                    key={ticket.id}
                    onClick={() => setState({ ...state, activeView: "ticket", selectedTicketId: ticket.id })}
                    className="flex w-full items-center gap-4 rounded-lg border border-gray-100 p-3 text-left transition-colors hover:border-emerald-200 hover:bg-emerald-50/30"
                  >
                    {/* SLA indicator */}
                    <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full ${
                      ticket.slaStatus === "breached" ? "bg-red-100" :
                      ticket.slaStatus === "warning" ? "bg-orange-100" : "bg-emerald-100"
                    }`}>
                      {ticket.slaStatus === "breached" ? <XCircle className="h-5 w-5 text-red-600" /> :
                       ticket.slaStatus === "warning" ? <AlertTriangle className="h-5 w-5 text-orange-600" /> :
                       <CheckCircle className="h-5 w-5 text-emerald-600" />}
                    </div>

                    {/* Ticket info */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-gray-400">{ticket.id}</span>
                        <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                          ticket.priority === "urgent" ? "bg-red-100 text-red-700" :
                          ticket.priority === "high" ? "bg-orange-100 text-orange-700" :
                          "bg-gray-100 text-gray-600"
                        }`}>
                          {ticket.priority.toUpperCase()}
                        </span>
                      </div>
                      <div className="mt-0.5 truncate font-medium text-gray-900">{ticket.subject}</div>
                      <div className="mt-0.5 text-xs text-gray-500">
                        {customer?.name} · {assignee ? assignee.name : "Unassigned"}
                      </div>
                    </div>

                    {/* Deadline */}
                    <div className="flex-shrink-0 text-right">
                      <div className={`flex items-center gap-1 text-sm font-medium ${
                        isOverdue ? "text-red-600" : ticket.slaStatus === "warning" ? "text-orange-600" : "text-emerald-600"
                      }`}>
                        <Clock className="h-3.5 w-3.5" />
                        {deadlineStr}
                      </div>
                      <div className="mt-0.5 text-[10px] text-gray-400">
                        {isOverdue ? "overdue" : "remaining"}
                      </div>
                    </div>
                  </button>
                );
              })}
          </div>
        </div>

        {/* Escalation Log */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <h2 className="mb-4 flex items-center gap-2 text-base font-semibold text-gray-900">
            <AlertTriangle className="h-4 w-4 text-orange-500" />
            Escalation Log
          </h2>
          {slaEvents.length === 0 ? (
            <p className="py-8 text-center text-sm text-gray-400">No escalations recorded</p>
          ) : (
            <div className="space-y-3">
              {slaEvents.map((event) => (
                <div key={event.id} className="rounded-lg border border-gray-100 p-3">
                  <div className="flex items-start gap-2">
                    <div className={`mt-0.5 h-2 w-2 flex-shrink-0 rounded-full ${
                      event.type === "sla_breached" ? "bg-red-500" : "bg-orange-500"
                    }`} />
                    <div>
                      <p className="text-sm text-gray-700">{event.description}</p>
                      <div className="mt-1 flex items-center gap-2">
                        <span className="font-mono text-[10px] text-gray-400">{event.ticketId}</span>
                        <span className="text-[10px] text-gray-400">
                          {new Date(event.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
