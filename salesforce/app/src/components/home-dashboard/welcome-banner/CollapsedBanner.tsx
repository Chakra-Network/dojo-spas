import { ChevronRight } from "lucide-react";
import type { BannerCardType } from "@/lib/types";
import { cn } from "@/lib/utils";

interface CollapsedBannerProps {
  onToggle: () => void;
  visibleCards: BannerCardType[];
}

export default function CollapsedBanner({
  onToggle,
  visibleCards,
}: CollapsedBannerProps) {
  return (
    <article
      className={cn(
        "rounded-[20px] shadow-sm border border-gray-200",
        visibleCards.length === 0 ? "bg-white" : "bg-[#EEF4FF]"
      )}
    >
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
            {visibleCards.length > 0
              ? "Psst! You have more to discover here. 🌟"
              : "You're caught up for now. 🎉"}
          </div>
        </div>
      </header>
    </article>
  );
}
