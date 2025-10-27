import { Upload } from "lucide-react";
import { HiDocumentDuplicate } from "react-icons/hi2";
import { FaCrown } from "react-icons/fa";
import {
  PillButtonIconItem,
  PillButtonStandalone,
} from "../common/SmallButtons";
import { VscTriangleDown } from "react-icons/vsc";
import { TbBriefcase2Filled } from "react-icons/tb";
import type { JSX } from "react";
import { cn } from "@/lib/utils";

export default function RightPanel() {
  return (
    <div className="flex flex-col gap-3">
      {/* Opportunities Section */}
      <div className="bg-white rounded-[20px] shadow-[0_0_15px_rgba(0,0,0,0.1)] overflow-hidden">
        <CommonHeader
          icon={{ Icon: FaCrown, bg: "bg-orange-500" }}
          title="Opportunities"
          count={1}
        />

        {/* Content */}
        <div className="py-3 pl-1 border-b border-gray-300">
          <div className="px-4 py-1 flex flex-row">
            <div className="flex flex-col flex-1">
              <div className="h-5">
                <a
                  href="#"
                  className="text-[#0176D3] hover:underline text-[13px] leading-[19.5px] font-medium block"
                >
                  test-
                </a>
              </div>
              <div className="grid grid-cols-[1fr_2fr] gap-x-2 gap-y-0 text-[13px] leading-[19.5px]">
                <span className="text-gray-600">Stage:</span>
                <span className="text-gray-800">Qualify</span>
                <span className="text-gray-600">Amount:</span>
                <span className="text-gray-800"></span>
                <span className="text-gray-600">Close Date:</span>
                <span className="text-gray-800">31/12/2025</span>
              </div>
            </div>

            <PillButtonIconItem className="w-5 h-5">
              <VscTriangleDown className="w-[12px] h-[12px]" />
            </PillButtonIconItem>
          </div>
        </div>

        <a
          href="#"
          className="text-[#0176D3] hover:underline text-[13px] leading-[19.5px] px-4 py-3 block text-center"
        >
          View All
        </a>
      </div>

      {/* Cases Section */}
      <div className="bg-white rounded-[20px] shadow-[0_0_15px_rgba(0,0,0,0.1)] overflow-hidden">
        <CommonHeader
          icon={{ Icon: TbBriefcase2Filled, bg: "bg-pink-500" }}
          title="Cases"
          count={0}
        />
      </div>

      {/* Files Section */}
      <div className="bg-white rounded-[20px] shadow-[0_0_15px_rgba(0,0,0,0.1)] overflow-hidden">
        <CommonHeader
          icon={{ Icon: HiDocumentDuplicate, bg: "bg-gray-600" }}
          title="Files"
          count={0}
        />

        {/* Content */}
        <div className="px-4 pb-4">
          <div className="border border-dashed border-gray-500 rounded-lg px-8 py-5 text-center">
            <PillButtonStandalone className="mx-auto">
              <Upload className="w-4 h-4" />
              Upload Files
            </PillButtonStandalone>
            <p className="text-[13px] leading-[19.5px] text-gray-600 mt-3">
              Or drop files
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function CommonHeader({
  icon,
  title,
  count,
}: {
  icon: {
    Icon: JSX.ElementType;
    bg: string;
  };
  title: string;
  count: number;
}) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex items-center gap-3">
        <div
          className={cn(
            icon.bg,
            "rounded-full flex items-center justify-center w-6 h-6"
          )}
        >
          <icon.Icon className="w-4 h-4 text-white" />
        </div>
        <h3 className="text-xl leading-[25px] text-gray-800 hover:underline cursor-pointer hover:text-blue-700 transition-all duration-300">
          {title} ({count})
        </h3>
      </div>
      <PillButtonIconItem className="w-6 h-6">
        <VscTriangleDown className="w-[14px] h-[14px]" />
      </PillButtonIconItem>
    </div>
  );
}
