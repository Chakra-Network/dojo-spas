import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Case } from "@/lib/types";
import { DetailInput, SubSectionTitle } from "@/components/common/InputItems";
import { KeyFieldsItem } from "@/components/common/details-panel/DetailField";
import {
  PRIORITY_OPTIONS,
  CASE_REASON_OPTIONS,
} from "@/lib/consts/dropdown-options";

interface EditCaseDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (caseId: string, updates: Partial<Case>) => void;
  caseData?: Case;
}

export default function EditCaseDialog({
  isOpen,
  onClose,
  onSave,
  caseData,
}: EditCaseDialogProps) {
  const [formData, setFormData] = useState<Partial<Case>>({
    priority: caseData?.priority || "Medium",
    caseReason: caseData?.caseReason || "--None--",
  });

  // Update form data when caseData changes
  useEffect(() => {
    if (caseData) {
      setFormData({
        priority: caseData.priority || "Medium",
        caseReason: caseData.caseReason || "--None--",
      });
    }
  }, [caseData]);

  const handleInputChange = (field: keyof Case, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    if (caseData) {
      setFormData({
        priority: caseData.priority || "Medium",
        caseReason: caseData.caseReason || "--None--",
      });
    }
  };

  const handleSave = () => {
    if (!caseData?.id) return;

    onSave(caseData.id, formData);
    onClose();
  };

  const handleCancel = () => {
    resetForm();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleCancel()}>
      <DialogContent className="w-[840px] max-h-[90vh] p-0 flex flex-col rounded-t-xl rounded-b-none">
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-gray-200 sr-only">
          <DialogTitle className="text-lg font-semibold">Edit Case</DialogTitle>
          <DialogDescription className="sr-only">Edit Case</DialogDescription>
        </DialogHeader>

        <div className="rounded-t-lg overflow-hidden flex-1 flex flex-col">
          <div className="overflow-y-auto pb-16 flex-1">
            {/* Header */}
            <div className="border-b border-gray-200 p-4 text-center">
              <h1 className="text-xl leading-[25px] font-normal text-gray-900">
                Edit Case
              </h1>
            </div>

            {/* Required Information Notice */}
            <div className="flex items-center gap-1 text-[13px] leading-[19.5px] px-4 pt-4 justify-end">
              <span className="text-red-500">*</span>
              <span className="text-gray-500">= Required Information</span>
            </div>

            <div className="flex flex-col p-2">
              <KeyFieldsItem
                label="Case Owner"
                value={caseData?.caseOwner || "Dzaka Athif"}
                isBorder={false}
              />
              <div className="flex flex-col px-1 mb-2">
                <SubSectionTitle title="Priority" />
                <DetailInput
                  value={formData.priority || ""}
                  setValue={(value) => handleInputChange("priority", value)}
                  type="select"
                  options={PRIORITY_OPTIONS}
                />
              </div>
              <div className="flex flex-col px-1 mb-2">
                <SubSectionTitle title="Case Reason" />
                <DetailInput
                  value={formData.caseReason || ""}
                  setValue={(value) => handleInputChange("caseReason", value)}
                  type="select"
                  options={CASE_REASON_OPTIONS}
                />
              </div>
            </div>

            {/* Action Buttons with Checkbox */}
            <div className="flex justify-between items-center gap-3 px-4 py-3 border-t-2 border-gray-200 absolute bottom-[-1px] w-full bg-white/60 backdrop-blur-sm">
              <div className="flex gap-3">
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
        </div>
      </DialogContent>
    </Dialog>
  );
}
