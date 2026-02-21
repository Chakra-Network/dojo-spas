import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface KPICardProps {
  title: string;
  value: string | number;
  change?: number;
  trend?: "up" | "down" | "stable";
  icon: React.ReactNode;
  iconBgColor?: string;
  subtitle?: string;
}

export default function KPICard({
  title,
  value,
  change,
  trend,
  icon,
  iconBgColor = "bg-blue-500",
  subtitle,
}: KPICardProps) {
  const TrendIcon = trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus;
  const trendColor = 
    trend === "up" ? "text-green-600" : 
    trend === "down" ? "text-red-600" : 
    "text-gray-600";

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
          {subtitle && (
            <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
          )}
          {change !== undefined && (
            <div className={cn("flex items-center gap-1 mt-2", trendColor)}>
              <TrendIcon className="w-4 h-4" />
              <span className="text-sm font-medium">
                {change > 0 ? "+" : ""}{change}%
              </span>
              <span className="text-xs text-gray-500">vs last period</span>
            </div>
          )}
        </div>
        <div className={cn("p-3 rounded-lg", iconBgColor)}>
          <div className="w-6 h-6 text-white">
            {icon}
          </div>
        </div>
      </div>
    </div>
  );
}

