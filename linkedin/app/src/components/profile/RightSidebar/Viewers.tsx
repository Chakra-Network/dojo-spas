import Button from "@/components/ui/button";
import { profileViewers } from "@/lib/const";
import { Key } from "lucide-react";
import { IoEye, IoPaperPlane, IoShieldCheckmarkOutline } from "react-icons/io5";
import { SidebarCardLayout, SidebarCardItem } from "./SidebarCardLayout";

export default function Viewers() {
  return (
    <SidebarCardLayout
      header={{
        title: "Who your viewers also viewed",
        subtitle: (
          <div className="flex items-center gap-1">
            <IoEye className="w-4 h-4" />
            Private to you
          </div>
        ),
      }}
    >
      {profileViewers.map((viewer, index) => (
        <SidebarCardItem
          key={viewer.id}
          className="flex gap-3"
          withBottomBorder={index !== profileViewers.length - 1}
        >
          <img
            src={viewer.avatar}
            alt={viewer.name}
            className="w-12 h-12 rounded-full"
          />
          <div className="flex-1 flex flex-col min-w-0">
            <div className="flex items-center gap-1">
              <h4 className="text-[14px] font-semibold text-gray-900 hover:text-[#0a66c2] hover:underline whitespace-nowrap truncate cursor-pointer">
                {viewer.name}
              </h4>
              {viewer.isVerified && (
                <IoShieldCheckmarkOutline className="w-4 h-4 text-gray-700 flex-shrink-0" />
              )}
              <span className="text-[12px] text-gray-600 flex-shrink-0">
                · {viewer.timestamp}
              </span>
            </div>
            <p className="text-[12px] text-gray-600 mt-0.5">
              {viewer.title} @ {viewer.company}
            </p>
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

      <SidebarCardItem className="flex gap-3 px-6 py-3" withTopBorder>
        <Key className="w-12 h-12 text-[#FDB022]" />
        <div className="flex-1 min-w-0">
          <h4 className="text-[14px] font-semibold text-gray-900 mb-1">
            Unlock the full list
          </h4>
          <p className="text-[12px] text-gray-600 mb-3">
            See who else is often viewed alongside you
          </p>
          <button className="w-full py-1 px-4 bg-[#FDB022] rounded-full text-[16px] font-semibold text-gray-900 hover:bg-[#F59E0B] transition whitespace-pre-line cursor-pointer">
            {"Try Premium for \nA$0"}
          </button>
          <p className="text-[11px] text-gray-600 mt-2">
            1-month free trial with 24/7 support. We'll remind you 7 days before
            your trial ends.
          </p>
        </div>
      </SidebarCardItem>

      {profileViewers.map((viewer) => (
        <SidebarCardItem
          key={viewer.id}
          className="flex gap-3 relative"
          withTopBorder
        >
          <img
            src={viewer.avatar}
            alt={viewer.name}
            className="w-12 h-12 rounded-full"
          />
          <div className="flex-1 flex flex-col min-w-0">
            <div className="flex items-center gap-1">
              <h4 className="text-[14px] font-bold text-black hover:text-[#0a66c2] hover:underline cursor-pointer">
                {viewer.name}
              </h4>
              {viewer.isVerified && (
                <IoShieldCheckmarkOutline className="w-4 h-4 text-gray-700 flex-shrink-0" />
              )}
              <span className="text-[12px] text-gray-600 flex-shrink-0">
                · {viewer.timestamp}
              </span>
            </div>
            <p className="text-[12px] text-bla font-bold mt-0.5">
              {viewer.title} @ {viewer.company}
            </p>
          </div>

          <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-white/80 to-white backdrop-blur-sm" />
        </SidebarCardItem>
      ))}
    </SidebarCardLayout>
  );
}
