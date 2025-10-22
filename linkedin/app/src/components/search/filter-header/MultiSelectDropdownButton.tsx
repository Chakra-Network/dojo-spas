import { useApp } from "@/contexts/AppContext";
import MultiSelectDropdown from "@/components/ui/multi-select-dropdown";

export default function MultiSelectDropdownButton({
  filter,
}: {
  filter: { label: string; filterType: string; options: string[] };
}) {
  const {
    state: { searchFilter, searchResults },
    setMultiSelectFilter,
  } = useApp();

  const selectedValues = searchFilter[
    filter.filterType as keyof typeof searchFilter
  ] as string[];

  // Extract available filter options from query-only results
  const getAvailableLocations = () => {
    if (searchFilter.mainCategory === "People") {
      const regions = new Set<string>();
      searchResults.peopleQueryOnly.forEach((person) => {
        person.regions?.forEach((region) => regions.add(region));
      });
      return Array.from(regions);
    } else if (searchFilter.mainCategory === "Companies") {
      const regions = new Set<string>();
      searchResults.companiesQueryOnly.forEach((company) => {
        company.regions?.forEach((region) => regions.add(region));
      });
      return Array.from(regions);
    }
    return [];
  };

  const getAvailableCompanies = () => {
    const companies = new Set<string>();
    searchResults.peopleQueryOnly.forEach((person) => {
      if (person.currentCompany) {
        companies.add(person.currentCompany);
      }
    });
    return Array.from(companies);
  };

  const getAvailableIndustries = () => {
    const industries = new Set<string>();
    searchResults.companiesQueryOnly.forEach((company) => {
      if (company.industry) {
        industries.add(company.industry);
      }
    });
    return Array.from(industries);
  };

  const getAvailableCompanySizes = () => {
    const sizes = new Set<string>();
    searchResults.companiesQueryOnly.forEach((company) => {
      if (company.companySize) {
        sizes.add(company.companySize);
      }
    });
    return Array.from(sizes);
  };

  const getAvailableDatePosted = () => {
    const dates = new Set<string>();
    searchResults.jobsQueryOnly.forEach((job) => {
      if (job.datePosted) {
        dates.add(job.datePosted);
      }
    });
    return Array.from(dates);
  };

  // Get dynamic options based on filter type
  let dynamicOptions = filter.options;
  if (filter.filterType === "locations") {
    dynamicOptions = getAvailableLocations();
  } else if (filter.filterType === "companies") {
    dynamicOptions = getAvailableCompanies();
  } else if (filter.filterType === "industry") {
    dynamicOptions = getAvailableIndustries();
  } else if (filter.filterType === "companySize") {
    dynamicOptions = getAvailableCompanySizes();
  } else if (filter.filterType === "datePosted") {
    dynamicOptions = getAvailableDatePosted();
  }

  // If no results, fallback to static options
  if (dynamicOptions.length === 0) {
    dynamicOptions = filter.options;
  }
  return (
    <MultiSelectDropdown
      key={filter.label}
      label={filter.label}
      options={dynamicOptions}
      selectedValues={Array.isArray(selectedValues) ? selectedValues : []}
      onChange={(values) =>
        setMultiSelectFilter(
          filter.filterType as keyof typeof searchFilter,
          values
        )
      }
      showSelectedItems={false}
    />
  );
}
