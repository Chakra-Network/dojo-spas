// FlowNode.tsx
import { Box, Text, VStack } from "@chakra-ui/react";

type FlowNodeProps = {
  x: number;
  y: number;
  label: string;
  icon?: React.ReactNode;
  isRightPanel?: boolean;
};

export function FlowNode({ x, y, label, icon, isRightPanel = false }: FlowNodeProps) {
  return (
    <VStack
      position="absolute"
      left={x}
      top={y}
      spacing={1}
      align="center"
      w={isRightPanel ? "120px" : "88px"}
    >
      <Box
        w={isRightPanel ? "44px" : "40px"}
        h={isRightPanel ? "40px" : "36px"}
        bg="white"
        borderRadius="8px"
        border="1.5px solid"
        borderColor="gray.300"
        boxShadow="sm"
        display="flex"
        alignItems="center"
        justifyContent="center"
        _hover={{
          borderColor: "blue.400",
          boxShadow: "md",
        }}
      >
        {icon || (
          <Box w="16px" h="16px" bg="gray.400" borderRadius="3px" />
        )}
      </Box>
      <Text 
        fontSize="11px" 
        color="gray.700" 
        textAlign="center"
        lineHeight="1.2"
        fontWeight="medium"
        px={1}
      >
        {label}
      </Text>
    </VStack>
  );
}