import { useState } from 'react';
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Select,
  HStack,
  Card,
  CardBody,
  Text,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { useDojoState, useDojo } from '../../dojo/state';
import { CheckCircle, XCircle, Clock, ChevronDown } from 'lucide-react';

export const TasksInbox = () => {
  const approvalTasks = useDojoState('approvalTasks');
  const dojo = useDojo();
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');

  const filteredTasks = approvalTasks.filter(task => {
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;
    return matchesStatus && matchesPriority;
  });

  const handleUpdateStatus = (taskId: string, newStatus: 'approved' | 'rejected' | 'in_review') => {
    const updatedTasks = approvalTasks.map(task => {
      if (task.id === taskId) {
        return { ...task, status: newStatus };
      }
      return task;
    });

    const task = approvalTasks.find(t => t.id === taskId);
    dojo.setState(
      'approvalTasks',
      updatedTasks,
      `Updated task "${task?.title}" to ${newStatus}`
    );
  };

  const getPriorityColor = (priority: string) => {
    const colors: Record<string, string> = {
      low: 'gray',
      medium: 'blue',
      high: 'orange',
      urgent: 'red',
    };
    return colors[priority] || 'gray';
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: 'yellow',
      approved: 'green',
      rejected: 'red',
      in_review: 'blue',
    };
    return colors[status] || 'gray';
  };

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      purchase_order: 'Purchase Order',
      expense_report: 'Expense Report',
      budget_request: 'Budget Request',
      vendor_approval: 'Vendor Approval',
    };
    return labels[type] || type;
  };

  const pendingCount = approvalTasks.filter(t => t.status === 'pending').length;
  const urgentCount = approvalTasks.filter(
    t => t.priority === 'urgent' && t.status === 'pending'
  ).length;

  return (
    <Box p={8} bg="gray.50" minH="100vh">
      <Heading size="xl" mb={2}>Tasks Inbox</Heading>
      <HStack spacing={4} mb={6}>
        <Text color="gray.600">
          {pendingCount} pending tasks
        </Text>
        {urgentCount > 0 && (
          <Badge colorScheme="red" fontSize="md">
            {urgentCount} urgent
          </Badge>
        )}
      </HStack>

      {/* Filters */}
      <Card mb={6}>
        <CardBody>
          <HStack spacing={4}>
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              w="200px"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="in_review">In Review</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </Select>

            <Select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              w="200px"
            >
              <option value="all">All Priorities</option>
              <option value="urgent">Urgent</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </Select>
          </HStack>
        </CardBody>
      </Card>

      {/* Tasks Table */}
      <Card>
        <CardBody>
          {filteredTasks.length === 0 ? (
            <Box textAlign="center" py={20}>
              <CheckCircle size={48} style={{ margin: '0 auto 16px', color: '#48BB78' }} />
              <Heading size="md" mb={2}>No tasks found</Heading>
              <Text color="gray.500">
                {statusFilter === 'pending'
                  ? "You're all caught up! No pending tasks."
                  : 'Try adjusting your filters.'}
              </Text>
            </Box>
          ) : (
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Task</Th>
                  <Th>Type</Th>
                  <Th>Priority</Th>
                  <Th isNumeric>Amount</Th>
                  <Th>Status</Th>
                  <Th>Requested By</Th>
                  <Th>Due Date</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {filteredTasks.map(task => (
                  <Tr key={task.id}>
                    <Td maxW="300px">
                      <Text fontWeight="medium" mb={1}>{task.title}</Text>
                      <Text fontSize="sm" color="gray.600" isTruncated>
                        {task.description}
                      </Text>
                    </Td>
                    <Td>
                      <Badge variant="outline">{getTypeLabel(task.taskType)}</Badge>
                    </Td>
                    <Td>
                      <Badge colorScheme={getPriorityColor(task.priority)}>
                        {task.priority.toUpperCase()}
                      </Badge>
                    </Td>
                    <Td isNumeric fontWeight="medium">
                      {task.amount
                        ? `${task.currency} ${task.amount.toLocaleString()}`
                        : '-'}
                    </Td>
                    <Td>
                      <Badge colorScheme={getStatusColor(task.status)}>
                        {task.status.replace('_', ' ').toUpperCase()}
                      </Badge>
                    </Td>
                    <Td>{task.requestedBy}</Td>
                    <Td>
                      <Text fontSize="sm">{new Date(task.dueDate).toLocaleDateString()}</Text>
                      {new Date(task.dueDate) < new Date() && task.status === 'pending' && (
                        <Text fontSize="xs" color="red.500">Overdue</Text>
                      )}
                    </Td>
                    <Td>
                      {task.status === 'pending' ? (
                        <HStack spacing={2}>
                          <IconButton
                            aria-label="Approve"
                            icon={<CheckCircle size={16} />}
                            colorScheme="green"
                            size="sm"
                            onClick={() => handleUpdateStatus(task.id, 'approved')}
                          />
                          <IconButton
                            aria-label="Reject"
                            icon={<XCircle size={16} />}
                            colorScheme="red"
                            size="sm"
                            onClick={() => handleUpdateStatus(task.id, 'rejected')}
                          />
                          <Menu>
                            <MenuButton
                              as={IconButton}
                              icon={<ChevronDown size={16} />}
                              size="sm"
                              variant="outline"
                            />
                            <MenuList>
                              <MenuItem onClick={() => handleUpdateStatus(task.id, 'in_review')}>
                                <Clock size={14} style={{ marginRight: 8 }} />
                                Mark In Review
                              </MenuItem>
                            </MenuList>
                          </Menu>
                        </HStack>
                      ) : (
                        <Text fontSize="sm" color="gray.500">-</Text>
                      )}
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          )}
        </CardBody>
      </Card>
    </Box>
  );
};
