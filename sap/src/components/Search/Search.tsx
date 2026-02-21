import { useState } from 'react';
import {
  Box,
  Heading,
  Input,
  Card,
  CardBody,
  VStack,
  Text,
  Badge,
  HStack,
} from '@chakra-ui/react';
import { useDojoState } from '../../dojo/state';
import { Search as SearchIcon, FileText, CheckSquare, TrendingUp } from 'lucide-react';

export const Search = () => {
  const [query, setQuery] = useState('');
  const purchaseOrders = useDojoState('purchaseOrders');
  const approvalTasks = useDojoState('approvalTasks');
  const kpis = useDojoState('kpis');

  const searchResults = () => {
    if (!query.trim()) return { pos: [], tasks: [], kpis: [] };

    const lowerQuery = query.toLowerCase();

    const pos = purchaseOrders.filter(
      po =>
        po.poNumber.toLowerCase().includes(lowerQuery) ||
        po.vendor.toLowerCase().includes(lowerQuery) ||
        po.description.toLowerCase().includes(lowerQuery) ||
        po.department.toLowerCase().includes(lowerQuery) ||
        po.requestedBy.toLowerCase().includes(lowerQuery)
    );

    const tasks = approvalTasks.filter(
      task =>
        task.title.toLowerCase().includes(lowerQuery) ||
        task.description.toLowerCase().includes(lowerQuery) ||
        task.requestedBy.toLowerCase().includes(lowerQuery) ||
        task.assignedTo.toLowerCase().includes(lowerQuery)
    );

    const kpisFiltered = kpis.filter(
      kpi =>
        kpi.name.toLowerCase().includes(lowerQuery) ||
        kpi.category.toLowerCase().includes(lowerQuery)
    );

    return { pos, tasks, kpis: kpisFiltered };
  };

  const results = searchResults();
  const totalResults = results.pos.length + results.tasks.length + results.kpis.length;

  return (
    <Box p={8} bg="gray.50" minH="100vh">
      <Heading size="xl" mb={6}>Global Search</Heading>

      <Card mb={6}>
        <CardBody>
          <Input
            placeholder="Search purchase orders, tasks, KPIs, vendors..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            size="lg"
          />
        </CardBody>
      </Card>

      {query.trim() && (
        <Box mb={4}>
          <Text color="gray.600">
            Found {totalResults} result{totalResults !== 1 ? 's' : ''}
          </Text>
        </Box>
      )}

      {query.trim() && totalResults === 0 && (
        <Card>
          <CardBody textAlign="center" py={10}>
            <SearchIcon size={48} style={{ margin: '0 auto 16px', color: '#A0AEC0' }} />
            <Heading size="md" mb={2}>No results found</Heading>
            <Text color="gray.500">Try searching for something else</Text>
          </CardBody>
        </Card>
      )}

      <VStack spacing={6} align="stretch">
        {/* Purchase Orders */}
        {results.pos.length > 0 && (
          <Card>
            <CardBody>
              <HStack mb={4}>
                <FileText size={20} />
                <Heading size="md">Purchase Orders ({results.pos.length})</Heading>
              </HStack>
              <VStack spacing={3} align="stretch">
                {results.pos.map(po => (
                  <Box key={po.id} p={4} bg="gray.50" borderRadius="md" _hover={{ bg: 'gray.100' }}>
                    <HStack justify="space-between" mb={2}>
                      <Text fontWeight="bold">{po.poNumber}</Text>
                      <Badge colorScheme={po.status === 'approved' ? 'green' : 'yellow'}>
                        {po.status.replace('_', ' ').toUpperCase()}
                      </Badge>
                    </HStack>
                    <Text fontSize="sm" color="gray.700" mb={1}>{po.description}</Text>
                    <HStack fontSize="sm" color="gray.600">
                      <Text>Vendor: {po.vendor}</Text>
                      <Text>•</Text>
                      <Text>Amount: {po.currency} {po.totalAmount.toLocaleString()}</Text>
                      <Text>•</Text>
                      <Text>Dept: {po.department}</Text>
                    </HStack>
                  </Box>
                ))}
              </VStack>
            </CardBody>
          </Card>
        )}

        {/* Tasks */}
        {results.tasks.length > 0 && (
          <Card>
            <CardBody>
              <HStack mb={4}>
                <CheckSquare size={20} />
                <Heading size="md">Approval Tasks ({results.tasks.length})</Heading>
              </HStack>
              <VStack spacing={3} align="stretch">
                {results.tasks.map(task => (
                  <Box key={task.id} p={4} bg="gray.50" borderRadius="md" _hover={{ bg: 'gray.100' }}>
                    <HStack justify="space-between" mb={2}>
                      <Text fontWeight="bold" flex={1}>{task.title}</Text>
                      <Badge colorScheme={task.priority === 'urgent' ? 'red' : 'blue'}>
                        {task.priority.toUpperCase()}
                      </Badge>
                      <Badge colorScheme={task.status === 'approved' ? 'green' : 'yellow'}>
                        {task.status.replace('_', ' ').toUpperCase()}
                      </Badge>
                    </HStack>
                    <Text fontSize="sm" color="gray.700" mb={1}>{task.description}</Text>
                    <HStack fontSize="sm" color="gray.600">
                      <Text>Requested by: {task.requestedBy}</Text>
                      {task.amount && (
                        <>
                          <Text>•</Text>
                          <Text>Amount: {task.currency} {task.amount.toLocaleString()}</Text>
                        </>
                      )}
                    </HStack>
                  </Box>
                ))}
              </VStack>
            </CardBody>
          </Card>
        )}

        {/* KPIs */}
        {results.kpis.length > 0 && (
          <Card>
            <CardBody>
              <HStack mb={4}>
                <TrendingUp size={20} />
                <Heading size="md">KPIs ({results.kpis.length})</Heading>
              </HStack>
              <VStack spacing={3} align="stretch">
                {results.kpis.map(kpi => (
                  <Box key={kpi.id} p={4} bg="gray.50" borderRadius="md">
                    <HStack justify="space-between">
                      <Box>
                        <Text fontWeight="bold" mb={1}>{kpi.name}</Text>
                        <Text fontSize="sm" color="gray.600">Category: {kpi.category}</Text>
                      </Box>
                      <Box textAlign="right">
                        <Text fontSize="2xl" fontWeight="bold">
                          {typeof kpi.value === 'number' && kpi.unit === 'USD'
                            ? `$${kpi.value.toLocaleString()}`
                            : kpi.value}
                        </Text>
                        {kpi.trend && kpi.changePercent && (
                          <Text fontSize="sm" color={kpi.trend === 'up' ? 'green.600' : 'red.600'}>
                            {kpi.trend === 'up' ? '↑' : '↓'} {kpi.changePercent}%
                          </Text>
                        )}
                      </Box>
                    </HStack>
                  </Box>
                ))}
              </VStack>
            </CardBody>
          </Card>
        )}
      </VStack>
    </Box>
  );
};
