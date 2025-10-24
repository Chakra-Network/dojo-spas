import { Box, VStack, Text, Badge } from '@chakra-ui/react';
import { useDojoState } from '../../dojo/state';

export function AuditSidebar() {
  const auditLog = useDojoState('auditLog');

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Box
      w="320px"
      h="100vh"
      bg="gray.50"
      borderLeft="1px"
      borderColor="gray.200"
      overflowY="auto"
      p={4}
    >
      <Text fontSize="lg" fontWeight="bold" mb={4}>
        Audit Log
      </Text>
      <VStack spacing={3} align="stretch">
        {auditLog.length === 0 ? (
          <Text fontSize="sm" color="gray.500">
            No activity yet
          </Text>
        ) : (
          [...auditLog].reverse().map((entry) => (
            <Box key={entry.id}>
              <Box
                p={3}
                bg="white"
                borderRadius="md"
                borderWidth="1px"
                borderColor="gray.200"
              >
                <Badge colorScheme="blue" fontSize="xs" mb={2}>
                  {entry.action}
                </Badge>
                <Text fontSize="sm" mb={1}>
                  {entry.description}
                </Text>
                <Text fontSize="xs" color="gray.500">
                  {formatTimestamp(entry.timestamp)}
                </Text>
              </Box>
              <Box h="1px" bg="gray.200" mt={3} />
            </Box>
          ))
        )}
      </VStack>
    </Box>
  );
}
