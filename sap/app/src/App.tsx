import { useEffect } from "react";
import Sidebar from "./components/common/Sidebar";
import TopNavbar from "./components/common/TopNavbar";
import Dashboard from "./components/dashboard/Dashboard";
import ProcurementList from "./components/procurement/ProcurementList";
import PurchaseOrderDetail from "./components/procurement/PurchaseOrderDetail";
import TasksInbox from "./components/tasks/TasksInbox";
import AuditTrail from "./components/common/AuditTrail";
import ApprovePODialog from "./components/dialogs/ApprovePODialog";
import GlobalSearch from "./components/common/GlobalSearch";
import { useAppContext } from "./context/AppProvider";

export default function App() {
  const { state, activeTab } = useAppContext();

  // Scroll to top when active tab changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [state.activeTabId]);

  return (
    <div className="min-h-screen bg-[#f7f7f7]">
      {/* Sidebar */}
      <Sidebar />

      {/* Top Navbar */}
      <TopNavbar />

      {/* Main Content Area */}
      <div className="ml-[72px] mt-[48px] min-h-[calc(100vh-48px)]">
        {activeTab?.type === "dashboard" && <Dashboard />}
        {activeTab?.type === "procurement" && <ProcurementList />}
        {activeTab?.type === "po-detail" && <PurchaseOrderDetail />}
        {activeTab?.type === "tasks" && <TasksInbox />}
        {activeTab?.type === "audit" && <AuditTrail />}
      </div>

      {/* Global Search Modal */}
      <GlobalSearch />

      {/* Approve PO Dialog */}
      <ApprovePODialog />
    </div>
  );
}
