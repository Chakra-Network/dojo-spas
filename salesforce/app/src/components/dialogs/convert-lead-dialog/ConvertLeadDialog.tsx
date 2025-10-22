import { useState } from "react";
import { useAppContext } from "@/context/AppProvider";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Search, X } from "lucide-react";
import {
  EmptySection,
  SectionLayout,
  SubSectionContainer,
} from "./SectionItems";
import {
  CollapsedInput,
  DetailInput,
  RadioInput,
  SubSectionTitle,
} from "@/components/common/InputItems";

interface ConvertLeadDialogProps {
  isOpen: boolean;
  leadId: string | null;
  onClose: () => void;
  onConvert: () => void;
}

export default function ConvertLeadDialog({
  isOpen,
  leadId,
  onClose,
  onConvert,
}: ConvertLeadDialogProps) {
  const { getLead } = useAppContext();
  const leadData = leadId ? getLead(leadId) : undefined;

  // Form state
  const [accountOption, setAccountOption] = useState<"new" | "existing">("new");
  const [accountName, setAccountName] = useState(leadData?.lastName || "");
  const [accountSearch, setAccountSearch] = useState("");

  const [contactOption, setContactOption] = useState<"new" | "existing">("new");
  const [contactName] = useState(
    leadData ? `${leadData.salutation || "Mr."} ${leadData.name}` : ""
  );

  const [opportunityOption, setOpportunityOption] = useState<
    "new" | "existing"
  >("new");
  const [opportunityName] = useState(
    leadData?.company ? `${leadData.company}-` : ""
  );
  const [dontCreateOpportunity, setDontCreateOpportunity] = useState(false);

  const [convertedStatus, setConvertedStatus] = useState("Qualified");

  const handleConvert = () => {
    onConvert();
  };

  if (!leadData) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[1024px] max-h-[90vh] p-0 flex flex-col">
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-gray-200 sr-only">
          <DialogTitle className="text-lg font-semibold">
            Convert Lead
          </DialogTitle>
          <DialogDescription className="sr-only">
            Convert Lead
          </DialogDescription>
        </DialogHeader>

        <div className="rounded-lg overflow-hidden flex-1 flex flex-col">
          <div className="overflow-y-auto pb-16 flex-1">
            {/* Header */}
            <div className="p-4 text-center">
              <h1 className="text-xl leading-[25px] font-normal text-gray-900">
                Convert Lead
              </h1>
            </div>

            <div className="pb-8">
              {/* Account Section */}

              <SectionLayout
                title="Account"
                firstSection={
                  <>
                    <RadioInput
                      id="account-new"
                      label="Create New Account"
                      checked={accountOption === "new"}
                      onChange={() => setAccountOption("new")}
                    />
                    {accountOption === "new" && (
                      <SubSectionContainer>
                        <DetailInput
                          label="Account Name"
                          value={accountName}
                          setValue={(value) => setAccountName(value)}
                          isRequired
                        />
                      </SubSectionContainer>
                    )}
                  </>
                }
                secondSection={
                  <>
                    <RadioInput
                      id="account-existing"
                      label="Choose Existing Account"
                      checked={accountOption === "existing"}
                      onChange={() => setAccountOption("existing")}
                    />
                    <div className="mt-3">
                      <label className="block text-[13px] mb-2">
                        Account Search
                      </label>
                      <div className="relative mb-[52px]">
                        <input
                          type="text"
                          value={accountSearch}
                          onChange={(e) => setAccountSearch(e.target.value)}
                          placeholder="Search for matching accounts"
                          className="w-full px-3 h-9 pr-10 border border-gray-300 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                        />
                        <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      </div>
                      <div className="mt-2 px-4 py-2 h-[94px]  rounded-lg border border-gray-300 text-[12px] leading-[18px] text-gray-600 bg-white">
                        0 Account Matches
                      </div>
                    </div>
                  </>
                }
              />

              {/* Contact Section */}
              <SectionLayout
                title="Contact"
                firstSection={
                  <>
                    <RadioInput
                      id="contact-new"
                      label="Create New Contact"
                      checked={contactOption === "new"}
                      onChange={() => setContactOption("new")}
                    />
                    {contactOption === "new" && (
                      <CollapsedInput
                        value={contactName}
                        onClick={() => setContactOption("new")}
                      />
                    )}
                  </>
                }
                secondSection={
                  <>
                    <RadioInput
                      id="contact-existing"
                      label="Choose Existing Contact"
                      checked={contactOption === "existing"}
                      onChange={() => setContactOption("existing")}
                    />
                    <EmptySection>0 Contact Matches detected</EmptySection>
                  </>
                }
              />

              {/* Opportunity Section */}
              <SectionLayout
                title="Opportunity"
                firstSection={
                  <>
                    <RadioInput
                      id="opportunity-new"
                      label="Create New Opportunity"
                      checked={opportunityOption === "new"}
                      onChange={() => setOpportunityOption("new")}
                    />
                    {opportunityOption === "new" && (
                      <div className="mt-3 space-y-3">
                        <CollapsedInput
                          value={opportunityName}
                          onClick={() => setOpportunityOption("new")}
                        />
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            id="dont-create-opportunity"
                            checked={dontCreateOpportunity}
                            onChange={(e) =>
                              setDontCreateOpportunity(e.target.checked)
                            }
                            className="cursor-pointer"
                          />
                          <label
                            htmlFor="dont-create-opportunity"
                            className="text-[10px] leading-[15px] cursor-pointer text-gray-500"
                          >
                            Don't create an opportunity upon conversion
                          </label>
                        </div>
                      </div>
                    )}
                  </>
                }
                secondSection={
                  <>
                    <RadioInput
                      id="opportunity-existing"
                      label="Choose Existing Opportunity"
                      checked={opportunityOption === "existing"}
                      onChange={() => setOpportunityOption("existing")}
                    />
                    <EmptySection>
                      To find opportunity, choose an existing account
                    </EmptySection>
                  </>
                }
              />

              {/* Record Owner Section */}
              <div className="grid grid-cols-2 gap-3 items-center p-4">
                <div className="flex flex-col">
                  <SubSectionTitle title="Record Owner" isRequired />
                  <div className="rounded-lg border border-gray-300 p-1  bg-white">
                    <div className="flex-1 flex items-center gap-2 px-3 py-2  border border-gray-300 rounded cursor-pointer hover:bg-gray-100">
                      <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-[11px] font-semibold">
                        DA
                      </div>
                      <span className="text-[13px]">
                        {leadData.leadOwner || "Dzaka Athif"}
                      </span>
                      <button className="ml-auto p-1 rounded">
                        <X className="w-4 h-4 text-gray-500" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Converted Status Section */}
                <DetailInput
                  label="Converted Status"
                  value={convertedStatus}
                  setValue={setConvertedStatus}
                  isRequired
                  type="select"
                  options={["Qualified", "Unqualified"]}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="rounded-b-lg flex justify-end gap-3 px-4 py-3 border-t-2 border-gray-200 absolute bottom-[-1px] w-full bg-white/60 backdrop-blur-sm">
              <button
                onClick={onClose}
                className="px-4 h-8 text-[13px] flex items-center justify-center text-blue-600 hover:text-blue-800 cursor-pointer font-semibold border border-gray-600 rounded-full"
              >
                Cancel
              </button>
              <button
                onClick={handleConvert}
                className="px-4 h-8 text-[13px] flex items-center justify-center text-white bg-blue-500 hover:bg-blue-600 cursor-pointer font-semibold border border-blue-500 hover:border-blue-600 rounded-full"
              >
                Convert
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
