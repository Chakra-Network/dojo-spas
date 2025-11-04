import KanbanBoard from "./board/KanbanBoard";
import KanbanRightSidebar from "./right-sidebar/KanbanRightSidebar";
import MainHeader from "./MainHeader";
import HiddenColumnsSection from "./board/HiddenColumnsSection";
import { cn } from "@/lib/utils";
import { useLinearState } from "@/context/LinearStateContext";

export default function MainContent() {
  const {
    kanbanContainerRef,
    showRightSidebar,
    toggleRightSidebar,
    hiddenColumnStatuses,
    issues,
  } = useLinearState();

  return (
    <main className="flex flex-col flex-1 overflow-hidden  my-2 mr-2 bg-background-3 border border-border rounded-md w-full">
      <MainHeader
        onToggleRightSidebar={toggleRightSidebar}
        isRightSidebarOpen={showRightSidebar}
      />

      <div className="flex h-full overflow-hidden relative">
        <div
          className={cn(
            "overflow-auto h-full transition-all duration-200 ease-in-out relative",
            showRightSidebar ? "w-[calc(100%-360px)]" : "w-full"
          )}
          ref={kanbanContainerRef}
        >
          <div className="flex h-full min-w-fit justify-between">
            <div>
              <KanbanBoard />
            </div>
            {hiddenColumnStatuses.length > 0 && (
              <div>
                <HiddenColumnsSection
                  hiddenColumnStatuses={hiddenColumnStatuses}
                  issues={issues}
                />
              </div>
            )}
          </div>
        </div>
        <div
          className={`absolute right-0 top-0 h-full w-[360px] overflow-y-auto transition-transform duration-200 ease-in-out ${
            showRightSidebar ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <KanbanRightSidebar />
        </div>
      </div>
    </main>
  );
}
