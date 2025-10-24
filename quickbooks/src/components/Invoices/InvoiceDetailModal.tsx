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
} from '@chakra-ui/react';
import { Invoice } from '../../dojo/state';

interface InvoiceDetailModalProps {
  invoice: Invoice;
  isOpen: boolean;
  onClose: () => void;
}

export function InvoiceDetailModal({
  invoice,
  isOpen,
  onClose,
}: InvoiceDetailModalProps) {
  const subtotal = invoice.lineItems.reduce(
    (sum, item) => sum + item.quantity * item.rate,
    0
  );

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
              <Text fontWeight="bold" mb={2}>
                Line Items
              </Text>
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
                  {invoice.lineItems.map((item, index) => (
                    <tr key={index}>
                      <td style={{ padding: '8px' }}>{item.description}</td>
                      <td style={{ padding: '8px', textAlign: 'right' }}>
                        {item.quantity}
                      </td>
                      <td style={{ padding: '8px', textAlign: 'right' }}>${item.rate}</td>
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
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
