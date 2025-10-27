import { cn } from "@/lib/utils";
import type { JSX } from "react";
import { PillButtonIconItem } from "../SmallButtons";
import { VscTriangleDown } from "react-icons/vsc";

export default function CommonPanelHeader({
  icon,
  title,
  count,
}: {
  icon: {
    Icon: JSX.ElementType;
    bg: string;
  };
  title: string;
  count?: number;
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
          {title} {count !== undefined && `(${count})`}
        </h3>
      </div>
      <PillButtonIconItem className="w-6 h-6">
        <VscTriangleDown className="w-[14px] h-[14px]" />
      </PillButtonIconItem>
    </div>
  );
}
