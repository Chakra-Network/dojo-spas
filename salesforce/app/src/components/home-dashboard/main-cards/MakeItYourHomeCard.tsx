import Card from "./Card";
import { ANNOUNCEMENTPANEL_IMAGE } from "@/components/resources/images";

interface MakeItYourHomeCardProps {
  slotIndex: number;
}

export default function MakeItYourHomeCard({ slotIndex }: MakeItYourHomeCardProps) {
  return (
    <Card 
      title="Make It Your Home" 
      hasDropdown={true} 
      hasViewTable={false}
      slotIndex={slotIndex}
      viewReportText=""
    >
      <div className="flex flex-col items-center justify-center px-6">
        <div className="p-4 h-[124px] flex items-center justify-center">
          <p className="text-[13px] leading-[19.5px] text-gray-600 text-center">
            To replace a card, click its action menu and select{" "}
            <strong>Change Home Card</strong>. Use the filters on cards to
            personalize your view even more.
          </p>
        </div>
        <div className="relative w-full flex justify-center pt-3">
          <img
            src={ANNOUNCEMENTPANEL_IMAGE}
            alt="Announcement Panel"
            className="h-[138px] w-auto"
          />
        </div>
      </div>
    </Card>
  );
}
