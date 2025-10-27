import CommonPanelHeader from "../header/CommonPanelHeader";
import { HiDocumentDuplicate } from "react-icons/hi2";
import { PillButtonStandalone } from "../SmallButtons";
import { Upload } from "lucide-react";

export default function FilesPanel() {
  return (
    <div className="bg-white rounded-[20px] shadow-[0_0_15px_rgba(0,0,0,0.1)] overflow-hidden">
      <CommonPanelHeader
        icon={{ Icon: HiDocumentDuplicate, bg: "bg-[#939393]" }}
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
  );
}
