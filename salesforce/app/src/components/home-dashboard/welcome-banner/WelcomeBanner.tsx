import { useState } from "react";
import ExpandedBanner from "./ExpandedBanner";
import CollapsedBanner from "./CollapsedBanner";

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
        <ExpandedBanner
          onToggle={handleToggle}
          onDismissCard={handleDismissCard}
          dismissedCards={dismissedCards}
        />
      ) : (
        <CollapsedBanner onToggle={handleToggle} />
      )}
    </div>
  );
}
