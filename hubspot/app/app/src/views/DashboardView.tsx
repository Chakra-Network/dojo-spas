import { useAppContext } from "../context/AppContext";
import StatCard from "../components/dashboard/StatCard";
import ChartContainer from "../components/dashboard/ChartContainer";
import LeadFunnelChart from "../components/dashboard/LeadFunnelChart";
import EmailEngagementChart from "../components/dashboard/EmailEngagementChart";
import { Users, Target, TrendingUp, Mail } from "lucide-react";
import Spinner from "../components/common/Spinner";

function DashboardView() {
  const { state } = useAppContext();
  
  if (!state || !state.dashboard) {
    return <Spinner />;
  }

  const { dashboard } = state;

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-hub-text mb-6">Marketing Dashboard</h1>

      {/* Responsive Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Leads"
          value={dashboard.totalLeads.toLocaleString()}
          icon={Users}
          color="#3b82f6"
        />
        <StatCard
          title="New Leads (This Month)"
          value={dashboard.newLeadsThisMonth.toLocaleString()}
          icon={Target}
          color="#10b981"
        />
        <StatCard
          title="Conversion Rate"
          value={`${dashboard.conversionRate}%`}
          icon={TrendingUp}
          color="#f59e0b"
        />
        <StatCard
          title="Emails Sent"
          value={dashboard.emailEngagement.sent.toLocaleString()}
          icon={Mail}
          color="#8b5cf6"
        />
      </div>

      {/* Responsive Charts Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <ChartContainer title="Lead Funnel by Lifecycle Stage">
            <LeadFunnelChart data={dashboard.leadFunnel} />
        </ChartContainer>
        <ChartContainer title="Email Engagement Over Time">
            <EmailEngagementChart 
                openRate={dashboard.emailEngagement.openRate}
                clickRate={dashboard.emailEngagement.clickRate}
            />
        </ChartContainer>
      </div>
    </div>
  );
}

export default DashboardView;