import Card, { EmptyState } from "./Card";
import { TbBriefcase2Filled } from "react-icons/tb";
import { PATH_PREFIX } from "@/lib/consts";
import { useAppContext } from "@/context/AppProvider";

export default function CasesCard() {
  const { openNewCaseDialog } = useAppContext();

  return (
    <Card
      Icon={TbBriefcase2Filled}
      iconBgColor="bg-pink-500"
      searchPlaceholder="All New Cases By Priority"
      hasNewButton={true}
      hasDropdown={true}
      onNewClick={openNewCaseDialog}
    >
      <EmptyState
        src={`${PATH_PREFIX}/svgs/CaseEmptyState.svg`}
        text="Tackle service issues when cases come in."
      />
    </Card>
  );
}
