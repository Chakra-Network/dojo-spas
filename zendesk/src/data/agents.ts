import { Agent } from '../dojo/state';

export const AGENTS_DATA: Agent[] = [
  {
    id: 'agent-1',
    name: 'Alex Rivera',
    email: 'alex.rivera@zendesk.com',
    role: 'agent',
    status: 'online',
    ticketsAssigned: 15,
    ticketsSolved: 127,
    avgResponseTime: 12, // minutes
    satisfactionScore: 94,
  },
  {
    id: 'agent-2',
    name: 'Jamie Park',
    email: 'jamie.park@zendesk.com',
    role: 'agent',
    status: 'online',
    ticketsAssigned: 12,
    ticketsSolved: 203,
    avgResponseTime: 8,
    satisfactionScore: 97,
  },
  {
    id: 'agent-3',
    name: 'Sam Taylor',
    email: 'sam.taylor@zendesk.com',
    role: 'admin',
    status: 'away',
    ticketsAssigned: 8,
    ticketsSolved: 156,
    avgResponseTime: 15,
    satisfactionScore: 91,
  },
  {
    id: 'agent-4',
    name: 'Morgan Chen',
    email: 'morgan.chen@zendesk.com',
    role: 'agent',
    status: 'offline',
    ticketsAssigned: 0,
    ticketsSolved: 89,
    avgResponseTime: 10,
    satisfactionScore: 95,
  },
];
