import Card, { EmptyState } from "./Card";
import { EasyHomeEmptyTasks } from "@/components/resources/svgs";

export default function RecentRecordsCard() {
  return (
    <Card title="Recent Records" hasDropdown={true} viewReportText="">
      <EmptyState
        Icon={EasyHomeEmptyTasks}
        text="After you view you leads, contacts, or other records, access them easily here."
      />
    </Card>
  );
}
