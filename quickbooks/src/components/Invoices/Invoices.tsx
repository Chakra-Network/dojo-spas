import { useState } from 'react';
import {
  Box,
  Button,
  HStack,
  Select,
  Flex,
  Text,
} from '@chakra-ui/react';
import { useDojoState, dojo, Invoice, Expense, Customer } from '../../dojo/state';
import { InvoiceDetailModal } from './InvoiceDetailModal';

interface TableRowData {
  id: string;
  customerName: string;
  type: string;
  time: number;
  expenses: number;
  mileage: number;
  items: number;
  amount: number;
  openBalance: number;
  status: 'Open' | 'Paid';
  originalData: Invoice | Expense; 
}

export function Invoices() {
  const invoices: Invoice[] = useDojoState('invoices');
  const expenses: Expense[] = useDojoState('expenses');
  const customers: Customer[] = useDojoState('customers'); // Used to get customer names

  const [filterCustomer, setFilterCustomer] = useState<'all' | string>('all');
  const [filterType, setFilterType] = useState<'all' | 'Time & Expense' | 'Invoice'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'paid' | 'unpaid'>('all');
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Combine invoices and expenses into a single data structure for the table
  const combinedData: TableRowData[] = [];

  invoices.forEach((invoice: Invoice) => {
    combinedData.push({
      id: invoice.id,
      customerName: invoice.clientName,
      type: 'Invoice',
      time: 0,
      expenses: 0,
      mileage: 0,
      items: invoice.lineItems.length,
      amount: invoice.amount,
      openBalance: invoice.status === 'unpaid' ? invoice.amount : 0,
      status: invoice.status === 'unpaid' ? 'Open' : 'Paid',
      originalData: invoice,
    });
  });

  expenses.forEach((expense: Expense) => {
    combinedData.push({
      id: expense.id,
      customerName: 'N/A', // Expenses aren't directly tied to customers in the same way invoices are
      type: 'Time & Expense',
      time: 0, // Assuming no time tracking for expenses directly
      expenses: expense.amount,
      mileage: 0,
      items: 1, // Each expense is one item
      amount: expense.amount,
      openBalance: expense.amount, // Assuming expenses are always 'open' until processed
      status: 'Open',
      originalData: expense,
    });
  });

  // Calculate summary values
  const unbilledEstimates = 0; // The image shows 861,433.75 for estimates, which isn't directly from invoices or expenses.
  const timeAndExpensesTotal = expenses.reduce((sum: number, exp: Expense) => sum + exp.amount, 0); // Assuming all expenses are 'Time & Expenses'
  const unpaidInvoices = invoices.filter((inv: Invoice) => inv.status === 'unpaid').reduce((sum: number, inv: Invoice) => sum + inv.amount, 0);
  const overdueInvoices = invoices.filter((inv: Invoice) => inv.status === 'unpaid' && new Date(inv.dueDate) < new Date()).reduce((sum: number, inv: Invoice) => sum + inv.amount, 0);
  const paidLast30Days = invoices.filter((inv: Invoice) => inv.status === 'paid' && new Date(inv.createdAt) > new Date(new Date().setDate(new Date().getDate() - 30))).reduce((sum: number, inv: Invoice) => sum + inv.amount, 0);

  // Filter combined data
  const filteredData = combinedData
    .filter((row: TableRowData) => {
      if (filterStatus === 'all') return true;
      if ('status' in row.originalData) {
        // Convert row.originalData.status (which can be 'paid' or 'unpaid') to match filterStatus for consistency
        const originalStatus = (row.originalData as Invoice).status; // Assuming only Invoices have 'paid'/'unpaid' status for now
        return originalStatus === filterStatus;
      }
      return false;
    })
    .filter((row: TableRowData) => {
      if (filterCustomer === 'all') return true;
      if (row.type === 'Time & Expense') return true; // Always show expenses
      return row.customerName === filterCustomer;
    })
    .filter((row: TableRowData) => filterType === 'all' ? true : row.type === filterType);

  const handleMarkAsPaid = (invoice: Invoice) => {
    const updated = invoices.map((inv) =>
      inv.id === invoice.id ? { ...inv, status: 'paid' as const } : inv
    );
    dojo.setState('invoices', updated, `Marked invoice ${invoice.id} as paid`);
  };

  const handleViewDetails = (data: Invoice | Expense) => {
    if ((data as Invoice).clientName) {
      setSelectedInvoice(data as Invoice);
      setIsModalOpen(true);
    } else {
      // Handle expense detail view if needed
      console.log("View Expense Details:", data);
    }
  };

  const handleSendReminder = (invoice: Invoice) => {
    const updatedInvoices = invoices.map((inv) =>
      inv.id === invoice.id ? { ...inv, lastReminderSent: Date.now() } : inv
    );
    dojo.setState(
      'invoices',
      updatedInvoices,
      `Sent payment reminder for invoice ${invoice.id} to ${invoice.clientName}`
    );
  };

  const handleEditLineItems = (invoiceId: string, updatedLineItems: { description: string; quantity: number; rate: number }[]) => {
    const updatedInvoices = invoices.map((inv) =>
      inv.id === invoiceId ? { ...inv, lineItems: updatedLineItems, amount: updatedLineItems.reduce((sum, item) => sum + item.quantity * item.rate, 0) } : inv
    );
    dojo.setState('invoices', updatedInvoices, `Edited line items for invoice ${invoiceId}`);
  };

  const handleConvertToBill = (expense: Expense) => {
    const newInvoice: Invoice = {
      id: `inv-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      clientName: expense.description, // Or a more sophisticated way to derive client name
      amount: expense.amount,
      status: 'unpaid',
      dueDate: new Date(new Date().setDate(new Date().getDate() + 30)).toISOString().split('T')[0],
      lineItems: [{ description: expense.description, quantity: 1, rate: expense.amount }],
      createdAt: new Date().toISOString().split('T')[0],
    };

    const updatedInvoices = [...invoices, newInvoice];
    dojo.setState('invoices', updatedInvoices, `Converted expense ${expense.id} to invoice ${newInvoice.id}`);

    const updatedExpenses = expenses.map((exp) =>
      exp.id === expense.id ? { ...exp, isBilled: true } : exp
    );
    dojo.setState('expenses', updatedExpenses, `Marked expense ${expense.id} as billed`);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedInvoice(null);
  };

  const customerNames = Array.from(new Set(customers.map((c: Customer) => c.name)));
  const totalAmountInTable = filteredData.reduce((sum: number, row: TableRowData) => sum + row.amount, 0);

  return (
    <Box bg="white" minH="100vh" p={0} color="white" fontSize="13px" fontFamily="Arial, sans-serif" >
      {/* Top Summary Cards */}
      <Flex bg="white" p={4} justify="space-around" align="center" borderBottom="1px solid #555">
        <SummaryCard label="UNBILLED" value={unbilledEstimates.toFixed(2)} count="3 ESTIMATES" color="#6b46c1" />
        <SummaryCard label="TIME & EXPENSES" value={timeAndExpensesTotal.toFixed(2)} count="16 TIME & EXPENSES" color="#4299e1" />
        <SummaryCard label="UNPAID" value={unpaidInvoices.toFixed(2)} count="5 OPEN INVOICES" color="#f6ad55" />
        <SummaryCard label="OVERDUE" value={overdueInvoices.toFixed(2)} count="1 OVERDUE" color="#e53e3e" />
        <SummaryCard label="PAID" value={paidLast30Days.toFixed(2)} count="8 PAID LAST 30 DAYS" color="#48bb78" />
      </Flex>

      {/* Filter Bar */}
      <Flex bg="white"  p={2} align="center" justify="space-between" borderBottom="1px solid #777">
        <HStack spacing={2}>
          <Text style={{color: "black"}}>CUSTOMER/JOB</Text>
          <Select style={{color: "black"}} w="150px" size="sm" bg="white" border="1px solid #777" color="white" onChange={(e) => setFilterCustomer(e.target.value as 'all' | string)}>
            <option value="all">All</option>
            {customerNames.map((customer: string) => (
              <option key={customer} value={customer}>{customer}</option>
            ))}
          </Select>
          <Text style={{color: "black"}}>TYPE</Text>
          <Select style={{color: "black"}} w="150px" size="sm" bg="white" border="1px solid #777" color="white" onChange={(e) => setFilterType(e.target.value as 'all' | 'Time & Expense' | 'Invoice')}>
            <option value="all">All</option>
            <option value="Invoice">Invoice</option>
            <option value="Time & Expense">Time & Expense</option>
          </Select>
          <Text style={{color: "black"}}>STATUS</Text>
          <Select style={{color: "black"}} w="120px" size="sm" bg="white" border="1px solid #777" color="white" onChange={(e) => setFilterStatus(e.target.value === 'Open' ? 'unpaid' : e.target.value === 'Paid' ? 'paid' : 'all')}>
            <option value="all">All</option>
            <option value="Open">Open</option>
            <option value="Paid">Paid</option>
          </Select>
          <Text style={{color: "black"}}>ITEMS</Text>
          <Select style={{color: "black"}} w="120px" size="sm" bg="white" border="1px solid #777" color="white">
            <option value="all">All</option>
          </Select>
        </HStack>
        <Button size="sm" bg="#777777" color="white" _hover={{ bg: "#888888" }}>Clear / Show All</Button>
      </Flex> 

      {/* Main Table */}
      <Box bg="#444444" p={0} flex="1" overflowY="auto">
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: 'white', color: "black", borderBottom: '1px solid #777' }}>
              <th style={{ padding: '8px', textAlign: 'left', borderRight: '1px solid #777' }}><input type="checkbox" /></th>
              <th style={{ padding: '8px', textAlign: 'left', borderRight: '1px solid #777' }}>CUSTOMER:JOB</th>
              <th style={{ padding: '8px', textAlign: 'left', borderRight: '1px solid #777' }}>TYPE</th>
              <th style={{ padding: '8px', textAlign: 'right', borderRight: '1px solid #777' }}>TIME</th>
              <th style={{ padding: '8px', textAlign: 'right', borderRight: '1px solid #777' }}>EXPENSES</th>
              <th style={{ padding: '8px', textAlign: 'right', borderRight: '1px solid #777' }}>MILEAGE</th>
              <th style={{ padding: '8px', textAlign: 'right', borderRight: '1px solid #777' }}>ITEMS</th>
              <th style={{ padding: '8px', textAlign: 'right', borderRight: '1px solid #777' }}>AMOUNT</th>
              <th style={{ padding: '8px', textAlign: 'right', borderRight: '1px solid #777' }}>OPEN BALANCE</th>
              <th style={{ padding: '8px', textAlign: 'left', borderRight: '1px solid #777' }}>STATUS</th>
              <th style={{ padding: '8px', textAlign: 'left' }}>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((rowData: TableRowData, index: number) => (
              <tr
                key={rowData.id}
                style={{
                  color: "black",
                  fontWeight: "bold",
                  borderBottom: "1px solid #555",
                  backgroundColor: index % 2 === 1 ? "#e0eefc" : "white", // every even row gets blue bg
                }}
              >
                <td style={{ padding: '3px', borderRight: '1px solid #555' }}><input type="checkbox" /></td>
                <td style={{ padding: '3px', borderRight: '1px solid #555' }}>{rowData.customerName}</td>
                <td style={{ padding: '3px', borderRight: '1px solid #555' }}>{rowData.type}</td>
                <td style={{ padding: '3px', textAlign: 'right', borderRight: '1px solid #555' }}>{rowData.time.toFixed(2)}</td>
                <td style={{ padding: '3px', textAlign: 'right', borderRight: '1px solid #555' }}>{rowData.expenses.toFixed(2)}</td>
                <td style={{ padding: '3px', textAlign: 'right', borderRight: '1px solid #555' }}>{rowData.mileage.toFixed(2)}</td>
                <td style={{ padding: '3px', textAlign: 'right', borderRight: '1px solid #555' }}>{rowData.items.toFixed(2)}</td>
                <td style={{ padding: '3px', textAlign: 'right', borderRight: '1px solid #555' }}>{rowData.amount.toFixed(2)}</td>
                <td style={{ padding: '3px', textAlign: 'right', borderRight: '1px solid #555' }}>{rowData.openBalance.toFixed(2)}</td>
                <td style={{ padding: '3px', borderRight: '1px solid #555' }}>{rowData.status}</td>
                <td style={{ padding: '3px', textAlign: 'left' }}>
                  <Select
                    size="sm"
                    bg="white"
                    border="1px solid #777"
                    color="black"
                    onChange={(e) => {
                      if (e.target.value === 'view') handleViewDetails(rowData.originalData);
                      if (rowData.type === 'Invoice' && rowData.originalData && 'status' in rowData.originalData && rowData.originalData.status === 'unpaid' && e.target.value === 'mark_paid')
                        handleMarkAsPaid(rowData.originalData as Invoice);
                      if (rowData.type === 'Invoice' && rowData.originalData && 'status' in rowData.originalData && rowData.originalData.status === 'unpaid' && e.target.value === 'remind')
                        handleSendReminder(rowData.originalData as Invoice);
                      if (rowData.type === 'Time & Expense' && rowData.originalData && !('isBilled' in rowData.originalData && rowData.originalData.isBilled) && e.target.value === 'convert_to_bill')
                        handleConvertToBill(rowData.originalData as Expense);
                    }}
                  >
                    <option value="select">Select</option>
                    <option value="view">View</option>
                    {rowData.type === 'Invoice' && rowData.status === 'Open' && <option value="mark_paid">Mark as Paid</option>}
                    {rowData.type === 'Invoice' && rowData.status === 'Open' && <option value="remind">Send Reminder</option>}
                    {rowData.type === 'Time & Expense' && !(('isBilled' in rowData.originalData) && (rowData.originalData as Expense).isBilled) && <option value="convert_to_bill">Convert to Bill</option>}
                  </Select>
                </td>
              </tr>
            ))}

          </tbody>
        </table>
      </Box>

      {/* Bottom Action Bar and Pagination */}
      <Flex bg="white" color="black" p={2} justify="space-between" align="center" borderTop="1px solid #555">
        <HStack spacing={2}>
          <Button size="sm" bg="grey" color="white" _hover={{ bg: "#805ad5" }}>Batch Actions</Button>
          <Button size="sm" bg="grey" color="white" _hover={{ bg: "#63b3ed" }}>Manage Transactions</Button>
        </HStack>
        <HStack>
          <Text>Total: {totalAmountInTable.toFixed(2)}</Text>
          <Text>Showing 1 - {filteredData.length} of {filteredData.length}</Text>
          <Button size="sm" bg="#666666" color="white" _hover={{ bg: "#777777" }} isDisabled>&lt;</Button>
          <Button size="sm" bg="#666666" color="white" _hover={{ bg: "#777777" }} isDisabled>&gt;</Button>
        </HStack>
      </Flex>

      {selectedInvoice && (
        <InvoiceDetailModal 
          invoice={selectedInvoice} 
          isOpen={isModalOpen} 
          onClose={handleCloseModal} 
          onMarkAsPaid={handleMarkAsPaid}
          onSendReminder={handleSendReminder}
          onEditLineItems={handleEditLineItems}
        />
      )}
    </Box>
  );
}

interface SummaryCardProps {
  label: string;
  value: string;
  count: string;
  color: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ label, value, count, color }) => (
  <Box bg={color} p={3} borderRadius="md" flex="1" textAlign="center" mx={1} boxShadow="lg">
    <Text fontSize="xs" fontWeight="bold" opacity="0.8">{label}</Text>
    <Text fontSize="2xl" fontWeight="extrabold" mt={1}>${value}</Text>
    <Text fontSize="xs" opacity="0.7">{count}</Text>
  </Box>
);