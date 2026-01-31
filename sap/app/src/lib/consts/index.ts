export const PO_STATUS_OPTIONS = [
  { value: "Draft", label: "Draft" },
  { value: "Pending Approval", label: "Pending Approval" },
  { value: "Approved", label: "Approved" },
  { value: "Rejected", label: "Rejected" },
  { value: "Ordered", label: "Ordered" },
  { value: "Received", label: "Received" },
  { value: "Closed", label: "Closed" },
];

export const TASK_STATUS_OPTIONS = [
  { value: "Open", label: "Open" },
  { value: "In Progress", label: "In Progress" },
  { value: "On Hold", label: "On Hold" },
  { value: "Completed", label: "Completed" },
  { value: "Cancelled", label: "Cancelled" },
];

export const TASK_PRIORITY_OPTIONS = [
  { value: "Low", label: "Low" },
  { value: "Medium", label: "Medium" },
  { value: "High", label: "High" },
  { value: "Critical", label: "Critical" },
];

export const DEFAULT_DASHBOARD_WIDGETS = [
  "revenue",
  "open-pos",
  "pending-approvals",
  "on-time-delivery",
  "processing-time",
  "savings",
];

export const CURRENCY_OPTIONS = [
  { value: "USD", label: "USD" },
  { value: "EUR", label: "EUR" },
  { value: "GBP", label: "GBP" },
  { value: "JPY", label: "JPY" },
];

export const PAYMENT_TERMS_OPTIONS = [
  { value: "Net 15", label: "Net 15" },
  { value: "Net 30", label: "Net 30" },
  { value: "Net 45", label: "Net 45" },
  { value: "Net 60", label: "Net 60" },
  { value: "Due on Receipt", label: "Due on Receipt" },
];
