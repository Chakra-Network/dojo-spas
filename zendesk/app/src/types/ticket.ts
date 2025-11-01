export type TicketStatus = 'new' | 'open' | 'pending' | 'solved' | 'closed'
export type TicketPriority = 'urgent' | 'high' | 'normal' | 'low'
export type TicketType = 'question' | 'incident' | 'problem' | 'task'

export interface Ticket {
  id: string
  subject: string
  description: string
  status: TicketStatus
  priority: TicketPriority
  type: TicketType
  tags: string[]
  customerId: string
  assigneeId: string | null
  createdAt: Date
  updatedAt: Date
  dueAt: Date | null
  slaBreachAt: Date | null
  conversationHistory: ConversationMessage[]
  internalNotes: InternalNote[]
}

export interface ConversationMessage {
  id: string
  ticketId: string
  authorId: string
  authorType: 'customer' | 'agent'
  content: string
  attachments: Attachment[]
  createdAt: Date
  isPublic: boolean
}

export interface InternalNote {
  id: string
  ticketId: string
  authorId: string
  content: string
  createdAt: Date
}

export interface Attachment {
  id: string
  filename: string
  url: string
  size: number
  contentType: string
}

export interface TicketFilters {
  status?: TicketStatus[]
  priority?: TicketPriority[]
  tags?: string[]
  assignee?: string[]
  searchQuery?: string
}
