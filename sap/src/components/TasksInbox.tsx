import { useState } from 'react';
import { useDojoState, dojo, ApprovalTask } from '../dojo/state';

type TaskFilter = 'all' | ApprovalTask['status'];

const priorityColors: Record<ApprovalTask['priority'], string> = {
  high: 'bg-red-500',
  medium: 'bg-yellow-500',
  low: 'bg-green-500',
};

const typeIcons: Record<ApprovalTask['type'], string> = {
  purchase_order: '📦',
  invoice: '📄',
  budget_transfer: '💰',
  expense_report: '🧾',
};

const typeLabels: Record<ApprovalTask['type'], string> = {
  purchase_order: 'Purchase Order',
  invoice: 'Invoice',
  budget_transfer: 'Budget Transfer',
  expense_report: 'Expense Report',
};

const statusColors: Record<ApprovalTask['status'], string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  approved: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
  delegated: 'bg-purple-100 text-purple-800',
};

export default function TasksInbox() {
  const approvalTasks = useDojoState('approvalTasks');
  const searchQuery = useDojoState('searchQuery');
  const [filter, setFilter] = useState<TaskFilter>('pending');
  const [selectedTask, setSelectedTask] = useState<ApprovalTask | null>(null);

  const filteredTasks = approvalTasks.filter((task) => {
    const matchesFilter = filter === 'all' || task.status === filter;
    const matchesSearch =
      searchQuery === '' ||
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.referenceNumber.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleApprove = (task: ApprovalTask) => {
    const updatedTasks = approvalTasks.map((t) =>
      t.id === task.id ? { ...t, status: 'approved' as const } : t
    );
    dojo.setState('approvalTasks', updatedTasks, `Approved ${typeLabels[task.type]} ${task.referenceNumber}`, 'John Doe');
    setSelectedTask(null);
  };

  const handleReject = (task: ApprovalTask) => {
    const updatedTasks = approvalTasks.map((t) =>
      t.id === task.id ? { ...t, status: 'rejected' as const } : t
    );
    dojo.setState('approvalTasks', updatedTasks, `Rejected ${typeLabels[task.type]} ${task.referenceNumber}`, 'John Doe');
    setSelectedTask(null);
  };

  const handleDelegate = (task: ApprovalTask) => {
    const updatedTasks = approvalTasks.map((t) =>
      t.id === task.id ? { ...t, status: 'delegated' as const } : t
    );
    dojo.setState('approvalTasks', updatedTasks, `Delegated ${typeLabels[task.type]} ${task.referenceNumber}`, 'John Doe');
    setSelectedTask(null);
  };

  const pendingCount = approvalTasks.filter((t) => t.status === 'pending').length;
  const approvedCount = approvalTasks.filter((t) => t.status === 'approved').length;
  const rejectedCount = approvalTasks.filter((t) => t.status === 'rejected').length;

  return (
    <div className="flex gap-6">
      <div className="flex-1">
        <div className="grid grid-cols-4 gap-4 mb-4">
          <button
            onClick={() => setFilter('pending')}
            className={`bg-white rounded-lg shadow-sm border p-4 text-left transition-all ${
              filter === 'pending' ? 'border-[#0f4c81] ring-2 ring-[#0f4c81]/20' : 'border-gray-200'
            }`}
          >
            <div className="text-2xl font-bold text-yellow-600">{pendingCount}</div>
            <div className="text-sm text-gray-500">Pending</div>
          </button>
          <button
            onClick={() => setFilter('approved')}
            className={`bg-white rounded-lg shadow-sm border p-4 text-left transition-all ${
              filter === 'approved' ? 'border-[#0f4c81] ring-2 ring-[#0f4c81]/20' : 'border-gray-200'
            }`}
          >
            <div className="text-2xl font-bold text-green-600">{approvedCount}</div>
            <div className="text-sm text-gray-500">Approved</div>
          </button>
          <button
            onClick={() => setFilter('rejected')}
            className={`bg-white rounded-lg shadow-sm border p-4 text-left transition-all ${
              filter === 'rejected' ? 'border-[#0f4c81] ring-2 ring-[#0f4c81]/20' : 'border-gray-200'
            }`}
          >
            <div className="text-2xl font-bold text-red-600">{rejectedCount}</div>
            <div className="text-sm text-gray-500">Rejected</div>
          </button>
          <button
            onClick={() => setFilter('all')}
            className={`bg-white rounded-lg shadow-sm border p-4 text-left transition-all ${
              filter === 'all' ? 'border-[#0f4c81] ring-2 ring-[#0f4c81]/20' : 'border-gray-200'
            }`}
          >
            <div className="text-2xl font-bold text-gray-800">{approvalTasks.length}</div>
            <div className="text-sm text-gray-500">All Tasks</div>
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 divide-y divide-gray-100">
          {filteredTasks.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              {filter === 'pending' ? (
                <>
                  <div className="text-4xl mb-2">✅</div>
                  <div>No pending tasks. You're all caught up!</div>
                </>
              ) : (
                'No tasks match your criteria'
              )}
            </div>
          ) : (
            filteredTasks.map((task) => (
              <div
                key={task.id}
                onClick={() => setSelectedTask(task)}
                className={`p-4 cursor-pointer hover:bg-gray-50 ${selectedTask?.id === task.id ? 'bg-blue-50' : ''}`}
              >
                <div className="flex items-start gap-3">
                  <div className="text-2xl">{typeIcons[task.type]}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${priorityColors[task.priority]}`} />
                      <span className="font-medium text-gray-800">{task.title}</span>
                      <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${statusColors[task.status]}`}>
                        {task.status}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      {task.referenceNumber} • {task.department} • Requested by {task.requestedBy}
                    </div>
                    <div className="flex items-center gap-4 mt-2 text-sm">
                      <span className="text-gray-800 font-medium">${task.amount.toLocaleString()}</span>
                      <span className="text-gray-500">Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {selectedTask && (
        <div className="w-96 bg-white rounded-lg shadow-sm border border-gray-200 h-fit sticky top-20">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="font-semibold text-gray-800">Task Details</h2>
            <button onClick={() => setSelectedTask(null)} className="text-gray-400 hover:text-gray-600">✕</button>
          </div>
          <div className="p-4 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{typeIcons[selectedTask.type]}</span>
              <div>
                <div className="font-medium text-gray-800">{typeLabels[selectedTask.type]}</div>
                <div className="text-sm text-gray-500">{selectedTask.referenceNumber}</div>
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Title</div>
              <div className="font-medium text-gray-800">{selectedTask.title}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Description</div>
              <div className="text-gray-800">{selectedTask.description}</div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-500">Amount</div>
                <div className="text-xl font-bold text-gray-800">${selectedTask.amount.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Priority</div>
                <div className="flex items-center gap-2">
                  <span className={`w-3 h-3 rounded-full ${priorityColors[selectedTask.priority]}`} />
                  <span className="capitalize font-medium">{selectedTask.priority}</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-500">Requested By</div>
                <div className="text-gray-800">{selectedTask.requestedBy}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Department</div>
                <div className="text-gray-800">{selectedTask.department}</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-500">Requested</div>
                <div className="text-gray-800">{new Date(selectedTask.requestedDate).toLocaleDateString()}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Due Date</div>
                <div className="text-gray-800">{new Date(selectedTask.dueDate).toLocaleDateString()}</div>
              </div>
            </div>
            {selectedTask.notes && (
              <div>
                <div className="text-sm text-gray-500">Notes</div>
                <div className="text-gray-800 bg-gray-50 p-2 rounded text-sm">{selectedTask.notes}</div>
              </div>
            )}
            {selectedTask.status === 'pending' && (
              <div className="space-y-2 pt-2">
                <div className="flex gap-2">
                  <button
                    onClick={() => handleApprove(selectedTask)}
                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(selectedTask)}
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium"
                  >
                    Reject
                  </button>
                </div>
                <button
                  onClick={() => handleDelegate(selectedTask)}
                  className="w-full px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 font-medium"
                >
                  Delegate to Another User
                </button>
              </div>
            )}
            {selectedTask.status !== 'pending' && (
              <div className={`text-sm p-2 rounded ${
                selectedTask.status === 'approved' ? 'bg-green-50 text-green-700' :
                selectedTask.status === 'rejected' ? 'bg-red-50 text-red-700' :
                'bg-purple-50 text-purple-700'
              }`}>
                This task has been {selectedTask.status === 'delegated' ? 'delegated to another user' : selectedTask.status}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
