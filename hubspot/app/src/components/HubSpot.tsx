import { useDojoState } from "@chakra-dev/dojo-hooks";
import { useCallback } from "react";
import type { HubSpotState, NavSection } from "../lib/types";
import {
  mockCampaigns,
  mockContacts,
  mockAutomationEvents,
  mockEmailTemplates,
} from "../lib/consts";
import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";
import CampaignManager from "./CampaignManager";
import EmailDesigner from "./EmailDesigner";
import ContactsCRM from "./ContactsCRM";
import ContactDetail from "./ContactDetail";
import AutomationLog from "./AutomationLog";

export default function HubSpot() {
  const [state, setState] = useDojoState<HubSpotState>({
    currentSection: "dashboard",
    campaigns: mockCampaigns,
    contacts: mockContacts,
    automationLog: mockAutomationEvents,
    emailTemplates: mockEmailTemplates,
    selectedCampaignId: null,
    selectedContactId: null,
    selectedTemplateId: null,
    campaignViewMode: "table",
    contactSearch: "",
    contactFilterStage: "all",
    sidebarCollapsed: false,
  });

  const navigate = useCallback(
    (section: NavSection) =>
      setState((s) => ({
        ...s,
        currentSection: section,
        selectedContactId: null,
        selectedCampaignId: null,
      })),
    [setState],
  );

  const renderSection = () => {
    // Contact detail sub-view
    if (state.currentSection === "contacts" && state.selectedContactId) {
      const contact = state.contacts.find((c) => c.id === state.selectedContactId);
      if (contact) {
        return (
          <ContactDetail
            contact={contact}
            onBack={() => setState((s) => ({ ...s, selectedContactId: null }))}
            onUpdate={(updated) =>
              setState((s) => ({
                ...s,
                contacts: s.contacts.map((c) => (c.id === updated.id ? updated : c)),
              }))
            }
            onAddNote={(contactId, note) =>
              setState((s) => ({
                ...s,
                contacts: s.contacts.map((c) =>
                  c.id === contactId
                    ? { ...c, notes: [note, ...c.notes] }
                    : c,
                ),
              }))
            }
          />
        );
      }
    }

    switch (state.currentSection) {
      case "dashboard":
        return (
          <Dashboard
            campaigns={state.campaigns}
            contacts={state.contacts}
            automationLog={state.automationLog}
          />
        );
      case "campaigns":
        return (
          <CampaignManager
            campaigns={state.campaigns}
            viewMode={state.campaignViewMode}
            onViewModeChange={(mode) =>
              setState((s) => ({ ...s, campaignViewMode: mode }))
            }
            onUpdateCampaign={(updated) =>
              setState((s) => ({
                ...s,
                campaigns: s.campaigns.map((c) =>
                  c.id === updated.id ? updated : c,
                ),
                automationLog:
                  updated.status !== s.campaigns.find((c) => c.id === updated.id)?.status
                    ? [
                        {
                          id: `ev-${Date.now()}`,
                          type:
                            updated.status === "active"
                              ? "campaign_launched"
                              : updated.status === "completed"
                                ? "campaign_completed"
                                : "workflow_triggered",
                          description: `Campaign '${updated.name}' status changed to ${updated.status}`,
                          timestamp: new Date().toISOString(),
                          campaignId: updated.id,
                          campaignName: updated.name,
                        },
                        ...s.automationLog,
                      ]
                    : s.automationLog,
              }))
            }
          />
        );
      case "email":
        return (
          <EmailDesigner
            templates={state.emailTemplates}
            selectedTemplateId={state.selectedTemplateId}
            onSelectTemplate={(id) =>
              setState((s) => ({ ...s, selectedTemplateId: id }))
            }
            onUpdateTemplate={(updated) =>
              setState((s) => ({
                ...s,
                emailTemplates: s.emailTemplates.map((t) =>
                  t.id === updated.id ? updated : t,
                ),
              }))
            }
            onCreateTemplate={(template) =>
              setState((s) => ({
                ...s,
                emailTemplates: [template, ...s.emailTemplates],
                selectedTemplateId: template.id,
              }))
            }
          />
        );
      case "contacts":
        return (
          <ContactsCRM
            contacts={state.contacts}
            search={state.contactSearch}
            filterStage={state.contactFilterStage}
            onSearchChange={(q) => setState((s) => ({ ...s, contactSearch: q }))}
            onFilterChange={(stage) =>
              setState((s) => ({ ...s, contactFilterStage: stage }))
            }
            onSelectContact={(id) =>
              setState((s) => ({ ...s, selectedContactId: id }))
            }
            onUpdateContact={(updated) =>
              setState((s) => ({
                ...s,
                contacts: s.contacts.map((c) =>
                  c.id === updated.id ? updated : c,
                ),
                automationLog: [
                  {
                    id: `ev-${Date.now()}`,
                    type: "stage_changed",
                    description: `${updated.firstName} ${updated.lastName} lifecycle stage updated`,
                    timestamp: new Date().toISOString(),
                    contactId: updated.id,
                    contactName: `${updated.firstName} ${updated.lastName}`,
                  },
                  ...s.automationLog,
                ],
              }))
            }
          />
        );
      case "automation":
        return <AutomationLog events={state.automationLog} />;
      default:
        return null;
    }
  };

  return (
    <div className="h-screen flex bg-[#0f1b2d] text-gray-100 overflow-hidden">
      <Sidebar
        currentSection={state.currentSection}
        onNavigate={navigate}
        collapsed={state.sidebarCollapsed}
        onToggle={() =>
          setState((s) => ({ ...s, sidebarCollapsed: !s.sidebarCollapsed }))
        }
      />
      <main className="flex-1 overflow-y-auto bg-[#f5f8fa]">{renderSection()}</main>
    </div>
  );
}
