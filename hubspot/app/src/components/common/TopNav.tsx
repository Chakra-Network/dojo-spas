import { Search, Bell, HelpCircle } from "lucide-react";
import { useAppContext } from "@/context/AppProvider";

export default function TopNav() {
  const { state, setSearchQuery } = useAppContext();

  return (
    <header className="fixed top-0 left-[220px] right-0 h-[60px] bg-white border-b border-gray-200 flex items-center justify-between px-6 z-40">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative flex-1 max-w-md">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search..."
            value={state.searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#f5f8fa] border border-gray-200 rounded-md focus:outline-none focus:border-[#ff7a59] focus:ring-1 focus:ring-[#ff7a59]"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="p-2 text-gray-500 hover:text-gray-700 relative">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-[#ff7a59] rounded-full" />
        </button>
        <button className="p-2 text-gray-500 hover:text-gray-700">
          <HelpCircle size={20} />
        </button>
        <div className="w-8 h-8 bg-[#7c98b6] rounded-full flex items-center justify-center text-white font-medium">
          JD
        </div>
      </div>
    </header>
  );
}
