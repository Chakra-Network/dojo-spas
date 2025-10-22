interface BlockedProps {
  className?: string;
}

export function Blocked({ className }: BlockedProps) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      className={className}
    >
      <circle
        cx="7"
        cy="7"
        r="6"
        fill="none"
        stroke="#f2994a"
        strokeWidth="1.5"
        strokeDasharray="3.14 0"
        strokeDashoffset="-0.7"
      ></circle>
      <circle
        className="progress"
        cx="7"
        cy="7"
        r="2"
        fill="none"
        stroke="#f2994a"
        strokeWidth="4"
        strokeDasharray="11.309733552923255 22.61946710584651"
        strokeDashoffset="6.785840131753953"
        transform="rotate(-90 7 7)"
      ></circle>
    </svg>
  );
}
