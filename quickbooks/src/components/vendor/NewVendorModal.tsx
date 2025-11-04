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
import { Vendor } from '../../dojo/state';

interface NewVendorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NewVendorModal({ isOpen, onClose }: NewVendorModalProps) {
  const [vendorName, setVendorName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [contactName, setContactName] = useState('');
  const [mainPhone, setMainPhone] = useState('');
  const [fax, setFax] = useState('');
  const [mainEmail, setMainEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [invoiceBillTo, setInvoiceBillTo] = useState('');
  const [shipTo, setShipTo] = useState('');
  const [openingBalance, setOpeningBalance] = useState<number>(0);
  const [asOfDate, setAsOfDate] = useState('');

  const handleCreateVendor = () => {
    const newVendor: Vendor = {
      id: `vend-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: vendorName || companyName || contactName,
      balance: openingBalance,
      phone: mainPhone,
      contactName: contactName,
      email: mainEmail,
      address: invoiceBillTo,
    };

    const currentVendors = dojo.getState().vendors;
    dojo.setState('vendors', [...currentVendors, newVendor], `Created new vendor: ${newVendor.name}`);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>New Vendor</ModalHeader>
        <ModalBody>
          <Box mb={4}>
            <Flex mb={2}>
              <Text fontSize="sm" w="150px">VENDOR NAME</Text>
              <Input size="sm" flex="1" value={vendorName} onChange={(e) => setVendorName(e.target.value)} />
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
              <Text fontSize="sm" w="120px">CONTACT NAME</Text>
              <Input size="sm" flex="1" value={contactName} onChange={(e) => setContactName(e.target.value)} />
            </Flex>
            <Flex mb={4}>
              <Text fontSize="sm" w="120px">MAIN PHONE</Text>
              <Input size="sm" flex="1" value={mainPhone} onChange={(e) => setMainPhone(e.target.value)} />
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
                    <option>Website</option>
                  </Select>
                  <Input size="sm" flex="1" value={website} onChange={(e) => setWebsite(e.target.value)} />
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
          <Button colorScheme="blue" mr={3} onClick={handleCreateVendor}>
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
