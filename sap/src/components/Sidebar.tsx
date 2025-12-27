import { useDojoState } from '../dojo/state';
import type { ActiveView } from '../App';

interface SidebarProps {
  activeView: ActiveView;
  onNavigate: (view: ActiveView) => void;
}

const navItems: { id: ActiveView; label: string; icon: string }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: '📊' },
  { id: 'procurement', label: 'Procurement', icon: '🛒' },
  { id: 'tasks', label: 'Tasks Inbox', icon: '📋' },
  { id: 'audit', label: 'Audit Trail', icon: '📜' },
];

export default function Sidebar({ activeView, onNavigate }: SidebarProps) {
  const approvalTasks = useDojoState('approvalTasks');
  const pendingCount = approvalTasks.filter((t) => t.status === 'pending').length;

  return (
    <aside className="fixed left-0 top-0 h-screen w-56 bg-[#0f4c81] text-white flex flex-col">
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white/20 rounded flex items-center justify-center text-lg font-bold">
            S
          </div>
          <div>
            <div className="font-semibold text-sm">SAP ERP</div>
            <div className="text-xs text-white/60">Mock System</div>
          </div>
        </div>
      </div>

      <nav className="flex-1 py-4">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`w-full px-4 py-3 flex items-center gap-3 text-left text-sm transition-colors ${
              activeView === item.id
                ? 'bg-white/20 border-l-4 border-white'
                : 'hover:bg-white/10 border-l-4 border-transparent'
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            <span>{item.label}</span>
            {item.id === 'tasks' && pendingCount > 0 && (
              <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                {pendingCount}
              </span>
            )}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-white/10 text-xs text-white/60">
        <div>Dojo Training Environment</div>
        <div className="mt-1">v1.0.0</div>
      </div>
    </aside>
  );
}
