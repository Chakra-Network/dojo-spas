import React, { useState } from 'react';
import ReportsSidebar from './ReportsSidebar';
import { Box, Flex } from "@chakra-ui/react";
import { ProfitLossStandard } from "./ProfitLossStandard";
import { ProfitLossDetail } from "./ProfitLossDetail";
import ProfitLossStatement from "./ProfitLossStatement"; 

interface ReportsPageProps {
  // Define any props if needed, otherwise leave empty
}

export const ReportsPage: React.FC<ReportsPageProps> = () => {
  const [activeCategory, setActiveCategory] = useState<string>("Company & Financial");
  const [showProfitLossStatement, setShowProfitLossStatement] = useState(false); 
  const handleSelectCategory = (category: string) => {
    setActiveCategory(category);
  };

  return (
    <Box  width="300xpx" display="flex" height="100vh" overflow="hidden">
      {!showProfitLossStatement && (
        <ReportsSidebar activeCategory={activeCategory} onSelectCategory={handleSelectCategory} />
      )}
      
      <Box flex="1" bg="gray.50" overflow="auto" >
        <Box p={1}>
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
                    <ProfitLossDetail onViewDetailedReport={() => setShowProfitLossStatement(true)} />
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