import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Case } from "@/lib/types";
import { SectionLayout } from "../DialogItems";
import { DetailInput, SubSectionTitle } from "@/components/common/InputItems";
import { DetailFieldSimple } from "@/components/common/details-panel/DetailField";
import {
  CASE_STATUS_OPTIONS,
  CASE_ORIGIN_OPTIONS,
  PRIORITY_OPTIONS,
} from "@/lib/consts/dropdown-options";

interface NewCaseDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (caseData: Case) => void;
}

export default function NewCaseDialog({
  isOpen,
  onClose,
  onSave,
}: NewCaseDialogProps) {
  const [formData, setFormData] = useState<Partial<Case>>({
    status: "New",
    caseOrigin: "--None--",
    priority: "Medium",
    caseOwner: "Dzaka Athif",
    contactName: "",
    accountName: "",
    subject: "",
    description: "",
    sendNotificationEmail: false,
  });

  const handleInputChange = (field: keyof Case, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setFormData({
      status: "New",
      caseOrigin: "--None--",
      priority: "Medium",
      caseOwner: "Dzaka Athif",
      contactName: "",
      accountName: "",
      subject: "",
      description: "",
      sendNotificationEmail: false,
    });
  };

  const validateAndGetCaseData = (): Case | null => {
    // Validate required fields
    if (!formData.status) {
      alert("Please fill in all required fields: Status");
      return null;
    }

    return {
      ...formData,
      status: formData.status || "New",
      caseOwner: formData.caseOwner || "Dzaka Athif",
    } as Case;
  };

  const handleSave = () => {
    const caseData = validateAndGetCaseData();
    if (!caseData) return;

    onSave(caseData);
    resetForm();
    onClose();
  };

  const handleSaveAndNew = () => {
    const caseData = validateAndGetCaseData();
    if (!caseData) return;

    onSave(caseData);
    resetForm();
    // Keep dialog open for next case
  };

  const handleCancel = () => {
    resetForm();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleCancel()}>
      <DialogContent className="w-[840px] max-h-[90vh] p-0 flex flex-col rounded-t-xl rounded-b-none">
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-gray-200 sr-only">
          <DialogTitle className="text-lg font-semibold">New Case</DialogTitle>
          <DialogDescription className="sr-only">New Case</DialogDescription>
        </DialogHeader>

        <div className="rounded-t-lg overflow-hidden flex-1 flex flex-col">
          <div className="overflow-y-auto pb-16 flex-1">
            {/* Header */}
            <div className="border-b border-gray-200 p-4 text-center">
              <h1 className="text-xl leading-[25px] font-normal text-gray-900">
                New Case
              </h1>
            </div>

            {/* Required Information Notice */}
            <div className="flex items-center gap-1 text-[13px] leading-[19.5px] px-4 pt-4 justify-end">
              <span className="text-red-500">*</span>
              <span className="text-gray-500">= Required Information</span>
            </div>

            <div className="flex flex-col p-2">
              {/* Case Information Section */}
              <SectionLayout title="Case Information">
                <div className="grid grid-cols-2">
                  <div className="flex flex-col px-3 mb-2">
                    <SubSectionTitle title="Status" isRequired />
                    <DetailInput
                      value={formData.status || ""}
                      setValue={(value) => handleInputChange("status", value)}
                      isRequired
                      type="select"
                      options={CASE_STATUS_OPTIONS}
                    />
                  </div>

                  <div className="flex flex-col px-3 mb-2">
                    <SubSectionTitle title="Case Origin" />
                    <DetailInput
                      value={formData.caseOrigin || ""}
                      setValue={(value) =>
                        handleInputChange("caseOrigin", value)
                      }
                      type="select"
                      options={CASE_ORIGIN_OPTIONS}
                    />
                  </div>

                  <div className="flex flex-col px-3 mb-2">
                    <SubSectionTitle title="Priority" />
                    <DetailInput
                      value={formData.priority || ""}
                      setValue={(value) => handleInputChange("priority", value)}
                      type="select"
                      options={PRIORITY_OPTIONS}
                    />
                  </div>

                  <div className="flex flex-col px-3">
                    <DetailFieldSimple label="Case Owner" value="Dzaka Athif" />
                  </div>
                </div>
              </SectionLayout>

              {/* Contact Information Section */}
              <SectionLayout title="Contact Information">
                <div className="grid grid-cols-2">
                  <div className="flex flex-col px-3 mb-2">
                    <SubSectionTitle title="Contact Name" />
                    <DetailInput
                      value={formData.contactName || ""}
                      setValue={(value) =>
                        handleInputChange("contactName", value)
                      }
                    />
                  </div>

                  <div className="flex flex-col px-3 mb-2">
                    <SubSectionTitle title="Account Name" />
                    <DetailInput
                      value={formData.accountName || ""}
                      setValue={(value) =>
                        handleInputChange("accountName", value)
                      }
                    />
                  </div>
                </div>
              </SectionLayout>

              {/* Description Information Section */}
              <SectionLayout title="Description Information">
                <div className="flex flex-col px-1 mb-2">
                  <SubSectionTitle title="Subject" />
                  <DetailInput
                    value={formData.subject || ""}
                    setValue={(value) => handleInputChange("subject", value)}
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
              </SectionLayout>
            </div>

            {/* Action Buttons with Checkbox */}
            <div className="flex justify-between items-center gap-3 px-4 py-3 border-t-2 border-gray-200 absolute bottom-[-1px] w-full bg-white/60 backdrop-blur-sm">
              <div className="flex items-center gap-2 p-3 px-11">
                <input
                  type="checkbox"
                  id="sendNotificationEmail"
                  checked={formData.sendNotificationEmail || false}
                  onChange={(e) =>
                    handleInputChange("sendNotificationEmail", e.target.checked)
                  }
                  className="w-4 h-4 cursor-pointer"
                />
                <label
                  htmlFor="sendNotificationEmail"
                  className="text-[13px] text-gray-700 cursor-pointer"
                >
                  Send notification email to contact
                </label>
              </div>

              <div className="flex gap-3">
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
        </div>
      </DialogContent>
    </Dialog>
  );
}
