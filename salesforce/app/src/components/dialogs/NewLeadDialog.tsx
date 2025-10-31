import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Lead } from "@/lib/types";
import { SectionLayout } from "./DialogItems";
import { DetailInput, SubSectionTitle } from "@/components/common/InputItems";
import { DetailFieldSimple } from "@/components/common/details-panel/DetailField";
import {
  SALUTATION_OPTIONS,
  LEAD_STATUS_OPTIONS,
  COUNTRY_OPTIONS,
  LEAD_SOURCE_OPTIONS,
  INDUSTRY_OPTIONS,
} from "@/lib/consts/dropdown-options";

interface NewLeadDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (leadData: Lead) => void;
}

export default function NewLeadDialog({
  isOpen,
  onClose,
  onSave,
}: NewLeadDialogProps) {
  const [formData, setFormData] = useState<Partial<Lead>>({
    salutation: "",
    firstName: "",
    lastName: "",
    company: "",
    title: "",
    website: "",
    description: "",
    leadStatus: "New",
    leadOwner: "Dzaka Athif",
    phone: "",
    email: "",
    country: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    numberOfEmployees: "",
    annualRevenue: "",
    leadSource: "",
    industry: "",
  });

  const handleInputChange = (field: keyof Lead, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setFormData({
      salutation: "",
      firstName: "",
      lastName: "",
      company: "",
      title: "",
      website: "",
      description: "",
      leadStatus: "New",
      leadOwner: "Dzaka Athif",
      phone: "",
      email: "",
      country: "",
      street: "",
      city: "",
      state: "",
      zipCode: "",
      numberOfEmployees: "",
      annualRevenue: "",
      leadSource: "",
      industry: "",
    });
  };

  const validateAndGetLeadData = (): Lead | null => {
    // Validate required fields
    if (!formData.lastName || !formData.company || !formData.leadStatus) {
      alert(
        "Please fill in all required fields: Last Name, Company, and Lead Status"
      );
      return null;
    }

    // Create name field from first and last name
    const name = [formData.firstName, formData.lastName]
      .filter(Boolean)
      .join(" ");

    return {
      ...formData,
      name,
      company: formData.company || "",
    } as Lead;
  };

  const handleSave = () => {
    const leadData = validateAndGetLeadData();
    if (!leadData) return;

    onSave(leadData);
    resetForm();
    onClose();
  };

  const handleSaveAndNew = () => {
    const leadData = validateAndGetLeadData();
    if (!leadData) return;

    onSave(leadData);
    resetForm();
    // Keep dialog open for next lead
  };

  const handleCancel = () => {
    resetForm();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleCancel()}>
      <DialogContent className="w-[840px] max-h-[90vh] p-0 flex flex-col rounded-t-xl rounded-b-none">
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-gray-200 sr-only">
          <DialogTitle className="text-lg font-semibold">New Lead</DialogTitle>
          <DialogDescription className="sr-only">New Lead</DialogDescription>
        </DialogHeader>

        <div className="rounded-lg overflow-hidden flex-1 flex flex-col">
          <div className="overflow-y-auto pb-16 flex-1">
            {/* Header */}
            <div className="border-b border-gray-200 p-4 text-center">
              <h1 className="text-xl leading-[25px] font-normal text-gray-900">
                New Lead
              </h1>
            </div>

            {/* Required Information Notice */}
            <div className="flex items-center gap-1 text-[13px] leading-[19.5px] px-4 pt-4 justify-end">
              <span className="text-red-500">*</span>
              <span className="text-gray-500">= Required Information</span>
            </div>

            <div className="flex flex-col p-2">
              <SectionLayout title="About">
                {/* Name Subsection */}
                <div className="mb-4">
                  <SubSectionTitle title="Name" isRequired size="medium" />

                  <DetailInput
                    label="Salutation"
                    value={formData.salutation || ""}
                    setValue={(value) => handleInputChange("salutation", value)}
                    type="select"
                    options={SALUTATION_OPTIONS}
                  />

                  <DetailInput
                    label="First Name"
                    value={formData.firstName || ""}
                    setValue={(value) => handleInputChange("firstName", value)}
                  />

                  <DetailInput
                    label="Last Name"
                    value={formData.lastName || ""}
                    setValue={(value) => handleInputChange("lastName", value)}
                    isRequired
                  />
                </div>

                <div className="flex flex-col px-1 mb-2">
                  <SubSectionTitle title="Company" isRequired />
                  <DetailInput
                    value={formData.company || ""}
                    setValue={(value) => handleInputChange("company", value)}
                    isRequired
                  />
                </div>

                <div className="flex flex-col px-1 mb-2">
                  <SubSectionTitle title="Title" />
                  <DetailInput
                    value={formData.title || ""}
                    setValue={(value) => handleInputChange("title", value)}
                  />
                </div>

                <div className="flex flex-col px-1 mb-2">
                  <SubSectionTitle title="Website" />
                  <DetailInput
                    value={formData.website || ""}
                    setValue={(value) => handleInputChange("website", value)}
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

                <div className="flex flex-col px-1 mb-2">
                  <SubSectionTitle title="Lead Status" isRequired />
                  <DetailInput
                    value={formData.leadStatus || ""}
                    setValue={(value) => handleInputChange("leadStatus", value)}
                    isRequired
                    type="select"
                    options={LEAD_STATUS_OPTIONS}
                  />
                </div>

                <DetailFieldSimple label="Lead Owner" value="Dzaka Athif" />
              </SectionLayout>

              {/* Get in Touch Section */}
              <SectionLayout title="Get in Touch">
                <div className="flex flex-col px-1 mb-2">
                  <SubSectionTitle title="Phone" />
                  <DetailInput
                    value={formData.phone || ""}
                    setValue={(value) => handleInputChange("phone", value)}
                    isRequired
                  />
                </div>

                <div className="flex flex-col px-1 mb-2">
                  <SubSectionTitle title="Email" />
                  <DetailInput
                    value={formData.email || ""}
                    setValue={(value) => handleInputChange("email", value)}
                  />
                </div>

                <div className="flex flex-col px-1 mb-2">
                  <SubSectionTitle title="Address" size="medium" />
                  <DetailInput
                    label="Country"
                    value={formData.country || ""}
                    setValue={(value) => handleInputChange("country", value)}
                    className="px-1"
                    type="select"
                    options={COUNTRY_OPTIONS}
                  />
                  <DetailInput
                    label="Street"
                    value={formData.street || ""}
                    setValue={(value) => handleInputChange("street", value)}
                    type="textarea"
                  />
                  <div className="grid grid-cols-3 gap-3">
                    <DetailInput
                      label="City"
                      value={formData.city || ""}
                      setValue={(value) => handleInputChange("city", value)}
                      className="col-span-2 w-full"
                    />
                    <DetailInput
                      label="State/Province"
                      value={formData.state || ""}
                      setValue={(value) => handleInputChange("state", value)}
                      className="col-span-1 w-full"
                    />
                  </div>

                  <DetailInput
                    label="Zip Code"
                    value={""}
                    setValue={() => {}}
                  />
                </div>
              </SectionLayout>

              {/* Segment Section */}
              <SectionLayout title="Segment">
                <div className="flex flex-col px-1 mb-2">
                  <SubSectionTitle title="No. of Employees" />
                  <DetailInput
                    value={formData.numberOfEmployees || ""}
                    setValue={(value) =>
                      handleInputChange("numberOfEmployees", value)
                    }
                  />
                </div>

                <div className="flex flex-col px-1 mb-2">
                  <SubSectionTitle title="Annual Revenue" />
                  <DetailInput
                    value={formData.annualRevenue || ""}
                    setValue={(value) =>
                      handleInputChange("annualRevenue", value)
                    }
                  />
                </div>
                <div className="flex flex-col px-1 mb-2">
                  <SubSectionTitle title="Lead Source" />
                  <DetailInput
                    value={formData.leadSource || ""}
                    setValue={(value) => handleInputChange("leadSource", value)}
                    type="select"
                    options={LEAD_SOURCE_OPTIONS}
                  />
                </div>
                <div className="flex flex-col px-1 mb-2">
                  <SubSectionTitle title="Industry" />
                  <DetailInput
                    value={formData.industry || ""}
                    setValue={(value) => handleInputChange("industry", value)}
                    type="select"
                    options={INDUSTRY_OPTIONS}
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
