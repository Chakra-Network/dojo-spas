import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  color: string;
}

function StatCard({ title, value, icon: Icon, color }: StatCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
      <div
        className="rounded-full p-3"
        style={{ backgroundColor: `${color}20` }} // Use color with low opacity
      >
        <Icon className="h-6 w-6" style={{ color }} />
      </div>
      <div className="ml-4">
        <p className="text-sm text-gray-500 font-medium">{title}</p>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  );
}

export default StatCard;