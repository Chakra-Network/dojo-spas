import { useDojoState } from "@chakra-dev/dojo-hooks";
import { useCallback } from "react";
import type {
  QuickBooksState,
  NavSection,
  InvoiceLineItem,
  Expense,
  AuditEntry,
} from "../lib/types";
import {
  mockInvoices,
  mockCustomers,
  mockExpenses,
  mockBankTransactions,
  mockAuditLog,
  mockCashFlow,
  mockProfitLoss,
} from "../lib/consts";

import Sidebar from "./Sidebar";
import AuditSidebar from "./AuditSidebar";
import Dashboard from "./Dashboard";
import Invoices from "./Invoices";
import InvoiceDetail from "./InvoiceDetail";
import Expenses from "./Expenses";
import { ExpenseDetailModal, AddExpenseModal } from "./ExpenseModal";
import Reconciliation from "./Reconciliation";

export default function QuickBooks() {
  const [state, setState] = useDojoState<QuickBooksState>({
    currentSection: "dashboard",
    invoices: mockInvoices,
    customers: mockCustomers,
    expenses: mockExpenses,
    bankTransactions: mockBankTransactions,
    auditLog: mockAuditLog,
    cashFlow: mockCashFlow,
    profitLoss: mockProfitLoss,
    sidebarCollapsed: false,
    auditSidebarOpen: false,
    selectedInvoiceId: null,
    invoiceSearch: "",
    invoiceStatusFilter: "all",
    expenseSearch: "",
    expenseCategoryFilter: "all",
    reconciliationStep: 0,
    showAddExpenseModal: false,
    showCreateInvoiceModal: false,
  });

  // ── Helpers ──────────────────────────────────────────────────
  const addAudit = useCallback(
    (entry: Omit<AuditEntry, "id" | "timestamp">) => {
      const newEntry: AuditEntry = {
        ...entry,
        id: `aud-${Date.now()}`,
        timestamp: new Date().toISOString(),
      };
      setState((s) => ({
        ...s,
        auditLog: [newEntry, ...s.auditLog],
      }));
    },
    [setState],
  );

  const navigate = useCallback(
    (section: NavSection) =>
      setState((s) => ({
        ...s,
        currentSection: section,
        selectedInvoiceId: null,
      })),
    [setState],
  );

  // ── Invoice Actions ──────────────────────────────────────────
  const handleMarkPaid = useCallback(
    (id: string) => {
      setState((s) => ({
        ...s,
        invoices: s.invoices.map((inv) =>
          inv.id === id
            ? { ...inv, status: "paid" as const, amountPaid: inv.total, balance: 0 }
            : inv,
        ),
      }));
      const inv = state.invoices.find((i) => i.id === id);
      addAudit({
        action: "invoice_paid",
        entityType: "invoice",
        entityId: id,
        description: `Invoice ${inv?.number || id} marked as paid — ${inv ? `$${inv.total.toLocaleString()}` : ""}`,
        previousValue: inv?.status || null,
        newValue: "paid",
        user: "Current User",
      });
    },
    [setState, addAudit, state.invoices],
  );

  const handleSendReminder = useCallback(
    (id: string) => {
      setState((s) => ({
        ...s,
        invoices: s.invoices.map((inv) =>
          inv.id === id ? { ...inv, reminderSent: true } : inv,
        ),
      }));
      const inv = state.invoices.find((i) => i.id === id);
      addAudit({
        action: "invoice_reminder",
        entityType: "invoice",
        entityId: id,
        description: `Payment reminder sent for ${inv?.number || id} to ${inv?.customerName || "customer"}`,
        previousValue: null,
        newValue: "reminder_sent",
        user: "Current User",
      });
    },
    [setState, addAudit, state.invoices],
  );

  const handleUpdateLineItems = useCallback(
    (id: string, lineItems: InvoiceLineItem[]) => {
      const subtotal = lineItems.reduce((s, li) => s + li.amount, 0);
      setState((s) => ({
        ...s,
        invoices: s.invoices.map((inv) => {
          if (inv.id !== id) return inv;
          const taxAmount = subtotal * (inv.taxRate / 100);
          const total = subtotal + taxAmount;
          return {
            ...inv,
            lineItems,
            subtotal,
            taxAmount,
            total,
            balance: total - inv.amountPaid,
          };
        }),
      }));
      addAudit({
        action: "line_item_edited",
        entityType: "invoice",
        entityId: id,
        description: `Line items updated on invoice ${id}`,
        previousValue: null,
        newValue: `${lineItems.length} line items, subtotal $${subtotal.toLocaleString()}`,
        user: "Current User",
      });
    },
    [setState, addAudit],
  );

  // ── Expense Actions ──────────────────────────────────────────
  const handleAddExpense = useCallback(
    (expense: Expense) => {
      setState((s) => ({
        ...s,
        expenses: [expense, ...s.expenses],
        showAddExpenseModal: false,
        profitLoss: s.profitLoss.map((p) => {
          const catMap: Record<string, string> = {
            payroll: "Payroll & Benefits",
            rent: "Rent & Utilities",
            utilities: "Rent & Utilities",
            software: "Software & Tools",
            marketing: "Marketing & Ads",
            travel: "Travel & Meals",
            meals: "Travel & Meals",
            insurance: "Insurance",
            "office-supplies": "Office Supplies & Equipment",
            equipment: "Office Supplies & Equipment",
            "professional-services": "Professional Services",
          };
          const matchCat = catMap[expense.category];
          if (p.category === matchCat && p.type === "expense") {
            return { ...p, amount: p.amount + expense.amount };
          }
          return p;
        }),
      }));
      addAudit({
        action: "expense_created",
        entityType: "expense",
        entityId: expense.id,
        description: `New expense: ${expense.vendor} — $${expense.amount.toLocaleString()}`,
        previousValue: null,
        newValue: `$${expense.amount.toLocaleString()}`,
        user: "Current User",
      });
    },
    [setState, addAudit],
  );

  // ── Reconciliation Actions ───────────────────────────────────
  const handleReconcileMatch = useCallback(
    (transactionId: string, entryId: string, entryType: "invoice" | "expense") => {
      setState((s) => ({
        ...s,
        bankTransactions: s.bankTransactions.map((t) =>
          t.id === transactionId
            ? {
                ...t,
                reconciliationStatus: "matched" as const,
                matchedEntryId: entryId,
                matchedEntryType: entryType,
              }
            : t,
        ),
      }));
      addAudit({
        action: "reconciliation_matched",
        entityType: "bank-transaction",
        entityId: transactionId,
        description: `Bank transaction ${transactionId} matched to ${entryType} ${entryId}`,
        previousValue: "unmatched",
        newValue: "matched",
        user: "Current User",
      });
    },
    [setState, addAudit],
  );

  const handleReconcileExclude = useCallback(
    (transactionId: string) => {
      setState((s) => ({
        ...s,
        bankTransactions: s.bankTransactions.map((t) =>
          t.id === transactionId
            ? {
                ...t,
                reconciliationStatus: "excluded" as const,
                matchedEntryId: null,
                matchedEntryType: null,
              }
            : t,
        ),
      }));
      addAudit({
        action: "reconciliation_excluded",
        entityType: "bank-transaction",
        entityId: transactionId,
        description: `Bank transaction ${transactionId} excluded from reconciliation`,
        previousValue: "unmatched",
        newValue: "excluded",
        user: "Current User",
      });
    },
    [setState, addAudit],
  );

  // ── Expense detail modal state ───────────────────────────────
  const viewExpenseRef = state.expenses.find(
    (e) => e.id === (state as QuickBooksState & { viewingExpenseId?: string }).viewingExpenseId,
  );

  // ── Render Section ───────────────────────────────────────────
  const renderSection = () => {
    // Invoice detail sub-view
    if (state.currentSection === "invoices" && state.selectedInvoiceId) {
      const invoice = state.invoices.find(
        (i) => i.id === state.selectedInvoiceId,
      );
      if (invoice) {
        return (
          <InvoiceDetail
            invoice={invoice}
            onBack={() =>
              setState((s) => ({ ...s, selectedInvoiceId: null }))
            }
            onMarkPaid={handleMarkPaid}
            onSendReminder={handleSendReminder}
            onUpdateLineItems={handleUpdateLineItems}
          />
        );
      }
    }

    switch (state.currentSection) {
      case "dashboard":
        return (
          <Dashboard
            invoices={state.invoices}
            expenses={state.expenses}
            cashFlow={state.cashFlow}
            profitLoss={state.profitLoss}
          />
        );
      case "invoices":
        return (
          <Invoices
            invoices={state.invoices}
            search={state.invoiceSearch}
            statusFilter={state.invoiceStatusFilter}
            onSearchChange={(q) =>
              setState((s) => ({ ...s, invoiceSearch: q }))
            }
            onFilterChange={(f) =>
              setState((s) => ({ ...s, invoiceStatusFilter: f }))
            }
            onSelect={(id) =>
              setState((s) => ({ ...s, selectedInvoiceId: id }))
            }
            onCreateNew={() =>
              setState((s) => ({ ...s, showCreateInvoiceModal: true }))
            }
          />
        );
      case "expenses":
        return (
          <Expenses
            expenses={state.expenses}
            search={state.expenseSearch}
            categoryFilter={state.expenseCategoryFilter}
            onSearchChange={(q) =>
              setState((s) => ({ ...s, expenseSearch: q }))
            }
            onFilterChange={(f) =>
              setState((s) => ({ ...s, expenseCategoryFilter: f }))
            }
            onAddNew={() =>
              setState((s) => ({ ...s, showAddExpenseModal: true }))
            }
            onViewExpense={() => {
              // modal handled via viewExpenseRef below
            }}
          />
        );
      case "reconciliation":
        return (
          <Reconciliation
            transactions={state.bankTransactions}
            invoices={state.invoices}
            expenses={state.expenses}
            step={state.reconciliationStep}
            onStepChange={(step) =>
              setState((s) => ({ ...s, reconciliationStep: step }))
            }
            onMatch={handleReconcileMatch}
            onExclude={handleReconcileExclude}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="h-screen flex bg-gray-50 text-gray-900 overflow-hidden">
      <Sidebar
        currentSection={state.currentSection}
        onNavigate={navigate}
        collapsed={state.sidebarCollapsed}
        onToggle={() =>
          setState((s) => ({ ...s, sidebarCollapsed: !s.sidebarCollapsed }))
        }
        auditOpen={state.auditSidebarOpen}
        onAuditToggle={() =>
          setState((s) => ({
            ...s,
            auditSidebarOpen: !s.auditSidebarOpen,
          }))
        }
      />
      <main className="flex-1 overflow-y-auto">{renderSection()}</main>
      {state.auditSidebarOpen && (
        <AuditSidebar
          entries={state.auditLog}
          onClose={() =>
            setState((s) => ({ ...s, auditSidebarOpen: false }))
          }
        />
      )}

      {/* Modals */}
      {state.showAddExpenseModal && (
        <AddExpenseModal
          onClose={() =>
            setState((s) => ({ ...s, showAddExpenseModal: false }))
          }
          onAdd={handleAddExpense}
        />
      )}
      {viewExpenseRef && (
        <ExpenseDetailModal
          expense={viewExpenseRef}
          onClose={() =>
            setState((s) => ({
              ...s,
            }))
          }
        />
      )}
    </div>
  );
}
