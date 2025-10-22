import { useEffect, useMemo, useState } from "react";
import FilterHeader from "./filter-header/FilterHeader";
import SearchLeftSidebar from "./LeftSidebar";
import SearchResultsCenter from "./search-result-center/SearchResultsCenter";
import PeopleFilteredView from "./filtered-views/PeopleFilteredView";
import CompaniesFilteredView from "./filtered-views/CompaniesFilteredView";
import JobsFilteredView from "./filtered-views/JobsFilteredView";
import NoResultsView from "./filtered-views/NoResultsView";
import SidebarFooter from "../common/SidebarFooter";
import { useApp } from "@/contexts/AppContext";

interface Section {
  id: string;
  label: string;
}

export default function SearchResultsPage() {
  const [activeSection, setActiveSection] = useState("people");
  const [isScrolling, setIsScrolling] = useState(false);
  const {
    state: { searchFilter },
    searchResults,
  } = useApp();

  const handleSectionClick = (section: string) => {
    setActiveSection(section);
    setIsScrolling(true);

    // Scroll to section
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });

      // Reset scrolling flag after animation completes
      setTimeout(() => {
        setIsScrolling(false);
      }, 1000); // Smooth scroll typically takes ~500-800ms
    }
  };

  const activeFilter = searchFilter.mainCategory;
  const isDefaultView = !activeFilter || activeFilter === "All";
  const showSidebar = isDefaultView;

  // Determine available sections based on search results
  const availableSections = useMemo<Section[]>(() => {
    const sections: Section[] = [];
    if (isDefaultView) {
      if (searchResults.people.length > 0) {
        sections.push({ id: "people", label: "People" });
      }
      if (searchResults.companies.length > 0) {
        sections.push({ id: "companies", label: "Companies" });
      }
      if (searchResults.jobs.length > 0) {
        sections.push({ id: "jobs", label: "Jobs" });
      }
    }
    return sections;
  }, [
    isDefaultView,
    searchResults.people.length,
    searchResults.companies.length,
    searchResults.jobs.length,
  ]);

  // Scroll spy effect - update active section based on scroll position
  useEffect(() => {
    if (!isDefaultView || availableSections.length === 0) return;

    const handleScroll = () => {
      // Skip scroll spy when programmatically scrolling
      if (isScrolling) return;

      const scrollPosition = window.scrollY + 200; // Offset for better UX

      for (let i = availableSections.length - 1; i >= 0; i--) {
        const section = document.getElementById(availableSections[i].id);
        if (section) {
          const sectionTop = section.offsetTop;
          if (scrollPosition >= sectionTop) {
            setActiveSection(availableSections[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Call once on mount to set initial state

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDefaultView, availableSections, isScrolling]);

  return (
    <>
      <FilterHeader />
      <div className="px-4">
        <div
          className={`max-w-[1128px] mx-auto ${
            activeFilter === "Jobs" ? "h-[calc(100vh-53px-60px)]" : "py-6"
          }`}
        >
          <div
            className={`flex gap-6 items-start ${
              activeFilter === "Jobs" ? "h-full pt-6" : ""
            }`}
          >
            {/* Left Sidebar - only show in default view */}
            {showSidebar && availableSections.length > 0 && (
              <SearchLeftSidebar
                activeSection={activeSection}
                onSectionClick={handleSectionClick}
                availableSections={availableSections}
              />
            )}

            {/* Center Content */}
            <PageContent />
            {/* Right Sidebar */}
            {activeFilter !== "Jobs" && (
              <div className="w-[300px] border-t border-gray-200 sticky top-[calc(53px+60px+24px)]">
                {showSidebar && <SidebarFooter />}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function PageContent() {
  const {
    state: { searchFilter },
  } = useApp();

  switch (searchFilter.mainCategory) {
    case "People":
      return <PeopleFilteredView />;
    case "Companies":
      return <CompaniesFilteredView />;
    case "Jobs":
      return <JobsFilteredView />;
    case "Posts":
    case "Groups":
    case "Products":
    case "Services":
    case "Events":
    case "Courses":
    case "Schools":
      return <NoResultsView />;
    default:
      // Default mixed results view
      return <SearchResultsCenter />;
  }
}
