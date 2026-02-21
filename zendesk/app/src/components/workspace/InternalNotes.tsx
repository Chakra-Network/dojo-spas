import { Box, VStack, HStack, Text, Avatar, Textarea, Button, Divider } from '@chakra-ui/react'
import { useState } from 'react'
import { mockTickets } from '../../fixtures/tickets'
import { mockAgents } from '../../fixtures/customers'
import { formatDistanceToNow } from 'date-fns'

interface InternalNotesProps {
  ticketId: string
}

export function InternalNotes({ ticketId }: InternalNotesProps) {
  const [newNote, setNewNote] = useState('')
  const ticket = mockTickets.find((t) => t.id === ticketId)
  
  if (!ticket) return <Text>Ticket not found</Text>

  const handleAddNote = () => {
    if (!newNote.trim()) return
    console.log('Adding note:', newNote)
    // In a real app, this would call dojo.setState to add the note
    setNewNote('')
  }

  const getAgentName = (agentId: string) => {
    return mockAgents.find((a) => a.id === agentId)?.name || 'Unknown Agent'
  }

  return (
    <Box p={4}>
      <VStack align="stretch" spacing={4} mb={6}>
        <Textarea
          placeholder="Add an internal note (not visible to customers)..."
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          rows={3}
          bg="yellow.50"
          borderColor="yellow.200"
        />
        <Button
          colorScheme="brand"
          size="sm"
          onClick={handleAddNote}
          isDisabled={!newNote.trim()}
          alignSelf="flex-end"
        >
          Add Note
        </Button>
      </VStack>

      <Divider mb={4} />

      <VStack align="stretch" spacing={4}>
        {ticket.internalNotes.map((note) => (
          <Box key={note.id} bg="yellow.50" p={3} borderRadius="md" borderWidth="1px" borderColor="yellow.200">
            <HStack align="start" spacing={3}>
              <Avatar size="sm" name={getAgentName(note.authorId)} />
              <Box flex="1">
                <HStack spacing={2} mb={1}>
                  <Text fontWeight="600" fontSize="sm">
                    {getAgentName(note.authorId)}
                  </Text>
                  <Text fontSize="xs" color="gray.500">
                    {formatDistanceToNow(new Date(note.createdAt), { addSuffix: true })}
                  </Text>
                </HStack>
                <Text fontSize="sm" color="gray.700" whiteSpace="pre-wrap">
                  {note.content}
                </Text>
              </Box>
            </HStack>
          </Box>
        ))}

        {ticket.internalNotes.length === 0 && (
          <Text color="gray.500" fontSize="sm" textAlign="center" py={4}>
            No internal notes yet
          </Text>
        )}
      </VStack>
    </Box>
  )
}
