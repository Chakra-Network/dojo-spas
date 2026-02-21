import { useState } from 'react';
import {
  Box,
  Grid,
  Heading,
  VStack,
  HStack,
  Text,
  Badge,
  Button,
  Select,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Switch,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
} from '@chakra-ui/react';
import { useDojoState, useDojo, Campaign } from '../../dojo/state';
import { MoreVertical, Play, Pause, Calendar, DollarSign } from 'lucide-react';

export const CampaignManager = () => {
  const campaigns = useDojoState('campaigns');
  const dojo = useDojo();
  const [viewMode, setViewMode] = useState<'kanban' | 'table'>('kanban');
  const [selectedStage, setSelectedStage] = useState<string>('all');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editingCampaign, setEditingCampaign] = useState<Campaign | null>(null);

  const filteredCampaigns = selectedStage === 'all'
    ? campaigns
    : campaigns.filter(c => c.stage === selectedStage);

  const handleStatusToggle = (campaign: Campaign) => {
    const newStatus: Campaign['status'] = campaign.status === 'active' ? 'paused' : 'active';
    const updated = campaigns.map(c =>
      c.id === campaign.id ? { ...c, status: newStatus } : c
    );
    dojo.setState('campaigns', updated, `${newStatus === 'active' ? 'Activated' : 'Paused'} campaign: ${campaign.name}`);
  };

  const handleEdit = (campaign: Campaign) => {
    setEditingCampaign(campaign);
    onOpen();
  };

  const handleSave = () => {
    if (editingCampaign) {
      const updated = campaigns.map(c =>
        c.id === editingCampaign.id ? editingCampaign : c
      );
      dojo.setState('campaigns', updated, `Updated campaign: ${editingCampaign.name}`);
      onClose();
      setEditingCampaign(null);
    }
  };

  return (
    <Box p={6} bg="gray.50" minH="100vh">
      <VStack align="stretch" spacing={6}>
        {/* Header */}
        <HStack justify="space-between">
          <Heading size="lg" color="gray.700">Campaign Manager</Heading>
          <HStack>
            <Select
              value={selectedStage}
              onChange={(e) => setSelectedStage(e.target.value)}
              w="200px"
              bg="white"
            >
              <option value="all">All Stages</option>
              <option value="planning">Planning</option>
              <option value="ready">Ready</option>
              <option value="live">Live</option>
              <option value="analysis">Analysis</option>
            </Select>
            <Button
              colorScheme={viewMode === 'kanban' ? 'blue' : 'gray'}
              onClick={() => setViewMode('kanban')}
            >
              Kanban
            </Button>
            <Button
              colorScheme={viewMode === 'table' ? 'blue' : 'gray'}
              onClick={() => setViewMode('table')}
            >
              Table
            </Button>
          </HStack>
        </HStack>

        {/* View */}
        {viewMode === 'kanban' ? (
          <KanbanView
            campaigns={filteredCampaigns}
            onStatusToggle={handleStatusToggle}
            onEdit={handleEdit}
          />
        ) : (
          <TableView
            campaigns={filteredCampaigns}
            onStatusToggle={handleStatusToggle}
            onEdit={handleEdit}
          />
        )}

        {/* Edit Modal */}
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edit Campaign</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {editingCampaign && (
                <VStack spacing={4}>
                  <FormControl>
                    <FormLabel>Campaign Name</FormLabel>
                    <Input
                      value={editingCampaign.name}
                      onChange={(e) => setEditingCampaign({ ...editingCampaign, name: e.target.value })}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Budget</FormLabel>
                    <Input
                      type="number"
                      value={editingCampaign.budget || 0}
                      onChange={(e) => setEditingCampaign({ ...editingCampaign, budget: parseInt(e.target.value) })}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Stage</FormLabel>
                    <Select
                      value={editingCampaign.stage}
                      onChange={(e) => setEditingCampaign({ ...editingCampaign, stage: e.target.value as Campaign['stage'] })}
                    >
                      <option value="planning">Planning</option>
                      <option value="ready">Ready</option>
                      <option value="live">Live</option>
                      <option value="analysis">Analysis</option>
                    </Select>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Scheduled Date</FormLabel>
                    <Input
                      type="date"
                      value={editingCampaign.scheduledDate || ''}
                      onChange={(e) => setEditingCampaign({ ...editingCampaign, scheduledDate: e.target.value })}
                    />
                  </FormControl>
                </VStack>
              )}
            </ModalBody>
            <ModalFooter>
              <Button variant="ghost" mr={3} onClick={onClose}>Cancel</Button>
              <Button colorScheme="blue" onClick={handleSave}>Save</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </VStack>
    </Box>
  );
};

interface CampaignViewProps {
  campaigns: Campaign[];
  onStatusToggle: (campaign: Campaign) => void;
  onEdit: (campaign: Campaign) => void;
}

