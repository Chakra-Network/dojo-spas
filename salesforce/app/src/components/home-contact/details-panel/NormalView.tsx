import SectionLayout from "@/components/common/details-panel/SectionLayout";
import DetailField from "@/components/common/details-panel/DetailField";
import type { Contact } from "@/lib/types";

export function NormalView({ data }: { data?: Contact }) {
  // Format address from individual fields
  const formatAddress = () => {
    if (!data) return "";
    const parts = [
      data.mailingStreet,
      data.mailingCity,
      data.mailingState,
      data.mailingZipCode,
      data.mailingCountry,
    ].filter(Boolean);
    return parts.join(", ");
  };

  const ownerLabel = "Contact Owner";
  const ownerValue = data?.contactOwner || "Dzaka Athif";

  return (
    <>
      <SectionLayout title="About">
        <DetailField label="Name" value={data?.name || ""} />
        <DetailField label="Account Name" value={data?.accountName || ""} />
        <DetailField label="Title" value={data?.title || ""} />
        <DetailField label="Reports To" value={data?.reportsTo || ""} />
        <DetailField label="Description" value={data?.description || ""} />
        <DetailField label={ownerLabel} value={ownerValue} hasAvatar />
      </SectionLayout>

      <SectionLayout title="Get in Touch">
        <DetailField label="Phone" value={data?.phone || ""} />
        <DetailField label="Email" value={data?.email || ""} />
        <DetailField label="Address" value={formatAddress()} />
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
