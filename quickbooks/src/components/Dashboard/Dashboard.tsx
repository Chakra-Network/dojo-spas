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


type NodeDef = {
  id: string;
  x: number;
  y: number;
  icon: React.ComponentType<{ size?: number; color?: string }>;
  color?: string;
  group: keyof typeof groupColors;
};

type Connector = {
  from: string;
  to: string;
  color?: string;
  strokeWidth?: number;
  noArrow?: boolean;
};

/* ----------- Color Themes ---------- */
const groupColors = {
  vendors: "#3b82f6",   // blue
  customers: "#f59e0b", // yellow
  employees: "#10b981", // green
  company: "#6366f1",   // indigo
  banking: "#ef4444",   // red
};

/* ---------- Nodes ---------- */
const nodes: NodeDef[] = [
  // Vendors
  { id: "enterBills", x: 250, y: 100, icon: FileText, color: "#5c84c3", group: "vendors" },
  { id: "payBills", x: 760, y: 100, icon: CreditCard, color: "#485ba2", group: "vendors" },
  { id: "New business Loans", x: 860, y: 100, icon: HandCoins, color: "#5879ab", group: "vendors" },
  { id: "Manage SalesTax", x: 990, y: 100, icon: PercentIcon, color: "#d5b347", group: "vendors" },

  // Customers
  { id: "Accept Credit Cards", x: 480, y: 310, icon: Wallet, color: "#d2b441", group: "customers" },
  { id: "createSalesReceipt", x: 760, y: 300, icon: Briefcase, color: "#d6ba4e", group: "customers" },
  { id: "estimates", x: 100, y: 400, icon: Calculator, color: "#6a7f6c", group: "customers" },
  { id: "createInvoices", x: 250, y: 400, icon: FileText, color: "#4e68a8", group: "customers" },
  { id: "receivePayments", x: 690, y: 400, icon: Banknote, color: "#446a44", group: "customers" },
  { id: "refundsCredits", x: 930, y: 500, icon: RefreshCcw, color: "#5f8b5e", group: "customers" },
  { id: "statementCharges", x: 330, y: 500, icon: ClipboardList, color: "#769e76", group: "customers" },
  { id: "financeCharges", x: 490, y: 500, icon: Percent, color: "#c8a62e", group: "customers" },
  { id: "statements", x: 630, y: 500, icon: File, color: "#5a709a", group: "customers" },

  // Employees
  { id: "enterTime", x: 250, y: 650, icon: Clock, color: "#728e6d", group: "employees" },

  // Company
  { id: "chartOfAccounts", x: 1250, y: 105, icon: BookText, color: "#76a1d7", group: "company" },
  { id: "itemsServices", x: 1250, y: 180, icon: Package, color: "#bfa347", group: "company" },
  { id: "orderChecks", x: 1390, y: 180, icon: ShoppingCart, color: "#778ebb", group: "company" },
  { id: "appsServices", x: 1250, y: 270, icon: AppWindow, color: "#86a5d2", group: "company" },
  { id: "calendar", x: 1390, y: 270, icon: Calendar, color: "#798db5", group: "company" },

  // Banking
  { id: "recordDeposits", x: 1250, y: 400, icon: Landmark, color: "#ac8e2b", group: "banking" },
  { id: "reconcile", x: 1390, y: 400, icon: RefreshCcw, color: "#415d8f", group: "banking" },
  { id: "writeChecks", x: 1250, y: 480, icon: PenLine, color: "#6485b9", group: "banking" },
  { id: "checkRegister", x: 1390, y: 480, icon: BookText, color: "#739fd9", group: "banking" },
  { id: "printChecks", x: 1250, y: 560, icon: Printer, color: "#3B82F6", group: "banking" },
  { id: "enterCardCharges", x: 1390, y: 560, icon: CreditCard, color: "#e7c55f", group: "banking" },
];


