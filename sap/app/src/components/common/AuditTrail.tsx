import { cn, formatDateTime } from "@/lib/utils";
import { useAppContext } from "@/context/AppProvider";
import {
  FileText,
  ClipboardList,
  Users,
  Package,
  Plus,
  Edit,
  Trash2,
  Check,
  X,
  MessageSquare,
  RefreshCw,
} from "lucide-react";
import type { AuditAction } from "@/lib/types";

export default function AuditTrail() {
  const { state } = useAppContext();

  const getActionIcon = (action: AuditAction) => {
    switch (action) {
      case "CREATE":
        return Plus;
      case "UPDATE":
        return Edit;
      case "DELETE":
        return Trash2;
      case "APPROVE":
        return Check;
      case "REJECT":
        return X;
      case "COMMENT":
        return MessageSquare;
      case "STATUS_CHANGE":
        return RefreshCw;
    }
  };

  const getActionColor = (action: AuditAction) => {
    switch (action) {
      case "CREATE":
        return "bg-green-100 text-green-600";
      case "UPDATE":
        return "bg-blue-100 text-blue-600";
      case "DELETE":
        return "bg-red-100 text-red-600";
      case "APPROVE":
        return "bg-green-100 text-green-600";
      case "REJECT":
        return "bg-red-100 text-red-600";
      case "COMMENT":
        return "bg-purple-100 text-purple-600";
      case "STATUS_CHANGE":
        return "bg-orange-100 text-orange-600";
    }
  };

  const getEntityIcon = (entityType: string) => {
    switch (entityType) {
      case "PurchaseOrder":
        return FileText;
      case "Task":
        return ClipboardList;
      case "Vendor":
        return Users;
      case "Material":
        return Package;
      default:
        return FileText;
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Audit Trail</h1>
        <p className="text-sm text-gray-500 mt-1">
          Complete history of all system changes and user actions
        </p>
      </div>

      {/* Audit Log */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50 border-b text-xs font-medium text-gray-500 uppercase tracking-wider">
          <div className="col-span-2">Timestamp</div>
          <div className="col-span-1">Action</div>
          <div className="col-span-2">Entity</div>
          <div className="col-span-2">User</div>
          <div className="col-span-2">Previous</div>
          <div className="col-span-2">New Value</div>
          <div className="col-span-1">Details</div>
        </div>

        {/* Audit Entries */}
        <div className="divide-y">
          {state.auditLog.map((entry) => {
            const ActionIcon = getActionIcon(entry.action);
            const EntityIcon = getEntityIcon(entry.entityType);

            return (
              <div
                key={entry.id}
                className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-gray-50 transition-colors"
              >
                {/* Timestamp */}
                <div className="col-span-2">
                  <p className="text-sm text-gray-900">
                    {formatDateTime(entry.timestamp)}
                  </p>
                </div>

                {/* Action */}
                <div className="col-span-1">
                  <div
                    className={cn(
                      "inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium",
                      getActionColor(entry.action)
                    )}
                  >
                    <ActionIcon className="w-3 h-3" />
                    <span className="hidden xl:inline">{entry.action}</span>
                  </div>
                </div>

                {/* Entity */}
                <div className="col-span-2">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded bg-gray-100">
                      <EntityIcon className="w-4 h-4 text-gray-500" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {entry.entityName}
                      </p>
                      <p className="text-xs text-gray-500">{entry.entityType}</p>
                    </div>
                  </div>
                </div>

                {/* User */}
                <div className="col-span-2">
                  <p className="text-sm text-gray-900">{entry.userName}</p>
                </div>

                {/* Previous Value */}
                <div className="col-span-2">
                  {entry.previousValue ? (
                    <span className="text-sm text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                      {entry.previousValue}
                    </span>
                  ) : (
                    <span className="text-sm text-gray-400">—</span>
                  )}
                </div>

                {/* New Value */}
                <div className="col-span-2">
                  {entry.newValue ? (
                    <span className="text-sm text-gray-900 bg-blue-50 px-2 py-0.5 rounded">
                      {entry.newValue}
                    </span>
                  ) : (
                    <span className="text-sm text-gray-400">—</span>
                  )}
                </div>

                {/* Details */}
                <div className="col-span-1">
                  <p className="text-xs text-gray-500 truncate" title={entry.details}>
                    {entry.details}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {state.auditLog.length === 0 && (
          <div className="px-6 py-12 text-center">
            <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No audit entries yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
