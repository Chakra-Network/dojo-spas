import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default";
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function Badge({
  children,
  variant = "default",
  className,
  onClick,
}: BadgeProps) {
  const variantClasses = {
    default:
      "bg-badge-bg border border-badge-border text-badge-text hover:bg-badge-hover",
  };

  return (
    <button
      className={cn(
        "inline-flex items-center px-1 h-[22px] rounded text-[11px] font-[450] transition-colors",
        variantClasses[variant],
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
