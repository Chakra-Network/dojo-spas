import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface SectionLayoutProps {
  title: string;
  defaultExpanded?: boolean;
  children: React.ReactNode;
  contentContainerClassName?: string;
}

export default function SectionLayout({
  title,
  defaultExpanded = true,
  children,
  contentContainerClassName,
}: SectionLayoutProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div className="mb-4">
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-2 flex items-center gap-2 h-8 border border-transparent bg-gray-100 rounded-lg cursor-pointer"
      >
        {isExpanded ? (
          <FaChevronDown className="w-4 h-4 text-gray-600 shrink-0 mt-1" />
        ) : (
          <FaChevronRight className="w-4 h-4 text-gray-600 shrink-0 mt-1" />
        )}
        <h3 className="text-[20px] leading-[30px] text-gray-700">{title}</h3>
      </button>

      {/* Content */}
      {isExpanded && (
        <div className={cn("px-3 pt-2", contentContainerClassName)}>
          {children}
        </div>
      )}
    </div>
  );
}

export function FieldWrapper({ children }: { children: React.ReactNode }) {
  return <div className="px-3">{children}</div>;
}
