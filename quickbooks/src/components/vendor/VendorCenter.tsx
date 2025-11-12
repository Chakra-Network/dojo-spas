import { useState } from 'react';
import { useDojoState } from '../../dojo/state';
import { dojo } from '../../dojo/state';
import { NewVendorModal } from './NewVendorModal'; // Will create this file later
import { Vendor, VendorTransaction } from '../../dojo/state';
import { AddTransactionModal } from '../common/AddTransactionModal';

const vendorsDataFallback = [
  { name: "Office Supplies Inc.", balance: 1200.50, id: "vend-1", children: [], transactions: [], contactName: "Alice Smith", email: "alice@officesupplies.com", phone: "555-111-2222", address: "123 Main St, Anytown, USA" },
  { name: "Tech Solutions LLC", balance: 5000.00, id: "vend-2", children: [], transactions: [], contactName: "Bob Johnson", email: "bob@techsolutions.com", phone: "555-333-4444", address: "456 Tech Ave, Techville, USA"  },
  { name: "Cleaning Services Co.", balance: 300.00, id: "vend-3", children: [], transactions: [], contactName: "Charlie Brown", email: "charlie@cleaningservices.com", phone: "555-555-6666", address: "789 Clean Rd, Sparkle City, USA"  }
];

// Helper component: a single row (recursively renders children)
function VendorRow({
  vendor,
  level = 0,
  onSelect,
  selected,
}: {
  vendor: Vendor;
  level?: number;
  onSelect: (vendor: Vendor) => void;
  selected?: string;
}) {
  const [expanded, setExpanded] = useState(true);
  const hasChildren = vendor.children && vendor.children.length > 0; // Assuming vendors can have children for now
  const isSelected = selected === vendor.name;
  
  return (
    <>
      <tr 
        style={{
          backgroundColor: isSelected ? '#90C890' : 'white',
          cursor: 'pointer',
          borderBottom: '1px solid #e5e7eb'
        }}
        onClick={() => onSelect(vendor)}
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
            {vendor.name}
          </div>
        </td>
        <td style={{ 
          padding: '4px 8px',
          textAlign: 'right',
          fontSize: '18px',
          fontFamily: 'Tahoma, Arial, sans-serif'
        }}>
          {(vendor.balance ?? 0).toFixed(2)}
        </td>
        <td style={{ 
          padding: '4px 8px',
          fontSize: '11px',
          fontFamily: 'Tahoma, Arial, sans-serif',
          width: '50px'
        }}>
        </td>
      </tr>
      {hasChildren && expanded && vendor.children && vendor.children.map((child: Vendor) => (
        <VendorRow 
          key={child.id} 
          vendor={child} 
          level={level + 1} 
          onSelect={onSelect} 
          selected={selected}
        />
      ))}
    </>
  );
}

