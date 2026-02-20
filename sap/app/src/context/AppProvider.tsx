/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useMemo,
  useCallback,
  type ReactNode,
} from "react";
import { useDojoState } from "@chakra-dev/dojo-hooks";
import type {
  Tab,
  PurchaseOrder,
  Task,
  Vendor,
  Material,
  AuditEntry,
  KPIData,
  POStatus,
  TaskStatus,
  Comment,
  AuditAction,
} from "@/lib/types";
import {
  purchaseOrders as initialPOs,
  tasks as initialTasks,
  vendors as initialVendors,
  materials as initialMaterials,
  auditLog as initialAuditLog,
  kpiData as initialKPIData,
  currentUser,
} from "@/lib/fixtures";
import { generateId } from "@/lib/utils";

interface AppState {
  tabs: Tab[];
  activeTabId: string;
  purchaseOrders: PurchaseOrder[];
  tasks: Task[];
  vendors: Vendor[];
  materials: Material[];
  auditLog: AuditEntry[];
  kpiData: KPIData;
  searchQuery: string;
  isSearchOpen: boolean;
  // Dialog states
  isNewPODialogOpen: boolean;
  isApprovePODialogOpen: boolean;
  approvingPOId: string | null;
  // Filters
  poStatusFilter: string;
  taskStatusFilter: string;
  taskPriorityFilter: string;
}

