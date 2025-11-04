import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

// ---------- Types ----------
export interface Invoice {
  id: string;
  clientName: string;
  amount: number;
  status: 'paid' | 'unpaid';
  dueDate: string;
  lineItems: { description: string; quantity: number; rate: number }[];
  createdAt: string;
}

export interface Expense {
  id: string;
  category: string;
  description: string;
  amount: number;
  date: string;
  receiptUrl?: string;
  status: 'paid' | 'unpaid';
}

export interface CustomerTransaction {
  type: string;
  num: string;
  date: string;
  account: string;
  amount: string | number;
}

export interface Customer {
  name: string;
  balance: number;
  transactions?: CustomerTransaction[];
  children?: Customer[];
  phone?: string;
  ownerName?: string;
  altPhone?: string;
  type?: string;
  fax?: string;
  terms?: string;
  email?: string;
  address?: string;
  id: string;
}

export interface VendorTransaction {
  type: string;
  num: string;
  date: string;
  account: string;
  amount: string | number;
}

export interface Vendor {
  id: string;
  name: string;
  balance: number;
  transactions?: VendorTransaction[];
  children?: Vendor[];
  phone?: string;
  contactName?: string;
  email?: string;
  address?: string;
}

export interface BankTransaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  matched: boolean;
  matchedWith?: string; 
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  action: string;
  description: string;
}

export interface DojoState {
  invoices: Invoice[];
  expenses: Expense[];
  bankTransactions: BankTransaction[];
  auditLog: AuditLogEntry[];
  customers: Customer[];
  vendors: Vendor[];
}

// ---------- Global Store ----------
let globalState: DojoState = {
  invoices: [],
  expenses: [],
  bankTransactions: [],
  auditLog: [],
  customers: [],
  vendors: [],
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
    invoices: initialData.invoices || [],
    expenses: initialData.expenses || [],
    bankTransactions: initialData.bankTransactions || [],
    auditLog: initialData.auditLog || [],
    customers: initialData.customers || [],
    vendors: initialData.vendors || [],
  };
  listeners.forEach((l) => l());
}
