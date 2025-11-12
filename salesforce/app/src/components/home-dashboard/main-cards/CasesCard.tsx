import Card, { EmptyState } from "./Card";
import { TbBriefcase2Filled } from "react-icons/tb";
import { useAppContext } from "@/context/AppProvider";
import { CaseEmptyState } from "@/components/resources/svgs";

interface CasesCardProps {
  slotIndex: number;
}

export default function CasesCard({ slotIndex }: CasesCardProps) {
  const { openNewCaseDialog } = useAppContext();

  return (
    <Card
      Icon={TbBriefcase2Filled}
      iconBgColor="bg-pink-500"
      searchPlaceholder="All New Cases By Priority"
      hasNewButton={true}
      hasDropdown={true}
      hasViewTable={false}
      slotIndex={slotIndex}
      onNewClick={openNewCaseDialog}
    >
      <EmptyState
        Icon={CaseEmptyState}
        text="Tackle service issues when cases come in."
      />
    </Card>
  );
}
