import { useState } from "react";
import { X, Paperclip, Link, Smile, Image, Trash2 } from "lucide-react";

interface ComposeModalProps {
  onClose: () => void;
  onSend: (to: string, subject: string, body: string) => void;
}

export default function ComposeModal({ onClose, onSend }: ComposeModalProps) {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  const handleSend = () => {
    if (to && subject && body) {
      onSend(to, subject, body);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        <div className="bg-gray-800 text-white px-4 py-3 rounded-t-lg flex items-center justify-between">
          <span>New Message</span>
          <button onClick={onClose} className="hover:bg-gray-700 p-1 rounded">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 flex flex-col">
          <div className="border-b border-gray-200 px-4 py-2">
            <input
              type="email"
              placeholder="Recipients"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="w-full outline-none"
            />
          </div>

          <div className="border-b border-gray-200 px-4 py-2">
            <input
              type="text"
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full outline-none"
            />
          </div>

          <textarea
            placeholder="Compose email..."
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="flex-1 px-4 py-2 outline-none resize-none min-h-[300px]"
          />

          <div className="border-t border-gray-200 px-4 py-3 flex items-center justify-between">
            <button
              onClick={handleSend}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
            >
              Send
            </button>
            <div className="flex gap-2">
              <button className="p-2 hover:bg-gray-100 rounded">
                <Paperclip className="w-4 h-4" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded">
                <Link className="w-4 h-4" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded">
                <Smile className="w-4 h-4" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded">
                <Image className="w-4 h-4" />
              </button>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
