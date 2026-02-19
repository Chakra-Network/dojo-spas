import { useState } from "react";
import { ArrowLeft, Send, Paperclip, Lock, User, Clock, Tag, UserPlus, Play } from "lucide-react";
import type { ZenDeskState, TicketStatus, TicketPriority, TicketMessage } from "../types";

interface Props {
  state: ZenDeskState;
  setState: (s: ZenDeskState | ((prev: ZenDeskState) => ZenDeskState)) => void;
}

const statusOptions: TicketStatus[] = ["new", "open", "pending", "solved", "closed"];
const priorityOptions: TicketPriority[] = ["urgent", "high", "normal", "low"];

export default function TicketWorkspace({ state, setState }: Props) {
  const [activeTab, setActiveTab] = useState<"conversation" | "internal" | "customer">("conversation");
  const [replyText, setReplyText] = useState("");
  const [isInternal, setIsInternal] = useState(false);

  const ticket = state.tickets.find((t) => t.id === state.selectedTicketId);
  if (!ticket) {
    return (
      <div className="flex h-full items-center justify-center text-gray-400">
        <p>Select a ticket from the inbox</p>
      </div>
    );
  }

  const customer = state.customers.find((c) => c.id === ticket.customerId);

  const updateTicket = (updates: Partial<typeof ticket>) => {
    setState({
      ...state,
      tickets: state.tickets.map((t) =>
        t.id === ticket.id ? { ...t, ...updates, updatedAt: new Date().toISOString() } : t
      ),
    });
  };

  const sendReply = () => {
    if (!replyText.trim()) return;
    const newMessage: TicketMessage = {
      id: `m${Date.now()}`,
      author: state.currentAgent.name,
      authorType: "agent",
      content: replyText,
      timestamp: new Date().toISOString(),
      isInternal,
    };
    updateTicket({
      messages: [...ticket.messages, newMessage],
      status: ticket.status === "new" ? "open" : ticket.status,
    });
    setState((prev) => ({
      ...prev,
      automationLog: [
        {
          id: `ev${Date.now()}`,
          type: isInternal ? "status_changed" : "reply_sent",
          ticketId: ticket.id,
          description: isInternal
            ? `Internal note added to ${ticket.id}`
            : `Agent ${state.currentAgent.name} replied to ${ticket.id}`,
          timestamp: new Date().toISOString(),
        },
        ...prev.automationLog,
      ],
    }));
    setReplyText("");
    setIsInternal(false);
  };

  const applyMacro = (macroId: string) => {
    const macro = state.macros.find((m) => m.id === macroId);
    if (!macro) return;
    const updates: Partial<typeof ticket> = {};
    if (macro.actions.setStatus) updates.status = macro.actions.setStatus;
    if (macro.actions.setPriority) updates.priority = macro.actions.setPriority;
    if (macro.actions.addTags) updates.tags = [...new Set([...ticket.tags, ...macro.actions.addTags])];
    if (macro.actions.replyTemplate) {
      const msg: TicketMessage = {
        id: `m${Date.now()}`,
        author: state.currentAgent.name,
        authorType: "agent",
        content: macro.actions.replyTemplate,
        timestamp: new Date().toISOString(),
        isInternal: false,
      };
      updates.messages = [...ticket.messages, msg];
    }
    updateTicket(updates);
    setState((prev) => ({
      ...prev,
      automationLog: [
        {
          id: `ev${Date.now()}`,
          type: "macro_applied",
          ticketId: ticket.id,
          description: `Macro '${macro.name}' applied to ${ticket.id}`,
          timestamp: new Date().toISOString(),
        },
        ...prev.automationLog,
      ],
    }));
  };

  const conversationMessages = ticket.messages.filter((m) => !m.isInternal);
  const internalNotes = ticket.messages.filter((m) => m.isInternal);

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center gap-4 border-b border-gray-200 bg-white px-6 py-3">
        <button
          onClick={() => setState({ ...state, activeView: "inbox", selectedTicketId: null })}
          className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm text-gray-400">{ticket.id}</span>
            <select
              value={ticket.status}
              onChange={(e) => updateTicket({ status: e.target.value as TicketStatus })}
              className="rounded border border-gray-200 px-2 py-0.5 text-xs font-medium"
            >
              {statusOptions.map((s) => (
                <option key={s} value={s}>{s.toUpperCase()}</option>
              ))}
            </select>
            <select
              value={ticket.priority}
              onChange={(e) => updateTicket({ priority: e.target.value as TicketPriority })}
              className="rounded border border-gray-200 px-2 py-0.5 text-xs font-medium"
            >
              {priorityOptions.map((p) => (
                <option key={p} value={p}>{p.toUpperCase()}</option>
              ))}
            </select>
          </div>
          <h1 className="mt-1 truncate text-lg font-semibold text-gray-900">{ticket.subject}</h1>
        </div>
        {/* Macro selector */}
        <select
          onChange={(e) => { applyMacro(e.target.value); e.target.value = ""; }}
          defaultValue=""
          className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm"
        >
          <option value="" disabled>Apply Macro…</option>
          {state.macros.map((m) => (
            <option key={m.id} value={m.id}>{m.name}</option>
          ))}
        </select>
      </div>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left: Conversation */}
        <div className="flex flex-1 flex-col">
          {/* Tabs */}
          <div className="flex border-b border-gray-200 bg-white px-6">
            {[
              { id: "conversation" as const, label: "Conversation", count: conversationMessages.length },
              { id: "internal" as const, label: "Internal Notes", count: internalNotes.length },
              { id: "customer" as const, label: "Customer", count: 0 },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`border-b-2 px-4 py-2.5 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? "border-emerald-600 text-emerald-700"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.label} {tab.count > 0 && <span className="ml-1 text-xs text-gray-400">({tab.count})</span>}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="flex-1 overflow-auto px-6 py-4">
            {activeTab === "conversation" && (
              <div className="space-y-4">
                {conversationMessages.map((msg) => (
                  <div key={msg.id} className={`flex gap-3 ${msg.authorType === "agent" ? "flex-row-reverse" : ""}`}>
                    <div className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${
                      msg.authorType === "agent" ? "bg-emerald-600" : "bg-gray-500"
                    }`}>
                      {msg.author.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                    </div>
                    <div className={`max-w-[70%] rounded-xl px-4 py-3 ${
                      msg.authorType === "agent" ? "bg-emerald-50 text-gray-800" : "bg-gray-100 text-gray-800"
                    }`}>
                      <div className="mb-1 flex items-center gap-2">
                        <span className="text-xs font-semibold">{msg.author}</span>
                        <span className="text-[10px] text-gray-400">
                          {new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </span>
                      </div>
                      <p className="whitespace-pre-wrap text-sm">{msg.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "internal" && (
              <div className="space-y-4">
                {internalNotes.length === 0 ? (
                  <p className="py-8 text-center text-gray-400">No internal notes yet</p>
                ) : (
                  internalNotes.map((msg) => (
                    <div key={msg.id} className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <Lock className="h-3 w-3 text-yellow-600" />
                        <span className="text-xs font-semibold text-yellow-700">{msg.author}</span>
                        <span className="text-[10px] text-yellow-500">
                          {new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </span>
                      </div>
                      <p className="whitespace-pre-wrap text-sm text-yellow-800">{msg.content}</p>
                    </div>
                  ))
                )}
              </div>
            )}

            {activeTab === "customer" && customer && (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-200 text-xl font-bold text-gray-600">
                    {customer.avatar}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{customer.name}</h3>
                    <p className="text-sm text-gray-500">{customer.email}</p>
                    <p className="text-sm text-gray-500">{customer.company}</p>
                  </div>
                </div>
                <div className="rounded-lg border border-gray-200 p-4">
                  <h4 className="mb-3 text-sm font-semibold text-gray-700">Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Lifecycle Stage</span>
                      <span className="font-medium capitalize text-gray-900">{customer.lifecycleStage}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Customer Since</span>
                      <span className="font-medium text-gray-900">{new Date(customer.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Total Tickets</span>
                      <span className="font-medium text-gray-900">
                        {state.tickets.filter((t) => t.customerId === customer.id).length}
                      </span>
                    </div>
                  </div>
                </div>
                {/* Activity timeline */}
                <div className="rounded-lg border border-gray-200 p-4">
                  <h4 className="mb-3 text-sm font-semibold text-gray-700">Recent Tickets</h4>
                  <div className="space-y-2">
                    {state.tickets
                      .filter((t) => t.customerId === customer.id)
                      .slice(0, 5)
                      .map((t) => (
                        <button
                          key={t.id}
                          onClick={() => setState({ ...state, selectedTicketId: t.id })}
                          className="flex w-full items-center gap-2 rounded p-2 text-left hover:bg-gray-50"
                        >
                          <span className="font-mono text-xs text-gray-400">{t.id}</span>
                          <span className="flex-1 truncate text-sm text-gray-700">{t.subject}</span>
                          <span className="text-xs capitalize text-gray-400">{t.status}</span>
                        </button>
                      ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Reply box */}
          <div className="border-t border-gray-200 bg-white p-4">
            <div className="mb-2 flex items-center gap-2">
              <button
                onClick={() => setIsInternal(false)}
                className={`rounded-lg px-3 py-1 text-xs font-medium ${
                  !isInternal ? "bg-emerald-100 text-emerald-700" : "text-gray-500 hover:bg-gray-100"
                }`}
              >
                <Send className="mr-1 inline h-3 w-3" /> Public Reply
              </button>
              <button
                onClick={() => setIsInternal(true)}
                className={`rounded-lg px-3 py-1 text-xs font-medium ${
                  isInternal ? "bg-yellow-100 text-yellow-700" : "text-gray-500 hover:bg-gray-100"
                }`}
              >
                <Lock className="mr-1 inline h-3 w-3" /> Internal Note
              </button>
            </div>
            <div className="flex gap-2">
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder={isInternal ? "Add an internal note..." : "Type your reply..."}
                className={`flex-1 resize-none rounded-lg border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 ${
                  isInternal
                    ? "border-yellow-300 bg-yellow-50 focus:ring-yellow-300/50"
                    : "border-gray-300 focus:ring-emerald-500/20"
                }`}
                rows={3}
                onKeyDown={(e) => { if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) sendReply(); }}
              />
            </div>
            <div className="mt-2 flex items-center justify-between">
              <button className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
                <Paperclip className="h-4 w-4" />
              </button>
              <button
                onClick={sendReply}
                disabled={!replyText.trim()}
                className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 disabled:opacity-50"
              >
                {isInternal ? <Lock className="h-4 w-4" /> : <Send className="h-4 w-4" />}
                {isInternal ? "Add Note" : "Send Reply"}
              </button>
            </div>
          </div>
        </div>

        {/* Right sidebar: Ticket details */}
        <div className="hidden w-72 flex-shrink-0 overflow-auto border-l border-gray-200 bg-white p-4 xl:block">
          <h3 className="mb-4 text-sm font-semibold text-gray-700">Ticket Details</h3>
          <div className="space-y-4 text-sm">
            <div>
              <div className="mb-1 flex items-center gap-1 text-gray-500"><User className="h-3 w-3" /> Assignee</div>
              <select
                value={ticket.assigneeId || ""}
                onChange={(e) => updateTicket({ assigneeId: e.target.value || null })}
                className="w-full rounded border border-gray-200 px-2 py-1 text-sm"
              >
                <option value="">Unassigned</option>
                {state.agents.map((a) => (
                  <option key={a.id} value={a.id}>{a.name}</option>
                ))}
              </select>
            </div>
            <div>
              <div className="mb-1 flex items-center gap-1 text-gray-500"><Clock className="h-3 w-3" /> SLA</div>
              <div className={`font-medium ${
                ticket.slaStatus === "breached" ? "text-red-600" :
                ticket.slaStatus === "warning" ? "text-orange-600" : "text-emerald-600"
              }`}>
                {ticket.slaStatus === "breached" ? "BREACHED" :
                 ticket.slaStatus === "warning" ? "AT RISK" : "On Track"}
              </div>
            </div>
            <div>
              <div className="mb-1 flex items-center gap-1 text-gray-500"><Tag className="h-3 w-3" /> Tags</div>
              <div className="flex flex-wrap gap-1">
                {ticket.tags.map((tag) => (
                  <span key={tag} className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600">{tag}</span>
                ))}
              </div>
            </div>
            <div>
              <div className="mb-1 flex items-center gap-1 text-gray-500"><UserPlus className="h-3 w-3" /> Customer</div>
              <div className="font-medium text-gray-900">{customer?.name}</div>
              <div className="text-xs text-gray-500">{customer?.company}</div>
            </div>
            <div>
              <div className="mb-1 flex items-center gap-1 text-gray-500"><Play className="h-3 w-3" /> Created</div>
              <div className="text-gray-700">{new Date(ticket.createdAt).toLocaleString()}</div>
            </div>
            <div>
              <div className="mb-1 flex items-center gap-1 text-gray-500"><Clock className="h-3 w-3" /> Updated</div>
              <div className="text-gray-700">{new Date(ticket.updatedAt).toLocaleString()}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
