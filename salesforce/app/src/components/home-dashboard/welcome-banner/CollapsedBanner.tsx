import { ChevronRight } from "lucide-react";

interface CollapsedBannerProps {
  onToggle: () => void;
}

export default function CollapsedBanner({ onToggle }: CollapsedBannerProps) {
  return (
    <article className="bg-[#EEF4FF] rounded-[20px] shadow-sm border border-gray-200">
      <header className="p-6">
        <div className="flex items-center gap-3">
          <button
            onClick={onToggle}
            className="h-4 w-4 flex items-center justify-center hover:bg-gray-100 rounded transition-colors cursor-pointer"
            title="Show suggestions"
            aria-expanded="false"
          >
            <ChevronRight className="w-4 h-4 text-gray-600" />
            <span className="sr-only">Show suggestions</span>
          </button>
          <div className="text-base text-gray-700 font-semibold h-8 flex items-center">
            Psst! You have more to discover here. 🌟
          </div>
        </div>
      </header>
    </article>
  );
}
