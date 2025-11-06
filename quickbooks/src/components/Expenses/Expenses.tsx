  import { useState } from 'react';
  import {
    Box,
    Button,
    HStack,
    Select,
    Flex,
    Text,
  } from '@chakra-ui/react';
  import { useDojoState, dojo, Invoice, Expense } from '../../dojo/state';
  import { InvoiceDetailModal } from '../Invoices/InvoiceDetailModal';
  import { AddExpenseModal } from './AddExpenseModal';
  import { ExpenseDetailModal } from './ExpenseDetailModal';

  interface VendorBillRow {
    id: string;
    vendor: string;
    type: string;
    number: string;
    date: string;
    dueDate: string;
    status: 'Open' | 'Paid';
    amount: number;
    openBalance: number;
    originalData: Invoice | Expense; 
  }

  export function Expenses() {
    const invoices: Invoice[] = useDojoState('invoices');
    const allExpenses: Expense[] = useDojoState('expenses'); // Renamed to avoid conflict

    const [filterVendor, setFilterVendor] = useState<'all' | string>('all');
    const [filterType, setFilterType] = useState<'all' | string>('all');
    const [filterStatus, setFilterStatus] = useState<'all' | 'Open' | 'Paid'>('all');
    const [filterNumber, setFilterNumber] = useState<'all' | string>('all');
    const [filterDate, setFilterDate] = useState<'all' | string>('all');
    const [filterDueDate, setFilterDueDate] = useState<'all' | string>('all');
    const [groupBy, setGroupBy] = useState<'none' | 'vendor' | 'type'>('none');
    const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null); // Still might be used for InvoiceDetailModal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
    const [isExpenseDetailModalOpen, setIsExpenseDetailModalOpen] = useState(false);

    const vendorBills: VendorBillRow[] = [];

    // Process Invoices for "Purchase Order" or "Invoice" types
    invoices.forEach((invoice: Invoice) => {
      vendorBills.push({
        id: invoice.id,
        vendor: invoice.clientName || 'Unknown Vendor', // Assuming clientName is the vendor
        type: 'Purchase Order', // Or 'Invoice' if appropriate
        number: invoice.id, // Using invoice ID as number
        date: new Date(invoice.createdAt).toLocaleDateString('en-US'),
        dueDate: new Date(invoice.dueDate).toLocaleDateString('en-US'),
        status: invoice.status === 'unpaid' ? 'Open' : 'Paid',
        amount: invoice.amount,
        openBalance: invoice.status === 'unpaid' ? invoice.amount : 0,
        originalData: invoice,
      });
    });

    // Process Expenses for "Bill" or "Credit" types
    allExpenses.forEach((expense: Expense) => {
      vendorBills.push({
        id: expense.id,
        vendor: expense.description || 'Unknown Vendor', // Using description as vendor for expenses
        type: 'Bill', // Defaulting type to 'Bill' for expenses
        number: expense.id, // Using expense ID as number
        date: new Date(expense.date).toLocaleDateString('en-US'),
        dueDate: new Date(expense.date).toLocaleDateString('en-US'), // Using expense date as due date
        status: expense.status === 'unpaid' ? 'Open' : 'Paid',
        amount: expense.amount,
        openBalance: expense.status === 'unpaid' ? expense.amount : 0,
        originalData: expense,
      });
    });

    // Calculate summary values dynamically
    const unbilled = vendorBills.filter(bill => bill.type === 'Purchase Order' && bill.status === 'Open').reduce((sum, bill) => sum + bill.amount, 0);
    const unpaid = vendorBills.filter(bill => (bill.type === 'Bill' || bill.type === 'Purchase Order') && bill.status === 'Open').reduce((sum, bill) => sum + bill.amount, 0);
    const overdue = vendorBills.filter(bill => (bill.type === 'Bill' || bill.type === 'Purchase Order') && bill.status === 'Open' && new Date(bill.dueDate) < new Date()).reduce((sum, bill) => sum + bill.amount, 0);
    const paid = vendorBills.filter(bill => bill.status === 'Paid').reduce((sum, bill) => sum + bill.amount, 0);

    // Filter data based on state
    const filteredData = vendorBills
      .filter((row) => filterStatus === 'all' ? true : row.status === filterStatus)
      .filter((row) => filterVendor === 'all' ? true : row.vendor === filterVendor)
      .filter((row) => filterType === 'all' ? true : row.type === filterType)
      .filter((row) => filterNumber === 'all' ? true : row.number === filterNumber)
      .filter((row) => filterDate === 'all' ? true : row.date === filterDate)
      .filter((row) => filterDueDate === 'all' ? true : row.dueDate === filterDueDate);

    const groupedData = groupBy === 'none'
      ? filteredData
      : [...filteredData].sort((a, b) => { // Create a copy to avoid modifying original array
          if (groupBy === 'vendor') return a.vendor.localeCompare(b.vendor);
          if (groupBy === 'type') return a.type.localeCompare(b.type);
          return 0;
        });

    const handleMarkAsPaid = (invoice: Invoice) => {
      // This logic is for Invoices. Need to implement similar for Expenses if applicable
      const updated = invoices.map((inv) =>
        inv.id === invoice.id ? { ...inv, status: 'paid' as const } : inv
      );
      dojo.setState('invoices', updated, `Marked invoice ${invoice.id} as paid`);
    };

    const handleMarkExpenseAsPaid = (expense: Expense) => {
      const updated = allExpenses.map((exp) =>
        exp.id === expense.id ? { ...exp, status: 'paid' as const } : exp
      );
      dojo.setState('expenses', updated, `Marked expense ${expense.id} as paid`);
    };

    const handleViewDetails = (data: Invoice | Expense) => {
      if ('clientName' in data) { // Check if it's an Invoice
        setSelectedInvoice(data as Invoice);
        setIsModalOpen(true);
      } else {
        // Handle expense detail view
        setSelectedExpense(data as Expense);
        setIsExpenseDetailModalOpen(true);
      }
    };

    // Re-enable this if needed for expenses/bills
    /*
    const handleSendReminder = (invoice: Invoice) => {
      dojo.setState(
        'invoices',
        invoices,
        `Sent payment reminder for invoice ${invoice.id} to ${invoice.clientName}`
      );
    };

    const handleEditLineItems = (invoiceId: string, updatedLineItems: { description: string; quantity: number; rate: number }[]) => {
      const updatedInvoices = invoices.map((inv) =>
        inv.id === invoiceId ? { ...inv, lineItems: updatedLineItems, amount: updatedLineItems.reduce((sum, item) => sum + item.quantity * item.rate, 0) } : inv
      );
      dojo.setState('invoices', updatedInvoices, `Edited line items for invoice ${invoiceId}`);
    };
    */

    const handleCloseModal = () => {
      setIsModalOpen(false);
      setSelectedInvoice(null);
    };

    // Dynamically populate filter options
    const uniqueVendorNames = Array.from(new Set(vendorBills.map((v) => v.vendor))).filter(Boolean);
    const uniqueTypes = Array.from(new Set(vendorBills.map((v) => v.type))).filter(Boolean);
    const uniqueNumbers = Array.from(new Set(vendorBills.map(data => data.number))).filter(Boolean);
    const uniqueDates = Array.from(new Set(vendorBills.map(data => data.date))).filter(Boolean);
    const uniqueDueDates = Array.from(new Set(vendorBills.map(data => data.dueDate))).filter(Boolean);

    const [isAddExpenseModalOpen, setIsAddExpenseModalOpen] = useState(false);

    return (
      <Box bg="#f5f5f5" minH="100vh" p={0} fontFamily="Arial, sans-serif">
        {/* Top Summary Cards */}
        <Flex bg="#f5f5f5"   p={2}  height="130px" borderBottom="1px solid #ddd" gap={2}>
          <SummaryCard label="UNBILLED" value={unbilled.toFixed(2)}  count="PURCHASE ORDERS" color="#2c5f8d" textColor="white" />
          <SummaryCard label="UNPAID" value={unpaid.toFixed(2)} count="OPEN BILLS" color="#f7b731" textColor="white" />
          <SummaryCard label="OVERDUE" value={overdue.toFixed(2)} count="OVERDUE" color="#e74c3c" textColor="white" />
          <SummaryCard label="PAID" value={paid.toFixed(2)} count="PAID IN LAST 30 DAYS" color="#a4c639" textColor="white" />
        </Flex>

        <Flex bg="#f5f5f5" p={2} align="center" justify="flex-start" borderBottom="1px solid #ddd" gap={3}>
          <HStack spacing={2}>
            <Text fontSize="11px" fontWeight="600" color="#666">VENDOR</Text>
            <Select w="120px" size="sm" bg="white" border="1px solid #ccc" color="#333" fontSize="12px" borderRadius="3px" onChange={(e) => setFilterVendor(e.target.value)}>
              <option value="all">All</option>
              {uniqueVendorNames.map((vendor) => (
                <option key={vendor} value={vendor}>{vendor}</option>
              ))}
            </Select>
          </HStack>
          <HStack spacing={2}>
            <Text fontSize="11px" fontWeight="600" color="#666">TYPE</Text>
            <Select w="120px" size="sm" bg="white" border="1px solid #ccc" color="#333" fontSize="12px" borderRadius="3px" onChange={(e) => setFilterType(e.target.value)}>
              <option value="all">All</option>
              {uniqueTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </Select>
          </HStack>
          <HStack spacing={2}>
            <Text fontSize="11px" fontWeight="600" color="#666">NUMBER</Text>
            <Select w="120px" size="sm" bg="white" border="1px solid #ccc" color="#333" fontSize="12px" borderRadius="3px" onChange={(e) => setFilterNumber(e.target.value)}>
              <option value="all">All</option>
              {uniqueNumbers.map((num) => (
                <option key={num} value={num}>{num}</option>
              ))}
            </Select>
          </HStack>
          <HStack spacing={2}>
            <Text fontSize="11px" fontWeight="600" color="#666">DATE</Text>
            <Select w="120px" size="sm" bg="white" border="1px solid #ccc" color="#333" fontSize="12px" borderRadius="3px" onChange={(e) => setFilterDate(e.target.value)}>
              <option value="all">All</option>
              {uniqueDates.map((date) => (
                <option key={date} value={date}>{date}</option>
              ))}
            </Select>
          </HStack>
          <HStack spacing={2}>
            <Text fontSize="11px" fontWeight="600" color="#666">DUE DATE</Text>
            <Select w="120px" size="sm" bg="white" border="1px solid #ccc" color="#333" fontSize="12px" borderRadius="3px" onChange={(e) => setFilterDueDate(e.target.value)}>
              <option value="all">All</option>
              {uniqueDueDates.map((dueDate) => (
                <option key={dueDate} value={dueDate}>{dueDate}</option>
              ))}
            </Select>
          </HStack>
          <HStack spacing={2}>
            <Text fontSize="11px" fontWeight="600" color="#666">STATUS</Text>
            <Select w="120px" size="sm" bg="white" border="1px solid #ccc" color="#333" fontSize="12px" borderRadius="3px" onChange={(e) => setFilterStatus(e.target.value as 'all' | 'Open' | 'Paid')}>
              <option value="all">All</option>
              <option value="Open">Open</option>
              <option value="Paid">Paid</option>
            </Select>
          </HStack>
          <HStack spacing={2}>
            <Text fontSize="11px" fontWeight="600" color="#666">GROUP BY</Text>
            <Select w="120px" size="sm" bg="white" border="1px solid #ccc" color="#333" fontSize="12px" borderRadius="3px" onChange={(e) => setGroupBy(e.target.value as 'none' | 'vendor' | 'type')}>
              <option value="none">None</option>
              <option value="vendor">Vendor</option>
              <option value="type">Type</option>
            </Select>
          </HStack>
          <Button size="sm" bg="#2c5f8d" color="white" fontSize="12px" borderRadius="3px" onClick={() => setIsAddExpenseModalOpen(true)}>
            Add Expense
          </Button>
        </Flex>

        <Box bg="white" p={0} flex="1" overflowY="auto">
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', fontWeight: "bold" , borderBottom: "1px solid #777" }}>
            <thead>
              <tr style={{ backgroundColor: '#f9f9f9', color: "#666", borderBottom: '2px solid #555' }}>
                <th style={{ padding: '8px 10px', textAlign: 'left', borderRight: '1px solid #777', fontWeight: '600', fontSize: '11px' }}>
                  <input type="checkbox" style={{ transform: 'scale(0.9)' }} />
                </th>
                <th style={{ padding: '8px 10px', textAlign: 'left', borderRight: '1px solid #777', fontWeight: '600', fontSize: '11px' }}>VENDOR</th>
                <th style={{ padding: '8px 10px', textAlign: 'left', borderRight: '1px solid #777', fontWeight: '600', fontSize: '11px' }}>TYPE</th>
                <th style={{ padding: '8px 10px', textAlign: 'center', borderRight: '1px solid #777', fontWeight: '600', fontSize: '11px' }}>NUMBER</th>
                <th style={{ padding: '8px 10px', textAlign: 'center', borderRight: '1px solid #777', fontWeight: '600', fontSize: '11px' }}>DATE</th>
                <th style={{ padding: '8px 10px', textAlign: 'center', borderRight: '1px solid #777', fontWeight: '600', fontSize: '11px' }}>DUE DATE</th>
                <th style={{ padding: '8px 10px', textAlign: 'center', borderRight: '1px solid #777', fontWeight: '600', fontSize: '11px' }}>STATUS</th>
                <th style={{ padding: '8px 10px', textAlign: 'center', borderRight: '1px solid #777', fontWeight: '600', fontSize: '11px' }}>AMOUNT</th>
                <th style={{ padding: '8px 10px', textAlign: 'center', borderRight: '1px solid #777', fontWeight: '600', fontSize: '11px' }}>OPEN BALANCE</th>
                <th style={{ padding: '8px 10px', textAlign: 'center', fontWeight: '600', fontSize: '11px' }}>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {groupedData.map((rowData, index) => {
                const isGreenRow = index === 0; // Example for first row
                const isBlueRow = index === 1; // Example for second row
                const bgColor = isGreenRow ? 'white' : isBlueRow ? '#cce5ff' : (index % 2 === 0 ? 'white' : '#cce5ff');
                
                return (
                  <tr
                    key={rowData.id}
                    style={{
                      color: "#333",
                      borderBottom: "1px solid #777",
                      backgroundColor: bgColor,
                    }}
                  >
                    <td style={{ padding: '8px 10px', borderRight: '1px solid #777' }}>
                      <input type="checkbox" style={{ transform: 'scale(0.9)' }} />
                    </td>
                    <td style={{ padding: '8px 10px', borderRight: '1px solid #777', fontSize: '12px', color: '#333' }}>{rowData.vendor}</td>
                    <td style={{ padding: '8px 10px', borderRight: '1px solid #777', fontSize: '12px', color: '#333' }}>{rowData.type}</td>
                    <td style={{ padding: '8px 10px', textAlign: 'center', borderRight: '1px solid #777', fontSize: '12px', color: '#333' }}>{rowData.number}</td>
                    <td style={{ padding: '8px 10px', textAlign: 'center', borderRight: '1px solid #777', fontSize: '12px', color: '#333' }}>
                      {rowData.date}
                    </td>
                    <td style={{ padding: '8px 10px', textAlign: 'center', borderRight: '1px solid #777', fontSize: '12px', color: '#333' }}>
                      {rowData.dueDate}
                    </td>
                    <td style={{ padding: '8px 10px', textAlign: 'center', borderRight: '1px solid #777', fontSize: '12px', color: '#333' }}>{rowData.status}</td>
                    <td style={{ padding: '8px 10px', textAlign: 'center', borderRight: '1px solid #777', fontSize: '12px', color: '#333' }}>
                      {rowData.amount.toFixed(2)}
                    </td>
                    <td style={{ padding: '8px 10px', textAlign: 'center', borderRight: '1px solid #777', fontSize: '12px', color: '#333' }}>
                      {rowData.openBalance !== 0 ? rowData.openBalance.toFixed(2) : ''}
                    </td>
                    <td style={{ padding: '6px 10px', textAlign: 'center' }}>
                      <Select
                        size="sm"
                        bg={isGreenRow ? '#90ee90' : 'white'} // Example green background for first row action
                        border="1px solid #ccc"
                        color="#333"
                        fontSize="11px"
                        h="26px"
                        borderRadius="3px"
                        onChange={(e) => {
                          if (e.target.value === 'view') handleViewDetails(rowData.originalData);
                          if (rowData.type === 'Purchase Order' && e.target.value === 'convert_to_bill') {
                            // Implement actual conversion logic here
                            console.log("Converting Purchase Order to Bill:", rowData.originalData);
                          }
                          if (rowData.originalData && !('clientName' in rowData.originalData) && rowData.status === 'Open' && e.target.value === 'mark_paid') {
                            handleMarkExpenseAsPaid(rowData.originalData as Expense);
                          }
                        }}
                      >
                        <option value="select">Select</option>
                        <option value="view">View</option>
                        {rowData.type === 'Purchase Order' && <option value="convert_to_bill">Convert to Bill</option>}
                        {rowData.originalData && !('clientName' in rowData.originalData) && rowData.status === 'Open' && <option value="mark_paid">Mark as Paid</option>}
                        {/* Add other actions based on rowData.type or status */}
                      </Select>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Box>

        <Flex bg="#f5f5f5" color="#333" p={2} justify="space-between" align="center" borderTop="1px solid #ddd">
          <HStack spacing={2}>
            <Select w="140px" size="sm" bg="white" border="1px solid #ccc" color="#333" fontSize="12px" borderRadius="3px">
              <option value="">Batch Actions</option>
            </Select>
            <Select w="180px" size="sm" bg="white" border="1px solid #ccc" color="#333" fontSize="12px" borderRadius="3px">
              <option value="">Manage Transactions</option>
            </Select>
          </HStack>
          <HStack spacing={3}>
            <Text fontSize="12px" color="#666">Showing 1 - {groupedData.length} of {groupedData.length}</Text>
            <HStack spacing={1}>
              <Button size="xs" bg="white" border="1px solid #ccc" color="#666" _hover={{ bg: "#f5f5f5" }} isDisabled h="26px" minW="26px" p={0} borderRadius="3px">
                ◀
              </Button>
              <Button size="xs" bg="white" border="1px solid #ccc" color="#666" _hover={{ bg: "#f5f5f5" }} isDisabled h="26px" minW="26px" p={0} borderRadius="3px">
                ▶
              </Button>
            </HStack>
          </HStack>
        </Flex>

        {selectedInvoice && (
          <InvoiceDetailModal 
            invoice={selectedInvoice} 
            isOpen={isModalOpen} 
            onClose={handleCloseModal} 
            onMarkAsPaid={handleMarkAsPaid}
            onSendReminder={() => {}} // Placeholder for onSendReminder
            onEditLineItems={() => {}} // Placeholder for onEditLineItems
          />  
        )}

        {selectedExpense && (
          <ExpenseDetailModal
            expense={selectedExpense}
            isOpen={isExpenseDetailModalOpen}
            onClose={() => setIsExpenseDetailModalOpen(false)}
          />
        )}

        <AddExpenseModal isOpen={isAddExpenseModalOpen} onClose={() => setIsAddExpenseModalOpen(false)} />
      </Box>
    );
  }

  interface SummaryCardProps {
    label: string;
    value: string;
    count: string;
    color: string;
    textColor: string;
  }

  const SummaryCard: React.FC<SummaryCardProps> = ({ label, value, count, color, textColor }) => (
    <Box bg={color} p={3} borderRadius="3px" minW="220px" textAlign="left" boxShadow="sm">
      <Text fontSize="10px" fontWeight="bold" color={textColor} opacity="0.9" letterSpacing="0.5px">{label}</Text>
      <Text fontSize="28px" fontWeight="bold" color={textColor} mt={1} lineHeight="1">{value}</Text>
      <Text fontSize="10px" color={textColor} opacity="0.85" mt={1}>{count}</Text>
    </Box>
  );