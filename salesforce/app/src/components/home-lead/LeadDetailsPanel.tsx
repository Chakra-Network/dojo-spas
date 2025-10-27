import { useAppContext } from "@/context/AppProvider";
import { cn } from "@/lib/utils";
import EditView from "@/components/common/details-panel/EditView";
import { NormalView } from "@/components/common/details-panel/NormalView";

export default function LeadDetailsPanel() {
  const { activeTab, getLead, updateLead } = useAppContext();
  const isEditDetails = activeTab?.isEditDetails || false;

  const data = activeTab?.dataId ? getLead(activeTab.dataId) : undefined;

  return (
    <div
      className={cn(
        " bg-white rounded-[20px] shadow-[0_0_15px_rgba(0,0,0,0.1)]",
        !isEditDetails && "space-y-3 p-3"
      )}
    >
      {!isEditDetails ? (
        <NormalView type="lead" data={data} />
      ) : (
        <EditView type="lead" data={data} updateData={updateLead} />
      )}
    </div>
  );
}
