import { Box, VStack, Text, Icon, Flex, Avatar, Badge } from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Inbox, Zap } from 'lucide-react';
import { useDojoState } from '../dojo/state';

const Sidebar = () => {
  const location = useLocation();
  const currentAgent = useDojoState('currentAgent');
  const queueMetrics = useDojoState('queueMetrics');

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/tickets', label: 'Tickets', icon: Inbox, badge: queueMetrics.newTickets },
    { path: '/macros', label: 'Macros', icon: Zap },
  ];

  return (
    <Box
      w="240px"
      bg="gray.800"
      color="white"
      h="100vh"
      display="flex"
      flexDirection="column"
    >
      {/* Logo */}
      <Flex p={4} alignItems="center" borderBottom="1px solid" borderColor="gray.700">
        <Text fontSize="xl" fontWeight="bold">
          ZenDesk
        </Text>
      </Flex>

      {/* Navigation */}
      <VStack spacing={1} align="stretch" flex="1" p={3}>
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + '/');
          return (
            <Link key={item.path} to={item.path}>
              <Flex
                align="center"
                p={3}
                borderRadius="md"
                bg={isActive ? 'brand.600' : 'transparent'}
                _hover={{ bg: isActive ? 'brand.600' : 'gray.700' }}
                cursor="pointer"
                transition="all 0.2s"
              >
                <Icon as={item.icon} boxSize={5} mr={3} />
                <Text flex="1">{item.label}</Text>
                {item.badge && item.badge > 0 && (
                  <Badge colorScheme="red" borderRadius="full">
                    {item.badge}
                  </Badge>
                )}
              </Flex>
            </Link>
          );
        })}
      </VStack>

      {/* User Profile */}
      {currentAgent && (
        <Flex
          p={4}
          borderTop="1px solid"
          borderColor="gray.700"
          alignItems="center"
        >
          <Avatar size="sm" name={currentAgent.name} mr={3} />
          <Box flex="1">
            <Text fontSize="sm" fontWeight="medium">
              {currentAgent.name}
            </Text>
            <Flex alignItems="center" mt={1}>
              <Box
                w={2}
                h={2}
                borderRadius="full"
                bg={currentAgent.status === 'online' ? 'green.400' : currentAgent.status === 'away' ? 'yellow.400' : 'gray.400'}
                mr={2}
              />
              <Text fontSize="xs" color="gray.400" textTransform="capitalize">
                {currentAgent.status}
              </Text>
            </Flex>
          </Box>
        </Flex>
      )}
    </Box>
  );
};

export default Sidebar;
