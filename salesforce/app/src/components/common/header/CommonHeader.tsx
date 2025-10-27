import { cn } from "@/lib/utils";
import type { JSX } from "react";

interface CommonHeader {
  title: string;
  name: string;
  icon: {
    Icon: JSX.ElementType;
    bg: string;
  };
  rightButtons: React.ReactNode;
}

export default function CommonHeader({
  title,
  name,
  icon,
  rightButtons,
}: CommonHeader) {
  return (
    <div className="p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center",
              icon.bg
            )}
          >
            <icon.Icon className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <div className="text-[13px] leading-[13px] text-gray-600 capitalize">
              {title}
            </div>
            <h2 className="text-[28px] leading-[35px] text-gray-800">{name}</h2>
          </div>
        </div>

        <div className="flex items-center gap-2">{rightButtons}</div>
      </div>
    </div>
  );
}
