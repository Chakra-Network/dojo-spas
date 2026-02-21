import { Box, Flex, HStack, Avatar, Menu, MenuButton, MenuList, MenuItem, IconButton, Text, Button, Badge } from '@chakra-ui/react'
import { FiBell, FiSettings, FiHelpCircle, FiPhone, FiPlus } from 'react-icons/fi'
import { useApp } from '../../contexts/AppContext'

type View = 'dashboard' | 'inbox' | 'workspace' | 'macros'

interface HeaderProps {
  onViewChange: (view: View) => void
  onOpenTicketModal: () => void
}

export function Header({ onViewChange, onOpenTicketModal }: HeaderProps) {
  const { state } = useApp()
  const currentAgent = state.currentAgent
  
  return (
    <Box bg="white" borderBottom="1px" borderColor="gray.200" h="56px">
      <Flex h="100%" justify="space-between" align="center" px={4}>
        {/* Left section - Logo and Add button */}
        <HStack spacing={4}>
          <Box
            as="button"
            onClick={() => onViewChange('dashboard')}
            color="gray.700"
            fontWeight="600"
            fontSize="md"
            _hover={{ opacity: 0.8 }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
            </svg>
          </Box>
          
          <Button
            size="sm"
            variant="outline"
            leftIcon={<FiPlus />}
            onClick={onOpenTicketModal}
            borderColor="gray.300"
            color="gray.700"
            fontWeight="500"
            _hover={{ bg: 'gray.50' }}
          >
            add
          </Button>
        </HStack>

          {/* Right section - Actions and Profile */}
          <HStack spacing={2}>
            <IconButton
              aria-label="Search"
              icon={
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M12.5 11h-.79l-.28-.27A6.471 6.471 0 0013 6.5 6.5 6.5 0 106.5 13c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L17.49 16l-4.99-5zm-6 0C4.01 11 2 8.99 2 6.5S4.01 2 6.5 2 11 4.01 11 6.5 8.99 11 6.5 11z" fill="currentColor"/>
                </svg>
              }
              variant="ghost"
              size="sm"
              color="gray.600"
              _hover={{ bg: 'gray.100' }}
            />
            <HStack spacing={1} px={2} py={1} borderRadius="md" _hover={{ bg: 'gray.100' }} cursor="pointer">
              <Text fontSize="sm" color="gray.700" fontWeight="500">
                Conversations
              </Text>
              <Badge bg="gray.200" color="gray.700" borderRadius="full" fontSize="xs" px={2}>
                0
              </Badge>
            </HStack>
            <IconButton
              aria-label="Phone"
              icon={<FiPhone />}
              variant="ghost"
              size="sm"
              color="gray.600"
              _hover={{ bg: 'gray.100' }}
            />
            <IconButton
              aria-label="Notifications"
              icon={<FiBell />}
              variant="ghost"
              size="sm"
              color="gray.600"
              _hover={{ bg: 'gray.100' }}
            />
            <IconButton
              aria-label="Grid"
              icon={
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <rect x="2" y="2" width="6" height="6" rx="1" fill="currentColor"/>
                  <rect x="10" y="2" width="6" height="6" rx="1" fill="currentColor"/>
                  <rect x="2" y="10" width="6" height="6" rx="1" fill="currentColor"/>
                  <rect x="10" y="10" width="6" height="6" rx="1" fill="currentColor"/>
                </svg>
              }
              variant="ghost"
              size="sm"
              color="gray.600"
              _hover={{ bg: 'gray.100' }}
            />
            <IconButton
              aria-label="Help"
              icon={<FiHelpCircle />}
              variant="ghost"
              size="sm"
              color="gray.600"
              _hover={{ bg: 'gray.100' }}
            />
            <IconButton
              aria-label="Settings"
              icon={<FiSettings />}
              variant="ghost"
              size="sm"
              color="gray.600"
              _hover={{ bg: 'gray.100' }}
            />
            <Menu>
              <MenuButton 
                as={HStack} 
                cursor="pointer" 
                spacing={0}
                ml={1}
              >
                <Avatar 
                  size="sm" 
                  name={currentAgent.name} 
                  bg="brand.500"
                  w="32px"
                  h="32px"
                />
              </MenuButton>
              <MenuList fontSize="sm" minW="200px">
                <MenuItem isDisabled>
                  <Box>
                    <Text fontWeight="600">{currentAgent.name}</Text>
                    <Text fontSize="xs" color="gray.500">{currentAgent.email}</Text>
                  </Box>
                </MenuItem>
                <MenuItem>Profile settings</MenuItem>
                <MenuItem>View profile</MenuItem>
                <MenuItem color="red.500">Sign out</MenuItem>
              </MenuList>
            </Menu>
          </HStack>
        </Flex>
      </Box>
  )
}
