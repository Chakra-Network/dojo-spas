import { useEffect, useState } from "react";
import {
  Box,
  Flex,
  VStack,
  Input,
  Text,
  Icon,
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
import { initializeDojoState, dojo } from "./dojo/state";
import { Dashboard } from "./components/Dashboard/Dashboard";
import { MenuBar } from "./components/MenuBar";
import { Invoices } from "./components/Invoices/Invoices";
import { Expenses } from "./components/Expenses/Expenses";
import { Reconciliation } from "./components/Reconciliation/Reconciliation";
import { CreateInvoice } from "./components/Invoices/CreateInvoice";
import { CustomerCenter } from "./components/Customers/CustomerCenter";
import { ReportsPage } from "./components/Reports/ReportsPage"; 
import OpenWindowsSidebar from "./components/OpenWindowsSidebar";
import ViewBalancesSidebar from "./components/ViewBalancesSidebar";
import { VendorCenter } from "./components/vendor/VendorCenter";


type View = "dashboard" | "invoices" | "expenses" | "reconciliation" | "create-invoice" | "customers" | "reports" | "vendors" | "profit-loss" | "report-center" | "customer-center" | "home-open-window";

type SidebarView = "shortcuts" | "openWindows" | "viewBalances";

function App() {
  const [currentView, setCurrentView] = useState<View>("dashboard");
  const [isInitialized, setIsInitialized] = useState(false);
  const [sidebarMode, setSidebarMode] = useState<SidebarView>("shortcuts");

  useEffect(() => {
    const loadDojoData = async () => {
      // Initialize with empty arrays first
      initializeDojoState({
        invoices: [],
        expenses: [],
        bankTransactions: [],
        auditLog: [
          {
            id: "audit-init",
            timestamp: new Date().toISOString(),
            action: "SYSTEM_INIT",
            description: "Application initialized with seed data",
          },
        ],
      });

      // Fetch JSON data
      const invoices = await fetch("/src/data/invoices.json").then((res) =>
        res.json()
      );
      const expenses = await fetch("/src/data/expenses.json").then((res) =>
        res.json()
      );
      const bankTransactions = await fetch("/src/data/bank.json").then((res) =>
        res.json()
      );
      const customers = await fetch("/src/data/transactions.json").then((res) =>
        res.json()
      );
      const vendors = await fetch("/src/data/vendors.json").then((res) =>
        res.json()
      );

      // Set data in Dojo state
      dojo.setState("invoices", invoices, "Loaded initial invoices data");
      dojo.setState("expenses", expenses, "Loaded initial expenses data");
      dojo.setState(
        "bankTransactions",
        bankTransactions,
        "Loaded initial bank transactions data"
      );
      dojo.setState("customers", customers, "Loaded initial customer data");
      dojo.setState("vendors", vendors, "Loaded initial vendor data");

      setIsInitialized(true);
    };

    loadDojoData();
  }, []);

  if (!isInitialized) return null;

  const renderView = () => {
    switch (currentView) {
      case "dashboard":
      case "home-open-window": // Added for Open Windows home
        return <Dashboard onOpenCreateInvoice={() => setCurrentView("create-invoice")} />;
      case "invoices":
        return <Invoices />;
      case "expenses":
        return <Expenses />;
      case "reconciliation":
        return <Reconciliation />;
      case "create-invoice":
        return <CreateInvoice />;
      case "customers":
      case "customer-center": // Added for Open Windows customer center
        return <CustomerCenter />;
      case "vendors":
        return <VendorCenter />;
      case "reports":
      case "profit-loss": // Added for Open Windows profit & loss
      case "report-center": // Added for Open Windows report center
        return <ReportsPage />;
      default:
        return <Dashboard onOpenCreateInvoice={() => setCurrentView("create-invoice")} />;
    }
  };

  return (
    <Box h="100vh" display="flex" flexDirection="column" bg="gray.100">
      <MenuBar onClose={() => { if (currentView !== "dashboard") setCurrentView("dashboard"); }} />
      <Flex flex="1" minH={0}>
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

        {sidebarMode === "shortcuts" ? (
          <>
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
              <SidebarItem
                icon={BarChart}
                label="Reports"
                active={currentView === "reports"}
                onClick={() => setCurrentView("reports")}
              />
              <SidebarItem
                icon={Users}
                label="Customers"
                active={currentView === "customers"}
                onClick={() => setCurrentView("customers")}
              />
              <SidebarItem
                icon={Users}
                label="Vendors"
                active={currentView === "vendors"} 
                onClick={() => setCurrentView("vendors")}
              />
            </VStack>

            {/* Divider */}
            <Divider borderColor="#0f2235" my={3} />

            {/* Secondary Shortcuts */}
            <Box pb={4}>
              <SidebarSubItem label="View Balances" onClick={() => setSidebarMode("viewBalances")} />
              <SidebarSubItem label="Run Favorite Reports" />
              <SidebarSubItem label="Open Windows" onClick={() => setSidebarMode("openWindows")} />
            </Box>
          </>
        ) : sidebarMode === "openWindows" ? (
          <OpenWindowsSidebar
            onSelectWindow={(window) => setCurrentView(window as View)}
            onBackToShortcuts={() => setSidebarMode("shortcuts")}
            currentView={currentView}
          />
        ) : (
          <ViewBalancesSidebar onBackToShortcuts={() => setSidebarMode("shortcuts")} />
        )}
      </Box>

      {/* Main Content */}
      <Box flex="1" overflowY="auto">
        {renderView()}
      </Box>

      {/* Audit sidebar removed per request */}
      </Flex>
    </Box>
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
const SidebarSubItem = ({
  label,
  onClick,
}: {
  label: string;
  onClick?: () => void;
}) => (
  <Flex
    align="center"
    px={4}
    py="7px"
    cursor="pointer"
    color="#D1D5DB"
    _hover={{ bg: "#1D3C5B" }}
    fontSize="15px"
    onClick={onClick}
  >
    <Text>{label}</Text>
  </Flex>
);

export default App;