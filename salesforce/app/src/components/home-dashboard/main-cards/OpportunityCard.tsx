import Card, { EmptyState } from "./Card";
import { FaCrown } from "react-icons/fa";
import { PATH_PREFIX } from "@/lib/consts";
import { useAppContext } from "@/context/AppProvider";

export default function OpportunityCard() {
  const { openNewOpportunityDialog } = useAppContext();

  const handleNewClick = () => {
    openNewOpportunityDialog();
  };

  return (
    <Card
      Icon={FaCrown}
      iconBgColor="bg-orange-500"
      searchPlaceholder="My Opportunities"
      hasNewButton={true}
      hasDropdown={true}
      onNewClick={handleNewClick}
    >
      <EmptyState
        src={`${PATH_PREFIX}/svgs/OpportunityEmptyState.svg`}
        text="View your deals to keep them moving."
      />
    </Card>
  );
}
