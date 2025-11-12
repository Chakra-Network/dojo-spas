import { Box, Heading } from '@chakra-ui/react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, PieLabelRenderProps } from 'recharts';
import { useDojoState } from '../../dojo/state';

const COLORS = ['#4299E1', '#48BB78', '#ED8936', '#9F7AEA', '#F56565', '#38B2AC'];

interface ChartData extends Record<string, any> {
  name: string;
  value: number;
}

export function ExpensesByCategory() {
  const expenses = useDojoState('expenses');

  // Group expenses by category
  const categoryTotals = expenses.reduce((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
    return acc;
  }, {} as Record<string, number>);

  const chartData: ChartData[] = Object.entries(categoryTotals).map(([name, value]) => ({
    name,
    value: Number(value.toFixed(2)),
  }));

  return (
    <Box p={6} bg="white" borderRadius="lg" borderWidth="1px" borderColor="gray.200" shadow="sm">
      <Heading size="md" mb={4}>
        Expenses by Category
      </Heading>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }: PieLabelRenderProps) => {
              const displayPercent = typeof percent === 'number' ? percent : 0;
              return `${name} ${(displayPercent * 100).toFixed(0)}%`;
            }}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
}
