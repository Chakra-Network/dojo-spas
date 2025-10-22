import type {
  FilterButton,
  SearchResults,
  SearchFilter,
  User,
  Job,
} from "../types";
import {
  peopleFilters,
  defaultFilters,
  jobsFilters,
  companiesFilters,
} from "../const";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getSearchResults(
  query: string,
  filters: SearchFilter,
  users: User[],
  companies: User[],
  jobs: Job[]
): SearchResults {
  const normalizedQuery = query.toLowerCase();

  // Filter by search query only (no filters)
  const peopleQueryOnly = users.filter((user) =>
    user.name.toLowerCase().includes(normalizedQuery)
  );

  const companiesQueryOnly = companies.filter((company) =>
    company.name.toLowerCase().includes(normalizedQuery)
  );

  const jobsQueryOnly = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(normalizedQuery) ||
      job.company.toLowerCase().includes(normalizedQuery)
  );

  // Start with query-only results, then apply filters
  let allPeopleFiltered = [...peopleQueryOnly];
  let allCompaniesFiltered = [...companiesQueryOnly];
  let allJobsFiltered = [...jobsQueryOnly];

  // Apply filters based on main category
  const isAllView = !filters.mainCategory || filters.mainCategory === "All";

  // Apply People filters
  if (filters.mainCategory === "People" || isAllView) {
    if (filters.connections.length > 0) {
      allPeopleFiltered = allPeopleFiltered.filter((user) =>
        user.connectionDegree
          ? filters.connections.includes(user.connectionDegree)
          : false
      );
    }

    if (filters.locations.length > 0) {
      allPeopleFiltered = allPeopleFiltered.filter((user) =>
        user.regions
          ? user.regions.some((region) => filters.locations.includes(region))
          : false
      );
    }

    if (filters.companies.length > 0) {
      allPeopleFiltered = allPeopleFiltered.filter((user) =>
        user.currentCompany
          ? filters.companies.includes(user.currentCompany)
          : false
      );
    }
  }

  // Apply Companies filters
  if (filters.mainCategory === "Companies" || isAllView) {
    if (filters.locations.length > 0) {
      allCompaniesFiltered = allCompaniesFiltered.filter((company) =>
        company.regions
          ? company.regions.some((region) => filters.locations.includes(region))
          : false
      );
    }

    if (filters.industry.length > 0) {
      allCompaniesFiltered = allCompaniesFiltered.filter((company) =>
        company.industry ? filters.industry.includes(company.industry) : false
      );
    }

    if (filters.companySize.length > 0) {
      allCompaniesFiltered = allCompaniesFiltered.filter((company) =>
        company.companySize
          ? filters.companySize.includes(company.companySize)
          : false
      );
    }
  }

  // Apply Jobs filters
  if (filters.mainCategory === "Jobs" || isAllView) {
    if (filters.datePosted.length > 0) {
      allJobsFiltered = allJobsFiltered.filter((job) =>
        job.datePosted ? filters.datePosted.includes(job.datePosted) : false
      );
    }

    if (filters.companies.length > 0) {
      allJobsFiltered = allJobsFiltered.filter((job) =>
        filters.companies.includes(job.company)
      );
    }

    if (filters.underTenApplicants) {
      allJobsFiltered = allJobsFiltered.filter(
        (job) => job.applicantCount !== undefined && job.applicantCount < 10
      );
    }
  }

  return {
    // Filtered results (for display)
    people: allPeopleFiltered.slice(0, 3),
    companies: allCompaniesFiltered.slice(0, 3),
    jobs: allJobsFiltered.slice(0, 3),
    allPeople: allPeopleFiltered,
    allCompanies: allCompaniesFiltered,
    allJobs: allJobsFiltered,
    totalPeople: allPeopleFiltered.length,
    totalCompanies: allCompaniesFiltered.length,
    totalJobs: allJobsFiltered.length,

    // Query-only results (for filter options)
    peopleQueryOnly,
    companiesQueryOnly,
    jobsQueryOnly,
  };
}

export const getFiltersForType = (filterType: string): FilterButton[] => {
  switch (filterType) {
    case "People":
      return peopleFilters;
    case "Companies":
      return companiesFilters;
    case "Jobs":
      return jobsFilters;
    case "Posts":
    case "Groups":
    case "Products":
    case "Services":
    case "Events":
    case "Courses":
    case "Schools":
      // For other types, show the same main category as dropdown
      return [{ label: filterType, isDropdown: true } as FilterButton];
    default:
      return defaultFilters;
  }
};
