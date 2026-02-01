import { useState } from "react";
import {
  LayoutGrid,
  List,
  Play,
  Pause,
  CheckCircle,
  Calendar,
  Tag,
} from "lucide-react";
import type { Campaign, CampaignStatus } from "../lib/types";
import { formatNumber, formatCurrency, formatPercent, getCampaignStatusColor, formatDate } from "../lib/utils";

interface CampaignManagerProps {
  campaigns: Campaign[];
  viewMode: "table" | "kanban";
  onViewModeChange: (mode: "table" | "kanban") => void;
  onUpdateCampaign: (campaign: Campaign) => void;
}

const statusOrder: CampaignStatus[] = ["draft", "scheduled", "active", "completed", "paused"];
const statusLabels: Record<CampaignStatus, string> = {
  draft: "Draft",
  scheduled: "Scheduled",
  active: "Active",
  completed: "Completed",
  paused: "Paused",
};
const statusColors: Record<CampaignStatus, string> = {
  draft: "border-t-gray-400",
  scheduled: "border-t-blue-400",
  active: "border-t-green-400",
  completed: "border-t-purple-400",
  paused: "border-t-yellow-400",
};

function getNextStatus(current: CampaignStatus): CampaignStatus | null {
  const transitions: Record<CampaignStatus, CampaignStatus | null> = {
    draft: "scheduled",
    scheduled: "active",
    active: "completed",
    completed: null,
    paused: "active",
  };
  return transitions[current];
}

