import React, { useState } from 'react';
import transaction from "./transactions.json"; // your JSON file

// fallback sample data (keeps hierarchy / children structure for left list)
const customersDataFallback = [
  { name: "Aaron's Photography Studio", balance: 85.00, children: [] },
  { name: "Alamo Foundation", balance: 16295.00, children: [] },
  { name: "Amy's Bird Sanctuary", balance: 750.00, children: [] },
  { 
    name: "Auldridge Windows", 
    balance: 53472.00,
    transactions: [
      { type: "Payment", num: "2929", date: "02/25/2023", account: "Checking", amount: 10000.00 },
      { type: "Payment", num: "39992", date: "02/07/2023", account: "Checking", amount: 2494.12 },
      { type: "Invoice", num: "40", date: "01/28/2023", account: "Accounts Receiva...", amount: 7874.50 },
      { type: "Invoice", num: "24", date: "01/01/2023", account: "Accounts Receiva...", amount: 2494.12 },
      { type: "Invoice", num: "25", date: "01/01/2023", account: "Accounts Receiva...", amount: 21972.50 },
      { type: "Invoice", num: "26", date: "01/01/2023", account: "Accounts Receiva...", amount: 33625.00 }
    ],
    children: [] 
  },
  { name: "Bill's Windsurf Shop", balance: 150.00, children: [] },
  { 
    name: "Building 101", 
    balance: 0.00,
    children: [
      { name: "Unit 1", balance: 0.00, children: [
        { name: "Tenant - Smith", balance: 0.00, children: [] }
      ]},
      { name: "Unit 2", balance: 0.00, children: [
        { name: "Tenant - Jones", balance: 0.00, children: [] }
      ]}
    ]
  },
  { 
    name: "Building 201", 
    balance: 0.00,
    children: [
      { name: "Unit 1", balance: 0.00, children: [
        { name: "Tenant - Johnson", balance: 0.00, children: [] }
      ]}
    ]
  },
  { name: "Cassie's Dog Grooming", balance: 1125.00, children: [] },
  { 
    name: "Columbia Management", 
    balance: 0.00,
    children: [
      { name: "Seattle School", balance: 0.00, children: [] },
      { name: "Spokane Civic Center", balance: 0.00, children: [] }
    ]
  },
  { name: "Cool Cars", balance: 0.00, children: [] },
  { 
    name: "Crandall Contractors", 
    balance: 27320.34,
    children: [
      { name: "Cheyenne 1", balance: 27320.34, children: [] }
    ]
  }
];

