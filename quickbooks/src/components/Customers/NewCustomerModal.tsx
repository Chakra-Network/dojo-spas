import { useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Text,
  Select,
  Textarea,
  Checkbox,
} from '@chakra-ui/react';
import { dojo } from '../../dojo/state';
import { Customer } from '../../dojo/state';

interface NewCustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NewCustomerModal({ isOpen, onClose }: NewCustomerModalProps) {
  const [customerName, setCustomerName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [middleInitial, setMiddleInitial] = useState('');
  const [lastName, setLastName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [mainPhone, setMainPhone] = useState('');
  const [workPhone, setWorkPhone] = useState('');
  const [mobile, setMobile] = useState('');
  const [fax, setFax] = useState('');
  const [mainEmail, setMainEmail] = useState('');
  const [ccEmail, setCcEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [other1, setOther1] = useState('');
  const [invoiceBillTo, setInvoiceBillTo] = useState('');
  const [shipTo, setShipTo] = useState('');
  const [openingBalance, setOpeningBalance] = useState<number>(0);
  const [asOfDate, setAsOfDate] = useState('');

  const handleCreateCustomer = () => {
    const newCustomer: Customer = {
      id: `cust-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: customerName || companyName || `${firstName} ${lastName}`,
      balance: openingBalance,
      phone: mainPhone,
      ownerName: `${firstName} ${middleInitial ? middleInitial + ' ' : ''}${lastName}`,
      email: mainEmail,
      address: invoiceBillTo,
      // Default values for other fields, or leave undefined if not provided
      altPhone: other1 || undefined, // using 'other1' for altPhone
      type: 'New Customer', // Default type
      fax: fax || undefined,
      terms: 'Net 30', // Default terms
    };

    const currentCustomers = dojo.getState().customers;
    dojo.setState('customers', [...currentCustomers, newCustomer], `Created new customer: ${newCustomer.name}`);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>New Customer</ModalHeader>
        <ModalBody>
          <Box mb={4}>
            <Flex mb={2}>
              <Text fontSize="sm" w="150px">CUSTOMER NAME</Text>
              <Input size="sm" flex="1" value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
            </Flex>
            <Flex>
              <Text fontSize="sm" w="150px">OPENING BALANCE</Text>
              <Input size="sm" w="100px" mr={2} type="number" value={openingBalance} onChange={(e) => setOpeningBalance(parseFloat(e.target.value) || 0)} />
              <Text fontSize="sm" mr={2}>AS OF</Text>
              <Input size="sm" w="120px" type="date" value={asOfDate} onChange={(e) => setAsOfDate(e.target.value)} />
              <Button size="sm" variant="link" ml={4}>How do I determine the opening balance?</Button>
            </Flex>
          </Box>

          <Box border="1px solid #ccc" p={4} mb={4}>
            <Text fontWeight="bold" mb={2}>Address Info</Text>
            <Flex mb={2}>
              <Text fontSize="sm" w="120px">COMPANY NAME</Text>
              <Input size="sm" flex="1" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
            </Flex>
            <Flex mb={2}>
              <Text fontSize="sm" w="120px">FULL NAME</Text>
              <Input size="sm" w="80px" mr={2} placeholder="Mr./Ms./..." />
              <Input size="sm" flex="1" mr={2} placeholder="First" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
              <Input size="sm" w="50px" mr={2} placeholder="M.I." value={middleInitial} onChange={(e) => setMiddleInitial(e.target.value)} />
              <Input size="sm" flex="1" placeholder="Last" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </Flex>
            <Flex mb={4}>
              <Text fontSize="sm" w="120px">JOB TITLE</Text>
              <Input size="sm" flex="1" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} />
            </Flex>

            <Flex gap={4} mb={4}>
              <Box flex="1">
                <Flex align="center" mb={2}>
                  <Select size="sm" w="100px" mr={2}>
                    <option>Main Phone</option>
                  </Select>
                  <Input size="sm" flex="1" value={mainPhone} onChange={(e) => setMainPhone(e.target.value)} />
                </Flex>
                <Flex align="center" mb={2}>
                  <Select size="sm" w="100px" mr={2}>
                    <option>Work Phone</option>
                  </Select>
                  <Input size="sm" flex="1" value={workPhone} onChange={(e) => setWorkPhone(e.target.value)} />
                </Flex>
                <Flex align="center" mb={2}>
                  <Select size="sm" w="100px" mr={2}>
                    <option>Mobile</option>
                  </Select>
                  <Input size="sm" flex="1" value={mobile} onChange={(e) => setMobile(e.target.value)} />
                </Flex>
                <Flex align="center">
                  <Select size="sm" w="100px" mr={2}>
                    <option>Fax</option>
                  </Select>
                  <Input size="sm" flex="1" value={fax} onChange={(e) => setFax(e.target.value)} />
                </Flex>
              </Box>
              <Box flex="1">
                <Flex align="center" mb={2}>
                  <Select size="sm" w="100px" mr={2}>
                    <option>Main Email</option>
                  </Select>
                  <Input size="sm" flex="1" value={mainEmail} onChange={(e) => setMainEmail(e.target.value)} />
                </Flex>
                <Flex align="center" mb={2}>
                  <Select size="sm" w="100px" mr={2}>
                    <option>CC Email</option>
                  </Select>
                  <Input size="sm" flex="1" value={ccEmail} onChange={(e) => setCcEmail(e.target.value)} />
                </Flex>
                <Flex align="center" mb={2}>
                  <Select size="sm" w="100px" mr={2}>
                    <option>Website</option>
                  </Select>
                  <Input size="sm" flex="1" value={website} onChange={(e) => setWebsite(e.target.value)} />
                </Flex>
                <Flex align="center">
                  <Select size="sm" w="100px" mr={2}>
                    <option>Other 1</option>
                  </Select>
                  <Input size="sm" flex="1" value={other1} onChange={(e) => setOther1(e.target.value)} />
                </Flex>
              </Box>
            </Flex>

            <Text fontWeight="bold" mb={2}>Address Details</Text>
            <Flex gap={4}>
              <Box flex="1">
                <Text fontSize="sm" mb={1}>INVOICE/BILL TO</Text>
                <Textarea h="100px" value={invoiceBillTo} onChange={(e) => setInvoiceBillTo(e.target.value)} />
                <Button size="sm" mt={2}>Copy &gt;&gt;</Button>
              </Box>
              <Box flex="1">
                <Text fontSize="sm" mb={1}>SHIP TO</Text>
                <Select size="sm" mb={2}>
                  <option>Default shipping address</option>
                </Select>
                <Textarea h="100px" value={shipTo} onChange={(e) => setShipTo(e.target.value)} />
                <Checkbox size="sm" mt={2}>Default shipping address</Checkbox>
              </Box>
            </Flex>
          </Box>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleCreateCustomer}>
            OK
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
