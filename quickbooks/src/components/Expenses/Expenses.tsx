import { useState } from 'react';
import {
  Box,
  Heading,
  Button,
  HStack,
  SimpleGrid,
  Text,
  Badge,
} from '@chakra-ui/react';
import { useDojoState } from '../../dojo/state';
import { AddExpenseModal } from './AddExpenseModal';
import { FileText } from 'lucide-react';

export function Expenses() {
  const expenses = useDojoState('expenses');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Calculate totals by category
  const categoryTotals = expenses.reduce((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
    return acc;
  }, {} as Record<string, number>);

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <Box p={8}>
      <HStack justify="space-between" mb={6}>
        <Heading size="lg">Expense Tracking</Heading>
        <Button colorScheme="blue" onClick={() => setIsModalOpen(true)}>
          Add Expense
        </Button>
      </HStack>

      {/* Category Totals */}
      <SimpleGrid columns={{ base: 2, md: 4, lg: 6 }} spacing={4} mb={6}>
        {Object.entries(categoryTotals).map(([category, total]) => (
          <Box
            key={category}
            p={4}
            bg="white"
            borderRadius="md"
            borderWidth="1px"
            borderColor="gray.200"
            shadow="sm"
          >
            <Text fontSize="xs" color="gray.600" mb={1}>
              {category}
            </Text>
            <Text fontSize="lg" fontWeight="bold" color="red.600">
              ${total.toFixed(2)}
            </Text>
          </Box>
        ))}
      </SimpleGrid>

      {/* Total Expenses Summary */}
      <Box
        p={4}
        mb={6}
        bg="red.50"
        borderRadius="md"
        borderWidth="1px"
        borderColor="red.200"
      >
        <HStack justify="space-between">
          <Heading size="md" color="red.700">
            Total Expenses
          </Heading>
          <Heading size="lg" color="red.700">
            ${totalExpenses.toFixed(2)}
          </Heading>
        </HStack>
      </Box>

      {/* Expenses Table */}
      <Box bg="white" borderRadius="lg" borderWidth="1px" borderColor="gray.200" shadow="sm" overflowX="auto">
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ backgroundColor: '#f7fafc' }}>
            <tr>
              <th style={{ padding: '12px', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600', color: '#4a5568' }}>Date</th>
              <th style={{ padding: '12px', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600', color: '#4a5568' }}>Category</th>
              <th style={{ padding: '12px', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600', color: '#4a5568' }}>Description</th>
              <th style={{ padding: '12px', textAlign: 'right', fontSize: '0.875rem', fontWeight: '600', color: '#4a5568' }}>Amount</th>
              <th style={{ padding: '12px', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600', color: '#4a5568' }}>Receipt</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense.id} style={{ borderTop: '1px solid #e2e8f0' }}>
                <td style={{ padding: '12px' }}>{new Date(expense.date).toLocaleDateString()}</td>
                <td style={{ padding: '12px' }}>
                  <Badge colorScheme="purple">{expense.category}</Badge>
                </td>
                <td style={{ padding: '12px' }}>{expense.description}</td>
                <td style={{ padding: '12px', textAlign: 'right', fontWeight: '600', color: '#c53030' }}>
                  ${expense.amount.toFixed(2)}
                </td>
                <td style={{ padding: '12px' }}>
                  {expense.receiptUrl ? (
                    <HStack spacing={1} color="blue.600">
                      <FileText size={16} />
                      <Button variant="link" size="sm" colorScheme="blue">
                        View
                      </Button>
                    </HStack>
                  ) : (
                    <span>—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Box>

      <AddExpenseModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </Box>
  );
}
