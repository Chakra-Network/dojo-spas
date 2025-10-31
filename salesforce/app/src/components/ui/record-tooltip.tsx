import * as React from "react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { X } from "lucide-react";

interface RecordTooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
}

export function RecordTooltip({ children, content }: RecordTooltipProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Tooltip open={open} onOpenChange={setOpen}>
      <TooltipTrigger
        asChild
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        {children}
      </TooltipTrigger>
      <RecordTooltipContentWrapper onClose={() => setOpen(false)}>
        {content}
      </RecordTooltipContentWrapper>
    </Tooltip>
  );
}

interface RecordTooltipContentWrapperProps {
  children: React.ReactNode;
  onClose: () => void;
}

function RecordTooltipContentWrapper({
  children,
  onClose,
}: RecordTooltipContentWrapperProps) {
  return (
    <TooltipContent
      side="right"
      align="center"
      className="rounded-lg min-w-[300px] max-w-[400px] border-0 relative p-0 "
      onMouseEnter={(e) => e.stopPropagation()}
    >
      <div className="w-full h-full bg-[rgba(243,243,243,1)] z-60 p-3 pb-0 ml-1 rounded-lg relative">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="absolute top-1 right-1 text-gray-400 hover:text-gray-600 transition-colors z-10"
        >
          <X className="w-4 h-4" strokeWidth={2} />
        </button>
        {children}
      </div>
    </TooltipContent>
  );
}

interface RecordTooltipContentProps {
  icon: React.ComponentType<{ className?: string }>;
  iconBgColor: string;
  title: string;
  children: React.ReactNode;
}

export function RecordTooltipContent({
  icon: Icon,
  iconBgColor,
  title,
  children,
}: RecordTooltipContentProps) {
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-3 pr-6 mb-6">
        <div
          className={`w-9 h-9 rounded-full ${iconBgColor} flex items-center justify-center flex-shrink-0`}
        >
          <Icon className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-[24px] leading-[30px] text-gray-900">{title}</h3>
      </div>
      {children}
    </div>
  );
}

interface RecordTooltipFieldProps {
  label: string;
  value?: string;
  isLink?: boolean;
}

export function RecordTooltipField({
  label,
  value,
  isLink = false,
}: RecordTooltipFieldProps) {
  return (
    <div className="flex flex-col text-[13px] leading-[19.5px] pb-3">
      <div className="text-gray-500">{label}</div>
      {value ? (
        <div
          className={
            isLink
              ? "text-blue-600 hover:underline cursor-pointer"
              : "text-gray-900"
          }
        >
          {value}
        </div>
      ) : (
        <div className="invisible">placeholder</div>
      )}
    </div>
  );
}

interface RecordTooltipFieldRowProps {
  children: React.ReactNode;
}

export function RecordTooltipFieldRow({
  children,
}: RecordTooltipFieldRowProps) {
  return <div className="grid grid-cols-2">{children}</div>;
}
