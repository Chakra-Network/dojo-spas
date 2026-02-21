import { Box, VStack, HStack, Text, Badge, Avatar, Flex, Menu, MenuButton, MenuList, MenuItem, Button, Checkbox, IconButton, Tooltip } from '@chakra-ui/react'
import { useState, useMemo, useEffect, useRef } from 'react'
import { FiChevronDown, FiCheckSquare } from 'react-icons/fi'
import { useApp } from '../../contexts/AppContext'
import { formatDistanceToNow } from 'date-fns'

interface TicketListProps {
  onTicketSelect: (ticketId: string) => void
}

export function TicketList({ onTicketSelect }: TicketListProps) {
  const { state, updateTicket } = useApp()
  const tickets = state.tickets
  const customers = state.customers
  const agents = state.agents
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [priorityFilter] = useState<string>('all')
  const [searchQuery] = useState('')
  const [displayCount, setDisplayCount] = useState(20)
  const [selectedTickets, setSelectedTickets] = useState<Set<string>>(new Set())
  const [bulkMode, setBulkMode] = useState(false)
  const observerTarget = useRef<HTMLDivElement>(null)

  // Infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          setDisplayCount(prev => prev + 20)
        }
      },
      { threshold: 1.0 }
    )

    if (observerTarget.current) {
      observer.observe(observerTarget.current)
    }

    return () => observer.disconnect()
  }, [])

  const filteredTickets = useMemo(() => {
    return tickets.filter((ticket: any) => {
      if (statusFilter !== 'all' && ticket.status !== statusFilter) return false
      if (priorityFilter !== 'all' && ticket.priority !== priorityFilter) return false
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        if (!ticket.subject.toLowerCase().includes(query) && 
            !ticket.description.toLowerCase().includes(query)) {
          return false
        }
      }
      return true
    }).slice(0, displayCount)
  }, [tickets, statusFilter, priorityFilter, searchQuery, displayCount])

  const handleBulkStatusChange = (newStatus: string) => {
    selectedTickets.forEach(ticketId => {
      updateTicket(ticketId, { status: newStatus })
    })
    setSelectedTickets(new Set())
    setBulkMode(false)
  }

  const handleBulkAssign = (agentId: string) => {
    selectedTickets.forEach(ticketId => {
      updateTicket(ticketId, { assigneeId: agentId })
    })
    setSelectedTickets(new Set())
    setBulkMode(false)
  }

  const toggleTicketSelection = (ticketId: string) => {
    const newSelection = new Set(selectedTickets)
    if (newSelection.has(ticketId)) {
      newSelection.delete(ticketId)
    } else {
      newSelection.add(ticketId)
    }
    setSelectedTickets(newSelection)
  }

  const selectAllVisible = () => {
    const allIds = new Set(filteredTickets.map((t: any) => t.id))
    setSelectedTickets(allIds)
  }

  const clearSelection = () => {
    setSelectedTickets(new Set())
  }

  const getCustomerName = (customerId: string) => {
    return customers.find((c: any) => c.id === customerId)?.name || 'Unknown'
  }

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      new: 'purple',
      open: 'blue',
      pending: 'orange',
      solved: 'green',
      closed: 'gray',
    }
    return colors[status] || 'gray'
  }

  const getPriorityColor = (priority: string) => {
    const colors: Record<string, string> = {
      urgent: 'red',
      high: 'orange',
      normal: 'blue',
      low: 'gray',
    }
    return colors[priority] || 'gray'
  }

  return (
    <Box h="100%" display="flex" flexDirection="column" bg="white">
      {/* Filter Bar */}
      <Box
        borderBottom="1px"
        borderColor="gray.200"
        px={4}
        py={3}
        bg="white"
      >
        <HStack spacing={3} justify="space-between">
          <HStack spacing={2}>
            <Text fontSize="lg" fontWeight="600" color="gray.800">
              {filteredTickets.length} tickets
            </Text>
            
            <Tooltip label="Select multiple tickets" hasArrow>
              <IconButton
                aria-label="Bulk mode"
                icon={<FiCheckSquare />}
                size="sm"
                variant={bulkMode ? 'solid' : 'ghost'}
                colorScheme={bulkMode ? 'blue' : 'gray'}
                onClick={() => {
                  setBulkMode(!bulkMode)
                  if (bulkMode) clearSelection()
                }}
              />
            </Tooltip>
          </HStack>
          
          <HStack spacing={2}>
            <Menu>
              <MenuButton
                as={Button}
                size="sm"
                variant="outline"
                rightIcon={<FiChevronDown />}
                borderColor="gray.300"
                _hover={{ bg: 'gray.50' }}
              >
                Status: {statusFilter === 'all' ? 'All' : statusFilter}
              </MenuButton>
              <MenuList fontSize="sm">
                <MenuItem onClick={() => setStatusFilter('all')}>All</MenuItem>
                <MenuItem onClick={() => setStatusFilter('new')}>New</MenuItem>
                <MenuItem onClick={() => setStatusFilter('open')}>Open</MenuItem>
                <MenuItem onClick={() => setStatusFilter('pending')}>Pending</MenuItem>
                <MenuItem onClick={() => setStatusFilter('solved')}>Solved</MenuItem>
              </MenuList>
            </Menu>

            <Menu>
              <MenuButton
                as={Button}
                size="sm"
                variant="outline"
                rightIcon={<FiChevronDown />}
                borderColor="gray.300"
                _hover={{ bg: 'gray.50' }}
              >
                Channel
              </MenuButton>
              <MenuList fontSize="sm">
                <MenuItem>All channels</MenuItem>
                <MenuItem>Email</MenuItem>
                <MenuItem>Chat</MenuItem>
                <MenuItem>Phone</MenuItem>
              </MenuList>
            </Menu>

            <Menu>
              <MenuButton
                as={Button}
                size="sm"
                variant="outline"
                rightIcon={<FiChevronDown />}
                borderColor="gray.300"
                _hover={{ bg: 'gray.50' }}
              >
                Recommended
              </MenuButton>
              <MenuList fontSize="sm">
                <MenuItem>Recommended</MenuItem>
                <MenuItem>Newest first</MenuItem>
                <MenuItem>Oldest first</MenuItem>
                <MenuItem>Priority</MenuItem>
              </MenuList>
            </Menu>
          </HStack>
        </HStack>
      </Box>

      {/* Bulk actions bar */}
      {bulkMode && selectedTickets.size > 0 && (
        <Flex
          bg="blue.50"
          borderBottom="1px"
          borderColor="blue.200"
          px={4}
          py={2}
          gap={3}
          alignItems="center"
        >
          <Text fontSize="sm" fontWeight="600" color="blue.700">
            {selectedTickets.size} selected
          </Text>
          
          <Menu>
            <MenuButton as={Button} size="xs" colorScheme="blue" fontSize="xs">
              Change status
            </MenuButton>
            <MenuList fontSize="sm">
              <MenuItem onClick={() => handleBulkStatusChange('open')}>Mark as Open</MenuItem>
              <MenuItem onClick={() => handleBulkStatusChange('pending')}>Mark as Pending</MenuItem>
              <MenuItem onClick={() => handleBulkStatusChange('solved')}>Mark as Solved</MenuItem>
            </MenuList>
          </Menu>

          <Menu>
            <MenuButton as={Button} size="xs" colorScheme="blue" fontSize="xs">
              Assign to
            </MenuButton>
            <MenuList fontSize="sm">
              {agents.map((agent: any) => (
                <MenuItem key={agent.id} onClick={() => handleBulkAssign(agent.id)}>
                  {agent.name}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>

          <Button size="xs" variant="ghost" onClick={clearSelection} fontSize="xs">
            Clear selection
          </Button>
        </Flex>
      )}

      {/* Bulk select all */}
      {bulkMode && (
        <Flex
          borderBottom="1px"
          borderColor="gray.200"
          px={4}
          py={2}
          bg="gray.50"
        >
          <Checkbox
            isChecked={selectedTickets.size === filteredTickets.length && filteredTickets.length > 0}
            onChange={(e) => e.target.checked ? selectAllVisible() : clearSelection()}
            size="sm"
          >
            <Text fontSize="xs">Select all {filteredTickets.length} tickets</Text>
          </Checkbox>
        </Flex>
      )}

      {/* Ticket list */}
      <Box flex="1" overflowY="auto">
        <VStack spacing={0} align="stretch">
          {filteredTickets.map((ticket: any) => (
            <Box
              key={ticket.id}
              borderBottom="1px"
              borderColor="gray.200"
              p={4}
              cursor="pointer"
              bg={selectedTickets.has(ticket.id) ? 'blue.50' : 'white'}
              _hover={{ bg: selectedTickets.has(ticket.id) ? 'blue.100' : 'gray.50' }}
              onClick={() => {
                if (bulkMode) {
                  toggleTicketSelection(ticket.id)
                } else {
                  onTicketSelect(ticket.id)
                }
              }}
            >
              <HStack align="start" spacing={3}>
                {bulkMode && (
                  <Checkbox
                    isChecked={selectedTickets.has(ticket.id)}
                    onChange={() => toggleTicketSelection(ticket.id)}
                    onClick={(e) => e.stopPropagation()}
                    mt={1}
                  />
                )}
                
                <Avatar size="sm" name={getCustomerName(ticket.customerId)} bg="gray.400" />
                
                <Box flex="1" minW={0}>
                  <HStack spacing={2} mb={1}>
                    <Text fontWeight="600" fontSize="sm" noOfLines={1} flex="1">
                      {getCustomerName(ticket.customerId)} | {ticket.subject}
                    </Text>
                    <Badge colorScheme={getStatusColor(ticket.status)} fontSize="xs" textTransform="capitalize">
                      ● {ticket.status}
                    </Badge>
                  </HStack>
                  
                  <Text fontSize="xs" color="gray.600" noOfLines={1} mb={1}>
                    {ticket.description}
                  </Text>
                  
                  <HStack spacing={3} fontSize="xs" color="gray.500">
                    <Text>{formatDistanceToNow(new Date(ticket.updatedAt), { addSuffix: true })}</Text>
                    <Text>#{ticket.id.split('-')[1]}</Text>
                    {ticket.priority !== 'normal' && (
                      <Badge 
                        colorScheme={getPriorityColor(ticket.priority)} 
                        fontSize="xx-small"
                        textTransform="uppercase"
                        fontWeight="600"
                      >
                        {ticket.priority}
                      </Badge>
                    )}
                    {ticket.tags && ticket.tags.length > 0 && (
                      <Badge colorScheme="gray" fontSize="xx-small" variant="outline">
                        {ticket.tags[0]}
                      </Badge>
                    )}
                  </HStack>
                </Box>
              </HStack>
            </Box>
          ))}
        </VStack>
        
        {/* Infinite scroll trigger */}
        <div ref={observerTarget} style={{ height: '20px' }} />
        
        {filteredTickets.length === 0 && (
          <Box textAlign="center" py={12}>
            <Text color="gray.500" fontSize="sm">
              No tickets match your filters
            </Text>
          </Box>
        )}
      </Box>
    </Box>
  )
}
