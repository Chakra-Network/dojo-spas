import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { PURCHASE_ORDERS_DATA, PurchaseOrder } from '../data/purchaseOrders';
import { APPROVAL_TASKS_DATA, ApprovalTask } from '../data/tasks';
import { VENDORS_DATA, Vendor } from '../data/vendors';

// ---------- Types ----------
export interface AuditLogEntry {
  id: string;
  timestamp: string;
  action: string;
  description: string;
  user: string;
  module: string;
}

export interface KPI {
  id: string;
  label: string;
  value: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  trendValue: number;
}

export interface DojoState {
  purchaseOrders: PurchaseOrder[];
  approvalTasks: ApprovalTask[];
  vendors: Vendor[];
  auditLog: AuditLogEntry[];
  kpis: KPI[];
  searchQuery: string;
}

// ---------- Initial KPIs ----------
const INITIAL_KPIS: KPI[] = [
  { id: 'kpi-1', label: 'Total Revenue', value: 12450000, unit: 'USD', trend: 'up', trendValue: 8.5 },
  { id: 'kpi-2', label: 'Open POs', value: 3, unit: 'count', trend: 'stable', trendValue: 0 },
  { id: 'kpi-3', label: 'Pending Approvals', value: 6, unit: 'count', trend: 'up', trendValue: 2 },
  { id: 'kpi-4', label: 'On-Time Delivery', value: 94.5, unit: '%', trend: 'up', trendValue: 2.3 },
];

// ---------- Global Store ----------
let globalState: DojoState = {
  purchaseOrders: PURCHASE_ORDERS_DATA,
  approvalTasks: APPROVAL_TASKS_DATA,
  vendors: VENDORS_DATA,
  auditLog: [],
  kpis: INITIAL_KPIS,
  searchQuery: '',
};

const listeners = new Set<() => void>();

export const dojo = {
  getState(): DojoState {
    return globalState;
  },

  setState<K extends keyof DojoState>(
    key: K,
    value: DojoState[K],
    auditDescription?: string,
    user: string = 'system'
  ) {
    console.log(`Dojo State Change: Key=${key}, Value=`, value);
    globalState = { ...globalState, [key]: value };

    // Auto audit log
    if (key !== 'auditLog' && key !== 'searchQuery' && auditDescription) {
      const auditEntry: AuditLogEntry = {
        id: `audit-${Date.now()}-${Math.random()}`,
        timestamp: new Date().toISOString(),
        action: `UPDATE_${key.toUpperCase()}`,
        description: auditDescription,
        user,
        module: key,
      };
      globalState = {
        ...globalState,
        auditLog: [...globalState.auditLog, auditEntry],
      };
    }

    // Update KPIs based on state changes
    if (key === 'purchaseOrders' || key === 'approvalTasks') {
      const pos = globalState.purchaseOrders;
      const tasks = globalState.approvalTasks;
      const openPOs = pos.filter(po => po.status === 'pending' || po.status === 'approved').length;
      const pendingApprovals = tasks.filter(t => t.status === 'pending').length;

      globalState = {
        ...globalState,
        kpis: globalState.kpis.map(kpi => {
          if (kpi.id === 'kpi-2') return { ...kpi, value: openPOs };
          if (kpi.id === 'kpi-3') return { ...kpi, value: pendingApprovals };
          return kpi;
        })
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
    // Expose dojo globally for debugging
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
    vendors: initialData.vendors || VENDORS_DATA,
    auditLog: initialData.auditLog || [],
    kpis: initialData.kpis || INITIAL_KPIS,
    searchQuery: initialData.searchQuery || '',
  };
  listeners.forEach((l) => l());
}

// Re-export types
export type { PurchaseOrder, PurchaseOrderItem } from '../data/purchaseOrders';
export type { ApprovalTask } from '../data/tasks';
export type { Vendor } from '../data/vendors';
