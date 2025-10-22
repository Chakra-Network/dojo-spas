import { cn } from "@/lib/utils";

interface SidebarCardLayoutProps {
  children: React.ReactNode;
  header?: {
    title: string;
    subtitle?: React.ReactNode;
  };
  footer?: {
    text: string;
    onClick?: () => void;
  };
}

export function SidebarCardLayout({
  children,
  header,
  footer,
}: SidebarCardLayoutProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {header && (
        <div className="px-6 pt-6">
          <h3 className="text-[16px] leading-[20px] font-semibold text-gray-900 mb-1">
            {header.title}
          </h3>
          {header.subtitle && (
            <div className="text-[12px] leading-[17.5px] text-gray-600">
              {header.subtitle}
            </div>
          )}
        </div>
      )}

      {children}

      {footer && (
        <button
          onClick={footer.onClick}
          className="w-full py-3 text-center text-[16px] leading-[20px] font-semibold text-gray-600 hover:bg-gray-100 border-t border-gray-200 cursor-pointer"
        >
          {footer.text}
        </button>
      )}
    </div>
  );
}

interface SidebarCardItemProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  withTopBorder?: boolean;
  withBottomBorder?: boolean;
}

export function SidebarCardItem({
  children,
  className,
  onClick,
  withTopBorder = false,
  withBottomBorder = false,
}: SidebarCardItemProps) {
  return (
    <>
      {withTopBorder && (
        <div className="px-6">
          <div className="border-t border-gray-200" />
        </div>
      )}
      <div
        onClick={onClick}
        className={cn("py-3 px-6 cursor-pointer ", className)}
      >
        {children}
      </div>
      {withBottomBorder && (
        <div className="px-6">
          <div className="border-b border-gray-200" />
        </div>
      )}
    </>
  );
}
