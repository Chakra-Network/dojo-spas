import { useState } from "react";
import { Plus, Filter, MoreHorizontal, Play, Pause, Trash2, Edit2 } from "lucide-react";
import { useAppContext } from "@/context/AppProvider";
import type { Campaign, CampaignStatus, CampaignType } from "@/lib/types";

export default function Campaigns() {
  const { state, addCampaign, updateCampaign, deleteCampaign } = useAppContext();
  const [viewMode, setViewMode] = useState<"table" | "kanban">("table");
  const [statusFilter, setStatusFilter] = useState<CampaignStatus | "All">("All");
  const [showNewCampaignForm, setShowNewCampaignForm] = useState(false);

  const filteredCampaigns = state.campaigns.filter(
    (c) => statusFilter === "All" || c.status === statusFilter
  );

  const handleCreateCampaign = (data: Partial<Campaign>) => {
    const newCampaign: Campaign = {
      id: `campaign-${Date.now()}`,
      name: data.name || "New Campaign",
      type: data.type || "Email",
      status: "Draft",
      startDate: data.startDate || new Date().toISOString().split("T")[0],
      budget: data.budget || 0,
      leads: 0,
      conversions: 0,
      clicks: 0,
      impressions: 0,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    addCampaign(newCampaign);
    setShowNewCampaignForm(false);
  };

  const handleStatusChange = (id: string, status: CampaignStatus) => {
    updateCampaign(id, { status });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#2d3e50]">Campaigns</h1>
        <button
          onClick={() => setShowNewCampaignForm(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={18} />
          Create Campaign
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 bg-white rounded-lg p-1 border border-gray-200">
          <button
            onClick={() => setViewMode("table")}
            className={`px-3 py-1.5 rounded text-sm ${
              viewMode === "table" ? "bg-[#ff7a59] text-white" : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Table
          </button>
          <button
            onClick={() => setViewMode("kanban")}
            className={`px-3 py-1.5 rounded text-sm ${
              viewMode === "kanban" ? "bg-[#ff7a59] text-white" : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Kanban
          </button>
        </div>
        <div className="flex items-center gap-2">
          <Filter size={18} className="text-gray-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as CampaignStatus | "All")}
            className="border border-gray-200 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:border-[#ff7a59]"
          >
            <option value="All">All Status</option>
            <option value="Draft">Draft</option>
            <option value="Scheduled">Scheduled</option>
            <option value="Active">Active</option>
            <option value="Paused">Paused</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Table View */}
      {viewMode === "table" && (
        <div className="card overflow-hidden p-0">
          <table className="w-full">
            <thead className="bg-[#f5f8fa]">
              <tr>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Campaign</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Type</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Status</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Schedule</th>
                <th className="text-right px-4 py-3 text-sm font-medium text-gray-600">Leads</th>
                <th className="text-right px-4 py-3 text-sm font-medium text-gray-600">Conversions</th>
                <th className="text-center px-4 py-3 text-sm font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredCampaigns.map((campaign) => (
                <CampaignRow
                  key={campaign.id}
                  campaign={campaign}
                  onStatusChange={handleStatusChange}
                  onDelete={deleteCampaign}
                />
              ))}
            </tbody>
          </table>
          {filteredCampaigns.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No campaigns found. Create one to get started!
            </div>
          )}
        </div>
      )}

      {/* Kanban View */}
      {viewMode === "kanban" && (
        <div className="grid grid-cols-5 gap-4">
          {(["Draft", "Scheduled", "Active", "Paused", "Completed"] as CampaignStatus[]).map((status) => (
            <div key={status} className="bg-white rounded-lg p-4">
              <h3 className="font-medium text-gray-700 mb-4 flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${
                  status === "Active" ? "bg-green-500" :
                  status === "Scheduled" ? "bg-blue-500" :
                  status === "Paused" ? "bg-orange-500" :
                  status === "Completed" ? "bg-purple-500" :
                  "bg-gray-400"
                }`} />
                {status}
                <span className="text-gray-400 text-sm ml-auto">
                  {state.campaigns.filter((c) => c.status === status).length}
                </span>
              </h3>
              <div className="space-y-3">
                {state.campaigns
                  .filter((c) => c.status === status)
                  .map((campaign) => (
                    <div key={campaign.id} className="p-3 bg-[#f5f8fa] rounded-lg">
                      <div className="font-medium text-[#2d3e50] mb-1">{campaign.name}</div>
                      <div className="text-xs text-gray-500 mb-2">{campaign.type}</div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-500">{campaign.leads} leads</span>
                        <span className="text-[#00bda5] font-medium">{campaign.conversions} conv</span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* New Campaign Modal */}
      {showNewCampaignForm && (
        <NewCampaignModal
          onClose={() => setShowNewCampaignForm(false)}
          onSubmit={handleCreateCampaign}
        />
      )}
    </div>
  );
}

function CampaignRow({
  campaign,
  onStatusChange,
  onDelete,
}: {
  campaign: Campaign;
  onStatusChange: (id: string, status: CampaignStatus) => void;
  onDelete: (id: string) => void;
}) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <tr className="hover:bg-[#f5f8fa] transition-colors">
      <td className="px-4 py-3">
        <div className="font-medium text-[#2d3e50]">{campaign.name}</div>
      </td>
      <td className="px-4 py-3 text-sm text-gray-600">{campaign.type}</td>
      <td className="px-4 py-3">
        <span className={`badge ${
          campaign.status === "Active" ? "badge-active" :
          campaign.status === "Scheduled" ? "badge-scheduled" :
          campaign.status === "Paused" ? "badge-paused" :
          campaign.status === "Completed" ? "badge-completed" :
          "badge-draft"
        }`}>
          {campaign.status}
        </span>
      </td>
      <td className="px-4 py-3 text-sm text-gray-600">
        {campaign.startDate}
        {campaign.endDate && ` - ${campaign.endDate}`}
      </td>
      <td className="px-4 py-3 text-right text-sm font-medium">{campaign.leads.toLocaleString()}</td>
      <td className="px-4 py-3 text-right text-sm font-medium text-[#00bda5]">{campaign.conversions}</td>
      <td className="px-4 py-3">
        <div className="flex items-center justify-center gap-2 relative">
          {campaign.status === "Active" ? (
            <button
              onClick={() => onStatusChange(campaign.id, "Paused")}
              className="p-1.5 text-gray-400 hover:text-orange-500 transition-colors"
              title="Pause"
            >
              <Pause size={16} />
            </button>
          ) : campaign.status !== "Completed" ? (
            <button
              onClick={() => onStatusChange(campaign.id, "Active")}
              className="p-1.5 text-gray-400 hover:text-green-500 transition-colors"
              title="Activate"
            >
              <Play size={16} />
            </button>
          ) : null}
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <MoreHorizontal size={16} />
          </button>
          {showMenu && (
            <div className="absolute right-0 top-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
              <button className="w-full px-4 py-2 text-left text-sm hover:bg-[#f5f8fa] flex items-center gap-2">
                <Edit2 size={14} /> Edit
              </button>
              <button
                onClick={() => { onDelete(campaign.id); setShowMenu(false); }}
                className="w-full px-4 py-2 text-left text-sm text-red-500 hover:bg-red-50 flex items-center gap-2"
              >
                <Trash2 size={14} /> Delete
              </button>
            </div>
          )}
        </div>
      </td>
    </tr>
  );
}

function NewCampaignModal({
  onClose,
  onSubmit,
}: {
  onClose: () => void;
  onSubmit: (data: Partial<Campaign>) => void;
}) {
  const [name, setName] = useState("");
  const [type, setType] = useState<CampaignType>("Email");
  const [startDate, setStartDate] = useState(new Date().toISOString().split("T")[0]);
  const [budget, setBudget] = useState("");

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <h2 className="text-xl font-bold text-[#2d3e50] mb-4">Create Campaign</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Campaign Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:border-[#ff7a59]"
              placeholder="e.g., Q1 Product Launch"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as CampaignType)}
              className="w-full border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:border-[#ff7a59]"
            >
              <option value="Email">Email</option>
              <option value="Social">Social</option>
              <option value="Ads">Ads</option>
              <option value="Landing Page">Landing Page</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:border-[#ff7a59]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Budget (optional)</label>
            <input
              type="number"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:border-[#ff7a59]"
              placeholder="0"
            />
          </div>
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onClose} className="btn-secondary">Cancel</button>
          <button
            onClick={() => onSubmit({ name, type, startDate, budget: Number(budget) || 0 })}
            className="btn-primary"
            disabled={!name}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
