import {
    Box,
    Flex,
    Text,
    Input,
    InputGroup,
    InputRightElement,
    Select,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Button,
    IconButton,
    Icon,
    Divider,
  } from "@chakra-ui/react";
  import {
    Search,
    Edit,
    FileDown,
    FileText,
    Printer,
    Plus,
  } from "lucide-react";
  
  const customersData = [
    { name: "Aaron's Photography Studio", balance: 85.0, selected: false },
    { name: "Alamo Foundation", balance: 16295.0, selected: false },
    { name: "Amy's Bird Sanctuary", balance: 750.0, selected: false },
    { name: "Audridge Windows", balance: 53472.0, selected: true },
    { name: "Bill's Windsurf Shop", balance: 150.0, selected: false },
    { name: "Building 101", balance: 0.0, selected: false, children: [
      { name: "Unit 1", balance: 0.0, selected: false, children: [
        { name: "Tenant - Smith", balance: 0.0, selected: false },
      ]},
      { name: "Unit 2", balance: 0.0, selected: false, children: [
        { name: "Tenant - Jones", balance: 0.0, selected: false },
      ]},
    ]},
    { name: "Building 201", balance: 0.0, selected: false, children: [
      { name: "Unit 1", balance: 0.0, selected: false, children: [
        { name: "Tenant - Johnson", balance: 0.0, selected: false },
      ]},
    ]},
    { name: "Cassie's Dog Grooming", balance: 1125.0, selected: false },
    { name: "Columbia Management", balance: 0.0, selected: false, children: [
      { name: "Seattle School", balance: 0.0, selected: false },
      { name: "Spokane Civic Center", balance: 0.0, selected: false },
    ]},
    { name: "Cool Cars", balance: 0.0, selected: false },
    { name: "Crandall Contractors", balance: 27320.34, selected: false, children: [
      { name: "Cheyenne 1", balance: 27320.34, selected: false },
    ]},
  ];
  
  const transactionsData = [
    { type: "Payment", num: "2929", date: "02/25/2023", account: "Checking", amount: "10,000.00" },
    { type: "Payment", num: "39992", date: "02/07/2023", account: "Checking", amount: "2,494.12" },
    { type: "Invoice", num: "40", date: "01/28/2023", account: "Accounts Receive...", amount: "7,874.50" },
    { type: "Invoice", num: "24", date: "01/01/2023", account: "Accounts Receive...", amount: "2,494.12" },
    { type: "Invoice", num: "25", date: "01/01/2023", account: "Accounts Receive...", amount: "21,972.50" },
    { type: "Invoice", num: "26", date: "01/01/2023", account: "Accounts Receive...", amount: "33,625.00" },
  ];
  
  function CustomerRow({ customer, indent = 0 }: { customer: any; indent?: number }) {
    const isSelected = customer.selected;
    
    return (
      <>
        <Tr
          bg={isSelected ? "#d4edda" : "transparent"}
          _hover={{ bg: isSelected ? "#d4edda" : "#f8f9fa" }}
          cursor="pointer"
        >
          <Td py={2} pl={indent * 20 + 12}>
            <Text fontSize="sm">{customer.name}</Text>
          </Td>
          <Td py={2} textAlign="right" pr={4}>
            <Text fontSize="sm">{customer.balance.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
          </Td>
        </Tr>
        {customer.children?.map((child: any) => (
          <CustomerRow key={child.name} customer={child} indent={indent + 1} />
        ))}
      </>
    );
  }
  
  export function CustomerCenter() {
    return (
      <Box bg="#f5f7fb" minH="100vh" fontFamily="Arial, sans-serif">
        {/* Top Toolbar */}
        <Box bg="#e8edf3" borderBottom="1px solid #cbd5e1" px={4} py={2}>
          <Flex align="center" gap={3}>
            <Input
              placeholder="Search Company or Help"
              fontSize="13px"
              bg="white"
              border="1px solid #cbd5e1"
              w="240px"
              h="32px"
              _focus={{ outline: "none", boxShadow: "none" }}
            />
            <Button
              size="sm"
              bg="white"
              border="1px solid #cbd5e1"
              color="#2d3748"
              fontSize="13px"
              fontWeight="normal"
              h="32px"
              leftIcon={<Plus size={14} />}
            >
              New Customer & Job
            </Button>
            <Button
              size="sm"
              bg="white"
              border="1px solid #cbd5e1"
              color="#2d3748"
              fontSize="13px"
              fontWeight="normal"
              h="32px"
            >
              New Transactions
            </Button>
            <IconButton
              aria-label="Print"
              icon={<Printer size={16} />}
              size="sm"
              bg="white"
              border="1px solid #cbd5e1"
              h="32px"
              w="32px"
            />
            <IconButton
              aria-label="Excel"
              icon={<FileDown size={16} />}
              size="sm"
              bg="white"
              border="1px solid #cbd5e1"
              h="32px"
              w="32px"
            />
            <IconButton
              aria-label="Word"
              icon={<FileText size={16} />}
              size="sm"
              bg="white"
              border="1px solid #cbd5e1"
              h="32px"
              w="32px"
            />
            <Button
              size="sm"
              bg="white"
              border="1px solid #cbd5e1"
              color="#2d3748"
              fontSize="13px"
              fontWeight="normal"
              h="32px"
            >
              Income Tracker
            </Button>
          </Flex>
        </Box>
  
        {/* Main Content */}
        <Flex>
          {/* Left Panel - Customers & Jobs */}
          <Box
            w="400px"
            bg="#f5f7fb"
            borderRight="1px solid #cbd5e1"
            display="flex"
            flexDirection="column"
          >
            {/* Tabs */}
            <Flex borderBottom="1px solid #cbd5e1" bg="white">
              <Box
                px={4}
                py={2}
                bg="white"
                borderBottom="2px solid #3b82f6"
                fontWeight="semibold"
                fontSize="sm"
                color="#2d3748"
              >
                Customers & Jobs
              </Box>
              <Box
                px={4}
                py={2}
                bg="#f5f7fb"
                fontSize="sm"
                color="#6b7280"
                cursor="pointer"
              >
                Transactions
              </Box>
            </Flex>
  
            {/* Dropdown and Search */}
            <Box bg="white" px={3} py={2} borderBottom="1px solid #cbd5e1">
              <Flex align="center" gap={2}>
                <Select
                  size="sm"
                  bg="white"
                  border="1px solid #cbd5e1"
                  w="150px"
                  fontSize="13px"
                >
                  <option>Active Customers</option>
                </Select>
                <InputGroup flex="1">
                  <Input
                    placeholder=""
                    fontSize="13px"
                    bg="white"
                    border="1px solid #cbd5e1"
                    h="28px"
                  />
                  <InputRightElement h="28px">
                    <Icon as={Search} boxSize={4} color="#6b7280" />
                  </InputRightElement>
                </InputGroup>
              </Flex>
            </Box>
  
            {/* Customer List */}
            <Box flex="1" overflowY="auto" bg="white">
              <Table size="sm" variant="unstyled">
                <Thead bg="#f8f9fa" position="sticky" top={0} zIndex={1}>
                  <Tr>
                    <Th
                      fontSize="xs"
                      textTransform="uppercase"
                      color="#6b7280"
                      fontWeight="semibold"
                      py={2}
                      pl={3}
                      borderBottom="1px solid #e5e7eb"
                    >
                      NAME
                    </Th>
                    <Th
                      fontSize="xs"
                      textTransform="uppercase"
                      color="#6b7280"
                      fontWeight="semibold"
                      py={2}
                      pr={4}
                      textAlign="right"
                      borderBottom="1px solid #e5e7eb"
                    >
                      BALANCE
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {customersData.map((customer) => (
                    <CustomerRow key={customer.name} customer={customer} />
                  ))}
                </Tbody>
              </Table>
            </Box>
          </Box>
  
          {/* Right Panel - Customer Information */}
          <Box flex="1" bg="#f5f7fb" display="flex" flexDirection="column">
            {/* Customer Information Header */}
            <Box bg="white" px={4} py={3} borderBottom="1px solid #cbd5e1">
              <Flex justify="space-between" align="center">
                <Text fontSize="lg" fontWeight="semibold" color="#2d3748">
                  Customer Information
                </Text>
                <IconButton
                  aria-label="Edit"
                  icon={<Edit size={16} />}
                  size="sm"
                  bg="transparent"
                  h="24px"
                  w="24px"
                />
              </Flex>
            </Box>
  
            {/* Customer Details */}
            <Box bg="white" px={4} py={4} flex="1" overflowY="auto">
              {/* Two Column Layout */}
              <Flex mb={4} gap={8}>
                <Box flex="1">
                  <Flex mb={3}>
                    <Text fontSize="sm" fontWeight="semibold" color="#374151" minW="120px">
                      Company Name
                    </Text>
                    <Text fontSize="sm" color="#374151">
                      Audridge Wind...
                    </Text>
                  </Flex>
                  <Flex mb={3}>
                    <Text fontSize="sm" fontWeight="semibold" color="#374151" minW="120px">
                      Full Name
                    </Text>
                    <Text fontSize="sm" color="#374151">
                      Ms. Mary W Auldr...
                    </Text>
                  </Flex>
                  <Flex mb={3}>
                    <Text fontSize="sm" fontWeight="semibold" color="#374151" minW="120px">
                      Customer Type
                    </Text>
                    <Text fontSize="sm" color="#374151">
                      Direct Mail
                    </Text>
                  </Flex>
                  <Flex mb={3}>
                    <Text fontSize="sm" fontWeight="semibold" color="#374151" minW="120px">
                      Terms
                    </Text>
                    <Text fontSize="sm" color="#374151">
                      Net 30
                    </Text>
                  </Flex>
                  <Flex mb={3}>
                    <Text fontSize="sm" fontWeight="semibold" color="#374151" minW="120px">
                      Bill To
                    </Text>
                    <Text fontSize="sm" color="#374151">
                      Audridge Windows
                    </Text>
                  </Flex>
                </Box>
                <Box flex="1">
                  <Flex mb={3}>
                    <Text fontSize="sm" fontWeight="semibold" color="#374151" minW="80px">
                      Main Phone
                    </Text>
                    <Text fontSize="sm" color="#374151">
                      555-555-555
                    </Text>
                  </Flex>
                  <Flex mb={3}>
                    <Text fontSize="sm" fontWeight="semibold" color="#374151" minW="80px">
                      Alt. Phone
                    </Text>
                    <Text fontSize="sm" color="#374151">
                      555-555-555
                    </Text>
                  </Flex>
                  <Flex mb={3}>
                    <Text fontSize="sm" fontWeight="semibold" color="#374151" minW="80px">
                      Fax
                    </Text>
                    <Text fontSize="sm" color="#374151">
                      555-555-555
                    </Text>
                  </Flex>
                  <Flex mb={3}>
                    <Text fontSize="sm" fontWeight="semibold" color="#374151" minW="80px">
                      Main Email
                    </Text>
                    <Text fontSize="sm" color="#374151">
                      auddridgewindow...
                    </Text>
                  </Flex>
                </Box>
              </Flex>
  
              <Divider my={4} />
  
              <Box mb={4}>
                <Text fontSize="sm" fontWeight="semibold" color="#374151" mb={2}>
                  NOTE
                </Text>
                <Text fontSize="sm" color="#6b7280">
                  No note available
                </Text>
              </Box>
  
              <Box mb={4}>
                <Text fontSize="sm" fontWeight="semibold" color="#374151" mb={2}>
                  REPORTS FOR THIS
                </Text>
                <Flex gap={3}>
                  <Text fontSize="sm" color="#3b82f6" cursor="pointer" textDecoration="underline">
                    QuickReport
                  </Text>
                  <Text fontSize="sm" color="#3b82f6" cursor="pointer" textDecoration="underline">
                    Open Balance
                  </Text>
                </Flex>
              </Box>
  
              <Divider my={4} />
  
              {/* Tabs */}
              <Flex borderBottom="1px solid #cbd5e1" gap={0}>
                <Box
                  px={4}
                  py={2}
                  bg="white"
                  borderBottom="2px solid #3b82f6"
                  fontWeight="semibold"
                  fontSize="sm"
                  color="#2d3748"
                >
                  Transactions
                </Box>
                <Box
                  px={4}
                  py={2}
                  bg="#f5f7fb"
                  fontSize="sm"
                  color="#6b7280"
                  cursor="pointer"
                >
                  Contacts
                </Box>
                <Box
                  px={4}
                  py={2}
                  bg="#f5f7fb"
                  fontSize="sm"
                  color="#6b7280"
                  cursor="pointer"
                >
                  To Do's
                </Box>
                <Box
                  px={4}
                  py={2}
                  bg="#f5f7fb"
                  fontSize="sm"
                  color="#6b7280"
                  cursor="pointer"
                >
                  Notes
                </Box>
                <Box
                  px={4}
                  py={2}
                  bg="#f5f7fb"
                  fontSize="sm"
                  color="#6b7280"
                  cursor="pointer"
                >
                  Sent Email
                </Box>
              </Flex>
  
              {/* Filter Options */}
              <Flex gap={4} mt={4} mb={3}>
                <Select size="sm" bg="white" border="1px solid #cbd5e1" w="180px" fontSize="13px">
                  <option>SHOW All Tran...</option>
                </Select>
                <Select size="sm" bg="white" border="1px solid #cbd5e1" w="180px" fontSize="13px">
                  <option>FILTER BY All</option>
                </Select>
                <Select size="sm" bg="white" border="1px solid #cbd5e1" w="180px" fontSize="13px">
                  <option>DATE All</option>
                </Select>
              </Flex>
  
              {/* Transactions Table */}
              <Box border="1px solid #cbd5e1" borderRadius="md" overflow="hidden">
                <Table size="sm" variant="unstyled">
                  <Thead bg="#f8f9fa">
                    <Tr>
                      <Th fontSize="xs" textTransform="uppercase" color="#6b7280" fontWeight="semibold" py={2} px={3} borderBottom="1px solid #e5e7eb">
                        TYPE
                      </Th>
                      <Th fontSize="xs" textTransform="uppercase" color="#6b7280" fontWeight="semibold" py={2} px={3} borderBottom="1px solid #e5e7eb">
                        NUM
                      </Th>
                      <Th fontSize="xs" textTransform="uppercase" color="#6b7280" fontWeight="semibold" py={2} px={3} borderBottom="1px solid #e5e7eb">
                        DATE
                      </Th>
                      <Th fontSize="xs" textTransform="uppercase" color="#6b7280" fontWeight="semibold" py={2} px={3} borderBottom="1px solid #e5e7eb">
                        ACCOUNT
                      </Th>
                      <Th fontSize="xs" textTransform="uppercase" color="#6b7280" fontWeight="semibold" py={2} px={3} textAlign="right" borderBottom="1px solid #e5e7eb">
                        AMOUNT
                      </Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {transactionsData.map((tx, i) => (
                      <Tr key={i} borderBottom="1px solid #e5e7eb" _hover={{ bg: "#f8f9fa" }}>
                        <Td py={2} px={3} fontSize="sm">
                          {tx.type}
                        </Td>
                        <Td py={2} px={3} fontSize="sm">
                          {tx.num}
                        </Td>
                        <Td py={2} px={3} fontSize="sm">
                          {tx.date}
                        </Td>
                        <Td py={2} px={3} fontSize="sm">
                          {tx.account}
                        </Td>
                        <Td py={2} px={3} fontSize="sm" textAlign="right">
                          {tx.amount}
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </Box>
  
              {/* Bottom Actions */}
              <Flex justify="space-between" align="center" mt={4}>
                <Select size="sm" bg="white" border="1px solid #cbd5e1" w="200px" fontSize="13px">
                  <option>Manage Transactions</option>
                </Select>
                <Button
                  size="sm"
                  bg="whimage.pngite"
                  border="1px solid #cbd5e1"
                  color="#2d3748"
                  fontSize="13px"
                  fontWeight="normal"
                  h="32px"
                >
                  Run Reports
                </Button>
              </Flex>
            </Box>
          </Box>
        </Flex>
      </Box>
    );
  }
  
  export default CustomerCenter;