export interface Vendor {
  id: string;
  vendorId: string;
  name: string;
  country: string;
  city: string;
  category: string;
  rating: number;
  totalOrders: number;
  totalSpend: number;
  currency: string;
  paymentTerms: string;
  contactName: string;
  contactEmail: string;
  status: 'active' | 'inactive' | 'blocked';
}

export const VENDORS_DATA: Vendor[] = [
  {
    id: 'v-001',
    vendorId: 'V-10001',
    name: 'Acme Industrial Supplies',
    country: 'USA',
    city: 'Cleveland, OH',
    category: 'Raw Materials',
    rating: 4.5,
    totalOrders: 156,
    totalSpend: 2450000,
    currency: 'USD',
    paymentTerms: 'Net 30',
    contactName: 'James Wilson',
    contactEmail: 'jwilson@acmeindustrial.com',
    status: 'active'
  },
  {
    id: 'v-002',
    vendorId: 'V-10002',
    name: 'TechParts Global',
    country: 'USA',
    city: 'San Jose, CA',
    category: 'Electronics',
    rating: 4.8,
    totalOrders: 89,
    totalSpend: 1890000,
    currency: 'USD',
    paymentTerms: 'Net 45',
    contactName: 'Lisa Park',
    contactEmail: 'lpark@techpartsglobal.com',
    status: 'active'
  },
  {
    id: 'v-003',
    vendorId: 'V-10003',
    name: 'Premium Raw Materials',
    country: 'Canada',
    city: 'Toronto, ON',
    category: 'Raw Materials',
    rating: 4.2,
    totalOrders: 234,
    totalSpend: 3120000,
    currency: 'USD',
    paymentTerms: 'Net 30',
    contactName: 'Mark Thompson',
    contactEmail: 'mthompson@premiumraw.ca',
    status: 'active'
  },
  {
    id: 'v-004',
    vendorId: 'V-10004',
    name: 'FastShip Logistics',
    country: 'USA',
    city: 'Memphis, TN',
    category: 'Logistics',
    rating: 4.0,
    totalOrders: 445,
    totalSpend: 890000,
    currency: 'USD',
    paymentTerms: 'Net 15',
    contactName: 'Robert Garcia',
    contactEmail: 'rgarcia@fastshiplog.com',
    status: 'active'
  },
  {
    id: 'v-005',
    vendorId: 'V-10005',
    name: 'Industrial Components Inc',
    country: 'Germany',
    city: 'Munich',
    category: 'Components',
    rating: 4.7,
    totalOrders: 67,
    totalSpend: 1560000,
    currency: 'USD',
    paymentTerms: 'Net 60',
    contactName: 'Hans Mueller',
    contactEmail: 'hmueller@industrialcomp.de',
    status: 'active'
  }
];
