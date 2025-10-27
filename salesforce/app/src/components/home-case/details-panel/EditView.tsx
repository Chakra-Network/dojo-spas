import { useState, useEffect } from "react";
import SectionLayout, {
  FieldWrapper,
} from "@/components/common/details-panel/SectionLayout";
import { DetailInput, SubSectionTitle } from "@/components/common/InputItems";
import { useAppContext } from "@/context/AppProvider";
import { DetailFieldSimple } from "@/components/common/details-panel/DetailField";
import {
  CASE_STATUS_OPTIONS,
  CASE_ORIGIN_OPTIONS,
  PRIORITY_OPTIONS,
} from "@/lib/consts/dropdown-options";
import type { Case } from "@/lib/types";

interface EditViewProps {
  data?: Case;
  updateData: (id: string, updates: Partial<Case>) => void;
}

export default function EditView({ data, updateData }: EditViewProps) {
  const { activeTab, updateTabField } = useAppContext();

  // Local state for form data
  const [formData, setFormData] = useState<Case>(data || ({} as Case));

  // Update local state when data changes (e.g., switching tabs)
  useEffect(() => {
    if (data) {
      setFormData(data);
    }
  }, [data]);

  const handleCancel = () => {
    // Reset form data to original and exit edit mode
    if (data) {
      setFormData(data);
    }
    if (activeTab) {
      updateTabField(activeTab.id, "isEditDetails", false);
    }
  };

  const handleSave = () => {
    // Save form data to context and exit edit mode
    if (activeTab?.dataId) {
      updateData(activeTab.dataId, formData);
      updateTabField(activeTab.id, "isEditDetails", false);
    }
  };

  const handleFieldChange = (field: keyof Case, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const ownerLabel = "Case Owner";

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-1 text-[13px] leading-[19.5px] p-2 justify-end">
        <span className="text-red-500">*</span>
        <span className="text-gray-500">= Required Information</span>
      </div>
      <div className="m-3 shadow-[0_0_5px_rgba(0,0,0,0.3)] rounded-lg bg-white">
        <div className="flex flex-col p-2">
          <SectionLayout
            title="Case Information"
            contentContainerClassName="grid grid-cols-2 px-0"
          >
            <div className="flex flex-col px-3 mb-2">
              <SubSectionTitle title="Status" isRequired />
              <DetailInput
                value={formData?.status || ""}
                setValue={(value) => handleFieldChange("status", value)}
                isRequired
                type="select"
                options={CASE_STATUS_OPTIONS}
              />
            </div>
            <div className="flex flex-col px-3 mb-2">
              <SubSectionTitle title="Priority" />
              <DetailInput
                value={formData?.priority || ""}
                setValue={(value) => handleFieldChange("priority", value)}
                type="select"
                options={PRIORITY_OPTIONS}
              />
            </div>
            <div className="flex flex-col px-3 mb-2">
              <SubSectionTitle title="Case Origin" />
              <DetailInput
                value={formData?.caseOrigin || ""}
                setValue={(value) => handleFieldChange("caseOrigin", value)}
                type="select"
                options={CASE_ORIGIN_OPTIONS}
              />
            </div>
            <FieldWrapper>
              <DetailFieldSimple label={ownerLabel} value="Dzaka Athif" />
            </FieldWrapper>
          </SectionLayout>

          <SectionLayout
            title="Contact Information"
            contentContainerClassName="grid grid-cols-2 px-0"
          >
            <div className="flex flex-col px-3 mb-2">
              <SubSectionTitle title="Contact Name" />
              <DetailInput
                value={formData?.contactName || ""}
                setValue={(value) => handleFieldChange("contactName", value)}
              />
            </div>
            <div className="flex flex-col px-3 mb-2">
              <SubSectionTitle title="Account Name" />
              <DetailInput
                value={formData?.accountName || ""}
                setValue={(value) => handleFieldChange("accountName", value)}
              />
            </div>
          </SectionLayout>

          <SectionLayout title="Description">
            <div className="flex flex-col px-1 mb-2">
              <SubSectionTitle title="Subject" />
              <DetailInput
                value={formData?.subject || ""}
                setValue={(value) => handleFieldChange("subject", value)}
              />
            </div>
            <div className="flex flex-col px-1 mb-2">
              <SubSectionTitle title="Description" />
              <DetailInput
                value={formData?.description || ""}
                setValue={(value) => handleFieldChange("description", value)}
                type="textarea"
              />
            </div>
          </SectionLayout>

          <SectionLayout
            title="System Information"
            contentContainerClassName="grid grid-cols-2 px-0"
          >
            <FieldWrapper>
              <DetailFieldSimple
                label="Created By"
                value="Dzaka Athif"
                timestamp="27/10/2025, 3:54 pm"
              />
            </FieldWrapper>
            <FieldWrapper>
              <DetailFieldSimple
                label="Last Modified By"
                value="Dzaka Athif"
                timestamp="27/10/2025, 3:56 pm"
              />
            </FieldWrapper>
          </SectionLayout>
        </div>

        <div className="flex justify-center gap-2 py-2 border-t border-gray-300 sticky bottom-10 bg-white/80">
          <button
            className="px-4 h-8 text-[13px] flex items-center justify-center text-blue-600 hover:text-blue-800 cursor-pointer font-semibold border border-gray-600 rounded-full"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            className="px-4 h-8 text-[13px] flex items-center justify-center text-white bg-blue-500 hover:bg-blue-600 cursor-pointer font-semibold border border-blue-500 hover:border-blue-600 rounded-full"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
