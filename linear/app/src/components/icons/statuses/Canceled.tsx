interface CanceledProps {
  className?: string;
}

export function Canceled({ className }: CanceledProps) {
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
        stroke="#95a2b3"
        strokeWidth="1.5"
        strokeDasharray="3.14 0"
        strokeDashoffset="-0.7"
      ></circle>
      <circle
        className="progress"
        cx="7"
        cy="7"
        r="3"
        fill="none"
        stroke="#95a2b3"
        strokeWidth="6"
        strokeDasharray="18.84955592153876 37.69911184307752"
        strokeDashoffset="0"
        transform="rotate(-90 7 7)"
      ></circle>
      <path
        className="icon"
        stroke="none"
        d="M3.73657 3.73657C4.05199 3.42114 4.56339 3.42114 4.87881 3.73657L5.93941 4.79716L7 5.85775L9.12117 3.73657C9.4366 3.42114 9.94801 3.42114 10.2634 3.73657C10.5789 4.05199 10.5789 4.56339 10.2634 4.87881L8.14225 7L10.2634 9.12118C10.5789 9.4366 10.5789 9.94801 10.2634 10.2634C9.94801 10.5789 9.4366 10.5789 9.12117 10.2634L7 8.14225L4.87881 10.2634C4.56339 10.5789 4.05199 10.5789 3.73657 10.2634C3.42114 9.94801 3.42114 9.4366 3.73657 9.12118L4.79716 8.06059L5.85775 7L3.73657 4.87881C3.42114 4.56339 3.42114 4.05199 3.73657 3.73657Z"
      ></path>
    </svg>
  );
}
