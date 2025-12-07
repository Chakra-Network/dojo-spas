import { Box, Flex, Grid, GridItem, Heading, Text, Icon, SimpleGrid } from "@chakra-ui/react";
import { DollarSign, FileText, AlertCircle, TrendingUp, TrendingDown } from "lucide-react";
import { useDojoState } from "../../dojo/state";
import { CashFlowChart } from "./CashFlowChart";
import { ExpensesByCategory } from "./ExpensesByCategory";

export function Dashboard({ onOpenCreateInvoice }: { onOpenCreateInvoice?: () => void }) {
  const invoices = useDojoState('invoices');
  const expenses = useDojoState('expenses');

  // Calculate outstanding invoices
  const unpaidInvoices = invoices.filter(inv => inv.status === 'unpaid');
  const outstandingCount = unpaidInvoices.length;
  const outstandingTotal = unpaidInvoices.reduce((sum, inv) => sum + inv.amount, 0);

  // Calculate P&L summary
  const paidInvoices = invoices.filter(inv => inv.status === 'paid');
  const totalIncome = paidInvoices.reduce((sum, inv) => sum + inv.amount, 0);
  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const netIncome = totalIncome - totalExpenses;
  const profitMargin = totalIncome > 0 ? ((netIncome / totalIncome) * 100) : 0;

  // Calculate overdue invoices (past due date and unpaid)
  const today = new Date();
  const overdueInvoices = unpaidInvoices.filter(inv => new Date(inv.dueDate) < today);

  return (
    <Box p={6} bg="gray.50" minH="100%">
      <Heading size="lg" mb={6} color="gray.700">
        Financial Dashboard
      </Heading>

      {/* KPI Cards Row */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={4} mb={6}>
        {/* Cash Position */}
        <Box bg="white" p={5} borderRadius="lg" borderWidth="1px" borderColor="gray.200" shadow="sm">
          <Flex align="center" mb={2}>
            <Box bg="green.100" p={2} borderRadius="md" mr={3}>
              <Icon as={DollarSign} color="green.600" boxSize={5} />
            </Box>
            <Box>
              <Text fontSize="sm" color="gray.500">Total Income</Text>
              <Text fontSize="2xl" fontWeight="bold" color="gray.800">
                ${totalIncome.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </Text>
            </Box>
          </Flex>
          <Text fontSize="xs" color="gray.500">
            From {paidInvoices.length} paid invoices
          </Text>
        </Box>

        {/* Outstanding Invoices */}
        <Box bg="white" p={5} borderRadius="lg" borderWidth="1px" borderColor="gray.200" shadow="sm">
          <Flex align="center" mb={2}>
            <Box bg="yellow.100" p={2} borderRadius="md" mr={3}>
              <Icon as={FileText} color="yellow.600" boxSize={5} />
            </Box>
            <Box>
              <Text fontSize="sm" color="gray.500">Outstanding Invoices</Text>
              <Text fontSize="2xl" fontWeight="bold" color="gray.800">
                {outstandingCount}
              </Text>
            </Box>
          </Flex>
          <Text fontSize="xs" color="gray.500">
            ${outstandingTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })} pending
          </Text>
        </Box>

        {/* Overdue Invoices */}
        <Box bg="white" p={5} borderRadius="lg" borderWidth="1px" borderColor={overdueInvoices.length > 0 ? "red.200" : "gray.200"} shadow="sm">
          <Flex align="center" mb={2}>
            <Box bg={overdueInvoices.length > 0 ? "red.100" : "gray.100"} p={2} borderRadius="md" mr={3}>
              <Icon as={AlertCircle} color={overdueInvoices.length > 0 ? "red.600" : "gray.500"} boxSize={5} />
            </Box>
            <Box>
              <Text fontSize="sm" color="gray.500">Overdue</Text>
              <Text fontSize="2xl" fontWeight="bold" color={overdueInvoices.length > 0 ? "red.600" : "gray.800"}>
                {overdueInvoices.length}
              </Text>
            </Box>
          </Flex>
          <Text fontSize="xs" color={overdueInvoices.length > 0 ? "red.500" : "gray.500"}>
            {overdueInvoices.length > 0 ? "Requires attention" : "All invoices on track"}
          </Text>
        </Box>

        {/* Net Income / Profit */}
        <Box bg="white" p={5} borderRadius="lg" borderWidth="1px" borderColor="gray.200" shadow="sm">
          <Flex align="center" mb={2}>
            <Box bg={netIncome >= 0 ? "green.100" : "red.100"} p={2} borderRadius="md" mr={3}>
              <Icon as={netIncome >= 0 ? TrendingUp : TrendingDown} color={netIncome >= 0 ? "green.600" : "red.600"} boxSize={5} />
            </Box>
            <Box>
              <Text fontSize="sm" color="gray.500">Net Income</Text>
              <Text fontSize="2xl" fontWeight="bold" color={netIncome >= 0 ? "green.600" : "red.600"}>
                ${Math.abs(netIncome).toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </Text>
            </Box>
          </Flex>
          <Text fontSize="xs" color="gray.500">
            {profitMargin >= 0 ? "+" : ""}{profitMargin.toFixed(1)}% profit margin
          </Text>
        </Box>
      </SimpleGrid>

      {/* Charts Row */}
      <Grid templateColumns={{ base: "1fr", lg: "2fr 1fr" }} gap={6} mb={6}>
        {/* Cash Flow Chart */}
        <GridItem>
          <CashFlowChart />
        </GridItem>

        {/* Expenses by Category */}
        <GridItem>
          <ExpensesByCategory />
        </GridItem>
      </Grid>

      {/* P&L Summary Section */}
      <Box bg="white" p={6} borderRadius="lg" borderWidth="1px" borderColor="gray.200" shadow="sm">
        <Heading size="md" mb={4} color="gray.700">
          Profit & Loss Summary
        </Heading>
        <Grid templateColumns={{ base: "1fr", md: "repeat(4, 1fr)" }} gap={6}>
          <Box borderRight={{ md: "1px solid" }} borderColor="gray.200" pr={4}>
            <Text fontSize="sm" color="gray.500" mb={1}>Total Revenue</Text>
            <Text fontSize="xl" fontWeight="bold" color="gray.800">
              ${totalIncome.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </Text>
          </Box>
          <Box borderRight={{ md: "1px solid" }} borderColor="gray.200" pr={4}>
            <Text fontSize="sm" color="gray.500" mb={1}>Total Expenses</Text>
            <Text fontSize="xl" fontWeight="bold" color="red.500">
              ${totalExpenses.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </Text>
          </Box>
          <Box borderRight={{ md: "1px solid" }} borderColor="gray.200" pr={4}>
            <Text fontSize="sm" color="gray.500" mb={1}>Gross Profit</Text>
            <Text fontSize="xl" fontWeight="bold" color={netIncome >= 0 ? "green.600" : "red.600"}>
              ${netIncome.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </Text>
          </Box>
          <Box>
            <Text fontSize="sm" color="gray.500" mb={1}>Profit Margin</Text>
            <Flex align="center">
              <Text fontSize="xl" fontWeight="bold" color={profitMargin >= 0 ? "green.600" : "red.600"}>
                {profitMargin.toFixed(1)}%
              </Text>
              <Icon
                as={profitMargin >= 0 ? TrendingUp : TrendingDown}
                ml={2}
                color={profitMargin >= 0 ? "green.500" : "red.500"}
              />
            </Flex>
          </Box>
        </Grid>
      </Box>

      {/* Quick Actions */}
      <Flex mt={6} gap={4} flexWrap="wrap">
        <Box
          as="button"
          bg="blue.500"
          color="white"
          px={4}
          py={2}
          borderRadius="md"
          fontWeight="medium"
          _hover={{ bg: "blue.600" }}
          onClick={() => onOpenCreateInvoice && onOpenCreateInvoice()}
        >
          Create Invoice
        </Box>
        <Box
          as="button"
          bg="gray.200"
          color="gray.700"
          px={4}
          py={2}
          borderRadius="md"
          fontWeight="medium"
          _hover={{ bg: "gray.300" }}
        >
          Record Expense
        </Box>
        <Box
          as="button"
          bg="gray.200"
          color="gray.700"
          px={4}
          py={2}
          borderRadius="md"
          fontWeight="medium"
          _hover={{ bg: "gray.300" }}
        >
          View Reports
        </Box>
      </Flex>
    </Box>
  );
}
