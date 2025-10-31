import React from 'react';
import { Box, Text, Flex, Button, Menu, MenuButton, MenuList, MenuItem, IconButton } from '@chakra-ui/react';
import { ChevronDown, RefreshCcw, FileText, Heart, HelpCircle } from 'lucide-react';

interface ProfitLossStandardProps {
  onViewDetailedReport: () => void;
}

export const ProfitLossStandard: React.FC<ProfitLossStandardProps> = ({ onViewDetailedReport }) => {
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
          Profit & Loss Standard
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
            <Flex justify="space-between" mb={1}>
              <Text>40100 - Construction Income</Text>
              <Text>39,324.16</Text>
            </Flex>
            <Flex justify="space-between" mb={1}>
              <Text>40500 - Reimbursement Income</Text>
              <Text>0.00</Text>
            </Flex>
            <Flex justify="space-between" fontWeight="semibold" mb={2}>
              <Text>Total Income</Text>
              <Text>39,324.16</Text>
            </Flex>
            
            <Text fontWeight="semibold" mt={2} mb={1}>Cost of Goods Sold</Text>
            <Flex justify="space-between" mb={1}>
              <Text>50100 - Cost of Goods Sold</Text>
              <Text>2,043.67</Text>
            </Flex>
            <Flex justify="space-between" mb={1}>
              <Text>54000 - Job Expenses</Text>
              <Text>16,677.46</Text>
            </Flex>
            <Flex justify="space-between" fontWeight="semibold" mb={2}>
              <Text>Total COGS</Text>
              <Text>18,721.13</Text>
            </Flex>
            
            <Flex justify="space-between" fontWeight="bold" mb={2}>
              <Text>Gross Profit</Text>
              <Text>20,603.03</Text>
            </Flex>
            
            <Text fontWeight="semibold" mt={2} mb={1}>Expense</Text>
            <Flex justify="space-between" mb={1}>
              <Text>64200 - Repairs</Text>
              <Text>175.00</Text>
            </Flex>
            <Flex justify="space-between" mb={1}>
              <Text>64800 - Tools and Machinery</Text>
              <Text>810.00</Text>
            </Flex>
            <Flex justify="space-between" fontWeight="semibold" mb={2}>
              <Text>Total Expense</Text>
              <Text>985.00</Text>
            </Flex>
            
            <Flex justify="space-between" fontWeight="bold" mb={2}>
              <Text>Net Ordinary Income</Text>
              <Text>19,618.03</Text>
            </Flex>
            
            <Text fontWeight="semibold" mt={2} mb={1}>Other Income/Expense</Text>
            <Text fontWeight="semibold" mb={1}>Other Income</Text>
            <Flex justify="space-between" mb={1}>
              <Text>70100 - Other Income</Text>
              <Text>43.53</Text>
            </Flex>
            <Flex justify="space-between" fontWeight="semibold" mb={1}>
              <Text>Total Other Income</Text>
              <Text>43.53</Text>
            </Flex>
            <Flex justify="space-between" fontWeight="semibold" mb={2}>
              <Text>Net Other Income</Text>
              <Text>43.53</Text>
            </Flex>
            
            <Flex justify="space-between" fontWeight="bold" borderTop="2px solid" borderColor="gray.300" pt={2}>
              <Text>Net Income</Text>
              <Text>19,661.56</Text>
            </Flex>
          </Box>
        </Box>
      </Box>
      <Flex align="center" mb={4}>
        <Text fontSize="sm" mr={2}>Dates: This Month-to-date</Text>
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDown />} variant="ghost" size="sm">
            8/1/2021
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
        <IconButton aria-label="Document" icon={<FileText size={16} />} size="sm" variant="ghost" onClick={onViewDetailedReport} />
        <IconButton aria-label="Favorite" icon={<Heart size={16} />} size="sm" variant="ghost" />
        <IconButton aria-label="Help" icon={<HelpCircle size={16} />} size="sm" variant="ghost" />
      </Flex>
    </Flex>
  );
};