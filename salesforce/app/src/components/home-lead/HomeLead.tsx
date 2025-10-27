import LeadDetailsPanel from "./details-panel/LeadDetailsPanel";
import SlackPanel from "./SlackPanel";
import ActivityPanel from "../common/ActivityPanel";
import { useAppContext } from "@/context/AppProvider";
import LeadHeader from "./LeadHeader";

export default function HomeLead() {
  const { activeTab, getLead } = useAppContext();

  // Get the lead data from context
  const leadData = activeTab?.dataId ? getLead(activeTab.dataId) : undefined;

  if (!leadData) {
    return <div>Lead not found</div>;
  }

  return (
    <div className="bg-gray-50 flex flex-col p-4 gap-3">
      <LeadHeader name={leadData.name} />

      {/* Main Content */}
      <div className="flex items-start gap-3">
        {/* Left Column - Sections */}
        <div className="w-[32.5%]">
          <LeadDetailsPanel />
        </div>

        {/* Right Column - Activity & Slack */}
        <div className="w-[67.5%] space-y-4 grid grid-cols-2 gap-3">
          <ActivityPanel />
          <SlackPanel />
        </div>
      </div>
    </div>
  );
}
