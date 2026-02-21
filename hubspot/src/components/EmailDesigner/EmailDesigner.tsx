import { useState } from 'react';
import {
  Box,
  Grid,
  Heading,
  VStack,
  HStack,
  Text,
  Button,
  Input,
  Textarea,
  Select,
  Badge,
  Divider,
  IconButton,
  Checkbox,
  CheckboxGroup,
  Stack,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
} from '@chakra-ui/react';
import { useDojoState, useDojo, Email, ContentBlock, EmailRevision } from '../../dojo/state';
import { Plus, Trash2, MoveUp, MoveDown, Eye, Save, Clock } from 'lucide-react';

export const EmailDesigner = () => {
  const emails = useDojoState('emails');
  const dojo = useDojo();
  const [selectedEmailId, setSelectedEmailId] = useState<string | null>(emails[0]?.id || null);
  const [editMode, setEditMode] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const selectedEmail = emails.find(e => e.id === selectedEmailId);

  const handleSave = () => {
    if (selectedEmail) {
      const revision: EmailRevision = {
        id: `rev-${Date.now()}`,
        timestamp: new Date().toISOString(),
        subject: selectedEmail.subject,
        contentBlocks: selectedEmail.contentBlocks,
        author: 'current.user@company.com',
      };

      const updated = emails.map(e =>
        e.id === selectedEmail.id
          ? {
              ...e,
              revisions: [...e.revisions, revision],
              updatedAt: new Date().toISOString(),
            }
          : e
      );
      dojo.setState('emails', updated, `Saved revision for email: ${selectedEmail.name}`);
      setEditMode(false);
    }
  };

  const handleUpdateEmail = (updates: Partial<Email>) => {
    if (selectedEmail) {
      const updated = emails.map(e =>
        e.id === selectedEmail.id ? { ...e, ...updates } : e
      );
      dojo.setState('emails', updated);
    }
  };

  const handleAddBlock = (type: ContentBlock['type']) => {
    if (selectedEmail) {
      const newBlock: ContentBlock = {
        id: `block-${Date.now()}`,
        type,
        content: type === 'divider' ? '' : 'New content...',
        order: selectedEmail.contentBlocks.length,
      };
      handleUpdateEmail({
        contentBlocks: [...selectedEmail.contentBlocks, newBlock],
      });
    }
  };

  const handleDeleteBlock = (blockId: string) => {
    if (selectedEmail) {
      handleUpdateEmail({
        contentBlocks: selectedEmail.contentBlocks.filter(b => b.id !== blockId),
      });
    }
  };

  const handleMoveBlock = (blockId: string, direction: 'up' | 'down') => {
    if (selectedEmail) {
      const blocks = [...selectedEmail.contentBlocks];
      const index = blocks.findIndex(b => b.id === blockId);
      if (
        (direction === 'up' && index > 0) ||
        (direction === 'down' && index < blocks.length - 1)
      ) {
        const newIndex = direction === 'up' ? index - 1 : index + 1;
        [blocks[index], blocks[newIndex]] = [blocks[newIndex], blocks[index]];
        blocks.forEach((b, i) => (b.order = i));
        handleUpdateEmail({ contentBlocks: blocks });
      }
    }
  };

  const handleUpdateBlock = (blockId: string, content: string) => {
    if (selectedEmail) {
      handleUpdateEmail({
        contentBlocks: selectedEmail.contentBlocks.map(b =>
          b.id === blockId ? { ...b, content } : b
        ),
      });
    }
  };

  return (
    <Box p={6} bg="gray.50" minH="100vh">
      <VStack align="stretch" spacing={6}>
        {/* Header */}
        <HStack justify="space-between">
          <Heading size="lg" color="gray.700">Email Designer</Heading>
          <HStack>
            <Select
              value={selectedEmailId || ''}
              onChange={(e) => {
                setSelectedEmailId(e.target.value);
                setEditMode(false);
              }}
              w="300px"
              bg="white"
            >
              {emails.map(email => (
                <option key={email.id} value={email.id}>
                  {email.name} - {email.status}
                </option>
              ))}
            </Select>
            <Button
              leftIcon={<Eye size={16} />}
              onClick={() => setPreviewMode(!previewMode)}
              variant={previewMode ? 'solid' : 'outline'}
            >
              Preview
            </Button>
            <Button
              leftIcon={<Clock size={16} />}
              onClick={onOpen}
              variant="outline"
            >
              Revisions ({selectedEmail?.revisions.length || 0})
            </Button>
          </HStack>
        </HStack>

        {selectedEmail && (
          <Grid templateColumns={previewMode ? 'repeat(2, 1fr)' : '1fr'} gap={6}>
            {/* Editor */}
            <Box bg="white" p={6} borderRadius="lg" shadow="sm">
              <VStack align="stretch" spacing={4}>
                {/* Email Metadata */}
                <Box>
                  <Text fontWeight="bold" mb={2}>Email Name</Text>
                  <Input
                    value={selectedEmail.name}
                    onChange={(e) => handleUpdateEmail({ name: e.target.value })}
                    isDisabled={!editMode && selectedEmail.status !== 'draft'}
                  />
                </Box>

                <Box>
                  <Text fontWeight="bold" mb={2}>Subject Line</Text>
                  <Input
                    value={selectedEmail.subject}
                    onChange={(e) => handleUpdateEmail({ subject: e.target.value })}
                    isDisabled={!editMode && selectedEmail.status !== 'draft'}
                  />
                </Box>

                <Divider />

                {/* Content Blocks */}
                <Box>
                  <HStack justify="space-between" mb={3}>
                    <Text fontWeight="bold">Content Blocks</Text>
                    {(editMode || selectedEmail.status === 'draft') && (
                      <HStack>
                        <Button size="sm" leftIcon={<Plus size={14} />} onClick={() => handleAddBlock('text')}>Text</Button>
                        <Button size="sm" leftIcon={<Plus size={14} />} onClick={() => handleAddBlock('image')}>Image</Button>
                        <Button size="sm" leftIcon={<Plus size={14} />} onClick={() => handleAddBlock('button')}>Button</Button>
                        <Button size="sm" leftIcon={<Plus size={14} />} onClick={() => handleAddBlock('divider')}>Divider</Button>
                      </HStack>
                    )}
                  </HStack>

                  <VStack spacing={3} align="stretch">
                    {selectedEmail.contentBlocks.map((block, index) => (
                      <ContentBlockEditor
                        key={block.id}
                        block={block}
                        isFirst={index === 0}
                        isLast={index === selectedEmail.contentBlocks.length - 1}
                        isEditable={editMode || selectedEmail.status === 'draft'}
                        onUpdate={(content) => handleUpdateBlock(block.id, content)}
                        onDelete={() => handleDeleteBlock(block.id)}
                        onMoveUp={() => handleMoveBlock(block.id, 'up')}
                        onMoveDown={() => handleMoveBlock(block.id, 'down')}
                      />
                    ))}
                  </VStack>
                </Box>

                <Divider />

                {/* Segmentation */}
                <Box>
                  <Text fontWeight="bold" mb={2}>Segmentation</Text>
                  <VStack align="stretch" spacing={2}>
                    <Text fontSize="sm" color="gray.600">Lists:</Text>
                    <CheckboxGroup
                      value={selectedEmail.segmentation.listIds}
                      onChange={(values) =>
                        handleUpdateEmail({
                          segmentation: {
                            ...selectedEmail.segmentation,
                            listIds: values as string[],
                          },
                        })
                      }
                    >
                      <Stack>
                        <Checkbox value="list-001" isDisabled={!editMode && selectedEmail.status !== 'draft'}>
                          Newsletter Subscribers
                        </Checkbox>
                        <Checkbox value="list-002" isDisabled={!editMode && selectedEmail.status !== 'draft'}>
                          Premium Customers
                        </Checkbox>
                        <Checkbox value="list-003" isDisabled={!editMode && selectedEmail.status !== 'draft'}>
                          Trial Users
                        </Checkbox>
                      </Stack>
                    </CheckboxGroup>
                  </VStack>
                </Box>

                {/* Actions */}
                <HStack justify="flex-end" pt={4}>
                  {!editMode && selectedEmail.status === 'sent' && (
                    <Button onClick={() => setEditMode(true)} colorScheme="orange">
                      Edit (Create New Revision)
                    </Button>
                  )}
                  {(editMode || selectedEmail.status === 'draft') && (
                    <>
                      {editMode && (
                        <Button onClick={() => setEditMode(false)} variant="ghost">
                          Cancel
                        </Button>
                      )}
                      <Button
                        leftIcon={<Save size={16} />}
                        colorScheme="blue"
                        onClick={handleSave}
                      >
                        Save Revision
                      </Button>
                    </>
                  )}
                </HStack>
              </VStack>
            </Box>

            {/* Preview */}
            {previewMode && (
              <Box bg="white" p={6} borderRadius="lg" shadow="sm">
                <Text fontWeight="bold" mb={4}>Preview</Text>
                <Box border="1px" borderColor="gray.200" borderRadius="md" p={4}>
                  <VStack align="stretch" spacing={3}>
                    <Text fontWeight="bold" fontSize="sm" color="gray.600">
                      Subject: {selectedEmail.subject}
                    </Text>
                    <Divider />
                    {selectedEmail.contentBlocks.map(block => (
                      <ContentBlockPreview key={block.id} block={block} />
                    ))}
                  </VStack>
                </Box>
              </Box>
            )}
          </Grid>
        )}

        {/* Revisions Modal */}
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Email Revisions</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {selectedEmail?.revisions.length === 0 ? (
                <Text color="gray.500">No revisions yet</Text>
              ) : (
                <VStack align="stretch" spacing={3}>
                  {selectedEmail?.revisions.map((rev, index) => (
                    <Box key={rev.id} p={3} border="1px" borderColor="gray.200" borderRadius="md">
                      <HStack justify="space-between" mb={2}>
                        <Badge>Revision {index + 1}</Badge>
                        <Text fontSize="xs" color="gray.500">
                          {new Date(rev.timestamp).toLocaleString()}
                        </Text>
                      </HStack>
                      <Text fontSize="sm" fontWeight="medium">{rev.subject}</Text>
                      <Text fontSize="xs" color="gray.600">by {rev.author}</Text>
                    </Box>
                  ))}
                </VStack>
              )}
            </ModalBody>
            <ModalFooter>
              <Button onClick={onClose}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </VStack>
    </Box>
  );
};

