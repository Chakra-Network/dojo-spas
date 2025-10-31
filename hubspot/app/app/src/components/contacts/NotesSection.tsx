import { useState } from 'react';
import type { ContactNote, User } from '../../lib/types';

interface NotesSectionProps {
  notes: ContactNote[];
  users: User[];
  onAddNote: (content: string) => void;
}

function NotesSection({ notes, users, onAddNote }: NotesSectionProps) {
  const [newNote, setNewNote] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newNote.trim()) {
      onAddNote(newNote.trim());
      setNewNote('');
    }
  };

  const getAuthor = (authorId: string) => users.find(u => u.id === authorId);

  return (
    <div>
      <h4 className="text-md font-semibold text-hub-text mb-3">Notes</h4>
      <form onSubmit={handleSubmit} className="mb-4">
        <textarea
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Add a note..."
          rows={3}
          className="w-full p-2 border border-hub-gray-200 rounded-md focus:ring-2 focus:ring-hub-blue focus:border-hub-blue focus:outline-none transition text-sm"
        />
        <button
          type="submit"
          className="mt-2 px-4 py-1.5 text-sm font-semibold text-white bg-hub-blue rounded-md hover:bg-hub-gray-900 focus-ring active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!newNote.trim()}
        >
          Add Note
        </button>
      </form>
      {/* Notes List */}
      <div className="space-y-4">
        {notes.length > 0 ? (
          [...notes].reverse().map(note => ( // Show newest first
            <div key={note.id} className="bg-gray-50 p-3 rounded-md border">
              <p className="text-sm text-gray-800">{note.content}</p>
              <p className="text-xs text-gray-500 mt-2">
                - {getAuthor(note.authorId)?.name || 'Unknown'} on {new Date(note.timestamp).toLocaleDateString()}
              </p>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500">No notes yet.</p>
        )}
      </div>
    </div>
  );
}

export default NotesSection;