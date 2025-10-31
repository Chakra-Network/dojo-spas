import { useState, useMemo } from 'react';
import { useAppContext } from '../context/AppContext';
import type { Contact } from '../lib/types';
import ContactDetail from '../components/contacts/ContactDetail';
import { cn } from '../lib/utils';
import { Contact as ContactIcon, Inbox, Search, UserPlus } from 'lucide-react';

function ContactsView() {
  const { state, setState } = useAppContext();
  const [selectedContactId, setSelectedContactId] = useState<string | null>(state.contacts[0]?.id || null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredContacts = useMemo(() => {
    return state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [state.contacts, searchQuery]);

  const selectedContact = state.contacts.find(c => c.id === selectedContactId);

  const handleUpdateContact = (updates: Partial<Contact>) => {
    setState(prevState => ({
      ...prevState,
      contacts: prevState.contacts.map(c =>
        c.id === selectedContactId ? { ...c, ...updates } : c
      ),
    }));
  };

  const handleAddNote = (content: string) => {
    const newNote = {
      id: `note-${Date.now()}`,
      timestamp: new Date().toISOString(),
      content,
      authorId: 'user-1'
    };

    setState(prevState => ({
        ...prevState,
        contacts: prevState.contacts.map(c =>
            c.id === selectedContactId ? { ...c, notes: [...c.notes, newNote] } : c
        ),
    }));
  };

  return (
    <div className="h-full flex flex-col lg:flex-row">
      {/* Contact List Pane */}
      <div className="w-full lg:w-96 border-b lg:border-b-0 lg:border-r border-gray-200 bg-hub-gray-50 flex flex-col">
        <div className="p-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-hub-text mb-4">Contacts</h2>
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                    type="text"
                    placeholder="Search contacts..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-hub-gray-200 rounded-md text-sm focus-ring"
                />
            </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {filteredContacts.length > 0 ? (
            filteredContacts.map(contact => (
                <button
                    key={contact.id}
                    onClick={() => setSelectedContactId(contact.id)}
                    className={cn(
                        "w-full text-left p-4 flex items-center gap-4 border-b border-gray-200 hover:bg-hub-gray-100 focus-ring",
                        selectedContactId === contact.id && "bg-blue-50"
                    )}
                >
                    <img src={contact.avatar} alt={contact.name} className="w-10 h-10 rounded-full" />
                    <div>
                        {/* Updated two-line layout */}
                        <p className="font-semibold text-hub-text text-sm">{contact.name}</p>
                        <p className="text-xs text-hub-gray-600">{contact.email}</p>
                    </div>
                </button>
            ))
          ) : (
            <div className="text-center p-8 text-hub-gray-600">
              <Inbox size={32} className="mx-auto mb-2" />
              <p className="font-semibold">No contacts found</p>
              <p className="text-sm">Try adjusting your search query.</p>
            </div>
          )}
        </div>
        <div className="p-4 border-t border-gray-200">
            <button
                className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm text-white bg-green-600 rounded-md hover:bg-green-700"
            >
                <UserPlus size={16} /> Add New Contact
            </button>
        </div>
      </div>

      {/* Detail Pane */}
      {selectedContact ? (
        <ContactDetail 
            contact={selectedContact} 
            onUpdateContact={handleUpdateContact}
            onAddNote={handleAddNote}
        />
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center text-gray-500 bg-white">
          <ContactIcon size={48} className="mb-4" />
          <p>Select a contact to view their details.</p>
        </div>
      )}
    </div>
  );
}

export default ContactsView;