interface ContentBlockEditorProps {
  block: ContentBlock;
  isFirst: boolean;
  isLast: boolean;
  isEditable: boolean;
  onUpdate: (content: string) => void;
  onDelete: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
}

const ContentBlockEditor = ({
  block,
  isFirst,
  isLast,
  isEditable,
  onUpdate,
  onDelete,
  onMoveUp,
  onMoveDown,
}: ContentBlockEditorProps) => {
  return (
    <Box border="1px" borderColor="gray.200" borderRadius="md" p={3}>
      <HStack justify="space-between" mb={2}>
        <Badge colorScheme="blue">{block.type}</Badge>
        {isEditable && (
          <HStack spacing={1}>
            <IconButton
              aria-label="Move up"
              icon={<MoveUp size={14} />}
              size="xs"
              onClick={onMoveUp}
              isDisabled={isFirst}
            />
            <IconButton
              aria-label="Move down"
              icon={<MoveDown size={14} />}
              size="xs"
              onClick={onMoveDown}
              isDisabled={isLast}
            />
            <IconButton
              aria-label="Delete"
              icon={<Trash2 size={14} />}
              size="xs"
              colorScheme="red"
              onClick={onDelete}
            />
          </HStack>
        )}
      </HStack>
      {block.type === 'divider' ? (
        <Divider />
      ) : (
        <Textarea
          value={block.content}
          onChange={(e) => onUpdate(e.target.value)}
          size="sm"
          rows={3}
          isDisabled={!isEditable}
        />
      )}
    </Box>
  );
};

const ContentBlockPreview = ({ block }: { block: ContentBlock }) => {
  switch (block.type) {
    case 'text':
      return <Box dangerouslySetInnerHTML={{ __html: block.content }} />;
    case 'image':
      return <Box bg="gray.100" p={4} borderRadius="md" textAlign="center">[Image: {block.content}]</Box>;
    case 'button':
      const [label] = block.content.split('|');
      return <Button colorScheme="blue">{label || 'Button'}</Button>;
    case 'divider':
      return <Divider />;
    default:
      return null;
  }
};
