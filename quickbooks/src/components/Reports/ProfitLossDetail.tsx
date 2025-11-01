import React from 'react';
import { Box, Text, Flex, Button, Menu, MenuButton, MenuList, MenuItem, IconButton } from '@chakra-ui/react';
import { ChevronDown, RefreshCcw, FileText, Heart, HelpCircle } from 'lucide-react';
import { useDojoState, Invoice, Expense } from '../../dojo/state';

export const ProfitLossDetail: React.FC = () => {
  const invoices: Invoice[] = useDojoState('invoices');
  const expenses: Expense[] = useDojoState('expenses');

  // Calculate dynamic data based on invoices and expenses
  const calculateDetailedData = () => {
    let totalSales = 0;
    let totalCOGS = 0;
    let totalExpenses = 0;

    const salesByClient: Record<string, number> = {};
    const expensesByCategory: Record<string, number> = {};

    invoices.forEach((invoice: Invoice) => {
      if (invoice.status === 'paid') {
        totalSales += invoice.amount;
        salesByClient[invoice.clientName] = (salesByClient[invoice.clientName] || 0) + invoice.amount;
      }
    });

    expenses.forEach((expense: Expense) => {
      totalExpenses += expense.amount;
      expensesByCategory[expense.category] = (expensesByCategory[expense.category] || 0) + expense.amount;
    });

    // Simplified COGS calculation (e.g., 50% of sales for now)
    totalCOGS = totalSales * 0.5;

    const grossProfit = totalSales - totalCOGS;
    const netOrdinaryIncome = grossProfit - totalExpenses;
    const netIncome = netOrdinaryIncome; // No other income/expense for simplicity

    return {
      totalSales: totalSales.toFixed(2),
      totalCOGS: totalCOGS.toFixed(2),
      grossProfit: grossProfit.toFixed(2),
      totalExpenses: totalExpenses.toFixed(2),
      netOrdinaryIncome: netOrdinaryIncome.toFixed(2),
      netIncome: netIncome.toFixed(2),
      salesByClient,
      expensesByCategory,
    };
  };

  const detailedData = calculateDetailedData();

  return (
    <Flex direction="column" alignItems="center">
      <Box
        border="1px solid #E2E8F0"
        p={4}
        bg="white"
        boxShadow="md"
        borderColor="black"
        width="450px"
        height="450px"
        display="flex"
        flexDirection="column"
        mb={4}
        overflow="hidden"
      >
        <Text fontSize="sm" fontWeight="bold" color="gray.600" mb={2} flexShrink={0}>
          Profit & Loss Detail
        </Text>
        <Box 
          fontSize="xs" 
          color="gray.500" 
          overflowY="auto"
          flex="1"
          pr={2}
          css={{
            '&::-webkit-scrollbar': {
              width: '6px',
            },
            '&::-webkit-scrollbar-track': {
              background: '#f1f1f1',
            },
            '&::-webkit-scrollbar-thumb': {
              background: '#888',
              borderRadius: '3px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              background: '#555',
            },
          }}
        >
          <Box>
            <Text fontWeight="semibold" mb={1}>Ordinary Income/Expense</Text>
            
            <Text fontWeight="semibold" mt={2} mb={1}>Income</Text>
            <Text fontWeight="medium" ml={2} mb={1}>Sales</Text>
            
            {Object.entries(detailedData.salesByClient).map(([client, amount]) => (
              <Box key={client} ml={4} mb={1}>
                <Flex justify="space-between" fontSize="2xs" mb={0.5}>
                  <Text>{client}</Text>
                  <Text fontWeight="medium">Balance: {amount.toFixed(2)}</Text>
                </Flex>
              </Box>
            ))}

            <Flex justify="space-between" fontWeight="bold" ml={2} mb={2} fontSize="2xs">
              <Text>Total Sales</Text>
              <Flex gap={4}>
                <Text>Balance: {detailedData.totalSales}</Text>
              </Flex>
            </Flex>
            
            <Flex justify="space-between" fontWeight="bold" mb={2} fontSize="xs">
              <Text>Total Income</Text>
              <Flex gap={4}>
                <Text>Balance: {detailedData.totalSales}</Text>
              </Flex>
            </Flex>
            
            <Text fontWeight="semibold" mt={2} mb={1}>Cost of Goods Sold</Text>
            <Flex justify="space-between" fontWeight="bold" ml={2} mb={2} fontSize="2xs">
              <Text>Total Cost of Goods Sold</Text>
              <Flex gap={4}>
                <Text>Balance: {detailedData.totalCOGS}</Text>
              </Flex>
            </Flex>
            
            <Flex justify="space-between" fontWeight="bold" mb={2} fontSize="xs">
              <Text>Total COGS</Text>
              <Flex gap={4}>
                <Text>Balance: {detailedData.totalCOGS}</Text>
              </Flex>
            </Flex>
            
            <Flex justify="space-between" fontWeight="bold" mb={2} fontSize="xs">
              <Text>Gross Profit</Text>
              <Flex gap={4}>
                <Text>Balance: {detailedData.grossProfit}</Text>
              </Flex>
            </Flex>
            
            <Text fontWeight="semibold" mt={2} mb={1}>Expense</Text>
            {Object.entries(detailedData.expensesByCategory).map(([category, amount]) => (
              <Box key={category} ml={4} mb={1}>
                <Flex justify="space-between" fontSize="2xs" mb={0.5}>
                  <Text>{category}</Text>
                  <Text fontWeight="medium">Amount: {amount.toFixed(2)}</Text>
                </Flex>
              </Box>
            ))}
            <Flex justify="space-between" fontWeight="semibold" ml={2} mb={2} fontSize="2xs">
              <Text>Total Expense</Text>
              <Flex gap={4}>
                <Text>Balance: {detailedData.totalExpenses}</Text>
              </Flex>
            </Flex>
            
            <Flex justify="space-between" fontWeight="bold" mb={2} fontSize="xs">
              <Text>Net Ordinary Income</Text>
              <Flex gap={4}>
                <Text>Balance: {detailedData.netOrdinaryIncome}</Text>
              </Flex>
            </Flex>
            
            <Flex justify="space-between" fontWeight="bold" borderTop="2px solid" borderColor="gray.300" pt={2} fontSize="xs">
              <Text>Net Income</Text>
              <Flex gap={4}>
                <Text>Balance: {detailedData.netIncome}</Text>
              </Flex>
            </Flex>
          </Box>
        </Box>
      </Box>
      <Flex align="center" mb={4}>
        <Text fontSize="sm" mr={2}>Dates: This Fiscal Year-to-date</Text>
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDown />} variant="ghost" size="sm">
            1/1/2021
          </MenuButton>
          <MenuList>
            <MenuItem>Select Date</MenuItem>
          </MenuList>
        </Menu>
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDown />} variant="ghost" size="sm" ml={2}>
            8/5/2021
          </MenuButton>
          <MenuList>
            <MenuItem>Select Date</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
      <Flex gap={2}>
        <IconButton aria-label="Refresh" icon={<RefreshCcw size={16} />} size="sm" variant="ghost" />
        <IconButton aria-label="Document" icon={<FileText size={16} />} size="sm" variant="ghost" />
        <IconButton aria-label="Favorite" icon={<Heart size={16} />} size="sm" variant="ghost" />
        <IconButton aria-label="Help" icon={<HelpCircle size={16} />} size="sm" variant="ghost" />
      </Flex>
    </Flex>
  );
};