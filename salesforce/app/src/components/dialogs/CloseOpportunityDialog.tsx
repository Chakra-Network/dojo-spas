import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { DetailInput } from "@/components/common/InputItems";
import type { OpportunityStage } from "@/lib/types";

interface CloseOpportunityDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (closedStage: OpportunityStage) => void;
}

export default function CloseOpportunityDialog({
  isOpen,
  onClose,
  onSave,
}: CloseOpportunityDialogProps) {
  const [selectedStage, setSelectedStage] = useState<OpportunityStage | "">("");

  const handleSave = () => {
    if (selectedStage === "Closed Won" || selectedStage === "Closed Lost") {
      onSave(selectedStage);
      setSelectedStage(""); // Reset for next time
    }
  };

  const handleClose = () => {
    setSelectedStage(""); // Reset on cancel
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="w-[512px] max-h-[90vh] p-0 flex flex-col rounded-t-xl rounded-b-none">
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-gray-200 sr-only">
          <DialogTitle className="text-lg font-semibold">
            Close This Opportunity
          </DialogTitle>
          <DialogDescription className="sr-only">
            Select closed stage for this opportunity
          </DialogDescription>
        </DialogHeader>

        <div className="rounded-lg overflow-hidden flex-1 flex flex-col">
          {/* Header */}
          <div className="p-4 text-center border-b border-gray-200">
            <h1 className="text-xl leading-[25px] font-normal text-gray-900">
              Close This Opportunity
            </h1>
          </div>

          {/* Content */}
          <div className="p-6">
            <DetailInput
              label="Stage"
              value={selectedStage}
              setValue={(value) => setSelectedStage(value as OpportunityStage)}
              type="select"
              options={["Closed Won", "Closed Lost"]}
              isRequired
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-200">
            <button
              onClick={handleClose}
              className="px-4 h-8 text-[13px] flex items-center justify-center text-blue-600 hover:text-blue-800 cursor-pointer font-semibold border border-gray-600 rounded-full"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={!selectedStage}
              className="px-4 h-8 text-[13px] flex items-center justify-center text-white bg-blue-500 hover:bg-blue-600 cursor-pointer font-semibold border border-blue-500 hover:border-blue-600 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Save
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
