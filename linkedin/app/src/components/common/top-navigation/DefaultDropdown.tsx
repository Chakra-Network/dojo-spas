import { useApp } from "@/contexts/AppContext";
import { suggestedSearches } from "@/lib/const";
import type { User } from "@/lib/types";
import { FaSearch } from "react-icons/fa";

export default function DefaultDropdown({
  handleClickRecentSearch,
  handleClickSuggestion,
}: {
  handleClickRecentSearch: (search: User) => void;
  handleClickSuggestion: (suggestion: string) => void;
}) {
  const {
    state: { users, companies },
  } = useApp();
  const recentSearches = [...companies.slice(0, 2), ...users.slice(0, 3)];
  return (
    <>
      {/* Recent Section */}
      <div className="flex flex-col">
        <div className="flex items-center justify-between px-4 pt-3 pb-2">
          <span className="text-[14px] leading-[20px] text-gray-500 font-semibold">
            Recent
          </span>
          <button className="text-[14px] leading-[20px] hover:bg-gray-50 transition-colors font-semibold h-6 flex items-center justify-center rounded px-2 cursor-pointer">
            See all
          </button>
        </div>
        <div className="flex items-center gap-3 px-4 h-fit flex-shrink-0">
          {recentSearches.map((search) => (
            <button
              key={search.id}
              className="flex flex-col items-center gap-1 w-[74px] h-[84px] py-1 px-[6px] hover:bg-gray-50 transition-colors justify-between cursor-pointer"
              onClick={() => handleClickRecentSearch(search)}
            >
              <img
                src={search.avatar}
                alt={search.name}
                className="w-10 h-10 rounded-full"
              />
              <span className="text-[12px] leading-[16px] font-semibold text-gray-900 text-center line-clamp-2 w-full flex-1">
                {search.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Try searching for Section */}
      <div className="flex flex-col">
        <div className="px-4 pt-2">
          <span className="text-[14px] leading-[20px] text-gray-500 font-semibold">
            Try searching for
          </span>
        </div>
        <div className="flex flex-col py-2">
          {suggestedSearches.map((query, index) => (
            <button
              key={index}
              className="flex items-center gap-[10px] px-4 h-11 hover:bg-gray-50 transition-colors text-left cursor-pointer"
              onClick={() => handleClickSuggestion(query)}
            >
              <FaSearch className="h-4 w-4 text-gray-600 flex-shrink-0" />
              <span className="pl-[6px] pr-4">
                <span className="text-[16px] leading-[24px] text-gray-900 font-semibold">
                  {query}
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
