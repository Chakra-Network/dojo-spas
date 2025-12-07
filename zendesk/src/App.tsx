import { Box, Flex } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard/Dashboard';
import TicketInbox from './components/TicketInbox/TicketInbox';
import TicketWorkspace from './components/TicketWorkspace/TicketWorkspace';
import MacrosLibrary from './components/MacrosLibrary/MacrosLibrary';

function App() {
  return (
    <Router>
      <Flex h="100vh" overflow="hidden">
        <Sidebar />
        <Box flex="1" overflow="auto" bg="gray.50">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/tickets" element={<TicketInbox />} />
            <Route path="/tickets/:ticketId" element={<TicketWorkspace />} />
            <Route path="/macros" element={<MacrosLibrary />} />
          </Routes>
        </Box>
      </Flex>
    </Router>
  );
}

export default App;
