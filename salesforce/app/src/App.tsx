import Sidebar from "./components/common/Sidebar";
import TopNavbar from "./components/common/TopNavbar";
import Footer from "./components/common/Footer";
import HomeDashboard from "./components/home-dashboard/HomeDashboard";
import HomeLead from "./components/home-lead/HomeLead";
import HomeContact from "./components/home-contact/HomeContact";
import HomeListLeads from "./components/home-listLeads/HomeListLeads";
import NewLeadDialog from "./components/dialogs/new-lead-dialog/NewLeadDialog";
import ConvertLeadDialog from "./components/dialogs/convert-lead-dialog/ConvertLeadDialog";
import AfterConvertLeadDialog from "./components/dialogs/after-convert-dialog/AfterConvertLeadDialog";
import { useAppContext } from "./context/AppProvider";
import type { Lead } from "./lib/types";

export default function App() {
  const {
    state,
    addTab,
    addLead,
    closeNewLeadDialog,
    convertLead,
    closeConvertLeadDialog,
    openAfterConvertDialog,
    closeAfterConvertDialog,
  } = useAppContext();

  // Find the active tab
  const activeTab = state.tabs.find((tab) => tab.id === state.activeTabId);

  const handleSaveNewLead = (leadData: Lead) => {
    // Generate a unique ID for the lead
    const leadId = `lead-${Date.now()}`;
    const leadWithId = { ...leadData, id: leadId };

    // Add lead to leads list
    addLead(leadWithId);

    // Generate a unique ID for the new tab
    const newTabId = `lead-${leadId}`;

    // Create new tab with lead dataId
    addTab({
      id: newTabId,
      type: "home-lead",
      dataId: leadId,
    });
  };

  const handleConvertLead = () => {
    if (state.convertingLeadId) {
      convertLead(state.convertingLeadId);
      closeConvertLeadDialog();
      openAfterConvertDialog(state.convertingLeadId);
    }
  };

  const handleGoToLeads = () => {
    closeAfterConvertDialog();
    // Create or navigate to the leads list tab
    const leadsListTabId = "home-listLeads";
    addTab({
      id: leadsListTabId,
      type: "home-listLeads",
    });
  };

  return (
    <div className="bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Top Navbar */}
      <TopNavbar />

      {/* Main Content Area - Scrollable */}
      <div className="ml-[76px] mr-0 mt-[139px] mb-10">
        {activeTab?.type === "home-dashboard" && <HomeDashboard />}
        {activeTab?.type === "home-lead" && <HomeLead />}
        {activeTab?.type === "home-contact" && <HomeContact />}
        {activeTab?.type === "home-listLeads" && <HomeListLeads />}
      </div>

      {/* Footer */}
      <Footer />

      {/* New Lead Dialog */}
      <NewLeadDialog
        isOpen={state.isNewLeadDialogOpen}
        onClose={closeNewLeadDialog}
        onSave={handleSaveNewLead}
      />

      {/* Convert Lead Dialog */}
      <ConvertLeadDialog
        isOpen={state.isConvertLeadDialogOpen}
        leadId={state.convertingLeadId}
        onClose={closeConvertLeadDialog}
        onConvert={handleConvertLead}
      />

      {/* After Convert Lead Dialog */}
      <AfterConvertLeadDialog
        isOpen={state.isAfterConvertDialogOpen}
        leadId={state.afterConvertLeadId}
        onClose={closeAfterConvertDialog}
        onGoToLeads={handleGoToLeads}
      />
    </div>
  );
}
