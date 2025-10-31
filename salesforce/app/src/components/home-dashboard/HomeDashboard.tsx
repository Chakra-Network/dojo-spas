import WelcomeBanner from "./welcome-banner/WelcomeBanner";
import LeadsCard from "./main-cards/LeadsCard";
import OpportunityCard from "./main-cards/OpportunityCard";
import ContactsCard from "./main-cards/ContactsCard";
import RecentRecordsCard from "./main-cards/recent-records-card/RecentRecordsCard";
import MakeItYourHomeCard from "./main-cards/MakeItYourHomeCard";
import CasesCard from "./main-cards/CasesCard";
import { useAppContext } from "@/context/AppProvider";

export default function HomeDashboard() {
  const { state } = useAppContext();
  const { dashboardCardSlots } = state;

  return (
    <div className="pt-6 pb-3 pl-7 pr-10 space-y-3">
      <WelcomeBanner />

      {/* Main Cards Grid */}
      <div className="grid grid-cols-3 gap-4">
        {dashboardCardSlots.map((cardType, index) => (
          <RenderCard key={index} cardType={cardType} slotIndex={index} />
        ))}
      </div>
    </div>
  );
}

function RenderCard({
  cardType,
  slotIndex,
}: {
  cardType: string;
  slotIndex: number;
}) {
  switch (cardType) {
    case "leads":
      return <LeadsCard key={slotIndex} slotIndex={slotIndex} />;
    case "opportunities":
      return <OpportunityCard key={slotIndex} slotIndex={slotIndex} />;
    case "contacts":
      return <ContactsCard key={slotIndex} slotIndex={slotIndex} />;
    case "recent-records":
      return <RecentRecordsCard key={slotIndex} slotIndex={slotIndex} />;
    case "cases":
      return <CasesCard key={slotIndex} slotIndex={slotIndex} />;
    case "make-it-your-home":
      return <MakeItYourHomeCard key={slotIndex} slotIndex={slotIndex} />;
    // Disabled cards - render a placeholder or nothing
    default:
      return (
        <div
          key={slotIndex}
          className="bg-gray-100 rounded-lg p-4 text-center text-gray-500"
        >
          Card type not implemented
        </div>
      );
  }
}
