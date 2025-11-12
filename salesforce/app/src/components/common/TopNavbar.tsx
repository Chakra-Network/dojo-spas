import { Bell, Pencil, Search, Settings } from "lucide-react";
import { BiQuestionMark } from "react-icons/bi";
import { useAppContext } from "@/context/AppProvider";
import { cn } from "@/lib/utils";
import { FaChevronDown, FaXmark } from "react-icons/fa6";
import {
  LOGO_COSMOS_IMAGE,
  PROFILE_AVATAR_IMAGE,
} from "@/components/resources/images";

export default function TopNavbar() {
  const {
    state,
    setActiveTab,
    removeTab,
    getLead,
    getContact,
    getOpportunity,
    getCase,
  } = useAppContext();
  return (
    <div className="fixed top-0 left-[76px] right-0 z-40">
      {/* Blue banner */}
      <div className="bg-[#0176D3] text-white px-4 py-2 flex items-center justify-end h-[48px] gap-4 text-[13px]">
        <div className="flex items-center gap-1">
          <span>Days left in Starter trial:</span>
          <div className="px-2 py-1 bg-orange-100 rounded text-black text-[12px] leading-normal">
            30
          </div>
        </div>
        <div className="flex items-center">
          <button className="bg-white h-8 flex items-center justify-center px-4 rounded-full font-semibold text-[#0176D3] hover:bg-gray-100">
            Buy Now
          </button>
        </div>
      </div>

      {/* Main navbar - Top layer */}
      <div className="bg-white px-4 py-2 flex items-center justify-between h-[50px]">
        {/* Salesforce logo */}
        <div className="flex items-center">
          <img
            src={LOGO_COSMOS_IMAGE}
            alt="Salesforce"
            className="h-10 w-[200px]"
          />
        </div>

        {/* Search bar */}
        <button className="flex items-center w-[400px] h-8 px-4 border border-gray-500 rounded-lg bg-white text-gray-600">
          <Search className="w-[14px] h-[14px] mr-2" />
          <span className="text-[13px]">Search...</span>
        </button>

        {/* Right icons */}
        <div className="flex items-center">
          <div className="mx-2 shrink-0">
            <button className="w-6 h-6 rounded-full hover:bg-gray-100 flex items-center justify-center mx-2">
              <BiQuestionMark className="w-5 h-5 shrink-0" />
            </button>
          </div>
          <button className="w-6 h-6 rounded-full hover:bg-gray-100 flex items-center justify-center mx-2">
            <Settings className="w-5 h-5 shrink-0" />
          </button>
          <button className="w-6 h-6 rounded-full hover:bg-gray-100 flex items-center justify-center mx-2">
            <Bell className="w-5 h-5 shrink-0" />
          </button>
          <div className="mx-2 shrink-0 pl-2">
            <img
              src={PROFILE_AVATAR_IMAGE}
              alt="Profile"
              className="w-8 h-8 rounded-full cursor-pointer hover:opacity-80"
            />
          </div>
        </div>
      </div>

      {/* Main navbar - Bottom layer with navigation */}
      <div className="bg-white border-b border-gray-200 px-4 py-1 flex items-center justify-between shadow-sm h-[41px]">
        <div className="flex items-center gap-6">
          <h1 className="text-xl text-gray-800">Home</h1>

          <div className="flex items-center gap-1">
            {/* Render all tabs */}
            {state.tabs.map((tab) => {
              const isActive = state.activeTabId === tab.id;
              const isHomeDashboard = tab.type === "home-dashboard";

              // Get data based on tab type
              let tabName = "Home";
              let tabSuffix = "";
              if (tab.type === "home-lead" && tab.dataId) {
                const leadData = getLead(tab.dataId);
                tabName = leadData?.name || "New Lead";
                tabSuffix = " | Lead";
              } else if (tab.type === "home-contact" && tab.dataId) {
                const contactData = getContact(tab.dataId);
                tabName = contactData?.name || "New Contact";
                tabSuffix = " | Contact";
              } else if (tab.type === "home-listLeads") {
                tabName = "Recently Viewed";
                tabSuffix = " | Leads";
              } else if (tab.type === "home-opportunity" && tab.dataId) {
                const opportunityData = getOpportunity(tab.dataId);
                tabName = opportunityData?.opportunityName || "New Opportunity";
                tabSuffix = " | Opportunity";
              } else if (tab.type === "home-case" && tab.dataId) {
                const caseData = getCase(tab.dataId);
                tabName = caseData?.id?.split("-")[1] || "New Case";
                tabSuffix = " | Case";
              }

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "h-9 flex items-center gap-2 px-3 text-[13px] leading-[19.5px] font-medium hover:bg-gray-50 cursor-pointer border-b-3 border-transparent -mb-[2px]",
                    isActive ? "text-blue-600 border-blue-600" : "text-gray-600"
                  )}
                >
                  <span
                    className={cn(tab.type !== "home-dashboard" && "italic")}
                  >
                    {isHomeDashboard ? "Home" : `* ${tabName}${tabSuffix}`}
                  </span>
                  {!isHomeDashboard && (
                    <>
                      <FaChevronDown className="w-[14px] h-[14px]" />
                      <FaXmark
                        className="w-[14px] h-[14px]"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeTab(tab.id);
                        }}
                      />
                    </>
                  )}
                </button>
              );
            })}
          </div>
        </div>
        <button className="text-[#0176D3] hover:text-gray-800">
          <Pencil className="w-[14px] h-[14px] shrink-0" />
        </button>
      </div>
    </div>
  );
}
