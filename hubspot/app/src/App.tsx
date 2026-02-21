import { useEffect } from "react";
import Sidebar from "./components/common/Sidebar";
import TopNav from "./components/common/TopNav";
import Dashboard from "./components/dashboard/Dashboard";
import Campaigns from "./components/campaigns/Campaigns";
import EmailEditor from "./components/email-editor/EmailEditor";
import Contacts from "./components/contacts/Contacts";
import AutomationLog from "./components/automation-log/AutomationLog";
import { useAppContext } from "./context/AppProvider";

export default function App() {
  const { activeTab } = useAppContext();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab?.id]);

  return (
    <div className="min-h-screen bg-[#f5f8fa]">
      <Sidebar />
      <TopNav />
      <main className="ml-[220px] pt-[60px] p-6 min-h-screen">
        {activeTab?.type === "dashboard" && <Dashboard />}
        {activeTab?.type === "campaigns" && <Campaigns />}
        {activeTab?.type === "email-editor" && <EmailEditor />}
        {activeTab?.type === "contacts" && <Contacts />}
        {activeTab?.type === "automation-log" && <AutomationLog />}
      </main>
    </div>
  );
}
