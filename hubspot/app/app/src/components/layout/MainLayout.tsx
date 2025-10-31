import Sidebar from "./Sidebar";
import type { AppView } from "../../lib/types";

interface MainLayoutProps {
  children: React.ReactNode;
  activeView: AppView;
  onNavigate: (view: AppView) => void;
}

function MainLayout({ children, activeView, onNavigate }: MainLayoutProps) {
  return (
    <div className="flex h-screen bg-hub-gray-50 font-sans">
      <Sidebar activeView={activeView} onNavigate={onNavigate} />
      {/* The main content area now has responsive padding */}
      <main className="flex-1 overflow-y-auto p-4 lg:p-8">
        {children}
      </main>
    </div>
  );
}

export default MainLayout;