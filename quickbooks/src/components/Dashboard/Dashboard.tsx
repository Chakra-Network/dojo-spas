import { Box, SimpleGrid, Heading, Text } from '@chakra-ui/react';
import { useDojoState } from '../../dojo/state';
import { CashFlowChart } from './CashFlowChart';
import { ExpensesByCategory } from './ExpensesByCategory';

export function Dashboard() {
  const invoices = useDojoState('invoices');
  const expenses = useDojoState('expenses');

  // Calculate metrics
  const totalRevenue = invoices
    .filter((inv) => inv.status === 'paid')
    .reduce((sum, inv) => sum + inv.amount, 0);

  const outstandingInvoices = invoices
    .filter((inv) => inv.status === 'unpaid')
    .reduce((sum, inv) => sum + inv.amount, 0);

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  const profitLoss = totalRevenue - totalExpenses;

  const unpaidCount = invoices.filter((inv) => inv.status === 'unpaid').length;

  return (
    <Box p={8}>
      <Heading mb={6} size="lg">
        Financial Dashboard
      </Heading>

      {/* Key Metrics */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} mb={8}>
        <Box
          p={5}
          bg="white"
          borderRadius="lg"
          borderWidth="1px"
          borderColor="gray.200"
          shadow="sm"
        >
          <Text fontSize="sm" color="gray.600" mb={2}>Total Revenue</Text>
          <Text fontSize="3xl" fontWeight="bold" color="green.600">${totalRevenue.toLocaleString()}</Text>
          <Text fontSize="sm" color="gray.500">From paid invoices</Text>
        </Box>

        <Box
          p={5}
          bg="white"
          borderRadius="lg"
          borderWidth="1px"
          borderColor="gray.200"
          shadow="sm"
        >
          <Text fontSize="sm" color="gray.600" mb={2}>Outstanding</Text>
          <Text fontSize="3xl" fontWeight="bold" color="orange.600">${outstandingInvoices.toLocaleString()}</Text>
          <Text fontSize="sm" color="gray.500">{unpaidCount} unpaid invoices</Text>
        </Box>

        <Box
          p={5}
          bg="white"
          borderRadius="lg"
          borderWidth="1px"
          borderColor="gray.200"
          shadow="sm"
        >
          <Text fontSize="sm" color="gray.600" mb={2}>Total Expenses</Text>
          <Text fontSize="3xl" fontWeight="bold" color="red.600">${totalExpenses.toLocaleString()}</Text>
          <Text fontSize="sm" color="gray.500">All categories</Text>
        </Box>

        <Box
          p={5}
          bg="white"
          borderRadius="lg"
          borderWidth="1px"
          borderColor="gray.200"
          shadow="sm"
        >
          <Text fontSize="sm" color="gray.600" mb={2}>Profit & Loss</Text>
          <Text fontSize="3xl" fontWeight="bold" color={profitLoss >= 0 ? 'green.600' : 'red.600'}>
            ${profitLoss.toLocaleString()}
          </Text>
          <Text fontSize="sm" color="gray.500">Revenue - Expenses</Text>
        </Box>
      </SimpleGrid>

      {/* Charts */}
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
        <CashFlowChart />
        <ExpensesByCategory />
      </SimpleGrid>
    </Box>
  );
}
