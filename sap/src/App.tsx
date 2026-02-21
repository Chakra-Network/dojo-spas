import { useEffect, useState } from 'react';
import {
  Box,
  Flex,
  VStack,
  Input,
  Text,
  Icon,
  HStack,
  IconButton,
} from '@chakra-ui/react';
import {
  Search,
  Home,
  ShoppingCart,
  CheckSquare,
  Activity,
  Menu as MenuIcon,
} from 'lucide-react';
import { initializeDojoState } from './dojo/state';
import { Dashboard } from './components/Dashboard/Dashboard';
import { Procurement } from './components/Procurement/Procurement';
import { TasksInbox } from './components/TasksInbox/TasksInbox';
import { Search as SearchPage } from './components/Search/Search';
import { AuditTrail } from './components/AuditTrail/AuditTrail';

type View = 'dashboard' | 'procurement' | 'tasks' | 'search' | 'audit';

function App() {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    initializeDojoState({});
    setIsInitialized(true);
  }, []);

  if (!isInitialized) return null;

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'procurement':
        return <Procurement />;
      case 'tasks':
        return <TasksInbox />;
      case 'search':
        return <SearchPage />;
      case 'audit':
        return <AuditTrail />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Box h="100vh" display="flex" flexDirection="column" bg="gray.100">
      {/* Header */}
      <Box
        bg="white"
        borderBottom="1px solid"
        borderColor="gray.200"
        px={6}
        py={4}
        boxShadow="sm"
      >
        <HStack justify="space-between">
          <HStack spacing={4}>
            <IconButton
              aria-label="Menu"
              icon={<MenuIcon size={20} />}
              variant="ghost"
              display={{ base: 'flex', md: 'none' }}
            />
            <Text fontSize="2xl" fontWeight="bold" color="blue.600">
              SAP ERP
            </Text>
          </HStack>
          <HStack>
            <Input
              placeholder="Global search..."
              w="300px"
              size="sm"
              onClick={() => setCurrentView('search')}
              cursor="pointer"
            />
            <IconButton
              aria-label="Search"
              icon={<Search size={18} />}
              size="sm"
              onClick={() => setCurrentView('search')}
            />
          </HStack>
        </HStack>
      </Box>

      <Flex flex="1" minH={0}>
        {/* Sidebar */}
        <Box
          bg="gray.800"
          color="white"
          w="250px"
          display={{ base: 'none', md: 'flex' }}
          flexDirection="column"
          borderRight="1px solid"
          borderColor="gray.700"
        >
          <VStack align="stretch" spacing={1} p={4}>
            <SidebarItem
              icon={Home}
              label="Dashboard"
              active={currentView === 'dashboard'}
              onClick={() => setCurrentView('dashboard')}
            />
            <SidebarItem
              icon={ShoppingCart}
              label="Procurement"
              active={currentView === 'procurement'}
              onClick={() => setCurrentView('procurement')}
            />
            <SidebarItem
              icon={CheckSquare}
              label="Tasks Inbox"
              active={currentView === 'tasks'}
              onClick={() => setCurrentView('tasks')}
            />
            <SidebarItem
              icon={Search}
              label="Search"
              active={currentView === 'search'}
              onClick={() => setCurrentView('search')}
            />
            <SidebarItem
              icon={Activity}
              label="Audit Trail"
              active={currentView === 'audit'}
              onClick={() => setCurrentView('audit')}
            />
          </VStack>
        </Box>

        {/* Main Content */}
        <Box flex="1" overflowY="auto">
          {renderView()}
        </Box>
      </Flex>
    </Box>
  );
}

const SidebarItem = ({
  icon,
  label,
  active,
  onClick,
}: {
  icon: any;
  label: string;
  active?: boolean;
  onClick?: () => void;
}) => (
  <Flex
    align="center"
    gap={3}
    px={4}
    py={3}
    cursor="pointer"
    bg={active ? 'blue.600' : 'transparent'}
    _hover={{ bg: active ? 'blue.600' : 'gray.700' }}
    borderRadius="md"
    onClick={onClick}
    transition="all 0.2s"
  >
    <Icon as={icon} boxSize={5} />
    <Text fontSize="md" fontWeight={active ? 'semibold' : 'normal'}>
      {label}
    </Text>
  </Flex>
);

export default App;
