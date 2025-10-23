import type { PurchaseOrder, ApprovalTask, AuditLogEntry, AppState } from "./types";

const daysAgo = (days: number): string => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString();
};

const daysFromNow = (days: number): string => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString();
};

export const seedPurchaseOrders: PurchaseOrder[] = [
  {
    id: "po-001",
    poNumber: "PO-2025-001234",
    vendor: "TechSupply GmbH",
    vendorId: "V-1001",
    description: "Office Equipment and Supplies",
    amount: 45750.00,
    currency: "EUR",
    requestedBy: "Maria Schmidt",
    department: "IT Operations",
    status: "Pending Approval",
    createdDate: daysAgo(2),
    deliveryDate: daysFromNow(15),
    items: [
      {
        id: "item-001",
        itemNumber: "001",
        description: "Laptop - Dell XPS 15",
        quantity: 10,
        unitPrice: 1899.00,
        totalPrice: 18990.00,
        unit: "EA"
      },
      {
        id: "item-002",
        itemNumber: "002",
        description: "USB-C Docking Station",
        quantity: 10,
        unitPrice: 289.00,
        totalPrice: 2890.00,
        unit: "EA"
      },
      {
        id: "item-003",
        itemNumber: "003",
        description: "Wireless Mouse",
        quantity: 25,
        unitPrice: 49.00,
        totalPrice: 1225.00,
        unit: "EA"
      },
      {
        id: "item-004",
        itemNumber: "004",
        description: "Mechanical Keyboard",
        quantity: 25,
        unitPrice: 129.00,
        totalPrice: 3225.00,
        unit: "EA"
      },
      {
        id: "item-005",
        itemNumber: "005",
        description: "27-inch Monitor",
        quantity: 20,
        unitPrice: 429.00,
        totalPrice: 8580.00,
        unit: "EA"
      },
      {
        id: "item-006",
        itemNumber: "006",
        description: "Webcam HD Pro",
        quantity: 15,
        unitPrice: 159.00,
        totalPrice: 2385.00,
        unit: "EA"
      },
      {
        id: "item-007",
        itemNumber: "007",
        description: "Headset with Microphone",
        quantity: 30,
        unitPrice: 89.00,
        totalPrice: 2670.00,
        unit: "EA"
      },
      {
        id: "item-008",
        itemNumber: "008",
        description: "Office Desk Organizer Set",
        quantity: 50,
        unitPrice: 35.00,
        totalPrice: 1750.00,
        unit: "EA"
      },
      {
        id: "item-009",
        itemNumber: "009",
        description: "Cable Management Kit",
        quantity: 40,
        unitPrice: 25.00,
        totalPrice: 1000.00,
        unit: "EA"
      },
      {
        id: "item-010",
        itemNumber: "010",
        description: "External SSD 1TB",
        quantity: 20,
        unitPrice: 152.00,
        totalPrice: 3040.00,
        unit: "EA"
      }
    ],
    comments: [
      {
        id: "comment-001",
        author: "Maria Schmidt",
        text: "Urgent request for new office setup in Berlin headquarters.",
        timestamp: daysAgo(2)
      }
    ]
  },
  {
    id: "po-002",
    poNumber: "PO-2025-001235",
    vendor: "Siemens Industrial Solutions",
    vendorId: "V-2002",
    description: "Manufacturing Equipment Upgrade",
    amount: 285000.00,
    currency: "EUR",
    requestedBy: "Hans Mueller",
    department: "Manufacturing",
    status: "Approved",
    createdDate: daysAgo(10),
    deliveryDate: daysFromNow(45),
    approver: "Klaus Weber",
    approvedDate: daysAgo(3),
    items: [
      {
        id: "item-011",
        itemNumber: "001",
        description: "CNC Milling Machine",
        quantity: 2,
        unitPrice: 125000.00,
        totalPrice: 250000.00,
        unit: "EA"
      },
      {
        id: "item-012",
        itemNumber: "002",
        description: "Industrial Robot Arm",
        quantity: 1,
        unitPrice: 35000.00,
        totalPrice: 35000.00,
        unit: "EA"
      }
    ],
    comments: [
      {
        id: "comment-002",
        author: "Hans Mueller",
        text: "Critical for Q2 production capacity increase.",
        timestamp: daysAgo(10)
      },
      {
        id: "comment-003",
        author: "Klaus Weber",
        text: "Approved. Ensure installation is coordinated with production schedule.",
        timestamp: daysAgo(3)
      }
    ]
  },
  {
    id: "po-003",
    poNumber: "PO-2025-001236",
    vendor: "Global Office Furniture Ltd",
    vendorId: "V-3003",
    description: "Ergonomic Office Furniture",
    amount: 32400.00,
    currency: "EUR",
    requestedBy: "Lisa Wagner",
    department: "Human Resources",
    status: "Ordered",
    createdDate: daysAgo(15),
    deliveryDate: daysFromNow(10),
    approver: "Klaus Weber",
    approvedDate: daysAgo(12),
    items: [
      {
        id: "item-013",
        itemNumber: "001",
        description: "Ergonomic Office Chair",
        quantity: 40,
        unitPrice: 450.00,
        totalPrice: 18000.00,
        unit: "EA"
      },
      {
        id: "item-014",
        itemNumber: "002",
        description: "Adjustable Standing Desk",
        quantity: 30,
        unitPrice: 480.00,
        totalPrice: 14400.00,
        unit: "EA"
      }
    ],
    comments: [
      {
        id: "comment-004",
        author: "Lisa Wagner",
        text: "For new Munich office expansion.",
        timestamp: daysAgo(15)
      }
    ]
  },
  {
    id: "po-004",
    poNumber: "PO-2025-001237",
    vendor: "CloudServices Inc",
    vendorId: "V-4004",
    description: "Annual Cloud Infrastructure License",
    amount: 125000.00,
    currency: "EUR",
    requestedBy: "Thomas Becker",
    department: "IT Infrastructure",
    status: "Pending Approval",
    createdDate: daysAgo(1),
    deliveryDate: daysFromNow(7),
    items: [
      {
        id: "item-015",
        itemNumber: "001",
        description: "Enterprise Cloud License - 12 Months",
        quantity: 1,
        unitPrice: 125000.00,
        totalPrice: 125000.00,
        unit: "EA"
      }
    ],
    comments: []
  },
  {
    id: "po-005",
    poNumber: "PO-2025-001238",
    vendor: "Safety Equipment Pro",
    vendorId: "V-5005",
    description: "Safety Gear and Equipment",
    amount: 8750.00,
    currency: "EUR",
    requestedBy: "Stefan Richter",
    department: "Health & Safety",
    status: "Draft",
    createdDate: daysAgo(0),
    deliveryDate: daysFromNow(20),
    items: [
      {
        id: "item-016",
        itemNumber: "001",
        description: "Safety Helmets",
        quantity: 100,
        unitPrice: 25.00,
        totalPrice: 2500.00,
        unit: "EA"
      },
      {
        id: "item-017",
        itemNumber: "002",
        description: "Safety Goggles",
        quantity: 150,
        unitPrice: 15.00,
        totalPrice: 2250.00,
        unit: "EA"
      },
      {
        id: "item-018",
        itemNumber: "003",
        description: "High-Visibility Vests",
        quantity: 200,
        unitPrice: 12.00,
        totalPrice: 2400.00,
        unit: "EA"
      },
      {
        id: "item-019",
        itemNumber: "004",
        description: "First Aid Kits",
        quantity: 40,
        unitPrice: 40.00,
        totalPrice: 1600.00,
        unit: "EA"
      }
    ],
    comments: []
  },
  {
    id: "po-006",
    poNumber: "PO-2025-001239",
    vendor: "Marketing Materials GmbH",
    vendorId: "V-6006",
    description: "Trade Show Marketing Materials",
    amount: 15600.00,
    currency: "EUR",
    requestedBy: "Anna Klein",
    department: "Marketing",
    status: "Rejected",
    createdDate: daysAgo(7),
    deliveryDate: daysFromNow(30),
    approver: "Klaus Weber",
    approvedDate: daysAgo(5),
    items: [
      {
        id: "item-020",
        itemNumber: "001",
        description: "Pop-up Display Stands",
        quantity: 5,
        unitPrice: 800.00,
        totalPrice: 4000.00,
        unit: "EA"
      },
      {
        id: "item-021",
        itemNumber: "002",
        description: "Promotional Brochures (1000 pcs)",
        quantity: 10,
        unitPrice: 450.00,
        totalPrice: 4500.00,
        unit: "LOT"
      },
      {
        id: "item-022",
        itemNumber: "003",
        description: "Branded Merchandise Kit",
        quantity: 500,
        unitPrice: 14.20,
        totalPrice: 7100.00,
        unit: "EA"
      }
    ],
    comments: [
      {
        id: "comment-005",
        author: "Klaus Weber",
        text: "Budget exceeded for Q1. Please resubmit with reduced scope.",
        timestamp: daysAgo(5)
      }
    ]
  }
];

