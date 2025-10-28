import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  Box,
  ChakraProvider,
  extendTheme,
  HStack,
  Icon,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  FileText,
  CreditCard,
  DollarSign,
  Package,
  Clipboard,
  Bookmark,
  Database,
  Repeat,
  Clock,
} from "lucide-react";

/**
 * QuickbooksFlow.tsx
 * - Absolute canvas with nodes
 * - Orthogonal (90°) connectors with arrowheads drawn using SVG
 * - Lucide icons inside nodes
 *
 * Tweak node positions in `nodes` array for pixel-perfect layout.
 */

/* ----------- Types ---------- */
type NodeDef = {
  id: string;
  label: string;
  x: number; // left (px)
  y: number; // top (px)
  w?: number; // width
  h?: number; // height
  icon?: React.ElementType;
};

type Connector = {
  from: string;
  to: string;
  color?: string;
  strokeWidth?: number;
};

/* ---------- Node definitions (approx positions) ---------- */
/* Adjust x,y (pixels) to match screenshot exactly */
const nodes: NodeDef[] = [
  { id: "enterBills", label: "Enter Bills", x: 320, y: 40, w: 120, h: 40, icon: FileText },
  { id: "payBills", label: "Pay Bills", x: 640, y: 40, w: 120, h: 40, icon: FileText },

  { id: "acceptCC", label: "Accept Credit Cards", x: 480, y: 140, w: 140, h: 40, icon: CreditCard },
  { id: "createSalesRec", label: "Create Sales Receipts", x: 720, y: 120, w: 140, h: 40, icon: CreditCard },

  { id: "estimates", label: "Estimates", x: 140, y: 220, w: 120, h: 40, icon: Package },
  { id: "createInvoices", label: "Create Invoices", x: 320, y: 220, w: 140, h: 40, icon: FileText },
  { id: "receivePayments", label: "Receive Payments", x: 620, y: 220, w: 140, h: 40, icon: DollarSign },
  { id: "recordDeposits", label: "Record Deposits", x: 920, y: 220, w: 140, h: 40, icon: Database },

  { id: "statementCharges", label: "Statement Charges", x: 240, y: 340, w: 140, h: 40, icon: Clipboard },
  { id: "financeCharges", label: "Finance Charges", x: 420, y: 340, w: 140, h: 40, icon: Bookmark },
  { id: "statements", label: "Statements", x: 560, y: 340, w: 140, h: 40, icon: FileText },

  { id: "reconcile", label: "Reconcile", x: 920, y: 300, w: 120, h: 40, icon: Repeat },
  { id: "enterTime", label: "Enter Time", x: 320, y: 460, w: 120, h: 40, icon: Clock },
];

/* ---------- Connectors (from -> to) ---------- */
/* Colors are optional; you can tweak strokeWidth. */
const connectors: Connector[] = [
  { from: "enterBills", to: "payBills", color: "#9AA0A6", strokeWidth: 4 },
  { from: "enterBills", to: "createInvoices", color: "#9AA0A6", strokeWidth: 4 },
  { from: "estimates", to: "createInvoices", color: "#9AA0A6", strokeWidth: 4 },
  { from: "createInvoices", to: "receivePayments", color: "#9AA0A6", strokeWidth: 4 },
  { from: "receivePayments", to: "recordDeposits", color: "#9AA0A6", strokeWidth: 4 },
  { from: "acceptCC", to: "createSalesRec", color: "#9AA0A6", strokeWidth: 3 },
  { from: "statementCharges", to: "financeCharges", color: "#9AA0A6", strokeWidth: 3 },
  { from: "financeCharges", to: "statements", color: "#9AA0A6", strokeWidth: 3 },
  { from: "createInvoices", to: "enterTime", color: "#9AA0A6", strokeWidth: 3 },
];

/* ---------- Utility: compute center and edge points ---------- */
function rectForNode(n: NodeDef) {
  const w = n.w ?? 140;
  const h = n.h ?? 40;
  return {
    left: n.x,
    top: n.y,
    right: n.x + w,
    bottom: n.y + h,
    width: w,
    height: h,
    cx: n.x + w / 2,
    cy: n.y + h / 2,
  };
}

/* ---------- Choose orthogonal (L-shaped) route ---------- */
/**
 * Returns an SVG path string with two segments (horizontal then vertical OR vertical then horizontal)
 * Path starts at nearest mid-edge of source and ends at nearest mid-edge of destination.
 * We deterministically choose horizontal-first if source is more left than dest, else vertical-first.
 */
