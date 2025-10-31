import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Opportunity } from "@/lib/types";
import { SectionLayout } from "./DialogItems";
import { DetailInput, SubSectionTitle } from "@/components/common/InputItems";
import { DetailFieldSimple } from "@/components/common/details-panel/DetailField";
import {
  OPPORTUNITY_STAGE_OPTIONS,
  FORECAST_CATEGORY_OPTIONS,
} from "@/lib/consts/dropdown-options";

interface NewOpportunityDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (opportunityData: Opportunity) => void;
}

export default function NewOpportunityDialog({
  isOpen,
  onClose,
  onSave,
}: NewOpportunityDialogProps) {
  const [formData, setFormData] = useState<Partial<Opportunity>>({
    opportunityName: "",
    accountName: "",
    closeDate: "",
    amount: "",
    description: "",
    opportunityOwner: "Dzaka Athif",
    stage: "Qualify",
    probability: 0,
    forecastCategory: "Omitted",
    nextStep: "",
  });

  const handleInputChange = (field: keyof Opportunity, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setFormData({
      opportunityName: "",
      accountName: "",
      closeDate: "",
      amount: "",
      description: "",
      opportunityOwner: "Dzaka Athif",
      stage: "Qualify",
      probability: 0,
      forecastCategory: "Omitted",
      nextStep: "",
    });
  };

  const validateAndGetOpportunityData = (): Opportunity | null => {
    // Validate required fields
    if (
      !formData.opportunityName ||
      !formData.accountName ||
      !formData.closeDate ||
      !formData.stage ||
      !formData.forecastCategory
    ) {
      alert(
        "Please fill in all required fields: Opportunity Name, Account Name, Close Date, Stage, and Forecast Category"
      );
      return null;
    }

    return {
      ...formData,
    } as Opportunity;
  };

  const handleSave = () => {
    const opportunityData = validateAndGetOpportunityData();
    if (!opportunityData) return;

    onSave(opportunityData);
    resetForm();
    onClose();
  };

  const handleSaveAndNew = () => {
    const opportunityData = validateAndGetOpportunityData();
    if (!opportunityData) return;

    onSave(opportunityData);
    resetForm();
    // Keep dialog open for next opportunity
  };

  const handleCancel = () => {
    resetForm();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleCancel()}>
      <DialogContent className="w-[840px] max-h-[90vh] p-0 flex flex-col rounded-t-xl rounded-b-none">
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-gray-200 sr-only">
          <DialogTitle className="text-lg font-semibold">
            New Opportunity
          </DialogTitle>
          <DialogDescription className="sr-only">
            New Opportunity
          </DialogDescription>
        </DialogHeader>

        <div className="rounded-lg overflow-hidden flex-1 flex flex-col">
          <div className="overflow-y-auto pb-16 flex-1">
            {/* Header */}
            <div className="border-b border-gray-200 p-4 text-center">
              <h1 className="text-xl leading-[25px] font-normal text-gray-900">
                New Opportunity
              </h1>
            </div>

            {/* Required Information Notice */}
            <div className="flex items-center gap-1 text-[13px] leading-[19.5px] px-4 pt-4 justify-end">
              <span className="text-red-500">*</span>
              <span className="text-gray-500">= Required Information</span>
            </div>

            <div className="flex flex-col p-2">
              <SectionLayout title="About">
                <div className="flex flex-col px-1 mb-2">
                  <SubSectionTitle title="Opportunity Name" isRequired />
                  <DetailInput
                    value={formData.opportunityName || ""}
                    setValue={(value) =>
                      handleInputChange("opportunityName", value)
                    }
                    isRequired
                  />
                </div>

                <div className="flex flex-col px-1 mb-2">
                  <SubSectionTitle title="Account Name" isRequired />
                  <DetailInput
                    value={formData.accountName || ""}
                    setValue={(value) =>
                      handleInputChange("accountName", value)
                    }
                    isRequired
                  />
                </div>

                <div className="flex flex-col px-1 mb-2">
                  <SubSectionTitle title="Close Date" isRequired />
                  <DetailInput
                    value={formData.closeDate || ""}
                    setValue={(value) => handleInputChange("closeDate", value)}
                    isRequired
                  />
                </div>

                <div className="flex flex-col px-1 mb-2">
                  <SubSectionTitle title="Amount" />
                  <DetailInput
                    value={formData.amount || ""}
                    setValue={(value) => handleInputChange("amount", value)}
                  />
                </div>

                <div className="flex flex-col px-1 mb-2">
                  <SubSectionTitle title="Description" />
                  <DetailInput
                    value={formData.description || ""}
                    setValue={(value) =>
                      handleInputChange("description", value)
                    }
                    type="textarea"
                  />
                </div>

                <DetailFieldSimple label="Lead Owner" value="Dzaka Athif" />
              </SectionLayout>

              {/* Get in Touch Section */}
              <SectionLayout title="Status">
                <div className="flex flex-col px-1 mb-2">
                  <SubSectionTitle title="Stage" />
                  <DetailInput
                    value={formData.stage || ""}
                    setValue={(value) => handleInputChange("stage", value)}
                    type="select"
                    options={OPPORTUNITY_STAGE_OPTIONS}
                  />
                </div>

                <div className="flex flex-col px-1 mb-2">
                  <SubSectionTitle title="Probability" />
                  <DetailInput
                    type="number"
                    value={formData.probability}
                    setValue={(value) =>
                      handleInputChange("probability", value)
                    }
                  />
                </div>

                <div className="flex flex-col px-1 mb-2">
                  <SubSectionTitle title="Forecast Category" />
                  <DetailInput
                    type="select"
                    options={FORECAST_CATEGORY_OPTIONS}
                    value={formData.forecastCategory}
                    setValue={(value) =>
                      handleInputChange("forecastCategory", value)
                    }
                  />
                </div>

                <div className="flex flex-col px-1 mb-2">
                  <SubSectionTitle title="Next Step" />
                  <DetailInput
                    value={formData.nextStep}
                    setValue={(value) => handleInputChange("nextStep", value)}
                  />
                </div>
              </SectionLayout>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 px-4 py-3 border-t-2 border-gray-200 absolute bottom-[-1px] w-full bg-white/60 backdrop-blur-sm">
              <button
                className="px-4 h-8 text-[13px] flex items-center justify-center text-blue-600 hover:text-blue-800 cursor-pointer font-semibold border border-gray-600 rounded-full"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                className="px-4 h-8 text-[13px] flex items-center justify-center text-blue-600 hover:text-blue-800 cursor-pointer font-semibold border border-gray-600 rounded-full"
                onClick={handleSaveAndNew}
              >
                Save & New
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
      </DialogContent>
    </Dialog>
  );
}
