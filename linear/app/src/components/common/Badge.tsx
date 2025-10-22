import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default";
  className?: string;
}

export default function Badge({
  children,
  variant = "default",
  className,
}: BadgeProps) {
  const variantClasses = {
    default:
      "bg-badge-bg border border-badge-border text-badge-text hover:bg-badge-hover",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center px-1 h-[22px] rounded text-[11px] font-[450] transition-colors",
        variantClasses[variant],
        className
      )}
    >
      {children}
    </div>
  );
}
