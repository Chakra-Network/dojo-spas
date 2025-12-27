import { useState } from 'react';
import { useDojoState, dojo } from '../dojo/state';

export default function AuditTrail() {
  const auditLog = useDojoState('auditLog');
  const searchQuery = useDojoState('searchQuery');
  const [moduleFilter, setModuleFilter] = useState<string>('all');

  const filteredLog = auditLog.filter((entry) => {
    const matchesModule = moduleFilter === 'all' || entry.module === moduleFilter;
    const matchesSearch =
      searchQuery === '' ||
      entry.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.user.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesModule && matchesSearch;
  });

  const reversedLog = [...filteredLog].reverse();

  const groupedByDate = reversedLog.reduce((acc, entry) => {
    const date = new Date(entry.timestamp).toLocaleDateString();
    if (!acc[date]) acc[date] = [];
    acc[date].push(entry);
    return acc;
  }, {} as Record<string, typeof auditLog>);

  const moduleColors: Record<string, string> = {
    purchaseOrders: 'bg-blue-100 text-blue-700',
    approvalTasks: 'bg-purple-100 text-purple-700',
    kpis: 'bg-green-100 text-green-700',
  };

  const totalActions = auditLog.length;
  const uniqueUsers = new Set(auditLog.map((e) => e.user)).size;
  const poActions = auditLog.filter((e) => e.module === 'purchaseOrders').length;
  const taskActions = auditLog.filter((e) => e.module === 'approvalTasks').length;

  const handleClearLog = () => {
    dojo.setState('auditLog', [], 'Cleared audit log', 'John Doe');
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="text-2xl font-bold text-gray-800">{totalActions}</div>
          <div className="text-sm text-gray-500">Total Actions</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="text-2xl font-bold text-blue-600">{uniqueUsers}</div>
          <div className="text-sm text-gray-500">Active Users</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="text-2xl font-bold text-purple-600">{poActions}</div>
          <div className="text-sm text-gray-500">PO Actions</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="text-2xl font-bold text-green-600">{taskActions}</div>
          <div className="text-sm text-gray-500">Task Actions</div>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          {['all', 'purchaseOrders', 'approvalTasks'].map((mod) => (
            <button
              key={mod}
              onClick={() => setModuleFilter(mod)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                moduleFilter === mod
                  ? 'bg-[#0f4c81] text-white'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {mod === 'all' ? 'All' : mod === 'purchaseOrders' ? 'Procurement' : 'Tasks'}
            </button>
          ))}
        </div>
        {auditLog.length > 0 && (
          <button
            onClick={handleClearLog}
            className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg"
          >
            Clear Log
          </button>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {reversedLog.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <div className="text-4xl mb-2">📋</div>
            <div>No activity logged yet. Actions will appear here as you interact with the system.</div>
          </div>
        ) : (
          Object.entries(groupedByDate).map(([date, entries]) => (
            <div key={date}>
              <div className="px-4 py-2 bg-gray-50 border-b border-gray-200 text-sm font-medium text-gray-600">
                {date}
              </div>
              <div className="divide-y divide-gray-100">
                {entries.map((entry) => (
                  <div key={entry.id} className="p-4 flex items-start gap-4">
                    <div className="text-xs text-gray-400 w-20 flex-shrink-0">
                      {new Date(entry.timestamp).toLocaleTimeString()}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${moduleColors[entry.module] || 'bg-gray-100 text-gray-700'}`}>
                          {entry.module === 'purchaseOrders' ? 'Procurement' : entry.module === 'approvalTasks' ? 'Tasks' : entry.module}
                        </span>
                        <span className="text-sm font-medium text-gray-800">{entry.description}</span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">by {entry.user}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
