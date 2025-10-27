import { PiArrowBendLeftUpFill } from "react-icons/pi";
import SlackPanel from "@/components/common/panels/SlackPanel";

export default function RightPanel() {
  return (
    <div className="flex flex-col gap-3">
      <SlackPanel />

      {/* Duplicate Lead Alert */}
      <div className="bg-white border border-gray-300 rounded-[20px] px-4 py-3 flex items-center gap-3 w-full">
        <div className="flex items-center justify-center w-6 h-6 bg-orange-500 rounded-full">
          <PiArrowBendLeftUpFill className="w-5 h-5 text-white flex-shrink-0" />
        </div>
        <p className="text-xl leading-[25px] text-gray-800">
          We found no potential duplicates of this Lead.
        </p>
      </div>
    </div>
  );
}
