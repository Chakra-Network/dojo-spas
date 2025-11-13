import { AppProvider, useAppContext } from "@/context/AppProvider";
import Sidebar from "@/components/common/Sidebar";
import Header from "@/components/common/Header";
import Dashboard from "@/components/dashboard/Dashboard";
import Procurement from "@/components/procurement/Procurement";
import Tasks from "@/components/tasks/Tasks";
import AuditTrail from "@/components/audit/AuditTrail";

function AppContent() {
  const { state } = useAppContext();

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="ml-64">
        <Header />
        <main className="pt-16 p-6">
          <div className="max-w-[1600px] mx-auto">
            {state.currentSection === "dashboard" && <Dashboard />}
            {state.currentSection === "procurement" && <Procurement />}
            {state.currentSection === "tasks" && <Tasks />}
            {state.currentSection === "audit" && <AuditTrail />}
          </div>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

