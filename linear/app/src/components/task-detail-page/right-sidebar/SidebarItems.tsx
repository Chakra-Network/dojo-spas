import { cn } from "@/lib/utils";

interface SidebarIconButtonProps {
  icon: React.ElementType;
  label: string;
}

export function SidebarIconButton({
  icon: IconComponent,
  label,
}: SidebarIconButtonProps) {
  return (
    <button
      type="button"
      className="h-6 w-6 rounded-md hover:bg-hover-4 flex items-center justify-center transition-colors"
      aria-label={label}
    >
      <IconComponent className="w-4 h-4" color="currentColor" />
    </button>
  );
}

export function SidebarButtonLayout({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mb-3 text-[13px] leading-[15.5px] flex items-center min-h-7",
        className
      )}
    >
      {children}
    </div>
  );
}

export function SectionLayout({
  children,
  className,
  title,
}: {
  children: React.ReactNode;
  className?: string;
  title: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col mb-3 text-[13px] leading-[15.5px]",
        className
      )}
    >
      <span className="text-xs leading-[14.5px] font-medium text-neutral-5 mt-4 mb-[10px]">
        {title}
      </span>
      {children}
    </div>
  );
}
