import { Search, Filter, CheckSquare, Square, ChevronDown, Inbox } from "lucide-react";
import { useState } from "react";
import type { ZenDeskState, TicketStatus, TicketPriority } from "../types";

interface Props {
  state: ZenDeskState;
  setState: (s: ZenDeskState | ((prev: ZenDeskState) => ZenDeskState)) => void;
}

const statusColors: Record<TicketStatus, string> = {
  new: "bg-blue-100 text-blue-700",
  open: "bg-amber-100 text-amber-700",
  pending: "bg-purple-100 text-purple-700",
  solved: "bg-emerald-100 text-emerald-700",
  closed: "bg-gray-100 text-gray-600",
};

const priorityColors: Record<TicketPriority, string> = {
  urgent: "bg-red-100 text-red-700",
  high: "bg-orange-100 text-orange-700",
  normal: "bg-gray-100 text-gray-700",
  low: "bg-gray-50 text-gray-500",
};

export default function TicketInbox({ state, setState }: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [showFilters, setShowFilters] = useState(false);
  const [displayCount, setDisplayCount] = useState(10);

  const { status: filterStatus, priority: filterPriority, tag: filterTag } = state.inboxFilters;

  const filteredTickets = state.tickets
    .filter((t) => filterStatus === "all" || t.status === filterStatus)
    .filter((t) => filterPriority === "all" || t.priority === filterPriority)
    .filter((t) => filterTag === "all" || t.tags.includes(filterTag))
    .filter((t) =>
      searchQuery === "" ||
      t.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.id.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

  const displayedTickets = filteredTickets.slice(0, displayCount);

  const allTags = [...new Set(state.tickets.flatMap((t) => t.tags))].sort();

  const toggleSelect = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  const selectAll = () => {
    if (selectedIds.size === displayedTickets.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(displayedTickets.map((t) => t.id)));
    }
  };

  const bulkAction = (action: "open" | "pending" | "solved") => {
    setState({
      ...state,
      tickets: state.tickets.map((t) =>
        selectedIds.has(t.id) ? { ...t, status: action, updatedAt: new Date().toISOString() } : t
      ),
    });
    setSelectedIds(new Set());
  };

  const timeAgo = (iso: string) => {
    const diff = Date.now() - new Date(iso).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
  };

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">Ticket Inbox</h1>
          <span className="text-sm text-gray-500">{filteredTickets.length} tickets</span>
        </div>

        {/* Search + Filter */}
        <div className="mt-3 flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tickets..."
              className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-4 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
              showFilters ? "border-emerald-500 bg-emerald-50 text-emerald-700" : "border-gray-300 text-gray-600 hover:bg-gray-50"
            }`}
          >
            <Filter className="h-4 w-4" />
            Filters
            <ChevronDown className={`h-3 w-3 transition-transform ${showFilters ? "rotate-180" : ""}`} />
          </button>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="mt-3 flex flex-wrap gap-3 rounded-lg bg-gray-50 p-3">
            <select
              value={filterStatus}
              onChange={(e) => setState({ ...state, inboxFilters: { ...state.inboxFilters, status: e.target.value as TicketStatus | "all" } })}
              className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm"
            >
              <option value="all">All Statuses</option>
              <option value="new">New</option>
              <option value="open">Open</option>
              <option value="pending">Pending</option>
              <option value="solved">Solved</option>
              <option value="closed">Closed</option>
            </select>
            <select
              value={filterPriority}
              onChange={(e) => setState({ ...state, inboxFilters: { ...state.inboxFilters, priority: e.target.value as TicketPriority | "all" } })}
              className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm"
            >
              <option value="all">All Priorities</option>
              <option value="urgent">Urgent</option>
              <option value="high">High</option>
              <option value="normal">Normal</option>
              <option value="low">Low</option>
            </select>
            <select
              value={filterTag}
              onChange={(e) => setState({ ...state, inboxFilters: { ...state.inboxFilters, tag: e.target.value } })}
              className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm"
            >
              <option value="all">All Tags</option>
              {allTags.map((tag) => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </select>
            <button
              onClick={() => setState({ ...state, inboxFilters: { status: "all", priority: "all", tag: "all" } })}
              className="text-sm font-medium text-emerald-600 hover:text-emerald-700"
            >
              Clear
            </button>
          </div>
        )}

        {/* Bulk Actions */}
        {selectedIds.size > 0 && (
          <div className="mt-3 flex items-center gap-3 rounded-lg bg-emerald-50 px-3 py-2">
            <span className="text-sm font-medium text-emerald-700">{selectedIds.size} selected</span>
            <button onClick={() => bulkAction("open")} className="rounded bg-amber-100 px-2 py-1 text-xs font-medium text-amber-700 hover:bg-amber-200">Set Open</button>
            <button onClick={() => bulkAction("pending")} className="rounded bg-purple-100 px-2 py-1 text-xs font-medium text-purple-700 hover:bg-purple-200">Set Pending</button>
            <button onClick={() => bulkAction("solved")} className="rounded bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-700 hover:bg-emerald-200">Set Solved</button>
          </div>
        )}
      </div>

      {/* Ticket List */}
      <div className="flex-1 overflow-auto">
        {/* Select All */}
        <div className="sticky top-0 flex items-center gap-3 border-b border-gray-200 bg-gray-50 px-6 py-2">
          <button onClick={selectAll} className="text-gray-400 hover:text-gray-600">
            {selectedIds.size === displayedTickets.length && displayedTickets.length > 0 ? (
              <CheckSquare className="h-4 w-4 text-emerald-600" />
            ) : (
              <Square className="h-4 w-4" />
            )}
          </button>
          <span className="text-xs font-medium text-gray-500">
            {selectedIds.size > 0 ? `${selectedIds.size} of ${filteredTickets.length}` : `Showing ${displayedTickets.length} of ${filteredTickets.length}`}
          </span>
        </div>

        {displayedTickets.map((ticket) => {
          const customer = state.customers.find((c) => c.id === ticket.customerId);
          const assignee = state.agents.find((a) => a.id === ticket.assigneeId);
          const isSelected = selectedIds.has(ticket.id);

          return (
            <div
              key={ticket.id}
              className={`flex items-start gap-3 border-b border-gray-100 px-6 py-3 transition-colors hover:bg-gray-50 ${
                isSelected ? "bg-emerald-50/50" : ""
              }`}
            >
              <button onClick={() => toggleSelect(ticket.id)} className="mt-1 text-gray-400 hover:text-gray-600">
                {isSelected ? <CheckSquare className="h-4 w-4 text-emerald-600" /> : <Square className="h-4 w-4" />}
              </button>
              <button
                onClick={() => setState({ ...state, activeView: "ticket", selectedTicketId: ticket.id })}
                className="min-w-0 flex-1 text-left"
              >
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-gray-400">{ticket.id}</span>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${statusColors[ticket.status]}`}>
                    {ticket.status.toUpperCase()}
                  </span>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${priorityColors[ticket.priority]}`}>
                    {ticket.priority.toUpperCase()}
                  </span>
                  {ticket.slaStatus === "warning" && (
                    <span className="rounded-full bg-orange-100 px-2 py-0.5 text-[10px] font-semibold text-orange-700">SLA ⚠️</span>
                  )}
                  {ticket.slaStatus === "breached" && (
                    <span className="rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-semibold text-red-700">SLA BREACHED</span>
                  )}
                </div>
                <div className="mt-1 font-medium text-gray-900">{ticket.subject}</div>
                <div className="mt-1 flex items-center gap-3 text-xs text-gray-500">
                  <span>{customer?.name}</span>
                  <span>·</span>
                  <span>{customer?.company}</span>
                  {assignee && (
                    <>
                      <span>·</span>
                      <span className="text-emerald-600">→ {assignee.name}</span>
                    </>
                  )}
                  <span>·</span>
                  <span>{timeAgo(ticket.updatedAt)}</span>
                </div>
                <div className="mt-1.5 flex flex-wrap gap-1">
                  {ticket.tags.map((tag) => (
                    <span key={tag} className="rounded bg-gray-100 px-1.5 py-0.5 text-[10px] text-gray-500">
                      {tag}
                    </span>
                  ))}
                </div>
              </button>
            </div>
          );
        })}

        {/* Load more / infinite scroll */}
        {displayCount < filteredTickets.length && (
          <div className="py-4 text-center">
            <button
              onClick={() => setDisplayCount((c) => c + 10)}
              className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-200"
            >
              Load more ({filteredTickets.length - displayCount} remaining)
            </button>
          </div>
        )}

        {filteredTickets.length === 0 && (
          <div className="py-16 text-center text-gray-400">
            <Inbox className="mx-auto h-12 w-12" />
            <p className="mt-3 text-base font-medium">No tickets match your filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
