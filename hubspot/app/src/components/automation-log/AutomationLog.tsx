import { Rocket, Mail, MousePointer, UserCheck, UserPlus, FileText, RefreshCw } from "lucide-react";
import { useAppContext } from "@/context/AppProvider";
import type { AutomationEventType } from "@/lib/types";

const eventIcons: Record<AutomationEventType, typeof Rocket> = {
  campaign_launched: Rocket,
  email_sent: Mail,
  email_opened: Mail,
  email_clicked: MousePointer,
  lead_converted: UserCheck,
  contact_created: UserPlus,
  contact_updated: RefreshCw,
  form_submitted: FileText,
};

const eventColors: Record<AutomationEventType, string> = {
  campaign_launched: "bg-[#ff7a59] text-white",
  email_sent: "bg-[#00a4bd] text-white",
  email_opened: "bg-[#00bda5] text-white",
  email_clicked: "bg-[#6b47dc] text-white",
  lead_converted: "bg-green-500 text-white",
  contact_created: "bg-blue-500 text-white",
  contact_updated: "bg-yellow-500 text-white",
  form_submitted: "bg-purple-500 text-white",
};

export default function AutomationLog() {
  const { state } = useAppContext();

  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  const groupedEvents = state.automationEvents.reduce((groups, event) => {
    const date = new Date(event.timestamp).toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
    if (!groups[date]) groups[date] = [];
    groups[date].push(event);
    return groups;
  }, {} as Record<string, typeof state.automationEvents>);

  const eventStats = {
    total: state.automationEvents.length,
    campaigns: state.automationEvents.filter((e) => e.type === "campaign_launched").length,
    emails: state.automationEvents.filter((e) => e.type.startsWith("email_")).length,
    conversions: state.automationEvents.filter((e) => e.type === "lead_converted").length,
    contacts: state.automationEvents.filter((e) => e.type === "contact_created").length,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#2d3e50]">Automation Log</h1>
        <div className="text-sm text-gray-500">
          {eventStats.total} total events
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="card">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#fff3e0] rounded-lg">
              <Rocket size={20} className="text-[#ff7a59]" />
            </div>
            <div>
              <div className="text-2xl font-bold text-[#2d3e50]">{eventStats.campaigns}</div>
              <div className="text-sm text-gray-500">Campaigns Launched</div>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#e5f5fc] rounded-lg">
              <Mail size={20} className="text-[#00a4bd]" />
            </div>
            <div>
              <div className="text-2xl font-bold text-[#2d3e50]">{eventStats.emails}</div>
              <div className="text-sm text-gray-500">Email Events</div>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#e3f9e5] rounded-lg">
              <UserCheck size={20} className="text-green-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-[#2d3e50]">{eventStats.conversions}</div>
              <div className="text-sm text-gray-500">Lead Conversions</div>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#e8f4fd] rounded-lg">
              <UserPlus size={20} className="text-blue-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-[#2d3e50]">{eventStats.contacts}</div>
              <div className="text-sm text-gray-500">Contacts Created</div>
            </div>
          </div>
        </div>
      </div>

      {/* Event Timeline */}
      <div className="card">
        <h2 className="text-lg font-semibold text-[#2d3e50] mb-4">Activity Timeline</h2>

        {Object.entries(groupedEvents).length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            No automation events recorded yet
          </div>
        ) : (
          <div className="space-y-8">
            {Object.entries(groupedEvents).map(([date, events]) => (
              <div key={date}>
                <h3 className="text-sm font-medium text-gray-500 mb-4 sticky top-0 bg-white py-2">
                  {date}
                </h3>
                <div className="space-y-4">
                  {events.map((event) => {
                    const Icon = eventIcons[event.type];
                    const colorClass = eventColors[event.type];
                    return (
                      <div key={event.id} className="flex gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${colorClass}`}>
                          <Icon size={18} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <div className="font-medium text-[#2d3e50]">
                                {event.description}
                              </div>
                              {event.entityName && (
                                <div className="text-sm text-gray-500">
                                  Related to: {event.entityName}
                                </div>
                              )}
                              {event.metadata && (
                                <div className="text-xs text-gray-400 mt-1">
                                  {Object.entries(event.metadata).map(([key, value]) => (
                                    <span key={key} className="mr-3">
                                      {key.replace(/([A-Z])/g, " $1").toLowerCase()}: {String(value)}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                            <div className="text-sm text-gray-400 whitespace-nowrap">
                              {formatTimestamp(event.timestamp)}
                            </div>
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

      {/* Event Types Legend */}
      <div className="card">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Event Types</h3>
        <div className="flex flex-wrap gap-3">
          {(Object.keys(eventIcons) as AutomationEventType[]).map((type) => {
            const Icon = eventIcons[type];
            const colorClass = eventColors[type];
            return (
              <div key={type} className="flex items-center gap-2">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${colorClass}`}>
                  <Icon size={12} />
                </div>
                <span className="text-sm text-gray-600">
                  {type.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