function StatusBadge({ status }: { status: CampaignStatus }) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getCampaignStatusColor(status)}`}>
      {statusLabels[status]}
    </span>
  );
}

/* ── Table View ─────────────────────────────────────────────────── */
function TableView({
  campaigns,
  onUpdateCampaign,
}: {
  campaigns: Campaign[];
  onUpdateCampaign: (c: Campaign) => void;
}) {
  const [sortBy, setSortBy] = useState<"name" | "status" | "leads" | "budget">("name");
  const [filterStatus, setFilterStatus] = useState<CampaignStatus | "all">("all");

  const filtered =
    filterStatus === "all"
      ? campaigns
      : campaigns.filter((c) => c.status === filterStatus);

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "name") return a.name.localeCompare(b.name);
    if (sortBy === "status") return statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status);
    if (sortBy === "leads") return b.leads - a.leads;
    if (sortBy === "budget") return b.budget - a.budget;
    return 0;
  });

  return (
    <div className="space-y-3">
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-medium text-gray-500">Filter:</span>
        {(["all", ...statusOrder] as const).map((s) => (
          <button
            key={s}
            onClick={() => setFilterStatus(s)}
            className={`px-2.5 py-1 text-xs rounded-full border transition-colors ${
              filterStatus === s
                ? "bg-orange-500 text-white border-orange-500"
                : "bg-white text-gray-600 border-gray-200 hover:border-orange-300"
            }`}
          >
            {s === "all" ? "All" : statusLabels[s]}
          </button>
        ))}
        <span className="text-xs text-gray-400 ml-auto">Sort:</span>
        {(["name", "status", "leads", "budget"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setSortBy(s)}
            className={`px-2 py-1 text-xs rounded border transition-colors ${
              sortBy === s
                ? "bg-gray-800 text-white border-gray-800"
                : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
            }`}
          >
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 text-left">
              <th className="px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wider">Campaign</th>
              <th className="px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wider">Type</th>
              <th className="px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wider">Status</th>
              <th className="px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wider text-right">Budget</th>
              <th className="px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wider text-right">Leads</th>
              <th className="px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wider text-right">Open Rate</th>
              <th className="px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wider">Owner</th>
              <th className="px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wider text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((c) => {
              const next = getNextStatus(c.status);
              return (
                <tr key={c.id} className="border-b border-gray-50 hover:bg-orange-50/30 transition-colors">
                  <td className="px-4 py-3">
                    <p className="font-medium text-gray-900">{c.name}</p>
                    <p className="text-xs text-gray-400 mt-0.5 max-w-xs truncate">{c.description}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1 text-xs text-gray-600 capitalize">
                      <Tag className="w-3 h-3" />
                      {c.type.replace("-", " ")}
                    </span>
                  </td>
                  <td className="px-4 py-3"><StatusBadge status={c.status} /></td>
                  <td className="px-4 py-3 text-right font-medium text-gray-800">
                    {formatCurrency(c.budget)}
                    {c.spent > 0 && (
                      <p className="text-[10px] text-gray-400">{formatCurrency(c.spent)} spent</p>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right font-medium text-gray-800">{formatNumber(c.leads)}</td>
                  <td className="px-4 py-3 text-right text-gray-700">
                    {c.openRate > 0 ? formatPercent(c.openRate) : "—"}
                  </td>
                  <td className="px-4 py-3 text-gray-600 text-xs">{c.owner}</td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center gap-1">
                      {next && (
                        <button
                          onClick={() =>
                            onUpdateCampaign({
                              ...c,
                              status: next,
                              startDate: next === "active" && !c.startDate ? new Date().toISOString() : c.startDate,
                              endDate: next === "completed" ? new Date().toISOString() : c.endDate,
                            })
                          }
                          className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-500 hover:text-orange-600"
                          title={`Move to ${statusLabels[next]}`}
                        >
                          {next === "active" ? (
                            <Play className="w-4 h-4" />
                          ) : next === "completed" ? (
                            <CheckCircle className="w-4 h-4" />
                          ) : next === "scheduled" ? (
                            <Calendar className="w-4 h-4" />
                          ) : (
                            <Play className="w-4 h-4" />
                          )}
                        </button>
                      )}
                      {c.status === "active" && (
                        <button
                          onClick={() => onUpdateCampaign({ ...c, status: "paused" })}
                          className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-500 hover:text-yellow-600"
                          title="Pause"
                        >
                          <Pause className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ── Kanban View ────────────────────────────────────────────────── */
function KanbanView({
  campaigns,
  onUpdateCampaign,
}: {
  campaigns: Campaign[];
  onUpdateCampaign: (c: Campaign) => void;
}) {
  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {statusOrder.map((status) => {
        const cols = campaigns.filter((c) => c.status === status);
        return (
          <div key={status} className="min-w-[260px] flex-shrink-0">
            <div className={`bg-white rounded-xl shadow-sm border border-gray-100 border-t-3 ${statusColors[status]}`}>
              <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-700">{statusLabels[status]}</h3>
                <span className="text-xs text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded">{cols.length}</span>
              </div>
              <div className="p-2 space-y-2 max-h-[calc(100vh-280px)] overflow-y-auto">
                {cols.length === 0 && (
                  <p className="text-xs text-gray-400 text-center py-6">No campaigns</p>
                )}
                {cols.map((c) => {
                  const next = getNextStatus(c.status);
                  return (
                    <div
                      key={c.id}
                      className="bg-gray-50 rounded-lg p-3 border border-gray-100 hover:shadow-md transition-shadow"
                    >
                      <p className="text-sm font-medium text-gray-800 leading-snug">{c.name}</p>
                      <p className="text-[11px] text-gray-500 mt-1 capitalize">{c.type.replace("-", " ")} · {c.owner}</p>
                      {c.leads > 0 && (
                        <div className="flex items-center gap-2 mt-2 text-[11px] text-gray-500">
                          <span>{formatNumber(c.leads)} leads</span>
                          <span>·</span>
                          <span>{formatCurrency(c.spent)} spent</span>
                        </div>
                      )}
                      {c.startDate && (
                        <p className="text-[10px] text-gray-400 mt-1">{formatDate(c.startDate)}</p>
                      )}
                      <div className="flex items-center gap-1 mt-2">
                        {next && (
                          <button
                            onClick={() =>
                              onUpdateCampaign({
                                ...c,
                                status: next,
                                startDate: next === "active" && !c.startDate ? new Date().toISOString() : c.startDate,
                                endDate: next === "completed" ? new Date().toISOString() : c.endDate,
                              })
                            }
                            className="text-[10px] font-medium text-orange-600 bg-orange-50 hover:bg-orange-100 px-2 py-0.5 rounded transition-colors"
                          >
                            → {statusLabels[next]}
                          </button>
                        )}
                        {c.status === "active" && (
                          <button
                            onClick={() => onUpdateCampaign({ ...c, status: "paused" })}
                            className="text-[10px] font-medium text-yellow-600 bg-yellow-50 hover:bg-yellow-100 px-2 py-0.5 rounded transition-colors"
                          >
                            Pause
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ── Main Component ─────────────────────────────────────────────── */
export default function CampaignManager({
  campaigns,
  viewMode,
  onViewModeChange,
  onUpdateCampaign,
}: CampaignManagerProps) {
  return (
    <div className="p-6 space-y-4 text-gray-900">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold">Campaign Manager</h1>
          <p className="text-sm text-gray-500 mt-0.5">{campaigns.length} campaigns</p>
        </div>
        <div className="flex items-center gap-1 bg-white rounded-lg border border-gray-200 p-0.5">
          <button
            onClick={() => onViewModeChange("table")}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              viewMode === "table"
                ? "bg-gray-800 text-white"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <List className="w-3.5 h-3.5" /> Table
          </button>
          <button
            onClick={() => onViewModeChange("kanban")}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              viewMode === "kanban"
                ? "bg-gray-800 text-white"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" /> Kanban
          </button>
        </div>
      </div>

      {/* View */}
      {viewMode === "table" ? (
        <TableView campaigns={campaigns} onUpdateCampaign={onUpdateCampaign} />
      ) : (
        <KanbanView campaigns={campaigns} onUpdateCampaign={onUpdateCampaign} />
      )}
    </div>
  );
}
