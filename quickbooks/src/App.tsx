import { useEffect, useState } from "react";
import {
  Box,
  Flex,
  VStack,
  Input,
  Text,
  Icon,
  Collapse,
  Divider,
  IconButton,
} from "@chakra-ui/react";
import {
  Search,
  Home,
  FileText,
  Receipt,
  BarChart,
  Users,
} from "lucide-react";
import { initializeDojoState, DojoState } from "./dojo/state";
import { Dashboard } from "./components/Dashboard/Dashboard";
import { Invoices } from "./components/Invoices/Invoices";
import { Expenses } from "./components/Expenses/Expenses";
import { Reconciliation } from "./components/Reconciliation/Reconciliation";

import invoicesData from "./data/invoices.json";
import expensesData from "./data/expenses.json";
import bankData from "./data/bank.json";

type View = "dashboard" | "invoices" | "expenses" | "reconciliation";

function App() {
  const [currentView, setCurrentView] = useState<View>("dashboard");
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    initializeDojoState({
      invoices: invoicesData as unknown as DojoState["invoices"],
      expenses: expensesData as unknown as DojoState["expenses"],
      bankTransactions: bankData as unknown as DojoState["bankTransactions"],
      auditLog: [
        {
          id: "audit-init",
          timestamp: new Date().toISOString(),
          action: "SYSTEM_INIT",
          description: "Application initialized with seed data",
        },
      ],
    });
    setIsInitialized(true);
  }, []);

  if (!isInitialized) return null;

  const renderView = () => {
    switch (currentView) {
      case "dashboard":
        return <Dashboard />;
      case "invoices":
        return <Invoices />;
      case "expenses":
        return <Expenses />;
      case "reconciliation":
        return <Reconciliation />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Flex h="100vh" bg="gray.100">
      {/* Sidebar */}
      <Box
        bg="#17314A"
        color="white"
        w="260px"
        display="flex"
        flexDirection="column"
        borderRight="1px solid #0f2235"
        fontFamily="Segoe UI, sans-serif"
        boxShadow="inset -1px 0 0 rgba(0,0,0,0.4)"
      >
        {/* Search Bar - Updated to match reference image */}
        <Box
          bg="#0C253A"
          px={3}
          py={3}
          borderBottom="1px solid #10283F"
          boxShadow="inset 0 -1px 0 rgba(0,0,0,0.5)"
        >
          <Flex align="center" gap={2}>
            <Input
              placeholder="Search Company or Help"
              fontSize="13px"
              bg="white"
              border="none"
              color="black"

              h="36px"
              _placeholder={{ color: "#9CA3AF" }}
              _focus={{ outline: "none", boxShadow: "none" }}
              borderRadius="3px"
              flex="1"
            />
            <IconButton
              aria-label="Search"
              icon={<Search size={16} />}
              bg="transparent"
              color="#9CA3AF"
              _hover={{ bg: "rgba(255,255,255,0.1)" }}
              size="sm"
              h="36px"
              w="36px"
              minW="36px"
            />
          </Flex>
        </Box>

        {/* My Shortcuts */}
        <Box px={3} py={2} borderBottom="1px solid #10283F">
          <Text fontWeight="bold" fontSize="15px" color="#C7D2E0">
            My Shortcuts
          </Text>
        </Box>

        {/* Main Shortcuts */}
        <VStack align="stretch" spacing={0} mt={1}>
          <SidebarItem
            icon={Home}
            label="Home"
            active={currentView === "dashboard"}
            onClick={() => setCurrentView("dashboard")}
          />
          <SidebarItem
            icon={FileText}
            label="Income Tracker"
            active={currentView === "invoices"}
            onClick={() => setCurrentView("invoices")}
          />
          <SidebarItem
            icon={Receipt}
            label="Bill Tracker"
            active={currentView === "expenses"}
            onClick={() => setCurrentView("expenses")}
          />
          <SidebarItem icon={BarChart} label="Reports" />
          <SidebarItem icon={Users} label="Customers" />
          <SidebarItem icon={Users} label="Vendors" />
        </VStack>

        {/* Divider */}
        <Divider borderColor="#0f2235" my={3} />

        {/* Secondary Shortcuts */}
        <Box>
          <SidebarSubItem label="View Balances" />
          <SidebarSubItem label="Run Favorite Reports" />
          <SidebarSubItem label="Open Windows" />
        </Box>
      </Box>

      {/* Main Content */}
      <Box flex="1" overflowY="auto">
        {renderView()}
      </Box>

      {/* Audit sidebar removed per request */}
    </Flex>
  );
}

/* -------------------- Sidebar Item Component -------------------- */
const SidebarItem = ({
  icon,
  label,
  active,
  onClick,
}: {
  icon: any;
  label: string;
  active?: boolean;
  onClick?: () => void;
}) => (
  <Flex
    align="center"
    gap={2}
    px={4}
    py="13px"
    cursor="pointer"
    bg={active ? "#24486C" : "transparent"}
    _hover={{ bg: active ? "#24486C" : "#1D3C5B" }}
    color={active ? "#ffffff" : "#D1D5DB"}
    borderRadius="3px"
    onClick={onClick}
    transition="background 0.2s"
  >
    <Icon as={icon} size={18} />
    <Text fontSize="15px">{label}</Text>
  </Flex>
);

/* -------------------- Sub Item (Bottom Section) -------------------- */
const SidebarSubItem = ({ label }: { label: string }) => (
  <Flex
    align="center"
    px={4}
    py="7px"
    cursor="pointer"
    color="#D1D5DB"
    _hover={{ bg: "#1D3C5B" }}
    fontSize="15px"
  >
    <Text>{label}</Text>
  </Flex>
);

export default App;