import {
  Users,
  Mail,
  MousePointerClick,
  TrendingUp,
  DollarSign,
  Megaphone,
  ArrowUp,
  ArrowDown,
  Activity,
} from "lucide-react";
import type { Campaign, Contact, AutomationEvent } from "../lib/types";
import { dashboardMetrics, funnelStages, monthlyEmailStats } from "../lib/consts";
import { formatNumber, formatCurrency, formatPercent, formatDate } from "../lib/utils";

interface DashboardProps {
  campaigns: Campaign[];
  contacts: Contact[];
  automationLog: AutomationEvent[];
}

function KPICard({
  label,
  value,
  change,
  icon: Icon,
  iconBg,
}: {
  label: string;
  value: string;
  change?: number;
  icon: typeof Users;
  iconBg: string;
}) {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">{label}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {change !== undefined && (
            <div className={`flex items-center gap-1 mt-1 text-xs font-medium ${change >= 0 ? "text-green-600" : "text-red-500"}`}>
              {change >= 0 ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
              <span>{Math.abs(change)}% vs last month</span>
            </div>
          )}
        </div>
        <div className={`${iconBg} rounded-lg p-2.5`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
      </div>
    </div>
  );
}

export default function Dashboard({ campaigns, contacts, automationLog }: DashboardProps) {
  const m = dashboardMetrics;
  const recentEvents = automationLog.slice(0, 8);
  const activeCampaigns = campaigns.filter((c) => c.status === "active");
  const maxSent = Math.max(...monthlyEmailStats.map((s) => s.sent));

  const stageDistribution = [
    { stage: "Subscriber", count: contacts.filter((c) => c.lifecycleStage === "subscriber").length, color: "bg-gray-400" },
    { stage: "Lead", count: contacts.filter((c) => c.lifecycleStage === "lead").length, color: "bg-blue-400" },
    { stage: "MQL", count: contacts.filter((c) => c.lifecycleStage === "mql").length, color: "bg-yellow-400" },
    { stage: "SQL", count: contacts.filter((c) => c.lifecycleStage === "sql").length, color: "bg-orange-400" },
    { stage: "Customer", count: contacts.filter((c) => c.lifecycleStage === "customer").length, color: "bg-green-400" },
  ];
  const totalContacts = contacts.length;

  return (
    <div className="p-6 space-y-6 text-gray-900">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold">Marketing Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Overview of your marketing performance</p>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <KPICard label="Total Leads" value={formatNumber(m.totalLeads)} change={m.leadsChange} icon={Users} iconBg="bg-blue-500" />
        <KPICard label="Emails Sent" value={formatNumber(m.emailsSent)} change={8.1} icon={Mail} iconBg="bg-indigo-500" />
        <KPICard label="Avg Open Rate" value={formatPercent(m.avgOpenRate)} change={2.3} icon={Mail} iconBg="bg-cyan-500" />
        <KPICard label="Avg Click Rate" value={formatPercent(m.avgClickRate)} change={-0.4} icon={MousePointerClick} iconBg="bg-purple-500" />
        <KPICard label="Conversion Rate" value={formatPercent(m.conversionRate)} change={1.1} icon={TrendingUp} iconBg="bg-orange-500" />
        <KPICard label="Revenue" value={formatCurrency(m.revenue)} change={15.7} icon={DollarSign} iconBg="bg-green-500" />
      </div>

      {/* Two column layout */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Lead Funnel */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">Lead Funnel</h2>
          <div className="space-y-3">
            {funnelStages.map((stage) => (
              <div key={stage.name}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-medium text-gray-700">{stage.name}</span>
                  <span className="text-gray-500">{formatNumber(stage.count)}</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3">
                  <div
                    className={`${stage.color} h-3 rounded-full transition-all duration-500`}
                    style={{ width: `${Math.max(stage.percentage, 2)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Email Engagement (bar chart) */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 xl:col-span-2">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">Email Engagement (Monthly)</h2>
          <div className="flex items-end gap-1.5 h-40">
            {monthlyEmailStats.map((stat) => (
              <div key={stat.month} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full flex flex-col items-center gap-0.5" style={{ height: "130px" }}>
                  <div className="w-full flex flex-col justify-end h-full gap-0.5">
                    <div
                      className="w-full bg-orange-200 rounded-t"
                      style={{ height: `${(stat.sent / maxSent) * 100}%` }}
                      title={`Sent: ${formatNumber(stat.sent)}`}
                    />
                  </div>
                </div>
                <span className="text-[10px] text-gray-500">{stat.month}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-4 mt-3">
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <span className="w-2.5 h-2.5 rounded-sm bg-orange-200" />Sent
            </div>
          </div>
        </div>
      </div>

      {/* Bottom section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Contact Stage Distribution */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">Contact Lifecycle</h2>
          <div className="space-y-2.5">
            {stageDistribution.map((s) => (
              <div key={s.stage} className="flex items-center gap-3">
                <div className={`w-2.5 h-2.5 rounded-full ${s.color} shrink-0`} />
                <span className="text-sm text-gray-700 flex-1">{s.stage}</span>
                <span className="text-sm font-semibold text-gray-900">{s.count}</span>
                <span className="text-xs text-gray-400 w-10 text-right">
                  {totalContacts ? Math.round((s.count / totalContacts) * 100) : 0}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Active Campaigns */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <Megaphone className="w-4 h-4 text-orange-500" />
            <h2 className="text-sm font-semibold text-gray-700">Active Campaigns ({activeCampaigns.length})</h2>
          </div>
          <div className="space-y-3">
            {activeCampaigns.slice(0, 5).map((c) => (
              <div key={c.id} className="flex items-center justify-between py-1.5">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">{c.name}</p>
                  <p className="text-xs text-gray-500">{c.owner} · {formatNumber(c.leads)} leads</p>
                </div>
                <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full shrink-0">
                  Active
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="w-4 h-4 text-orange-500" />
            <h2 className="text-sm font-semibold text-gray-700">Recent Activity</h2>
          </div>
          <div className="space-y-3">
            {recentEvents.map((ev) => (
              <div key={ev.id} className="flex gap-2.5">
                <div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5 shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs text-gray-700 leading-snug">{ev.description}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">{formatDate(ev.timestamp)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
