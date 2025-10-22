import type { Highlight } from "@/lib/types";
import { IoPaperPlane } from "react-icons/io5";
import Button from "../ui/button";
import { CardLayout, CardLayoutItem } from "./CardLayout";

interface HighlightsProps {
  highlights?: Highlight[];
}

export default function Highlights({ highlights }: HighlightsProps) {
  if (!highlights || highlights.length === 0) return null;

  return (
    <CardLayout title="Highlights">
      {highlights.map((highlight) => (
        <CardLayoutItem
          key={highlight.id}
          className="flex items-start gap-3 rounded-lg px-6 py-3"
        >
          <div className="w-12 h-12 bg-gradient-to-br from-black to-white rounded-xs flex-shrink-0 flex items-center justify-center" />
          <div className="flex-1">
            <h3 className="text-[16px] leading-[24px] font-semibold text-gray-900">
              {highlight.title}
            </h3>
            <p className="text-[14px] leading-[20px] text-gray-600">
              {highlight.description}
            </p>
            <div className="py-2">
              <Button variant="outline">
                <IoPaperPlane size={16} />
                Message
              </Button>
            </div>
          </div>
        </CardLayoutItem>
      ))}
    </CardLayout>
  );
}
