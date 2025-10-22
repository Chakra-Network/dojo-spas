import type { SearchSuggestion, User } from "@/lib/types";
import { cn } from "@/lib/utils";
import { FaSearch } from "react-icons/fa";

export default function SearchView({
  filteredResults,
  handleClickSuggestion,
  handleSearch,
}: {
  filteredResults: Array<
    SearchSuggestion | { type: "user" | "company"; item: User }
  >;
  handleClickSuggestion: (suggestion: string) => void;
  handleSearch: () => void;
}) {
  return (
    <div className="flex flex-col">
      {filteredResults.length > 0 ? (
        <>
          <div className="flex flex-col">
            {filteredResults.map((result, index) => {
              if (
                (result.type === "user" || result.type === "company") &&
                "item" in result
              ) {
                const item = result.item;
                return (
                  <button
                    key={`${result.type}-${item.id}`}
                    className={cn(
                      "gap-3 p-[2px] hover:bg-gray-50 transition-colors text-left cursor-pointer w-full",
                      index === filteredResults.length - 1
                        ? "pb-[8px]"
                        : index === 0
                        ? "pt-[8px]"
                        : ""
                    )}
                    onClick={() => handleClickSuggestion(item.name)}
                  >
                    <div className="pl-2 pr-[6px] flex items-center justify-between w-full gap-3 h-10 ">
                      <div className="flex items-center flex-1">
                        <div className="pl-[6px] py-[10px] pr-[6px]">
                          <FaSearch className="h-4 w-4 text-gray-600 shrink-0" />
                        </div>

                        <span className="pl-[6px] pr-4 flex items-center gap-1">
                          <span className="text-[16px] leading-[24px] text-gray-900 whitespace-nowrap">
                            {item.name}
                          </span>
                          <span className="text-[12px] leading-[16px] text-gray-600 whitespace-nowrap">
                            {` • ${item.connectionDegree} • ${
                              item.title || item.company
                            }`}
                          </span>
                        </span>
                      </div>

                      <img
                        src={item.avatar}
                        alt={item.name}
                        className="w-8 h-8 rounded-full flex-shrink-0 mr-2"
                      />
                    </div>
                  </button>
                );
              } else {
                // Suggestion result
                const suggestion = result as SearchSuggestion;
                return (
                  <button
                    key={suggestion.id}
                    className={cn(
                      "flex items-center gap-3 p-[2px] hover:bg-gray-50 transition-colors text-left cursor-pointer w-full",
                      index === filteredResults.length - 1
                        ? "pb-[8px]"
                        : index === 0
                        ? "pt-[8px]"
                        : ""
                    )}
                    onClick={() => handleClickSuggestion(suggestion.text)}
                  >
                    <div className="pl-2 pr-[6px] flex items-center w-full h-10">
                      <div className="pl-[6px] py-[10px] pr-[6px]">
                        <FaSearch className="h-4 w-4 text-gray-600 flex-shrink-0" />
                      </div>

                      <div className="pl-[6px] pr-4 flex items-center gap-1">
                        <span className="text-[16px] leading-[24px] text-gray-900">
                          {suggestion.text}
                        </span>
                        {suggestion.subtitle && (
                          <div className="text-[12px] leading-[16px] text-gray-600">
                            {suggestion.subtitle}
                          </div>
                        )}
                      </div>
                    </div>
                  </button>
                );
              }
            })}
          </div>

          {/* See all results button */}
          <button
            className="w-full p-[2px] border-t border-gray-200 text-[16px] leading-[24px] text-[#0A66C2] font-semibold hover:bg-gray-50 transition-colors text-center cursor-pointer"
            onClick={handleSearch}
          >
            <div className="h-10 items-center flex justify-center">
              See all results
            </div>
          </button>
        </>
      ) : (
        <div className="px-4 py-6 text-center text-[14px] text-gray-600">
          No results found
        </div>
      )}
    </div>
  );
}
