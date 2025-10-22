import Button from "@/components/ui/button";
import { premiumProfiles } from "@/lib/const";
import { HiPlus } from "react-icons/hi2";
import { SidebarCardLayout, SidebarCardItem } from "./SidebarCardLayout";

export default function PremiumProfiles() {
  return (
    <SidebarCardLayout
      header={{
        title: "Explore Premium profiles",
      }}
      footer={{
        text: "Show all",
      }}
    >
      {premiumProfiles.map((profile, index) => (
        <SidebarCardItem
          key={profile.id}
          className="flex gap-3"
          withBottomBorder={index !== premiumProfiles.length - 1}
        >
          <img
            src={profile.avatar}
            alt={profile.name}
            className="w-12 h-12 rounded-full"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1">
              <h4 className="text-[14px] font-semibold text-gray-900 hover:text-[#0a66c2] hover:underline flex items-center gap-1 cursor-pointer">
                {profile.name}
                <svg
                  className="w-4 h-4 text-[#915907] flex-shrink-0"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                >
                  <rect
                    x="0"
                    y="0"
                    width="16"
                    height="16"
                    rx="2"
                    fill="#915907"
                  />
                  <text
                    x="8"
                    y="12"
                    fontSize="10"
                    fill="#F8C77E"
                    textAnchor="middle"
                    fontWeight="bold"
                  >
                    in
                  </text>
                </svg>
              </h4>
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
                <HiPlus size={14} />
                Follow
              </Button>
            </div>
          </div>
        </SidebarCardItem>
      ))}
    </SidebarCardLayout>
  );
}
