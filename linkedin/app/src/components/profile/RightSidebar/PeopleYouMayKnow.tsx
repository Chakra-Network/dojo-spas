import Button from "@/components/ui/button";
import { suggestedConnections } from "@/lib/const";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { HiPlus } from "react-icons/hi2";
import { SidebarCardLayout, SidebarCardItem } from "./SidebarCardLayout";

export default function PeopleYouMayKnow() {
  return (
    <SidebarCardLayout
      header={{
        title: "People you may know",
        subtitle: "From your school",
      }}
      footer={{
        text: "Show all",
      }}
    >
      {suggestedConnections.map((connection, index) => (
        <SidebarCardItem
          key={connection.id}
          className="flex gap-3"
          withBottomBorder={index !== suggestedConnections.length - 1}
        >
          <img
            src={connection.avatar}
            alt={connection.name}
            className="w-12 h-12 rounded-full"
          />
          <div className="flex-1 min-w-0 flex flex-col">
            <div className="flex items-start gap-1">
              <h4 className="text-[14px] font-semibold text-gray-900 hover:text-[#0a66c2] hover:underline cursor-pointer">
                {connection.name}
              </h4>
              {connection.isVerified && (
                <IoShieldCheckmarkOutline className="w-4 h-4 text-gray-700 flex-shrink-0" />
              )}
            </div>
            <p className="text-[12px] text-gray-600 mt-0.5">
              {connection.title}
            </p>

            <div className="py-2">
              <Button
                variant="outline"
                className="flex items-center gap-1 w-fit"
              >
                <HiPlus size={14} />
                Connect
              </Button>
            </div>
          </div>
        </SidebarCardItem>
      ))}
    </SidebarCardLayout>
  );
}
