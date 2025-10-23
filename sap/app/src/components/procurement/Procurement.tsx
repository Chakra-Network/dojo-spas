import { useAppContext } from "@/context/AppProvider";
import POFilters from "./POFilters";
import POList from "./POList";
import PODetail from "./PODetail";

export default function Procurement() {
  const { getFilteredPOs } = useAppContext();
  const filteredPOs = getFilteredPOs();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Procurement</h1>
        <p className="text-gray-600 mt-1">
          Manage purchase orders and procurement workflows
        </p>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-3">
          <POFilters />
        </div>

        <div className="col-span-4">
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-gray-900">
                Purchase Orders ({filteredPOs.length})
              </h2>
            </div>
            <div className="max-h-[calc(100vh-280px)] overflow-y-auto pr-2">
              <POList />
            </div>
          </div>
        </div>

        <div className="col-span-5">
          <div className="max-h-[calc(100vh-280px)] overflow-y-auto">
            <PODetail />
          </div>
        </div>
      </div>
    </div>
  );
}

