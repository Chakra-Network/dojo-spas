/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useMemo,
  useCallback,
  type ReactNode,
} from "react";
import { useDojoState } from "@chakra-dev/dojo-hooks";
import { initialState } from "@/lib/seedData";
import type {
  AppState,
  PurchaseOrder,
  ApprovalTask,
  AuditLogEntry,
  POStatus,
  TaskStatus,
  POComment,
} from "@/lib/types";

interface AppContextType {
  state: AppState;
  
  setCurrentSection: (section: AppState["currentSection"]) => void;
  
  setSearchQuery: (query: string) => void;
  
  selectPO: (poId: string | null) => void;
  updatePOStatus: (poId: string, status: POStatus, approver?: string) => void;
  addPOComment: (poId: string, comment: POComment) => void;
  setPOFilters: (filters: Partial<AppState["poFilters"]>) => void;
  
  updateTaskStatus: (taskId: string, status: TaskStatus) => void;
  setTaskFilters: (filters: Partial<AppState["taskFilters"]>) => void;
  
  addAuditEntry: (entry: Omit<AuditLogEntry, "id" | "timestamp">) => void;
  
  getFilteredPOs: () => PurchaseOrder[];
  getFilteredTasks: () => ApprovalTask[];
  searchResults: () => {
    pos: PurchaseOrder[];
    tasks: ApprovalTask[];
  };
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useDojoState<AppState>(initialState);

  const setCurrentSection = useCallback(
    (section: AppState["currentSection"]) => {
      setState((prev) => ({ ...prev, currentSection: section }));
    },
    [setState]
  );

  const setSearchQuery = useCallback(
    (query: string) => {
      setState((prev) => ({ ...prev, searchQuery: query }));
    },
    [setState]
  );

  const selectPO = useCallback(
    (poId: string | null) => {
      setState((prev) => ({ ...prev, selectedPOId: poId }));
    },
    [setState]
  );

  const updatePOStatus = useCallback(
    (poId: string, status: POStatus, approver?: string) => {
      setState((prev) => {
        const po = prev.purchaseOrders.find((p) => p.id === poId);
        if (!po) return prev;

        const updatedPOs = prev.purchaseOrders.map((p) =>
          p.id === poId
            ? {
                ...p,
                status,
                approver: approver || p.approver,
                approvedDate: approver ? new Date().toISOString() : p.approvedDate,
              }
            : p
        );

        const auditEntry: AuditLogEntry = {
          id: `audit-${Date.now()}`,
          timestamp: new Date().toISOString(),
          action: status === "Approved" ? "approve" : status === "Rejected" ? "reject" : "status_change",
          entityType: "PurchaseOrder",
          entityId: poId,
          entityName: po.poNumber,
          performedBy: prev.currentUser,
          details: `${status === "Approved" ? "Approved" : status === "Rejected" ? "Rejected" : "Changed status of"} purchase order for ${po.description}`,
          metadata: {
            amount: po.amount,
            previousStatus: po.status,
            newStatus: status,
          },
        };

        const updatedTasks = prev.tasks.map((task) => {
          if (task.referenceId === poId && task.type === "Purchase Order") {
            return {
              ...task,
              status: status === "Approved" || status === "Rejected" ? ("Completed" as TaskStatus) : task.status,
              completedDate: status === "Approved" || status === "Rejected" ? new Date().toISOString() : task.completedDate,
            };
          }
          return task;
        });

        return {
          ...prev,
          purchaseOrders: updatedPOs,
          tasks: updatedTasks,
          auditLog: [auditEntry, ...prev.auditLog],
        };
      });
    },
    [setState]
  );

  const addPOComment = useCallback(
    (poId: string, comment: POComment) => {
      setState((prev) => {
        const po = prev.purchaseOrders.find((p) => p.id === poId);
        if (!po) return prev;

        const updatedPOs = prev.purchaseOrders.map((p) =>
          p.id === poId
            ? {
                ...p,
                comments: [...p.comments, comment],
              }
            : p
        );

        const auditEntry: AuditLogEntry = {
          id: `audit-${Date.now()}`,
          timestamp: new Date().toISOString(),
          action: "comment",
          entityType: "PurchaseOrder",
          entityId: poId,
          entityName: po.poNumber,
          performedBy: prev.currentUser,
          details: `Added comment: ${comment.text}`,
          metadata: {},
        };

        return {
          ...prev,
          purchaseOrders: updatedPOs,
          auditLog: [auditEntry, ...prev.auditLog],
        };
      });
    },
    [setState]
  );