const KanbanView = ({ campaigns, onStatusToggle, onEdit }: CampaignViewProps) => {
  const stages: Array<{ key: Campaign['stage']; label: string }> = [
    { key: 'planning', label: 'Planning' },
    { key: 'ready', label: 'Ready' },
    { key: 'live', label: 'Live' },
    { key: 'analysis', label: 'Analysis' },
  ];

  return (
    <Grid templateColumns="repeat(4, 1fr)" gap={4}>
      {stages.map(stage => (
        <Box key={stage.key} bg="gray.100" p={4} borderRadius="lg">
          <Heading size="sm" mb={4} color="gray.700">{stage.label}</Heading>
          <VStack spacing={3} align="stretch">
            {campaigns
              .filter(c => c.stage === stage.key)
              .map(campaign => (
                <CampaignCard
                  key={campaign.id}
                  campaign={campaign}
                  onStatusToggle={onStatusToggle}
                  onEdit={onEdit}
                />
              ))}
          </VStack>
        </Box>
      ))}
    </Grid>
  );
};

const TableView = ({ campaigns, onStatusToggle, onEdit }: CampaignViewProps) => {
  return (
    <Box bg="white" borderRadius="lg" shadow="sm" overflow="hidden">
      <Table variant="simple">
        <Thead bg="gray.50">
          <Tr>
            <Th>Name</Th>
            <Th>Type</Th>
            <Th>Status</Th>
            <Th>Stage</Th>
            <Th>Budget</Th>
            <Th>Leads</Th>
            <Th>Conversions</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {campaigns.map(campaign => (
            <Tr key={campaign.id}>
              <Td fontWeight="medium">{campaign.name}</Td>
              <Td>
                <Badge colorScheme="purple">{campaign.type}</Badge>
              </Td>
              <Td>
                <Badge colorScheme={getStatusColor(campaign.status)}>{campaign.status}</Badge>
              </Td>
              <Td>{campaign.stage}</Td>
              <Td>${campaign.budget?.toLocaleString() || 0}</Td>
              <Td>{campaign.leads || 0}</Td>
              <Td>{campaign.conversions || 0}</Td>
              <Td>
                <HStack spacing={2}>
                  <IconButton
                    aria-label="Toggle status"
                    icon={campaign.status === 'active' ? <Pause size={16} /> : <Play size={16} />}
                    size="sm"
                    onClick={() => onStatusToggle(campaign)}
                    isDisabled={campaign.status === 'draft' || campaign.status === 'completed'}
                  />
                  <Menu>
                    <MenuButton
                      as={IconButton}
                      aria-label="Options"
                      icon={<MoreVertical size={16} />}
                      size="sm"
                      variant="ghost"
                    />
                    <MenuList>
                      <MenuItem onClick={() => onEdit(campaign)}>Edit</MenuItem>
                      <MenuItem>View Details</MenuItem>
                    </MenuList>
                  </Menu>
                </HStack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

const CampaignCard = ({ campaign, onStatusToggle, onEdit }: { campaign: Campaign; onStatusToggle: (c: Campaign) => void; onEdit: (c: Campaign) => void }) => {
  return (
    <Box bg="white" p={4} borderRadius="md" shadow="sm" borderLeft="4px" borderColor={getStatusColor(campaign.status) + '.400'}>
      <VStack align="stretch" spacing={2}>
        <HStack justify="space-between">
          <Text fontWeight="bold" fontSize="sm" noOfLines={1}>{campaign.name}</Text>
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<MoreVertical size={14} />}
              size="xs"
              variant="ghost"
            />
            <MenuList>
              <MenuItem onClick={() => onEdit(campaign)}>Edit</MenuItem>
              <MenuItem>View Details</MenuItem>
            </MenuList>
          </Menu>
        </HStack>

        <HStack>
          <Badge colorScheme={getStatusColor(campaign.status)} fontSize="xs">{campaign.status}</Badge>
          <Badge colorScheme="purple" fontSize="xs">{campaign.type}</Badge>
        </HStack>

        {campaign.scheduledDate && (
          <HStack fontSize="xs" color="gray.600">
            <Calendar size={12} />
            <Text>{campaign.scheduledDate}</Text>
          </HStack>
        )}

        {campaign.budget && (
          <HStack fontSize="xs" color="gray.600">
            <DollarSign size={12} />
            <Text>${campaign.budget.toLocaleString()}</Text>
          </HStack>
        )}

        {campaign.leads !== undefined && (
          <HStack justify="space-between" fontSize="xs">
            <Text color="gray.600">Leads:</Text>
            <Text fontWeight="medium">{campaign.leads}</Text>
          </HStack>
        )}

        <HStack justify="space-between" align="center" pt={2}>
          <Text fontSize="xs" color="gray.500">Active</Text>
          <Switch
            size="sm"
            isChecked={campaign.status === 'active'}
            onChange={() => onStatusToggle(campaign)}
            isDisabled={campaign.status === 'draft' || campaign.status === 'completed'}
          />
        </HStack>
      </VStack>
    </Box>
  );
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active': return 'green';
    case 'scheduled': return 'blue';
    case 'paused': return 'orange';
    case 'completed': return 'gray';
    default: return 'gray';
  }
};
