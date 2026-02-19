import { useDojoState } from "@chakra-dev/dojo-hooks";
import { initialState } from "../seed-data";
import type { ZenDeskState } from "../types";
import Sidebar from "./Sidebar";
import AgentDashboard from "./AgentDashboard";
import TicketInbox from "./TicketInbox";
import TicketWorkspace from "./TicketWorkspace";
import MacrosLibrary from "./MacrosLibrary";
import SLATracker from "./SLATracker";

export default function ZenDesk() {
  const [state, setState] = useDojoState<ZenDeskState>(initialState);

  const renderView = () => {
    switch (state.activeView) {
      case "dashboard":
        return <AgentDashboard state={state} setState={setState} />;
      case "inbox":
        return <TicketInbox state={state} setState={setState} />;
      case "ticket":
        return <TicketWorkspace state={state} setState={setState} />;
      case "macros":
        return <MacrosLibrary state={state} setState={setState} />;
      case "sla":
        return <SLATracker state={state} setState={setState} />;
      default:
        return <AgentDashboard state={state} setState={setState} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 text-sm text-gray-900" style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}>
      <Sidebar state={state} setState={setState} />
      <main className="flex-1 overflow-auto">
        {renderView()}
      </main>
    </div>
  );
}
