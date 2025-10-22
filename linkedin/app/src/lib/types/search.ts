import type { User } from "./user";
import type { Job } from "./job";

export interface SearchFilter {
  mainCategory: string;
  connections: string[];
  locations: string[];
  companies: string[];
  industry: string[];
  companySize: string[];
  datePosted: string[];
  underTenApplicants: boolean;
}

export interface SearchResults {
  // Filtered results (query + filters applied) - for display
  people: User[];
  companies: User[];
  jobs: Job[];
  allPeople: User[];
  allCompanies: User[];
  allJobs: Job[];
  totalPeople: number;
  totalCompanies: number;
  totalJobs: number;

  // Query-only results (no filters) - for extracting filter options
  peopleQueryOnly: User[];
  companiesQueryOnly: User[];
  jobsQueryOnly: Job[];
}

export interface RecentSearch {
  id: string;
  name: string;
  avatar: string;
}

export type FilterButton =
  | string
  | { label: string; isDropdown: true }
  | { label: string; isToggle: true; filterType: string }
  | {
      label: string;
      isMultiSelect: true;
      filterType: string;
      options: string[];
    };
