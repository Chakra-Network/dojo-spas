export interface Customer {
  id: string
  name: string
  email: string
  phone: string | null
  company: string | null
  avatar: string | null
  createdAt: Date
  lastSeenAt: Date
  tags: string[]
  notes: string
  ticketCount: number
  satisfaction: 'good' | 'neutral' | 'bad' | null
}

export interface Agent {
  id: string
  name: string
  email: string
  avatar: string | null
  role: 'agent' | 'admin' | 'supervisor'
  isOnline: boolean
  currentTickets: number
  totalTickets: number
}

export interface QueueMetrics {
  new: number
  open: number
  pending: number
  breachedSLA: number
  totalToday: number
}

export interface PerformanceStats {
  resolved: number
  avgResponseTime: number // in minutes
  avgResolutionTime: number // in hours
  satisfactionScore: number // 0-100
  slaCompliance: number // percentage
}

export interface SLAEvent {
  id: string
  ticketId: string
  type: 'warning' | 'breach' | 'escalation'
  timestamp: Date
  description: string
}

export * from './ticket'
export * from './macro'
