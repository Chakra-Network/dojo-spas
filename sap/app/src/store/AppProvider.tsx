/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useCallback, useMemo, type ReactNode } from "react";
import { useDojoState } from "@chakra-dev/dojo-hooks";
import type { AppState, ViewId, POStatus, Priority, TaskStatus, AuditEntry, POComment } from "../types/index.ts";
import { seedPurchaseOrders, seedTasks, seedVendors, seedKPIs, seedAuditLog } from "../data/seed.ts";

/* ------------------------------------------------------------------ */
/*  Initial state                                                      */
/* ------------------------------------------------------------------ */

const initialState: AppState = {
  currentView: "dashboard",
  selectedPOId: null,
  searchQuery: "",
  purchaseOrders: seedPurchaseOrders,
  tasks: seedTasks,
  vendors: seedVendors,
  kpis: seedKPIs,
  auditLog: seedAuditLog,
  sidebarCollapsed: false,
  poStatusFilter: "All",
  poPriorityFilter: "All",
  taskStatusFilter: "All",
};

/* ------------------------------------------------------------------ */
/*  Context type                                                       */
/* ------------------------------------------------------------------ */

interface AppContextType {
  state: AppState;
  navigate: (view: ViewId) => void;
  selectPO: (id: string) => void;
  setSearchQuery: (q: string) => void;
  toggleSidebar: () => void;
  setPOStatusFilter: (f: POStatus | "All") => void;
  setPOPriorityFilter: (f: Priority | "All") => void;
  setTaskStatusFilter: (f: TaskStatus | "All") => void;
  approvePO: (id: string) => void;
  rejectPO: (id: string) => void;
  addPOComment: (poId: string, comment: POComment) => void;
  toggleTaskStatus: (id: string) => void;
  addAuditEntry: (entry: Omit<AuditEntry, "id" | "timestamp">) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

/* ------------------------------------------------------------------ */
/*  Provider                                                           */
/* ------------------------------------------------------------------ */

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useDojoState<AppState>(initialState);

  /* ---------- helpers ---------- */

  const addAuditEntry = useCallback(
    (entry: Omit<AuditEntry, "id" | "timestamp">) => {
      setState((prev) => ({
        ...prev,
        auditLog: [
          { ...entry, id: `a-${Date.now()}`, timestamp: new Date().toISOString() },
          ...prev.auditLog,
        ],
      }));
    },
    [setState],
  );

  /* ---------- navigation ---------- */

  const navigate = useCallback(
    (view: ViewId) => {
      setState((prev) => {
        const next: AppState = { ...prev, currentView: view };
        if (view !== "procurement-detail") next.selectedPOId = null;
        return next;
      });
      addAuditEntry({ action: "Navigated", entity: "View", entityId: view, user: "Dr. Claudia Richter", details: `Navigated to ${view} view.`, category: "navigation" });
    },
    [setState, addAuditEntry],
  );

  const selectPO = useCallback(
    (id: string) => {
      setState((prev) => ({ ...prev, currentView: "procurement-detail" as ViewId, selectedPOId: id }));
      const po = state.purchaseOrders.find((p) => p.id === id);
      addAuditEntry({ action: "Viewed PO", entity: "Purchase Order", entityId: id, user: "Dr. Claudia Richter", details: `Opened ${po?.poNumber ?? id} detail view.`, category: "procurement" });
    },
    [setState, state.purchaseOrders, addAuditEntry],
  );

  /* ---------- search ---------- */

  const setSearchQuery = useCallback(
    (q: string) => setState((prev) => ({ ...prev, searchQuery: q })),
    [setState],
  );

  /* ---------- sidebar ---------- */

  const toggleSidebar = useCallback(
    () => setState((prev) => ({ ...prev, sidebarCollapsed: !prev.sidebarCollapsed })),
    [setState],
  );

  /* ---------- filters ---------- */

  const setPOStatusFilter = useCallback(
    (f: POStatus | "All") => setState((prev) => ({ ...prev, poStatusFilter: f })),
    [setState],
  );

  const setPOPriorityFilter = useCallback(
    (f: Priority | "All") => setState((prev) => ({ ...prev, poPriorityFilter: f })),
    [setState],
  );

