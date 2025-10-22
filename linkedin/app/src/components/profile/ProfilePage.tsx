import ProfileHeader from "./Header";
import ProfileAbout from "./About";
import ProfileHighlights from "./Highlights";
import ProfileSkills from "./Skills";
import ProfileExperience from "./Experience";
import ProfileEducation from "./Education";
import RightSidebar from "./RightSidebar";
import UserPreviewHeader from "./details/UserPreviewHeader";
import { useApp } from "@/contexts/AppContext";
import { useScrollDetection } from "@/lib/hooks/useScrollDetection";
import { useRef, useEffect, useState } from "react";

export default function ProfilePage() {
  const {
    viewedUser,
    state: { currentUser },
  } = useApp();
  const isOwnProfile = viewedUser.id === currentUser.id;
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  // Calculate the height of the profile header to determine scroll threshold
  useEffect(() => {
    const calculateHeaderHeight = () => {
      if (headerRef.current) {
        const rect = headerRef.current.getBoundingClientRect();
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        setHeaderHeight(rect.height + scrollTop);
      }
    };

    // Calculate initial height
    calculateHeaderHeight();

    // Recalculate on window resize
    window.addEventListener("resize", calculateHeaderHeight);

    return () => {
      window.removeEventListener("resize", calculateHeaderHeight);
    };
  }, []);

  // Use scroll detection with the calculated header height as threshold
  const isScrolledBeyondHeader = useScrollDetection(headerHeight);

  return (
    <>
      {/* Sticky User Preview Header */}
      <UserPreviewHeader user={viewedUser} isVisible={isScrolledBeyondHeader} />

      <div className="px-4">
        <div className="flex gap-6 items-start max-w-[1128px] mx-auto pb-6 mt-[-25px]">
          {/* Main Profile Content */}
          <div className="flex-1 max-w-[850px] flex flex-col gap-2">
            <div ref={headerRef}>
              <ProfileHeader user={viewedUser} isOwnProfile={isOwnProfile} />
            </div>
            <ProfileHighlights highlights={viewedUser.highlights} />
            <ProfileAbout about={viewedUser.about} skills={viewedUser.skills} />
            <ProfileExperience experience={viewedUser.experience} />
            <ProfileEducation education={viewedUser.education} />
            <ProfileSkills skills={viewedUser.skills} />
          </div>

          {/* Right Sidebar - Profile Suggestions */}
          <RightSidebar isOwnProfile={isOwnProfile} />
        </div>
      </div>
    </>
  );
}
