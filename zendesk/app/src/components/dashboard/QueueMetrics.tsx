import { Box, SimpleGrid, Stat, StatLabel, StatNumber, StatHelpText, Icon } from '@chakra-ui/react'
import { FiInbox, FiClock, FiAlertTriangle, FiCheckCircle } from 'react-icons/fi'

interface QueueMetricsProps {
  metrics?: {
    new: number
    open: number
    pending: number
    breachedSLA: number
    totalToday: number
  }
}

export function QueueMetrics({ metrics = { new: 12, open: 28, pending: 15, breachedSLA: 3, totalToday: 47 } }: QueueMetricsProps) {
  const cards = [
    { label: 'New Tickets', value: metrics.new, icon: FiInbox, color: 'purple.500', bg: 'purple.50' },
    { label: 'Open Tickets', value: metrics.open, icon: FiClock, color: 'brand.500', bg: 'brand.50' },
    { label: 'Pending Response', value: metrics.pending, icon: FiAlertTriangle, color: 'orange.500', bg: 'orange.50' },
    { label: 'SLA Breached', value: metrics.breachedSLA, icon: FiAlertTriangle, color: 'red.500', bg: 'red.50' },
  ]

  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={4} mb={6}>
      {cards.map((card) => (
        <Box
          key={card.label}
          p={5}
          bg="white"
          borderRadius="lg"
          borderWidth="1px"
          borderColor="gray.200"
          _hover={{ shadow: 'md', borderColor: card.color }}
          transition="all 0.2s"
        >
          <Stat>
            <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
              <StatLabel color="gray.600" fontSize="sm" fontWeight="500">
                {card.label}
              </StatLabel>
              <Box p={2} bg={card.bg} borderRadius="md">
                <Icon as={card.icon} boxSize={5} color={card.color} />
              </Box>
            </Box>
            <StatNumber fontSize="3xl" fontWeight="bold" color={card.color}>
              {card.value}
            </StatNumber>
            <StatHelpText mb={0}>Today's count: {metrics.totalToday}</StatHelpText>
          </Stat>
        </Box>
      ))}
    </SimpleGrid>
  )
}
