import {
  locationOptions,
  industryOptions,
  companySizeOptions,
  datePostedOptions,
  currentCompanyOptions,
} from "./search";
import type { FilterButton } from "@/lib/types/search";

export const defaultFilters = [
  "People",
  "Jobs",
  "Posts",
  "Companies",
  "Groups",
  "Products",
  "Services",
  "Events",
  "Courses",
  "Schools",
  "All filters",
];

export const dropdownOptions = [
  "All",
  "People",
  "Jobs",
  "Posts",
  "Companies",
  "Products",
  "Groups",
  "Services",
  "Events",
  "Courses",
  "Schools",
];

export const peopleFilters: FilterButton[] = [
  { label: "People", isDropdown: true },
  { label: "1st", isToggle: true, filterType: "connections" },
  { label: "2nd", isToggle: true, filterType: "connections" },
  { label: "3rd+", isToggle: true, filterType: "connections" },
  {
    label: "Locations",
    isMultiSelect: true,
    filterType: "locations",
    options: locationOptions,
  },
  {
    label: "Current company",
    isMultiSelect: true,
    filterType: "companies",
    options: currentCompanyOptions,
  },
  "All filters",
];

export const companiesFilters: FilterButton[] = [
  { label: "Companies", isDropdown: true },
  {
    label: "Locations",
    isMultiSelect: true,
    filterType: "locations",
    options: locationOptions,
  },
  {
    label: "Industry",
    isMultiSelect: true,
    filterType: "industry",
    options: industryOptions,
  },
  {
    label: "Company size",
    isMultiSelect: true,
    filterType: "companySize",
    options: companySizeOptions,
  },
  "All filters",
];

export const jobsFilters: FilterButton[] = [
  { label: "Jobs", isDropdown: true },
  {
    label: "Date posted",
    isMultiSelect: true,
    filterType: "datePosted",
    options: datePostedOptions,
  },
  { label: "Company", isToggle: true, filterType: "companies" },
  {
    label: "Under 10 applicants",
    isToggle: true,
    filterType: "underTenApplicants",
  },
];
