import type { Vendor, PurchaseOrder, ApprovalTask, KPIData, AuditEntry } from "../types/index.ts";

export const seedVendors: Vendor[] = [
  { id: "v-001", name: "Siemens AG", code: "V-10001", country: "Germany", rating: 4.8, category: "Industrial Equipment", contact: "Hans Mueller", email: "h.mueller@siemens.de" },
  { id: "v-002", name: "Bosch GmbH", code: "V-10002", country: "Germany", rating: 4.6, category: "Auto Parts & Electronics", contact: "Klaus Weber", email: "k.weber@bosch.com" },
  { id: "v-003", name: "BASF SE", code: "V-10003", country: "Germany", rating: 4.5, category: "Chemicals & Materials", contact: "Anna Schmidt", email: "a.schmidt@basf.com" },
  { id: "v-004", name: "Caterpillar Inc.", code: "V-10004", country: "United States", rating: 4.3, category: "Heavy Machinery", contact: "John Carter", email: "j.carter@cat.com" },
  { id: "v-005", name: "3M Company", code: "V-10005", country: "United States", rating: 4.7, category: "Safety & Industrial", contact: "Sarah Chen", email: "s.chen@mmm.com" },
  { id: "v-006", name: "ABB Ltd", code: "V-10006", country: "Switzerland", rating: 4.4, category: "Robotics & Power", contact: "Erik Johansson", email: "e.johansson@abb.com" },
  { id: "v-007", name: "Schneider Electric", code: "V-10007", country: "France", rating: 4.2, category: "Energy Management", contact: "Marie Dupont", email: "m.dupont@se.com" },
  { id: "v-008", name: "Honeywell International", code: "V-10008", country: "United States", rating: 4.6, category: "Aerospace & Controls", contact: "Robert Kim", email: "r.kim@honeywell.com" },
  { id: "v-009", name: "Mitsubishi Electric", code: "V-10009", country: "Japan", rating: 4.5, category: "Factory Automation", contact: "Takashi Ito", email: "t.ito@mitsubishi.co.jp" },
  { id: "v-010", name: "Emerson Electric", code: "V-10010", country: "United States", rating: 4.1, category: "Process Automation", contact: "David Brown", email: "d.brown@emerson.com" },
];

