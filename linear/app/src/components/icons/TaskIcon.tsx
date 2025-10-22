import { cn } from "@/lib/utils";

export function TaskIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={cn("color-override", className)}
      viewBox="0 0 16 16"
      role="img"
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
    >
      <path d="M1 3.25A2.25 2.25 0 0 1 3.25 1h9.5A2.25 2.25 0 0 1 15 3.25v2.5c0 .757-.374 1.427-.947 1.835a2 2 0 0 0-.369-.343L7.626 2.874c-1.356-.977-3.298.079-3.114 1.803L4.867 8H3.25A2.25 2.25 0 0 1 1 5.75z" />
      <path d="M12.806 8.458 6.748 4.09a.47.47 0 0 0-.745.427L6.79 11.9a.47.47 0 0 0 .704.355l1.83-1.021 2.295 3.59c.145.18.402.229.604.114l.52-.299a.465.465 0 0 0 .203-.575l-1.99-3.764 1.807-1.06a.464.464 0 0 0 .042-.782" />
    </svg>
  );
}
