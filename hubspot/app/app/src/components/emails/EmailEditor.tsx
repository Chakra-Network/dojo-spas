import { useState, useEffect } from 'react';
import type { EmailTemplate, EmailSegment } from '../../lib/types';
import { Save, Send, X } from 'lucide-react';

const inputBaseStyle = "w-full p-2 border border-hub-gray-200 rounded-md focus:ring-2 focus:ring-hub-blue focus:border-hub-blue focus:outline-none transition";

interface EmailEditorProps {
  email: EmailTemplate;
  onSave: (updatedEmail: EmailTemplate) => void;
  onClose: () => void;
  onSend: (email: EmailTemplate) => void;
}

const SEGMENT_OPTIONS: EmailSegment[] = ["All Contacts", "New Leads", "Active Customers"];

function EmailEditor({ email, onSave, onClose, onSend }: EmailEditorProps) {
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [segment, setSegment] = useState<EmailSegment>('All Contacts');

  useEffect(() => {
    setName(email.name);
    setSubject(email.subject);
    setContent(email.content);
    setSegment(email.targetSegment);
  }, [email]);

  const handleSave = () => {
    onSave({
      ...email,
      name,
      subject,
      content,
      targetSegment: segment,
    });
  };

  const handleSend = () => {
    const currentEmailState = { ...email, name, subject, content, targetSegment: segment };
    onSave(currentEmailState);
    onSend(currentEmailState);
  }

  return (
    <div className="flex-1 flex flex-col bg-white border-l border-gray-200">
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="text-lg font-semibold text-hub-text bg-transparent focus:outline-none focus:ring-2 focus:ring-hub-blue rounded-md -ml-2 px-2 py-1 transition"
          aria-label="Email template name"
        />
        <div className="flex items-center gap-2">
          <button
            onClick={handleSend}
            className="px-4 py-2 text-sm text-white bg-hub-orange rounded-md hover:opacity-90 flex items-center gap-2 focus-ring active:scale-[0.98]"
          >
            <Send size={16} /> Send
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-sm text-white bg-hub-blue rounded-md hover:bg-hub-gray-900 flex items-center gap-2 focus-ring active:scale-[0.98]"
          >
            <Save size={16} /> Save & Close
          </button>
          <button 
            onClick={onClose} 
            className="p-2 text-hub-gray-600 hover:bg-hub-gray-100 rounded-md focus-ring"
            aria-label="Close editor"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      <div className="p-6 space-y-6 overflow-y-auto">
        <div>
          <label htmlFor="segment" className="block text-sm font-medium text-hub-gray-800 mb-1">Target Segment</label>
          <select id="segment" value={segment} onChange={(e) => setSegment(e.target.value as EmailSegment)} className={inputBaseStyle}>
            {SEGMENT_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-hub-gray-800 mb-1">Subject</label>
          <input id="subject" type="text" value={subject} onChange={(e) => setSubject(e.target.value)} className={inputBaseStyle} />
        </div>
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-hub-gray-800 mb-1">Content</label>
          <textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} rows={15} className={`${inputBaseStyle} font-mono`} />
        </div>
      </div>
    </div>
  );
}

export default EmailEditor;