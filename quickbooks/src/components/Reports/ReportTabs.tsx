import React from 'react';
import { IconButton } from '@chakra-ui/react'; // Import IconButton
import { FileText } from 'lucide-react'; // Import FileText icon

interface ReportTabsProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
}

const tabs = ["Standard", "Memorized", "Favorites", "Contributed"]; 

const ReportTabs: React.FC<ReportTabsProps> = ({ activeTab, onSelectTab }) => {
  return (
    <div className="flex space-x-1 p-1 bg-gray-200 rounded-md">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onSelectTab(tab)}
          className={`px-4 py-2 text-sm font-medium border-none rounded-md ${activeTab === tab
            ? "bg-white text-blue-800 shadow"
            : "text-gray-700 hover:bg-gray-100"}
          `}
        >
          {tab}
        </button>
      ))}
      <IconButton
        aria-label="Document"
        icon={<FileText size={16} />}
        onClick={() => onSelectTab("Document")}
        variant="ghost"
        color="gray.700"
        _hover={{ bg: "gray.100" }}
        size="sm"
      />
    </div>
  );
};

export default ReportTabs;
