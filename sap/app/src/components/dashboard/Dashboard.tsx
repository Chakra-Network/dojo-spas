import { useAppContext } from "@/context/AppProvider";
import KPIWidget from "./KPIWidget";
import RecentPOsWidget from "./RecentPOsWidget";
import PendingApprovalsWidget from "./PendingApprovalsWidget";
import TasksOverviewWidget from "./TasksOverviewWidget";
import {
  DollarSign,
  FileText,
  Clock,
  TrendingUp,
  Truck,
  PiggyBank,
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export default function Dashboard() {
  const { state } = useAppContext();
  const { kpiData } = state;

  return (
    <div className="p-6 space-y-6" data-testid="dashboard-page">
      {/* Page Header */}
      <div className="mb-2">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">
          Overview of your procurement operations
        </p>
      </div>

      {/* KPI Widgets Grid - Responsive for 1280px and 1440px viewports */}
      <div 
        className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4"
        data-testid="kpi-widgets-grid"
      >
        <KPIWidget
          id="revenue"
          title="Total Revenue"
          value={formatCurrency(kpiData.totalRevenue)}
          change={kpiData.revenueChange}
          icon={DollarSign}
          iconBg="bg-green-100"
          iconColor="text-green-600"
        />
        <KPIWidget
          id="open-pos"
          title="Open POs"
          value={kpiData.openPOs.toString()}
          change={kpiData.openPOsChange}
          icon={FileText}
          iconBg="bg-blue-100"
          iconColor="text-blue-600"
        />
        <KPIWidget
          id="pending-approvals"
          title="Pending Approvals"
          value={kpiData.pendingApprovals.toString()}
          change={kpiData.pendingApprovalsChange}
          icon={Clock}
          iconBg="bg-yellow-100"
          iconColor="text-yellow-600"
          isUrgent={kpiData.pendingApprovals > 0}
        />
        <KPIWidget
          id="on-time-delivery"
          title="On-Time Delivery"
          value={`${kpiData.onTimeDelivery}%`}
          change={kpiData.deliveryChange}
          icon={Truck}
          iconBg="bg-purple-100"
          iconColor="text-purple-600"
        />
        <KPIWidget
          id="avg-processing"
          title="Avg Processing"
          value={`${kpiData.avgProcessingTime} days`}
          change={kpiData.processingTimeChange}
          icon={TrendingUp}
          iconBg="bg-orange-100"
          iconColor="text-orange-600"
          invertChange
        />
        <KPIWidget
          id="savings"
          title="Savings Achieved"
          value={formatCurrency(kpiData.savingsAchieved)}
          change={kpiData.savingsChange}
          icon={PiggyBank}
          iconBg="bg-emerald-100"
          iconColor="text-emerald-600"
        />
      </div>

      {/* Main Content Grid - 3 columns at 1440px, 2 at 1280px, 1 on mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-1">
          <PendingApprovalsWidget />
        </div>
        <div className="xl:col-span-1">
          <RecentPOsWidget />
        </div>
        <div className="xl:col-span-1">
          <TasksOverviewWidget />
        </div>
      </div>
    </div>
  );
}
