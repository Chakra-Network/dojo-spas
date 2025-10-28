import { useLayoutEffect, useRef, useState } from "react";
import { Box, ChakraProvider, extendTheme, Text } from "@chakra-ui/react";
import {
  FileText,
  CreditCard,
  Wallet,
  Briefcase,
  Calculator,
  Banknote,
  Landmark,
  ClipboardList,
  Percent,
  File,
  RefreshCcw,
  Clock,
  HandCoins,
  Percent as PercentIcon,
  Package,
  ShoppingCart,
  AppWindow,
  Calendar,
  Printer,
  PenLine,
  BookText,
} from "lucide-react";

/* ----------- Node + Connector Types ---------- */
type NodeDef = {
  id: string;
  x: number;
  y: number;
  icon: React.ComponentType<{ size?: number; color?: string }>;
};

type Connector = {
  from: string;
  to: string;
  color?: string;
  strokeWidth?: number;
};

/* ---------- Nodes with Flaticon classes ---------- */
const nodes: NodeDef[] = [
  { id: "enterBills", x: 320, y: 40, icon: FileText },
  { id: "payBills", x: 640, y: 40, icon: CreditCard },
  { id: "businessLoans", x: 800, y: 40, icon: HandCoins },
  { id: "manageSalesTax", x: 940, y: 40, icon: PercentIcon },
  { id: "acceptCC", x: 480, y: 140, icon: Wallet },
  { id: "createSalesRec", x: 720, y: 120, icon: Briefcase },
  { id: "estimates", x: 100, y: 220, icon: Calculator },
  { id: "createInvoices", x: 320, y: 220, icon: FileText },
  { id: "receivePayments", x: 620, y: 220, icon: Banknote },
  { id: "recordDeposits", x: 920, y: 220, icon: Landmark },
  { id: "refundsCredits", x: 820, y: 340, icon: RefreshCcw },
  { id: "statementCharges", x: 240, y: 340, icon: ClipboardList },
  { id: "financeCharges", x: 420, y: 340, icon: Percent },
  { id: "statements", x: 560, y: 340, icon: File },
  { id: "reconcile", x: 920, y: 300, icon: RefreshCcw },
  { id: "enterTime", x: 320, y: 460, icon: Clock },
  // Right sidebar - Company
  { id: "chartOfAccounts", x: 1100, y: 120, icon: BookText },
  { id: "itemsServices", x: 1100, y: 160, icon: Package },
  { id: "orderChecks", x: 1100, y: 200, icon: ShoppingCart },
  { id: "appsServices", x: 1100, y: 240, icon: AppWindow },
  { id: "calendar", x: 1100, y: 280, icon: Calendar },
  // Right sidebar - Banking
  { id: "writeChecks", x: 1100, y: 340, icon: PenLine },
  { id: "checkRegister", x: 1100, y: 380, icon: BookText },
  { id: "printChecks", x: 1100, y: 420, icon: Printer },
  { id: "enterCardCharges", x: 1100, y: 460, icon: CreditCard },
];

/* ---------- Connectors ---------- */
const connectors: Connector[] = [
  { from: "enterBills", to: "payBills", color: "#9AA0A6", strokeWidth: 2.5 },
  { from: "enterBills", to: "createInvoices", color: "#9AA0A6", strokeWidth: 2.5 },
  { from: "estimates", to: "createInvoices", color: "#9AA0A6", strokeWidth: 2.5 },
  { from: "createInvoices", to: "receivePayments", color: "#9AA0A6", strokeWidth: 2.5 },
  { from: "receivePayments", to: "recordDeposits", color: "#9AA0A6", strokeWidth: 2.5 },
  { from: "acceptCC", to: "createSalesRec", color: "#9AA0A6", strokeWidth: 2.5 },
  { from: "statementCharges", to: "financeCharges", color: "#9AA0A6", strokeWidth: 2.5 },
  { from: "financeCharges", to: "statements", color: "#9AA0A6", strokeWidth: 2.5 },
  { from: "createInvoices", to: "enterTime", color: "#9AA0A6", strokeWidth: 2.5 },
];

