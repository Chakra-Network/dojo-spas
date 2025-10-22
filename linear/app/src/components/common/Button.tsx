import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "ghost" | "icon";
  size?: "sm" | "md" | "lg" | "custom" | "icon";
  disabled?: boolean;
  children: React.ReactNode;
}

export default function Button({
  variant = "default",
  size = "md",
  disabled = false,
  className,
  children,
  ...props
}: ButtonProps) {
  const variantClasses = {
    default: "bg-gray-700 hover:bg-gray-600 text-white",
    ghost: "text-neutral-5 hover:text-neutral-1 hover:bg-hover-4",
    icon: "hover:bg-gray-800 text-gray-400",
  };

  const sizeClasses = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
    lg: "px-4 py-2 text-base",
    icon: "h-6 w-6 flex items-center justify-center rounded-md",
  };

  return (
    <button
      className={cn(
        "rounded transition-colors font-medium cursor-pointer",
        variantClasses[variant],
        size !== "custom" && sizeClasses[size],
        className,
        disabled &&
          "cursor-default hover:bg-transparent hover:text-neutral-5 hover:cursor-default"
      )}
      {...props}
    >
      {children}
    </button>
  );
}
