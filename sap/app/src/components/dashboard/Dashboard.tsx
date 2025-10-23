import { 
  DollarSign, 
  ShoppingCart, 
  Clock, 
  TrendingUp,
  AlertCircle,
  CheckCircle
} from "lucide-react";
import { useAppContext } from "@/context/AppProvider";
import { formatCurrency } from "@/lib/utils";
import KPICard from "./KPICard";
import StatusBadge from "../common/StatusBadge";

export default function Dashboard() {
  const { state, setCurrentSection, selectPO } = useAppContext();

  const totalRevenue = state.purchaseOrders
    .filter(po => po.status === "Approved" || po.status === "Ordered" || po.status === "Delivered")
    .reduce((sum, po) => sum + po.amount, 0);

  const openPOs = state.purchaseOrders.filter(
    po => po.status === "Pending Approval" || po.status === "Draft"
  ).length;

  const pendingApprovals = state.tasks.filter(
    task => task.status === "Pending"
  ).length;

  const approvalRate = (() => {
    const approved = state.purchaseOrders.filter(po => po.status === "Approved").length;
    const total = state.purchaseOrders.filter(
      po => po.status === "Approved" || po.status === "Rejected"
    ).length;
    return total > 0 ? Math.round((approved / total) * 100) : 0;
  })();

  const recentPOs = state.purchaseOrders
    .sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime())
    .slice(0, 5);

  const criticalTasks = state.tasks
    .filter(task => task.priority === "Critical" && task.status === "Pending")
    .slice(0, 3);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back, {state.currentUser}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Total Procurement Value"
          value={formatCurrency(totalRevenue)}
          change={12.5}
          trend="up"
          icon={<DollarSign />}
          iconBgColor="bg-green-500"
          subtitle="Approved & Ordered"
        />
        
        <KPICard
          title="Open Purchase Orders"
          value={openPOs}
          icon={<ShoppingCart />}
          iconBgColor="bg-blue-500"
          subtitle="Awaiting action"
        />
        
        <KPICard
          title="Pending Approvals"
          value={pendingApprovals}
          icon={<Clock />}
          iconBgColor="bg-orange-500"
          subtitle="Requires attention"
        />
        
        <KPICard
          title="Approval Rate"
          value={`${approvalRate}%`}
          change={5.2}
          trend="up"
          icon={<TrendingUp />}
          iconBgColor="bg-purple-500"
          subtitle="This quarter"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-500" />
              Critical Tasks
            </h2>
            <button
              onClick={() => setCurrentSection("tasks")}
              className="text-sm text-[#00a9e0] hover:underline"
            >
              View all
            </button>
          </div>
          
          {criticalTasks.length === 0 ? (
            <div className="text-center py-8">
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
              <p className="text-gray-500">No critical tasks pending</p>
            </div>
          ) : (
            <div className="space-y-3">
              {criticalTasks.map((task) => (
                <div
                  key={task.id}
                  className="p-4 border border-gray-200 rounded-lg hover:border-[#00a9e0] transition-colors cursor-pointer"
                  onClick={() => setCurrentSection("tasks")}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium text-gray-900 text-sm flex-1">{task.title}</h3>
                    <StatusBadge status={task.priority} />
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Requested by {task.requestedBy}</span>
                    <span>Due: {new Date(task.dueDate).toLocaleDateString("de-DE")}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Purchase Orders</h2>
            <button
              onClick={() => setCurrentSection("procurement")}
              className="text-sm text-[#00a9e0] hover:underline"
            >
              View all
            </button>
          </div>
          
          <div className="space-y-3">
            {recentPOs.map((po) => (
              <div
                key={po.id}
                className="p-4 border border-gray-200 rounded-lg hover:border-[#00a9e0] transition-colors cursor-pointer"
                onClick={() => {
                  setCurrentSection("procurement");
                  selectPO(po.id);
                }}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 text-sm">{po.poNumber}</h3>
                    <p className="text-sm text-gray-600 mt-1">{po.description}</p>
                  </div>
                  <StatusBadge status={po.status} />
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500 mt-2">
                  <span>{po.vendor}</span>
                  <span className="font-semibold text-gray-900">{formatCurrency(po.amount)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