export const seedPurchaseOrders: PurchaseOrder[] = [
  {
    id: "po-001", poNumber: "PO-4500012847", title: "Industrial PLC Controllers — Plant Modernization",
    vendor: seedVendors[0], status: "Pending Approval", priority: "High",
    createdDate: "2025-06-28", requiredDate: "2025-07-25", totalAmount: 284500, currency: "EUR",
    department: "Manufacturing", requestor: "Thomas Bauer", approver: "Dr. Claudia Richter",
    plant: "Plant 1100 — Stuttgart", companyCode: "CC-1000",
    lineItems: [
      { id: "li-001", material: "MAT-70021", description: "SIMATIC S7-1500 CPU", quantity: 15, unit: "EA", unitPrice: 12500, currency: "EUR", deliveryDate: "2025-07-18" },
      { id: "li-002", material: "MAT-70022", description: "ET 200SP Distributed I/O", quantity: 30, unit: "EA", unitPrice: 2650, currency: "EUR", deliveryDate: "2025-07-18" },
      { id: "li-003", material: "MAT-70023", description: "Industrial Ethernet Switches", quantity: 10, unit: "EA", unitPrice: 4200, currency: "EUR", deliveryDate: "2025-07-20" },
    ],
    comments: [
      { id: "c-001", author: "Thomas Bauer", text: "Urgent — required for Q3 plant upgrade. Old controllers reaching EOL.", timestamp: "2025-06-28T09:15:00Z" },
      { id: "c-002", author: "Dr. Claudia Richter", text: "Reviewing budget allocation. Will approve once capex is confirmed.", timestamp: "2025-06-29T14:30:00Z" },
    ],
  },
  {
    id: "po-002", poNumber: "PO-4500012848", title: "Auto Sensor Modules — Quality Line Upgrade",
    vendor: seedVendors[1], status: "Approved", priority: "Medium",
    createdDate: "2025-06-20", requiredDate: "2025-07-15", totalAmount: 67800, currency: "EUR",
    department: "Quality Assurance", requestor: "Martin Fischer", approver: "Dr. Claudia Richter",
    plant: "Plant 1200 — Munich", companyCode: "CC-1000",
    lineItems: [
      { id: "li-004", material: "MAT-80100", description: "Ultrasonic Proximity Sensors", quantity: 200, unit: "EA", unitPrice: 189, currency: "EUR", deliveryDate: "2025-07-10" },
      { id: "li-005", material: "MAT-80101", description: "Inductive Sensors M18", quantity: 150, unit: "EA", unitPrice: 124, currency: "EUR", deliveryDate: "2025-07-10" },
      { id: "li-006", material: "MAT-80102", description: "Sensor Mounting Brackets", quantity: 350, unit: "EA", unitPrice: 18, currency: "EUR", deliveryDate: "2025-07-12" },
    ],
    comments: [
      { id: "c-003", author: "Martin Fischer", text: "Approved by QA head. Sensors needed for new vision inspection line.", timestamp: "2025-06-22T11:00:00Z" },
    ],
  },
  {
    id: "po-003", poNumber: "PO-4500012849", title: "Chemical Raw Materials — Q3 Production Batch",
    vendor: seedVendors[2], status: "In Delivery", priority: "High",
    createdDate: "2025-06-10", requiredDate: "2025-07-05", totalAmount: 192000, currency: "EUR",
    department: "Production", requestor: "Lisa Hartmann", approver: "Stefan Braun",
    plant: "Plant 1300 — Hamburg", companyCode: "CC-2000",
    lineItems: [
      { id: "li-007", material: "MAT-90010", description: "Polyethylene Granulate (HDPE)", quantity: 20, unit: "TO", unitPrice: 5200, currency: "EUR", deliveryDate: "2025-07-01" },
      { id: "li-008", material: "MAT-90011", description: "Polypropylene Copolymer", quantity: 15, unit: "TO", unitPrice: 4800, currency: "EUR", deliveryDate: "2025-07-03" },
    ],
    comments: [
      { id: "c-004", author: "Lisa Hartmann", text: "Shipment tracking: DHL ref DE-8827364. Expected arrival July 2nd.", timestamp: "2025-06-30T08:20:00Z" },
    ],
  },
  {
    id: "po-004", poNumber: "PO-4500012850", title: "Excavator Parts — Maintenance Program",
    vendor: seedVendors[3], status: "Pending Approval", priority: "Medium",
    createdDate: "2025-07-01", requiredDate: "2025-07-30", totalAmount: 145000, currency: "USD",
    department: "Maintenance", requestor: "Frank Mueller", approver: "Dr. Claudia Richter",
    plant: "Plant 2100 — Chicago", companyCode: "CC-3000",
    lineItems: [
      { id: "li-009", material: "MAT-50200", description: "CAT 320 Hydraulic Pump Assembly", quantity: 3, unit: "EA", unitPrice: 28500, currency: "USD", deliveryDate: "2025-07-22" },
      { id: "li-010", material: "MAT-50201", description: "Track Link Assembly", quantity: 6, unit: "EA", unitPrice: 8750, currency: "USD", deliveryDate: "2025-07-25" },
    ],
    comments: [],
  },
  {
    id: "po-005", poNumber: "PO-4500012851", title: "Safety Equipment — Annual Compliance Order",
    vendor: seedVendors[4], status: "Approved", priority: "High",
    createdDate: "2025-06-15", requiredDate: "2025-07-10", totalAmount: 34200, currency: "USD",
    department: "EHS", requestor: "Jennifer White", approver: "Stefan Braun",
    plant: "Plant 2100 — Chicago", companyCode: "CC-3000",
    lineItems: [
      { id: "li-011", material: "MAT-60010", description: "3M SafeGuard Respirators N95", quantity: 2000, unit: "EA", unitPrice: 4.50, currency: "USD", deliveryDate: "2025-07-05" },
      { id: "li-012", material: "MAT-60011", description: "Chemical Splash Goggles", quantity: 500, unit: "EA", unitPrice: 18, currency: "USD", deliveryDate: "2025-07-05" },
      { id: "li-013", material: "MAT-60012", description: "Anti-Vibration Gloves", quantity: 800, unit: "PR", unitPrice: 16.50, currency: "USD", deliveryDate: "2025-07-07" },
    ],
    comments: [
      { id: "c-005", author: "Jennifer White", text: "Compliance audit in August — need full stock by end of July.", timestamp: "2025-06-16T10:45:00Z" },
    ],
  },
  {
    id: "po-006", poNumber: "PO-4500012852", title: "Robotic Welding Cell — New Assembly Line",
    vendor: seedVendors[5], status: "Rejected", priority: "High",
    createdDate: "2025-06-05", requiredDate: "2025-08-15", totalAmount: 520000, currency: "EUR",
    department: "Engineering", requestor: "Michael Krause", approver: "Dr. Claudia Richter",
    plant: "Plant 1100 — Stuttgart", companyCode: "CC-1000",
    lineItems: [
      { id: "li-014", material: "MAT-40300", description: "IRB 6700 Robot Arm", quantity: 2, unit: "EA", unitPrice: 185000, currency: "EUR", deliveryDate: "2025-08-01" },
      { id: "li-015", material: "MAT-40301", description: "Welding Power Source TPS 500i", quantity: 2, unit: "EA", unitPrice: 45000, currency: "EUR", deliveryDate: "2025-08-01" },
      { id: "li-016", material: "MAT-40302", description: "Safety Fence System", quantity: 1, unit: "SET", unitPrice: 60000, currency: "EUR", deliveryDate: "2025-08-10" },
    ],
    comments: [
      { id: "c-006", author: "Dr. Claudia Richter", text: "Budget exceeded for this quarter. Resubmit in Q4 with revised scope.", timestamp: "2025-06-12T16:00:00Z" },
      { id: "c-007", author: "Michael Krause", text: "Understood. Will revise and split across two budget periods.", timestamp: "2025-06-13T09:30:00Z" },
    ],
  },
  {
    id: "po-007", poNumber: "PO-4500012853", title: "Energy Management System Upgrade",
    vendor: seedVendors[6], status: "Draft", priority: "Low",
    createdDate: "2025-07-02", requiredDate: "2025-09-01", totalAmount: 78500, currency: "EUR",
    department: "Facilities", requestor: "Nicole Werner", approver: "Stefan Braun",
    plant: "Plant 1300 — Hamburg", companyCode: "CC-2000",
    lineItems: [
      { id: "li-017", material: "MAT-30100", description: "EcoStruxure Building Mgmt Module", quantity: 5, unit: "EA", unitPrice: 12500, currency: "EUR", deliveryDate: "2025-08-20" },
      { id: "li-018", material: "MAT-30101", description: "Smart Power Meters", quantity: 25, unit: "EA", unitPrice: 640, currency: "EUR", deliveryDate: "2025-08-25" },
    ],
    comments: [],
  },
  {
    id: "po-008", poNumber: "PO-4500012854", title: "Aerospace-Grade Actuators — R&D Prototype",
    vendor: seedVendors[7], status: "Pending Approval", priority: "High",
    createdDate: "2025-06-30", requiredDate: "2025-07-28", totalAmount: 198000, currency: "USD",
    department: "R&D", requestor: "David Park", approver: "Dr. Claudia Richter",
    plant: "Plant 2200 — San Jose", companyCode: "CC-3000",
    lineItems: [
      { id: "li-019", material: "MAT-20500", description: "Honeywell Smart Position Actuator", quantity: 8, unit: "EA", unitPrice: 18500, currency: "USD", deliveryDate: "2025-07-20" },
      { id: "li-020", material: "MAT-20501", description: "Precision Control Valve Assembly", quantity: 12, unit: "EA", unitPrice: 4250, currency: "USD", deliveryDate: "2025-07-22" },
    ],
    comments: [
      { id: "c-008", author: "David Park", text: "Critical for Phase 2 prototype. Customer demo scheduled Aug 15.", timestamp: "2025-06-30T15:00:00Z" },
    ],
  },
  {
    id: "po-009", poNumber: "PO-4500012855", title: "Factory Automation Controllers — Line 4 Expansion",
    vendor: seedVendors[8], status: "Received", priority: "Medium",
    createdDate: "2025-05-15", requiredDate: "2025-06-20", totalAmount: 112000, currency: "USD",
    department: "Manufacturing", requestor: "Akira Tanaka", approver: "Stefan Braun",
    plant: "Plant 3100 — Osaka", companyCode: "CC-4000",
    lineItems: [
      { id: "li-021", material: "MAT-10700", description: "MELSEC iQ-R Series PLC", quantity: 4, unit: "EA", unitPrice: 19500, currency: "USD", deliveryDate: "2025-06-15" },
      { id: "li-022", material: "MAT-10701", description: "GOT2000 HMI Touch Panel", quantity: 8, unit: "EA", unitPrice: 4250, currency: "USD", deliveryDate: "2025-06-15" },
    ],
    comments: [
      { id: "c-009", author: "Akira Tanaka", text: "All items received and installed. Line 4 commissioning next week.", timestamp: "2025-06-22T07:30:00Z" },
    ],
  },
  {
    id: "po-010", poNumber: "PO-4500012856", title: "Process Instrumentation — Valve Replacement Program",
    vendor: seedVendors[9], status: "In Delivery", priority: "Medium",
    createdDate: "2025-06-18", requiredDate: "2025-07-18", totalAmount: 89600, currency: "USD",
    department: "Operations", requestor: "Carlos Rivera", approver: "Stefan Braun",
    plant: "Plant 2300 — Houston", companyCode: "CC-3000",
    lineItems: [
      { id: "li-023", material: "MAT-11200", description: "Fisher Control Valves 2\" SS", quantity: 20, unit: "EA", unitPrice: 3200, currency: "USD", deliveryDate: "2025-07-12" },
      { id: "li-024", material: "MAT-11201", description: "Rosemount 3051 Pressure Transmitter", quantity: 15, unit: "EA", unitPrice: 1280, currency: "USD", deliveryDate: "2025-07-14" },
    ],
    comments: [
      { id: "c-010", author: "Carlos Rivera", text: "Partial shipment received (valves). Transmitters expected July 14.", timestamp: "2025-07-01T12:00:00Z" },
    ],
  },
  {
    id: "po-011", poNumber: "PO-4500012857", title: "Office IT Refresh — Laptops & Docking Stations",
    vendor: seedVendors[0], status: "Cancelled", priority: "Low",
    createdDate: "2025-05-20", requiredDate: "2025-06-30", totalAmount: 42000, currency: "EUR",
    department: "IT", requestor: "Petra Klein", approver: "Stefan Braun",
    plant: "Plant 1100 — Stuttgart", companyCode: "CC-1000",
    lineItems: [
      { id: "li-025", material: "MAT-99001", description: "Siemens ENDURANCE Laptop", quantity: 20, unit: "EA", unitPrice: 1500, currency: "EUR", deliveryDate: "2025-06-20" },
      { id: "li-026", material: "MAT-99002", description: "USB-C Docking Station", quantity: 20, unit: "EA", unitPrice: 350, currency: "EUR", deliveryDate: "2025-06-20" },
      { id: "li-027", material: "MAT-99003", description: "27\" IPS Monitor", quantity: 10, unit: "EA", unitPrice: 500, currency: "EUR", deliveryDate: "2025-06-25" },
    ],
    comments: [
      { id: "c-011", author: "Petra Klein", text: "Cancelled — switching to central IT procurement framework.", timestamp: "2025-06-01T08:00:00Z" },
    ],
  },
  {
    id: "po-012", poNumber: "PO-4500012858", title: "Warehouse Conveyor System — Distribution Center",
    vendor: seedVendors[5], status: "Approved", priority: "High",
    createdDate: "2025-06-25", requiredDate: "2025-08-30", totalAmount: 378000, currency: "EUR",
    department: "Logistics", requestor: "Max Hoffmann", approver: "Dr. Claudia Richter",
    plant: "Plant 1400 — Berlin", companyCode: "CC-2000",
    lineItems: [
      { id: "li-028", material: "MAT-40400", description: "ABB FlexConveyor System", quantity: 1, unit: "SET", unitPrice: 295000, currency: "EUR", deliveryDate: "2025-08-15" },
      { id: "li-029", material: "MAT-40401", description: "Barcode Scanner Integration Kit", quantity: 6, unit: "EA", unitPrice: 8500, currency: "EUR", deliveryDate: "2025-08-20" },
      { id: "li-030", material: "MAT-40402", description: "Conveyor Belt Safety Guards", quantity: 12, unit: "EA", unitPrice: 2250, currency: "EUR", deliveryDate: "2025-08-25" },
    ],
    comments: [
      { id: "c-012", author: "Max Hoffmann", text: "Contract signed. Installation team scheduled for August.", timestamp: "2025-06-28T11:30:00Z" },
    ],
  },
];

