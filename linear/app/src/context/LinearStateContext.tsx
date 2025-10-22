/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useEffect,
  useCallback,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type {
  User,
  AssigneeProgress,
  Issue,
  Comment,
  Label,
  Cycle,
  Project,
  Milestone,
} from "@/lib/types";
import { useDojoState } from "dojo-hooks";
import {
  issues as initialIssues,
  users as initialUsers,
  labels as initialLabels,
  cycles as initialCycles,
  projects as initialProjects,
  milestones as initialMilestones,
  TEAM_IDENTIFIER,
} from "../lib/mocks";
import { generateAssigneeProgress } from "../lib/utils";

interface LinearStateContextType {
  users: User[];
  issues: Issue[];
  labels: Label[];
  cycles: Cycle[];
  projects: Project[];
  milestones: Milestone[];
  teamIdentifier: string;
  handleReorderIssues: (reorderedIssues: Issue[]) => void;
  updateIssue: (issueId: string, updates: Partial<Issue>) => void;
  assigneeProgress: AssigneeProgress[];
  taskId?: string;
  setTaskId: (taskId?: string) => void;
  addComment: (issueId: string, comment: Comment) => void;
  addIssue: (issue: Issue) => void;
}

interface LinearState {
  issues: Issue[];
  users: User[];
  labels: Label[];
  cycles: Cycle[];
  projects: Project[];
  milestones: Milestone[];
  teamIdentifier: string;
}

const LinearStateContext = createContext<LinearStateContextType | undefined>(
  undefined
);

export function LinearStateProvider({ children }: { children: ReactNode }) {
  const [assigneeProgress, setAssigneeProgress] = useState<AssigneeProgress[]>(
    []
  );

  const [state, setState] = useDojoState<LinearState>({
    issues: initialIssues,
    users: initialUsers,
    labels: initialLabels,
    cycles: initialCycles,
    projects: initialProjects,
    milestones: initialMilestones,
    teamIdentifier: TEAM_IDENTIFIER,
  });

  const [taskId, setTaskId] = useState<string | undefined>(undefined);

  // Update users context whenever state.users changes
  useEffect(() => {
    setAssigneeProgress(generateAssigneeProgress(state.users));
  }, [state.users]);

  const handleReorderIssues = useCallback(
    (reorderedIssues: Issue[]) => {
      setState({ ...state, issues: reorderedIssues });
    },
    [setState, state]
  );

  const updateIssue = useCallback(
    (issueId: string, updates: Partial<Issue>) => {
      const updatedIssues = state.issues.map((issue) => {
        if (issue.id !== issueId) return issue;

        const updatedIssue = { ...issue, ...updates };

        // Track priority changes in activity
        if (
          updates.priority !== undefined &&
          updates.priority !== issue.priority
        ) {
          const currentUser = state.users[0];
          const priorityLabels: Record<string, string> = {
            none: "No priority",
            urgent: "Urgent",
            high: "High",
            medium: "Medium",
            low: "Low",
          };

          const newActivity = {
            id: `activity-${Date.now()}`,
            actor: currentUser.name,
            description: `set priority to ${priorityLabels[updates.priority]}`,
            createdAt: new Date(),
            icon: "edit" as const,
          };

          updatedIssue.activities = [...(issue.activities || []), newActivity];
        }

        return updatedIssue;
      });
      setState({ ...state, issues: updatedIssues });
    },
    [setState, state]
  );

  const addComment = useCallback(
    (issueId: string, comment: Comment) => {
      const updatedIssues = state.issues.map((issue) =>
        issue.id === issueId
          ? { ...issue, comments: [...(issue.comments || []), comment] }
          : issue
      );
      setState({ ...state, issues: updatedIssues as Issue[] });
    },
    [setState, state]
  );

  const addIssue = useCallback(
    (issue: Issue) => {
      // Auto-generate issue identifier
      const numbers = state.issues
        .map((issue) => parseInt(issue.identifier.split("-")[1]))
        .filter((num) => !isNaN(num));
      const nextNumber = numbers.length > 0 ? Math.max(...numbers) + 1 : 1;
      const generatedIdentifier = `${state.teamIdentifier}-${nextNumber}`;

      const currentUser = state.users[0];
      const issueWithActivity: Issue = {
        ...issue,
        identifier: generatedIdentifier,
        activities: [
          {
            id: `${issue.id}-created`,
            actor: currentUser.name,
            description: "created the issue",
            createdAt: new Date(),
            icon: "avatar" as const,
          },
        ],
      };
      setState({ ...state, issues: [...state.issues, issueWithActivity] });
    },
    [setState, state]
  );

  const value = useMemo(
    () => ({
      users: state.users,
      issues: state.issues,
      labels: state.labels,
      cycles: state.cycles,
      projects: state.projects,
      milestones: state.milestones,
      teamIdentifier: state.teamIdentifier,
      assigneeProgress,
      addIssue,
      handleReorderIssues,
      updateIssue,
      taskId,
      setTaskId,
      addComment,
    }),
    [
      state.users,
      state.issues,
      state.labels,
      state.cycles,
      state.projects,
      state.milestones,
      state.teamIdentifier,
      assigneeProgress,
      addIssue,
      handleReorderIssues,
      updateIssue,
      taskId,
      setTaskId,
      addComment,
    ]
  );

  return (
    <LinearStateContext.Provider value={value}>
      {children}
    </LinearStateContext.Provider>
  );
}

export function useLinearState() {
  const context = useContext(LinearStateContext);
  if (context === undefined) {
    throw new Error("useLinearState must be used within a LinearStateProvider");
  }
  return context;
}