  const setTaskStatusFilter = useCallback(
    (f: TaskStatus | "All") => setState((prev) => ({ ...prev, taskStatusFilter: f })),
    [setState],
  );

  /* ---------- PO actions ---------- */

  const approvePO = useCallback(
    (id: string) => {
      setState((prev) => ({
        ...prev,
        purchaseOrders: prev.purchaseOrders.map((po) =>
          po.id === id ? { ...po, status: "Approved" as const } : po,
        ),
        tasks: prev.tasks.map((t) =>
          t.relatedDocId === id && t.type === "Purchase Order" ? { ...t, status: "Completed" as const, progress: 100 } : t,
        ),
      }));
      const po = state.purchaseOrders.find((p) => p.id === id);
      addAuditEntry({ action: "PO Approved", entity: "Purchase Order", entityId: id, user: "Dr. Claudia Richter", details: `Approved ${po?.poNumber ?? id} — ${po?.currency ?? ""} ${po?.totalAmount?.toLocaleString() ?? ""}.`, category: "procurement" });
    },
    [setState, state.purchaseOrders, addAuditEntry],
  );

  const rejectPO = useCallback(
    (id: string) => {
      setState((prev) => ({
        ...prev,
        purchaseOrders: prev.purchaseOrders.map((po) =>
          po.id === id ? { ...po, status: "Rejected" as const } : po,
        ),
        tasks: prev.tasks.map((t) =>
          t.relatedDocId === id && t.type === "Purchase Order" ? { ...t, status: "Completed" as const, progress: 100 } : t,
        ),
      }));
      const po = state.purchaseOrders.find((p) => p.id === id);
      addAuditEntry({ action: "PO Rejected", entity: "Purchase Order", entityId: id, user: "Dr. Claudia Richter", details: `Rejected ${po?.poNumber ?? id}.`, category: "procurement" });
    },
    [setState, state.purchaseOrders, addAuditEntry],
  );

  const addPOComment = useCallback(
    (poId: string, comment: POComment) => {
      setState((prev) => ({
        ...prev,
        purchaseOrders: prev.purchaseOrders.map((po) =>
          po.id === poId ? { ...po, comments: [...po.comments, comment] } : po,
        ),
      }));
      addAuditEntry({ action: "Comment Added", entity: "Purchase Order", entityId: poId, user: comment.author, details: `Added comment on ${poId}: "${comment.text.slice(0, 60)}…"`, category: "procurement" });
    },
    [setState, addAuditEntry],
  );

  /* ---------- task actions ---------- */

  const toggleTaskStatus = useCallback(
    (id: string) => {
      setState((prev) => ({
        ...prev,
        tasks: prev.tasks.map((t) => {
          if (t.id !== id) return t;
          const order: Array<"Open" | "In Progress" | "Completed" | "Deferred"> = ["Open", "In Progress", "Completed", "Deferred"];
          const idx = order.indexOf(t.status as "Open" | "In Progress" | "Completed" | "Deferred");
          const next = order[(idx + 1) % order.length];
          const progress = next === "Completed" ? 100 : next === "In Progress" ? 50 : next === "Deferred" ? t.progress : 0;
          return { ...t, status: next, progress };
        }),
      }));
      const task = state.tasks.find((t) => t.id === id);
      addAuditEntry({ action: "Task Status Changed", entity: "Approval Task", entityId: id, user: "Dr. Claudia Richter", details: `Toggled ${task?.taskNumber ?? id} status.`, category: "approval" });
    },
    [setState, state.tasks, addAuditEntry],
  );

  /* ---------- memoised context value ---------- */

  const value = useMemo<AppContextType>(
    () => ({
      state,
      navigate,
      selectPO,
      setSearchQuery,
      toggleSidebar,
      setPOStatusFilter,
      setPOPriorityFilter,
      setTaskStatusFilter,
      approvePO,
      rejectPO,
      addPOComment,
      toggleTaskStatus,
      addAuditEntry,
    }),
    [state, navigate, selectPO, setSearchQuery, toggleSidebar, setPOStatusFilter, setPOPriorityFilter, setTaskStatusFilter, approvePO, rejectPO, addPOComment, toggleTaskStatus, addAuditEntry],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppContext must be used within AppProvider");
  return ctx;
}
