export interface CommentEntry {
  id: string;
  authorId: string;
  content: string;
  createdAt: Date;
}

export interface SystemActivityEntry {
  id: string;
  actor: string;
  description: string;
  createdAt: Date;
  icon: "avatar" | "cycle" | "edit";
}
