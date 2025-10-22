import type { User } from "./user";

export interface Post {
  id: string;
  author: User;
  authorType: "user" | "company";
  content: string;
  timestamp: string;
  images?: string[];
  reactions: Reaction[];
  totalReactions: number;
  commentCount: number;
  repostCount: number;
  isRepost?: boolean;
  repostedBy?: User;
  followers?: string;
  isFollowing?: boolean;
  reactionText?: string;
}

export interface Reaction {
  type: "like" | "celebrate" | "support" | "love" | "insightful" | "funny";
  count: number;
  users: string[]; // user avatars
}