/* ---------- Connectors ---------- */
const connectors: Connector[] = [
  { from: "enterBills", to: "payBills" },
  { from: "enterBills", to: "createInvoices" },
  { from: "estimates", to: "createInvoices" },
  { from: "createInvoices", to: "receivePayments" },
  { from: "receivePayments", to: "recordDeposits" },
  { from: "statementCharges", to: "financeCharges", noArrow: true },
  { from: "financeCharges", to: "statements" },
  { from: "createInvoices", to: "enterTime" },
  { from: "statements", to: "receivePayments", noArrow: true },
  { from: "receivePayments", to: "createSalesReceipt", noArrow: true },
].map((c) => ({ color: "#9AA0A6", strokeWidth: 2.5, ...c }));

/* ---------- Helpers ---------- */
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

function humanizeId(id: string) {
  const withSpaces = id.replace(/([A-Z])/g, " $1");
  return withSpaces.charAt(0).toUpperCase() + withSpaces.slice(1);
}

/* ---------- Component ---------- */
export function Dashboard({ onOpenCreateInvoice }: { onOpenCreateInvoice?: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 1200, h: 950 });

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

  // Background section boxes for each group
  const groupBoxes: Record<keyof typeof groupColors, { left: number; top: number; width: number; height: number; title: string }>
    = {
    vendors: { left: 5, top: 60, width: 1120, height: 160, title: "VENDORS" },
    customers: { left: 5, top: 240, width: 1120, height: 320, title: "CUSTOMERS" },
    employees: { left: 5, top: 580, width: 1120, height: 190, title: "EMPLOYEES" },
    company: { left: 1145, top: 60, width: 400, height: 300, title: "COMPANY" },
    banking: { left: 1145, top: 380, width: 390, height: 390, title: "BANKING" },
  };

  return (
    <ChakraProvider theme={extendTheme({})}>
      <Box p={2} bg="gray.50">

        <Box
          ref={ref}
          position="relative"
          height={`${size.h}px`}
          width="100%"
          overflow="visible"
        >
          {/* Section boxes */}
          {Object.entries(groupBoxes).map(([key, box]) => (
            <Box
              key={key}
              position="absolute"
              left={`${box.left}px`}
              top={`${box.top}px`}
              width={`${box.width}px`}
              height={`${box.height}px`}
              bg="white"
              border="1px solid"
              borderColor="gray.200"
              borderRadius="md"
              boxShadow="sm"
            >
              <Text
                fontSize="xs"
                color="gray.600"
                fontWeight="semibold"
                position="absolute"
                top="-18px"
                left="8px"
                backgroundColor="transparent"
              >
                {box.title}
              </Text>
            </Box>
          ))}
          {/* Connectors */}
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
              const s = rectForNode(nodes.find((n) => n.id === c.from)!);
              const d = rectForNode(nodes.find((n) => n.id === c.to)!);
              const { start, corner, end } = orthogonalPath(s, d);
              const path = `M ${start.x} ${start.y} L ${corner.x} ${corner.y} L ${end.x} ${end.y}`;
              return (
                <path
                  key={i}
                  d={path}
                  fill="none"
                  stroke={c.color}
                  strokeWidth={c.strokeWidth}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  markerEnd={c.noArrow ? undefined : "url(#arrowhead)"}
                />
              );
            })}
          </svg>

      
          {/* Icons */}
          {nodes.map((n) => {
            const IconComp = n.icon;
            return (
              <Box
                key={n.id}
                position="absolute"
                left={`${n.x}px`}
                top={`${n.y}px`}
                color={n.color ?? "#2D3748"}
                transition="all 0.2s ease"
                _hover={{ transform: "scale(1.1)", filter: "brightness(1.2)" }}
                cursor="pointer"
                onClick={() => {
                  if (n.id === "createInvoices") {
                    onOpenCreateInvoice && onOpenCreateInvoice();
                  }
                }}
              >
                <IconComp size={20} color="currentColor" />
              </Box>
            );
          })}

          {/* Text labels */}
          {nodes.map((n) => (
            <Text
              key={`${n.id}-label`}
              position="absolute"
              left={`${n.x - 9}px`}
              top={`${n.y + 24}px`}
              fontSize="14px"
              fontWeight="bold"
              color={"black"}
              textAlign="center"
              pointerEvents="none"
              maxW="120px"
              lineHeight="1.2"
              whiteSpace="normal"
              wordBreak="break-word"
            >
              {humanizeId(n.id)}
            </Text>
          ))}
        </Box>
      </Box>
    </ChakraProvider>
  );
}
