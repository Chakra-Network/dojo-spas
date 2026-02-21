import { Box, VStack, HStack, Text, Avatar, Badge, Divider, Icon, Collapse, Button } from '@chakra-ui/react'
import { FiMail, FiPhone, FiHome, FiClock, FiChevronDown, FiChevronUp } from 'react-icons/fi'
import { useApp } from '../../contexts/AppContext'
import { format, formatDistanceToNow } from 'date-fns'
import { useState } from 'react'

interface CustomerProfileProps {
  customerId: string
}

export function CustomerProfile({ customerId }: CustomerProfileProps) {
  const { state } = useApp()
  const [showHistory, setShowHistory] = useState(true)
  
  const customer = state.customers.find((c: any) => c.id === customerId)
  const customerTickets = state.tickets.filter((t: any) => t.customerId === customerId)
  
  if (!customer) return <Box p={4}><Text color="gray.500">Customer not found</Text></Box>

  const satisfactionColor = {
    good: 'green',
    neutral: 'yellow',
    bad: 'red',
  }

  return (
    <Box w="320px" bg="white" borderLeft="1px" borderColor="gray.200" overflowY="auto">
      <VStack align="stretch" spacing={0} divider={<Divider />}>
        {/* Customer Header */}
        <Box p={4}>
          <HStack spacing={3} mb={3}>
            <Avatar size="md" name={customer.name} src={customer.avatar || undefined} />
            <Box flex="1">
              <Text fontWeight="700" fontSize="md">
                {customer.name}
              </Text>
              {customer.company && (
                <HStack spacing={1} color="gray.600" fontSize="xs">
                  <Icon as={FiHome} boxSize={3} />
                  <Text>{customer.company}</Text>
                </HStack>
              )}
            </Box>
          </HStack>

          {/* Email */}
          <HStack spacing={2} fontSize="sm" mb={2}>
            <Icon as={FiMail} boxSize={4} color="gray.500" />
            <Text color="brand.600" fontSize="xs">{customer.email}</Text>
          </HStack>

          {/* Phone */}
          {customer.phone && (
            <HStack spacing={2} fontSize="sm" mb={2}>
              <Icon as={FiPhone} boxSize={4} color="gray.500" />
              <Text fontSize="xs">{customer.phone}</Text>
            </HStack>
          )}

          {/* Local time */}
          <HStack spacing={2} fontSize="sm">
            <Icon as={FiClock} boxSize={4} color="gray.500" />
            <Text fontSize="xs" color="gray.600">
              {format(new Date(), 'h:mm a')} local time
            </Text>
          </HStack>
        </Box>

        {/* Customer Stats */}
        <Box p={4}>
          <Text fontWeight="600" fontSize="xs" color="gray.700" mb={3}>
            Customer Stats
          </Text>
          <VStack align="stretch" spacing={2} fontSize="xs">
            <HStack justify="space-between">
              <Text color="gray.600">Total Tickets</Text>
              <Badge colorScheme="blue" fontSize="xx-small">{customerTickets.length}</Badge>
            </HStack>
            <HStack justify="space-between">
              <Text color="gray.600">Open Tickets</Text>
              <Badge colorScheme="red" fontSize="xx-small">
                {customerTickets.filter((t: any) => t.status === 'open' || t.status === 'new').length}
              </Badge>
            </HStack>
            <HStack justify="space-between">
              <Text color="gray.600">Satisfaction</Text>
              {customer.satisfaction ? (
                <Badge colorScheme={satisfactionColor[customer.satisfaction as keyof typeof satisfactionColor]} fontSize="xx-small">
                  {customer.satisfaction}
                </Badge>
              ) : (
                <Text color="gray.400" fontSize="xx-small">Not rated</Text>
              )}
            </HStack>
            <HStack justify="space-between">
              <Text color="gray.600">Customer Since</Text>
              <Text fontSize="xx-small">{format(new Date(customer.createdAt), 'MMM d, yyyy')}</Text>
            </HStack>
          </VStack>
        </Box>

        {/* Notes */}
        {customer.notes && (
          <Box p={4}>
            <Text fontWeight="600" fontSize="xs" color="gray.700" mb={2}>
              Notes
            </Text>
            <Text fontSize="xs" color="gray.600">
              {customer.notes}
            </Text>
          </Box>
        )}

        {/* Tags */}
        {customer.tags && customer.tags.length > 0 && (
          <Box p={4}>
            <Text fontWeight="600" fontSize="xs" color="gray.700" mb={2}>
              Tags
            </Text>
            <HStack spacing={1} flexWrap="wrap">
              {customer.tags.map((tag: string) => (
                <Badge key={tag} colorScheme="purple" variant="subtle" fontSize="xx-small">
                  {tag}
                </Badge>
              ))}
            </HStack>
          </Box>
        )}

        {/* Interaction History */}
        <Box p={4}>
          <HStack justify="space-between" mb={3} cursor="pointer" onClick={() => setShowHistory(!showHistory)}>
            <Text fontWeight="600" fontSize="xs" color="gray.700">
              Interaction history
            </Text>
            <Icon as={showHistory ? FiChevronUp : FiChevronDown} boxSize={3} />
          </HStack>
          
          <Collapse in={showHistory} animateOpacity>
            <VStack align="stretch" spacing={2}>
              {customerTickets.slice(0, 5).map((ticket: any) => (
                <Box
                  key={ticket.id}
                  p={2}
                  bg="gray.50"
                  borderRadius="md"
                  fontSize="xs"
                >
                  <HStack justify="space-between" mb={1}>
                    <Badge
                      colorScheme={ticket.status === 'open' || ticket.status === 'new' ? 'red' : 'gray'}
                      fontSize="xx-small"
                    >
                      ● {ticket.status}
                    </Badge>
                    <Text color="gray.500" fontSize="xx-small">
                      {formatDistanceToNow(new Date(ticket.createdAt), { addSuffix: true })}
                    </Text>
                  </HStack>
                  <Text fontWeight="600" fontSize="xs" noOfLines={1}>
                    {ticket.subject}
                  </Text>
                </Box>
              ))}
              
              {customerTickets.length === 0 && (
                <Text color="gray.500" fontSize="xs" textAlign="center" py={3}>
                  No interaction history
                </Text>
              )}
            </VStack>
          </Collapse>
        </Box>
      </VStack>
    </Box>
  )
}
