import { useAppContext } from "@/context/AppProvider";
import { cn } from "@/lib/utils";
import EditView from "./EditView";
import { NormalView } from "./NormalView";

export default function CaseDetailsPanel() {
  const { activeTab, getCase, updateCase } = useAppContext();
  const isEditDetails = activeTab?.isEditDetails || false;

  const data = activeTab?.dataId ? getCase(activeTab.dataId) : undefined;

  return (
    <div
      className={cn(
        "bg-white rounded-[20px] shadow-[0_0_15px_rgba(0,0,0,0.1)]",
        !isEditDetails && "space-y-3 p-3"
      )}
    >
      {!isEditDetails ? (
        <NormalView data={data} />
      ) : (
        <EditView data={data} updateData={updateCase} />
      )}
    </div>
  );
}
