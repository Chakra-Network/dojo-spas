export interface PurchaseOrderItem {
  id: string;
  material: string;
  description: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  totalPrice: number;
  deliveryDate: string;
}

export interface PurchaseOrder {
  id: string;
  poNumber: string;
  vendor: string;
  vendorId: string;
  createdDate: string;
  deliveryDate: string;
  status: 'pending' | 'approved' | 'rejected' | 'delivered' | 'partially_delivered';
  totalAmount: number;
  currency: string;
  plant: string;
  purchasingOrg: string;
  items: PurchaseOrderItem[];
  createdBy: string;
  approvedBy?: string;
  approvalDate?: string;
  notes?: string;
}

export const PURCHASE_ORDERS_DATA: PurchaseOrder[] = [
  {
    id: 'po-001',
    poNumber: '4500001234',
    vendor: 'Acme Industrial Supplies',
    vendorId: 'V-10001',
    createdDate: '2024-12-15',
    deliveryDate: '2024-12-28',
    status: 'pending',
    totalAmount: 45750.00,
    currency: 'USD',
    plant: 'Plant 1000 - Chicago',
    purchasingOrg: 'US Procurement',
    createdBy: 'john.smith',
    items: [
      { id: 'item-001', material: 'MAT-1001', description: 'Steel Plates 10mm', quantity: 500, unit: 'EA', unitPrice: 45.50, totalPrice: 22750.00, deliveryDate: '2024-12-28' },
      { id: 'item-002', material: 'MAT-1002', description: 'Steel Rods 20mm', quantity: 300, unit: 'EA', unitPrice: 76.67, totalPrice: 23000.00, deliveryDate: '2024-12-28' },
    ],
    notes: 'Urgent order for Q1 production'
  },
  {
    id: 'po-002',
    poNumber: '4500001235',
    vendor: 'TechParts Global',
    vendorId: 'V-10002',
    createdDate: '2024-12-14',
    deliveryDate: '2024-12-30',
    status: 'approved',
    totalAmount: 128500.00,
    currency: 'USD',
    plant: 'Plant 2000 - Detroit',
    purchasingOrg: 'US Procurement',
    createdBy: 'mary.johnson',
    approvedBy: 'david.wilson',
    approvalDate: '2024-12-15',
    items: [
      { id: 'item-003', material: 'MAT-2001', description: 'Electronic Control Units', quantity: 100, unit: 'EA', unitPrice: 850.00, totalPrice: 85000.00, deliveryDate: '2024-12-30' },
      { id: 'item-004', material: 'MAT-2002', description: 'Sensor Modules', quantity: 250, unit: 'EA', unitPrice: 174.00, totalPrice: 43500.00, deliveryDate: '2024-12-30' },
    ]
  },
  {
    id: 'po-003',
    poNumber: '4500001236',
    vendor: 'Premium Raw Materials',
    vendorId: 'V-10003',
    createdDate: '2024-12-10',
    deliveryDate: '2024-12-20',
    status: 'delivered',
    totalAmount: 67800.00,
    currency: 'USD',
    plant: 'Plant 1000 - Chicago',
    purchasingOrg: 'US Procurement',
    createdBy: 'robert.brown',
    approvedBy: 'sarah.davis',
    approvalDate: '2024-12-11',
    items: [
      { id: 'item-005', material: 'MAT-3001', description: 'Aluminum Sheets', quantity: 200, unit: 'EA', unitPrice: 189.00, totalPrice: 37800.00, deliveryDate: '2024-12-20' },
      { id: 'item-006', material: 'MAT-3002', description: 'Copper Wire Spools', quantity: 150, unit: 'EA', unitPrice: 200.00, totalPrice: 30000.00, deliveryDate: '2024-12-20' },
    ]
  },
  {
    id: 'po-004',
    poNumber: '4500001237',
    vendor: 'FastShip Logistics',
    vendorId: 'V-10004',
    createdDate: '2024-12-16',
    deliveryDate: '2025-01-05',
    status: 'pending',
    totalAmount: 23400.00,
    currency: 'USD',
    plant: 'Plant 3000 - Dallas',
    purchasingOrg: 'US Procurement',
    createdBy: 'emily.chen',
    items: [
      { id: 'item-007', material: 'MAT-4001', description: 'Packaging Materials', quantity: 1000, unit: 'EA', unitPrice: 12.40, totalPrice: 12400.00, deliveryDate: '2025-01-05' },
      { id: 'item-008', material: 'MAT-4002', description: 'Shipping Labels', quantity: 5000, unit: 'EA', unitPrice: 2.20, totalPrice: 11000.00, deliveryDate: '2025-01-05' },
    ]
  },
  {
    id: 'po-005',
    poNumber: '4500001238',
    vendor: 'Industrial Components Inc',
    vendorId: 'V-10005',
    createdDate: '2024-12-12',
    deliveryDate: '2024-12-25',
    status: 'partially_delivered',
    totalAmount: 94500.00,
    currency: 'USD',
    plant: 'Plant 2000 - Detroit',
    purchasingOrg: 'US Procurement',
    createdBy: 'michael.lee',
    approvedBy: 'david.wilson',
    approvalDate: '2024-12-13',
    items: [
      { id: 'item-009', material: 'MAT-5001', description: 'Hydraulic Pumps', quantity: 50, unit: 'EA', unitPrice: 1250.00, totalPrice: 62500.00, deliveryDate: '2024-12-25' },
      { id: 'item-010', material: 'MAT-5002', description: 'Valve Assemblies', quantity: 80, unit: 'EA', unitPrice: 400.00, totalPrice: 32000.00, deliveryDate: '2024-12-25' },
    ],
    notes: '40/50 pumps delivered, awaiting remainder'
  }
];
