import { Box, VStack, HStack, Text, Avatar, Badge, Divider } from '@chakra-ui/react'
import { mockTickets } from '../../fixtures/tickets'
import { mockCustomers, mockAgents } from '../../fixtures/customers'
import { formatDistanceToNow } from 'date-fns'

interface ConversationHistoryProps {
  ticketId: string
}

export function ConversationHistory({ ticketId }: ConversationHistoryProps) {
  const ticket = mockTickets.find((t) => t.id === ticketId)
  if (!ticket) return <Text>Ticket not found</Text>

  const getAuthorInfo = (authorId: string, authorType: 'customer' | 'agent') => {
    if (authorType === 'customer') {
      const customer = mockCustomers.find((c) => c.id === authorId)
      return { name: customer?.name || 'Unknown', avatar: customer?.avatar }
    } else {
      const agent = mockAgents.find((a) => a.id === authorId)
      return { name: agent?.name || 'Unknown', avatar: agent?.avatar }
    }
  }

  return (
    <VStack align="stretch" spacing={4} p={4}>
      {ticket.conversationHistory.map((message) => {
        const author = getAuthorInfo(message.authorId, message.authorType)
        const isAgent = message.authorType === 'agent'

        return (
          <Box key={message.id}>
            <HStack align="start" spacing={3} mb={2}>
              <Avatar size="sm" name={author.name} src={author.avatar || undefined} />
              <Box flex="1">
                <HStack spacing={2} mb={1}>
                  <Text fontWeight="600" fontSize="sm">
                    {author.name}
                  </Text>
                  <Badge colorScheme={isAgent ? 'green' : 'blue'} fontSize="xs">
                    {isAgent ? 'Agent' : 'Customer'}
                  </Badge>
                  <Text fontSize="xs" color="gray.500">
                    {formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}
                  </Text>
                </HStack>
                <Text fontSize="sm" color="gray.700" whiteSpace="pre-wrap">
                  {message.content}
                </Text>
                {message.attachments && message.attachments.length > 0 && (
                  <VStack align="start" mt={2} spacing={1}>
                    {message.attachments.map((attachment) => (
                      <HStack key={attachment.id} spacing={2} fontSize="xs" color="brand.600">
                        <Text>📎 {attachment.filename}</Text>
                        <Text color="gray.500">({(attachment.size / 1024).toFixed(1)} KB)</Text>
                      </HStack>
                    ))}
                  </VStack>
                )}
              </Box>
            </HStack>
            <Divider />
          </Box>
        )
      })}
    </VStack>
  )
}
