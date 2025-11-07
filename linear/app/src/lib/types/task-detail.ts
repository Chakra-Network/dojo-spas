export interface CommentEntry {
  id: string;
  authorId: string;
  content: string;
  createdAt: string;
}

export interface SystemActivityEntry {
  id: string;
  actor: string;
  description: string;
  createdAt: string;
  icon: "avatar" | "cycle" | "edit";
}
