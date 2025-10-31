import { useAppContext } from '../../context/AppContext';
import type { Contact, LifecycleStage } from '../../lib/types';

interface LifecycleStageDropdownProps {
  contact: Contact;
}

const STAGES: LifecycleStage[] = [
  "Subscriber",
  "Lead",
  "Marketing Qualified Lead",
  "Sales Qualified Lead",
  "Opportunity",
  "Customer",
];

function LifecycleStageDropdown({ contact }: LifecycleStageDropdownProps) {
  const { setState } = useAppContext();

  const handleStageChange = (newStage: LifecycleStage) => {
    setState(prevState => {
      // Find the original contact to compare stages
      const originalContact = prevState.contacts.find(c => c.id === contact.id);
      if (!originalContact) return prevState;

      // Update the contact's stage
      const updatedContacts = prevState.contacts.map(c =>
        c.id === contact.id ? { ...c, lifecycleStage: newStage } : c
      );

      let newAutomationLog = prevState.automationLog;

      // If the stage changed to 'Customer', create a log entry
      if (newStage === 'Customer' && originalContact.lifecycleStage !== 'Customer') {
        const newLogEntry = {
          id: `log-${Date.now()}`,
          timestamp: new Date().toISOString(),
          eventType: "Lead Converted" as const,
          description: `Contact '${originalContact.name}' moved to stage 'Customer'.`,
        };
        newAutomationLog = [...prevState.automationLog, newLogEntry];
      }

      return {
        ...prevState,
        contacts: updatedContacts,
        automationLog: newAutomationLog,
      };
    });
  };

  return (
    <select
      value={contact.lifecycleStage}
      onChange={e => handleStageChange(e.target.value as LifecycleStage)}
      className="w-full p-1 border-gray-300 rounded-md text-sm"
    >
      {STAGES.map(stage => (
        <option key={stage} value={stage}>{stage}</option>
      ))}
    </select>
  );
}

export default LifecycleStageDropdown;