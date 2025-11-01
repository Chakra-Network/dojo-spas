import {
  Box,
  Flex,
  HStack,
  VStack,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  Text,
  IconButton,
  Badge,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useToast,
  Avatar,
} from '@chakra-ui/react'
import { useState } from 'react'
import { useApp } from '../../contexts/AppContext'
import { FiX, FiPaperclip, FiLink, FiEdit, FiSmile, FiChevronDown, FiBell, FiPhone, FiHelpCircle, FiSettings } from 'react-icons/fi'

interface CreateTicketModalProps {
  isOpen: boolean
  onClose: () => void
}

export function CreateTicketModal({ isOpen, onClose }: CreateTicketModalProps) {
  const { state, createTicket } = useApp()
  const toast = useToast()
  const currentAgent = state.currentAgent
  
  const [formData, setFormData] = useState({
    subject: '',
    description: '',
    customerId: state.customers[0]?.id || '',
    priority: '-',
    type: '-',
    assignee: '-',
    followers: '',
    tags: '',
    summary: '',
    summaryDateTime: '',
    summaryLocale: '',
    summaryAgentId: '',
  })

  const handleSubmit = () => {
    if (!formData.subject.trim() || !formData.description.trim()) {
      toast({
        title: 'Missing fields',
        description: 'Please fill in subject and description',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      return
    }

    const newTicket = createTicket({
      subject: formData.subject,
      description: formData.description,
      customerId: formData.customerId,
      priority: formData.priority === '-' ? 'normal' : formData.priority,
      type: formData.type === '-' ? 'question' : formData.type,
      tags: formData.tags ? formData.tags.split(',').map(t => t.trim()).filter(Boolean) : [],
    })

    toast({
      title: 'Ticket created',
      description: `Ticket #${newTicket.id.split('-')[1]} created successfully`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    })

    // Reset form
    setFormData({
      subject: '',
      description: '',
      customerId: state.customers[0]?.id || '',
      priority: '-',
      type: '-',
      assignee: '-',
      followers: '',
      tags: '',
      summary: '',
      summaryDateTime: '',
      summaryLocale: '',
      summaryAgentId: '',
    })

    onClose()
  }

  if (!isOpen) return null

  return (
    <Box position="fixed" top="0" left="0" right="0" bottom="0" bg="white" zIndex={1000}>
      {/* Top Header - Full Width */}
      <Flex
        h="56px"
        bg="white"
        borderBottom="1px"
        borderColor="gray.200"
        align="center"
        px={4}
        justify="space-between"
      >
        {/* Left - Logo and Tabs */}
        <HStack spacing={3}>
          <Box color="gray.700" fontWeight="600" fontSize="md">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
            </svg>
          </Box>
          
          <HStack spacing={1}>
            <HStack
              bg="white"
              px={3}
              h="56px"
              spacing={2}
              borderBottom="2px"
              borderColor="blue.500"
            >
              <Text fontSize="sm" fontWeight="500" color="gray.700">
                New ticket
              </Text>
              <IconButton
                aria-label="Close"
                icon={<FiX />}
                size="xs"
                variant="ghost"
                onClick={onClose}
                color="gray.500"
                _hover={{ bg: 'gray.100' }}
              />
            </HStack>
            <Button
              size="sm"
              variant="ghost"
              leftIcon={<Text fontSize="lg">+</Text>}
              color="gray.500"
              fontWeight="400"
              _hover={{ bg: 'gray.100' }}
            >
              add
            </Button>
          </HStack>
        </HStack>

        {/* Right - Actions and Profile */}
        <HStack spacing={1}>
          <IconButton
            aria-label="Search"
            icon={
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M12.5 11h-.79l-.28-.27A6.471 6.471 0 0013 6.5 6.5 6.5 0 106.5 13c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L17.49 16l-4.99-5zm-6 0C4.01 11 2 8.99 2 6.5S4.01 2 6.5 2 11 4.01 11 6.5 8.99 11 6.5 11z" fill="currentColor"/>
              </svg>
            }
            variant="ghost"
            size="sm"
            color="gray.600"
            _hover={{ bg: 'gray.100' }}
          />
          <Button
            size="sm"
            variant="ghost"
            color="gray.700"
            fontWeight="500"
            _hover={{ bg: 'gray.100' }}
          >
            Conversations
            <Badge ml={2} bg="gray.200" color="gray.700" borderRadius="full" fontSize="xs" px={2}>
              0
            </Badge>
          </Button>
          <IconButton
            aria-label="Phone"
            icon={<FiPhone />}
            variant="ghost"
            size="sm"
            color="gray.600"
            _hover={{ bg: 'gray.100' }}
          />
          <IconButton
            aria-label="Notifications"
            icon={<FiBell />}
            variant="ghost"
            size="sm"
            color="gray.600"
            _hover={{ bg: 'gray.100' }}
          />
          <IconButton
            aria-label="Grid"
            icon={
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <rect x="2" y="2" width="6" height="6" rx="1" fill="currentColor"/>
                <rect x="10" y="2" width="6" height="6" rx="1" fill="currentColor"/>
                <rect x="2" y="10" width="6" height="6" rx="1" fill="currentColor"/>
                <rect x="10" y="10" width="6" height="6" rx="1" fill="currentColor"/>
              </svg>
            }
            variant="ghost"
            size="sm"
            color="gray.600"
            _hover={{ bg: 'gray.100' }}
          />
          <IconButton
            aria-label="Help"
            icon={<FiHelpCircle />}
            variant="ghost"
            size="sm"
            color="gray.600"
            _hover={{ bg: 'gray.100' }}
          />
          <IconButton
            aria-label="Settings"
            icon={<FiSettings />}
            variant="ghost"
            size="sm"
            color="gray.600"
            _hover={{ bg: 'gray.100' }}
          />
          <Menu>
            <MenuButton 
              as={HStack} 
              cursor="pointer" 
              spacing={0}
              ml={1}
            >
              <Avatar 
                size="sm" 
                name={currentAgent.name} 
                bg="brand.500"
                w="32px"
                h="32px"
              />
            </MenuButton>
            <MenuList fontSize="sm" minW="200px">
              <MenuItem isDisabled>
                <Box>
                  <Text fontWeight="600">{currentAgent.name}</Text>
                  <Text fontSize="xs" color="gray.500">{currentAgent.email}</Text>
                </Box>
              </MenuItem>
              <MenuItem>Profile settings</MenuItem>
              <MenuItem>View profile</MenuItem>
              <MenuItem color="red.500">Sign out</MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </Flex>

      {/* Badge Row */}
      <Flex px={6} py={3} bg="gray.50" borderBottom="1px" borderColor="gray.200">
        <HStack spacing={2}>
          <Badge
            bg="orange.400"
            color="white"
            px={2}
            py={0.5}
            borderRadius="sm"
            fontSize="xs"
            fontWeight="600"
            textTransform="uppercase"
          >
            New
          </Badge>
          <Text fontSize="sm" fontWeight="500">
            Ticket
          </Text>
        </HStack>
      </Flex>

      {/* Main Content */}
      <Flex h="calc(100vh - 56px - 52px - 60px)">
        {/* Left Sidebar - Form Fields */}
        <Box w="316px" borderRight="1px" borderColor="gray.200" bg="white" overflowY="auto">
          <VStack spacing={4} align="stretch" p={4} pb={0}>
            <FormControl>
              <FormLabel fontSize="xs" fontWeight="700" mb={2} color="gray.700">
                Requester
              </FormLabel>
              <Select
                value={formData.customerId}
                onChange={(e) => setFormData({ ...formData, customerId: e.target.value })}
                size="sm"
                borderColor="blue.400"
                borderWidth="2px"
                _focus={{ borderColor: 'blue.500', boxShadow: 'none' }}
                icon={<FiChevronDown />}
              >
                {state.customers.map((customer: any) => (
                  <option key={customer.id} value={customer.id}>
                    {customer.name}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl>
              <HStack justify="space-between" mb={2}>
                <FormLabel fontSize="xs" fontWeight="700" mb={0} color="gray.700">
                  Assignee
                </FormLabel>
                <Button
                  size="xs"
                  variant="link"
                  color="blue.500"
                  fontSize="xs"
                  fontWeight="500"
                >
                  take it
                </Button>
              </HStack>
              <Select
                value={formData.assignee}
                onChange={(e) => setFormData({ ...formData, assignee: e.target.value })}
                size="sm"
              >
                <option value="-">-</option>
                {state.agents.map((agent: any) => (
                  <option key={agent.id} value={agent.id}>
                    {agent.name}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl>
              <HStack justify="space-between" mb={2}>
                <FormLabel fontSize="xs" fontWeight="700" mb={0} color="gray.700">
                  Followers
                </FormLabel>
                <Button
                  size="xs"
                  variant="link"
                  color="blue.500"
                  fontSize="xs"
                  fontWeight="500"
                >
                  follow
                </Button>
              </HStack>
              <Select
                value={formData.followers}
                onChange={(e) => setFormData({ ...formData, followers: e.target.value })}
                size="sm"
              >
                <option value="">-</option>
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel fontSize="xs" fontWeight="700" mb={2} color="gray.700">
                Tags
              </FormLabel>
              <Input
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                size="sm"
                placeholder=""
              />
            </FormControl>

            <HStack spacing={3} align="flex-start">
              <FormControl flex={1}>
                <FormLabel fontSize="xs" fontWeight="700" mb={2} color="gray.700">
                  Type
                </FormLabel>
                <Select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  size="sm"
                >
                  <option value="-">-</option>
                  <option value="question">Question</option>
                  <option value="incident">Incident</option>
                  <option value="problem">Problem</option>
                  <option value="task">Task</option>
                </Select>
              </FormControl>

              <FormControl flex={1}>
                <FormLabel fontSize="xs" fontWeight="700" mb={2} color="gray.700">
                  Priority
                </FormLabel>
                <Select
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                  size="sm"
                >
                  <option value="-">-</option>
                  <option value="low">Low</option>
                  <option value="normal">Normal</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </Select>
              </FormControl>
            </HStack>

            <FormControl>
              <FormLabel fontSize="xs" fontWeight="700" mb={2} color="gray.700">
                Summary
              </FormLabel>
              <Input
                value={formData.summary}
                onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                size="sm"
                bg="gray.50"
              />
            </FormControl>

            <FormControl>
              <FormLabel fontSize="xs" fontWeight="700" mb={2} color="gray.700">
                Summary date and time
              </FormLabel>
              <Input
                value={formData.summaryDateTime}
                onChange={(e) => setFormData({ ...formData, summaryDateTime: e.target.value })}
                size="sm"
                bg="gray.50"
              />
            </FormControl>

            <FormControl>
              <FormLabel fontSize="xs" fontWeight="700" mb={2} color="gray.700">
                Summary locale
              </FormLabel>
              <Input
                value={formData.summaryLocale}
                onChange={(e) => setFormData({ ...formData, summaryLocale: e.target.value })}
                size="sm"
                bg="gray.50"
              />
            </FormControl>

            <FormControl>
              <FormLabel fontSize="xs" fontWeight="700" mb={2} color="gray.700">
                Summary agent ID
              </FormLabel>
              <Input
                value={formData.summaryAgentId}
                onChange={(e) => setFormData({ ...formData, summaryAgentId: e.target.value })}
                size="sm"
                bg="gray.50"
              />
            </FormControl>
          </VStack>

          {/* Intent Section at Bottom */}
          <Box borderTop="1px" borderColor="gray.200" mt={4}>
            <FormControl p={4}>
              <FormLabel fontSize="xs" fontWeight="700" mb={2} color="gray.700">
                Intent
              </FormLabel>
              <Menu>
                <MenuButton
                  as={Button}
                  size="sm"
                  variant="outline"
                  rightIcon={<FiChevronDown />}
                  w="full"
                  fontWeight="400"
                  justifyContent="space-between"
                  textAlign="left"
                  fontSize="sm"
                >
                  <HStack spacing={2}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                      <path d="M2 2h10v2H2V2zm0 4h10v2H2V6zm0 4h7v2H2v-2z" />
                    </svg>
                    <Text>Apply macro</Text>
                  </HStack>
                </MenuButton>
                <MenuList fontSize="sm">
                  <MenuItem>No macros available</MenuItem>
                </MenuList>
              </Menu>
            </FormControl>
          </Box>
        </Box>

        {/* Center - Main Content Area */}
        <Flex flex={1} direction="column" bg="white" position="relative">
          <Box px={6} py={4} borderBottom="1px" borderColor="gray.200">
            <Input
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              placeholder="Subject"
              variant="unstyled"
              fontSize="md"
              fontWeight="400"
            />
          </Box>

          <Box flex={1} px={6} py={4} position="relative">
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder=""
              variant="unstyled"
              resize="none"
              h="full"
              fontSize="sm"
            />
          </Box>

          {/* Reply Type and Actions */}
          <Flex
            px={6}
            py={3}
            borderTop="1px"
            borderColor="gray.200"
            justify="space-between"
            align="center"
          >
            <HStack spacing={3}>
              <Menu>
                <MenuButton
                  as={Button}
                  size="sm"
                  variant="ghost"
                  rightIcon={<FiChevronDown />}
                  leftIcon={
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                      <path d="M2 2h8v1H2V2zm0 3h8v1H2V5zm0 3h5v1H2V8z" />
                    </svg>
                  }
                  fontWeight="400"
                  fontSize="sm"
                  color="gray.700"
                >
                  Public reply
                </MenuButton>
                <MenuList fontSize="sm">
                  <MenuItem>Public reply</MenuItem>
                  <MenuItem>Internal note</MenuItem>
                </MenuList>
              </Menu>
              <Button size="sm" variant="link" color="blue.500" fontSize="sm" fontWeight="500">
                To
              </Button>
              <Button size="sm" variant="link" color="blue.500" fontSize="sm" fontWeight="500">
                CC
              </Button>
            </HStack>

            <HStack spacing={0}>
              <IconButton
                aria-label="Attach"
                icon={<FiPaperclip />}
                variant="ghost"
                size="sm"
                color="gray.600"
              />
              <IconButton
                aria-label="Format"
                icon={<Text fontWeight="bold">A</Text>}
                variant="ghost"
                size="sm"
                color="gray.600"
              />
              <IconButton
                aria-label="Emoji"
                icon={<FiSmile />}
                variant="ghost"
                size="sm"
                color="gray.600"
              />
              <IconButton
                aria-label="Link"
                icon={<FiLink />}
                variant="ghost"
                size="sm"
                color="gray.600"
              />
              <IconButton
                aria-label="Edit"
                icon={<FiEdit />}
                variant="ghost"
                size="sm"
                color="gray.600"
              />
              <IconButton
                aria-label="More"
                icon={<Text fontSize="lg" fontWeight="bold">•••</Text>}
                variant="ghost"
                size="sm"
                color="gray.600"
              />
            </HStack>
          </Flex>

          {/* Right Sidebar Icons (Vertical) */}
          <VStack
            position="absolute"
            right={0}
            top="80px"
            spacing={0}
            borderLeft="1px"
            borderColor="gray.200"
            bg="white"
          >
            <IconButton
              aria-label="User"
              icon={
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 10c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              }
              variant="ghost"
              size="md"
              color="gray.600"
              borderRadius="0"
              h="48px"
              w="48px"
              borderBottom="1px"
              borderColor="gray.200"
            />
            <IconButton
              aria-label="List"
              icon={
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M3 5h14v2H3V5zm0 4h14v2H3V9zm0 4h14v2H3v-2z"/>
                </svg>
              }
              variant="ghost"
              size="md"
              color="gray.600"
              borderRadius="0"
              h="48px"
              w="48px"
              borderBottom="1px"
              borderColor="gray.200"
            />
            <IconButton
              aria-label="Macros"
              icon={
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M4 4h12v2H4V4zm0 5h12v2H4V9zm0 5h8v2H4v-2z"/>
                </svg>
              }
              variant="ghost"
              size="md"
              color="gray.600"
              borderRadius="0"
              h="48px"
              w="48px"
              borderBottom="1px"
              borderColor="gray.200"
            />
            <IconButton
              aria-label="Apps"
              icon={
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <rect x="3" y="3" width="6" height="6" rx="1"/>
                  <rect x="11" y="3" width="6" height="6" rx="1"/>
                  <rect x="3" y="11" width="6" height="6" rx="1"/>
                  <rect x="11" y="11" width="6" height="6" rx="1"/>
                </svg>
              }
              variant="ghost"
              size="md"
              color="gray.600"
              borderRadius="0"
              h="48px"
              w="48px"
            />
          </VStack>
        </Flex>
      </Flex>

      {/* Bottom Action Bar */}
      <Flex
        h="60px"
        bg="white"
        borderTop="1px"
        borderColor="gray.200"
        px={4}
        align="center"
        justify="flex-end"
      >
        <HStack spacing={2}>
          <Menu>
            <MenuButton
              as={Button}
              size="sm"
              variant="outline"
              rightIcon={<FiChevronDown />}
              fontWeight="400"
            >
              Close tab
            </MenuButton>
            <MenuList fontSize="sm">
              <MenuItem onClick={onClose}>Close tab</MenuItem>
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton
              as={Button}
              size="sm"
              bg="gray.800"
              color="white"
              _hover={{ bg: 'gray.700' }}
              _active={{ bg: 'gray.900' }}
              rightIcon={<FiChevronDown />}
              fontWeight="500"
            >
              Submit as New
            </MenuButton>
            <MenuList fontSize="sm">
              <MenuItem onClick={handleSubmit}>Submit as New</MenuItem>
              <MenuItem onClick={handleSubmit}>Submit as Open</MenuItem>
              <MenuItem onClick={handleSubmit}>Submit as Pending</MenuItem>
              <MenuItem onClick={handleSubmit}>Submit as Solved</MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </Flex>
    </Box>
  )
}
