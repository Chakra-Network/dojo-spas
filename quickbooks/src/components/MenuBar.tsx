import { Box, Flex, Text } from "@chakra-ui/react";

type MenuItem = {
  label: string;
};

const MENU_ITEMS: MenuItem[] = [
  { label: "File" },
  { label: "Edit" },
  { label: "View" },
  { label: "Lists" },
  { label: "Favorites" },
  { label: "Company" },
  { label: "Customers" },
  { label: "Vendors" },
  { label: "Employees" },
  { label: "Banking" },
  { label: "Reports"},
  { label: "Window"},
  { label: "Help"}
];

export function MenuBar({ onClose }: { onClose?: () => void }) {
  return (
    <Box
      bg="#e8edf3"
      borderBottom="1px solid #000000"
      boxShadow="inset 0 -1px 0 rgba(0,0,0,0.05)"
      fontFamily="Tahoma, sans-serif"
    >
      <Flex align="center" gap={0} h="40px" px={3} bg="#e8edf3">
        {MENU_ITEMS.map((item) => (
          <Flex
            key={item.label}
            align="center"
            px={3}
            h="100%"
            cursor="pointer"
            color="#1e293b"
            _hover={{ bg: "#dfe7f1" }}
          >
            <Text fontSize="13px" fontWeight="semibold">{item.label}</Text>
          </Flex>
        ))}
        <Box flex="1" />
        <Flex align="center" gap={1} bg="#e8edf3" borderLeft="1px solid #000000" pl={2}>
          <ControlButton label="–" ariaLabel="Minimize" />
          <ControlButton label="☐" ariaLabel="Maximize" />
          <ControlButton label="✕" ariaLabel="Close" isClose onClick={onClose} />
        </Flex>
      </Flex>
    </Box>
  );
}

export default MenuBar;

function ControlButton({ label, ariaLabel, isClose, onClick }: { label: string; ariaLabel: string; isClose?: boolean; onClick?: () => void }) {
  return (
    <Flex
      aria-label={ariaLabel}
      align="center"
      justify="center"
      w="36px"
      h="26px"
      mt="4px"
      borderRadius="2px"
      color="#0f172a"
      cursor="pointer"
      _hover={{ bg: isClose ? "#fca5a5" : "#dae4ef", color: isClose ? "#7f1d1d" : undefined }}
      transition="background 0.15s ease"
      userSelect="none"
      onClick={onClick}
    >
      <Text fontSize="14px" lineHeight="1">{label}</Text>
    </Flex>
  );
}


