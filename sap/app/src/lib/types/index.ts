// SAP ERP Types

export type POStatus = "Draft" | "Pending Approval" | "Approved" | "Rejected" | "Ordered" | "Received" | "Closed";

export type TaskStatus = "Open" | "In Progress" | "On Hold" | "Completed" | "Cancelled";

export type TaskPriority = "Low" | "Medium" | "High" | "Critical";

export type AuditAction = 
  | "CREATE" 
  | "UPDATE" 
  | "DELETE" 
  | "APPROVE" 
  | "REJECT" 
  | "COMMENT" 
  | "STATUS_CHANGE";

export interface Vendor {
  id: string;
  name: string;
  code: string;
  email: string;
  phone: string;
  address: string;
  rating: number;
  paymentTerms: string;
}

export interface Material {
  id: string;
  code: string;
  name: string;
  description: string;
  category: string;
  unitOfMeasure: string;
  unitPrice: number;
  stockQuantity: number;
}

export interface POLineItem {
  id: string;
  materialId: string;
  materialCode: string;
  materialName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  deliveryDate: string;
}

export interface PurchaseOrder {
  id: string;
  poNumber: string;
  vendorId: string;
  vendorName: string;
  status: POStatus;
  createdBy: string;
  createdAt: number;
  updatedAt: number;
  lineItems: POLineItem[];
  totalAmount: number;
  currency: string;
  deliveryDate: string;
  paymentTerms: string;
  notes: string;
  approverComments: Comment[];
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  content: string;
  timestamp: number;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  type: "Approval" | "Review" | "Action" | "Information";
  status: TaskStatus;
  priority: TaskPriority;
  assignedTo: string;
  createdBy: string;
  createdAt: number;
  dueDate: string;
  relatedEntityType?: "PurchaseOrder" | "Vendor" | "Material";
  relatedEntityId?: string;
  progress: number; // 0-100
  tags: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "Requester" | "Approver" | "Buyer" | "Manager" | "Admin";
  department: string;
  avatar?: string;
}

export interface AuditEntry {
  id: string;
  timestamp: number;
  action: AuditAction;
  entityType: "PurchaseOrder" | "Task" | "Vendor" | "Material";
  entityId: string;
  entityName: string;
  userId: string;
  userName: string;
  previousValue?: string;
  newValue?: string;
  details: string;
}

export interface KPIData {
  totalRevenue: number;
  revenueChange: number;
  openPOs: number;
  openPOsChange: number;
  pendingApprovals: number;
  pendingApprovalsChange: number;
  onTimeDelivery: number;
  deliveryChange: number;
  avgProcessingTime: number;
  processingTimeChange: number;
  savingsAchieved: number;
  savingsChange: number;
}

export interface Tab {
  id: string;
  type: "dashboard" | "procurement" | "po-detail" | "tasks" | "vendors" | "materials" | "audit";
  dataId?: string;
}

export type SearchResultType = "PurchaseOrder" | "Task" | "Vendor" | "Material";

export interface SearchResult {
  id: string;
  type: SearchResultType;
  title: string;
  subtitle: string;
  status?: string;
}
