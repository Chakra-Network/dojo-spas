import { X } from "lucide-react";
import type { BannerCardType } from "@/lib/types";
import { cn } from "@/lib/utils";

export default function BannerCard({
  card,
  onDismissCard,
}: {
  card: BannerCardType;
  onDismissCard: (id: string) => void;
}) {
  return (
    <li className="flex p-2">
      <div className="flex bg-white rounded-[20px] shadow-sm flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-2">
          <div
            className="flex-1 min-w-0 cursor-pointer rounded"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                // Handle card click action
              }
            }}
          >
            {/* Icon - Show only on medium+ screens */}

            <div className="hidden md:block">
              {card.icon.bgColor ? (
                <div
                  className={`w-8 h-8 rounded-full ${card.icon.bgColor} flex items-center justify-center`}
                >
                  <card.icon.Icon
                    className={cn("w-5 h-5", card.icon.iconColor)}
                  />
                </div>
              ) : (
                <card.icon.Icon
                  className={cn("w-8 h-8", card.icon.iconColor)}
                />
              )}
            </div>

            {/* Title and Description */}
            <div className="flex flex-col pt-6 pb-4">
              <div className="text-blue-700 flex items-center gap-1">
                <span className="font-light text-xl leading-[30px]">
                  {card.title}
                </span>
                {/* {card.hasExternalLink && (
                  <ExternalLink className="w-[14px] h-[14px] flex-shrink-0 mt-1" />
                )} */}
              </div>
              <p className="text-sm leading-[21px] text-gray-600 mt-1">
                {card.description}
              </p>
            </div>
          </div>

          {/* Dismiss Button */}
          <button
            onClick={() => onDismissCard(card.id)}
            className="p-[1px] hover:bg-gray-100 rounded transition-colors flex-shrink-0 cursor-pointer"
            title="Dismiss this suggestion"
            aria-label={`Dismiss ${card.title}`}
          >
            <X className="w-6 h-6 text-blue-700" />
            <span className="sr-only">Dismiss this suggestion</span>
          </button>
        </div>
      </div>
    </li>
  );
}
