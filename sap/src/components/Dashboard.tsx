import { useDojoState } from '../dojo/state';

export default function Dashboard() {
  const kpis = useDojoState('kpis');
  const purchaseOrders = useDojoState('purchaseOrders');
  const approvalTasks = useDojoState('approvalTasks');
  const auditLog = useDojoState('auditLog');

  const pendingPOs = purchaseOrders.filter((po) => po.status === 'pending');
  const pendingTasks = approvalTasks.filter((t) => t.status === 'pending');
  const recentActivity = auditLog.slice(0, 5);

  const trendIcons = { up: '📈', down: '📉', stable: '➡️' };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <div key={kpi.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex justify-between items-start">
              <div className="text-sm text-gray-500">{kpi.label}</div>
              <span className="text-lg">{trendIcons[kpi.trend]}</span>
            </div>
            <div className="text-2xl font-bold text-gray-800 mt-2">
              {kpi.unit === 'USD' && '$'}{typeof kpi.value === 'number' ? kpi.value.toLocaleString() : kpi.value}{kpi.unit === '%' && '%'}
            </div>
            <div className={`text-sm mt-1 ${kpi.trend === 'up' ? 'text-green-600' : kpi.trend === 'down' ? 'text-red-600' : 'text-gray-500'}`}>
              {kpi.trendValue > 0 ? '+' : ''}{kpi.trendValue}% from last period
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <h2 className="font-semibold text-gray-800">Pending Purchase Orders</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {pendingPOs.length === 0 ? (
              <div className="p-4 text-center text-gray-500">No pending purchase orders</div>
            ) : (
              pendingPOs.slice(0, 5).map((po) => (
                <div key={po.id} className="p-4 hover:bg-gray-50">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium text-gray-800">{po.poNumber}</div>
                      <div className="text-sm text-gray-500">{po.vendor}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-gray-800">${po.totalAmount.toLocaleString()}</div>
                      <div className="text-xs text-gray-500">{new Date(po.createdDate).toLocaleDateString()}</div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <h2 className="font-semibold text-gray-800">Pending Approval Tasks</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {pendingTasks.length === 0 ? (
              <div className="p-4 text-center text-gray-500">No pending tasks</div>
            ) : (
              pendingTasks.slice(0, 5).map((task) => (
                <div key={task.id} className="p-4 hover:bg-gray-50">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium text-gray-800">{task.title}</div>
                      <div className="text-sm text-gray-500">{task.referenceNumber}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-gray-800">${task.amount.toLocaleString()}</div>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        task.priority === 'high' ? 'bg-red-100 text-red-700' :
                        task.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {task.priority}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h2 className="font-semibold text-gray-800">Recent Activity</h2>
        </div>
        <div className="divide-y divide-gray-100">
          {recentActivity.length === 0 ? (
            <div className="p-4 text-center text-gray-500">No recent activity</div>
          ) : (
            recentActivity.map((entry) => (
              <div key={entry.id} className="p-4 flex items-center gap-4">
                <div className={`w-2 h-2 rounded-full ${
                  entry.module === 'procurement' ? 'bg-blue-500' :
                  entry.module === 'tasks' ? 'bg-purple-500' :
                  'bg-gray-500'
                }`} />
                <div className="flex-1">
                  <div className="text-sm text-gray-800">{entry.action}</div>
                  <div className="text-xs text-gray-500">by {entry.user}</div>
                </div>
                <div className="text-xs text-gray-400">
                  {new Date(entry.timestamp).toLocaleTimeString()}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
