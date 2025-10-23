/* eslint-disable react-refresh/only-export-components */

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  type ReactNode,
} from "react";
import { useDojoState } from "@chakra-dev/dojo-hooks";
import {
  currentUser,
  feedPosts,
  allCompanies,
  allJobs,
  allUsers,
} from "@/lib/const";
import type {
  Post,
  SearchResults,
  User,
  SearchFilter,
  Job,
} from "../lib/types";
import { getSearchResults } from "@/lib/utils";

type View =
  | "feed"
  | "profile"
  | "search"
  | "profile-experience"
  | "profile-education"
  | "profile-skills";

interface AppState {
  currentView: View;
  viewedUserId: string;
  searchQuery: string;
  searchFilter: SearchFilter;
  currentUser: User;
  posts: Post[];
  users: User[];
  companies: User[];
  jobs: Job[];
  searchResults: SearchResults;
}

interface AppContextType {
  state: AppState;
  viewedUser: User;
  isOwnProfile: boolean;
  isProfileDetailsPage: boolean;
  searchResults: SearchResults;
  navigateToProfile: (userId: string) => void;
  navigateToFeed: () => void;
  navigateToSearch: (query: string) => void;
  navigateToDetailSection: (
    section: "experience" | "education" | "skills"
  ) => void;
  navigateBackToProfile: () => void;
  setMainCategory: (category: string) => void;
  toggleSubFilter: (filterType: keyof SearchFilter, value: string) => void;
  setMultiSelectFilter: (
    filterType: keyof SearchFilter,
    values: string[]
  ) => void;
  clearFilters: () => void;
  resetSubFilters: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const defaultFilter: SearchFilter = {
  mainCategory: "All",
  connections: [],
  locations: [],
  companies: [],
  industry: [],
  companySize: [],
  datePosted: [],
  underTenApplicants: false,
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useDojoState<AppState>({
    currentView: "feed",
    viewedUserId: currentUser.id,
    searchQuery: "",
    searchFilter: { ...defaultFilter },

    currentUser,
    posts: feedPosts,
    users: allUsers,
    companies: allCompanies,
    jobs: allJobs,
    searchResults: {
      people: [],
      companies: [],
      jobs: [],
      allPeople: [],
      allCompanies: [],
      allJobs: [],
      totalPeople: 0,
      totalCompanies: 0,
      totalJobs: 0,
      peopleQueryOnly: [],
      companiesQueryOnly: [],
      jobsQueryOnly: [],
    },
  });

  const navigateToProfile = useCallback(
    (userId: string) => {
      setState({
        ...state,
        currentView: "profile",
        viewedUserId: userId,
      });
      window.scrollTo(0, 0);
    },
    [setState, state]
  );

  const navigateToFeed = useCallback(() => {
    setState({
      ...state,
      currentView: "feed",
      viewedUserId: currentUser.id,
      searchQuery: "",
    });
    window.scrollTo(0, 0);
  }, [setState, state]);

  const navigateToSearch = useCallback(
    (query: string) => {
      const searchResults = getSearchResults(
        query,
        { ...defaultFilter },
        state.users,
        state.companies,
        allJobs
      );
      setState({
        ...state,
        currentView: "search",
        searchQuery: query,
        searchFilter: { ...defaultFilter },
        searchResults,
      });
      window.scrollTo(0, 0);
    },
    [setState, state]
  );

  const navigateToDetailSection = useCallback(
    (section: "experience" | "education" | "skills") => {
      setState({
        ...state,
        currentView: `profile-${section}` as View,
      });
      window.scrollTo(0, 0);
    },
    [setState, state]
  );

  const navigateBackToProfile = useCallback(() => {
    setState({
      ...state,
      currentView: "profile",
    });
    window.scrollTo(0, 0);
  }, [setState, state]);

  const setMainCategory = useCallback(
    (category: string) => {
      const newFilter = {
        ...defaultFilter,
        mainCategory: category,
      };
      const searchResults = getSearchResults(
        state.searchQuery,
        newFilter,
        state.users,
        state.companies,
        allJobs
      );
      setState({
        ...state,
        searchFilter: newFilter,
        searchResults,
      });
      window.scrollTo(0, 0);
    },
    [setState, state]
  );

  const toggleSubFilter = useCallback(
    (filterType: keyof SearchFilter, value: string) => {
      const currentValues = state.searchFilter[filterType];

      if (
        filterType === "underTenApplicants" ||
        filterType === "mainCategory"
      ) {
        return; // These are handled differently
      }

      let newValues: string[];
      if (Array.isArray(currentValues)) {
        if (currentValues.includes(value)) {
          newValues = currentValues.filter((v) => v !== value);
        } else {
          newValues = [...currentValues, value];
        }
      } else {
        newValues = [value];
      }

      const newFilter = {
        ...state.searchFilter,
        [filterType]: newValues,
      };
      const searchResults = getSearchResults(
        state.searchQuery,
        newFilter,
        state.users,
        state.companies,
        state.jobs
      );

      setState({
        ...state,
        searchFilter: newFilter,
        searchResults,
      });
    },
    [setState, state]
  );

  const setMultiSelectFilter = useCallback(
    (filterType: keyof SearchFilter, values: string[]) => {
      const newFilter = {
        ...state.searchFilter,
        [filterType]: values,
      };
      const searchResults = getSearchResults(
        state.searchQuery,
        newFilter,
        state.users,
        state.companies,
        allJobs
      );
      setState({
        ...state,
        searchFilter: newFilter,
        searchResults,
      });
    },
    [setState, state]
  );

  const clearFilters = useCallback(() => {
    const searchResults = getSearchResults(
      state.searchQuery,
      { ...defaultFilter },
      state.users,
      state.companies,
      allJobs
    );
    setState({
      ...state,
      searchFilter: { ...defaultFilter },
      searchResults,
    });
    window.scrollTo(0, 0);
  }, [setState, state]);

  const resetSubFilters = useCallback(() => {
    const newFilter = {
      ...defaultFilter,
      mainCategory: state.searchFilter.mainCategory,
    };
    const searchResults = getSearchResults(
      state.searchQuery,
      newFilter,
      state.users,
      state.companies,
      allJobs
    );
    setState({
      ...state,
      searchFilter: newFilter,
      searchResults,
    });
    window.scrollTo(0, 0);
  }, [setState, state]);

  const viewedUser = useMemo(
    () =>
      [...state.users, ...state.companies].find(
        (u) => u.id === state.viewedUserId
      ) || currentUser,
    [state.viewedUserId, state.users, state.companies]
  );

  const isOwnProfile = useMemo(
    () => state.viewedUserId === state.currentUser.id,
    [state.viewedUserId, state.currentUser.id]
  );

  const isProfileDetailsPage = useMemo(
    () => state.currentView.startsWith("profile-"),
    [state.currentView]
  );

  const value: AppContextType = useMemo(
    () => ({
      state,
      viewedUser,
      isOwnProfile,
      isProfileDetailsPage,
      searchResults: state.searchResults,
      navigateToProfile,
      navigateToFeed,
      navigateToSearch,
      navigateToDetailSection,
      navigateBackToProfile,
      setMainCategory,
      toggleSubFilter,
      setMultiSelectFilter,
      clearFilters,
      resetSubFilters,
    }),
    [
      state,
      viewedUser,
      isOwnProfile,
      isProfileDetailsPage,
      navigateToProfile,
      navigateToFeed,
      navigateToSearch,
      navigateToDetailSection,
      navigateBackToProfile,
      setMainCategory,
      toggleSubFilter,
      setMultiSelectFilter,
      clearFilters,
      resetSubFilters,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
