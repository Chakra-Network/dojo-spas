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
import { useDojoState } from "@chakra-dev/dojo-hooks";
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
  isNewIssueModalOpen: boolean;
  setIsNewIssueModalOpen: (isNewIssueModalOpen: boolean) => void;
}

interface LinearState {
  issues: Issue[];
  users: User[];
  labels: Label[];
  cycles: Cycle[];
  projects: Project[];
  milestones: Milestone[];
  teamIdentifier: string;
  taskId?: string;
  isNewIssueModalOpen: boolean;
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
    taskId: undefined,
    isNewIssueModalOpen: false,
  });

  // Update users context whenever state.users changes
  useEffect(() => {
    setAssigneeProgress(generateAssigneeProgress(state.users));
  }, [state.users]);

  const handleReorderIssues = useCallback(
    (reorderedIssues: Issue[]) => {
      setState((prevState) => ({ ...prevState, issues: reorderedIssues }));
    },
    [setState]
  );

  const updateIssue = useCallback(
    (issueId: string, updates: Partial<Issue>) => {
      setState((prevState) => {
        const updatedIssues = prevState.issues.map((issue) => {
          if (issue.id !== issueId) return issue;

          const updatedIssue = { ...issue, ...updates };

          // Track priority changes in activity
          if (
            updates.priority !== undefined &&
            updates.priority !== issue.priority
          ) {
            const currentUser = prevState.users[0];
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
              description: `set priority to ${
                priorityLabels[updates.priority]
              }`,
              createdAt: new Date().toISOString(),
              icon: "edit" as const,
            };

            updatedIssue.activities = [
              ...(issue.activities || []),
              newActivity,
            ];
          }

          return updatedIssue;
        });
        return { ...prevState, issues: updatedIssues };
      });
    },
    [setState]
  );

  const addComment = useCallback(
    (issueId: string, comment: Comment) => {
      setState((prevState) => {
        const updatedIssues = prevState.issues.map((issue) =>
          issue.id === issueId
            ? { ...issue, comments: [...(issue.comments || []), comment] }
            : issue
        );
        return { ...prevState, issues: updatedIssues as Issue[] };
      });
    },
    [setState]
  );

  const addIssue = useCallback(
    (issue: Issue) => {
      setState((prevState) => {
        // Auto-generate issue identifier
        const numbers = prevState.issues
          .map((issue) => parseInt(issue.identifier.split("-")[1]))
          .filter((num) => !isNaN(num));
        const nextNumber = numbers.length > 0 ? Math.max(...numbers) + 1 : 1;
        const generatedIdentifier = `${prevState.teamIdentifier}-${nextNumber}`;

        const currentUser = prevState.users[0];
        const issueWithActivity: Issue = {
          ...issue,
          identifier: generatedIdentifier,
          activities: [
            {
              id: `${issue.id}-created`,
              actor: currentUser.name,
              description: "created the issue",
              createdAt: new Date().toISOString(),
              icon: "avatar" as const,
            },
          ],
        };
        return {
          ...prevState,
          issues: [...prevState.issues, issueWithActivity],
        };
      });
    },
    [setState]
  );

  const setTaskId = useCallback(
    (taskId?: string) => {
      setState((prevState) => ({ ...prevState, taskId }));
    },
    [setState]
  );

  const setIsNewIssueModalOpen = useCallback(
    (isNewIssueModalOpen: boolean) => {
      setState((prevState) => ({ ...prevState, isNewIssueModalOpen }));
    },
    [setState]
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
      taskId: state.taskId,
      setTaskId,
      addComment,
      isNewIssueModalOpen: state.isNewIssueModalOpen,
      setIsNewIssueModalOpen,
    }),
    [
      state.users,
      state.issues,
      state.labels,
      state.cycles,
      state.projects,
      state.milestones,
      state.teamIdentifier,
      state.taskId,
      assigneeProgress,
      addIssue,
      handleReorderIssues,
      updateIssue,
      setTaskId,
      addComment,
      state.isNewIssueModalOpen,
      setIsNewIssueModalOpen,
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
