import { useLinearState } from "@/context/LinearStateContext";
import MainContent from "../main-page/MainContent";
import TaskContent from "../task-detail-page/TaskContent";

export default function ParentContent() {
  const { taskId } = useLinearState();

  if (taskId) {
    return <TaskContent />;
  }

  return <MainContent />;
}
