import { Box, Container, Text, VStack } from '@chakra-ui/react'
import { QueueMetrics } from './QueueMetrics'
import { PerformanceStats } from './PerformanceStats'
import { useApp } from '../../contexts/AppContext'

export function Dashboard() {
  const { state } = useApp()
  
  const queueMetrics = {
    new: state.tickets.filter((t: any) => t.status === 'new').length,
    open: state.tickets.filter((t: any) => t.status === 'open').length,
    pending: state.tickets.filter((t: any) => t.status === 'pending').length,
    breachedSLA: state.tickets.filter((t: any) => t.slaBreachAt && new Date(t.slaBreachAt) < new Date()).length,
    totalToday: state.tickets.length,
  }

  const performanceStats = {
    resolved: state.tickets.filter((t: any) => t.status === 'solved' || t.status === 'closed').length,
    avgResponseTime: 12,
    avgResolutionTime: 4.5,
    satisfactionScore: 92,
    slaCompliance: 87,
  }

  return (
    <Box bg="gray.50" minH="100%" p={6}>
      <Container maxW="1440px">
        <VStack align="stretch" spacing={8}>
          <Box>
            <Text fontSize="2xl" fontWeight="700" mb={1}>
              Welcome back, {state.currentAgent?.name || 'Agent'}
            </Text>
            <Text color="gray.600" fontSize="md">
              Here's your support queue overview
            </Text>
          </Box>
          
          <QueueMetrics metrics={queueMetrics} />
          <PerformanceStats stats={performanceStats} />
        </VStack>
      </Container>
    </Box>
  )
}
