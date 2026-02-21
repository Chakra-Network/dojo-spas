import { Box, VStack, HStack, Text, Badge, Icon, Progress, Divider } from '@chakra-ui/react'
import { FiClock, FiAlertTriangle, FiCheckCircle, FiAlertCircle, FiUser, FiMessageSquare } from 'react-icons/fi'
import { formatDistanceToNow, differenceInHours, differenceInMinutes, format } from 'date-fns'
import { useApp } from '../../contexts/AppContext'

interface SLATrackerProps {
  ticketId: string
}

export function SLATracker({ ticketId }: SLATrackerProps) {
  const { state } = useApp()
  const ticket = state.tickets.find((t: any) => t.id === ticketId)
  
  if (!ticket) return <Text>Ticket not found</Text>

  const now = new Date()
  const createdAt = new Date(ticket.createdAt)
  const dueAt = ticket.dueAt ? new Date(ticket.dueAt) : null
  const slaBreachAt = ticket.slaBreachAt ? new Date(ticket.slaBreachAt) : null
  
  const isBreached = slaBreachAt && slaBreachAt < now
  const hoursElapsed = differenceInHours(now, createdAt)
  const minutesElapsed = differenceInMinutes(now, createdAt)
  const hoursUntilDue = dueAt ? differenceInHours(dueAt, now) : null
  const minutesUntilDue = dueAt ? differenceInMinutes(dueAt, now) : null
  const totalSLAHours = dueAt ? differenceInHours(dueAt, createdAt) : 24
  const progressPercent = dueAt ? Math.min((hoursElapsed / totalSLAHours) * 100, 100) : 0

  const getProgressColor = () => {
    if (isBreached) return 'red'
    if (progressPercent > 80) return 'orange'
    if (progressPercent > 60) return 'yellow'
    return 'green'
  }

  const formatTimeRemaining = () => {
    if (!minutesUntilDue) return 'N/A'
    if (minutesUntilDue < 0) {
      const absMinutes = Math.abs(minutesUntilDue)
      if (absMinutes < 60) return `${absMinutes}m overdue`
      return `${Math.floor(absMinutes / 60)}h ${absMinutes % 60}m overdue`
    }
    if (minutesUntilDue < 60) return `${minutesUntilDue}m`
    return `${Math.floor(minutesUntilDue / 60)}h ${minutesUntilDue % 60}m`
  }

  // Build comprehensive SLA timeline from all ticket activities
  const timelineEvents: Array<{
    id: string
    type: string
    timestamp: Date
    description: string
    agent: string
    metadata?: Record<string, any>
  }> = []

  // 1. Ticket created
  timelineEvents.push({
    id: 'created',
    type: 'created' as const,
    timestamp: createdAt,
    description: 'Ticket created',
    agent: 'System',
    metadata: { priority: ticket.priority, type: ticket.type }
  })

  // 2. Add assignment event if assigned
  if (ticket.assigneeId) {
    const assignee = state.agents.find((a: any) => a.id === ticket.assigneeId)
    const assignedTime = ticket.conversationHistory.length > 0 
      ? new Date(ticket.conversationHistory[0].createdAt)
      : new Date(ticket.updatedAt)
    
    timelineEvents.push({
      id: 'assigned',
      type: 'assigned' as const,
      timestamp: assignedTime,
      description: `Assigned to ${assignee?.name || 'agent'}`,
      agent: assignee?.name || 'System',
    })
  }

  // 3. Add all conversation messages as timeline events
  if (ticket.conversationHistory && ticket.conversationHistory.length > 0) {
    ticket.conversationHistory.forEach((msg: any, idx: number) => {
      const author = msg.authorType === 'agent' 
        ? state.agents.find((a: any) => a.id === msg.authorId)?.name || 'Agent'
        : state.customers.find((c: any) => c.id === msg.authorId)?.name || 'Customer'
      
      timelineEvents.push({
        id: `msg-${idx}`,
        type: msg.authorType === 'agent' ? 'agent_response' as const : 'customer_reply' as const,
        timestamp: new Date(msg.createdAt),
        description: msg.authorType === 'agent' 
          ? 'Agent responded' 
          : 'Customer replied',
        agent: author,
        metadata: { hasAttachments: msg.attachments?.length > 0 }
      })
    })
  }

  // 4. Add internal notes as timeline events
  if (ticket.internalNotes && ticket.internalNotes.length > 0) {
    ticket.internalNotes.forEach((note: any, idx: number) => {
      const author = state.agents.find((a: any) => a.id === note.authorId)?.name || 'Agent'
      timelineEvents.push({
        id: `note-${idx}`,
        type: 'internal_note' as const,
        timestamp: new Date(note.createdAt),
        description: 'Internal note added',
        agent: author,
      })
    })
  }

  // 5. Add SLA events from state (escalations, warnings, breaches)
  const ticketSLAEvents = state.slaEvents
    .filter((evt: any) => evt.ticketId === ticketId)
    .map((evt: any, idx: number) => ({
      id: `sla-event-${idx}`,
      type: evt.type,
      timestamp: new Date(evt.timestamp),
      description: evt.description,
      agent: evt.agentId ? state.agents.find((a: any) => a.id === evt.agentId)?.name || 'System' : 'System',
      metadata: evt.metadata
    }))
  
  timelineEvents.push(...ticketSLAEvents)

  // 6. Add SLA warning events based on time elapsed
  const warningThresholds = [0.5, 0.75, 0.9] // 50%, 75%, 90% of SLA time
  if (dueAt && totalSLAHours > 0) {
    warningThresholds.forEach((threshold, idx) => {
      const warningTime = new Date(createdAt.getTime() + (totalSLAHours * 60 * 60 * 1000 * threshold))
      if (warningTime < now) {
        timelineEvents.push({
          id: `auto-warning-${idx}`,
          type: 'warning' as const,
          timestamp: warningTime,
          description: `SLA warning: ${threshold * 100}% of time elapsed`,
          agent: 'System',
          metadata: { threshold, auto: true }
        })
      }
    })
  }

  // 7. Add status change events if ticket was updated
  if (ticket.status !== 'new' && ticket.updatedAt > ticket.createdAt) {
    timelineEvents.push({
      id: 'status-change',
      type: 'status_change' as const,
      timestamp: new Date(ticket.updatedAt),
      description: `Status changed to ${ticket.status}`,
      agent: 'System',
      metadata: { status: ticket.status }
    })
  }

  // Sort all events chronologically
  const sortedEvents = timelineEvents.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime())

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'breach': return FiAlertTriangle
      case 'created': return FiCheckCircle
      case 'assigned': return FiUser
      case 'agent_response': return FiMessageSquare
      case 'customer_reply': return FiMessageSquare
      case 'response': return FiMessageSquare
      case 'warning': return FiAlertCircle
      case 'escalation': return FiAlertTriangle
      case 'status_change': return FiClock
      case 'internal_note': return FiMessageSquare
      case 'macro_applied': return FiCheckCircle
      default: return FiClock
    }
  }

  const getEventColor = (type: string) => {
    switch (type) {
      case 'breach': return { bg: 'red.50', icon: 'red.500' }
      case 'created': return { bg: 'blue.50', icon: 'blue.500' }
      case 'assigned': return { bg: 'purple.50', icon: 'purple.500' }
      case 'agent_response': return { bg: 'green.50', icon: 'green.500' }
      case 'customer_reply': return { bg: 'blue.50', icon: 'blue.400' }
      case 'response': return { bg: 'green.50', icon: 'green.500' }
      case 'warning': return { bg: 'orange.50', icon: 'orange.500' }
      case 'escalation': return { bg: 'red.50', icon: 'red.600' }
      case 'status_change': return { bg: 'teal.50', icon: 'teal.500' }
      case 'internal_note': return { bg: 'gray.50', icon: 'gray.600' }
      case 'macro_applied': return { bg: 'cyan.50', icon: 'cyan.500' }
      default: return { bg: 'gray.50', icon: 'gray.500' }
    }
  }

  return (
    <Box p={4}>
      <VStack align="stretch" spacing={6}>
        {/* SLA Status Card */}
        <Box p={4} bg={isBreached ? 'red.50' : 'white'} borderRadius="lg" borderWidth="1px" borderColor={isBreached ? 'red.200' : 'gray.200'}>
          <HStack spacing={3} mb={3}>
            <Icon
              as={isBreached ? FiAlertTriangle : minutesUntilDue && minutesUntilDue < 120 ? FiAlertCircle : FiClock}
              boxSize={6}
              color={isBreached ? 'red.500' : minutesUntilDue && minutesUntilDue < 120 ? 'orange.500' : 'blue.500'}
            />
            <Text fontWeight="700" fontSize="lg">
              SLA Status
            </Text>
            <Badge colorScheme={isBreached ? 'red' : minutesUntilDue && minutesUntilDue < 120 ? 'orange' : 'green'} fontSize="md">
              {isBreached ? 'BREACHED' : minutesUntilDue && minutesUntilDue < 120 ? 'AT RISK' : 'ON TRACK'}
            </Badge>
          </HStack>

          <VStack align="stretch" spacing={2}>
            <HStack justify="space-between" fontSize="sm">
              <Text color="gray.600">Time Elapsed</Text>
              <Text fontWeight="600">{hoursElapsed}h {minutesElapsed % 60}m</Text>
            </HStack>
            {hoursUntilDue !== null && (
              <HStack justify="space-between" fontSize="sm">
                <Text color="gray.600">Time Remaining</Text>
                <Text fontWeight="600" color={minutesUntilDue && minutesUntilDue < 0 ? 'red.500' : minutesUntilDue && minutesUntilDue < 120 ? 'orange.500' : 'gray.700'}>
                  {formatTimeRemaining()}
                </Text>
              </HStack>
            )}
            {dueAt && (
              <HStack justify="space-between" fontSize="sm">
                <Text color="gray.600">Due Date</Text>
                <Text fontWeight="600">{format(dueAt, 'MMM d, yyyy HH:mm')}</Text>
              </HStack>
            )}
          </VStack>

          <Progress
            value={progressPercent}
            colorScheme={getProgressColor()}
            size="sm"
            mt={4}
            borderRadius="full"
          />
        </Box>

        <Divider />

        {/* SLA Timeline */}
        <Box>
          <Text fontWeight="600" fontSize="md" mb={4}>
            SLA Timeline
          </Text>
          <VStack align="stretch" spacing={4}>
            {sortedEvents.map((event, index) => {
              const colors = getEventColor(event.type)
              const isWarning = event.type === 'warning'
              const isEscalation = event.type === 'escalation'
              const isBreach = event.type === 'breach'
              
              return (
                <HStack 
                  key={event.id} 
                  align="start" 
                  spacing={3}
                  bg={(isWarning || isEscalation || isBreach) ? colors.bg : 'transparent'}
                  p={(isWarning || isEscalation || isBreach) ? 3 : 0}
                  borderRadius="md"
                  borderWidth={(isWarning || isEscalation || isBreach) ? "1px" : "0"}
                  borderColor={(isWarning || isEscalation || isBreach) ? colors.icon : 'transparent'}
                >
                  <Box
                    mt={1}
                    p={2}
                    bg={colors.bg}
                    borderRadius="full"
                    borderWidth={(isWarning || isEscalation || isBreach) ? "2px" : "1px"}
                    borderColor={(isWarning || isEscalation || isBreach) ? colors.icon : 'transparent'}
                  >
                    <Icon
                      as={getEventIcon(event.type)}
                      boxSize={4}
                      color={colors.icon}
                    />
                  </Box>
                  <Box flex="1">
                    <HStack justify="space-between" flexWrap="wrap">
                      <Text fontWeight={(isWarning || isEscalation || isBreach) ? "700" : "600"} fontSize="sm">
                        {event.description}
                      </Text>
                      <HStack spacing={1}>
                        {index === 0 && (
                          <Badge colorScheme="blue" fontSize="xs">
                            START
                          </Badge>
                        )}
                        {isEscalation && (
                          <Badge colorScheme="red" fontSize="xs">
                            ESCALATION
                          </Badge>
                        )}
                        {isWarning && (
                          <Badge colorScheme="orange" fontSize="xs">
                            WARNING
                          </Badge>
                        )}
                        {event.metadata?.hasAttachments && (
                          <Badge colorScheme="gray" fontSize="xs">
                            📎
                          </Badge>
                        )}
                      </HStack>
                    </HStack>
                    <Text fontSize="xs" color="gray.500">
                      {format(event.timestamp, 'MMM d, HH:mm')} · {formatDistanceToNow(event.timestamp, { addSuffix: true })}
                    </Text>
                    {event.agent && event.agent !== 'System' && (
                      <Text fontSize="xs" color="gray.400" mt={0.5}>
                        by {event.agent}
                      </Text>
                    )}
                  </Box>
                </HStack>
              )
            })}

            {dueAt && !isBreached && (
              <HStack align="start" spacing={3} opacity={0.6}>
                <Box mt={1} p={2} bg="gray.100" borderRadius="full">
                  <Icon as={FiClock} boxSize={4} color="gray.500" />
                </Box>
                <Box flex="1">
                  <HStack justify="space-between">
                    <Text fontWeight="600" fontSize="sm">
                      SLA Due Date
                    </Text>
                    <Badge colorScheme="gray" fontSize="xs">
                      TARGET
                    </Badge>
                  </HStack>
                  <Text fontSize="xs" color="gray.500">
                    {format(dueAt, 'MMM d, yyyy HH:mm')} · {formatDistanceToNow(dueAt, { addSuffix: true })}
                  </Text>
                </Box>
              </HStack>
            )}

            {isBreached && slaBreachAt && (
              <HStack align="start" spacing={3} bg="red.50" p={3} borderRadius="md" borderWidth="1px" borderColor="red.200">
                <Box mt={1} p={2} bg="red.100" borderRadius="full">
                  <Icon as={FiAlertTriangle} boxSize={4} color="red.600" />
                </Box>
                <Box flex="1">
                  <HStack justify="space-between">
                    <Text fontWeight="700" fontSize="sm" color="red.700">
                      SLA Target Breached
                    </Text>
                    <Badge colorScheme="red" fontSize="xs">
                      BREACH
                    </Badge>
                  </HStack>
                  <Text fontSize="xs" color="red.600">
                    {format(slaBreachAt, 'MMM d, yyyy HH:mm')} · {formatDistanceToNow(slaBreachAt, { addSuffix: true })}
                  </Text>
                </Box>
              </HStack>
            )}
          </VStack>
        </Box>
      </VStack>
    </Box>
  )
}
