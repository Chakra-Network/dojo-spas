import { Box, Card, CardBody, Text, Progress, VStack, HStack, Badge, Icon } from '@chakra-ui/react';
import { Clock, AlertTriangle, CheckCircle } from 'lucide-react';
import { Ticket } from '../../dojo/state';

interface SLATrackerProps {
  ticket: Ticket;
}

const SLATracker = ({ ticket }: SLATrackerProps) => {
  const getSLALimit = (priority: string): number => {
    const limits: Record<string, number> = {
      urgent: 15,
      high: 30,
      normal: 60,
      low: 120,
    };
    return limits[priority] || 60;
  };

  const calculateTimeElapsed = (): number => {
    const created = new Date(ticket.createdAt).getTime();
    const now = Date.now();
    return (now - created) / 60000; // in minutes
  };

  const calculateTimeRemaining = (): number => {
    if (!ticket.slaBreachTime) return 0;
    const breach = new Date(ticket.slaBreachTime).getTime();
    const now = Date.now();
    return Math.max(0, (breach - now) / 60000); // in minutes
  };

  const formatTime = (minutes: number): string => {
    if (minutes < 60) return `${Math.round(minutes)}m`;
    const hours = Math.floor(minutes / 60);
    const mins = Math.round(minutes % 60);
    if (hours < 24) return `${hours}h ${mins}m`;
    const days = Math.floor(hours / 24);
    const remainingHours = hours % 24;
    return `${days}d ${remainingHours}h`;
  };

  const getSLAColor = () => {
    switch (ticket.slaStatus) {
      case 'breached': return 'red';
      case 'at_risk': return 'orange';
      case 'active': return 'green';
    }
  };

  const getSLAIcon = () => {
    switch (ticket.slaStatus) {
      case 'breached': return AlertTriangle;
      case 'at_risk': return Clock;
      case 'active': return CheckCircle;
    }
  };

  const timeElapsed = calculateTimeElapsed();
  const timeRemaining = calculateTimeRemaining();
  const slaLimit = getSLALimit(ticket.priority);
  const progressPercentage = ticket.firstResponseAt ? 100 : Math.min(100, (timeElapsed / slaLimit) * 100);

  return (
    <Card>
      <CardBody>
        <HStack justify="space-between" mb={3}>
          <Text fontWeight="bold">SLA Status</Text>
          <Badge colorScheme={getSLAColor()} display="flex" alignItems="center" gap={1}>
            <Icon as={getSLAIcon()} boxSize={3} />
            {ticket.slaStatus.replace('_', ' ').toUpperCase()}
          </Badge>
        </HStack>

        <VStack spacing={4} align="stretch">
          {/* First Response SLA */}
          <Box>
            <HStack justify="space-between" mb={2}>
              <Text fontSize="sm" fontWeight="medium">
                First Response
              </Text>
              {ticket.firstResponseAt ? (
                <Badge colorScheme="green" fontSize="xs">
                  Met
                </Badge>
              ) : ticket.slaStatus === 'breached' ? (
                <Badge colorScheme="red" fontSize="xs">
                  Breached
                </Badge>
              ) : (
                <Text fontSize="xs" color={ticket.slaStatus === 'at_risk' ? 'orange.600' : 'gray.600'}>
                  {formatTime(timeRemaining)} left
                </Text>
              )}
            </HStack>
            <Progress
              value={progressPercentage}
              colorScheme={
                ticket.firstResponseAt ? 'green' :
                ticket.slaStatus === 'breached' ? 'red' :
                ticket.slaStatus === 'at_risk' ? 'orange' :
                'blue'
              }
              size="sm"
              borderRadius="full"
            />
            <HStack justify="space-between" mt={1}>
              <Text fontSize="xs" color="gray.500">
                Target: {formatTime(slaLimit)}
              </Text>
              <Text fontSize="xs" color="gray.500">
                Elapsed: {formatTime(timeElapsed)}
              </Text>
            </HStack>
          </Box>

          {/* Timeline */}
          <Box>
            <Text fontSize="sm" fontWeight="medium" mb={2}>
              Timeline
            </Text>
            <VStack align="stretch" spacing={2}>
              <HStack fontSize="xs">
                <Box w={2} h={2} borderRadius="full" bg="blue.500" />
                <Text color="gray.600">Created:</Text>
                <Text>{new Date(ticket.createdAt).toLocaleString()}</Text>
              </HStack>
              {ticket.firstResponseAt && (
                <HStack fontSize="xs">
                  <Box w={2} h={2} borderRadius="full" bg="green.500" />
                  <Text color="gray.600">First Response:</Text>
                  <Text>{new Date(ticket.firstResponseAt).toLocaleString()}</Text>
                </HStack>
              )}
              {ticket.slaBreachTime && !ticket.firstResponseAt && (
                <HStack fontSize="xs">
                  <Box w={2} h={2} borderRadius="full" bg={getSLAColor() + '.500'} />
                  <Text color="gray.600">
                    {ticket.slaStatus === 'breached' ? 'Breached:' : 'Due:'}
                  </Text>
                  <Text>{new Date(ticket.slaBreachTime).toLocaleString()}</Text>
                </HStack>
              )}
            </VStack>
          </Box>

          {/* Escalation Warning */}
          {(ticket.slaStatus === 'breached' || ticket.slaStatus === 'at_risk') && (
            <Box bg={ticket.slaStatus === 'breached' ? 'red.50' : 'orange.50'} p={3} borderRadius="md">
              <HStack spacing={2} mb={1}>
                <Icon
                  as={ticket.slaStatus === 'breached' ? AlertTriangle : Clock}
                  boxSize={4}
                  color={ticket.slaStatus === 'breached' ? 'red.600' : 'orange.600'}
                />
                <Text fontSize="sm" fontWeight="bold" color={ticket.slaStatus === 'breached' ? 'red.700' : 'orange.700'}>
                  {ticket.slaStatus === 'breached' ? 'SLA Breached' : 'SLA At Risk'}
                </Text>
              </HStack>
              <Text fontSize="xs" color={ticket.slaStatus === 'breached' ? 'red.600' : 'orange.600'}>
                {ticket.slaStatus === 'breached'
                  ? 'This ticket has exceeded the SLA response time. Immediate action required.'
                  : 'This ticket is approaching SLA breach. Please respond soon.'}
              </Text>
            </Box>
          )}
        </VStack>
      </CardBody>
    </Card>
  );
};

export default SLATracker;
