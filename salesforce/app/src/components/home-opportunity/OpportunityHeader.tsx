import CommonHeader from "@/components/common/header/CommonHeader";
import {
  PillButtonIconItem,
  PillButtonItem,
  PillButtonLayout,
} from "@/components/common/SmallButtons";
import { FaChevronDown, FaCrown } from "react-icons/fa";
import { VscTriangleDown } from "react-icons/vsc";
import { useAppContext } from "@/context/AppProvider";
import type { OpportunityStage } from "@/lib/types";
import { useState, useEffect, useCallback } from "react";
import StatusPathBar, {
  StatusPathBarContainer,
} from "@/components/common/header/StatusPathBar";
import GuidanceForSuccess from "./GuidanceForSuccess";
import { FaChevronRight } from "react-icons/fa6";

// Display statuses - combine Closed Won/Lost into "Closed"
const DISPLAY_STATUSES: (
  | "Qualify"
  | "Meet & Present"
  | "Propose"
  | "Negotiate"
  | "Closed"
)[] = ["Qualify", "Meet & Present", "Propose", "Negotiate", "Closed"];

type DisplayStatus =
  | "Qualify"
  | "Meet & Present"
  | "Propose"
  | "Negotiate"
  | "Closed";

export default function OpportunityHeader() {
  const {
    activeTab,
    getOpportunity,
    updateOpportunity,
    openCloseOpportunityDialog,
  } = useAppContext();

  // Get opportunity data and status from context
  const opportunityData = activeTab?.dataId
    ? getOpportunity(activeTab.dataId)
    : undefined;
  const actualStage: OpportunityStage = opportunityData?.stage || "Qualify";

  // Check if currently closed
  const isClosed =
    actualStage === "Closed Won" || actualStage === "Closed Lost";

  // Map actual stage to display status (for logic comparison)
  const contextStatus: DisplayStatus = isClosed
    ? "Closed"
    : (actualStage as DisplayStatus);

  // Get display text for closed stages
  const currentStatusDisplayText = isClosed ? actualStage : undefined;

  // Local state for selected status
  const [selectedStatus, setSelectedStatus] =
    useState<DisplayStatus>(contextStatus);

  // State for toggling guidance visibility
  const [showGuidance, setShowGuidance] = useState(false);

  // Update selected status when context status changes
  useEffect(() => {
    setSelectedStatus(contextStatus);
  }, [contextStatus]);

  const handleStatusSelect = (status: DisplayStatus) => {
    setSelectedStatus(status);
  };

  const handleMarkAsComplete = useCallback(() => {
    if (!activeTab?.dataId) return;

    // If selecting current status, move to next stage
    if (selectedStatus === contextStatus) {
      const currentIndex = DISPLAY_STATUSES.indexOf(contextStatus);

      // If on "Negotiate" (second-to-last), open dialog
      if (contextStatus === "Negotiate" || contextStatus === "Closed") {
        openCloseOpportunityDialog(activeTab.dataId);
        return;
      }

      // Otherwise, move to next stage
      if (currentIndex < DISPLAY_STATUSES.length - 1) {
        const nextStatus = DISPLAY_STATUSES[currentIndex + 1];
        updateOpportunity(activeTab.dataId, {
          stage: nextStatus as OpportunityStage,
        });
      }
    } else {
      // If selecting "Closed", open dialog
      if (selectedStatus === "Closed") {
        openCloseOpportunityDialog(activeTab.dataId);
      } else {
        // Normal status update
        updateOpportunity(activeTab.dataId, {
          stage: selectedStatus as OpportunityStage,
        });
      }
    }
  }, [
    selectedStatus,
    contextStatus,
    activeTab,
    updateOpportunity,
    openCloseOpportunityDialog,
  ]);

  // Determine button text
  const getMarkCompleteText = useCallback(() => {
    // If already closed, allow changing the closed stage
    if (isClosed && selectedStatus === "Closed") {
      return "Change Closed Stage";
    }
    if (selectedStatus === contextStatus && contextStatus !== "Closed") {
      return "Mark Stage as Complete";
    }
    if (selectedStatus === "Closed") {
      return "Select Closed Stage";
    }
    return `Mark as Current Stage`;
  }, [selectedStatus, contextStatus, isClosed]);

  // Map selected status to OpportunityStage for guidance
  const getGuidanceStage = useCallback((): OpportunityStage => {
    if (selectedStatus === "Closed") {
      return isClosed ? actualStage : "Closed Won";
    }
    return selectedStatus as OpportunityStage;
  }, [selectedStatus, isClosed, actualStage]);

  return (
    <div className="flex flex-col gap-3">
      <CommonHeader
        title="Opportunity"
        name={opportunityData?.opportunityName || ""}
        icon={{ Icon: FaCrown, bg: "bg-orange-500" }}
        rightButtons={<RightButtons />}
      />
      <StatusPathBarContainer className="flex-col items-start">
        <div className="flex w-full items-center gap-3">
          <PillButtonIconItem onClick={() => setShowGuidance(!showGuidance)}>
            {showGuidance ? (
              <FaChevronDown className="w-[14px] h-[14px]" />
            ) : (
              <FaChevronRight className="w-[14px] h-[14px]" />
            )}
          </PillButtonIconItem>
          <StatusPathBar
            statuses={DISPLAY_STATUSES}
            currentStatus={contextStatus}
            selectedStatus={selectedStatus}
            onStatusSelect={handleStatusSelect}
            onMarkComplete={handleMarkAsComplete}
            markCompleteText={getMarkCompleteText()}
            currentStatusDisplayText={currentStatusDisplayText}
          />
        </div>
        {showGuidance && <GuidanceForSuccess stage={getGuidanceStage()} />}
      </StatusPathBarContainer>
    </div>
  );
}

function RightButtons() {
  return (
    <PillButtonLayout>
      <PillButtonItem>New Event</PillButtonItem>
      <PillButtonItem>New Task</PillButtonItem>
      <PillButtonItem>Edit</PillButtonItem>
      <PillButtonItem className="w-8 p-0" isLastItem>
        <VscTriangleDown className="w-[14px] h-[14px]" />
      </PillButtonItem>
    </PillButtonLayout>
  );
}
