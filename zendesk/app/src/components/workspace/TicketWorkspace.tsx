import { useState } from 'react'
import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  Select,
  Textarea,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  Divider,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react'
import {
  FiMoreVertical,
  FiPaperclip,
  FiMaximize2,
} from 'react-icons/fi'
import { useApp } from '../../contexts/AppContext'
import { TicketSidebar } from './TicketSidebar'
import { CustomerProfile } from './CustomerProfile'
import { SLATracker } from '../sla/SLATracker'
import { formatDistanceToNow } from 'date-fns'

interface TicketWorkspaceProps {
  ticketId: string
  onClose: () => void
}

export function TicketWorkspace({ ticketId }: TicketWorkspaceProps) {
  const [replyType, setReplyType] = useState<'public' | 'internal'>('public')
  const [replyText, setReplyText] = useState('')
  const [activeTab, setActiveTab] = useState(0)
  const { state, applyMacro: applyMacroAction, updateTicket } = useApp()
  
  const ticket = state.tickets.find((t: any) => t.id === ticketId)
  const customer = state.customers.find((c: any) => c.id === ticket?.customerId)

  const handleSubmit = (status: string) => {
    if (!ticket || !replyText.trim() || !state.currentAgent) return

    if (replyType === 'public') {
      const newMessage = {
        id: `msg-${Date.now()}`,
        ticketId: ticketId,
        authorId: state.currentAgent.id,
        authorType: 'agent' as const,
        content: replyText,
        attachments: [],
        createdAt: new Date(),
        isPublic: true,
      }

      const conversationHistory = [...(ticket.conversationHistory || []), newMessage]
      
      updateTicket(ticketId, {
        conversationHistory,
        status,
      })
    } else {
      // Internal note
      const newNote = {
        id: `note-${Date.now()}`,
        ticketId: ticketId,
        authorId: state.currentAgent.id,
        content: replyText,
        createdAt: new Date(),
      }

      const internalNotes = [...(ticket.internalNotes || []), newNote]
      
      updateTicket(ticketId, {
        internalNotes,
        status,
      })
    }

    setReplyText('')
  }

  const applyMacro = (macroId: string) => {
    applyMacroAction(ticketId, macroId)
    
    // Get the macro template to show in reply box
    const macro = state.macros.find((m: any) => m.id === macroId)
    if (macro) {
      let template = macro.template
      template = template.replace(/{{customer\.name}}/g, customer?.name || 'Customer')
      template = template.replace(/{{agent\.name}}/g, state.currentAgent?.name || 'Agent')
      setReplyText(template)
    }
  }

  if (!ticket) {
    return (
      <Box h="100%" display="flex" alignItems="center" justifyContent="center">
        <Text color="gray.500">Ticket not found. Please select another ticket.</Text>
      </Box>
    )
  }

  // The customer can be optional for a moment
  if (!customer) {
    return (
      <Box h="100%" display="flex" alignItems="center" justifyContent="center">
        <Text color="gray.500">Loading customer data...</Text>
      </Box>
    )
  }

  return (
    <Box h="100%" display="flex">
      {/* Left Sidebar - Ticket Metadata */}
      <TicketSidebar ticketId={ticketId} />

      {/* Main Content */}
      <Box flex="1" display="flex" flexDirection="column" bg="gray.50">
        {/* Header */}
        <Box bg="white" p={4} borderBottom="1px" borderColor="gray.200">
          <HStack justify="space-between">
            <Text fontSize="lg" fontWeight="600">
              {ticket.subject}
            </Text>
            <IconButton
              aria-label="More options"
              icon={<FiMoreVertical />}
              variant="ghost"
              size="sm"
            />
          </HStack>
        </Box>

        {/* Tabbed Content */}
        <Box flex="1" overflowY="auto">
          <Tabs index={activeTab} onChange={setActiveTab} colorScheme="brand" size="sm">
            <Box bg="white" borderBottom="1px" borderColor="gray.200" px={4}>
              <TabList>
                <Tab fontWeight="500">Conversation</Tab>
                <Tab fontWeight="500">Internal Notes</Tab>
                <Tab fontWeight="500">SLA Timeline</Tab>
              </TabList>
            </Box>

            <TabPanels>
              {/* Conversation Tab */}
              <TabPanel p={6}>
                <VStack align="stretch" spacing={4}>
                  {ticket.conversationHistory
                    ?.filter((msg: any) => msg.isPublic === true)
                    .map((message: any) => {
                      const sender =
                        message.authorId === customer.id
                          ? customer
                          : state.agents.find((a: any) => a.id === message.authorId) || { id: message.authorId, name: 'Agent', avatarUrl: '' }

                      return (
                        <Box key={message.id}>
                          <HStack align="start" spacing={3}>
                            <Avatar size="sm" name={sender.name} src={sender.avatarUrl || sender.avatar} />
                            <VStack align="stretch" flex="1" spacing={1}>
                              <HStack>
                                <Text fontSize="sm" fontWeight="600">
                                  {sender.name}
                                </Text>
                                <Text fontSize="xs" color="gray.500">
                                  {formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}
                                </Text>
                              </HStack>
                              <Box
                                bg="white"
                                p={3}
                                borderRadius="md"
                                border="1px"
                                borderColor="gray.200"
                                fontSize="sm"
                              >
                                {message.content}
                              </Box>
                            </VStack>
                          </HStack>
                          <Divider mt={4} />
                        </Box>
                      )
                    })}
                  {!ticket.conversationHistory?.some((msg: any) => msg.isPublic === true) && (
                    <Text color="gray.500" textAlign="center" py={8}>
                      No conversation yet
                    </Text>
                  )}
                </VStack>
              </TabPanel>

              {/* Internal Notes Tab */}
              <TabPanel p={6}>
                <VStack align="stretch" spacing={4}>
                  {ticket.internalNotes
                    ?.map((note: any) => {
                      const sender = state.agents.find((a: any) => a.id === note.authorId) || { id: note.authorId, name: 'Agent', avatarUrl: '' }

                      return (
                        <Box key={note.id}>
                          <HStack align="start" spacing={3}>
                            <Avatar size="sm" name={sender.name} src={sender.avatarUrl || sender.avatar} />
                            <VStack align="stretch" flex="1" spacing={1}>
                              <HStack>
                                <Text fontSize="sm" fontWeight="600">
                                  {sender.name}
                                </Text>
                                <Text fontSize="xs" color="gray.500">
                                  {formatDistanceToNow(new Date(note.createdAt), { addSuffix: true })}
                                </Text>
                                <Text fontSize="xs" color="orange.500" fontWeight="600">
                                  INTERNAL NOTE
                                </Text>
                              </HStack>
                              <Box
                                bg="orange.50"
                                p={3}
                                borderRadius="md"
                                border="1px"
                                borderColor="orange.200"
                                fontSize="sm"
                              >
                                {note.content}
                              </Box>
                            </VStack>
                          </HStack>
                          <Divider mt={4} />
                        </Box>
                      )
                    })}
                  {(!ticket.internalNotes || ticket.internalNotes.length === 0) && (
                    <Text color="gray.500" textAlign="center" py={8}>
                      No internal notes yet
                    </Text>
                  )}
                </VStack>
              </TabPanel>

              {/* SLA Timeline Tab */}
              <TabPanel p={0}>
                <SLATracker ticketId={ticketId} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>

        {/* Reply Box */}
        <Box bg="white" p={4} borderTop="1px" borderColor="gray.200">
          <VStack align="stretch" spacing={3}>
            <HStack>
              <Menu>
                <MenuButton as={Button} size="sm" variant="ghost" fontWeight="600">
                  {replyType === 'public' ? 'Public reply' : 'Internal note'}
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={() => setReplyType('public')}>Public reply</MenuItem>
                  <MenuItem onClick={() => setReplyType('internal')}>Internal note</MenuItem>
                </MenuList>
              </Menu>
            </HStack>

            <Textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Type your reply..."
              minH="120px"
              bg="white"
            />

            <HStack justify="space-between">
              <HStack>
                <IconButton
                  aria-label="Attach file"
                  icon={<FiPaperclip />}
                  size="sm"
                  variant="ghost"
                />
                <IconButton
                  aria-label="Expand"
                  icon={<FiMaximize2 />}
                  size="sm"
                  variant="ghost"
                />
              </HStack>

              <HStack>
                <Select
                  size="sm"
                  w="200px"
                  placeholder="Apply macro"
                  onChange={(e) => {
                    if (e.target.value) applyMacro(e.target.value)
                  }}
                  value=""
                >
                  {state.macros.map((macro: any) => (
                    <option key={macro.id} value={macro.id}>
                      {macro.name}
                    </option>
                  ))}
                </Select>

                <Menu>
                  <MenuButton as={Button} size="sm" colorScheme="brand">
                    Submit as Open
                  </MenuButton>
                  <MenuList>
                    <MenuItem onClick={() => handleSubmit('open')}>Submit as Open</MenuItem>
                    <MenuItem onClick={() => handleSubmit('pending')}>Submit as Pending</MenuItem>
                    <MenuItem onClick={() => handleSubmit('solved')}>Submit as Solved</MenuItem>
                  </MenuList>
                </Menu>
              </HStack>
            </HStack>
          </VStack>
        </Box>
      </Box>

      {/* Right Sidebar - Customer Profile */}
      <CustomerProfile customerId={customer.id} />
    </Box>
  )
}
