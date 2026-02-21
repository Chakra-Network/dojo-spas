import { useState } from "react";
import { Plus, Search, Filter, Trash2, Phone, Mail } from "lucide-react";
import { useAppContext } from "@/context/AppProvider";
import type { Contact, LifecycleStage } from "@/lib/types";

export default function Contacts() {
  const { state, addContact, updateContact, deleteContact, setSearchQuery } = useAppContext();
  const [lifecycleFilter, setLifecycleFilter] = useState<LifecycleStage | "All">("All");
  const [showNewContactForm, setShowNewContactForm] = useState(false);
  const [selectedContactId, setSelectedContactId] = useState<string | null>(null);

  const filteredContacts = state.contacts
    .filter((c) => lifecycleFilter === "All" || c.lifecycleStage === lifecycleFilter)
    .filter((c) => {
      if (!state.searchQuery) return true;
      const query = state.searchQuery.toLowerCase();
      return (
        c.firstName.toLowerCase().includes(query) ||
        c.lastName.toLowerCase().includes(query) ||
        c.email.toLowerCase().includes(query) ||
        c.company?.toLowerCase().includes(query)
      );
    })
    .sort((a, b) => b.updatedAt - a.updatedAt);

  const selectedContact = state.contacts.find((c) => c.id === selectedContactId);

  const handleCreateContact = (data: Partial<Contact>) => {
    const newContact: Contact = {
      id: `contact-${Date.now()}`,
      firstName: data.firstName || "",
      lastName: data.lastName || "",
      email: data.email || "",
      phone: data.phone,
      company: data.company,
      jobTitle: data.jobTitle,
      lifecycleStage: "Lead",
      leadScore: 0,
      lastActivity: new Date().toISOString().split("T")[0],
      source: "Manual Entry",
      notes: [],
      tags: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    addContact(newContact);
    setShowNewContactForm(false);
    setSelectedContactId(newContact.id);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#2d3e50]">Contacts</h1>
        <button
          onClick={() => setShowNewContactForm(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={18} />
          Add Contact
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search contacts..."
            value={state.searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-[#ff7a59]"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={18} className="text-gray-400" />
          <select
            value={lifecycleFilter}
            onChange={(e) => setLifecycleFilter(e.target.value as LifecycleStage | "All")}
            className="border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#ff7a59]"
          >
            <option value="All">All Stages</option>
            <option value="Subscriber">Subscriber</option>
            <option value="Lead">Lead</option>
            <option value="MQL">MQL</option>
            <option value="SQL">SQL</option>
            <option value="Opportunity">Opportunity</option>
            <option value="Customer">Customer</option>
            <option value="Evangelist">Evangelist</option>
          </select>
        </div>
        <div className="text-sm text-gray-500">
          {filteredContacts.length} contacts
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Contact List */}
        <div className="col-span-2">
          <div className="card overflow-hidden p-0">
            <table className="w-full">
              <thead className="bg-[#f5f8fa]">
                <tr>
                  <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Contact</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Company</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Stage</th>
                  <th className="text-center px-4 py-3 text-sm font-medium text-gray-600">Score</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Last Activity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredContacts.map((contact) => (
                  <tr
                    key={contact.id}
                    onClick={() => setSelectedContactId(contact.id)}
                    className={`cursor-pointer transition-colors ${
                      selectedContactId === contact.id
                        ? "bg-orange-50"
                        : "hover:bg-[#f5f8fa]"
                    }`}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#7c98b6] rounded-full flex items-center justify-center text-white font-medium">
                          {contact.firstName[0]}{contact.lastName[0]}
                        </div>
                        <div>
                          <div className="font-medium text-[#2d3e50]">
                            {contact.firstName} {contact.lastName}
                          </div>
                          <div className="text-sm text-gray-500">{contact.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      <div>{contact.company}</div>
                      {contact.jobTitle && (
                        <div className="text-gray-400">{contact.jobTitle}</div>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`badge ${
                        contact.lifecycleStage === "Customer" || contact.lifecycleStage === "Evangelist" ? "badge-completed" :
                        contact.lifecycleStage === "SQL" || contact.lifecycleStage === "Opportunity" ? "badge-active" :
                        contact.lifecycleStage === "MQL" ? "badge-scheduled" :
                        "badge-draft"
                      }`}>
                        {contact.lifecycleStage}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className={`inline-flex items-center justify-center w-10 h-10 rounded-full font-bold text-sm ${
                        contact.leadScore >= 80 ? "bg-green-100 text-green-700" :
                        contact.leadScore >= 50 ? "bg-yellow-100 text-yellow-700" :
                        "bg-gray-100 text-gray-600"
                      }`}>
                        {contact.leadScore}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">{contact.lastActivity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredContacts.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                No contacts found
              </div>
            )}
          </div>
        </div>

        {/* Contact Detail Panel */}
        <div>
          {selectedContact ? (
            <div className="card">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 bg-[#7c98b6] rounded-full flex items-center justify-center text-white text-xl font-medium">
                    {selectedContact.firstName[0]}{selectedContact.lastName[0]}
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-[#2d3e50]">
                      {selectedContact.firstName} {selectedContact.lastName}
                    </h2>
                    <div className="text-sm text-gray-500">{selectedContact.jobTitle}</div>
                  </div>
                </div>
                <button
                  onClick={() => deleteContact(selectedContact.id)}
                  className="p-2 text-gray-400 hover:text-red-500"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              <div className="space-y-4">
                {/* Contact Info */}
                <div className="space-y-2">
                  <a href={`mailto:${selectedContact.email}`} className="flex items-center gap-2 text-sm text-[#0091ae] hover:underline">
                    <Mail size={14} />
                    {selectedContact.email}
                  </a>
                  {selectedContact.phone && (
                    <a href={`tel:${selectedContact.phone}`} className="flex items-center gap-2 text-sm text-[#0091ae] hover:underline">
                      <Phone size={14} />
                      {selectedContact.phone}
                    </a>
                  )}
                </div>

                {/* Lifecycle Stage */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Lifecycle Stage</label>
                  <select
                    value={selectedContact.lifecycleStage}
                    onChange={(e) => updateContact(selectedContact.id, { lifecycleStage: e.target.value as LifecycleStage })}
                    className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#ff7a59]"
                  >
                    <option value="Subscriber">Subscriber</option>
                    <option value="Lead">Lead</option>
                    <option value="MQL">MQL</option>
                    <option value="SQL">SQL</option>
                    <option value="Opportunity">Opportunity</option>
                    <option value="Customer">Customer</option>
                    <option value="Evangelist">Evangelist</option>
                  </select>
                </div>

                {/* Lead Score */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Lead Score</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={selectedContact.leadScore}
                    onChange={(e) => updateContact(selectedContact.id, { leadScore: Number(e.target.value) })}
                    className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#ff7a59]"
                  />
                </div>

                {/* Activity History */}
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Activity</h3>
                  <div className="text-sm text-gray-500">
                    Last activity: {selectedContact.lastActivity}
                  </div>
                  <div className="text-sm text-gray-500">
                    Source: {selectedContact.source}
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Notes ({selectedContact.notes.length})</h3>
                  <div className="space-y-2">
                    {selectedContact.notes.map((note, index) => (
                      <div key={index} className="p-2 bg-[#f5f8fa] rounded text-sm text-gray-600">
                        {note}
                      </div>
                    ))}
                    <textarea
                      placeholder="Add a note..."
                      className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#ff7a59]"
                      rows={2}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          const value = (e.target as HTMLTextAreaElement).value.trim();
                          if (value) {
                            updateContact(selectedContact.id, { notes: [...selectedContact.notes, value] });
                            (e.target as HTMLTextAreaElement).value = "";
                          }
                        }
                      }}
                    />
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedContact.tags.map((tag) => (
                      <span key={tag} className="px-2 py-1 bg-[#eaf0f6] text-gray-600 text-xs rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="card flex flex-col items-center justify-center min-h-[400px] text-gray-500">
              <p>Select a contact to view details</p>
            </div>
          )}
        </div>
      </div>

      {/* New Contact Modal */}
      {showNewContactForm && (
        <NewContactModal
          onClose={() => setShowNewContactForm(false)}
          onSubmit={handleCreateContact}
        />
      )}
    </div>
  );
}

function NewContactModal({
  onClose,
  onSubmit,
}: {
  onClose: () => void;
  onSubmit: (data: Partial<Contact>) => void;
}) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [jobTitle, setJobTitle] = useState("");

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <h2 className="text-xl font-bold text-[#2d3e50] mb-4">Add New Contact</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:border-[#ff7a59]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:border-[#ff7a59]"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:border-[#ff7a59]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:border-[#ff7a59]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:border-[#ff7a59]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
            <input
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              className="w-full border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:border-[#ff7a59]"
            />
          </div>
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onClose} className="btn-secondary">Cancel</button>
          <button
            onClick={() => onSubmit({ firstName, lastName, email, phone, company, jobTitle })}
            className="btn-primary"
            disabled={!firstName || !lastName || !email}
          >
            Add Contact
          </button>
        </div>
      </div>
    </div>
  );
}
