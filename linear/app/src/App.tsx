import { useState } from "react";
import LeftSidebar from "./components/common/LeftSidebar";
import NewIssueModal from "./components/common/new-issue-modal.tsx/NewIssueModal";
import { LinearStateProvider } from "./context/LinearStateContext";
import ParentContent from "./components/layout/ParentContent";

export default function App() {
  const [isNewIssueModalOpen, setIsNewIssueModalOpen] = useState(false);

  return (
    <LinearStateProvider>
      <div className="flex h-screen bg-background-1 text-white overflow-hidden relative">
        <LeftSidebar onCreateIssue={() => setIsNewIssueModalOpen(true)} />
        <ParentContent />
      </div>
      <NewIssueModal
        open={isNewIssueModalOpen}
        onClose={() => setIsNewIssueModalOpen(false)}
      />
    </LinearStateProvider>
  );
}
