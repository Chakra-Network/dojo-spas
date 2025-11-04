interface DoneProps {
  className?: string;
}

export function Done({ className }: DoneProps) {
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
        stroke="lch(48% 59.31 288.43)"
        stroke-width="1.5"
        stroke-dasharray="3.14 0"
        stroke-dashoffset="-0.7"
      ></circle>
      <circle
        className="progress"
        cx="7"
        cy="7"
        r="3"
        fill="none"
        stroke="lch(48% 59.31 288.43)"
        stroke-width="6"
        stroke-dasharray="18.84955592153876 37.69911184307752"
        stroke-dashoffset="0"
        transform="rotate(-90 7 7)"
      ></circle>
      <path
        className="icon"
        stroke="none"
        d="M10.951 4.24896C11.283 4.58091 11.283 5.11909 10.951 5.45104L5.95104 10.451C5.61909 10.783 5.0809 10.783 4.74896 10.451L2.74896 8.45104C2.41701 8.11909 2.41701 7.5809 2.74896 7.24896C3.0809 6.91701 3.61909 6.91701 3.95104 7.24896L5.35 8.64792L9.74896 4.24896C10.0809 3.91701 10.6191 3.91701 10.951 4.24896Z"
      ></path>
    </svg>
  );
}
