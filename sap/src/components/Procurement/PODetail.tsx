import { Box, Text, Button, Badge, Grid, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import { PurchaseOrder } from '../../dojo/state';

interface Props { po: PurchaseOrder; onBack: () => void; }

export function PODetail({ po, onBack }: Props) {
  return (
    <Box p={6} bg="gray.50" minH="100%">
      <Button onClick={onBack} mb={4}>Back</Button>
      <Text fontSize="2xl" fontWeight="bold" mb={2}>PO: {po.poNumber}</Text>
      <Badge colorScheme={po.status === 'approved' ? 'green' : 'yellow'} mb={4}>{po.status}</Badge>
      <Grid templateColumns="repeat(2, 1fr)" gap={4} mb={6}>
        <Box bg="white" p={4} borderRadius="lg"><Text color="gray.500">Vendor</Text><Text fontWeight="medium">{po.vendor}</Text></Box>
        <Box bg="white" p={4} borderRadius="lg"><Text color="gray.500">Total</Text><Text fontWeight="medium">${po.totalAmount.toLocaleString()}</Text></Box>
      </Grid>
      <Box bg="white" borderRadius="lg" overflow="hidden">
        <Table variant="simple">
          <Thead><Tr><Th>Material</Th><Th>Description</Th><Th>Qty</Th><Th>Price</Th></Tr></Thead>
          <Tbody>
            {po.items.map(item => (<Tr key={item.id}><Td>{item.material}</Td><Td>{item.description}</Td><Td>{item.quantity}</Td><Td>${item.totalPrice.toLocaleString()}</Td></Tr>))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
}
