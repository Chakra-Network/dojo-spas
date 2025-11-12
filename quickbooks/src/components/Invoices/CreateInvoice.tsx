import {
  Box,
  Flex,
  Text,
  Input,
  Select,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Icon,
  Checkbox,
} from "@chakra-ui/react";
import {
  Save,
  Printer,
  Mail,
  ChevronLeft,
  ChevronRight,
  Search,
  FilePlus2,
  Trash2,
  Copy,
  Cloud,
  BadgeCheck,
  Paperclip,
  Timer,
  CreditCard,
  Layers,
  RotateCcw,
} from "lucide-react";

export function CreateInvoice() {
  return (
    <Box bg="#f5f7fb" minH="100%" fontFamily="Arial, sans-serif">
      {/* Ribbon */}
      <Box
        bg="#eef2f6"
        borderBottom="1px solid #cbd5e1"
        boxShadow="sm"
        px={4}
        height="155"
        py={1.5}                                                                    
      >
        {/* Tabs bar spanning full width (like the main menubar) */}
        <Box  borderBottom="1px solid #cfd8e3" w="100%" px={2} py={1} mb={2}>
          <Flex align="center" h="28px" gap={0}>
            <RibbonTab label="Main" active />
            <RibbonTab label="Formatting" />
            <RibbonTab label="Send/Ship" />
            <RibbonTab label="Reports" />
            <RibbonTab label="Search" />
            <Box flex="1" />
          </Flex>
        </Box>
        <Flex align="center" wrap="nowrap" minH="92px" w="fit-content">
          <Flex align="center" gap={2} height="80px" width="90px" pr={3}>
            <IconOnly as={ChevronLeft} color="#2b6cb0" />
            <IconOnly as={ChevronRight} color="#2b6cb0" />
            <TallIcon as={Search} color="#2b6cb0" label="Find" />
          </Flex>
          <Separator />

          {/* New/Save/Delete/Copy/Memorize/Mark Pending */}
          <Flex align="center" gap={4} px={4}>
            <IconWithLabel icon={FilePlus2} label="New" caret color="#2b6cb0" />
            <IconWithLabel icon={Save} label="Save" caret color="#2b6cb0" />
            <IconWithLabel icon={Trash2} label="Delete" color="#2b6cb0" />
            <IconWithLabel icon={Copy} label="Create a Copy" color="#2b6cb0" />
            <IconWithLabel icon={Cloud} label="Memorize" color="#2b6cb0" />
            <IconWithLabel
              icon={BadgeCheck}
              label={"Mark As\nPending"}
              color="#2b6cb0"
            />
          </Flex>
          <Separator />

          {/* Print / Email / Later */}
          <Flex align="center" gap={6} px={4}>
            <IconWithLabel icon={Printer} label="Print" caret color="#b38b00" />
            <IconWithLabel icon={Mail} label="Email" caret color="#b38b00" />
            <CheckboxWithLabel label="Print Later" />
            <CheckboxWithLabel label="Email Later" />
            <IconWithLabel
              icon={Paperclip}
              label={"Attach\nFile"}
              color="#2b6cb0"
            />
          </Flex>
          <Separator />

          {/* Time/Costs and Credits */}
          <Flex align="center" gap={6} px={4}>
            <IconWithLabel
              icon={Timer}
              label="Add Time/Costs"
              color="#2f855a"
            />
            <IconWithLabel
              icon={RotateCcw}
              label="Apply Credits"
              disabled
              color="#2f855a"
            />
          </Flex>
          <Separator />

          {/* Receive / Batch / Refund */}
          <Flex align="center" gap={6} px={4}>
            <IconWithLabel
              icon={CreditCard}
              label={"Receive\nPayments"}
              color="#2f855a"
            />
            <IconWithLabel
              icon={Layers}
              label="Create a Batch"
              color="#2f855a"
            />
            <IconWithLabel
              icon={RotateCcw}
              label={"Refund/Credit"}
              color="#2f855a"
            />
          </Flex>
        </Flex>
      </Box>

      {/* Customer and Template */}
      <Flex bg="#3b5a78" color="white" px={4} py={2} gap={6} align="center">
        <Flex align="center" gap={2}>
          <Text fontSize="sm" minW="88px">
            CUSTOMER:
          </Text>
          <Select
            size="sm"
            bg="#f8fafc"
            color="black"
            border="1px solid #cbd5e1"
            w="240px"
          >
            <option>John Doe</option>
          </Select>
        </Flex>
        <Flex align="center" gap={2}>
          <Text fontSize="sm">TEMPLATE</Text>
          <Select
            size="sm"
            bg="#f8fafc"
            color="black"
            border="1px solid #cbd5e1"
            w="220px"
          >
            <option>Intuit Service</option>
          </Select>
        </Flex>
      </Flex>

      <Flex>
        {/* Left content */}
        <Box flex="1" px={4} py={4}>
          <Text fontSize="4xl" mb={10}>
            Invoice
          </Text>
          <Flex gap={6} ml="600px" mb={4}>
            <Flex direction="column"  gap={10}>
              <LabeledInput label="DATE" defaultValue="08/05/2021" w="180px" />
              <LabeledInput label="INVOICE #" defaultValue="47" w="120px" />
            </Flex>
            <Box>
              <Text  fontSize="sm" color="gray.700" mb={1}>
                BILL TO
              </Text>
              <Box
                w="260px"
                h="90px"

                border="1px solid #cbd5e1"
                borderRadius="md"
                bg="#eeeeef"
                boxShadow="inner"
              />
            </Box>
          </Flex>

          {/* Items table */}
          <Box
            border="1px solid #cbd5e1"
            borderRadius="md"
          
            overflow="hidden"
            bg="white"
          >
            <Table
              size="sm"
              variant="unstyled"
              w="100%"
            >
              <Thead bg="#e9edf3" borderBottom="1px solid #cbd5e1">
                <Tr>
                  <Th
                    fontSize="xs"
                    color="#4a5568"
                    textTransform="uppercase"
                    borderRight="1px solid #cbd5e1"
                    py={2}
                    px={3}
                  >
                    ITEM
                  </Th>
                  <Th
                    fontSize="xs"
                    color="#4a5568"
                    textTransform="uppercase"
                    borderRight="1px solid #cbd5e1"
                    py={2}
                    px={3}
                  >
                    QUANT.
                  </Th>
                  <Th
                    fontSize="xs"
                    color="#4a5568"
                    textTransform="uppercase"
                    borderRight="1px solid #cbd5e1"
                    py={2}
                    px={3}
                  >
                    DESCRIPTION
                  </Th>
                  <Th
                    fontSize="xs"
                    color="#4a5568"
                    textTransform="uppercase"
                    borderRight="1px solid #cbd5e1"
                    py={2}
                    px={3}
                    textAlign="right"
                  >
                    RATE
                  </Th>
                  <Th
                    fontSize="xs"
                    color="#4a5568"
                    textTransform="uppercase"
                    borderRight="1px solid #cbd5e1"
                    py={2}
                    px={3}
                    textAlign="right"
                  >
                    AMOUNT
                  </Th>
                  <Th
                    fontSize="xs"
                    color="#4a5568"
                    textTransform="uppercase"
                    py={2}
                    px={3}
                  >
                    TAX
                  </Th>
                </Tr>
              </Thead>

              <Tbody>
                {[...Array(7)].map((_, i) => (
                  <Tr
                    key={i}
                    bg={i % 2 === 0 ? "#e7f0fd" : "white"}
                    borderBottom="1px solid #e2e8f0"
                    h="36px"
                  >
                    <Td borderRight="1px solid #e2e8f0" px={3}></Td>
                    <Td borderRight="1px solid #e2e8f0" px={3}></Td>
                    <Td borderRight="1px solid #e2e8f0" px={3}></Td>
                    <Td
                      borderRight="1px solid #e2e8f0"
                      textAlign="right"
                      px={3}
                    ></Td>
                    <Td
                      borderRight="1px solid #e2e8f0"
                      textAlign="right"
                      px={3}
                    ></Td>
                    <Td px={3}></Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>

          {/* Totals */}
          <Flex
            justify="flex-end"
            mt={6}
            gap={10}
            align="center"
            borderTop="1px solid #cbd5e1"
            pt={3}
          >
            <Flex align="center" gap={2}>
              <Text>TAX</Text>
              <Select size="sm" w="180px" bg="white">
                <option>(0.0%)</option>
              </Select>
            </Flex>
            <Box textAlign="right">
              <Text color="gray.600">TOTAL</Text>
              <Text fontSize="2xl" fontWeight="bold">
                0.00
              </Text>
            </Box>
          </Flex>
        </Box>

        {/* Right sidebar */}
        <Box
          w="260px"
          bg="#f8fafc"
          borderLeft="1px solid #cbd5e1"
          p={3}
          minH="100%"
        >
          <Text fontWeight="bold" mb={2}>
            SUMMARY
          </Text>
          <Box borderBottom="1px solid #cbd5e1" mb={3} />

          <Text fontWeight="bold" mb={2}>
            CUSTOMER PAYMENT
          </Text>
          <Box borderBottom="1px solid #cbd5e1" mb={3} />

          <Text fontWeight="bold" mb={2}>
            RECENT TRANSACTIONS
          </Text>
          <Box borderBottom="1px solid #cbd5e1" mb={3} />

          <Text fontWeight="bold" mb={2}>
            NOTES
          </Text>
        </Box>
      </Flex>
    </Box>
  );
}

/* Helper Components */
function LabeledInput({
  label,
  defaultValue,
  w,
}: {
  label: string;
  defaultValue?: string;
  w?: string;
}) {
  return (
    <Box>
      <Text fontSize="sm" color="gray.700" mb={1}>
        {label}
      </Text>
      <Input size="sm" defaultValue={defaultValue} w={w} bg="#eeeeef" />
    </Box>
  );
}

function Separator() {
  return <Box w="1px" alignSelf="stretch" bg="#d4dde8" mx={2} />;
}

function IconOnly({ as, color }: { as: any; color: string }) {
  return <Icon as={as} boxSize={8} color={color} />;
}

function TallIcon({
  as,
  color,
  label,
}: {
  as: any;
  color: string;
  label: string;
}) {
  return (
    <Flex direction="column" align="center" px={2}>
      <Icon as={as} boxSize={8} color={color} />
      <Text fontSize="14px" mt={1}>
        {label}
      </Text>
    </Flex>
  );
}

function IconWithLabel({
  icon,
  label,
  caret,
  disabled,
  color = "#4b6b8a",
}: {
  icon: any;
  label: string;
  caret?: boolean;
  disabled?: boolean;
  color?: string;
}) {
  const [line1, line2] = label.split("\n");
  return (
    <Flex direction="column" align="center" px={2} opacity={disabled ? 0.5 : 1}>
      <Flex align="center" gap={1}>
        <Icon as={icon} boxSize={8} color={color} />
        {caret && <Text fontSize="13px">▾</Text>}
      </Flex>
      <Text fontSize="14px" mt={1} textAlign="center" whiteSpace="pre-line">
        {line1}
        {line2 ? "\n" + line2 : ""}
      </Text>
    </Flex>
  );
}

function CheckboxWithLabel({ label }: { label: string }) {
  return (
    <Flex direction="column" align="center" px={2}>
      <Checkbox size="sm" colorScheme="gray" />
      <Text fontSize="11px" mt={1}>
        {label}
      </Text>
    </Flex>
  );
}

function RibbonTab({ label, active = false }: { label: string; active?: boolean }) {
  return (
    <Box
      px={3}
      h="100%"
      display="flex"
      alignItems="center"
      bg={active ? "#ffffff" : "#e8edf3"}
      color="#2d3748"
      fontSize="sm"
      fontWeight="semibold"
      mr={2}
      borderTopRadius="sm"
      cursor="pointer"
    >
      {label}
    </Box>
  );
}

export default CreateInvoice;
