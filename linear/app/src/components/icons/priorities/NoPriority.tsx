export function NoPriority({ className }: { className?: string }) {
  return (
    <svg
      aria-label="No Priority"
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="lch(64.892% 1.933 272 / 1)"
      role="img"
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
      style={
        { "--icon-color": "lch(64.892% 1.933 272 / 1)" } as React.CSSProperties
      }
    >
      <rect
        x="1.5"
        y="7.25"
        width="3"
        height="1.5"
        rx="0.5"
        opacity="0.9"
      ></rect>
      <rect
        x="6.5"
        y="7.25"
        width="3"
        height="1.5"
        rx="0.5"
        opacity="0.9"
      ></rect>
      <rect
        x="11.5"
        y="7.25"
        width="3"
        height="1.5"
        rx="0.5"
        opacity="0.9"
      ></rect>
    </svg>
  );
}
