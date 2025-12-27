import { Box, Text } from '@chakra-ui/react';
import { useDojoState } from '../../dojo/state';

export function Dashboard() {
  const kpis = useDojoState('kpis');
  const purchaseOrders = useDojoState('purchaseOrders');
  const approvalTasks = useDojoState('approvalTasks');

  return (
    <Box p={6} bg="gray.50" minH="100%">
      <Text fontSize="2xl" fontWeight="bold" mb={4}>SAP ERP Dashboard</Text>
      <Box display="grid" gridTemplateColumns="repeat(4, 1fr)" gap={4} mb={6}>
        {kpis.map(kpi => (
          <Box key={kpi.id} bg="white" p={4} borderRadius="lg" boxShadow="sm">
            <Text fontSize="sm" color="gray.500">{kpi.label}</Text>
            <Text fontSize="2xl" fontWeight="bold">{kpi.unit === 'USD' ? '$' + (kpi.value / 1000000).toFixed(2) + 'M' : kpi.value}</Text>
          </Box>
        ))}
      </Box>
      <Box display="grid" gridTemplateColumns="1fr 1fr" gap={6}>
        <Box bg="white" p={4} borderRadius="lg" boxShadow="sm">
          <Text fontWeight="semibold" mb={3}>Recent Purchase Orders</Text>
          {purchaseOrders.slice(0, 5).map(po => (
            <Box key={po.id} py={2} borderBottom="1px solid" borderColor="gray.100">
              <Text fontWeight="medium">{po.poNumber}</Text>
              <Text fontSize="sm" color="gray.500">{po.vendor} - ${po.totalAmount.toLocaleString()}</Text>
            </Box>
          ))}
        </Box>
        <Box bg="white" p={4} borderRadius="lg" boxShadow="sm">
          <Text fontWeight="semibold" mb={3}>Pending Approvals</Text>
          {approvalTasks.filter(t => t.status === 'pending').slice(0, 5).map(task => (
            <Box key={task.id} py={2} borderBottom="1px solid" borderColor="gray.100">
              <Text fontWeight="medium">{task.title}</Text>
              <Text fontSize="sm" color="gray.500">Due: {task.dueDate} - ${task.amount.toLocaleString()}</Text>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
