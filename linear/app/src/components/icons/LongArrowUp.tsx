export function LongArrowUp({
  className,
  color = "currentColor",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill={color}
      role="img"
      focusable="false"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ "--icon-color": color } as React.CSSProperties}
    >
      <path d="M11.48 5.674a.75.75 0 1 1-.96 1.152L8.75 5.351v6.899a.75.75 0 0 1-1.5 0V5.351L5.48 6.826a.75.75 0 0 1-.96-1.152l3-2.5a.75.75 0 0 1 .96 0l3 2.5Z"></path>
    </svg>
  );
}