export const seedTasks: ApprovalTask[] = [
  {
    id: "task-001",
    title: "Approve Purchase Order PO-2025-001234",
    description: "Office Equipment and Supplies for IT Operations - €45,750.00",
    type: "Purchase Order",
    referenceId: "po-001",
    amount: 45750.00,
    currency: "EUR",
    requestedBy: "Maria Schmidt",
    status: "Pending",
    priority: "High",
    dueDate: daysFromNow(2),
    createdDate: daysAgo(2)
  },
  {
    id: "task-002",
    title: "Approve Purchase Order PO-2025-001237",
    description: "Annual Cloud Infrastructure License - €125,000.00",
    type: "Purchase Order",
    referenceId: "po-004",
    amount: 125000.00,
    currency: "EUR",
    requestedBy: "Thomas Becker",
    status: "Pending",
    priority: "Critical",
    dueDate: daysFromNow(1),
    createdDate: daysAgo(1)
  },
  {
    id: "task-003",
    title: "Approve Travel Request - Berlin Conference",
    description: "3-day conference attendance including flights and accommodation",
    type: "Travel Request",
    referenceId: "tr-001",
    amount: 1850.00,
    currency: "EUR",
    requestedBy: "Michael Schneider",
    status: "Pending",
    priority: "Medium",
    dueDate: daysFromNow(5),
    createdDate: daysAgo(3)
  },
  {
    id: "task-004",
    title: "Approve Expense Report - Q1 Client Meetings",
    description: "Client entertainment and meeting expenses",
    type: "Expense Report",
    referenceId: "exp-001",
    amount: 2340.50,
    currency: "EUR",
    requestedBy: "Julia Hoffmann",
    status: "In Progress",
    priority: "Low",
    dueDate: daysFromNow(7),
    createdDate: daysAgo(5)
  },
  {
    id: "task-005",
    title: "Approve Time Off Request - Summer Vacation",
    description: "2 weeks vacation leave in July",
    type: "Time Off",
    referenceId: "to-001",
    requestedBy: "Peter Fischer",
    status: "Pending",
    priority: "Low",
    dueDate: daysFromNow(14),
    createdDate: daysAgo(1)
  },
  {
    id: "task-006",
    title: "Approve Purchase Order PO-2025-001235",
    description: "Manufacturing Equipment Upgrade - €285,000.00",
    type: "Purchase Order",
    referenceId: "po-002",
    amount: 285000.00,
    currency: "EUR",
    requestedBy: "Hans Mueller",
    status: "Completed",
    priority: "Critical",
    dueDate: daysAgo(3),
    createdDate: daysAgo(10),
    completedDate: daysAgo(3)
  },
  {
    id: "task-007",
    title: "Approve Expense Report - Training Materials",
    description: "Employee training and development materials",
    type: "Expense Report",
    referenceId: "exp-002",
    amount: 890.00,
    currency: "EUR",
    requestedBy: "Sarah Meyer",
    status: "Completed",
    priority: "Medium",
    dueDate: daysAgo(8),
    createdDate: daysAgo(12),
    completedDate: daysAgo(8)
  }
];

