import React from 'react';
import { Box, Text, Flex, Icon, Divider, VStack } from '@chakra-ui/react';
import { Monitor, Home, Users, BarChart } from 'lucide-react';

interface OpenWindowsSidebarProps {
  onSelectWindow: (window: string) => void;
  onBackToShortcuts: () => void;
  currentView: string;
}

const OpenWindowsSidebar: React.FC<OpenWindowsSidebarProps> = ({ onSelectWindow, onBackToShortcuts, currentView }) => {
  const openWindowItems = [
    { label: "Profit & Loss", view: "profit-loss", icon: BarChart },
    { label: "Report Center", view: "report-center", icon: Monitor },
    { label: "Customer Center: Auld...", view: "customer-center", icon: Users },
    { label: "Home", view: "home-open-window", icon: Home },
  ];

  return (
    <Box>
      <Box px={3} py={2} borderBottom="1px solid #10283F">
        <Text fontWeight="bold" fontSize="15px" color="#C7D2E0">
          Open Windows
        </Text>
      </Box>
      <VStack align="stretch" spacing={0} mt={1}>
        {openWindowItems.map((item) => (
          <Flex
            key={item.label}
            align="center"
            gap={2}
            px={4}
            py="13px"
            cursor="pointer"
            bg={currentView === item.view ? "#24486C" : "transparent"}
            _hover={{ bg: currentView === item.view ? "#24486C" : "#1D3C5B" }}
            color={currentView === item.view ? "#ffffff" : "#D1D5DB"}
            borderRadius="3px"
            onClick={() => onSelectWindow(item.view)}
            transition="background 0.2s"
          >
            <Icon as={item.icon} size={18} />
            <Text fontSize="15px">{item.label}</Text>
          </Flex>
        ))}
      </VStack>
      <Divider borderColor="#0f2235" my={3} />
      <Box pb={4}>
        <Flex
          align="center"
          px={4}
          py="7px"
          cursor="pointer"
          color="#D1D5DB"
          _hover={{ bg: "#1D3C5B" }}
          fontSize="15px"
          onClick={onBackToShortcuts}
        >
          <Text>My Shortcuts</Text>
        </Flex>
      </Box>
    </Box>
  );
};

export default OpenWindowsSidebar;
