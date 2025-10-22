import { IoIosStar } from "react-icons/io";
import { VscTriangleDown } from "react-icons/vsc";
import { PiGitBranchBold } from "react-icons/pi";
import {
  PillButtonIconItem,
  PillButtonItem,
  PillButtonLayout,
} from "../common/SmallButtons";

export default function ContactHeader({ name }: { name: string }) {
  return (
    <div className="p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
            <IoIosStar className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <div className="text-[13px] leading-[13px] text-gray-600">
              Contact
            </div>
            <h2 className="text-[28px] leading-[35px] text-gray-800">{name}</h2>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <PillButtonIconItem>
            <PiGitBranchBold className="w-[14px] h-[14px] rotate-180" />
          </PillButtonIconItem>
          <PillButtonLayout>
            <PillButtonItem className="border-r">
              New Opportunity
            </PillButtonItem>
            <PillButtonItem className="border-r">Edit</PillButtonItem>
            <PillButtonItem className="w-8 p-0" isLastItem>
              <VscTriangleDown className="w-[14px] h-[14px]" />
            </PillButtonItem>
          </PillButtonLayout>
        </div>
      </div>
    </div>
  );
}
