import SlackPanel from "@/components/common/panels/SlackPanel";
import FilesPanel from "../common/panels/FilesPanel";
import CommonPanelHeader from "../common/header/CommonPanelHeader";
import { GiOpenBook } from "react-icons/gi";
import { FaWrench } from "react-icons/fa";
import { TbBriefcase2Filled } from "react-icons/tb";
import { Search } from "lucide-react";
import { CommonFormButton } from "../common/SmallButtons";

const HISTORY_ENTRIES = [
  {
    date: "27/10/2025, 7:16 pm",
    field: "Status",
    user: "Dzaka Athif",
    originalValue: "Escalated",
    newValue: "Closed",
  },
  {
    date: "27/10/2025, 7:16 pm",
    field: "Status",
    user: "Dzaka Athif",
    originalValue: "Waiting on Customer",
    newValue: "Escalated",
  },
  {
    date: "27/10/2025, 7:16 pm",
    field: "Status",
    user: "Dzaka Athif",
    originalValue: "Working",
    newValue: "Waiting on Customer",
  },
];

export default function RightPanel() {
  return (
    <div className="flex flex-col gap-3">
      <SlackPanel />
      <KnowledgePanel />

      <div className="bg-white rounded-[20px] shadow-[0_0_15px_rgba(0,0,0,0.1)] overflow-hidden">
        <CommonPanelHeader
          icon={{ Icon: GiOpenBook, bg: "bg-[#cb66ff]" }}
          title="Articles"
          count={0}
        />
      </div>
      <div className="bg-white rounded-[20px] shadow-[0_0_15px_rgba(0,0,0,0.1)] overflow-hidden">
        <CommonPanelHeader
          icon={{ Icon: FaWrench, bg: "bg-[#08a49a]" }}
          title="Case Comments"
          count={0}
        />
      </div>
      <FilesPanel />
      <CaseHistoryPanel />
    </div>
  );
}

function KnowledgePanel() {
  return (
    <div className="bg-white rounded-[20px] shadow-[0_0_15px_rgba(0,0,0,0.1)]">
      {/* Header Row */}
      <div className="flex items-center justify-between px-4 py-3">
        <h3 className="text-xl leading-[25px] text-gray-800 ">Knowledge</h3>
        <CommonFormButton variant="secondary">New Article</CommonFormButton>
      </div>

      <div className="px-3 pb-3 flex flex-col">
        {/* Filters and Search */}
        <div className="flex items-center gap-3">
          <CommonFormButton variant="primary">Filters</CommonFormButton>
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search Knowledge..."
              className="w-full h-10 pl-10 pr-4 border border-gray-300 rounded-md text-[13px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="mt-4 h-[27.5px]" />
      </div>
    </div>
  );
}

function CaseHistoryPanel() {
  return (
    <div className="bg-white rounded-[20px] shadow-[0_0_15px_rgba(0,0,0,0.1)] overflow-hidden">
      <CommonPanelHeader
        icon={{ Icon: TbBriefcase2Filled, bg: "bg-[#cb66ff]" }}
        title="Case History"
        count={3}
      />

      {/* History Entries */}
      <div className="py-3 pl-1">
        {HISTORY_ENTRIES.map((entry, index) => (
          <div key={index} className="px-4 py-1">
            <div className="grid grid-cols-[120px_1fr] gap-x-4 gap-y-1 text-[13px]">
              <span className="text-gray-600">Date:</span>
              <span className="text-gray-800">{entry.date}</span>

              <span className="text-gray-600">Field:</span>
              <span className="text-gray-800">{entry.field}</span>

              <span className="text-gray-600">User:</span>
              <a href="#" className="text-[#0176D3] hover:underline">
                {entry.user}
              </a>

              <span className="text-gray-600">Original Value:</span>
              <span className="text-gray-800">{entry.originalValue}</span>

              <span className="text-gray-600">New Value:</span>
              <span className="text-gray-800">{entry.newValue}</span>
            </div>
          </div>
        ))}
      </div>

      {/* View All Link */}
      <div className="border-t border-gray-200 py-3 text-center">
        <a
          href="#"
          className="text-[#0176D3] text-[13px] font-semibold hover:underline"
        >
          View All
        </a>
      </div>
    </div>
  );
}
