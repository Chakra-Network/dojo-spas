import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency: string = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(timestamp: number): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(timestamp));
}

export function formatDateTime(timestamp: number): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(timestamp));
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export function getStatusColor(status: string): { bg: string; text: string; border: string } {
  const statusColors: Record<string, { bg: string; text: string; border: string }> = {
    // PO Statuses
    Draft: { bg: "bg-gray-100", text: "text-gray-700", border: "border-gray-300" },
    "Pending Approval": { bg: "bg-yellow-50", text: "text-yellow-700", border: "border-yellow-300" },
    Approved: { bg: "bg-green-50", text: "text-green-700", border: "border-green-300" },
    Rejected: { bg: "bg-red-50", text: "text-red-700", border: "border-red-300" },
    Ordered: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-300" },
    Received: { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-300" },
    Closed: { bg: "bg-gray-100", text: "text-gray-600", border: "border-gray-300" },
    // Task Statuses
    Open: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-300" },
    "In Progress": { bg: "bg-yellow-50", text: "text-yellow-700", border: "border-yellow-300" },
    "On Hold": { bg: "bg-orange-50", text: "text-orange-700", border: "border-orange-300" },
    Completed: { bg: "bg-green-50", text: "text-green-700", border: "border-green-300" },
    Cancelled: { bg: "bg-gray-100", text: "text-gray-600", border: "border-gray-300" },
  };
  
  return statusColors[status] || { bg: "bg-gray-100", text: "text-gray-700", border: "border-gray-300" };
}

export function getPriorityColor(priority: string): { bg: string; text: string } {
  const priorityColors: Record<string, { bg: string; text: string }> = {
    Low: { bg: "bg-gray-100", text: "text-gray-600" },
    Medium: { bg: "bg-blue-100", text: "text-blue-700" },
    High: { bg: "bg-orange-100", text: "text-orange-700" },
    Critical: { bg: "bg-red-100", text: "text-red-700" },
  };
  
  return priorityColors[priority] || { bg: "bg-gray-100", text: "text-gray-600" };
}
