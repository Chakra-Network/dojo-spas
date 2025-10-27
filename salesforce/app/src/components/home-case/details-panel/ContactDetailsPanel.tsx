import { useAppContext } from "@/context/AppProvider";
import DetailField from "@/components/common/details-panel/DetailField";
import { BiSolidIdCard } from "react-icons/bi";
import CommonPanelHeader from "@/components/common/header/CommonPanelHeader";
import { FieldWrapper } from "@/components/common/details-panel/SectionLayout";

export default function ContactDetailsPanel() {
  const { activeTab, getCase } = useAppContext();

  const caseData = activeTab?.dataId ? getCase(activeTab.dataId) : undefined;

  return (
    <div className="bg-white rounded-[20px] shadow-[0_0_15px_rgba(0,0,0,0.1)]">
      <CommonPanelHeader
        icon={{ Icon: BiSolidIdCard, bg: "bg-purple-500" }}
        title="Contact Details"
      />
      <div className="pt-3 pr-3 pl-4 pb-9 flex flex-col">
        <FieldWrapper>
          <DetailField label="Name" value={caseData?.contactName || ""} />
        </FieldWrapper>
        <div className="grid grid-cols-2 ">
          <FieldWrapper>
            <DetailField label="Title" value="--" />
          </FieldWrapper>
          <FieldWrapper>
            <DetailField label="Email" value="--" />
          </FieldWrapper>
          <FieldWrapper>
            <DetailField
              label="Account Name"
              value={caseData?.accountName || ""}
            />
          </FieldWrapper>
          <FieldWrapper>
            <DetailField label="Phone" value="--" />
          </FieldWrapper>
        </div>
      </div>
    </div>
  );
}
