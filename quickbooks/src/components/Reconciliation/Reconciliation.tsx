import { useState } from 'react';
import {
  Box,
  Heading,
  VStack,
  HStack,
  Text,
  Button,
  Badge,
  Select,
  SimpleGrid,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useToast,
} from '@chakra-ui/react';
import { useDojoState, dojo, BankTransaction } from '../../dojo/state';
import { CheckCircle, XCircle } from 'lucide-react';

export function Reconciliation() {
  const toast = useToast();

  const bankTransactions = useDojoState('bankTransactions');
  const invoices = useDojoState('invoices');
  const expenses = useDojoState('expenses');

  const [selectedTransaction, setSelectedTransaction] = useState<BankTransaction | null>(null);
  const [matchType, setMatchType] = useState<'invoice' | 'expense'>('invoice');
  const [matchId, setMatchId] = useState<string>('');

  const unmatchedTransactions = bankTransactions.filter((t) => !t.matched);
  const matchedTransactions = bankTransactions.filter((t) => t.matched);

  const handleMatch = () => {
    if (!selectedTransaction || !matchId) {
      toast({
        title: 'Selection required',
        description: 'Please select both a transaction and a match',
        status: 'warning',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
      return;
    }

    const updatedTransactions = bankTransactions.map((t) =>
      t.id === selectedTransaction.id
        ? { ...t, matched: true, matchedWith: matchId }
        : t
    );

    const matchedItem = matchType === 'invoice'
      ? invoices.find((inv) => inv.id === matchId)
      : expenses.find((exp) => exp.id === matchId);

    dojo.setState(
      'bankTransactions',
      updatedTransactions,
      `Matched ${selectedTransaction.id} with ${matchType} ${matchId}: ${
        matchedItem
          ? matchType === 'invoice'
            ? (matchedItem as any).clientName
            : (matchedItem as any).description
          : matchId
      }`
    );

    toast({
      title: 'Transaction matched',
      description: `Successfully matched with ${matchType} ${matchId}`,
      status: 'success',
      duration: 3000,
      isClosable: true,
      position: 'top-right',
    });

    setSelectedTransaction(null);
    setMatchId('');
  };

  const getSuggestedMatches = (transaction: BankTransaction) => {
    if (transaction.amount > 0) {
      return invoices
        .filter((inv) => Math.abs(inv.amount - transaction.amount) < 0.01)
        .map((inv) => ({ type: 'invoice' as const, id: inv.id, label: `${inv.id} - ${inv.clientName}` }));
    } else {
      return expenses
        .filter((exp) => Math.abs(exp.amount - Math.abs(transaction.amount)) < 0.01)
        .map((exp) => ({ type: 'expense' as const, id: exp.id, label: `${exp.id} - ${exp.description}` }));
    }
  };

  return (
    <Box p={8}>
      <Heading mb={6} size="lg">Bank Reconciliation</Heading>

      {/* Summary Stats */}
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={6}>
        <Box p={5} bg="white" borderRadius="lg" borderWidth="1px" borderColor="gray.200" shadow="sm">
          <Text fontSize="sm" color="gray.600" mb={2}>Total Transactions</Text>
          <Text fontSize="3xl" fontWeight="bold">{bankTransactions.length}</Text>
        </Box>
        <Box p={5} bg="white" borderRadius="lg" borderWidth="1px" borderColor="gray.200" shadow="sm">
          <Text fontSize="sm" color="gray.600" mb={2}>Matched</Text>
          <Text fontSize="3xl" fontWeight="bold" color="green.600">{matchedTransactions.length}</Text>
        </Box>
        <Box p={5} bg="white" borderRadius="lg" borderWidth="1px" borderColor="gray.200" shadow="sm">
          <Text fontSize="sm" color="gray.600" mb={2}>Unmatched</Text>
          <Text fontSize="3xl" fontWeight="bold" color="orange.600">{unmatchedTransactions.length}</Text>
        </Box>
      </SimpleGrid>

      {/* Matching Interface */}
      {selectedTransaction && (
        <Box p={6} mb={6} bg="blue.50" borderRadius="lg" borderWidth="2px" borderColor="blue.300">
          <VStack align="stretch" spacing={4}>
            <Heading size="md" color="blue.700">Match Transaction</Heading>

            <HStack spacing={4} align="start">
              <Box flex="1">
                <Text fontWeight="bold" mb={1}>Selected Transaction</Text>
                <Text fontSize="sm">{selectedTransaction.description}</Text>
                <Text
                  fontSize="sm"
                  fontWeight="bold"
                  color={selectedTransaction.amount > 0 ? 'green.600' : 'red.600'}
                >
                  {'$'}
                  {Math.abs(selectedTransaction.amount).toLocaleString()}
                </Text>
              </Box>

              <Box flex="1">
                <Text fontWeight="bold" mb={2}>Match With</Text>
                <HStack spacing={2} mb={2}>
                  <Button size="sm" colorScheme={matchType === 'invoice' ? 'blue' : 'gray'} onClick={() => setMatchType('invoice')}>Invoice</Button>
                  <Button size="sm" colorScheme={matchType === 'expense' ? 'blue' : 'gray'} onClick={() => setMatchType('expense')}>Expense</Button>
                </HStack>
                <Select placeholder="Select item" value={matchId} onChange={(e) => setMatchId(e.target.value)} bg="white">
                  {matchType === 'invoice'
                    ? invoices.map((inv) => (
                        <option key={inv.id} value={inv.id}>
                          {`${inv.id} - ${inv.clientName} ($${inv.amount.toLocaleString()})`}
                        </option>
                      ))
                    : expenses.map((exp) => (
                        <option key={exp.id} value={exp.id}>
                          {`${exp.id} - ${exp.description} ($${exp.amount.toLocaleString()})`}
                        </option>
                      ))}
                </Select>
              </Box>
            </HStack>

            <HStack spacing={2}>
              <Button colorScheme="green" onClick={handleMatch}>Confirm Match</Button>
              <Button variant="ghost" onClick={() => setSelectedTransaction(null)}>Cancel</Button>
            </HStack>

            {getSuggestedMatches(selectedTransaction).length > 0 && (
              <Box>
                <Text fontSize="sm" fontWeight="bold" color="gray.600" mb={2}>Suggested Matches (same amount):</Text>
                <HStack spacing={2} flexWrap="wrap">
                  {getSuggestedMatches(selectedTransaction).map((match) => (
                    <Badge
                      key={match.id}
                      colorScheme="green"
                      p={2}
                      cursor="pointer"
                      onClick={() => { setMatchType(match.type); setMatchId(match.id); }}
                    >
                      {match.label.toString()}
                    </Badge>
                  ))}
                </HStack>
              </Box>
            )}
          </VStack>
        </Box>
      )}

      {/* Unmatched Transactions */}
      <Box mb={6}>
        <Heading size="md" mb={4}>Unmatched Transactions</Heading>
        <Box bg="white" borderRadius="lg" borderWidth="1px" borderColor="gray.200" shadow="sm" overflowX="auto">
          <Table variant="simple" size="sm">
            <Thead bg="gray.100">
              <Tr>
                <Th>Date</Th>
                <Th>Description</Th>
                <Th isNumeric>Amount</Th>
                <Th>Status</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {unmatchedTransactions.map((transaction) => (
                <Tr key={transaction.id}>
                  <Td>{new Date(transaction.date).toLocaleDateString()}</Td>
                  <Td>{transaction.description}</Td>
                  <Td isNumeric color={transaction.amount > 0 ? 'green.600' : 'red.600'} fontWeight="bold">
                    {transaction.amount > 0 ? '+' : ''}${transaction.amount.toLocaleString()}
                  </Td>
                  <Td>
                    <HStack spacing={1}>
                      <XCircle size={16} color="#F56565" />
                      <Badge colorScheme="orange">Unmatched</Badge>
                    </HStack>
                  </Td>
                  <Td>
                    <Button size="sm" colorScheme="blue" onClick={() => setSelectedTransaction(transaction)}>Match</Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Box>

      {/* Matched Transactions */}
      <Box>
        <Heading size="md" mb={4}>Matched Transactions</Heading>
        <Box bg="white" borderRadius="lg" borderWidth="1px" borderColor="gray.200" shadow="sm" overflowX="auto">
          <Table variant="simple" size="sm">
            <Thead bg="gray.100">
              <Tr>
                <Th>Date</Th>
                <Th>Description</Th>
                <Th isNumeric>Amount</Th>
                <Th>Matched With</Th>
                <Th>Status</Th>
              </Tr>
            </Thead>
            <Tbody>
              {matchedTransactions.map((transaction) => (
                <Tr key={transaction.id}>
                  <Td>{new Date(transaction.date).toLocaleDateString()}</Td>
                  <Td>{transaction.description}</Td>
                  <Td isNumeric color={transaction.amount > 0 ? 'green.600' : 'red.600'} fontWeight="bold">
                    {transaction.amount > 0 ? '+' : ''}${transaction.amount.toLocaleString()}
                  </Td>
                  <Td>
                    <Badge colorScheme="blue">{transaction.matchedWith?.toString()}</Badge>
                  </Td>
                  <Td>
                    <HStack spacing={1}>
                      <CheckCircle size={16} color="#48BB78" />
                      <Badge colorScheme="green">Matched</Badge>
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Box>
    </Box>
  );
}
