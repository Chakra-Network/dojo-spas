import { Box, Flex, Text, Divider } from "@chakra-ui/react";
import { ChevronRight } from "lucide-react";

type BalanceItemProps = {
  label: string;
  value: string;
  isClickable?: boolean;
};

const BalanceItem = ({ label, value, isClickable = false }: BalanceItemProps) => (
  <Flex
    align="center"
    justify="space-between"
    py={1}
    px={3}
    cursor={isClickable ? "pointer" : "default"}
    _hover={isClickable ? { bg: "#24486C" } : undefined}
    borderRadius="3px"
  >
    <Text fontSize="14px" color="#D1D5DB">
      {label}
    </Text>
    <Flex align="center" gap={1}>
      <Text fontSize="14px" fontWeight="bold" color="white">
        {value}
      </Text>
      {isClickable && <ChevronRight size={16} color="#D1D5DB" />}
    </Flex>
  </Flex>
);

type ViewBalancesSidebarProps = {
  onBackToShortcuts: () => void;
};

export function ViewBalancesSidebar({ onBackToShortcuts }: ViewBalancesSidebarProps) {
  return (
    <Box>
      <Flex
        align="center"
        px={3}
        py={2}
        bg="#0C253A"
        borderBottom="1px solid #10283F"
        cursor="pointer"
        onClick={onBackToShortcuts}
        _hover={{ bg: "#17314A" }}
      >
        <ChevronRight size={16} color="#C7D2E0" transform="rotate(180deg)" />
        <Text fontWeight="bold" fontSize="15px" color="#C7D2E0" ml={1}>
          View Balances
        </Text>
      </Flex>

      <Box p={3}>
        <BalanceItem label="Accounts Payable" value="71,793.40" />
        <BalanceItem label="Accounts Receivable" value="337,656.68" />
      </Box>

      <Divider borderColor="#0f2235" my={1} />

      <Box p={3}>
        <BalanceItem label="Amex" value="2,211.38" isClickable />
        <BalanceItem label="Checking" value="79,750.55" isClickable />
      </Box>

      <Divider borderColor="#0f2235" my={1} />

      <Flex justify="center" p={3}>
        <Text fontSize="13px" color="#9CA3AF" cursor="pointer" _hover={{ textDecoration: "underline" }}>
          Customize view balances
        </Text>
      </Flex>
    </Box>
  );
}

export default ViewBalancesSidebar;
