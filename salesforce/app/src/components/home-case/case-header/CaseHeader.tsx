import CommonHeader from "@/components/common/header/CommonHeader";
import {
  PillButtonIconItem,
  PillButtonItem,
  PillButtonLayout,
} from "@/components/common/SmallButtons";
import { TbBriefcase2Filled } from "react-icons/tb";
import { VscTriangleDown } from "react-icons/vsc";
import { useAppContext } from "@/context/AppProvider";
import type { CaseStatus } from "@/lib/types";
import { useState, useEffect } from "react";
import StatusPathBar, {
  StatusPathBarContainer,
} from "@/components/common/header/StatusPathBar";
import { FaChevronDown, FaChevronRight } from "react-icons/fa6";
import KeyFieldsAndGuidance from "./KeyFieldsAndGuidance";

const STATUSES: CaseStatus[] = [
  "New",
  "Working",
  "Waiting on Customer",
  "Escalated",
  "Closed",
];

export default function CaseHeader() {
  const { activeTab, getCase, updateCase } = useAppContext();

  // Get case data and status from context
  const caseData = activeTab?.dataId ? getCase(activeTab.dataId) : undefined;
  const contextStatus: CaseStatus = caseData?.status || "New";

  // Local state for selected status
  const [selectedStatus, setSelectedStatus] =
    useState<CaseStatus>(contextStatus);

  // State for toggling key fields and guidance visibility
  const [showKeyFieldsAndGuidance, setShowKeyFieldsAndGuidance] =
    useState(true);

  // Update selected status when context status changes
  useEffect(() => {
    setSelectedStatus(contextStatus);
  }, [contextStatus]);

  const handleStatusSelect = (status: CaseStatus) => {
    setSelectedStatus(status);
  };

  const handleMarkAsComplete = () => {
    if (!activeTab?.dataId) return;

    // If selecting current status, move to next stage
    if (selectedStatus === contextStatus) {
      const currentIndex = STATUSES.indexOf(contextStatus);

      // Otherwise, move to next stage
      if (currentIndex < STATUSES.length - 1) {
        const nextStatus = STATUSES[currentIndex + 1];
        updateCase(activeTab.dataId, { status: nextStatus });
      }
    } else {
      // Normal status update
      updateCase(activeTab.dataId, { status: selectedStatus });
    }
  };

  // Determine button text
  const getMarkCompleteText = () => {
    if (selectedStatus === contextStatus && contextStatus !== "Closed") {
      return "Mark Status as Complete";
    }
    return `Mark as Current Status`;
  };

  return (
    <div className="flex flex-col gap-3">
      <CommonHeader
        title="Case"
        name={caseData?.id || ""}
        icon={{ Icon: TbBriefcase2Filled, bg: "bg-pink-500" }}
        rightButtons={<RightButtons />}
      />
      <StatusPathBarContainer className="flex-col items-start">
        <div className="flex w-full items-center gap-3">
          <PillButtonIconItem
            onClick={() =>
              setShowKeyFieldsAndGuidance(!showKeyFieldsAndGuidance)
            }
          >
            {showKeyFieldsAndGuidance ? (
              <FaChevronDown className="w-[14px] h-[14px]" />
            ) : (
              <FaChevronRight className="w-[14px] h-[14px]" />
            )}
          </PillButtonIconItem>
          <StatusPathBar
            statuses={STATUSES}
            currentStatus={contextStatus}
            selectedStatus={selectedStatus}
            onStatusSelect={handleStatusSelect}
            onMarkComplete={handleMarkAsComplete}
            markCompleteText={getMarkCompleteText()}
          />
        </div>
        {showKeyFieldsAndGuidance && (
          <KeyFieldsAndGuidance selectedStatus={selectedStatus} />
        )}
      </StatusPathBarContainer>
    </div>
  );
}

function RightButtons() {
  return (
    <PillButtonLayout>
      <PillButtonItem>Edit</PillButtonItem>
      <PillButtonItem>Close Case</PillButtonItem>
      <PillButtonItem>Merge Cases</PillButtonItem>
      <PillButtonItem className="w-8 p-0" isLastItem>
        <VscTriangleDown className="w-[14px] h-[14px]" />
      </PillButtonItem>
    </PillButtonLayout>
  );
}
