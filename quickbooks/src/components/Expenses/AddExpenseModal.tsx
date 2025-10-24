import { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Button,
  Input,
  Select,
  VStack,
  Box,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useDojoState, dojo, Expense } from '../../dojo/state';

interface AddExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddExpenseModal({ isOpen, onClose }: AddExpenseModalProps) {
  const expenses = useDojoState('expenses');
  const toast = useToast();

  const [formData, setFormData] = useState({
    category: 'Software',
    description: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
  });

  const categories = [
    'Software',
    'Office Supplies',
    'Marketing',
    'Utilities',
    'Professional Services',
    'Other',
  ];

  const handleSubmit = () => {
    if (!formData.description || !formData.amount) {
      toast({
        title: 'Missing fields',
        description: 'Please fill in all required fields',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-end',
      });
      return;
    }

    const newExpense: Expense = {
      id: `EXP-${Date.now()}`,
      category: formData.category,
      description: formData.description,
      amount: parseFloat(formData.amount),
      date: new Date(formData.date).toISOString(),
    };

    dojo.setState(
      'expenses',
      [...expenses, newExpense],
      `Added new expense: ${newExpense.description} - $${newExpense.amount}`
    );

    toast({
      title: 'Expense added',
      description: 'The expense has been recorded successfully',
      status: 'success',
      duration: 3000,
      isClosable: true,
      position: 'top-end',
    });

    setFormData({
      category: 'Software',
      description: '',
      amount: '',
      date: new Date().toISOString().split('T')[0],
    });

    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add New Expense</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4} align="stretch">
            <Box>
              <Text fontSize="sm" fontWeight="medium" mb={2}>
                Category *
              </Text>
              <Select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </Select>
            </Box>

            <Box>
              <Text fontSize="sm" fontWeight="medium" mb={2}>
                Description *
              </Text>
              <Input
                placeholder="Enter description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </Box>

            <Box>
              <Text fontSize="sm" fontWeight="medium" mb={2}>
                Amount *
              </Text>
              <Input
                type="number"
                placeholder="0.00"
                step="0.01"
                value={formData.amount}
                onChange={(e) =>
                  setFormData({ ...formData, amount: e.target.value })
                }
              />
            </Box>

            <Box>
              <Text fontSize="sm" fontWeight="medium" mb={2}>
                Date *
              </Text>
              <Input
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
              />
            </Box>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="blue" onClick={handleSubmit}>
            Add Expense
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
