import { useState } from 'react';
import {
  Box,
  Container,
  Heading,
  HStack,
  VStack,
  Text,
  Badge,
  Input,
  Select,
  Card,
  CardBody,
  SimpleGrid,
  Icon,
  Flex,
} from '@chakra-ui/react';
import { Zap, MessageSquare, Tag, User, AlertCircle } from 'lucide-react';
import { useDojoState, Macro } from '../../dojo/state';

const MacrosLibrary = () => {
  const macros = useDojoState('macros');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Get unique categories
  const categories = Array.from(new Set(macros.map(m => m.category))).sort();

  // Filter macros
  const filteredMacros = macros.filter(macro => {
    const matchesSearch = searchQuery === '' ||
      macro.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      macro.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = categoryFilter === 'all' || macro.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  // Group macros by category
  const macrosByCategory = filteredMacros.reduce((acc, macro) => {
    if (!acc[macro.category]) {
      acc[macro.category] = [];
    }
    acc[macro.category].push(macro);
    return acc;
  }, {} as Record<string, Macro[]>);

  const getActionIcon = (actionType: string) => {
    switch (actionType) {
      case 'add_comment': return MessageSquare;
      case 'set_status': return AlertCircle;
      case 'set_priority': return AlertCircle;
      case 'add_tags': return Tag;
      case 'assign_to': return User;
      default: return Zap;
    }
  };

  const getActionLabel = (actionType: string) => {
    switch (actionType) {
      case 'add_comment': return 'Add Comment';
      case 'set_status': return 'Set Status';
      case 'set_priority': return 'Set Priority';
      case 'add_tags': return 'Add Tags';
      case 'assign_to': return 'Assign To';
      default: return actionType;
    }
  };

  return (
    <Container maxW="container.xl" py={8}>
      <Heading mb={6}>Macros Library</Heading>

      {/* Filters */}
      <Card mb={6}>
        <CardBody>
          <HStack spacing={4}>
            <Input
              placeholder="Search macros..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              w="250px"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </Select>
          </HStack>
          <Text fontSize="sm" color="gray.600" mt={3}>
            {filteredMacros.length} macros found
          </Text>
        </CardBody>
      </Card>

      {/* Macros by Category */}
      {Object.keys(macrosByCategory).length === 0 ? (
        <Card>
          <CardBody>
            <Text textAlign="center" color="gray.500" py={8}>
              No macros found matching your filters
            </Text>
          </CardBody>
        </Card>
      ) : (
        <VStack spacing={6} align="stretch">
          {Object.entries(macrosByCategory).map(([category, categoryMacros]) => (
            <Box key={category}>
              <Heading size="md" mb={4} color="gray.700">
                {category}
              </Heading>
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
                {categoryMacros.map(macro => (
                  <Card key={macro.id} _hover={{ shadow: 'md' }} transition="all 0.2s">
                    <CardBody>
                      <VStack align="stretch" spacing={3}>
                        <Flex justify="space-between" align="start">
                          <Box flex="1">
                            <HStack mb={1}>
                              <Icon as={Zap} boxSize={5} color="brand.500" />
                              <Text fontWeight="bold" fontSize="lg">
                                {macro.name}
                              </Text>
                            </HStack>
                            <Text fontSize="sm" color="gray.600" mb={3}>
                              {macro.description}
                            </Text>
                          </Box>
                        </Flex>

                        <Box>
                          <Text fontSize="xs" fontWeight="bold" color="gray.600" mb={2}>
                            ACTIONS ({macro.actions.length})
                          </Text>
                          <VStack align="stretch" spacing={1}>
                            {macro.actions.map((action, idx) => (
                              <HStack key={idx} fontSize="xs" color="gray.700">
                                <Icon as={getActionIcon(action.type)} boxSize={3} />
                                <Text fontWeight="medium">{getActionLabel(action.type)}</Text>
                                {action.type === 'add_comment' && (
                                  <Badge colorScheme="blue" fontSize="xs">
                                    {String(action.value).length} chars
                                  </Badge>
                                )}
                              </HStack>
                            ))}
                          </VStack>
                        </Box>

                        <HStack justify="space-between" pt={2} borderTop="1px solid" borderColor="gray.200">
                          <HStack fontSize="xs" color="gray.500">
                            <Text>Used {macro.usageCount} times</Text>
                          </HStack>
                          <Badge colorScheme="purple" fontSize="xs">
                            {macro.category}
                          </Badge>
                        </HStack>
                      </VStack>
                    </CardBody>
                  </Card>
                ))}
              </SimpleGrid>
            </Box>
          ))}
        </VStack>
      )}

      {/* Usage Stats */}
      <Card mt={6}>
        <CardBody>
          <Heading size="md" mb={4}>Most Used Macros</Heading>
          <VStack align="stretch" spacing={2}>
            {[...macros]
              .sort((a, b) => b.usageCount - a.usageCount)
              .slice(0, 5)
              .map(macro => (
                <Flex key={macro.id} justify="space-between" align="center" p={3} bg="gray.50" borderRadius="md">
                  <HStack>
                    <Icon as={Zap} boxSize={4} color="brand.500" />
                    <Text fontWeight="medium">{macro.name}</Text>
                    <Badge colorScheme="purple" fontSize="xs">{macro.category}</Badge>
                  </HStack>
                  <HStack>
                    <Text fontSize="sm" color="gray.600">
                      {macro.usageCount} uses
                    </Text>
                  </HStack>
                </Flex>
              ))}
          </VStack>
        </CardBody>
      </Card>
    </Container>
  );
};

export default MacrosLibrary;
