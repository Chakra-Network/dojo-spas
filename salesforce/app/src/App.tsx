import { useEffect } from "react";
import Sidebar from "./components/common/Sidebar";
import TopNavbar from "./components/common/TopNavbar";
import Footer from "./components/common/Footer";
import HomeDashboard from "./components/home-dashboard/HomeDashboard";
import HomeLead from "./components/home-lead/HomeLead";
import HomeContact from "./components/home-contact/HomeContact";
import HomeListLeads from "./components/home-listLeads/HomeListLeads";
import HomeOpportunity from "./components/home-opportunity/HomeOpportunity";
import HomeCase from "./components/home-case/HomeCase";
import NewLeadDialog from "./components/dialogs/NewLeadDialog";
import NewContactDialog from "./components/dialogs/NewContactDialog";
import NewOpportunityDialog from "./components/dialogs/NewOpportunityDialog";
import NewCaseDialog from "./components/dialogs/case-dialogs/NewCaseDialog";
import EditCaseDialog from "./components/dialogs/case-dialogs/EditCaseDialog";
import CloseOpportunityDialog from "./components/dialogs/CloseOpportunityDialog";
import ConvertLeadDialog from "./components/dialogs/convert-lead-dialog/ConvertLeadDialog";
import AfterConvertLeadDialog from "./components/dialogs/after-convert-dialog/AfterConvertLeadDialog";
import ChangeHomeCardDialog from "./components/dialogs/ChangeHomeCardDialog";
import { useAppContext } from "./context/AppProvider";
import type {
  Lead,
  Contact,
  Opportunity,
  Case,
  OpportunityStage,
} from "./lib/types";

export default function App() {
  const {
    state,
    addTab,
    addLead,
    addContact,
    addOpportunity,
    addCase,
    updateOpportunity,
    updateCase,
    getCase,
    closeNewLeadDialog,
    closeNewContactDialog,
    closeNewOpportunityDialog,
    closeNewCaseDialog,
    closeCloseOpportunityDialog,
    convertLead,
    closeConvertLeadDialog,
    openAfterConvertDialog,
    closeAfterConvertDialog,
    closeEditCaseDialog,
  } = useAppContext();

  // Find the active tab
  const activeTab = state.tabs.find((tab) => tab.id === state.activeTabId);

  // Scroll to top when active tab changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [state.activeTabId]);

  const handleSaveNewLead = (leadData: Lead) => {
    // Generate a unique ID for the lead
    const leadId = `lead-${Date.now()}`;
    const leadWithId = { ...leadData, id: leadId, updatedAt: Date.now() };

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

  const handleSaveNewContact = (contactData: Contact) => {
    // Generate a unique ID for the contact
    const contactId = `contact-${Date.now()}`;
    const contactWithId = {
      ...contactData,
      id: contactId,
      updatedAt: Date.now(),
    };

    // Add contact to contacts list
    addContact(contactWithId);

    // Generate a unique ID for the new tab
    const newTabId = `contact-${contactId}`;

    // Create new tab with contact dataId
    addTab({
      id: newTabId,
      type: "home-contact",
      dataId: contactId,
    });
  };

  const handleSaveNewOpportunity = (opportunityData: Opportunity) => {
    // Generate a unique ID for the opportunity
    const opportunityId = `opportunity-${Date.now()}`;
    const opportunityWithId = {
      ...opportunityData,
      id: opportunityId,
      updatedAt: Date.now(),
    };

    // Add opportunity to opportunities list
    addOpportunity(opportunityWithId);

    // Generate a unique ID for the new tab
    const newTabId = `opportunity-${opportunityId}`;

    // Create new tab with opportunity dataId
    addTab({
      id: newTabId,
      type: "home-opportunity",
      dataId: opportunityId,
    });
  };

  const handleSaveNewCase = (caseData: Case) => {
    // Generate a unique ID for the case
    const caseId = `case-${Date.now()}`;
    const caseWithId = { ...caseData, id: caseId, updatedAt: Date.now() };

    // Add case to cases list
    addCase(caseWithId);

    // Generate a unique ID for the new tab
    const newTabId = `case-${caseId}`;

    // Create new tab with case dataId
    addTab({
      id: newTabId,
      type: "home-case",
      dataId: caseId,
    });
  };

  const handleSaveEditCase = (caseId: string, updates: Partial<Case>) => {
    updateCase(caseId, updates);
    closeEditCaseDialog();
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

  const handleCloseOpportunity = (closedStage: OpportunityStage) => {
    if (state.closingOpportunityId) {
      updateOpportunity(state.closingOpportunityId, { stage: closedStage });
      closeCloseOpportunityDialog();
    }
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
        {activeTab?.type === "home-opportunity" && <HomeOpportunity />}
        {activeTab?.type === "home-case" && <HomeCase />}
      </div>

      {/* Footer */}
      <Footer />

      {/* New Lead Dialog */}
      <NewLeadDialog
        isOpen={state.isNewLeadDialogOpen}
        onClose={closeNewLeadDialog}
        onSave={handleSaveNewLead}
      />

      {/* New Contact Dialog */}
      <NewContactDialog
        isOpen={state.isNewContactDialogOpen}
        onClose={closeNewContactDialog}
        onSave={handleSaveNewContact}
      />

      {/* New Opportunity Dialog */}
      <NewOpportunityDialog
        isOpen={state.isNewOpportunityDialogOpen}
        onClose={closeNewOpportunityDialog}
        onSave={handleSaveNewOpportunity}
      />

      {/* Close Opportunity Dialog */}
      <CloseOpportunityDialog
        isOpen={state.isCloseOpportunityDialogOpen}
        onClose={closeCloseOpportunityDialog}
        onSave={handleCloseOpportunity}
      />

      {/* New Case Dialog */}
      <NewCaseDialog
        isOpen={state.isNewCaseDialogOpen}
        onClose={closeNewCaseDialog}
        onSave={handleSaveNewCase}
      />

      {/* Edit Case Dialog */}
      <EditCaseDialog
        isOpen={state.isEditCaseDialogOpen}
        onClose={closeEditCaseDialog}
        onSave={handleSaveEditCase}
        caseData={activeTab?.dataId ? getCase(activeTab.dataId) : undefined}
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

      {/* Change Home Card Dialog */}
      <ChangeHomeCardDialog />
    </div>
  );
}
