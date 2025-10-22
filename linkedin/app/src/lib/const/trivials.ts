import type { NewsItem, Puzzle } from "../types";

export const newsItems: NewsItem[] = [
  {
    id: "1",
    title: "Deloitte admits to AI errors",
    timeAgo: "2h ago",
    readerCount: "2,676 readers",
  },
  {
    id: "2",
    title: "Heidi Health leads medtech surge",
    timeAgo: "2h ago",
    readerCount: "627 readers",
  },
  {
    id: "3",
    title: "AMD, OpenAI agree to huge AI deal",
    timeAgo: "2h ago",
    readerCount: "49,308 readers",
  },
  {
    id: "4",
    title: "IBM strikes AI deal with Anthropic",
    timeAgo: "3h ago",
    readerCount: "28,897 readers",
  },
  {
    id: "5",
    title: "Solving the 'habit puzzle'",
    timeAgo: "1d ago",
    readerCount: "1,115 readers",
  },
];

export const puzzles: Puzzle[] = [
  {
    id: "1",
    name: "Mini Sudoku",
    connectionsPlayed: 7,
  },
  {
    id: "2",
    name: "Zip",
    connectionsPlayed: 11,
  },
  {
    id: "3",
    name: "Tango",
    connectionsPlayed: 7,
  },
  {
    id: "4",
    name: "Queens",
    connectionsPlayed: 5,
  },
];
