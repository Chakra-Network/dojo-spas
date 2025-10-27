import SlackPanel from "./SlackPanel";
import ActivityPanel from "../common/ActivityPanel";
import { useAppContext } from "@/context/AppProvider";
import OpportunityHeader from "./OpportunityHeader";
import OpportunityDetailsPanel from "./details-panel/OpportunityDetailsPanel";

export default function HomeOpportunity() {
  const { activeTab, getOpportunity } = useAppContext();

  // Get the opportunity data from context
  const opportunityData = activeTab?.dataId
    ? getOpportunity(activeTab.dataId)
    : undefined;

  if (!opportunityData) {
    return <div>Opportunity not found</div>;
  }

  return (
    <div className="bg-gray-50 flex flex-col p-4 gap-3">
      <OpportunityHeader />

      {/* Main Content */}
      <div className="flex items-start gap-3">
        {/* Left Column - Sections */}
        <div className="w-[32.5%]">
          <OpportunityDetailsPanel />
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
