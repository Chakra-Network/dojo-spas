import {
  createContext,
  useContext,
  useMemo,
  useCallback,
  type ReactNode,
} from "react";
import { useDojoState } from "@chakra-dev/dojo-hooks";
import type {
  Tab,
  Campaign,
  Contact,
  EmailTemplate,
  AutomationEvent,
  AutomationEventType,
} from "@/lib/types";
import {
  seedCampaigns,
  seedContacts,
  seedEmails,
  seedAutomationEvents,
} from "@/lib/seed-data";

interface AppState {
  tabs: Tab[];
  activeTabId: string;
  campaigns: Campaign[];
  contacts: Contact[];
  emails: EmailTemplate[];
  automationEvents: AutomationEvent[];
  searchQuery: string;
  isNewCampaignDialogOpen: boolean;
  isNewContactDialogOpen: boolean;
  isNewEmailDialogOpen: boolean;
  editingCampaignId: string | null;
  editingContactId: string | null;
  editingEmailId: string | null;
}

interface AppContextType {
  state: AppState;
  activeTab: Tab | undefined;
  addTab: (tab: Tab) => void;
  removeTab: (tabId: string) => void;
  setActiveTab: (tabId: string) => void;
  setSearchQuery: (query: string) => void;
  // Campaign actions
  getCampaign: (id: string) => Campaign | undefined;
  addCampaign: (campaign: Campaign) => void;
  updateCampaign: (id: string, updates: Partial<Campaign>) => void;
  deleteCampaign: (id: string) => void;
  // Contact actions
  getContact: (id: string) => Contact | undefined;
  addContact: (contact: Contact) => void;
  updateContact: (id: string, updates: Partial<Contact>) => void;
  deleteContact: (id: string) => void;
  // Email actions
  getEmail: (id: string) => EmailTemplate | undefined;
  addEmail: (email: EmailTemplate) => void;
  updateEmail: (id: string, updates: Partial<EmailTemplate>) => void;
  deleteEmail: (id: string) => void;
  // Automation events
  logEvent: (type: AutomationEventType, description: string, entityId?: string, entityName?: string, metadata?: Record<string, unknown>) => void;
  // Dialog controls
  openNewCampaignDialog: () => void;
  closeNewCampaignDialog: () => void;
  openNewContactDialog: () => void;
  closeNewContactDialog: () => void;
  openNewEmailDialog: () => void;
  closeNewEmailDialog: () => void;
  setEditingCampaign: (id: string | null) => void;
  setEditingContact: (id: string | null) => void;
  setEditingEmail: (id: string | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const initialState: AppState = {
  tabs: [{ id: "dashboard", type: "dashboard" }],
  activeTabId: "dashboard",
  campaigns: seedCampaigns,
  contacts: seedContacts,
  emails: seedEmails,
  automationEvents: seedAutomationEvents,
  searchQuery: "",
  isNewCampaignDialogOpen: false,
  isNewContactDialogOpen: false,
  isNewEmailDialogOpen: false,
  editingCampaignId: null,
  editingContactId: null,
  editingEmailId: null,
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useDojoState(initialState);

  const addTab = useCallback(
    (tab: Tab) => {
      setState((prev) => {
        const existingTab = prev.tabs.find((t) => t.id === tab.id);
        if (existingTab) {
          return { ...prev, activeTabId: tab.id };
        }
        return {
          ...prev,
          tabs: [...prev.tabs, tab],
          activeTabId: tab.id,
        };
      });
    },
    [setState]
  );

  const removeTab = useCallback(
    (tabId: string) => {
      setState((prev) => {
        if (tabId === "dashboard") return prev;
        const tabIndex = prev.tabs.findIndex((t) => t.id === tabId);
        if (tabIndex === -1) return prev;
        const newTabs = prev.tabs.filter((t) => t.id !== tabId);
        let newActiveTabId = prev.activeTabId;
        if (prev.activeTabId === tabId) {
          if (tabIndex > 0) {
            newActiveTabId = newTabs[tabIndex - 1].id;
          } else if (newTabs.length > 0) {
            newActiveTabId = newTabs[0].id;
          } else {
            newActiveTabId = "dashboard";
          }
        }
        return { ...prev, tabs: newTabs, activeTabId: newActiveTabId };
      });
    },
    [setState]
  );

  const setActiveTab = useCallback(
    (tabId: string) => {
      setState((prev) => ({ ...prev, activeTabId: tabId }));
    },
    [setState]
  );

  const setSearchQuery = useCallback(
    (query: string) => {
      setState((prev) => ({ ...prev, searchQuery: query }));
    },
    [setState]
  );

  // Campaign functions
  const getCampaign = useCallback(
    (id: string) => state.campaigns.find((c) => c.id === id),
    [state.campaigns]
  );

  const addCampaign = useCallback(
    (campaign: Campaign) => {
      setState((prev) => ({
        ...prev,
        campaigns: [...prev.campaigns, campaign],
        automationEvents: [
          {
            id: `event-${Date.now()}`,
            type: "campaign_launched" as const,
            description: `Campaign "${campaign.name}" was created`,
            entityId: campaign.id,
            entityName: campaign.name,
            timestamp: Date.now(),
          },
          ...prev.automationEvents,
        ],
      }));
    },
    [setState]
  );

  const updateCampaign = useCallback(
    (id: string, updates: Partial<Campaign>) => {
      setState((prev) => ({
        ...prev,
        campaigns: prev.campaigns.map((c) =>
          c.id === id ? { ...c, ...updates, updatedAt: Date.now() } : c
        ),
      }));
    },
    [setState]
  );

  const deleteCampaign = useCallback(
    (id: string) => {
      setState((prev) => ({
        ...prev,
        campaigns: prev.campaigns.filter((c) => c.id !== id),
      }));
    },
    [setState]
  );

  // Contact functions
  const getContact = useCallback(
    (id: string) => state.contacts.find((c) => c.id === id),
    [state.contacts]
  );

  const addContact = useCallback(
    (contact: Contact) => {
      setState((prev) => ({
        ...prev,
        contacts: [...prev.contacts, contact],
        automationEvents: [
          {
            id: `event-${Date.now()}`,
            type: "contact_created" as const,
            description: `New contact ${contact.firstName} ${contact.lastName} added`,
            entityId: contact.id,
            entityName: `${contact.firstName} ${contact.lastName}`,
            timestamp: Date.now(),
          },
          ...prev.automationEvents,
        ],
      }));
    },
    [setState]
  );

  const updateContact = useCallback(
    (id: string, updates: Partial<Contact>) => {
      setState((prev) => {
        const contact = prev.contacts.find((c) => c.id === id);
        const events = [...prev.automationEvents];
        if (contact && updates.lifecycleStage && updates.lifecycleStage !== contact.lifecycleStage) {
          events.unshift({
            id: `event-${Date.now()}`,
            type: "lead_converted",
            description: `${contact.firstName} ${contact.lastName} moved to ${updates.lifecycleStage}`,
            entityId: id,
            entityName: `${contact.firstName} ${contact.lastName}`,
            timestamp: Date.now(),
          });
        }
        return {
          ...prev,
          contacts: prev.contacts.map((c) =>
            c.id === id ? { ...c, ...updates, updatedAt: Date.now() } : c
          ),
          automationEvents: events,
        };
      });
    },
    [setState]
  );

  const deleteContact = useCallback(
    (id: string) => {
      setState((prev) => ({
        ...prev,
        contacts: prev.contacts.filter((c) => c.id !== id),
      }));
    },
    [setState]
  );

  // Email functions
  const getEmail = useCallback(
    (id: string) => state.emails.find((e) => e.id === id),
    [state.emails]
  );

  const addEmail = useCallback(
    (email: EmailTemplate) => {
      setState((prev) => ({
        ...prev,
        emails: [...prev.emails, email],
      }));
    },
    [setState]
  );

  const updateEmail = useCallback(
    (id: string, updates: Partial<EmailTemplate>) => {
      setState((prev) => {
        const email = prev.emails.find((e) => e.id === id);
        const events = [...prev.automationEvents];
        if (email && updates.status === "Sent" && email.status !== "Sent") {
          events.unshift({
            id: `event-${Date.now()}`,
            type: "email_sent",
            description: `Email "${email.name}" was sent`,
            entityId: id,
            entityName: email.name,
            timestamp: Date.now(),
          });
        }
        return {
          ...prev,
          emails: prev.emails.map((e) =>
            e.id === id ? { ...e, ...updates, updatedAt: Date.now() } : e
          ),
          automationEvents: events,
        };
      });
    },
    [setState]
  );

  const deleteEmail = useCallback(
    (id: string) => {
      setState((prev) => ({
        ...prev,
        emails: prev.emails.filter((e) => e.id !== id),
      }));
    },
    [setState]
  );

  const logEvent = useCallback(
    (
      type: AutomationEventType,
      description: string,
      entityId?: string,
      entityName?: string,
      metadata?: Record<string, unknown>
    ) => {
      setState((prev) => ({
        ...prev,
        automationEvents: [
          {
            id: `event-${Date.now()}`,
            type,
            description,
            entityId,
            entityName,
            timestamp: Date.now(),
            metadata,
          },
          ...prev.automationEvents,
        ],
      }));
    },
    [setState]
  );

  // Dialog controls
  const openNewCampaignDialog = useCallback(() => {
    setState((prev) => ({ ...prev, isNewCampaignDialogOpen: true }));
  }, [setState]);

  const closeNewCampaignDialog = useCallback(() => {
    setState((prev) => ({ ...prev, isNewCampaignDialogOpen: false }));
  }, [setState]);

  const openNewContactDialog = useCallback(() => {
    setState((prev) => ({ ...prev, isNewContactDialogOpen: true }));
  }, [setState]);

  const closeNewContactDialog = useCallback(() => {
    setState((prev) => ({ ...prev, isNewContactDialogOpen: false }));
  }, [setState]);

  const openNewEmailDialog = useCallback(() => {
    setState((prev) => ({ ...prev, isNewEmailDialogOpen: true }));
  }, [setState]);

  const closeNewEmailDialog = useCallback(() => {
    setState((prev) => ({ ...prev, isNewEmailDialogOpen: false }));
  }, [setState]);

  const setEditingCampaign = useCallback(
    (id: string | null) => {
      setState((prev) => ({ ...prev, editingCampaignId: id }));
    },
    [setState]
  );

  const setEditingContact = useCallback(
    (id: string | null) => {
      setState((prev) => ({ ...prev, editingContactId: id }));
    },
    [setState]
  );

  const setEditingEmail = useCallback(
    (id: string | null) => {
      setState((prev) => ({ ...prev, editingEmailId: id }));
    },
    [setState]
  );

  const activeTab = useMemo(
    () => state.tabs.find((tab) => tab.id === state.activeTabId),
    [state.tabs, state.activeTabId]
  );

  const value = useMemo(
    () => ({
      state,
      activeTab,
      addTab,
      removeTab,
      setActiveTab,
      setSearchQuery,
      getCampaign,
      addCampaign,
      updateCampaign,
      deleteCampaign,
      getContact,
      addContact,
      updateContact,
      deleteContact,
      getEmail,
      addEmail,
      updateEmail,
      deleteEmail,
      logEvent,
      openNewCampaignDialog,
      closeNewCampaignDialog,
      openNewContactDialog,
      closeNewContactDialog,
      openNewEmailDialog,
      closeNewEmailDialog,
      setEditingCampaign,
      setEditingContact,
      setEditingEmail,
    }),
    [
      state,
      activeTab,
      addTab,
      removeTab,
      setActiveTab,
      setSearchQuery,
      getCampaign,
      addCampaign,
      updateCampaign,
      deleteCampaign,
      getContact,
      addContact,
      updateContact,
      deleteContact,
      getEmail,
      addEmail,
      updateEmail,
      deleteEmail,
      logEvent,
      openNewCampaignDialog,
      closeNewCampaignDialog,
      openNewContactDialog,
      closeNewContactDialog,
      openNewEmailDialog,
      closeNewEmailDialog,
      setEditingCampaign,
      setEditingContact,
      setEditingEmail,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}
