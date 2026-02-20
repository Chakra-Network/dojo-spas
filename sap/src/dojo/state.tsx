import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { PURCHASE_ORDERS_DATA } from '../data/purchaseOrders';
import { APPROVAL_TASKS_DATA } from '../data/approvalTasks';
import { KPI_DATA } from '../data/kpis';

// ---------- Types ----------
export interface PurchaseOrder {
  id: string;
  poNumber: string;
  vendor: string;
  description: string;
  totalAmount: number;
  currency: string;
  status: 'draft' | 'pending_approval' | 'approved' | 'rejected' | 'ordered' | 'received';
  createdDate: string;
  requestedBy: string;
  department: string;
  lineItems: {
    itemNumber: string;
    description: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
  }[];
  approvalHistory?: {
    approver: string;
    action: 'approved' | 'rejected' | 'commented';
    timestamp: string;
    comment?: string;
  }[];
  comments?: string[];
}

export interface ApprovalTask {
  id: string;
  taskType: 'purchase_order' | 'expense_report' | 'budget_request' | 'vendor_approval';
  title: string;
  description: string;
  amount?: number;
  currency?: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'approved' | 'rejected' | 'in_review';
  assignedTo: string;
  requestedBy: string;
  dueDate: string;
  createdDate: string;
  relatedDocId?: string;
}

export interface KPI {
  id: string;
  name: string;
  value: number | string;
  previousValue?: number | string;
  unit?: string;
  trend?: 'up' | 'down' | 'stable';
  changePercent?: number;
  category: 'revenue' | 'procurement' | 'approvals' | 'operations';
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  action: string;
  description: string;
  user?: string;
  targetId?: string;
  targetType?: string;
}

export interface DojoState {
  purchaseOrders: PurchaseOrder[];
  approvalTasks: ApprovalTask[];
  kpis: KPI[];
  auditLog: AuditLogEntry[];
}

// ---------- Global Store ----------
let globalState: DojoState = {
  purchaseOrders: PURCHASE_ORDERS_DATA,
  approvalTasks: APPROVAL_TASKS_DATA,
  kpis: KPI_DATA,
  auditLog: [],
};

const listeners = new Set<() => void>();

export const dojo = {
  getState(): DojoState {
    return globalState;
  },

  setState<K extends keyof DojoState>(
    key: K,
    value: DojoState[K],
    auditDescription?: string
  ) {
    console.log(`Dojo State Change: Key=${key}, Value=`, value);
    globalState = { ...globalState, [key]: value };

    // Auto audit log
    if (key !== 'auditLog' && auditDescription) {
      const auditEntry: AuditLogEntry = {
        id: `audit-${Date.now()}-${Math.random()}`,
        timestamp: new Date().toISOString(),
        action: `UPDATE_${key.toUpperCase()}`,
        description: auditDescription,
        user: 'Current User',
      };
      globalState = {
        ...globalState,
        auditLog: [...globalState.auditLog, auditEntry],
      };
    }

    listeners.forEach((l) => l());
  },

  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
};

// ---------- React Context ----------
const DojoContext = createContext<typeof dojo | null>(null);

export const DojoProvider = ({ children }: { children: React.ReactNode }) => {
  const dojoRef = useRef(dojo);

  useEffect(() => {
    // Expose dojo globally for debugging in browser console
    (window as any).dojo = dojoRef.current;
  }, []);

  return (
    <DojoContext.Provider value={dojoRef.current}>{children}</DojoContext.Provider>
  );
};

// ---------- Hooks ----------
export function useDojo() {
  const context = useContext(DojoContext);
  if (!context) {
    throw new Error('useDojo must be used inside a <DojoProvider>');
  }
  return context;
}

export function useDojoState<K extends keyof DojoState>(key: K): DojoState[K] {
  const dojoCtx = useDojo();
  const [state, setState] = useState(dojoCtx.getState()[key]);

  useEffect(() => {
    const unsubscribe = dojoCtx.subscribe(() => {
      setState(dojoCtx.getState()[key]);
    });
    return unsubscribe;
  }, [key, dojoCtx]);

  return state;
}

// ---------- Initialize ----------
export function initializeDojoState(initialData: Partial<DojoState>) {
  globalState = {
    purchaseOrders: initialData.purchaseOrders || PURCHASE_ORDERS_DATA,
    approvalTasks: initialData.approvalTasks || APPROVAL_TASKS_DATA,
    kpis: initialData.kpis || KPI_DATA,
    auditLog: initialData.auditLog || [],
  };
  listeners.forEach((l) => l());
}
