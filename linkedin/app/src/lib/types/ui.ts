export interface NewsItem {
  id: string;
  title: string;
  timeAgo: string;
  readerCount: string;
}

export interface Puzzle {
  id: string;
  name: string;
  connectionsPlayed: number;
}

export interface SuggestedConnection {
  id: string;
  name: string;
  title: string;
  avatar: string;
  isVerified: boolean;
}

export interface SuggestedPage {
  id: string;
  name: string;
  industry: string;
  followers: string;
  connectionsFollowing: number;
  logo: string;
}

export interface ProfileViewer {
  id: string;
  name: string;
  title: string;
  company: string;
  avatar: string;
  timestamp: string;
  isVerified: boolean;
}

export interface SearchSuggestion {
  id: string;
  text: string;
  type: "user" | "company" | "group" | "topic" | "job";
  subtitle?: string;
  avatar?: string;
  logo?: string;
}
