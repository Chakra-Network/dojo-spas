import React, { useState } from 'react';
import ReportsSidebar from './ReportsSidebar';
import { Input, Flex, Box, Spacer, Menu, MenuButton, MenuList, MenuItem, Button, RadioGroup, Radio, Stack, Select, Text } from "@chakra-ui/react";
import { Search } from "lucide-react";
import { ProfitLossStandard } from "./ProfitLossStandard";
import { ProfitLossDetail } from "./ProfitLossDetail";
import ProfitLossStatement from "./ProfitLossStatement"; 



interface ReportsPageProps {
  
}

export const ReportsPage: React.FC<ReportsPageProps> = () => {
  const [activeCategory, setActiveCategory] = useState<string>("Company & Financial");
  const [showProfitLossStatement, setShowProfitLossStatement] = useState(false); 
  const handleSelectCategory = (category: string) => {
    setActiveCategory(category);
  };

  return (
    <Box dispFlay="flex" height="100vh" overflow="hidden">
      {!showProfitLossStatement && (
        <ReportsSidebar activeCategory={activeCategory} onSelectCategory={handleSelectCategory} />
      )}
      
      <Box flex="1" bg="gray.50" overflow="auto">
        <Box p={6}>
          {showProfitLossStatement && (
            <>
              <Flex align="center" mb={4}>
                <h1 className="text-2xl font-bold text-gray-800">Report Center</h1>
                <Spacer />
                </Flex>
              {/* Menu Buttons and Filters */}
              <Flex mb={4} wrap="wrap" gap={2}>
                <Button size="sm" variant="solid">Customize Report</Button>
                <Button size="sm" variant="solid">Comment on Report</Button>
                <Button size="sm" variant="link" colorScheme="blue">Share Template</Button>
                <Button size="sm" variant="solid">Memorize</Button>

                <Menu>
                  <MenuButton as={Button} size="sm" rightIcon={<Search />} variant="solid">
                    Print
                  </MenuButton>
                  <MenuList>
                    <MenuItem>Print Report</MenuItem>
                    <MenuItem>Print List</MenuItem>
                  </MenuList>
                </Menu>

                <Menu>
                  <MenuButton as={Button} size="sm" rightIcon={<Search />} variant="solid">
                    E-mail
                  </MenuButton>
                  <MenuList>
                    <MenuItem>E-mail Report</MenuItem>
                    <MenuItem>E-mail List</MenuItem>
                  </MenuList>
                </Menu>

                <Menu>
                  <MenuButton as={Button} size="sm" rightIcon={<Search />} variant="solid">
                    Excel
                  </MenuButton>
                  <MenuList>
                    <MenuItem>Export to Excel</MenuItem>
                  </MenuList>
                </Menu>

                <Button size="sm" variant="solid">Hide Header</Button>
                <Button size="sm" variant="solid">Collapse Rows</Button>
                <Button size="sm" variant="solid">Refresh</Button>
              </Flex>

              {/* Date and Filter Section */}
              <Flex align="center" mb={6} wrap="wrap" gap={2}>
                <Text fontSize="sm" fontWeight="medium">Dates:</Text>
                <Select placeholder="Custom" size="sm" width="120px">
                  <option value="custom">Custom</option>
                </Select>
                <Text fontSize="sm" fontWeight="medium">From</Text>
                <Input type="date" size="sm" width="140px" value="2021-01-01" />
                <Text fontSize="sm" fontWeight="medium">To</Text>
                <Input type="date" size="sm" width="140px" value="2021-08-05" />
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
                <RadioGroup defaultValue="accrual" size="sm">
                  <Stack direction="row">
                    <Radio value="accrual">Accrual</Radio>
                    <Radio value="cash">Cash</Radio>
                  </Stack>
                </RadioGroup>
                <Button variant="link" colorScheme="blue" size="sm" ml={4}>Show Filters</Button>
              </Flex>
            </>
          )}
          {/* Content Section */}
          {activeCategory === "Company & Financial" && (
            <Box>
              {!showProfitLossStatement && (
                <>
                  <Box as="h2" fontWeight="semibold" mb={2} fontSize="3xl" color="gray.700">
                    Company & Financial
                  </Box>
                  <Box as="h3" fontSize="xl" mb={6} color="gray.600">
                    Profit & Loss (income statement)
                  </Box>
                </>
              )}
              
              {!showProfitLossStatement ? (
                <>
                  <Flex gap={6} mb={6} flexWrap="wrap">
                    <ProfitLossStandard onViewDetailedReport={() => setShowProfitLossStatement(true)} />
                    <ProfitLossDetail />
                  </Flex>
                  </>
              ) : (
                <Box>
                  <ProfitLossStatement />
                </Box>
              )}
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};