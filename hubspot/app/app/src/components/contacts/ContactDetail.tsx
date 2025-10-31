import type { Contact } from '../../lib/types';
import { useAppContext } from '../../context/AppContext';
import ActivityTimeline from './ActivityTimeline';
import NotesSection from './NotesSection';
import LifecycleStageDropdown from './LifecycleStageDropdown';

interface ContactDetailProps {
  contact: Contact;
  onUpdateContact: (updates: Partial<Contact>) => void;
  onAddNote: (content: string) => void;
}

function ContactDetail({ contact, onUpdateContact, onAddNote }: ContactDetailProps) {
  const { state } = useAppContext();

  return (
    <div className="flex-1 overflow-y-auto p-8">
      {/* Header */}
      <div className="flex items-center gap-4 pb-6 border-b mb-6">
        <img src={contact.avatar} alt={contact.name} className="w-20 h-20 rounded-full" />
        <div>
          <h2 className="text-3xl font-bold text-gray-800">{contact.name}</h2>
          <p className="text-gray-600">{contact.jobTitle} at {contact.company}</p>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <DetailItem label="Email" value={contact.email} />
        <DetailItem label="Lifecycle Stage">
          <LifecycleStageDropdown contact={contact} />
        </DetailItem>
        <DetailItem label="Contact Owner">
            <select
                value={contact.ownerId || ''}
                onChange={e => onUpdateContact({ ownerId: e.target.value || null })}
                className="w-full p-1 border-gray-300 rounded-md text-sm"
            >
                <option value="">Unassigned</option>
                {state.users.map(user => (
                    <option key={user.id} value={user.id}>{user.name}</option>
                ))}
            </select>
        </DetailItem>
      </div>
      
      {/* Activity and Notes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ActivityTimeline activities={contact.activityTimeline} />
        <NotesSection notes={contact.notes} users={state.users} onAddNote={onAddNote} />
      </div>
    </div>
  );
}

// Helper component for displaying details
function DetailItem({ label, value, children }: { label: string; value?: string; children?: React.ReactNode }) {
    return (
        <div>
            <p className="text-sm font-medium text-gray-500 mb-1">{label}</p>
            {value && <p className="text-md text-gray-800 wrap-break-word">{value}</p>}
            {children}
        </div>
    );
}

export default ContactDetail;