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
} from '@chakra-ui/react';
import { ChevronDownIcon, ChevronRightIcon } from 'lucide-react';

export default function ProfitLossReport() {
  const [fromDate, setFromDate] = useState('01/01/2021');
  const [toDate, setToDate] = useState('08/05/2021');
  const [reportBasis, setReportBasis] = useState('accrual');
  const [showFilters, setShowFilters] = useState(false);
  
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

  const toggleSection = (section: keyof typeof collapsed) => {
    setCollapsed(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const reportData = {
    income: {
      constructionIncome: 108656.0,
      freightIncome: 2053.32,
      partsSales: 78656.32,
      serviceIncome: 15632.32,
      total: 204997.96,
    },
    cogs: {
      constructionLabor: 18656.32,
      costOfSales: 20656.23,
      materials: 95656.32,
      total: 134968.87,
    },
    grossProfit: 70029.09,
    expenses: {
      advertising: {
        web: {
          bannerAds: 850.0,
          socialMedia: 750.0,
          total: 1600.0,
        },
        print: {
          newspapersMagazines: 500.0,
          brochures: 400.0,
          total: 900.0,
        },
        total: 2500.0,
      },
      bankServiceCharges: 40.0,
      cleaning: 260.0,
      duesSubscriptions: 250.0,
      equipmentRental: 10656.32,
    },
  };

  return (
    <ChakraProvider>
      <Box bg="gray.50" minH="100vh">
        
        <Flex height="100vh" align="center" justify="center">
          <Box
            bg="white"
            p={6}
            borderRadius="md"
            boxShadow="sm"
            width="850px"
            height="950px"
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
                      <Td pl={12}>
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
                      <Td pl={12}>Freight Income</Td>
                      <Td isNumeric>
                        {reportData.income.freightIncome.toFixed(2)}
                      </Td>
                    </Tr>
                    <Tr>
                      <Td pl={12}>Parts Sales</Td>
                      <Td isNumeric>
                        {reportData.income.partsSales.toFixed(2)}
                      </Td>
                    </Tr>
                    <Tr>
                      <Td pl={12}>Service Income</Td>
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
                      <Text fontWeight="semibold">Cost of Goods Sold</Text>
                    </HStack>
                  </Td>
                  <Td></Td>
                </Tr>

                {!collapsed.cogs && (
                  <>
                    <Tr>
                      <Td pl={12}>Construction Labor</Td>
                      <Td isNumeric>
                        {reportData.cogs.constructionLabor.toFixed(2)}
                      </Td>
                    </Tr>
                    <Tr>
                      <Td pl={12}>Cost of Sales</Td>
                      <Td isNumeric>
                        {reportData.cogs.costOfSales.toFixed(2)}
                      </Td>
                    </Tr>
                    <Tr>
                      <Td pl={12}>Materials</Td>
                      <Td isNumeric>
                        {reportData.cogs.materials.toFixed(2)}
                      </Td>
                    </Tr>
                  </>
                )}

                <Tr bg="gray.50">
                  <Td fontWeight="semibold">Total COGS</Td>
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
                          <Text fontWeight="semibold">Advertising</Text>
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
                              <Text fontWeight="semibold">Web</Text>
                            </HStack>
                          </Td>
                          <Td></Td>
                        </Tr>

                        {!collapsed.web && (
                          <>
                            <Tr>
                              <Td pl={24}>Banner Ads</Td>
                              <Td isNumeric>
                                {reportData.expenses.advertising.web.bannerAds.toFixed(
                                  2
                                )}
                              </Td>
                            </Tr>
                            <Tr>
                              <Td pl={24}>Social Media</Td>
                              <Td isNumeric>
                                {reportData.expenses.advertising.web.socialMedia.toFixed(
                                  2
                                )}
                              </Td>
                            </Tr>
                          </>
                        )}

                        <Tr bg="gray.50">
                          <Td pl={20} fontWeight="semibold">
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
                              <Text fontWeight="semibold">Print</Text>
                            </HStack>
                          </Td>
                          <Td></Td>
                        </Tr>

                          {!collapsed.print && (
                            <>
                              <Tr>
                                <Td pl={24}>Newspapers & Magazines</Td>
                                <Td isNumeric>
                                  {reportData.expenses.advertising.print.newspapersMagazines.toFixed(
                                    2
                                  )}
                                </Td>
                              </Tr>
                              <Tr>
                                <Td pl={24}>Brochures</Td>
                                <Td isNumeric>
                                  {reportData.expenses.advertising.print.brochures.toFixed(
                                    2
                                  )}
                                </Td>
                              </Tr>
                            </>
                          )}

                          <Tr bg="gray.50">
                            <Td pl={20} fontWeight="semibold">
                              Total Print
                            </Td>
                            <Td isNumeric fontWeight="semibold">
                              {reportData.expenses.advertising.print.total.toFixed(2)}
                            </Td>
                          </Tr>
                        </>
                      )}

                      <Tr bg="gray.50">
                        <Td pl={12} fontWeight="semibold">
                          Total Advertising
                        </Td>
                        <Td isNumeric fontWeight="semibold">
                          {reportData.expenses.advertising.total.toFixed(2)}
                        </Td>
                      </Tr>

                      {/* Other Expenses */}
                      <Tr>
                        <Td pl={12}>Bank Service Charges</Td>
                        <Td isNumeric>
                          {reportData.expenses.bankServiceCharges.toFixed(2)}
                        </Td>
                      </Tr>
                      <Tr>
                        <Td pl={12}>Cleaning</Td>
                        <Td isNumeric>
                          {reportData.expenses.cleaning.toFixed(2)}
                        </Td>
                      </Tr>
                      <Tr>
                        <Td pl={12}>Dues and Subscriptions</Td>
                        <Td isNumeric>
                          {reportData.expenses.duesSubscriptions.toFixed(2)}
                        </Td>
                      </Tr>
                      <Tr>
                        <Td pl={12}>Equipment Rental</Td>
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
            08/05/21
          </Text>
        </Flex>
        <Flex justify="flex-start" mt={1}>
          <Text fontSize="xs" color="gray.600" fontWeight="medium">
            Accrual Basis
          </Text>
        </Flex>
      </Box>
    </ChakraProvider>
  );
}
