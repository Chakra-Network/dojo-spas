import { Ellipsis } from "lucide-react";
import type { JSX } from "react";
import { HiChevronUp } from "react-icons/hi2";
import { LiaEdit } from "react-icons/lia";

export default function MessagingButton() {
  return (
    <div className="fixed bottom-0 right-2 bg-white border border-gray-300 rounded-t-lg shadow-lg hover:shadow-xl transition-shadow w-[288px]">
      <div className="flex items-center justify-between px-3 py-2 gap-2">
        {/* Left side: Profile picture with online indicator + Messaging text */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <img
              src="https://i.pravatar.cc/40?img=33"
              alt="User"
              className="w-[32px] h-[32px] rounded-full"
            />
            {/* Online indicator */}
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          <button className="text-[14px] font-semibold text-gray-900 hover:underline">
            Messaging
          </button>
        </div>

        {/* Right side: Control buttons */}
        <div className="flex items-center">
          <ControlButton Icon={Ellipsis} />
          <ControlButton Icon={LiaEdit} />
          <ControlButton Icon={HiChevronUp} />
        </div>
      </div>
    </div>
  );
}

function ControlButton({ Icon }: { Icon: JSX.ElementType }) {
  return (
    <button className="h-8 w-8 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors cursor-pointer">
      <Icon className="w-4 h-4 text-gray-900" />
    </button>
  );
}
