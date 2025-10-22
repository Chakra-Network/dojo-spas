import Button from "@/components/ui/button";
import { moreProfiles } from "@/lib/const";
import { IoPaperPlane, IoShieldCheckmarkOutline } from "react-icons/io5";
import { SidebarCardLayout, SidebarCardItem } from "./SidebarCardLayout";

export default function MoreProfiles() {
  return (
    <SidebarCardLayout
      header={{
        title: "More profiles for you",
      }}
      footer={{
        text: "Show all",
      }}
    >
      {moreProfiles.map((profile, index) => (
        <SidebarCardItem
          key={profile.id}
          className="flex gap-3"
          withBottomBorder={index !== moreProfiles.length - 1}
        >
          <img
            src={profile.avatar}
            alt={profile.name}
            className="w-12 h-12 rounded-full"
          />
          <div className="flex flex-col flex-1 min-w-0">
            <div className="flex items-center gap-1">
              <h4 className="text-[14px] font-semibold text-gray-900 hover:text-[#0a66c2] hover:underline cursor-pointer">
                {profile.name}
              </h4>
              {profile.isVerified && (
                <IoShieldCheckmarkOutline className="w-4 h-4 text-gray-700 flex-shrink-0" />
              )}
              <span className="text-[12px] text-gray-600 flex-shrink-0">
                · {profile.timestamp}
              </span>
            </div>

            <p className="text-[12px] text-gray-600 mt-0.5">{profile.title}</p>

            <div className="py-2">
              <Button
                variant="outline"
                className="flex items-center gap-1 w-fit"
              >
                <IoPaperPlane size={14} />
                Message
              </Button>
            </div>
          </div>
        </SidebarCardItem>
      ))}
    </SidebarCardLayout>
  );
}
