import { Box, Container, Heading, SimpleGrid, Stat, StatLabel, StatNumber, StatHelpText, Card, CardBody, Flex, Icon, Text, Progress, VStack, HStack, Badge } from '@chakra-ui/react';
import { AlertCircle, Clock, TrendingUp } from 'lucide-react';
import { useDojoState } from '../../dojo/state';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const queueMetrics = useDojoState('queueMetrics');
  const currentAgent = useDojoState('currentAgent');
  const tickets = useDojoState('tickets');
  const agents = useDojoState('agents');

  // Calculate data for charts
  const statusData = [
    { name: 'New', count: tickets.filter(t => t.status === 'new').length },
    { name: 'Open', count: tickets.filter(t => t.status === 'open').length },
    { name: 'Pending', count: tickets.filter(t => t.status === 'pending').length },
    { name: 'Solved', count: tickets.filter(t => t.status === 'solved').length },
  ];

  const priorityData = [
    { name: 'Urgent', count: tickets.filter(t => t.priority === 'urgent').length },
    { name: 'High', count: tickets.filter(t => t.priority === 'high').length },
    { name: 'Normal', count: tickets.filter(t => t.priority === 'normal').length },
    { name: 'Low', count: tickets.filter(t => t.priority === 'low').length },
  ];

  return (
    <Container maxW="container.xl" py={8}>
      <Heading mb={6}>Support Dashboard</Heading>

      {/* Queue Health Metrics */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} mb={8}>
        <Card>
          <CardBody>
            <Flex align="center" justify="space-between">
              <Box>
                <StatLabel color="gray.600" fontSize="sm">New Tickets</StatLabel>
                <StatNumber fontSize="3xl">{queueMetrics.newTickets}</StatNumber>
                <StatHelpText mb={0}>Unassigned</StatHelpText>
              </Box>
              <Icon as={AlertCircle} boxSize={10} color="orange.400" />
            </Flex>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <Flex align="center" justify="space-between">
              <Box>
                <StatLabel color="gray.600" fontSize="sm">Pending</StatLabel>
                <StatNumber fontSize="3xl">{queueMetrics.pendingTickets}</StatNumber>
                <StatHelpText mb={0}>Awaiting response</StatHelpText>
              </Box>
              <Icon as={Clock} boxSize={10} color="blue.400" />
            </Flex>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <Flex align="center" justify="space-between">
              <Box>
                <StatLabel color="gray.600" fontSize="sm">SLA Breached</StatLabel>
                <StatNumber fontSize="3xl" color={queueMetrics.breachedSLAs > 0 ? 'red.500' : 'green.500'}>
                  {queueMetrics.breachedSLAs}
                </StatNumber>
                <StatHelpText mb={0}>
                  {queueMetrics.atRiskSLAs} at risk
                </StatHelpText>
              </Box>
              <Icon as={AlertCircle} boxSize={10} color={queueMetrics.breachedSLAs > 0 ? 'red.400' : 'green.400'} />
            </Flex>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <Flex align="center" justify="space-between">
              <Box>
                <StatLabel color="gray.600" fontSize="sm">Avg Response Time</StatLabel>
                <StatNumber fontSize="3xl">{Math.round(queueMetrics.avgFirstResponseTime)}m</StatNumber>
                <StatHelpText mb={0}>First response</StatHelpText>
              </Box>
              <Icon as={TrendingUp} boxSize={10} color="purple.400" />
            </Flex>
          </CardBody>
        </Card>
      </SimpleGrid>

      {/* Personal Performance */}
      {currentAgent && (
        <Card mb={8}>
          <CardBody>
            <Heading size="md" mb={4}>Your Performance</Heading>
            <SimpleGrid columns={{ base: 1, md: 4 }} spacing={6}>
              <Stat>
                <StatLabel>Assigned Tickets</StatLabel>
                <StatNumber>{currentAgent.ticketsAssigned}</StatNumber>
              </Stat>
              <Stat>
                <StatLabel>Tickets Solved</StatLabel>
                <StatNumber>{currentAgent.ticketsSolved}</StatNumber>
              </Stat>
              <Stat>
                <StatLabel>Avg Response Time</StatLabel>
                <StatNumber>{currentAgent.avgResponseTime}m</StatNumber>
              </Stat>
              <Stat>
                <StatLabel>Satisfaction Score</StatLabel>
                <StatNumber>{currentAgent.satisfactionScore}%</StatNumber>
                <Progress value={currentAgent.satisfactionScore} colorScheme="green" mt={2} />
              </Stat>
            </SimpleGrid>
          </CardBody>
        </Card>
      )}

      {/* Charts */}
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6} mb={8}>
        <Card>
          <CardBody>
            <Heading size="md" mb={4}>Tickets by Status</Heading>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={statusData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#3182ce" />
              </BarChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <Heading size="md" mb={4}>Tickets by Priority</Heading>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={priorityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#805ad5" />
              </BarChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>
      </SimpleGrid>

      {/* Team Status */}
      <Card>
        <CardBody>
          <Heading size="md" mb={4}>Team Status</Heading>
          <VStack align="stretch" spacing={3}>
            {agents.map(agent => (
              <Flex key={agent.id} align="center" justify="space-between" p={3} bg="gray.50" borderRadius="md">
                <HStack spacing={3}>
                  <Box
                    w={3}
                    h={3}
                    borderRadius="full"
                    bg={agent.status === 'online' ? 'green.400' : agent.status === 'away' ? 'yellow.400' : 'gray.400'}
                  />
                  <Text fontWeight="medium">{agent.name}</Text>
                  <Badge colorScheme={agent.role === 'admin' ? 'purple' : 'blue'}>
                    {agent.role}
                  </Badge>
                </HStack>
                <HStack spacing={6}>
                  <Stat size="sm">
                    <StatLabel fontSize="xs">Assigned</StatLabel>
                    <StatNumber fontSize="lg">{agent.ticketsAssigned}</StatNumber>
                  </Stat>
                  <Stat size="sm">
                    <StatLabel fontSize="xs">Solved</StatLabel>
                    <StatNumber fontSize="lg">{agent.ticketsSolved}</StatNumber>
                  </Stat>
                  <Stat size="sm">
                    <StatLabel fontSize="xs">CSAT</StatLabel>
                    <StatNumber fontSize="lg">{agent.satisfactionScore}%</StatNumber>
                  </Stat>
                </HStack>
              </Flex>
            ))}
          </VStack>
        </CardBody>
      </Card>
    </Container>
  );
};

export default Dashboard;
