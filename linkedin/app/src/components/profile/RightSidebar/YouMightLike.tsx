import Button from "@/components/ui/button";
import { suggestedPages } from "@/lib/const";
import { IoAdd } from "react-icons/io5";
import { SidebarCardLayout, SidebarCardItem } from "./SidebarCardLayout";

export default function YouMightLike() {
  return (
    <SidebarCardLayout
      header={{
        title: "You might like",
        subtitle: "Pages for you",
      }}
      footer={{
        text: "Show all",
      }}
    >
      {suggestedPages.map((page, index) => (
        <SidebarCardItem
          key={page.id}
          className="flex gap-3"
          withBottomBorder={index !== suggestedPages.length - 1}
        >
          <div className="w-12 h-12 bg-gray-200 rounded flex-shrink-0 overflow-hidden">
            {page.logo && (
              <img
                src={page.logo}
                alt={page.name}
                className="w-full h-full object-cover"
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
            )}
          </div>
          <div className="flex-1 min-w-0 flex flex-col">
            <h4 className="text-[14px] font-semibold text-gray-900 hover:text-[#0a66c2] hover:underline cursor-pointer">
              {page.name}
            </h4>
            <p className="text-[12px] text-gray-600 mt-0.5">{page.industry}</p>
            <p className="text-[12px] text-gray-600 mt-0.5">{page.followers}</p>
            <div className="flex items-center gap-1.5 mt-1">
              <div className="flex -space-x-1">
                {[...Array(3)].map((_, i) => (
                  <img
                    key={i}
                    src={`https://i.pravatar.cc/32?img=${20 + i}`}
                    alt=""
                    className="w-4 h-4 rounded-full border border-white"
                  />
                ))}
              </div>
              <p className="text-[11px] text-gray-600">
                {page.connectionsFollowing} connections follow this page
              </p>
            </div>
            <div className="py-2">
              <Button
                variant="outline"
                className="flex items-center gap-1 w-fit"
              >
                <IoAdd size={14} />
                Follow
              </Button>
            </div>
          </div>
        </SidebarCardItem>
      ))}
    </SidebarCardLayout>
  );
}
