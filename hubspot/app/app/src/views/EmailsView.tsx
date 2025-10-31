import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import type { EmailTemplate } from '../lib/types';
import EmailEditor from '../components/emails/EmailEditor';
import { cn } from '../lib/utils';
import { Inbox, Mails, PlusCircle } from 'lucide-react';

function EmailsView() {
  const { state, setState } = useAppContext();
  const [selectedEmailId, setSelectedEmailId] = useState<string | null>(state.emailTemplates[0]?.id || null);

  const handleSaveEmail = (updatedEmail: EmailTemplate) => {
    setState(prevState => {
      // Find if the email is truly new or was just created optimistically
      const isAlreadyPresent = prevState.emailTemplates.some(e => e.id === updatedEmail.id && e.name !== 'New Untitled Email');

      if (isAlreadyPresent) {
        // Update existing
        return {
          ...prevState,
          emailTemplates: prevState.emailTemplates.map(e => e.id === updatedEmail.id ? updatedEmail : e),
        };
      } else {
        // Finalize the new or updated optimistic email
        return {
          ...prevState,
          emailTemplates: prevState.emailTemplates.map(e => e.id === updatedEmail.id ? updatedEmail : e),
        };
      }
    });
    setSelectedEmailId(null); // Close editor after saving
  };

    const handleSendEmail = (email: EmailTemplate) => {
    setState(prevState => {
      const newLogEntry = {
        id: `log-${Date.now()}`,
        timestamp: new Date().toISOString(),
        eventType: "Email Sent" as const,
        description: `Email '${email.name}' sent to segment '${email.targetSegment}'.`,
      };
      return {
        ...prevState,
        automationLog: [...prevState.automationLog, newLogEntry],
      };
    });
    // You could also close the editor after sending if desired
    // setSelectedEmailId(null); 
  };

  const handleCreateNew = () => {
    const newEmail: EmailTemplate = {
      id: `email-${Date.now()}`,
      name: 'New Untitled Email',
      subject: '',
      content: '',
      targetSegment: 'All Contacts'
    };
    // Add it to state optimistically and select it
    setState(prevState => ({ ...prevState, emailTemplates: [...prevState.emailTemplates, newEmail] }));
    setSelectedEmailId(newEmail.id);
  };

  // When closing, if the email was a new, unsaved draft, remove it from the state.
  const handleCloseEditor = () => {
    const selectedEmail = state.emailTemplates.find(e => e.id === selectedEmailId);
    if (selectedEmail && selectedEmail.name === 'New Untitled Email' && selectedEmail.subject === '' && selectedEmail.content === '') {
        setState(prevState => ({
            ...prevState,
            emailTemplates: prevState.emailTemplates.filter(e => e.id !== selectedEmailId),
        }));
    }
    setSelectedEmailId(null);
  }

  const selectedEmail = state.emailTemplates.find(e => e.id === selectedEmailId);

  return (
    <div className="h-full flex flex-col lg:flex-row">
      {/* Email List Pane */}
      <div className="w-full lg:w-80 border-b lg:border-b-0 lg:border-r border-gray-200 bg-hub-gray-50 flex flex-col">
        <div className="p-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-hub-text">Email Templates</h2>
        </div>
        <div className="flex-1 overflow-y-auto">
          {state.emailTemplates.length > 0 ? (
              state.emailTemplates.map(email => (
              <button
                  key={email.id}
                  onClick={() => setSelectedEmailId(email.id)}
                  className={cn(
                      "w-full text-left p-4 border-b border-gray-200 hover:bg-hub-gray-100 focus-ring",
                      selectedEmailId === email.id && "bg-blue-50"
                  )}
              >
                  {/* Updated two-line layout */}
                  <p className="font-semibold text-hub-text text-sm truncate">{email.name}</p>
                  <p className="text-xs text-hub-gray-600 truncate mt-1">{email.subject || 'No subject'}</p>
              </button>
              ))
          ) : (
              <div className="text-center p-8 text-hub-gray-600">
                  <Inbox size={32} className="mx-auto mb-2" />
                  <p className="font-semibold">No email templates</p>
                  <p className="text-sm">Create a new one to get started.</p>
              </div>
          )}
        </div>
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleCreateNew}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm text-white bg-green-600 rounded-md hover:bg-green-700"
          >
            <PlusCircle size={16} /> Create New Email
          </button>
        </div>
      </div>

      {/* Editor Pane */}
      {selectedEmail ? (
        <EmailEditor
          email={selectedEmail}
          onSave={handleSaveEmail}
          onClose={handleCloseEditor}
          onSend={handleSendEmail}
        />
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center text-gray-500 bg-gray-50">
          <Mails size={48} className="mb-4" />
          <p>Select an email to edit, or create a new one.</p>
        </div>
      )}
    </div>
  );
}

export default EmailsView;