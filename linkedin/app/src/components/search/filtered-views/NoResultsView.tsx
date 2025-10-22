import Button from "@/components/ui/button";

export default function NoResultsView() {
  return (
    <div className="flex-1">
      <div className="bg-white rounded-lg border border-gray-200 text-center pb-[72px]">
        {/* Empty state illustration */}
        <div className="flex justify-center">
          <svg
            width="120"
            height="160"
            viewBox="0 0 120 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="60" cy="60" r="60" fill="#F3F2EF" />
            <rect x="35" y="45" width="50" height="40" rx="4" fill="#BDBDBD" />
            <rect x="42" y="52" width="36" height="4" rx="2" fill="white" />
            <rect x="42" y="60" width="28" height="4" rx="2" fill="white" />
            <rect x="42" y="68" width="32" height="4" rx="2" fill="white" />
          </svg>
        </div>

        <h2 className="text-[24px] leading-[32px] font-semibold text-gray-900 mb-2">
          No results found
        </h2>
        <p className="text-[16px] leading-[24px] text-gray-600 mb-6">
          Try rephrasing your search.
        </p>
        <Button variant="outline" className="mx-auto">
          Edit search
        </Button>
      </div>
    </div>
  );
}
