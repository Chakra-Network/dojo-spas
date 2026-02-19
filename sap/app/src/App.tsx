import Sidebar from "./components/Sidebar.tsx";
import TopBar from "./components/TopBar.tsx";
import Dashboard from "./components/Dashboard.tsx";
import PurchaseOrderList from "./components/PurchaseOrderList.tsx";
import PurchaseOrderDetail from "./components/PurchaseOrderDetail.tsx";
import TaskInbox from "./components/TaskInbox.tsx";
import AuditTrail from "./components/AuditTrail.tsx";
import { useAppContext } from "./store/AppProvider.tsx";

export default function App() {
  const { state } = useAppContext();

  return (
    <div className="min-h-screen bg-sap-bg">
      <Sidebar />
      <TopBar />
      <main
        className={`pt-14 transition-all duration-200 ${
          state.sidebarCollapsed ? "ml-16" : "ml-56"
        }`}
      >
        <div className="mx-auto max-w-[1440px] p-6">
          {state.currentView === "dashboard" && <Dashboard />}
          {state.currentView === "procurement" && <PurchaseOrderList />}
          {state.currentView === "procurement-detail" && <PurchaseOrderDetail />}
          {state.currentView === "tasks" && <TaskInbox />}
          {state.currentView === "audit" && <AuditTrail />}
        </div>
      </main>
    </div>
  );
}
