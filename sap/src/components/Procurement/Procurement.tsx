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
  Button,
  Input,
  Select,
  HStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  VStack,
  Text,
  Divider,
  Textarea,
  useDisclosure,
  Card,
  CardBody,
} from '@chakra-ui/react';
import { useDojoState, useDojo, PurchaseOrder } from '../../dojo/state';
import { FileText, Filter } from 'lucide-react';

export const Procurement = () => {
  const purchaseOrders = useDojoState('purchaseOrders');
  const dojo = useDojo();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedPO, setSelectedPO] = useState<PurchaseOrder | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [comment, setComment] = useState('');

  const filteredPOs = purchaseOrders.filter(po => {
    const matchesSearch =
      po.poNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      po.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      po.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || po.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleViewDetails = (po: PurchaseOrder) => {
    setSelectedPO(po);
    setComment('');
    onOpen();
  };

  const handleApprove = () => {
    if (!selectedPO) return;

    const updatedPOs = purchaseOrders.map(po => {
      if (po.id === selectedPO.id) {
        return {
          ...po,
          status: 'approved' as const,
          approvalHistory: [
            ...(po.approvalHistory || []),
            {
              approver: 'Current User',
              action: 'approved' as const,
              timestamp: new Date().toISOString(),
              comment: comment || undefined,
            },
          ],
        };
      }
      return po;
    });

    dojo.setState('purchaseOrders', updatedPOs, `Approved PO ${selectedPO.poNumber}`);
    onClose();
  };

  const handleReject = () => {
    if (!selectedPO) return;

    const updatedPOs = purchaseOrders.map(po => {
      if (po.id === selectedPO.id) {
        return {
          ...po,
          status: 'rejected' as const,
          approvalHistory: [
            ...(po.approvalHistory || []),
            {
              approver: 'Current User',
              action: 'rejected' as const,
              timestamp: new Date().toISOString(),
              comment: comment || 'Rejected',
            },
          ],
        };
      }
      return po;
    });

    dojo.setState('purchaseOrders', updatedPOs, `Rejected PO ${selectedPO.poNumber}`);
    onClose();
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      draft: 'gray',
      pending_approval: 'yellow',
      approved: 'green',
      rejected: 'red',
      ordered: 'blue',
      received: 'purple',
    };
    return colors[status] || 'gray';
  };

  return (
    <Box p={8} bg="gray.50" minH="100vh">
      <Heading size="xl" mb={6}>Procurement Workflow</Heading>

      {/* Filters */}
      <Card mb={6}>
        <CardBody>
          <HStack spacing={4}>
            <Input
              placeholder="Search by PO number, vendor, or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              flex={1}
            />
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              w="200px"
              icon={<Filter size={16} />}
            >
              <option value="all">All Statuses</option>
              <option value="draft">Draft</option>
              <option value="pending_approval">Pending Approval</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="ordered">Ordered</option>
              <option value="received">Received</option>
            </Select>
          </HStack>
        </CardBody>
      </Card>

      {/* Purchase Orders Table */}
      <Card>
        <CardBody>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>PO Number</Th>
                <Th>Vendor</Th>
                <Th>Description</Th>
                <Th isNumeric>Amount</Th>
                <Th>Status</Th>
                <Th>Requested By</Th>
                <Th>Department</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredPOs.map(po => (
                <Tr key={po.id}>
                  <Td fontWeight="medium">{po.poNumber}</Td>
                  <Td>{po.vendor}</Td>
                  <Td maxW="300px" isTruncated>{po.description}</Td>
                  <Td isNumeric fontWeight="bold">
                    {po.currency} {po.totalAmount.toLocaleString()}
                  </Td>
                  <Td>
                    <Badge colorScheme={getStatusColor(po.status)}>
                      {po.status.replace('_', ' ').toUpperCase()}
                    </Badge>
                  </Td>
                  <Td>{po.requestedBy}</Td>
                  <Td>{po.department}</Td>
                  <Td>
                    <Button
                      size="sm"
                      leftIcon={<FileText size={14} />}
                      onClick={() => handleViewDetails(po)}
                    >
                      View
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>

          {filteredPOs.length === 0 && (
            <Box textAlign="center" py={10}>
              <Text color="gray.500">No purchase orders found</Text>
            </Box>
          )}
        </CardBody>
      </Card>

      {/* Detail Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Purchase Order Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {selectedPO && (
              <VStack align="stretch" spacing={4}>
                <Box>
                  <Text fontWeight="bold" fontSize="lg">{selectedPO.poNumber}</Text>
                  <Badge colorScheme={getStatusColor(selectedPO.status)} mt={2}>
                    {selectedPO.status.replace('_', ' ').toUpperCase()}
                  </Badge>
                </Box>

                <Divider />

                <Box>
                  <Text fontSize="sm" color="gray.600">Vendor</Text>
                  <Text fontWeight="medium">{selectedPO.vendor}</Text>
                </Box>

                <Box>
                  <Text fontSize="sm" color="gray.600">Description</Text>
                  <Text>{selectedPO.description}</Text>
                </Box>

                <HStack>
                  <Box flex={1}>
                    <Text fontSize="sm" color="gray.600">Total Amount</Text>
                    <Text fontWeight="bold" fontSize="xl">
                      {selectedPO.currency} {selectedPO.totalAmount.toLocaleString()}
                    </Text>
                  </Box>
                  <Box flex={1}>
                    <Text fontSize="sm" color="gray.600">Department</Text>
                    <Text>{selectedPO.department}</Text>
                  </Box>
                </HStack>

                <Box>
                  <Text fontSize="sm" color="gray.600" mb={2}>Line Items</Text>
                  {selectedPO.lineItems.map((item, idx) => (
                    <Box key={idx} p={3} bg="gray.50" borderRadius="md" mb={2}>
                      <Text fontWeight="medium">{item.description}</Text>
                      <HStack mt={1} fontSize="sm" color="gray.600">
                        <Text>Qty: {item.quantity}</Text>
                        <Text>•</Text>
                        <Text>Unit: ${item.unitPrice}</Text>
                        <Text>•</Text>
                        <Text fontWeight="bold">Total: ${item.totalPrice.toLocaleString()}</Text>
                      </HStack>
                    </Box>
                  ))}
                </Box>

                {selectedPO.approvalHistory && selectedPO.approvalHistory.length > 0 && (
                  <Box>
                    <Text fontSize="sm" color="gray.600" mb={2}>Approval History</Text>
                    {selectedPO.approvalHistory.map((entry, idx) => (
                      <Box key={idx} p={3} bg="gray.50" borderRadius="md" mb={2}>
                        <HStack justify="space-between">
                          <Text fontWeight="medium">{entry.approver}</Text>
                          <Badge colorScheme={entry.action === 'approved' ? 'green' : 'red'}>
                            {entry.action}
                          </Badge>
                        </HStack>
                        <Text fontSize="sm" color="gray.600">
                          {new Date(entry.timestamp).toLocaleString()}
                        </Text>
                        {entry.comment && <Text fontSize="sm" mt={1}>{entry.comment}</Text>}
                      </Box>
                    ))}
                  </Box>
                )}

                {selectedPO.status === 'pending_approval' && (
                  <>
                    <Box>
                      <Text fontSize="sm" color="gray.600" mb={2}>Add Comment</Text>
                      <Textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Optional comment..."
                      />
                    </Box>

                    <HStack>
                      <Button colorScheme="green" flex={1} onClick={handleApprove}>
                        Approve
                      </Button>
                      <Button colorScheme="red" flex={1} onClick={handleReject}>
                        Reject
                      </Button>
                    </HStack>
                  </>
                )}
              </VStack>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};
