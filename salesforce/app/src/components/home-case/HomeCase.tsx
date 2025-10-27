import ContactDetailsPanel from "./details-panel/ContactDetailsPanel";
import CaseDetailsPanel from "./details-panel/CaseDetailsPanel";
import RightPanel from "./RightPanel";
import ActivityPanel from "../common/panels/ActivityPanel";
import { useAppContext } from "@/context/AppProvider";
import CaseHeader from "./case-header/CaseHeader";

export default function HomeCase() {
  const { activeTab, getCase } = useAppContext();

  // Get the case data from context
  const caseData = activeTab?.dataId ? getCase(activeTab.dataId) : undefined;

  if (!caseData) {
    return <div>Case not found</div>;
  }

  return (
    <div className="bg-gray-50 flex flex-col p-4 gap-3">
      <CaseHeader />

      {/* Main Content */}
      <div className="flex items-start gap-3">
        {/* Left Column - Sections */}
        <div className="w-[32.5%] space-y-3">
          <ContactDetailsPanel />
          <CaseDetailsPanel />
        </div>

        {/* Middle & Right Columns - Activity & Knowledge */}
        <div className="w-[67.5%] space-y-4 grid grid-cols-2 gap-3">
          <ActivityPanel filterDropdownOrder={["email", "list", "contact"]} />
          <RightPanel />
        </div>
      </div>
    </div>
  );
}
