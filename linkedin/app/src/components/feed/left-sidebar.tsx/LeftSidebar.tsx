import ProfileCard from "./ProfileCard";
import QuickLinks from "./QuickLinks";

export default function LeftSidebar() {
  return (
    <div className="w-[225px] flex flex-col gap-2">
      {/* Profile Card */}
      <ProfileCard />

      {/* Profile Stats Card */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="p-4 space-y-3">
          <a href="#" className="block group">
            <div className="flex items-baseline justify-between text-[12px] leading-[1.33]">
              <span className=" font-semibold text-gray-900 group-hover:underline">
                Profile viewers
              </span>
              <span className="font-bold text-[#0A66C2] group-hover:underline">
                300
              </span>
            </div>
          </a>

          <a href="#" className="block group">
            <span className="text-[12px] font-semibold text-gray-900 group-hover:underline">
              View all analytics
            </span>
          </a>
        </div>
      </div>

      {/* Premium Upsell Card */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <a href="#" className="block px-4 py-3 group">
          <h3 className="text-[12px] text-gray-600 leading-[1.33] mb-2">
            Expand your network with Premium
          </h3>
          <div className="flex items-center gap-2">
            <div className="p-[0.5px] w-4 h-4">
              <div className="w-full h-full rounded-xs flex items-center justify-center bg-gradient-to-br from-[#F6B13C] to-[#CA8A04] flex-shrink-0" />
            </div>
            <span className="text-[12px] font-semibold text-gray-900 group-hover:text-[#0A66C2]">
              Try for A$0
            </span>
          </div>
        </a>
      </div>

      {/* Quick Links */}
      <QuickLinks />
    </div>
  );
}
