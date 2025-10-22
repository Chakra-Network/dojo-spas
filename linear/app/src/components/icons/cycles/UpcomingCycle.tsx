export function UpcomingCycle({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      fill="lch(64.892% 1.933 272 / 1)"
      stroke="lch(42.071% 1.933 272 / 1)"
      viewBox="0 0 16 16"
      aria-hidden="true"
      style={{ overflow: "visible" }}
      className={className}
    >
      <circle cx="8" cy="8" r="6.25" fill="none" strokeWidth="1.5" />
      <circle
        cx="8"
        cy="8"
        r="6.25"
        fill="none"
        strokeWidth="1.5"
        strokeDasharray="1.636246173744684"
        strokeDashoffset="0.818123086872342"
      />
      <path
        stroke="none"
        d="M6.95588 5.28329L10.6901 7.43926C11.0235 7.63171 11.0235 8.11283 10.6901 8.30528L6.95588 10.4612C6.62255 10.6537 6.20588 10.4131 6.20588 10.0282L6.20588 5.71631C6.20588 5.33141 6.62255 5.09084 6.95588 5.28329Z"
      />
    </svg>
  );
}
