export interface ApprovalTask {
  id: string;
  type: 'purchase_order' | 'invoice' | 'budget_transfer' | 'expense_report';
  referenceId: string;
  referenceNumber: string;
  title: string;
  description: string;
  requestedBy: string;
  requestedDate: string;
  dueDate: string;
  amount: number;
  currency: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'approved' | 'rejected' | 'delegated';
  department: string;
  notes?: string;
}

export const APPROVAL_TASKS_DATA: ApprovalTask[] = [
  {
    id: 'task-001',
    type: 'purchase_order',
    referenceId: 'po-001',
    referenceNumber: '4500001234',
    title: 'Approve PO for Steel Materials',
    description: 'Purchase order for steel plates and rods from Acme Industrial Supplies',
    requestedBy: 'John Smith',
    requestedDate: '2024-12-15',
    dueDate: '2024-12-18',
    amount: 45750.00,
    currency: 'USD',
    priority: 'high',
    status: 'pending',
    department: 'Manufacturing',
    notes: 'Urgent for Q1 production line'
  },
  {
    id: 'task-002',
    type: 'purchase_order',
    referenceId: 'po-004',
    referenceNumber: '4500001237',
    title: 'Approve PO for Packaging Materials',
    description: 'Purchase order for packaging and shipping supplies',
    requestedBy: 'Emily Chen',
    requestedDate: '2024-12-16',
    dueDate: '2024-12-20',
    amount: 23400.00,
    currency: 'USD',
    priority: 'medium',
    status: 'pending',
    department: 'Logistics'
  },
  {
    id: 'task-003',
    type: 'invoice',
    referenceId: 'inv-001',
    referenceNumber: 'INV-2024-5678',
    title: 'Approve Vendor Invoice',
    description: 'Invoice from TechParts Global for ECU units',
    requestedBy: 'AP Department',
    requestedDate: '2024-12-14',
    dueDate: '2024-12-21',
    amount: 85000.00,
    currency: 'USD',
    priority: 'high',
    status: 'pending',
    department: 'Accounts Payable'
  },
  {
    id: 'task-004',
    type: 'budget_transfer',
    referenceId: 'bt-001',
    referenceNumber: 'BT-2024-0089',
    title: 'Budget Transfer Request',
    description: 'Transfer $50,000 from Marketing to R&D for new project',
    requestedBy: 'Sarah Davis',
    requestedDate: '2024-12-13',
    dueDate: '2024-12-19',
    amount: 50000.00,
    currency: 'USD',
    priority: 'medium',
    status: 'pending',
    department: 'Finance',
    notes: 'Year-end budget reallocation'
  },
  {
    id: 'task-005',
    type: 'expense_report',
    referenceId: 'exp-001',
    referenceNumber: 'EXP-2024-1234',
    title: 'Travel Expense Report',
    description: 'Business trip to supplier conference in Germany',
    requestedBy: 'Michael Lee',
    requestedDate: '2024-12-10',
    dueDate: '2024-12-17',
    amount: 4250.00,
    currency: 'USD',
    priority: 'low',
    status: 'pending',
    department: 'Procurement'
  },
  {
    id: 'task-006',
    type: 'invoice',
    referenceId: 'inv-002',
    referenceNumber: 'INV-2024-5679',
    title: 'Approve Maintenance Invoice',
    description: 'Quarterly maintenance service invoice',
    requestedBy: 'AP Department',
    requestedDate: '2024-12-15',
    dueDate: '2024-12-22',
    amount: 12500.00,
    currency: 'USD',
    priority: 'low',
    status: 'pending',
    department: 'Accounts Payable'
  }
];
