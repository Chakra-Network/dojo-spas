export default function ChakraLogo({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className={className}
    >
      <defs>
        <linearGradient
          id="chakra-gradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" style={{ stopColor: "#000000", stopOpacity: 1 }} />
          <stop
            offset="100%"
            style={{ stopColor: "#FFFFFF", stopOpacity: 1 }}
          />
        </linearGradient>
      </defs>
      <rect
        x="5"
        y="5"
        width="90"
        height="90"
        rx="12"
        ry="12"
        fill="url(#chakra-gradient)"
      />
    </svg>
  );
}
