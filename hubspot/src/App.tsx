import { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  VStack,
  Text,
  Icon,
  Heading,
} from '@chakra-ui/react';
import {
  LayoutDashboard,
  Target,
  Mail,
  Users,
  Activity,
} from 'lucide-react';
import { initializeDojoState } from './dojo/state';
import { Dashboard } from './components/Dashboard/Dashboard';
import { CampaignManager } from './components/Campaigns/CampaignManager';
import { EmailDesigner } from './components/EmailDesigner/EmailDesigner';
import { ContactsCRM } from './components/Contacts/ContactsCRM';
import { AutomationLog } from './components/AutomationLog/AutomationLog';

type View = 'dashboard' | 'campaigns' | 'emails' | 'contacts' | 'automation';

function App() {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const loadDojoData = async () => {
      initializeDojoState({});
      setIsInitialized(true);
    };

    loadDojoData();
  }, []);

  if (!isInitialized) return null;

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'campaigns':
        return <CampaignManager />;
      case 'emails':
        return <EmailDesigner />;
      case 'contacts':
        return <ContactsCRM />;
      case 'automation':
        return <AutomationLog />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Box h="100vh" display="flex" flexDirection="column" bg="gray.50">
      {/* Header */}
      <Box bg="orange.500" color="white" px={6} py={4} boxShadow="md">
        <Heading size="md">HubSpot Marketing</Heading>
      </Box>

      <Flex flex="1" minH={0}>
        {/* Sidebar */}
        <Box
          bg="white"
          w="240px"
          borderRight="1px solid"
          borderColor="gray.200"
          boxShadow="sm"
        >
          <VStack align="stretch" spacing={1} py={4}>
            <SidebarItem
              icon={LayoutDashboard}
              label="Dashboard"
              active={currentView === 'dashboard'}
              onClick={() => setCurrentView('dashboard')}
            />
            <SidebarItem
              icon={Target}
              label="Campaigns"
              active={currentView === 'campaigns'}
              onClick={() => setCurrentView('campaigns')}
            />
            <SidebarItem
              icon={Mail}
              label="Email Designer"
              active={currentView === 'emails'}
              onClick={() => setCurrentView('emails')}
            />
            <SidebarItem
              icon={Users}
              label="Contacts"
              active={currentView === 'contacts'}
              onClick={() => setCurrentView('contacts')}
            />
            <SidebarItem
              icon={Activity}
              label="Automation Log"
              active={currentView === 'automation'}
              onClick={() => setCurrentView('automation')}
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
    px={6}
    py={3}
    cursor="pointer"
    bg={active ? 'orange.50' : 'transparent'}
    borderLeft="4px solid"
    borderColor={active ? 'orange.500' : 'transparent'}
    _hover={{ bg: active ? 'orange.50' : 'gray.50' }}
    color={active ? 'orange.600' : 'gray.700'}
    fontWeight={active ? 'semibold' : 'normal'}
    onClick={onClick}
    transition="all 0.2s"
  >
    <Icon as={icon} boxSize={5} />
    <Text fontSize="sm">{label}</Text>
  </Flex>
);

export default App;
