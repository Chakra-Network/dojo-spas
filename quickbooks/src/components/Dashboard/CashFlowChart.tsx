import { Box, Heading } from '@chakra-ui/react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useDojoState } from '../../dojo/state';

export function CashFlowChart() {
  const invoices = useDojoState('invoices');
  const expenses = useDojoState('expenses');

  // Group data by month
  const monthlyData = new Map<string, { income: number; expenses: number }>();

  invoices.forEach((inv) => {
    if (inv.status === 'paid') {
      const month = new Date(inv.createdAt).toLocaleDateString('en-US', { month: 'short' });
      const current = monthlyData.get(month) || { income: 0, expenses: 0 };
      monthlyData.set(month, { ...current, income: current.income + inv.amount });
    }
  });

  expenses.forEach((exp) => {
    const month = new Date(exp.date).toLocaleDateString('en-US', { month: 'short' });
    const current = monthlyData.get(month) || { income: 0, expenses: 0 };
    monthlyData.set(month, { ...current, expenses: current.expenses + exp.amount });
  });

  const chartData = Array.from(monthlyData.entries()).map(([month, data]) => ({
    month,
    Income: data.income,
    Expenses: data.expenses,
  }));

  return (
    <Box p={6} bg="white" borderRadius="lg" borderWidth="1px" borderColor="gray.200" shadow="sm">
      <Heading size="md" mb={4}>
        Cash Flow Overview
      </Heading>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Income" fill="#48BB78" />
          <Bar dataKey="Expenses" fill="#F56565" />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
}