// Helper component: a single row (recursively renders children)
function CustomerRow({ customer, level = 0, onSelect, selected }) {
  const [expanded, setExpanded] = useState(true);
  const hasChildren = customer.children && customer.children.length > 0;
  const isSelected = selected === customer.name;
  
  return (
    <>
      <tr 
        style={{
          backgroundColor: isSelected ? '#90C890' : 'white',
          cursor: 'pointer',
          borderBottom: '1px solid #e5e7eb'
        }}
        onClick={() => onSelect(customer)}
      >
        <td style={{ 
          padding: '4px 8px',
          fontSize: '18px',
          fontFamily: 'Tahoma, Arial, sans-serif',
          fontWeight: "bold"
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            {hasChildren && (
              <span 
                style={{ 
                  fontSize: '10px', 
                  cursor: 'pointer',
                  userSelect: 'none',
                  width: '12px',
                  display: 'inline-block'
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setExpanded(!expanded);
                }}
              >
                {expanded ? '▼' : '▶'}
              </span>
            )}
            {!hasChildren && <span style={{ width: '12px', display: 'inline-block' }}></span>}
            {customer.name}
          </div>
        </td>
        <td style={{ 
          padding: '4px 8px',
          textAlign: 'right',
          fontSize: '18px',
          fontFamily: 'Tahoma, Arial, sans-serif'
        }}>
          {(customer.balance ?? 0).toFixed(2)}
        </td>
        <td style={{ 
          padding: '4px 8px',
          fontSize: '11px',
          fontFamily: 'Tahoma, Arial, sans-serif',
          width: '50px'
        }}>
        </td>
      </tr>
      {hasChildren && expanded && customer.children.map((child, idx) => (
        <CustomerRow 
          key={idx} 
          customer={child} 
          level={level + 1} 
          onSelect={onSelect} 
          selected={selected}
        />
      ))}
    </>
  );
}

export function CustomerCenter() {
  // Use imported transaction JSON if it has data; otherwise fallback to customersDataFallback
  const leftList = (Array.isArray(transaction) && transaction.length > 0) ? transaction : customersDataFallback;

  // Default selected: try to pick Auldridge Windows if present, otherwise first entry
  const defaultSelected = (() => {
    if (Array.isArray(transaction) && transaction.length > 0) {
      const found = transaction.find(item => item.name && item.name.toLowerCase().includes('auldridge'));
      return found || transaction[0];
    }
    // fallback: find in fallback
    const foundFallback = customersDataFallback.find(item => item.name && item.name.toLowerCase().includes('auldridge'));
    return foundFallback || customersDataFallback[0];
  })();

  // selectedCustomer will be set to an object that likely comes from transaction.json (so it has `transactions`, `name`, etc)
  const [selectedCustomer, setSelectedCustomer] = useState(defaultSelected);
  const [activeTab, setActiveTab] = useState('customers');

  // when a customer row is clicked: try to find a matching company object in transaction (by name)
  function handleSelect(customer) {
    if (!customer) return;
    // prefer to match against transaction import array if it exists
    if (Array.isArray(transaction) && transaction.length > 0) {
      const found = transaction.find(t => t.name && customer.name && t.name.toLowerCase() === customer.name.toLowerCase());
      if (found) {
        setSelectedCustomer(found);
        return;
      }
      // try looser match (includes)
      const loose = transaction.find(t => t.name && customer.name && t.name.toLowerCase().includes(customer.name.toLowerCase()));
      if (loose) {
        setSelectedCustomer(loose);
        return;
      }
    }
    // fallback to the clicked object itself
    setSelectedCustomer(customer);
  }

  // helper to display safe text value (or placeholder)
  const show = (val, placeholder = '') => (val === undefined || val === null ? placeholder : val);

  return (
    <div style={{ 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      fontFamily: 'Tahoma, Arial, sans-serif',
      fontSize: '11px',
      backgroundColor: '#ECE9D8'
      
    }}>

      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'nowrap' }}>
        <button style={{
          backgroundColor: '#ECE9D8',
          borderRadius: '2px',
          padding: '3px 8px',
          cursor: 'pointer',
          fontSize: '11px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <span>📄</span> New Customer & Job <span style={{ fontSize: '20px' }}>▼</span>
        </button>

        <button style={{
          backgroundColor: '#ECE9D8',
          borderRadius: '2px',
          padding: '3px 8px',
          cursor: 'pointer',
          fontSize: '11px',
          display: 'flex',
          alignItems: 'center',
          gap: '4px'
        }}>
          <span>📋</span> New Transactions <span style={{ fontSize: '8px' }}>▼</span>
        </button>

        <button style={{
          backgroundColor: '#ECE9D8',
          borderRadius: '2px',
          padding: '3px 8px',
          cursor: 'pointer',
          fontSize: '11px',
          display: 'flex',
          alignItems: 'center',
          gap: '4px'
        }}>
          <span>🖨️</span> Print <span style={{ fontSize: '8px' }}>▼</span>
        </button>

        <button style={{
          backgroundColor: '#ECE9D8',
          borderRadius: '2px',
          padding: '3px 8px',
          cursor: 'pointer',
          fontSize: '11px',
          display: 'flex',
          alignItems: 'center',
          gap: '4px'
        }}>
          <span>📊</span> Excel <span style={{ fontSize: '8px' }}>▼</span>
        </button>

        <button style={{
          backgroundColor: '#ECE9D8',
          borderRadius: '2px',
          padding: '3px 8px',
          cursor: 'pointer',
          fontSize: '11px',
          display: 'flex',
          alignItems: 'center',
          gap: '4px'
        }}>
          <span>📝</span> Word <span style={{ fontSize: '8px' }}>▼</span>
        </button>

        <button style={{
          backgroundColor: '#ECE9D8',
          borderRadius: '2px',
          padding: '3px 8px',
          cursor: 'pointer',
          fontSize: '11px',
          display: 'flex',
          alignItems: 'center',
          gap: '4px'
        }}>
          <span>📈</span> Income Tracker
        </button>
      </div>


      {/* Main Content */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Center Panel - Customer List */}
        <div style={{ 
          width: '420px',
          backgroundColor: '#F5F5F5',
          display: 'flex',
          flexDirection: 'column',
          borderRight: '1px solid #9DB0C6'
        }}>
          {/* Tabs */}
          <div style={{ display: 'flex', borderBottom: '1px solid #9DB0C6' }}>
            <div 
              style={{ 
                padding: '6px 16px',
                backgroundColor: activeTab === 'customers' ? 'white' : '#C0C0C0',
                borderRight: '1px solid #9DB0C6',
                cursor: 'pointer',
                fontSize: '11px',
                fontWeight: 'bold',
                borderTop: activeTab === 'customers' ? '2px solid #1E4A7A' : 'none'
              }}
              onClick={() => setActiveTab('customers')}
            >
              Customers & Jobs
            </div>
            <div 
              style={{ 
                padding: '6px 16px',
                backgroundColor: activeTab === 'transactions' ? 'white' : '#666766',
                color: activeTab === 'transactions' ? 'black' : 'white',
                cursor: 'pointer',
                fontSize: '11px'
              }}
              onClick={() => setActiveTab('transactions')}
            >
              Transactions
            </div>
          </div>

          {/* Filter Bar */}
          <div style={{ 
            backgroundColor: 'white',
            padding: '8px',
            borderBottom: '1px solid #C0C0C0',
            display: 'flex',
            gap: '8px',
            alignItems: 'center'
          }}>
            <select style={{ 
              fontSize: '11px',
              padding: '10px', 
              border: '1px solid #7C99B5',
              flex: 1,
              fontWeight: 'bold'
            }}>
              <option>Active Customers</option>
            </select>
            <button style={{ 
              backgroundColor: '#ECE9D8',
              border: '1px solid #9DB0C6',
              borderRadius: '2px',
              padding: '5px 9px',
              cursor: 'pointer',
              fontSize: '16px'
            }}>›</button>
          </div>

          {/* Search Bar */}
          <div style={{ 
            backgroundColor: 'white',
            padding: '16px 10px',
            borderBottom: '1px solid #C0C0C0',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <input 
              type="text"
              placeholder=""
              style={{ 
                flex: 1,
                padding: '3px 6px',
                fontSize: '11px',
                border: '1px solid #7C99B5'
              }}
            />
            <button style={{ 
              backgroundColor: '#ECE9D8',
              border: '1px solid #9DB0C6',
              borderRadius: '2px',
              padding: '2px 6px',
              cursor: 'pointer',
              fontSize: '11px'
            }}>🔍</button>
          </div>

          {/* Customer Table */}
          <div style={{ flex: 1, overflow: 'auto', backgroundColor: 'white' }}>
            <table style={{ 
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: '11px'
            }}>
              <thead>
                <tr style={{ 
                  backgroundColor: '#E8E8E8',
                  position: 'sticky',
                  top: 0,
                  borderBottom: '1px solid #C0C0C0'
                }}>
                  <th style={{ 
                    padding: '4px 8px',
                    textAlign: 'left',
                    fontSize: '15px',
                    fontWeight: 'bold',
                    color: '#666'
                  }}>NAME</th>
                  <th style={{ 
                    padding: '4px 8px',
                    textAlign: 'right',
                    fontSize: '15px',
                    fontWeight: 'bold',
                    color: '#666'
                  }}>BALANCE</th>
                  <th style={{ 
                    padding: '4px 8px',
                    fontSize: '15px',
                    fontWeight: 'bold',
                    color: '#666',
                    width: '50px'
                  }}>ATT</th>
                </tr>
              </thead>
              <tbody>
                {leftList.map((cust, idx) => (
                  <CustomerRow 
                    key={idx} 
                    customer={cust} 
                    onSelect={handleSelect}
                    selected={selectedCustomer?.name}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Panel - Customer Info */}
        <div style={{ 
          flex: 1,
          backgroundColor: 'white',
          display: 'flex',
          flexDirection: 'column'
        }}>
          {/* Customer Info Header */}
          <div style={{ 
            backgroundColor: '#F5F5F5',
            padding: '12px 16px',
            borderBottom: '1px solid #C0C0C0'
          }}>
            <div style={{ 
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start'
            }}>
              <div>
                <h2 style={{ 
                  fontSize: '40px',
                  fontWeight: 'normal',
                  margin: '0 0 8px 0',
                }}>
                  Customer Information
                </h2>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button style={{ 
                  backgroundColor: 'white',
                  border: '1px solid #9DB0C6',
                  borderRadius: '2px',
                  padding: '4px 8px',
                  cursor: 'pointer',
                  fontSize: '16px'
                }}>📌</button>
                <button style={{ 
                  backgroundColor: 'white',
                  border: '1px solid #9DB0C6',
                  borderRadius: '2px',
                  padding: '4px 8px',
                  cursor: 'pointer',
                  fontSize: '16px'
                }}>✏️</button>
              </div>
            </div>
            
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: '120px 1fr 120px 1fr',
              gap: '8px 16px',
              fontSize: '11px',
              marginTop: '12px'
            }}>
              <div style={{ color: '#666', textAlign: 'right', fontSize: "15px" }}>Company Name</div>
              <div style={{ fontWeight: 'bold', fontSize: "15px" }}>{show(selectedCustomer?.name, '—')}</div>

              <div style={{ color: '#666', textAlign: 'right', fontSize: "15px" }}>Main Phone</div>
              <div style={{ fontSize: "15px", fontWeight: "bold"}}>{show(selectedCustomer?.phone, '555-555-555')}</div>
              
              <div style={{ color: '#666', textAlign: 'right',fontSize: "15px" }}>Full Name</div>
              <div>{show(selectedCustomer?.ownerName, '—')}</div>

              <div style={{ color: '#666', textAlign: 'right', fontSize: "15px" }}>Alt. Phone</div>
              <div style={{ fontSize: "15px", fontWeight: "bold"}}>{show(selectedCustomer?.altPhone, '555-555-555')}</div>
              
              <div style={{ color: '#666', textAlign: 'right', fontSize: "15px" }}>Customer Type</div>
              <div style={{ fontSize: "15px", fontWeight: "bold"}}>{show(selectedCustomer?.type, 'Direct Mail')}</div>

              <div style={{ color: '#666', textAlign: 'right', fontSize: "15px" }}>Fax</div>
              <div style={{ fontSize: "15px", fontWeight: "bold"}}>{show(selectedCustomer?.fax, '555-555-555')}</div>
              
              <div style={{ color: '#666', textAlign: 'right',fontSize: "15px" }}>Terms</div>
              <div>{show(selectedCustomer?.terms, 'Net 30')}</div>

              <div style={{ color: '#666', textAlign: 'right' }}>Main Email</div>
              <div style={{ color: '#0066CC' }}>{show(selectedCustomer?.email, '—')}</div>
              
              <div style={{ color: '#666', textAlign: 'right' }}>Bill To</div>
              <div dangerouslySetInnerHTML={{ __html: show(selectedCustomer?.address, '—') }} />
              <div></div>
              <div></div>

              <div style={{ color: '#666', textAlign: 'right' , fontSize: "15px"}}>Balance</div>
              <div style={{ fontWeight: 'bold', fontSize: "15px" }}>{(selectedCustomer?.balance ?? 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>

              <div style={{ color: '#666', textAlign: 'right' }}>ID</div>
              <div>{show(selectedCustomer?.id, '—')}</div>
            </div>
          </div>


          {/* Tabs */}
          <div style={{ 
            display: 'flex',
            gap: '8px',
            padding: '10px 20px',
            backgroundColor: '#F5F5F5',
            borderBottom: '1px solid #C0C0C0'
          }}>
            {['Transactions', 'Contacts', "To Do's", 'Notes', 'Sent Email'].map((tab, idx) => (
              <button 
                key={idx}
                style={{ 
                  backgroundColor: idx === 0 ? 'white' : '#E0E0E0',
                  border: '1px solid #9DB0C6',
                  borderBottom: idx === 0 ? 'none' : '1px solid #9DB0C6',
                  borderRadius: '3px 3px 0 0',
                  padding: '4px 12px',
                  cursor: 'pointer',
                  
                  fontSize: '15px',
                  fontWeight: idx === 0 ? 'bold' : 'normal'
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Transaction Filters */}
          <div style={{ 
            padding: '8px 16px',
            backgroundColor: 'white',
            borderBottom: '1px solid #E0E0E0',
            display: 'flex',
            gap: '16px',
            alignItems: 'center',
            fontSize: '11px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>SHOW</span>
              <select style={{ 
                fontSize: '11px',
                padding: '2px',
                border: '1px solid #7C99B5'
              }}>
                <option>All Tran...</option>
              </select>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>FILTER BY</span>
              <select style={{ 
                fontSize: '11px',
                padding: '2px',
                border: '1px solid #7C99B5',
                width: '120px'
              }}>
                <option>All</option>
              </select>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>DATE</span>
              <select style={{ 
                fontSize: '11px',
                padding: '2px',
                border: '1px solid #7C99B5',
                width: '120px'
              }}>
                <option>All</option>
              </select>
            </div>
          </div>

          {/* Transactions Table */}
          <div style={{ flex: 1, overflow: 'auto', padding: '16px' }}>
            <table style={{ 
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: '11px',
              border: '1px solid #C0C0C0'
            }}>
              <thead>
                <tr style={{ backgroundColor: '#F0F0F0' }}>
                  <th style={{ 
                    padding: '6px 8px',
                    textAlign: 'left',
                    fontSize: '10px',
                    fontWeight: 'bold',
                    borderBottom: '1px solid #C0C0C0',
                    borderRight: '1px solid #E0E0E0'
                  }}>TYPE</th>
                  <th style={{ 
                    padding: '6px 8px',
                    textAlign: 'left',
                    fontSize: '10px',
                    fontWeight: 'bold',
                    borderBottom: '1px solid #C0C0C0',
                    borderRight: '1px solid #E0E0E0'
                  }}>NUM</th>
                  <th style={{ 
                    padding: '6px 8px',
                    textAlign: 'left',
                    fontSize: '10px',
                    fontWeight: 'bold',
                    borderBottom: '1px solid #C0C0C0',
                    borderRight: '1px solid #E0E0E0'
                  }}>DATE</th>
                  <th style={{ 
                    padding: '6px 8px',
                    textAlign: 'left',
                    fontSize: '10px',
                    fontWeight: 'bold',
                    borderBottom: '1px solid #C0C0C0',
                    borderRight: '1px solid #E0E0E0'
                  }}>ACCOUNT</th>
                  <th style={{ 
                    padding: '6px 8px',
                    textAlign: 'right',
                    fontSize: '10px',
                    fontWeight: 'bold',
                    borderBottom: '1px solid #C0C0C0'
                  }}>AMOUNT</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(selectedCustomer?.transactions) && selectedCustomer.transactions.length > 0 ? (
                  selectedCustomer.transactions.map((tx, idx) => (
                    <tr
                      key={idx}
                      style={{
                        borderBottom: '1px solid #E8E8E8',
                        cursor: 'pointer',
                        fontSize: '15px',
                        fontWeight: 'bold',
                        backgroundColor: idx % 2 === 1 ? 'transparent' : '#e5eefe', // 👈 every even-numbered row (2nd, 4th, etc.)
                      }}
                    >
                      <td style={{ padding: '6px 8px', borderRight: '1px solid #F0F0F0' }}>{show(tx.type)}</td>
                      <td style={{ padding: '6px 8px', borderRight: '1px solid #F0F0F0' }}>{show(tx.num)}</td>
                      <td style={{ padding: '6px 8px', borderRight: '1px solid #F0F0F0' }}>{show(tx.date)}</td>
                      <td style={{ padding: '6px 8px', borderRight: '1px solid #F0F0F0' }}>{show(tx.account)}</td>
                      <td style={{ padding: '6px 8px', textAlign: 'right' }}>
                        {typeof tx.amount === 'number'
                          ? tx.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                          : show(tx.amount, '0.00')}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} style={{ padding: '16px', textAlign: 'center', color: '#777' }}>
                      No transactions to display for this customer.
                    </td>
                  </tr>
                )}
              </tbody>

            </table>
          </div>

          {/* Bottom Buttons */}
          <div style={{ 
            padding: '12px 16px',
            backgroundColor: '#F5F5F5',
            borderTop: '1px solid #C0C0C0',
            display: 'flex',
            gap: '8px'
          }}>
            <button style={{ 
              backgroundColor: '#ECE9D8',
              border: '1px solid #9DB0C6',
              borderRadius: '2px',
              padding: '4px 12px',
              cursor: 'pointer',
              fontSize: '11px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              Manage Transactions <span style={{ fontSize: '8px' }}>▼</span>
            </button>
            <button style={{ 
              backgroundColor: '#ECE9D8',
              border: '1px solid #9DB0C6',
              borderRadius: '2px',
              padding: '4px 12px',
              cursor: 'pointer',
              fontSize: '11px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              Run Reports <span style={{ fontSize: '8px' }}>▼</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
