import Card, { EmptyState } from "./Card";
import { EasyHomeEmptyTasks } from "@/components/resources/svgs";

interface RecentRecordsCardProps {
  slotIndex: number;
}

export default function RecentRecordsCard({ slotIndex }: RecentRecordsCardProps) {
  return (
    <Card 
      title="Recent Records" 
      hasDropdown={true} 
      hasViewTable={false}
      slotIndex={slotIndex}
      viewReportText=""
    >
      <EmptyState
        Icon={EasyHomeEmptyTasks}
        text="After you view you leads, contacts, or other records, access them easily here."
      />
    </Card>
  );
}
