import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "outline";
  size?: "default" | "icon";
  children: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "default", size = "default", children, ...props },
    ref
  ) => {
    const baseStyles =
      "rounded-full font-semibold transition-colors items-center flex justify-center gap-2 cursor-pointer";

    const variantStyles = {
      default: "bg-[#0A66C2] text-white hover:bg-[#004182]",
      secondary: "border border-[#0A66C2] text-[#0A66C2] hover:bg-blue-50",
      outline: "border border-gray-400 text-gray-600 hover:bg-gray-50",
    };

    const sizeStyles = {
      default: "px-4 h-8 text-[16px]",
      icon: "p-2",
    };

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
