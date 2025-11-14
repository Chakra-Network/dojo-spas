import { Box, VStack, HStack, Text, Badge, Button, Icon, Input, SimpleGrid, useToast } from '@chakra-ui/react'
import { FiSearch, FiZap } from 'react-icons/fi'
import { useState } from 'react'
import { mockMacros, macroCategories } from '../../fixtures/macros'
import { useApp } from '../../contexts/AppContext'

export function MacroLibrary() {
  const { state, applyMacro } = useApp()
  const toast = useToast()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  // Get an open ticket to apply macro to (for demonstration)
  const sampleTicket = state.tickets.find((t: any) => t.status === 'open' || t.status === 'new')

  const filteredMacros = mockMacros.filter((macro) => {
    if (selectedCategory && macro.category !== selectedCategory) return false
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return macro.name.toLowerCase().includes(query) || 
             macro.description.toLowerCase().includes(query)
    }
    return true
  })

  const handleApplyMacro = (macroId: string) => {
    if (!sampleTicket) {
      toast({
        title: 'No ticket available',
        description: 'Please open a ticket first to apply macros',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      })
      return
    }

    applyMacro(sampleTicket.id, macroId)
    
    const macro = mockMacros.find(m => m.id === macroId)
    toast({
      title: 'Macro applied',
      description: `"${macro?.name}" was applied to ticket #${sampleTicket.id.split('-')[1]}`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    })
  }

  return (
    <Box p={6} bg="gray.50" minH="100%">
      <VStack align="stretch" spacing={6}>
        <HStack justify="space-between">
          <Text fontSize="2xl" fontWeight="700">
            Macro Library
          </Text>
          <Button colorScheme="brand" size="sm">
            Create Macro
          </Button>
        </HStack>

        {/* Search */}
        <Box position="relative">
          <Input
            placeholder="Search macros..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            pl={10}
            bg="white"
          />
          <Box position="absolute" left={3} top="50%" transform="translateY(-50%)">
            <FiSearch color="gray" />
          </Box>
        </Box>

        {/* Categories */}
        <HStack spacing={2} flexWrap="wrap">
          <Button
            size="sm"
            variant={selectedCategory === null ? 'solid' : 'outline'}
            colorScheme={selectedCategory === null ? 'brand' : 'gray'}
            onClick={() => setSelectedCategory(null)}
          >
            All Categories
          </Button>
          {macroCategories.map((category) => (
            <Button
              key={category.id}
              size="sm"
              variant={selectedCategory === category.name ? 'solid' : 'outline'}
              colorScheme={selectedCategory === category.name ? 'brand' : 'gray'}
              onClick={() => setSelectedCategory(category.name)}
            >
              {category.name} ({category.macroCount})
            </Button>
          ))}
        </HStack>

        {/* Macros Grid */}
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
          {filteredMacros.map((macro) => (
            <Box
              key={macro.id}
              p={4}
              bg="white"
              borderRadius="lg"
              borderWidth="1px"
              borderColor="gray.200"
              _hover={{ shadow: 'md', borderColor: 'brand.300' }}
              transition="all 0.2s"
              cursor="pointer"
            >
              <HStack justify="space-between" mb={2}>
                <HStack spacing={2}>
                  <Icon as={FiZap} color="brand.500" boxSize={5} />
                  <Text fontWeight="700" fontSize="md">
                    {macro.name}
                  </Text>
                </HStack>
                <Badge colorScheme="purple" fontSize="xs">
                  {macro.usageCount} uses
                </Badge>
              </HStack>

              <Text fontSize="sm" color="gray.600" mb={3} noOfLines={2}>
                {macro.description}
              </Text>

              <HStack spacing={2} mb={3} flexWrap="wrap">
                <Badge colorScheme="blue" fontSize="xs">
                  {macro.category}
                </Badge>
                {macro.actions.slice(0, 2).map((action, idx) => (
                  <Badge key={idx} variant="outline" fontSize="xs">
                    {action.type.replace('_', ' ')}
                  </Badge>
                ))}
                {macro.actions.length > 2 && (
                  <Badge variant="outline" fontSize="xs">
                    +{macro.actions.length - 2} more
                  </Badge>
                )}
              </HStack>

              <Button 
                size="sm" 
                colorScheme="brand" 
                width="100%"
                onClick={() => handleApplyMacro(macro.id)}
              >
                Apply Macro {sampleTicket && `to #${sampleTicket.id.split('-')[1]}`}
              </Button>
            </Box>
          ))}
        </SimpleGrid>

        {filteredMacros.length === 0 && (
          <Box textAlign="center" py={12}>
            <Text color="gray.500" fontSize="lg">
              No macros found
            </Text>
          </Box>
        )}
      </VStack>
    </Box>
  )
}
