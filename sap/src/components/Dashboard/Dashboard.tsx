import { Box, Grid, Heading, SimpleGrid, Stat, StatLabel, StatNumber, StatHelpText, StatArrow, Card, CardHeader, CardBody, Text } from '@chakra-ui/react';
import { useDojoState } from '../../dojo/state';
import { TrendingUp, TrendingDown, ShoppingCart, Clock, DollarSign } from 'lucide-react';

export const Dashboard = () => {
  const kpis = useDojoState('kpis');
  const purchaseOrders = useDojoState('purchaseOrders');
  const approvalTasks = useDojoState('approvalTasks');

  const revenueKpis = kpis.filter(k => k.category === 'revenue');
  const procurementKpis = kpis.filter(k => k.category === 'procurement');
  const approvalKpis = kpis.filter(k => k.category === 'approvals');

  const pendingPOs = purchaseOrders.filter(po => po.status === 'pending_approval').length;
  const pendingApprovals = approvalTasks.filter(t => t.status === 'pending').length;

  return (
    <Box p={8} bg="gray.50" minH="100vh">
      <Heading size="xl" mb={6}>Dashboard</Heading>

      {/* Hero KPI Widgets */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} mb={8}>
        <Card>
          <CardBody>
            <Stat>
              <StatLabel color="gray.600">Monthly Revenue</StatLabel>
              <StatNumber fontSize="3xl">
                ${revenueKpis[0]?.value.toLocaleString()}
              </StatNumber>
              {revenueKpis[0]?.trend && (
                <StatHelpText>
                  <StatArrow type={revenueKpis[0].trend === 'up' ? 'increase' : 'decrease'} />
                  {revenueKpis[0].changePercent}%
                </StatHelpText>
              )}
            </Stat>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <Stat>
              <StatLabel color="gray.600">Open Purchase Orders</StatLabel>
              <StatNumber fontSize="3xl">{pendingPOs}</StatNumber>
              <StatHelpText color="blue.600">
                <ShoppingCart size={16} style={{ display: 'inline', marginRight: 4 }} />
                {procurementKpis.find(k => k.name === 'Pending PO Value')?.value
                  ? `$${Number(procurementKpis.find(k => k.name === 'Pending PO Value')?.value).toLocaleString()}`
                  : 'N/A'}
              </StatHelpText>
            </Stat>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <Stat>
              <StatLabel color="gray.600">Pending Approvals</StatLabel>
              <StatNumber fontSize="3xl">{pendingApprovals}</StatNumber>
              <StatHelpText color="orange.600">
                <Clock size={16} style={{ display: 'inline', marginRight: 4 }} />
                {approvalKpis.find(k => k.name === 'Avg Approval Time')?.value || 'N/A'}
              </StatHelpText>
            </Stat>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <Stat>
              <StatLabel color="gray.600">Budget Utilization</StatLabel>
              <StatNumber fontSize="3xl">
                {kpis.find(k => k.name === 'Budget Utilization')?.value || 'N/A'}
              </StatNumber>
              <StatHelpText color="green.600">
                <DollarSign size={16} style={{ display: 'inline', marginRight: 4 }} />
                On track
              </StatHelpText>
            </Stat>
          </CardBody>
        </Card>
      </SimpleGrid>

      {/* Secondary Metrics */}
      <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap={6}>
        <Card>
          <CardHeader>
            <Heading size="md">Revenue Metrics</Heading>
          </CardHeader>
          <CardBody>
            <SimpleGrid columns={1} spacing={4}>
              {revenueKpis.map(kpi => (
                <Box key={kpi.id} p={4} bg="gray.50" borderRadius="md">
                  <Text fontSize="sm" color="gray.600" mb={1}>{kpi.name}</Text>
                  <Text fontSize="2xl" fontWeight="bold">
                    {typeof kpi.value === 'number' && kpi.unit === 'USD'
                      ? `$${kpi.value.toLocaleString()}`
                      : kpi.value}
                  </Text>
                  {kpi.trend && (
                    <Text fontSize="sm" color={kpi.trend === 'up' ? 'green.600' : 'red.600'}>
                      {kpi.trend === 'up' ? <TrendingUp size={14} style={{ display: 'inline' }} /> : <TrendingDown size={14} style={{ display: 'inline' }} />}
                      {' '}{kpi.changePercent}% vs last period
                    </Text>
                  )}
                </Box>
              ))}
            </SimpleGrid>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <Heading size="md">Procurement Overview</Heading>
          </CardHeader>
          <CardBody>
            <SimpleGrid columns={1} spacing={4}>
              {procurementKpis.map(kpi => (
                <Box key={kpi.id} p={4} bg="gray.50" borderRadius="md">
                  <Text fontSize="sm" color="gray.600" mb={1}>{kpi.name}</Text>
                  <Text fontSize="2xl" fontWeight="bold">
                    {typeof kpi.value === 'number' && kpi.unit === 'USD'
                      ? `$${kpi.value.toLocaleString()}`
                      : kpi.value}
                  </Text>
                  {kpi.trend && (
                    <Text fontSize="sm" color={kpi.trend === 'up' ? 'green.600' : 'red.600'}>
                      {kpi.trend === 'up' ? <TrendingUp size={14} style={{ display: 'inline' }} /> : <TrendingDown size={14} style={{ display: 'inline' }} />}
                      {' '}{Math.abs(kpi.changePercent || 0)}% {kpi.trend === 'up' ? 'increase' : 'decrease'}
                    </Text>
                  )}
                </Box>
              ))}
            </SimpleGrid>
          </CardBody>
        </Card>
      </Grid>
    </Box>
  );
};
