interface CurrentCycleProps {
  className?: string;
}

export function CurrentCycle({ className }: CurrentCycleProps) {
  return (
    <svg
      width="16"
      height="16"
      fill="lch(100% 0 272 / 1)"
      stroke="lch(38.29% 1.35 272 / 1)"
      viewBox="0 0 16 16"
      aria-hidden="true"
      className={className}
      style={{ overflow: "visible" }}
    >
      <circle
        transform="rotate(3.331053820913212 6.25 6.25)"
        cx="8"
        cy="8"
        r="6.25"
        fill="none"
        strokeWidth="1.5"
        strokeDasharray="39.269908169872416px"
        strokeDashoffset="11.603171834148371px"
        style={{
          transition: "transform 0.6s, stroke-dashoffset 0.6s",
          strokeLinecap: "round",
          transformBox: "fill-box",
        }}
      ></circle>
      <circle
        transform="rotate(-76 6.25 6.25)"
        cx="8"
        cy="8"
        r="6.25"
        fill="none"
        stroke="lch(48% 59.31 288.43)"
        strokeWidth="1.5"
        strokeDasharray="39.269908169872416px"
        strokeDashoffset="33.666736335724046px"
        style={{
          transition: "stroke-dashoffset 0.6s",
          strokeLinecap: "round",
          transformBox: "fill-box",
        }}
      ></circle>
      <path
        stroke="none"
        d="M6.95588 5.28329L10.6901 7.43926C11.0235 7.63171 11.0235 8.11283 10.6901 8.30528L6.95588 10.4612C6.62255 10.6537 6.20588 10.4131 6.20588 10.0282L6.20588 5.71631C6.20588 5.33141 6.62255 5.09084 6.95588 5.28329Z"
      ></path>
    </svg>
  );
}
