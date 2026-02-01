import { BookOpen, Play, Tag, ArrowRight } from "lucide-react";
import type { ZenDeskState } from "../types";

interface Props {
  state: ZenDeskState;
  setState: (s: ZenDeskState | ((prev: ZenDeskState) => ZenDeskState)) => void;
}

export default function MacrosLibrary({ state, setState }: Props) {
  const categories = [...new Set(state.macros.map((m) => m.category))];

  const applyToTicket = (macroId: string, ticketId: string) => {
    const macro = state.macros.find((m) => m.id === macroId);
    const ticket = state.tickets.find((t) => t.id === ticketId);
    if (!macro || !ticket) return;

    const updates: Partial<typeof ticket> = { updatedAt: new Date().toISOString() };
    if (macro.actions.setStatus) updates.status = macro.actions.setStatus;
    if (macro.actions.setPriority) updates.priority = macro.actions.setPriority;
    if (macro.actions.addTags) updates.tags = [...new Set([...ticket.tags, ...macro.actions.addTags])];
    if (macro.actions.replyTemplate) {
      updates.messages = [
        ...ticket.messages,
        {
          id: `m${Date.now()}`,
          author: state.currentAgent.name,
          authorType: "agent" as const,
          content: macro.actions.replyTemplate,
          timestamp: new Date().toISOString(),
          isInternal: false,
        },
      ];
    }

    setState({
      ...state,
      tickets: state.tickets.map((t) => (t.id === ticketId ? { ...t, ...updates } : t)),
      automationLog: [
        {
          id: `ev${Date.now()}`,
          type: "macro_applied",
          ticketId,
          description: `Macro '${macro.name}' applied to ${ticketId}`,
          timestamp: new Date().toISOString(),
        },
        ...state.automationLog,
      ],
    });
  };

  const openTickets = state.tickets.filter((t) => t.status !== "solved" && t.status !== "closed");

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Macros Library</h1>
        <p className="mt-1 text-gray-500">Canned responses and automated actions for faster ticket resolution</p>
      </div>

      {categories.map((category) => (
        <div key={category} className="mb-8">
          <h2 className="mb-4 flex items-center gap-2 text-base font-semibold text-gray-700">
            <BookOpen className="h-4 w-4 text-emerald-600" />
            {category}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {state.macros
              .filter((m) => m.category === category)
              .map((macro) => (
                <div key={macro.id} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                  <h3 className="font-semibold text-gray-900">{macro.name}</h3>
                  <p className="mt-1 text-xs text-gray-500">{macro.description}</p>

                  {/* Actions preview */}
                  <div className="mt-3 space-y-1.5">
                    {macro.actions.setStatus && (
                      <div className="flex items-center gap-1.5 text-xs text-gray-600">
                        <ArrowRight className="h-3 w-3 text-gray-400" />
                        Set status to <span className="font-medium capitalize">{macro.actions.setStatus}</span>
                      </div>
                    )}
                    {macro.actions.setPriority && (
                      <div className="flex items-center gap-1.5 text-xs text-gray-600">
                        <ArrowRight className="h-3 w-3 text-gray-400" />
                        Set priority to <span className="font-medium capitalize">{macro.actions.setPriority}</span>
                      </div>
                    )}
                    {macro.actions.addTags && (
                      <div className="flex items-center gap-1.5 text-xs text-gray-600">
                        <Tag className="h-3 w-3 text-gray-400" />
                        Add tags: {macro.actions.addTags.map((t) => (
                          <span key={t} className="rounded bg-gray-100 px-1.5 py-0.5 text-[10px]">{t}</span>
                        ))}
                      </div>
                    )}
                    {macro.actions.replyTemplate && (
                      <div className="mt-2 rounded-lg bg-gray-50 p-2.5 text-xs text-gray-600">
                        <p className="line-clamp-3 whitespace-pre-wrap">{macro.actions.replyTemplate}</p>
                      </div>
                    )}
                  </div>

                  {/* Apply to ticket */}
                  {openTickets.length > 0 && (
                    <div className="mt-4 border-t border-gray-100 pt-3">
                      <label className="mb-1 block text-[10px] font-medium uppercase tracking-wide text-gray-400">
                        Quick Apply
                      </label>
                      <div className="flex gap-2">
                        <select
                          id={`macro-target-${macro.id}`}
                          className="flex-1 rounded border border-gray-200 px-2 py-1 text-xs"
                          defaultValue=""
                        >
                          <option value="" disabled>Select ticket…</option>
                          {openTickets.map((t) => (
                            <option key={t.id} value={t.id}>{t.id} — {t.subject.slice(0, 30)}</option>
                          ))}
                        </select>
                        <button
                          onClick={() => {
                            const select = document.getElementById(`macro-target-${macro.id}`) as HTMLSelectElement;
                            if (select?.value) applyToTicket(macro.id, select.value);
                          }}
                          className="rounded bg-emerald-600 px-2.5 py-1 text-xs font-medium text-white hover:bg-emerald-700"
                        >
                          <Play className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
