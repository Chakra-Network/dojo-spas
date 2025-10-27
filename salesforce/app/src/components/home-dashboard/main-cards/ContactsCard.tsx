import Card, { EmptyState } from "./Card";
import { BiSolidIdCard } from "react-icons/bi";
import { PATH_PREFIX } from "@/lib/consts";
import { useAppContext } from "@/context/AppProvider";

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
        src={`${PATH_PREFIX}/svgs/ContactEmptyState.svg`}
        text="Add contacts and see who is new."
      />
    </Card>
  );
}
