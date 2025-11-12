import { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Flex,
  Text,
  Input,
  Select,
} from '@chakra-ui/react';
import { dojo } from '../../dojo/state';
import { Customer, Vendor, CustomerTransaction, VendorTransaction } from '../../dojo/state';

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  entityType: 'customer' | 'vendor';
  selectedEntity: Customer | Vendor | undefined;
}

export function AddTransactionModal({
  isOpen,
  onClose,
  entityType,
  selectedEntity,
}: AddTransactionModalProps) {
  const [type, setType] = useState('');
  const [num, setNum] = useState('');
  const [date, setDate] = useState('');
  const [account, setAccount] = useState('');
  const [amount, setAmount] = useState<number>(0);

  const handleAddTransaction = () => {
    if (!selectedEntity) return;

    const newTransaction: CustomerTransaction | VendorTransaction = {
      type,
      num,
      date,
      account,
      amount,
    };

    if (entityType === 'customer') {
      const customer = selectedEntity as Customer;
      const updatedCustomers = dojo.getState().customers.map((cust) =>
        cust.id === customer.id
          ? {
              ...cust,
              transactions: [...(cust.transactions || []), newTransaction as CustomerTransaction],
              balance: (cust.balance || 0) + (newTransaction.amount as number),
            }
          : cust
      );
      dojo.setState('customers', updatedCustomers, `Added transaction for customer: ${customer.name}`);
    } else if (entityType === 'vendor') {
      const vendor = selectedEntity as Vendor;
      const updatedVendors = dojo.getState().vendors.map((vend) =>
        vend.id === vendor.id
          ? {
              ...vend,
              transactions: [...(vend.transactions || []), newTransaction as VendorTransaction],
              balance: (vend.balance || 0) - (newTransaction.amount as number), // Assuming vendor transactions decrease balance
            }
          : vend
      );
      dojo.setState('vendors', updatedVendors, `Added transaction for vendor: ${vendor.name}`);
    }

    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add New Transaction for {selectedEntity?.name}</ModalHeader>
        <ModalBody>
          <Flex direction="column" gap={4}>
            <Flex align="center">
              <Text w="100px">Type:</Text>
              <Select value={type} onChange={(e) => setType(e.target.value)} placeholder="Select type">
                <option value="Payment">Payment</option>
                <option value="Invoice">Invoice</option>
                <option value="Bill">Bill</option>
                <option value="Credit">Credit</option>
              </Select>
            </Flex>
            <Flex align="center">
              <Text w="100px">Num:</Text>
              <Input value={num} onChange={(e) => setNum(e.target.value)} />
            </Flex>
            <Flex align="center">
              <Text w="100px">Date:</Text>
              <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </Flex>
            <Flex align="center">
              <Text w="100px">Account:</Text>
              <Input value={account} onChange={(e) => setAccount(e.target.value)} />
            </Flex>
            <Flex align="center">
              <Text w="100px">Amount:</Text>
              <Input type="number" value={amount} onChange={(e) => setAmount(parseFloat(e.target.value) || 0)} />
            </Flex>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={handleAddTransaction} mr={3}>
            Add Transaction
          </Button>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
