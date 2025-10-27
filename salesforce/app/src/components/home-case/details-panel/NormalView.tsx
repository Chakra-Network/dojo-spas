import SectionLayout, {
  FieldWrapper,
} from "@/components/common/details-panel/SectionLayout";
import DetailField from "@/components/common/details-panel/DetailField";
import type { Case } from "@/lib/types";

export function NormalView({ data }: { data?: Case }) {
  const ownerLabel = "Case Owner";
  const ownerValue = data?.caseOwner || "Dzaka Athif";

  return (
    <>
      <SectionLayout
        title="Case Information"
        contentContainerClassName="grid grid-cols-2 px-0"
      >
        <FieldWrapper>
          <DetailField label="Status" value={data?.status || ""} />
        </FieldWrapper>
        <FieldWrapper>
          <DetailField label="Priority" value={data?.priority || ""} />
        </FieldWrapper>
        <FieldWrapper>
          <DetailField label="Case Origin" value={data?.caseOrigin || ""} />
        </FieldWrapper>
        <FieldWrapper>
          <DetailField label={ownerLabel} value={ownerValue} hasAvatar />
        </FieldWrapper>
      </SectionLayout>

      <SectionLayout
        title="Contact Information"
        contentContainerClassName="grid grid-cols-2 px-0"
      >
        <FieldWrapper>
          <DetailField label="Contact Name" value={data?.contactName || ""} />
        </FieldWrapper>
        <FieldWrapper>
          <DetailField label="Account Name" value={data?.accountName || ""} />
        </FieldWrapper>
      </SectionLayout>

      <SectionLayout title="Description">
        <DetailField label="Subject" value={data?.subject || ""} />
        <DetailField label="Description" value={data?.description || ""} />
      </SectionLayout>

      <SectionLayout
        title="System Information"
        contentContainerClassName="grid grid-cols-2 px-0"
      >
        <FieldWrapper>
          <DetailField
            label="Created By"
            value="Dzaka Athif"
            hasAvatar
            hasEditButton={false}
            timestamp="27/10/2025, 3:54 pm"
          />
        </FieldWrapper>
        <FieldWrapper>
          <DetailField
            label="Last Modified By"
            value="Dzaka Athif"
            hasAvatar
            hasEditButton={false}
            timestamp="27/10/2025, 3:56 pm"
          />
        </FieldWrapper>
      </SectionLayout>
    </>
  );
}
