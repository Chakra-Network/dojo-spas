import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, type LucideIcon } from "lucide-react";

interface KPIWidgetProps {
  id: string;
  title: string;
  value: string;
  change: number;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  isUrgent?: boolean;
  invertChange?: boolean;
}

export default function KPIWidget({
  id,
  title,
  value,
  change,
  icon: Icon,
  iconBg,
  iconColor,
  isUrgent = false,
  invertChange = false,
}: KPIWidgetProps) {
  const isPositive = invertChange ? change < 0 : change > 0;
  const changeColor = isPositive ? "text-green-600" : "text-red-600";
  const TrendIcon = isPositive ? TrendingUp : TrendingDown;

  return (
    <div
      data-testid={`kpi-widget-${id}`}
      data-kpi-id={id}
      data-kpi-value={value}
      data-kpi-change={change}
      className={cn(
        "bg-white rounded-xl p-4 shadow-sm border card-hover",
        isUrgent && "border-l-4 border-l-yellow-400"
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <div className={cn("p-2 rounded-lg", iconBg)}>
          <Icon className={cn("w-5 h-5", iconColor)} />
        </div>
        <div className={cn("flex items-center gap-1 text-xs font-medium", changeColor)}>
          <TrendIcon className="w-3 h-3" />
          <span data-testid={`kpi-change-${id}`}>{Math.abs(change)}%</span>
        </div>
      </div>

      <div>
        <p className="text-2xl font-semibold text-gray-900" data-testid={`kpi-value-${id}`}>
          {value}
        </p>
        <p className="text-xs text-gray-500 mt-1">{title}</p>
      </div>
    </div>
  );
}
