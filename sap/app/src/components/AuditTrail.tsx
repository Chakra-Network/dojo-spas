import {
  ScrollText,
  ShoppingCart,
  ClipboardCheck,
  Navigation,
  Monitor,
  Clock,
} from "lucide-react";
import { useAppContext } from "../store/AppProvider.tsx";
import type { AuditEntry } from "../types/index.ts";

const catIcon: Record<string, typeof ShoppingCart> = {
  procurement: ShoppingCart,
  approval: ClipboardCheck,
  navigation: Navigation,
  system: Monitor,
};

const catColor: Record<string, string> = {
  procurement: "bg-sap-brand/10 text-sap-brand",
  approval: "bg-sap-gold/10 text-sap-gold",
  navigation: "bg-gray-100 text-gray-500",
  system: "bg-sap-positive/10 text-sap-positive",
};

function matchesSearch(entry: AuditEntry, q: string): boolean {
  if (!q) return true;
  const lower = q.toLowerCase();
  return (
    entry.action.toLowerCase().includes(lower) ||
    entry.entity.toLowerCase().includes(lower) ||
    entry.user.toLowerCase().includes(lower) ||
    entry.details.toLowerCase().includes(lower) ||
    entry.entityId.toLowerCase().includes(lower)
  );
}

function formatTimestamp(ts: string): string {
  const d = new Date(ts);
  return d.toLocaleString("en-GB", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

export default function AuditTrail() {
  const { state } = useAppContext();

  const entries = state.auditLog.filter((e) => matchesSearch(e, state.searchQuery));

  /* Group by date */
  const grouped = new Map<string, AuditEntry[]>();
  for (const entry of entries) {
    const dateKey = new Date(entry.timestamp).toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
    const arr = grouped.get(dateKey) ?? [];
    arr.push(entry);
    grouped.set(dateKey, arr);
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center gap-2">
        <ScrollText size={20} className="text-sap-brand" />
        <h1 className="text-lg font-bold text-sap-text">Audit Trail</h1>
        <span className="rounded-full bg-sap-brand/10 px-2.5 py-0.5 text-xs font-bold text-sap-brand">{entries.length}</span>
      </div>
      <p className="text-sm text-sap-text-secondary">
        All user actions are recorded for RL verification. This log is synced to <code className="rounded bg-sap-bg px-1.5 py-0.5 text-xs font-mono">dojo.state.auditLog</code>.
      </p>

      {/* Category legend */}
      <div className="flex flex-wrap gap-2">
        {(["procurement", "approval", "navigation", "system"] as const).map((cat) => {
          const Icon = catIcon[cat];
          return (
            <span key={cat} className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium capitalize ${catColor[cat]}`}>
              <Icon size={12} /> {cat}
            </span>
          );
        })}
      </div>

      {/* Timeline */}
      {entries.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-sap-border bg-white py-16 shadow-sm">
          <Clock size={48} className="mb-3 text-sap-text-secondary opacity-30" />
          <p className="text-sm font-medium text-sap-text-secondary">No audit entries match your search</p>
        </div>
      ) : (
        <div className="space-y-6">
          {Array.from(grouped.entries()).map(([dateKey, items]) => (
            <div key={dateKey}>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-sap-text-secondary">{dateKey}</p>
              <div className="relative space-y-0 border-l-2 border-sap-border pl-6">
                {items.map((entry) => {
                  const Icon = catIcon[entry.category] ?? Monitor;
                  return (
                    <div key={entry.id} className="relative pb-5">
                      {/* Dot */}
                      <div className={`absolute -left-[31px] top-0.5 flex h-5 w-5 items-center justify-center rounded-full ${catColor[entry.category]}`}>
                        <Icon size={10} />
                      </div>
                      <div className="rounded-lg border border-sap-border bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-sm font-semibold text-sap-text">{entry.action}</span>
                          <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium capitalize ${catColor[entry.category]}`}>
                            {entry.category}
                          </span>
                          <span className="ml-auto text-xs text-sap-text-secondary">{formatTimestamp(entry.timestamp)}</span>
                        </div>
                        <p className="mt-1.5 text-sm text-sap-text-secondary">{entry.details}</p>
                        <div className="mt-2 flex items-center gap-3 text-xs text-sap-text-secondary">
                          <span><strong>User:</strong> {entry.user}</span>
                          <span><strong>Entity:</strong> {entry.entity}</span>
                          <span className="font-mono text-[10px]">{entry.entityId}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
