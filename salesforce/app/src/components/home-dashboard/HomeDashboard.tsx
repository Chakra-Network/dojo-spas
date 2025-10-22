import WelcomeBanner from "./welcome-banner/WelcomeBanner";
import LeadsCard from "./main-cards/LeadsCard";
import OpportunityCard from "./main-cards/OpportunityCard";
import ContactsCard from "./main-cards/ContactsCard";
import RecentRecordsCard from "./main-cards/RecentRecordsCard";
import MakeItYourHomeCard from "./main-cards/MakeItYourHomeCard";
import CasesCard from "./main-cards/CasesCard";

export default function HomeDashboard() {
  return (
    <div className="pt-6 pb-3 pl-7 pr-10 space-y-3">
      <WelcomeBanner />

      {/* Main Cards Grid */}
      <div className="grid grid-cols-3 gap-4">
        <LeadsCard />
        <OpportunityCard />
        <ContactsCard />
        <RecentRecordsCard />
        <CasesCard />
        <MakeItYourHomeCard />
      </div>
    </div>
  );
}
