import { useState, useEffect } from "react";
import { useAppContext } from "@/context/AppProvider";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { CARD_TYPES } from "@/lib/consts/card-types";
import { cn } from "@/lib/utils";
import { IoMdHome } from "react-icons/io";
import { FaCheck } from "react-icons/fa6";

export default function ChangeHomeCardDialog() {
  const { state, closeChangeHomeCardDialog, changeCardAtSlot } =
    useAppContext();

  const {
    isChangeHomeCardDialogOpen,
    changingCardSlotIndex,
    dashboardCardSlots,
  } = state;

  const [selectedCardType, setSelectedCardType] = useState<string>("");

  // Pre-select the current card type when dialog opens
  useEffect(() => {
    if (isChangeHomeCardDialogOpen && changingCardSlotIndex !== null) {
      const currentCardType = dashboardCardSlots[changingCardSlotIndex];
      setSelectedCardType(currentCardType);
    }
  }, [isChangeHomeCardDialogOpen, changingCardSlotIndex, dashboardCardSlots]);

  const handleSubmit = () => {
    if (changingCardSlotIndex !== null && selectedCardType) {
      changeCardAtSlot(changingCardSlotIndex, selectedCardType);
      closeChangeHomeCardDialog();
    }
  };

  const handleCancel = () => {
    closeChangeHomeCardDialog();
  };

  const cardTypesList = Object.values(CARD_TYPES);

  return (
    <Dialog open={isChangeHomeCardDialogOpen} onOpenChange={handleCancel}>
      <DialogContent className="max-w-[833px] max-h-[85vh] p-0 gap-0 flex flex-col rounded-[20px]">
        {/* Header */}
        <DialogHeader className="p-4 border-b-2 border-gray-300 gap-0 flex flex-col">
          <DialogTitle className="text-xl leading-[25px] font-normal text-gray-900 text-center">
            Change Home Card
          </DialogTitle>
          <DialogDescription className="text-[13px] leading-[19.5px] text-gray-600 text-center">
            These images are examples. You can filter cards on Home.
          </DialogDescription>
        </DialogHeader>

        {/* Scrollable Body */}
        <div className="overflow-y-auto p-8 flex flex-col gap-4 h-full">
          {cardTypesList.map((cardType) => {
            const isSelected = selectedCardType === cardType.id;
            const isOnHomePage = dashboardCardSlots.includes(cardType.id);
            const isDisabled = !cardType.enabled;

            return (
              <button
                key={cardType.id}
                onClick={() => !isDisabled && setSelectedCardType(cardType.id)}
                disabled={isDisabled}
                className={cn(
                  "w-full border rounded-lg p-3 transition-all cursor-pointer flex items-center h-[144.5px] relative",
                  isSelected && !isDisabled
                    ? "border-[rgba(6,106,254,1)] shadow-[0_0_0_1px_rgba(6,106,254,1)]"
                    : "border-gray-200 hover:border-[rgba(6,106,254,1)] hover:shadow-[0_0_0_1px_rgba(6,106,254,1)]",
                  isDisabled &&
                    "opacity-50 pointer-events-none hover:border-gray-200"
                )}
              >
                {/* Blue triangle indicator for selected card */}
                {isSelected && !isDisabled && (
                  <>
                    <div className="absolute top-[-1px] right-[-1px] w-0 h-0 border-t-[35px] border-t-blue-500 border-l-[35px] border-l-transparent rounded-tr-lg" />
                    <FaCheck className="absolute top-[2px] right-[2px] w-4 h-4 text-white z-10" />
                  </>
                )}
                {/* Preview Section */}
                <div className="pr-2">
                  <cardType.previewComponent className="h-[118.5px] w-[232px]" />
                </div>

                {/* Content Section */}
                <div className="flex-1 text-left flex flex-col justify-between h-full px-2">
                  <div className="flex flex-col px-2">
                    <h3 className="text-[12px] leading-[15px] font-bold text-gray-900">
                      {cardType.name}
                    </h3>
                    <p className="text-[12px] leading-[18px] mt-1 text-gray-600 mb-3">
                      {cardType.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pl-2">
                    <div className="flex gap-2 px-2">
                      {cardType.category.map((cat) => (
                        <span
                          key={cat}
                          className={cn(
                            "px-2 py-1 text-[12px] rounded h-6 text-[rgba(46,46,46,1)]",
                            cat === "Sales" && "bg-[rgba(172,243,228,1)]",
                            cat === "Marketing" && "bg-[rgba(253,221,227,1)]",
                            cat === "Service" && "bg-[rgba(249,227,218,1)]",
                            cat === "General" && "bg-[rgba(237,244,255,1)] "
                          )}
                        >
                          {cat}
                        </span>
                      ))}
                    </div>
                    {isOnHomePage && (
                      <div className="px-2 h-6 flex items-center justify-center">
                        <IoMdHome className="w-4 h-4 text-[rgba(2,80,217,1)]" />
                      </div>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <DialogFooter className="px-4 py-3 border-t-2 border-gray-300">
          <button
            onClick={handleCancel}
            className="px-4 h-8 text-[13px] flex items-center justify-center text-blue-600 hover:text-blue-800 cursor-pointer font-semibold border border-gray-600 rounded-full"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 h-8 text-[13px] flex items-center justify-center text-white bg-blue-500 hover:bg-blue-600 cursor-pointer font-semibold border border-blue-500 hover:border-blue-600 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Change Home Card
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
