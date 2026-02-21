import { Box, Grid, Heading, Text, VStack, HStack, Stat, StatLabel, StatNumber, StatHelpText, Progress } from '@chakra-ui/react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useDojoState } from '../../dojo/state';
import { TrendingUp, Users, Mail, Target } from 'lucide-react';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export const Dashboard = () => {
  const campaigns = useDojoState('campaigns');
  const emails = useDojoState('emails');
  const metrics = useDojoState('metrics');

  // Campaign performance data
  const campaignPerformance = campaigns
    .filter(c => c.status === 'active' || c.status === 'completed')
    .slice(0, 5)
    .map(c => ({
      name: c.name.slice(0, 20),
      leads: c.leads || 0,
      clicks: c.clicks || 0,
      conversions: c.conversions || 0,
    }));

  // Lead funnel data
  const leadFunnelData = [
    { stage: 'Subscribers', count: metrics.totalLeads + 500 },
    { stage: 'Leads', count: metrics.totalLeads },
    { stage: 'MQLs', count: Math.floor(metrics.totalLeads * 0.6) },
    { stage: 'SQLs', count: Math.floor(metrics.totalLeads * 0.3) },
    { stage: 'Customers', count: Math.floor(metrics.totalLeads * 0.15) },
  ];

  // Email engagement data
  const emailEngagementData = emails
    .filter(e => e.status === 'sent' && e.stats)
    .slice(0, 5)
    .map(e => ({
      name: e.name.slice(0, 20),
      opened: ((e.stats!.opened / e.stats!.sent) * 100).toFixed(1),
      clicked: ((e.stats!.clicked / e.stats!.sent) * 100).toFixed(1),
    }));

  // Campaign type distribution
  const campaignTypeData = campaigns.reduce((acc, c) => {
    const existing = acc.find(item => item.name === c.type);
    if (existing) {
      existing.value++;
    } else {
      acc.push({ name: c.type, value: 1 });
    }
    return acc;
  }, [] as { name: string; value: number }[]);

  return (
    <Box p={6} bg="gray.50">
      <VStack align="stretch" spacing={6}>
        <Heading size="lg" color="gray.700">Marketing Overview</Heading>

        {/* Key Metrics */}
        <Grid templateColumns="repeat(4, 1fr)" gap={4}>
          <MetricCard
            icon={<Users size={24} />}
            label="Total Leads"
            value={metrics.totalLeads.toString()}
            change={`+${metrics.newLeadsThisMonth} this month`}
            color="blue"
          />
          <MetricCard
            icon={<Target size={24} />}
            label="Conversion Rate"
            value={`${metrics.conversionRate}%`}
            change="Up from 2.8%"
            color="green"
          />
          <MetricCard
            icon={<Mail size={24} />}
            label="Email Engagement"
            value={`${metrics.emailEngagementRate}%`}
            change="Open + Click rate"
            color="purple"
          />
          <MetricCard
            icon={<TrendingUp size={24} />}
            label="Active Campaigns"
            value={metrics.activeCampaigns.toString()}
            change={`${metrics.totalCampaigns} total`}
            color="orange"
          />
        </Grid>

        {/* Charts Row 1 */}
        <Grid templateColumns="repeat(2, 1fr)" gap={6}>
          {/* Campaign Performance */}
          <Box bg="white" p={6} borderRadius="lg" shadow="sm">
            <Heading size="md" mb={4} color="gray.700">Campaign Performance</Heading>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={campaignPerformance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" fontSize={12} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="leads" fill="#0088FE" name="Leads" />
                <Bar dataKey="conversions" fill="#00C49F" name="Conversions" />
              </BarChart>
            </ResponsiveContainer>
          </Box>

          {/* Lead Funnel */}
          <Box bg="white" p={6} borderRadius="lg" shadow="sm">
            <Heading size="md" mb={4} color="gray.700">Lead Funnel</Heading>
            <VStack align="stretch" spacing={3}>
              {leadFunnelData.map((item, index) => (
                <Box key={item.stage}>
                  <HStack justify="space-between" mb={1}>
                    <Text fontWeight="medium" fontSize="sm">{item.stage}</Text>
                    <Text fontSize="sm" color="gray.600">{item.count}</Text>
                  </HStack>
                  <Progress
                    value={(item.count / leadFunnelData[0].count) * 100}
                    colorScheme={index === 0 ? 'blue' : index < 3 ? 'green' : 'orange'}
                    size="lg"
                    borderRadius="md"
                  />
                </Box>
              ))}
            </VStack>
          </Box>
        </Grid>

        {/* Charts Row 2 */}
        <Grid templateColumns="repeat(2, 1fr)" gap={6}>
          {/* Email Engagement */}
          <Box bg="white" p={6} borderRadius="lg" shadow="sm">
            <Heading size="md" mb={4} color="gray.700">Email Engagement Rates</Heading>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={emailEngagementData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" fontSize={12} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="opened" stroke="#8884d8" name="Open Rate %" />
                <Line type="monotone" dataKey="clicked" stroke="#82ca9d" name="Click Rate %" />
              </LineChart>
            </ResponsiveContainer>
          </Box>

          {/* Campaign Type Distribution */}
          <Box bg="white" p={6} borderRadius="lg" shadow="sm">
            <Heading size="md" mb={4} color="gray.700">Campaign Types</Heading>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={campaignTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${((percent || 0) * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {campaignTypeData.map((_entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Box>
        </Grid>
      </VStack>
    </Box>
  );
};

interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  change: string;
  color: string;
}

const MetricCard = ({ icon, label, value, change, color }: MetricCardProps) => (
  <Box bg="white" p={6} borderRadius="lg" shadow="sm">
    <Stat>
      <HStack spacing={3} mb={2}>
        <Box color={`${color}.500`}>{icon}</Box>
        <StatLabel fontSize="sm" color="gray.600">{label}</StatLabel>
      </HStack>
      <StatNumber fontSize="3xl" color="gray.800">{value}</StatNumber>
      <StatHelpText fontSize="xs" color="gray.500">{change}</StatHelpText>
    </Stat>
  </Box>
);
