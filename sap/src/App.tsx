import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import TopNav from './components/TopNav';
import Dashboard from './components/Dashboard';
import Procurement from './components/Procurement';
import TasksInbox from './components/TasksInbox';
import AuditTrail from './components/AuditTrail';
import { useDojoState, dojo, initializeDojoState } from './dojo/state';

export type ActiveView = 'dashboard' | 'procurement' | 'tasks' | 'audit';

export default function App() {
  const [activeView, setActiveView] = useState<ActiveView>('dashboard');
  const [isInitialized, setIsInitialized] = useState(false);
  const searchQuery = useDojoState('searchQuery');

  useEffect(() => {
    initializeDojoState({});
    setIsInitialized(true);
  }, []);

  if (!isInitialized) return null;

  const handleSearch = (query: string) => {
    dojo.setState('searchQuery', query);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar activeView={activeView} onNavigate={setActiveView} />
      <TopNav searchQuery={searchQuery} onSearch={handleSearch} activeView={activeView} />
      <main className="ml-56 pt-16 p-6 min-h-screen">
        {activeView === 'dashboard' && <Dashboard />}
        {activeView === 'procurement' && <Procurement />}
        {activeView === 'tasks' && <TasksInbox />}
        {activeView === 'audit' && <AuditTrail />}
      </main>
    </div>
  );
}
