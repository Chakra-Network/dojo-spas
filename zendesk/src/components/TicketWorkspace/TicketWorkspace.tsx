import { useState } from 'react';
import {
  Box,
  Container,
  Heading,
  HStack,
  VStack,
  Text,
  Badge,
  Button,
  Textarea,
  Select,
  Flex,
  Card,
  CardBody,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Avatar,
  Divider,
  useToast,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { ArrowLeft, Send, MoreVertical } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDojoState, useDojo, TicketStatus, TicketPriority } from '../../dojo/state';
import SLATracker from '../SLATracker/SLATracker';

const TicketWorkspace = () => {
  const { ticketId } = useParams<{ ticketId: string }>();
  const navigate = useNavigate();
  const toast = useToast();
  const dojo = useDojo();
  const tickets = useDojoState('tickets');
  const agents = useDojoState('agents');
  const macros = useDojoState('macros');
  const currentAgent = useDojoState('currentAgent');

  const ticket = tickets.find(t => t.id === ticketId);

  const [newComment, setNewComment] = useState('');
  const [isPublic, setIsPublic] = useState(true);

  if (!ticket) {
    return (
      <Container maxW="container.xl" py={8}>
        <Text>Ticket not found</Text>
        <Button onClick={() => navigate('/tickets')} mt={4}>
          Back to Inbox
        </Button>
      </Container>
    );
  }

  const handleAddComment = () => {
    if (!newComment.trim()) {
      toast({
        title: 'Error',
        description: 'Comment cannot be empty',
        status: 'error',
        duration: 3000,
      });
      return;
    }

    dojo.addComment(ticket.id, {
      author: currentAgent?.name || 'Agent',
      authorType: 'agent',
      body: newComment,
      isPublic,
    });

    toast({
      title: 'Comment added',
      description: `${isPublic ? 'Public' : 'Internal'} note added successfully`,
      status: 'success',
      duration: 3000,
    });

    setNewComment('');
  };

  const handleStatusChange = (status: TicketStatus) => {
    dojo.updateTicket(ticket.id, { status }, `Changed status to ${status}`);
    toast({
      title: 'Status updated',
      description: `Ticket status changed to ${status}`,
      status: 'success',
      duration: 3000,
    });
  };

  const handlePriorityChange = (priority: TicketPriority) => {
    dojo.updateTicket(ticket.id, { priority }, `Changed priority to ${priority}`);
    toast({
      title: 'Priority updated',
      description: `Ticket priority changed to ${priority}`,
      status: 'success',
      duration: 3000,
    });
  };

  const handleAssign = (agentId: string) => {
    const agent = agents.find(a => a.id === agentId);
    dojo.updateTicket(ticket.id, { assignedTo: agentId }, `Assigned to ${agent?.name}`);
    toast({
      title: 'Ticket assigned',
      description: `Ticket assigned to ${agent?.name}`,
      status: 'success',
      duration: 3000,
    });
  };

  const handleApplyMacro = (macroId: string) => {
    const macro = macros.find(m => m.id === macroId);
    if (macro) {
      dojo.applyMacro(ticket.id, macro);
      toast({
        title: 'Macro applied',
        description: `"${macro.name}" applied successfully`,
        status: 'success',
        duration: 3000,
      });
    }
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

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <Container maxW="container.xl" py={8}>
      <Button
        leftIcon={<ArrowLeft size={18} />}
        variant="ghost"
        onClick={() => navigate('/tickets')}
        mb={4}
      >
        Back to Inbox
      </Button>

      <Flex gap={6}>
        {/* Main Content */}
        <Box flex="1">
          <Card mb={6}>
            <CardBody>
              <Flex justify="space-between" align="start" mb={4}>
                <Box flex="1">
                  <HStack mb={2}>
                    <Heading size="lg">{ticket.subject}</Heading>
                  </HStack>
                  <HStack spacing={3}>
                    <Badge colorScheme={getPriorityColor(ticket.priority)}>
                      {ticket.priority}
                    </Badge>
                    <Badge colorScheme={getStatusColor(ticket.status)}>
                      {ticket.status}
                    </Badge>
                    <Text fontSize="sm" color="gray.600">
                      {ticket.id}
                    </Text>
                  </HStack>
                </Box>
                <Menu>
                  <MenuButton
                    as={IconButton}
                    icon={<MoreVertical size={18} />}
                    variant="ghost"
                    aria-label="More options"
                  />
                  <MenuList>
                    <MenuItem as="div" closeOnSelect={false}>
                      <Menu placement="right-start">
                        <MenuButton as={Box} w="full" cursor="pointer">
                          Apply Macro
                        </MenuButton>
                        <MenuList maxH="300px" overflowY="auto">
                          {macros.map(macro => (
                            <MenuItem key={macro.id} onClick={() => handleApplyMacro(macro.id)}>
                              <VStack align="start" spacing={0}>
                                <Text fontWeight="medium">{macro.name}</Text>
                                <Text fontSize="xs" color="gray.500">{macro.category}</Text>
                              </VStack>
                            </MenuItem>
                          ))}
                        </MenuList>
                      </Menu>
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Flex>

              <Tabs>
                <TabList>
                  <Tab>Conversation ({ticket.comments.length})</Tab>
                  <Tab>Internal Notes ({ticket.comments.filter(c => !c.isPublic).length})</Tab>
                  <Tab>Customer Profile</Tab>
                </TabList>

                <TabPanels>
                  {/* Conversation Tab */}
                  <TabPanel px={0}>
                    <VStack spacing={4} align="stretch" my={4}>
                      {ticket.comments
                        .filter(c => c.isPublic)
                        .map((comment) => (
                          <Flex key={comment.id} gap={3}>
                            <Avatar
                              size="sm"
                              name={comment.author}
                              bg={comment.authorType === 'agent' ? 'blue.500' : 'gray.500'}
                            />
                            <Box flex="1">
                              <HStack mb={1}>
                                <Text fontWeight="bold" fontSize="sm">
                                  {comment.author}
                                </Text>
                                <Badge
                                  colorScheme={comment.authorType === 'agent' ? 'blue' : 'gray'}
                                  fontSize="xs"
                                >
                                  {comment.authorType}
                                </Badge>
                                <Text fontSize="xs" color="gray.500">
                                  {formatTimestamp(comment.createdAt)}
                                </Text>
                              </HStack>
                              <Box
                                bg={comment.authorType === 'agent' ? 'blue.50' : 'gray.50'}
                                p={3}
                                borderRadius="md"
                              >
                                <Text whiteSpace="pre-wrap">{comment.body}</Text>
                              </Box>
                            </Box>
                          </Flex>
                        ))}
                    </VStack>

                    <Divider my={4} />

                    <VStack spacing={3} align="stretch">
                      <HStack>
                        <Select
                          value={isPublic ? 'public' : 'internal'}
                          onChange={(e) => setIsPublic(e.target.value === 'public')}
                          w="150px"
                        >
                          <option value="public">Public Reply</option>
                          <option value="internal">Internal Note</option>
                        </Select>
                      </HStack>
                      <Textarea
                        placeholder={isPublic ? "Write a public reply..." : "Add an internal note..."}
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        rows={4}
                      />
                      <HStack justify="flex-end">
                        <Button
                          colorScheme="blue"
                          leftIcon={<Send size={18} />}
                          onClick={handleAddComment}
                        >
                          {isPublic ? 'Send Reply' : 'Add Note'}
                        </Button>
                      </HStack>
                    </VStack>
                  </TabPanel>

                  {/* Internal Notes Tab */}
                  <TabPanel px={0}>
                    <VStack spacing={4} align="stretch" my={4}>
                      {ticket.comments
                        .filter(c => !c.isPublic)
                        .map((comment) => (
                          <Flex key={comment.id} gap={3}>
                            <Avatar size="sm" name={comment.author} bg="purple.500" />
                            <Box flex="1">
                              <HStack mb={1}>
                                <Text fontWeight="bold" fontSize="sm">
                                  {comment.author}
                                </Text>
                                <Text fontSize="xs" color="gray.500">
                                  {formatTimestamp(comment.createdAt)}
                                </Text>
                              </HStack>
                              <Box bg="purple.50" p={3} borderRadius="md">
                                <Text whiteSpace="pre-wrap">{comment.body}</Text>
                              </Box>
                            </Box>
                          </Flex>
                        ))}

                      {ticket.comments.filter(c => !c.isPublic).length === 0 && (
                        <Text color="gray.500" textAlign="center" py={8}>
                          No internal notes yet
                        </Text>
                      )}
                    </VStack>
                  </TabPanel>

                  {/* Customer Profile Tab */}
                  <TabPanel>
                    <VStack align="stretch" spacing={4} my={4}>
                      <Box>
                        <Text fontSize="sm" fontWeight="medium" color="gray.600" mb={1}>
                          Customer Name
                        </Text>
                        <Text fontSize="lg">{ticket.customerName}</Text>
                      </Box>
                      <Box>
                        <Text fontSize="sm" fontWeight="medium" color="gray.600" mb={1}>
                          Email
                        </Text>
                        <Text>{ticket.customerEmail}</Text>
                      </Box>
                      <Box>
                        <Text fontSize="sm" fontWeight="medium" color="gray.600" mb={1}>
                          Customer ID
                        </Text>
                        <Text fontFamily="mono">{ticket.customerId}</Text>
                      </Box>
                      <Divider />
                      <Box>
                        <Text fontSize="sm" fontWeight="medium" color="gray.600" mb={2}>
                          Ticket History
                        </Text>
                        <VStack align="start" spacing={2}>
                          <HStack fontSize="sm">
                            <Text color="gray.600">Created:</Text>
                            <Text>{formatTimestamp(ticket.createdAt)}</Text>
                          </HStack>
                          <HStack fontSize="sm">
                            <Text color="gray.600">Last Updated:</Text>
                            <Text>{formatTimestamp(ticket.updatedAt)}</Text>
                          </HStack>
                          {ticket.firstResponseAt && (
                            <HStack fontSize="sm">
                              <Text color="gray.600">First Response:</Text>
                              <Text>{formatTimestamp(ticket.firstResponseAt)}</Text>
                            </HStack>
                          )}
                          {ticket.resolvedAt && (
                            <HStack fontSize="sm">
                              <Text color="gray.600">Resolved:</Text>
                              <Text>{formatTimestamp(ticket.resolvedAt)}</Text>
                            </HStack>
                          )}
                        </VStack>
                      </Box>
                    </VStack>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </CardBody>
          </Card>
        </Box>

        {/* Sidebar */}
        <Box w="300px">
          <VStack spacing={4} align="stretch">
            {/* SLA Tracker */}
            <SLATracker ticket={ticket} />

            {/* Actions */}
            <Card>
              <CardBody>
                <Text fontWeight="bold" mb={3}>
                  Actions
                </Text>
                <VStack spacing={3} align="stretch">
                  <Box>
                    <Text fontSize="sm" fontWeight="medium" mb={2}>
                      Status
                    </Text>
                    <Select
                      value={ticket.status}
                      onChange={(e) => handleStatusChange(e.target.value as TicketStatus)}
                    >
                      <option value="new">New</option>
                      <option value="open">Open</option>
                      <option value="pending">Pending</option>
                      <option value="solved">Solved</option>
                      <option value="closed">Closed</option>
                    </Select>
                  </Box>
                  <Box>
                    <Text fontSize="sm" fontWeight="medium" mb={2}>
                      Priority
                    </Text>
                    <Select
                      value={ticket.priority}
                      onChange={(e) => handlePriorityChange(e.target.value as TicketPriority)}
                    >
                      <option value="low">Low</option>
                      <option value="normal">Normal</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </Select>
                  </Box>
                  <Box>
                    <Text fontSize="sm" fontWeight="medium" mb={2}>
                      Assign To
                    </Text>
                    <Select
                      value={ticket.assignedTo || ''}
                      onChange={(e) => handleAssign(e.target.value)}
                    >
                      <option value="">Unassigned</option>
                      {agents.map(agent => (
                        <option key={agent.id} value={agent.id}>
                          {agent.name}
                        </option>
                      ))}
                    </Select>
                  </Box>
                </VStack>
              </CardBody>
            </Card>

            {/* Tags */}
            <Card>
              <CardBody>
                <Text fontWeight="bold" mb={3}>
                  Tags
                </Text>
                <HStack spacing={2} flexWrap="wrap">
                  {ticket.tags.map(tag => (
                    <Badge key={tag} colorScheme="blue">
                      {tag}
                    </Badge>
                  ))}
                </HStack>
              </CardBody>
            </Card>
          </VStack>
        </Box>
      </Flex>
    </Container>
  );
};

export default TicketWorkspace;
