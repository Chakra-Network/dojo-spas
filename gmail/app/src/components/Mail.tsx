import type { Email } from "../lib/types";
import { mockEmails, initialLabels } from "../lib/consts";
import Header from "./Header";
import Sidebar from "./Sidebar";
import EmailList from "./EmailList";
import EmailView from "./EmailView";
import ComposeModal from "./ComposeModal";
import { useDojoState } from "@chakra-dev/dojo-hooks";
import { useCallback } from "react";

export default function Mail() {
  const [state, setState] = useDojoState<{
    emails: Email[];
    currentLabel: string;
    selectedEmailId: string | null;
    showCompose: boolean;
    searchQuery: string;
    sidebarCollapsed: boolean;
  }>({
    emails: mockEmails,
    currentLabel: "inbox",
    selectedEmailId: null,
    showCompose: false,
    searchQuery: "",
    sidebarCollapsed: false,
  });

  const selectedEmail =
    state.emails.find((email) => email.id === state.selectedEmailId) || null;

  const filteredEmails = state.emails.filter((email) => {
    if (state.searchQuery) {
      const query = state.searchQuery.toLowerCase();
      return (
        email.from.toLowerCase().includes(query) ||
        email.subject.toLowerCase().includes(query) ||
        email.preview.toLowerCase().includes(query)
      );
    }

    if (state.currentLabel === "starred") {
      return email.starred;
    }

    return state.currentLabel === "inbox";
  });

  const handleEmailClick = useCallback(
    (emailId: string) => {
      setState((prevState) => ({
        ...prevState,
        selectedEmailId: emailId,
        emails: prevState.emails.map((email) =>
          email.id === emailId ? { ...email, read: true } : email
        ),
      }));
    },
    [setState]
  );

  const handleStarToggle = useCallback(
    (emailId: string) => {
      setState((prevState) => ({
        ...prevState,
        emails: prevState.emails.map((email) =>
          email.id === emailId ? { ...email, starred: !email.starred } : email
        ),
      }));
    },
    [setState]
  );

  const handleImportantToggle = useCallback(
    (emailId: string) => {
      setState((prevState) => ({
        ...prevState,
        emails: prevState.emails.map((email) =>
          email.id === emailId
            ? { ...email, important: !email.important }
            : email
        ),
      }));
    },
    [setState]
  );

  const handleSend = (to: string, subject: string, body: string) => {
    console.log("Sending email:", { to, subject, body });
  };

  const handleReply = (to: string, subject: string, body: string) => {
    console.log("Sending reply:", { to, subject, body });
    // Here you would typically send the reply to your backend
    // For now, we'll just log it
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <Header
        onSearch={(searchQuery) =>
          setState((prevState) => ({ ...prevState, searchQuery }))
        }
        onMenuClick={() =>
          setState((prevState) => ({
            ...prevState,
            sidebarCollapsed: !prevState.sidebarCollapsed,
          }))
        }
      />

      <div className="flex-1 flex overflow-hidden">
        <Sidebar
          labels={initialLabels}
          currentLabel={state.currentLabel}
          onLabelClick={(currentLabel) =>
            setState((prevState) => ({ ...prevState, currentLabel }))
          }
          onCompose={() =>
            setState((prevState) => ({ ...prevState, showCompose: true }))
          }
          collapsed={state.sidebarCollapsed}
        />

        <div className="flex-1 flex overflow-hidden">
          {state.selectedEmailId ? (
            <EmailView
              email={selectedEmail}
              onClose={() =>
                setState((prevState) => ({
                  ...prevState,
                  selectedEmailId: null,
                }))
              }
              onReply={handleReply}
            />
          ) : (
            <EmailList
              emails={filteredEmails}
              selectedEmailId={state.selectedEmailId}
              onEmailClick={handleEmailClick}
              onStarToggle={handleStarToggle}
              onImportantToggle={handleImportantToggle}
            />
          )}
        </div>
      </div>

      {state.showCompose && (
        <ComposeModal
          onClose={() =>
            setState((prevState) => ({ ...prevState, showCompose: false }))
          }
          onSend={handleSend}
        />
      )}
    </div>
  );
}
