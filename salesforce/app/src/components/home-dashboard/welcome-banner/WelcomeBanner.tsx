import ExpandedBanner from "./ExpandedBanner";
import CollapsedBanner from "./CollapsedBanner";
import { useAppContext } from "@/context/AppProvider";
import { CARDS } from "@/lib/consts";

export default function WelcomeBanner() {
  const { state, handleToggleWelcomeBanner, handleDismissCard } =
    useAppContext();

  const visibleCards = CARDS.filter(
    (card) => !state.dismissedCards.includes(card.id)
  );

  const handleToggle = () => {
    handleToggleWelcomeBanner();
  };

  return (
    <div>
      {state.isWelcomeBannerExpanded ? (
        <ExpandedBanner
          onToggle={handleToggle}
          onDismissCard={handleDismissCard}
          visibleCards={visibleCards}
        />
      ) : (
        <CollapsedBanner onToggle={handleToggle} visibleCards={visibleCards} />
      )}
    </div>
  );
}
