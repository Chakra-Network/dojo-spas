import TaskHeader from "./TaskHeader";
import { cn } from "@/lib/utils";
import TaskRightSidebar from "./right-sidebar/TaskRightSidebar";
import TaskDetail from "./main-content/Detail";
import { useLinearState } from "@/context/LinearStateContext";
import { useMemo } from "react";

export default function TaskContent() {
  const { issues, taskId } = useLinearState();
  const issue = useMemo(
    () => issues.find((candidate) => candidate.id === taskId),
    [issues, taskId]
  );

  if (!issue) {
    return (
      <div className="flex h-full w-full items-center justify-center text-sm text-neutral-4">
        Select an issue to view its details.
      </div>
    );
  }

  return (
    <main className="flex flex-col flex-1 overflow-hidden my-2 mr-2 bg-background-3 border border-border rounded-md w-full">
      <div className="flex h-full overflow-hidden relative">
        <div className="flex flex-col h-full overflow-hidden relative w-[calc(100%-264px)]">
          <TaskHeader issue={issue} />
          <div
            className={cn(
              "overflow-auto h-full transition-all duration-200 ease-in-out"
            )}
          >
            <TaskDetail issue={issue} />
          </div>
        </div>
        <TaskRightSidebar issue={issue} />
      </div>
    </main>
  );
}
