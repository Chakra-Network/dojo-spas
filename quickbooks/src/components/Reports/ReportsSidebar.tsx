import React from 'react';

interface ReportsSidebarProps {
  activeCategory: string;
  onSelectCategory: (category: string) => void;
}

const ReportsSidebar: React.FC<ReportsSidebarProps> = ({ activeCategory, onSelectCategory }) => {
  const categories = [
    "Company & Financial",
    "Customers & Receivables",
    "Sales",
    "Jobs, Time & Mileage",
    "Vendors & Payables",
    "Employees & Payroll",
    "Banking",
    "Accountant & Taxes",
    "Budgets & Forecasts",
    "List",
  ];

  return (
    <div style={{
      width: '240px',
      
      backgroundColor: '#ffffff',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      borderRight: '1px solid #e5e7eb',
      boxShadow: '1px 0 3px rgba(0,0,0,0.05)',
      flexShrink: 0
    }}>
      <nav style={{ flex: 1, paddingTop: '8px' }}>
        <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
          {categories.map((category) => (
            <li key={category} style={{ marginBottom: '1px' }}>
              <button
                onClick={() => onSelectCategory(category)}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '10px 20px',
                  fontSize: '17px',
                 
                  border: 'none',
                  cursor: 'pointer',
                  
                  
                  backgroundColor: activeCategory === category ? '#16a34a' : 'transparent',
                  color: activeCategory === category ? '#ffffff' : '#374151',
                  fontWeight: activeCategory === category ? '500' : '400',
                  transition: 'background-color 0.15s ease',
                  fontFamily: 'Segoe UI, sans-serif'
                }}
                onMouseEnter={(e) => {
                  if (activeCategory !== category) {
                    e.currentTarget.style.backgroundColor = '#f3f4f6';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeCategory !== category) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                {category}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default ReportsSidebar;