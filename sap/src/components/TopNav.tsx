import type { ActiveView } from '../App';

interface TopNavProps {
  searchQuery: string;
  onSearch: (query: string) => void;
  activeView: ActiveView;
}

const viewTitles: Record<ActiveView, string> = {
  dashboard: 'Dashboard',
  procurement: 'Procurement',
  tasks: 'Tasks Inbox',
  audit: 'Audit Trail',
};

export default function TopNav({ searchQuery, onSearch, activeView }: TopNavProps) {
  return (
    <header className="fixed top-0 left-56 right-0 h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 z-10">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-semibold text-gray-800">{viewTitles[activeView]}</h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search POs, tasks, vendors..."
            className="w-64 px-4 py-2 pl-10 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0f4c81]/20 focus:border-[#0f4c81]"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
        </div>

        <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
          🔔
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <div className="flex items-center gap-2 pl-4 border-l border-gray-200">
          <div className="w-8 h-8 bg-[#0f4c81] text-white rounded-full flex items-center justify-center text-sm font-medium">
            JD
          </div>
          <div className="text-sm">
            <div className="font-medium text-gray-800">John Doe</div>
            <div className="text-xs text-gray-500">Approver</div>
          </div>
        </div>
      </div>
    </header>
  );
}
