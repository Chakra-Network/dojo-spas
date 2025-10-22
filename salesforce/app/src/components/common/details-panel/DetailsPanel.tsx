import SectionLayout from "./SectionLayout";
import DetailField from "./DetailField";
import { useAppContext } from "@/context/AppProvider";
import { cn } from "@/lib/utils";
import EditView from "./EditView";

interface DetailsPanelProps {
  type: "lead" | "contact";
}

export default function DetailsPanel({ type }: DetailsPanelProps) {
  const { activeTab } = useAppContext();
  const isEditDetails = activeTab?.isEditDetails || false;

  return (
    <div
      className={cn(
        " bg-white rounded-[20px] shadow-[0_0_15px_rgba(0,0,0,0.1)]",
        !isEditDetails && "space-y-3 p-3"
      )}
    >
      {!isEditDetails ? <NormalView type={type} /> : <EditView type={type} />}
    </div>
  );
}

function NormalView({ type }: { type: "lead" | "contact" }) {
  const { activeTab, getLead, getContact } = useAppContext();

  // Get data based on type
  const data =
    type === "lead"
      ? activeTab?.dataId
        ? getLead(activeTab.dataId)
        : undefined
      : activeTab?.dataId
      ? getContact(activeTab.dataId)
      : undefined;

  // Format address from individual fields
  const formatAddress = () => {
    if (!data) return "";
    const parts = [
      data.street,
      data.city,
      data.state,
      data.zipCode,
      data.country,
    ].filter(Boolean);
    return parts.join(", ");
  };

  const ownerLabel = type === "lead" ? "Lead Owner" : "Contact Owner";
  const ownerValue =
    type === "lead"
      ? (data as any)?.leadOwner || "Dzaka Athif"
      : (data as any)?.contactOwner || "Dzaka Athif";

  return (
    <>
      <SectionLayout title="About">
        <DetailField label="Name" value={data?.name || ""} />
        <DetailField label="Company" value={data?.company || ""} />
        <DetailField label="Title" value={data?.title || ""} />
        <DetailField label="Website" value={data?.website || ""} />
        <DetailField label="Description" value={data?.description || ""} />
        {type === "lead" && (
          <DetailField
            label="Lead Status"
            value={(data as any)?.leadStatus || ""}
          />
        )}
        <DetailField label={ownerLabel} value={ownerValue} hasAvatar />
      </SectionLayout>

      <SectionLayout title="Get in Touch">
        <DetailField label="Phone" value={data?.phone || ""} />
        <DetailField label="Email" value={data?.email || ""} />
        <DetailField label="Address" value={formatAddress()} />
      </SectionLayout>

      <SectionLayout title="Segment">
        <DetailField
          label="No. of Employees"
          value={data?.numberOfEmployees || ""}
        />
        <DetailField label="Annual Revenue" value={data?.annualRevenue || ""} />
        <DetailField label="Lead Source" value={data?.leadSource || ""} />
        <DetailField label="Industry" value={data?.industry || ""} />
      </SectionLayout>

      <SectionLayout title="History">
        <DetailField
          label="Created By"
          value="Dzaka Athif"
          hasAvatar
          hasEditButton={false}
          timestamp="16/10/2025, 10:54 pm"
        />
        <DetailField
          label="Last Modified By"
          value="Dzaka Athif"
          hasAvatar
          hasEditButton={false}
          timestamp="16/10/2025, 10:54 pm"
        />
      </SectionLayout>
    </>
  );
}