function orthogonalPath(srcRect: ReturnType<typeof rectForNode>, dstRect: ReturnType<typeof rectForNode>) {
  // Choose attach points on edges:
  // pick left/mid/right for x and top/mid/bottom for y based on relative positions
  const src = { ...srcRect };
  const dst = { ...dstRect };

  // Candidate edge points: we try to connect using center of edges
  const srcPoints = {
    left: { x: src.left, y: src.cy },
    right: { x: src.right, y: src.cy },
    top: { x: src.cx, y: src.top },
    bottom: { x: src.cx, y: src.bottom },
  };
  const dstPoints = {
    left: { x: dst.left, y: dst.cy },
    right: { x: dst.right, y: dst.cy },
    top: { x: dst.cx, y: dst.top },
    bottom: { x: dst.cx, y: dst.bottom },
  };

  // Decide primary direction based on centers
  const preferHorizontalFirst = src.cx <= dst.cx;

  // Choose edge pair that makes orthogonal L simple:
  // If src is left of dst -> use src.right -> dst.left (horizontal first)
  // If src is above dst -> use src.bottom -> dst.top (vertical first) when horizontally overlapping
  // We'll implement a simple deterministic rule:
  if (preferHorizontalFirst) {
    const start = srcPoints.right;
    const end = dstPoints.left;
    // intermediate corner at (end.x, start.y)
    const corner = { x: end.x, y: start.y };
    return { start, corner, end, order: "HV" } as const;
  } else {
    const start = srcPoints.left;
    const end = dstPoints.right;
    const corner = { x: end.x, y: start.y };
    return { start, corner, end, order: "HV" } as const;
  }
}

/* ---------- Component ---------- */
export function Dashboard() {
  const canvasRef = useRef<HTMLDivElement | null>(null);
  const [size, setSize] = useState({ w: 1200, h: 700 });

  useLayoutEffect(() => {
    function updateSize() {
      if (!canvasRef.current) return;
      const r = canvasRef.current.getBoundingClientRect();
      setSize({ w: Math.max(1000, r.width), h: Math.max(600, r.height) });
    }
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <ChakraProvider theme={extendTheme({})}>
      <Box p={6} bg="gray.50" minH="100vh">
        <Text fontSize="lg" fontWeight="semibold" mb={4}>
          QuickBooks-style Flow (white panel)
        </Text>

        <Box
          ref={canvasRef}
          position="relative"
          bg="white"
          border="1px solid"
          borderColor="gray.200"
          borderRadius="md"
          boxShadow="sm"
          height={`${size.h}px`}
          width="100%"
          overflow="visible"
        >
          {/* SVG overlay for connectors (absolute positioned) */}
          <svg
            width={size.w}
            height={size.h}
            style={{ position: "absolute", left: 0, top: 0, pointerEvents: "none" }}
          >
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
                <path d="M0,0 L10,5 L0,10 z" fill="#9AA0A6" />
              </marker>
              <marker id="arrowhead-dark" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
                <path d="M0,0 L10,5 L0,10 z" fill="#4A5568" />
              </marker>
            </defs>

            {/* Draw connectors */}
            {connectors.map((c, i) => {
              const fromNode = nodes.find((n) => n.id === c.from)!;
              const toNode = nodes.find((n) => n.id === c.to)!;
              const srcRect = rectForNode(fromNode);
              const dstRect = rectForNode(toNode);
              const { start, corner, end } = orthogonalPath(srcRect, dstRect);

              // Path: move to start -> line to corner -> line to end
              const pathD = `M ${start.x} ${start.y} L ${corner.x} ${corner.y} L ${end.x} ${end.y}`;

              const stroke = c.color ?? "#9AA0A6";
              const sw = c.strokeWidth ?? 3;

              return (
                <g key={i}>
                  <path
                    d={pathD}
                    fill="none"
                    stroke={stroke}
                    strokeWidth={sw}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    markerEnd="url(#arrowhead)"
                  />
                </g>
              );
            })}
          </svg>

          {/* Nodes */}
          {nodes.map((n) => {
            const w = n.w ?? 140;
            const h = n.h ?? 40;
            const IconComp = n.icon ?? FileText;
            return (
              <Box
                key={n.id}
                position="absolute"
                left={`${n.x}px`}
                top={`${n.y}px`}
                width={`${w}px`}
                height={`${h}px`}
                bg="white"
                border="1px solid"
                borderColor="gray.200"
                borderRadius="6px"
                boxShadow="xs"
                display="flex"
                alignItems="center"
                justifyContent="flex-start"
                px={3}
                cursor="pointer"
                _hover={{ transform: "translateY(-3px)", boxShadow: "md" }}
                transition="all 120ms ease"
              >
                <HStack spacing={3}>
                  <Icon as={IconComp} boxSize={4} color="gray.600" />
                  <Text fontSize="sm" color="gray.700">
                    {n.label}
                  </Text>
                </HStack>
              </Box>
            );
          })}
        </Box>
      </Box>
    </ChakraProvider>
  );
}
