import type { JSX } from "react";

export interface Project {
  id: string;
  name: string;
  Icon?: JSX.ElementType;
  teamId: string;
}

export interface Milestone {
  id: string;
  name: string;
  targetDate: string;
  color: string;
  projectId: string;
}

export interface Workspace {
  id: string;
  name: string;
  teams: string[]; // team IDs
  projects: string[]; // project IDs
}
