import { Box, VStack, Icon, Tooltip } from '@chakra-ui/react'
import { FiHome, FiInbox, FiUsers, FiBarChart2, FiSettings } from 'react-icons/fi'

type View = 'dashboard' | 'inbox' | 'workspace' | 'macros'

interface SidebarProps {
  onViewChange: (view: View) => void
  currentView: View
}

export function Sidebar({ onViewChange, currentView }: SidebarProps) {
  const isTicketsActive = currentView === 'inbox' || currentView === 'workspace'
  const isDashboardActive = currentView === 'dashboard'

  const NavIcon = ({ 
    icon, 
    label, 
    isActive, 
    onClick,
  }: { 
    icon: any
    label: string
    isActive?: boolean
    onClick?: () => void
  }) => (
    <Tooltip label={label} placement="right" hasArrow>
      <Box
        as="button"
        w="100%"
        py={3}
        display="flex"
        justifyContent="center"
        alignItems="center"
        bg={isActive ? 'rgba(255,255,255,0.12)' : 'transparent'}
        _hover={{ bg: isActive ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.08)' }}
        borderLeft="3px solid"
        borderColor={isActive ? 'brand.400' : 'transparent'}
        transition="all 0.15s"
        onClick={onClick}
        color={isActive ? 'white' : 'rgba(255,255,255,0.7)'}
      >
        <Icon as={icon} boxSize={5} />
      </Box>
    </Tooltip>
  )

  return (
    <Box
      w="52px"
      bg="sidebar.dark"
      color="white"
      h="100%"
      borderRight="1px"
      borderColor="rgba(255,255,255,0.1)"
      display="flex"
      flexDirection="column"
    >
      <VStack spacing={0} pt={2} flex="1">
        <NavIcon
          icon={FiHome}
          label="Home"
          isActive={isDashboardActive}
          onClick={() => onViewChange('dashboard')}
        />
        <NavIcon
          icon={FiInbox}
          label="Tickets"
          isActive={isTicketsActive}
          onClick={() => onViewChange('inbox')}
        />
        <NavIcon
          icon={FiUsers}
          label="Customers"
          isActive={false}
        />
        <NavIcon
          icon={FiBarChart2}
          label="Reporting"
          isActive={false}
        />
      </VStack>
      
      <VStack spacing={0} pb={2}>
        <NavIcon
          icon={FiSettings}
          label="Admin"
          isActive={false}
        />
      </VStack>
    </Box>
  )
}
