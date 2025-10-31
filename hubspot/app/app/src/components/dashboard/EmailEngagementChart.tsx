import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface EmailEngagementChartProps {
    openRate: number;
    clickRate: number;
}

// Dummy data for chart shape
const data = [
    { name: 'Jan', openRate: 20, clickRate: 2.1 },
    { name: 'Feb', openRate: 22, clickRate: 2.5 },
    { name: 'Mar', openRate: 25, clickRate: 3.0 },
    { name: 'Apr', openRate: 23, clickRate: 2.8 },
    { name: 'May', openRate: 26, clickRate: 3.5 },
    { name: 'Jun', openRate: 25.5, clickRate: 3.2 }, // Use real values for latest month
];

function EmailEngagementChart({ openRate, clickRate }: EmailEngagementChartProps) {
    // Update the last data point with the actual metrics from state
    const chartData = [...data];
    chartData[chartData.length - 1] = { ...chartData[chartData.length - 1], openRate, clickRate };

    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart
                data={chartData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis unit="%" />
                <Tooltip formatter={(value) => `${value}%`} />
                <Legend />
                <Line type="monotone" dataKey="openRate" name="Open Rate" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="clickRate" name="Click Rate" stroke="#82ca9d" />
            </LineChart>
        </ResponsiveContainer>
    );
}

export default EmailEngagementChart;