import { cn } from "@/lib/utils";

interface AvatarProps {
  src: string;
  alt: string;
  size?: "xs" | "sm" | "md" | "lg";
  className?: string;
}

export default function Avatar({
  src,
  alt,
  size = "md",
  className,
}: AvatarProps) {
  const sizeClasses = {
    xs: "w-4 h-4 text-[10px]",
    sm: "w-[18px] h-[18px] text-xs",
    md: "w-6 h-6 text-sm",
    lg: "w-10 h-10 text-lg",
  };

  return (
    <div
      className={cn(
        "rounded-full flex items-center justify-center shrink-0 bg-gray-800",
        sizeClasses[size],
        className
      )}
      title={alt}
    >
      {src}
    </div>
  );
}
