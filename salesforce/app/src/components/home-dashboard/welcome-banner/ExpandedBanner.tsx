import { ChevronDown } from "lucide-react";
import BannerCard from "./BannerCard";
import { EasyEmptySpotlight } from "@/components/resources/svgs";
import { cn } from "@/lib/utils";
import type { BannerCardType } from "@/lib/types";

interface ExpandedBannerProps {
  onToggle: () => void;
  onDismissCard: (cardId: string) => void;
  visibleCards: BannerCardType[];
}

export default function ExpandedBanner({
  onToggle,
  onDismissCard,
  visibleCards,
}: ExpandedBannerProps) {
  return (
    <article
      className={cn(
        " rounded-[20px] shadow-lg border border-gray-200 p-6 transition-colors duration-300",
        visibleCards.length === 0 ? "bg-white" : "bg-[#EEF4FF]"
      )}
    >
      {/* Header Section */}
      <div className="flex items-start justify-between">
        {/* Mobile Title (hidden on medium+) */}
        <div className="md:hidden flex-1">
          <h2 className="text-2xl font-semibold text-gray-800 mb-1">
            Welcome, Dzaka
          </h2>
          {visibleCards.length > 0 && (
            <h3 className="text-sm text-gray-600">
              Check out these suggestions to kick off your day.
            </h3>
          )}
        </div>

        {/* Collapse Button */}
        <div className="h-[19.5px]">
          <button
            onClick={onToggle}
            className="h-4 w-4 flex items-center justify-center hover:bg-white/50 transition-colors cursor-pointer"
            title="Hide suggestions"
            aria-expanded="true"
          >
            <ChevronDown className="w-4 h-4 text-gray-600" />
            <span className="sr-only">Hide suggestions</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row gap-6 md:items-center">
        {/* Left Section - Title and View All Button (hidden on mobile, shown on medium+) */}
        <div className="hidden md:flex md:flex-col md:w-2/5 lg:w-1/3">
          <div className="py-8">
            <h2 className="text-[32px] leading-[48px] font-light text-gray-800">
              Welcome, Dzaka
            </h2>
            {visibleCards.length > 0 && (
              <h3 className="text-base text-gray-600">
                Check out these suggestions to kick off your day.
              </h3>
            )}
          </div>
          <button className="text-[#0176D3] hover:text-[#014486] text-[13px] h-8 items-center justify-center font-semibold text-left focus:outline-none rounded cursor-pointer">
            View All Cards
          </button>
        </div>

        {/* Right Section - Cards Grid */}
        <div className="flex-1">
          {visibleCards.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center pb-8 text-gray-500">
              <EasyEmptySpotlight className="w-auto h-[147px] mb-4" />
              <p className="">
                We'll show suggestions for you here based on actions you take.
              </p>
            </div>
          ) : (
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {visibleCards.map((card) => {
                return (
                  <BannerCard
                    key={card.id}
                    card={card}
                    onDismissCard={onDismissCard}
                  />
                );
              })}
            </ul>
          )}

          {/* View All Button for mobile */}
          {visibleCards.length > 0 && (
            <div className="md:hidden mt-4 text-center">
              <button className="text-[#0176D3] hover:underline text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-2 py-1">
                View All Cards
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
