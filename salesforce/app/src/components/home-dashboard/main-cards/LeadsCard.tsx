import { IoIosStar } from "react-icons/io";
import Card, { EmptyState } from "./Card";
import { useAppContext } from "@/context/AppProvider";
import { PATH_PREFIX } from "@/lib/consts";

export default function LeadsCard() {
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
      onNewClick={handleNewClick}
    >
      <EmptyState
        src={`${PATH_PREFIX}/svgs/LeadEmptyState.svg`}
        text="Track progress as you qualify leads."
      />
    </Card>
  );
}
