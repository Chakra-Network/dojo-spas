import StatusPathBar from "./header/StatusPathBar";
import DetailsPanel from "@/components/common/details-panel/DetailsPanel";
import SlackPanel from "./SlackPanel";
import ActivityPanel from "./ActivityPanel";
import { useAppContext } from "@/context/AppProvider";
import MainHeader from "./header/MainHeader";

export default function HomeLead() {
  const { activeTab, getLead } = useAppContext();

  // Get the lead data from context
  const leadData = activeTab?.dataId ? getLead(activeTab.dataId) : undefined;

  if (!leadData) {
    return <div>Lead not found</div>;
  }

  return (
    <div className="bg-gray-50 flex flex-col p-4 gap-3">
      <div className="flex flex-col gap-3">
        <MainHeader name={leadData.name} />
        <StatusPathBar />
      </div>

      {/* Main Content */}
      <div className="flex items-start gap-3">
        {/* Left Column - Sections */}
        <div className="w-[32.5%]">
          <DetailsPanel type="lead" />
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
