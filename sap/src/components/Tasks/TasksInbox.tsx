import { Box, Text, Table, Thead, Tbody, Tr, Th, Td, Badge, Button, Flex, useToast } from '@chakra-ui/react';
import { useDojoState, useDojo, ApprovalTask } from '../../dojo/state';

export function TasksInbox() {
  const approvalTasks = useDojoState('approvalTasks');
  const dojo = useDojo();
  const toast = useToast();

  const handleApprove = (task: ApprovalTask) => {
    const updated = approvalTasks.map(t => t.id === task.id ? { ...t, status: 'approved' as const } : t);
    dojo.setState('approvalTasks', updated, 'Approved task: ' + task.referenceNumber, 'admin');
    toast({ title: 'Task Approved', status: 'success', duration: 2000 });
  };

  const handleReject = (task: ApprovalTask) => {
    const updated = approvalTasks.map(t => t.id === task.id ? { ...t, status: 'rejected' as const } : t);
    dojo.setState('approvalTasks', updated, 'Rejected task: ' + task.referenceNumber, 'admin');
    toast({ title: 'Task Rejected', status: 'error', duration: 2000 });
  };

  const pending = approvalTasks.filter(t => t.status === 'pending');

  return (
    <Box p={6} bg="gray.50" minH="100%">
      <Text fontSize="2xl" fontWeight="bold" mb={4}>Tasks Inbox ({pending.length} pending)</Text>
      <Box bg="white" borderRadius="lg" boxShadow="sm" overflow="hidden">
        <Table variant="simple">
          <Thead bg="gray.50"><Tr><Th>Task</Th><Th>Reference</Th><Th>Amount</Th><Th>Priority</Th><Th>Status</Th><Th>Actions</Th></Tr></Thead>
          <Tbody>
            {approvalTasks.map(task => (
              <Tr key={task.id}>
                <Td><Text fontWeight="medium">{task.title}</Text><Text fontSize="xs" color="gray.500">{task.department}</Text></Td>
                <Td><Badge variant="outline">{task.referenceNumber}</Badge></Td>
                <Td>${task.amount.toLocaleString()}</Td>
                <Td><Badge colorScheme={task.priority === 'high' ? 'red' : task.priority === 'medium' ? 'orange' : 'gray'}>{task.priority}</Badge></Td>
                <Td><Badge colorScheme={task.status === 'approved' ? 'green' : task.status === 'rejected' ? 'red' : 'yellow'}>{task.status}</Badge></Td>
                <Td>
                  {task.status === 'pending' && (
                    <Flex gap={2}>
                      <Button size="sm" colorScheme="green" onClick={() => handleApprove(task)}>Approve</Button>
                      <Button size="sm" colorScheme="red" variant="outline" onClick={() => handleReject(task)}>Reject</Button>
                    </Flex>
                  )}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
}
