import { useAppContext } from "@/context/AppProvider";
import { formatDateTime, getRelativeTime } from "@/lib/utils";
import { 
  FileText, 
  Plus, 
  Edit, 
  Trash2, 
  CheckCircle, 
  XCircle,
  MessageSquare,
  Activity
} from "lucide-react";
import type { AuditAction } from "@/lib/types";

const actionIcons: Record<AuditAction, React.ReactNode> = {
  create: <Plus className="w-4 h-4" />,
  update: <Edit className="w-4 h-4" />,
  delete: <Trash2 className="w-4 h-4" />,
  approve: <CheckCircle className="w-4 h-4" />,
  reject: <XCircle className="w-4 h-4" />,
  comment: <MessageSquare className="w-4 h-4" />,
  status_change: <Activity className="w-4 h-4" />,
};

const actionColors: Record<AuditAction, string> = {
  create: "bg-blue-100 text-blue-600",
  update: "bg-purple-100 text-purple-600",
  delete: "bg-red-100 text-red-600",
  approve: "bg-green-100 text-green-600",
  reject: "bg-red-100 text-red-600",
  comment: "bg-gray-100 text-gray-600",
  status_change: "bg-orange-100 text-orange-600",
};

const actionLabels: Record<AuditAction, string> = {
  create: "Created",
  update: "Updated",
  delete: "Deleted",
  approve: "Approved",
  reject: "Rejected",
  comment: "Commented",
  status_change: "Status Changed",
};

export default function AuditTrail() {
  const { state } = useAppContext();

  const groupedLogs = state.auditLog.reduce((groups, log) => {
    const date = new Date(log.timestamp).toLocaleDateString("de-DE");
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(log);
    return groups;
  }, {} as Record<string, typeof state.auditLog>);

  const sortedDates = Object.keys(groupedLogs).sort((a, b) => {
    return new Date(b).getTime() - new Date(a).getTime();
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <FileText className="w-7 h-7" />
          Audit Trail
        </h1>
        <p className="text-gray-600 mt-1">
          Complete history of all actions and changes in the system
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <p className="text-sm text-gray-600 mb-1">Total Activities</p>
          <p className="text-2xl font-bold text-gray-900">{state.auditLog.length}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <p className="text-sm text-gray-600 mb-1">Approvals</p>
          <p className="text-2xl font-bold text-green-600">
            {state.auditLog.filter(log => log.action === "approve").length}
          </p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <p className="text-sm text-gray-600 mb-1">Rejections</p>
          <p className="text-2xl font-bold text-red-600">
            {state.auditLog.filter(log => log.action === "reject").length}
          </p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <p className="text-sm text-gray-600 mb-1">Today's Activities</p>
          <p className="text-2xl font-bold text-blue-600">
            {state.auditLog.filter(log => {
              const logDate = new Date(log.timestamp).toLocaleDateString("de-DE");
              const today = new Date().toLocaleDateString("de-DE");
              return logDate === today;
            }).length}
          </p>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg">
        {state.auditLog.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500">No audit entries yet</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {sortedDates.map((date) => (
              <div key={date}>
                <div className="bg-gray-50 px-6 py-3 sticky top-0">
                  <h3 className="font-semibold text-gray-900">{date}</h3>
                </div>

                <div className="divide-y divide-gray-100">
                  {groupedLogs[date].map((log) => (
                    <div key={log.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start gap-4">
                        <div className={`p-2 rounded-lg ${actionColors[log.action]}`}>
                          {actionIcons[log.action]}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4 mb-1">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-semibold text-gray-900">
                                  {log.performedBy}
                                </span>
                                <span className="text-gray-600">•</span>
                                <span className={`text-sm font-medium ${actionColors[log.action].split(" ")[1]}`}>
                                  {actionLabels[log.action]}
                                </span>
                              </div>
                              <p className="text-sm text-gray-700">{log.details}</p>
                            </div>
                            <span className="text-xs text-gray-500 whitespace-nowrap">
                              {getRelativeTime(log.timestamp)}
                            </span>
                          </div>

                          <div className="flex items-center gap-3 text-xs text-gray-500 mt-2">
                            <span className="font-medium">{log.entityType}</span>
                            <span>•</span>
                            <span>{log.entityName}</span>
                            <span>•</span>
                            <span>{formatDateTime(log.timestamp)}</span>
                          </div>

                          {log.metadata && Object.keys(log.metadata).length > 0 && (
                            <div className="mt-2 bg-gray-50 rounded px-3 py-2 text-xs">
                              <div className="font-mono text-gray-600">
                                {JSON.stringify(log.metadata, null, 2)
                                  .split("\n")
                                  .map((line, i) => (
                                    <div key={i}>{line}</div>
                                  ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

