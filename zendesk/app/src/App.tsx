import { useState } from 'react'
import { Box, Flex } from '@chakra-ui/react'
import { Header, Sidebar, TicketsSidebar } from './components/layout'
import { TicketList, RightSidebar, CreateTicketModal } from './components/inbox'
import { TicketWorkspace } from './components/workspace'
import { Dashboard } from './components/dashboard'
import { MacroLibrary } from './components/macros'

type View = 'dashboard' | 'inbox' | 'workspace' | 'macros'

function App() {
  const [currentView, setCurrentView] = useState<View>('inbox')
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null)
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false)

  const handleTicketSelect = (ticketId: string) => {
    setSelectedTicketId(ticketId)
    setCurrentView('workspace')
  }

  const handleCloseWorkspace = () => {
    setSelectedTicketId(null)
    setCurrentView('inbox')
  }

  const handleOpenTicketModal = () => {
    setIsTicketModalOpen(true)
  }

  const handleCloseTicketModal = () => {
    setIsTicketModalOpen(false)
  }

  const renderMainContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />
      
      case 'macros':
        return <MacroLibrary />
      
      case 'workspace':
        if (!selectedTicketId) {
          setCurrentView('inbox') // Go back to inbox if no ticket is selected
          return null
        }
        return (
          <Box flex="1" overflow="hidden" display="flex">
            <TicketWorkspace
              key={selectedTicketId} // Add key to force re-mount on ticket change
              ticketId={selectedTicketId}
              onClose={handleCloseWorkspace}
            />
          </Box>
        )
      
      case 'inbox':
      default:
        return (
          <Box flex="1" overflow="hidden" display="flex">
            <TicketsSidebar />
            <Box flex="1" overflow="hidden">
              <TicketList onTicketSelect={handleTicketSelect} />
            </Box>
            <RightSidebar />
          </Box>
        )
    }
  }

  return (
    <Box h="100vh" display="flex" flexDirection="column">
      <Header onViewChange={setCurrentView} onOpenTicketModal={handleOpenTicketModal} />
      <Flex flex="1" overflow="hidden">
        <Sidebar onViewChange={setCurrentView} currentView={currentView} />
        {renderMainContent()}
      </Flex>
      <CreateTicketModal isOpen={isTicketModalOpen} onClose={handleCloseTicketModal} />
    </Box>
  )
}

export default App
