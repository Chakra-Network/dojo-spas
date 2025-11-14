import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import type { FunnelStage } from '../../lib/types';

interface LeadFunnelChartProps {
  data: FunnelStage[];
}

function LeadFunnelChart({ data }: LeadFunnelChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" />
        <YAxis dataKey="name" type="category" width={120} />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" name="Contacts" fill="#4f46e5" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default LeadFunnelChart;