export const seedTasks: ApprovalTask[] = [
  { id: "t-001", taskNumber: "TASK-001", title: "Approve PO — PLC Controllers", description: "Review and approve purchase order PO-4500012847 for industrial PLC controllers from Siemens AG.", type: "Purchase Order", status: "Open", priority: "High", assignee: "Dr. Claudia Richter", requester: "Thomas Bauer", createdDate: "2025-06-28", dueDate: "2025-07-03", relatedDocId: "po-001", amount: 284500, currency: "EUR", progress: 0 },
  { id: "t-002", taskNumber: "TASK-002", title: "Approve PO — Excavator Parts", description: "Review maintenance program purchase order PO-4500012850 for Caterpillar excavator parts.", type: "Purchase Order", status: "Open", priority: "Medium", assignee: "Dr. Claudia Richter", requester: "Frank Mueller", createdDate: "2025-07-01", dueDate: "2025-07-05", relatedDocId: "po-004", amount: 145000, currency: "USD", progress: 0 },
  { id: "t-003", taskNumber: "TASK-003", title: "Approve PO — Aerospace Actuators", description: "Review R&D prototype purchase order PO-4500012854 for Honeywell aerospace-grade actuators.", type: "Purchase Order", status: "In Progress", priority: "High", assignee: "Dr. Claudia Richter", requester: "David Park", createdDate: "2025-06-30", dueDate: "2025-07-04", relatedDocId: "po-008", amount: 198000, currency: "USD", progress: 40 },
  { id: "t-004", taskNumber: "TASK-004", title: "Verify Invoice — Bosch Sensors", description: "Three-way match verification for invoice INV-2025-08845 against PO-4500012848 and goods receipt.", type: "Invoice", status: "Open", priority: "Medium", assignee: "Stefan Braun", requester: "Accounts Payable", createdDate: "2025-07-02", dueDate: "2025-07-08", relatedDocId: "po-002", amount: 67800, currency: "EUR", progress: 0 },
  { id: "t-005", taskNumber: "TASK-005", title: "Budget Transfer — Engineering Q4", description: "Approve budget reallocation of €200,000 from Facilities to Engineering for robotic welding cell.", type: "Budget Transfer", status: "Open", priority: "High", assignee: "CFO Office", requester: "Michael Krause", createdDate: "2025-06-15", dueDate: "2025-07-10", relatedDocId: "po-006", amount: 200000, currency: "EUR", progress: 0 },
  { id: "t-006", taskNumber: "TASK-006", title: "Material Request — Lab Consumables", description: "Approve material request MR-77421 for laboratory consumables and testing reagents.", type: "Material Request", status: "Completed", priority: "Low", assignee: "Dr. Claudia Richter", requester: "Lab Manager", createdDate: "2025-06-20", dueDate: "2025-06-27", relatedDocId: "mr-001", amount: 8500, currency: "EUR", progress: 100 },
  { id: "t-007", taskNumber: "TASK-007", title: "Vendor Onboarding — TechFlow Solutions", description: "Complete vendor qualification assessment and onboarding for new IT services provider TechFlow Solutions.", type: "Vendor Onboarding", status: "In Progress", priority: "Medium", assignee: "Procurement Team", requester: "IT Department", createdDate: "2025-06-25", dueDate: "2025-07-15", relatedDocId: "vq-001", amount: 0, currency: "EUR", progress: 65 },
  { id: "t-008", taskNumber: "TASK-008", title: "Approve PO — Conveyor System", description: "Final approval for warehouse conveyor system PO-4500012858 from ABB Ltd.", type: "Purchase Order", status: "Completed", priority: "High", assignee: "Dr. Claudia Richter", requester: "Max Hoffmann", createdDate: "2025-06-25", dueDate: "2025-06-30", relatedDocId: "po-012", amount: 378000, currency: "EUR", progress: 100 },
  { id: "t-009", taskNumber: "TASK-009", title: "Invoice Approval — BASF Materials", description: "Approve payment for chemical raw materials invoice INV-2025-09102.", type: "Invoice", status: "In Progress", priority: "Medium", assignee: "Stefan Braun", requester: "Accounts Payable", createdDate: "2025-07-01", dueDate: "2025-07-07", relatedDocId: "po-003", amount: 192000, currency: "EUR", progress: 30 },
  { id: "t-010", taskNumber: "TASK-010", title: "Material Request — Packaging Supplies", description: "Approve bulk packaging material request MR-77435 for distribution center.", type: "Material Request", status: "Open", priority: "Low", assignee: "Stefan Braun", requester: "Warehouse Ops", createdDate: "2025-07-02", dueDate: "2025-07-12", relatedDocId: "mr-002", amount: 15200, currency: "EUR", progress: 0 },
  { id: "t-011", taskNumber: "TASK-011", title: "Vendor Onboarding — GreenPack EU", description: "Evaluate and onboard sustainable packaging supplier GreenPack EU for ESG compliance.", type: "Vendor Onboarding", status: "Open", priority: "Medium", assignee: "Procurement Team", requester: "Sustainability Office", createdDate: "2025-07-01", dueDate: "2025-07-20", relatedDocId: "vq-002", amount: 0, currency: "EUR", progress: 0 },
  { id: "t-012", taskNumber: "TASK-012", title: "Budget Transfer — Safety Equipment", description: "Approve supplemental budget allocation for additional safety equipment across US plants.", type: "Budget Transfer", status: "Deferred", priority: "Low", assignee: "CFO Office", requester: "Jennifer White", createdDate: "2025-06-18", dueDate: "2025-07-30", relatedDocId: "po-005", amount: 25000, currency: "USD", progress: 10 },
  { id: "t-013", taskNumber: "TASK-013", title: "Approve PO — Energy Management", description: "Review draft PO for Schneider Electric energy management system upgrade.", type: "Purchase Order", status: "Open", priority: "Low", assignee: "Stefan Braun", requester: "Nicole Werner", createdDate: "2025-07-02", dueDate: "2025-07-15", relatedDocId: "po-007", amount: 78500, currency: "EUR", progress: 0 },
  { id: "t-014", taskNumber: "TASK-014", title: "Invoice Dispute — 3M Short Shipment", description: "Resolve quantity discrepancy on 3M safety equipment delivery (received 1800 vs ordered 2000 respirators).", type: "Invoice", status: "In Progress", priority: "High", assignee: "Procurement Team", requester: "Goods Receipt", createdDate: "2025-07-03", dueDate: "2025-07-08", relatedDocId: "po-005", amount: 900, currency: "USD", progress: 50 },
];

