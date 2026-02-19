import { X, FileText, Receipt, GitCompareArrows, Edit3, Bell, Plus, Trash2, RefreshCw } from "lucide-react";
import type { AuditEntry, AuditAction } from "../lib/types";
import { formatTimestamp } from "../lib/utils";

const actionIcons: Record<AuditAction, typeof FileText> = {
  invoice_created: Plus,
  invoice_updated: Edit3,
  invoice_paid: FileText,
  invoice_reminder: Bell,
  expense_created: Plus,
  expense_updated: Edit3,
  expense_deleted: Trash2,
  reconciliation_matched: GitCompareArrows,
  reconciliation_excluded: GitCompareArrows,
  line_item_edited: Edit3,
  status_changed: RefreshCw,
};

const actionColors: Record<AuditAction, string> = {
  invoice_created: "bg-emerald-100 text-emerald-700",
  invoice_updated: "bg-blue-100 text-blue-700",
  invoice_paid: "bg-emerald-100 text-emerald-700",
  invoice_reminder: "bg-amber-100 text-amber-700",
  expense_created: "bg-purple-100 text-purple-700",
  expense_updated: "bg-blue-100 text-blue-700",
  expense_deleted: "bg-red-100 text-red-700",
  reconciliation_matched: "bg-emerald-100 text-emerald-700",
  reconciliation_excluded: "bg-gray-100 text-gray-600",
  line_item_edited: "bg-blue-100 text-blue-700",
  status_changed: "bg-amber-100 text-amber-700",
};

const entityIcons: Record<string, typeof FileText> = {
  invoice: FileText,
  expense: Receipt,
  "bank-transaction": GitCompareArrows,
};

interface AuditSidebarProps {
  entries: AuditEntry[];
  onClose: () => void;
}

export default function AuditSidebar({ entries, onClose }: AuditSidebarProps) {
  return (
    <aside className="w-80 bg-white border-l border-gray-200 flex flex-col shrink-0">
      {/* Header */}
      <div className="flex items-center justify-between px-4 h-14 border-b border-gray-200">
        <h2 className="font-semibold text-gray-900 text-sm">Audit Trail</h2>
        <button
          onClick={onClose}
          className="p-1 rounded hover:bg-gray-100 text-gray-400 hover:text-gray-600"
        >
          <X size={16} />
        </button>
      </div>

      {/* Entries */}
      <div className="flex-1 overflow-y-auto">
        {entries.length === 0 ? (
          <div className="p-6 text-center text-gray-400 text-sm">
            No audit entries yet.
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {entries.map((entry) => {
              const ActionIcon = actionIcons[entry.action];
              const EntityIcon = entityIcons[entry.entityType];
              return (
                <div key={entry.id} className="px-4 py-3 hover:bg-gray-50">
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${actionColors[entry.action]}`}
                    >
                      <ActionIcon size={14} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-800 leading-snug">
                        {entry.description}
                      </p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className="inline-flex items-center gap-1 text-xs text-gray-400">
                          <EntityIcon size={10} />
                          {entry.entityId}
                        </span>
                        <span className="text-xs text-gray-300">·</span>
                        <span className="text-xs text-gray-400">
                          {entry.user}
                        </span>
                      </div>
                      {entry.previousValue && entry.newValue && (
                        <div className="mt-1.5 flex items-center gap-1.5 text-xs">
                          <span className="px-1.5 py-0.5 rounded bg-red-50 text-red-600 line-through">
                            {entry.previousValue}
                          </span>
                          <span className="text-gray-300">→</span>
                          <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-600">
                            {entry.newValue}
                          </span>
                        </div>
                      )}
                      <p className="text-xs text-gray-300 mt-1">
                        {formatTimestamp(entry.timestamp)}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-gray-200 text-center">
        <p className="text-xs text-gray-400">
          {entries.length} mutation{entries.length !== 1 ? "s" : ""} logged for RL
          verification
        </p>
      </div>
    </aside>
  );
}
