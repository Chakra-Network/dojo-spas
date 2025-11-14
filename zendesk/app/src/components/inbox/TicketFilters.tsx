import { Box, HStack, Input, Select, Button, IconButton, Badge } from '@chakra-ui/react'
import { FiFilter, FiSearch, FiX } from 'react-icons/fi'
import { useState } from 'react'
import { TicketStatus, TicketPriority } from '../../types'

interface TicketFiltersProps {
  onFilterChange: (filters: any) => void
}

export function TicketFilters({ onFilterChange }: TicketFiltersProps) {
  const [status, setStatus] = useState<TicketStatus | ''>('')
  const [priority, setPriority] = useState<TicketPriority | ''>('')
  const [searchQuery, setSearchQuery] = useState('')

  const handleApplyFilters = () => {
    onFilterChange({
      status: status ? [status] : undefined,
      priority: priority ? [priority] : undefined,
      searchQuery: searchQuery || undefined,
    })
  }

  const handleClearFilters = () => {
    setStatus('')
    setPriority('')
    setSearchQuery('')
    onFilterChange({})
  }

  const hasActiveFilters = status || priority || searchQuery

  return (
    <Box bg="white" p={4} borderBottom="1px" borderColor="gray.200">
      <HStack spacing={3}>
        <Box flex="1" position="relative">
          <Input
            placeholder="Search tickets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleApplyFilters()}
            pl={10}
          />
          <Box position="absolute" left={3} top="50%" transform="translateY(-50%)">
            <FiSearch color="gray" />
          </Box>
        </Box>

        <Select
          placeholder="All statuses"
          value={status}
          onChange={(e) => setStatus(e.target.value as TicketStatus)}
          w="200px"
        >
          <option value="new">New</option>
          <option value="open">Open</option>
          <option value="pending">Pending</option>
          <option value="solved">Solved</option>
          <option value="closed">Closed</option>
        </Select>

        <Select
          placeholder="All priorities"
          value={priority}
          onChange={(e) => setPriority(e.target.value as TicketPriority)}
          w="200px"
        >
          <option value="urgent">Urgent</option>
          <option value="high">High</option>
          <option value="normal">Normal</option>
          <option value="low">Low</option>
        </Select>

        <Button
          leftIcon={<FiFilter />}
          colorScheme="brand"
          onClick={handleApplyFilters}
        >
          Apply
        </Button>

        {hasActiveFilters && (
          <IconButton
            aria-label="Clear filters"
            icon={<FiX />}
            variant="ghost"
            onClick={handleClearFilters}
          />
        )}

        {hasActiveFilters && (
          <Badge colorScheme="brand" fontSize="sm">
            Filters active
          </Badge>
        )}
      </HStack>
    </Box>
  )
}