  const setPOFilters = useCallback(
    (filters: Partial<AppState["poFilters"]>) => {
      setState((prev) => ({
        ...prev,
        poFilters: { ...prev.poFilters, ...filters },
      }));
    },
    [setState]
  );

  const updateTaskStatus = useCallback(
    (taskId: string, status: TaskStatus) => {
      setState((prev) => {
        const task = prev.tasks.find((t) => t.id === taskId);
        if (!task) return prev;

        const updatedTasks = prev.tasks.map((t) =>
          t.id === taskId
            ? {
                ...t,
                status,
                completedDate: status === "Completed" ? new Date().toISOString() : t.completedDate,
              }
            : t
        );

        const auditEntry: AuditLogEntry = {
          id: `audit-${Date.now()}`,
          timestamp: new Date().toISOString(),
          action: "status_change",
          entityType: "Task",
          entityId: taskId,
          entityName: task.title,
          performedBy: prev.currentUser,
          details: `Changed task status to ${status}`,
          metadata: {
            previousStatus: task.status,
            newStatus: status,
          },
        };

        return {
          ...prev,
          tasks: updatedTasks,
          auditLog: [auditEntry, ...prev.auditLog],
        };
      });
    },
    [setState]
  );

  const setTaskFilters = useCallback(
    (filters: Partial<AppState["taskFilters"]>) => {
      setState((prev) => ({
        ...prev,
        taskFilters: { ...prev.taskFilters, ...filters },
      }));
    },
    [setState]
  );

  const addAuditEntry = useCallback(
    (entry: Omit<AuditLogEntry, "id" | "timestamp">) => {
      const auditEntry: AuditLogEntry = {
        ...entry,
        id: `audit-${Date.now()}`,
        timestamp: new Date().toISOString(),
      };

      setState((prev) => ({
        ...prev,
        auditLog: [auditEntry, ...prev.auditLog],
      }));
    },
    [setState]
  );

  const getFilteredPOs = useCallback(() => {
    let filtered = state.purchaseOrders;

    if (state.poFilters.status !== "All") {
      filtered = filtered.filter((po) => po.status === state.poFilters.status);
    }

    if (state.poFilters.vendor) {
      filtered = filtered.filter((po) =>
        po.vendor.toLowerCase().includes(state.poFilters.vendor.toLowerCase())
      );
    }

    return filtered;
  }, [state.purchaseOrders, state.poFilters]);

  const getFilteredTasks = useCallback(() => {
    let filtered = state.tasks;

    if (state.taskFilters.status !== "All") {
      filtered = filtered.filter((task) => task.status === state.taskFilters.status);
    }

    if (state.taskFilters.priority !== "All") {
      filtered = filtered.filter((task) => task.priority === state.taskFilters.priority);
    }

    return filtered;
  }, [state.tasks, state.taskFilters]);

  const searchResults = useCallback(() => {
    const query = state.searchQuery.toLowerCase().trim();
    
    if (!query) {
      return { pos: [], tasks: [] };
    }

    const pos = state.purchaseOrders.filter(
      (po) =>
        po.poNumber.toLowerCase().includes(query) ||
        po.vendor.toLowerCase().includes(query) ||
        po.description.toLowerCase().includes(query) ||
        po.department.toLowerCase().includes(query) ||
        po.requestedBy.toLowerCase().includes(query)
    );

    const tasks = state.tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query) ||
        task.requestedBy.toLowerCase().includes(query) ||
        task.type.toLowerCase().includes(query)
    );

    return { pos, tasks };
  }, [state.searchQuery, state.purchaseOrders, state.tasks]);

  const value = useMemo(
    () => ({
      state,
      setCurrentSection,
      setSearchQuery,
      selectPO,
      updatePOStatus,
      addPOComment,
      setPOFilters,
      updateTaskStatus,
      setTaskFilters,
      addAuditEntry,
      getFilteredPOs,
      getFilteredTasks,
      searchResults,
    }),
    [
      state,
      setCurrentSection,
      setSearchQuery,
      selectPO,
      updatePOStatus,
      addPOComment,
      setPOFilters,
      updateTaskStatus,
      setTaskFilters,
      addAuditEntry,
      getFilteredPOs,
      getFilteredTasks,
      searchResults,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}

