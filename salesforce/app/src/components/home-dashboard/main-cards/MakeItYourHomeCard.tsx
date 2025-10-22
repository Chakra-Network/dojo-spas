import Card from "./Card";
import { PATH_PREFIX } from "@/lib/consts";

export default function MakeItYourHomeCard() {
  return (
    <Card title="Make It Your Home" hasDropdown={true} viewReportText="">
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
            src={`${PATH_PREFIX}/svgs/AnnouncementPanel.svg`}
            alt="Customize your home illustration"
            className="h-[156px] w-auto"
          />
        </div>
      </div>
    </Card>
  );
}
