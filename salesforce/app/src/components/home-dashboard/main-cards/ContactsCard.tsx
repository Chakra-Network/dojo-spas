import Card, { EmptyState } from "./Card";
import { BiSolidIdCard } from "react-icons/bi";
import { useAppContext } from "@/context/AppProvider";
import { ContactEmptyState } from "@/components/resources/svgs";

export default function ContactsCard() {
  const { openNewContactDialog } = useAppContext();

  return (
    <Card
      Icon={BiSolidIdCard}
      iconBgColor="bg-purple-500"
      searchPlaceholder="My Contacts"
      hasNewButton={true}
      hasDropdown={true}
      onNewClick={openNewContactDialog}
    >
      <EmptyState
        Icon={ContactEmptyState}
        text="Add contacts and see who is new."
      />
    </Card>
  );
}
