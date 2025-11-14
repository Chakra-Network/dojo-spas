import { Box, VStack, HStack, Text, Button, Icon, Divider } from '@chakra-ui/react'
import { FiCheck, FiArrowRight } from 'react-icons/fi'
import { useApp } from '../../contexts/AppContext'

export function RightSidebar() {
  const { state } = useApp()
  
  const solvedThisWeek = state.tickets.filter((t: any) => t.status === 'solved').length
  const openTickets = state.tickets.filter((t: any) => 
    t.status === 'open' || t.status === 'new'
  ).length

  return (
    <Box
      w="320px"
      bg="white"
      borderLeft="1px"
      borderColor="gray.200"
      h="100%"
      overflowY="auto"
      p={4}
    >
      <VStack align="stretch" spacing={6}>
        {/* Setup Guide */}
        <Box>
          <Text fontSize="xs" fontWeight="600" color="gray.600" mb={3}>
            Setup guide
          </Text>
          
          <Box
            bg="gray.50"
            p={4}
            borderRadius="lg"
            borderWidth="1px"
            borderColor="gray.200"
          >
            <Text fontSize="sm" fontWeight="700" mb={4}>
              Workflow basics
            </Text>
            
            <VStack align="stretch" spacing={3}>
              <HStack spacing={2}>
                <Icon as={FiCheck} color="green.500" boxSize={4} />
                <Text fontSize="xs" flex="1">Connect email</Text>
                <Button size="xs" variant="link" colorScheme="blue">
                  Start
                </Button>
              </HStack>
              
              <HStack spacing={2}>
                <Icon as={FiCheck} color="green.500" boxSize={4} />
                <Text fontSize="xs" flex="1">Invite team</Text>
                <Button size="xs" variant="link" colorScheme="blue">
                  Start
                </Button>
              </HStack>
              
              <HStack spacing={2}>
                <Icon as={FiCheck} color="green.500" boxSize={4} />
                <Text fontSize="xs" flex="1">Set auto response</Text>
                <Button size="xs" variant="link" colorScheme="blue">
                  Start
                </Button>
              </HStack>
              
              <HStack spacing={2}>
                <Icon as={FiCheck} color="green.500" boxSize={4} />
                <Text fontSize="xs" flex="1">Add signature</Text>
                <Button size="xs" variant="link" colorScheme="blue">
                  View
                </Button>
              </HStack>
            </VStack>
            
            <Divider my={4} />
            
            <Box>
              <Text fontSize="xs" color="gray.600" mb={2}>
                Add more support channels
              </Text>
              <Button
                size="xs"
                variant="ghost"
                colorScheme="blue"
                rightIcon={<FiArrowRight />}
                fontSize="xs"
              >
                View all setup guides
              </Button>
            </Box>
          </Box>
        </Box>

        {/* Ticket Statistics */}
        <Box>
          <Text fontSize="xs" fontWeight="600" color="gray.600" mb={3}>
            Ticket statistics
          </Text>
          
          <Box>
            <Text fontSize="xs" color="gray.500" mb={1}>
              This week
            </Text>
            <Text fontSize="3xl" fontWeight="700" color="blue.600">
              {solvedThisWeek}
            </Text>
            <Text fontSize="sm" color="gray.600">
              Solved
            </Text>
          </Box>
        </Box>

        {/* Open Tickets */}
        <Box>
          <Text fontSize="xs" fontWeight="600" color="gray.600" mb={3}>
            Open tickets
          </Text>
          
          <Box>
            <HStack justify="space-between" mb={2}>
              <Text fontSize="3xl" fontWeight="700" color="blue.600">
                {openTickets}
              </Text>
            </HStack>
            <Text fontSize="sm" color="gray.600">
              Your groups
            </Text>
          </Box>
        </Box>

        {/* Updates */}
        <Box>
          <Text fontSize="xs" fontWeight="600" color="gray.600" mb={3}>
            Updates
          </Text>
          
          <Text fontSize="sm" color="gray.500">
            No recent updates.
          </Text>
        </Box>
      </VStack>
    </Box>
  )
}