/* ---------- Geometry helpers ---------- */
function rectForNode(n: NodeDef) {
  const size = 20;
  return {
    left: n.x,
    top: n.y,
    right: n.x + size,
    bottom: n.y + size,
    cx: n.x + size / 2,
    cy: n.y + size / 2,
  };
}

function orthogonalPath(src: ReturnType<typeof rectForNode>, dst: ReturnType<typeof rectForNode>) {
  const preferHorizontal = src.cx <= dst.cx;
  if (preferHorizontal) {
    return {
      start: { x: src.right, y: src.cy },
      corner: { x: dst.left, y: src.cy },
      end: { x: dst.left, y: dst.cy },
    };
  }
  return {
    start: { x: src.left, y: src.cy },
    corner: { x: dst.right, y: src.cy },
    end: { x: dst.right, y: dst.cy },
  };
}

/* ---------- Label helper from node id ---------- */
function humanizeId(id: string) {
  const withSpaces = id.replace(/([A-Z])/g, " $1");
  return withSpaces.charAt(0).toUpperCase() + withSpaces.slice(1);
}

/* ---------- Component ---------- */
export function Dashboard() {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 1200, h: 700 });

  useLayoutEffect(() => {
    const update = () => {
      if (!ref.current) return;
      const r = ref.current.getBoundingClientRect();
      setSize({ w: Math.max(1000, r.width), h: Math.max(600, r.height) });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <ChakraProvider theme={extendTheme({})}>
      <Box p={6} bg="gray.50" minH="100vh">
        <Text fontSize="lg" fontWeight="semibold" mb={4}>
          QuickBooks-style Flow (Flaticon Icons)
        </Text>

        <Box
          ref={ref}
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
          {/* SVG connectors */}
          <svg
            width={size.w}
            height={size.h}
            style={{ position: "absolute", left: 0, top: 0, pointerEvents: "none" }}
          >
            <defs>
              <marker id="arrowhead" markerWidth="6" markerHeight="6" refX="6" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6 z" fill="#9AA0A6" />
              </marker>
            </defs>
            {connectors.map((c, i) => {
              const s = rectForNode(nodes.find(n => n.id === c.from)!);
              const d = rectForNode(nodes.find(n => n.id === c.to)!);
              const { start, corner, end } = orthogonalPath(s, d);
              const path = `M ${start.x} ${start.y} L ${corner.x} ${corner.y} L ${end.x} ${end.y}`;
              return (
                <path
                  key={i}
                  d={path}
                  fill="none"
                  stroke={c.color ?? "#9AA0A6"}
                  strokeWidth={c.strokeWidth ?? 2.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  markerEnd="url(#arrowhead)"
                />
              );
            })}
          </svg>

          {/* Icons from Lucide */}
          {nodes.map((n) => {
            const IconComp = n.icon;
            return (
              <Box
                key={n.id}
                position="absolute"
                left={`${n.x}px`}
                top={`${n.y}px`}
                color="#2D3748"
                transition="all 0.2s ease"
                _hover={{ transform: "scale(1.1)", color: "#3182CE" }}
                cursor="pointer"
              >
                <IconComp size={20} color="currentColor" />
              </Box>
            );
          })}

          {/* Small text labels under each icon */}
          {nodes.map((n) => (
            <Text
              key={`${n.id}-label`}
              position="absolute"
              left={`${n.x - 9}px`}
              top={`${n.y + 24}px`}
              fontSize="15px"
              fontWeight="bold"
              color="gray.600"
              lineHeight="1"
              pointerEvents="none"
            >
              {humanizeId(n.id)}
            </Text>
          ))}
        </Box>
      </Box>
    </ChakraProvider>
  );
}
