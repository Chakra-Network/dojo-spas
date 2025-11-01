import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  VStack,
  HStack,
  Text,
  Box,
  Badge,
  Button,
  Input,
} from '@chakra-ui/react';
import { Invoice } from '../../dojo/state';
import { useState } from 'react';

interface InvoiceDetailModalProps {
  invoice: Invoice;
  isOpen: boolean;
  onClose: () => void;
  onMarkAsPaid: (invoice: Invoice) => void;
  onSendReminder: (invoice: Invoice) => void;
  onEditLineItems: (invoiceId: string, updatedLineItems: { description: string; quantity: number; rate: number }[]) => void;
}

export function InvoiceDetailModal({
  invoice,
  isOpen,
  onClose,
  onMarkAsPaid,
  onSendReminder,
  onEditLineItems,
}: InvoiceDetailModalProps) {
  const [isEditingLineItems, setIsEditingLineItems] = useState(false);
  const [editedLineItems, setEditedLineItems] = useState(invoice.lineItems);

  const subtotal = editedLineItems.reduce(
    (sum, item) => sum + item.quantity * item.rate,
    0
  );

  const handleSaveLineItems = () => {
    onEditLineItems(invoice.id, editedLineItems);
    setIsEditingLineItems(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Invoice Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <VStack align="stretch" spacing={4}>
            <HStack justify="space-between">
              <Box>
                <Text fontSize="sm" color="gray.600">
                  Invoice ID
                </Text>
                <Text fontWeight="bold">{invoice.id}</Text>
              </Box>
              <Badge
                colorScheme={invoice.status === 'paid' ? 'green' : 'orange'}
                fontSize="md"
              >
                {invoice.status.toUpperCase()}
              </Badge>
            </HStack>

            <HStack justify="space-between">
              <Box>
                <Text fontSize="sm" color="gray.600">
                  Client
                </Text>
                <Text fontWeight="medium">{invoice.clientName}</Text>
              </Box>
              <Box textAlign="right">
                <Text fontSize="sm" color="gray.600">
                  Due Date
                </Text>
                <Text fontWeight="medium">
                  {new Date(invoice.dueDate).toLocaleDateString()}
                </Text>
              </Box>
            </HStack>

            <Box h="1px" bg="gray.200" />

            <Box>
              <HStack justify="space-between" mb={2}>
                <Text fontWeight="bold">Line Items</Text>
                <Button size="sm" onClick={() => setIsEditingLineItems(!isEditingLineItems)}>
                  {isEditingLineItems ? "Cancel" : "Edit Line Items"}
                </Button>
              </HStack>
              <table style={{ width: '100%', fontSize: '0.875rem' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f7fafc' }}>
                    <th style={{ padding: '8px', textAlign: 'left' }}>Description</th>
                    <th style={{ padding: '8px', textAlign: 'right' }}>Qty</th>
                    <th style={{ padding: '8px', textAlign: 'right' }}>Rate</th>
                    <th style={{ padding: '8px', textAlign: 'right' }}>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {editedLineItems.map((item, index) => (
                    <tr key={index}>
                      <td style={{ padding: '8px' }}>
                        {isEditingLineItems ? (
                          <Input
                            value={item.description}
                            onChange={(e) => {
                              const newLineItems = [...editedLineItems];
                              newLineItems[index].description = e.target.value;
                              setEditedLineItems(newLineItems);
                            }}
                          />
                        ) : (
                          item.description
                        )}
                      </td>
                      <td style={{ padding: '8px', textAlign: 'right' }}>
                        {isEditingLineItems ? (
                          <Input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => {
                              const newLineItems = [...editedLineItems];
                              newLineItems[index].quantity = parseInt(e.target.value);
                              setEditedLineItems(newLineItems);
                            }}
                          />
                        ) : (
                          item.quantity
                        )}
                      </td>
                      <td style={{ padding: '8px', textAlign: 'right' }}>
                        {isEditingLineItems ? (
                          <Input
                            type="number"
                            value={item.rate}
                            onChange={(e) => {
                              const newLineItems = [...editedLineItems];
                              newLineItems[index].rate = parseFloat(e.target.value);
                              setEditedLineItems(newLineItems);
                            }}
                          />
                        ) : (
                          `$${item.rate}`
                        )}
                      </td>
                      <td
                        style={{
                          padding: '8px',
                          textAlign: 'right',
                          fontWeight: 'medium',
                        }}
                      >
                        ${(item.quantity * item.rate).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {isEditingLineItems && (
                <Button mt={4} colorScheme="teal" onClick={handleSaveLineItems}>
                  Save Line Items
                </Button>
              )}
            </Box>

            <Box h="1px" bg="gray.200" />

            <HStack justify="space-between">
              <Text fontSize="lg" fontWeight="bold">
                Total Amount
              </Text>
              <Text fontSize="xl" fontWeight="bold" color="blue.600">
                ${subtotal.toLocaleString()}
              </Text>
            </HStack>

            <HStack justify="flex-end" spacing={3} mt={6}>
              {invoice.status === 'unpaid' && (
                <Button colorScheme="green" onClick={() => onMarkAsPaid(invoice)}>
                  Mark as Paid
                </Button>
              )}
              <Button colorScheme="blue" onClick={() => onSendReminder(invoice)}>
                Send Reminder
              </Button>
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
            </HStack>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
