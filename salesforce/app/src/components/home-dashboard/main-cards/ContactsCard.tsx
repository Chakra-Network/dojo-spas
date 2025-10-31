import Card, { EmptyState } from "./Card";
import { BiSolidIdCard } from "react-icons/bi";
import { useAppContext } from "@/context/AppProvider";
import { ContactEmptyState } from "@/components/resources/svgs";

interface ContactsCardProps {
  slotIndex: number;
}

export default function ContactsCard({ slotIndex }: ContactsCardProps) {
  const { openNewContactDialog } = useAppContext();

  return (
    <Card
      Icon={BiSolidIdCard}
      iconBgColor="bg-purple-500"
      searchPlaceholder="My Contacts"
      hasNewButton={true}
      hasDropdown={true}
      hasViewTable={false}
      slotIndex={slotIndex}
      onNewClick={openNewContactDialog}
    >
      <EmptyState
        Icon={ContactEmptyState}
        text="Add contacts and see who is new."
      />
    </Card>
  );
}
