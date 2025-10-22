import {
  IoHomeSharp,
  IoPeopleSharp,
  IoBriefcaseSharp,
  IoChatbubbleEllipsesSharp,
  IoNotifications,
  IoAppsSharp,
  IoCaretDownSharp,
} from "react-icons/io5";
import { BsFillPlayBtnFill } from "react-icons/bs";
import Search from "./Search";
import { useCallback, useState } from "react";
import { useApp } from "@/contexts/AppContext";
import LinkedinIcon from "@/components/icons/LinkedinIcon";
import { cn } from "@/lib/utils";

export default function TopNavigation() {
  const {
    state: { currentUser, currentView, searchQuery },
    navigateToFeed,
    navigateToProfile,
  } = useApp();
  const [searchValue, setSearchValue] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const isSearchQuery = searchQuery && searchQuery.length > 0;
  const hideLabel = isSearchQuery || isSearchOpen;

  const navItems = [
    { id: "home", label: "Home", icon: IoHomeSharp, active: true },
    { id: "network", label: "My Network", icon: IoPeopleSharp },
    { id: "jobs", label: "Jobs", icon: IoBriefcaseSharp },
    { id: "messaging", label: "Messaging", icon: IoChatbubbleEllipsesSharp },
    {
      id: "notifications",
      label: "Notifications",
      icon: IoNotifications,
      badge: 20,
    },
  ];

  const handleNavigateToFeed = useCallback(() => {
    navigateToFeed();
    setSearchValue("");
  }, [navigateToFeed, setSearchValue]);

  return (
    <>
      {/* Search backdrop overlay when opened */}
      {isSearchOpen && (
        <div
          className="bg-black/50 fixed top-0 left-0 w-full h-full z-20"
          onClick={() => setIsSearchOpen(false)}
        />
      )}
      <nav
        className={`bg-white border-b border-gray-200 fixed top-0 w-full z-50 px-6 ${
          currentView !== "search" &&
          !currentView.startsWith("profile-") &&
          "shadow-xs"
        }`}
      >
        <div className="max-w-[1128px] mx-auto">
          <div className="flex items-center h-[52px]">
            {/* LinkedIn Logo */}
            <button
              onClick={handleNavigateToFeed}
              className="flex items-center cursor-pointer mx-1"
            >
              <LinkedinIcon className="w-[41px] h-[41px] fill-[#0A66C2]" />
            </button>

            <Search
              isSearchOpen={isSearchOpen}
              setIsSearchOpen={setIsSearchOpen}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
            />

            {/* Navigation Items */}
            <nav className="flex items-center flex-1 justify-end">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={
                      item.id === "home" ? handleNavigateToFeed : undefined
                    }
                    className={cn(
                      "relative flex flex-col items-center justify-center px-3 h-[52px] transition-colors  cursor-pointer",
                      item.active && currentView !== "search"
                        ? "text-gray-900 border-b-2 border-gray-900"
                        : "text-gray-600 hover:text-gray-900",
                      hideLabel ? "w-[65px] mb-[-2px]" : "w-[80px] mb-[-1px]"
                    )}
                  >
                    <div className="relative">
                      <Icon size={24} />
                      {item.badge && (
                        <span className="absolute -top-1 -right-1 bg-[#CC1016] text-white text-[10px] font-semibold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1 leading-none ">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    {!hideLabel && (
                      <span className="text-[12px] mt-1 leading-none whitespace-nowrap">
                        {item.label}
                      </span>
                    )}
                  </button>
                );
              })}

              {/* Me Dropdown */}
              <button
                onClick={() => navigateToProfile(currentUser.id)}
                className={`relative flex flex-col items-center justify-center px-3 h-[52px] text-gray-600 hover:text-gray-900 transition-colors cursor-pointer ${
                  hideLabel ? "w-[65px]" : "w-[80px]"
                }`}
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-6 h-6 rounded-full"
                />
                {!hideLabel && (
                  <div className="flex items-center gap-0.5 mt-1">
                    <span className="text-[12px] leading-none">Me</span>
                    <IoCaretDownSharp size={12} />
                  </div>
                )}
              </button>

              {/* For Business Dropdown */}
              <div className="pl-3 border-l border-gray-200">
                <a
                  href="#"
                  className={`relative flex flex-col items-center justify-center h-[52px] text-gray-600 hover:text-gray-900 transition-colors cursor-pointer ${
                    hideLabel && "w-[65px]"
                  }`}
                >
                  <IoAppsSharp size={24} />
                  {!hideLabel && (
                    <div className="flex items-center gap-0.5 mt-1">
                      <span className="text-[12px] leading-none whitespace-nowrap">
                        For Business
                      </span>
                      <IoCaretDownSharp size={12} />
                    </div>
                  )}
                </a>
              </div>

              {/* Learning */}
              <a
                href="#"
                className={`relative flex flex-col items-center justify-center px-3 h-[52px] text-gray-600 hover:text-gray-900 transition-colors cursor-pointer ${
                  hideLabel ? "w-[65px]" : "w-[80px]"
                }`}
              >
                <div className="relative w-6 h-6 flex items-center justify-center">
                  <div className="w-6 h-6 border-2 border-current rounded-sm flex items-center justify-center">
                    <BsFillPlayBtnFill size={12} />
                  </div>
                </div>
                {!hideLabel && (
                  <span className="text-[12px] mt-1 leading-none">
                    Learning
                  </span>
                )}
              </a>
            </nav>
          </div>
        </div>
      </nav>
    </>
  );
}
