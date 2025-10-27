import ContactDetailsPanel from "./details-panel/ContactDetailsPanel";
import RightPanel from "./RightPanel";
import ActivityPanel from "../common/panels/ActivityPanel";
import { useAppContext } from "@/context/AppProvider";
import ContactHeader from "./ContactHeader";

export default function HomeContact() {
  const { activeTab, getContact } = useAppContext();

  // Get the contact data from context
  const contactData = activeTab?.dataId
    ? getContact(activeTab.dataId)
    : undefined;

  if (!contactData) {
    return <div>Contact not found</div>;
  }

  return (
    <div className="bg-gray-50 flex flex-col p-4 gap-3">
      <div className="flex flex-col gap-3">
        <ContactHeader name={contactData.name} />
      </div>

      {/* Main Content */}
      <div className="flex items-start gap-3">
        {/* Left Column - Sections */}
        <div className="w-[32.5%]">
          <ContactDetailsPanel />
        </div>

        {/* Right Column - Activity & RightPanel */}
        <div className="w-[67.5%] space-y-4 grid grid-cols-2 gap-3">
          <ActivityPanel />
          <RightPanel />
        </div>
      </div>
    </div>
  );
}
