import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Button,
  VStack,
  Text,
  Box,
  HStack,
  Tag,
} from '@chakra-ui/react';
import { Expense } from '../../dojo/state';

interface ExpenseDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  expense: Expense;
}

export function ExpenseDetailModal({ isOpen, onClose, expense }: ExpenseDetailModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Expense Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4} align="stretch">
            <HStack justifyContent="space-between">
              <Text fontWeight="bold">Description:</Text>
              <Text>{expense.description}</Text>
            </HStack>
            <HStack justifyContent="space-between">
              <Text fontWeight="bold">Category:</Text>
              <Tag colorScheme="purple" size="sm">{expense.category}</Tag>
            </HStack>
            <HStack justifyContent="space-between">
              <Text fontWeight="bold">Amount:</Text>
              <Text fontSize="lg" fontWeight="bold" color={expense.amount > 0 ? 'red.500' : 'red.500'}>
                -${expense.amount.toFixed(2)}
              </Text>
            </HStack>
            <HStack justifyContent="space-between">
              <Text fontWeight="bold">Date:</Text>
              <Text>{new Date(expense.date).toLocaleDateString()}</Text>
            </HStack>
            <HStack justifyContent="space-between">
              <Text fontWeight="bold">Status:</Text>
              <Tag colorScheme={expense.status === 'paid' ? 'green' : 'orange'} size="sm">
                {expense.status === 'paid' ? 'Paid' : 'Unpaid'}
              </Tag>
            </HStack>
            {expense.receiptUrl && (
              <Box>
                <Text fontWeight="bold" mb={1}>Receipt:</Text>
                <a href={expense.receiptUrl} target="_blank" rel="noopener noreferrer">
                  <Button size="sm" variant="link" colorScheme="blue">
                    View Receipt
                  </Button>
                </a>
              </Box>
            )}
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}


