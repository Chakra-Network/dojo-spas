import { ChevronDown, Upload } from "lucide-react";
import { PiSuitcaseFill, PiChatsFill, PiFilesFill } from "react-icons/pi";

export default function RightPanel() {
  return (
    <div className="flex flex-col gap-3">
      {/* Opportunities Section */}
      <div className="bg-white rounded-[20px] shadow-[0_0_15px_rgba(0,0,0,0.1)] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <PiSuitcaseFill className="w-6 h-6 text-orange-500" />
            <h3 className="text-xl leading-[30px] font-bold text-gray-800">
              Opportunities (1)
            </h3>
          </div>
          <button className="p-1 hover:bg-gray-100 rounded">
            <ChevronDown className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          <a
            href="#"
            className="text-[#0176D3] hover:underline text-base font-medium mb-3 block"
          >
            test-
          </a>
          <div className="space-y-2">
            <div className="flex gap-2">
              <span className="text-sm text-gray-600 min-w-[90px]">Stage:</span>
              <span className="text-sm text-gray-800">Qualify</span>
            </div>
            <div className="flex gap-2">
              <span className="text-sm text-gray-600 min-w-[90px]">
                Amount:
              </span>
              <span className="text-sm text-gray-800"></span>
            </div>
            <div className="flex gap-2">
              <span className="text-sm text-gray-600 min-w-[90px]">
                Close Date:
              </span>
              <span className="text-sm text-gray-800">31/12/2025</span>
            </div>
          </div>
          <a
            href="#"
            className="text-[#0176D3] hover:underline text-sm mt-4 block text-center"
          >
            View All
          </a>
        </div>
      </div>

      {/* Cases Section */}
      <div className="bg-white rounded-[20px] shadow-[0_0_15px_rgba(0,0,0,0.1)] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <PiChatsFill className="w-6 h-6 text-pink-500" />
            <h3 className="text-xl leading-[30px] font-bold text-gray-800">
              Cases (0)
            </h3>
          </div>
          <button className="p-1 hover:bg-gray-100 rounded">
            <ChevronDown className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Files Section */}
      <div className="bg-white rounded-[20px] shadow-[0_0_15px_rgba(0,0,0,0.1)] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <PiFilesFill className="w-6 h-6 text-gray-600" />
            <h3 className="text-xl leading-[30px] font-bold text-gray-800">
              Files (0)
            </h3>
          </div>
          <button className="p-1 hover:bg-gray-100 rounded">
            <ChevronDown className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="px-4 py-6">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <button className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded text-sm font-medium text-gray-700 hover:bg-gray-50">
              <Upload className="w-4 h-4" />
              Upload Files
            </button>
            <p className="text-sm text-gray-600 mt-2">Or drop files</p>
          </div>
        </div>
      </div>
    </div>
  );
}
