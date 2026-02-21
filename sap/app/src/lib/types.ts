export type POStatus = "Draft" | "Pending Approval" | "Approved" | "Rejected" | "Ordered" | "Delivered";
export type TaskStatus = "Pending" | "In Progress" | "Completed" | "Cancelled";
export type TaskPriority = "Low" | "Medium" | "High" | "Critical";
export type AuditAction = "create" | "update" | "delete" | "approve" | "reject" | "comment" | "status_change";

export interface PurchaseOrder {
  id: string;
  poNumber: string;
  vendor: string;
  vendorId: string;
  description: string;
  amount: number;
  currency: string;
  requestedBy: string;
  department: string;
  status: POStatus;
  createdDate: string;
  deliveryDate: string;
  items: POItem[];
  comments: POComment[];
  approver?: string;
  approvedDate?: string;
}

export interface POItem {
  id: string;
  itemNumber: string;
  description: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  unit: string;
}

export interface POComment {
  id: string;
  author: string;
  text: string;
  timestamp: string;
}

export interface ApprovalTask {
  id: string;
  title: string;
  description: string;
  type: "Purchase Order" | "Travel Request" | "Expense Report" | "Time Off";
  referenceId: string;
  amount?: number;
  currency?: string;
  requestedBy: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
  createdDate: string;
  completedDate?: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  action: AuditAction;
  entityType: "PurchaseOrder" | "Task" | "User";
  entityId: string;
  entityName: string;
  performedBy: string;
  details: string;
  metadata?: Record<string, unknown>;
}

export interface KPI {
  label: string;
  value: string | number;
  change?: number;
  trend?: "up" | "down" | "stable";
  icon?: string;
}

export interface AppState {
  currentUser: string;
  currentSection: "dashboard" | "procurement" | "tasks" | "audit";
  purchaseOrders: PurchaseOrder[];
  tasks: ApprovalTask[];
  auditLog: AuditLogEntry[];
  searchQuery: string;
  selectedPOId: string | null;
  poFilters: {
    status: POStatus | "All";
    vendor: string;
    dateRange: string;
  };
  taskFilters: {
    status: TaskStatus | "All";
    priority: TaskPriority | "All";
  };
}

