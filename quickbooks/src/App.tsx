import { useEffect, useState } from 'react';
import { Box, Flex, VStack, Button, Heading } from '@chakra-ui/react';
import { LayoutDashboard, FileText, Receipt, GitCompare } from 'lucide-react';
import { initializeDojoState, DojoState } from './dojo/state';
import { Dashboard } from './components/Dashboard/Dashboard';
import { Invoices } from './components/Invoices/Invoices';
import { Expenses } from './components/Expenses/Expenses';
import { Reconciliation } from './components/Reconciliation/Reconciliation';
import { AuditSidebar } from './components/AuditSidebar/AuditSidebar';

import invoicesData from './data/invoices.json';
import expensesData from './data/expenses.json';
import bankData from './data/bank.json';

type View = 'dashboard' | 'invoices' | 'expenses' | 'reconciliation';

function App() {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    initializeDojoState({
      invoices: invoicesData as unknown as DojoState['invoices'],
      expenses: expensesData as unknown as DojoState['expenses'],
      bankTransactions: bankData as unknown as DojoState['bankTransactions'],
      auditLog: [
        {
          id: 'audit-init',
          timestamp: new Date().toISOString(),
          action: 'SYSTEM_INIT',
          description: 'Application initialized with seed data',
        },
      ],
    });
    setIsInitialized(true);
  }, []);

  if (!isInitialized) {
    return null;
  }

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'invoices':
        return <Invoices />;
      case 'expenses':
        return <Expenses />;
      case 'reconciliation':
        return <Reconciliation />;
      default:
        return <Dashboard />;
    }
  };

  const menuItems = [
    { id: 'dashboard' as View, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'invoices' as View, label: 'Invoices', icon: FileText },
    { id: 'expenses' as View, label: 'Expenses', icon: Receipt },
    { id: 'reconciliation' as View, label: 'Reconciliation', icon: GitCompare },
  ];

  return (
    <Flex h="100vh" bg="gray.100">
      {/* Left Sidebar Navigation */}
      <Box w="250px" bg="gray.800" color="white" p={6}>
        <Heading size="md" mb={8} color="white">
          QuickBooks Clone
        </Heading>
        <VStack spacing={2} align="stretch">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                leftIcon={<Icon size={18} />}
                justifyContent="flex-start"
                variant={currentView === item.id ? 'solid' : 'ghost'}
                colorScheme={currentView === item.id ? 'blue' : 'gray'}
                onClick={() => setCurrentView(item.id)}
                _hover={{ bg: currentView === item.id ? 'blue.600' : 'gray.700' }}
              >
                {item.label}
              </Button>
            );
          })}
        </VStack>
      </Box>

      {/* Main Content */}
      <Box flex="1" overflowY="auto">
        {renderView()}
      </Box>

      {/* Right Audit Sidebar */}
      <AuditSidebar />
    </Flex>
  );
}

export default App;
