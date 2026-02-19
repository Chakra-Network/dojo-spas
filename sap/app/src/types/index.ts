export type ViewId = "dashboard" | "procurement" | "procurement-detail" | "tasks" | "audit";

export type POStatus = "Draft" | "Pending Approval" | "Approved" | "Rejected" | "In Delivery" | "Received" | "Cancelled";

export type TaskStatus = "Open" | "In Progress" | "Completed" | "Deferred";

export type Priority = "High" | "Medium" | "Low";

export type Currency = "USD" | "EUR" | "GBP";

export interface Vendor {
  id: string;
  name: string;
  code: string;
  country: string;
  rating: number;
  category: string;
  contact: string;
  email: string;
}

export interface POLineItem {
  id: string;
  material: string;
  description: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  currency: Currency;
  deliveryDate: string;
}

export interface POComment {
  id: string;
  author: string;
  text: string;
  timestamp: string;
}

export interface PurchaseOrder {
  id: string;
  poNumber: string;
  title: string;
  vendor: Vendor;
  status: POStatus;
  priority: Priority;
  createdDate: string;
  requiredDate: string;
  totalAmount: number;
  currency: Currency;
  department: string;
  requestor: string;
  approver: string;
  lineItems: POLineItem[];
  comments: POComment[];
  plant: string;
  companyCode: string;
}

export interface ApprovalTask {
  id: string;
  taskNumber: string;
  title: string;
  description: string;
  type: "Purchase Order" | "Invoice" | "Budget Transfer" | "Material Request" | "Vendor Onboarding";
  status: TaskStatus;
  priority: Priority;
  assignee: string;
  requester: string;
  createdDate: string;
  dueDate: string;
  relatedDocId: string;
  amount: number;
  currency: Currency;
  progress: number;
}

export interface KPIData {
  totalRevenue: number;
  revenueChange: number;
  openPOs: number;
  openPOsChange: number;
  pendingApprovals: number;
  approvalsChange: number;
  budgetUtilization: number;
  budgetChange: number;
  totalSpend: number;
  spendChange: number;
  onTimeDelivery: number;
  deliveryChange: number;
}

export interface AuditEntry {
  id: string;
  timestamp: string;
  action: string;
  entity: string;
  entityId: string;
  user: string;
  details: string;
  category: "procurement" | "approval" | "navigation" | "system";
}

export interface AppState {
  currentView: ViewId;
  selectedPOId: string | null;
  searchQuery: string;
  purchaseOrders: PurchaseOrder[];
  tasks: ApprovalTask[];
  vendors: Vendor[];
  kpis: KPIData;
  auditLog: AuditEntry[];
  sidebarCollapsed: boolean;
  poStatusFilter: POStatus | "All";
  poPriorityFilter: Priority | "All";
  taskStatusFilter: TaskStatus | "All";
}
