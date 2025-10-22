import { Star, Bookmark, Tag, RotateCcw, MoreVertical } from "lucide-react";
import type { Email } from "./types";

interface EmailListProps {
  emails: Email[];
  selectedEmailId: string | null;
  onEmailClick: (emailId: string) => void;
  onStarToggle: (emailId: string) => void;
  onImportantToggle: (emailId: string) => void;
}

export default function EmailList({
  emails,
  selectedEmailId,
  onEmailClick,
  onStarToggle,
  onImportantToggle,
}: EmailListProps) {
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = diffMs / (1000 * 60 * 60);

    if (diffHours < 24) {
      return date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
      });
    }
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <div className="flex-1 bg-white overflow-y-auto">
      <div className="border-b border-gray-200 px-4 py-2 flex items-center gap-4">
        <input type="checkbox" className="w-4 h-4" />
        <button className="p-2 hover:bg-gray-100 rounded">
          <RotateCcw className="w-4 h-4 text-gray-600" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded">
          <MoreVertical className="w-4 h-4 text-gray-600" />
        </button>
      </div>

      {emails.map((email) => (
        <div
          key={email.id}
          onClick={() => onEmailClick(email.id)}
          className={`border-b border-gray-200 px-4 py-3 hover:shadow-md cursor-pointer transition-all ${
            selectedEmailId === email.id
              ? "bg-blue-50"
              : email.read
              ? "bg-white"
              : "bg-gray-50"
          }`}
        >
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              className="w-4 h-4"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                onStarToggle(email.id);
              }}
              className="hover:scale-110 transition-transform"
            >
              <Star 
                className={`w-5 h-5 ${email.starred ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}`}
              />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onImportantToggle(email.id);
              }}
              className="hover:scale-110 transition-transform"
            >
              {email.important ? (
                <Bookmark className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ) : (
                <Tag className="w-5 h-5 text-gray-400" />
              )}
            </button>

            <div className="flex-1 flex items-center gap-4 min-w-0">
              <span
                className={`w-48 truncate ${
                  email.read ? "font-normal" : "font-bold"
                }`}
              >
                {email.from}
              </span>
              <div className="flex-1 min-w-0">
                <span className={email.read ? "font-normal" : "font-bold"}>
                  {email.subject}
                </span>
                <span className="text-gray-600 ml-2">- {email.preview}</span>
              </div>
              <span className="text-xs text-gray-500 whitespace-nowrap">
                {formatTime(email.timestamp)}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
