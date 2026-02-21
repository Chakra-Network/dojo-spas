import React from 'react';
import { useDojoState } from '@chakra-network/dojo-hooks';

const ZendeskSPA = () => {
  const [state] = useDojoState();

  return (
    <div>
      <h1>Zendesk Support Inbox</h1>
      <section>
        <h2>Queue Health Metrics</h2>
        <p>New Tickets: {state.newTickets}</p>
        <p>Pending Tickets: {state.pendingTickets}</p>
        <p>Breached SLAs: {state.breachedSLAs}</p>
      </section>

      <section>
        <h2>Personal Performance Stats</h2>
        <p>Average Response Time: {state.avgResponseTime} minutes</p>
        <p>Tickets Resolved: {state.ticketsResolved}</p>
        <p>User Satisfaction Score: {state.userSatisfactionScore}%</p>
      </section>
    </div>
  );
};

export default ZendeskSPA;