export function VendorCenter() {
  const vendors: Vendor[] = useDojoState("vendors");
  const initialVendors: Vendor[] = vendors.length > 0 ? vendors : vendorsDataFallback;

  const defaultSelected = (() => {
    if (initialVendors.length > 0) {
      const found = initialVendors.find((item: Vendor) => item.name && item.name.toLowerCase().includes('office'));
      return found || initialVendors[0];
    }
    return vendorsDataFallback[0];
  })();

  const [selectedVendor, setSelectedVendor] = useState<Vendor | undefined>(defaultSelected);
  const [activeTab, setActiveTab] = useState('vendors');
  const [isEditing, setIsEditing] = useState(false);
  const [isNewVendorModalOpen, setIsNewVendorModalOpen] = useState(false);
  const [isAddTransactionModalOpen, setIsAddTransactionModalOpen] = useState(false);

  function handleSelect(vendor: Vendor) {
    if (!vendor) return;
    setSelectedVendor(vendor);
  }

  // helper to display safe text value (or placeholder)
  const show = (val: any, placeholder = '') => (val === undefined || val === null ? placeholder : val);

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
        }}
        onClick={() => setIsNewVendorModalOpen(true)}
        >
          <span>📄</span> New Vendor <span style={{ fontSize: '20px' }}>▼</span>
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
        }}
        onClick={() => setIsAddTransactionModalOpen(true)}
        >
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
        {/* Center Panel - Vendor List */}
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
                backgroundColor: activeTab === 'vendors' ? 'white' : '#C0C0C0',
                borderRight: '1px solid #9DB0C6',
                cursor: 'pointer',
                fontSize: '11px',
                fontWeight: 'bold',
                borderTop: activeTab === 'vendors' ? '2px solid #1E4A7A' : 'none'
              }}
              onClick={() => setActiveTab('vendors')}
            >
              Vendors
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
              <option>Active Vendors</option>
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

          {/* Vendor Table */}
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
                {initialVendors.map((vend: Vendor) => (
                  <VendorRow 
                    key={vend.id} 
                    vendor={vend} 
                    onSelect={handleSelect}
                    selected={selectedVendor?.name}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Panel - Vendor Info */}
        <div style={{ 
          flex: 1,
          backgroundColor: 'white',
          display: 'flex',
          flexDirection: 'column'
        }}>
          {/* Vendor Info Header */}
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
                  Vendor Information
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
                <button 
                  style={{
                    backgroundColor: 'white',
                    border: '1px solid #9DB0C6',
                    borderRadius: '2px',
                    padding: '4px 8px',
                    cursor: 'pointer',
                    fontSize: '16px'
                  }}
                  onClick={() => setIsEditing(!isEditing)}
                >✏️</button>
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
              {isEditing ? (
                <input 
                  type="text" 
                  value={selectedVendor?.name || ''}
                  onChange={(e) => {
                    if (selectedVendor) {
                      setSelectedVendor({
                        ...selectedVendor,
                        name: e.target.value,
                      });
                    }
                  }}
                  onBlur={() => {
                    // Save changes to dojo state
                    if (selectedVendor) {
                      // Find the vendor in the global state and update its name
                      const updatedVendors = vendors.map((vend) => 
                        vend.id === selectedVendor.id ? selectedVendor : vend
                      );
                      dojo.setState("vendors", updatedVendors, `Updated vendor name to ${selectedVendor.name}`);
                    }
                    setIsEditing(false);
                  }}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.currentTarget.blur(); // Trigger onBlur to save changes
                    }
                  }}
                  style={{ fontWeight: 'bold', fontSize: "15px", padding: '2px 5px', border: '1px solid #7C99B5' }}
                />
              ) : (
                <div style={{ fontWeight: 'bold', fontSize: "15px" }}>{show(selectedVendor?.name, '—')}</div>
              )}

              <div style={{ color: '#666', textAlign: 'right', fontSize: "15px" }}>Main Phone</div>
              <div style={{ fontSize: "15px", fontWeight: "bold"}}>{show(selectedVendor?.phone, '555-555-555')}</div>
              
              <div style={{ color: '#666', textAlign: 'right',fontSize: "15px" }}>Contact Name</div>
              <div>{show(selectedVendor?.contactName, '—')}</div>

              <div style={{ color: '#666', textAlign: 'right', fontSize: "15px" }}>Alt. Phone</div>
              <div style={{ fontSize: "15px", fontWeight: "bold"}}>{show(selectedVendor?.phone, '555-555-555')}</div> {/* Using main phone as alt for now */}
              
              <div style={{ color: '#666', textAlign: 'right', fontSize: "15px" }}>Vendor Type</div>
              <div style={{ fontSize: "15px", fontWeight: "bold"}}>{show(selectedVendor?.name, 'Supplier')}</div>

              <div style={{ color: '#666', textAlign: 'right', fontSize: "15px" }}>Fax</div>
              <div style={{ fontSize: "15px", fontWeight: "bold"}}>{show(selectedVendor?.phone, '555-555-555')}</div> {/* Using main phone as fax for now */}
              
              <div style={{ color: '#666', textAlign: 'right',fontSize: "15px" }}>Terms</div>
              <div>{show(selectedVendor?.name, 'Net 30')}</div>

              <div style={{ color: '#666', textAlign: 'right' }}>Main Email</div>
              <div style={{ color: '#0066CC' }}>{show(selectedVendor?.email, '—')}</div>
              
              <div style={{ color: '#666', textAlign: 'right' }}>Bill To</div>
              <div dangerouslySetInnerHTML={{ __html: show(selectedVendor?.address, '—') }} />
              <div></div>
              <div></div>

              <div style={{ color: '#666', textAlign: 'right' , fontSize: "15px"}}>Balance</div>
              <div style={{ fontWeight: 'bold', fontSize: "15px" }}>{(selectedVendor?.balance ?? 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>

              <div style={{ color: '#666', textAlign: 'right' }}>ID</div>
              <div>{show(selectedVendor?.id, '—')}</div>
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
                {Array.isArray(selectedVendor?.transactions) && selectedVendor.transactions.length > 0 ? (
                  selectedVendor.transactions.map((tx: VendorTransaction, idx) => (
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
                      No transactions to display for this vendor.
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
      <NewVendorModal 
        isOpen={isNewVendorModalOpen} 
        onClose={() => setIsNewVendorModalOpen(false)}
      />
      <AddTransactionModal
        isOpen={isAddTransactionModalOpen}
        onClose={() => setIsAddTransactionModalOpen(false)}
        entityType="vendor"
        selectedEntity={selectedVendor}
      />
    </div>
  );
}
