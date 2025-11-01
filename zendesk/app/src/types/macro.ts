export interface Macro {
  id: string
  name: string
  description: string
  category: string
  actions: MacroAction[]
  template: string
  isActive: boolean
  createdAt: Date
  usageCount: number
}

export type MacroActionType = 
  | 'set_status'
  | 'set_priority'
  | 'add_tags'
  | 'remove_tags'
  | 'assign_agent'
  | 'add_reply'
  | 'add_note'

export interface MacroAction {
  type: MacroActionType
  value: any
}

export interface MacroCategory {
  id: string
  name: string
  icon: string
  macroCount: number
}
