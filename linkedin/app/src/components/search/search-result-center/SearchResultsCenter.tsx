import PeopleCompaniesSection from "./PeopleCompaniesSection";
import JobsSection from "./JobsSection";
import { useApp } from "@/contexts/AppContext";

export default function SearchResultsCenter() {
  const {
    state: { searchQuery: query },
    searchResults: {
      allPeople: people,
      allCompanies: companies,
      allJobs: jobs,
    },
  } = useApp();

  return (
    <div className="flex-1 max-w-[550px] flex flex-col gap-2">
      {/* People Section */}
      {people.length > 0 && (
        <PeopleCompaniesSection
          title="People"
          items={people}
          sectionId="people"
        />
      )}

      {/* Companies Section */}
      {companies.length > 0 && (
        <PeopleCompaniesSection
          title="Companies"
          items={companies}
          sectionId="companies"
        />
      )}

      {/* Jobs Section */}
      {jobs.length > 0 && <JobsSection jobs={jobs} />}

      {/* No Results */}
      {people.length === 0 && companies.length === 0 && jobs.length === 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
          <p className="text-[16px] text-gray-600">
            No results found for "{query}"
          </p>
          <p className="text-[14px] text-gray-500 mt-2">
            Try searching with different keywords
          </p>
        </div>
      )}
    </div>
  );
}
