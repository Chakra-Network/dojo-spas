import { useState } from 'react';
import {
  Box,
  Heading,
  VStack,
  HStack,
  Text,
  Input,
  Button,
  Badge,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Select,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Textarea,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';
import { useDojoState, useDojo, Contact, ContactNote } from '../../dojo/state';
import { Search, User, Mail, Phone, Building, Calendar } from 'lucide-react';

export const ContactsCRM = () => {
  const contacts = useDojoState('contacts');
  const dojo = useDojo();
  const [searchQuery, setSearchQuery] = useState('');
  const [stageFilter, setStageFilter] = useState<string>('all');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch =
      searchQuery === '' ||
      contact.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.company?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStage =
      stageFilter === 'all' || contact.lifecycleStage === stageFilter;

    return matchesSearch && matchesStage;
  });

  const handleContactClick = (contact: Contact) => {
    setSelectedContact(contact);
    onOpen();
  };

  const handleUpdateContact = (updates: Partial<Contact>) => {
    if (selectedContact) {
      const updated = contacts.map(c =>
        c.id === selectedContact.id ? { ...c, ...updates } : c
      );
      dojo.setState('contacts', updated, `Updated contact: ${selectedContact.email}`);
      setSelectedContact({ ...selectedContact, ...updates });
    }
  };

  const handleAddNote = (noteText: string) => {
    if (selectedContact && noteText.trim()) {
      const newNote: ContactNote = {
        id: `note-${Date.now()}`,
        text: noteText,
        author: 'current.user@company.com',
        timestamp: new Date().toISOString(),
      };
      handleUpdateContact({
        notes: [...selectedContact.notes, newNote],
      });
    }
  };

  return (
    <Box p={6} bg="gray.50" minH="100vh">
      <VStack align="stretch" spacing={6}>
        {/* Header */}
        <HStack justify="space-between">
          <Heading size="lg" color="gray.700">Contacts CRM</Heading>
          <HStack>
            <HStack bg="white" px={3} py={2} borderRadius="md" shadow="sm">
              <Search size={16} color="gray" />
              <Input
                placeholder="Search contacts..."
                border="none"
                _focus={{ outline: 'none' }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </HStack>
            <Select
              value={stageFilter}
              onChange={(e) => setStageFilter(e.target.value)}
              w="250px"
              bg="white"
            >
              <option value="all">All Stages</option>
              <option value="subscriber">Subscriber</option>
              <option value="lead">Lead</option>
              <option value="marketing_qualified_lead">MQL</option>
              <option value="sales_qualified_lead">SQL</option>
              <option value="opportunity">Opportunity</option>
              <option value="customer">Customer</option>
              <option value="evangelist">Evangelist</option>
            </Select>
          </HStack>
        </HStack>

        {/* Contacts Table */}
        <Box bg="white" borderRadius="lg" shadow="sm" overflow="hidden">
          <Table variant="simple">
            <Thead bg="gray.50">
              <Tr>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Company</Th>
                <Th>Lifecycle Stage</Th>
                <Th>Owner</Th>
                <Th>Last Activity</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredContacts.map(contact => (
                <Tr
                  key={contact.id}
                  onClick={() => handleContactClick(contact)}
                  cursor="pointer"
                  _hover={{ bg: 'gray.50' }}
                >
                  <Td fontWeight="medium">
                    {contact.firstName} {contact.lastName}
                  </Td>
                  <Td>{contact.email}</Td>
                  <Td>{contact.company || '-'}</Td>
                  <Td>
                    <Badge colorScheme={getLifecycleColor(contact.lifecycleStage)}>
                      {formatLifecycleStage(contact.lifecycleStage)}
                    </Badge>
                  </Td>
                  <Td fontSize="sm" color="gray.600">{contact.owner || 'Unassigned'}</Td>
                  <Td fontSize="sm" color="gray.600">
                    {contact.lastActivityDate
                      ? new Date(contact.lastActivityDate).toLocaleDateString()
                      : '-'}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>

        {/* Contact Detail Drawer */}
        <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="lg">
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth="1px">
              Contact Details
            </DrawerHeader>

            <DrawerBody>
              {selectedContact && (
                <ContactDetail
                  contact={selectedContact}
                  onUpdate={handleUpdateContact}
                  onAddNote={handleAddNote}
                />
              )}
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </VStack>
    </Box>
  );
};

interface ContactDetailProps {
  contact: Contact;
  onUpdate: (updates: Partial<Contact>) => void;
  onAddNote: (note: string) => void;
}

const ContactDetail = ({ contact, onUpdate, onAddNote }: ContactDetailProps) => {
  const [newNote, setNewNote] = useState('');

  const handleSubmitNote = () => {
    onAddNote(newNote);
    setNewNote('');
  };

  return (
    <Tabs>
      <TabList>
        <Tab>Overview</Tab>
        <Tab>Activity ({contact.activityTimeline.length})</Tab>
        <Tab>Notes ({contact.notes.length})</Tab>
      </TabList>

      <TabPanels>
        {/* Overview Tab */}
        <TabPanel>
          <VStack align="stretch" spacing={4}>
            {/* Header */}
            <Box>
              <Heading size="md">
                {contact.firstName} {contact.lastName}
              </Heading>
              <Text color="gray.600">{contact.email}</Text>
            </Box>

            {/* Lifecycle Stage */}
            <FormControl>
              <FormLabel>Lifecycle Stage</FormLabel>
              <Select
                value={contact.lifecycleStage}
                onChange={(e) =>
                  onUpdate({ lifecycleStage: e.target.value as Contact['lifecycleStage'] })
                }
              >
                <option value="subscriber">Subscriber</option>
                <option value="lead">Lead</option>
                <option value="marketing_qualified_lead">Marketing Qualified Lead</option>
                <option value="sales_qualified_lead">Sales Qualified Lead</option>
                <option value="opportunity">Opportunity</option>
                <option value="customer">Customer</option>
                <option value="evangelist">Evangelist</option>
              </Select>
            </FormControl>

            {/* Owner */}
            <FormControl>
              <FormLabel>Owner</FormLabel>
              <Select
                value={contact.owner || ''}
                onChange={(e) => onUpdate({ owner: e.target.value })}
              >
                <option value="">Unassigned</option>
                <option value="sarah@company.com">Sarah (sarah@company.com)</option>
                <option value="mike@company.com">Mike (mike@company.com)</option>
                <option value="emma@company.com">Emma (emma@company.com)</option>
              </Select>
            </FormControl>

            {/* Contact Info */}
            <Box>
              <Heading size="sm" mb={3}>Contact Information</Heading>
              <VStack align="stretch" spacing={2}>
                <InfoRow icon={<Mail size={16} />} label="Email" value={contact.email} />
                <InfoRow icon={<Phone size={16} />} label="Phone" value={contact.phone || '-'} />
                <InfoRow icon={<Building size={16} />} label="Company" value={contact.company || '-'} />
                <InfoRow icon={<User size={16} />} label="Lead Source" value={contact.leadSource || '-'} />
                <InfoRow
                  icon={<Calendar size={16} />}
                  label="Created"
                  value={new Date(contact.createdAt).toLocaleDateString()}
                />
              </VStack>
            </Box>

            {/* Custom Fields */}
            {contact.customFields && Object.keys(contact.customFields).length > 0 && (
              <Box>
                <Heading size="sm" mb={3}>Custom Fields</Heading>
                <VStack align="stretch" spacing={2}>
                  {Object.entries(contact.customFields).map(([key, value]) => (
                    <InfoRow key={key} label={key} value={value} />
                  ))}
                </VStack>
              </Box>
            )}
          </VStack>
        </TabPanel>

        {/* Activity Tab */}
        <TabPanel>
          <VStack align="stretch" spacing={3}>
            {contact.activityTimeline.length === 0 ? (
              <Text color="gray.500">No activity yet</Text>
            ) : (
              contact.activityTimeline
                .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
                .map(activity => (
                  <Box
                    key={activity.id}
                    p={3}
                    border="1px"
                    borderColor="gray.200"
                    borderRadius="md"
                    bg="gray.50"
                  >
                    <HStack justify="space-between" mb={1}>
                      <Badge colorScheme={getActivityColor(activity.type)}>
                        {formatActivityType(activity.type)}
                      </Badge>
                      <Text fontSize="xs" color="gray.500">
                        {new Date(activity.timestamp).toLocaleString()}
                      </Text>
                    </HStack>
                    <Text fontSize="sm">{activity.description}</Text>
                  </Box>
                ))
            )}
          </VStack>
        </TabPanel>

        {/* Notes Tab */}
        <TabPanel>
          <VStack align="stretch" spacing={4}>
            {/* Add Note */}
            <Box>
              <Textarea
                placeholder="Add a note..."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                mb={2}
              />
              <Button
                colorScheme="blue"
                onClick={handleSubmitNote}
                isDisabled={!newNote.trim()}
              >
                Add Note
              </Button>
            </Box>

            {/* Notes List */}
            <VStack align="stretch" spacing={3}>
              {contact.notes.length === 0 ? (
                <Text color="gray.500">No notes yet</Text>
              ) : (
                contact.notes
                  .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
                  .map(note => (
                    <Box key={note.id} p={3} border="1px" borderColor="gray.200" borderRadius="md">
                      <Text fontSize="sm" mb={2}>{note.text}</Text>
                      <HStack justify="space-between" fontSize="xs" color="gray.500">
                        <Text>{note.author}</Text>
                        <Text>{new Date(note.timestamp).toLocaleString()}</Text>
                      </HStack>
                    </Box>
                  ))
              )}
            </VStack>
          </VStack>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

const InfoRow = ({ icon, label, value }: { icon?: React.ReactNode; label: string; value: string }) => (
  <HStack spacing={3} fontSize="sm">
    {icon && <Box color="gray.500">{icon}</Box>}
    <Text fontWeight="medium" color="gray.600" minW="100px">{label}:</Text>
    <Text>{value}</Text>
  </HStack>
);

const getLifecycleColor = (stage: string) => {
  switch (stage) {
    case 'subscriber': return 'gray';
    case 'lead': return 'blue';
    case 'marketing_qualified_lead': return 'purple';
    case 'sales_qualified_lead': return 'orange';
    case 'opportunity': return 'yellow';
    case 'customer': return 'green';
    case 'evangelist': return 'pink';
    default: return 'gray';
  }
};

const formatLifecycleStage = (stage: string) => {
  return stage.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

const getActivityColor = (type: string) => {
  switch (type) {
    case 'email_open': return 'blue';
    case 'email_click': return 'green';
    case 'form_submit': return 'purple';
    case 'page_view': return 'gray';
    case 'meeting': return 'orange';
    case 'call': return 'red';
    default: return 'gray';
  }
};

const formatActivityType = (type: string) => {
  return type.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};
