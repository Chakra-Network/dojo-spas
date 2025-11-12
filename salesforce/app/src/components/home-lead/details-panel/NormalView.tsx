import SectionLayout from "@/components/common/details-panel/SectionLayout";
import DetailField from "@/components/common/details-panel/DetailField";
import type { Lead } from "@/lib/types";

export function NormalView({ data }: { data?: Lead }) {
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

  const ownerLabel = "Lead Owner";
  const ownerValue = data?.leadOwner || "Dzaka Athif";

  return (
    <>
      <SectionLayout title="About">
        <DetailField label="Name" value={data?.name || ""} />
        <DetailField label="Company" value={data?.company || ""} />
        <DetailField label="Title" value={data?.title || ""} />
        <DetailField label="Website" value={data?.website || ""} />
        <DetailField label="Description" value={data?.description || ""} />
        <DetailField label="Lead Status" value={data?.leadStatus || ""} />
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
