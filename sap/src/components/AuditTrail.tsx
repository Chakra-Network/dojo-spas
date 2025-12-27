import { Box, Text, Table, Thead, Tbody, Tr, Th, Td, Badge } from '@chakra-ui/react';
import { useDojoState } from '../dojo/state';

export function AuditTrail() {
  const auditLog = useDojoState('auditLog');

  return (
    <Box p={6} bg="gray.50" minH="100%">
      <Text fontSize="2xl" fontWeight="bold" mb={4}>Audit Trail ({auditLog.length} entries)</Text>
      <Box bg="white" borderRadius="lg" boxShadow="sm" overflow="hidden">
        {auditLog.length === 0 ? (
          <Box p={10} textAlign="center" color="gray.500">No activity recorded yet. Actions will be logged as you interact with the system.</Box>
        ) : (
          <Table variant="simple">
            <Thead bg="gray.50"><Tr><Th>Time</Th><Th>User</Th><Th>Action</Th><Th>Description</Th></Tr></Thead>
            <Tbody>
              {[...auditLog].reverse().map(entry => (
                <Tr key={entry.id}>
                  <Td fontSize="sm">{new Date(entry.timestamp).toLocaleString()}</Td>
                  <Td>{entry.user}</Td>
                  <Td><Badge>{entry.action}</Badge></Td>
                  <Td>{entry.description}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
      </Box>
    </Box>
  );
}
