import {
  Bold,
  Italic,
  Strikethrough,
  Link2,
  List,
  ListOrdered,
  Paperclip,
  Smile,
  AtSign,
  ExternalLink,
} from "lucide-react";
import type { JSX } from "react";
import { PiArrowBendLeftUpFill } from "react-icons/pi";
import { SlackLogo, SlackEmptyState } from "@/components/resources/svgs";

export default function SlackPanel() {
  return (
    <div className="flex flex-col gap-3">
      <div className="bg-white rounded-[20px] shadow-[0_0_15px_rgba(0,0,0,0.1)]  overflow-hidden h-[645px] flex flex-col">
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200 h-[50px]">
          <SlackLogo className="w-6 h-6 shrink-0" />
          <h3 className="text-xl leading-[30px] font-bold text-gray-800">
            Slack Channel
          </h3>
        </div>

        {/* Content with gradient background */}
        <div className="flex flex-col bg-gradient-to-b from-blue-50 to-white flex-1">
          {/* Illustration */}
          <div className="flex flex-col flex-1 justify-center">
            <div className="px-6 pt-6">
              <div className="mb-6 flex justify-center">
                <SlackEmptyState className="w-auto h-[164px] object-contain" />
              </div>

              {/* Title */}
              <h4 className="text-2xl leading-[30px] font-bold text-gray-700  text-center">
                Better collaboration with Slack
              </h4>
              {/* Description */}
              <p className="text-[13px] leading-[19.5px] text-gray-600 text-center mt-4 mx-6">
                Slack Channels in Salesforce are a place to collaborate and talk
                about your work. Anyone can follow the conversation here or in
                the Slack app.{" "}
                <a href="#" className="text-[#0176D3] hover:underline">
                  Learn more about Slack
                </a>
              </p>
            </div>
          </div>

          {/* Formatting Toolbar */}
          <div className="border border-gray-300 rounded-lg mx-4 mb-4 overflow-hidden">
            <div className="flex items-center gap-1 p-2 bg-gray-100">
              <ToolbarButton Icon={Bold} onClick={() => {}} />
              <ToolbarButton Icon={Italic} onClick={() => {}} />
              <ToolbarButton Icon={Strikethrough} onClick={() => {}} />
              <ToolbarButton Icon={Link2} onClick={() => {}} />
              <ToolbarButton Icon={ListOrdered} onClick={() => {}} />
              <ToolbarButton Icon={List} onClick={() => {}} />
              <ToolbarButton Icon={Paperclip} onClick={() => {}} />
              <ToolbarButton Icon={Smile} onClick={() => {}} />
              <ToolbarButton Icon={AtSign} onClick={() => {}} />
            </div>
            <textarea
              placeholder="Post an update on this lead or @mention someone to start the conversation."
              className="w-full p-2 text-[13px] leading-[19.5px] text-gray-700 resize-none focus:outline-none"
              rows={3}
            />
          </div>

          {/* Footer */}
          <div className="text-[10px] leading-[15px] text-gray-700 mb-4 mx-6 flex items-center gap-1">
            Already using Slack?{" "}
            <a
              href="#"
              className="text-[#0176D3] hover:underline flex items-center"
            >
              Link an existing channel
              <ExternalLink
                className="w-[14px] h-[14px] ml-1 mt-1"
                strokeWidth={2.5}
              />
            </a>
          </div>
        </div>
      </div>
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

function ToolbarButton({
  Icon,
  onClick,
}: {
  Icon: JSX.ElementType;
  onClick: () => void;
}) {
  return (
    <button
      className="p-1.5 text-blue-600 hover:text-blue-700 rounded cursor-pointer"
      onClick={onClick}
    >
      <Icon className="w-4 h-4" strokeWidth={2.5} />
    </button>
  );
}
