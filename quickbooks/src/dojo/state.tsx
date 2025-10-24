import React, { useState, useEffect } from 'react';

// Types
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
}

export interface BankTransaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  matched: boolean;
  matchedWith?: string; // Invoice or Expense ID
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
}

// Global state store
let globalState: DojoState = {
  invoices: [],
  expenses: [],
  bankTransactions: [],
  auditLog: [],
};

// Subscribers for state changes
const listeners = new Set<() => void>();

// Dojo state management object
export const dojo = {
  getState(): DojoState {
    return globalState;
  },

  setState<K extends keyof DojoState>(key: K, value: DojoState[K], auditDescription?: string) {
    globalState = { ...globalState, [key]: value };

    // Auto-log to audit if not updating auditLog itself
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

    // Notify all subscribers
    listeners.forEach(listener => listener());
  },

  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
};

// React hook to use dojo state
export function useDojoState<K extends keyof DojoState>(key: K): DojoState[K] {
  const [state, setState] = useState<DojoState[K]>(dojo.getState()[key]);

  useEffect(() => {
    const unsubscribe = dojo.subscribe(() => {
      setState(dojo.getState()[key]);
    });
    return () => unsubscribe();
  }, [key]);

  return state;
}

// Dojo Provider to initialize global state and provide context
export const DojoProvider = ({ children }: { children: React.ReactNode }) => {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    setIsInitialized(true);
  }, []);

  if (!isInitialized) {
    return null;
  }

  return <>{children}</>;
};

// Initialize state with seed data (called once at app startup)
export function initializeDojoState(initialData: Partial<DojoState>) {
  globalState = {
    invoices: initialData.invoices || [],
    expenses: initialData.expenses || [],
    bankTransactions: initialData.bankTransactions || [],
    auditLog: initialData.auditLog || [],
  };
  listeners.forEach(listener => listener());
}
