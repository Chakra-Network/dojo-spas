import { useEffect, useRef, useMemo, useCallback } from "react";
import { FaSearch } from "react-icons/fa";
import { searchSuggestions } from "@/lib/const";
import type { SearchSuggestion, User } from "@/lib/types";
import { useApp } from "@/contexts/AppContext";
import DefaultDropdown from "./DefaultDropdown";
import SearchView from "./SearchView";
import { cn } from "@/lib/utils";

export default function Search({
  isSearchOpen,
  setIsSearchOpen,
  searchValue,
  setSearchValue,
}: {
  isSearchOpen: boolean;
  setIsSearchOpen: (isSearchOpen: boolean) => void;
  searchValue: string;
  setSearchValue: (searchValue: string) => void;
}) {
  const {
    navigateToSearch,
    navigateToProfile,
    state: { users, companies, jobs, searchQuery },
  } = useApp();

  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = useCallback(() => {
    if (searchValue.trim()) {
      navigateToSearch(searchValue.trim());
      setIsSearchOpen(false);
    }
  }, [navigateToSearch, searchValue, setIsSearchOpen]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        handleSearch();
        inputRef.current?.blur();
      }
    },
    [handleSearch]
  );

  const handleClickRecentSearch = useCallback(
    (search: User) => {
      navigateToProfile(search.id);
      setIsSearchOpen(false);
    },
    [navigateToProfile, setIsSearchOpen]
  );

  const handleClickSuggestion = useCallback(
    (suggestion: string) => {
      setSearchValue(suggestion);
      navigateToSearch(suggestion);
      setIsSearchOpen(false);
    },
    [navigateToSearch, setIsSearchOpen, setSearchValue]
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
      }
    };

    if (isSearchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchOpen, setIsSearchOpen]);

  // Filter search results based on search value
  const filteredResults = useMemo(() => {
    if (!searchValue.trim()) return [];

    const query = searchValue.toLowerCase();
    const results: Array<
      SearchSuggestion | { type: "user" | "company"; item: User }
    > = [];

    // Search in users
    users.forEach((user) => {
      if (user.name.toLowerCase().includes(query)) {
        results.push({ type: "user", item: user });
      }
    });

    companies.forEach((company) => {
      if (company.name.toLowerCase().includes(query)) {
        results.push({ type: "company", item: company });
      }
    });

    // Search in jobs
    jobs.forEach((job) => {
      if (job.title.toLowerCase().includes(query)) {
        results.push({ type: "job", id: job.id, text: job.title });
      }
    });

    // Search in suggestions
    searchSuggestions.forEach((suggestion) => {
      if (suggestion.text.toLowerCase().includes(query)) {
        results.push(suggestion);
      }
    });

    // Limit to 10 results
    return results.slice(0, 10);
  }, [companies, jobs, searchValue, users]);

  return (
    <div className="relative w-full" ref={searchRef}>
      <input
        ref={inputRef}
        type="text"
        placeholder="Search"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyDown={handleKeyDown}
        className={cn(
          "w-[280px] focus:w-full h-[34px] pl-10 pr-4 border border-gray-300 text-[14px] text-gray-900 placeholder-gray-600 outline-none transition-all focus:border-2 focus:border-[#0A66C2] focus:shadow-sm rounded-full duration-300",
          searchQuery && searchQuery.length > 0 && "w-full"
        )}
        onFocus={() => setIsSearchOpen(true)}
      />
      <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[14px] text-gray-600" />

      {/* Search Dropdown */}
      {isSearchOpen && (
        <div className="absolute top-[42px] left-0 w-[560px] max-h-[80vh] bg-white rounded-lg shadow-lg border border-gray-200 overflow-y-auto z-50">
          {searchValue.trim() ? (
            // Filtered Results View
            <SearchView
              filteredResults={filteredResults}
              handleClickSuggestion={handleClickSuggestion}
              handleSearch={handleSearch}
            />
          ) : (
            // Default View (Recent + Suggested)
            <DefaultDropdown
              handleClickRecentSearch={handleClickRecentSearch}
              handleClickSuggestion={handleClickSuggestion}
            />
          )}
        </div>
      )}
    </div>
  );
}
