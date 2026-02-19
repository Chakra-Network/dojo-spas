import { useState } from "react";
import {
  Rocket,
  Send,
  MailOpen,
  MousePointerClick,
  UserCheck,
  UserPlus,
  ArrowRightCircle,
  FileText,
  Zap,
  CheckCircle,
  Activity,
  Filter,
  Search,
} from "lucide-react";
import type { AutomationEvent, AutomationEventType } from "../lib/types";
import { formatDateFull, getEventTypeColor } from "../lib/utils";

interface AutomationLogProps {
  events: AutomationEvent[];
}

const eventIcons: Record<AutomationEventType, typeof Activity> = {
  campaign_launched: Rocket,
  email_sent: Send,
  email_opened: MailOpen,
  email_clicked: MousePointerClick,
  lead_converted: UserCheck,
  contact_created: UserPlus,
  stage_changed: ArrowRightCircle,
  form_submitted: FileText,
  workflow_triggered: Zap,
  campaign_completed: CheckCircle,
};

const eventLabels: Record<AutomationEventType, string> = {
  campaign_launched: "Campaign Launched",
  email_sent: "Email Sent",
  email_opened: "Email Opened",
  email_clicked: "Email Clicked",
  lead_converted: "Lead Converted",
  contact_created: "Contact Created",
  stage_changed: "Stage Changed",
  form_submitted: "Form Submitted",
  workflow_triggered: "Workflow Triggered",
  campaign_completed: "Campaign Completed",
};

const allTypes: AutomationEventType[] = [
  "campaign_launched",
  "email_sent",
  "email_opened",
  "email_clicked",
  "lead_converted",
  "contact_created",
  "stage_changed",
  "form_submitted",
  "workflow_triggered",
  "campaign_completed",
];

export default function AutomationLog({ events }: AutomationLogProps) {
  const [filterType, setFilterType] = useState<AutomationEventType | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const sortedEvents = [...events].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
  );

  const filtered = sortedEvents.filter((ev) => {
    const matchType = filterType === "all" || ev.type === filterType;
    const matchSearch =
      !searchQuery ||
      ev.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (ev.contactName && ev.contactName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (ev.campaignName && ev.campaignName.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchType && matchSearch;
  });

  const typeCounts = events.reduce(
    (acc, ev) => {
      acc[ev.type] = (acc[ev.type] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  return (
    <div className="p-6 space-y-4 text-gray-900">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Automation Log</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          {events.length} total events · {filtered.length} shown
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {(["campaign_launched", "email_sent", "lead_converted", "contact_created", "stage_changed"] as AutomationEventType[]).map(
          (type) => {
            const Icon = eventIcons[type];
            const colorClass = getEventTypeColor(type);
            return (
              <button
                key={type}
                onClick={() => setFilterType(filterType === type ? "all" : type)}
                className={`bg-white rounded-xl p-4 shadow-sm border transition-colors ${
                  filterType === type ? "border-orange-400 bg-orange-50" : "border-gray-100 hover:border-orange-200"
                }`}
              >
                <Icon className={`w-5 h-5 ${colorClass} mb-2`} />
                <p className="text-xl font-bold text-gray-900">{typeCounts[type] || 0}</p>
                <p className="text-[10px] text-gray-500 mt-0.5">{eventLabels[type]}</p>
              </button>
            );
          },
        )}
      </div>

      {/* Filters & Search */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search events, contacts, campaigns..."
            className="w-full pl-9 pr-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-orange-400"
          />
        </div>
        <div className="flex items-center gap-1.5 flex-wrap">
          <Filter className="w-4 h-4 text-gray-400 shrink-0" />
          <button
            onClick={() => setFilterType("all")}
            className={`px-2.5 py-1 text-xs rounded-full border transition-colors ${
              filterType === "all"
                ? "bg-orange-500 text-white border-orange-500"
                : "bg-white text-gray-600 border-gray-200 hover:border-orange-300"
            }`}
          >
            All
          </button>
          {allTypes.map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(filterType === type ? "all" : type)}
              className={`px-2.5 py-1 text-xs rounded-full border transition-colors ${
                filterType === type
                  ? "bg-orange-500 text-white border-orange-500"
                  : "bg-white text-gray-600 border-gray-200 hover:border-orange-300"
              }`}
            >
              {eventLabels[type]}
            </button>
          ))}
        </div>
      </div>

      {/* Event feed */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="divide-y divide-gray-50">
          {filtered.map((ev) => {
            const Icon = eventIcons[ev.type];
            const colorClass = getEventTypeColor(ev.type);
            return (
              <div key={ev.id} className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50/50 transition-colors">
                <div className="mt-0.5 shrink-0">
                  <Icon className={`w-4.5 h-4.5 ${colorClass}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-800">{ev.description}</p>
                  <div className="flex flex-wrap items-center gap-2 mt-1">
                    <span className="text-[10px] text-gray-400">{formatDateFull(ev.timestamp)}</span>
                    {ev.campaignName && (
                      <span className="text-[10px] bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded">
                        {ev.campaignName}
                      </span>
                    )}
                    {ev.contactName && (
                      <span className="text-[10px] bg-purple-50 text-purple-600 px-1.5 py-0.5 rounded">
                        {ev.contactName}
                      </span>
                    )}
                    {ev.metadata &&
                      Object.entries(ev.metadata).map(([key, value]) => (
                        <span
                          key={key}
                          className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded"
                        >
                          {key}: {value}
                        </span>
                      ))}
                  </div>
                </div>
                <span
                  className={`text-[10px] font-medium px-2 py-0.5 rounded-full shrink-0 ${
                    ev.type.includes("launched") || ev.type.includes("completed")
                      ? "bg-green-50 text-green-600"
                      : ev.type.includes("email")
                        ? "bg-blue-50 text-blue-600"
                        : ev.type.includes("lead") || ev.type.includes("contact") || ev.type.includes("stage")
                          ? "bg-orange-50 text-orange-600"
                          : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {eventLabels[ev.type]}
                </span>
              </div>
            );
          })}
          {filtered.length === 0 && (
            <div className="px-4 py-12 text-center text-sm text-gray-400">
              No events match your filters
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
