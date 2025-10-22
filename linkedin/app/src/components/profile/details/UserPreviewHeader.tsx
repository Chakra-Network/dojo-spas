import Button from "@/components/ui/button";
import type { User } from "@/lib/types";
import { IoPaperPlane } from "react-icons/io5";
import { MdVerified } from "react-icons/md";
import { cn } from "@/lib/utils";

interface UserPreviewHeaderProps {
  user: User;
  isVisible?: boolean;
}

export default function UserPreviewHeader({
  user,
  isVisible = true,
}: UserPreviewHeaderProps) {
  return (
    <div
      className={cn(
        "bg-white border-b border-gray-200 sticky top-[53px] z-10 shadow-[0_2px_8px_rgba(0,0,0,0.5)] h-[49px] transition-all duration-300 ease-in-out",
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-full pointer-events-none"
      )}
    >
      <div className="max-w-[1128px] mx-auto px-2 flex items-center gap-3 justify-between h-full">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-8 h-8 rounded-full flex-shrink-0"
          />

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1">
              <h2 className="text-[14px] leading-[20px] font-semibold text-gray-900 truncate">
                {user.name}
              </h2>
              {user.isVerified && (
                <MdVerified className="text-[14px] text-gray-700 flex-shrink-0" />
              )}
            </div>
            <p className="text-[12px] leading-[16px] text-gray-600 truncate">
              {user.title}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline">More</Button>
          <Button variant="default">
            <IoPaperPlane size={14} />
            <span>Message</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
