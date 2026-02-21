import { Box, VStack, HStack, Text, Icon, Badge } from '@chakra-ui/react'
import { FiInbox, FiUsers, FiClock } from 'react-icons/fi'
import { useApp } from '../../contexts/AppContext'

export function TicketsSidebar() {
  const { state } = useApp()
  const tickets = state.tickets
  
  const ticketsCount = tickets.filter((t: any) => t.status === 'open' || t.status === 'new').length

  const NavItem = ({ 
    icon, 
    label, 
    count, 
    isActive = false,
  }: { 
    icon: any
    label: string
    count?: number
    isActive?: boolean
  }) => (
    <Box
      as="button"
      px={4}
      py={2.5}
      bg={isActive ? 'gray.100' : 'transparent'}
      _hover={{ bg: isActive ? 'gray.100' : 'gray.50' }}
      textAlign="left"
      transition="all 0.15s"
      w="100%"
      borderRadius="md"
    >
      <HStack spacing={3} justify="space-between">
        <HStack spacing={3}>
          <Icon as={icon} boxSize={4} color={isActive ? 'brand.500' : 'gray.600'} />
          <Text fontWeight={isActive ? '600' : '500'} fontSize="sm" color={isActive ? 'gray.900' : 'gray.700'}>
            {label}
          </Text>
        </HStack>
        {count !== undefined && count > 0 && (
          <Badge 
            bg="gray.200" 
            color="gray.700" 
            fontSize="xs" 
            borderRadius="full" 
            px={2}
            py={0.5}
            fontWeight="600"
          >
            {count}
          </Badge>
        )}
      </HStack>
    </Box>
  )

  return (
    <Box
      w="270px"
      bg="white"
      h="100%"
      borderRight="1px"
      borderColor="gray.200"
      overflowY="auto"
      css={{
        '&::-webkit-scrollbar': {
          width: '6px',
        },
        '&::-webkit-scrollbar-track': {
          background: 'transparent',
        },
        '&::-webkit-scrollbar-thumb': {
          background: '#d1d5db',
          borderRadius: '3px',
          '&:hover': {
            background: '#9ca3af',
          }
        },
      }}
    >
      <VStack align="stretch" spacing={0} p={3}>
        {/* Your work section */}
        <Box mb={4}>
          <Text
            px={2}
            py={2}
            fontSize="xs"
            fontWeight="700"
            color="gray.500"
            textTransform="uppercase"
            letterSpacing="wide"
          >
            Your work
          </Text>
          
          <VStack align="stretch" spacing={1}>
            <NavItem
              icon={FiInbox}
              label="Tickets"
              count={ticketsCount}
              isActive={true}
            />
          </VStack>
        </Box>

        {/* Shared work section */}
        <Box mb={4}>
          <Text
            px={2}
            py={2}
            fontSize="xs"
            fontWeight="700"
            color="gray.500"
            textTransform="uppercase"
            letterSpacing="wide"
          >
            Shared work
          </Text>
          
          <VStack align="stretch" spacing={1}>
            <NavItem
              icon={FiUsers}
              label="CC'd"
              count={0}
              isActive={false}
            />
            <NavItem
              icon={FiUsers}
              label="Following"
              count={0}
              isActive={false}
            />
          </VStack>
        </Box>

        {/* Completed work section */}
        <Box>
          <Text
            px={2}
            py={2}
            fontSize="xs"
            fontWeight="700"
            color="gray.500"
            textTransform="uppercase"
            letterSpacing="wide"
          >
            Completed work
          </Text>
          
          <VStack align="stretch" spacing={1}>
            <NavItem
              icon={FiClock}
              label="Last 30 days"
              isActive={false}
            />
          </VStack>
        </Box>
      </VStack>
    </Box>
  )
}
