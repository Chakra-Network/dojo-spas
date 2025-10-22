import { useState } from "react";
import {
  ArrowLeft,
  Archive,
  Ban,
  Mail,
  Clock,
  Star,
  Reply,
  MoreVertical,
  Send,
  Paperclip,
  Link,
  Smile,
  Image,
} from "lucide-react";
import type { Email } from "./types";

interface EmailViewProps {
  email: Email | null;
  onClose: () => void;
  onReply: (to: string, subject: string, body: string) => void;
}

export default function EmailView({ email, onClose, onReply }: EmailViewProps) {
  const [showReply, setShowReply] = useState(false);
  const [replyBody, setReplyBody] = useState("");

  if (!email) {
    return (
      <div className="flex-1 flex items-center justify-center bg-white text-gray-400">
        <p>Select an email to read</p>
      </div>
    );
  }

  const handleReplyClick = () => {
    setShowReply(true);
    setReplyBody(
      `\n\nOn ${new Date(email.timestamp).toLocaleString()}, ${
        email.from
      } wrote:\n> ${email.body.replace(/\n/g, "\n> ")}`
    );
  };

  const handleSendReply = () => {
    if (replyBody.trim()) {
      onReply(email.from, `Re: ${email.subject}`, replyBody);
      setShowReply(false);
      setReplyBody("");
    }
  };

  const handleCancelReply = () => {
    setShowReply(false);
    setReplyBody("");
  };

  return (
    <div className="flex-1 bg-white overflow-y-auto flex flex-col">
      <div className="border-b border-gray-200 px-6 py-3 flex items-center justify-between">
        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-gray-100 rounded">
            <Archive className="w-4 h-4" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded">
            <Ban className="w-4 h-4" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded">
            <Mail className="w-4 h-4" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded">
            <Clock className="w-4 h-4" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="px-6 py-6">
        <h1 className="text-2xl font-normal mb-6">{email.subject}</h1>

        <div className="flex items-start gap-4 mb-6">
          <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
            {email.from.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">{email.from}</div>
                <div className="text-xs text-gray-500">to me</div>
              </div>
              <div className="text-sm text-gray-500">
                {new Date(email.timestamp).toLocaleString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                  hour: "numeric",
                  minute: "2-digit",
                })}
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="hover:bg-gray-100 p-1 rounded">
              <Star className="w-5 h-5" />
            </button>
            <button className="hover:bg-gray-100 p-1 rounded">
              <Reply className="w-5 h-5" />
            </button>
            <button className="hover:bg-gray-100 p-1 rounded">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="text-gray-800 leading-relaxed whitespace-pre-wrap">
          {email.body}
        </div>

        <div className="mt-8 flex gap-3">
          <button
            onClick={handleReplyClick}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Reply
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors">
            Forward
          </button>
        </div>
      </div>

      {showReply && (
        <div className="border-t border-gray-200 bg-white">
          <div className="px-6 py-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                M
              </div>
              <div className="flex-1">
                <div className="text-sm text-gray-600">To: {email.from}</div>
                <div className="text-sm font-medium">Re: {email.subject}</div>
              </div>
            </div>

            <textarea
              value={replyBody}
              onChange={(e) => setReplyBody(e.target.value)}
              placeholder="Type your reply..."
              className="w-full min-h-[150px] p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              autoFocus
            />

            <div className="mt-4 flex items-center justify-between">
              <div className="flex gap-2">
                <button
                  onClick={handleSendReply}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  <Send className="w-4 h-4" />
                  Send
                </button>
                <button
                  onClick={handleCancelReply}
                  className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>

              <div className="flex gap-2">
                <button className="p-2 hover:bg-gray-100 rounded">
                  <Paperclip className="w-4 h-4 text-gray-500" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded">
                  <Link className="w-4 h-4 text-gray-500" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded">
                  <Smile className="w-4 h-4 text-gray-500" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded">
                  <Image className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