interface AppContextType {
  state: AppState;
  activeTab: Tab | undefined;
  // Tab management
  addTab: (tab: Tab) => void;
  removeTab: (tabId: string) => void;
  setActiveTab: (tabId: string) => void;
  // Purchase Order management
  getPO: (id: string) => PurchaseOrder | undefined;
  addPO: (po: PurchaseOrder) => void;
  updatePO: (id: string, updates: Partial<PurchaseOrder>) => void;
  approvePO: (id: string, comment: string) => void;
  rejectPO: (id: string, comment: string) => void;
  addPOComment: (poId: string, content: string) => void;
  // Task management
  getTask: (id: string) => Task | undefined;
  updateTask: (id: string, updates: Partial<Task>) => void;
  updateTaskStatus: (id: string, status: TaskStatus) => void;
  updateTaskProgress: (id: string, progress: number) => void;
  // Vendor & Material getters
  getVendor: (id: string) => Vendor | undefined;
  getMaterial: (id: string) => Material | undefined;
  // Search
  setSearchQuery: (query: string) => void;
  setSearchOpen: (open: boolean) => void;
  // Filters
  setPOStatusFilter: (status: string) => void;
  setTaskStatusFilter: (status: string) => void;
  setTaskPriorityFilter: (priority: string) => void;
  // Dialogs
  openNewPODialog: () => void;
  closeNewPODialog: () => void;
  openApprovePODialog: (poId: string) => void;
  closeApprovePODialog: () => void;
  // Audit
  logAudit: (entry: Omit<AuditEntry, "id" | "timestamp" | "userId" | "userName">) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const initialState: AppState = {
  tabs: [{ id: "dashboard", type: "dashboard" }],
  activeTabId: "dashboard",
  purchaseOrders: initialPOs,
  tasks: initialTasks,
  vendors: initialVendors,
  materials: initialMaterials,
  auditLog: initialAuditLog,
  kpiData: initialKPIData,
  searchQuery: "",
  isSearchOpen: false,
  isNewPODialogOpen: false,
  isApprovePODialogOpen: false,
  approvingPOId: null,
  poStatusFilter: "all",
  taskStatusFilter: "all",
  taskPriorityFilter: "all",
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useDojoState(initialState);

  // Audit logging helper
  const logAudit = useCallback(
    (entry: Omit<AuditEntry, "id" | "timestamp" | "userId" | "userName">) => {
      const auditEntry: AuditEntry = {
        ...entry,
        id: `audit-${generateId()}`,
        timestamp: Date.now(),
        userId: currentUser.id,
        userName: currentUser.name,
      };
      setState((prev) => ({
        ...prev,
        auditLog: [auditEntry, ...prev.auditLog],
      }));
    },
    [setState]
  );

  // Tab management
  const addTab = useCallback(
    (tab: Tab) => {
      setState((prev) => {
        const existingTab = prev.tabs.find((t) => t.id === tab.id);
        if (existingTab) {
          return { ...prev, activeTabId: tab.id };
        }
        return {
          ...prev,
          tabs: [...prev.tabs, tab],
          activeTabId: tab.id,
        };
      });
    },
    [setState]
  );

  const removeTab = useCallback(
    (tabId: string) => {
      setState((prev) => {
        if (tabId === "dashboard") return prev;
        const tabIndex = prev.tabs.findIndex((t) => t.id === tabId);
        if (tabIndex === -1) return prev;

        const newTabs = prev.tabs.filter((t) => t.id !== tabId);
        let newActiveTabId = prev.activeTabId;
        
        if (prev.activeTabId === tabId) {
          if (tabIndex > 0) {
            newActiveTabId = newTabs[tabIndex - 1].id;
          } else if (newTabs.length > 0) {
            newActiveTabId = newTabs[0].id;
          } else {
            newActiveTabId = "dashboard";
          }
        }

        return { ...prev, tabs: newTabs, activeTabId: newActiveTabId };
      });
    },
    [setState]
  );

  const setActiveTab = useCallback(
    (tabId: string) => {
      setState((prev) => ({ ...prev, activeTabId: tabId }));
    },
    [setState]
  );

  // Purchase Order management
  const getPO = useCallback(
    (id: string) => state.purchaseOrders.find((po) => po.id === id),
    [state.purchaseOrders]
  );

  const addPO = useCallback(
    (po: PurchaseOrder) => {
      setState((prev) => ({
        ...prev,
        purchaseOrders: [...prev.purchaseOrders, po],
      }));
      logAudit({
        action: "CREATE" as AuditAction,
        entityType: "PurchaseOrder",
        entityId: po.id,
        entityName: po.poNumber,
        details: `Created purchase order for ${po.vendorName}`,
      });
    },
    [setState, logAudit]
  );

  const updatePO = useCallback(
    (id: string, updates: Partial<PurchaseOrder>) => {
      setState((prev) => ({
        ...prev,
        purchaseOrders: prev.purchaseOrders.map((po) =>
          po.id === id ? { ...po, ...updates, updatedAt: Date.now() } : po
        ),
      }));
    },
    [setState]
  );

  const approvePO = useCallback(
    (id: string, comment: string) => {
      const po = state.purchaseOrders.find((p) => p.id === id);
      if (!po) return;

      const newComment: Comment = {
        id: `cmt-${generateId()}`,
        userId: currentUser.id,
        userName: currentUser.name,
        content: comment,
        timestamp: Date.now(),
      };

      setState((prev) => ({
        ...prev,
        purchaseOrders: prev.purchaseOrders.map((p) =>
          p.id === id
            ? {
                ...p,
                status: "Approved" as POStatus,
                approverComments: [...p.approverComments, newComment],
                updatedAt: Date.now(),
              }
            : p
        ),
        tasks: prev.tasks.map((t) =>
          t.relatedEntityId === id && t.type === "Approval"
            ? { ...t, status: "Completed" as TaskStatus, progress: 100 }
            : t
        ),
      }));

      logAudit({
        action: "APPROVE",
        entityType: "PurchaseOrder",
        entityId: id,
        entityName: po.poNumber,
        previousValue: po.status,
        newValue: "Approved",
        details: `Approved with comment: ${comment}`,
      });
    },
    [state.purchaseOrders, setState, logAudit]
  );

  const rejectPO = useCallback(
    (id: string, comment: string) => {
      const po = state.purchaseOrders.find((p) => p.id === id);
      if (!po) return;

      const newComment: Comment = {
        id: `cmt-${generateId()}`,
        userId: currentUser.id,
        userName: currentUser.name,
        content: comment,
        timestamp: Date.now(),
      };

      setState((prev) => ({
        ...prev,
        purchaseOrders: prev.purchaseOrders.map((p) =>
          p.id === id
            ? {
                ...p,
                status: "Rejected" as POStatus,
                approverComments: [...p.approverComments, newComment],
                updatedAt: Date.now(),
              }
            : p
        ),
        tasks: prev.tasks.map((t) =>
          t.relatedEntityId === id && t.type === "Approval"
            ? { ...t, status: "Completed" as TaskStatus, progress: 100 }
            : t
        ),
      }));

      logAudit({
        action: "REJECT",
        entityType: "PurchaseOrder",
        entityId: id,
        entityName: po.poNumber,
        previousValue: po.status,
        newValue: "Rejected",
        details: `Rejected with comment: ${comment}`,
      });
    },
    [state.purchaseOrders, setState, logAudit]
  );

  const addPOComment = useCallback(
    (poId: string, content: string) => {
      const po = state.purchaseOrders.find((p) => p.id === poId);
      if (!po) return;

      const newComment: Comment = {
        id: `cmt-${generateId()}`,
        userId: currentUser.id,
        userName: currentUser.name,
        content,
        timestamp: Date.now(),
      };

      setState((prev) => ({
        ...prev,
        purchaseOrders: prev.purchaseOrders.map((p) =>
          p.id === poId
            ? { ...p, approverComments: [...p.approverComments, newComment] }
            : p
        ),
      }));

      logAudit({
        action: "COMMENT",
        entityType: "PurchaseOrder",
        entityId: poId,
        entityName: po.poNumber,
        details: `Added comment: ${content}`,
      });
    },
    [state.purchaseOrders, setState, logAudit]
  );

  // Task management
  const getTask = useCallback(
    (id: string) => state.tasks.find((task) => task.id === id),
    [state.tasks]
  );

  const updateTask = useCallback(
    (id: string, updates: Partial<Task>) => {
      setState((prev) => ({
        ...prev,
        tasks: prev.tasks.map((task) =>
          task.id === id ? { ...task, ...updates } : task
        ),
      }));
    },
    [setState]
  );

  const updateTaskStatus = useCallback(
    (id: string, status: TaskStatus) => {
      const task = state.tasks.find((t) => t.id === id);
      if (!task) return;

      setState((prev) => ({
        ...prev,
        tasks: prev.tasks.map((t) =>
          t.id === id
            ? { ...t, status, progress: status === "Completed" ? 100 : t.progress }
            : t
        ),
      }));

      logAudit({
        action: "STATUS_CHANGE",
        entityType: "Task",
        entityId: id,
        entityName: task.title,
        previousValue: task.status,
        newValue: status,
        details: `Changed task status`,
      });
    },
    [state.tasks, setState, logAudit]
  );

  const updateTaskProgress = useCallback(
    (id: string, progress: number) => {
      const task = state.tasks.find((t) => t.id === id);
      if (!task) return;

      setState((prev) => ({
        ...prev,
        tasks: prev.tasks.map((t) =>
          t.id === id ? { ...t, progress } : t
        ),
      }));

      logAudit({
        action: "UPDATE",
        entityType: "Task",
        entityId: id,
        entityName: task.title,
        previousValue: `${task.progress}%`,
        newValue: `${progress}%`,
        details: `Updated progress`,
      });
    },
    [state.tasks, setState, logAudit]
  );

  // Vendor & Material getters
  const getVendor = useCallback(
    (id: string) => state.vendors.find((v) => v.id === id),
    [state.vendors]
  );

  const getMaterial = useCallback(
    (id: string) => state.materials.find((m) => m.id === id),
    [state.materials]
  );

  // Search
  const setSearchQuery = useCallback(
    (query: string) => {
      setState((prev) => ({ ...prev, searchQuery: query }));
    },
    [setState]
  );

  const setSearchOpen = useCallback(
    (open: boolean) => {
      setState((prev) => ({ ...prev, isSearchOpen: open }));
    },
    [setState]
  );

  // Filters
  const setPOStatusFilter = useCallback(
    (status: string) => {
      setState((prev) => ({ ...prev, poStatusFilter: status }));
    },
    [setState]
  );

  const setTaskStatusFilter = useCallback(
    (status: string) => {
      setState((prev) => ({ ...prev, taskStatusFilter: status }));
    },
    [setState]
  );

  const setTaskPriorityFilter = useCallback(
    (priority: string) => {
      setState((prev) => ({ ...prev, taskPriorityFilter: priority }));
    },
    [setState]
  );

  // Dialogs
  const openNewPODialog = useCallback(() => {
    setState((prev) => ({ ...prev, isNewPODialogOpen: true }));
  }, [setState]);

  const closeNewPODialog = useCallback(() => {
    setState((prev) => ({ ...prev, isNewPODialogOpen: false }));
  }, [setState]);

  const openApprovePODialog = useCallback(
    (poId: string) => {
      setState((prev) => ({
        ...prev,
        isApprovePODialogOpen: true,
        approvingPOId: poId,
      }));
    },
    [setState]
  );

  const closeApprovePODialog = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isApprovePODialogOpen: false,
      approvingPOId: null,
    }));
  }, [setState]);

  const activeTab = useMemo(
    () => state.tabs.find((tab) => tab.id === state.activeTabId),
    [state.tabs, state.activeTabId]
  );

  const value = useMemo(
    () => ({
      state,
      activeTab,
      addTab,
      removeTab,
      setActiveTab,
      getPO,
      addPO,
      updatePO,
      approvePO,
      rejectPO,
      addPOComment,
      getTask,
      updateTask,
      updateTaskStatus,
      updateTaskProgress,
      getVendor,
      getMaterial,
      setSearchQuery,
      setSearchOpen,
      setPOStatusFilter,
      setTaskStatusFilter,
      setTaskPriorityFilter,
      openNewPODialog,
      closeNewPODialog,
      openApprovePODialog,
      closeApprovePODialog,
      logAudit,
    }),
    [
      state,
      activeTab,
      addTab,
      removeTab,
      setActiveTab,
      getPO,
      addPO,
      updatePO,
      approvePO,
      rejectPO,
      addPOComment,
      getTask,
      updateTask,
      updateTaskStatus,
      updateTaskProgress,
      getVendor,
      getMaterial,
      setSearchQuery,
      setSearchOpen,
      setPOStatusFilter,
      setTaskStatusFilter,
      setTaskPriorityFilter,
      openNewPODialog,
      closeNewPODialog,
      openApprovePODialog,
      closeApprovePODialog,
      logAudit,
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
