import Card, { EmptyState } from "./Card";
import { FaCrown } from "react-icons/fa";
import { useAppContext } from "@/context/AppProvider";
import { OpportunityEmptyState } from "@/components/resources/svgs";

interface OpportunityCardProps {
  slotIndex: number;
}

export default function OpportunityCard({ slotIndex }: OpportunityCardProps) {
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
      hasViewTable={true}
      slotIndex={slotIndex}
      onNewClick={handleNewClick}
    >
      <EmptyState
        Icon={OpportunityEmptyState}
        text="View your deals to keep them moving."
      />
    </Card>
  );
}
