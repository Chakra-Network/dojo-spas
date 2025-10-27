import { useState, useEffect } from "react";
import SectionLayout from "@/components/common/details-panel/SectionLayout";
import { DetailInput, SubSectionTitle } from "@/components/common/InputItems";
import { useAppContext } from "@/context/AppProvider";
import { DetailFieldSimple } from "@/components/common/details-panel/DetailField";
import {
  SALUTATION_OPTIONS,
  LEAD_STATUS_OPTIONS,
  COUNTRY_OPTIONS,
  LEAD_SOURCE_OPTIONS,
  INDUSTRY_OPTIONS,
} from "@/lib/consts/dropdown-options";
import type { Lead } from "@/lib/types";

interface EditViewProps {
  data?: Lead;
  updateData: (id: string, updates: Partial<Lead>) => void;
}

export default function EditView({ data, updateData }: EditViewProps) {
  const { activeTab, updateTabField } = useAppContext();

  // Local state for form data
  const [formData, setFormData] = useState<Lead>(data || ({} as Lead));

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

  const handleFieldChange = (field: keyof Lead, value: string) => {
    setFormData((prev) => {
      const updatedData = { ...prev, [field]: value };

      // Update name field when firstName or lastName changes
      if (field === "firstName" || field === "lastName") {
        const firstName = field === "firstName" ? value : prev.firstName || "";
        const lastName = field === "lastName" ? value : prev.lastName || "";
        updatedData.name = [firstName, lastName].filter(Boolean).join(" ");
      }

      return updatedData;
    });
  };

  const ownerLabel = "Lead Owner";

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
              <SubSectionTitle title="Name" isRequired size="medium" />
              <DetailInput
                label="Salutation"
                value={formData?.salutation || ""}
                setValue={(value) => handleFieldChange("salutation", value)}
                type="select"
                options={SALUTATION_OPTIONS}
              />
              <DetailInput
                label="First Name"
                value={formData?.firstName || ""}
                setValue={(value) => handleFieldChange("firstName", value)}
              />
              <DetailInput
                label="Last Name"
                value={formData?.lastName || ""}
                setValue={(value) => handleFieldChange("lastName", value)}
                isRequired
              />
            </div>

            <div className="flex flex-col px-1 mb-2">
              <SubSectionTitle title="Company" isRequired />
              <DetailInput
                value={formData?.company || ""}
                setValue={(value) => handleFieldChange("company", value)}
                isRequired
              />
            </div>
            <div className="flex flex-col px-1 mb-2">
              <SubSectionTitle title="Title" />
              <DetailInput
                value={formData?.title || ""}
                setValue={(value) => handleFieldChange("title", value)}
              />
            </div>
            <div className="flex flex-col px-1 mb-2">
              <SubSectionTitle title="Website" />
              <DetailInput
                value={formData?.website || ""}
                setValue={(value) => handleFieldChange("website", value)}
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
            <div className="flex flex-col px-1 mb-2">
              <SubSectionTitle title="Lead Status" isRequired />
              <DetailInput
                value={(formData as Lead)?.leadStatus || ""}
                setValue={(value) => handleFieldChange("leadStatus", value)}
                isRequired
                type="select"
                options={LEAD_STATUS_OPTIONS}
              />
            </div>
            <DetailFieldSimple label={ownerLabel} value="Dzaka Athif" />
          </SectionLayout>

          <SectionLayout title="Get in Touch">
            <div className="flex flex-col px-1 mb-2">
              <SubSectionTitle title="Phone" />
              <DetailInput
                value={formData?.phone || ""}
                setValue={(value) => handleFieldChange("phone", value)}
                isRequired
              />
            </div>
            <div className="flex flex-col px-1 mb-2">
              <SubSectionTitle title="Email" />
              <DetailInput
                value={formData?.email || ""}
                setValue={(value) => handleFieldChange("email", value)}
              />
            </div>
            <div className="flex flex-col px-1 mb-2">
              <SubSectionTitle title="Address" size="medium" />
              <DetailInput
                label="Country"
                value={formData?.country || ""}
                setValue={(value) => handleFieldChange("country", value)}
                className="px-1"
                type="select"
                options={COUNTRY_OPTIONS}
              />
              <DetailInput
                label="Street"
                value={formData?.street || ""}
                setValue={(value) => handleFieldChange("street", value)}
                type="textarea"
              />
              <div className="grid grid-cols-3 gap-3">
                <DetailInput
                  label="City"
                  value={formData?.city || ""}
                  setValue={(value) => handleFieldChange("city", value)}
                  className="col-span-2 w-full"
                />
                <DetailInput
                  label="State/Province"
                  value={formData?.state || ""}
                  setValue={(value) => handleFieldChange("state", value)}
                  className="col-span-1 w-full"
                />
              </div>

              <DetailInput
                label="Zip Code"
                value={formData?.zipCode || ""}
                setValue={(value) => handleFieldChange("zipCode", value)}
              />
            </div>
          </SectionLayout>

          <SectionLayout title="Segment">
            <div className="flex flex-col px-1 mb-2">
              <SubSectionTitle title="No. of Employees" />
              <DetailInput
                value={formData?.numberOfEmployees || ""}
                setValue={(value) =>
                  handleFieldChange("numberOfEmployees", value)
                }
              />
            </div>
            <div className="flex flex-col px-1 mb-2">
              <SubSectionTitle title="Annual Revenue" />
              <DetailInput
                value={formData?.annualRevenue || ""}
                setValue={(value) => handleFieldChange("annualRevenue", value)}
              />
            </div>
            <div className="flex flex-col px-1 mb-2">
              <SubSectionTitle title="Lead Source" />
              <DetailInput
                value={formData?.leadSource || ""}
                setValue={(value) => handleFieldChange("leadSource", value)}
                type="select"
                options={LEAD_SOURCE_OPTIONS}
              />
            </div>
            <div className="flex flex-col px-1 mb-2">
              <SubSectionTitle title="Industry" />
              <DetailInput
                value={formData?.industry || ""}
                setValue={(value) => handleFieldChange("industry", value)}
                type="select"
                options={INDUSTRY_OPTIONS}
              />
            </div>
          </SectionLayout>

          <SectionLayout title="History">
            <DetailFieldSimple
              label="Created By"
              value="Dzaka Athif"
              timestamp="16/10/2025, 10:54 pm"
            />
            <DetailFieldSimple
              label="Last Modified By"
              value="Dzaka Athif"
              timestamp="16/10/2025, 10:54 pm"
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
