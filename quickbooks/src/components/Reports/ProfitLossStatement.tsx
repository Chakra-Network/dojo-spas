  import { useState } from 'react';
  import {
    ChakraProvider,
    Box,
    Heading,
    Button,
    Select,
    Input,
    HStack,
    VStack,
    Text,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    IconButton,
    Radio,
    RadioGroup,
    Stack,
    Flex,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
  } from '@chakra-ui/react';
  import { ChevronDownIcon, ChevronRightIcon, ArrowDownIcon, RepeatIcon } from 'lucide-react';
  import { useDojoState, Invoice, Expense } from '../../dojo/state';

  export default function ProfitLossReport() {
    const [fromDate, setFromDate] = useState('2021-01-01');
    const [toDate, setToDate] = useState('2021-08-05');
    const [reportBasis, setReportBasis] = useState('accrual');
    const [showFilters, setShowFilters] = useState(false);
    
    const invoices: Invoice[] = useDojoState('invoices');
    const expenses: Expense[] = useDojoState('expenses');

    
    const filteredInvoices = invoices.filter((invoice: Invoice) => {
      const invoiceDate = new Date(invoice.createdAt);
      const from = new Date(fromDate);
      const to = new Date(toDate);
      return invoiceDate >= from && invoiceDate <= to;
    });

    const filteredExpenses = expenses.filter((expense: Expense) => {
      const expenseDate = new Date(expense.date);
      const from = new Date(fromDate);
      const to = new Date(toDate);
      return expenseDate >= from && expenseDate <= to;
    });

    // Calculate dynamic report data
    const calculateReportData = () => {
      let totalIncome = 0;
      let constructionIncome = 0;
      let freightIncome = 0;
      let partsSales = 0;
      let serviceIncome = 0;

      let totalCOGS = 0;
      let constructionLabor = 0;
      let costOfSales = 0;
      let materials = 0;

      let totalExpenses = 0;
      const advertising = { web: { bannerAds: 0, socialMedia: 0, total: 0 }, print: { newspapersMagazines: 0, brochures: 0, total: 0 }, total: 0 };
      let bankServiceCharges = 0;
      let cleaning = 0;
      let duesSubscriptions = 0;
      let equipmentRental = 0;

      filteredInvoices.forEach((invoice: Invoice) => {
        if (invoice.status === 'paid') {
          totalIncome += invoice.amount;
          // For simplicity, distributing income evenly across categories for now
          constructionIncome += invoice.amount / 4;
          freightIncome += invoice.amount / 4;
          partsSales += invoice.amount / 4;
          serviceIncome += invoice.amount / 4;
        }
      });

      filteredExpenses.forEach((expense: Expense) => {
        totalExpenses += expense.amount;
        // Categorize expenses (simplified)
        if (expense.category === 'Marketing') {
          advertising.total += expense.amount;
          advertising.web.total += expense.amount / 2; // Assuming half marketing is web
          advertising.web.bannerAds += expense.amount / 4; // Further breakdown
          advertising.web.socialMedia += expense.amount / 4;
          advertising.print.total += expense.amount / 2;
          advertising.print.newspapersMagazines += expense.amount / 4;
          advertising.print.brochures += expense.amount / 4;
        } else if (expense.category === 'Professional Services') {
          bankServiceCharges += expense.amount; // For simplicity
        } else if (expense.category === 'Office Supplies') {
          cleaning += expense.amount; // For simplicity
        } else if (expense.category === 'Software') {
          duesSubscriptions += expense.amount; // For simplicity
        } else if (expense.category === 'Utilities') {
          equipmentRental += expense.amount; // For simplicity
        }
        // More detailed categorization would go here
      });

      // Simplified COGS calculation (e.g., 50% of construction income)
      totalCOGS = constructionIncome * 0.5;
      constructionLabor = totalCOGS / 3;
      costOfSales = totalCOGS / 3;
      materials = totalCOGS / 3;

      const grossProfit = totalIncome - totalCOGS;
      const netOrdinaryIncome = grossProfit - totalExpenses;

      return {
        income: {
          constructionIncome,
          freightIncome,
          partsSales,
          serviceIncome,
          total: totalIncome,
        },
        cogs: {
          constructionLabor,
          costOfSales,
          materials,
          total: totalCOGS,
        },
        grossProfit,
        expenses: {
          advertising,
          bankServiceCharges,
          cleaning,
          duesSubscriptions,
          equipmentRental,
        },
        netOrdinaryIncome,
        netIncome: netOrdinaryIncome, // No other income/expense for simplicity
      };
    };

    const reportData = calculateReportData();

    // Collapsed sections state
    const [collapsed, setCollapsed] = useState({
      income: false,
      constructionIncome: false,
      cogs: false,
      expense: false,
      advertising: false,
      web: false,
      print: false,
    });

    const buttonStyle = {
      bg: "white",
      border: "1px solid #ccc",
      boxShadow: "inset 0 -1px 2px rgba(0,0,0,0.1)",
      color: "black",
      fontSize: "13px",
      fontWeight: "semibold",
      _hover: { bg: "#f5f5f5" },
      _active: { bg: "#e5e5e5" },
      size: "sm",
      height: "28px",
      borderRadius: "2px",
    };

    const toggleSection = (section: keyof typeof collapsed) => {
      setCollapsed(prev => ({ ...prev, [section]: !prev[section] }));
    };

    return (
      <ChakraProvider>
        <Box  minH="100vh">
          <Flex
            wrap="wrap"
            gap="1"
            p="1.5"
            borderBottom="1px solid #d1d1d1"
            bg="#f8f8f8"
            align="center"
            justify="flex-start"
          >
            <Button {...buttonStyle}>Customize Report</Button>
            <Button {...buttonStyle}>Comment on Report</Button>
            <Button {...buttonStyle} color="gray.500" isDisabled>
              Share Template
            </Button>
            <Button {...buttonStyle}>Memorize</Button>

            {/* Print Menu */}
            <Menu>
              <MenuButton as={Button} {...buttonStyle} rightIcon={<ChevronDownIcon />}>
                Print
              </MenuButton>
              <MenuList fontSize="13px" p="0" border="1px solid #ccc" minW="160px">
                <MenuItem icon={<ArrowDownIcon />}>Print Report</MenuItem>
                <MenuItem icon={<ArrowDownIcon />}>Print List</MenuItem>
              </MenuList>
            </Menu>

            {/* Email Menu */}
            <Menu>
              <MenuButton as={Button} {...buttonStyle} rightIcon={<ChevronDownIcon />}>
                E-mail
              </MenuButton>
              <MenuList fontSize="13px" p="0" border="1px solid #ccc" minW="160px">
                <MenuItem icon={<ArrowDownIcon />}>E-mail Report</MenuItem>
                <MenuItem icon={<ArrowDownIcon />}>E-mail List</MenuItem>
              </MenuList>
            </Menu>

            {/* Excel Menu */}
            <Menu>
              <MenuButton as={Button} {...buttonStyle} rightIcon={<ChevronDownIcon />}>
                Excel
              </MenuButton>
              <MenuList fontSize="13px" p="0" border="1px solid #ccc" minW="160px">
                <MenuItem icon={<ArrowDownIcon />}>Export to Excel</MenuItem>
              </MenuList>
            </Menu>

            <Button {...buttonStyle}>Hide Header</Button>
            <Button {...buttonStyle}>Collapse Rows</Button>
            <Button {...buttonStyle} leftIcon={<RepeatIcon />}>
              Refresh
            </Button>
          </Flex>


          {/* Date and Filter Section */}
          <Flex align="center" mb={6} wrap="wrap" gap={2}>
            <Text fontSize="sm" fontWeight="medium">Dates:</Text>
            <Select placeholder="Custom" size="sm" width="120px">
              <option value="custom">Custom</option>
            </Select>
            <Text fontSize="sm" fontWeight="medium">From</Text>
            <Input type="date" size="sm" width="140px" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
            <Text fontSize="sm" fontWeight="medium">To</Text>
            <Input type="date" size="sm" width="140px" value={toDate} onChange={(e) => setToDate(e.target.value)} />
            <Text fontSize="sm" fontWeight="medium">Show Columns:</Text>
            <Select placeholder="Total only" size="sm" width="120px">
              <option value="total">Total only</option>
            </Select>
            <Text fontSize="sm" fontWeight="medium">Sort By:</Text>
            <Select placeholder="Default" size="sm" width="120px">
              <option value="default">Default</option>
            </Select>
          </Flex>

          {/* Report Basis Section */}
          <Flex align="center" mb={6}>
            <Text fontSize="sm" fontWeight="medium" mr={2}>Report Basis:</Text>
            <RadioGroup defaultValue="accrual" size="sm" value={reportBasis} onChange={setReportBasis}>
              <Stack direction="row">
                <Radio value="accrual">Accrual</Radio>
                <Radio value="cash">Cash</Radio>
              </Stack>
            </RadioGroup>
            <Button variant="link" colorScheme="blue" size="sm" ml={4} onClick={() => setShowFilters(!showFilters)}>Show Filters</Button>
          </Flex>

          <Flex height="100vh" align="center" justify="center">
            <Box
              bg="white"
              p={6}

              borderRadius="md"
              boxShadow="sm"
              width="650px"
              marginTop="100px"
              height="1200px"
            >
              <VStack spacing={1} mb={6}>
                <Heading size="lg" color="blue.700">
                  Buildem, Inc.
                </Heading>
                <Heading size="md" color="blue.700">
                  Profit & Loss
                </Heading>
                <Text fontWeight="medium">January 1 through August 5, 2021</Text>
              </VStack>

            <Box overflowX="auto">
              <Table variant="simple" size="sm">
                <Thead>
                  <Tr>
                    <Th></Th>
                    <Th isNumeric>Jan 1 - Aug 5, 21</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {/* Ordinary Income/Expense */}
                  <Tr bg="gray.100">
                    <Td fontWeight="bold" colSpan={2}>
                      Ordinary Income/Expense
                    </Td>
                  </Tr>

                  {/* Income */}
                  <Tr bg="gray.50">
                    <Td>
                      <HStack>
                        <IconButton
                          size="xs"
                          variant="ghost"
                          aria-label="Toggle Income Section"
                          icon={
                            collapsed.income ? (
                              <ChevronRightIcon />
                            ) : (
                              <ChevronDownIcon />
                            )
                          }
                          onClick={() => toggleSection('income')}
                        />
                        <Text fontWeight="semibold">Income</Text>
                      </HStack>
                    </Td>
                    <Td></Td>
                  </Tr>

                  {!collapsed.income && (
                    <>
                      <Tr>
                        <Td fontWeight="bold" pl={12}>
                          <HStack>
                            <IconButton
                              size="xs"
                        
                              variant="ghost"
                              aria-label="Toggle Construction Income Section"
                              icon={
                                collapsed.constructionIncome ? (
                                  <ChevronRightIcon />
                                ) : (
                                  <ChevronDownIcon />
                                )
                              }
                              onClick={() => toggleSection('constructionIncome')}
                            />
                            <Text>Construction Income</Text>
                          </HStack>
                        </Td>
                        <Td isNumeric>
                          {reportData.income.constructionIncome.toFixed(2)}
                        </Td>
                      </Tr>
                      <Tr>
                        <Td fontWeight="bold" pl={12}>Freight Income</Td>
                        <Td isNumeric>
                          {reportData.income.freightIncome.toFixed(2)}
                        </Td>
                      </Tr>
                      <Tr>
                        <Td fontWeight="bold" pl={12}>Parts Sales</Td>
                        <Td isNumeric>
                          {reportData.income.partsSales.toFixed(2)}
                        </Td>
                      </Tr>
                      <Tr>
                        <Td fontWeight="bold" pl={12}>Service Income</Td>
                        <Td isNumeric>
                          {reportData.income.serviceIncome.toFixed(2)}
                        </Td>
                      </Tr>
                    </>
                  )}

                  <Tr bg="gray.50">
                    <Td fontWeight="semibold">Total Income</Td>
                    <Td isNumeric fontWeight="semibold">
                      {reportData.income.total.toFixed(2)}
                    </Td>
                  </Tr>

                  {/* Cost of Goods Sold */}
                  <Tr bg="gray.50">
                    <Td>
                      <HStack>
                        <IconButton
                          size="xs"
                          variant="ghost"
                          aria-label="Toggle Cost of Goods Sold Section"
                          icon={
                            collapsed.cogs ? (
                              <ChevronRightIcon />
                            ) : (
                              <ChevronDownIcon />
                            )
                          }
                          onClick={() => toggleSection('cogs')}
                        />
                        <Text fontWeight="bold">Cost of Goods Sold</Text>
                      </HStack>
                    </Td>
                    <Td></Td>
                  </Tr>

                  {!collapsed.cogs && (
                    <>
                      <Tr>
                        <Td fontWeight="bold" pl={12}>Construction Labor</Td>
                        <Td isNumeric>
                          {reportData.cogs.constructionLabor.toFixed(2)}
                        </Td>
                      </Tr>
                      <Tr>
                        <Td fontWeight="bold" pl={12}>Cost of Sales</Td>
                        <Td isNumeric>
                          {reportData.cogs.costOfSales.toFixed(2)}
                        </Td>
                      </Tr>
                      <Tr>
                        <Td fontWeight="bold" pl={12}>Materials</Td>
                        <Td isNumeric>
                          {reportData.cogs.materials.toFixed(2)}
                        </Td>
                      </Tr>
                    </>
                  )}

                  <Tr bg="gray.50">
                    <Td fontWeight="bold">Total COGS</Td>
                    <Td isNumeric fontWeight="semibold">
                      {reportData.cogs.total.toFixed(2)}
                    </Td>
                  </Tr>

                  {/* Gross Profit */}
                  <Tr bg="gray.100">
                    <Td fontWeight="bold">Gross Profit</Td>
                    <Td isNumeric fontWeight="bold">
                      {reportData.grossProfit.toFixed(2)}
                    </Td>
                  </Tr>

                  {/* Expense */}
                  <Tr bg="gray.50">
                    <Td>
                      <HStack>
                        <IconButton
                          size="xs"
                          variant="ghost"
                          aria-label="Toggle Expense Section"
                          icon={
                            collapsed.expense ? (
                              <ChevronRightIcon />
                            ) : (
                              <ChevronDownIcon />
                            )
                          }
                          onClick={() => toggleSection('expense')}
                        />
                        <Text fontWeight="semibold">Expense</Text>
                      </HStack>
                    </Td>
                    <Td></Td>
                  </Tr>

                  {!collapsed.expense && (
                    <>
                      {/* Advertising */}
                      <Tr bg="gray.50">
                        <Td pl={8}>
                          <HStack>
                            <IconButton
                              size="xs"
                              variant="ghost"
                              aria-label="Toggle Advertising Section"
                              icon={
                                collapsed.advertising ? (
                                  <ChevronRightIcon />
                                ) : (
                                  <ChevronDownIcon />
                                )
                              }
                              onClick={() => toggleSection('advertising')}
                            />
                            <Text fontWeight="bold">Advertising</Text>
                          </HStack>
                        </Td>
                        <Td></Td>
                      </Tr>

                      {!collapsed.advertising && (
                        <>
                          {/* Web */}
                          <Tr bg="gray.50">
                            <Td pl={16}>
                              <HStack>
                                <IconButton
                                  size="xs"
                                  variant="ghost"
                                  aria-label="Toggle Web Section"
                                  icon={
                                    collapsed.web ? (
                                      <ChevronRightIcon />
                                    ) : (
                                      <ChevronDownIcon />
                                    )
                                  }
                                  onClick={() => toggleSection('web')}
                                />
                                <Text fontWeight="bold">Web</Text>
                              </HStack>
                            </Td>
                            <Td></Td>
                          </Tr>

                          {!collapsed.web && (
                            <>
                              <Tr>
                                <Td fontWeight="bold" pl={24}>Banner Ads</Td>
                                <Td isNumeric>
                                  {reportData.expenses.advertising.web.bannerAds.toFixed(
                                    2
                                  )}
                                </Td>
                              </Tr>
                              <Tr>
                                <Td fontWeight="bold" pl={24}>Social Media</Td>
                                <Td isNumeric>
                                  {reportData.expenses.advertising.web.socialMedia.toFixed(
                                    2
                                  )}
                                </Td>
                              </Tr>
                            </>
                          )}

                          <Tr bg="gray.50">
                            <Td pl={20} fontWeight="bold">
                              Total Web
                            </Td>
                            <Td isNumeric fontWeight="semibold">
                              {reportData.expenses.advertising.web.total.toFixed(2)}
                            </Td>
                          </Tr>

                          {/* Print */}
                          <Tr bg="gray.50">
                            <Td pl={16}>
                              <HStack>
                                <IconButton
                                  size="xs"
                                  variant="ghost"
                                  aria-label="Toggle Print Section"
                                  icon={
                                    collapsed.print ? (
                                      <ChevronRightIcon />
                                    ) : (
                                      <ChevronDownIcon />
                                    )
                                  }
                                  onClick={() => toggleSection('print')}
                                />
                                <Text fontWeight="bold">Print</Text>
                              </HStack>
                            </Td>
                            <Td></Td>
                          </Tr>

                            {!collapsed.print && (
                              <>
                                <Tr>
                                  <Td fontWeight="bold" pl={24}>Newspapers & Magazines</Td>
                                  <Td isNumeric>
                                    {reportData.expenses.advertising.print.newspapersMagazines.toFixed(
                                      2
                                    )}
                                  </Td>
                                </Tr>
                                <Tr>
                                  <Td fontWeight="bold" pl={24}>Brochures</Td>
                                  <Td isNumeric>
                                    {reportData.expenses.advertising.print.brochures.toFixed(
                                      2
                                    )}
                                  </Td>
                                </Tr>
                              </>
                            )}

                            <Tr bg="gray.50">
                              <Td pl={20} fontWeight="bold">
                                Total Print
                              </Td>
                              <Td isNumeric fontWeight="semibold">
                                {reportData.expenses.advertising.print.total.toFixed(2)}
                              </Td>
                            </Tr>
                          </>
                        )}

                        <Tr bg="gray.50">
                          <Td pl={12} fontWeight="bold">
                            Total Advertising
                          </Td>
                          <Td isNumeric fontWeight="bold">
                            {reportData.expenses.advertising.total.toFixed(2)}
                          </Td>
                        </Tr>

                        {/* Other Expenses */}
                        <Tr>
                          <Td fontWeight="bold" pl={12}>Bank Service Charges</Td>
                          <Td isNumeric>
                            {reportData.expenses.bankServiceCharges.toFixed(2)}
                          </Td>
                        </Tr>
                        <Tr>
                          <Td fontWeight="bold" pl={12}>Cleaning</Td>
                          <Td isNumeric>
                            {reportData.expenses.cleaning.toFixed(2)}
                          </Td>
                        </Tr>
                        <Tr>
                          <Td fontWeight="bold" pl={12}>Dues and Subscriptions</Td>
                          <Td isNumeric>
                            {reportData.expenses.duesSubscriptions.toFixed(2)}
                          </Td>
                        </Tr>
                        <Tr>
                          <Td fontWeight="bold" pl={12}>Equipment Rental</Td>
                          <Td isNumeric>
                            {reportData.expenses.equipmentRental.toFixed(2)}
                          </Td>
                        </Tr>
                      </>
                    )}
                  </Tbody>
                </Table>
              </Box>
            </Box>
          </Flex>

          {/* Footer */}
          <Flex justify="flex-end" mt={4}>
            <Text fontSize="xs" color="gray.500">
              {new Date(toDate).toLocaleDateString()}
            </Text>
          </Flex>
          <Flex justify="flex-start" mt={1}>
            <Text fontSize="xs" color="gray.600" fontWeight="medium">
              {reportBasis === 'accrual' ? 'Accrual Basis' : 'Cash Basis'}
            </Text>
          </Flex>
        </Box>
      </ChakraProvider>
    );
  }