export const seedKPIs: KPIData = {
  totalRevenue: 48750000,
  revenueChange: 12.4,
  openPOs: 7,
  openPOsChange: -8.3,
  pendingApprovals: 8,
  approvalsChange: 15.0,
  budgetUtilization: 73.2,
  budgetChange: 4.6,
  totalSpend: 2156000,
  spendChange: 6.8,
  onTimeDelivery: 94.5,
  deliveryChange: 2.1,
};

export const seedAuditLog: AuditEntry[] = [
  { id: "a-001", timestamp: "2025-07-03T08:00:00Z", action: "Session Started", entity: "System", entityId: "session-001", user: "Dr. Claudia Richter", details: "User logged into SAP S/4HANA procurement module.", category: "system" },
  { id: "a-002", timestamp: "2025-07-03T08:02:00Z", action: "Viewed Dashboard", entity: "Dashboard", entityId: "dashboard", user: "Dr. Claudia Richter", details: "Reviewed KPI summary and pending items.", category: "navigation" },
  { id: "a-003", timestamp: "2025-07-02T16:45:00Z", action: "PO Approved", entity: "Purchase Order", entityId: "po-012", user: "Dr. Claudia Richter", details: "Approved PO-4500012858 (Warehouse Conveyor System) — €378,000.", category: "procurement" },
  { id: "a-004", timestamp: "2025-07-02T14:20:00Z", action: "Comment Added", entity: "Purchase Order", entityId: "po-001", user: "Dr. Claudia Richter", details: "Added review comment on PO-4500012847 pending capex confirmation.", category: "procurement" },
  { id: "a-005", timestamp: "2025-07-02T11:30:00Z", action: "Task Started", entity: "Approval Task", entityId: "t-003", user: "Dr. Claudia Richter", details: "Started review of aerospace actuators PO (TASK-003).", category: "approval" },
  { id: "a-006", timestamp: "2025-07-01T17:00:00Z", action: "PO Created", entity: "Purchase Order", entityId: "po-004", user: "Frank Mueller", details: "Created PO-4500012850 for excavator maintenance parts — $145,000.", category: "procurement" },
  { id: "a-007", timestamp: "2025-07-01T15:30:00Z", action: "PO Submitted", entity: "Purchase Order", entityId: "po-008", user: "David Park", details: "Submitted PO-4500012854 for aerospace-grade actuators — $198,000.", category: "procurement" },
  { id: "a-008", timestamp: "2025-07-01T10:00:00Z", action: "Task Completed", entity: "Approval Task", entityId: "t-006", user: "Dr. Claudia Richter", details: "Approved material request MR-77421 for lab consumables — €8,500.", category: "approval" },
  { id: "a-009", timestamp: "2025-06-30T14:00:00Z", action: "Goods Received", entity: "Purchase Order", entityId: "po-009", user: "Akira Tanaka", details: "Marked PO-4500012855 as fully received. All items in good condition.", category: "procurement" },
  { id: "a-010", timestamp: "2025-06-28T09:15:00Z", action: "PO Created", entity: "Purchase Order", entityId: "po-001", user: "Thomas Bauer", details: "Created PO-4500012847 for Siemens PLC controllers — €284,500.", category: "procurement" },
  { id: "a-011", timestamp: "2025-06-25T11:30:00Z", action: "PO Approved", entity: "Purchase Order", entityId: "po-005", user: "Stefan Braun", details: "Approved PO-4500012851 for annual safety compliance — $34,200.", category: "procurement" },
  { id: "a-012", timestamp: "2025-06-12T16:00:00Z", action: "PO Rejected", entity: "Purchase Order", entityId: "po-006", user: "Dr. Claudia Richter", details: "Rejected PO-4500012852 — budget exceeded for current quarter.", category: "procurement" },
];
