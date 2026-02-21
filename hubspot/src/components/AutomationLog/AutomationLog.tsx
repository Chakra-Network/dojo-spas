import { useState } from 'react';
import {
  Box,
  VStack,
  HStack,
  Heading,
  Text,
  Badge,
  Select,
  Input,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react';
import { useDojoState } from '../../dojo/state';
import { Zap, Mail, TrendingUp, Workflow, List, Search } from 'lucide-react';

export const AutomationLog = () => {
  const automationLog = useDojoState('automationLog');
  const [actionFilter, setActionFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLog = automationLog.filter(entry => {
    const matchesAction = actionFilter === 'all' || entry.action === actionFilter;
    const matchesSearch =
      searchQuery === '' ||
      entry.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.entityType.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesAction && matchesSearch;
  }).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  return (
    <Box p={6} bg="gray.50" minH="100vh">
      <VStack align="stretch" spacing={6}>
        {/* Header */}
        <HStack justify="space-between">
          <Heading size="lg" color="gray.700">Automation Log</Heading>
          <HStack>
            <HStack bg="white" px={3} py={2} borderRadius="md" shadow="sm">
              <Search size={16} color="gray" />
              <Input
                placeholder="Search log..."
                border="none"
                _focus={{ outline: 'none' }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </HStack>
            <Select
              value={actionFilter}
              onChange={(e) => setActionFilter(e.target.value)}
              w="250px"
              bg="white"
            >
              <option value="all">All Actions</option>
              <option value="campaign_launch">Campaign Launch</option>
              <option value="email_send">Email Send</option>
              <option value="lead_conversion">Lead Conversion</option>
              <option value="workflow_trigger">Workflow Trigger</option>
              <option value="list_update">List Update</option>
            </Select>
          </HStack>
        </HStack>

        {/* Stats */}
        <HStack spacing={4}>
          <StatCard
            icon={<Zap size={20} />}
            label="Total Events"
            value={automationLog.length.toString()}
            color="blue"
          />
          <StatCard
            icon={<Mail size={20} />}
            label="Email Sends"
            value={automationLog.filter(e => e.action === 'email_send').length.toString()}
            color="green"
          />
          <StatCard
            icon={<TrendingUp size={20} />}
            label="Conversions"
            value={automationLog.filter(e => e.action === 'lead_conversion').length.toString()}
            color="purple"
          />
          <StatCard
            icon={<Workflow size={20} />}
            label="Workflows"
            value={automationLog.filter(e => e.action === 'workflow_trigger').length.toString()}
            color="orange"
          />
        </HStack>

        {/* Log Table */}
        <Box bg="white" borderRadius="lg" shadow="sm" overflow="hidden">
          <Table variant="simple">
            <Thead bg="gray.50">
              <Tr>
                <Th>Timestamp</Th>
                <Th>Action</Th>
                <Th>Entity Type</Th>
                <Th>Description</Th>
                <Th>Metadata</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredLog.map(entry => (
                <Tr key={entry.id}>
                  <Td fontSize="sm" color="gray.600" whiteSpace="nowrap">
                    {new Date(entry.timestamp).toLocaleString()}
                  </Td>
                  <Td>
                    <HStack>
                      <Box color={getActionColor(entry.action)}>
                        {getActionIcon(entry.action)}
                      </Box>
                      <Badge colorScheme={getActionBadgeColor(entry.action)}>
                        {formatAction(entry.action)}
                      </Badge>
                    </HStack>
                  </Td>
                  <Td>
                    <Badge variant="subtle">{entry.entityType}</Badge>
                  </Td>
                  <Td fontSize="sm">{entry.description}</Td>
                  <Td fontSize="xs" color="gray.500">
                    {entry.metadata ? (
                      <VStack align="start" spacing={0}>
                        {Object.entries(entry.metadata).slice(0, 2).map(([key, value]) => (
                          <Text key={key}>
                            {key}: {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                          </Text>
                        ))}
                      </VStack>
                    ) : (
                      <Text>-</Text>
                    )}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </VStack>
    </Box>
  );
};

const StatCard = ({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
}) => (
  <Box bg="white" p={4} borderRadius="lg" shadow="sm" flex="1">
    <HStack spacing={3}>
      <Box color={`${color}.500`}>{icon}</Box>
      <VStack align="start" spacing={0}>
        <Text fontSize="xs" color="gray.600">{label}</Text>
        <Text fontSize="2xl" fontWeight="bold">{value}</Text>
      </VStack>
    </HStack>
  </Box>
);

const getActionIcon = (action: string) => {
  switch (action) {
    case 'campaign_launch': return <Zap size={16} />;
    case 'email_send': return <Mail size={16} />;
    case 'lead_conversion': return <TrendingUp size={16} />;
    case 'workflow_trigger': return <Workflow size={16} />;
    case 'list_update': return <List size={16} />;
    default: return <Zap size={16} />;
  }
};

const getActionColor = (action: string) => {
  switch (action) {
    case 'campaign_launch': return 'blue.500';
    case 'email_send': return 'green.500';
    case 'lead_conversion': return 'purple.500';
    case 'workflow_trigger': return 'orange.500';
    case 'list_update': return 'gray.500';
    default: return 'gray.500';
  }
};

const getActionBadgeColor = (action: string) => {
  switch (action) {
    case 'campaign_launch': return 'blue';
    case 'email_send': return 'green';
    case 'lead_conversion': return 'purple';
    case 'workflow_trigger': return 'orange';
    case 'list_update': return 'gray';
    default: return 'gray';
  }
};

const formatAction = (action: string) => {
  return action.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};
