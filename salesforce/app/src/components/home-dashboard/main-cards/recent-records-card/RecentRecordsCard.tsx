import { useMemo } from "react";
import Card from "../Card";
import { EasyHomeEmptyTasks } from "@/components/resources/svgs";
import { useAppContext } from "@/context/AppProvider";
import { IoIosStar } from "react-icons/io";
import { FaCrown } from "react-icons/fa";
import { BiSolidIdCard } from "react-icons/bi";
import { TbBriefcase2Filled } from "react-icons/tb";
import type { RecordItem } from "@/lib/types";
import RecordItemComponent from "./RecordItemComponent";

interface RecentRecordsCardProps {
  slotIndex: number;
}

export default function RecentRecordsCard({
  slotIndex,
}: RecentRecordsCardProps) {
  const { state } = useAppContext();

  const recentRecords = useMemo(() => {
    // Combine all records into a single array with type information
    const allRecords: RecordItem[] = [
      ...state.leads.map((lead) => ({
        id: lead.id,
        name: lead.name,
        type: "Lead" as const,
        updatedAt: lead.updatedAt,
        icon: IoIosStar,
        iconBgColor: "bg-blue-500",
        originalData: lead,
      })),
      ...state.contacts.map((contact) => ({
        id: contact.id,
        name: contact.name,
        type: "Contact" as const,
        updatedAt: contact.updatedAt,
        icon: BiSolidIdCard,
        iconBgColor: "bg-purple-500",
        originalData: contact,
      })),
      ...state.opportunities.map((opportunity) => ({
        id: opportunity.id,
        name: opportunity.opportunityName,
        type: "Opportunity" as const,
        updatedAt: opportunity.updatedAt,
        icon: FaCrown,
        iconBgColor: "bg-orange-500",
        originalData: opportunity,
      })),
      ...state.cases.map((caseItem) => ({
        id: caseItem.id,
        name: caseItem.subject || caseItem.id,
        type: "Case" as const,
        updatedAt: caseItem.updatedAt,
        icon: TbBriefcase2Filled,
        iconBgColor: "bg-pink-500",
        originalData: caseItem,
      })),
    ];

    // Sort by updatedAt descending (latest first)
    allRecords.sort((a, b) => b.updatedAt - a.updatedAt);

    // Return top 5
    return allRecords.slice(0, 5);
  }, [state.leads, state.contacts, state.opportunities, state.cases]);

  const onClickViewAll = () => {
    if (recentRecords.length > 0) {
      return () => {
        console.log("View All clicked");
      };
    }
    return undefined;
  };

  return (
    <Card
      title="Recent Records"
      hasDropdown={true}
      hasViewTable={false}
      slotIndex={slotIndex}
      viewReportText=""
      onClickViewAll={onClickViewAll()}
    >
      {recentRecords.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-12">
          <EasyHomeEmptyTasks className="w-auto h-[142px] mb-3" />
          <p className="text-[13px] leading-[19.5px] text-gray-600 text-center">
            After you view you leads, contacts, or other records, access them
            easily here.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-6 pt-3">
          {recentRecords.map((record) => {
            return <RecordItemComponent key={record.id} record={record} />;
          })}
        </div>
      )}
    </Card>
  );
}
