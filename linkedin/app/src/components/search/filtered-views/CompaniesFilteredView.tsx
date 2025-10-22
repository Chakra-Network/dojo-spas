import { useApp } from "@/contexts/AppContext";
import { IoThumbsUpOutline, IoThumbsDownOutline } from "react-icons/io5";
import NoResultsView from "./NoResultsView";
import Button from "@/components/ui/button";

export default function CompaniesFilteredView() {
  const {
    searchResults: { allCompanies: companies, totalCompanies: totalCount },
    navigateToProfile,
  } = useApp();

  if (companies.length === 0) {
    return <NoResultsView />;
  }

  return (
    <div className="flex-1 flex flex-col gap-4">
      {/* Result count */}
      <p className="text-[14px] text-gray-600">{totalCount} results</p>

      {/* Companies list */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="p-4">
          {companies.map((company, index) => (
            <div
              key={company.id}
              className={`flex items-start gap-3 py-4 ${
                index !== companies.length - 1 ? "border-b border-gray-200" : ""
              }`}
              onClick={() => navigateToProfile(company.id)}
            >
              <img
                src={company.avatar}
                alt={company.name}
                className="w-14 h-14 rounded flex-shrink-0 object-cover"
              />
              <div className="flex-1 min-w-0">
                <h3 className="text-[14px] font-semibold text-gray-900 hover:underline cursor-pointer">
                  {company.name}
                </h3>
                <p className="text-[14px] text-gray-600 mt-1">
                  {company.company || "Business Consulting and Services"} •{" "}
                  {company.location}
                </p>
                <p className="text-[12px] text-gray-600 mt-1">
                  {company.connectionCount || 460} followers
                </p>
                {company.about && (
                  <p className="text-[14px] text-gray-900 mt-2">
                    {company.about.split(".")[0]}.
                  </p>
                )}
              </div>
              <Button variant="secondary">Follow</Button>
            </div>
          ))}
        </div>
      </div>

      {/* Feedback section */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-[16px] font-semibold text-gray-900 mb-1">
              Are these results helpful?
            </h3>
            <p className="text-[14px] text-gray-600">
              Your feedback helps us improve search results
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-3 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors cursor-pointer">
              <IoThumbsUpOutline className="text-[24px] text-gray-700" />
            </button>
            <button className="p-3 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors cursor-pointer">
              <IoThumbsDownOutline className="text-[24px] text-gray-700" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
