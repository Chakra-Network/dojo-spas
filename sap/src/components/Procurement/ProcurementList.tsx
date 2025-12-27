import { Box, Text, Table, Thead, Tbody, Tr, Th, Td, Badge, Button, Flex, useToast } from '@chakra-ui/react';
import { useDojoState, useDojo, PurchaseOrder } from '../../dojo/state';

interface Props { onViewPO: (po: PurchaseOrder) => void; }

export function ProcurementList({ onViewPO }: Props) {
  const purchaseOrders = useDojoState('purchaseOrders');
  const dojo = useDojo();
  const toast = useToast();

  const handleApprove = (po: PurchaseOrder) => {
    const updated = purchaseOrders.map(p => p.id === po.id ? { ...p, status: 'approved' as const } : p);
    dojo.setState('purchaseOrders', updated, 'Approved PO ' + po.poNumber, 'admin');
    toast({ title: 'PO Approved', status: 'success', duration: 2000 });
  };

  return (
    <Box p={6} bg="gray.50" minH="100%">
      <Text fontSize="2xl" fontWeight="bold" mb={4}>Purchase Orders</Text>
      <Box bg="white" borderRadius="lg" boxShadow="sm" overflow="hidden">
        <Table variant="simple">
          <Thead bg="gray.50"><Tr><Th>PO Number</Th><Th>Vendor</Th><Th>Amount</Th><Th>Status</Th><Th>Actions</Th></Tr></Thead>
          <Tbody>
            {purchaseOrders.map(po => (
              <Tr key={po.id}>
                <Td fontWeight="medium">{po.poNumber}</Td>
                <Td>{po.vendor}</Td>
                <Td>${po.totalAmount.toLocaleString()}</Td>
                <Td><Badge colorScheme={po.status === 'approved' ? 'green' : po.status === 'pending' ? 'yellow' : 'blue'}>{po.status}</Badge></Td>
                <Td>
                  <Flex gap={2}>
                    <Button size="sm" onClick={() => onViewPO(po)}>View</Button>
                    {po.status === 'pending' && <Button size="sm" colorScheme="green" onClick={() => handleApprove(po)}>Approve</Button>}
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
}
