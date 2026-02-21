import { createContext, useCallback, useContext, useMemo, ReactNode } from 'react'
import { useDojoState } from '@chakra-dev/dojo-hooks'
import { mockTickets } from '../fixtures/tickets'
import { mockCustomers, mockAgents } from '../fixtures/customers'
import { mockMacros } from '../fixtures/macros'
import { Ticket } from '../types/ticket'

interface AppState {
  tickets: any[]
  customers: any[]
  agents: any[]
  macros: any[]
  currentAgent: any
  slaEvents: any[]
  ticketFilters: {
    status: string
    priority: string
    assignee: string
  }
  metrics: {
    newTickets: number
    pendingTickets: number
    breachedSLA: number
  }
}

interface AppContextType {
  state: AppState
  setState: (newState: AppState | ((prev: AppState) => AppState)) => void
  updateTicket: (ticketId: string, updates: any) => void
  applyMacro: (ticketId: string, macroId: string) => void
  recordSLAEvent: (event: any) => void
  createTicket: (ticketData: any) => any
}

const AppContext = createContext<AppContextType | undefined>(undefined)

const initialState: AppState = {
  tickets: mockTickets,
  customers: mockCustomers,
  agents: mockAgents,
  macros: mockMacros,
  currentAgent: mockAgents[0],
  slaEvents: [],
  ticketFilters: {
    status: 'all',
    priority: 'all',
    assignee: 'all',
  },
  metrics: {
    newTickets: mockTickets.filter((t: Ticket) => t.status === 'new').length,
    pendingTickets: mockTickets.filter((t: Ticket) => t.status === 'pending').length,
    breachedSLA: mockTickets.filter((t: Ticket) => t.slaBreachAt && new Date(t.slaBreachAt) < new Date()).length,
  },
}

export function AppProvider({ children }: { children: ReactNode }) {
  // Using useDojoState from @chakra-dev/dojo-hooks
  const [state, setState] = useDojoState<AppState>(initialState)

  const updateTicket = useCallback(
    (ticketId: string, updates: any) => {
      const updatedTickets = state.tickets.map(t =>
        t.id === ticketId ? { ...t, ...updates, updatedAt: new Date() } : t
      )
      
      // Record SLA event
      const slaEvent = {
        id: `evt-${Date.now()}`,
        ticketId,
        type: 'status_change',
        timestamp: new Date(),
        description: `Ticket updated`,
        agentId: state.currentAgent?.id,
        metadata: updates,
      }
      
      setState({ 
        ...state, 
        tickets: updatedTickets,
        slaEvents: [...state.slaEvents, slaEvent]
      })
    },
    [state, setState]
  )

  const applyMacro = useCallback(
    (ticketId: string, macroId: string) => {
      const macro = state.macros.find(m => m.id === macroId)
      const ticket = state.tickets.find(t => t.id === ticketId)
      const customer = state.customers.find(c => c.id === ticket?.customerId)
      
      if (!macro || !ticket) return

      // Replace template placeholders
      let template = macro.template
      template = template.replace(/{{customer\.name}}/g, customer?.name || 'Customer')
      template = template.replace(/{{agent\.name}}/g, state.currentAgent?.name || 'Agent')

      // Apply macro actions
      const updates: any = {}
      macro.actions.forEach((action: any) => {
        if (action.type === 'set_status') {
          updates.status = action.value
        } else if (action.type === 'set_priority') {
          updates.priority = action.value
        } else if (action.type === 'add_tag') {
          updates.tags = [...(ticket.tags || []), action.value]
        }
      })

      // Add message to conversation
      const newMessage = {
        id: `msg-${Date.now()}`,
        ticketId: ticketId,
        authorId: state.currentAgent?.id,
        authorType: 'agent' as const,
        content: template,
        attachments: [],
        createdAt: new Date(),
        isPublic: true,
      }

      const updatedTickets = state.tickets.map(t =>
        t.id === ticketId
          ? {
              ...t,
              ...updates,
              conversationHistory: [...(t.conversationHistory || []), newMessage],
              updatedAt: new Date(),
            }
          : t
      )

      // Record SLA event
      const slaEvent = {
        id: `evt-${Date.now()}`,
        ticketId,
        type: 'macro_applied',
        timestamp: new Date(),
        description: `Applied macro: ${macro.name}`,
        agentId: state.currentAgent?.id,
        metadata: { macroId, updates },
      }

      setState({ 
        ...state, 
        tickets: updatedTickets,
        slaEvents: [...state.slaEvents, slaEvent]
      })
    },
    [state, setState]
  )

  const recordSLAEvent = useCallback(
    (event: any) => {
      setState({ ...state, slaEvents: [...state.slaEvents, event] })
    },
    [state, setState]
  )

  const createTicket = useCallback(
    (ticketData: any) => {
      const newTicket = {
        id: `ticket-${Date.now()}`,
        subject: ticketData.subject,
        description: ticketData.description,
        status: 'new' as const,
        priority: ticketData.priority || 'normal',
        type: ticketData.type || 'question',
        tags: ticketData.tags || [],
        customerId: ticketData.customerId,
        assigneeId: ticketData.assigneeId || null,
        createdAt: new Date(),
        updatedAt: new Date(),
        dueAt: ticketData.dueAt || new Date(Date.now() + 24 * 60 * 60 * 1000),
        slaBreachAt: null,
        conversationHistory: [{
          id: `msg-${Date.now()}`,
          ticketId: `ticket-${Date.now()}`,
          authorId: ticketData.customerId,
          authorType: 'customer' as const,
          content: ticketData.description,
          attachments: [],
          createdAt: new Date(),
          isPublic: true,
        }],
        internalNotes: [],
      }

      setState({
        ...state,
        tickets: [...state.tickets, newTicket],
      })

      return newTicket
    },
    [state, setState]
  )

  const value: AppContextType = useMemo(
    () => ({
      state,
      setState, // Expose setState directly for advanced usage
      updateTicket,
      applyMacro,
      recordSLAEvent,
      createTicket,
    }),
    [state, setState, updateTicket, applyMacro, recordSLAEvent, createTicket]
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within AppProvider')
  }
  return context
}

// Export a hook that provides direct access to dojo state and setState
// Components can use this for more granular control
export function useDojo() {
  const { state, setState } = useApp()
  return { state, setState }
}

// Export helper to get initial state (useful for testing)
export { initialState }
