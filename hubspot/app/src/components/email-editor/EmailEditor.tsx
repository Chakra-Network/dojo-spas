import { useState } from "react";
import { Plus, Send, Clock, Eye, Trash2, Type, Image, MousePointer, Minus, ArrowUp, ArrowDown } from "lucide-react";
import { useAppContext } from "@/context/AppProvider";
import type { EmailTemplate, EmailBlock, BlockType } from "@/lib/types";

export default function EmailEditor() {
  const { state, addEmail, updateEmail } = useAppContext();
  const [selectedEmailId, setSelectedEmailId] = useState<string | null>(null);
  const [showNewEmailForm, setShowNewEmailForm] = useState(false);

  const selectedEmail = state.emails.find((e) => e.id === selectedEmailId);

  const handleCreateEmail = (name: string, subject: string) => {
    const newEmail: EmailTemplate = {
      id: `email-${Date.now()}`,
      name,
      subject,
      content: [
        { id: `block-${Date.now()}`, type: "header", content: "Your Headline Here" },
        { id: `block-${Date.now() + 1}`, type: "text", content: "Start writing your email content..." },
      ],
      status: "Draft",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    addEmail(newEmail);
    setSelectedEmailId(newEmail.id);
    setShowNewEmailForm(false);
  };

  const handleUpdateBlock = (emailId: string, blockId: string, content: string) => {
    const email = state.emails.find((e) => e.id === emailId);
    if (!email) return;
    const updatedContent = email.content.map((block) =>
      block.id === blockId ? { ...block, content } : block
    );
    updateEmail(emailId, { content: updatedContent });
  };

  const handleAddBlock = (emailId: string, type: BlockType) => {
    const email = state.emails.find((e) => e.id === emailId);
    if (!email) return;
    const newBlock: EmailBlock = {
      id: `block-${Date.now()}`,
      type,
      content: type === "header" ? "New Header" :
               type === "text" ? "New paragraph text..." :
               type === "button" ? "Click Here" :
               type === "image" ? "https://placehold.co/600x200" : "",
    };
    updateEmail(emailId, { content: [...email.content, newBlock] });
  };

  const handleDeleteBlock = (emailId: string, blockId: string) => {
    const email = state.emails.find((e) => e.id === emailId);
    if (!email) return;
    updateEmail(emailId, { content: email.content.filter((b) => b.id !== blockId) });
  };

  const handleMoveBlock = (emailId: string, blockId: string, direction: "up" | "down") => {
    const email = state.emails.find((e) => e.id === emailId);
    if (!email) return;
    const index = email.content.findIndex((b) => b.id === blockId);
    if ((direction === "up" && index === 0) || (direction === "down" && index === email.content.length - 1)) return;
    const newContent = [...email.content];
    const swapIndex = direction === "up" ? index - 1 : index + 1;
    [newContent[index], newContent[swapIndex]] = [newContent[swapIndex], newContent[index]];
    updateEmail(emailId, { content: newContent });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#2d3e50]">Email Editor</h1>
        <button
          onClick={() => setShowNewEmailForm(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={18} />
          New Email
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Email List */}
        <div className="space-y-3">
          <h2 className="text-sm font-medium text-gray-600 uppercase tracking-wide">Emails</h2>
          {state.emails.map((email) => (
            <div
              key={email.id}
              onClick={() => setSelectedEmailId(email.id)}
              className={`card cursor-pointer transition-all ${
                selectedEmailId === email.id
                  ? "ring-2 ring-[#ff7a59] bg-orange-50"
                  : "hover:shadow-md"
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="font-medium text-[#2d3e50]">{email.name}</div>
                <span className={`badge ${
                  email.status === "Sent" ? "badge-completed" :
                  email.status === "Scheduled" ? "badge-scheduled" :
                  "badge-draft"
                }`}>
                  {email.status}
                </span>
              </div>
              <div className="text-sm text-gray-500 truncate">{email.subject}</div>
              {email.status === "Sent" && (
                <div className="mt-2 flex items-center gap-4 text-xs text-gray-500">
                  <span>{email.opens?.toLocaleString()} opens</span>
                  <span>{email.clicks?.toLocaleString()} clicks</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Editor */}
        <div className="col-span-2">
          {selectedEmail ? (
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <input
                    type="text"
                    value={selectedEmail.name}
                    onChange={(e) => updateEmail(selectedEmail.id, { name: e.target.value })}
                    className="text-xl font-bold text-[#2d3e50] bg-transparent border-none focus:outline-none focus:ring-0 w-full"
                  />
                  <input
                    type="text"
                    value={selectedEmail.subject}
                    onChange={(e) => updateEmail(selectedEmail.id, { subject: e.target.value })}
                    placeholder="Email subject line..."
                    className="text-gray-500 bg-transparent border-none focus:outline-none focus:ring-0 w-full"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <button className="btn-secondary flex items-center gap-2">
                    <Eye size={16} /> Preview
                  </button>
                  {selectedEmail.status === "Draft" && (
                    <>
                      <button
                        onClick={() => updateEmail(selectedEmail.id, { status: "Scheduled", scheduledFor: new Date().toISOString() })}
                        className="btn-secondary flex items-center gap-2"
                      >
                        <Clock size={16} /> Schedule
                      </button>
                      <button
                        onClick={() => updateEmail(selectedEmail.id, { status: "Sent", sentAt: new Date().toISOString() })}
                        className="btn-primary flex items-center gap-2"
                      >
                        <Send size={16} /> Send
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Block Toolbar */}
              <div className="flex items-center gap-2 mb-4 p-2 bg-[#f5f8fa] rounded-lg">
                <span className="text-sm text-gray-500 mr-2">Add:</span>
                {[
                  { type: "header" as BlockType, icon: Type, label: "Header" },
                  { type: "text" as BlockType, icon: Type, label: "Text" },
                  { type: "button" as BlockType, icon: MousePointer, label: "Button" },
                  { type: "image" as BlockType, icon: Image, label: "Image" },
                  { type: "divider" as BlockType, icon: Minus, label: "Divider" },
                ].map((item) => (
                  <button
                    key={item.type}
                    onClick={() => handleAddBlock(selectedEmail.id, item.type)}
                    className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-600 hover:bg-white rounded transition-colors"
                  >
                    <item.icon size={14} />
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Email Content Blocks */}
              <div className="border border-gray-200 rounded-lg p-6 bg-white min-h-[400px] space-y-4">
                {selectedEmail.content.map((block, index) => (
                  <div key={block.id} className="group relative">
                    {/* Block Controls */}
                    <div className="absolute -left-12 top-0 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-1">
                      <button
                        onClick={() => handleMoveBlock(selectedEmail.id, block.id, "up")}
                        disabled={index === 0}
                        className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                      >
                        <ArrowUp size={14} />
                      </button>
                      <button
                        onClick={() => handleMoveBlock(selectedEmail.id, block.id, "down")}
                        disabled={index === selectedEmail.content.length - 1}
                        className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                      >
                        <ArrowDown size={14} />
                      </button>
                      <button
                        onClick={() => handleDeleteBlock(selectedEmail.id, block.id)}
                        className="p-1 text-gray-400 hover:text-red-500"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                    {/* Block Content */}
                    {block.type === "header" && (
                      <input
                        type="text"
                        value={block.content}
                        onChange={(e) => handleUpdateBlock(selectedEmail.id, block.id, e.target.value)}
                        className="text-2xl font-bold text-[#2d3e50] w-full bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-[#ff7a59] rounded px-2 py-1"
                      />
                    )}
                    {block.type === "text" && (
                      <textarea
                        value={block.content}
                        onChange={(e) => handleUpdateBlock(selectedEmail.id, block.id, e.target.value)}
                        rows={3}
                        className="w-full text-gray-600 bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-[#ff7a59] rounded px-2 py-1 resize-none"
                      />
                    )}
                    {block.type === "button" && (
                      <div className="flex justify-center">
                        <input
                          type="text"
                          value={block.content}
                          onChange={(e) => handleUpdateBlock(selectedEmail.id, block.id, e.target.value)}
                          className="px-6 py-2 bg-[#ff7a59] text-white rounded font-medium text-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ff7a59]"
                        />
                      </div>
                    )}
                    {block.type === "image" && (
                      <div className="flex justify-center">
                        <img
                          src={block.content || "https://placehold.co/600x200"}
                          alt="Email content"
                          className="max-w-full h-auto rounded"
                        />
                      </div>
                    )}
                    {block.type === "divider" && (
                      <hr className="border-gray-300 my-4" />
                    )}
                  </div>
                ))}
              </div>

              {/* Audience Segment */}
              <div className="mt-4 p-4 bg-[#f5f8fa] rounded-lg">
                <label className="block text-sm font-medium text-gray-700 mb-2">Audience Segment</label>
                <select
                  value={selectedEmail.audienceSegment || ""}
                  onChange={(e) => updateEmail(selectedEmail.id, { audienceSegment: e.target.value })}
                  className="w-full border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:border-[#ff7a59]"
                >
                  <option value="">All Contacts</option>
                  <option value="Engaged Leads">Engaged Leads</option>
                  <option value="New Subscribers">New Subscribers</option>
                  <option value="Customers">Customers</option>
                  <option value="Inactive">Inactive (30+ days)</option>
                </select>
              </div>
            </div>
          ) : (
            <div className="card flex flex-col items-center justify-center min-h-[400px] text-gray-500">
              <Mail size={48} className="mb-4 text-gray-300" />
              <p>Select an email to edit or create a new one</p>
            </div>
          )}
        </div>
      </div>

      {/* New Email Modal */}
      {showNewEmailForm && (
        <NewEmailModal
          onClose={() => setShowNewEmailForm(false)}
          onSubmit={handleCreateEmail}
        />
      )}
    </div>
  );
}

function Mail({ size, className }: { size: number; className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function NewEmailModal({
  onClose,
  onSubmit,
}: {
  onClose: () => void;
  onSubmit: (name: string, subject: string) => void;
}) {
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <h2 className="text-xl font-bold text-[#2d3e50] mb-4">Create New Email</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:border-[#ff7a59]"
              placeholder="e.g., Welcome Series - Day 1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Subject Line</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:border-[#ff7a59]"
              placeholder="e.g., Welcome to Our Community!"
            />
          </div>
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onClose} className="btn-secondary">Cancel</button>
          <button
            onClick={() => onSubmit(name, subject)}
            className="btn-primary"
            disabled={!name || !subject}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
