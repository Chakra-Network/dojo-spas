import { useState } from "react";
import RawExpandedBanner from "./ExpandedBanner";
import RawCollapsedBanner from "./CollapsedBanner";

export default function WelcomeBanner() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [dismissedCards, setDismissedCards] = useState<string[]>([]);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const handleDismissCard = (cardId: string) => {
    setDismissedCards([...dismissedCards, cardId]);
  };

  return (
    <div>
      {isExpanded ? (
        <RawExpandedBanner
          onToggle={handleToggle}
          onDismissCard={handleDismissCard}
          dismissedCards={dismissedCards}
        />
      ) : (
        <RawCollapsedBanner onToggle={handleToggle} />
      )}
    </div>
  );
}
