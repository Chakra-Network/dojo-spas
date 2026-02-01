export function formatDate(isoString: string): string {
  const date = new Date(isoString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  const diffHrs = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMin < 1) return "Just now";
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHrs < 24) return `${diffHrs}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
  });
}

export function formatDateFull(isoString: string): string {
  return new Date(isoString).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toLocaleString();
}

export function formatPercent(value: number): string {
  return `${value.toFixed(1)}%`;
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

export function getInitials(firstName: string, lastName: string): string {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
}

export function getStageColor(stage: string): string {
  const colors: Record<string, string> = {
    subscriber: "bg-gray-500",
    lead: "bg-blue-500",
    mql: "bg-yellow-500",
    sql: "bg-orange-500",
    customer: "bg-green-500",
  };
  return colors[stage] || "bg-gray-500";
}

export function getStageLabel(stage: string): string {
  const labels: Record<string, string> = {
    subscriber: "Subscriber",
    lead: "Lead",
    mql: "MQL",
    sql: "SQL",
    customer: "Customer",
  };
  return labels[stage] || stage;
}

export function getCampaignStatusColor(status: string): string {
  const colors: Record<string, string> = {
    draft: "bg-gray-100 text-gray-700",
    scheduled: "bg-blue-100 text-blue-700",
    active: "bg-green-100 text-green-700",
    completed: "bg-purple-100 text-purple-700",
    paused: "bg-yellow-100 text-yellow-700",
  };
  return colors[status] || "bg-gray-100 text-gray-700";
}

export function getEventTypeColor(type: string): string {
  const colors: Record<string, string> = {
    campaign_launched: "text-green-400",
    email_sent: "text-blue-400",
    email_opened: "text-cyan-400",
    email_clicked: "text-indigo-400",
    lead_converted: "text-orange-400",
    contact_created: "text-teal-400",
    stage_changed: "text-yellow-400",
    form_submitted: "text-pink-400",
    workflow_triggered: "text-purple-400",
    campaign_completed: "text-emerald-400",
  };
  return colors[type] || "text-gray-400";
}

export function getEventTypeIcon(type: string): string {
  const icons: Record<string, string> = {
    campaign_launched: "rocket",
    email_sent: "send",
    email_opened: "mail-open",
    email_clicked: "mouse-pointer-click",
    lead_converted: "user-check",
    contact_created: "user-plus",
    stage_changed: "arrow-right-circle",
    form_submitted: "file-text",
    workflow_triggered: "zap",
    campaign_completed: "check-circle",
  };
  return icons[type] || "activity";
}
