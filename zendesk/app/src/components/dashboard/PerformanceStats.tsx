import { Box, SimpleGrid, Stat, StatLabel, StatNumber, StatHelpText, Progress, Icon, HStack, Text } from '@chakra-ui/react'
import { FiCheckCircle, FiClock, FiTrendingUp, FiAward } from 'react-icons/fi'

interface PerformanceStatsProps {
  stats?: {
    resolved: number
    avgResponseTime: number
    avgResolutionTime: number
    satisfactionScore: number
    slaCompliance: number
  }
}

export function PerformanceStats({ 
  stats = { 
    resolved: 23, 
    avgResponseTime: 12, 
    avgResolutionTime: 4.5, 
    satisfactionScore: 92, 
    slaCompliance: 87 
  } 
}: PerformanceStatsProps) {
  return (
    <Box>
      <Text fontSize="lg" fontWeight="600" mb={4} px={1}>
        Your Performance Today
      </Text>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
        <Box p={5} bg="white" borderRadius="lg" borderWidth="1px" borderColor="gray.200">
          <Stat>
            <HStack spacing={3} mb={2}>
              <Box p={2} bg="green.50" borderRadius="md">
                <Icon as={FiCheckCircle} boxSize={5} color="green.500" />
              </Box>
              <StatLabel color="gray.600" fontSize="sm" fontWeight="500">
                Tickets Resolved
              </StatLabel>
            </HStack>
            <StatNumber fontSize="3xl" fontWeight="bold" color="green.500">
              {stats.resolved}
            </StatNumber>
            <StatHelpText>Great work today!</StatHelpText>
          </Stat>
        </Box>

        <Box p={5} bg="white" borderRadius="lg" borderWidth="1px" borderColor="gray.200">
          <Stat>
            <HStack spacing={3} mb={2}>
              <Box p={2} bg="blue.50" borderRadius="md">
                <Icon as={FiClock} boxSize={5} color="blue.500" />
              </Box>
              <StatLabel color="gray.600" fontSize="sm" fontWeight="500">
                Avg Response Time
              </StatLabel>
            </HStack>
            <StatNumber fontSize="3xl" fontWeight="bold" color="blue.500">
              {stats.avgResponseTime}m
            </StatNumber>
            <StatHelpText>Target: &lt; 15 minutes</StatHelpText>
          </Stat>
        </Box>

        <Box p={5} bg="white" borderRadius="lg" borderWidth="1px" borderColor="gray.200">
          <Stat>
            <HStack spacing={3} mb={2}>
              <Box p={2} bg="purple.50" borderRadius="md">
                <Icon as={FiTrendingUp} boxSize={5} color="purple.500" />
              </Box>
              <StatLabel color="gray.600" fontSize="sm" fontWeight="500">
                Customer Satisfaction
              </StatLabel>
            </HStack>
            <StatNumber fontSize="3xl" fontWeight="bold" color="purple.500">
              {stats.satisfactionScore}%
            </StatNumber>
            <Progress value={stats.satisfactionScore} colorScheme="purple" size="sm" mt={2} borderRadius="full" />
          </Stat>
        </Box>

        <Box p={5} bg="white" borderRadius="lg" borderWidth="1px" borderColor="gray.200">
          <Stat>
            <HStack spacing={3} mb={2}>
              <Box p={2} bg="orange.50" borderRadius="md">
                <Icon as={FiAward} boxSize={5} color="orange.500" />
              </Box>
              <StatLabel color="gray.600" fontSize="sm" fontWeight="500">
                SLA Compliance
              </StatLabel>
            </HStack>
            <StatNumber fontSize="3xl" fontWeight="bold" color="orange.500">
              {stats.slaCompliance}%
            </StatNumber>
            <Progress value={stats.slaCompliance} colorScheme="orange" size="sm" mt={2} borderRadius="full" />
          </Stat>
        </Box>
      </SimpleGrid>
    </Box>
  )
}
