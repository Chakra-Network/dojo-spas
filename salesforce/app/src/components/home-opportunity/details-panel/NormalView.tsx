import SectionLayout from "@/components/common/details-panel/SectionLayout";
import DetailField from "@/components/common/details-panel/DetailField";
import type { Opportunity } from "@/lib/types";

interface NormalViewProps {
  data?: Opportunity;
}

export function NormalView({ data }: NormalViewProps) {
  return (
    <>
      <SectionLayout title="About">
        <DetailField
          label="Opportunity Name"
          value={data?.opportunityName || ""}
        />
        <DetailField label="Account Name" value={data?.accountName || ""} />
        <DetailField label="Close Date" value={data?.closeDate || ""} />
        <DetailField label="Amount" value={data?.amount || ""} />
        <DetailField label="Description" value={data?.description || ""} />
        <DetailField
          label="Opportunity Owner"
          value={data?.opportunityOwner || "Dzaka Athif"}
          hasAvatar
        />
      </SectionLayout>

      <SectionLayout title="Status">
        <DetailField label="Stage" value={data?.stage || ""} />
        <DetailField
          label="Probability (%)"
          value={data?.probability !== undefined ? `${data.probability}%` : ""}
        />
        <DetailField
          label="Forecast Category"
          value={data?.forecastCategory || ""}
        />
        <DetailField label="Next Step" value={data?.nextStep || ""} />
      </SectionLayout>

      <SectionLayout title="History">
        <DetailField
          label="Created By"
          value="Dzaka Athif"
          hasAvatar
          hasEditButton={false}
          timestamp="27/10/2025, 9:37 am"
        />
        <DetailField
          label="Last Modified By"
          value="Dzaka Athif"
          hasAvatar
          hasEditButton={false}
          timestamp="27/10/2025, 9:50 am"
        />
      </SectionLayout>
    </>
  );
}
