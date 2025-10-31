import { useAppContext } from "@/context/AppProvider";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Building2, User, TrendingUp } from "lucide-react";
import ConvertedRecordCard from "./ConvertedRecordCard";
import { LEAD_CONVERT_CELEBRATION_2X_GIF } from "@/components/resources/gifs";

interface AfterConvertLeadDialogProps {
  isOpen: boolean;
  leadId: string | null;
  onClose: () => void;
  onGoToLeads: () => void;
}

export default function AfterConvertLeadDialog({
  isOpen,
  leadId,
  onClose,
  onGoToLeads,
}: AfterConvertLeadDialogProps) {
  const { getLead } = useAppContext();
  const leadData = leadId ? getLead(leadId) : undefined;

  if (!leadData) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[1024px] max-h-[90vh] p-0 flex flex-col gap-0">
        <DialogHeader className="sr-only">
          <DialogTitle>Lead Converted Successfully</DialogTitle>
          <DialogDescription>
            Your lead has been successfully converted
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 flex flex-col bg-[#f3f3f3] rounded-t-lg">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-[32px] leading-[64px] font-light text-gray-600 pt-2 mb-4">
              Your lead has been converted
            </h1>

            {/* Success Icon */}
            <div className="flex justify-center">
              <img
                src={LEAD_CONVERT_CELEBRATION_2X_GIF}
                alt="Lead Converted Celebration"
                className="w-auto h-[144px]"
              />
            </div>
          </div>

          {/* Three Column Layout */}
          <div className="flex items-center justify-center flex-wrap">
            {/* Account Section */}
            <ConvertedRecordCard
              sectionTitle="ACCOUNT"
              icon={Building2}
              iconBgColor="bg-blue-500"
              recordName={leadData.company || leadData.lastName || ""}
              fields={[
                { label: "Phone", value: leadData.phone || "" },
                { label: "Website", value: leadData.website || "" },
                { label: "Billing Address", value: leadData.street || "" },
                {
                  label: "Account Owner",
                  value: leadData.leadOwner || "Dzaka Athif",
                  isLink: true,
                },
              ]}
            />

            {/* Contact Section */}
            <ConvertedRecordCard
              sectionTitle="CONTACT"
              icon={User}
              iconBgColor="bg-purple-500"
              recordName={leadData.name}
              fields={[
                {
                  label: "Account Name",
                  value: leadData.company || leadData.lastName || "",
                },
                { label: "Title", value: leadData.title || "" },
                { label: "Phone", value: leadData.phone || "" },
                { label: "Email", value: leadData.email || "" },
              ]}
            />

            {/* Opportunity Section */}
            <ConvertedRecordCard
              sectionTitle="OPPORTUNITY"
              icon={TrendingUp}
              iconBgColor="bg-orange-500"
              recordName={leadData.company ? `${leadData.company}-` : "test-"}
              fields={[
                {
                  label: "Account Name",
                  value: leadData.company || leadData.lastName || "",
                },
                { label: "Close Date", value: "31/12/2025" },
                { label: "Amount", value: "" },
                {
                  label: "Opportunity Owner",
                  value: leadData.leadOwner || "Dzaka Athif",
                  isLink: true,
                },
              ]}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="rounded-b-lg flex justify-end gap-3 px-8 py-4 border-t border-gray-200  w-full bg-white">
          <button
            onClick={() => {
              /* New Task - no-op */
            }}
            className="px-4 h-8 text-[13px] flex items-center justify-center text-blue-600 hover:text-blue-800 cursor-pointer font-semibold border border-gray-600 rounded-full"
          >
            New Task
          </button>
          <button
            onClick={onGoToLeads}
            className="px-4 h-8 text-[13px] flex items-center justify-center text-white bg-blue-500 hover:bg-blue-600 cursor-pointer font-semibold border border-blue-500 hover:border-blue-600 rounded-full"
          >
            Go to Leads
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
