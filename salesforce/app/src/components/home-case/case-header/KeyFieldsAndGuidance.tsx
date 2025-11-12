import type { CaseStatus } from "@/lib/types";
import { CASE_GUIDANCE_CONTENT } from "@/lib/consts";
import { useState, useEffect } from "react";
import { CommonFormButton } from "@/components/common/SmallButtons";
import {
  PRIORITY_OPTIONS,
  CASE_REASON_OPTIONS,
} from "@/lib/consts/dropdown-options";
import { DetailInput, SubSectionTitle } from "@/components/common/InputItems";
import { KeyFieldsItem } from "@/components/common/details-panel/DetailField";
import { useAppContext } from "@/context/AppProvider";

export default function KeyFieldsAndGuidance({
  selectedStatus,
}: {
  selectedStatus: CaseStatus;
}) {
  return (
    <div className="grid grid-cols-2 w-full gap-3 pt-4">
      <KeyFieldsSection />
      <GuidanceForSuccess status={selectedStatus} />
    </div>
  );
}

function KeyFieldsSection() {
  const { activeTab, getCase, updateCase, openEditCaseDialog } =
    useAppContext();

  const caseData = activeTab?.dataId ? getCase(activeTab.dataId) : undefined;
  const [isEditMode, setIsEditMode] = useState(false);
  const [priority, setPriority] = useState(caseData?.priority || "Medium");
  const [caseReason, setCaseReason] = useState(
    caseData?.caseReason || "--None--"
  );

  // Update local state when caseData changes
  useEffect(() => {
    if (caseData) {
      setPriority(caseData.priority || "Medium");
      setCaseReason(caseData.caseReason || "--None--");
    }
  }, [caseData]);

  const handleSave = () => {
    if (activeTab?.dataId) {
      updateCase(activeTab.dataId, {
        priority,
        caseReason,
      });
      setIsEditMode(false);
    }
  };

  const handleCancel = () => {
    // Reset to original values from context
    if (caseData) {
      setPriority(caseData.priority || "Medium");
      setCaseReason(caseData.caseReason || "--None--");
    }
    setIsEditMode(false);
  };

  return (
    <div className="text-[13px] leading-[19.5px]">
      <div className="flex items-center justify-between text-[12px] leading-[13.5px] mb-4">
        <h3 className=" font-semibold text-gray-700 ">Key Fields</h3>
        <button
          className="font-bold text-blue-600 hover:text-blue-800 cursor-pointer"
          onClick={openEditCaseDialog}
        >
          Edit
        </button>
      </div>

      {isEditMode ? (
        <div className="flex flex-col">
          <KeyFieldsItem
            label="Case Owner"
            value={caseData?.caseOwner || "Dzaka Athif"}
            isBorder={false}
          />
          <div className="flex flex-col px-1 mb-2">
            <SubSectionTitle title="Priority" />
            <DetailInput
              value={priority}
              setValue={setPriority}
              type="select"
              options={PRIORITY_OPTIONS}
            />
          </div>
          <div className="flex flex-col px-1 mb-2">
            <SubSectionTitle title="Case Reason" />
            <DetailInput
              value={caseReason}
              setValue={setCaseReason}
              type="select"
              options={CASE_REASON_OPTIONS}
            />
          </div>
          <div className="flex justify-center gap-2 py-4">
            <CommonFormButton variant="secondary" onClick={handleCancel}>
              Cancel
            </CommonFormButton>
            <CommonFormButton variant="primary" onClick={handleSave}>
              Save
            </CommonFormButton>
          </div>
        </div>
      ) : (
        <div className="flex flex-col">
          <KeyFieldsItem
            label="Case Owner"
            value={caseData?.caseOwner || "Dzaka Athif"}
            isLink={true}
          />
          <KeyFieldsItem
            label="Priority"
            value={caseData?.priority || "Medium"}
            isEditable={true}
            toggleEditMode={() => setIsEditMode(true)}
          />
          <KeyFieldsItem
            label="Case Reason"
            value={caseData?.caseReason || "--"}
            isEditable={true}
            toggleEditMode={() => setIsEditMode(true)}
          />
        </div>
      )}
    </div>
  );
}

function GuidanceForSuccess({ status }: { status: CaseStatus }) {
  const content = CASE_GUIDANCE_CONTENT[status];

  return (
    <div className="text-[13px] leading-[19.5px]">
      <h3 className="text-[12px] leading-[13.5px] font-semibold text-gray-700 mb-5">
        Guidance for Success
      </h3>

      <ul className="text-gray-600 list-disc pl-5 space-y-1">
        {content.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
