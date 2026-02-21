import { useState, useMemo } from 'react';
import {
  Box,
  Container,
  Heading,
  HStack,
  VStack,
  Text,
  Badge,
  Button,
  Input,
  Select,
  Flex,
  Card,
  CardBody,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Checkbox,
  useToast,
} from '@chakra-ui/react';
import { CheckSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDojoState, useDojo, TicketStatus, TicketPriority } from '../../dojo/state';

const TicketInbox = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const dojo = useDojo();
  const tickets = useDojoState('tickets');
  const agents = useDojoState('agents');

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<TicketStatus | 'all'>('all');
  const [priorityFilter, setPriorityFilter] = useState<TicketPriority | 'all'>('all');
  const [tagFilter, setTagFilter] = useState('');
  const [selectedTickets, setSelectedTickets] = useState<Set<string>>(new Set());
  const [displayCount, setDisplayCount] = useState(20);

  // Get all unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    tickets.forEach(ticket => ticket.tags.forEach(tag => tags.add(tag)));
    return Array.from(tags).sort();
  }, [tickets]);

  // Filter tickets
  const filteredTickets = useMemo(() => {
    return tickets.filter(ticket => {
      const matchesSearch = searchQuery === '' ||
        ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.id.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;
      const matchesPriority = priorityFilter === 'all' || ticket.priority === priorityFilter;
      const matchesTag = tagFilter === '' || ticket.tags.includes(tagFilter);

      return matchesSearch && matchesStatus && matchesPriority && matchesTag;
    });
  }, [tickets, searchQuery, statusFilter, priorityFilter, tagFilter]);

  // Infinite scroll simulation
  const displayedTickets = filteredTickets.slice(0, displayCount);
  const hasMore = displayCount < filteredTickets.length;

  const loadMore = () => {
    setDisplayCount(prev => Math.min(prev + 20, filteredTickets.length));
  };

  const toggleTicketSelection = (ticketId: string) => {
    const newSelection = new Set(selectedTickets);
    if (newSelection.has(ticketId)) {
      newSelection.delete(ticketId);
    } else {
      newSelection.add(ticketId);
    }
    setSelectedTickets(newSelection);
  };

  const selectAll = () => {
    if (selectedTickets.size === displayedTickets.length) {
      setSelectedTickets(new Set());
    } else {
      setSelectedTickets(new Set(displayedTickets.map(t => t.id)));
    }
  };

  const bulkUpdateStatus = (status: TicketStatus) => {
    const updatedTickets = tickets.map(ticket =>
      selectedTickets.has(ticket.id)
        ? { ...ticket, status, updatedAt: new Date().toISOString() }
        : ticket
    );
    dojo.setState('tickets', updatedTickets, `Bulk updated ${selectedTickets.size} tickets to ${status}`);
    toast({
      title: 'Tickets updated',
      description: `${selectedTickets.size} tickets marked as ${status}`,
      status: 'success',
      duration: 3000,
    });
    setSelectedTickets(new Set());
  };

  const bulkAssign = (agentId: string) => {
    const agent = agents.find(a => a.id === agentId);
    const updatedTickets = tickets.map(ticket =>
      selectedTickets.has(ticket.id)
        ? { ...ticket, assignedTo: agentId, updatedAt: new Date().toISOString() }
        : ticket
    );
    dojo.setState('tickets', updatedTickets, `Bulk assigned ${selectedTickets.size} tickets to ${agent?.name}`);
    toast({
      title: 'Tickets assigned',
      description: `${selectedTickets.size} tickets assigned to ${agent?.name}`,
      status: 'success',
      duration: 3000,
    });
    setSelectedTickets(new Set());
  };

  const getPriorityColor = (priority: TicketPriority) => {
    switch (priority) {
      case 'urgent': return 'red';
      case 'high': return 'orange';
      case 'normal': return 'blue';
      case 'low': return 'gray';
    }
  };

  const getStatusColor = (status: TicketStatus) => {
    switch (status) {
      case 'new': return 'purple';
      case 'open': return 'blue';
      case 'pending': return 'yellow';
      case 'solved': return 'green';
      case 'closed': return 'gray';
    }
  };

  const getSLAColor = (slaStatus: string) => {
    switch (slaStatus) {
      case 'breached': return 'red';
      case 'at_risk': return 'orange';
      case 'active': return 'green';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <Container maxW="container.xl" py={8}>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading>Ticket Inbox</Heading>
        {selectedTickets.size > 0 && (
          <HStack>
            <Text fontSize="sm" color="gray.600">
              {selectedTickets.size} selected
            </Text>
            <Menu>
              <MenuButton as={Button} size="sm" leftIcon={<CheckSquare size={16} />}>
                Bulk Actions
              </MenuButton>
              <MenuList>
                <MenuItem onClick={() => bulkUpdateStatus('open')}>Mark as Open</MenuItem>
                <MenuItem onClick={() => bulkUpdateStatus('pending')}>Mark as Pending</MenuItem>
                <MenuItem onClick={() => bulkUpdateStatus('solved')}>Mark as Solved</MenuItem>
                <MenuItem onClick={() => bulkUpdateStatus('closed')}>Mark as Closed</MenuItem>
                <MenuItem as="div" closeOnSelect={false}>
                  <Menu placement="right-start">
                    <MenuButton as={Box} w="full" cursor="pointer">
                      Assign to...
                    </MenuButton>
                    <MenuList>
                      {agents.map(agent => (
                        <MenuItem key={agent.id} onClick={() => bulkAssign(agent.id)}>
                          {agent.name}
                        </MenuItem>
                      ))}
                    </MenuList>
                  </Menu>
                </MenuItem>
              </MenuList>
            </Menu>
          </HStack>
        )}
      </Flex>

      {/* Filters */}
      <Card mb={6}>
        <CardBody>
          <VStack spacing={4} align="stretch">
            <HStack spacing={4}>
              <Input
                placeholder="Search tickets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as TicketStatus | 'all')}
                w="200px"
              >
                <option value="all">All Status</option>
                <option value="new">New</option>
                <option value="open">Open</option>
                <option value="pending">Pending</option>
                <option value="solved">Solved</option>
                <option value="closed">Closed</option>
              </Select>
              <Select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value as TicketPriority | 'all')}
                w="200px"
              >
                <option value="all">All Priority</option>
                <option value="urgent">Urgent</option>
                <option value="high">High</option>
                <option value="normal">Normal</option>
                <option value="low">Low</option>
              </Select>
              <Select
                value={tagFilter}
                onChange={(e) => setTagFilter(e.target.value)}
                w="200px"
              >
                <option value="">All Tags</option>
                {allTags.map(tag => (
                  <option key={tag} value={tag}>{tag}</option>
                ))}
              </Select>
            </HStack>
            <Text fontSize="sm" color="gray.600">
              Showing {displayedTickets.length} of {filteredTickets.length} tickets
            </Text>
          </VStack>
        </CardBody>
      </Card>

      {/* Ticket List */}
      <VStack spacing={3} align="stretch">
        {displayedTickets.length > 0 && (
          <Flex align="center" px={4} py={2} bg="gray.100" borderRadius="md">
            <Checkbox
              isChecked={selectedTickets.size === displayedTickets.length && displayedTickets.length > 0}
              onChange={selectAll}
              mr={4}
            />
            <Text fontSize="sm" fontWeight="medium" color="gray.600">
              Select All
            </Text>
          </Flex>
        )}

        {displayedTickets.map(ticket => (
          <Card key={ticket.id} _hover={{ shadow: 'md' }} cursor="pointer" transition="all 0.2s">
            <CardBody>
              <Flex align="center">
                <Checkbox
                  isChecked={selectedTickets.has(ticket.id)}
                  onChange={() => toggleTicketSelection(ticket.id)}
                  mr={4}
                  onClick={(e) => e.stopPropagation()}
                />
                <Box flex="1" onClick={() => navigate(`/tickets/${ticket.id}`)}>
                  <Flex justify="space-between" align="start" mb={2}>
                    <Box flex="1">
                      <HStack mb={2}>
                        <Text fontWeight="bold" fontSize="lg">
                          {ticket.subject}
                        </Text>
                        <Badge colorScheme={getPriorityColor(ticket.priority)}>
                          {ticket.priority}
                        </Badge>
                        <Badge colorScheme={getStatusColor(ticket.status)}>
                          {ticket.status}
                        </Badge>
                        {ticket.slaStatus !== 'active' && (
                          <Badge colorScheme={getSLAColor(ticket.slaStatus)}>
                            SLA {ticket.slaStatus.replace('_', ' ')}
                          </Badge>
                        )}
                      </HStack>
                      <Text color="gray.600" fontSize="sm" mb={2} noOfLines={1}>
                        {ticket.description}
                      </Text>
                      <HStack spacing={4} fontSize="sm" color="gray.500">
                        <Text>{ticket.id}</Text>
                        <Text>•</Text>
                        <Text>{ticket.customerName}</Text>
                        {ticket.assignedTo && (
                          <>
                            <Text>•</Text>
                            <Text>Assigned to: {agents.find(a => a.id === ticket.assignedTo)?.name || 'Unknown'}</Text>
                          </>
                        )}
                        <Text>•</Text>
                        <Text>{formatTimestamp(ticket.updatedAt)}</Text>
                      </HStack>
                    </Box>
                  </Flex>
                  <HStack spacing={2} flexWrap="wrap">
                    {ticket.tags.map(tag => (
                      <Badge key={tag} variant="subtle" colorScheme="gray" fontSize="xs">
                        {tag}
                      </Badge>
                    ))}
                  </HStack>
                </Box>
              </Flex>
            </CardBody>
          </Card>
        ))}

        {displayedTickets.length === 0 && (
          <Card>
            <CardBody>
              <Text textAlign="center" color="gray.500" py={8}>
                No tickets found matching your filters
              </Text>
            </CardBody>
          </Card>
        )}

        {hasMore && (
          <Button onClick={loadMore} variant="outline" size="lg">
            Load More ({filteredTickets.length - displayCount} remaining)
          </Button>
        )}
      </VStack>
    </Container>
  );
};

export default TicketInbox;
