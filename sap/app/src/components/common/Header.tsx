import { Search, Bell } from "lucide-react";
import { useAppContext } from "@/context/AppProvider";

export default function Header() {
  const { state, setSearchQuery, searchResults, setCurrentSection, selectPO } = useAppContext();
  const results = searchResults();
  const totalResults = results.pos.length + results.tasks.length;

  return (
    <header className="fixed top-0 left-64 right-0 h-16 bg-white border-b border-gray-200 flex items-center px-6 gap-4 z-10">
      <div className="flex-1 max-w-2xl relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={state.searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search purchase orders, tasks, vendors..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00a9e0] focus:border-transparent"
          />
        </div>
        
        {state.searchQuery && (
          <div className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-96 overflow-y-auto">
            {totalResults === 0 ? (
              <div className="p-4 text-sm text-gray-500 text-center">
                No results found for "{state.searchQuery}"
              </div>
            ) : (
              <>
                {results.pos.length > 0 && (
                  <div>
                    <div className="px-4 py-2 text-xs font-semibold text-gray-500 bg-gray-50 border-b">
                      Purchase Orders ({results.pos.length})
                    </div>
                    {results.pos.map((po) => (
                      <button
                        key={po.id}
                        onClick={() => {
                          setSearchQuery("");
                          setCurrentSection("procurement");
                          selectPO(po.id);
                        }}
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-0"
                      >
                        <div className="font-medium text-sm">{po.poNumber}</div>
                        <div className="text-xs text-gray-500 mt-1">{po.description}</div>
                      </button>
                    ))}
                  </div>
                )}
                
                {results.tasks.length > 0 && (
                  <div>
                    <div className="px-4 py-2 text-xs font-semibold text-gray-500 bg-gray-50 border-b">
                      Tasks ({results.tasks.length})
                    </div>
                    {results.tasks.map((task) => (
                      <button
                        key={task.id}
                        onClick={() => {
                          setSearchQuery("");
                          setCurrentSection("tasks");
                        }}
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-0"
                      >
                        <div className="font-medium text-sm">{task.title}</div>
                        <div className="text-xs text-gray-500 mt-1">{task.description}</div>
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>

      <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
        <Bell className="w-5 h-5 text-gray-600" />
        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
      </button>
    </header>
  );
}

