import {
  PillButtonItem,
  PillButtonLayout,
} from "@/components/common/SmallButtons";
import { IoIosStar } from "react-icons/io";
import { VscTriangleDown } from "react-icons/vsc";

export default function MainHeader({ name }: { name: string }) {
  return (
    <div className="p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center">
            <IoIosStar className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <div className="text-[13px] leading-[13px] text-gray-600">Lead</div>
            <h2 className="text-[28px] leading-[35px] text-gray-800">{name}</h2>
          </div>
        </div>

        <div className="flex items-center">
          <PillButtonLayout>
            <PillButtonItem>Convert</PillButtonItem>
            <PillButtonItem>Change Owner</PillButtonItem>
            <PillButtonItem>Edit</PillButtonItem>
            <PillButtonItem className="w-8 p-0" isLastItem>
              <VscTriangleDown className="w-[14px] h-[14px]" />
            </PillButtonItem>
          </PillButtonLayout>
        </div>
      </div>
    </div>
  );
}
