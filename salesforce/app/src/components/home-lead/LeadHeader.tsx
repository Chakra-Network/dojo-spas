import CommonHeader from "@/components/common/header/CommonHeader";
import {
  PillButtonItem,
  PillButtonLayout,
} from "@/components/common/SmallButtons";
import { IoIosStar } from "react-icons/io";
import { VscTriangleDown } from "react-icons/vsc";
import { useAppContext } from "@/context/AppProvider";
import type { LeadStatus } from "@/lib/types";
import { useState, useEffect } from "react";
import StatusPathBar, {
  StatusPathBarContainer,
} from "@/components/common/header/StatusPathBar";

const STATUSES: LeadStatus[] = [
  "New",
  "Contacted",
  "Nurturing",
  "Unqualified",
  "Converted",
];

export default function LeadHeader({ name }: { name: string }) {
  const { activeTab, getLead, updateTabLeadStatus, openConvertLeadDialog } =
    useAppContext();

  // Get lead data and status from context
  const leadData = activeTab?.dataId ? getLead(activeTab.dataId) : undefined;
  const contextStatus: LeadStatus = leadData?.leadStatus || "New";

  // Local state for selected status
  const [selectedStatus, setSelectedStatus] =
    useState<LeadStatus>(contextStatus);

  // Update selected status when context status changes
  useEffect(() => {
    setSelectedStatus(contextStatus);
  }, [contextStatus]);

  const handleStatusSelect = (status: LeadStatus) => {
    setSelectedStatus(status);
  };

  const handleMarkAsComplete = () => {
    if (selectedStatus === "Converted" && activeTab?.dataId) {
      // Open convert dialog instead of directly updating
      openConvertLeadDialog(activeTab.dataId);
    } else if (activeTab?.dataId) {
      // Normal status update
      updateTabLeadStatus(activeTab.dataId, selectedStatus);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <CommonHeader
        title="Lead"
        name={name}
        icon={{ Icon: IoIosStar, bg: "bg-teal-500" }}
        rightButtons={<RightButtons />}
      />
      <StatusPathBarContainer>
        <StatusPathBar
          statuses={STATUSES}
          currentStatus={contextStatus}
          selectedStatus={selectedStatus}
          onStatusSelect={handleStatusSelect}
          onMarkComplete={handleMarkAsComplete}
        />
      </StatusPathBarContainer>
    </div>
  );
}

function RightButtons() {
  return (
    <PillButtonLayout>
      <PillButtonItem>Convert</PillButtonItem>
      <PillButtonItem>Change Owner</PillButtonItem>
      <PillButtonItem>Edit</PillButtonItem>
      <PillButtonItem className="w-8 p-0" isLastItem>
        <VscTriangleDown className="w-[14px] h-[14px]" />
      </PillButtonItem>
    </PillButtonLayout>
  );
}
