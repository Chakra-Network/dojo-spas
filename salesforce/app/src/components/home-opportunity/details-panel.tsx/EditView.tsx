import { useState, useEffect } from "react";
import SectionLayout from "@/components/common/details-panel/SectionLayout";
import { DetailInput, SubSectionTitle } from "@/components/common/InputItems";
import { useAppContext } from "@/context/AppProvider";
import { DetailFieldSimple } from "@/components/common/details-panel/DetailField";
import {
  OPPORTUNITY_STAGE_OPTIONS,
  FORECAST_CATEGORY_OPTIONS,
} from "@/lib/consts/dropdown-options";
import type { Opportunity } from "@/lib/types";

interface EditViewProps {
  data?: Opportunity;
  updateData: (id: string, updates: Partial<Opportunity>) => void;
}

export default function EditView({ data, updateData }: EditViewProps) {
  const { activeTab, updateTabField } = useAppContext();

  // Local state for form data
  const [formData, setFormData] = useState<Opportunity>(
    data || ({} as Opportunity)
  );

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

  const handleFieldChange = (
    field: keyof Opportunity,
    value: string | number
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-1 text-[13px] leading-[19.5px] p-2 justify-end">
        <span className="text-red-500">*</span>
        <span className="text-gray-500">= Required Information</span>
      </div>
      <div className="m-3 shadow-[0_0_5px_rgba(0,0,0,0.3)] rounded-lg bg-white">
        <div className="flex flex-col p-2">
          <SectionLayout title="About">
            <div className="flex flex-col px-1 mb-2">
              <SubSectionTitle title="Opportunity Name" isRequired />
              <DetailInput
                value={formData?.opportunityName || ""}
                setValue={(value) =>
                  handleFieldChange("opportunityName", value)
                }
                isRequired
              />
            </div>

            <div className="flex flex-col px-1 mb-2">
              <SubSectionTitle title="Account Name" isRequired />
              <DetailInput
                value={formData?.accountName || ""}
                setValue={(value) => handleFieldChange("accountName", value)}
                isRequired
              />
            </div>

            <div className="flex flex-col px-1 mb-2">
              <SubSectionTitle title="Close Date" isRequired />
              <DetailInput
                value={formData?.closeDate || ""}
                setValue={(value) => handleFieldChange("closeDate", value)}
                isRequired
              />
            </div>

            <div className="flex flex-col px-1 mb-2">
              <SubSectionTitle title="Amount" />
              <DetailInput
                value={formData?.amount || ""}
                setValue={(value) => handleFieldChange("amount", value)}
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

            <DetailFieldSimple label="Opportunity Owner" value="Dzaka Athif" />
          </SectionLayout>

          <SectionLayout title="Status">
            <div className="flex flex-col px-1 mb-2">
              <SubSectionTitle title="Stage" isRequired />
              <DetailInput
                value={formData?.stage || ""}
                setValue={(value) => handleFieldChange("stage", value)}
                type="select"
                options={OPPORTUNITY_STAGE_OPTIONS}
                isRequired
              />
            </div>

            <div className="flex flex-col px-1 mb-2">
              <SubSectionTitle title="Probability (%)" />
              <DetailInput
                type="number"
                value={formData?.probability}
                setValue={(value) => handleFieldChange("probability", value)}
              />
            </div>

            <div className="flex flex-col px-1 mb-2">
              <SubSectionTitle title="Forecast Category" isRequired />
              <DetailInput
                type="select"
                options={FORECAST_CATEGORY_OPTIONS}
                value={formData?.forecastCategory}
                setValue={(value) =>
                  handleFieldChange("forecastCategory", value)
                }
                isRequired
              />
            </div>

            <div className="flex flex-col px-1 mb-2">
              <SubSectionTitle title="Next Step" />
              <DetailInput
                value={formData?.nextStep || ""}
                setValue={(value) => handleFieldChange("nextStep", value)}
              />
            </div>
          </SectionLayout>

          <SectionLayout title="History">
            <DetailFieldSimple
              label="Created By"
              value="Dzaka Athif"
              timestamp="27/10/2025, 9:37 am"
            />
            <DetailFieldSimple
              label="Last Modified By"
              value="Dzaka Athif"
              timestamp="27/10/2025, 9:50 am"
            />
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
