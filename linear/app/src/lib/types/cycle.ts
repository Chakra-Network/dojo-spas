export type CycleStatus = "current" | "upcoming" | "previous";

export interface Cycle {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  scope: number;
  started: number;
  completed: number;
  status?: CycleStatus;
}

export interface ProgressMetric {
  label: string;
  value: number;
  percentage: string;
  color: string;
}
