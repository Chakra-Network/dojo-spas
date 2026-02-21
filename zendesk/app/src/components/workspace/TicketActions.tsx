import { Box, HStack, VStack, Button, Select, Menu, MenuButton, MenuList, MenuItem, IconButton, Textarea } from '@chakra-ui/react'
import { FiChevronDown, FiMoreVertical } from 'react-icons/fi'
import { useState } from 'react'
import { mockTickets } from '../../fixtures/tickets'

interface TicketActionsProps {
  ticketId: string
  onBack: () => void
}

export function TicketActions({ ticketId, onBack }: TicketActionsProps) {
  const [replyText, setReplyText] = useState('')
  const [status, setStatus] = useState('')
  const [priority, setPriority] = useState('')
  
  const ticket = mockTickets.find((t) => t.id === ticketId)
  if (!ticket) return null

  const handleAddReply = () => {
    if (!replyText.trim()) return
    console.log('Adding reply:', replyText)
    // In a real app, this would call dojo.setState
    setReplyText('')
  }

  const handleStatusChange = (newStatus: string) => {
    console.log('Changing status to:', newStatus)
    // In a real app, this would update via dojo.setState
    setStatus(newStatus)
  }

  const handlePriorityChange = (newPriority: string) => {
    console.log('Changing priority to:', newPriority)
    setPriority(newPriority)
  }

  return (
    <Box borderTop="1px" borderColor="gray.200" bg="white">
      {/* Action Toolbar */}
      <HStack spacing={3} p={4} borderBottom="1px" borderColor="gray.200">
        <Button size="sm" variant="outline" onClick={onBack}>
          ← Back to Inbox
        </Button>
        
        <Menu>
          <MenuButton as={Button} size="sm" rightIcon={<FiChevronDown />} variant="outline">
            Status: {status || ticket.status}
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => handleStatusChange('new')}>New</MenuItem>
            <MenuItem onClick={() => handleStatusChange('open')}>Open</MenuItem>
            <MenuItem onClick={() => handleStatusChange('pending')}>Pending</MenuItem>
            <MenuItem onClick={() => handleStatusChange('solved')}>Solved</MenuItem>
            <MenuItem onClick={() => handleStatusChange('closed')}>Closed</MenuItem>
          </MenuList>
        </Menu>

        <Menu>
          <MenuButton as={Button} size="sm" rightIcon={<FiChevronDown />} variant="outline">
            Priority: {priority || ticket.priority}
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => handlePriorityChange('urgent')}>Urgent</MenuItem>
            <MenuItem onClick={() => handlePriorityChange('high')}>High</MenuItem>
            <MenuItem onClick={() => handlePriorityChange('normal')}>Normal</MenuItem>
            <MenuItem onClick={() => handlePriorityChange('low')}>Low</MenuItem>
          </MenuList>
        </Menu>

        <Menu>
          <MenuButton as={Button} size="sm" rightIcon={<FiChevronDown />} variant="outline">
            Assign
          </MenuButton>
          <MenuList>
            <MenuItem>Alex Rivera</MenuItem>
            <MenuItem>Jordan Lee</MenuItem>
            <MenuItem>Taylor Swift</MenuItem>
          </MenuList>
        </Menu>

        <Menu>
          <MenuButton as={Button} size="sm" rightIcon={<FiChevronDown />} colorScheme="brand">
            Apply Macro
          </MenuButton>
          <MenuList>
            <MenuItem>Password Reset</MenuItem>
            <MenuItem>Billing Inquiry</MenuItem>
            <MenuItem>Feature Request</MenuItem>
            <MenuItem>Escalate to Engineering</MenuItem>
            <MenuItem>Close - Resolved</MenuItem>
          </MenuList>
        </Menu>

        <Box flex="1" />
        
        <IconButton
          aria-label="More options"
          icon={<FiMoreVertical />}
          size="sm"
          variant="ghost"
        />
      </HStack>

      {/* Reply Box */}
      <VStack align="stretch" spacing={3} p={4}>
        <Textarea
          placeholder="Type your reply to the customer..."
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
          rows={4}
          resize="vertical"
        />
        <HStack justify="space-between">
          <HStack spacing={2}>
            <Button size="sm" variant="outline">
              Add Attachment
            </Button>
            <Button size="sm" variant="outline">
              Insert Template
            </Button>
          </HStack>
          <HStack spacing={2}>
            <Button size="sm" variant="outline">
              Internal Note
            </Button>
            <Button
              size="sm"
              colorScheme="brand"
              onClick={handleAddReply}
              isDisabled={!replyText.trim()}
            >
              Send Reply
            </Button>
          </HStack>
        </HStack>
      </VStack>
    </Box>
  )
}
