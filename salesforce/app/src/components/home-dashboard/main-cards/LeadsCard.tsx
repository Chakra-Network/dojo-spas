import { IoIosStar } from "react-icons/io";
import Card, { EmptyState } from "./Card";
import { useAppContext } from "@/context/AppProvider";
import { LeadEmptyState } from "@/components/resources/svgs";

interface LeadsCardProps {
  slotIndex: number;
}

export default function LeadsCard({ slotIndex }: LeadsCardProps) {
  const { openNewLeadDialog } = useAppContext();

  const handleNewClick = () => {
    openNewLeadDialog();
  };

  return (
    <Card
      Icon={IoIosStar}
      iconBgColor="bg-blue-500"
      searchPlaceholder="My Leads"
      hasNewButton={true}
      hasDropdown={true}
      hasViewTable={true}
      slotIndex={slotIndex}
      onNewClick={handleNewClick}
    >
      <EmptyState
        Icon={LeadEmptyState}
        text="Track progress as you qualify leads."
      />
    </Card>
  );
}
