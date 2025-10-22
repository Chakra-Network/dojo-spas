export interface User {
  id: string;
  name: string;
  avatar: string;
  email: string;
}

export interface Team {
  id: string;
  name: string;
  members: string[]; // user IDs
  avatar: string;
}

export interface AssigneeProgress {
  userId: string;
  completed: number;
  total: number;
}
