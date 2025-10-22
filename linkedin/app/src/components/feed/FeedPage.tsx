import LeftSidebar from "./left-sidebar.tsx/LeftSidebar";
import FeedCenter from "./FeedCenter";
import RightSidebar from "./RightSidebar";

export default function FeedPage() {
  return (
    <div className="px-4 py-6">
      <div className="flex gap-6 items-start max-w-[1128px] mx-auto">
        {/* Left Sidebar */}
        <LeftSidebar />

        {/* Center Feed */}
        <FeedCenter />

        {/* Right Sidebar */}
        <RightSidebar />
      </div>
    </div>
  );
}
