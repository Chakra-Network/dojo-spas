import type { Label, Cycle, Project, Milestone } from "../types";
import {
  Database,
  Warehouse,
  Microscope,
  Brain,
  Settings,
  Zap,
} from "lucide-react";

export const labels: Label[] = [
  { id: "label1", name: "Bug", color: "#EF4444" },
  { id: "label2", name: "Operations", color: "#8B5CF6" },
  { id: "label3", name: "Feature", color: "#10B981" },
  { id: "label4", name: "Documentation", color: "#F59E0B" },
  { id: "label5", name: "Enhancement", color: "#3B82F6" },
  { id: "label6", name: "Frontend", color: "#8B5CF6" },
  { id: "label7", name: "Backend", color: "#3B82F6" },
  { id: "label8", name: "UI/UX", color: "#EC4899" },
  { id: "label9", name: "Performance", color: "#06B6D4" },
  { id: "label10", name: "Security", color: "#DC2626" },
];

export const cycles: Cycle[] = [
  {
    id: "cycle52",
    name: "Cycle 52",
    startDate: "Oct 13",
    endDate: "Oct 19",
    scope: 95,
    started: 45,
    completed: 50,
    status: "previous",
  },
  {
    id: "cycle53",
    name: "Cycle 53",
    startDate: "Oct 20",
    endDate: "Oct 26",
    scope: 114,
    started: 32,
    completed: 22,
    status: "current",
  },
  {
    id: "cycle54",
    name: "Cycle 54",
    startDate: "Oct 27",
    endDate: "Nov 2",
    scope: 0,
    started: 0,
    completed: 0,
    status: "upcoming",
  },
  {
    id: "cycle55",
    name: "Cycle 55",
    startDate: "Nov 3",
    endDate: "Nov 9",
    scope: 0,
    started: 0,
    completed: 0,
    status: "upcoming",
  },
  {
    id: "cycle56",
    name: "Cycle 56",
    startDate: "Nov 10",
    endDate: "Nov 16",
    scope: 0,
    started: 0,
    completed: 0,
    status: "upcoming",
  },
  {
    id: "cycle57",
    name: "Cycle 57",
    startDate: "Nov 17",
    endDate: "Nov 23",
    scope: 0,
    started: 0,
    completed: 0,
    status: "upcoming",
  },
  {
    id: "cycle58",
    name: "Cycle 58",
    startDate: "Nov 24",
    endDate: "Nov 30",
    scope: 0,
    started: 0,
    completed: 0,
    status: "upcoming",
  },
  {
    id: "cycle59",
    name: "Cycle 59",
    startDate: "Dec 1",
    endDate: "Dec 7",
    scope: 0,
    started: 0,
    completed: 0,
    status: "upcoming",
  },
];

export const projects: Project[] = [
  {
    id: "proj1",
    name: "Data Collector",
    Icon: Database,
    teamId: "team1",
  },
  {
    id: "proj2",
    name: "Data Warehouse",
    Icon: Warehouse,
    teamId: "team1",
  },
  {
    id: "proj3",
    name: "Exploration / Research",
    Icon: Microscope,
    teamId: "team1",
  },
  {
    id: "proj4",
    name: "Model Training",
    Icon: Brain,
    teamId: "team1",
  },
  {
    id: "proj5",
    name: "Operations",
    Icon: Settings,
    teamId: "team1",
  },
  {
    id: "proj6",
    name: "Pango",
    Icon: Zap,
    teamId: "team1",
  },
];

export const milestones: Milestone[] = [
  {
    id: "milestone3",
    name: "Data Pipeline v2 Release",
    targetDate: "Nov 1",
    color: "#10B981",
    projectId: "proj1",
  },
  {
    id: "milestone4",
    name: "Warehouse Migration Complete",
    targetDate: "Nov 15",
    color: "#F59E0B",
    projectId: "proj2",
  },
];

export const currentCycle: Cycle = cycles.find((c) => c.status === "current")!;

export const TEAM_IDENTIFIER = "VSS";
