import LinkedInFeed from "./components/feed/FeedPage";
import ProfilePage from "./components/profile/ProfilePage";
import SearchResultsPage from "./components/search/SearchResultsPage";
import { AppProvider, useApp } from "./contexts/AppContext";
import MainLayout from "./components/layout/MainLayout";
import ProfileDetailsPage from "./components/profile/details/ProfileDetailsPage";

function AppContent() {
  const { state } = useApp();
  const currentViewSplit = state.currentView.split("-");
  const mainView = currentViewSplit[0];

  switch (mainView) {
    case "feed":
      return <LinkedInFeed />;
    case "search":
      return <SearchResultsPage />;
    case "profile":
      if (currentViewSplit.length > 1) {
        return (
          <ProfileDetailsPage
            type={currentViewSplit[1] as "experience" | "education" | "skills"}
          />
        );
      }
      return <ProfilePage />;
    default:
      return <LinkedInFeed />;
  }
}

export default function App() {
  return (
    <AppProvider>
      <MainLayout>
        <AppContent />
      </MainLayout>
    </AppProvider>
  );
}
