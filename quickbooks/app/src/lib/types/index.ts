// ── Invoice Types ─────────────────────────────────────────────────
export type InvoiceStatus = "paid" | "unpaid" | "overdue" | "partial" | "draft";

export interface InvoiceLineItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

export interface Invoice {
  id: string;
  number: string;
  customerId: string;
  customerName: string;
  status: InvoiceStatus;
  issueDate: string;
  dueDate: string;
  lineItems: InvoiceLineItem[];
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  total: number;
  amountPaid: number;
  balance: number;
  notes: string;
  reminderSent: boolean;
}

// ── Customer Types ───────────────────────────────────────────────
export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  address: string;
  balance: number;
}

// ── Expense Types ────────────────────────────────────────────────
export type ExpenseCategory =
  | "office-supplies"
  | "travel"
  | "utilities"
  | "rent"
  | "payroll"
  | "marketing"
  | "software"
  | "insurance"
  | "meals"
  | "equipment"
  | "professional-services"
  | "other";

export interface Expense {
  id: string;
  date: string;
  vendor: string;
  category: ExpenseCategory;
  description: string;
  amount: number;
  paymentMethod: "credit-card" | "bank-transfer" | "cash" | "check";
  receiptUrl: string | null;
  receiptName: string | null;
  notes: string;
  isReconciled: boolean;
}

// ── Bank Transaction Types ───────────────────────────────────────
export type BankTransactionType = "deposit" | "withdrawal" | "transfer" | "fee";
export type ReconciliationStatus = "matched" | "unmatched" | "excluded";

export interface BankTransaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: BankTransactionType;
  reconciliationStatus: ReconciliationStatus;
  matchedEntryId: string | null;
  matchedEntryType: "invoice" | "expense" | null;
}

// ── Audit Types ──────────────────────────────────────────────────
export type AuditAction =
  | "invoice_created"
  | "invoice_updated"
  | "invoice_paid"
  | "invoice_reminder"
  | "expense_created"
  | "expense_updated"
  | "expense_deleted"
  | "reconciliation_matched"
  | "reconciliation_excluded"
  | "line_item_edited"
  | "status_changed";

export interface AuditEntry {
  id: string;
  timestamp: string;
  action: AuditAction;
  entityType: "invoice" | "expense" | "bank-transaction";
  entityId: string;
  description: string;
  previousValue: string | null;
  newValue: string | null;
  user: string;
}

// ── Dashboard Types ──────────────────────────────────────────────
export interface CashFlowEntry {
  month: string;
  inflow: number;
  outflow: number;
  net: number;
}

export interface ProfitLossEntry {
  category: string;
  amount: number;
  type: "revenue" | "expense";
}

// ── Navigation ───────────────────────────────────────────────────
export type NavSection =
  | "dashboard"
  | "invoices"
  | "expenses"
  | "reconciliation";

// ── App State ────────────────────────────────────────────────────
export interface QuickBooksState {
  currentSection: NavSection;
  invoices: Invoice[];
  customers: Customer[];
  expenses: Expense[];
  bankTransactions: BankTransaction[];
  auditLog: AuditEntry[];
  cashFlow: CashFlowEntry[];
  profitLoss: ProfitLossEntry[];

  // UI state
  sidebarCollapsed: boolean;
  auditSidebarOpen: boolean;
  selectedInvoiceId: string | null;
  invoiceSearch: string;
  invoiceStatusFilter: InvoiceStatus | "all";
  expenseSearch: string;
  expenseCategoryFilter: ExpenseCategory | "all";
  reconciliationStep: number;
  showAddExpenseModal: boolean;
  showCreateInvoiceModal: boolean;
}
