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
    const [fromDate, setFromDate] = useState('2025-01-01');
    const [toDate, setToDate] = useState('2025-12-31');
    const [reportBasis, setReportBasis] = useState('accrual');
    const [showFilters, setShowFilters] = useState(false);
    
    const invoices: Invoice[] = useDojoState('invoices');
    const expenses: Expense[] = useDojoState('expenses');

    // Calculate dynamic report data
    const calculateReportData = () => {
      const startDate = new Date(fromDate);
      const endDate = new Date(toDate);

      const filteredInvoices = invoices.filter(invoice => {
        const invoiceDate = new Date(invoice.createdAt);
        return invoiceDate >= startDate && invoiceDate <= endDate;
      });

      const filteredExpenses = expenses.filter(expense => {
        const expenseDate = new Date(expense.date);
        return expenseDate >= startDate && expenseDate <= endDate;
      });

      let totalIncome = 0;
      filteredInvoices.forEach(invoice => {
        if (invoice.status === 'paid') {
          totalIncome += invoice.amount;
        }
      });

      const totalCOGS = totalIncome * 0.5; // Simplified COGS as 50% of income

      let totalExpenses = 0;
      const expensesByCategory: Record<string, number> = {};

      filteredExpenses.forEach(expense => {
        totalExpenses += expense.amount;
        expensesByCategory[expense.category] = (expensesByCategory[expense.category] || 0) + expense.amount;
      });

      const grossProfit = totalIncome - totalCOGS;
      const netOrdinaryIncome = grossProfit - totalExpenses;
      const netIncome = netOrdinaryIncome;

      const reportData = {
          income: {
              constructionIncome: expensesByCategory['Construction Income'] || 0, // Placeholder, needs actual income categorization
              freightIncome: expensesByCategory['Freight Income'] || 0,     // Placeholder
              partsSales: expensesByCategory['Parts Sales'] || 0,         // Placeholder
              serviceIncome: expensesByCategory['Service Income'] || 0,     // Placeholder
              total: totalIncome,
          },
          cogs: {
              constructionLabor: expensesByCategory['Construction Labor'] || 0, // Placeholder
              costOfSales: expensesByCategory['Cost of Sales'] || 0,       // Placeholder
              materials: expensesByCategory['Materials'] || 0,             // Placeholder
              total: totalCOGS,
          },
          grossProfit: grossProfit,
          expenses: {
              advertising: {
                web: { bannerAds: 0, socialMedia: 0, total: expensesByCategory['Advertising'] || 0 }, // Simplified
                print: { newspapersMagazines: 0, brochures: 0, total: 0 }, // Simplified
                total: expensesByCategory['Advertising'] || 0 // Sum of all advertising
              },
              bankServiceCharges: expensesByCategory['Bank Service Charges'] || 0,
              cleaning: expensesByCategory['Cleaning'] || 0,
              duesSubscriptions: expensesByCategory['Dues & Subscriptions'] || 0,
              equipmentRental: expensesByCategory['Equipment Rental'] || 0,
              // Add other categories here as needed, or aggregate
              total: totalExpenses
          },
          netOrdinaryIncome: netOrdinaryIncome,
          netIncome: netIncome,
      };
      return reportData;
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