export const seedAuditLog: AuditLogEntry[] = [
  {
    id: "audit-001",
    timestamp: daysAgo(0),
    action: "create",
    entityType: "PurchaseOrder",
    entityId: "po-005",
    entityName: "PO-2025-001238",
    performedBy: "Stefan Richter",
    details: "Created new purchase order for Safety Gear and Equipment",
    metadata: { amount: 8750.00, status: "Draft" }
  },
  {
    id: "audit-002",
    timestamp: daysAgo(1),
    action: "create",
    entityType: "PurchaseOrder",
    entityId: "po-004",
    entityName: "PO-2025-001237",
    performedBy: "Thomas Becker",
    details: "Created new purchase order for Annual Cloud Infrastructure License",
    metadata: { amount: 125000.00, status: "Pending Approval" }
  },
  {
    id: "audit-003",
    timestamp: daysAgo(2),
    action: "create",
    entityType: "PurchaseOrder",
    entityId: "po-001",
    entityName: "PO-2025-001234",
    performedBy: "Maria Schmidt",
    details: "Created new purchase order for Office Equipment and Supplies",
    metadata: { amount: 45750.00, status: "Pending Approval" }
  },
  {
    id: "audit-004",
    timestamp: daysAgo(3),
    action: "approve",
    entityType: "PurchaseOrder",
    entityId: "po-002",
    entityName: "PO-2025-001235",
    performedBy: "Klaus Weber",
    details: "Approved purchase order for Manufacturing Equipment Upgrade",
    metadata: { amount: 285000.00, previousStatus: "Pending Approval", newStatus: "Approved" }
  },
  {
    id: "audit-005",
    timestamp: daysAgo(3),
    action: "comment",
    entityType: "PurchaseOrder",
    entityId: "po-002",
    entityName: "PO-2025-001235",
    performedBy: "Klaus Weber",
    details: "Added comment: Approved. Ensure installation is coordinated with production schedule.",
    metadata: {}
  },
  {
    id: "audit-006",
    timestamp: daysAgo(5),
    action: "reject",
    entityType: "PurchaseOrder",
    entityId: "po-006",
    entityName: "PO-2025-001239",
    performedBy: "Klaus Weber",
    details: "Rejected purchase order for Trade Show Marketing Materials",
    metadata: { amount: 15600.00, previousStatus: "Pending Approval", newStatus: "Rejected" }
  },
  {
    id: "audit-007",
    timestamp: daysAgo(5),
    action: "comment",
    entityType: "PurchaseOrder",
    entityId: "po-006",
    entityName: "PO-2025-001239",
    performedBy: "Klaus Weber",
    details: "Added comment: Budget exceeded for Q1. Please resubmit with reduced scope.",
    metadata: {}
  },
  {
    id: "audit-008",
    timestamp: daysAgo(7),
    action: "create",
    entityType: "PurchaseOrder",
    entityId: "po-006",
    entityName: "PO-2025-001239",
    performedBy: "Anna Klein",
    details: "Created new purchase order for Trade Show Marketing Materials",
    metadata: { amount: 15600.00, status: "Pending Approval" }
  },
  {
    id: "audit-009",
    timestamp: daysAgo(10),
    action: "create",
    entityType: "PurchaseOrder",
    entityId: "po-002",
    entityName: "PO-2025-001235",
    performedBy: "Hans Mueller",
    details: "Created new purchase order for Manufacturing Equipment Upgrade",
    metadata: { amount: 285000.00, status: "Pending Approval" }
  },
  {
    id: "audit-010",
    timestamp: daysAgo(12),
    action: "status_change",
    entityType: "PurchaseOrder",
    entityId: "po-003",
    entityName: "PO-2025-001236",
    performedBy: "System",
    details: "Purchase order status changed from Approved to Ordered",
    metadata: { previousStatus: "Approved", newStatus: "Ordered" }
  },
  {
    id: "audit-011",
    timestamp: daysAgo(12),
    action: "approve",
    entityType: "PurchaseOrder",
    entityId: "po-003",
    entityName: "PO-2025-001236",
    performedBy: "Klaus Weber",
    details: "Approved purchase order for Ergonomic Office Furniture",
    metadata: { amount: 32400.00, previousStatus: "Pending Approval", newStatus: "Approved" }
  },
  {
    id: "audit-012",
    timestamp: daysAgo(15),
    action: "create",
    entityType: "PurchaseOrder",
    entityId: "po-003",
    entityName: "PO-2025-001236",
    performedBy: "Lisa Wagner",
    details: "Created new purchase order for Ergonomic Office Furniture",
    metadata: { amount: 32400.00, status: "Pending Approval" }
  }
];

export const initialState: AppState = {
  currentUser: "Klaus Weber",
  currentSection: "dashboard",
  purchaseOrders: seedPurchaseOrders,
  tasks: seedTasks,
  auditLog: seedAuditLog,
  searchQuery: "",
  selectedPOId: null,
  poFilters: {
    status: "All",
    vendor: "",
    dateRange: "all"
  },
  taskFilters: {
    status: "All",
    priority: "All"
  }
};

