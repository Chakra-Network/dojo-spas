import {
  Box,
  Heading,
  Card,
  CardBody,
  VStack,
  Text,
  HStack,
  Badge,
  Divider,
} from '@chakra-ui/react';
import { useDojoState } from '../../dojo/state';
import { Activity, User, Calendar } from 'lucide-react';

export const AuditTrail = () => {
  const auditLog = useDojoState('auditLog');

  const sortedLog = [...auditLog].sort((a, b) =>
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  const getActionColor = (action: string) => {
    if (action.includes('APPROVE')) return 'green';
    if (action.includes('REJECT')) return 'red';
    if (action.includes('UPDATE')) return 'blue';
    return 'gray';
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <Box p={8} bg="gray.50" minH="100vh">
      <Heading size="xl" mb={2}>Audit Trail</Heading>
      <Text color="gray.600" mb={6}>
        Session activity log for RL verification ({auditLog.length} entries)
      </Text>

      {auditLog.length === 0 ? (
        <Card>
          <CardBody textAlign="center" py={20}>
            <Activity size={48} style={{ margin: '0 auto 16px', color: '#A0AEC0' }} />
            <Heading size="md" mb={2}>No activity yet</Heading>
            <Text color="gray.500">Actions performed in this session will appear here</Text>
          </CardBody>
        </Card>
      ) : (
        <Card>
          <CardBody>
            <VStack spacing={0} align="stretch" divider={<Divider />}>
              {sortedLog.map((entry) => (
                <Box key={entry.id} py={4}>
                  <HStack justify="space-between" mb={2}>
                    <HStack>
                      <Badge colorScheme={getActionColor(entry.action)}>
                        {entry.action}
                      </Badge>
                      {entry.targetType && (
                        <Badge variant="outline">{entry.targetType}</Badge>
                      )}
                    </HStack>
                    <HStack fontSize="sm" color="gray.500">
                      <Calendar size={14} />
                      <Text>{formatTimestamp(entry.timestamp)}</Text>
                    </HStack>
                  </HStack>

                  <Text mb={2}>{entry.description}</Text>

                  <HStack fontSize="sm" color="gray.600">
                    {entry.user && (
                      <>
                        <User size={14} />
                        <Text>{entry.user}</Text>
                      </>
                    )}
                    {entry.targetId && (
                      <>
                        <Text>•</Text>
                        <Text>ID: {entry.targetId}</Text>
                      </>
                    )}
                    <Text>•</Text>
                    <Text>{new Date(entry.timestamp).toLocaleString()}</Text>
                  </HStack>
                </Box>
              ))}
            </VStack>
          </CardBody>
        </Card>
      )}
    </Box>
  );
};
