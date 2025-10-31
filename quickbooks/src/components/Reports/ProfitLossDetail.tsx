import React from 'react';
import { Box, Text, Flex, Icon, Button, Menu, MenuButton, MenuList, MenuItem, IconButton } from '@chakra-ui/react';
import { ChevronDown, RefreshCcw, FileText, Heart, HelpCircle } from 'lucide-react';

export const ProfitLossDetail: React.FC = () => {
  return (
    <Flex direction="column" alignItems="center">
      <Box
        border="1px solid #E2E8F0"
        p={4}
        bg="white"
        boxShadow="md"
        borderColor="black"
        width="450px"
        height="450px"
        display="flex"
        flexDirection="column"
        mb={4}
        overflow="hidden"
      >
        <Text fontSize="sm" fontWeight="bold" color="gray.600" mb={2} flexShrink={0}>
          Profit & Loss Detail
        </Text>
        <Box 
          fontSize="xs" 
          color="gray.500" 
          overflowY="auto"
          flex="1"
          pr={2}
          css={{
            '&::-webkit-scrollbar': {
              width: '6px',
            },
            '&::-webkit-scrollbar-track': {
              background: '#f1f1f1',
            },
            '&::-webkit-scrollbar-thumb': {
              background: '#888',
              borderRadius: '3px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              background: '#555',
            },
          }}
        >
          <Box>
            <Text fontWeight="semibold" mb={1}>Ordinary Income/Expense</Text>
            
            <Text fontWeight="semibold" mt={2} mb={1}>Income</Text>
            <Text fontWeight="medium" ml={2} mb={1}>Sales</Text>
            
            <Text fontWeight="medium" ml={4} mb={1}>Merchandise</Text>
            <Box ml={6} mb={1}>
              <Flex justify="space-between" fontSize="2xs" mb={0.5}>
                <Text>Sales Receipt 01/02 Sun, Alan</Text>
                <Flex gap={4}>
                  <Text>Debit: 0.80</Text>
                  <Text>Credit: 0.00</Text>
                  <Text fontWeight="medium">Balance: 0.80</Text>
                </Flex>
              </Flex>
              <Flex justify="space-between" fontSize="2xs" mb={0.5}>
                <Text>Sales Receipt 01/02 Vu, Don</Text>
                <Flex gap={4}>
                  <Text>Debit: 78.90</Text>
                  <Text>Credit: 0.00</Text>
                  <Text fontWeight="medium">Balance: 99.60</Text>
                </Flex>
              </Flex>
            </Box>
            <Flex justify="space-between" fontWeight="semibold" ml={4} mb={2} fontSize="2xs">
              <Text>Total Merchandise</Text>
              <Flex gap={4}>
                <Text>Debit: 79.70</Text>
                <Text>Credit: 0.00</Text>
                <Text>Balance: 99.60</Text>
              </Flex>
            </Flex>
            
            <Text fontWeight="medium" ml={4} mb={1}>Service</Text>
            <Box ml={6} mb={1}>
              <Flex justify="space-between" fontSize="2xs" mb={0.5}>
                <Text>Sales Receipt 01/02 Sun, Alan</Text>
                <Flex gap={4}>
                  <Text>Debit: 15.00</Text>
                  <Text>Credit: 0.00</Text>
                  <Text fontWeight="medium">Balance: 15.00</Text>
                </Flex>
              </Flex>
              <Flex justify="space-between" fontSize="2xs" mb={0.5}>
                <Text>Sales Receipt 01/02 Vu, Don</Text>
                <Flex gap={4}>
                  <Text>Debit: 20.00</Text>
                  <Text>Credit: 0.00</Text>
                  <Text fontWeight="medium">Balance: 104.95</Text>
                </Flex>
              </Flex>
            </Box>
            <Flex justify="space-between" fontWeight="semibold" ml={4} mb={2} fontSize="2xs">
              <Text>Total Service</Text>
              <Flex gap={4}>
                <Text>Debit: 35.00</Text>
                <Text>Credit: 0.00</Text>
                <Text>Balance: 104.95</Text>
              </Flex>
            </Flex>
            
            <Flex justify="space-between" fontWeight="bold" ml={2} mb={2} fontSize="2xs">
              <Text>Total Sales</Text>
              <Flex gap={4}>
                <Text>Debit: 114.70</Text>
                <Text>Credit: 0.00</Text>
                <Text>Balance: 204.55</Text>
              </Flex>
            </Flex>
            
            <Flex justify="space-between" fontWeight="bold" mb={2} fontSize="xs">
              <Text>Total Income</Text>
              <Flex gap={4}>
                <Text>Debit: 114.70</Text>
                <Text>Credit: 0.00</Text>
                <Text>Balance: 204.55</Text>
              </Flex>
            </Flex>
            
            <Text fontWeight="semibold" mt={2} mb={1}>Cost of Goods Sold</Text>
            <Text fontWeight="medium" ml={2} mb={1}>Cost of Goods Sold</Text>
            <Box ml={4} mb={1}>
              <Flex justify="space-between" fontSize="2xs" mb={0.5}>
                <Text>Sales Receipt 01/02 Sun, Alan</Text>
                <Flex gap={4}>
                  <Text>Debit: 0.20</Text>
                  <Text>Credit: 0.00</Text>
                  <Text fontWeight="medium">Balance: 0.20</Text>
                </Flex>
              </Flex>
              <Flex justify="space-between" fontSize="2xs" mb={0.5}>
                <Text>Sales Receipt 01/02 Vu, Don</Text>
                <Flex gap={4}>
                  <Text>Debit: 19.73</Text>
                  <Text>Credit: 0.00</Text>
                  <Text fontWeight="medium">Balance: 24.91</Text>
                </Flex>
              </Flex>
            </Box>
            <Flex justify="space-between" fontWeight="semibold" ml={2} mb={2} fontSize="2xs">
              <Text>Total Cost of Goods Sold</Text>
              <Flex gap={4}>
                <Text>Debit: 19.93</Text>
                <Text>Credit: 0.00</Text>
                <Text>Balance: 24.91</Text>
              </Flex>
            </Flex>
            
            <Flex justify="space-between" fontWeight="bold" mb={2} fontSize="xs">
              <Text>Total COGS</Text>
              <Flex gap={4}>
                <Text>Debit: 19.93</Text>
                <Text>Credit: 0.00</Text>
                <Text>Balance: 24.91</Text>
              </Flex>
            </Flex>
            
            <Flex justify="space-between" fontWeight="bold" mb={2} fontSize="xs">
              <Text>Gross Profit</Text>
              <Flex gap={4}>
                <Text>Debit: 19.93</Text>
                <Text>Credit: 114.70</Text>
                <Text>Balance: 179.64</Text>
              </Flex>
            </Flex>
            
            <Flex justify="space-between" fontWeight="bold" mb={2} fontSize="xs">
              <Text>Net Ordinary Income</Text>
              <Flex gap={4}>
                <Text>Debit: 19.93</Text>
                <Text>Credit: 114.70</Text>
                <Text>Balance: 179.64</Text>
              </Flex>
            </Flex>
            
            <Flex justify="space-between" fontWeight="bold" borderTop="2px solid" borderColor="gray.300" pt={2} fontSize="xs">
              <Text>Net Income</Text>
              <Flex gap={4}>
                <Text>Debit: 19.93</Text>
                <Text>Credit: 114.70</Text>
                <Text>Balance: 179.64</Text>
              </Flex>
            </Flex>
          </Box>
        </Box>
      </Box>
      <Flex align="center" mb={4}>
        <Text fontSize="sm" mr={2}>Dates: This Fiscal Year-to-date</Text>
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDown />} variant="ghost" size="sm">
            1/1/2021
          </MenuButton>
          <MenuList>
            <MenuItem>Select Date</MenuItem>
          </MenuList>
        </Menu>
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDown />} variant="ghost" size="sm" ml={2}>
            8/5/2021
          </MenuButton>
          <MenuList>
            <MenuItem>Select Date</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
      <Flex gap={2}>
        <IconButton aria-label="Refresh" icon={<RefreshCcw size={16} />} size="sm" variant="ghost" />
        <IconButton aria-label="Document" icon={<FileText size={16} />} size="sm" variant="ghost" />
        <IconButton aria-label="Favorite" icon={<Heart size={16} />} size="sm" variant="ghost" />
        <IconButton aria-label="Help" icon={<HelpCircle size={16} />} size="sm" variant="ghost" />
      </Flex>
    </Flex>
  );
};