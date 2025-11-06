export function LowPriority({ className }: { className?: string }) {
  return (
    <svg
      aria-label="Low Priority"
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
      <rect x="1.5" y="8" width="3" height="6" rx="1"></rect>
      <rect x="6.5" y="5" width="3" height="9" rx="1" fillOpacity="0.4"></rect>
      <rect
        x="11.5"
        y="2"
        width="3"
        height="12"
        rx="1"
        fillOpacity="0.4"
      ></rect>
    </svg>
  );
}
