import Card, { EmptyState } from "./Card";
import { PATH_PREFIX } from "@/lib/consts";

export default function RecentRecordsCard() {
  return (
    <Card title="Recent Records" hasDropdown={true} viewReportText="">
      <EmptyState
        src={`${PATH_PREFIX}/svgs/easyHomeEmptyTasks.svg`}
        text="After you view you leads, contacts, or other records, access them easily here."
      />
    </Card>
  );
}
