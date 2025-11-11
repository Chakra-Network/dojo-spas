interface SVGProps {
  width?: number;
  height?: number;
  className?: string;
}

export default function OpportunityEmptyState({
  className,
  width = 178,
  height = 142,
}: SVGProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 178 142"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      className={className}
    >
      <g clipPath="url(#clip0_3256_99542)">
        <circle cx="71.7656" cy="71" r="71" fill="#FF5D2D" fillOpacity="0.5" />
        <rect
          x="31.8179"
          y="45.4736"
          width="145.448"
          height="64.1486"
          rx="6.02075"
          fill="url(#paint0_linear_3256_99542)"
          stroke="#F3F3F3"
        />
        <rect
          x="37.2959"
          y="99.5381"
          width="135.058"
          height="0.81509"
          fill="#E3F7FF"
        />
        <rect
          x="37.2959"
          y="92.2188"
          width="135.058"
          height="0.81509"
          fill="#E3F7FF"
        />
        <rect
          x="37.2959"
          y="84.8989"
          width="135.058"
          height="0.815095"
          fill="#E3F7FF"
        />
        <rect
          x="37.2959"
          y="77.5796"
          width="135.058"
          height="0.815095"
          fill="#E3F7FF"
        />
        <rect
          x="37.2959"
          y="70.2598"
          width="135.058"
          height="0.815095"
          fill="#E3F7FF"
        />
        <rect
          x="37.2959"
          y="62.9404"
          width="135.058"
          height="0.815095"
          fill="#E3F7FF"
        />
        <rect
          x="37.2959"
          y="55.6206"
          width="135.058"
          height="0.815095"
          fill="#E3F7FF"
        />
        <rect
          x="45.2666"
          y="70.2598"
          width="13.0176"
          height="30.1585"
          fill="#DDDDDD"
        />
        <rect
          x="63.1992"
          y="67.5981"
          width="13.0176"
          height="32.6037"
          fill="#DDDDDD"
        />
        <rect
          x="81.1323"
          y="62.2749"
          width="13.0176"
          height="37.4943"
          fill="#DDDDDD"
        />
        <rect
          x="97.7378"
          y="62.9404"
          width="13.0176"
          height="36.6792"
          fill="#DDDDDD"
        />
        <rect
          x="115.671"
          y="77.5796"
          width="13.0176"
          height="22.0075"
          fill="#DDDDDD"
        />
        <rect
          x="133.604"
          y="67.5981"
          width="13.0176"
          height="32.6037"
          fill="#DDDDDD"
        />
        <rect
          x="151.537"
          y="31"
          width="13.0176"
          height="69.2829"
          fill="#DDDDDD"
        />
        <rect
          width="24.9028"
          height="21.2455"
          transform="matrix(-0.95426 -0.298979 -0.297982 0.954571 37.9614 11.6582)"
          fill="url(#pattern0)"
        />
      </g>
      <defs>
        <pattern
          id="pattern0"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use
            xlinkHref="#image0_3256_99542"
            transform="matrix(0.00326872 0 0 0.00383142 -0.00174887 0)"
          />
        </pattern>
        <linearGradient
          id="paint0_linear_3256_99542"
          x1="302.561"
          y1="66.1352"
          x2="214.336"
          y2="-95.5702"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FBFBFB" />
          <stop offset="1" stopColor="white" />
        </linearGradient>
        <clipPath id="clip0_3256_99542">
          <rect
            width="177"
            height="142"
            fill="white"
            transform="translate(0.765625)"
          />
        </clipPath>
        <image
          id="image0_3256_99542"
          width="307"
          height="261"
          xlinkHref="data:image/png;base64,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"
        />
      </defs>
    </svg>
  );
}
