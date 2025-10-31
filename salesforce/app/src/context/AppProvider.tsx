/* eslint-disable react-refresh/only-export-components */
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
  LeadStatus,
  Lead,
  Contact,
  Opportunity,
  Case,
} from "@/lib/types";
import { DEFAULT_CARD_SLOTS } from "@/lib/consts/card-types";

interface AppState {
  tabs: Tab[];
  activeTabId: string;
  leads: Lead[];
  contacts: Contact[];
  opportunities: Opportunity[];
  cases: Case[];
  isWelcomeBannerExpanded: boolean;
  dismissedCards: string[];
  dashboardCardSlots: string[];
  isNewLeadDialogOpen: boolean;
  isNewContactDialogOpen: boolean;
  isConvertLeadDialogOpen: boolean;
  convertingLeadId: string | null;
  isAfterConvertDialogOpen: boolean;
  afterConvertLeadId: string | null;
  isNewOpportunityDialogOpen: boolean;
  isCloseOpportunityDialogOpen: boolean;
  closingOpportunityId: string | null;
  isNewCaseDialogOpen: boolean;
  isEditCaseDialogOpen: boolean;
  isChangeHomeCardDialogOpen: boolean;
  changingCardSlotIndex: number | null;
}

interface AppContextType {
  state: AppState;
  activeTab: Tab | undefined;
  addTab: (tab: Tab) => void;
  removeTab: (tabId: string) => void;
  setActiveTab: (tabId: string) => void;
  updateTabField: (tabId: string, field: keyof Tab, value: unknown) => void;
  getLead: (id: string) => Lead | undefined;
  getContact: (id: string) => Contact | undefined;
  getOpportunity: (id: string) => Opportunity | undefined;
  getCase: (id: string) => Case | undefined;
  addLead: (lead: Lead) => void;
  updateLead: (id: string, updates: Partial<Lead>) => void;
  deleteLead: (id: string) => void;
  addContact: (contact: Contact) => void;
  updateContact: (id: string, updates: Partial<Contact>) => void;
  addOpportunity: (opportunity: Opportunity) => void;
  updateOpportunity: (id: string, updates: Partial<Opportunity>) => void;
  addCase: (caseData: Case) => void;
  updateCase: (id: string, updates: Partial<Case>) => void;
  updateTabLeadStatus: (leadId: string, status: LeadStatus) => void;
  convertLead: (leadId: string) => void;
  openNewLeadDialog: () => void;
  closeNewLeadDialog: () => void;
  openNewContactDialog: () => void;
  closeNewContactDialog: () => void;
  openConvertLeadDialog: (leadId: string) => void;
  closeConvertLeadDialog: () => void;
  openAfterConvertDialog: (leadId: string) => void;
  closeAfterConvertDialog: () => void;
  openNewOpportunityDialog: () => void;
  closeNewOpportunityDialog: () => void;
  openCloseOpportunityDialog: (opportunityId: string) => void;
  closeCloseOpportunityDialog: () => void;
  openNewCaseDialog: () => void;
  closeNewCaseDialog: () => void;
  openEditCaseDialog: () => void;
  closeEditCaseDialog: () => void;
  openChangeHomeCardDialog: (slotIndex: number) => void;
  closeChangeHomeCardDialog: () => void;
  changeCardAtSlot: (slotIndex: number, newCardType: string) => void;
  handleToggleWelcomeBanner: () => void;
  handleDismissCard: (cardId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const initialState: AppState = {
  tabs: [{ id: "home-dashboard", type: "home-dashboard" }],
  activeTabId: "home-dashboard",
  leads: [],
  contacts: [],
  opportunities: [],
  cases: [],
  isWelcomeBannerExpanded: true,
  dismissedCards: [],
  dashboardCardSlots: DEFAULT_CARD_SLOTS,
  isNewLeadDialogOpen: false,
  isNewContactDialogOpen: false,
  isConvertLeadDialogOpen: false,
  convertingLeadId: null,
  isAfterConvertDialogOpen: false,
  afterConvertLeadId: null,
  isNewOpportunityDialogOpen: false,
  isCloseOpportunityDialogOpen: false,
  closingOpportunityId: null,
  isNewCaseDialogOpen: false,
  isEditCaseDialogOpen: false,
  isChangeHomeCardDialogOpen: false,
  changingCardSlotIndex: null,
};

// const [isExpanded, setIsExpanded] = useState(true);
//   const [dismissedCards, setDismissedCards] = useState<string[]>([]);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useDojoState(initialState);

  const addTab = useCallback(
    (tab: Tab) => {
      setState((prev) => {
        // Check if tab with same id already exists
        const existingTab = prev.tabs.find((t) => t.id === tab.id);

        // Update updatedAt for the item being opened
        const now = Date.now();
        let newState = { ...prev };

        if (tab.dataId) {
          if (tab.type === "home-lead") {
            newState = {
              ...newState,
              leads: prev.leads.map((l) =>
                l.id === tab.dataId ? { ...l, updatedAt: now } : l
              ),
            };
          } else if (tab.type === "home-contact") {
            newState = {
              ...newState,
              contacts: prev.contacts.map((c) =>
                c.id === tab.dataId ? { ...c, updatedAt: now } : c
              ),
            };
          } else if (tab.type === "home-opportunity") {
            newState = {
              ...newState,
              opportunities: prev.opportunities.map((o) =>
                o.id === tab.dataId ? { ...o, updatedAt: now } : o
              ),
            };
          } else if (tab.type === "home-case") {
            newState = {
              ...newState,
              cases: prev.cases.map((c) =>
                c.id === tab.dataId ? { ...c, updatedAt: now } : c
              ),
            };
          }
        }

        if (existingTab) {
          // Just switch to it
          return { ...newState, activeTabId: tab.id };
        }
        // Add new tab
        return {
          ...newState,
          tabs: [...prev.tabs, tab],
          activeTabId: tab.id,
        };
      });
    },
    [setState]
  );

  const removeTab = useCallback(
    (tabId: string) => {
      setState((prev): AppState => {
        // Don't allow removing home-dashboard
        if (tabId === "home-dashboard") return prev;

        const tabIndex = prev.tabs.findIndex((t) => t.id === tabId);
        if (tabIndex === -1) return prev;

        const newTabs = prev.tabs.filter((t) => t.id !== tabId);

        // If we're closing the active tab, switch to another tab
        let newActiveTabId = prev.activeTabId;
        if (prev.activeTabId === tabId) {
          // Switch to the tab before this one, or the one after, or home
          if (tabIndex > 0) {
            newActiveTabId = newTabs[tabIndex - 1].id;
          } else if (newTabs.length > 0) {
            newActiveTabId = newTabs[0].id;
          } else {
            newActiveTabId = "home-dashboard";
          }
        }

        return {
          ...prev,
          tabs: newTabs,
          activeTabId: newActiveTabId,
        };
      });
    },
    [setState]
  );

  const setActiveTab = useCallback(
    (tabId: string) => {
      setState((prev) => {
        // Check if trying to open a converted lead tab
        const tab = prev.tabs.find((t) => t.id === tabId);
        if (tab?.type === "home-lead" && tab.dataId) {
          const lead = prev.leads.find((l) => l.id === tab.dataId);
          if (lead?.convertedToContactId) {
            // Redirect to contact tab instead
            const contactTabId = `contact-${lead.convertedToContactId}`;
            const contactTab = prev.tabs.find((t) => t.id === contactTabId);

            // Update contact's updatedAt
            const updatedContacts = prev.contacts.map((c) =>
              c.id === lead.convertedToContactId
                ? { ...c, updatedAt: Date.now() }
                : c
            );

            if (contactTab) {
              return {
                ...prev,
                activeTabId: contactTabId,
                contacts: updatedContacts,
              };
            } else {
              // Create contact tab if it doesn't exist
              return {
                ...prev,
                tabs: [
                  ...prev.tabs,
                  {
                    id: contactTabId,
                    type: "home-contact" as const,
                    dataId: lead.convertedToContactId,
                  },
                ],
                activeTabId: contactTabId,
                contacts: updatedContacts,
              };
            }
          }
        }

        // Update updatedAt for the item being opened
        const now = Date.now();
        let newState = { ...prev, activeTabId: tabId };

        if (tab?.dataId) {
          if (tab.type === "home-lead") {
            newState = {
              ...newState,
              leads: prev.leads.map((l) =>
                l.id === tab.dataId ? { ...l, updatedAt: now } : l
              ),
            };
          } else if (tab.type === "home-contact") {
            newState = {
              ...newState,
              contacts: prev.contacts.map((c) =>
                c.id === tab.dataId ? { ...c, updatedAt: now } : c
              ),
            };
          } else if (tab.type === "home-opportunity") {
            newState = {
              ...newState,
              opportunities: prev.opportunities.map((o) =>
                o.id === tab.dataId ? { ...o, updatedAt: now } : o
              ),
            };
          } else if (tab.type === "home-case") {
            newState = {
              ...newState,
              cases: prev.cases.map((c) =>
                c.id === tab.dataId ? { ...c, updatedAt: now } : c
              ),
            };
          }
        }

        return newState;
      });
    },
    [setState]
  );

  const updateTabField = useCallback(
    (tabId: string, field: keyof Tab, value: unknown) => {
      setState((prev) => ({
        ...prev,
        tabs: prev.tabs.map((tab) =>
          tab.id === tabId ? { ...tab, [field]: value } : tab
        ),
      }));
    },
    [setState]
  );

  // Data getter functions
  const getLead = useCallback(
    (id: string) => {
      return state.leads.find((lead) => lead.id === id);
    },
    [state.leads]
  );

  const getContact = useCallback(
    (id: string) => {
      return state.contacts.find((contact) => contact.id === id);
    },
    [state.contacts]
  );

  const getOpportunity = useCallback(
    (id: string) => {
      return state.opportunities.find((opportunity) => opportunity.id === id);
    },
    [state.opportunities]
  );

  const getCase = useCallback(
    (id: string) => {
      return state.cases.find((caseItem) => caseItem.id === id);
    },
    [state.cases]
  );

  // Lead management functions
  const addLead = useCallback(
    (lead: Lead) => {
      setState((prev) => ({
        ...prev,
        leads: [...prev.leads, lead],
      }));
    },
    [setState]
  );

  const updateLead = useCallback(
    (id: string, updates: Partial<Lead>) => {
      setState((prev) => ({
        ...prev,
        leads: prev.leads.map((lead) =>
          lead.id === id ? { ...lead, ...updates, updatedAt: Date.now() } : lead
        ),
      }));
    },
    [setState]
  );

  const deleteLead = useCallback(
    (id: string) => {
      setState((prev) => ({
        ...prev,
        leads: prev.leads.filter((lead) => lead.id !== id),
      }));
    },
    [setState]
  );

  // Contact management functions
  const addContact = useCallback(
    (contact: Contact) => {
      setState((prev) => ({
        ...prev,
        contacts: [...prev.contacts, contact],
      }));
    },
    [setState]
  );

  const updateContact = useCallback(
    (id: string, updates: Partial<Contact>) => {
      setState((prev) => ({
        ...prev,
        contacts: prev.contacts.map((contact) =>
          contact.id === id
            ? { ...contact, ...updates, updatedAt: Date.now() }
            : contact
        ),
      }));
    },
    [setState]
  );

  // Opportunity management functions
  const addOpportunity = useCallback(
    (opportunity: Opportunity) => {
      setState((prev) => ({
        ...prev,
        opportunities: [...prev.opportunities, opportunity],
      }));
    },
    [setState]
  );

  const updateOpportunity = useCallback(
    (id: string, updates: Partial<Opportunity>) => {
      setState((prev) => ({
        ...prev,
        opportunities: prev.opportunities.map((opportunity) =>
          opportunity.id === id
            ? { ...opportunity, ...updates, updatedAt: Date.now() }
            : opportunity
        ),
      }));
    },
    [setState]
  );

  // Case management functions
  const addCase = useCallback(
    (caseData: Case) => {
      setState((prev) => ({
        ...prev,
        cases: [...prev.cases, caseData],
      }));
    },
    [setState]
  );

  const updateCase = useCallback(
    (id: string, updates: Partial<Case>) => {
      setState((prev) => ({
        ...prev,
        cases: prev.cases.map((caseItem) =>
          caseItem.id === id
            ? { ...caseItem, ...updates, updatedAt: Date.now() }
            : caseItem
        ),
      }));
    },
    [setState]
  );

  const updateTabLeadStatus = useCallback(
    (leadId: string, status: LeadStatus) => {
      setState((prev) => ({
        ...prev,
        leads: prev.leads.map((lead) =>
          lead.id === leadId ? { ...lead, leadStatus: status } : lead
        ),
      }));
    },
    [setState]
  );

  const convertLead = useCallback(
    (leadId: string) => {
      setState((prev) => {
        const lead = prev.leads.find((l) => l.id === leadId);
        if (!lead) return prev;

        // Create new contact from lead data
        const contactId = `contact-${Date.now()}`;
        const newContact: Contact = {
          id: contactId,
          name: lead.name,
          company: lead.company,
          salutation: lead.salutation,
          firstName: lead.firstName,
          lastName: lead.lastName,
          accountName: lead.company,
          title: lead.title,
          reportsTo: "",
          description: lead.description,
          contactOwner: lead.leadOwner,
          phone: lead.phone,
          email: lead.email,
          mailingCountry: lead.country,
          mailingStreet: lead.street,
          mailingCity: lead.city,
          mailingState: lead.state,
          mailingZipCode: lead.zipCode,
          updatedAt: Date.now(),
        };

        // Update lead to mark as converted (keep in list for tab redirection)
        // Don't automatically create contact tab - it will be created when user clicks the converted lead tab
        return {
          ...prev,
          leads: prev.leads.map((l) =>
            l.id === leadId
              ? {
                  ...l,
                  leadStatus: "Converted" as LeadStatus,
                  convertedToContactId: contactId,
                }
              : l
          ),
          contacts: [...prev.contacts, newContact],
        };
      });
    },
    [setState]
  );

  const openNewLeadDialog = useCallback(() => {
    setState((prev) => ({ ...prev, isNewLeadDialogOpen: true }));
  }, [setState]);

  const closeNewLeadDialog = useCallback(() => {
    setState((prev) => ({ ...prev, isNewLeadDialogOpen: false }));
  }, [setState]);

  const openNewContactDialog = useCallback(() => {
    setState((prev) => ({ ...prev, isNewContactDialogOpen: true }));
  }, [setState]);

  const closeNewContactDialog = useCallback(() => {
    setState((prev) => ({ ...prev, isNewContactDialogOpen: false }));
  }, [setState]);

  const openConvertLeadDialog = useCallback(
    (leadId: string) => {
      setState((prev) => ({
        ...prev,
        isConvertLeadDialogOpen: true,
        convertingLeadId: leadId,
      }));
    },
    [setState]
  );

  const closeConvertLeadDialog = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isConvertLeadDialogOpen: false,
      convertingLeadId: null,
    }));
  }, [setState]);

  const openAfterConvertDialog = useCallback(
    (leadId: string) => {
      setState((prev) => ({
        ...prev,
        isAfterConvertDialogOpen: true,
        afterConvertLeadId: leadId,
      }));
    },
    [setState]
  );

  const closeAfterConvertDialog = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isAfterConvertDialogOpen: false,
      afterConvertLeadId: null,
    }));
  }, [setState]);

  const openNewOpportunityDialog = useCallback(() => {
    setState((prev) => ({ ...prev, isNewOpportunityDialogOpen: true }));
  }, [setState]);

  const closeNewOpportunityDialog = useCallback(() => {
    setState((prev) => ({ ...prev, isNewOpportunityDialogOpen: false }));
  }, [setState]);

  const openCloseOpportunityDialog = useCallback(
    (opportunityId: string) => {
      setState((prev) => ({
        ...prev,
        isCloseOpportunityDialogOpen: true,
        closingOpportunityId: opportunityId,
      }));
    },
    [setState]
  );

  const closeCloseOpportunityDialog = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isCloseOpportunityDialogOpen: false,
      closingOpportunityId: null,
    }));
  }, [setState]);

  const openNewCaseDialog = useCallback(() => {
    setState((prev) => ({ ...prev, isNewCaseDialogOpen: true }));
  }, [setState]);

  const closeNewCaseDialog = useCallback(() => {
    setState((prev) => ({ ...prev, isNewCaseDialogOpen: false }));
  }, [setState]);

  const openEditCaseDialog = useCallback(() => {
    setState((prev) => ({ ...prev, isEditCaseDialogOpen: true }));
  }, [setState]);

  const closeEditCaseDialog = useCallback(() => {
    setState((prev) => ({ ...prev, isEditCaseDialogOpen: false }));
  }, [setState]);

  const openChangeHomeCardDialog = useCallback(
    (slotIndex: number) => {
      setState((prev) => ({
        ...prev,
        isChangeHomeCardDialogOpen: true,
        changingCardSlotIndex: slotIndex,
      }));
    },
    [setState]
  );

  const closeChangeHomeCardDialog = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isChangeHomeCardDialogOpen: false,
      changingCardSlotIndex: null,
    }));
  }, [setState]);

  const changeCardAtSlot = useCallback(
    (slotIndex: number, newCardType: string) => {
      setState((prev) => {
        const newSlots = [...prev.dashboardCardSlots];
        newSlots[slotIndex] = newCardType;
        return {
          ...prev,
          dashboardCardSlots: newSlots,
        };
      });
    },
    [setState]
  );

  const activeTab = useMemo(() => {
    return state.tabs.find((tab) => tab.id === state.activeTabId);
  }, [state.tabs, state.activeTabId]);

  const handleToggleWelcomeBanner = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isWelcomeBannerExpanded: !prev.isWelcomeBannerExpanded,
    }));
  }, [setState]);

  const handleDismissCard = useCallback(
    (cardId: string) => {
      setState((prev) => ({
        ...prev,
        dismissedCards: [...prev.dismissedCards, cardId],
      }));
    },
    [setState]
  );

  const value = useMemo(
    () => ({
      state,
      activeTab,
      handleToggleWelcomeBanner,
      handleDismissCard,
      addTab,
      removeTab,
      setActiveTab,
      updateTabField,
      getLead,
      getContact,
      getOpportunity,
      getCase,
      addLead,
      updateLead,
      deleteLead,
      addContact,
      updateContact,
      addOpportunity,
      updateOpportunity,
      addCase,
      updateCase,
      updateTabLeadStatus,
      convertLead,
      openNewLeadDialog,
      closeNewLeadDialog,
      openNewContactDialog,
      closeNewContactDialog,
      openConvertLeadDialog,
      closeConvertLeadDialog,
      openAfterConvertDialog,
      closeAfterConvertDialog,
      openNewOpportunityDialog,
      closeNewOpportunityDialog,
      openCloseOpportunityDialog,
      closeCloseOpportunityDialog,
      openNewCaseDialog,
      closeNewCaseDialog,
      openEditCaseDialog,
      closeEditCaseDialog,
      openChangeHomeCardDialog,
      closeChangeHomeCardDialog,
      changeCardAtSlot,
    }),
    [
      state,
      activeTab,
      handleToggleWelcomeBanner,
      handleDismissCard,
      addTab,
      removeTab,
      setActiveTab,
      updateTabField,
      getLead,
      getContact,
      getOpportunity,
      getCase,
      addLead,
      updateLead,
      deleteLead,
      addContact,
      updateContact,
      addOpportunity,
      updateOpportunity,
      addCase,
      updateCase,
      updateTabLeadStatus,
      convertLead,
      openNewLeadDialog,
      closeNewLeadDialog,
      openNewContactDialog,
      closeNewContactDialog,
      openConvertLeadDialog,
      closeConvertLeadDialog,
      openAfterConvertDialog,
      closeAfterConvertDialog,
      openNewOpportunityDialog,
      closeNewOpportunityDialog,
      openCloseOpportunityDialog,
      closeCloseOpportunityDialog,
      openNewCaseDialog,
      closeNewCaseDialog,
      openEditCaseDialog,
      closeEditCaseDialog,
      openChangeHomeCardDialog,
      closeChangeHomeCardDialog,
      changeCardAtSlot,
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
