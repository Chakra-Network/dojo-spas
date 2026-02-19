import { useState } from "react";
import {
  ArrowLeft,
  Mail,
  Phone,
  Building2,
  Briefcase,
  Calendar,
  Globe,
  Clock,
  MessageSquare,
  Send,
  MailOpen,
  MousePointerClick,
  FileText,
  Eye,
  Users,
  PhoneCall,
  StickyNote,
  ArrowRightCircle,
} from "lucide-react";
import type { Contact, ContactNote, LifecycleStage } from "../lib/types";
import { getInitials, getStageColor, getStageLabel, formatDate, formatDateFull, generateId } from "../lib/utils";
import { owners } from "../lib/consts";

interface ContactDetailProps {
  contact: Contact;
  onBack: () => void;
  onUpdate: (contact: Contact) => void;
  onAddNote: (contactId: string, note: ContactNote) => void;
}

const activityIcons: Record<string, typeof Mail> = {
  email_open: MailOpen,
  email_click: MousePointerClick,
  form_submit: FileText,
  page_view: Eye,
  meeting: Users,
  call: PhoneCall,
  note: StickyNote,
  stage_change: ArrowRightCircle,
};

const activityColors: Record<string, string> = {
  email_open: "bg-cyan-100 text-cyan-600",
  email_click: "bg-indigo-100 text-indigo-600",
  form_submit: "bg-pink-100 text-pink-600",
  page_view: "bg-blue-100 text-blue-600",
  meeting: "bg-purple-100 text-purple-600",
  call: "bg-green-100 text-green-600",
  note: "bg-yellow-100 text-yellow-600",
  stage_change: "bg-orange-100 text-orange-600",
};

const lifecycleStages: LifecycleStage[] = ["subscriber", "lead", "mql", "sql", "customer"];

export default function ContactDetail({ contact, onBack, onUpdate, onAddNote }: ContactDetailProps) {
  const [noteText, setNoteText] = useState("");

  const handleSubmitNote = () => {
    if (!noteText.trim()) return;
    const note: ContactNote = {
      id: generateId(),
      content: noteText.trim(),
      author: "You",
      timestamp: new Date().toISOString(),
    };
    onAddNote(contact.id, note);
    setNoteText("");
  };

  const stageIndex = lifecycleStages.indexOf(contact.lifecycleStage);

  return (
    <div className="p-6 text-gray-900">
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-orange-600 mb-4 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Contacts
      </button>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left column — Contact Info */}
        <div className="space-y-4">
          {/* Profile card */}
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-[#1b2a4a] flex items-center justify-center shrink-0">
                <span className="text-lg font-bold text-white">
                  {getInitials(contact.firstName, contact.lastName)}
                </span>
              </div>
              <div className="min-w-0">
                <h2 className="text-lg font-bold text-gray-900">
                  {contact.firstName} {contact.lastName}
                </h2>
                <p className="text-sm text-gray-500">{contact.jobTitle}</p>
              </div>
            </div>

            <div className="mt-4 space-y-2.5">
              <div className="flex items-center gap-2.5 text-sm text-gray-600">
                <Mail className="w-4 h-4 text-gray-400 shrink-0" />
                <span className="truncate">{contact.email}</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-gray-600">
                <Phone className="w-4 h-4 text-gray-400 shrink-0" />
                <span>{contact.phone}</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-gray-600">
                <Building2 className="w-4 h-4 text-gray-400 shrink-0" />
                <span>{contact.company}</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-gray-600">
                <Briefcase className="w-4 h-4 text-gray-400 shrink-0" />
                <span>{contact.jobTitle}</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-gray-600">
                <Globe className="w-4 h-4 text-gray-400 shrink-0" />
                <span>{contact.source}</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-gray-600">
                <Calendar className="w-4 h-4 text-gray-400 shrink-0" />
                <span>Created {formatDate(contact.createdAt)}</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-gray-600">
                <Clock className="w-4 h-4 text-gray-400 shrink-0" />
                <span>Last active {formatDate(contact.lastActivity)}</span>
              </div>
            </div>
          </div>

          {/* Lifecycle Stage */}
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Lifecycle Stage</h3>
            <div className="flex items-center gap-1 mb-3">
              {lifecycleStages.map((s, idx) => (
                <button
                  key={s}
                  onClick={() => onUpdate({ ...contact, lifecycleStage: s })}
                  className={`flex-1 h-2 rounded-full transition-colors ${
                    idx <= stageIndex ? getStageColor(contact.lifecycleStage) : "bg-gray-200"
                  }`}
                  title={getStageLabel(s)}
                />
              ))}
            </div>
            <div className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${getStageColor(contact.lifecycleStage)}`} />
              <span className="text-sm font-medium text-gray-800">{getStageLabel(contact.lifecycleStage)}</span>
            </div>
            <div className="flex flex-wrap gap-1 mt-3">
              {lifecycleStages.map((s) => (
                <button
                  key={s}
                  onClick={() => onUpdate({ ...contact, lifecycleStage: s })}
                  className={`text-[10px] px-2 py-0.5 rounded-full border transition-colors ${
                    contact.lifecycleStage === s
                      ? "bg-orange-500 text-white border-orange-500"
                      : "bg-gray-50 text-gray-500 border-gray-200 hover:border-orange-300"
                  }`}
                >
                  {getStageLabel(s)}
                </button>
              ))}
            </div>
          </div>

          {/* Owner */}
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Assigned Owner</h3>
            <select
              value={contact.owner}
              onChange={(e) => onUpdate({ ...contact, owner: e.target.value })}
              className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-orange-400"
            >
              {owners.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Right column — Activity & Notes */}
        <div className="xl:col-span-2 space-y-4">
          {/* Add note */}
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-orange-500" /> Add Note
            </h3>
            <div className="flex gap-2">
              <textarea
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder="Write a note about this contact..."
                className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 resize-none focus:outline-none focus:ring-1 focus:ring-orange-400"
                rows={2}
              />
              <button
                onClick={handleSubmitNote}
                disabled={!noteText.trim()}
                className="self-end px-4 py-2 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-200 disabled:text-gray-400 text-white rounded-lg text-sm font-medium transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Notes list */}
          {contact.notes.length > 0 && (
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Notes ({contact.notes.length})</h3>
              <div className="space-y-3">
                {contact.notes.map((note) => (
                  <div key={note.id} className="bg-yellow-50 border border-yellow-100 rounded-lg p-3">
                    <p className="text-sm text-gray-800">{note.content}</p>
                    <p className="text-[10px] text-gray-400 mt-1.5">
                      {note.author} · {formatDateFull(note.timestamp)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Activity timeline */}
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Activity Timeline ({contact.activities.length})</h3>
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-[15px] top-0 bottom-0 w-px bg-gray-200" />

              <div className="space-y-4">
                {contact.activities.map((activity) => {
                  const Icon = activityIcons[activity.type] || Clock;
                  const colorClass = activityColors[activity.type] || "bg-gray-100 text-gray-600";
                  return (
                    <div key={activity.id} className="flex gap-3 relative">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 ${colorClass}`}>
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex-1 min-w-0 pt-1">
                        <p className="text-sm text-gray-700">{activity.description}</p>
                        <p className="text-[10px] text-gray-400 mt-0.5">{formatDateFull(activity.timestamp)}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
