import { TrendingUp, Users, Mail, Target, ArrowUp, ArrowDown } from "lucide-react";
import { useAppContext } from "@/context/AppProvider";

export default function Dashboard() {
  const { state } = useAppContext();

  const activeCampaigns = state.campaigns.filter((c) => c.status === "Active").length;
  const totalLeads = state.campaigns.reduce((sum, c) => sum + c.leads, 0);
  const totalConversions = state.campaigns.reduce((sum, c) => sum + c.conversions, 0);
  const avgConversionRate = totalLeads > 0 ? ((totalConversions / totalLeads) * 100).toFixed(1) : "0";

  const emailStats = {
    sent: state.emails.filter((e) => e.status === "Sent").length,
    opens: state.emails.reduce((sum, e) => sum + (e.opens || 0), 0),
    clicks: state.emails.reduce((sum, e) => sum + (e.clicks || 0), 0),
  };

  const recentContacts = [...state.contacts]
    .sort((a, b) => b.createdAt - a.createdAt)
    .slice(0, 5);

  const topCampaigns = [...state.campaigns]
    .sort((a, b) => b.conversions - a.conversions)
    .slice(0, 3);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#2d3e50]">Marketing Dashboard</h1>
        <div className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Active Campaigns"
          value={activeCampaigns}
          icon={<Target className="text-[#ff7a59]" size={24} />}
          trend={{ value: 12, isPositive: true }}
        />
        <KPICard
          title="Total Leads"
          value={totalLeads.toLocaleString()}
          icon={<Users className="text-[#00a4bd]" size={24} />}
          trend={{ value: 8, isPositive: true }}
        />
        <KPICard
          title="Conversion Rate"
          value={`${avgConversionRate}%`}
          icon={<TrendingUp className="text-[#00bda5]" size={24} />}
          trend={{ value: 2.3, isPositive: true }}
        />
        <KPICard
          title="Email Engagement"
          value={`${emailStats.opens.toLocaleString()} opens`}
          icon={<Mail className="text-[#6b47dc]" size={24} />}
          trend={{ value: 5, isPositive: false }}
        />
      </div>

      {/* Lead Funnel & Email Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-lg font-semibold text-[#2d3e50] mb-4">Lead Funnel</h2>
          <div className="space-y-4">
            {[
              { stage: "Subscribers", count: state.contacts.filter((c) => c.lifecycleStage === "Subscriber").length, color: "#7c98b6" },
              { stage: "Leads", count: state.contacts.filter((c) => c.lifecycleStage === "Lead").length, color: "#00a4bd" },
              { stage: "MQL", count: state.contacts.filter((c) => c.lifecycleStage === "MQL").length, color: "#00bda5" },
              { stage: "SQL", count: state.contacts.filter((c) => c.lifecycleStage === "SQL").length, color: "#ff7a59" },
              { stage: "Customers", count: state.contacts.filter((c) => c.lifecycleStage === "Customer").length, color: "#6b47dc" },
            ].map((item) => (
              <div key={item.stage} className="flex items-center gap-4">
                <div className="w-24 text-sm text-gray-600">{item.stage}</div>
                <div className="flex-1 h-8 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${Math.max(((item.count / (state.contacts.length || 1)) * 100), 5)}%`,
                      backgroundColor: item.color,
                    }}
                  />
                </div>
                <div className="w-12 text-right font-medium">{item.count}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h2 className="text-lg font-semibold text-[#2d3e50] mb-4">Email Performance</h2>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-[#f5f8fa] rounded-lg">
              <div className="text-2xl font-bold text-[#2d3e50]">{emailStats.sent}</div>
              <div className="text-sm text-gray-500">Sent</div>
            </div>
            <div className="text-center p-4 bg-[#f5f8fa] rounded-lg">
              <div className="text-2xl font-bold text-[#2d3e50]">{emailStats.opens.toLocaleString()}</div>
              <div className="text-sm text-gray-500">Opens</div>
            </div>
            <div className="text-center p-4 bg-[#f5f8fa] rounded-lg">
              <div className="text-2xl font-bold text-[#2d3e50]">{emailStats.clicks.toLocaleString()}</div>
              <div className="text-sm text-gray-500">Clicks</div>
            </div>
          </div>
          <div className="text-sm text-gray-500">
            Open Rate: {emailStats.sent > 0 ? ((emailStats.opens / (emailStats.sent * 1000)) * 100).toFixed(1) : 0}%
          </div>
        </div>
      </div>

      {/* Top Campaigns & Recent Contacts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-lg font-semibold text-[#2d3e50] mb-4">Top Campaigns</h2>
          <div className="space-y-4">
            {topCampaigns.map((campaign) => (
              <div key={campaign.id} className="flex items-center justify-between p-3 bg-[#f5f8fa] rounded-lg">
                <div>
                  <div className="font-medium text-[#2d3e50]">{campaign.name}</div>
                  <div className="text-sm text-gray-500">{campaign.type} Campaign</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-[#00bda5]">{campaign.conversions}</div>
                  <div className="text-sm text-gray-500">conversions</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h2 className="text-lg font-semibold text-[#2d3e50] mb-4">Recent Contacts</h2>
          <div className="space-y-3">
            {recentContacts.map((contact) => (
              <div key={contact.id} className="flex items-center gap-3 p-2 hover:bg-[#f5f8fa] rounded-lg transition-colors">
                <div className="w-10 h-10 bg-[#7c98b6] rounded-full flex items-center justify-center text-white font-medium">
                  {contact.firstName[0]}{contact.lastName[0]}
                </div>
                <div className="flex-1">
                  <div className="font-medium text-[#2d3e50]">
                    {contact.firstName} {contact.lastName}
                  </div>
                  <div className="text-sm text-gray-500">{contact.company}</div>
                </div>
                <span className={`badge ${
                  contact.lifecycleStage === "Customer" ? "badge-completed" :
                  contact.lifecycleStage === "SQL" || contact.lifecycleStage === "Opportunity" ? "badge-active" :
                  "badge-draft"
                }`}>
                  {contact.lifecycleStage}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function KPICard({
  title,
  value,
  icon,
  trend,
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend: { value: number; isPositive: boolean };
}) {
  return (
    <div className="card">
      <div className="flex items-start justify-between mb-4">
        <div className="p-2 bg-[#f5f8fa] rounded-lg">{icon}</div>
        <div className={`flex items-center gap-1 text-sm ${trend.isPositive ? "text-green-600" : "text-red-500"}`}>
          {trend.isPositive ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
          {trend.value}%
        </div>
      </div>
      <div className="text-2xl font-bold text-[#2d3e50] mb-1">{value}</div>
      <div className="text-sm text-gray-500">{title}</div>
    </div>
  );
}
