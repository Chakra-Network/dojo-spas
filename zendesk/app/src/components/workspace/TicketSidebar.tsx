import { Box, VStack, HStack, Text, Select, Input, Badge, IconButton, Divider } from '@chakra-ui/react'
import { FiX, FiPlus } from 'react-icons/fi'
import { useState } from 'react'
import { useApp } from '../../contexts/AppContext'

interface TicketSidebarProps {
  ticketId: string
}

export function TicketSidebar({ ticketId }: TicketSidebarProps) {
  const { state, updateTicket: updateTicketAction, recordSLAEvent } = useApp()
  const [newTag, setNewTag] = useState('')
  
  const ticket = state.tickets.find((t: any) => t.id === ticketId)
  const customer = state.customers.find((c: any) => c.id === ticket?.customerId)
  
  if (!ticket) return null

  const handleUpdate = (updates: any) => {
    updateTicketAction(ticketId, updates)
  }

  const handleAddTag = () => {
    if (newTag.trim() && !ticket.tags.includes(newTag.trim())) {
      handleUpdate({ tags: [...ticket.tags, newTag.trim()] })
      setNewTag('')
    }
  }

  const handleTakeTicket = () => {
    if (state.currentAgent) {
      handleUpdate({ assigneeId: state.currentAgent.id })
      
      // Record SLA event for taking ticket
      recordSLAEvent({
        id: `evt-${Date.now()}`,
        ticketId,
        type: 'assigned',
        timestamp: new Date(),
        description: `Assigned to ${state.currentAgent.name}`,
        agentId: state.currentAgent.id,
        metadata: { action: 'take_ticket' }
      })
    }
  }

  const handlePriorityChange = (newPriority: string) => {
    const oldPriority = ticket.priority
    handleUpdate({ priority: newPriority })
    
    // Record SLA event for priority changes
    if (newPriority === 'urgent' && oldPriority !== 'urgent') {
      recordSLAEvent({
        id: `evt-${Date.now()}`,
        ticketId,
        type: 'escalation',
        timestamp: new Date(),
        description: `Priority escalated to urgent`,
        agentId: state.currentAgent.id,
        metadata: { oldPriority, newPriority }
      })
    } else {
      recordSLAEvent({
        id: `evt-${Date.now()}`,
        ticketId,
        type: 'priority_change',
        timestamp: new Date(),
        description: `Priority changed from ${oldPriority} to ${newPriority}`,
        agentId: state.currentAgent.id,
        metadata: { oldPriority, newPriority }
      })
    }
  }

  return (
    <Box w="300px" bg="white" borderRight="1px" borderColor="gray.200" p={4} overflowY="auto">
      <VStack align="stretch" spacing={4} fontSize="sm">
        {/* Requester */}
        <Box>
          <HStack justify="space-between" mb={1}>
            <Text fontSize="xs" fontWeight="600" color="gray.600">Requester</Text>
          </HStack>
          <Select size="sm" value={ticket.customerId} isDisabled>
            <option value={ticket.customerId}>{customer?.name}</option>
          </Select>
        </Box>

        {/* Assignee */}
        <Box>
          <HStack justify="space-between" mb={1}>
            <Text fontSize="xs" fontWeight="600" color="gray.600">Assignee*</Text>
            <Text 
              fontSize="xs" 
              color="brand.500" 
              cursor="pointer"
              _hover={{ textDecoration: 'underline' }}
              onClick={handleTakeTicket}
            >
              take it
            </Text>
          </HStack>
          <Select
            size="sm"
            value={ticket.assigneeId || ''}
            onChange={(e) => handleUpdate({ assigneeId: e.target.value })}
            placeholder="Select assignee"
          >
            {state.agents.map((agent: any) => (
              <option key={agent.id} value={agent.id}>{agent.name}</option>
            ))}
          </Select>
        </Box>

        {/* Followers */}
        <Box>
          <HStack justify="space-between" mb={1}>
            <Text fontSize="xs" fontWeight="600" color="gray.600">Followers</Text>
            <Text fontSize="xs" color="brand.500" cursor="pointer">follow</Text>
          </HStack>
        </Box>

        <Divider />

        {/* Tags */}
        <Box>
          <Text fontSize="xs" fontWeight="600" color="gray.600" mb={1}>Tags</Text>
          <HStack spacing={1} flexWrap="wrap" mb={2}>
            {ticket.tags.map((tag: string) => (
              <Badge key={tag} colorScheme="blue" fontSize="xs" display="flex" alignItems="center" gap={1}>
                {tag}
                <IconButton
                  aria-label="Remove tag"
                  icon={<FiX />}
                  size="xs"
                  variant="ghost"
                  h="12px"
                  minW="12px"
                  onClick={() => {
                    const newTags = ticket.tags.filter((t: string) => t !== tag)
                    handleUpdate({ tags: newTags })
                  }}
                />
              </Badge>
            ))}
          </HStack>
          <HStack>
            <Input 
              size="sm" 
              placeholder="Add tags" 
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleAddTag()
                }
              }}
            />
            <IconButton
              aria-label="Add tag"
              icon={<FiPlus />}
              size="sm"
              colorScheme="brand"
              onClick={handleAddTag}
              isDisabled={!newTag.trim()}
            />
          </HStack>
        </Box>

        {/* Type */}
        <Box>
          <Text fontSize="xs" fontWeight="600" color="gray.600" mb={1}>Type</Text>
          <Select
            size="sm"
            value={ticket.type}
            onChange={(e) => handleUpdate({ type: e.target.value })}
          >
            <option value="-">-</option>
            <option value="question">Question</option>
            <option value="incident">Incident</option>
            <option value="problem">Problem</option>
            <option value="task">Task</option>
          </Select>
        </Box>

        {/* Priority */}
        <Box>
          <Text fontSize="xs" fontWeight="600" color="gray.600" mb={1}>Priority</Text>
          <Select
            size="sm"
            value={ticket.priority}
            onChange={(e) => handlePriorityChange(e.target.value)}
          >
            <option value="low">Low</option>
            <option value="normal">Normal</option>
            <option value="high">High</option>
            <option value="urgent">Urgent</option>
          </Select>
        </Box>
      </VStack>
    </Box>
  )
}
