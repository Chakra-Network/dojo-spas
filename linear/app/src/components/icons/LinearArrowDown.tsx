export function LinearArrowDown({
  className,
  color = "currentColor",
  rotate = 0,
  disabled = false,
}: {
  className?: string;
  color?: string;
  rotate?: number;
  disabled?: boolean;
}) {
  return (
    <svg
      width="9"
      height="5"
      viewBox="0 0 9 5"
      role="img"
      fill={color}
      focusable="false"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{
        transform: `rotate(${rotate}deg)`,
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? "default" : "cursor-pointer",
      }}
      aria-disabled={disabled}
    >
      <path d="M1.915.557a.667.667 0 0 0-.943.943l2.862 2.862a.942.942 0 0 0 1.333 0L8.028 1.5a.667.667 0 0 0-.943-.943L4.5 3.14 1.915.557Z"></path>
    </svg>
  );
}
