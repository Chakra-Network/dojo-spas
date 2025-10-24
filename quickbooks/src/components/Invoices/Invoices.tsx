import { useState } from 'react';
import {
  Box,
  Heading,
  Badge,
  Button,
  HStack,
  Select,
} from '@chakra-ui/react';
import { useDojoState, dojo, Invoice } from '../../dojo/state';
import { InvoiceDetailModal } from './InvoiceDetailModal';

export function Invoices() {
  const invoices = useDojoState('invoices');
  const [filterStatus, setFilterStatus] = useState<'all' | 'paid' | 'unpaid'>('all');
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter invoices
  const filteredInvoices =
    filterStatus === 'all' ? invoices : invoices.filter((inv) => inv.status === filterStatus);

  const handleMarkAsPaid = (invoice: Invoice) => {
    const updated = invoices.map((inv) =>
      inv.id === invoice.id ? { ...inv, status: 'paid' as const } : inv
    );
    dojo.setState('invoices', updated, `Marked invoice ${invoice.id} as paid`);
  };

  const handleViewDetails = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setIsModalOpen(true);
  };

  const handleSendReminder = (invoice: Invoice) => {
    dojo.setState(
      'invoices',
      invoices,
      `Sent payment reminder for invoice ${invoice.id} to ${invoice.clientName}`
    );
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedInvoice(null);
  };

  return (
    <Box p={8}>
      <HStack justify="space-between" mb={6}>
        <Heading size="lg">Invoice Management</Heading>
        <Select w="200px" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value as any)}>
          <option value="all">All Invoices</option>
          <option value="paid">Paid</option>
          <option value="unpaid">Unpaid</option>
        </Select>
      </HStack>

      <Box bg="white" borderRadius="lg" borderWidth="1px" borderColor="gray.200" shadow="sm" overflowX="auto">
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ backgroundColor: '#f7fafc' }}>
            <tr>
              <th style={{ padding: '12px', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600', color: '#4a5568' }}>Invoice ID</th>
              <th style={{ padding: '12px', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600', color: '#4a5568' }}>Client</th>
              <th style={{ padding: '12px', textAlign: 'right', fontSize: '0.875rem', fontWeight: '600', color: '#4a5568' }}>Amount</th>
              <th style={{ padding: '12px', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600', color: '#4a5568' }}>Status</th>
              <th style={{ padding: '12px', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600', color: '#4a5568' }}>Due Date</th>
              <th style={{ padding: '12px', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600', color: '#4a5568' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredInvoices.map((invoice) => (
              <tr key={invoice.id} style={{ borderTop: '1px solid #e2e8f0' }}>
                <td style={{ padding: '12px', fontWeight: '500' }}>{invoice.id}</td>
                <td style={{ padding: '12px' }}>{invoice.clientName}</td>
                <td style={{ padding: '12px', textAlign: 'right', fontWeight: '600' }}>
                  ${invoice.amount.toLocaleString()}
                </td>
                <td style={{ padding: '12px' }}>
                  <Badge colorScheme={invoice.status === 'paid' ? 'green' : 'orange'}>
                    {invoice.status.toUpperCase()}
                  </Badge>
                </td>
                <td style={{ padding: '12px' }}>{new Date(invoice.dueDate).toLocaleDateString()}</td>
                <td style={{ padding: '12px' }}>
                  <HStack spacing={2}>
                    <Button size="sm" colorScheme="blue" onClick={() => handleViewDetails(invoice)}>
                      View
                    </Button>
                    {invoice.status === 'unpaid' && (
                      <>
                        <Button
                          size="sm"
                          colorScheme="green"
                          onClick={() => handleMarkAsPaid(invoice)}
                        >
                          Mark Paid
                        </Button>
                        <Button
                          size="sm"
                          colorScheme="gray"
                          onClick={() => handleSendReminder(invoice)}
                        >
                          Remind
                        </Button>
                      </>
                    )}
                  </HStack>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Box>

      {selectedInvoice && (
        <InvoiceDetailModal invoice={selectedInvoice} isOpen={isModalOpen} onClose={handleCloseModal} />
      )}
    </Box>
  );
}
