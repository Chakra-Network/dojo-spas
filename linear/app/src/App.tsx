import LeftSidebar from "./components/common/LeftSidebar";
import NewIssueModal from "./components/common/new-issue-modal.tsx/NewIssueModal";
import {
  LinearStateProvider,
  useLinearState,
} from "./context/LinearStateContext";
import ParentContent from "./components/layout/ParentContent";

export default function App() {
  return (
    <LinearStateProvider>
      <AppContent />
    </LinearStateProvider>
  );
}

function AppContent() {
  const { isNewIssueModalOpen, setIsNewIssueModalOpen } = useLinearState();

  return (
    <>
      <div className="flex h-screen bg-background-1 text-white overflow-hidden relative">
        <LeftSidebar onCreateIssue={() => setIsNewIssueModalOpen(true)} />
        <ParentContent />
      </div>
      <NewIssueModal
        open={isNewIssueModalOpen}
        onClose={() => setIsNewIssueModalOpen(false)}
      />
    </>
  );
}
