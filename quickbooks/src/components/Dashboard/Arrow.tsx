// Arrow.tsx
import { Box } from "@chakra-ui/react";

type ArrowProps = {
  from: { x: number; y: number };
  to: { x: number; y: number };
  dashed?: boolean;
};

export function Arrow({ from, to, dashed = false }: ArrowProps) {
  const left = Math.min(from.x, to.x);
  const top = Math.min(from.y, to.y);
  const width = Math.abs(to.x - from.x);
  const height = Math.abs(to.y - from.y);

  const viewBox = `0 0 ${width || 1} ${height || 1}`;

  const start = { x: from.x - left, y: from.y - top };
  const end = { x: to.x - left, y: to.y - top };

  // Create 90-degree path with turns
  const createPath = () => {
    // Horizontal then vertical
    if (Math.abs(start.x - end.x) > Math.abs(start.y - end.y)) {
      const midY = start.y;
      const midX = end.x;
      return `M ${start.x},${start.y} L ${midX},${midY} L ${end.x},${end.y}`;
    } 
    // Vertical then horizontal
    else {
      const midX = start.x;
      const midY = end.y;
      return `M ${start.x},${start.y} L ${midX},${midY} L ${end.x},${end.y}`;
    }
  };

  return (
    <Box position="absolute" left={left} top={top} w={width} h={height} pointerEvents="none">
      <svg width={width} height={height} viewBox={viewBox} style={{ overflow: "visible" }}>
        <path
          d={createPath()}
          fill="none"
          stroke="#6B7280"
          strokeWidth="1.5"
          strokeDasharray={dashed ? "4,3" : "none"}
        />
        {/* Arrow head */}
        <polygon
          points={`
            ${end.x},${end.y} 
            ${end.x - 4},${end.y - 3} 
            ${end.x - 4},${end.y + 3}
          `}
          fill="#6B7280"
        />
      </svg>
    </Box>
  );
}