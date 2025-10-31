import { useDojoState } from "@chakra-dev/dojo-hooks";
import { initialState } from "./lib/mocks";
import type { AppState, AppView } from "./lib/types";
import { AppContext } from "./context/AppContext";
import MainLayout from "./components/layout/MainLayout";
import DashboardView from "./views/DashboardView";
import CampaignsView from "./views/CampaignsView";
import EmailsView from "./views/EmailsView";
import ContactsView from "./views/ContactsView";
import LogsView from "./views/LogsView";

function App() {
  const [state, setState] = useDojoState<AppState>(initialState);

  const handleViewChange = (view: AppView) => {
    setState((prevState) => ({ ...prevState, activeView: view }));
  };

  const renderActiveView = () => {
    switch (state.activeView) {
      case "dashboard":
        return <DashboardView />;
      case "campaigns":
        return <CampaignsView />;
      case "emails":
        return <EmailsView />;
      case "contacts":
        return <ContactsView />;
      case "logs":
        return <LogsView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <AppContext.Provider value={{ state, setState }}>
      <MainLayout activeView={state.activeView} onNavigate={handleViewChange}>
        {renderActiveView()}
      </MainLayout>
    </AppContext.Provider>
  );
}

export default App;